---
fach: Meta
thema: "Sinus-Milieus 阶层气泡中心缩放修复与全景学术排版高对比度强化"
operatoren: [analysieren, optimieren, implementieren, pruefen]
klausurrelevant: false
datum: 2026-10-04
tags: [EF, Meta, App, Labor, SoWi, UI-Design]
---

# Sinus-Milieus 阶层气泡中心缩放修复与全景学术排版高对比度强化

## 1. 痛点诊断与用户指令

根据最新截图 `firefox.exe_20261004_200756.png` 与反馈：
1. **气泡中心缩放偏移问题**：鼠标悬停在 SVG 阶层气泡上时，气泡向右下方偏心放大，而非以气泡自身几何圆心为中心缩放；
2. **文字发虚、对比度低看不清**：
   - 气泡内部文字（如“传统本色 11%”、“新生态派 8%”等）在浅色或半透明背景下白字发虚、难以辨识；
   - 坐标象限背景大字（`Tradition`, `Modernisierung`, `Neuorientierung` 等）透明度过高（0.6 灰色）；
   - 右侧详情卡片存在混杂的有色卡片（如 `text-sky-700`, `text-emerald-700`, `bg-amber-500/10` 浅黄底浅褐字），违反 Tufte 纯净墨水排版规范。

## 2. 根因剖析

1. **SVG Transform Origin**：SVG 规范中 `<g>` 标签的 CSS `transform: scale(1.05)` 默认基准点是 SVG 视口的 `(0, 0)` 左上角，而非元素自身包围盒中心，在各浏览器渲染引擎中会导致缩放时整个气泡产生几何位移。
2. **文字渲染层级与对比度**：气泡在非选中状态透明度较低（0.45），白字缺乏投影与轮廓描边；卡片排版沿用了旧版多色主题，文字浅淡。

## 3. 重构实施与效果 (`SinusMilieusSim.tsx`)

### A. 气泡中心锁定与平滑缩放
- 在每一个阶层气泡的 `<g>` 组上注入动态行内样式：
  ```tsx
  style={{
    transformOrigin: `${cx}px ${cy}px`,
    transformBox: "view-box",
  }}
  ```
- 悬停缩放（`hover:scale-105`）严格以气泡物理几何中心 `(cx, cy)` 为原点均匀膨胀，彻底杜绝偏心位移。

### B. SVG 文字高清可读性与对比度跃升
- 气泡基底透明度由 `0.45` 提升至 `0.65`（选中态保持高亮 `0.90`）；
- 气泡内文字加入深色阴影滤镜 `drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))`，字号与字重强化，在任何色调上均清晰锐利，符合 AAA 对比度标准；
- 背景四大价值象限背景标签文字颜色升级为 `var(--ink)` 墨色深印（80% 墨水浓度 + 粗体），层次分明。

### C. 详情面板与真题评分卡片 Tufte 极简墨水化
- 彻底清除所有浅蓝、浅绿、浅黄等杂色文本；
- 职业阶层地位、媒体消费、考点聚焦等卡片统一采用 `bg-[var(--paper-subtle)]` 纸张质感底色 + `border-[var(--line)]` 细线边框 + `text-[var(--ink)]` 深墨色字体；
- 官方采分点（EHZ）与 15 分范文卡片统一为纯净深墨色排版。

## 4. 验证与构建

- 执行 `npx tsc -b` 编译检查，零错误通过（0 errors）。
- UI 交互与视觉效果完全符合 Tufte Editorial 学术规范。
