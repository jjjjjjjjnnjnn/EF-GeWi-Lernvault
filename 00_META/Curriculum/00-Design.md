---
fach: ""
thema: "Curriculum-System Design"
operatoren: []
klausurrelevant: false
datum: 2026-09-24
tags: [EF, Meta]
---

# 考纲体系设计总纲（Curriculum-System）

> 本文件是整个「跨国考纲对照工程」的**唯一设计真相源**。
> 任何 agent 在 `00_META/Curriculum/` 下工作前必须先读本文件。
> 最后更新：2026-09-24（接手方建立）

---

## 0. 工程目标

建立一套**跨学段、跨国别的完整高中考纲体系**，覆盖：

- **学段**：EF + Q1 + Q2（完整 gymnasiale Oberstufe，即德国高中后段三学年）
- **国别基准**：
  - **文科**（Deutsch / Englisch / Philosophie / SoWi / Musik / Sport）→ 以**德国 NRW** 为唯一权威基准
  - **理科**（Mathe / Physik / Chemie / Bio）→ **德国 NRW + 中国**双基准对照
- **用途**：作为上层笔记（102 篇 → 目标 300+）、Anki 卡片、Lernbaum 学习树、App 内容源的**结构化骨架**

**核心价值主张**：德国体系强调**能力取向（Kompetenzen）**，中国体系强调**内容深度与解题方法**。理科对照的目的不是评判优劣，而是**把中国理科的知识密度与解题技法，适配到德国考纲的框架里**。

---

## 1. 关键前置结论（来自 2026-09-24 官方源调研，已验证）

> ⚠️ **这一节必须严格遵守，否则整个大纲体系会建立在错误基准上。**

### 1.1 NRW 存在三个并行的 KLP 世代 —— 不许混用

| 世代 | 生效 | 适用 | 覆盖 |
|---|---|---|---|
| **现行版（ab SJ 2022/2023）** | 2022/23 起 | **当前在校 EF–Q2 学生** | 8 科 |
| **新版（ab SJ 2027/2028）** | 2027-08-01 起逐级生效 | 2027 秋季入学新生 | 30+ 科 |
| **旧版（ab SJ 2013）** | 2013 起 | Philosophie / SoWi / Musik / Sport 的**现行有效版** | 4 科 |

**本项目决策：以「当前在校生的 EF–Q2」为准**，即：
- Deutsch / Englisch / Mathe / Physik / Chemie / Bio → **2022/2023 版（现行版）**
- Philosophie / SoWi / Musik / Sport → **2013 版**（这四科未被 2022/23 批次取代）

> 每份大纲文件头部必须用 `klp_version` 字段标明用了哪一版，**不许含混**。

### 1.2 Operatoren 不在 KLP 内

所有 10 科 KLP 的第 4 章统一只写「使用本学科 Abitur 适用的 Operatoren」，指向外部 **Operatorenübersicht**。

- **AFB 通则**（已验证）：AFB I = Reproduktion / AFB II = Reorganisation und Transfer / AFB III = Reflexion und Problemlösung
- Abitur 必须覆盖全部 AFB，**AFB II 为重点**
- 各科 Operatoren 表来源：`standardsicherung.schulministerium.nrw.de/zentralabitur-gost/faecher/<fach>-gost`
- → **Operatoren 必须单独建文件**，不能从 KLP 抓取

### 1.3 Klausur 时长不在 KLP 内

在 **BASS 13-32 Nr. 6**。→ 单独建源。注意 **Abitur 时长 ≠ 平时 Klausur 时长**。

### 1.4 Englisch 结构特殊

英语 KLP **没有 Inhaltsfelder**（全文无该词），采用纯能力导向模型（遵循 KMK Bildungsstandards 2012），5 个 Kompetenzbereiche。
→ 英语大纲文件**不套用 Inhaltsfeld 模板**，改用能力维度模板。这是事实不是缺失。

### 1.5 SoWi 有双 Fachseite

`sozialwissenschaften-gost` 与 `sozialwissenschaftenwirtschaft-gost` 两个独立页。→ 归档时注意区分。

---

## 2. 目录结构（固定，不许自创）

```
00_META/Curriculum/
├── 00-Design.md                    # 本文件（设计总纲，唯一真相源）
├── 01-Quellen.md                   # 官方源清单与许可状态（唯一真相源）
├── Deutschland/                    # 德国 NRW KLP 大纲（结构化摘要，非原文）
│   ├── _Template-Oberstufe.md      # 文科模板（Inhaltsfeld 导向）
│   ├── _Template-MINT.md           # 理科模板（含中德对照位）
│   ├── <Fach>-Oberstufe.md         # 10 科 × 1
│   └── Operatoren-NRW-Alle-Faecher.md   # 10 科 Operatoren 汇总 + AFB
├── China/                          # 中国高中理科课标（结构化摘要）
│   ├── _Template-China.md
│   ├── Mathe-CN-Kursstandard.md
│   ├── Physik-CN-Kursstandard.md
│   ├── Chemie-CN-Kursstandard.md
│   └── Bio-CN-Kursstandard.md
├── Mapping/                        # 中德对照（仅理科）
│   ├── _Template-Mapping.md
│   └── <Fach>-DE-CN-Mapping.md     # 4 科 × 1
└── Klausur-Formate/                # 考试形式统一源
    └── Klausur-und-Abitur-Formate.md
```

> **命名规范**：文件名一律 ASCII + kebab/驼峰，**禁用德语变音符号**（ä→ae / ö→oe / ü→ue / ß→ss）。原因见 `AGENTS.md §1`：Windows 下 Git 终端会遇到编码转义问题。

---

## 3. 三套模板的字段定义

### 3.1 德国文科模板（`_Template-Oberstufe.md`）

适用：Deutsch / Philosophie / SoWi / Musik / Sport（Englisch 特殊，见 3.4）

```yaml
---
fach: Deutsch              # 固定词
thema: "Oberstufe Curriculum"
operatoren: []             # 该科核心 Operator 动词
klausurrelevant: false     # 大纲文件本身不是笔记，固定 false
datum: YYYY-MM-DD
tags: [EF, Meta, Curriculum]
klp_version: "2022/23"     # 或 "2013" —— 必填
klp_heft: "4701"           # 官方 Heft 编号
stufe: "EF|Q1|Q2"          # 本文件覆盖的学段
---
```

正文骨架：
1. **Inhaltsfelder（内容领域）** —— 按 EF / Q1 GK / Q1 LK / Q2 分学段列出
2. **inhaltliche Schwerpunkte（内容重点）** —— 每个 IF 下的具体条目
3. **Kompetenzbereiche（能力领域）** —— 该科的能力维度
4. **Klausur 形式与时长** —— 引用 `Klausur-Formate/`
5. **中德双语** —— 中文理解在上、德语原文在下

### 3.2 德国理科模板（`_Template-MINT.md`）

适用：Mathe / Physik / Chemie / Bio

在文科模板基础上**增加**：
6. **Progression EF→Q1→Q2** —— 知识递进链条（这是理科最关键的维度）
7. **CN-Anschluss（中国对应位）** —— 标注「德有中无 / 中有德无 / 难度差」的**占位提示**，具体对照写进 `Mapping/`

> ⚠️ **文理分模板的原因**：理科有强递进性与跨国可比性，文科的 Inhaltsfeld 是并列关系且无中国对照基准。

### 3.3 中国课标模板（`_Template-China.md`）

```yaml
---
fach: Mathe
thema: "CN-Kursstandard"
operatoren: []
klausurrelevant: false
datum: YYYY-MM-DD
tags: [EF, Meta, Curriculum, China]
version: "2017年版2020年修订"   # 必填，注意版本差异
---
```

正文骨架：
1. **课程结构** —— 必修 / 选择性必修 / 选修 的模块或主题划分
2. **各模块知识点清单** —— 具体到知识点级（中国课标规定较细，逐条列出）
3. **学业质量水平** —— 水平数量因科而异（**数学 3 级 / 物理 5 级 / 化学 4 级 / 生物 4 级**，见下）
4. **高考考查要求** —— 合格考依据水平 vs 等级考（高考）依据水平
5. **核心素养** —— 数学 6 / 物理 4 / 化学 5 / 生物 4

**四科水平数速查（已验证）**：

| 科目 | 水平数 | 合格考依据 | 高考（等级考）依据 |
|---|---|---|---|
| 数学 | **3** | 水平一 | **水平二** |
| 物理 | **5** | 水平 2 | **水平 4** |
| 化学 | **4** | 水平 2 | **水平 4** |
| 生物 | **4** | 水平一、二 | **水平四** |

### 3.4 英语专用模板（不套 Inhaltsfeld）

英语 KLP 无 Inhaltsfelder，改用 5 个 Kompetenzbereiche：
`Funktionale kommunikative Kompetenz` / `Interkulturelle kommunikative Kompetenz` / `Text- und Medienkompetenz` / `Sprachlernkompetenz` / `Sprachbewusstheit`

### 3.5 中德映射模板（`_Template-Mapping.md`）

仅理科。核心是一张 **三态对照表**：

| DE 知识点 | CN 对应 | 状态 | 备注 |
|---|---|---|---|
| … | … | `DE-only` / `CN-only` / `both` | 难度差 / 深度差 |

**状态码定义（固定四值）**：
- `both-equal` —— 两边都有，深度相当
- `both-de-deeper` —— 两边都有，德国更深
- `both-cn-deeper` —— 两边都有，中国更深 ← **项目最关注的类型**
- `DE-only` / `CN-only` —— 只有一边有

---

## 4. 版权红线（**Public 仓库，最严格**）

沿用 `AGENTS.md §4`，本工程额外强调：

1. **仓库内只提交「结构化摘要」**：Inhaltsfeld 名称、内容重点条目、能力维度、水平划分 —— 这些是**公开政府文件的目录结构**，可引用。
2. **绝不搬运原文段落**：不复制 KLP / 课标的正文论述、不复制教材正文。
3. **原始 PDF 一律进 `_Downloads/`**（gitignored），每件配同名 `.quelle.txt`（来源 + 许可 + 日期）。
4. **清单唯一真相源**：`00_META/Download-Quellen.md`（已有）+ 本工程新增源写入 `Curriculum/01-Quellen.md`。
5. 商业资源（Stark / Klett 教辅正文）**只记链接，永不入库**。

---

## 5. Agent 工作流

### 5.1 单个大纲文件的产出流程

```
读本设计文档 → 读 01-Quellen.md 拿官方源 → 访问源 → 
结构化提取（只提目录结构级信息）→ 套模板 → 
填写 frontmatter（含 klp_version）→ 
标注「已验证」vs「据推断」→ 
更新 00_META/INDEX.md → commit（前缀 [Meta]）
```

### 5.2 「已验证 vs 据推断」标注规范（**强制**）

每条实质信息必须归入以下一类，**不许模糊**：

- `[已验证]` —— 我实际访问了官方源并确认
- `[据推断]` —— 仅凭搜索摘要或二手转述，未直接确认
- `[未获取到]` —— 明确写"未获取到"，**绝不编造**

> 这条来自项目历史教训：曾出现基于旧快照的误报。

### 5.3 并行协作铁律

- subagent 必须用 `general`（`explore` 无写盘工具）
- **文件所有权零重叠**：一个 agent 一个文件，不许两个 agent 写同一文件
- **主线程必须独立复核每一条产出**（不许采信 agent 自述）
- 共享文件（`INDEX.md`）**只由主线程改**，subagent 不得触碰

### 5.4 Commit 规范

- 一次只做一科一 commit
- 前缀：`[Meta]`（大纲体系属 META 域）
- 消息格式：`[Meta] Curriculum <Fach>: <动词短句>`

---

## 6. 执行路线图

| 阶段 | 内容 | 状态 |
|---|---|---|
| **S0** | 框架与规范（本文件 + 模板 + 源清单） | 🔄 进行中 |
| **S1** | 试点：SoWi（文科）+ Mathe（理科含映射）跑通 | ⏳ 待启动 |
| **S2** | 用户验收试点 → 修正模板 | ⏳ |
| **S3** | 德国 10 科全量（并行 subagent，一科一文件） | ⏳ |
| **S4** | 中国理科 4 科全量 | ⏳ |
| **S5** | 中德映射 4 科 + 差异清单 | ⏳ |
| **S6** | Operatoren / Klausur-Formate 统一源 | ⏳ |
| **S7** | 上层对接：Lernbaum 扩展 EF→Q2、笔记缺口清单 | ⏳ |
