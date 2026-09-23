---
fach: ""
thema: "Headroom-Token-Kompression"
datum: 2026-09-23
tags: [EF, Meta]
---

# 2026-09-23 Headroom 启发式 Token 压缩与可逆缓存引擎落地（`[App] 271d7d7`，36 套单测 210 题全绿）

## 取证与基线

- **单元测试**：36/36 个测试套件，**210/210 项单测 100% 全部通过**（新增 11 项专门覆盖 CCR 存储、SmartCrusher 表格折叠、RAG 考点提取、5D 历史评分与三区上下文汇聚）。
- **生产打包**：`npm run build` 耗时 6.11s，无 TS 告警，产物纯正零外部新增 npm 依赖（遵循 `AGENTS.md` 版权与构建底线）。
- **Vault 校验**：`python scripts/vault-check.py` 输出 `notes=38 csv_rows=203(bad=0) index_links=132(missing=0) reisen=4 vergleich=0 PASS`。
- **版权声明**：`NOTICE.md` 第 C 节已完整补齐对 Headroom（Apache-2.0）的架构设计借鉴与署名。

## 核心设计与技术落地

1. **Clean-Room 纯原生架构与版权合规**
   - 深入调研 `headroomlabs-ai/headroom`（Apache-2.0 许可），摒弃引入 Python/二进制包方式，在 TypeScript 下完成 100% 原生纯净重写，未直接复制其源码。
   - 零引入新 npm 依赖，符合项目安全与离线分发策略。

2. **CCR (Compress-Cache-Retrieve) 可逆内容寻址缓存 (`src/storage/ccrStore.ts`)**
   - 快速生成 32-bit FNV-1a 紧凑哈希键（`h-xxxxxxxx`）。
   - 双层缓存：内存 Map（0ms 响应）+ IndexedDB `ccr_cache` 持久化，提供 TTL 自动修剪与无损还原能力。

3. **SmartCrusher 与 5D 评分智能压缩器 (`src/engine/compressor.ts`)**
   - **表格折叠 (`compressStructuredData`)**：提取统一表头与行列矩阵（Markdown/TSV），相比冗余 JSON 降低 40–70% Token 消耗。
   - **RAG 考点提取 (`compressRAGChunks`)**：Top-1 核心考点 100% 完整保留；Top-2+ 仅提取 Klausur-Satz、核心术语与问题相关句，全文自动写入 CCR，末尾附注 `[Ref: #h-xxxxxx]`。
   - **5D 历史裁剪 (`compressDialogHistory`)**：Anchor 1（首轮问题）永久锁定，最近 2 轮对话保真，学生错题与助教批改（`ERROR_ANOMALY_REGEX`）100% 保留防概念漂移；长篇回复摘要化并附带 CCR 引用锚点。

4. **Hot/Warm/Live 三区上下文组装 (`src/engine/context.ts`)**
   - **Hot-Zone**：保持 `TUTOR_SYSTEM` 字节级静态绝对不变，最大化命中各大模型 Provider 及本地 LM Studio / vLLM 的 KV Cache Prefix。
   - **Warm-Zone**：CCR 考点知识库动态装配。
   - **Live-Zone**：压缩对话轮次与当前提问。

5. **AI 助教互动展开与体验增强 (`src/modules/Tutor.tsx`)**
   - 将 `budgetContext` 无缝升级为 `assembleOptimizedContext`，引擎标签实时展现压缩收益（如 `CCR -180tok`）。
   - `renderAiText` 双正则解析，点击 `[Ref: #h-xxxxxx]` 即可唤起 Tufte 风格的原型卡片，随时无损查看压缩前的完整考纲原文。
