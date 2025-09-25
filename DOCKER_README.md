# DryVocal网站 Docker 部署指南

本文档介绍如何使用Docker部署DryVocal网站。

## 📋 文件说明

- `Dockerfile` - Docker镜像构建文件
- `docker-compose.yml` - Docker Compose配置文件
- `nginx.conf` - Nginx配置文件
- `.dockerignore` - Docker构建忽略文件
- `docker-scripts.sh` - Linux/Mac管理脚本
- `docker-scripts.bat` - Windows管理脚本

## 🚀 快速开始

### 方法一：使用Docker Compose（推荐）

```bash
# 构建并启动服务
docker-compose up -d --build

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

### 方法二：使用Docker命令

```bash
# 构建镜像
docker build -t dryvocal-site:latest .

# 运行容器
docker run -d --name dryvocal-website -p 3000:3000 --restart unless-stopped dryvocal-site:latest

# 查看容器状态
docker ps

# 查看日志
docker logs -f dryvocal-website

# 停止容器
docker stop dryvocal-website
docker rm dryvocal-website
```

### 方法三：使用管理脚本

#### Windows用户
```cmd
# 构建镜像
docker-scripts.bat build

# 启动服务
docker-scripts.bat compose

# 查看日志
docker-scripts.bat logs

# 停止服务
docker-scripts.bat stop

# 查看状态
docker-scripts.bat status

# 清理资源
docker-scripts.bat cleanup
```

#### Linux/Mac用户
```bash
# 给脚本添加执行权限
chmod +x docker-scripts.sh

# 构建镜像
./docker-scripts.sh build

# 启动服务
./docker-scripts.sh compose

# 查看日志
./docker-scripts.sh logs

# 停止服务
./docker-scripts.sh stop

# 查看状态
./docker-scripts.sh status

# 清理资源
./docker-scripts.sh cleanup
```

## 🌐 访问网站

服务启动后，可以通过以下地址访问网站：
- **本地访问**: http://localhost:3000
- **健康检查**: http://localhost:3000/health

## 📊 服务配置

### 端口配置
- **容器端口**: 3000
- **主机端口**: 3000
- **协议**: HTTP

### 环境变量
- `NODE_ENV=production` - 生产环境模式

### 健康检查
- **检查间隔**: 30秒
- **超时时间**: 10秒
- **重试次数**: 3次
- **启动等待**: 40秒

## 🔧 高级配置

### 修改端口
如果需要修改端口，可以编辑以下文件：

1. **docker-compose.yml**:
```yaml
ports:
  - "8080:3000"  # 将主机端口改为8080
```

2. **nginx.conf**:
```nginx
server {
    listen 3000;  # 容器内部端口保持不变
    # ...
}
```

### 自定义Nginx配置
可以修改 `nginx.conf` 文件来自定义Nginx行为：
- 添加SSL证书
- 配置反向代理
- 设置缓存策略
- 添加安全头

### 环境变量配置
在 `docker-compose.yml` 中添加环境变量：
```yaml
environment:
  - NODE_ENV=production
  - CUSTOM_VAR=value
```

## 🐛 故障排除

### 常见问题

1. **端口被占用**
   ```bash
   # 查看端口占用
   netstat -tlnp | grep :3000
   
   # 杀死占用进程
   sudo kill -9 <PID>
   ```

2. **容器启动失败**
   ```bash
   # 查看详细日志
   docker logs dryvocal-website
   
   # 检查镜像是否存在
   docker images | grep dryvocal-site
   ```

3. **构建失败**
   ```bash
   # 清理Docker缓存
   docker system prune -a
   
   # 重新构建
   docker build --no-cache -t dryvocal-site:latest .
   ```

### 日志查看
```bash
# 查看容器日志
docker logs -f dryvocal-website

# 查看Nginx访问日志
docker exec dryvocal-website cat /var/log/nginx/access.log

# 查看Nginx错误日志
docker exec dryvocal-website cat /var/log/nginx/error.log
```

## 📈 性能优化

### 镜像优化
- 使用多阶段构建减少镜像大小
- 使用Alpine Linux基础镜像
- 优化Docker层缓存

### Nginx优化
- 启用Gzip压缩
- 配置静态资源缓存
- 设置安全头
- 优化工作进程数

### 容器优化
- 使用非root用户运行
- 设置资源限制
- 配置健康检查
- 启用自动重启

## 🔒 安全建议

1. **使用非root用户**: 容器内使用nextjs用户运行
2. **设置安全头**: 配置XSS保护、内容类型检查等
3. **限制资源**: 设置CPU和内存限制
4. **定期更新**: 保持基础镜像和依赖更新
5. **网络安全**: 使用防火墙限制访问

## 📝 维护命令

```bash
# 更新镜像
docker-compose pull
docker-compose up -d

# 备份数据
docker cp dryvocal-website:/usr/share/nginx/html ./backup

# 清理未使用的资源
docker system prune -a

# 查看资源使用情况
docker stats dryvocal-website
```

## 📞 支持

如果遇到问题，请检查：
1. Docker和Docker Compose是否正确安装
2. 端口3000是否被占用
3. 防火墙设置是否正确
4. 系统资源是否充足

更多帮助请访问：https://dryvocal.com
