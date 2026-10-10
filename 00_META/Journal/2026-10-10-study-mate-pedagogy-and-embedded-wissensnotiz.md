---
fach: Meta
thema: "Study-Mate 趣味教学法与常驻搭载考纲知识笔记落地"
operatoren: [darstellen, analysieren, beurteilen]
klausurrelevant: false
datum: 2026-10-10
tags: [EF, Meta]
---

# 2026-10-10 会话日记：Study-Mate 趣味教学法与常驻搭载考纲知识笔记落地

> 本篇记录应对用户核心体验诉求：“我希望课程能够足够有趣，易懂之类的。像是 https://github.com/Miaotofu01/Study-Mate 一样。 以及我之前设计的很多课程一样，课程也会搭载一些笔记之类的”，在关卡微课系统深度注入 Study-Mate 趣味教学法与常驻搭载知识笔记抽屉。

---

## 1. 核心改进背景与设计哲学

用户指出：课程必须足够有趣、易懂，彻底消除刻板的应试刷题感，并搭载真实的学科知识笔记以供研读和参考。

参考优秀开源码项目 [Study-Mate](https://github.com/Miaotofu01/Study-Mate) 的自适应辅学哲学以及本仓库既有 356 篇连续剧式互动课（`Lernreise/`）的精髓，我们确立了三大核心支柱：

1. **角色代入与战役情境（Story Hook & Drama）**：
   - 告别空洞抽象的教条，给学习者注入沉浸式角色（如虚拟城邦改革规划委员、首席道德法官、魏玛戏剧文学侦探、航天变率工程师等）；
   - 以戏剧冲突（Dilemma & Crisis）开篇，引出学习这一课题的现实破局意义。

2. **费曼大白话与双轨辩证（Feynman-Klartext & Zwei Brillen）**：
   - **费曼大白话**：一句话撕开学术术语包装，点破本质机理；
   - **两副眼镜（Zwei Brillen）**：对比正反两重视角（如效率派 vs 兜底派、边沁快乐算盘 vs 康德尊严底线），并根据北威州考纲给出合题（Synthese）。

3. **Study-Mate 三维自适应调频探针（Adaptive Probes）**：
   - `[Einfacher / Klartext]`（这里没懂·费曼降维生活比喻）：降低抽象度，通俗白话阐明；
   - `[Vertiefung / Edge Case]`（太简单了·极客反例与边界质问）：抛出现实极端特例与批判性思考；
   - `[Check / Schnelltest]`（考考我·现场高频考点快测）：现场即时自测，点击展开参考答法与得分要点。

4. **常驻搭载考纲知识笔记抽屉（Wissensnotiz-Schublade）**：
   - 顶部 HUD 显著常驻 `[Notiz / 搭载笔记]` 按钮，全阶段（新知、实验、答题）随时呼出；
   - 呈现八段式核心精华：费曼核心概念、两副眼镜争议点、会考解题三步法、15 NP 满分金句库、典型失分雷区；
   - 支持一键复制（`[Notiz kopieren]`）完整 Markdown 小抄，无缝衔接外部 Obsidian 笔记复盘。

---

## 2. 工程实现与模块集成

1. **概念精炼引擎数据层升级 (`conceptDistiller.ts`)**：
   - 扩展数据模型：`StoryHookData`、`FeynmanExplanationData`、`TwoBrillenData`、`FunFactData`、`StudyMateProbesData`、`AttachedNoteData`；
   - 实现 `enrichConceptWithStudyMateAndNotes(concept, fach)`：对既有 10+ 预置学科典范和所有启发式合成学科概念全量注入趣味战役故事、冷知识历史轶事（如 1948 年艾哈德货币改革夜橱窗奇迹、康德散步读卢梭入迷、歌德 60 年磨浮士德、莱布尼茨微积分优雅符号争端等）、三维自适应探针和标准考纲笔记。

2. **课步编译器流水线映射 (`lessonStepFlow.ts`)**：
   - 在 `compileLessonSteps()` 中，将 distilled 的 Study-Mate 属性全量挂载至 `stepLecture.lecturePayload`。

3. **全屏微课运行器渲染与抽屉交互 (`InteractiveLessonRunner.tsx`)**：
   - 顶部导航栏新增常驻 `[Notiz / 搭载笔记]` 按钮与精致纯矢量书卷图标；
   - 阶段 1 新知卡按层级精美排版：
     - Story Hook 剧情与角色卡片（高对比黑白墨印）；
     - 费曼一句话大白话卡片；
     - 生活心智模型与现象引言；
     - 两副眼镜（Zwei Brillen）辩证双轨卡片与合题综述；
     - 考纲术语矩阵与四步因果运行链；
     - 历史趣味轶事与冷知识卡片（Fun-Fact）；
     - Study-Mate 三维探针按钮组与自适应折叠卡片；
     - 苏格拉底导引思考题。
   - 底部滑入式常驻笔记抽屉：包含完整的 5 大考纲解题模块，并配备一键复制到剪贴板功能；
   - 严苛遵循 Tufte 黑白纸墨宪法：无 Unicode 表情符、无 `shadow-*` 违规阴影、无 `italic` 违规样式，全量统一为 `--ink` 与 `--paper` 变量。

---

## 3. 教学法与交互深度重构：Step 1 直觉站队 (Intuitions-Check) 与消除“框中框地狱”

针对外部评测指出的三大致命硬伤（假费曼大白话套话、内容同义反复、角色悬空与 6-8 个带括号黑线框堆叠的“框中框地狱”）：

1. **废除长篇死板阅读，全面转向“10 秒直觉站队”**：
   - 告别“长文阅读 ➔ 点击我已理解”伪微课，转为极简生动的现实博弈场景（如完全竞争市场中的“百年暴风雪导致全城取暖煤气中断，仅剩最后 100 台取暖器”）；
   - 提供直观鲜明的两个极端站队选项（[A] 自由价格出清 vs [B] 政府限价配给）；
   - 用户在前 10 秒内必须动手选择立场，思维立刻被激活。

2. **即时浮出解析卡片与真实的底层因果洞察**：
   - 选择 Option A 或 Option B 后，页面即时展开针对该立场的因果剖析与真实机制洞察；
   - 拆解核心机制：价格作为“稀缺信号（Knappheitssignal）”、配置效率（Allokationsfunktion）与市场出清（Markträumung）；
   - 阐明机制局限与政策兜底：完全竞争市场不考虑社会分配公正（Verteilungsgerechtigkeit），因此需要德国社会市场经济秩序政策兜底；
   - 底部按钮明确引导：`[ Weiter zum Experiment -> ]` 顺利导向 Step 2 动手实验微世界。

3. **彻底清除“齿轮调节系统”空洞套话，严禁同义反复**：
   - 全面清理 `conceptDistiller.ts` 中抽象宏大的机械比喻，改为贴近现实生活的交易博弈与规则约束；
   - 将费曼大白话与生活心智模型彻底解耦，杜绝同义反复与字句复读；
   - 为所有学科预置及合成概念提供高拟真、非套板的 fallback 直觉两难博弈生成器（`createFallbackIntuitionDilemma`）。

4. **单轴扁平 Tufte 纯粹纸墨排版**：
   - 废除所有重复嵌套的黑框，统一采用单轴极简卡片与粗左边框重点引述；
   - 互动探针（`[ 费曼白话 ] [ 极客反例 ] [ 现场快测 ]`）采用单行紧凑按钮组，按需原地展开，保持视觉焦点集中。

---

## 4. 单元测试与全量门禁保障

- 单元测试全面验证：
  - `InteractiveLessonRunner.test.tsx`：7/7 项测试全绿，涵盖直觉站队博弈、即时反馈展现、探针展开、步骤递进与考纲笔记复制；
  - `conceptDistiller.test.ts`：13/13 项测试全绿，严格校验完全竞争市场暴风雪案例与跨学科直觉两难推演；
  - 全库 89 个测试套件、686 项单测 100% PASS；
- `npx tsc -b` 0 报错；
- `src/modules.test.tsx` 严格 UI 契约测试（零 Emoji、零 shadow、零 italic）100% 通过；
- `python scripts/vault-check.py` 418 笔记 1942 词 356 课程验证 PASS。
