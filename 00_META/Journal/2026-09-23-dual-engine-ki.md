---
fach: ""
thema: "Dual-Engine-KI"
datum: 2026-09-23
tags: [EF, Meta]
---

# 2026-09-23晚 内置双引擎AI（用户拍板：切换按钮 + 自填Key + 预设+手册）

## 做了什么（`[App] f2294c1`，已push；build 2.48s；vault-check PASS；1420服务200在线）

- 新 `src/ai/providers.ts`：8预设（OpenRouter/Groq/Gemini/Mistral/DeepSeek/SiliconFlow/本地Ollama-LM-Studio/自定义）+ `eflernvault:ai:v1` 存储（version:1，Key只存浏览器）。
- 新 `src/ai/engine.ts`：统一 `chat()`——api档OpenAI兼容fetch；local档懒加载`@mlc-ai/web-llm`（运行时按预置德语优先级选模型：Qwen3-1.7B→0.6B→Llama-3.2-3B/1B→Phi-3.5-mini，下载进度回调）；off档抛错走模板。
- 新 `src/components/AiSettings.tsx`：三段切换（API直连/本地模型/关闭）+ 服务商下拉（含免费档标注）+ Key/模型/Base-URL + Key直链。
- Tutor：状态栏显当前引擎 + AI设置折叠面板 + 本地下载进度；Quiz两处批改调用同一切engine；Zitierpflicht/模板降级原样保留。
- `@mlc-ai/web-llm 0.2.85`（用户特批的新依赖例外，Apache-2.0，已同步NOTICE.md）。
- 新 `App-EF-Lernvault/AI-SETUP.md`：三档对照 + 8家Key获取/免费额度/默认模型 + 本地模型步骤 + 排错 + 隐私一句话。
- 另：首页引导加DE/中文切换钮（`[App] 9b998d1`）；1420已重启在线。

## 用户动作（按手册来）

1. 浏览器开 http://localhost:1420/ → 首页右上选语言 → 三步引导。
2. 进KI-Tutor → AI设置 → 引擎选API直连 → 服务商选OpenRouter → 按手册拿免费Key粘入 → 模型默认`openai/gpt-oss-20b:free`先跑通。
3. 想试别的模型：只改模型名字符串（如`qwen/qwen3-32b:free`）；想离线：切本地模型，首次下载约1–2GB（Chrome/Edge）。
