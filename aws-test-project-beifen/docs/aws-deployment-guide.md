# AWS 部署指南

本文档详细说明了如何将项目部署到 AWS 云平台。

## 部署架构

```
用户 -> Route 53 -> CloudFront -> S3 (前端静态文件)
                -> ALB -> EC2 (后端服务)
                -> RDS (数据库)
```

## 部署步骤

### 1. 前端部署

1. 构建前端项目
```bash
cd frontend
npm run build
```

2. 创建 S3 存储桶
- 登录 AWS Console
- 进入 S3 服务
- 创建新的存储桶
- 配置静态网站托管
- 设置 CORS 策略

3. 配置 CloudFront
- 创建新的 CloudFront 分发
- 选择 S3 存储桶作为源
- 配置 SSL 证书
- 设置缓存策略

### 2. 后端部署

1. 准备 EC2 实例
- 创建 EC2 实例
- 配置安全组
- 安装 Node.js 和 PM2

2. 配置 RDS
- 创建 PostgreSQL 数据库实例
- 配置安全组
- 设置数据库参数

3. 部署后端代码
```bash
cd backend
npm run build
pm2 start ecosystem.config.js
```

### 3. 网络配置

1. 配置 VPC
- 创建 VPC
- 配置子网
- 设置路由表

2. 配置 ALB
- 创建应用负载均衡器
- 配置目标组
- 设置健康检查

3. 配置 Route 53
- 创建托管区域
- 添加 A 记录
- 配置 SSL 证书

## 环境变量配置

### 前端环境变量
```env
VITE_API_URL=https://api.yourdomain.com
```

### 后端环境变量
```env
PORT=3000
NODE_ENV=production
DB_HOST=your-rds-endpoint
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=your-db-name
JWT_SECRET=your-jwt-secret
```

## 监控和维护

1. 设置 CloudWatch 告警
2. 配置日志收集
3. 设置自动备份
4. 配置自动扩展

## 安全配置

1. 配置 WAF
2. 设置安全组规则
3. 启用 AWS Shield
4. 配置 IAM 角色和策略

## 故障排除

常见问题及解决方案请参考 `docs/troubleshooting.md` 