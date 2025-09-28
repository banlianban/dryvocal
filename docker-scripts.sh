#!/bin/bash

# DryVocal网站Docker管理脚本

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 打印带颜色的消息
print_message() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}  DryVocal Website Docker 管理  ${NC}"
    echo -e "${BLUE}================================${NC}"
}

# 构建镜像
build_image() {
    print_header
    print_message "开始构建DryVocal网站Docker镜像..."
    
    # 清理旧的镜像
    print_message "清理旧的镜像..."
    docker rmi dryvocal-site:latest 2>/dev/null || true
    
    # 构建新镜像
    print_message "构建Docker镜像..."
    docker build -t dryvocal-site:latest .
    
    print_message "镜像构建完成！"
}

# 运行容器
run_container() {
    print_header
    print_message "启动DryVocal网站容器..."
    
    # 停止并删除已存在的容器
    print_message "停止已存在的容器..."
    docker stop dryvocal-website 2>/dev/null || true
    docker rm dryvocal-website 2>/dev/null || true
    
    # 运行新容器
    print_message "启动新容器..."
    docker run -d \
        --name dryvocal-website \
        -p 3000:3000 \
        --restart unless-stopped \
        dryvocal-site:latest
    
    print_message "容器启动成功！"
    print_message "网站访问地址: http://localhost:3000"
}

# 使用docker-compose启动
run_compose() {
    print_header
    print_message "使用Docker Compose启动服务..."
    
    docker-compose up -d --build
    
    print_message "服务启动成功！"
    print_message "网站访问地址: http://localhost:3000"
}

# 停止服务
stop_service() {
    print_header
    print_message "停止DryVocal网站服务..."
    
    # 停止docker-compose服务
    docker-compose down 2>/dev/null || true
    
    # 停止单独容器
    docker stop dryvocal-website 2>/dev/null || true
    docker rm dryvocal-website 2>/dev/null || true
    
    print_message "服务已停止！"
}

# 查看日志
view_logs() {
    print_header
    print_message "查看容器日志..."
    
    if docker ps -q -f name=dryvocal-website | grep -q .; then
        docker logs -f dryvocal-website
    else
        print_error "容器未运行！"
        exit 1
    fi
}

# 查看状态
check_status() {
    print_header
    print_message "检查服务状态..."
    
    echo "Docker容器状态:"
    docker ps -f name=dryvocal-website --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    
    echo ""
    echo "端口占用情况:"
    netstat -tlnp | grep :3000 || echo "端口3000未被占用"
}

# 清理资源
cleanup() {
    print_header
    print_message "清理Docker资源..."
    
    # 停止并删除容器
    docker stop dryvocal-website 2>/dev/null || true
    docker rm dryvocal-website 2>/dev/null || true
    
    # 删除镜像
    docker rmi dryvocal-site:latest 2>/dev/null || true
    
    # 清理未使用的资源
    docker system prune -f
    
    print_message "清理完成！"
}

# 显示帮助信息
show_help() {
    print_header
    echo "使用方法: $0 [命令]"
    echo ""
    echo "可用命令:"
    echo "  build      - 构建Docker镜像"
    echo "  run        - 运行容器"
    echo "  compose    - 使用docker-compose启动服务"
    echo "  stop       - 停止服务"
    echo "  logs       - 查看日志"
    echo "  status     - 查看状态"
    echo "  cleanup    - 清理资源"
    echo "  help       - 显示此帮助信息"
    echo ""
    echo "示例:"
    echo "  $0 build    # 构建镜像"
    echo "  $0 compose  # 启动服务"
    echo "  $0 logs     # 查看日志"
}

# 主函数
main() {
    case "${1:-help}" in
        build)
            build_image
            ;;
        run)
            run_container
            ;;
        compose)
            run_compose
            ;;
        stop)
            stop_service
            ;;
        logs)
            view_logs
            ;;
        status)
            check_status
            ;;
        cleanup)
            cleanup
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            print_error "未知命令: $1"
            show_help
            exit 1
            ;;
    esac
}

# 执行主函数
main "$@"

