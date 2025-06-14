#!/bin/bash

# AWS 部署脚本

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 打印带颜色的消息
print_message() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# 检查命令是否存在
check_command() {
    if ! command -v $1 &> /dev/null; then
        print_error "$1 未安装"
        exit 1
    fi
}

# 检查必要的工具
check_command aws
check_command npm
check_command node

# 构建前端
print_message "开始构建前端..."
cd ../frontend
npm install
npm run build
if [ $? -ne 0 ]; then
    print_error "前端构建失败"
    exit 1
fi

# 构建后端
print_message "开始构建后端..."
cd ../backend
npm install
npm run build
if [ $? -ne 0 ]; then
    print_error "后端构建失败"
    exit 1
fi

# 部署到 S3
print_message "开始部署前端到 S3..."
aws s3 sync ../frontend/dist s3://your-bucket-name --delete

# 部署到 EC2
print_message "开始部署后端到 EC2..."
scp -i your-key.pem -r ../backend/dist/* ec2-user@your-ec2-instance:/var/www/backend/

# 重启后端服务
print_message "重启后端服务..."
ssh -i your-key.pem ec2-user@your-ec2-instance "cd /var/www/backend && pm2 restart all"

print_message "部署完成！" 