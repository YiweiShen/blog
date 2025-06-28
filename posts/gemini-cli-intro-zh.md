---
title: "Gemini CLI 入门指南：把 AI 助手装进终端"
date: "2025-06-28"
summary: "从安装到实战，带你快速掌握 Gemini CLI，让 AI 成为你的命令行战友"
---

# Gemini CLI 入门指南：把 AI 助手装进终端

想象一下，一个不会抱怨、不下班、永远在线的 AI 助手，就藏在你的终端里，随时听候你的差遣。Gemini CLI 就是这样一把神奇的锤子，让你用自然语言操控 Google 的大模型，完成代码浏览、生成、重构、脚本化等各种任务。

> **程序员冷笑话**：为什么程序员喜欢在深夜写代码？因为白天的 bug 都在睡觉。😉

## 1. 为什么选择 Gemini CLI

- **超大上下文支持**：能一次性加载百万 Token 的项目、文档或历史提交，避免来回查文件。
- **即写即用**：给出需求，直接输出可用的函数、配置片段、脚本模板。
- **无缝脚本化**：把常用对话封装成 Shell 函数或 Makefile 目标，一行命令全自动运行多步流程。
- **可扩展工具链**：支持挂载自定义脚本、企业内部工具，统一在对话里调用。

## 2. 安装与配置

### 安装

确保本地有 Node.js（>=18）或 Yarn：
```bash
# 临时体验
npx @google/gemini-cli

# 全局安装
npm install -g @google/gemini-cli
# 或者
yarn global add @google/gemini-cli
```

安装完成后：
```bash
gemini --version
# 如果看到类似 v0.x.x 的版本号，说明安装成功。
```

### 登录与认证

第一次运行 `gemini` ，会自动弹出浏览器要求 Google 登录，成功后本地保存凭证。
如果你有企业 Key 或更高配额需求：
```bash
export GEMINI_API_KEY="你的API_KEY"
```

> **Dad Joke**：AI 助手问程序员：“想要更高权限？”，程序员答：“想要 root？” AI：“别整我，我可没面子书账号。”😄

## 3. 基本交互示例

切换到项目目录，启动对话：
```bash
cd ~/my-project
gemini
> 请给我一个项目结构概览，并标出核心模块。
```
AI 可能会这样回复：
```
- src/         主应用代码
  ├─ routes/   路由定义
  ├─ services/ 业务逻辑
  └─ models/   数据层
- tests/       单元 & 集成测试
- scripts/     部署 & 数据迁移脚本
```

想让 AI 生成一段 Express 中间件：
```bash
> 请帮我写一个 Express 中间件，校验 req.body 类型，并剥离 password、token 字段
```
得到的代码直接复制到 `src/middleware/sanitize.js` 即可。

## 4. Inline 模式：一行命令搞定

有时候你只想快速拿到脚本输出，不进入交互：
```bash
gemini --inline "生成一个 Python 脚本，下载给定 URL 列表的文件并并行执行"
```
命令执行完毕，终端里直接打印脚本内容，复制粘贴或重定向到文件都很方便。

## 5. 把对话写进脚本

把常用对话写成 Shell 函数，随时复用：
```bash
function analyze() {
  gemini --inline "阅读 $1，并给出性能优化建议"
}
# 使用：
analyze src/utils/heavy.js
```

## 6. 进阶技巧

- **挂载自定义命令**：通过 MCP 插件，你可以把团队内部的 CLI、DB 查询脚本都接入 GemCLI，对话里直接调用。
- **多模态输入**：拖拽 PDF、Markdown、图片到 CLI，让 AI 帮你提取结构、标注示意图（需开启 Multimodal 权限）。

## 小结

1. 安装：`npm install -g @google/gemini-cli`
2. 登录：首次运行自动授权，或设置 `GEMINI_API_KEY`
3. 交互式：`gemini` 进入对话；Inline：`--inline` 一行实现需求
4. 脚本化 & 插件：把常用流程写成函数，接入自定义工具链

把 Gemini CLI 当成“不会生病也不请假的助理”，它能帮你加速开发、批量处理文件、生成代码片段，甚至提供冷笑话——最适合深夜战斗的你。

赶快试试，让 AI 驱动你的命令行，把那些重复、机械的工作交给它，腾出时间去写更酷的功能吧！