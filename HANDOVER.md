# HANDOVER — 一页交接（新agent/用户先读我）

> 目标：Gymnasium EF (NRW, Schloss Heessen) 十科提分，中德双语。
> Public repo: https://github.com/jjjjjjjjnnjnnj/EF-GeWi-Lernvault
>
> 📦 **历史状态归档**（Phase 3.0 ~ 3.5 及以前的全部历史里程碑 + 外部 AI 任务包）→ [`00_META/HANDOVER-Archiv.md`](00_META/HANDOVER-Archiv.md)

## 新agent阅读顺序（5分钟接手）

1. **本文件** → 2. [`AGENTS.md`](AGENTS.md)（规范） → 3. [`00_META/INDEX.md`](00_META/INDEX.md)（导航）
→ 4. [`00_META/Blocker-Register.md`](00_META/Blocker-Register.md)（**卡在哪**） → 5. 目标学科 `Lehrplan.md` → 6. `00_META/Journal/` 最新一篇（当前上下文）

---

## 项目是什么（30 秒）

- **vault**（Obsidian 知识库，**内容真相源**）+ `App-EF-Lernvault/`（Tauri 桌面学习软件，**只读 vault、不写回**）。
- **设计与架构宪法**：[`PROJECT-DESIGN-GUIDELINES.md`](PROJECT-DESIGN-GUIDELINES.md)（**项目设计方案与架构策略全景指南，AI复刻、扩展与 PhET 规范必读**）。
- **PhET 批量重构与自审核 SOP**：[`00_META/PHET-CONVERSION-BATCH-SOP.md`](00_META/PHET-CONVERSION-BATCH-SOP.md)（**外部 AI 批量执行与自审核手册：版权红线、Tufte 美学、60FPS rAF 解耦、动态 DPR 防拉伸、6 大批次全景规划与三级质检**）。
- **文科交互教学与工坊总纲**：[`00_META/GEISTESWISSENSCHAFTEN-INTERACTIVE-PEDAGOGY-PLAN.md`](00_META/GEISTESWISSENSCHAFTEN-INTERACTIVE-PEDAGOGY-PLAN.md)（**文科可探索解释与 GeWi-Labor 24款工坊建设总纲：博弈系统、道德天平、论证树、漫画透镜、戏剧张力与音乐动机**）。
- **TeachingStudio 教学工坊与多邻国上课河流全景规范**：[`00_META/TEACHING-STUDIO-SPECIFICATION.md`](00_META/TEACHING-STUDIO-SPECIFICATION.md)（**商业级教学板块设计、拆书排程、4大通用SVG微世界、5步交互上课流与通关奖赏闭环全景规范，外部 AI 对接与扩展必读**）。
- 目标：德国 NRW Gymnasium EF 十科笔试/口试提分，中德双语，**完全离线**。
- **内容铁律**：所有题目材料只能来自用户自己的笔记原文 —— **超纲率 = 0**。
- **当前规模**：笔记 **419** · Anki 卡片 **1942** · 互动课程 **361 篇**（`Lernreise/`，十科全覆盖，含 Lesson-v3 与 Enterprise-v4 全量高阶微课与多学科学术解剖台）· 术语表 **946 行** · 索引链接 **378 条** · 十科图谱 712+ 节点 · 90 套件 692 项全量测试 100% 绿灯 · 考纲体系（NRW 十科 + 中国理科四科 + 中德映射）· 本地真题池 **760 份 PDF (2024–2026 全科 Klausuren + Vorgaben)**。

- ✅ **Phase 5.4 App 端 v5 新段落结构化卡片与评分抽屉渲染（2026-10-10 交付）**：
  - **组件模块 (`App-EF-Lernvault/src/components/v5/`)**：
    - `KernsatzCard.tsx`：双墨线边框、一键剪贴板复制、三段式解构（Subjekt | Mechanismus | Urteil）、完形填空自测遮盖（Cloze-Test）；
    - `ErwartungshorizontDrawer.tsx`：可折叠 15 NP 考官评分标准矩阵抽屉、交互式动态算分与等级判定、考官备选路径（Alternativweg）、满分 Klausursatz 范文；
    - `AufloesungCard.tsx`：选项 A vs 选项 B 双轨机制对比解析、一句话因果本质高亮卡片；
    - `v5Parser.ts` & `v5Types.ts`：鲁棒解析器精准提取原始 Markdown 中的结构化段落，防止前置引用污染；
  - **全能 Markdown 渲染集成 (`Blocks.tsx`)**：
    - 针对 `KERNSATZ`、`AUFLÖSUNG`、`ERWARTUNGSHORIZONT` 自动聚类并替换为富交互 Tufte 纯黑白学术卡片，支持中德双语与纯德语模式动态切换；
  - **课程引擎与场景实战集成 (`reise.ts` & `Reise.tsx`)**：
    - 改造 Step 5 (szenario)，渲染真题要求 (`AUFGABE`)、实时联动评分抽屉（动态同步门禁解锁）、金句卡片；
    - 全面适配单步关卡模式与长文文档模式（Document Mode）；
  - **全量门禁全绿**：92 测试套件 708 项单测 100% PASS，tsc 0 报错，vault-check PASS。

- ✅ **全量十科 361 篇课程 v5 教学法重构与引擎 A1–A3 加固交付（2026-10-10 交付）**：
  - **内容线（360/361 篇 v5 升级）**：11 个 agent 并行（1 引擎 + 10 学科），覆盖 SoWi (51), Philo (30), Deutsch (31), Mathe (43), Physik (38), Chemie (37), Bio (38), Englisch (34), Musik (27), Sport (28)；全库机检 0 emoji、0 unicode 箭头、KERNSATZ 361/361、ERWARTUNGSHORIZONT 361/361；唯一披露例外 SoWi Sinus-Milieus 保持 v3 对比表结构；
  - **引擎线 A1–A3 升级 (`App-EF-Lernvault`)**：
    - **A1 (`Reise.tsx`)**：`ausprobieren` 动手题标准解析（Musterlösung）支持折叠显影，离线模式下自主对照答案；
    - **A2 (`InteractiveLessonRunner.tsx`)**：Step 1 直觉站队温和门控（未选 A/B 时推进按钮置灰并提示，选后立即解锁底层机制，不扣减 XP）；
    - **A3 (`InteractiveLessonRunner.tsx`)**：将 `markt-sim`、`kinematik`、`magisches-viereck`、`formula` 精确映射至真实领域仿真组件，彻底消除空壳滑块；
  - **全量门禁全绿**：`python scripts/vault-check.py` 419 笔记 1942 词 361 课 PASS；90 套件 692 项单测全绿；tsc 0 报错；按学科拆分为 11 个独立 commit 规范合入。

- ✅ **第一波次 5 门 Enterprise-v4 课程交付与双版本兼容闭环（2026-10-10 交付）**：
  - **首批 5 门全量合入**：`SoWi-Mietendeckel-und-Preisinterventionen-L1.md`、`Physik-Gleichmaessig-beschleunigte-Bewegung-L1.md`、`Deutsch-Schiller-Die-Raeuber-Figurenkonflikt-L1.md`、`Mathe-Integralrechnung-als-Flaecheninhaltsrechnung-L1.md`、`Philosophie-Utilitarismus-Bentham-Mill-L1.md` 全部通过审查并按单科独立 commit；
  - **版本共存与解析加固 (`src/reise.ts` & `Reise.tsx`)**：
    - `resolveStepTitle` 改为以 `typ` 优先，杜绝 5 步课 Step 2/4/5 被误命名为旧版标题；
    - `parseReiseFile` 为理科/免除 ROLLE 场景提供智能三段式 Rubric 兜底，防止打分复选框锁死；
    - `Reise.tsx` 支持动态 `minRubrics` 门禁与条件渲染 `Rolle`，消除空标签与无法通关死锁；
    - 新增 `Reise.enterpriseV4.test.tsx` 6 项自动化测试，100% 验证 5 门新课与旧版 8 步课无缝共存；
  - **vault-check 自动化红线强化 (`scripts/vault-check.py`)**：为 `Enterprise-v4` 注入自动机检（必须恰好 5 步、0 emoji、必须 ASCII `->` 箭头、必须有 `[Werkzeug: ...]` 标签）；
  - **发卷规则与清单纠偏 (`EXTERNAL-AI-COURSE-PRODUCTION-PROMPT.md`)**：强制两行带方括号 `[Werkzeug: <id>]` 与 `[ Option A ]`，标明理科 Step 5 免除 ROLLE 走 15 NP Dreischritt；
  - **全量门禁全绿**：`python scripts/vault-check.py` 419 笔记 1942 词 361 课 PASS；90 套件 692 项单测全绿；tsc 0 报错。

- ✅ **Phase 5.3 课程教学架构性重塑与四大分科黄金教学模板总纲（2026-10-10 交付）**：
  - **核心痛点解决**：直面“课程内容稀碎、极差、学不会”的严重教学法硬伤，彻底破除假大白话套话（Pseudo-Feynman）、模板同义反复、虚假RPG空洞剧情与削足适履单一模式；
  - **大厂教学法融通与落地**：深度融通 Anthropic（Motivating Failure -> Mental Model -> Sandbox -> Anti-Patterns）、Brilliant.org（POE 挑战先行）、OpenAI/DeepLearning.AI 实操实验室、Study-Mate（边做边学与搭载考纲笔记）及北威州高中 KLP 考纲（AFB I-III 与双轨评价）；
  - **四大分科黄金教学模板 (`Templates/Kurs-Didaktik-Template.md`)**：
    - **模板 A (社科 / SoWi)**: 制度博弈与因果闭环模型 (Dilemma-Incentive-Kausalkette)
    - **模板 B (哲学 / Philosophie)**: 伦理法庭与第一性原理思辨模型 (Ethical-Crucible-Dialectic)
    - **模板 C (文学语言 / Deutsch & Englisch)**: 文本解剖与时代修辞透镜模型 (Text-Anatomy-Rhetoric)
    - **模板 D (理科 / MINT)**: POE 仿真探究与极值定理实验室 (Predict-Observe-Derive)
  - **外部 AI 工业级生产总纲 (`00_META/EXTERNAL-AI-COURSE-PRODUCTION-PROMPT.md`)**：
    - 外部 AI 一键发卷提示词 (Copy-Paste Master Prompt)，可直接粘贴至 Claude 3.7 / GPT-4o 批量产出课件；
    - 互联网/GitHub 检索 SOP（指导外部 AI 定向调研 Anthropic 课程库、Study-Mate 结构、PhET 仿真器等）；
    - 40 门全科核心课表生产缺口矩阵与全自动化质检验收红线清单；
  - **自动化质检通过**：`python scripts/vault-check.py` 419 笔记 1942 词 356 课程 PASS；89 套件 686 项单测全绿；tsc 0 报错。

- ✅ **Phase 5.2 Study-Mate 趣味教学法与 Step 1 直觉站队重构落地（2026-10-10 交付）**：
  - **核心诉求落地**：响应用户对“有趣、易懂、像 Study-Mate、搭载笔记”的教学法要求，直面外部评审指出的“假大白话套话、内容同义反复、框中框堆叠地狱与伪多邻国流”硬伤，对课程第一阶段实施教学法与交互信息架构深度重塑；
  - **Step 1 Intuitions-Check (直觉站队) 重构 (`InteractiveLessonRunner.tsx` & `conceptDistiller.ts`)**：
    - **废除死板长文堆叠**：将 Step 1 改为“10 秒直觉站队”现实场景两难博弈（如完全竞争市场的暴风雪取暖器短缺），提供 [A] 自由价格出清 vs [B] 政府限价排队 两大鲜明选项；
    - **即时浮出真实机制**：点击选项后瞬间展开针对立场的因果剖析、核心机制（Knappheitssignal / Allokationseffizienz / Markträumung）与社会市场经济兜底逻辑；
    - **彻底清理抽象空话**：清除所有“齿轮调节系统”空洞套话，严禁字句同义反复，解耦费曼白话与生活心智模型；
    - **消除框中框地狱**：改用扁平单轴 Tufte 纯黑白纸墨布局，互动探针原地展开；
  - **趣味与考纲功能体系 (`conceptDistiller.ts` & `lessonStepFlow.ts`)**：
    - **1. 角色代入与战役情境 (Story Hook & Drama)**：根据学科动态注入鲜活角色与危机决策；
    - **2. 费曼大白话与双轨辩证 (Feynman-Klartext & Zwei Brillen)**：一句话点破本质机理，两副眼镜（Zwei Brillen）展开正反两重视角并提炼考纲合题；
    - **3. 真实趣味历史轶事与冷知识 (Anekdote & Fun-Fact)**：艾哈德货币改革、康德散步读卢梭、歌德 60 年磨浮士德、莱布尼茨符号争端等；
    - **4. Study-Mate 三维自适应调频探针 (Adaptive Probes)**：`[Einfacher]`、`[Vertiefung]`、`[Check]` 原地按需展开；
    - **5. 常驻搭载考纲知识笔记抽屉 (Wissensnotiz-Schublade)**：顶部 HUD 常驻 `[Notiz]` 按钮，随时呼出 5 大考纲解题模块，支持一键复制完整 Markdown 小抄；
  - **工程门禁全绿**：全量 89 个测试套件、686 项单测 100% PASS；`src/modules.test.tsx` 严格零契约违规（零 Emoji、零 shadow 阴影、零 italic）；`cmd /c "npx tsc -b"` 0 报错；`python scripts/vault-check.py` 418 笔记 1942 词 356 课程 PASS。

- ✅ **Phase 5.1 教学与实验前置重塑：新知课程与互动实验前置于考场闯关（2026-10-10 交付）**：
  - **核心痛点解决**：彻底消除进关卡直接被单选题拷问的死板与挫败感，全面落实“先学新知、先玩实验，再闯关答题”的第一性原理教学法；
  - **两段式关卡架构升级 (`lessonStepFlow.ts` & `InteractiveLessonRunner.tsx`)**：
    - **阶段一：新知研习与实验探索 (Lern-Phase: Wissen & Experiment)**：
      - **Step 1: 新知精讲微课 (`lecture`)**：生活直觉唤醒 + 考纲学术术语卡片 (KLP-Fachbegriffe) + 底层因果运行链 (Kausalkette 4段推演) + 苏格拉底导学启发，沉浸式阅读吸收无答题压力，提供 `[Ich habe das Konzept verstanden -> Weiter zum Experiment]` 主动推进按钮与 +25 XP；
      - **Step 2: 动手探究实验微世界 (`microworld`)**：明确实验任务清单 (Forschungsauftrag) + 嵌入式活体教具（滑块/天平/连线/决策树）先动手玩、调节参数 + 实验规律备忘录 (Labor-Notiz)，点击 `[Experiment abgeschlossen -> Jetzt zur Challenge]` 达成 +35 XP 与 Combo 加成；
    - **阶段二：考场闯关与达标实测 (Challenge-Phase: Klausur-Challenge)**：
      - **Step 3: 核心机制对决 (`concept`)**：基于新知与实验现象的精准对决；
      - **Step 4: 考场失分雷区排雷 (`trap`)**：常见错误陷阱防范；
      - **Step 5: 15 NP 会考金句与终局达标考核 (`quiz`)**：满分踩分句与通关结算屏；
  - **关卡抽屉流程架构引导 (`QuestMapTab.tsx`)**：在关卡详情抽屉中直观展示 `1. 新知精讲微课 -> 2. 动手实验微世界 -> 3. 考场通关挑战` 架构条，消除用户应试焦虑；
  - **工程门禁全绿**：全量 89 个测试套件、682 项测试 100% PASS，`modules.test.tsx` 零契约违规（零 Emoji、零阴影、零 italic）；`cmd /c "npx tsc -b"` 0 报错；`python scripts/vault-check.py` 418 笔记 1942 词 PASS。

- ✅ **Phase 5 TeachingStudio 体验进化与全科考纲预设扩充落地（2026-10-10 交付）**：
  - **轻量 3 步课型自适应编译器 (`lessonStepFlow.ts`)**：支持 `concept_light`（生活直觉 -> 核心机制 -> 15 NP 小测）与 `interactive_deep`（5 步微世界完整流），避免纯文学/事实性概念陷入过度交互；
  - **真实北威州教材大纲预设扩充 (`bookIngestParser.ts`)**：新增 Goethe《Faust I》（戏剧分析/赌约/浮士德悲剧）、Mathe《Differentialrechnung》（割线斜率/导数/极值讨论）等完整章节大纲预设；
  - **复习欠账平滑衰减规划 (`pacingPlanner.ts`)**：`smartReschedulePlan` 动态平滑均摊逾期复习槽至未来天数，阻断复习债务雪崩；
  - **微世界容错带与磁性吸附 (`VariableSliderBox.tsx` & `DilemmaBalanceScale.tsx`)**：滑块与天平引入 ±5% 容错带、磁性吸附、20 秒苏格拉底脚手架启发与“平衡/推导直达”通道，杜绝卡关挫败；
  - **错题沉淀降阻与触觉质感 (`VictoryRewardScreen.tsx` & `InteractiveLessonRunner.tsx`)**：新增 `.md` 补丁文件一键下载、会话错题内嵌审阅抽屉、3-4px 几何阶段刻度进度条、`active:translate-y-[1px]` 物理按压反馈与 `localStorage` 自动断点恢复；
  - **工程门禁全绿**：全量 89 套件、681 项测试 100% PASS，`modules.test.tsx` 零契约违规（零 Emoji、零阴影、零 italic）；`cmd /c "npx tsc -b"` 0 报错；`python scripts/vault-check.py` 418 笔记 1942 词 PASS。

- ✅ **Phase 4.3 多邻国式沉浸上课流、关卡河流与正向奖赏闭环落地（2026-10-10 交付）**：
  - **Duolingo-style 关卡探索河流 (`QuestMapTab.tsx`)**：
    - 零摩擦开箱即学：顶部学术 HUD 整合学科切换、Streak 连续天数徽章、总 XP 徽章、今日 12 分钟专注进度药丸，右上角配备 `+ Neues Buch zerlegen` 快捷入口；
    - 垂直关卡河流：单元横幅区分各章节，各节点展现掌握（实心墨点+对勾）、当前解锁（双墨线边框+呼吸微光）与未解锁（虚线锁）；
    - 单元结业里程碑宝箱（Milestone Capstone Exam Chest）：单元关卡全通后点亮 +50 XP 单元大奖章与阶段会考；
  - **多邻国式全屏交互上课运行器 (`InteractiveLessonRunner.tsx`)**：
    - 极细发丝进度条与实时 Combo 连击倍率涟漪计数（Combo x2, Combo x3）；
    - 一屏一题/一交互：5 步递进（生活直觉站队 ➔ 概念机制配对 ➔ 微世界目标挑战 ➔ 考场陷阱排雷 ➔ 15 NP 标答冲刺）；
    - 底部即时正向反馈抽屉：答对高对比度墨字即时肯定加分；答错展示苏格拉底生活类比引导，并自动记录错题；
  - **Tufte 学术仪式感通关奖赏屏 (`VictoryRewardScreen.tsx`)**：
    - 墨水印章仪式印记（`MEISTERHAFT ABGESCHLOSSEN · 15 NP`）；
    - 动态 XP 累加滚动与 Streak 连续打卡点亮；
    - Obsidian `Fehlerlog.md` 错题补丁一键复制机（遵守只读 Vault 铁律）；
  - **持久化状态机与全局技能树穿透联动 (`teachingStore.ts`)**：
    - 通关自动触发 `teachingStore.markQuestCompleted`，更新本地连续天数、累加 XP；
    - 自动分发 `SKILL_TREE_MASTERED_EVENT`，穿透联动 712 节点主技能树连线点亮；
  - **工程门禁全绿**：
    - 全量 89 个测试套件、676 项测试 100% PASS，`modules.test.tsx` 零契约违规（零 Emoji、零阴影、零 italic）；
    - `cmd /c "npx tsc -b"` 0 报错；`python scripts/vault-check.py` 417 笔记 1942 词 PASS。

- ✅ **Phase 4.2 关卡探索图谱、沉浸式演播厅、苏格拉底伴学抽屉与主工程全量挂载落地（2026-10-10 交付）**：
  - **Duolingo 风格极简关卡探索图谱 (`QuestMapTab.tsx`)**：
    - 今日使命 Hero 横幅（~12 min 目标、连击 Streak、XP 进度条与一键开练）；
    - 阶段里程碑与纵向时光轴关卡流，三态视觉状态机：Mastered（实心墨点+勾选）、Available（墨黑粗边+呼吸光环）、Locked（虚线边框+锁图标+先修要求提示）；
    - 关卡详情苏格拉底导学抽屉与即时掌握标记切换；
  - **沉浸式微课演播厅 (`PlayableStudioTab.tsx`)**：
    - 五阶递进流（发现与现象 ➔ 核心概念 ➔ 微世界动手玩 ➔ 会考应用 15 NP ➔ 掌握结算）与单页连续画卷双模式无缝切换；
    - 动态按关卡匹配内嵌 4 款通用微世界（滑块/天平/积木/情境树）或 24 款原生仿真教具；
  - **苏格拉底三维自适应调频抽屉 (`SocraticDrawer.tsx`)**：
    - 深度吸收 Study-Mate 哲学：「这里没懂」（降维生活类比 + 易错点）、「太简单了」（反例质问 + 事实/价值双重批判）、「考考我」（现场小测 + 15 NP 量规核验 + 一键生成 Fehlerlog 补丁）；
  - **正式挂载入主项目全站工作台**：
    - 在 `keys.ts` 注册模块 `studio` 与快捷键 `Alt S`；
    - 在 `App.tsx` 侧边栏导航、Tab 视图路由、满屏沉浸式容器及 `Palette` 快捷面板全面注册，支持一键直达测试；
  - **工程门禁全绿**：
    - 全量 86 个测试套件、657 项测试 100% PASS，`modules.test.tsx` 零契约违规（零 Emoji、零阴影、零 italic）；
    - `npx tsc -b` 0 报错；`python scripts/vault-check.py` 417 笔记 1942 词 PASS。

- ✅ **Phase 4.1 重难点提炼引擎与 4 大通用纯 SVG Tufte 交互微世界套件落地（2026-10-10 交付）**：
  - **第一性原理重难点提炼引擎 (`conceptDistiller.ts`)**：
    - 面向 GeWi 与 MINT 全学科核心概念，自动化提炼：生活直觉比喻（Mental Model）、考纲标准术语（KLP Termini）、高频失分陷阱（Fehlerquellen）与 15 NP 会考标答金句；
    - 内置联邦大选、罗尔斯正义论、宏观四角沙盘、基尼系数、康德义务论、功利主义、图尔敏论证、微积分切线、机械能守恒等领域知识库与通用启发式后备；
    - 独立单测 `conceptDistiller.test.ts` 12/12 绿灯；
  - **4 大通用纯 SVG Tufte 交互微世界组件 (`GenericMicroWorlds/`)**：
    - ① `VariableSliderBox.tsx`：2D 坐标曲线与参数驱动因果链推演，支持灵敏度调节与实时微商；
    - ② `DilemmaBalanceScale.tsx`：机械杠杆物理力矩解算，支持伦理道德权重对决与失衡判定；
    - ③ `LogicBlockBuilder.tsx`：形式三段论三阶槽位推导，谬误检测器与 15 NP 作答量规；
    - ④ `ScenarioDecisionTree.tsx`：多阶分支拓扑、活跃路径高亮与次生负面外部性评估；
    - 独立单测 `GenericMicroWorlds.test.tsx` 16/16 绿灯；
  - **微世界总台与展陈工坊 (`MicroWorldGalleryTab.tsx`)**：
    - 将 4 款通用微世界与 24 款原生专业教具无缝贯通，集成进 `TeachingStudio.tsx`；
  - **工程门禁全绿**：
    - 全量 84 个测试套件、641 项测试 100% PASS，`modules.test.tsx` 零契约违规（零 Emoji、零阴影、零 italic）；
    - `npx tsc -b` 0 报错；`python scripts/vault-check.py` 417 笔记 1942 词 PASS。

- ✅ **Phase 4.0 商业级教学专区第一性原理拆书与无痛自适应节奏规划引擎落地（2026-10-10 交付）**：
  - **核心拆书解构与 DAG 前置依赖引擎 (`bookIngestParser.ts`)**：
    - 支持 Markdown 标题（# / ## / ###）、多级数字编号（1. / 1.1 / 1.2 / Kapitel）、缩进列表与纯文本大纲等多源输入鲁棒解析；
    - 智能提取微关卡无痛时长（8–14 min）、课型分类（`concept` 核心概念 / `practice` 应用演练 / `experiment` 实验探索，借鉴 Study-Mate）；
    - 自动匹配 24 款高性能原生仿真教具或 4 大通用交互微世界套件（变量滑块、对决天平、逻辑积木、情境树）；
    - 构建严格有向无环图（DAG），推导前置依赖连线并杜绝自依赖与环路；内置 SoWi、Deutsch、Philo、Physik 4 套经典范本；
  - **无痛学习节奏规划器与艾宾浩斯复习插桩 (`pacingPlanner.ts`)**：
    - 拓扑排序保障先修约束，支持 7 天考前冲刺、14 天黄金心流平衡、30 天微步精读与自定义滑块排程；
    - 每日负荷严格受控在 10–15 分钟无痛微块；
    - 自动穿插艾宾浩斯复习插槽（D+1 Blitz 闪电温故与 D+3 Tief 深度回顾）；
    - 自适应输出节奏评估等级（`optimal` / `dense` / `light`）与中德双语心理辅导话术；
  - **Tufte 极简纸墨工坊交互台 (`BookIngestWorkshopTab.tsx` + `TeachingStudio.tsx`)**：
    - 遵循 Tufte 纯黑白学术纸墨宪法，高对比度墨字、1px 发丝线、纯手写 SVG 图标、零 Emoji、零 Tailwind 阴影、零 italic；
    - 左右分栏动线：左侧教材大纲录入与范本选择，右侧即时指标看板、节奏模式控制器、每日排程预览与 DAG 树形折叠展开卡片；
  - **工程门禁全绿**：
    - 独立测试套件 `BookIngest.test.tsx` 13/13 绿灯通过；
    - 全量 82 个测试套件、613 项测试 100% PASS，`modules.test.tsx` 零契约违规；
    - `npx tsc -b` 0 报错；`python scripts/vault-check.py` 417 笔记 1942 词 PASS。

> 📦 **Phase 3.5 及更早历史里程碑已全部归档** → [`00_META/HANDOVER-Archiv.md`](00_META/HANDOVER-Archiv.md)

- 🔴 **新 Agent 接手铁律：全模块化研发生命周期（四步闭环）**：
  - **核心准则**：后续无论处理任何学科、任何板块（仿真实验、学科工坊、研习组件、真题评分台等），**全部统一使用模块化流程推进**：
    1. **① 独立制作（Isolate & Build）**：在独立沙盒内开发，严禁未完工半成品强行并入；严禁粗暴卸载主画布，任何子 Tab（如画像漫游、因果推演）必须配备核心视觉画布或结构化流转图，严禁纯文本空壳与大片空白；
    2. **② 独立测试（Standalone Test）**：独立验证滑块与动效强联动、SVG 悬停放大几何中心锁定（必须配置 `transformOrigin: \`${cx}px ${cy}px\`` 与 `transformBox: "view-box"`，杜绝偏心位移）、AAA 极高对比度与 Tufte 纯黑白墨水规范（**绝对禁用绿色/彩色字体与杂色背景卡片、零 Emoji、零 Tailwind 动态阴影、零 italic**）；
    3. **③ 接入集成（Integrate）**：在路由总线与全局状态中精准对接，杜绝跨学科串味与默认降级污染；
    4. **④ 集成验证（E2E Regression Test）**：运行 `npx tsc -b`、`vault-check.py` 及全链路交互仿真全绿后，单科独立 Commit。

---

## 🔴 下一步（接手后按此顺序）

### 1. 先跑门禁建基线（3 条命令，确认「全绿」不是文档声明）

```bash
python scripts/vault-check.py                      # 期望 PASS(notes=418, csv_rows=1942, reisen=356, index_links=371)
cd App-EF-Lernvault && npx vitest run              # 期望全部测试 100% PASS (89套件 676单测全绿)
cd App-EF-Lernvault && npm run build               # 期望 ✓ built (0 错误)
```

### 2. 核心主线：推进 Phase 5【TeachingStudio 教学研习工坊深化与全科教材预设扩充】研发（下一会话开工核心）

- **技术规约与全景规范**：[`00_META/TEACHING-STUDIO-SPECIFICATION.md`](00_META/TEACHING-STUDIO-SPECIFICATION.md)；
- **业务目标与深化定位**：
  - 基于 Phase 4 已交付的拆书引擎、4 大通用微世界沙盒、5 步交互微课上课流（`InteractiveLessonRunner`）与通关奖赏河流（`QuestMapTab`），持续深化商业级教学体验；
  - 吸收外部 AI 架构评估（见 [`00_META/TEACHING-STUDIO-SPECIFICATION.md §8`](00_META/TEACHING-STUDIO-SPECIFICATION.md#8-外部架构评审建议与体验进化路线图-phase-5-refinements)）：解决错题归档摩擦、微世界卡关容错、复习插桩视觉双轨分离、课型自适应 3 步轻量流、触觉实体骨架与进度条锚点、智能重排与断点持久化；
  - 扩充北威州 Gymnasium EF 真实各学科经典教材预设与考纲大纲（Deutsch, Philosophie, Physik, Mathe, SoWi 等）；
  - 界面严格遵循 Tufte 纯黑白极简纸墨风（零 Emoji、零 Tailwind 动态阴影、零 italic、1px 发丝线、纯手绘矢量 SVG）。
- **下一会话施工核心任务清单**：
  - **任务 A（真实教材大纲扩充与自适应轻量 3 步流）**：在 `bookPresets.ts` 与 `bookIngestParser.ts` 中丰富 Deutsch（歌德《浮士德》/戏剧分析）、Philosophie（康德/边沁/国家哲学）、Physik（牛顿力学/功能关系）、Mathe（导数/切线）预设；对纯记忆/文献主题支持 `concept_light` 轻量 3 步流（直觉 -> 概念 -> 小测），教具槽位优雅回退；
  - **任务 B（微课交互题卡多样化与实体触觉骨架）**：在 `InteractiveLessonRunner.tsx` 中新增因果链积木卡槽排序卡（Kausalkette Drag & Drop）、正反论点连线配对卡（Pro/Contra Matching）；卡片与按钮加入 2px 实体粗墨边框与轻微物理按压位移（`active:translate-y-[1px]`），发丝进度条升级为 3-4px 几何阶段刻度轨；
  - **任务 C（微世界沙盒宽容度与兜底通道）**：在 `VariableSliderBox` 与 `DilemmaBalanceScale` 中引入 +-5% 容错判定带与平衡点磁性吸附（Magnetic Snapping）；引入 20 秒超时苏格拉底脚手架提示与“跳过直接看推导”按钮，杜绝卡关；
  - **任务 D（主辅双轨关卡河流与智能重排）**：纵向河流专注核心前向探索主轴，艾宾浩斯复习插槽（D+1 Blitz / D+3 Tief）分流至今日使命前置热身栏与浮动温故卫星徽标；规划器引入欠账平滑衰减重排（Smart Reschedule）；
  - **任务 E（错题沉淀降阻与断点会话恢复）**：在通关结算与微课演播厅内提供一键导出 `.md` 补丁与内嵌迷你审阅抽屉（Inline Review Drawer）；在 `localStorage` 缓存未提交题卡 session，防刷新丢失。

### 3. 把德语问询稿发给老师 ← **唯一能解锁剩余阻塞的动作**

复制 [`00_META/Lehrkraft-Anfragen.md`](00_META/Lehrkraft-Anfragen.md) 的「Nachricht」整段。
**阻断面排序**：① 🔴 Sport 2 个 Akzentuierungs-IF → ② 🔴 Deutsch Drama 书名 → ③ 🟡 Musik 学期主题 → ④ 🟡 Englisch 第三文化国家 → ⑤ 🟡 Sport BF/SB / Abitur 轨道。

### 4. 答案到达后 → 按 [`Blocker-Register.md`](00_META/Blocker-Register.md) §F 填空

§F 已备 5 份填空脚手架（Deutsch 戏剧专属段 / Englisch 小说段 / 第三文化国家替换清单 / Musik 学期作品段 / Sport IF 冲刺计划）。**只补占位符，不重写结构。**

### 5. 剩余待办

- **App 侧 `src/baum/*.ts` 仍是 EF 版数据**，需从新版 Markdown 派生。
- **老师回复跟进**：收到老师邮件后按脚手架注入各科。

---

## 待办与阻塞（全部需要「人」推进）

> **完整台账**：[`00_META/Blocker-Register.md`](00_META/Blocker-Register.md) · **德语问询稿**：[`00_META/Lehrkraft-Anfragen.md`](00_META/Lehrkraft-Anfragen.md)

| 类 | 内容 | 状态 |
|---|---|---|
| **A 老师问询** | 15 项（4 科内容走向） | 🔄 待老师回复，问询稿已备 |
| **B 账号权限** | StanSi/SESAM/FWU/eduki 登录墙真题 · Notenlehre Stufe 4 PDF 损坏需重发 | 🔄 部分已由 218 个官方公开 PDF 替代 |
| **C 真人验收** | V2–V4 走查 · 窄屏真机 · Tauri 首次打包 | ⏸️ 暂缓（涉及 App） |
| **D App 工程债** | 7 项（worker 零调用方 · chunk 警告 · `.gitignore` 过宽等） | ⏸️ 暂缓（涉及 App） |

⚠️ 未定项在正文一律标 `⏳ 待确认：` 并继续按考纲常规分支展开（**不停摆**）；相关 `Lehrplan.md` 的「待确认」段**不要写成定论**。

---

## 环境（接手必备）

- 日常开发走本地 WebUI：vault 根目录跑 `. .\scripts\webui.ps1`（起 1420 + 自动开浏览器；热更新）。
- exe 仅发版时打（`npx tauri build`，需 VS2022 C++ workload + rust stable；**从未实跑**）。
- 新终端先跑：`. .\scripts\dt-env.ps1`（设 DEEPTUTOR_HOME + UTF-8，防 data 污染 vault / 防 GBK 崩溃）。
- DeepTutor 家目录：`C:\Users\rongj\.deeptutor-home`（vault 外）。LM Studio 需开着（模型 llama-3-sauerkrautlm-8b-instruct）。

---

## 铁律

- **一次只做一科一 commit**（前缀 `[Deutsch]/[Englisch]/[Mathe]/[Physik]/[Chemie]/[Bio]/[Philosophie]/[SoWi]/[Musik]/[Sport]/[App]/[Meta]`），不跨科混 commit。
- **永不进 git**：`data/`、`_Downloads/`、`*.apkg`、App 构建产物（`target|gen|dist|*.key|*.exe|*.msi`）、`.workbuddy-ai/`。
- **只写原创笔记**（版权红线见 `AGENTS.md §4`）：✅ 可引 NRW 官方公开题的**题干结构**；❌ 不抄出版社教辅原题、不搬教材正文；中国题只做原创改编。每题标来源层级，**解析必原创**。
- **并行协作**：subagent 用 `general`（`explore` 无写盘工具）；文件所有权零重叠；**主线程必须独立复核每条「缺陷」声明**；共享文件（`index.css`/`App.tsx`/`keys.ts`/`examComposer.ts`/`parser.ts`）只能单一所有者。
- **提交前必跑** `python scripts/vault-check.py`，必须 PASS。
