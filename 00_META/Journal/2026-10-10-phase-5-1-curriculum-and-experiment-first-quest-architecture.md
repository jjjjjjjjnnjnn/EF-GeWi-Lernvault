---
fach: Meta
thema: "Phase 5.1 教学与实验前置重塑：新知课程与互动实验前置于考场闯关"
operatoren: [darstellen, analysieren, beurteilen]
klausurrelevant: false
datum: 2026-10-10
tags: [EF, Meta]
---

# 2026-10-10 会话日记：Phase 5.1 教学与实验前置重塑

> 本篇记录应对用户关键体验反馈：“目前的闯关不好玩，太死板，而且没法学到知识感觉。我希望是课程放在关卡前面的。在每个关卡前面集成对应的 新知课程里面和互动实验的东西 用于用户学习”，对微课运行器与课步编译引擎进行的教学法第一性原理深度重塑。

---

## 1. 核心痛点与第一性原理剖析

### 1.1 原系统症结
- **进门即受拷问（Test before Teaching）**：原 `lessonStepFlow` 的 Step 1 采用 `intuition`（直觉站队题），但形式上直接抛出 A/B 单选题卡片。用户尚未接触背景概念与运行机理即被要求答题，产生强烈的应试拷问感；
- **缺乏实质知识获取感（No Deep Knowledge Acquisition）**：纯单选题流导致学习者感觉在做死板刷题软件，无法系统研读北威州官方考纲核心术语（KLP-Fachbegriffe）、生活心智模型与因果链条；
- **动手实验滞后或被跳过**：实验教具往往处于中间或被忽略，未能发挥“动手先行、直观探究、在沙盒中自主发现规律”的启发价值。

### 1.2 教学法重塑：两段式关卡进阶架构
每个关卡节点彻底重构为**两阶段五步进阶闭环**：
```
【阶段一：新知研习与实验探索 (LERN-PHASE: Wissen & Experiment)】
  Step 1: 新知精讲微课 (Theorie & Fachkonzept) ➔ 现象引言 + 考纲术语矩阵 + 4段因果机制推演 + 苏格拉底导思 (沉浸阅读，无答题压力，+25 XP)
  Step 2: 动手探究实验微世界 (Mikrowelt-Labor) ➔ 实验任务清单 + 嵌入式活体教具 (滑块/天平/连线/决策树) 动手探究 + 实验规律备忘录 (+35 XP, 激活 Combo)

【阶段二：考场闯关与达标实测 (CHALLENGE-PHASE: Klausur-Challenge)】
  Step 3: 核心机制精准对决 (Konzept-Duell) ➔ 机制辨析，触发正向反馈与连击倍率
  Step 4: 考场失分雷区排雷 (Klausurfalle & Fehlerquellen-Abwehr) ➔ 真实考场易错点精准避坑
  Step 5: 15 NP 会考金句终局考核 (15-NP-Meistersatz) ➔ 满分标答踩分句，进入通关结算屏
```

---

## 2. 核心落地工作清单

1. **课步编译器升级 (`lessonStepFlow.ts`)**：
   - 引入 `LessonPhase = "learn" | "challenge"` 阶段标签；
   - 新增 `LectureContentPayload`：整合 `hookDE/ZH`、`analogyTitle`、`klpTermini` 考纲术语卡、`causalChainDE/ZH` 四段因果机制推演链、`socraticPromptDE/ZH`；
   - 新增 `learningTakeawayDE/ZH` 实验规律备忘录至 `MicroWorldChallengePayload`；
   - 重构 `interactive_deep` 为 5 步：`lecture -> microworld -> concept -> trap -> quiz`；
   - 重构 `concept_light` 为 3 步：`lecture -> concept -> quiz`；确保所有关卡一律**新知课程先行**。

2. **全屏微课运行器重构 (`InteractiveLessonRunner.tsx`)**：
   - **Step 1 新知卡渲染**：高对比度 Tufte 纯黑白发丝线排版，呈现生活模型、考纲术语矩阵、4 步因果流转链与苏格拉底引思；底部配备明朗的主动推进按钮 `[Ich habe das Konzept verstanden -> Weiter zum Experiment]`；
   - **Step 2 动手实验渲染**：呈现实验任务指引，内嵌活体仿真教具（`VariableSliderBox`、`DilemmaBalanceScale`、`LogicBlockBuilder`、`ScenarioDecisionTree`），操作下方提供“实验规律备忘录”；底部配备 `[Experiment abgeschlossen -> Jetzt zur Challenge]`；
   - **Step 3~5 挑战卡渲染**：保留即时核验、Combo 连击涟漪、苏格拉底降维点拨与错题收集；
   - 顶部 HUD 增加阶段胶囊（`Phase 1: Wissen & Labor` / `Phase 2: Klausur-Challenge`）与刻度进度条。

3. **关卡探索图谱引导优化 (`QuestMapTab.tsx`)**：
   - 关卡详情检查抽屉（Inspection Drawer）注入`[Didaktischer Ablauf]`路线条（`1. 新知精讲 -> 2. 动手实验 -> 3. 考场挑战`），进关前明确传达无痛研习动线。

4. **自动化测试与工程门禁**：
   - 更新 `lessonStepFlow.test.ts` 与 `InteractiveLessonRunner.test.tsx` 验证两阶段流程；
   - 全量自动化测试跑通：89 个测试套件、682 项单测 100% PASS；
   - TypeScript 类型严苛检查：`cmd /c "npx tsc -b"` 0 报错；
   - 知识库合规脚本：`python scripts/vault-check.py` 418 笔记 1942 词 PASS。

---

## 3. 下一步计划

1. 结合实际更多教材内容，持续丰富各科专项微世界在各阶段的专用探究预设；
2. 持续跟踪用户在实际使用中的顺畅感与提分反馈。
