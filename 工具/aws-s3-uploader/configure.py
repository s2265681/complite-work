#!/usr/bin/env python3
"""
AWS S3 上传工具配置脚本
交互式配置 AWS 凭证
"""

import os
import sys
import getpass
from pathlib import Path

def print_header():
    """打印配置向导标题"""
    print("🔧 AWS S3 上传工具配置向导")
    print("=" * 40)
    print()

def print_instructions():
    """打印获取密钥的说明"""
    print("📋 如何获取 AWS 访问密钥：")
    print()
    print("1. 登录 AWS 控制台: https://console.aws.amazon.com/")
    print("2. 点击右上角你的用户名 → '我的安全证书'")
    print("3. 在'访问密钥'部分点击'创建访问密钥'")
    print("4. 选择'命令行界面 (CLI)' → 创建")
    print("5. 复制 Access Key ID 和 Secret Access Key")
    print()
    print("⚠️  重要：Secret Access Key 只显示一次，请立即保存！")
    print()

def get_user_input():
    """获取用户输入的配置信息"""
    print("🔑 请输入你的 AWS 凭证：")
    print()
    
    # 获取 Access Key ID
    while True:
        access_key = input("AWS Access Key ID (以 AKIA 开头): ").strip()
        if access_key:
            if access_key.startswith('AKIA'):
                break
            else:
                print("❌ Access Key ID 通常以 'AKIA' 开头，请检查输入")
        else:
            print("❌ Access Key ID 不能为空")
    
    # 获取 Secret Access Key
    while True:
        secret_key = getpass.getpass("AWS Secret Access Key (输入时不显示): ").strip()
        if secret_key:
            if len(secret_key) >= 20:  # 基本长度检查
                break
            else:
                print("❌ Secret Access Key 长度似乎不正确，请重新输入")
        else:
            print("❌ Secret Access Key 不能为空")
    
    # 确认区域
    region = input("AWS 区域 [ap-southeast-1]: ").strip() or "ap-southeast-1"
    
    # 确认 S3 配置
    bucket = input("S3 Bucket 名称 [kalowave.app.data-service]: ").strip() or "kalowave.app.data-service"
    prefix = input("S3 前缀路径 [configuration/production/config/]: ").strip() or "configuration/production/config/"
    
    return {
        'access_key': access_key,
        'secret_key': secret_key,
        'region': region,
        'bucket': bucket,
        'prefix': prefix
    }

def create_env_file(config):
    """创建 .env 配置文件"""
    env_content = f"""# AWS 配置
AWS_ACCESS_KEY_ID={config['access_key']}
AWS_SECRET_ACCESS_KEY={config['secret_key']}
AWS_REGION={config['region']}

# S3 配置
S3_BUCKET_NAME={config['bucket']}
S3_PREFIX={config['prefix']}
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
    
    print_instructions()
    
    # 获取用户输入
    config = get_user_input()
    
    print("\n📝 配置摘要：")
    print(f"   Access Key ID: {config['access_key']}")
    print(f"   Secret Key: {'*' * len(config['secret_key'])}")
    print(f"   区域: {config['region']}")
    print(f"   S3 Bucket: {config['bucket']}")
    print(f"   S3 前缀: {config['prefix']}")
    print()
    
    confirm = input("确认保存配置？(Y/n): ").strip().lower()
    if confirm in ['', 'y', 'yes']:
        if create_env_file(config):
            if test_configuration():
                print("\n🎉 配置完成！现在可以使用上传工具了：")
                print("   python s3_uploader.py upload-contact")
            else:
                print("\n⚠️  配置已保存，但测试失败。请检查：")
                print("   1. AWS 凭证是否正确")
                print("   2. IAM 用户是否有 S3 权限")
                print("   3. S3 bucket 是否存在")
        else:
            print("配置失败")
    else:
        print("配置取消")

if __name__ == '__main__':
    main() 