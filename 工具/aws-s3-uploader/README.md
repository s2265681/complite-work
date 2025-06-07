# AWS S3 文件上传工具

这是一个用于将 `contact.groupV1-testWWWW.json` 文件上传到 AWS S3 的 Python 工具。

## 🚀 快速开始

### 一键安装和配置
```bash
# 1. 进入项目目录
cd 工具/aws-s3-uploader

# 2. 运行快速启动脚本
./quick_start.sh

# 3. 运行配置向导
python configure.py

# 4. 上传文件
python s3_uploader.py upload-contact
```

### 获取 AWS 密钥的简单步骤
1. 登录 [AWS 控制台](https://console.aws.amazon.com/)
2. 点击右上角你的用户名 → "我的安全证书"
3. 在"访问密钥"部分点击"创建访问密钥"
4. 选择"命令行界面 (CLI)" → 创建
5. **立即复制并保存** Access Key ID 和 Secret Access Key

### 配置密钥
运行配置向导，按提示输入密钥：
```bash
python configure.py
```

### 上传文件
```bash
python s3_uploader.py upload-contact
```

---

## 功能特性

- ✅ 支持 AWS 凭证配置（环境变量或 AWS CLI）
- ✅ 自动上传到指定的 S3 bucket 和路径
- ✅ 服务端加密支持
- ✅ 友好的命令行界面
- ✅ 文件列表查看功能
- ✅ 错误处理和状态反馈

## 安装步骤

### 1. 进入项目目录
```bash
cd 工具/aws-s3-uploader
```

### 2. 创建虚拟环境（推荐）
```bash
python3 -m venv venv
source venv/bin/activate  # macOS/Linux
# 或者在 Windows 上: venv\Scripts\activate
```

### 3. 安装依赖
```bash
pip install -r requirements.txt
```

## 配置 AWS 凭证

### 方法一：使用环境变量（推荐）

1. 复制环境变量示例文件：
```bash
cp env_example.txt .env
```

2. 编辑 `.env` 文件，填入你的 AWS 凭证：
```bash
# AWS 配置
AWS_ACCESS_KEY_ID=你的访问密钥ID
AWS_SECRET_ACCESS_KEY=你的秘密访问密钥
AWS_REGION=ap-southeast-1

# S3 配置
S3_BUCKET_NAME=kalowave.app.data-service
S3_PREFIX=configuration/production/config/
```

### 方法二：使用 AWS CLI（可选）

如果你已经配置了 AWS CLI，工具会自动使用这些凭证：
```bash
aws configure
```

## 使用方法

### 快捷上传 contact.groupV1-testWWWW.json

这是最常用的命令，专门用于上传 `contact.groupV1-testWWWW.json` 文件：

```bash
python s3_uploader.py upload-contact
```

**注意：** 确保 `contact.groupV1-testWWWW.json` 文件在当前工作目录中。

### 上传任意文件

```bash
python s3_uploader.py upload /path/to/your/file.json
```

### 上传文件到自定义 S3 路径

```bash
python s3_uploader.py upload /path/to/your/file.json --s3-key custom/path/file.json
```

### 查看 S3 bucket 中的文件

```bash
python s3_uploader.py rock-service-data
```

### 查看特定前缀的文件

```bash
python s3_uploader.py list --prefix config/
```

### 查看帮助

```bash
python s3_uploader.py --help
python s3_uploader.py upload --help
python s3_uploader.py list --help
```

## 使用示例

### 完整的使用流程

1. **准备文件**：确保 `contact.groupV1-testWWWW.json` 文件在当前目录
2. **配置凭证**：设置 `.env` 文件或配置 AWS CLI
3. **上传文件**：
   ```bash
   python s3_uploader.py upload-contact
   ```

### 输出示例

```
✅ 成功连接到 S3 bucket: kalowave.app.data-service
📤 正在上传文件: contact.groupV1-testWWWW.json
📍 目标位置: s3://kalowave.app.data-service/configuration/production/config/contact.groupV1-testWWWW.json
✅ 文件上传成功!
🔗 文件 URL: https://kalowave.app.data-service.s3.ap-southeast-1.amazonaws.com/configuration/production/config/contact.groupV1-testWWWW.json
```

## 目标 S3 配置

- **Bucket**: `kalowave.app.data-service`
- **区域**: `ap-southeast-1`
- **上传路径**: `configuration/production/config/`
- **最终文件路径**: `configuration/production/config/contact.groupV1-testWWWW.json`

## 错误处理

工具包含完善的错误处理机制：

- ❌ AWS 凭证未配置
- ❌ S3 bucket 不存在或无权限访问
- ❌ 本地文件不存在
- ❌ 网络连接问题

## 安全注意事项

1. **不要将 `.env` 文件提交到版本控制系统**
2. **使用最小权限原则配置 IAM 用户**
3. **定期轮换 AWS 访问密钥**
4. **文件会自动启用 AES256 服务端加密**

## 所需 AWS 权限

确保你的 AWS 用户或角色具有以下权限：

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:PutObjectAcl",
                "s3:GetObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::kalowave.app.data-service",
                "arn:aws:s3:::kalowave.app.data-service/*"
            ]
        }
    ]
}
```

## 故障排除

### 常见问题

1. **"未找到 AWS 凭证"**
   - 检查 `.env` 文件是否正确配置
   - 或者运行 `aws configure` 配置 AWS CLI

2. **"S3 bucket 不存在"**
   - 确认 bucket 名称正确
   - 检查 AWS 区域设置

3. **"没有访问权限"**
   - 检查 IAM 用户权限
   - 确认 bucket 策略允许访问

4. **"本地文件不存在"**
   - 确认文件路径正确
   - 检查文件名拼写

## 开发者信息

- 支持 Python 3.7+
- 使用 boto3 AWS SDK
- 基于 Click 命令行框架 


🚀 现在你可以直接开始使用
```js
# 1. 确保在正确的目录（你已经在了）
cd 工具/aws-s3-uploader

# 2. 安装依赖（如果还没安装）
./quick_start.sh

# 3. 从 CSV 文件配置 AWS 凭证
python3 configure_from_csv.py

# 4. 上传文件
python s3_uploader.py upload-contact
```


<!-- 修改路径 -->

https://ap-southeast-1.console.aws.amazon.com/s3/object/kalowave.app.data-service?region=ap-southeast-1&bucketType=general&prefix=configuration/production/config/contact.groupV1.json 

改为

https://ap-southeast-2.console.aws.amazon.com/s3/buckets/rock-service-data?region=ap-southeast-2&tab=objects&bucketType=general

