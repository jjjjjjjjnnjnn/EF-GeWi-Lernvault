# HANDOVER — 一页交接（新agent/用户先读我）

> 目标：Gymnasium EF (NRW, Schloss Heessen) 十科提分，中德双语。
> Public repo: https://github.com/jjjjjjjjnnjnnj/EF-GeWi-Lernvault
>
> 📦 **历史状态归档**（2026-09-24 及以前的全部里程碑 + 外部 AI 任务包）→ [`00_META/HANDOVER-Archiv.md`](00_META/HANDOVER-Archiv.md)

## 新agent阅读顺序（5分钟接手）

1. **本文件** → 2. [`AGENTS.md`](AGENTS.md)（规范） → 3. [`00_META/INDEX.md`](00_META/INDEX.md)（导航）
→ 4. [`00_META/Blocker-Register.md`](00_META/Blocker-Register.md)（**卡在哪**） → 5. 目标学科 `Lehrplan.md` → 6. `00_META/Journal/` 最新一篇（当前上下文）

---

## 项目是什么（30 秒）

- **vault**（Obsidian 知识库，**内容真相源**）+ `App-EF-Lernvault/`（Tauri 桌面学习软件，**只读 vault、不写回**）。
- **设计与架构宪法**：[`PROJECT-DESIGN-GUIDELINES.md`](PROJECT-DESIGN-GUIDELINES.md)（**项目设计方案与架构策略全景指南，AI复刻、扩展与 PhET 规范必读**）。
- **PhET 批量重构与自审核 SOP**：[`00_META/PHET-CONVERSION-BATCH-SOP.md`](00_META/PHET-CONVERSION-BATCH-SOP.md)（**外部 AI 批量执行与自审核手册：版权红线、Tufte 美学、60FPS rAF 解耦、动态 DPR 防拉伸、6 大批次全景规划与三级质检**）。
- **文科交互教学与工坊总纲**：[`00_META/GEISTESWISSENSCHAFTEN-INTERACTIVE-PEDAGOGY-PLAN.md`](00_META/GEISTESWISSENSCHAFTEN-INTERACTIVE-PEDAGOGY-PLAN.md)（**文科可探索解释与 GeWi-Labor 24款工坊建设总纲：博弈系统、道德天平、论证树、漫画透镜、戏剧张力与音乐动机**）。
- 目标：德国 NRW Gymnasium EF 十科笔试/口试提分，中德双语，**完全离线**。
- **内容铁律**：所有题目材料只能来自用户自己的笔记原文 —— **超纲率 = 0**。
- **当前规模**：笔记 **401** · Anki 卡片 **1599** · 互动课程 **271 篇**（`Lernreise/`，十科全覆盖，P1+P2 全量连续剧式关卡宇宙与多学科学术解剖台）· 术语表 **805 行** · 十科 Abi-Baum 应试树 · 考纲体系（NRW 十科 + 中国理科四科 + 中德映射）。

---

## 当前状态（2026-09-29）

- ✅ **文科原典精读工坊 (GeWi Reading Lab) 广泛化解耦与四大学科批量扩充落地**：
  - **架构解耦**：通用组件 `GeWiReadingLab.tsx` 与统一数据注册中心 `readingLabRegistry.ts`。
  - **标准设计基线（用户验收锁定）**：纯色无边框标记（`bg-amber-100/60` 修辞、`bg-sky-100/60` 词汇、`bg-amber-200/70` 聚焦，彻底移除所有方框与边线）、开阔舒朗双栏（`gap-8 xl:gap-10`）、左栏吸顶伴读无外溢滚动、右栏单题深入精读决策台、紧凑折叠分段诊断胶囊（`🎯 正解锚点` / `⚠️ 干扰诊断` / `🏛 时代哲学` / `✍️ 高分句` / `📑 全景展开`）。
  - **跨学科批量原典库（4 科 6 部典籍 36 道长篇真题）**：
    - 德语文学（Deutsch）：Goethe《Faust I》（黑夜学者独白 V. 354–385；书斋立约豪赌 V. 1692–1711）
    - 德语戏剧（Deutsch）：Georg Büchner《Woyzeck》（理发长官场景 Beim Hauptmann，阶级规训与反英雄悲剧）
    - 哲学原典（Philosophie）：Immanuel Kant《Grundlegung zur Metaphysik der Sitten》（定言命令与绝对自律）
    - 社会科学（SoWi）：Frank-Walter Steinmeier《Demokratie braucht Demokraten》（政治演说论证与公民韧性）
    - 英语文学（Englisch）：William Shakespeare《Macbeth》（Act V Scene 5 虚无独白与抑扬格五音步）
    - 每道题均配备【✅ 正解依据与文本锚点】、【❌ 干扰项逐项诊断】、【🏛 时代思潮与哲学脉络】、【✍️ 14 分标准句式（Muster-Formulierung）】与【官方采分点（Erwartungshorizont / EHZ）】。
  - **正式课程与教具全链路落地**：
    - `Reise.tsx`：当文科互动课程调用 `[Werkzeug: text-analyse]`、`reader`、`originaltext`、`faust`、`woyzeck`、`kant`、`rede` 等别名时，自动激活 `GeWiReadingLab`，彻底取代原简陋的 4 行 `EditorialReader`。
    - `Werkzeuge.tsx`：工具箱原文本标记器升级为「原典解剖台（Textanalyse-Labor）」，按当前学科动态过滤文献。
    - `DesignLab.tsx`：升级为 1440px 宽幅原典解剖工坊展厅。
- ✅ **社科 Xetra 电子订单簿撮合实验台与微课解耦**：
  - 新建独立教具 `OrderbuchSimulator.tsx`，攻克证券存托研习步骤 4（`SoWi-Wertpapierdepot-Orderarten-L1.md`）的排版拥挤与内容重复缺陷，提供买卖深度、市价/限价/止损单撮合、滑点与价差仿真台，并解耦完整微课剧场折叠展开。
  - 重构 `LectureTheatre.tsx` 微课文案为动态属性，彻底消除文学微课显示经济学解说的串味缺陷。
- ✅ **工程与规范维护**：
  - 修复根目录 `.gitignore` 中 `/data/` 锚点规则，确保 `App-EF-Lernvault/src/data/` 正常纳入版本控制。
  - 门禁流水线全绿：`vault-check.py` PASS（401 notes, 1599 csv rows, 337 index links, 271 reisen, 0 badnames, 0 badglossar），`tsc -b && vite build` 0 错误（6.12s 通过）。
- ✅ **Lernreise 互动课程 P1+P2 全量重塑收官 (269/269 篇)**：十科 269 篇互动课程全量完成 8 大连续剧关卡宇宙（Campaign Storylines）深度重塑。S1 生活反差 Hook（$\ge 100$ 词/字）、8 步具名小节标题、S4 绑定 14 类注册实验教具（`osmose-lab`, `titration-lab`, `le-chatelier-sim`, `schiefe-ebene`, `kinematik-lab`, `box-optimizer`, `tangent-slider`, `gini-allocator`, `markt-sim`, `balance-board`, `highlighter`, `lego`, `oral-timer`, `formula`）、S5 双对抗辨析、S8 `reflexion` 标签全部对齐。三道流水线全绿：`audit-pedagogy-integrity.py` 6 项指标全零；`vault-check.py` 报告 `reisen=269`, `badnames=0`, `PASS`；`npx tsc -b` 零错误。十科单科独立 Commit 干净落库。
- ✅ **App 客户端滚动与大纲目录同步底层修复**：在 `Reise.tsx` 中改用捕获阶段滚动监听（Capture Phase Scroll Listener），解决 DOM `scroll` 事件不冒泡导致的右侧 TOC 目录无法跟随滚动同步高亮的长期缺陷；升级穿透式 `scrollToContainerTop` 与三阶开课居顶时序，彻底修复“回到顶部失败”与“打开课程不在顶部”问题。

- ✅ **Lernreise 互动课程全量扩充收官 (70 → 88 篇)**：十科 18 门紧缺核心新课全量入库验收（Mathe 3 篇 / 理化 3 篇 / 生社 3 篇 / 德音体 5 篇 / 英语 4 篇）。100% 对齐 Lesson-v3 9 步制架构（Schritt 1–8 + Fehlvorstellung + Anekdote），全量内嵌学科交互教具沙盒（`[Werkzeug: <id>]`）、双向辨析（`VERGLEICH:` 选程序/选概念）与直观 ASCII 结构图。`python scripts/vault-check.py` 报告 `reisen=88`、`vergleich=0`、`PASS`。
- ✅ **知识网络 (Mindmap) 发散性星系图谱重构**：废除旧版竖向堆叠线性图，实现多中心发散算法（Multicentric Radial Divergent Algorithm）。支持全学科星系模式（Nebula：以中心辐射 10 学科并在外周扇形发散）与单学科环轨模式（Orbit：3 层同心轨道环绕）。支持节点悬停聚光灯高亮（Spotlight Hover）、视口多级平移缩放，严格遵循 SVG line 测试契约。
- ✅ **笔记库 (Library) 分页检索与多维筛选升级**：消除 385 篇无节制长列表堆叠，开发支持 8/12/20 条切换的底部分页组件（`Pagination.tsx`）；引入 AFB I/II/III 认知层级与 `* Klausur` 复合分面筛选；实现列表分栏 (Split List) 与响应式 3 列卡片网格 (Card Grid) 双视图；支持 `[` / `]` 翻页与 `j` / `k` 上下篇键盘快捷精读。
- ✅ **企业实训级沉浸式教学标准落地与外部 AI 指令发布**：发布 [`00_META/External-AI-Enterprise-Curriculum-Prompt.md`](00_META/External-AI-Enterprise-Curriculum-Prompt.md)，确立麦肯锡学院/PhET 级别的 6 步企业级实训课件标准（情境钩子 $\to$ 认知解构 $\to$ 图示原理 $\to$ 上手实验沙盒 `[Werkzeug: <id>]` $\to$ 形成性纠偏 $\to$ Klausur 真题实战）；梳理十科 40 门核心课表缺口矩阵，配套即拷即用的外部 AI 发卷 Prompt。
- ✅ **S8 十科笔记生产 100% 收官**：十科 §4 施工图 **225/225 = 100% 完成**。补齐 Philosophie 尾项笔记《Sonderstellung-des-Menschen.md》，完成 Chemie 三篇核心笔记深度升级。全库笔记达 **386 篇**。
- ✅ **App 客户端全量数据通道与 KlausurSim 优化**：导出带 blocks 的 `generatedVaultNotes.ts` 作为客户端全量底座，KlausurSim/Quiz 消除空数据门槛，全十科即开即考，并提供「Erwartungshorizont einblenden」自评采分对照。
- ✅ **UI 工作区重构与学习树自适应大纲升级**：侧边栏收敛为 5 大清晰主工作区（Übersicht, Wissen, Karteikarten, Training, KI-Tutor + Einstellungen），配备现代微胶囊分段条（Segment Pills）；Lernbaum 彻底根治超宽裁切，垂直步长紧凑化，新增「全图适应 / Einpassen」与「Gliederung (大纲目录)」双模态切换。全部 57 套件 382 测试与构建 100% 绿。
- ✅ **KI 助教交互体系全面重构与抗漂移精准锚定**：重塑 Sokratisch 启发引导（引入认知支架，严禁脱纲）与 Klausur-Direkt 考纲直出双模态；支持笔记引用无缝精准跳转与全库出处校验；顶部加入学科胶囊切换与快捷提问芯片。
- 📋 **外部 AI 全量内容搜集大师规范编制就绪**：发布 [`00_META/Lehrplan-Content-Spezifikation.md`](00_META/Lehrplan-Content-Spezifikation.md)，包含十科缺口清单、9步交互课程规范、八段式笔记规范、Anki卡片规范与即用型外置 AI 提示词。
- ✅ **官方源本地化**：`_Downloads/CURRICULUM/` 固化 **218 个官方 PDF / 127MB**（KLP 十科 + 2027 新版 · Operatoren 14 · Abitur-Vorgaben 72 · IQB Poolaufgaben 64 · 中国课标 21），每件配 `.quelle.txt`，**全部 gitignored**。
- ✅ **规范维护轮**：文件名规范化 · `vault-check.py` 强制校验 `badnames` / `badglossar` · `AGENTS.md §1` 笔记落位确定规则 · 建立 [`Blocker-Register.md`](00_META/Blocker-Register.md) 与 [`Lehrkraft-Anfragen.md`](00_META/Lehrkraft-Anfragen.md)。

---

## 🔴 下一步（接手后按此顺序）

### 1. 先跑门禁建基线（3 条命令，确认「全绿」不是文档声明）

```bash
python scripts/vault-check.py                      # 期望 PASS(359/1400/275)
cd App-EF-Lernvault && npx vitest run              # 期望 57 套件 / 379 测试
cd App-EF-Lernvault && npm run build               # 期望 ✓ built
```

### 2. 外部 AI 海量内容搜集与批量充实（核心动作）— ✅ 已完成（2026-09-25）

按 [`00_META/Lehrplan-Content-Spezifikation.md`](00_META/Lehrplan-Content-Spezifikation.md) 中的【即用型外部 AI 批量提示词】，已由外部 AI 批量产出各科紧缺的交互新课并入库：`Lernreise/` 由 **5 篇 → 70 篇**（十科全覆盖，9 步 Lesson-v3），十科笔记缺口经审计**已全部收官**。详见 [`00_META/Journal/2026-09-25-lernreise-vollausbau.md`](00_META/Journal/2026-09-25-lernreise-vollausbau.md)。剩余可选动作：两篇旧版 5 步制试点（Musik-Hoeranalyse / Sport-Bewegung-Erklaeren）升级为 9 步；新课程配套 Anki 词卡。

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
