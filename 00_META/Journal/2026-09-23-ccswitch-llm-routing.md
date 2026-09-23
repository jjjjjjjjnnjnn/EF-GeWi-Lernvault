---
fach: ""
thema: "CC-Switch风格LLM端点与路由重构及原生Anthropic适配"
datum: 2026-09-23
tags: [EF, Meta]
---

# 2026-09-23 CC-Switch 风格 LLM 路由、端点自定义与原生协议适配（`[App] 28e4d7b`）

## 背景与问题诊断

1. **AI 助教教学区过重与设置冗余**：原界面在教学交互区堆叠过多模型设置、API Key 配置与调试开关，干扰学习专注度。
2. **商汤（SenseNova）等 Claude Messages 原生中继端点连接失败**：
   - 现场诊断发现 `https://token.sensenova.cn` 是专门兼容 Anthropic Messages 协议的服务端点，其接受 `/v1/messages` 且要求 `x-api-key`、`anthropic-version: 2023-06-01` 及顶层 `system` 字段与必需的 `max_tokens` 参数。
   - 原前端统一按 OpenAI Chat Completions 协议打向 `/chat/completions` 或 `/v1/chat/completions`，导致返回 404 NOT_FOUND。
3. **CC-Switch 核心配置项对齐**：用户提供 CC-Switch 截图，指出需要支持自定义服务端口（如 `:1234` / `:8080`）、完整 URL 直接请求开关、上游协议切换（Anthropic Messages 原生 vs OpenAI Chat Completions）以及认证字段（`ANTHROPIC_AUTH_TOKEN`、`Authorization: Bearer`、`x-api-key`、自定义 Header）。

## 实现与更新

1. **核心路由与协议层 (`src/ai/endpoints.ts`, `src/ai/streamClient.ts`)**：
   - 新增 `AuthFieldType`，端点对象支持 `authHeaderType`、`customAuthHeader`、`customPort`、`isFullUrl`。
   - 升级 `buildEndpointHeaders` 与 `buildEndpointUrl`，支持自定义端口绑定、完整 URL 直连与上游协议路径路由（OpenAI `/chat/completions` vs Anthropic `/v1/messages`）。
   - 更新 `pingEndpoint` 与 `testEndpointChat`，深度支持 Anthropic 请求体构造与响应解析。
   - `chatStream` 与 SSE 解析全面适配 Anthropic 原生增量事件流 (`content_block_delta` / `message_delta` 的 `usage` 统计)。
2. **开发网关代理 (`vite.config.ts`)**：
   - 更新 `aiGatewayProxy`，自动完整透传 `x-api-key`、`anthropic-version`、`anthropic-auth-token` 及自定义认证头，解除本地开发跨域与 CORS 限制。
3. **设置界面 (`src/components/AiSettings.tsx`)**：
   - **轻量化分离**：教学区专注对话与考纲解题，所有供应商编辑、Token 配额与容灾转移归集至「设置 (Alt+0)」抽屉。
   - **CC-Switch 经典交互**：
     - 请求地址栏增加「完整 URL」快速开关与「端口 (Port)」输入框。
     - 动态提示条自适应提示 Claude API 规范与 OpenAI Completions 规范。
     - 高级选项支持上游协议格式选择与认证字段环境变量名/请求头定制。
     - 端点卡片自适应显示 `Claude/Anthropic` 协议标识与自定义端口标牌。
4. **质量验证与限速重试机制 (`[App] 8fcc056`)**：
   - 实测验证用户商汤 API Key (`sk-t6my3...`)：直连 `https://token.sensenova.cn/v1/messages` (Anthropic 原生) 与 `/v1/chat/completions` (OpenAI 协议) 均返回 200 OK 且流式输出流畅。
   - 彻底修复端点编辑保存后未自动切换主路由导致依旧 fallback 至离线 LM Studio 的问题。
   - 落地服务商限速（HTTP 429）自动退避重试机制（指数退避 1.5s/3s/4.5s，上限 3 次，达到测试上限后才抛出提示）。
   - 拦截并清理 `instantGrounding.ts` 中错误将降级离线提示存入 `qaCache` 的缺陷，杜绝相同问题返回陈旧离线答复。
   - 40 个测试套件，234 项单元测试 100% 全部通过，生产编译 0 错误（3.00s 完成）。
