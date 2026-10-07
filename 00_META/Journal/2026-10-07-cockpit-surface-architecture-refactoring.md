---
fach: ""
thema: "Journal 2026-10-07 Cockpit Surface Architecture Refactoring"
operatoren: []
klausurrelevant: false
datum: 2026-10-07
tags: [EF, Meta, Journal]
---

# 2026-10-07 — 会战总台系统级重构（现代 SaaS 8:4 双白卡表面架构落地）

## 1. 触发背景与目标
针对备考战力总台出现的“纯黑卡片视觉拉扯”、“横向通栏大面积空白”、“键盘打印字符硬拼”以及“缺乏三层表面（Surface）纵深”的问题，拒绝局部打补丁，实施系统级重构。

## 2. 核心架构重构落地
1. **三层表面（Surfaces）体系确立**：
   - **Surface 0（画布底色）**：全页面统一为 `bg-[#F8FAFC]`（柔和极浅灰冷调）；
   - **Surface 1（卡片层）**：统一使用 `.card-elevation`（纯白底、微发丝边框 `border border-slate-200/85`、微弥散环境阴影），彻底消除纯黑“黑膏药”卡片，实现 8:4 双白卡黄金分栏视觉平衡；
   - **Surface 2（嵌入式凹槽）**：列表内嵌与刻度槽位统一下沉为浅灰 `bg-slate-50` 或 `bg-slate-100`。
2. **Hero 战力看板构图重组**：
   - **左侧 8 Col（战力状态）**：大号加粗数值 `11` 与 `Notenpunkte` 标签；消除横向空洞；采用 4 阶段平滑圆角轨道（10 NP / 11 NP 当前 / 13 NP / 15 NP），彻底移除渲染错位的孤立悬空点；
   - **右侧 4 Col（今日行动）**：白底卡片配合微暖环境光，配备现代深色胶囊按钮 `bg-slate-900` 与精细箭头图标；
   - **下方贯穿式时间线 Stepper**：彻底摒弃三个笨重的大方框，改用横向水平连线与微圆点步进器（已达成对勾、当前深色实心点、目标灰环）。
3. **失分点诊断与弱项列表**：
   - 彻底清除 `[OK]`、`[*]`、`[]`、`->` 等键盘打印字符，改用语义化 Badge 与内联 SVG；
   - 采用标准 Divided List（`divide-y divide-slate-100`），薄弱项采用淡红底色（`bg-rose-50/80`）突出显示，右侧配备标准圆角进度条；
4. **侧边栏快捷键降噪**：
   - 侧边栏所有 `Alt 1` ~ `Alt 9` 全面封装为标准的微型 `<kbd>` 徽标（`text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200/60 opacity-60`），消除视觉噪音。

## 3. 质量门禁与验证
- `npx vitest run src/modules/DashboardCockpit.test.tsx src/modules.test.tsx`: 27 个测试全部通过（含 UI source contract：零 Emoji、无非法阴影/斜体门禁）；
- `npx tsc -b`: 0 编译错误；
- `python scripts/vault-check.py`: PASS。
