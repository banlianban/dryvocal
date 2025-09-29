# syntax=docker/dockerfile:1

# 使用多阶段构建优化镜像大小
FROM node:20-alpine AS builder

# 设置工作目录
WORKDIR /app

# 设置npm配置以提高安装速度和安全性
RUN npm config set registry https://registry.npmmirror.com/ && \
    npm config set cache /tmp/.npm && \
    npm config set audit false && \
    npm config set fund false

# 安装必要的系统依赖
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    git

# 复制package文件并安装依赖
COPY package*.json ./
RUN npm ci --prefer-offline --no-audit --production=false --silent

# 复制源代码
COPY . .

# 生成翻译文件
RUN npm run write-translations

# 构建应用（支持多语言）
RUN npm run build

# 生产阶段 - 使用nginx提供静态文件服务
FROM nginx:1.25-alpine AS runner

# 安装必要的工具
RUN apk add --no-cache \
    wget \
    curl \
    tzdata

# 设置时区
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# 复制构建产物到nginx目录（包含多语言版本）
COPY --from=builder /app/build /usr/share/nginx/html

# 确保多语言目录权限正确
RUN chmod -R 755 /usr/share/nginx/html

# 复制nginx配置文件
COPY nginx.conf /etc/nginx/nginx.conf

# 创建非root用户和组
RUN addgroup -g 1001 -S nodejs && \
    adduser -S docusaurus -u 1001 -G nodejs

# 设置文件权限
RUN chown -R docusaurus:nodejs /usr/share/nginx/html && \
    chown -R docusaurus:nodejs /var/cache/nginx && \
    chown -R docusaurus:nodejs /var/log/nginx && \
    chown -R docusaurus:nodejs /etc/nginx/conf.d && \
    chown -R docusaurus:nodejs /var/run

# 创建nginx运行目录和PID文件
RUN mkdir -p /var/run/nginx && \
    touch /var/run/nginx.pid && \
    chown -R docusaurus:nodejs /var/run/nginx.pid

# 创建健康检查脚本
RUN echo '#!/bin/sh' > /usr/local/bin/healthcheck.sh && \
    echo 'wget -qO- http://localhost:3000/health || exit 1' >> /usr/local/bin/healthcheck.sh && \
    chmod +x /usr/local/bin/healthcheck.sh && \
    chown docusaurus:nodejs /usr/local/bin/healthcheck.sh

# 切换到非root用户
USER docusaurus

# 暴露端口3000
EXPOSE 3000

# 健康检查
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD /usr/local/bin/healthcheck.sh

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]