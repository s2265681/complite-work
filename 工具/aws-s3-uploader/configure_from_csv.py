#!/usr/bin/env python3
"""
从 AWS CSV 文件配置 S3 上传工具
适用于管理员提供的访问密钥 CSV 文件
"""

import os
import csv
import sys
from pathlib import Path

def print_header():
    """打印配置向导标题"""
    print("🔧 AWS S3 上传工具 - CSV 配置向导")
    print("=" * 45)
    print()

def print_csv_instructions():
    """打印 CSV 文件说明"""
    print("📋 关于 AWS 访问密钥 CSV 文件：")
    print()
    print("✅ 你已经有管理员提供的访问密钥 CSV 文件")
    print("✅ CSV 文件通常包含以下列：")
    print("   - User name (用户名)")
    print("   - Access key ID (访问密钥 ID)")
    print("   - Secret access key (秘密访问密钥)")
    print("   - Console password (控制台密码)")
    print()
    print("📁 请确保 CSV 文件在当前目录或提供完整路径")
    print()

def find_csv_files():
    """查找当前目录下的 CSV 文件"""
    csv_files = []
    current_dir = Path('.')
    
    for file in current_dir.glob('*.csv'):
        csv_files.append(str(file))
    
    return csv_files

def read_csv_file(csv_path):
    """读取 CSV 文件并提取 AWS 凭证"""
    try:
        with open(csv_path, 'r', encoding='utf-8') as file:
            # 尝试不同的编码
            content = file.read()
    except UnicodeDecodeError:
        try:
            with open(csv_path, 'r', encoding='utf-8-sig') as file:
                content = file.read()
        except UnicodeDecodeError:
            with open(csv_path, 'r', encoding='gbk') as file:
                content = file.read()
    
    # 重新打开文件进行 CSV 解析
    with open(csv_path, 'r', encoding='utf-8') as file:
        csv_reader = csv.DictReader(file)
        
        for row in csv_reader:
            # 查找包含访问密钥的列
            access_key = None
            secret_key = None
            user_name = None
            
            # 尝试不同的列名变体
            for key, value in row.items():
                key_lower = key.lower().strip()
                
                # 查找 Access Key ID
                if any(term in key_lower for term in ['access key id', 'access_key_id', 'accesskeyid']):
                    access_key = value.strip()
                
                # 查找 Secret Access Key
                elif any(term in key_lower for term in ['secret access key', 'secret_access_key', 'secretaccesskey']):
                    secret_key = value.strip()
                
                # 查找用户名
                elif any(term in key_lower for term in ['user name', 'username', 'user']):
                    user_name = value.strip()
            
            if access_key and secret_key:
                return {
                    'user_name': user_name or 'Unknown',
                    'access_key': access_key,
                    'secret_key': secret_key
                }
    
    return None

def get_csv_file_path():
    """获取 CSV 文件路径"""
    print("📁 查找 CSV 文件...")
    
    # 查找当前目录下的 CSV 文件
    csv_files = find_csv_files()
    
    if csv_files:
        print(f"✅ 找到 {len(csv_files)} 个 CSV 文件：")
        for i, file in enumerate(csv_files, 1):
            print(f"   {i}. {file}")
        print()
        
        if len(csv_files) == 1:
            use_found = input(f"使用找到的文件 '{csv_files[0]}'？(Y/n): ").strip().lower()
            if use_found in ['', 'y', 'yes']:
                return csv_files[0]
        else:
            while True:
                try:
                    choice = input(f"选择文件 (1-{len(csv_files)}) 或输入 0 手动指定路径: ").strip()
                    if choice == '0':
                        break
                    choice_num = int(choice)
                    if 1 <= choice_num <= len(csv_files):
                        return csv_files[choice_num - 1]
                    else:
                        print(f"❌ 请输入 1-{len(csv_files)} 之间的数字")
                except ValueError:
                    print("❌ 请输入有效的数字")
    
    # 手动输入文件路径
    while True:
        csv_path = input("请输入 CSV 文件的完整路径: ").strip()
        if csv_path:
            if os.path.exists(csv_path):
                return csv_path
            else:
                print(f"❌ 文件不存在: {csv_path}")
        else:
            print("❌ 路径不能为空")

def create_env_file(config):
    """创建 .env 配置文件"""
    env_content = f"""# AWS 配置 (从 CSV 文件导入)
# 用户: {config['user_name']}
AWS_ACCESS_KEY_ID={config['access_key']}
AWS_SECRET_ACCESS_KEY={config['secret_key']}
AWS_REGION=ap-southeast-1

# S3 配置
S3_BUCKET_NAME=kalowave.app.data-service
S3_PREFIX=configuration/production/config/
"""
    
    try:
        with open('.env', 'w', encoding='utf-8') as f:
            f.write(env_content)
        print("✅ 配置文件 .env 创建成功！")
        return True
    except Exception as e:
        print(f"❌ 创建配置文件失败: {e}")
        return False

def test_configuration():
    """测试配置是否正确"""
    print("\n🧪 测试配置...")
    
    try:
        # 导入必要的模块
        import boto3
        from dotenv import load_dotenv
        from botocore.exceptions import ClientError, NoCredentialsError
        
        # 加载环境变量
        load_dotenv()
        
        # 获取配置
        access_key = os.getenv('AWS_ACCESS_KEY_ID')
        secret_key = os.getenv('AWS_SECRET_ACCESS_KEY')
        region = os.getenv('AWS_REGION')
        bucket = os.getenv('S3_BUCKET_NAME')
        
        # 创建 S3 客户端
        s3_client = boto3.client(
            's3',
            aws_access_key_id=access_key,
            aws_secret_access_key=secret_key,
            region_name=region
        )
        
        # 测试连接
        s3_client.head_bucket(Bucket=bucket)
        print(f"✅ 成功连接到 S3 bucket: {bucket}")
        
        # 尝试列出文件
        prefix = os.getenv('S3_PREFIX')
        response = s3_client.list_objects_v2(Bucket=bucket, Prefix=prefix, MaxKeys=1)
        print(f"✅ 成功访问路径: s3://{bucket}/{prefix}")
        
        return True
        
    except NoCredentialsError:
        print("❌ AWS 凭证无效")
        return False
    except ClientError as e:
        error_code = e.response['Error']['Code']
        if error_code == '404':
            print(f"❌ S3 bucket '{bucket}' 不存在")
        elif error_code == '403':
            print(f"❌ 没有访问 S3 bucket '{bucket}' 的权限")
            print("💡 请联系管理员确认以下权限：")
            print("   - s3:PutObject")
            print("   - s3:ListBucket")
            print("   - s3:GetBucketLocation")
        else:
            print(f"❌ AWS 错误: {e}")
        return False
    except ImportError as e:
        print(f"❌ 缺少依赖包: {e}")
        print("请先运行: pip install -r requirements.txt")
        return False
    except Exception as e:
        print(f"❌ 测试失败: {e}")
        return False

def main():
    """主函数"""
    print_header()
    
    # 检查是否已存在配置文件
    if os.path.exists('.env'):
        overwrite = input("⚠️  .env 文件已存在，是否覆盖？(y/N): ").strip().lower()
        if overwrite not in ['y', 'yes']:
            print("配置取消")
            return
    
    print_csv_instructions()
    
    # 获取 CSV 文件路径
    csv_path = get_csv_file_path()
    
    print(f"\n📖 读取 CSV 文件: {csv_path}")
    
    # 读取 CSV 文件
    try:
        credentials = read_csv_file(csv_path)
        
        if not credentials:
            print("❌ 无法从 CSV 文件中提取访问密钥")
            print("请确保 CSV 文件包含以下列：")
            print("   - Access key ID")
            print("   - Secret access key")
            return
        
        print("✅ 成功读取访问密钥！")
        print(f"   用户: {credentials['user_name']}")
        print(f"   Access Key ID: {credentials['access_key']}")
        print(f"   Secret Key: {'*' * len(credentials['secret_key'])}")
        print()
        
        # 确认配置
        confirm = input("确认使用这些凭证？(Y/n): ").strip().lower()
        if confirm in ['', 'y', 'yes']:
            if create_env_file(credentials):
                if test_configuration():
                    print("\n🎉 配置完成！现在可以使用上传工具了：")
                    print("   python s3_uploader.py upload-contact")
                else:
                    print("\n⚠️  配置已保存，但测试失败。")
                    print("请联系管理员确认 IAM 权限设置。")
            else:
                print("配置失败")
        else:
            print("配置取消")
            
    except Exception as e:
        print(f"❌ 读取 CSV 文件失败: {e}")
        print("请检查文件格式和编码")

if __name__ == '__main__':
    main() 