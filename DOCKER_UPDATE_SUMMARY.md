# DryVocal Docker 更新总结

## 🎯 更新概述

本次Docker配置更新包含了以下主要改进：

### ✅ 已完成的更新

1. **Dockerfile优化**
   - 升级到Node.js 20
   - 升级到Nginx 1.25
   - 添加时区设置 (Asia/Shanghai)
   - 改进安全配置 (非root用户)
   - 优化构建过程

2. **Docker Compose增强**
   - 添加nginx反向代理支持
   - 添加Traefik代理支持
   - 添加监控服务 (Prometheus + Grafana)
   - 改进网络配置
   - 添加健康检查

3. **Nginx配置优化**
   - 基础nginx配置 (nginx.conf)
   - 反向代理配置 (nginx-proxy.conf)
   - 安全头设置
   - Gzip压缩
   - 缓存策略

4. **脚本工具更新**
   - Windows脚本 (docker-scripts.bat)
   - Linux/Mac脚本 (docker-scripts.sh)
   - 新增多种部署模式
   - 改进错误处理

5. **监控和健康检查**
   - 健康检查端点 (/health)
   - Prometheus配置
   - Grafana仪表板
   - 服务状态监控

## 🚀 新增功能

### 多种部署模式

1. **基础模式**
   ```bash
   docker-compose up -d
   ```

2. **nginx代理模式**
   ```bash
   docker-compose --profile proxy up -d
   ```

3. **Traefik代理模式**
   ```bash
   docker-compose --profile traefik up -d
   ```

4. **监控模式**
   ```bash
   docker-compose --profile monitoring up -d
   ```

### 脚本命令

#### Windows
```cmd
docker-scripts.bat build          # 构建镜像
docker-scripts.bat start          # 启动基础服务
docker-scripts.bat start-proxy    # 启动nginx代理
docker-scripts.bat start-traefik  # 启动Traefik代理
docker-scripts.bat start-monitoring # 启动监控
docker-scripts.bat status         # 查看状态
docker-scripts.bat logs           # 查看日志
docker-scripts.bat stop           # 停止服务
```

#### Linux/Mac
```bash
./docker-scripts.sh build          # 构建镜像
./docker-scripts.sh start          # 启动基础服务
./docker-scripts.sh start-proxy    # 启动nginx代理
./docker-scripts.sh start-traefik  # 启动Traefik代理
./docker-scripts.sh start-monitoring # 启动监控
./docker-scripts.sh status         # 查看状态
./docker-scripts.sh logs           # 查看日志
./docker-scripts.sh stop           # 停止服务
```

## 🔧 技术改进

### 安全性增强
- 非root用户运行
- 安全头设置
- 文件权限控制
- 健康检查机制

### 性能优化
- 多阶段构建
- 镜像大小优化
- 缓存策略
- Gzip压缩

### 监控功能
- Prometheus指标收集
- Grafana可视化
- 健康检查端点
- 服务状态监控

## 📊 访问地址

| 服务 | 地址 | 说明 |
|------|------|------|
| 基础服务 | http://localhost:3000 | 主要网站 |
| 健康检查 | http://localhost:3000/health | 健康状态 |
| nginx代理 | http://localhost:80 | HTTP代理 |
| Traefik仪表板 | http://localhost:8080 | 代理管理 |
| Prometheus | http://localhost:9090 | 指标收集 |
| Grafana | http://localhost:3001 | 可视化监控 |

## 🛠️ 配置文件

### 新增文件
- `nginx.conf` - 基础nginx配置
- `nginx-proxy.conf` - 反向代理配置
- `monitoring/prometheus.yml` - Prometheus配置
- `src/pages/health.js` - 健康检查端点
- `docker-scripts.sh` - Linux/Mac脚本

### 更新文件
- `Dockerfile` - 多阶段构建优化
- `docker-compose.yml` - 多服务配置
- `docker-scripts.bat` - Windows脚本增强
- `DOCKER_README.md` - 文档更新

## 🔄 部署流程

### 开发环境
```bash
# 构建镜像
docker build -t dryvocal-docusaurus .

# 运行容器
docker run -d -p 3000:3000 dryvocal-docusaurus
```

### 生产环境
```bash
# 使用Docker Compose
docker-compose up -d

# 或使用脚本
./docker-scripts.sh start
```

### 监控部署
```bash
# 启动监控服务
docker-compose --profile monitoring up -d

# 访问Grafana
open http://localhost:3001
```

## 📝 注意事项

1. **端口冲突**: 确保端口3000、80、443、8080、9090、3001未被占用
2. **SSL证书**: nginx代理模式需要SSL证书文件
3. **防火墙**: 确保相关端口在防火墙中开放
4. **资源监控**: 监控模式会消耗更多资源

## 🆘 故障排除

### 常见问题
1. **端口被占用**: 修改docker-compose.yml中的端口映射
2. **权限问题**: 确保脚本有执行权限
3. **镜像构建失败**: 检查网络连接和Docker配置
4. **服务启动失败**: 查看容器日志排查问题

### 日志查看
```bash
# 查看所有服务日志
docker-compose logs

# 查看特定服务日志
docker-compose logs docusaurus

# 实时查看日志
docker-compose logs -f
```

---

*最后更新: 2024年12月19日*
*维护者: DryVocal团队*





