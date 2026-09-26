---
fach: ""
thema: "Aussen-AI-Aufgabenpakete"
operatoren: [darstellen, analysieren, beurteilen]
klausurrelevant: false
datum: 2026-09-26
tags: [EF, Meta, Klausur, Content]
---

# 外部 AI 高精度教学内容与全真试卷征集任务包 (Master AI Briefs)

> **适用场景**：用户直接全选复制本文件中的对应任务包，发送给外部高级大语言模型（如 Claude 3.5 Sonnet / GPT-4o / Gemini 1.5 Pro），要求其直接输出标准 Markdown 并存入对应目录。  
> **内容准则**：原创改编、契合北威州考纲（KLP NRW EF）、拒绝版权侵权。

---

## 目录
1. [📦 任务包 1：十科 NRW 标准全真模拟试卷库 (Klausur-Vollpakete)](#-任务包-1十科-nrw-标准全真模拟试卷库-klausur-vollpakete)
2. [📦 任务包 2：文科权威一手德语分析材料与政治漫画库 (Primärtexte & Karikaturen)](#-任务包-2文科权威一手德语分析材料与政治漫画库-primärtexte--karikaturen)
3. [📦 任务包 3：理科全套变式强化题与中国解题技法 (CN-Methode STEM Masterpack)](#-任务包-3理科全套变式强化题与中国解题技法-cn-methode-stem-masterpack)
4. [📦 任务包 4：四大学科口语考试全真问答链 (Mündliche Abiturprüfung)](#-任务包-4四大学科口语考试全真问答链-mündliche-abiturprüfung)

---

## 📦 任务包 1：十科 NRW 标准全真模拟试卷库 (Klausur-Vollpakete)

> **存放路径**：生成后保存至 `<Fach>/Klausur-Training/Klausur-Sim-<Thema-Kebab-Case>.md`（如 `08_SoWi/Klausur-Training/Klausur-Sim-Soziale-Ungleichheit.md`）

### 复制提示词发送给外部 AI：

```text
你是德国北威州高级阶段（Gymnasiale Oberstufe NRW, EF/Q1）各科资深命题专家与高考阅卷委员会主席（Fachleiter & Fachvorsitzender）。
请为我们的开源学习库编写一套高质量、完全原创、贴合 NRW 官方标准的【全真模拟试卷包】。

【目标学科】：[请指定：如 08_SoWi / 07_Philosophie / 03_Mathe / 01_Deutsch / 04_Physik / 05_Chemie / 06_Bio / 02_Englisch]
【测试主题】：[请指定具体考纲主题，如：Soziale Ungleichheit und soziale Mobilität in Deutschland]
【考试时长】：90 分钟（EF 真实 Klausur 时长）

【严格结构规范】：
输出必须为一个完整的 Markdown 文本，包含以下四个不可分割的模块：

1. YAML Frontmatter：
---
fach: [学科代码，如 SoWi]
thema: "[试卷标题]"
art: Klausur-Simulation
dauer_minuten: 90
punkte_gesamt: 100
operatoren: [darstellen, analysieren, beurteilen]
datum: 2026-09-26
tags: [EF, [Fach], Klausur]
---

2. 材料文本 (Textgrundlage / Material)：
- 提供一段 450~650 词的德语真实感一手政论文/学术评论/案例数据（纯原创编制，不得抄袭现成试题，注明虚拟权威来源，如 "Aus einem Leitartikel der Süddeutschen Zeitung, adaptiert"）；
- 关键生词或专业概念在文后附德中词汇速览（Glossar）。

3. 试题部分 (Aufgabenstellung)：严格按 NRW 三大要求域（Anforderungsbereiche）设题：
- Teilaufgabe 1 (AFB I - 概述/提取，占 20 BE)：必须使用官方算子（如：Fassen Sie die Kernaussagen des Autors zusammen...）；
- Teilaufgabe 2 (AFB II - 分析/论证/映射，占 40 BE)：必须结合学科核心理论模型进行结构化剖析（如结合 Hradil 社会分层理论、Gehlen 人类学模型或 Preismechanismus 供求图）；
- Teilaufgabe 3 (AFB III - 评价/评判/权衡，占 40 BE)：必须使用 beurteilen 或 bewerten，要求辩证分析（Pro/Contra）并给出有充分理据的独立结论。

4. 评分细则与采分点 (Erwartungshorizont mit BE)：
- 将 100 BE 划分为：80 BE 知识内容（Inhaltsleistung）+ 20 BE 德语学术语言表达（Darstellungsleistung）；
- 对每道小题列出具体点对点的采分细则（如：“- Der Prüfling arbeitet heraus, dass... [4 BE]”）；
- 附带北威州 15 分换算表（Notenpunkte 15-0 与对应分数阈值）。

请直接输出符合上述规范的 Markdown 全文。
```

---

## 📦 任务包 2：文科权威一手德语分析材料与政治漫画库 (Primärtexte & Karikaturen)

> **存放路径**：生成后保存至 `<Fach>/Texte-Analyse/<Thema-Kebab-Case>-Dossier.md`（如 `08_SoWi/Texte-Analyse/Mindestlohn-Material-Dossier.md`）

### 复制提示词发送给外部 AI：

```text
你是德国中学文科文献学专家与跨文化教学设计大师。
德国高中人文社科（Deutsch, SoWi, Philosophie, Englisch）高分的核心在于对复杂一手文本（Primärtext）和讽刺漫画（Karikatur）的敏锐解构。
请为我们编写一份【深度德语材料解构档案 (Material-Dossier)】。

【目标学科】：[08_SoWi 或 07_Philosophie 或 01_Deutsch]
【材料主题】：[如：SoWi-Mindestlohn & Tarifautonomie 或 Philo-Utilitarismus vs. Kantische Ethik]

【严格结构规范】：
1. 材料正文 (Textgrundlage)：
   - 纯正高级学术德语（约 400~500 词），包含丰富的复杂从句结构、连接词（Konnektoren）与专业论证术语。
2. 逐段行间导读 (Abschnitts-Analyse)：
   - 对正文每个段落进行三行提炼：【核心论点 (These)】、【论证手法 (Argumentationsgang/Rhetorik)】、【中文透彻理解】。
3. 高分德语模板金句 (Klausur-Satzbausteine)：
   - 提供 5 句可在真实考试中直接套用的原汁原味德语学术句型（带中译），示范如何准确引用该文本中的观点。
4. 针对该主题的经典政治漫画解构示范 (Karikatur-Analyse nach NRW-Standard)：
   - 漫画画面图景文字描述 (Beschreibung: Vordergrund, Hintergrund, Symbole)；
   - 隐喻与现实映射 (Deutung: Was steht wofür?)；
   - 核心批判意图 (Kernaussage & Intention des Karikaturisten)。

请输出为规范的 Markdown 格式。
```

---

## 📦 任务包 3：理科全套变式强化题与中国解题技法 (CN-Methode STEM Masterpack)

> **存放路径**：生成后保存至 `<Fach>/Klausur-Training/<Thema-Kebab-Case>-CN-Methode.md`（如 `03_Mathe/Klausur-Training/Kurvendiskussion-CN-Methode.md`）

### 复制提示词发送给外部 AI：

```text
你是一位精通中德两国高中理科教学的高级导师。
德国 Gymnasium EF 理科（Mathe, Physik, Chemie, Bio）具有“题干情景长、计算步骤简单、但概念严谨度高”的特点；而中国理科教育在“快速计算、图像解析、极端状态分析（CN-Methode）”上有极强的提分效率。
请为我们编写一份【中德双轨理科应试突破案】。

【目标学科】：[03_Mathe 或 04_Physik 或 05_Chemie 或 06_Bio]
【核心知识点】：[如：Mathe-Kurvendiskussion & Extremwertprobleme 或 Physik-Schiefer Wurf & Energieerhaltung]

【严格结构规范】：
1. 德语核心考题 (Deutscher Aufgabentyp)：
   - 编写一道标准的德语情景建模大题（带完整物理量、单位与三问：AFB I 计算、AFB II 图像与几何解释、AFB III 实际物理意义评判）。
2. 标准德国官方解题路径 (Deutscher Standard-Lösungsweg)：
   - 按照 NRW 要求的标准规范步骤求解（含公式、单位代入与德语完整答句 Antwortsatz）。
3. 🇨🇳 独家 CN-Methode 降维打击技法 (Chinese Shortcut & Conceptual Insight)：
   - 用中文阐明中国高中理科针对此类问题的极速洞察技巧（例如：导数微积分的几何斜率速判、利用能量守恒巧避繁复运动学积分、摩尔守恒法十字交叉配平）；
   - 对比中德两国在解题格式上的核心差异与扣分陷阱（避免中国式跳步被德国考官判定为缺少 Begründung）。
4. 变式强化训练 3 题 (Variationsaufgaben)：
   - 题 1（基础同构题）、题 2（情景转换题）、题 3（考纲压轴综合题），均附完整德语解析与数值答案。

请输出为规范的 Markdown 格式。
```

---

## 📦 任务包 4：四大学科口语考试全真问答链 (Mündliche Abiturprüfung)

> **存放路径**：生成后保存至 `<Fach>/Klausur-Training/Muendliche-Pruefung-<Thema-Kebab-Case>.md`（如 `09_Musik-mündl/Klausur-Training/Muendliche-Pruefung-Beethoven.md`）

### 复制提示词发送给外部 AI：

```text
你是德国北威州高级阶段口语考试主考官（Vorsitzender des Prüfungsausschusses）。
针对德国高中第 4 考试科目及音乐、体育等口试学科，许多中国背景学生由于德语临场应答不熟练而丢失大量分数。
请为我们编写一份【20 分钟口试全真模拟与应答策略手册】。

【目标学科】：[09_Musik-mündl 或 10_Sport-mündl 或 02_Englisch 或 07_Philosophie]
【口试专题】：[如：Musik-Sonatenhauptsatzform Beethoven 或 Sport-Biomechanische Bewegungsanalyse Meinel]

【严格结构规范】：
1. 口试准备材料 (Vorbereitungsmaterial - 15-20 Min Vorbereitungszeit)：
   - 一张结构图表或简短文段（如跳远动作分相图、贝多芬第五交响曲前八小节乐谱片段）；
2. 第一阶段：自主口头陈述 (Teil 1: Schülervortrag - 10 Min)：
   - 给出考生标准陈述稿（Muster-Vortrag，约 400 词），划分为“开篇破题”、“分项剖析”、“总结提炼”三部曲，并标注语速与重音标记；
3. 第二阶段：考官追问全真推演 (Teil 2: Prüfungsgespräch - 10 Min)：
   - 编写 5 组真实的“考官深挖追问 (Prüferfrage)”与“高分应对策略 (Musterantwort)”；
   - 专门包含 1 组“考官故意设置的反例陷阱题”以及如何礼貌反驳的德语话术（Rhetorische Einwände）。
4. 口试防卡壳急救词库 (Notfall-Satzbausteine)：
   - 8 句地道德语即兴填充词（用于思考拖延时间、澄清考官问题、自我修正发言）。

请输出为规范的 Markdown 格式。
```
