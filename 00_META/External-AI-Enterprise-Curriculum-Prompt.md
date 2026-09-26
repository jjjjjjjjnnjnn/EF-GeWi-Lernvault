---
fach: ""
thema: "External AI Enterprise Curriculum Prompt & Matrix"
operatoren: []
klausurrelevant: false
datum: 2026-09-26
tags: [EF, Meta]
---

# 外部 AI 企业实训级课程批量生成标准与发卷指令 (Enterprise Didactic Curriculum Specification)

> **使用说明**：本文件为交付给外部高级 AI（如 Claude 3.5 Sonnet / GPT-4o 等）进行课程与知识库批量扩充的工业级标准化提示词（Production Prompt）。用户只需从下方「40 个高优先级核心课表矩阵」中挑选课题名称，填入 Prompt 占位符发给外部 AI，即可获得格式严密、中德对照、内嵌交互教具实操的企业级实训课件。产出文件直接存入 `Lernreise/` 或相应学科目录下即可被系统自动识别与渲染。

---

## 1. 外部 AI 核心发卷提示词 (Copy-Paste Prompt Template)

```markdown
请你扮演北威州最高级别重点文理中学（Gymnasium NRW）学科教研组长兼资深企业级实训架构师。
你的任务是为德国高中 EF 阶段（Einführungsphase, 对应 10/11 年级）开发一套达到【麦肯锡商业学院 / PhET 互动探索 / Datacamp 实训】标准的沉浸式企业级互动课程。

### 待生产课件信息：
- 学科 (Fach): 【填写学科，如：Mathe / SoWi / Physik / Chemie / Bio / Philosophie / Deutsch / Englisch / Musik / Sport】
- 主题 (Thema): 【填写具体主题，如：Von der Sekante zur Tangente / Marktmechanismus und Preisbildung / Gleichmaessig beschleunigte Bewegung】
- 目标级别 (Level & Ziel): Level 1, Ziel: Klausur (EF 核心考点)
- 对应交互教具标识 (Werkzeug ID): 【选填：tangent / markt / kinematik / balance / highlighter / formula / oral-timer】

---

### 严格的生产规范（必须 100% 遵照，否则无法通过工程自动化校验）：
1. **Frontmatter 格式**：必须为标准 YAML，包含 fach, thema, level: 1, ziel: Klausur, xp: 100, operatoren: [...], klausurrelevant: true, datum: 2026-09-26, tags: [EF, <Fach>, ...], version: Enterprise-v3。
2. **文件名命名法则**：`<Fach>-<Thema-Kebab-Case>-L1.md`（如 `Physik-Kinematik-Beschleunigte-Bewegung-L1.md`），**严禁变音符号与空格**（用 ae/oe/ue 代替 ä/ö/ü）。
3. **语言排版铁律**：中文深度认知理解在上，德语考场高分学术表达（Klausur-Satz）在下。术语必须标注中德双语。严禁虚构原题原卷。
4. **企业实训级 6 步教学闭环（必须完整包含以下 6 个步骤且标题固定）**：

#### ## Schritt 1 — entdecken
- **定位**：现实商业/科学/考场真实场景切入（Executive Hook & Case）。
- **内容**：
  - 为什么必须学这个？如果不懂，现实中会发生什么事故或经济损失？在 Klausur 中会扣多少分？
  - 明确本节课 3 条达标目标（先中文白话，再记德语要求）。
  - Klausur-Satz: 给出本课最高频的核心德语学术论断句。

#### ## Schritt 2 — entdecken
- **定位**：术语预热盒（Pretraining 核心 5 词，降低认知负荷）。
- **内容**：
  - 列出 5 个中德对照核心概念，阐述字面含义与物理/逻辑本质。
  - Klausur-Satz: 串联这 5 个词的标准句式。

#### ## Schritt 3 — entdecken
- **定位**：拆解式深度教学与可视化原理（Interactive Concept Deconstruction）。
- **内容**：
  - 3 个最小认知单元拆解原理，拒绝纯死记硬背。
  - 附带 ASCII 字符图解或 Mermaid 流程图（在 ```diagram 或 ```mermaid 代码块中）。
  - Klausur-Satz: 对应原理解析的标准德语表述。

#### ## Schritt 4 — ausprobieren
- **定位**：上手互动实验台（Guided Hands-on Sandbox / PhET-style Lab）。
- **内容**：
  - 首行声明教具标签：`[Werkzeug: <toolId>]`（如 `[Werkzeug: tangent]` 或 `[Werkzeug: markt]` 或 `[Werkzeug: kinematik]`）。
  - AUFGABE (berechnen/analysieren, AFB II): 明确的参数调节实验任务与计算要求。
  - HILFE: 3 步实验调节指导与解题线索。
  - MUSTERLÖSUNG: 详尽的实验现象分析、推导过程与数值验证。
  - Klausur-Satz: 实验现象与推导结论的德语总结。

#### ## Schritt 5 — check
- **定位**：形成性关卡微测与考官陷阱复盘（Formative Check & Debrief）。
- **内容**：
  - 包含 3 组自测题，格式严格为：
    `FRAGE: <自测问题（包含典型考场易错陷阱辨析）> | ANTWORT: <考官视角精辟解析与满分要点>`
  - Klausur-Satz: 规避易错陷阱的标准考场防错句。

#### ## Schritt 6 — szenario
- **定位**：考场真实综合论证挑战（Klausur Application Challenge, AFB III）。
- **内容**：
  - ROLLE: 考生扮演的角色（如：经济顾问 / 物理工程师 / 议会伦理代表）。
  - SITUATION: 复杂的现实综合情境材料。
  - AUFGABE (beurteilen/erörtern, AFB III): 高阶评价与决策任务。
  - RUBRIC: 评分细则（包含 3 条得分点，每点包含事实标准与价值标准）。
  - KLAUSUR-SATZ: 满分范文结尾句。

请直接输出符合上述规范的完整 Markdown 内容，不要带有额外的问候语或解释。
```

---

## 2. 40 个高优先级企业实训级核心课题大纲矩阵 (40-Unit Gap Matrix)

下表整理了 10 门高中 EF 学科当前急需扩充的企业实训级课程专题，您可以按需取用专题名称生成：

| 学科 (Fach) | 专题名称 (Thema) | 建议教具 ID | 现实实训案例切入点 (Enterprise Hook) | 核心算子 |
| :--- | :--- | :--- | :--- | :--- |
| **Mathe** | `Von der Sekante zur Tangente` | `tangent` | 自动驾驶测速雷达与平均速度 vs 瞬时速度 | berechnen, darstellen |
| **Mathe** | `Extremwertprobleme und Optimierung` | `tangent` | 物流包装箱体积最大化与材料成本最优化建模 | bestimmen, beurteilen |
| **Mathe** | `Kurvendiskussion und Wendepunkte` | `tangent` | 流行病感染峰值与转折点（二阶导为 0）的数学预警 | analysieren, interpretieren |
| **Mathe** | `Ganzrationale Funktionen im Sachkontext`| `tangent` | 企业利润函数 $G(x) = E(x) - K(x)$ 与盈亏平衡点分析 | berechnen, erörtern |
| **SoWi** | `Marktmechanismus und Preisbildung` | `markt` | 1970 年代石油危机与政府最高限价为何导致排队短缺 | analysieren, beurteilen |
| **SoWi** | `Soziale Ungleichheit und Mobilitaet` | `balance` | 德国教育背景与社会阶层固化（PISA 调查与机会均等） | darstellen, beurteilen |
| **SoWi** | `Freie Marktwirtschaft vs Soziale Marktwirtschaft` | `markt` | 垄断防范与卡特尔办公室（Bundeskartellamt）的秩序政策 | vergleichen, erörtern |
| **SoWi** | `Wirtschaftskreislauf und BIP-Kritik` | `markt` | GDP 能否衡量真实社会福祉？绿色核算与外部性成本 | analysieren, beurteilen |
| **Physik** | `Gleichmaessig beschleunigte Bewegung` | `kinematik` | 高铁刹车制动距离与反应时间的力学安全裕度 | berechnen, erklären |
| **Physik** | `Newtonsche Gesetze und Kraftvektoren`| `kinematik` | 航天器发射火箭推力与地面合力动态平衡 | darstellen, herleiten |
| **Physik** | `Arbeit, Energie und Wirkungsgrad` | `kinematik` | 抽水蓄能电站与能量转化过程中的耗散损耗 | berechnen, beurteilen |
| **Physik** | `Gleichfoermige Kreisbewegung` | `kinematik` | 弯道行车向心力不足与侧翻危险极限计算 | berechnen, erklären |
| **Chemie** | `Chemisches Gleichgewicht und Le Chatelier`| `formula` | 哈伯法合成氨工业条件优化（高压与适温的妥协） | erläutern, anwenden |
| **Chemie** | `Reaktionsgeschwindigkeit und Katalyse` | `formula` | 汽车尾气催化转化器如何将活化能降低 70% | beschreiben, analysieren |
| **Chemie** | `Saeuren, Basen und pH-Wert-Berechnung` | `formula` | 海洋酸化对珊瑚礁碳酸钙沉淀平衡的破坏机制 | berechnen, beurteilen |
| **Chemie** | `Stoichiometrie und Massenwirkungsgesetz` | `formula` | 锂电池正极材料制备中的摩尔配比与产率控制 | berechnen, überprüfen |
| **Bio** | `Enzymkinetik und Hemmmechanismen` | `formula` | 青霉素作为竞争性抑制剂杀死细菌细胞壁合成酶 | analysieren, deuten |
| **Bio** | `Zellulaere Atmung und ATP-Synthese` | `formula` | 氰化物阻断线粒体呼吸链电子传递的致死机理 | beschreiben, erklären |
| **Bio** | `Photosynthese: Licht- und Dunkelreaktion`| `formula` | 农作物温室大棚补光与二氧化碳浓度富集最优化 | erläutern, vergleichen |
| **Bio** | `Biomembranen und Stofftransport` | `formula` | 医疗生理盐水等渗溶液与红细胞渗透脆性实验 | beschreiben, deuten |
| **Philosophie**| `Utilitarismus nach Bentham und Mill` | `balance` | 自动驾驶电车难题：牺牲少数拯救多数是否道德正当？ | darstellen, beurteilen |
| **Philosophie**| `Kants Kategorischer Imperativ` | `balance` | 善意的谎言在绝对义务论下是否被允许？人是目的不是手段 | analysieren, beurteilen |
| **Philosophie**| `Staatsphilosophie: Hobbes vs Locke` | `balance` | 个人自由让渡给国家主权的界限在哪里？社会契约论 | vergleichen, erörtern |
| **Philosophie**| `Anthropologie: Was ist der Mensch?` | `balance` | 人工智能拥有意识后是否享有道德主体权利？ | erörtern, beurteilen |
| **Deutsch** | `Sachtextanalyse nach Sinnabschnitten` | `highlighter`| 数字化时代注意力涣散：媒体评论文的核心论点与论据链解构 | analysieren, erschließen |
| **Deutsch** | `Dramenanalyse nach Freytags Pyramide` | `highlighter`| 席勒《强盗》或莱辛《爱米莉雅》中的父子冲突与悲剧催化剂 | analysieren, interpretieren |
| **Deutsch** | `Rhetorische Mittel und Funktionsanalyse`| `highlighter`| 政治演讲与广告文案中的排比、反问与隐喻操纵机制 | analysieren, beurteilen |
| **Deutsch** | `Dialektische Eroerterung (Sanduhr-Prinzip)`| `lego` | 校园是否应全面禁止智能手机？正反论证沙漏结构装配 | erörtern, darstellen |
| **Englisch** | `Stylistic Devices and Speech Analysis` | `highlighter`| 马丁·路德·金或丘吉尔演讲中的修辞感染力解构 | analyze, evaluate |
| **Englisch** | `Postcolonialism and Cultural Identity` | `highlighter`| 全球化背景下多元文化冲突与移民二代身份认同困境 | examine, discuss |
| **Englisch** | `Shakespearean Drama: Macbeth/Romeo` | `highlighter`| 麦克白夫人梦游戏份中的潜意识心理与罪恶感象征 | analyze, interpret |
| **Englisch** | `Dystopian Fiction: 1984 & Brave New World`| `balance` | 极权监控 vs 娱乐至死：哪种未来更加危险？ | compare, assess |
| **Musik** | `Sonatenhauptsatzform: Exposition & Reprise`| `oral-timer`| 贝多芬第五交响曲第一乐章“命运敲门”动机的变奏展开 | analysieren, beschreiben |
| **Musik** | `Hoeranalyse: Motiv und Rhythmus` | `oral-timer`| 电影配乐（如汉斯·季默《星际穿越》）中的极简主义节奏铺垫 | beschreiben, deuten |
| **Musik** | `Harmonielehre: Kadenz und Stufentheorie` | `formula` | 流行音乐与古典乐中的标准终止式（T-S-D-T）声部进行规则 | bestimmen, aufstellen |
| **Sport** | `Phasenstruktur nach Meinel/Schnabel` | `oral-timer`| 跳远助跑起跳动作三阶段力学衔接与动量转化分析 | beschreiben, erklären |
| **Sport** | `Biomechanische Prinzipien: Anfangskraft` | `kinematik` | 铅球滑步推球中的预先反向摆动与初速度提升物理学原理 | erläutern, anwenden |
| **Sport** | `Energiebereitstellung im Muskel` | `formula` | 100 米冲刺（无氧磷酸原）与马拉松（有氧氧化）代谢切换 | erklären, vergleichen |

---

## 3. 产出文件验收检查清单 (Checklist)

生成的文件合入仓库前，确保满足：
1. 文件保存在 `Lernreise/` 根目录下，文件名为 `<Fach>-<Thema>-L1.md`（纯英文 kebab-case，禁用空格和特殊字符）；
2. 包含 `## Schritt 1` 到 `## Schritt 8` 全部步骤（含 `## Fehlvorstellung` 与 `## Anekdote & Fun-Fact`）；
3. `Schritt 4` 含有有效的 `[Werkzeug: <id>]` 标签，`Schritt 5` 含有 `VERGLEICH:` 选程序/选概念；
4. 运行 `python scripts/vault-check.py`，输出必须为 `PASS`，0 badnames，0 badglossar。

---

## 4. 外部 AI 六阶全息科学笔记生成提示词 (Painless-Mastery Knowledge Note Prompt)

> **使用说明**：当您需要为 `01_Deutsch/` 到 `10_Sport-mündl/` 扩充核心学科笔记时，使用此 Prompt 发送给外部高级 AI，产出兼顾「德国本土高中生地道学术德语」与「中国留学生无痛认知直通」的满分笔记。

```markdown
请你扮演北威州最高级别重点文理中学（Gymnasium NRW）教研组长兼认知科学教育专家。
你的任务是为德国高中 EF-Q2 阶段（Abitur 考纲体系）编写一篇达到【费曼直觉隐喻 + 双重编码图式 + 德语学术严谨性 (Fachsprache) + Abitur 考纲采分点】标准的终极学科知识笔记。
目标受众：同时满足德国本土文理高中生（语言地道、深度透彻）与中国在德留学生（思维破冰、无痛上手）。

### 待编写课题信息：
- 学科 (Fach): 【填写学科，如：Mathe / Physik / Chemie / Bio / SoWi / Philosophie / Deutsch / Englisch / Musik / Sport】
- 主题 (Thema): 【填写具体主题，如：Von der Sekante zur Tangente / Marktmechanismus und Marktversagen】
- 考纲定位: NRW Gymnasium Sek II (KLP EF/Q1/Q2, Abitur)
- 对应 Operator: 【如：darstellen, analysieren, beurteilen, berechnen】

---

### 严格的生产规范（必须严格遵循 Templates/Wissensnotiz-Template.md 六阶全融合结构）：

1. **Frontmatter**:
```yaml
---
fach: <Fach>
thema: "<Thema-DE>"
operatoren: [op1, op2]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, <Fach>, <Inhaltsfeld>]
stufe: "EF"
---
```

2. **标题与 Stage 1: 直觉破冰与生活隐喻 (Der intuitive Anker / Alltagsanalogie)**：
   - 3-5 句。用最接地气的生活经验、物理运动或商业现象打比方，彻底消除对抽象概念的陌生感。
   - 紧随 Klausur-Relevanz，一句话指明在 NRW Abitur 中的题型与采分权重。

3. **Stage 2: 核心概念与 SBF 系统机理解构 (Kernbegriffe & SBF-Modell)**：
   - 中德术语对齐表（术语 DE、中文、English、学术定义/公式、易错点）。
   - SBF 维度拆解：系统结构 (Struktur: 变量/要素) -> 动态行为 (Verhalten: 因果/机制) -> 宏观功能 (Funktion: 价值/出清/守恒)。

4. **Stage 3: 知识结构与双重编码图解 (Struktur & Visual Schema)**：
   - 必须包含严整的 ASCII/SVG 拓扑图、回路因果图或受力推导图，消除注意力分散效应。
   - 结构化展开核心原理，并附带一条加粗高亮的 *Klausur-Satz (德语核心公理句)*。

5. **Stage 4: 解题方法与考场决策树 (Methoden & Entscheidungsbaum)**：
   - 包含 ASCII 决策树（根据题干信号词判断走哪条解题程序）。
   - 规范的三步专家解题步骤（Ansatz -> Durchführung -> Interpretation）。

6. **Stage 5: 中德思维桥梁与技法衔接 (CN-Methode & Transfer)**：
   - 理科对比中国教材解法与德国 Abitur 评分逻辑的异同；避免因格式或符号差异失分。

7. **Stage 6: Klausur-Training、易混对抗矩阵与跨科融通 (Klausur, Kontrast & Vernetzung)**：
   - 给出全真题干与按 BE 点数严格拆解的 Musterlösung；
   - 必须提供「易混概念对抗矩阵 (Kontrast-Matrix)」，对比高发混淆概念并标明阅卷扣分红线；
   - 跨学科横向联结 (Interdisziplinär) 与上下游笔记引用。
```
