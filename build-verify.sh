#!/bin/bash

# 构建验证脚本
echo "🔍 验证Google Analytics配置..."

# 检查配置文件
if grep -q "G-YTLK0654HR" docusaurus.config.js; then
    echo "✅ Google Analytics ID 配置正确"
else
    echo "❌ Google Analytics ID 配置缺失"
    exit 1
fi

# 构建项目
echo "🏗️ 构建项目..."
npm run build

# 检查构建结果
if grep -q "G-YTLK0654HR" build/index.html; then
    echo "✅ Google Analytics 代码已正确注入到构建文件中"
else
    echo "❌ Google Analytics 代码未找到"
    exit 1
fi

echo "🎉 构建验证完成！"
