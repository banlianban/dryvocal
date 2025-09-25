# syntax=docker/dockerfile:1

FROM node:18-alpine AS builder
WORKDIR /app

# Install deps first (better layer caching)
COPY package*.json ./
RUN npm ci --prefer-offline --no-audit

# Copy source and build
COPY . .
RUN npm run build


FROM nginx:alpine AS runner

# Copy build output to Nginx html dir
COPY --from=builder /app/build /usr/share/nginx/html

# Use custom nginx config on port 3000
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 3000
HEALTHCHECK CMD wget -qO- http://localhost/ || exit 1
CMD ["nginx", "-g", "daemon off;"]


