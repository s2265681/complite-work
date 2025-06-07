#!/bin/bash

# AWS S3 文件上传脚本
# 使用说明: ./aws_upload.sh [选项] <本地文件路径> [S3路径]

set -e  # 遇到错误时退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 默认配置
DEFAULT_BUCKET="rock-service-data"
DEFAULT_REGION="ap-southeast-2"
DEFAULT_PROFILE="default"

# 显示帮助信息
show_help() {
    echo -e "${BLUE}AWS S3 文件上传脚本${NC}"
    echo ""
    echo "使用方法:"
    echo "  $0 [选项] <本地文件路径> [S3路径]"
    echo ""
    echo "选项:"
    echo "  -b, --bucket BUCKET     指定S3存储桶名称"
    echo "  -r, --region REGION     指定AWS区域 (默认: us-east-1)"
    echo "  -p, --profile PROFILE   指定AWS配置文件 (默认: default)"
    echo "  -a, --acl ACL          设置文件访问权限 (private|public-read|public-read-write)"
    echo "  -t, --content-type TYPE 设置文件MIME类型"
    echo "  -m, --metadata KEY=VALUE 添加元数据"
    echo "  -d, --dry-run          仅显示将要执行的命令，不实际上传"
    echo "  -v, --verbose          显示详细输出"
    echo "  -h, --help             显示此帮助信息"
    echo ""
    echo "示例:"
    echo "  $0 -b my-bucket file.txt"
    echo "  $0 -b my-bucket -a public-read image.jpg images/"
    echo "  $0 -b my-bucket -t 'application/json' data.json data/"
    echo "  $0 -v -b my-bucket document.pdf documents/backup/"
    echo ""
    echo "环境变量:"
    echo "  AWS_DEFAULT_BUCKET     默认S3存储桶"
    echo "  AWS_DEFAULT_REGION     默认AWS区域"
    echo "  AWS_PROFILE           默认AWS配置文件"
}

# 日志函数
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1" >&2
}

log_debug() {
    if [[ "$VERBOSE" == "true" ]]; then
        echo -e "${BLUE}[DEBUG]${NC} $1"
    fi
}

# 检查AWS CLI是否安装
check_aws_cli() {
    if ! command -v aws &> /dev/null; then
        log_error "AWS CLI 未安装。请先安装 AWS CLI。"
        echo "安装方法: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
        exit 1
    fi
    log_debug "AWS CLI 已安装: $(aws --version)"
}

# 检查AWS配置
check_aws_config() {
    if ! aws sts get-caller-identity --profile "$PROFILE" &> /dev/null; then
        log_error "AWS 配置无效或未配置。请运行 'aws configure' 进行配置。"
        exit 1
    fi
    
    local identity=$(aws sts get-caller-identity --profile "$PROFILE" --output text --query 'Account')
    log_debug "使用AWS账户: $identity"
}

# 检查存储桶是否存在
check_bucket() {
    local bucket=$1
    if ! aws s3api head-bucket --bucket "$bucket" --profile "$PROFILE" 2>/dev/null; then
        log_error "存储桶 '$bucket' 不存在或无访问权限"
        exit 1
    fi
    log_debug "存储桶 '$bucket' 验证成功"
}

# 获取文件MIME类型
get_content_type() {
    local file=$1
    if command -v file &> /dev/null; then
        file --mime-type -b "$file"
    else
        echo "application/octet-stream"
    fi
}

# 格式化文件大小
format_size() {
    local size=$1
    if [[ $size -lt 1024 ]]; then
        echo "${size}B"
    elif [[ $size -lt 1048576 ]]; then
        echo "$(( size / 1024 ))KB"
    elif [[ $size -lt 1073741824 ]]; then
        echo "$(( size / 1048576 ))MB"
    else
        echo "$(( size / 1073741824 ))GB"
    fi
}

# 上传文件
upload_file() {
    local local_file=$1
    local s3_path=$2
    
    # 检查本地文件
    if [[ ! -f "$local_file" ]]; then
        log_error "文件 '$local_file' 不存在"
        exit 1
    fi
    
    # 获取文件信息
    local file_size=$(stat -f%z "$local_file" 2>/dev/null || stat -c%s "$local_file" 2>/dev/null)
    local formatted_size=$(format_size $file_size)
    
    # 构建S3 URI
    local s3_uri="s3://$BUCKET/$s3_path"
    
    # 构建AWS CLI命令
    local cmd="aws s3 cp \"$local_file\" \"$s3_uri\""
    
    # 添加选项
    if [[ -n "$REGION" ]]; then
        cmd="$cmd --region $REGION"
    fi
    
    if [[ -n "$PROFILE" ]]; then
        cmd="$cmd --profile $PROFILE"
    fi
    
    if [[ -n "$ACL" ]]; then
        cmd="$cmd --acl $ACL"
    fi
    
    if [[ -n "$CONTENT_TYPE" ]]; then
        cmd="$cmd --content-type \"$CONTENT_TYPE\""
    elif [[ "$AUTO_CONTENT_TYPE" == "true" ]]; then
        local auto_type=$(get_content_type "$local_file")
        cmd="$cmd --content-type \"$auto_type\""
        log_debug "自动检测MIME类型: $auto_type"
    fi
    
    if [[ -n "$METADATA" ]]; then
        cmd="$cmd --metadata $METADATA"
    fi
    
    # 显示上传信息
    log_info "准备上传文件:"
    echo "  本地文件: $local_file ($formatted_size)"
    echo "  目标位置: $s3_uri"
    echo "  存储桶:   $BUCKET"
    echo "  区域:     $REGION"
    echo "  配置文件: $PROFILE"
    
    if [[ -n "$ACL" ]]; then
        echo "  访问权限: $ACL"
    fi
    
    # 干运行模式
    if [[ "$DRY_RUN" == "true" ]]; then
        log_warn "干运行模式 - 将要执行的命令:"
        echo "$cmd"
        return 0
    fi
    
    # 执行上传
    log_info "开始上传..."
    if eval "$cmd"; then
        log_info "上传成功! 🎉"
        echo "文件已上传到: $s3_uri"
        
        # 如果是公开读取，显示URL
        if [[ "$ACL" == "public-read" ]]; then
            local public_url="https://$BUCKET.s3.$REGION.amazonaws.com/$s3_path"
            echo "公开访问URL: $public_url"
        fi
    else
        log_error "上传失败"
        exit 1
    fi
}

# 主函数
main() {
    # 初始化变量
    local local_file=""
    local s3_path=""
    BUCKET="${AWS_DEFAULT_BUCKET:-$DEFAULT_BUCKET}"
    REGION="${AWS_DEFAULT_REGION:-$DEFAULT_REGION}"
    PROFILE="${AWS_PROFILE:-$DEFAULT_PROFILE}"
    ACL=""
    CONTENT_TYPE=""
    METADATA=""
    DRY_RUN="false"
    VERBOSE="false"
    AUTO_CONTENT_TYPE="true"
    
    # 解析命令行参数
    while [[ $# -gt 0 ]]; do
        case $1 in
            -h|--help)
                show_help
                exit 0
                ;;
            -b|--bucket)
                BUCKET="$2"
                shift 2
                ;;
            -r|--region)
                REGION="$2"
                shift 2
                ;;
            -p|--profile)
                PROFILE="$2"
                shift 2
                ;;
            -a|--acl)
                ACL="$2"
                shift 2
                ;;
            -t|--content-type)
                CONTENT_TYPE="$2"
                AUTO_CONTENT_TYPE="false"
                shift 2
                ;;
            -m|--metadata)
                METADATA="$2"
                shift 2
                ;;
            -d|--dry-run)
                DRY_RUN="true"
                shift
                ;;
            -v|--verbose)
                VERBOSE="true"
                shift
                ;;
            -*)
                log_error "未知选项: $1"
                show_help
                exit 1
                ;;
            *)
                if [[ -z "$local_file" ]]; then
                    local_file="$1"
                elif [[ -z "$s3_path" ]]; then
                    s3_path="$1"
                else
                    log_error "过多的参数: $1"
                    show_help
                    exit 1
                fi
                shift
                ;;
        esac
    done
    
    # 检查必需参数
    if [[ -z "$local_file" ]]; then
        log_error "请指定要上传的本地文件"
        show_help
        exit 1
    fi
    
    if [[ -z "$BUCKET" ]]; then
        log_error "请指定S3存储桶名称 (使用 -b 选项或设置 AWS_DEFAULT_BUCKET 环境变量)"
        show_help
        exit 1
    fi
    
    # 如果未指定S3路径，使用文件名
    if [[ -z "$s3_path" ]]; then
        s3_path=$(basename "$local_file")
    fi
    
    # 执行检查
    check_aws_cli
    check_aws_config
    check_bucket "$BUCKET"
    
    # 上传文件
    upload_file "$local_file" "$s3_path"
}

# 运行主函数
main "$@" 