# DryVocal Docusaurus Docker 部署指南

本项目提供了完整的Docker化部署方案，支持开发和生产环境，包含多种部署模式和监控功能。

## 📁 文件说明

- `Dockerfile` - 多阶段构建的Docker镜像文件
- `docker-compose.yml` - Docker Compose配置文件
- `nginx.conf` - Nginx配置文件（用于容器内）
- `nginx-proxy.conf` - Nginx反向代理配置
- `.dockerignore` - Docker构建忽略文件
- `docker-scripts.sh` - Linux/Mac部署脚本
- `docker-scripts.bat` - Windows部署脚本

## 🌍 多语言支持

本项目支持以下语言：
- **中文** (zh-Hans) - 默认语言
- **英文** (en) - 国际用户
- **日文** (ja) - 日本用户
- **韩文** (ko) - 韩国用户

### 自动语言检测
- 根据浏览器语言自动跳转到对应语言版本
- 支持 Accept-Language 头检测
- 默认回退到英文版本

## 🚀 快速开始

### 方法一：使用Docker Compose（推荐）

```bash
# 启动基础服务（多语言支持）
docker-compose up -d

# 启动with nginx代理（多语言路由）
docker-compose --profile proxy up -d

# 启动with Traefik代理
docker-compose --profile traefik up -d

# 启动with监控
docker-compose --profile monitoring up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

### 方法二：使用部署脚本

#### Linux/Mac:
```bash
# 给脚本执行权限
chmod +x docker-scripts.sh

# 构建多语言镜像
./docker-scripts.sh build

# 启动基础服务（支持多语言）
./docker-scripts.sh start

# 启动with nginx代理
./docker-scripts.sh start-proxy

# 启动with Traefik代理
./docker-scripts.sh start-traefik

# 启动with监控
./docker-scripts.sh start-monitoring

# 查看日志
./docker-scripts.sh logs

# 查看状态
./docker-scripts.sh status

# 停止服务
./docker-scripts.sh stop
```

#### Windows:
```cmd
# 构建镜像
docker-scripts.bat build

# 启动基础服务
docker-scripts.bat start

# 启动with nginx代理
docker-scripts.bat start-proxy

# 启动with Traefik代理
docker-scripts.bat start-traefik

# 启动with监控
docker-scripts.bat start-monitoring

# 查看日志
docker-scripts.bat logs

# 查看状态
docker-scripts.bat status

# 停止服务
docker-scripts.bat stop
```

### 方法三：手动Docker命令

```bash
# 构建镜像
docker build -t removeui-docusaurus .

# 运行容器
docker run -d \
  --name removeui-docusaurus \
  -p 3000:3000 \
  --restart unless-stopped \
  removeui-docusaurus

# 查看日志
docker logs -f removeui-docusaurus

# 停止容器
docker stop removeui-docusaurus
docker rm removeui-docusaurus
```

## 🔧 配置说明

### 端口配置
- 默认端口：3000
- 可在 `docker-compose.yml` 中修改端口映射

### 环境变量
- `NODE_ENV=production` - 生产环境模式

### 健康检查
- 检查端点：`http://localhost:3000/health`
- 检查间隔：30秒
- 超时时间：3秒

## 📊 性能优化

### 多阶段构建
- 构建阶段：使用Node.js Alpine镜像
- 运行阶段：使用Nginx Alpine镜像
- 镜像大小优化：约50MB

### Nginx配置
- Gzip压缩
- 静态资源缓存
- 安全头设置
- SPA路由支持

### 缓存策略
- HTML文件：不缓存
- CSS/JS文件：长期缓存
- 图片文件：长期缓存

## 🛡️ 安全特性

- 非root用户运行
- 安全头设置
- 文件权限控制
- 健康检查机制

## 📝 常用命令

### 开发环境
```bash
# 启动开发服务器
npm start

# 构建项目
npm run build
```

### 生产环境
```bash
# 构建并启动
docker-compose up -d --build

# 查看服务状态
docker-compose ps

# 重启服务
docker-compose restart

# 清理资源
docker-compose down --volumes --remove-orphans
```

## 🔍 故障排除

### 常见问题

1. **端口被占用**
   ```bash
   # 查看端口占用
   netstat -tulpn | grep :3000
   
   # 修改端口
   # 编辑 docker-compose.yml 中的端口映射
   ```

2. **容器启动失败**
   ```bash
   # 查看容器日志
   docker logs removeui-docusaurus
   
   # 检查镜像构建
   docker images | grep removeui
   ```

3. **权限问题**
   ```bash
   # 给脚本执行权限
   chmod +x docker-scripts.sh
   ```

### 日志查看
```bash
# 查看所有服务日志
docker-compose logs

# 查看特定服务日志
docker-compose logs docusaurus

# 实时查看日志
docker-compose logs -f
```

## 🌐 访问地址

### 基础服务
- 本地访问：http://localhost:3000
- 健康检查：http://localhost:3000/health

### nginx代理模式
- HTTP访问：http://localhost:80
- HTTPS访问：https://localhost:443 (需要SSL证书)

### Traefik代理模式
- 网站访问：http://localhost:80
- Traefik仪表板：http://localhost:8080

### 监控模式
- Prometheus：http://localhost:9090
- Grafana：http://localhost:3001 (用户名: admin, 密码: admin123)

## 📦 镜像信息

- 基础镜像：node:20-alpine
- 运行镜像：nginx:1.25-alpine
- 最终镜像大小：约60MB
- 支持架构：amd64, arm64
- 时区设置：Asia/Shanghai
- 安全特性：非root用户运行
- **多语言支持**：中文、英文、日文、韩文
- **自动语言检测**：基于浏览器语言设置

## 🔄 更新部署

```bash
# 拉取最新代码
git pull

# 重新构建并部署
docker-compose up -d --build

# 或者使用脚本
./docker-scripts.sh restart
```

## 🌍 多语言部署说明

### 语言路径映射
- **中文版**: `/` (默认)
- **英文版**: `/en/`
- **日文版**: `/ja/`
- **韩文版**: `/ko/`

### 自动语言检测
1. **浏览器语言检测**: 基于 `Accept-Language` 头
2. **客户端检测**: JavaScript 检测 `navigator.language`
3. **回退机制**: 不支持的语言自动跳转到英文版

### 多语言构建
```bash
# 生成翻译文件
npm run write-translations

# 构建多语言版本
npm run build

# Docker构建（自动包含多语言）
docker build -t dryvocal-docusaurus .
```

### 环境变量
```yaml
environment:
  - DEFAULT_LOCALE=zh-Hans
  - SUPPORTED_LOCALES=zh-Hans,en,ja,ko
  - AUTO_LANGUAGE_DETECTION=true
```

## 📞 支持

如果遇到问题，请检查：
1. Docker和Docker Compose是否正确安装
2. 端口3000是否被占用
3. 防火墙设置是否正确
4. 查看容器日志获取详细错误信息
5. **多语言问题**: 检查翻译文件是否正确生成