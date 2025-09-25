---
sidebar_position: 1
---

# 教程介绍

让我们在 **5 分钟内了解 Docusaurus**。

## 开始使用

通过 **创建一个新站点** 来开始使用。

或者通过 **[docusaurus.new](https://docusaurus.new)** **立即试用 Docusaurus**。

### 您需要准备什么

- [Node.js](https://nodejs.org/en/download/) 版本 18.0 或以上：
  - 安装 Node.js 时，建议勾选所有与依赖项相关的复选框。

## 生成新站点

使用 **经典模板** 生成一个新的 Docusaurus 站点。

运行命令后，经典模板将自动添加到您的项目中：

```bash
npm init docusaurus@latest my-website classic
```

您可以在命令提示符、Powershell、终端或代码编辑器的任何其他集成终端中输入此命令。

## 启动站点

运行开发服务器：

```bash
cd my-website
npm start
```

`cd` 命令会更改您正在使用的目录。为了使用新创建的 Docusaurus 站点，您需要在终端中导航到该目录。

`npm start` 命令会在本地构建您的网站并通过开发服务器提供服务，准备好供您在 http://localhost:3000/ 查看。

打开 `docs/intro.md`（此页面）并编辑一些行：站点会 **自动重新加载** 并显示您的更改。
