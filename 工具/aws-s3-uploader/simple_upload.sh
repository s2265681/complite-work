#!/bin/bash

# 简化版 AWS S3 文件上传脚本
# 使用说明: ./simple_upload.sh <文件路径> <存储桶名称> [S3路径]

# 检查参数
if [ $# -lt 2 ]; then
    echo "使用方法: $0 <文件路径> <存储桶名称> [S3路径]"
    echo ""
    echo "示例:"
    echo "  $0 file.txt my-bucket"
    echo "  $0 image.jpg my-bucket images/"
    echo "  $0 document.pdf my-bucket documents/backup.pdf"
    exit 1
fi

FILE_PATH="$1"
BUCKET_NAME="$2"
S3_PATH="${3:-$(basename "$FILE_PATH")}"

# 检查文件是否存在
if [ ! -f "$FILE_PATH" ]; then
    echo "错误: 文件 '$FILE_PATH' 不存在"
    exit 1
fi

# 检查AWS CLI
if ! command -v aws &> /dev/null; then
    echo "错误: AWS CLI 未安装"
    echo "请访问: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
    exit 1
fi

# 显示上传信息
echo "准备上传文件:"
echo "  本地文件: $FILE_PATH"
echo "  存储桶:   $BUCKET_NAME"
echo "  S3路径:   $S3_PATH"
echo ""

# 执行上传
echo "开始上传..."
if aws s3 cp "$FILE_PATH" "s3://$BUCKET_NAME/$S3_PATH"; then
    echo "✅ 上传成功!"
    echo "文件已上传到: s3://$BUCKET_NAME/$S3_PATH"
else
    echo "❌ 上传失败"
    exit 1
fi 