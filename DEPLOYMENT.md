# GlobalAI 网站部署指南

## 概述

本指南提供了多种部署 GlobalAI 跨境电商AI平台曝光优化服务网站的方法，从简单的静态托管到更复杂的云服务部署。

## 前置条件

- 已完成网站开发并通过测试
- 拥有一个域名（可选，但推荐）
- 基本的终端/命令行操作能力

## 部署选项

### 选项 1: 静态网站托管 (推荐)

#### 1.1 Vercel (最简单)

1. **准备工作**
   - 创建 Vercel 账户: https://vercel.com
   - 安装 Vercel CLI:
     ```bash
     npm install -g vercel
     ```

2. **部署步骤**
   ```bash
   # 进入项目目录
   cd /path/to/globalai_exposure
   
   # 部署到 Vercel
   vercel
   
   # 如果需要部署到生产环境
   vercel --prod
   ```

3. **自定义域名**
   - 在 Vercel 控制台中，为你的项目添加自定义域名
   - 根据提示更新 DNS 设置

#### 1.2 Netlify

1. **准备工作**
   - 创建 Netlify 账户: https://www.netlify.com
   - 安装 Netlify CLI (可选):
     ```bash
     npm install -g netlify-cli
     ```

2. **部署步骤**
   ```bash
   # 进入项目目录
   cd /path/to/globalai_exposure
   
   # 使用 CLI 部署
   netlify deploy
   
   # 部署到生产环境
   netlify deploy --prod
   ```

3. **或使用 Git 集成**
   - 将代码推送到 GitHub/GitLab/Bitbucket
   - 在 Netlify 中连接你的仓库
   - 配置构建命令: `npm run build` (如果需要)
   - 配置发布目录: `.` (根目录)

#### 1.3 GitHub Pages

1. **准备工作**
   - 创建 GitHub 仓库
   - 将代码推送到仓库

2. **部署步骤**
   ```bash
   # 安装 gh-pages 工具
   npm install -g gh-pages
   
   # 部署
   gh-pages -d .
   ```

3. **配置**
   - 在 GitHub 仓库设置中启用 GitHub Pages
   - 选择 `gh-pages` 分支

### 选项 2: 云服务提供商

#### 2.1 AWS S3 + CloudFront

1. **创建 S3 存储桶**
   - 登录 AWS 控制台
   - 创建新的 S3 存储桶，名称与你的域名匹配
   - 启用静态网站托管

2. **上传文件**
   ```bash
   # 使用 AWS CLI 上传文件
   aws s3 sync /path/to/globalai_exposure s3://your-bucket-name --delete
   ```

3. **配置 CloudFront (可选)**
   - 创建 CloudFront 分发
   - 源指向你的 S3 存储桶
   - 配置 HTTPS 和缓存策略

#### 2.2 Google Cloud Storage

1. **创建存储桶**
   ```bash
   # 使用 gcloud CLI 创建存储桶
   gsutil mb -p your-project-id -c standard -l us-central1 gs://your-bucket-name/
   ```

2. **上传文件**
   ```bash
   gsutil -m rsync -r /path/to/globalai_exposure gs://your-bucket-name
   ```

3. **启用网站托管**
   ```bash
   gsutil web set -m index.html gs://your-bucket-name
   ```

### 选项 3: 自托管服务器

#### 3.1 Nginx

1. **安装 Nginx**
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install nginx
   
   # CentOS/RHEL
   sudo yum install nginx
   ```

2. **配置 Nginx**
   创建配置文件 `/etc/nginx/sites-available/globalai`:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com www.your-domain.com;
       
       root /var/www/globalai_exposure;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
           expires 1d;
       }
       
       location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
           expires 7d;
           add_header Cache-Control "public, max-age=604800";
       }
   }
   ```

3. **启用配置**
   ```bash
   sudo ln -s /etc/nginx/sites-available/globalai /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

4. **上传文件**
   ```bash
   scp -r /path/to/globalai_exposure user@your-server-ip:/var/www/
   ```

#### 3.2 Apache

1. **安装 Apache**
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install apache2
   
   # CentOS/RHEL
   sudo yum install httpd
   ```

2. **配置 Apache**
   创建配置文件 `/etc/apache2/sites-available/globalai.conf`:
   ```apache
   <VirtualHost *:80>
       ServerName your-domain.com
       ServerAlias www.your-domain.com
       
       DocumentRoot /var/www/globalai_exposure
       
       <Directory /var/www/globalai_exposure>
           Options Indexes FollowSymLinks
           AllowOverride All
           Require all granted
       </Directory>
       
       ErrorLog ${APACHE_LOG_DIR}/globalai_error.log
       CustomLog ${APACHE_LOG_DIR}/globalai_access.log combined
   </VirtualHost>
   ```

3. **启用配置**
   ```bash
   sudo a2ensite globalai.conf
   sudo a2enmod rewrite
   sudo systemctl restart apache2
   ```

4. **上传文件**
   ```bash
   scp -r /path/to/globalai_exposure user@your-server-ip:/var/www/
   ```

### 选项 4: Docker 容器化部署

1. **创建 Dockerfile**
   在项目根目录创建 `Dockerfile`:
   ```dockerfile
   FROM nginx:alpine
   COPY . /usr/share/nginx/html
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **构建镜像**
   ```bash
   docker build -t globalai-website .
   ```

3. **运行容器**
   ```bash
   docker run -d -p 80:80 --name globalai-site globalai-website
   ```

4. **使用 Docker Compose (可选)**
   创建 `docker-compose.yml`:
   ```yaml
   version: '3'
   services:
     web:
       build: .
       ports:
         - "80:80"
       volumes:
         - ./:/usr/share/nginx/html
       restart: always
   ```

   启动容器:
   ```bash
   docker-compose up -d
   ```

## 部署后检查清单

- [ ] 验证网站是否正常加载
- [ ] 检查所有链接是否正常工作
- [ ] 测试表单提交功能
- [ ] 验证响应式设计在不同设备上的表现
- [ ] 检查控制台是否有错误
- [ ] 配置 HTTPS (推荐)
- [ ] 设置备份策略

## 进阶配置

### 配置 HTTPS

大多数托管平台提供免费的 SSL 证书:

1. **Vercel/Netlify**: 自动配置 HTTPS
2. **AWS**: 使用 ACM 证书配合 CloudFront
3. **自托管**: 使用 Let's Encrypt
   ```bash
   # 使用 Certbot
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```

### 性能优化

1. **启用 Gzip/Brotli 压缩**
2. **配置缓存策略**
3. **图片优化**
4. **使用 CDN 分发静态资源**

### 监控与分析

1. **添加 Google Analytics**
2. **设置 Sentry 错误监控**
3. **配置服务器监控 (如 Prometheus + Grafana)**

## 常见问题

### Q: 网站加载缓慢怎么办?

A: 
1. 优化图片大小和格式
2. 启用压缩
3. 使用 CDN
4. 检查是否有未优化的 JavaScript

### Q: 部署后样式错乱?

A:
1. 检查文件路径是否正确
2. 清除浏览器缓存
3. 确保 CSS/JS 文件正确加载

### Q: 表单提交不工作?

A:
1. 检查表单处理逻辑
2. 确保服务器配置正确处理表单提交
3. 检查跨域设置 (CORS)

## 联系支持

如果遇到部署问题，请联系我们的技术支持团队:
- 邮箱: support@globalai.com
- 电话: +86 10 8888 8888

---

© 2025 GlobalAI. 保留所有权利。
