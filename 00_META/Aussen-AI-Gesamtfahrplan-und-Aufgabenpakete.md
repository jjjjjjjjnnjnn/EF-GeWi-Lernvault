---
fach: ""
thema: "Aussen-AI-Gesamtfahrplan-und-Aufgabenpakete"
operatoren: [darstellen, analysieren, beurteilen]
klausurrelevant: false
datum: 2026-09-26
tags: [EF, Meta, Roadmap, AI-Handover]
---

# 外部 AI 工业级交接总纲与批量任务分发规程 (External AI Master Handover & Roadmap)

> **使用定位**：本文件为项目工程交接真相源。所有高耗时、批量重复性的**大纲补全、课程纯德语化改造、跨学科新课程批量编写**均通过本文件定义的标准化任务包（Prompts）分发给外部高级 AI（如 Claude 3.7 Sonnet / GPT-4o / DeepSeek-V3）执行。

---

## 目录
1. [一、 现状诊断与核心痛点解构](#一-现状诊断与核心痛点解构)
2. [二、 十门学科全息大纲与课程缺漏矩阵 (Gap Matrix)](#二-十门学科全息大纲与课程缺漏矩阵-gap-matrix)
3. [三、 德语长词排版与 UI 防遮挡设计规范 (German UX Typography)](#三-德语长词排版与-ui-防遮挡设计规范-german-ux-typography)
4. [四、 外部 AI 一键发卷提示词库 (Ready-to-Use Master Prompts)](#四-外部-ai-一键发卷提示词库-ready-to-use-master-prompts)
   - [任务包 A：现有课程纯德语化与去噪清洗 (Purification & De-chinesing)](#任务包-a现有课程纯德语化与去噪清洗-purification--de-chinesing)
   - [任务包 B：德国本土学生纯德语企业实训级新课批量生产](#任务包-b德国本土学生纯德语企业实训级新课批量生产)
   - [任务包 C：中国留学生中德双语认知桥梁新课批量生产](#任务包-c中国留学生中德双语认知桥梁新课批量生产)
5. [五、 自动化门禁校验与合入检查清单](#五-自动化门禁校验与合入检查清单)

---

## 一、 现状诊断与核心痛点解构

经过系统全面排查，当前知识库与教学系统存在三大关键演进方向：

1. **课程内容中混杂中文，未能针对德国本地学生彻底纯化**：
   - 早期部分课程文件在 `Schritt 1` 至 `Schritt 4` 中混有大量的「中文理解：...」、「先读中文，再记德语」、「中文纠偏」等，无法直接交付给德国本土 Gymnasium 学生使用。
   - **解决方案**：前端已上线 `DE rein` 精简模式；同时对于物理文件，需通过外部 AI 批量将旧课件清洗重构为正统的德语 Fachsprache（纯德语版）并归档。

2. **德语复合词过长导致按钮换行、挤压或横向遮挡 (Text Overflow & Layout Shift)**：
   - 德语单词极长（如 *Wiederholungsintervall*, *Klausursimulation*, *Verstanden & Weiter*），在移动端或窄窗口下容易将右侧操作按键挤出视口，导致用户必须横向滑动才能点击。
   - **解决方案**：
     - 界面样式全面采用自适应最小高度（`min-h-11 h-auto`）与弹性折行（`whitespace-normal sm:whitespace-nowrap`）；
     - 德语按钮文字精简化：用 `Weiter (+5 XP) →` 替代 `Verstanden & Weiter (+5 XP) →`，用 `Erneut prüfen` 替代超长句，并配齐标准 `title` 提示。

3. **学科大纲与课程体系仍有大片空白**：
   - 现存课程 88 门，虽覆盖了核心骨架，但距离完整覆盖北威州 EF-Q2 阶段考纲（全套约 180~220 门课）仍存在缺口，尤其在理科（Chemie, Bio）实验探究与文科（Deutsch, Englisch）文学流派板块。

---

## 二、 十门学科全息大纲与课程缺漏矩阵 (Gap Matrix)

外部 AI 在接单生产前，必须依据下表所列考纲缺口进行定向生产：

| 学科 (Fach) | 北威州核心领域 (Inhaltsfeld) | 已建核心课程 | ⚠️ 待补全高优先级课程 (Backlog) | 建议教具 (Werkzeug) |
| :--- | :--- | :--- | :--- | :--- |
| **03_Mathe** | IF 1: Funktionen & Analysis<br>IF 2: Analytische Geometrie | Ableitung, Polynome, Extremwert, Wendepunkte, G(x) | 1. `Grenzwert-und-h-Methode`<br>2. `Rekonstruktion-von-Funktionen`<br>3. `Vektoren-im-Raum-und-Skalarprodukt`<br>4. `Kosinussatz-und-Orthogonalitaet` | `tangent`<br>`formula` |
| **04_Physik** | IF 1: Dynamik & Kinematik<br>IF 2: Erhaltungssaetze | Beschleunigte Bewegung, Kreisbewegung | 1. `Freier-Fall-und-Luftwiderstand`<br>2. `Impulserhaltung-und-Stoesse`<br>3. `Gravitation-und-Satellitenbahnen`<br>4. `Federpendel-und-Harmonische-Schwingung` | `kinematik` |
| **05_Chemie** | IF 1: Stoffmenge & MWG<br>IF 2: Saeure-Base-Gleichgewichte | Katalyse, Stoechiometrie-MWG | 1. `Chemisches-Gleichgewicht-Le-Chatelier`<br>2. `pH-Wert-starker-und-schwacher-Saeuren`<br>3. `Titrationskurven-und-Indikatoren`<br>4. `Redoxreaktionen-und-Oxidationszahlen` | `formula` |
| **06_Bio** | IF 1: Zelle & Stoffwechsel<br>IF 2: Genetik & Oekologie | Zellatmung, Photosynthese | 1. `Biomembranen-und-Osmose-Diffusion`<br>2. `Enzymkinetik-und-Allosterische-Hemmung`<br>3. `DNA-Replikation-und-Meselson-Stahl`<br>4. `Proteinbiosynthese-Transkription-Translation` | `formula` |
| **08_SoWi** | IF 1: Marktwirtschaft<br>IF 2: Soziale Ungleichheit | Kreislauf-BIP-Kritik, Marktmechanismus | 1. `Wirtschaftspolitik-Magisches-Sechseck`<br>2. `Strukturwandel-und-Prekarisierung`<br>3. `Sozialstaat-Prinzipien-und-Rentenkrise`<br>4. `Tarifautonomie-und-Gewerkschaften` | `markt`<br>`balance` |
| **07_Philosophie** | IF 1: Ethik & Moral<br>IF 2: Anthropologie | Utilitarismus, Kant Imperativ | 1. `Epikureismus-vs-Stoa-Seelenruhe`<br>2. `Willensfreiheit-Hirnforschung-Libet`<br>3. `Gesellschaftsvertrag-Hobbes-Locke-Rousseau`<br>4. `Tierethik-und-Verantwortungsprinzip` | `balance` |
| **01_Deutsch** | IF 1: Texte & Medien<br>IF 2: Sprache & Drama | Rhetorik, Sanduhr-Erörterung | 1. `Kommunikationsmodelle-Schulz-von-Thun`<br>2. `Dramenszenenanalyse-Lessing-Emilia-Galotti`<br>3. `Sprachwandel-und-Kiezdeutsch-Debatte`<br>4. `Gedichtanalyse-Expressionismus-Grossstadt` | `highlighter`<br>`lego` |
| **02_Englisch** | IF 1: Globalisation<br>IF 2: Shakespeare & Identity | Speech Analysis, Postcolonialism, Dystopia, Shakespeare | 1. `American-Dream-Myth-vs-Reality`<br>2. `Media-Manipulation-and-Fake-News`<br>3. `Nigeria-Postcolonial-Voices-Adichie`<br>4. `Genetic-Engineering-Brave-New-World` | `highlighter`<br>`balance` |
| **09_Musik** | IF 1: Strukturen der Musik<br>IF 2: Musik & Gesellschaft | Kadenz, Sonatenhauptsatzform | 1. `Leitmotivtechnik-Wagner-und-Filmmusik`<br>2. `Zwölftonmusik-Arnold-Schoenberg`<br>3. `Polyphonie-vs-Homophonie-Bach`<br>4. `Rhythmus-und-Synkopen-im-Jazz` | `oral-timer`<br>`formula` |
| **10_Sport** | IF 1: Bewegungslehre<br>IF 2: Trainingslehre | Anfangskraft, Energiebereitstellung | 1. `Koordinative-Faehigkeiten-nach-Hirtz`<br>2. `Superkompensation-und-Belastungsreiz`<br>3. `Aerobe-vs-Anaerobe-Laktatkurve`<br>4. `Doping-Ethik-und-Gesundheitsrisiken` | `kinematik`<br>`oral-timer` |

---

## 三、 德语长词排版与 UI 防遮挡设计规范 (German UX Typography)

为杜绝德语词长导致的视觉截断与强制横向滚动，外部 AI 与前端工程必须严格遵循以下规则：

1. **按钮文字长度红线**：
   - 交互按钮中的德语文字**严禁超过 18 个字符**；
   - 推荐简洁表达对照：
     - ❌ `Verstanden und zum nächsten Schritt übergehen (+5 XP) →` (49 字符，必爆)
     - ✅ `Weiter (+5 XP) →` (16 字符，配合 `title="Verstanden & Weiter"`)
     - ❌ `Überarbeitet? Jetzt erneute Bewertung durch die KI anfordern` (57 字符)
     - ✅ `Erneut prüfen (1)` (16 字符)
     - ❌ `Schrittweise Musterlösung und Lösungsweg anzeigen` (47 字符)
     - ✅ `Lösung anzeigen` (15 字符)
2. **布局弹性机制**：
   - 按钮容器必须带 `flex-wrap`，按钮本身设为 `whitespace-normal sm:whitespace-nowrap text-center`；
   - 步骤导航条使用 `overflow-x-auto` 配合自适应弹性胶囊，确保在任何视口宽度下均完整可点。

---

## 四、 外部 AI 一键发卷提示词库 (Ready-to-Use Master Prompts)

### 任务包 A：现有课程纯德语化与去噪清洗 (Purification & De-chinesing)

> **使用方法**：将下方提示词与需要去噪的现有课件全文一并发送给外部 AI，要求其产出彻底纯化、零中文的德国本土版课件。

```markdown
请你扮演北威州文理高中（Gymnasium NRW）教研室主任兼德语母语学科专家。
你的任务是将提供的这篇中德混排课件，彻底改造成一篇【面向德国本土高中生、100% 纯正学术德语、零中文残留】的企业实训级标准课件。

### 重构准则：
1. **彻底消除中文与翻译桥梁**：
   - 将所有 "中文理解："、"中文："、"先读中文再记德语"、"CN-Methode" 彻底重写为纯正的高阶学术德语解释（Präzise fachdidaktische Erklärung）；
   - 保留通俗的生活隐喻（Alltagsanalogie / Intuitive Metapher），但必须用地道的德语写出。
2. **数学与科学公式严苛排版 (KaTeX)**：
   - 所有算式、函数、变量、单位必须使用标准 LaTeX（行内 `$f'(x) = \dots$`，独立行 `$$...$$`）；
   - 严禁出现无格式纯文本公式（如 `f(x) = 4x^3` 必须转为 `$f(x) = 4x^3$`）。
3. **严格 8 步闭环架构（保持 Markdown 标题固定）**：
   - `## Schritt 1 — entdecken`: ZIELE (3 präzise Punkte) & Klausur-Satz
   - `## Schritt 2 — entdecken`: PRETRAINING-Box (5 Kernbegriffe rein auf Deutsch mit Definitionen)
   - `## Schritt 3 — entdecken`: Tiefen-Konzept & ASCII/Mermaid Visual Schema
   - `## Anekdote & Fun-Fact`: Historischer Kontext oder Alltags-Aufhänger
   - `## Schritt 4 — ausprobieren`: Mit `[Werkzeug: <id>]`, AUFGABE (AFB II), HILFE & MUSTERLÖSUNG
   - `## Schritt 5 — ausprobieren`: VERGLEICH (Verfahren A vs. B)
   - `## Schritt 6 — check`: CHECK (3 Fragen mit FRAGE: ... | ANTWORT: ...)
   - `## Fehlvorstellung`: 2 typische Schülerfehler (Fehlkonzept & Korrektur)
   - `## Schritt 7 — szenario`: ROLLE, SITUATION, AUFGABE (AFB III), RUBRIC (Punkteverteilung)
   - `## Schritt 8 — entdecken`: TAKEAWAY & 2 REFLEXIONSFRAGEN
4. **命名法则与文件规范**：
   - 保持原 Frontmatter 结构；
   - 严禁使用 Emoji（全部用内联标注或纯文本替代）。

请直接输出重构后的纯德语 Markdown 全文。
```

---

### 任务包 B：德国本土学生纯德语企业实训级新课批量生产

> **使用方法**：从本文件第二节的「待补全高优先级课程」中挑选课题名称，填入占位符发给外部 AI。

```markdown
请你扮演北威州最高级别文理高中（Gymnasium NRW）学科组长兼企业实训架构师。
你的任务是为德国高中 EF 阶段编写一门达到【麦肯锡商学院 / PhET 互动实验 / Datacamp 实训】标准的沉浸式纯德语企业实训互动课程。

### 待编写课题信息：
- 学科 (Fach): 【填写，如：Physik】
- 课题名称 (Thema): 【填写，如：Freier Fall und Luftwiderstand】
- 目标级别: Level 1, Ziel: Klausur (EF Kernlehrplan)
- 建议教具 (Werkzeug ID): 【如：kinematik】

### 生产规范：
1. **纯德语交付**：全文严禁出现任何中文字符，完全使用地道专业的德语学术用语（Fachsprache）；
2. **生动叙事破冰**：第 1 步必须以引人入胜的真实工程事故、科学八卦（如伽利略比萨斜塔实验的真实细节）或直觉反常识谜题切入；
3. **公式全量 KaTeX**：所有变量、公式严格包裹在 `$...$` 或 `$$...$$` 中；
4. **完整包含 8 个标准 Schritt 与 Anekdote/Fehlvorstellung**；
5. **内嵌教具**：第 4 步必须首行声明 `[Werkzeug: <toolId>]` 并提供明确的参数实验探究指导。

请直接输出规范的 Markdown 文件内容。
```

---

### 任务包 C：中国留学生中德双语认知桥梁新课批量生产

> **使用方法**：针对需要双语认知破冰的中国在德高中生课程，使用此指令生成。

```markdown
请你扮演北威州资深留德中学生升学指导教研专家兼认知科学家。
你的任务是为在德国文理高中读 EF 阶段的中国留学生开发一套【双语认知桥梁 + 考纲直接采分】的互动实训课程。

### 待编写课题信息：
- 学科 (Fach): 【填写，如：SoWi】
- 课题名称 (Thema): 【填写，如：Wirtschaftspolitik: Das Magische Sechseck】
- 建议教具 (Werkzeug ID): 【如：markt】

### 核心双语架构规范：
1. **认知在上，考场在下**：中文深度认知理解破冰在上，德语考场满分学术表达（Klausur-Satz）在下；
2. **术语对照对齐**：核心概念必须列出【德语术语 — 对应中文准确概念 — 考场使用陷阱】；
3. **公式严格 KaTeX 化**；
4. **完整包含标准 8 步、Anekdote 与 Fehlvorstellung 闭环**。

请直接输出符合规范的 Markdown 内容。
```

---

## 五、 自动化门禁校验与合入检查清单

外部 AI 交付的文件合入仓库时，必须执行自动化三步质检：

1. **文件名合规检查**：
   - 路径必须为 `Lernreise/<Fach>-<Thema-Kebab-Case>-L1.md`；
   - **严禁变音符号（ä/ö/ü/ß）与空格**（必须用 ae/oe/ue/ss 代替）；
2. **知识库全量一致性检查**：
   ```powershell
   python scripts/vault-check.py
   ```
   输出必须为 `PASS`，`badnames=0`，`badglossar=0`。
3. **前端构建与测试门禁**：
   ```powershell
   cd App-EF-Lernvault
   npx vitest run
   npm run build
   ```
   必须 58 个测试文件全绿，0 TypeScript / 编译错误。
