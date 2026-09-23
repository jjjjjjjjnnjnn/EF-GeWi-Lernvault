---
fach: ""
thema: "CC-Switch-Endpoint-Routing-Token-Ledger"
datum: 2026-09-23
tags: [EF, Meta]
---

# 2026-09-23 CC-Switch 风格多端点路由与 Token 看板全栈落地（`[App] 9eb40f2`，39 套单测 222 题全绿）

## 取证与基线

- **单元测试**：39/39 个测试套件，**222/222 项单测 100% 全部通过**（新增 12 项单测全面覆盖多端点配置、增删改查、Ping 测速、Token 账本流水统计与智能故障级联路由）。
- **生产打包**：`npm run build` 耗时 6.03s，零 TS 告警，产物纯正零外部新增 npm 依赖（严格遵守 `AGENTS.md`）。
- **Vault 校验**：`python scripts/vault-check.py` 输出 `notes=38 csv_rows=203(bad=0) index_links=134(missing=0) reisen=4 vergleich=0 PASS`。
- **版权声明**：`NOTICE.md` 第 C 节已完整登记对 `CC-Switch`（MIT License，farion1231/cc-switch）在多端点配置管理、活跃路由切换与 Token 统计架构模式上的架构思想借鉴。

## 核心设计与技术落地

1. **界面体验彻底解耦与重构 (`src/components/AiSettings.tsx`)**
   - 彻底告别原先 15+ 项技术参数混杂堆砌的复杂单屏表单，采用 CC-Switch 专业四 Tab 分层架构：
     - **Tab 1: 💡 极简推荐（普通高中生/教师默认）**：三张直观大卡片（📦 离线知识库原生 / ⚡ 本机算力 LM Studio 一键连 / 🌐 云端推荐路线），10 秒上手；
     - **Tab 2: 🔀 端点与路由（CC-Switch 风格）**：端点卡片列表、活跃主路由一键切换、一键全量测速（Ping All）、自定义中转端点抽屉弹窗、备用容灾路由选择；
     - **Tab 3: 📊 Token 消耗看板**：今日消耗 / 累计总消耗 / CCR 算法节省 Token（绿色高亮对比）/ 累计请求轮次四大核心指标卡，每日预算预警阈值设置，近期调用明细流水表；
     - **Tab 4: ⚙️ 高级向量检索**：折叠底层参数（WebLLM 本地模型、L1/L2 向量嵌入、HF 镜像等），不打扰日常使用。

2. **多端点配置与健康探测引擎 (`src/ai/endpoints.ts`)**
   - 原生建模 `AiEndpoint`，支持内置预设（LM Studio 1234、Ollama 11434、DeepSeek、OpenRouter、SiliconFlow、SenseNova）与自定义扩展；
   - 支持独立 API Key、Base-URL、模型名称及状态探测（`pingEndpoint` 毫秒级延迟测试）。

3. **Token 流式采集与预算账本 (`src/ai/tokenLedger.ts` & `src/ai/streamClient.ts`)**
   - `streamClient.ts` 请求体默认注入 `stream_options: { include_usage: true }`，在 SSE 流最后包中精准采集上游返回的实际 Token 消耗；未返回时自动启用本地 `estimateTokens` 补齐；
   - 错误人文化转换：分类显示为 CORS 跨域拦截、Key 无效、429 超频、网络超时等中文友好提示；
   - `tokenLedger.ts` 自动存储近 500 条流水账本，提供按天/历史聚合，以及每日预算超额警告检测。

4. **智能级联故障转移路由器 (`src/ai/router.ts`)**
   - 实现 `Active Endpoint -> Fallback Endpoint -> Vault Native` 优雅三级容灾级联；
   - 主端点断网或 429 报错时，静默秒级转移至备用端点；若全网断连，无缝回退至 EF 知识库原生考点合成，答题 100% 不白屏、不崩溃。
