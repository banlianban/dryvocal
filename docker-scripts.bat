@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

REM DryVocal网站Docker管理脚本 (Windows版本)

:main
if "%1"=="" goto :help
if "%1"=="build" goto :build
if "%1"=="run" goto :run
if "%1"=="compose" goto :compose
if "%1"=="stop" goto :stop
if "%1"=="logs" goto :logs
if "%1"=="status" goto :status
if "%1"=="cleanup" goto :cleanup
if "%1"=="help" goto :help
if "%1"=="--help" goto :help
if "%1"=="-h" goto :help
goto :error

:header
echo.
echo ================================
echo   DryVocal Website Docker 管理
echo ================================
echo.
goto :eof

:build
call :header
echo [INFO] 开始构建DryVocal网站Docker镜像...
echo.
echo [INFO] 清理旧的镜像...
docker rmi dryvocal-site:latest 2>nul
echo.
echo [INFO] 构建Docker镜像...
docker build -t dryvocal-site:latest .
if errorlevel 1 (
    echo [ERROR] 镜像构建失败！
    exit /b 1
)
echo.
echo [INFO] 镜像构建完成！
goto :end

:run
call :header
echo [INFO] 启动DryVocal网站容器...
echo.
echo [INFO] 停止已存在的容器...
docker stop dryvocal-website 2>nul
docker rm dryvocal-website 2>nul
echo.
echo [INFO] 启动新容器...
docker run -d --name dryvocal-website -p 3000:3000 --restart unless-stopped dryvocal-site:latest
if errorlevel 1 (
    echo [ERROR] 容器启动失败！
    exit /b 1
)
echo.
echo [INFO] 容器启动成功！
echo [INFO] 网站访问地址: http://localhost:3000
goto :end

:compose
call :header
echo [INFO] 使用Docker Compose启动服务...
echo.
docker-compose up -d --build
if errorlevel 1 (
    echo [ERROR] 服务启动失败！
    exit /b 1
)
echo.
echo [INFO] 服务启动成功！
echo [INFO] 网站访问地址: http://localhost:3000
goto :end

:stop
call :header
echo [INFO] 停止DryVocal网站服务...
echo.
echo [INFO] 停止docker-compose服务...
docker-compose down 2>nul
echo.
echo [INFO] 停止单独容器...
docker stop dryvocal-website 2>nul
docker rm dryvocal-website 2>nul
echo.
echo [INFO] 服务已停止！
goto :end

:logs
call :header
echo [INFO] 查看容器日志...
echo.
docker ps -q -f name=dryvocal-website | findstr . >nul
if errorlevel 1 (
    echo [ERROR] 容器未运行！
    exit /b 1
)
docker logs -f dryvocal-website
goto :end

:status
call :header
echo [INFO] 检查服务状态...
echo.
echo Docker容器状态:
docker ps -f name=dryvocal-website --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
echo.
echo 端口占用情况:
netstat -an | findstr :3000
goto :end

:cleanup
call :header
echo [INFO] 清理Docker资源...
echo.
echo [INFO] 停止并删除容器...
docker stop dryvocal-website 2>nul
docker rm dryvocal-website 2>nul
echo.
echo [INFO] 删除镜像...
docker rmi dryvocal-site:latest 2>nul
echo.
echo [INFO] 清理未使用的资源...
docker system prune -f
echo.
echo [INFO] 清理完成！
goto :end

:help
call :header
echo 使用方法: %0 [命令]
echo.
echo 可用命令:
echo   build      - 构建Docker镜像
echo   run        - 运行容器
echo   compose    - 使用docker-compose启动服务
echo   stop       - 停止服务
echo   logs       - 查看日志
echo   status     - 查看状态
echo   cleanup    - 清理资源
echo   help       - 显示此帮助信息
echo.
echo 示例:
echo   %0 build    # 构建镜像
echo   %0 compose  # 启动服务
echo   %0 logs     # 查看日志
goto :end

:error
echo [ERROR] 未知命令: %1
echo.
call :help
exit /b 1

:end
endlocal
