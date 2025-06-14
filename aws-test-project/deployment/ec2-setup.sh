#!/bin/bash

# EC2 实例设置脚本

# 更新系统
sudo yum update -y

# 安装 Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 16

# 安装 PM2
npm install -g pm2

# 安装 Nginx
sudo amazon-linux-extras install nginx1 -y
sudo systemctl start nginx
sudo systemctl enable nginx

# 配置 Nginx
sudo tee /etc/nginx/conf.d/default.conf << EOF
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# 重启 Nginx
sudo systemctl restart nginx

# 创建应用目录
sudo mkdir -p /var/www/backend
sudo chown -R ec2-user:ec2-user /var/www/backend

# 设置 PM2 开机自启
pm2 startup
sudo env PATH=$PATH:/home/ec2-user/.nvm/versions/node/v16.20.0/bin /home/ec2-user/.nvm/versions/node/v16.20.0/lib/node_modules/pm2/bin/pm2 startup systemd -u ec2-user --hp /home/ec2-user

echo "EC2 实例设置完成！" 