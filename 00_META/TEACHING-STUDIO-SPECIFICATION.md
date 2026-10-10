---
fach: ""
thema: "TeachingStudio 架构与产品全景规范"
operatoren: [darstellen, analysieren, beurteilen]
klausurrelevant: false
datum: 2026-10-10
tags: [EF, Meta, App, TeachingStudio, Duolingo, Pacing, MicroWorld, Architecture]
---

# TeachingStudio (教学研习工坊) 架构与产品全景规范

> **文档性质**：本文档为 EF-GeWi-Lernvault 核心业务板块 **`TeachingStudio`**（教学研习工坊）的技术架构、产品逻辑、交互布局与数据流全景规范说明书。旨在供开发团队、架构评审及外部 AI Agent 快速理解、重构、接入或二次开发。

---

## 1. 产品定位与核心设计哲学

### 1.1 背景痛点与产品定位
传统备考软件往往割裂为两类极端：
1. **纯题库/背诵切片工具（如 Anki）**：只有碎片化记忆测试，缺乏完整的认知建构、概念推演与因果链闭环；
2. **长篇静态教材阅读（如电子书/PDF）**：认知负荷过大，容易产生假性理解，缺乏即时反馈、互动探索与正向多巴胺激励。

**TeachingStudio** 的核心定位是：**德国 NRW 高中（Gymnasium EF/Q1/Q2）全学科“多邻国式沉浸微课 + 动态拆书排程 + 可探索微世界（MicroWorld）”的高集成度闭环教学系统**。

### 1.2 四大核心哲学
1. **Zero Friction（零摩擦开箱即学）**：
   - 拒绝让学生先进入繁重的参数配置页；
   - 启动即默认呈现当前课本的**关卡探索河流（Quest River）**与**今日专注使命（~12 分钟）**；大按钮一键直达上课流。
2. **Painless Pacing（无痛步进与自适应节奏）**：
   - 任意一本教材或考纲文本均可按第一性原理被自动解构为 **8–14 分钟**的无痛微关卡；
   - 规划器内置 7 天冲刺、14 天心流、30 天精读模式，动态插桩艾宾浩斯复习槽（D+1 Blitz 闪电温故与 D+3 Tief 深度回顾）。
3. **Duolingo Flow + Tufte Ink（多邻国式趣味动线 + 严肃学术纸墨质感）**：
   - 采用多邻国经典的“一屏一题/一交互”递进题卡流，包含即时正向反馈底栏与 Combo 连击倍率；
   - 摒弃廉价幼态的卡通彩色贴图，全面遵从 **Edward Tufte 数据墨水比（Data-Ink Ratio）学术纸墨风**：纯黑白双色、1px 细线、手写内联 SVG、墨水印章仪式感结算。
4. **Read-Only Vault 铁律与错题补丁机**：
   - 软件对用户的 Obsidian 知识库始终只读，绝不擅自覆写用户本地笔记；
   - 通关时若产生错题，系统自动提取易错认知陷阱，生成标准的 Markdown 错题表格行（Fehlerlog Patch），供学生一键复制贴回 Obsidian 的 `Klausur-Training/Fehlerlog.md`。

---

## 2. 全系统分层拓扑与数据流转

```
                      【用户输入 / 预设课纲】
              Raw Syllabus / Chapter Markdown Text
                               │
                               ▼
        ┌──────────────────────────────────────────────┐
        │ 1. bookIngestParser (拆书解构与 DAG 构建)      │
        │    - 标题语法树提取、时长测算、课型标注       │
        │    - 拓扑先修关系推演 (Prerequisites)        │
        │    - 匹配 4 大通用微世界 / 24 款仿真教具     │
        └──────────────────────┬───────────────────────┘
                               │
                               ▼
        ┌──────────────────────────────────────────────┐
        │ 2. pacingPlanner (自适应学习节奏规划器)        │
        │    - 模式: 7天冲刺 / 14天平衡 / 30天精读     │
        │    - 每日微课负荷分配 (~12 min/天)           │
        │    - 艾宾浩斯复习插槽 (D+1 Blitz / D+3 Tief) │
        └──────────────────────┬───────────────────────┘
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
┌──────────────────────────────┐   ┌──────────────────────────────┐
│ 3. conceptDistiller          │   │ 5. teachingStore             │
│    (第一性原理概念提炼)      │   │    (持久化状态机与全站联动)  │
│    - 生活直觉比喻 (Analogy)  │   │    - 掌握历史 / XP / 连续天数│
│    - 考纲术语 / 易错陷阱     │   │    - 今日关卡 DAG 拓扑求解   │
│    - 15 NP 极限制胜标答金句  │   │    - 联动点亮 712 节点技能树 │
└──────────────┬───────────────┘   └──────────────┬───────────────┘
               │                                  │
               ▼                                  │
┌──────────────────────────────┐                  │
│ 4. lessonStepFlow            │                  │
│    (多邻国式 5 步课步编译器) │                  │
│    Step 1: 生活直觉站队      │                  │
│    Step 2: 核心机制配对      │                  │
│    Step 3: 微世界动手挑战    │                  │
│    Step 4: 考场陷阱排雷      │                  │
│    Step 5: 15 NP 会考标答    │                  │
└──────────────┬───────────────┘                  │
               │                                  │
               ▼                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│ 6. 交互展示层 (UI Components)                                   │
│    • QuestMapTab: 关卡河流、学术 HUD、单元大宝箱                 │
│    • InteractiveLessonRunner: 全屏上课播放器、发丝进度条、Combo │
│    • GenericMicroWorlds: 4 款纯 SVG 交互微世界沙盒              │
│    • VictoryRewardScreen: 墨水印章、XP 结算、Fehlerlog 补丁机   │
│    • SocraticDrawer: 三维调频苏格拉底伴学抽屉                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. 核心引擎架构与数据接口

### 3.1 拆书解构与 DAG 构建引擎 (`bookIngestParser.ts`)
- **职能**：解析用户粘贴的任意 Markdown 标题结构、多级数字编号文本或纯文本大纲，将其重构为结构化的有向无环图（DAG）关卡树。
- **数据结构**：
  ```typescript
  export type LessonType = "concept" | "practice" | "experiment";

  export interface ParsedQuestNode {
    id: string;                    // 关卡唯一标识 (如 sowi-1-1)
    chapterId: string;             // 所属章节 ID
    order: number;                 // 关卡序号
    title: string;                 // 关卡标题 (德语优先)
    lessonType: LessonType;        // 课型: 核心概念 / 应用演练 / 实验探究
    estimatedMinutes: number;      // 预估无痛研习时间 (8-14 min)
    prerequisites: string[];       // 先修关卡 ID 数组 (DAG 前置依赖)
    matchedToolId?: string;        // 匹配教具 ID (如 variable_slider, wahlsystem-sim)
    matchedToolName?: string;      // 匹配教具名称
    interactiveType: string;       // 互动微世界类型
    summary: string;               // 关卡内容速览
    socraticPrompt?: string;       // 苏格拉底导学启发设问
    keyConcepts: KeyConceptSummary[]; // 考纲术语与应试陷阱清单
    xp: number;                    // 通关 XP 奖励 (35-100 XP)
  }

  export interface ParsedBookStructure {
    title: string;
    fach: string;                  // 学科 (SoWi, Deutsch, Philo, Physik...)
    chapters: ParsedChapter[];     // 章节数组
    totalNodes: number;            // 关卡总数
    totalMinutes: number;          // 全书研习总分钟数
    dagEdgesCount: number;         // 依赖连线数
  }
  ```
- **核心算法**：
  - 自动基于章节层级推导线性和跨章节依赖，严禁自依赖与成环；
  - 启发式关键词检测匹配教具：经济因果/物理变化 ➔ `VariableSliderBox`；伦理争议/法律权衡 ➔ `DilemmaBalanceScale`；哲学推导/论证有效性 ➔ `LogicBlockBuilder`；政策制定/博弈后果 ➔ `ScenarioDecisionTree`。

### 3.2 自适应节奏规划引擎 (`pacingPlanner.ts`)
- **职能**：根据学生的备考目标，对 DAG 关卡进行拓扑排序，并在时间轴上进行无痛切片与艾宾浩斯复习插桩。
- **三种节奏模式**：
  1. `sprint`（7 天冲刺）：日均 ~25 分钟，每日 2–3 关，紧凑复习；
  2. `balanced`（14 天心流）：日均 10–12 分钟，每日 1–2 关，最适心流；
  3. `deep`（30 天微步精读）：日均 6–8 分钟，精雕细琢，穿插更多深度复习。
- **艾宾浩斯复习插桩机制**：
  - 在学习新关卡后的 `Day + 1` 自动注入 **Blitz-Review（闪电温故，~3 min）**；
  - 在 `Day + 3` 自动注入 **Tiefen-Konsolidierung（深度回顾，~5 min）**。

### 3.3 第一性原理重难点提炼引擎 (`conceptDistiller.ts`)
- **职能**：对任意给定的学科概念，提取符合认知心理学的直觉隐喻、考纲专业术语、认知易错点与 15 NP 会考标答金句。
- **输出模型**：
  ```typescript
  export interface DistilledConcept {
    topicTitle: string;
    fach: string;
    mentalModelAnalogy: {          // 生活直觉比喻 (如大选制度比作剧场双票预约)
      analogyTitle: string;
      explanationDE: string;
      explanationZH: string;
    };
    klpTermini: Array<{            // NRW 考纲权威学术术语
      termDE: string;
      definitionDE: string;
      termZH: string;
      definitionZH: string;
    }>;
    fehlerquellen: Array<{         // 考场高频失分陷阱
      trapTitleDE: string;
      trapDescriptionDE: string;
      trapDescriptionZH: string;
      howToAvoidDE: string;
    }>;
    klausurSatz15NP: {             // 15 Notenpunkte 极限制胜标答
      musterSatzDE: string;
      operator: "analysieren" | "darstellen" | "beurteilen" | "eroertern";
      scoringKeywords: string[];
      explanationZH: string;
    };
    socraticProbes: Array<{        // 苏格拉底反思设问
      questionDE: string;
      questionZH: string;
      counterPerspectiveDE: string;
    }>;
  }
  ```

### 3.4 多邻国式 5 步课步编译器 (`lessonStepFlow.ts`)
- **职能**：将静态的关卡知识编译为 5 张递进交互卡片：
  - **Step 1: `intuition`（生活直觉站队）**：通过贴近日常生活的直觉场景与两难选择（2–3 选项），引发认知失衡；
  - **Step 2: `concept`（核心机制配对）**：学术术语与内在因果机制的精确对齐；
  - **Step 3: `microworld`（微世界动手目标挑战）**：给出明确的仿真操作目标（如“将失业率控制在 4% 以下且通胀小于 2%”），动态嵌入交互微世界；
  - **Step 4: `trap`（考场陷阱排雷）**：呈现真实考卷中阅卷老师常扣分的易混淆典型错误，要求学生识别并排除；
  - **Step 5: `quiz`（15 NP 标答冲刺）**：核心采分关键词装配与会考范句验证。

### 3.5 全局状态机与持久化桥梁 (`teachingStore.ts`)
- **职能**：统一管理关卡通关历史、打卡连续天数、总经验值与技能树穿透。
- **状态结构**：
  ```typescript
  export interface TeachingStudioState {
    activeBookId: string | null;
    activeBook: ParsedBookStructure | null;
    activePlan: PacingPlan | null;
    masteredQuests: Record<string, QuestMasteryRecord>;
    completedQuestIds: string[];
    totalXp: number;
    streakDays: number;
    todayCompletedCount: number;
    streak: StreakData;
    lastUpdated: string;
  }
  ```
- **核心响应式逻辑**：
  - `isQuestAvailable(quest, masteredIds)`：严格按 DAG 判定先修依赖是否全部满足；
  - `getTodaysQuest(book, masteredIds)`：拓扑遍历自动定位今日首个未通关但可攻坚关卡；
  - `completeQuest(questId, xp, fach)`：
    1. 写入通关时间戳与得分；
    2. 累加 XP 并记录 Streak；
    3. 广播 `TEACHING_STUDIO_UPDATED_EVENT` 刷新河流；
    4. 触发 `markNodeMasteredByCourseId(questId)` 并广播 `SKILL_TREE_MASTERED_EVENT`，实时点亮全站 712 节点行星引力星图。

---

## 4. 界面布局与交互系统

### 4.1 顶层导航与主入口 (`TeachingStudio.tsx`)
- **快捷键**：`Alt S`，或主界面左侧边栏导航图标直接打开；
- **子模块四标签页**：
  - `Quest-Landkarte` (`map`)：**默认打开，关卡探索河流主视图**；
  - `Zerlegung & Pacing` (`workshop`)：书籍大纲拆解与节奏规划工坊；
  - `Interaktives Studio` (`studio`)：微课演播厅（支持单页画卷与步进双模式）；
  - `Mikrowelten` (`labor`)：仿真教具与微世界总台展陈。

### 4.2 关卡探索河流视图 (`QuestMapTab.tsx`)
- **顶部学术 HUD 仪表台**：
  - **课程选择器**：下拉切换 SoWi, Deutsch, Philo, Physik 等预设或自定义导入书籍；
  - **Streak 徽章**：`Streak: 5 Tage` 纯矢量火炬图标；
  - **XP 徽章**：`480 XP` 纯黑底白字高对比徽标；
  - **今日目标药丸**：`~12 min / Tag · 0/1 abgeschlossen`；
  - **快捷入口**：`[+ Neues Buch zerlegen]` 抽屉按钮；
  - **全书总体进度细线指示条**：实时显示百分比与通关比例。
- **Heutige Mission（今日使命 Hero 卡片）**：
  - 聚焦卡片显示今日目标关卡、预估时长与匹配教具标签；
  - 核心行动按钮：`[Lektion starten (~12 min) ->]` 立即全屏拉起上课流。
- **垂直关卡河流（Vertical River Canvas）**：
  - 纵向贯穿主轴线；
  - 每个章节作为独立的 Unit 单元，显示单元完成度（如 `2 / 4 gemeistert`）；
  - 节点排列呈垂直波浪河流，提供 `Starten ->` 与 `Wiederholen ->` 交互；
  - **单元结业里程碑宝箱（Milestone Chest）**：章节末端的圆形宝箱徽章。通关全单元所有关卡后，自动点亮 `+50 XP Meilenstein-Bonus` 并解锁综合会考测评。

### 4.3 多邻国全屏上课运行器 (`InteractiveLessonRunner.tsx`)
- **顶部发丝进度与连击指示**：
  - 左侧：优雅退出按钮（触发带有防误触二次确认的弹窗）；
  - 中间：1.5px 发丝级渐进墨黑进度条（`1 / 5`）；
  - 右侧：连击指示器（`Combo x2`，带有高对比度脉冲呼吸效果）与实时积分累加。
- **中间答题与微世界交互区**：
  - 顶部显示当前步骤标签与奖励（如 `Schritt 3: Mikrowelt · +30 XP`）；
  - 大字引导设问；
  - 若为微世界步骤，嵌入对应的 2D 坐标滑块、道德天平、逻辑积木或决策树；
  - 若为题卡步骤，展示干净的单选/多选卡片，支持键盘选择与鼠标交互。
- **底部即时反馈抽屉（Instant Feedback Drawer）**：
  - 答对：高对比度墨字抽屉浮出，显示 `[OK] Richtig! (+20 XP)`，右下角展示黑底白字 `Weiter ->` 按钮；
  - 答错：显示直觉隐喻解释与解题引导，提供再次尝试或继续攻关。

### 4.4 学术仪式感通关奖赏屏 (`VictoryRewardScreen.tsx`)
- **中心印章**：黑墨双边框仪式印章 `MEISTERHAFT ABGESCHLOSSEN · 15 NP`；
- **核心数据看板**：
  - 经验值：`+120 XP` 动态跳动；
  - 连续打卡：`Streak: 6 Tage` 火炬点亮；
  - 掌握状态：`100% Gekonnt`；
- **错题补丁生成台（Obsidian Fehlerlog Patch）**：
  - 若该次上课存在失误，自动展示生成的 Markdown 表格行；
  - 提供 `[Patch kopieren]` 按钮，一键写入剪贴板，提示粘贴回 Obsidian 错题本；
- **行动推进**：提供 `Lektion wiederholen`（温故重练）与 `Weiter zum nächsten Quest ->`（继续攻坚下一关，自动关闭模态框并刷新河流点亮新关卡）。

---

## 5. 四大通用纯 SVG 交互微世界沙盒 (`GenericMicroWorlds/`)

为保证任何学科均可被图形化互动推演，系统内置 4 款通用交互微世界组件：

| 微世界组件 | 适用学科与场景 | 核心交互与可视机制 | 达成判定条件 |
| :--- | :--- | :--- | :--- |
| **`VariableSliderBox`** | SoWi（宏观调控、供求曲线）、Physik（速度加速度）、Chemie（反应平衡） | 纯 SVG 2D 动态坐标系，参数滑块调节自变量 $X$ 与敏感度 $K$，实时重算因果链卡片 | 目标数值到达指定区间且稳定超过设定时间 |
| **`DilemmaBalanceScale`** | Philosophie（电车难题、功利主义 vs 义务论）、SoWi（效率 vs 公平） | 纯 SVG 机械杜瓦尔双臂杠杆天平，力矩方程 $\tau = \sum F \cdot r$ 动态解算倾角，砝码加减与论据对决 | 寻找最优论证平衡点，或使天平达到指定倾向 |
| **`LogicBlockBuilder`** | Philosophie（演绎逻辑、反驳）、Deutsch（议论文图尔敏模型） | 三阶槽位（大前提 ➔ 小前提 ➔ 结论），论据积木拖拽装配，形式逻辑有效性核验与常见逻辑谬误检出 | 排除谬误积木，拼装出有效三段论逻辑链 |
| **`ScenarioDecisionTree`** | SoWi（政治决策、大国博弈）、Geschichte（历史分岔抉择） | 多阶树形分支连线高亮，短期收益 vs 次生未预期负面外部性（Unintended Consequences）实时评估 | 作出符合 AFB III 15 NP 评价标准的平衡决策 |

---

## 6. 工程规范与质量门禁红线

系统严格遵循全库统一的代码与视觉宪法：

1. **Tufte 纯黑白学术纸墨风**：
   - 严禁出现杂乱彩色背景卡片；严格使用 `--ink`（墨黑）、`--paper`（宣纸白）、`--paper-subtle`（灰底）与 1px `--line`（发丝线）；
   - 严禁使用 Tailwind 动态投影类名（`shadow-*`）；
   - 严禁使用斜体（`italic`）。
2. **严格零 Emoji（Zero Emoji Policy）**：
   - 全代码库严格禁止 Unicode Emoji 范围 `[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}]`；
   - 严禁使用 Unicode 箭头 `➔`（统一使用 ASCII `->` 或纯内联 SVG 箭头）。
3. **SVG 中心保真原则**：
   - 任何 SVG 变换与缩放必须显式绑定几何中心坐标：
     `style={{ transformOrigin: `${cx}px ${cy}px`, transformBox: "view-box" }}`，杜绝悬停右下偏心漂移。
4. **自动化测试与门禁标准**：
   - 单测覆盖：`src/modules/teaching/` 下 8 个独立测试套件 76 个测试必须 100% 绿灯；
   - 契约测试：`modules.test.tsx` 零违规扫描（扫描全站文件禁止 Emoji、阴影、斜体）；
   - 类型检查：`cmd /c "npx tsc -b"` 必须 0 报错；
   - 知识库审计：`python scripts/vault-check.py` 必须输出 `PASS`。

---

## 7. 外部 AI 协作与二次开发指引

若您需要引导其他 AI Agent 在本项目基础上继续扩展，请直接向其提供本指南与以下关键文件路径：

- **主工作台入口**：[`TeachingStudio.tsx`](file:///C:/Users/rongj/Desktop/学习/App-EF-Lernvault/src/modules/teaching/TeachingStudio.tsx)
- **关卡探索河流**：[`tabs/QuestMapTab.tsx`](file:///C:/Users/rongj/Desktop/学习/App-EF-Lernvault/src/modules/teaching/tabs/QuestMapTab.tsx)
- **上课流播放器**：[`components/LessonRunner/InteractiveLessonRunner.tsx`](file:///C:/Users/rongj/Desktop/学习/App-EF-Lernvault/src/modules/teaching/components/LessonRunner/InteractiveLessonRunner.tsx)
- **通关奖赏结算屏**：[`components/LessonRunner/VictoryRewardScreen.tsx`](file:///C:/Users/rongj/Desktop/学习/App-EF-Lernvault/src/modules/teaching/components/LessonRunner/VictoryRewardScreen.tsx)
- **拆书解析器**：[`engine/bookIngestParser.ts`](file:///C:/Users/rongj/Desktop/学习/App-EF-Lernvault/src/modules/teaching/engine/bookIngestParser.ts)
- **节奏规划器**：[`engine/pacingPlanner.ts`](file:///C:/Users/rongj/Desktop/学习/App-EF-Lernvault/src/modules/teaching/engine/pacingPlanner.ts)
- **概念提炼引擎**：[`engine/conceptDistiller.ts`](file:///C:/Users/rongj/Desktop/学习/App-EF-Lernvault/src/modules/teaching/engine/conceptDistiller.ts)
- **5 步课步编译器**：[`engine/lessonStepFlow.ts`](file:///C:/Users/rongj/Desktop/学习/App-EF-Lernvault/src/modules/teaching/engine/lessonStepFlow.ts)
- **全局状态机**：[`engine/teachingStore.ts`](file:///C:/Users/rongj/Desktop/学习/App-EF-Lernvault/src/modules/teaching/engine/teachingStore.ts)
- **通用微世界套件**：[`components/GenericMicroWorlds/`](file:///C:/Users/rongj/Desktop/学习/App-EF-Lernvault/src/modules/teaching/components/GenericMicroWorlds/)

---

## 8. 外部架构评审建议与体验进化路线图 (Phase 5 Refinements)

针对外部 AI 架构评估（针对用户习惯循环、认知负荷、操作便利性与视觉骨架）提出的 6 项关键见解，确立以下深化改进规范与技术落地路线：

### 8.1 错题沉淀降阻与低摩擦归档方案 (Frictionless Error Harvesting)
- **痛点分析**：坚守 Read-Only Vault 铁律使得错题无法静默覆写 Obsidian 库，若要求学生在备考高压下每次通关后切出应用定位粘贴，容易产生操作断裂；
- **优化方案**：
  1. **多级导出与暂存机制**：在 `VictoryRewardScreen` 与 `PlayableStudioTab` 提供：
     - `[In Fehlerlog kopieren]`：带清晰成功状态 Toast 的一键剪贴板复制；
     - `[Fehlerlog als .md herunterladen]`：一键导出标准 Markdown 错题补丁文本文件；
  2. **内嵌迷你审阅抽屉 (Inline Review Drawer)**：在应用内直接查看当前学科所有未归档错题诊断，允许学生在会话结束前一次性批量确认并复制，杜绝高频切出。

### 8.2 微世界动手挑战的容错机制与双通道保障 (MicroWorld Forgiveness & Fallbacks)
- **痛点分析**：文科学生面对物理力矩天平或坐标曲线时，若判定区间过紧（无容错），易因微操体验差产生严重卡关挫败感；
- **优化方案**：
  1. **宽容阈值与磁性吸附 (Magnetic Snapping)**：滑块与天平引入 +-5% 的合理目标判定宽容带，并在接近平衡点时提供平滑磁性吸附辅助；
  2. **苏格拉底脚手架提示 (Socratic Hint)**：若学生在微世界内操作超过 20 秒仍未达成目标，自动展开引导气泡；
  3. **跳过直接看推导通道 (Skip & Reveal Derivation)**：对于非核心操作步骤，提供“跳过直接看推导”按钮，确保心流顺畅推进。

### 8.3 关卡河流与艾宾浩斯复习插桩双轨分离 (Dual-Stream Quest River)
- **痛点分析**：艾宾浩斯复习插槽（D+1 Blitz / D+3 Tief）若直接横插在垂直河流主轴中，会破坏线向前进的里程碑成就感，让学生误以为进度停滞；
- **优化方案**：
  1. **主轴专注意识**：纵向主河流水系仅渲染前向探索关卡（Core Progression Nodes），单元结业里程碑宝箱保持清晰线性递进；
  2. **温故双轨分流**：
     - 复习关卡优先置顶于顶部「今日使命 (Heutige Mission)」Hero 卡片的前置准备栏；
     - 在已通关关卡旁以侧边“浮动温故卫星徽标 (Satellite Review Badge)”呈现，不打乱主干脉络。

### 8.4 课型自适应与轻量 3 步微课流 (Adaptive Lesson Sizing)
- **痛点分析**：强制所有关卡套用“直觉 -> 概念 -> 微世界 -> 陷阱 -> 标答”5 步，会导致纯记忆或纯文献辨析类主题产生“为了交互而交互”的冗余负荷；
- **优化方案**：
  1. **双课型编译器支持**：
     - `interactive_deep`（默认 5 步完整流）：适用于机制推演、制度博弈、函数极值与力学等需要动手验证的核心主题；
     - `concept_light`（轻量 3 步流）：适用于纯概念辨析、文学修辞与事实性记忆主题，流程为“生活直觉 -> 核心概念辨析 -> 15 NP 会考小测”；
  2. **教具槽位自适应回退**：若未匹配到专属教具，自动回退为纯文字认知隐喻对比卡，杜绝空壳或强行嵌入。

### 8.5 触觉反馈骨架与进度条锚点增强 (Tactile Skeleton & Progress Visibility)
- **痛点分析**：在纯黑白 Tufte 风格下，缺乏立体投影的控件易退化为单薄冷淡的表单；1.5px 发丝进度条在 2K/4K 屏上可见度低；
- **优化方案**：
  1. **实体机械按压动效**：卡片与按钮加入 2px 实体粗墨边框与轻微物理按压位移（`active:translate-y-[1px]`），结合双墨线印章式轮廓（Double-Border Stamp），营造坚实的纸墨实体感；
  2. **高可见度进度条**：进度条高度提升至 3px-4px，端点与小步之间嵌入几何刻度断点（Step Ticks），清晰提供“即将达成”的心理预期。

### 8.6 智能重排与断点持久化 (Smart Reschedule & Session Resume)
- **优化方案**：
  1. **欠账滚雪球平滑衰减 (Smart Reschedule)**：若学生因断档积压复习任务，规划器自动将复习槽平滑分摊至未来 3-5 天，杜绝“债务雪崩”挫败感；
  2. **未结算会话断点恢复 (Session Resume)**：在 `localStorage` 缓存当前未提交关卡的题卡进度，意外刷新或中断时支持一键恢复。
