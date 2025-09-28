#!/bin/bash

# Docker构建和部署脚本
# 用于RemoveUI Docusaurus项目

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 项目配置
PROJECT_NAME="removeui-docusaurus"
IMAGE_NAME="removeui-docusaurus"
CONTAINER_NAME="removeui-docusaurus"
PORT="3000"

# 打印带颜色的消息
print_message() {
    echo -e "${2}${1}${NC}"
}

# 检查Docker是否安装
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_message "错误: Docker未安装，请先安装Docker" $RED
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_message "错误: Docker Compose未安装，请先安装Docker Compose" $RED
        exit 1
    fi
}

# 构建Docker镜像
build_image() {
    print_message "开始构建Docker镜像..." $BLUE
    docker build -t $IMAGE_NAME:latest .
    print_message "Docker镜像构建完成!" $GREEN
}

# 停止并删除现有容器
cleanup_container() {
    if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
        print_message "停止并删除现有容器..." $YELLOW
        docker stop $CONTAINER_NAME || true
        docker rm $CONTAINER_NAME || true
    fi
}

# 运行容器
run_container() {
    print_message "启动容器..." $BLUE
    docker run -d \
        --name $CONTAINER_NAME \
        -p $PORT:3000 \
        --restart unless-stopped \
        $IMAGE_NAME:latest
    
    print_message "容器启动成功!" $GREEN
    print_message "网站地址: http://localhost:$PORT" $GREEN
}

# 使用Docker Compose启动
run_compose() {
    print_message "使用Docker Compose启动服务..." $BLUE
    docker-compose up -d
    print_message "服务启动成功!" $GREEN
    print_message "网站地址: http://localhost:3000" $GREEN
}

# 查看日志
view_logs() {
    print_message "查看容器日志..." $BLUE
    docker logs -f $CONTAINER_NAME
}

# 查看Docker Compose日志
view_compose_logs() {
    print_message "查看Docker Compose日志..." $BLUE
    docker-compose logs -f
}

# 停止服务
stop_service() {
    print_message "停止服务..." $YELLOW
    docker-compose down
    print_message "服务已停止" $GREEN
}

# 清理资源
cleanup() {
    print_message "清理Docker资源..." $YELLOW
    docker-compose down --volumes --remove-orphans
    docker system prune -f
    print_message "清理完成" $GREEN
}

# 显示帮助信息
show_help() {
    echo "RemoveUI Docusaurus Docker管理脚本"
    echo ""
    echo "用法: $0 [命令]"
    echo ""
    echo "命令:"
    echo "  build       构建Docker镜像"
    echo "  run         运行容器"
    echo "  start       启动服务 (使用docker-compose)"
    echo "  stop        停止服务"
    echo "  restart     重启服务"
    echo "  logs        查看日志"
    echo "  cleanup     清理资源"
    echo "  help        显示帮助信息"
    echo ""
    echo "示例:"
    echo "  $0 build    # 构建镜像"
    echo "  $0 start    # 启动服务"
    echo "  $0 logs     # 查看日志"
}

# 主函数
main() {
    case "${1:-help}" in
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
        "stop")
            stop_service
            ;;
        "restart")
            stop_service
            sleep 2
            run_compose
            ;;
        "logs")
            view_compose_logs
            ;;
        "cleanup")
            cleanup
            ;;
        "help"|*)
            show_help
            ;;
    esac
}

# 执行主函数
main "$@"