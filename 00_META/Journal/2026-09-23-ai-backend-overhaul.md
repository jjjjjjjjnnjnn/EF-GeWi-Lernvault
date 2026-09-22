---
fach: ""
thema: "AI-Backend-Overhaul"
datum: 2026-09-23
tags: [EF, Meta]
---

# 2026-09-23 中后端与轻量化 AI 实时计算/存储重构完成（`[App] 32345b5`，全绿）

## 取证与基线

- **测试套件**：22/22 个测试套件，151/151 项单测 100% 通过（新增 21 项测试）。
- **生产构建**：`npm run build`（`tsc -b && vite build`）零错误生成。
- **本地服务**：`http://localhost:1420` 正常在线（状态码 200）。

## 核心实现（四阶段全部落地）

1. **阶段 1：统一流式运行时与结构化 JSON 客户端**
   - 新增 `src/ai/streamClient.ts`：支持 SSE（LM Studio / Ollama / API 直连）与 WebLLM 异步流式生成；支持 `AbortSignal` 随时取消或防竞态更新。
   - 新增 `src/ai/schema.ts`：提供带 JSON 提示与分句级容错状态机的 `parseKlausurEvaluation`，彻底根除原简单正则在“未偏离动词指示（nicht verfehlt）”时的假阳性误判扣分缺陷。
   - 在 `Tutor.tsx` 接入打字机流式增量显示，在 `Quiz.tsx`（Klausur 与 Vergleich）接入结构化评分与评语生成。

2. **阶段 2：轻量化原生持久存储与二级向量缓存**
   - 新增 `src/storage/idb.ts`：基于原生 IndexedDB 实现高维向量（Float32Array / number[]）持久化，配有内存级静默降级（防止无 IndexedDB 环境报错）。
   - 重构 `src/engine/embed.ts`：将单级内存 `vecCache` 升级为两级缓存（内存热点 + IndexedDB 持久化）。页面刷新或重启后向量毫秒级命中，避免重复 Embedding 显存与网络开销。

3. **阶段 3：实时计算解耦与智能上下文预算**
   - 新增 `src/engine/context.ts`：实现基于中德混合字符特征的 Token 动态估算器与上下文预算管理器（`budgetContext`），在 `Tutor.tsx` 中保障长文本对话与 Vault 笔记切片不溢出 4K 上下文。
   - 新增 `src/engine/worker/compute.ts`：将高维余弦相似度计算与断言批处理语义检验迁移至异步批处理，避免阻塞 UI 渲染主线程。

4. **阶段 4：本地 LLM 心跳存活探针与 UI 状态感知**
   - 新增 `src/ai/heartbeat.ts`：针对 LM Studio（1234 端口）、Ollama（11434 端口）及自定义 API 提供 2 秒超时轻量心跳探测（`probeAiConnection`），并支持全局状态监听。
   - 在 `AiSettings.tsx` 顶栏挂载毫秒级在线/不可达状态指示灯与即时 Ping 刷新按钮。

## 交接与后续维护

- 新 Agent 阅读路线：`HANDOVER.md` → `00_META/INDEX.md` → 本篇。
- 代码库状态：无未提交改动，无外部未批准依赖引入，完全遵循 `AGENTS.md` 公开安全与学术风规范。
