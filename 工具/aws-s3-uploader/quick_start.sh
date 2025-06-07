#!/bin/bash

# AWS S3 上传工具快速启动脚本

echo "🚀 AWS S3 上传工具快速启动"
echo "================================"

# 检查 Python 版本
if ! command -v python3 &> /dev/null; then
    echo "❌ 错误: 未找到 Python 3"
    echo "请先安装 Python 3.7 或更高版本"
    exit 1
fi

PYTHON_VERSION=$(python3 -c 'import sys; print(".".join(map(str, sys.version_info[:2])))')
echo "✅ 检测到 Python $PYTHON_VERSION"

# 创建虚拟环境
if [ ! -d "venv" ]; then
    echo "📦 创建虚拟环境..."
    python3 -m venv venv
fi

# 激活虚拟环境
echo "🔧 激活虚拟环境..."
source venv/bin/activate

# 安装依赖
echo "📥 安装依赖包..."
pip install -r requirements.txt

# 检查是否存在 .env 文件
if [ ! -f ".env" ]; then
    echo "⚙️  创建配置文件..."
    cp env_example.txt .env
    echo ""
    echo "🔑 请编辑 .env 文件，填入你的 AWS 凭证："
    echo "   nano .env"
    echo ""
    echo "或者使用 AWS CLI 配置："
    echo "   aws configure"
    echo ""
fi

# 检查是否存在 contact.groupV1-testWWWW.json 文件
if [ ! -f "contact.groupV1-testWWWW.json" ]; then
    echo "📄 已创建示例 contact.groupV1-testWWWW.json 文件"
    echo "   你可以替换为你的实际文件"
fi

echo ""
echo "✅ 安装完成！"
echo ""
echo "📋 使用方法："
echo "   1. 配置 AWS 凭证（编辑 .env 文件或使用 aws configure）"
echo "   2. 确保 contact.groupV1-testWWWW.json 文件存在"
echo "   3. 运行上传命令："
echo "      python s3_uploader.py upload-contact"
echo ""
echo "🔍 查看更多命令："
echo "   python s3_uploader.py --help"
echo ""
echo "🎯 快捷上传（如果已配置）："
echo "   python s3_uploader.py upload-contact" 