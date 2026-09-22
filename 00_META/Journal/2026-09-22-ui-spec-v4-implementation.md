---
fach: ""
thema: "UI-SPEC-V4 Implementation"
datum: 2026-09-22
tags: [EF, App]
---

# 2026-09-22 UI-SPEC-V4 落地（Vergleich 步态 + 反馈三层 + 困难文案）

## 变更概述

- **§1 Vergleich 步态 UI**：
  - 在 Quiz 模块新增子模式切换：`Klausur-Drill (5 Schritte)` 与 `Vergleich & Unterscheidung`。
  - **1.1 辨别题**：题干 DE serif 在上、ZH sans 小灰在下，Operator 动词高亮（`text-[#4338CA]`）；A/B 选项采用标准文字按钮（墨底选中/空心未选，支持按键 `1`/`2`）；2 行“为什么”输入框受 `isTyping()` 保护；`Vergleichen / 对照看看` 提交按钮允许选错提交。
  - **1.2 对比题 AB 并排**：Tufte 小多组图两列并排（`grid-cols-1 md:grid-cols-2`），中间 1px 发丝线；差异高亮严格限定≤3处（`font-medium underline decoration-[#4338CA] underline-offset-2`），无红绿大色块；窄屏自适应堆叠。
  - **1.3 Gating**：选错即时呈现空心红字 `Falsch / 错了` 并旁挂文案 `Fehler sind gute Signale / 选错是好信号`，`Zur Erklärung / 进解析` 永远可点，允许重选且不计入 FSRS。
- **§2 反馈三层 UI**：
  - **L1 即时 KR**：≤150ms 淡入对错徽标 + 1 行 mono 灰解释，保留大字计时器，默认不泄露解析。
  - **L2 延迟展开**：折叠按钮 `Lösung vergleichen / 对照解析` 默认收起；展开后呈现三项模板 rubric pills、带跳转功能的 Zitierpflicht chips 及笔记原文对照。
  - **L3 过程与元认知**：过程维双 pills（`Belegkette / 证据链` + `Operatorabfolge / 程序顺序`）；“下次先…”单行输入框持久化于 `localStorage: eflernvault:vergleich:v1`（含 `version: 1`）；带有 `+` 行前缀的文本补丁预览与 1.5s 复制按钮。
- **§3 Desirable-Difficulty 5 条文案挂载**：
  - `ddHard`（练时难，考时易）：常驻挂载于 Quiz 步骤线下方第二行及 Vergleich 页头。
  - `ddError`（选错是好信号）：挂载于 Vergleich gating 徽标旁及 Quiz Korrektur 头部。
  - `ddInterleave`（穿插刷比连刷记得牢）：挂载于 Planner 倒计时下方及 Quiz 主题列表底部。
  - `ddRetrieval`（合上书默写，胜过重读三遍）：挂载于 Flashcards 完成态统计下方及 Fehlerlog 视图。
  - `ddExample`（先看例题，再自己来）：挂载于 Quiz Aufgabe 步骤材料区上方。

## 验证

- `npm run build` PASS（50 模块通过，构建耗时 1.10s）。
- Edge Headless 实测 `v4-quiz-klausur.png`、`v4-planner-dd.png`、`v4-vergleich-error-gating-full.png`、`v4-vergleich-l1-l2-l3-full.png`，控制台 0 错误。
