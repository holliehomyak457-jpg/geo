# GlobalAI - 跨境电商AI平台曝光优化服务网站

## 项目简介

GlobalAI 是一个专为跨境电商和外贸企业设计的AI平台曝光优化服务网站。我们帮助中国企业在全球AI平台上通过关键词优化提升品牌和产品曝光率，成为AI时代下中国企业出海品牌排名曝光的最佳助手。

![GlobalAI 网站预览](https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/35000b2664b245308819585235744f5f~tplv-a9rns2rl98-image.image?rcl=20251024150131D1133383A0624C7C5444&rk3s=8e244e95&rrcfp=f06b921b&x-expires=1763881356&x-signature=9FwR0%!B(MISSING)U44v%!F(MISSING)6%!B(MISSING)cB0%!D(MISSING))

## 核心功能

- **GEO服务**：生成式引擎优化，提升品牌在AI平台上的可见度和引用率
- **关键词搜索优化**：基于AI搜索趋势，制定有效的关键词策略
- **品牌曝光排名**：全面提升企业品牌在AI平台生态中的整体曝光度
- **AI平台分析工具**：深入分析主流AI平台的搜索趋势和用户行为

## 技术栈

- HTML5 + CSS3 + JavaScript
- Tailwind CSS v3
- Font Awesome
- Chart.js
- GSAP (动画效果)

## 快速开始

### 本地开发

1. **克隆项目**
   ```bash
   git clone https://github.com/yourusername/globalai_exposure.git
   cd globalai_exposure
   ```

2. **启动本地服务器**
   ```bash
   # 使用 Python 简单服务器
   python -m http.server 8000
   
   # 或使用 Node.js http-server
   npm install -g http-server
   http-server
   ```

3. **访问网站**
   打开浏览器访问: `http://localhost:8000`

## 部署指南

### 推荐部署方法 (Vercel)

1. **安装 Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **部署**
   ```bash
   # 进入项目目录
   cd /path/to/globalai_exposure
   
   # 部署到 Vercel
   vercel
   
   # 部署到生产环境
   vercel --prod
   ```

### 其他部署选项

详细的部署指南请参考 [DEPLOYMENT.md](DEPLOYMENT.md) 文件，其中包含:

- 静态网站托管 (Vercel, Netlify, GitHub Pages)
- 云服务提供商 (AWS S3, Google Cloud Storage)
- 自托管服务器 (Nginx, Apache)
- Docker 容器化部署

## 项目结构

```
globalai_exposure/
├── index.html          # 网站主页
├── assets/             # 静态资源
│   ├── images/         # 图片资源
│   └── js/             # JavaScript 文件
├── DEPLOYMENT.md       # 部署指南
└── README.md           # 项目说明
```

## 自定义与扩展

### 修改颜色方案

编辑 `index.html` 中的 Tailwind 配置:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#D4AF37', // 金色作为主色调
                secondary: '#B0C4DE', // 银色作为辅助色
                // 其他颜色...
            }
        }
    }
}
```

### 添加新页面

1. 创建新的 HTML 文件 (例如 `services.html`)
2. 复制 `index.html` 的基础结构
3. 修改内容并保持一致的设计风格
4. 更新导航链接

### 集成新功能

1. 在 `assets/js/` 目录下创建新的 JavaScript 文件
2. 在 HTML 中引入新文件
3. 遵循现有代码风格和模式

## 浏览器兼容性

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 许可证

© 2025 GlobalAI. 保留所有权利。

## 联系方式

- 网站: https://www.globalai.com
- 邮箱: contact@globalai.com
- 电话: +86 10 8888 8888
- 地址: 北京市朝阳区建国路88号SOHO现代城5号楼25层
