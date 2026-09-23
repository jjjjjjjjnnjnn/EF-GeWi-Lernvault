---
fach: Meta
thema: "助教教学区域轻量化、自主模型填写、显式保存设置与CC-Switch供应商交互流对齐"
datum: 2026-09-23
tags: [EF, Meta, App]
klausurrelevant: false
---

# 2026-09-23 助教教学区域轻量化、自主模型填写、显式保存设置与CC-Switch供应商交互流对齐

## 背景与用户诉求
用户在实际使用中反馈以下几点核心诉求：
1. **模型自主选择功能（填写模型）**：此前预设端点（SenseNova、LM Studio、DeepSeek 等）被锁定无法编辑，且界面缺少直接填写自定义模型名称（如 `SenseChat-5`、`llama-3-sauerkrautlm-8b-instruct`、`union-alpha`、`qwen2.5:7b` 等）的输入框。
2. **保存设置功能**：缺乏明确、显式的“保存设置”动作按钮，用户输入后不确定是否已持久化。
3. **AI助教教学区域轻量化**：Tutor 模块内嵌了庞大的 AI 设置面板，严重挤占对话教学界面，要求通过跳转方式进入全局设置页，保持助教界面极简。
4. **对齐 CC-Switch 交互流程**：参考用户提供的 3 张 CC-Switch 截图（`102402.png` 供应商列表、`102424.png` 供应商编辑页、`102431.png` 保存与配置），深度对齐其编辑与保存流程。

## 核心实现与改动

### 1. AI 助教教学区域极简轻量化 (`src/modules/Tutor.tsx` & `src/App.tsx`)
- 从 `Tutor.tsx` 中剥离臃肿的内嵌 `<AiSettings />` 折叠面板，将宝贵的屏幕空间 100% 留给苏格拉底式对话与考纲检索。
- 顶部导航仅保留极简状态药丸（如 `● SenseNova · SenseChat-5`）与思考强度切换器。
- 增加醒目的 `⚙️ 配置端点与模型` 导航按钮，点击直接调用 `onOpenSettings()` 跳转至全局设置中心（`einstellungen`），实现“教学区域极简轻量化”。

### 2. 模型自主选择与自由输入 (`src/components/AiSettings.tsx`)
- **简单推荐模式（Tab 1）**：新增自主模型输入框，用户可随意填写任意模型 ID；同时配备常见高频模型标签（如 `SenseChat 5`、`Llama 3 (Sauerkraut 8B)`、`Qwen 2.5 (7B)`、`DeepSeek V3`、`GPT-4o Mini` 等），点击即可快速填入；保留 `⇩ 获取在线模型列表` 动态拉取。
- **端点编辑抽屉（Tab 2）**：解禁预设端点编辑权限，支持用户对所有预设及自定义端点自由修改模型。提供“实际请求模型 ID”自主填写框与基于功能角色（Chat/Deep/Fast）的模型细分映射表格（对齐 CC-Switch `102424.png`）。

### 3. 显式“保存设置”动作与即时状态反馈 (`AiSettings.tsx`)
- **简单推荐模式（Tab 1）**：右下角提供显式 `💾 保存设置` 按钮，点击后立即将活跃端点、模型与 API Key 持久化至 `localStorage`，并在界面上方弹出持续 2.5 秒的绿色 `✓ 设置已成功保存` 提示横条。
- **供应商编辑模式（Tab 2）**：右下角设计醒目的蓝底 `💾 保存` 按钮（`bg-[#4338CA] text-white px-6 py-2`，完全对齐 CC-Switch `102424.png` 和 `102431.png` 视觉样式），点击后保存端点数据、同步主路由配置并弹出 `✓ 供应商配置已成功保存` 确认提示后安全返回列表。

### 4. 供应商交互流程全面对齐 CC-Switch (`AiSettings.tsx` & `endpoints.ts`)
- **API Key 显隐切换**：文本框右侧提供内联 SVG 眼睛图标，一键切换明文/掩码显示；并提供官方获取 Key 的外部链接引导。
- **请求地址规范提示**：在 Base URL 下方增加琥珀色提示横条（`💡 填写兼容 OpenAI Chat Completions 的服务端点地址，不要以斜杠结尾`）。
- **高级选项折叠**：支持配置上游协议格式（OpenAI / Anthropic / 自建代理）。
- **元数据丰富**：为 `PRESET_ENDPOINTS` 增补 `websiteUrl`、`upstreamFormat` 和 `recommendedModels`，并在 `loadEndpoints` 中实现旧配置安全继承。

### 5. 模拟交互测试与质量验证 (`src/test/simulatedInteraction.test.tsx`)
- 新增针对 Tab 1 用户自主输入模型与显式点击【保存设置】的端到端自动化模拟交互测试。
- 新增针对 Tab 2 供应商编辑抽屉全流程（修改模型、显隐密钥、测试与保存）的模拟交互测试。
- 全量测试套件验证：**40 个测试文件、233 项测试 100% 全部通过**；`npm run build` 耗时 3.03 秒成功产出。
- 第三方署名更新：在 `NOTICE.md` 中同步补齐 CC-Switch 交互设计与模型映射流的 Clean-Room 借鉴声明。

## 待办与后续
- 用户如有具体的私有代理或特定模型端点需求，可通过新界面直接填写并保存测试。
