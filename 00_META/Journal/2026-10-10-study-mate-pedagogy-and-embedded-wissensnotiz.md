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

4. **单元测试与全量门禁保障**：
   - 更新 `InteractiveLessonRunner.test.tsx` 与 `conceptDistiller.test.ts`，覆盖自适应探针交互、答案显示、笔记抽屉展开与剪贴板复制；
   - 全库 89 个测试套件、684 项单测 100% PASS；
   - `npx tsc -b` 0 报错；
   - `src/modules.test.tsx` 严格 UI 契约测试（无 emoji、无 shadow、无 italic）通过；
   - `python scripts/vault-check.py` 418 笔记 1942 词验证 PASS。
