# AWS Full-Stack 项目

这是一个完整的前后端项目，部署在AWS云平台上。

## 项目结构

```
aws-test-project/
├── frontend/          # React + TypeScript 前端应用
├── backend/           # Node.js + Express 后端API
├── deployment/        # AWS部署配置文件
├── docs/             # 项目文档
└── README.md         # 项目说明
```

## 技术栈

### 前端
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Axios

### 后端
- Node.js
- Express
- TypeScript
- PostgreSQL
- JWT认证

### AWS服务
- EC2 (后端服务器)
- S3 + CloudFront (前端静态文件)
- RDS PostgreSQL (数据库)
- Route 53 (域名管理)
- ALB (负载均衡)
- VPC (网络)

## 快速开始

1. 安装依赖
```bash
cd frontend && npm install
cd ../backend && npm install
```

2. 配置环境变量
```bash
cp backend/.env.example backend/.env
# 编辑.env文件配置数据库等信息
```

3. 启动开发环境
```bash
# 启动后端
cd backend && npm run dev

# 启动前端
cd frontend && npm run dev
```

## AWS部署指南

详细的AWS部署步骤请查看 `docs/aws-deployment-guide.md`

## 功能特性

- 用户注册/登录
- JWT身份验证
- RESTful API
- 响应式设计
- 数据持久化
- 云端部署 