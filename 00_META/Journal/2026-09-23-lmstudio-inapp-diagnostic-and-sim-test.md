---
fach: ""
thema: "LM-Studio-InApp-Diagnostic-and-Simulated-Interaction-Tests"
datum: 2026-09-23
tags: [EF, Meta]
---

# 2026-09-23 LM Studio 报错根治、全内置应用内诊断控制台与模拟交互测试规范落地（`[App] b7beb70`，40 套测试 230 题全绿）

## 取证与基线

- **单元测试**：40/40 个测试套件，**230/230 项单测 100% 全部通过**（新增 `src/test/simulatedInteraction.test.tsx` 全流程模拟交互测试与 `endpoints.test.ts` / `streamClient.test.ts` 保护性用例）。
- **生产打包**：`npm run build` 耗时 3.07s，零 TS 告警，前端资产构建通过。
- **Vault 校验**：`python scripts/vault-check.py` 输出 `notes=38 csv_rows=203(bad=0) index_links=135(missing=0) reisen=4 vergleich=0 PASS`。
- **用户指令贯彻**：“以后更新完成以后全部进行测试性模拟交互。我希望所有内容都能在项目中调用，而不是切换到其他app中”。

## 核心根因与修复技术细节

1. **测试连接按钮“无显示 / 无法点击 / 无反馈”根除 (`src/components/AiSettings.tsx`)**
   - **Tab 1（简单模式）**：原代码存在 `{cfg.engine === "api" && activeEndpoint.providerId !== "ollama" && (...) }`，因 LM Studio 预设 `ep-lmstudio` 的 `providerId` 为 `"ollama"`，导致激活 LM Studio 时测试栏被 React 条件完全隐藏。已彻底移除该限制，所有活跃端点（无论本地还是云端）均展示标准化控制卡片。
   - **Tab 2（端点列表）**：将原静态无响应的 `Ping` 文本按钮升级为双模操作：“⚡ 测试连接 (Ping)”与“💬 对话探针 (Chat Probe)”，附带动态旋转 SVG Spinner、`disabled` 状态锁定、毫秒延迟徽章与紧凑型内嵌反馈卡片。

2. **LM Studio `[ERROR] 'messages' field is required` 彻底拦截与规整 (`src/ai/engine.ts` & `src/ai/streamClient.ts`)**
   - LM Studio 服务端接口 `/v1/chat/completions` 要求 `messages` 必须是非空数组，且必须包含有效 `role: "user"` 消息体。
   - 新增 `sanitizeChatMessages(messages: ChatMsg[]): ChatMsg[]` 强制规整清洗器：
     - 若传入数组为空或 `undefined`，自动注入 `[{ role: "user", content: "Hallo" }]`；
     - 自动剔除 `content` 为空串或无效项；
     - 若仅有 `system` 消息，自动追加一条用户指令 `[{ role: "user", content: "Bitte beginnen." }]`；
   - 在 `chat()`、`chatStream()` 以及测试探针发出前 100% 经过清洗器，从根源杜绝服务端 400 校验拒绝。

3. **全应用内闭环操作：一键诊断与实时对话探针控制台**
   - 在 `AiSettings.tsx` 中内置深度探针 `testEndpointChat`：
     - 实时向目标端点发送标准消息体，在当前卡片内展开渲染模型返回的真实问候语文本（如 `"Hallo! Ich bin bereit für Ihre Abitur-Vorbereitung"`）、模型实际 ID 与往返耗时；
     - 针对本地常见故障提供内嵌自愈排查建议（如 LM Studio 端口 1234 未开、未勾选「Enable CORS」或模型未在显存中加载等），用户直接在 App 内完成诊断，无需切出查看控制台。

4. **强制门禁：端到端模拟交互测试套件 (`src/test/simulatedInteraction.test.tsx`)**
   - 模拟真实用户在界面上的操作路径：
     - 用户在 Tab 1 查看 LM Studio 状态并点击“⚡ 测试连接”，验证 Loading 状态与连通徽章；
     - 用户点击“💬 实时对话探针”，拦截请求体严格验证 `messages` 数组非空合规，并验证界面渲染出模型真实回话；
     - 模拟服务未启动或 CORS 拦截，验证 UI 弹出友好排查指引；
     - 模拟 Tab 2 卡片上探针测试；
     - 模拟级联容灾 Failover（LM Studio 断线时自动无缝切换到备用端点或本地考纲库）。

5. **商汤 SenseNova / 远程 HTTPS 端点 CORS 拦截与 404 Ping 修复 (`[App] 3648eb9`，231 单测全绿)**
   - **用户截图实测排查 (`firefox.exe_20260923_100721.png`)**：用户在测试 SenseNova 时界面报 `Connection Failed (625ms)`。
   - **深层根因 1 (CORS Preflight 拒绝)**：商汤开放平台服务端对跨域预检 `OPTIONS` 请求返回 404 且缺少 `Access-Control-Allow-Headers`，导致浏览器直接将其定性为 NetworkError 拦截。
   - **深层根因 2 (无 /models 接口)**：SenseNova 仅提供 `/v1/chat/completions` (POST)，请求 `GET /v1/models` 会直接 404。
   - **技术解法**：
     - 在 `vite.config.ts` 中引入通用 `aiGatewayProxy` (`/__ai_proxy`)，将浏览器同源请求由 Node.js 服务端直连外部商用大模型，彻底免除浏览器 CORS 与 preflight 拦截，完美支持 SSE 流式传输；
     - 在 `providers.ts` 中实现 `resolveAiRequestUrl`，本地端点（LM Studio / Ollama）直连，远程 HTTPS 端点走代取；
     - 在 `endpoints.ts` 中针对 SenseNova 采用 `POST /chat/completions` 专用测速探针，连通状态与 Key 鉴权 100% 正常响应。
