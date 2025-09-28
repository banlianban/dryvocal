@echo off
setlocal enabledelayedexpansion

REM Docker构建和部署脚本 (Windows版本)
REM 用于RemoveUI Docusaurus项目

set PROJECT_NAME=removeui-docusaurus
set IMAGE_NAME=removeui-docusaurus
set CONTAINER_NAME=removeui-docusaurus
set PORT=3000

REM 检查Docker是否安装
:check_docker
docker --version >nul 2>&1
if errorlevel 1 (
    echo 错误: Docker未安装，请先安装Docker Desktop
    pause
    exit /b 1
)

docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo 错误: Docker Compose未安装，请先安装Docker Compose
    pause
    exit /b 1
)
goto :eof

REM 构建Docker镜像
:build_image
echo 开始构建Docker镜像...
docker build -t %IMAGE_NAME%:latest .
if errorlevel 1 (
    echo 构建失败!
    pause
    exit /b 1
)
echo Docker镜像构建完成!
goto :eof

REM 停止并删除现有容器
:cleanup_container
docker ps -aq -f name=%CONTAINER_NAME% >nul 2>&1
if not errorlevel 1 (
    echo 停止并删除现有容器...
    docker stop %CONTAINER_NAME% >nul 2>&1
    docker rm %CONTAINER_NAME% >nul 2>&1
)
goto :eof

REM 运行容器
:run_container
echo 启动容器...
docker run -d --name %CONTAINER_NAME% -p %PORT%:3000 --restart unless-stopped %IMAGE_NAME%:latest
if errorlevel 1 (
    echo 容器启动失败!
    pause
    exit /b 1
)
echo 容器启动成功!
echo 网站地址: http://localhost:%PORT%
goto :eof

REM 使用Docker Compose启动
:run_compose
echo 使用Docker Compose启动服务...
docker-compose up -d
if errorlevel 1 (
    echo 服务启动失败!
    pause
    exit /b 1
)
echo 服务启动成功!
echo 网站地址: http://localhost:3000
goto :eof

REM 查看日志
:view_logs
echo 查看Docker Compose日志...
docker-compose logs -f
goto :eof

REM 停止服务
:stop_service
echo 停止服务...
docker-compose down
echo 服务已停止
goto :eof

REM 清理资源
:cleanup
echo 清理Docker资源...
docker-compose down --volumes --remove-orphans
docker system prune -f
echo 清理完成
goto :eof

REM 显示帮助信息
:show_help
echo RemoveUI Docusaurus Docker管理脚本
echo.
echo 用法: %0 [命令]
echo.
echo 命令:
echo   build       构建Docker镜像
echo   run         运行容器
echo   start       启动服务 (使用docker-compose)
echo   stop        停止服务
echo   restart     重启服务
echo   logs        查看日志
echo   cleanup     清理资源
echo   help        显示帮助信息
echo.
echo 示例:
echo   %0 build    # 构建镜像
echo   %0 start    # 启动服务
echo   %0 logs     # 查看日志
goto :eof

REM 主函数
:main
if "%1"=="" goto :show_help
if "%1"=="help" goto :show_help
if "%1"=="build" (
    call :check_docker
    call :build_image
    goto :eof
)
if "%1"=="run" (
    call :check_docker
    call :cleanup_container
    call :run_container
    goto :eof
)
if "%1"=="start" (
    call :check_docker
    call :run_compose
    goto :eof
)
if "%1"=="stop" (
    call :stop_service
    goto :eof
)
if "%1"=="restart" (
    call :stop_service
    timeout /t 2 /nobreak >nul
    call :run_compose
    goto :eof
)
if "%1"=="logs" (
    call :view_logs
    goto :eof
)
if "%1"=="cleanup" (
    call :cleanup
    goto :eof
)
goto :show_help

REM 执行主函数
call :main %*