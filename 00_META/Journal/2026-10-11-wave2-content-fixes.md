---
fach: ""
thema: "Wave2内容修复收尾：Glossar/教具54占位/改名42篇/问询稿/App宪法批修"
datum: 2026-10-11
tags: [EF, Meta]
---

# 2026-10-11 施工日志：Wave2 内容修复收尾（Glossar + 教具 + 改名 + 问询稿 + App）

> 只新建本日志与 Wave3 日志，不碰其他文件，不 commit。
> 前置：Wave1 `2026-10-11-wave1-engineering-hygiene.md`（WARN 363 条分类）；
> hash 取自 `git log --oneline -8`（7f70dc5 / 4febb82 / 515d89f / c4a5c85 / bea03f1 / 5ee92bf / c040155 / b1c42ad）。

## 1. 做了什么（Wave2，6 commits）

1. **Glossar 去重补全**（`7f70dc5 [Meta]`）：`00_META/Glossar-DE-ZH-GeWi.md` ±201 行级整理，
   去重 + 补全 Wave1 实算 998 行（pipe 表格 969）口径；`badglossar=0` 保持。
2. **教具 54 占位清零**：空 `[Werkzeug: <id>]` 占位 54 处全部填充——
   Musik 18 篇（`5ee92bf`：oral-timer/highlighter）+ Sport 20 篇（`c4a5c85`：oral-timer/highlighter/gewi-reading）
   + Philo 16 篇（`bea03f1` 内：ethik-waage 填充）；同步去 Lesson-v3 水印。
3. **改名 42 篇**：Philo→Philosophie 30 篇（`bea03f1`，+3 处课程链修复 + INDEX 1 行）+
   Sowi→SoWi 12 篇（`515d89f`，+3 处跨课引用修复）。Wave1 的 42 大小写分裂 WARN 对应清零。
4. **问询稿**（`7f70dc5` 内）：`00_META/Lehrkraft-Anfragen.md` A11/G6G7 问询稿补齐（+4 行），
   不分次打扰原则；`Pruefungspakete-Uebersicht.md` +2 行、`EXTERNAL-AI-COURSE-PROMPT` +4 行、
   `AGENTS.md` tags 规则 2 行（stufe/kursart 遗留可选、新笔记不写）。
5. **App 视觉逻辑批修**（`4febb82 [App]`，15 文件 +323/−257）：
   去绿卡 shadow/italic/emoji（Tufte 黑白纸墨宪法）+ Fehlerlog 统一 6 列 + XP 断点 +
   去伪造 fallback + SVG 保中心（transformOrigin 绑定几何中心）。
6. **Blocker-Register**（`7f70dc5` 内，±10 行）：恢复 App 线阻塞登记。

## 2. 说明：[Musik] 误带改名

- `5ee92bf [Musik]` 实际 diff 仅为教具 ID 填充 + 去 v3 水印（9 文件，无 rename），
  无改名内容；commit 归属/表述中误带"改名"语义，特此澄清——
  42 改名 = Philo 30 + SoWi 12，Musik 按教具填充计，不计入改名数。

## 3. balance-board 遗留认定

- Sport/Bio/Chemie 残留 `[Werkzeug: balance-board]` 属合法教具 ID（白名单内真实工具），
  非空占位，不计入 54；Wave1 WARN 中的"空占位 ×54"与此类合法引用区分。

## 4. 残留（留 Wave3/主线程）

- Sport 8 处 balance-board 合法引用保留；Bio/Chemie balance-board 合法引用保留。
- SoWi Sinus-Milieus Lesson-v3 为已披露唯一例外（非 Enterprise-v5），属预期 WARN。
- ⏳ 12 类未登记：Wave2 未新立待确认项；Wave1 遗留 ⏳（S8-Noten-Index 225/226 差 1）仍有效，
  另有约 12 类潜在待确认事项尚未登记 Block Register，留主线程补登记。
- 真相链：`vault-check` PASS（vergleich=0/badnames=0/badglossar=0）；vitest/tsc/build 三门禁复验留主线程。
