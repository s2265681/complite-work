# 🚀 快速开始 - 使用 CSV 文件配置

## 📋 适用情况

✅ 你遇到了 "您没有执行此操作的权限" 错误  
✅ 管理员已经为你提供了访问密钥的 CSV 文件  
✅ 你需要快速上传 `contact.groupV1-testWWWW.json` 文件到 S3  

## ⚡ 三步完成配置

### 第一步：准备 CSV 文件
```bash
# 将管理员提供的 CSV 文件放在项目目录
# 文件名通常类似：accessKeys.csv, credentials.csv 等
cp /path/to/your/credentials.csv 工具/aws-s3-uploader/
```

### 第二步：安装依赖
```bash
cd 工具/aws-s3-uploader
./quick_start.sh
```

### 第三步：配置和上传
```bash
# 从 CSV 文件配置
python configure_from_csv.py

# 上传文件
python s3_uploader.py upload-contact
```

## 📄 CSV 文件格式

你的 CSV 文件应该包含以下列：

```csv
User name,Access key ID,Secret access key,Console password
your-username,AKIA...,wJalrXUt...,password123
```

**支持的列名变体：**
- Access key ID / Access_key_ID / AccessKeyID
- Secret access key / Secret_access_key / SecretAccessKey
- User name / Username / User

## 🎯 完整示例

```bash
# 1. 进入项目目录
cd 工具/aws-s3-uploader

# 2. 确保 CSV 文件在当前目录
ls *.csv

# 3. 运行配置向导
python configure_from_csv.py
# 输出示例：
# 🔧 AWS S3 上传工具 - CSV 配置向导
# ✅ 找到 1 个 CSV 文件：
#    1. credentials.csv
# 使用找到的文件 'credentials.csv'？(Y/n): y
# ✅ 成功读取访问密钥！
# ✅ 成功连接到 S3 bucket: kalowave.app.data-service

# 4. 上传文件
python s3_uploader.py upload-contact
# 输出示例：
# ✅ 成功连接到 S3 bucket: kalowave.app.data-service
# 📤 正在上传文件: contact.groupV1-testWWWW.json
# ✅ 文件上传成功!
```

## ❌ 常见问题快速解决

### 问题 1：找不到 CSV 文件
```bash
# 检查文件是否在当前目录
ls -la *.csv

# 如果不在，复制到当前目录
cp /path/to/your/file.csv .
```

### 问题 2：CSV 文件格式不对
```bash
# 查看文件内容
head -n 2 your-file.csv

# 确保包含 Access key ID 和 Secret access key 列
```

### 问题 3：权限不足 (403 错误)
```
❌ 没有访问 S3 bucket 'kalowave.app.data-service' 的权限
💡 请联系管理员确认以下权限：
   - s3:PutObject
   - s3:ListBucket
   - s3:GetBucketLocation
```
**解决方案**：联系管理员添加必要的 S3 权限

### 问题 4：文件编码问题
```bash
# 如果遇到编码错误，尝试转换文件编码
iconv -f gbk -t utf-8 your-file.csv > utf8-file.csv
```

## 🔒 安全提醒

1. **使用后删除 CSV 文件**：
   ```bash
   rm credentials.csv  # 配置完成后删除
   ```

2. **检查 .env 文件**：
   ```bash
   cat .env  # 确认配置正确
   ```

3. **不要提交敏感文件**：
   - CSV 文件不要提交到 Git
   - .env 文件已在 .gitignore 中

## 🎉 完成！

现在你可以随时上传文件：

```bash
# 上传 contact.groupV1-testWWWW.json
python s3_uploader.py upload-contact

# 查看已上传的文件
python s3_uploader.py list

# 上传其他文件
python s3_uploader.py upload other-file.json
```

**目标位置**：`s3://kalowave.app.data-service/configuration/production/config/contact.groupV1-testWWWW.json`

如有问题，请查看 `使用说明.md` 或联系技术支持。 