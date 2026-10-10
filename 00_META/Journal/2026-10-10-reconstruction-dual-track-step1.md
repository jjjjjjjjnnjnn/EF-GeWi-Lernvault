---
fach: Meta
thema: "教会人重构双线第一步（B1样板+A1答案显影）"
operatoren: [darstellen, analysieren, beurteilen]
klausurrelevant: false
datum: 2026-10-10
tags: [EF, Meta]
---

# 2026-10-10 会话日记：教会人重构双线第一步（B1 样板 + A1 答案显影）

> 用户判断"课程教不会人" → 互联网方法论调研（Brilliant/Khan/CLT/Retrieval/LearnLM/KLP/Study-Mate）+ 项目解剖（Top 8 缺陷）→ 用户选定全量重构 + 双线并行 + 温和引导 → 本会话执行双线第一步。

## 1. B1：5 篇 v4→v5 样板（2 个 subagent 并行，主线程机检复核）

- SoWi-Mietendeckel / Physik-Bewegung / Deutsch-Raeuber / Mathe-Integral / Philo-Utilitarismus，全部 `version: Enterprise-v5`。
- 四补丁：C1 AUFLÖSUNG（机制解析移入选后区）/ C2 COMPLETION 挖空 + HILFE 去代数 / C4 KERNSATZ（≤25 词+三槽+挖空自测）/ C5 ERWARTUNGSHORIZONT（三栏采分）。
- 机检：5 篇新结构全有、无 →⇒、零 emoji。

## 2. A1：ausprobieren 答案折叠显影（主线程，Reise.tsx）

- 解析器本就切出 `antwort`（reise.ts:184）但渲染层只喂 KI prompt；新增 `tryShowAntwort(Map)` 状态 + "显示标准解析 / Musterlösung"折叠块，离线可用。
- 合约：无 emoji/shadow/italic，沿用 hilfe 折叠样式。

## 3. 门禁

- `npx tsc -b` 0 报错；`vitest src/modules.test.tsx` 23/23；`vault-check.py` PASS（reisen=361）。
- 未 commit（等用户指示；内容与引擎改动建议分两个 commit）。

## 4. 待办

- A2 站队温和门 / A3 微世界参数透传 / B2 分 10 批回填存量 356 篇。
