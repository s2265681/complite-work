#!/usr/bin/env python3
"""
AWS S3 文件上传工具
用于将 contact.groupV1-testWWWW.json 文件上传到指定的 S3 bucket
"""

import os
import sys
import boto3
import click
from pathlib import Path
from dotenv import load_dotenv
from botocore.exceptions import ClientError, NoCredentialsError

class S3Uploader:
    def __init__(self):
        """初始化 S3 上传器"""
        # 加载环境变量
        load_dotenv()
        
        # 获取配置
        self.aws_access_key = os.getenv('AWS_ACCESS_KEY_ID')
        self.aws_secret_key = os.getenv('AWS_SECRET_ACCESS_KEY')
        self.aws_region = os.getenv('AWS_REGION', 'ap-southeast-1')
        self.bucket_name = os.getenv('S3_BUCKET_NAME', 'kalowave.app.data-service')
        self.s3_prefix = os.getenv('S3_PREFIX', 'configuration/production/config/')
        
        # 初始化 S3 客户端
        self.s3_client = None
        self._init_s3_client()
    
    def _init_s3_client(self):
        """初始化 S3 客户端"""
        try:
            if self.aws_access_key and self.aws_secret_key:
                # 使用环境变量中的凭证
                self.s3_client = boto3.client(
                    's3',
                    aws_access_key_id=self.aws_access_key,
                    aws_secret_access_key=self.aws_secret_key,
                    region_name=self.aws_region
                )
            else:
                # 使用默认凭证链（AWS CLI、IAM角色等）
                self.s3_client = boto3.client('s3', region_name=self.aws_region)
            
            # 测试连接
            self.s3_client.head_bucket(Bucket=self.bucket_name)
            click.echo(f"✅ 成功连接到 S3 bucket: {self.bucket_name}")
            
        except NoCredentialsError:
            click.echo("❌ 错误: 未找到 AWS 凭证")
            click.echo("请设置环境变量或配置 AWS CLI")
            sys.exit(1)
        except ClientError as e:
            error_code = e.response['Error']['Code']
            if error_code == '404':
                click.echo(f"❌ 错误: S3 bucket '{self.bucket_name}' 不存在")
            elif error_code == '403':
                click.echo(f"❌ 错误: 没有访问 S3 bucket '{self.bucket_name}' 的权限")
            else:
                click.echo(f"❌ 错误: {e}")
            sys.exit(1)
    
    def upload_file(self, local_file_path, s3_key=None):
        """
        上传文件到 S3
        
        Args:
            local_file_path (str): 本地文件路径
            s3_key (str): S3 对象键名，如果为 None 则使用文件名
        
        Returns:
            bool: 上传是否成功
        """
        try:
            # 检查本地文件是否存在
            if not os.path.exists(local_file_path):
                click.echo(f"❌ 错误: 本地文件 '{local_file_path}' 不存在")
                return False
            
            # 生成 S3 对象键名
            if s3_key is None:
                filename = os.path.basename(local_file_path)
                s3_key = f"{self.s3_prefix}{filename}"
            
            # 上传文件
            click.echo(f"📤 正在上传文件: {local_file_path}")
            click.echo(f"📍 目标位置: s3://{self.bucket_name}/{s3_key}")
            
            self.s3_client.upload_file(
                local_file_path,
                self.bucket_name,
                s3_key,
                ExtraArgs={'ServerSideEncryption': 'AES256'}  # 启用服务端加密
            )
            
            click.echo("✅ 文件上传成功!")
            
            # 生成文件 URL
            s3_url = f"https://{self.bucket_name}.s3.{self.aws_region}.amazonaws.com/{s3_key}"
            click.echo(f"🔗 文件 URL: {s3_url}")
            
            return True
            
        except ClientError as e:
            click.echo(f"❌ 上传失败: {e}")
            return False
        except Exception as e:
            click.echo(f"❌ 未知错误: {e}")
            return False
    
    def list_files(self, prefix=None):
        """
        列出 S3 bucket 中的文件
        
        Args:
            prefix (str): 文件前缀过滤
        """
        try:
            if prefix is None:
                prefix = self.s3_prefix
            
            click.echo(f"📋 列出 s3://{self.bucket_name}/{prefix} 中的文件:")
            
            response = self.s3_client.list_objects_v2(
                Bucket=self.bucket_name,
                Prefix=prefix
            )
            
            if 'Contents' in response:
                for obj in response['Contents']:
                    size = obj['Size']
                    modified = obj['LastModified'].strftime('%Y-%m-%d %H:%M:%S')
                    click.echo(f"  📄 {obj['Key']} ({size} bytes, {modified})")
            else:
                click.echo("  📭 没有找到文件")
                
        except ClientError as e:
            click.echo(f"❌ 列出文件失败: {e}")


@click.group()
def cli():
    """AWS S3 文件上传工具"""
    pass


@cli.command()
@click.argument('file_path', type=click.Path(exists=True))
@click.option('--s3-key', help='S3 对象键名（可选）')
def upload(file_path, s3_key):
    """上传文件到 S3"""
    uploader = S3Uploader()
    uploader.upload_file(file_path, s3_key)


@cli.command()
@click.option('--prefix', help='文件前缀过滤（可选）')
def list(prefix):
    """列出 S3 bucket 中的文件"""
    uploader = S3Uploader()
    uploader.list_files(prefix)


@cli.command()
def upload_contact():
    """上传 contact.groupV1-testWWWW.json 文件（快捷命令）"""
    contact_file = "contact.groupV1-testWWWW.json"
    
    if not os.path.exists(contact_file):
        click.echo(f"❌ 错误: 当前目录下没有找到 '{contact_file}' 文件")
        click.echo("请确保文件存在于当前工作目录中")
        return
    
    uploader = S3Uploader()
    uploader.upload_file(contact_file)


if __name__ == '__main__':
    cli() 