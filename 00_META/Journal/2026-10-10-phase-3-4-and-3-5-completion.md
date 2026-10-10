---
fach: Meta
thema: "Phase 3.3 ~ 3.5 交付：罗尔斯正义论无知之幕分配沙盘、双教具微课挂载与全科宏观星图五维打分补丁机"
operatoren: [darstellen, analysieren, beurteilen]
klausurrelevant: false
datum: 2026-10-10
tags: [EF, Meta, App, Philo, SoWi, Rawls, Wahlsystem, MacroView, Fehlerlog]
---

# 2026-10-10 工作日志：Phase 3.3 ~ 3.5 交付 — 罗尔斯分配沙盘、教具微课挂载与全科星图打分补丁机

## 1. 任务背景与核心目标

依据会话研发规划，完成以下三大任务闭环：
1. **选项 A（已交付）**：研发哲学标志性工坊《罗尔斯正义论与无知之幕分配天平》(`RawlsVerteilungsSim.tsx`)；
2. **选项 B（已交付）**：打通微课内嵌教具调度网格，将《德国联邦议院选举沙盘》(`WahlsystemSim`) 与《罗尔斯分配天平》(`RawlsVerteilungsSim`) 挂载进对应微课；
3. **选项 C（已交付）**：在全科宏观星图（`AllSubjectsMacroView.tsx`）的战役模态框内集成 D1–D5 五维自查评分量表与标准化 `Fehlerlog.md` 表格补丁一键生成与复制机。

---

## 2. 核心架构与落地细节

### ① 选项 A：罗尔斯正义论与无知之幕分配天平 (`RawlsVerteilungsSim.tsx`)
- **多层分配与激励博弈建模**：
  - 5 阶层收入分布模拟，支持调节再分配税率（0% ~ 80%）与最低保障转移支付底线；
  - 植入拉弗激励曲线（Laffer-Effekt），过高税率将导致无谓效率损失（Deadweight Loss）与 GDP 缩减；
  - 实时解算洛伦兹曲线积分与基尼系数（Gini-Koeffizient）；
- **Tufte 纯黑白动态道德天平（Moralische Waage）**：
  - 纯 SVG 物理倾角动画，左盘承载市场效率与 GDP，右盘承载弱势群体（Worst-off）基本保障与尊严；
  - 直观呈现罗尔斯 Maximin 差异原则（Differenzprinzip）何时满足；
- **无知之幕角色抽取与 15 NP 会考评分台**：
  - 支持遮蔽社会身份（Schleier des Nichtwissens），随机揭晓身份（乞丐、工人、中小企业主、高收入学者、资本家）并判定尊严保底状态；
  - 内置 4 大思想实验预设（罗尔斯正义论、功利主义、自由意志主义夜警国家、高福利平等国家）；
  - 配套独立测试套件 `RawlsVerteilungsSim.test.tsx` 10/10 绿灯通过；
  - 同步注册至 `registry.ts`、`Labor.tsx`、`laborRegistry.ts`，更新 `00_META/Glossar-DE-ZH-GeWi.md` 与 `00_META/INDEX.md`。

### ② 选项 B：微课内嵌教具调度网格打通与真实课程挂载
- **微课教具网格支持**：
  - 在 `App-EF-Lernvault/src/modules/Reise.tsx` 的 `renderEmbeddedTool` 中完善动态挂载路由，支持 `wahlsystem-sim` 与 `rawls-sim`（及别名兼容）；
- **微课内容挂载**：
  - `Lernreise/Philo-Gerechtigkeit-Rawls-Schleier-des-Nichtwissens-L1.md` 步骤 2 挂载 `[Werkzeug: rawls-sim]`；
  - `Lernreise/SoWi-Parteien-Willensbildung-L1.md` 步骤 2 挂载 `[Werkzeug: wahlsystem-sim]`；
- **集成测试验证**：
  - 编写集成测试套件 `Reise.toolsIntegration.test.tsx`，真实挂载并断言沙盘渲染正常（2/2 绿灯通过）。

### ③ 选项 C：全科星图 AFB III 五维打分台与 Fehlerlog 补丁机
- **D1–D5 五维打分量表（0–15 NP）**：
  - 在 `AllSubjectsMacroView.tsx` 的跨学科大题模拟沙盒内植入会考五维自查量表（D1 审题与Operator、D2 理论因果链、D3 跨学科融通、D4 专业术语精度、D5 独立评价闭环，每项 0–3 点，折算 0–15 NP）；
- **标准化 Fehlerlog.md 补丁生成与一键复制**：
  - 依据评分状态与用户草稿自动诊断生成格式化 Markdown 表格行：
    `| YYYY-MM-DD | 战役标题 (AFB III Operator) | 错因/失分诊断 | 考点强化与核心论据 | 复习跟踪日期 |`；
  - 遵循只读 Vault 契约，支持一键复制到剪贴板，用户可无缝粘贴沉淀至对应学科的 `Klausur-Training/Fehlerlog.md`；
- **契约清理与测试覆盖**：
  - 扩充测试 `AllSubjectsMacroView.test.tsx` 至 10/10 绿灯通过；
  - 清理 `RawlsVerteilungsSim.tsx` 残留的特殊符号（`✓`、`✕`、`🇨🇳`），消除 `modules.test.tsx` 门禁拦截。

---

## 3. 门禁验证与质量指标

1. **自动化测试套件**：
   - `npx vitest run`：**81 个测试文件，600 项单元与集成测试 100% 全部通过**；
   - `modules.test.tsx` 零非法符号违规，100% 符合 Tufte 纯黑白学术纸墨宪法。
2. **TypeScript 编译校验**：
   - `cmd /c "npx tsc -b"` 零报错（Code 0）。
3. **Vault 完整性自检**：
   - `python scripts/vault-check.py` 严格校验通过：`notes=416 csv_rows=1942(bad=0) index_links=366(missing=0) reisen=356 vergleich=0 badnames=0 badglossar=0 PASS`。
4. **Git 原子提交**：
   - 严格遵循《AGENTS.md》单科单层原子规范，完成 `[App]` 提交（Commit `c61ad2f`）。

---

## 4. 下一阶段重大战略决议：商业级教学专区与书籍智能拆解交互研习工坊 (Phase 4.0 预研定稿)

### ① 战略意图与用户核心诉求
- **目标愿景**：面向商业产品级标准，实现**“输入任意一本书或大纲内容 ➔ 自动结构化拆分 ➔ 规划无痛日常学习节奏 ➔ 提炼重难点与金句 ➔ 装配动手交互微世界 ➔ 游戏化自然通关”**的一体化闭环工作台。
- **界面要求**：极致简洁，强视觉引导性（Tufte 纯黑白纸墨风、渐进式披露、高对比度清晰动线、杜绝信息过载）。

### ② 行业标杆与开源调研成果
- **对标 `Miaotofu01/Study-Mate`**：
  - 核心吸收「learn with doing」原则与三类课型体系（概念课/实操课/实验课）；
  - 吸收其教材原文对照（Reference-Grounded）与苏格拉底自适应调频伴学（“这里没懂”降阶启发 / “太简单了”反例挑战 / “考考我”现场核验）；
  - 知识点前置依赖路线图（DAG）与共享记忆。
- **对标 `Brilliant.org` & `PhET`**：
  - 落实“一屏一概念，一概念一交互”，将知识点与系统已有的 24 款高性能纯 SVG 教具及 4 套通用互动模板动态咬合。
- **对标 `Duolingo`**：
  - 每日 10–15 分钟无痛微专注块，消除认知门槛，结合连续天数与 XP 状态机。

### ③ 交付物与交接准备
- 正式发布架构纲领文件：[`00_META/ROADMAP-BOOK-TO-COURSE-STUDIO.md`](ROADMAP-BOOK-TO-COURSE-STUDIO.md)；
- 更新 [`00_META/INDEX.md`](INDEX.md) 索引与 [`HANDOVER.md`](../HANDOVER.md) 接手顺序。

---

## 5. Phase 4.0 核心成果交付：拆书解构与无痛学习节奏规划引擎 (BookIngest & PacingPlanner)

- **核心算法研发 (`bookIngestParser.ts` + `pacingPlanner.ts`)**：
  - 研发鲁棒的任意文本/目录多级解析器，支持 Markdown 标题（# / ## / ###）、数字章节（1. / 1.1 / 1.2 / Kapitel）、缩进与纯文本；
  - 自动推导 DAG 拓扑前置依赖连线并杜绝自依赖；
  - 识别课型分类（`concept` / `practice` / `experiment`）并智能匹配 24 款高性能原生教具或 4 大通用交互微世界；
  - 研发自适应拓扑排序排程算法，严控每日 10–15 分钟无痛微块负荷；
  - 自动插桩艾宾浩斯复习插槽（D+1 Blitz / D+3 Tief），提供心流区间自适应适宜度评估（`optimal` / `dense` / `light`）。
- **Tufte 纯黑白纸墨交互界面研发 (`BookIngestWorkshopTab.tsx` + `TeachingStudio.tsx`)**：
  - 纯黑白学术纸墨风，零 Emoji、零 active shadows、零 italic，全手写内联 SVG；
  - 左右分栏高效动线：左侧教材输入与预设典籍（SoWi / Deutsch / Philo / Physik），右侧指标看板、节奏控制器、日程卡片流与 DAG 折叠展开树；
  - 提供完整多 Tab 容器 `TeachingStudio.tsx`，支持与全科导航协同。
- **四步闭环与工程门禁回归**：
  - 独立测试 `src/modules/teaching/BookIngest.test.tsx` 13/13 绿灯通过；
  - UI 契约门禁 `src/modules.test.tsx` 23/23 绿灯零违规；
  - 全量 82 个测试套件、613 项测试 100% PASS；
  - `cmd /c "npx tsc -b"` 0 报错；
  - `python scripts/vault-check.py` 417 笔记 1942 词 PASS。

---

## 6. Phase 4.1 核心成果交付：重难点提炼器与 4 大通用纯 SVG Tufte 交互微世界套件

- **并行子 Agent 协同开发机制**：
  - 启动 3 个独立高优先级专业子 Agent，分别攻坚重难点提炼引擎、滑块与天平教具、逻辑积木与情境决策树；
  - 主 Agent 统筹模块规范、Tufte 纸墨约束、容器装配与全量自动化回归验证。
- **重难点第一性原理提炼引擎 (`conceptDistiller.ts`)**：
  - 支持提取直觉生活比喻（Mental Model）、考纲标准术语（KLP Termini）、高频失分陷阱（Fehlerquellen）与 15 NP 会考踩分金句；
  - 覆盖 SoWi、Philosophie、Deutsch、Mathe、Physik 等重点考点知识库与通用回退算法；
  - 单测 `conceptDistiller.test.ts` 12/12 绿灯。
- **4 大通用交互微世界套件 (`GenericMicroWorlds/`)**：
  - `VariableSliderBox.tsx`：2D 坐标曲线与参数驱动因果链推演；
  - `DilemmaBalanceScale.tsx`：机械杠杆物理力矩解算与道德权重权衡；
  - `LogicBlockBuilder.tsx`：形式三段论三阶槽位推导与谬误检测器；
  - `ScenarioDecisionTree.tsx`：多阶分支拓扑、活跃路径高亮与次生影响评估；
  - 单测 `GenericMicroWorlds.test.tsx` 16/16 绿灯。
- **微世界总台与工程门禁回归**：
  - 研发并挂载 `MicroWorldGalleryTab.tsx` 到 `TeachingStudio.tsx`；
  - UI 契约门禁 `src/modules.test.tsx` 23/23 绿灯（零 Emoji、零阴影、零 italic）；
  - 全量 84 个测试套件、641 项测试 100% PASS；
  - `cmd /c "npx tsc -b"` 0 报错；
  - `python scripts/vault-check.py` 417 笔记 1942 词 PASS。

---

## 7. Phase 4.2 核心成果交付：关卡探索图谱、沉浸式演播厅、苏格拉底伴学抽屉与主工程接入

- **Duolingo 风格极简关卡探索图谱 (`QuestMapTab.tsx`)**：
  - 今日使命 Hero 横幅（~12 min 目标、连击 Streak、XP 进度条与一键开练）；
  - 阶段里程碑与纵向时光轴关卡流，三态视觉状态机：Mastered（实心墨点+勾选）、Available（墨黑粗边+呼吸光环）、Locked（虚线边框+锁图标+先修要求提示）；
  - 单测 `QuestMapTab.test.tsx` 7/7 绿灯通过。
- **沉浸式微课演播厅 (`PlayableStudioTab.tsx`)**：
  - 五阶递进流（发现与现象 ➔ 核心概念 ➔ 微世界动手玩 ➔ 会考应用 15 NP ➔ 掌握结算）与单页连续画卷双模式无缝切换；
  - 动态按关卡匹配内嵌 4 款通用微世界（滑块/天平/积木/情境树）或 24 款原生仿真教具；
  - 单测 `PlayableStudio.test.tsx` 9/9 绿灯通过。
- **苏格拉底三维自适应调频抽屉 (`SocraticDrawer.tsx`)**：
  - 深度吸收 Study-Mate 哲学：「这里没懂」（降维生活类比 + 易错点）、「太简单了」（反例质问 + 事实/价值双重批判）、「考考我」（现场小测 + 15 NP 量规核验 + 一键生成 Fehlerlog 补丁）。
- **主项目全站工作台挂载**：
  - 在 `keys.ts` 注册模块 `studio` 与快捷键 `Alt S`；
  - 在 `App.tsx` 侧边栏导航、Tab 视图路由、满屏沉浸式容器及 `Palette` 快捷面板全面注册，支持一键直达测试。
- **工程门禁全绿**：
  - 全量 86 个测试套件、657 项测试 100% PASS，`modules.test.tsx` 零契约违规（零 Emoji、零阴影、零 italic）；
  - `cmd /c "npx tsc -b"` 0 报错；
  - `python scripts/vault-check.py` 417 笔记 1942 词 PASS。




