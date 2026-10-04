---
fach: Meta
thema: "Labor 全面禁用浅绿字体与杂色背景，贯彻 Tufte 纯净学术黑白墨水排版规范"
operatoren: [analysieren, optimieren, implementieren, beurteilen]
klausurrelevant: false
datum: 2026-10-04
tags: [EF, Meta, App, Labor, UI-Design]
---

# Labor 全面禁用浅绿字体与杂色背景，贯彻 Tufte 纯净学术黑白墨水排版规范

## 1. 痛点诊断与违规排版定位

用户在最新截图中（`firefox.exe_20261004_190959.png`）明确发出指令：
- “禁用这种绿色字体，背景，颜色等排版。”

在先前排版中存在以下破坏 Tufte Editorial 学术纯粹性与可读性的问题：
1. **状态徽章杂色**：使用了 `border-emerald-500/30 bg-emerald-500/10 text-emerald-700`，白底浅灰背景下字体发浅发虚，对比度极低；
2. **KPI 仪表盘变色混杂**：4 栏仪表中将 CS 设为浅蓝底蓝字、PS 设为浅绿底绿字（`text-emerald-800`），与整套 App 极简纯净的纸张墨水风格严重冲突；
3. **SVG 福利几何与图例着色过艳**：CS/PS 水印与图例采用了过饱和彩色；
4. **探究目标与 HUD 状态徽标**：`UniversalInteractiveWorkbench.tsx` 中在目标达成时同样使用了 `text-emerald-700 bg-emerald-50`。

## 2. 全量重构实施

按 Tufte Editorial 学术极简排版准则（高数据墨水比、去除一切无意义杂色背景）：

### A. 市场与福利经济学沙盒 (`MarktMechanismusSim.tsx`)
- **状态徽章**：统一为 `border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] font-semibold`，彻底去除任何绿底绿字；
- **4 栏 KPI 仪表盘**：全量统一为干净的 `bg-[var(--paper-subtle)]` 纸面底色 + `border-[var(--line)]` 细线框，标题统一为 `text-[var(--gray)] uppercase tracking-wider`，读数统一为深墨色 `text-[var(--ink)] font-bold font-mono`（DWL 仅在存在社会净损失时使用经典警示色，均衡时为深墨色）；
- **SVG 几何图谱与图例**：
  - CS 消费者剩余：采用学术经典细点划线斜纹轮廓与极淡墨水透明阴影（`fill="var(--ink)" fillOpacity="0.06"`）；
  - PS 生产者剩余：采用柔和纸灰墨水阴影（`fill="var(--ink)" fillOpacity="0.12"`）；
  - 水印文字统一为深墨色（`fill="var(--ink)" fillOpacity="0.5"`）；
  - 底部图例彻底移除绿字与高饱和色块，改用墨色透明度阶梯色板；
- **模式切换按钮**：改用极简 Tufte 纯黑白按钮组（选中为 `bg-[var(--ink)] text-[var(--paper)] font-bold`，未选为纸面白底细线灰字）。

### B. 欧央行利率走廊沙盒 (`EzbGeldpolitikSim.tsx`)
- 物价目标黄金区间徽章改用白底细线墨色字体；
- 目标区刻度条标记改用中性柔和墨灰色；
- 会考采分核心规范卡片左饰条改用深墨色 `border-l-[var(--ink)]`，正文深墨色高对比度排版。

### C. 通用工作台 HUD 与挑战卡 (`UniversalInteractiveWorkbench.tsx`)
- 顶部 HUD 运行状态指示徽章由绿底绿字改为 `border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)]`；
- 挑战目标达成徽标由 `bg-emerald-100 text-emerald-800` 改为规范的 Tufte 线框纸面墨色徽标。

## 3. 验收结果

- 执行 `npx tsc -b`：**0 错误通过**。
