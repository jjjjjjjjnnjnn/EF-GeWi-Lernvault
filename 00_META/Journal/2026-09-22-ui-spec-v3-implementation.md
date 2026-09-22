---
fach: ""
thema: "UI-SPEC-V3 Implementation"
datum: 2026-09-22
tags: [EF, App]
---

# 2026-09-22 UI-SPEC-V3 界面与功能落地 (P2/P3/P4)

## 变更概述

- **P2 背卡与 FSRS 调度器**：
  - 新建 `src/scheduler.ts`：纯前端轻量 DSR 记忆算法模型，支持 Again(1) / Hard(2) / Good(3) / Easy(4) 评分与状态机流转，持久化于 `localStorage: eflernvault:fsrs:v1`。
  - 改造 `src/modules/Flashcards.tsx`：修复制卡四个评分按钮行为相同的 bug；增加顶栏 `fällig N / M · 新卡 K` 计数；卡片角瞬显 `→ Xd` 1.2s 淡出提示；队列清空时呈现完成态 `Fertig für heute / 今天已完成` 并附带浏览模式入口（`Trotzdem weiter`）。
- **P3 AI 助教与五步模考**：
  - 新建 `src/quizgen.ts`：基于 vault 中 `klausurrelevant: true` 笔记自动装配标准三段式题目（`darstellen → analysieren → beurteilen`）与三类评分标准（`Operator verfehlt / Fachbegriff falsch / Beleg fehlt`），带离线降级兜底。
  - 改造 `src/modules/Quiz.tsx`：完整重构成五步流（1 Thema → 2 Aufgabe → 3 Antwort → 4 Korrektur → 5 Fehlerlog），支持 Space 快捷键计时（受 `isTyping()` 保护）、LM Studio 智能打分或离线模板自查、可切换交互式 rubric pills，以及一键复制带有 `+` 前缀的 Obsidian 错题日志补丁。
  - 改造 `src/modules/Tutor.tsx`：接入 LM Studio 本地 API（`http://localhost:1234/v1/chat/completions`）；实现 Zitierpflicht 引用交互 chips（点击直达笔记库对应主题）与 `ohne Beleg / 无出处` 警示 chip；实现琥珀色降级态框（`LM Studio nicht erreichbar — Vorlagen-Modus`）及错误重试态。
- **P4 规划、导图与数据透传**：
  - 改造 `src/modules/Planner.tsx`：实现 Tufte 极简方块复选框（墨底白勾），倒计时默认 6 月底（`2027-06-30`），数据自动存取于 `localStorage: eflernvault:plan:v1`。
  - 改造 `src/modules/Mindmap.tsx`：基于 `vault ?? mock` 笔记层级自动构建“学科（根）→ 主题（叶）”网络，连接线采用 CSS/SVG 极简实线，点击叶节点平滑跳转笔记库。
  - 改造 `src/App.tsx` & `src/keys.ts`：透传真实 vault 数据至全模块；新增 `Strg/⌘ E` 快捷键与命令面板 `act-export-fsrs` 导出动作（下载 `eflernvault-fsrs-v1.json`）。

## 验证与测试

- `npm run build` PASS（`tsc -b && vite build` 构建耗时 1.04s，50 模块通过）。
- Headless Edge 截图实测全模块渲染正常无报错。

## 主Agent验收（同日复核）

- build 复验 PASS；§7 清单：P2 四评分已区分/due队列/完成态/localStorage schema `version:1` ✓；
  P3 降级框+chips+ohne Beleg+五步Quiz+rubric pills+补丁复制 ✓；
  P4 vault透传+双export+keys登记 ✓；禁碰区干净（仅src） ✓；零U+FFFD ✓。
- 记录两处偏离（接受，不打回）：① scheduler为手写DSR-like算法而非ts-fsrs——零依赖合§1精神，EF题量下等效，
  后续P5前做一次参数校准；② `act-export-xp`为计划外附赠，已登记，无害。
- SoWi侧同日收官：12/12（Ungleichheit+Kap.1–11），csv 147行零坏列，INDEX 79链接全有效。
