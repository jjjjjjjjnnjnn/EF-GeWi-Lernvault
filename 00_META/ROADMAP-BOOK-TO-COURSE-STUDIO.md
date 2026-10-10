---
fach: ""
thema: "Roadmap: Book-to-Playable-Course Studio & Painless Interactive Learning"
operatoren: [darstellen, analysieren, beurteilen]
klausurrelevant: false
datum: 2026-10-10
tags: [EF, Meta, App, TeachingStudio, Roadmap, GameDesign]
---

# 【商业级教学专区】任意书籍智能拆解·无痛节奏规划·交互游戏化研习工坊架构路线图
> EF-GeWi-Lernvault 商业产品级核心教学板块研发纲领 · 2026-10-10

---

## 一、 核心目标与产品愿景 (Mission & Product Vision)

### 1. 用户核心诉求
> **“给我们的产品任意一本书或者内容，就能自动拆分，计划学习节奏，给出这些讲解，重难点提炼等。最重要的我希望无痛学习，自然学习，要好玩，有交互性。界面简洁，有视觉引导性。目前这个项目是要作为产品的。”**

### 2. 商业级产品定位 (Product Value Proposition)
将系统现有的 356 门微课阅读（`Reise`）、24 款仿真教具（`Labor`）、原典文献解剖台（`GeWiReadingLab`）与大纲拆书流水线（`CoursePipeline`），全面重构升级为一个与「学科专区（`SubjectWorkspace`）」等量齐观的**商业级独立教学中心工作台——`TeachingStudio`（互动教学研习工坊）**。

其核心使命：
1. **任意输入 ➔ 智能结构化**：无论是一本教材 PDF、教学大纲、Markdown 讲义还是主题，系统均能第一性原理拆解为带前置依赖的概念网络（DAG）；
2. **无痛节奏 ➔ 自然心流**：自动将全书内容编排为每日 10–15 分钟的微学习块（Micro-Learning Block），杜绝压迫感与大段枯燥文本堆砌；
3. **直觉重构 ➔ 难点提炼**：用生活通俗比喻建立心智模型，提炼考纲精确定义、高频失分陷阱（Fehlerquellen）与 15 NP 会考踩分话术；
4. **可动微世界 ➔ 好玩交互**：每节微课均内嵌“可动手玩参数”的仿真沙盘、道德天平或逻辑积木，动手观察现象推导结论；
5. **苏格拉底伴学 ➔ 状态机闭环**：自适应调频问答（“这里没懂”降维启发 / “太简单了”反例挑战 / “考考我”现场核验），通关后即时点亮技能树连线并生成 `Fehlerlog.md` 错题补丁。

---

## 二、 行业标杆调研与技术借鉴 (Benchmark & Architectural Insights)

经过对开源社区与工业级标杆产品的调研，系统重点吸收融合以下最佳实践：

| 标杆项目 / 体系 | 架构哲学与核心亮点 | 本项目直接融合与复用策略 |
| :--- | :--- | :--- |
| **[Study-Mate](https://github.com/Miaotofu01/Study-Mate)**<br>*(Cattofu 开源)* | • 原则是「learn with doing」；<br>• 课程分三类：概念课、实操课、实验课；<br>• 大纲按前置依赖排成路线图（DAG）；<br>• 严格以教材原文为唯一基准（Reference-Grounded）；<br>• 自适应对话调频（“这里没懂”/“太简单了”/“考考我”）。 | **深度吸收其伴学与教材锚定机制**：<br>1. 引入三类课型体系与 DAG 进阶路线；<br>2. 移植其苏格拉底自适应伴学逻辑（不直接给答案，递进式启发）；<br>3. 建立教材原文对照锚点，防止 AI 幻觉。 |
| **[NotebookLM](https://notebooklm.google.com/)**<br>*(Google)* | • 强 Source-grounded 闭环，基于用户上传书籍产生 Study Guide、FAQ、核心考点提炼与智能大纲。 | **吸纳其提炼规范**：拆书时严格生成核心定义、考点关系对比表与失分陷阱。 |
| **[Brilliant.org](https://brilliant.org)** | • 概念驱动交互（Concept-first Interactive Learning）；<br>• “一屏一概念，一概念一交互”；<br>• 拒绝纯文本，必须先滑参数、拨动开关看到物理现象。 | **落实微世界交互铁律**：微课每一步必须具备交互触点（内嵌 24 款纯 SVG 教具或通用可动小工具）。 |
| **[Duolingo](https://duolingo.com) & [SkillTreeOSS](https://github.com/Preptics/SkillTreeOSS)** | • RPG 关卡地图、每日微专注块、连击天数（Streak）、经验值（XP）与视觉点亮。 | **吸纳其无痛节奏感**：将书籍划分为 10–15 分钟关卡任务链，配合图谱连线由虚变实的墨水波纹。 |
| **本项目已有底层资产** | • `coursePipeline.ts`（拆书大纲与战役生成）；<br>• 24 款 Tufte 纯黑白纯 SVG 交互教具；<br>• 712 节点技能树状态机与 `markNodeMasteredByCourseId`；<br>• FSRS 记忆调度器与今日专注块（`DashboardCockpit`）。 | **无缝串联形成闭环**：无需从零造轮子，专注于顶层工作台与交互流转的一体化整合。 |

---

## 三、 视觉设计与交互引导哲学 (Visual Scaffolding & Clean UI)

> 严格遵从 Edward Tufte 数据墨水比理论与商业级产品规范：

```
+---------------------------------------------------------------------------------------+
|  [学科选择器] SoWi v  |  [教材/主题] 德国政治经济大纲 v  |  [进度] 6/24 关卡 · 280 XP   |  [设置]   |
+---------------------------------------------------------------------------------------+
|  [Tab 0: 关卡全景地图]  |  [Tab 1: 教学演播厅]  |  [Tab 2: 微世界沙盘]  |  [Tab 3: 拆书工坊]     |
+---------------------------------------------------------------------------------------+
|                                                                                       |
|  [ 视觉引导区: 渐进式披露主线 (Progressive Disclosure) ]                                  |
|                                                                                       |
|  Kapitel 1: 市场机制与效率 [已通关 Gekonnt]                                               |
|  [●] 01 供求定律 ─── [●] 02 价格弹性 ─── [●] 03 市场失灵                                  |
|                                     │                                                 |
|  Kapitel 2: 政治系统与大选 [当前可攻坚 Aktuell]                                             |
|  [★] 04 联邦大选与双票制 (8 min) ──── [○] 05 5%门槛与议席分配 (12 min)                      |
|      ↳ [内嵌教具: 议席半圆形沙盘]       ↳ [前置要求: 先通关 04]                            |
|                                                                                       |
+---------------------------------------------------------------------------------------+
```

1. **界面极致简洁（Minimalist & Low Noise）**：
   - 彻底摒弃杂乱配色与厚重多层白卡，统一采用 `--ink`（高对比墨字）、`--paper`（柔和纸白）、`--paper-subtle`（实验底衬）与 `--line`（1px 极简发丝线）；
   - 零 Emoji，全量使用高辨识度手写内联 SVG 图标；
2. **强视觉引导（Visual Affordance & Clear Hierarchy）**：
   - **渐进式披露（Progressive Disclosure）**：默认首屏只呈现当前最该攻坚的「今日 1 关（Today's Quest）」与主线路线，复杂参数与备用教具收拢于次级折叠抽屉，认知减负 80%；
   - **节点视觉状态机明确**：
     - `已掌握 (Mastered)`：墨黑实心圆点 + 墨色实线连线；
     - `可攻坚 (Available)`：醒目墨黑粗边框 + 呼吸微光波纹，一眼锁定焦点；
     - `未解锁 (Locked)`：灰色虚线边框 + 明确悬停提示“需先通关 [前置关卡名称]”；
3. **动线顺滑闭环（Effortless Flow）**：
   - 关卡内一屏一卡，顶部极细进度胶囊条指示步进，底部唯一主动作按钮指引下一步，避免学习者在页面迷失。

---

## 四、 核心架构与五大子模块体系 (Architecture Modules)

```
App-EF-Lernvault/src/modules/teaching/
├── TeachingStudio.tsx              # 教学工坊主容器 (协调学科、视图切换、进度状态)
├── tabs/
│   ├── QuestMapTab.tsx             # 维度 0: 关卡全景地图与节奏进阶路网
│   ├── PlayableStudioTab.tsx       # 维度 1: 沉浸式交互微课演播厅 (步骤向导/单页画卷)
│   ├── MicroWorldGalleryTab.tsx    # 维度 2: 学科微世界与仿真教具总台 (24款原生教具)
│   ├── TextAnatomyLabTab.tsx       # 维度 3: 原典学术文献逐行解剖台 (GeWiReadingLab)
│   └── BookIngestWorkshopTab.tsx   # 维度 4: 任意书籍拆解与学习节奏规划工坊
├── components/
│   ├── QuestNodeCard.tsx           # 视觉路线关卡节点卡片
│   ├── SocraticDrawer.tsx          # 苏格拉底伴学启发抽屉 (换讲法 / 考考我)
│   ├── GenericMicroWorlds/         # 4款轻量通用互动教具模板
│   │   ├── VariableSliderBox.tsx   #   ① 变量滑块与动态因果链
│   │   ├── DilemmaBalanceScale.tsx #   ② 价值/方案对决天平
│   │   ├── LogicBlockBuilder.tsx   #   ③ 逻辑因果积木
│   │   └── ScenarioDecisionTree.tsx#   ④ 情境抉择树
│   └── PacingScheduleCard.tsx      # 学习节奏日历与专注块排期卡
└── engine/
    ├── bookIngestParser.ts         # 任意书籍大纲/文本结构化拆分引擎
    ├── pacingPlanner.ts            # 每日 10-15 分钟无痛节奏排程算法
    ├── conceptDistiller.ts         # 核心概念、生活比喻、易错点与15NP话术提炼器
    └── teachingStore.ts            # 教学进度、关卡解锁、连击与状态机数据管理
```

### 1. 模块 1：书籍智能拆解与无痛节奏规划器 (`bookIngestParser.ts` + `pacingPlanner.ts`)
- **功能**：
  - 输入书籍目录文本或章节 Markdown；
  - 自动拆分成包含 3–5 个章节、10–20 个微关卡（每关约 8–12 分钟）的课程树；
  - 计算各关卡的前置依赖（`prerequisites`）生成 DAG；
  - 根据目标考期（如 7 天冲刺、14 天巩固、30 天常驻），排定每日微专注块与复习节点。

### 2. 模块 2：重难点提炼器 (`conceptDistiller.ts`)
- **功能**：
  - **生活直觉比喻（Mental Model）**：大白话讲透原理（如用“水压与水流”讲欧姆定律，用“拔河与死重损失”讲税收）；
  - **考纲严谨定义（KLP Termini）**：精准提炼德语规范术语；
  - **高频踩坑点（Fehlerquellen）**：指出考场混淆点；
  - **15 NP 会考金句（Klausursatz）**：标准作答模版。

### 3. 模块 3：可动微世界自动装配器与 4 款通用交互模板 (`GenericMicroWorlds/`)
- **功能**：
  - 智能匹配规则：若匹配到选举/罗尔斯/市场/切线等已建教具，直接挂载原生 24 款高性能教具；
  - 若为任意自选新书概念，自动装配 4 款纯 SVG Tufte 通用互动微世界：
    1. **变量滑块探索器**：拖动滑块直接观察曲线或因果状态联动；
    2. **对决权衡天平**：拖放论据到左右托盘，查看物理倾角与价值权衡；
    3. **论证逻辑积木**：拖拽或点击组合因果推导链；
    4. **情境抉择树**：学生做出决策并观察推演走向。

### 4. 模块 4：游戏化演播厅与苏格拉底伴学伙伴 (`PlayableStudioTab.tsx` + `SocraticDrawer.tsx`)
- **功能**：
  - 借鉴 Study-Mate 优秀的交互闭环：
    - **「这里没懂」**：触发降维解释或替换生活类比，记一条档案；
    - **「太简单了」**：触发边界反例挑战与高难踩坑设问；
    - **「考考我」**：针对当前小节现场生成测验题，即时核验输入证据并评分；
  - 支持单页连续画卷（Document）与 9 步进阶（Steps）双模式无缝切换。

### 5. 模块 5：全系统数据状态机闭环 (`teachingStore.ts`)
- **功能**：
  - 完成第 8 步通关后触发 `markNodeMasteredByCourseId`，通知知识图谱（`SkillTreeCanvas`）后置节点实线点亮；
  - 若自测中有失分点，自动生成标准的 Markdown 表格补丁行，一键复制进 Vault 错题本（`Fehlerlog.md`）。

---

## 五、 四阶段工程实施路线图 (Phase 4.0 - 4.3)

| 阶段划分 | 核心攻坚任务 | 门禁与交付指标 |
| :--- | :--- | :--- |
| **Phase 4.0<br>（即刻开工）** | **拆书解构与节奏排程引擎原型 (`BookIngest & PacingPlanner`)**：<br>1. 研发 `bookIngestParser.ts` 与 `pacingPlanner.ts` 核心算法；<br>2. 研发 `BookIngestWorkshopTab.tsx` 交互界面（输入文本/目录 ➔ 即时生成结构化章节、DAG 依赖与每日 10 分钟排期）；<br>3. 编写独立单元测试 `BookIngest.test.tsx`。 | 独立测试 100% PASS，`npx tsc -b` 0 报错，算法支持任意大纲快速解析。 |
| **Phase 4.1** | **重难点提炼与 4 大通用交互微世界套件**：<br>1. 研发 `conceptDistiller.ts`（直觉比喻、核心术语、易错点与 15 NP 金句提取）；<br>2. 研发 4 套纯 SVG Tufte 通用互动组件（变量滑块、对决天平、逻辑积木、情境树）；<br>3. 编写 `GenericMicroWorlds.test.tsx` 确保 60 FPS 与几何中心居中。 | 动效与交互测试通过，零 Emoji，零 Tailwind 阴影违规。 |
| **Phase 4.2** | **沉浸式演播厅与苏格拉底伴学抽屉 (`PlayableStudio`)**：<br>1. 研发 `PlayableStudioTab.tsx` 关卡执行器与教具动态挂载网格；<br>2. 研发 `SocraticDrawer.tsx` 实现 Study-Mate 风格的调频伴学交互；<br>3. 研发 `QuestMapTab.tsx` 呈现 Duolingo 风格极简关卡地图与视觉引导；<br>4. 编写 `PlayableStudio.test.tsx` 覆盖全流程。 | 关卡推进流转顺畅，单测覆盖完整，无界面卡顿。 |
| **Phase 4.3** | **主工作台集成、状态机咬合与生产级回归**：<br>1. 整合至 `TeachingStudio.tsx`，在全局导航中规范注册；<br>2. 打通通关数据反哺技能树与一键生成 `Fehlerlog.md` 补丁闭环；<br>3. 跑通全量 81+ 测试套件、`modules.test.tsx` 门禁与 `vault-check.py`；<br>4. 遵循一次一科一层规范，单科独立原子提交。 | 81+ 套件 100% 全绿，工作区干净入库。 |

---

## 六、 下一会话开工备忘与即刻执行指令 (Handover Checkpoints)

下一会话启动时，Agent 可直接执行：
1. **查看交接文档**：直接读取 [`HANDOVER.md`](file:///C:/Users/rongj/Desktop/学习/HANDOVER.md) 与本路线图；
2. **第一步攻坚动作**：启动 **Phase 4.0**：
   - 在 `App-EF-Lernvault/src/modules/teaching/` 下独立创建 `engine/bookIngestParser.ts` 与 `engine/pacingPlanner.ts`；
   - 编写 `App-EF-Lernvault/src/modules/teaching/BookIngest.test.tsx` 验证任意书籍大纲的结构化拆解与无痛 10 分钟微块排程；
   - 构建 `BookIngestWorkshopTab.tsx` 纯黑白极简工作台视图。
