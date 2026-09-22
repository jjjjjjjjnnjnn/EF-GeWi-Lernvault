# AI-SETUP — KI-Engines 操作手册 / 操作手册 (Stand: 2026-09-23)

> App 内置双引擎 + 切换按钮（KI-Tutor 顶部 **AI设置**）：**API-direkt / API直连** ↔ **Lokal / 本地模型** ↔ **Aus / 关闭**。
> LM Studio 不再是必需品（仍可作为“本地服务器”选项保留）。Key 只存浏览器 localStorage，永不进仓库。

## 1. 三档怎么选 / 三档怎么选

| Engine | 适合 | 代价 |
|---|---|---|
| API-direkt（推荐起步） | 试模型、要质量、要长上下文 | 需联网 + 各家免费 Key；prompt 发到服务商（欧盟用户在 Google 免训练） |
| Lokal (WebLLM) | 隐私、离线、无 Key | 首次下载约 1–2 GB；需 Chrome/Edge 113+（WebGPU）；质量弱于大模型 |
| Aus | 纯模板自检 | 零依赖零网络；自由问答只给vault原文摘录 |

Quiz 批改自动跟随同一引擎；Zitierpflicht（断言必须带 `[Pfad#Zeile]` 出处）三档都不松。

## 2. API 服务商预设 / API 服务商预设（App 下拉框顺序）

- **OpenRouter**（试模型首选）：一个 Key 全路由，改模型字符串就换模型。Key：https://openrouter.ai/keys（免卡；免费池 `:free` 约 50 次/天）。默认 `openai/gpt-oss-20b:free`，想试德语强的换 `qwen/qwen3-32b:free` 或 `google/gemma-3-27b-it:free`（以站内 Free 列表为准）。
- **Groq**（速度首选）：https://console.groq.com/keys（免卡；约 1000 次/天）。默认 `openai/gpt-oss-20b`，德语强项 `qwen/qwen3-32b`。
- **Google AI Studio**（长上下文）：https://aistudio.google.com/apikey（免卡；最高 1M 上下文，可整本笔记塞入）。默认 `gemini-2.5-flash`（以 Studio 内模型列表为准）。
- **Mistral**：https://console.mistral.ai/api-keys（免卡；$10/月 Free 额度；注意免费档默认参与训练）。默认 `mistral-small-latest`。
- **DeepSeek**（最便宜付费）：https://platform.deepseek.com/api_keys（1M 上下文；V4 Flash 级约 $0.15/百万输入）。默认 `deepseek-chat`。
- **SiliconFlow**（中文界面+支付宝）：https://cloud.siliconflow.cn/account/ak（Qwen3-8B 永久免费档）。默认 `Qwen/Qwen3-8B`。
- **Lokal (Ollama / LM Studio)**：本机服务，无 Key。Ollama 默认 `http://localhost:11434/v1` + `qwen3:8b`；LM Studio 把 Base-URL 改成 `http://localhost:1234/v1` 即可沿用旧习惯。
- **Eigen**：任何 OpenAI-compatible 地址（校内网关/自建 vLLM），手填 Base-URL + Key + 模型名。

模型名是**可编辑文本框**——服务商改 Roster 时照站内最新名填写即可，不用等 App 更新。

## 3. 本地模型 (WebLLM) / 本地模型

1. 引擎切到 **本地模型**，打开一篇 Tutor 对话发一句话——自动下载（进度条显示 %，断点续传走浏览器缓存）。
2. 默认优先级：Qwen3-1.7B（德语最好）→ Qwen3-0.6B → Llama-3.2-3B/1B → Phi-3.5-mini（App 按浏览器支持自动选存在的）。
3. 要求：桌面 Chrome/Edge 113+、约 4 GB 空闲内存；下载是一次性的，之后可离线。
4. 预期：短问答/润色/按 rubric 批改可用；难题（数学多步推理）建议切 API 大模型——这就是切换按钮存在的意义。

## 4. 本地向量检索 L1（RAG 语义档，可选）/ 本地向量检索

1. 默认**不会自动下载**：Tutor 平时走 RAG-L0（关键词，一样带引用）。想开语义检索→ AI设置 **本地向量检索L1** 切“开启”→ 点 **现在加载**（约 300 MB，jina 德语模型，进度按字节走）。
2. 三档：关闭（只关键词）/ 自动（仅已加载时用，永不偷下载）/ 开启（允许下载）。
3. 国内 HF 直连慢或卡住→ **HF镜像**填 `https://hf-mirror.com` 再点加载；手机默认不用 L1（太重）。
4. 卡在下载中→ 刷新页面（下载随页面死掉）→ 切 API/关闭照常用；本地聊天引擎旁有 **重置本地引擎** 可清空中场状态。
5. L2（API 向量）：Embedding 栏填服务商向量模型名（如 `text-embedding-3-small`），走同一 Key；留空=关闭。

## 5. 排错 / 排错

- “请填 API-Key”→ AI设置里选对服务商、粘 Key（`sk-…`，注意别粘多空格）。
- HTTP 401 → Key 错/过期；HTTP 429 → 免费额度撞墙，换服务商或等次日（OpenRouter 可切 `:free` 别家）。
- 本地模型白屏转圈 → 看是否 WebGPU 被禁（`chrome://gpu`）；无独显的旧机直接用 API 档。
- 引用 `[Pfad#Zeile]` 点不开 → 先在顶栏打开 Vault 文件夹（知识库未连接时只有演示数据）。

## 6. 隐私一句话 / 隐私一句话

- 本地档：数据不出浏览器。API 免费档：prompt 会经过服务商；课堂真题/个人信息别往里贴，只问vault里已有的概念——这也是 Zitierpflicht 要你做的。
