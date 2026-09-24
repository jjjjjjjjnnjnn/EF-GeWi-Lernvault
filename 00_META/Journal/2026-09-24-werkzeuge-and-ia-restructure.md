---
fach: ""
thema: "Didaktik Werkzeuge Extraction and 4-Zone Academic IA Redesign"
datum: 2026-09-24
tags: [EF, App, Meta]
---

# 2026-09-24 信息架构四分区重组与学科教具独立专区（`[App]` / `[Meta]`）

## 1. 用户指令落实
- “把ai助教的学科辅助工具 板块搬出来，放到和学习相关的部分去”：
  - 从 `Tutor.tsx` 的折叠抽屉中彻底剥离 6 大学科启发工具（`SatzbauLego` 句式积木、`BalanceBoard` 辩证天平、`TextHighlighter` 文本解构、`TangentSlider` 导数几何沙盘、`FormulaScaffold` 四步解题、`OralExamTimer` 口试矩阵）。
  - 创建全新的一级核心学习训练专区 `Werkzeuge.tsx`（快捷键 `Alt W`），享有独立宽屏画布空间与学科自适应高亮推荐。
- “目前网站分类分区功能混乱，大量功能相互交叉，不好用。进行设计处理计划”：
  - 彻底打破以往左侧栏 10 个按钮无层级混杂堆叠的局面。
  - 构建严谨清晰的学术风四大功能专区（概览与规划、知识与图谱、训练与提分、辅助与系统），并在侧栏提供微标签与发丝细线分割。

## 2. 核心架构与功能落地

### ① 全新「学科教具 (Werkzeuge)」独立专区 (`src/modules/Werkzeuge.tsx`)
- **独立一级模块**：注册 `tab: "werkzeuge"`，快捷键为高记忆性的 `Alt W`。
- **学科自适应与智能推荐**：
  - 顶栏或模块内切换学科（SoWi / Deutsch / Mathe / 等）时，自动识别对应认知域，高亮推荐最适教具；
  - 提供平滑的切换标签组，允许学生自由体验 6 大教具。
- **联动操作条**：
  - **一键复制结果**（In Zwischenablage kopieren）：直接提取推演文本用于作业或复习。
  - **一键带入 AI 导师提问**（Mit KI-Tutor diskutieren）：通过 `jumpToTutor` 自动携带当前生成的命题/公式/大纲无缝跳转至 `Tutor` 对话框，由 AI 导师以北威州 EF 考纲标准进行深度批判性答疑与踩分点润色。

### ② AI 助教纯净化与聚焦 (`src/modules/Tutor.tsx`)
- 彻底移除 Tier 2 工具栏及折叠抽屉代码；
- 支持 `initialInput` 外部自动预填；
- 界面纯粹聚焦于核心交互：会话历史列表、思考强度调配（Minimal/Balanced/Deep）、启发引导 vs 考纲直出模式切换、端点模型设置与 Markdown 导出。

### ③ 学术风四大信息架构分区 (The 4-Zone Academic IA)
- **ZONE 1: 概览与规划 (Übersicht & Plan)**：
  - `home`：主页学习看板与今日到期卡片
  - `planner`：考期倒计时与复习甘特日程
- **ZONE 2: 知识与图谱 (Wissen & Struktur)**：
  - `library`：81+ 篇考纲双语核心笔记库
  - `mindmap`：概念网络拓扑图与跨学科思维桥
- **ZONE 3: 训练与提分 (Training & Praxis) [核心学习区]**：
  - `werkzeuge`：【NEW】6大学科启发交互教具
  - `flashcards`：FSRS 智能间隔抽认卡
  - `quiz`：阶段微型演练与概念辨析
  - `klausursim`：全真考场模考 (90~180分钟)
  - `reise`：探究式互动闯关课程
- **ZONE 4: 辅助与系统 (Assistenz & System)**：
  - `tutor`：苏格拉底答疑学伴
  - `einstellungen`：系统偏好、端点与备份设置

## 3. 验证与质量保证
- **单元与契约测试**：全部 55 个测试套件，354 个测试 100% 通过（`npm test -- --run`）。
- **生产打包**：`npm run build` TypeScript 检查与 Rollup 打包一次通过。
- **设计规范**：严格遵循 Tufte Data-Ink 规范，无任何 emoji、纯内联发丝轮廓 SVG、无多余阴影。
