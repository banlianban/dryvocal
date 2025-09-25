# syntax=docker/dockerfile:1

# 使用多阶段构建优化镜像大小
FROM node:18-alpine AS builder

# 设置工作目录
WORKDIR /app

# 设置npm配置以提高安装速度
RUN npm config set registry https://registry.npmmirror.com/ && \
    npm config set cache /tmp/.npm

# 复制package文件并安装依赖
COPY package*.json ./
RUN npm ci --prefer-offline --no-audit --production=false

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 生产阶段 - 使用nginx提供静态文件服务
FROM nginx:alpine AS runner

# 安装wget用于健康检查
RUN apk add --no-cache wget

# 复制构建产物到nginx目录
COPY --from=builder /app/build /usr/share/nginx/html

# 复制nginx配置文件
COPY nginx.conf /etc/nginx/nginx.conf

# 创建非root用户
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# 设置文件权限
RUN chown -R nextjs:nodejs /usr/share/nginx/html && \
    chown -R nextjs:nodejs /var/cache/nginx && \
    chown -R nextjs:nodejs /var/log/nginx && \
    chown -R nextjs:nodejs /etc/nginx/conf.d

# 创建nginx运行目录
RUN touch /var/run/nginx.pid && \
    chown -R nextjs:nodejs /var/run/nginx.pid

# 切换到非root用户
USER nextjs

# 暴露端口3000
EXPOSE 3000

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -qO- http://localhost:3000/ || exit 1

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]