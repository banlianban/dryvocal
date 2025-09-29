#!/bin/bash

# Docker构建和部署脚本 (Linux/Mac版本)
# 用于DryVocal Docusaurus项目

set -e

PROJECT_NAME="dryvocal-docusaurus"
IMAGE_NAME="dryvocal-docusaurus"
CONTAINER_NAME="dryvocal-docusaurus"
PORT=3000
NETWORK_NAME="dryvocal-network"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查Docker是否安装
check_docker() {
    log_info "检查Docker环境..."
    
    if ! command -v docker &> /dev/null; then
        log_error "Docker未安装，请先安装Docker"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose未安装，请先安装Docker Compose"
        exit 1
    fi
    
    log_success "Docker环境检查通过"
}

# 构建Docker镜像
build_image() {
    log_info "开始构建Docker镜像..."
    docker build -t $IMAGE_NAME:latest .
    if [ $? -eq 0 ]; then
        log_success "Docker镜像构建完成!"
    else
        log_error "构建失败!"
        exit 1
    fi
}

# 清理现有容器
cleanup_container() {
    if docker ps -aq -f name=$CONTAINER_NAME | grep -q .; then
        log_info "停止并删除现有容器..."
        docker stop $CONTAINER_NAME 2>/dev/null || true
        docker rm $CONTAINER_NAME 2>/dev/null || true
    fi
}

# 运行容器
run_container() {
    log_info "启动容器..."
    docker run -d \
        --name $CONTAINER_NAME \
        -p $PORT:3000 \
        --restart unless-stopped \
        $IMAGE_NAME:latest
    
    if [ $? -eq 0 ]; then
        log_success "容器启动成功!"
        log_info "网站地址: http://localhost:$PORT"
    else
        log_error "容器启动失败!"
        exit 1
    fi
}

# 使用Docker Compose启动
run_compose() {
    log_info "使用Docker Compose启动服务..."
    docker-compose up -d
    if [ $? -eq 0 ]; then
        log_success "服务启动成功!"
        log_info "网站地址: http://localhost:3000"
    else
        log_error "服务启动失败!"
        exit 1
    fi
}

# 启动nginx代理
start_proxy() {
    log_info "启动服务with nginx代理..."
    docker-compose --profile proxy up -d
    if [ $? -eq 0 ]; then
        log_success "nginx代理服务启动成功!"
        log_info "网站地址: http://localhost:80"
    else
        log_error "nginx代理服务启动失败!"
        exit 1
    fi
}

# 启动Traefik代理
start_traefik() {
    log_info "启动服务with Traefik代理..."
    docker-compose --profile traefik up -d
    if [ $? -eq 0 ]; then
        log_success "Traefik代理服务启动成功!"
        log_info "Traefik仪表板: http://localhost:8080"
    else
        log_error "Traefik代理服务启动失败!"
        exit 1
    fi
}

# 启动监控服务
start_monitoring() {
    log_info "启动服务with监控..."
    docker-compose --profile monitoring up -d
    if [ $? -eq 0 ]; then
        log_success "监控服务启动成功!"
        log_info "Prometheus: http://localhost:9090"
        log_info "Grafana: http://localhost:3001"
    else
        log_error "监控服务启动失败!"
        exit 1
    fi
}

# 查看日志
view_logs() {
    log_info "查看Docker Compose日志..."
    docker-compose logs -f
}

# 查看服务状态
view_status() {
    log_info "查看服务状态..."
    docker-compose ps
}

# 停止服务
stop_service() {
    log_info "停止服务..."
    docker-compose down
    log_success "服务已停止"
}

# 重启服务
restart_service() {
    log_info "重启服务..."
    docker-compose down
    sleep 2
    docker-compose up -d
    log_success "服务已重启"
}

# 清理资源
cleanup() {
    log_info "清理Docker资源..."
    docker-compose down --volumes --remove-orphans
    docker system prune -f
    log_success "清理完成"
}

# 显示帮助信息
show_help() {
    echo "DryVocal Docusaurus Docker管理脚本"
    echo ""
    echo "用法: $0 [命令]"
    echo ""
    echo "命令:"
    echo "  build           构建Docker镜像"
    echo "  run             运行容器"
    echo "  start           启动服务 (使用docker-compose)"
    echo "  start-proxy     启动服务with nginx代理"
    echo "  start-traefik   启动服务with Traefik代理"
    echo "  start-monitoring 启动服务with监控"
    echo "  stop            停止服务"
    echo "  restart         重启服务"
    echo "  logs            查看日志"
    echo "  status          查看服务状态"
    echo "  cleanup         清理资源"
    echo "  help            显示帮助信息"
    echo ""
    echo "示例:"
    echo "  $0 build         # 构建镜像"
    echo "  $0 start         # 启动服务"
    echo "  $0 start-proxy   # 启动with nginx代理"
    echo "  $0 logs          # 查看日志"
}

# 主函数
main() {
    case "$1" in
        "build")
            check_docker
            build_image
            ;;
        "run")
            check_docker
            cleanup_container
            run_container
            ;;
        "start")
            check_docker
            run_compose
            ;;
        "start-proxy")
            check_docker
            start_proxy
            ;;
        "start-traefik")
            check_docker
            start_traefik
            ;;
        "start-monitoring")
            check_docker
            start_monitoring
            ;;
        "stop")
            stop_service
            ;;
        "restart")
            restart_service
            ;;
        "logs")
            view_logs
            ;;
        "status")
            view_status
            ;;
        "cleanup")
            cleanup
            ;;
        "help"|"")
            show_help
            ;;
        *)
            log_error "未知命令: $1"
            show_help
            exit 1
            ;;
    esac
}

# 执行主函数
main "$@"