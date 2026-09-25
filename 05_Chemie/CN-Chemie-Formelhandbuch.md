---
fach: Chemie
thema: "CN Formelhandbuch"
operatoren: []
klausurrelevant: true
datum: 2026-09-23
tags: [EF, Chemie, CN]
---

# CN-Chemie-Formelhandbuch (中德英核心公式对照)

> 中文一句话理解：中国化学把定量计算压缩成六张公式卡，德国 Klausur 要的是同一公式 + 单位 + 数量级评价；本手册只做对照桥，不重复 Grundlagen-Training 的原子结构与配平练习。
>
> Lesson v3（9步制）导航：1 ZIELE → 2 PRETRAINING → 3 BEISPIEL → 4 中文讲一遍 → 5 争议/辨析 → 6 Klausur-Sätze → 7 VERGLEICH → 8 FEHLVORSTELLUNG + check/ANTWORT → 9 TAKEAWAY + REFLEXION。对齐 00_META/Lernmethoden-Evidenz.md §6–§9。

## ZIELE: 本课学完能… (3条)

- [ ] 能用六组公式在质量/浓度/气体/pH/氧化还原/平衡之间换算并带单位（Operator：berechnen）
- [ ] 能把中文公式名（摩尔/浓度/气体/pH/氧化还原/平衡）译成德语 Klausur-Begriff（Operator：nennen / beschreiben）
- [ ] 能给每个计算加数量级检查并用德语评价合理性（Operator：auswerten）

## PRETRAINING: 术语盒 (Mayer pre-training，先词后课)

| Deutsch | 中文 | English | 一句话释义 |
|---|---|---|---|
| die Stoffmenge n (mol) | 物质的量 n / 摩尔 | amount of substance | 计数单位，1 mol = 6,022 x 10^23 个粒子 |
| die Konzentration c (mol/L) | 浓度 c | concentration | 单位体积溶液里的摩尔数 |
| das Gasgesetz | 气体定律 | gas law | pV = nRT，压强体积温度摩尔四量互求 |
| der pH-Wert | pH值 | pH value | 酸碱标尺，pH = -lg[H+] |
| die Oxidationszahl | 氧化数 | oxidation number | 电子得失的记账符号，升失氧、降得还 |
| das Massenwirkungsgesetz (MWG) | 平衡常数/质量作用定律 | law of mass action | Kc 表达式，判断平衡位置 |

## BEISPIEL: 正确例题 (worked example，先例后题)

- 例题（题干，自拟）：0,40 mol Zucker werden in 0,80 L Wasser geloest. Berechne c.
- 正确解法（分步，每步注规则）：
  - Schritt 1（规则：先写公式 $$c = n/V$$）：$$c = n/V$$。
  - Schritt 2（规则：代入带单位）：$$c = 0{,}40\,\mathrm{mol} / 0{,}80\,\mathrm{L} = 0{,}50\,\mathrm{mol/L}$$。
  - Schritt 3（规则：数量级检查）：0,5 mol/L 是普通糖水量级，合理（对比 Grundlagen-Training D2 的 2,0 mol/L 浓糖浆，本题更稀）。
- 新题（同类，独立做，见下方 check）：把数字换成 0,30 mol in 0,60 L，自算。

## 1. 中文讲一遍 (Feynman)

### 1.1 物质的量核心枢纽换算网 (Stoffmenge-Drehkreuz-Netzwerk)
- 核心枢纽：所有宏观与微观定量计算以 $$n$$ (mol) 为绝对中心桥墩，严禁两端非 $n$ 量跨步硬算。
- **四支路桥墩表 (Vier-Pfeiler-System)**：
  1. 质量支路 (Masse $$m$$)：$$n = \frac{m}{M} \iff m = n \cdot M$$（$$M$$ 单位 $$\mathrm{g/mol}$$）。
  2. 粒子数支路 (Teilchenzahl $$N$$)：$$n = \frac{N}{N_A} \iff N = n \cdot N_A$$（$$N_A = 6{,}022 \times 10^{23}\,\mathrm{mol^{-1}}$$）。
  3. 气体体积支路 (Gasvolumen $$V$$)：$$n = \frac{V}{V_m} \iff V = n \cdot V_m$$（标况 $$V_m = 22{,}4\,\mathrm{L/mol}$$；非标况走 $$pV = nRT$$）。
  4. 溶液浓度支路 (Konzentration $$c$$)：$$n = c \cdot V \iff c = \frac{n}{V}$$（$$V$$ 单位必须换为 $$\mathrm{L}$$）。
- **两步走万能法则 (Zwei-Schritt-Verfahren)**：
  - 第一步（归集枢纽）：$$\text{Ausgangsgroesse} \xrightarrow{\text{Pfeiler}} n_1$$；
  - 第二步（化学计量与目标发散）：$$n_1 \xrightarrow{\text{Stoechiometrie}} n_2 \xrightarrow{\text{Pfeiler}} \text{Zielgroesse}$$。

### 1.2 酸碱电离与双标校准 ($$K_S/pK_S$$ 与 $$K_a/pK_a$$)
- 概念校准：德国考纲统称 Säurekonstante $$K_S$$ 与 $$pK_S = -\lg K_S$$；国际与英语教材称 $$K_a$$ 与 $$pK_a$$。两者符号等价：$$K_S \equiv K_a$$，$$K_B \equiv K_b$$。
- 强酸强碱（vollstaendige Protolyse）：$$pH = -\lg c_0(\text{HA})$$，$$pOH = -\lg c_0(\text{B})$$，常温下 $$pH + pOH = 14$$。
- 弱酸部分电离（Ostwald 稀释近似）：$$c(\mathrm{H_3O^+}) \approx \sqrt{K_S \cdot c_0(\mathrm{HA})}$$，即 $$pH = \frac{1}{2}(pK_S - \lg c_0(\mathrm{HA}))$$。
- 缓冲体系（Henderson-Hasselbalch）：$$pH = pK_S + \lg \frac{c(\mathrm{A^-})}{c(\mathrm{HA})}$$。

### 1.3 氧化还原与平衡计算 (Redox & MWG)
- 氧化还原电子守恒：$$\sum n(e^-_{\text{abgegeben}}) = \sum n(e^-_{\text{aufgenommen}})$$。
- 质量作用定律 (MWG) 与三段式 (ICE-Tabelle)：
  - 对 $$a\mathrm{A} + b\mathrm{B} \rightleftharpoons c\mathrm{C} + d\mathrm{D}$$，列 **I**nitial (起始), **C**hange (变化量 $$\Delta c = \nu \cdot x$$), **E**quilibrium (平衡量 $$c_{eq} = c_0 \pm \nu x$$)。
  - 代入 $$K_c = \frac{[\mathrm{C}]^c [\mathrm{D}]^d}{[\mathrm{A}]^a [\mathrm{B}]^b}$$ 解出 $$x$$。纯固体与纯水作为溶剂不写入 $$K_c$$ 表达式。

Deutsch unten: Jede Rechnung beginnt mit der Formel, traegt Einheiten durch alle Schritte und endet mit einer Groessenordnungspruefung.

## 2. 争议/辨析 (MINT填Fehlvorstellungen)

### Pro / 常见正确理解

- 公式卡先写出再代入，单位全程携带，德国给分点就在单位与检验。
- 中英德三语只记关键词：摩尔=mol=mole，浓度=c=concentration，平衡=Kc=equilibrium。

### Contra / 典型错概念

- 把 $$c$$（mol/L）与 $$m$$（g）直接相乘，量纲错误。
- 把纯固体写入 Kc，以为所有物质都进表达式。

### Stellungnahme-Satz (beurteilen/eroertern)

- Die CN-Formelkarte ist korrekt, aber erst mit Einheiten und Groessenordnungspruefung wird sie klausurtauglich.

## 3. 德语 Klausur-Sätze (用Operatoren)

- `Mit dem Ansatz n = m/M folgt die Stoffmenge einschliesslich Einheit.`
- `Mit c = n/V folgt die Konzentration; die Groessenordnung wird durch Vergleich mit Alltagswerten geprueft.`
- `Aus pV = nRT folgt die fehlende Groesse bei konsistenten SI-Einheiten.`
- `Der pH-Wert folgt aus pH = -lg[H+]; eine Einheit aendert die Konzentration um den Faktor 10.`
- `Die Oxidationszahlen aendern sich spiegelbildlich, weil die abgegebene Elektronenzahl gleich der aufgenommenen ist.`
- `Die Lage des Gleichgewichts folgt aus Kc; reine Feststoffe werden nicht in den Ausdruck aufgenommen.`

English transfer sentences:

- `The amount of substance follows from n = m/M, including units.`
- `The equilibrium position follows from Kc; pure solids are omitted from the expression.`

## 4. Fachbegriffe (进Anki)

| Deutsch | Chinesisch | Beispielsatz |
|---|---|---|
| die Konzentration, c | 浓度 | Die Konzentration c folgt aus n geteilt durch V. |
| das Gasgesetz | 气体定律 | Das Gasgesetz verbindet Druck, Volumen und Temperatur. |
| der pH-Wert | pH值 | Der pH-Wert aendert sich logarithmisch mit der Konzentration. |
| die Oxidationszahl | 氧化数 | Die Oxidationszahl zeigt den Elektronenzustand an. |

## 5. Quelle / Aufgabe

- 全部公式转述自 `05_Chemie/Formel-Spickzettel.md`（Alkane/Gleichgewicht）与 `05_Chemie/Chemie-EF-Grundlagen-Training.md` §4（Mol三换算），本篇新增气体/pH/Redox 三组对照，未复制原题。
- 常数（NA, Vm, Kw）取课堂公式文件精神；考试以学校发的官方版本为准（见 Klausur-Training/Chemie-Operatoren-Check.md §3）。
- Freie Quellen: LEIFIchemie Grundlagen, Serlo-Chemie MWG-Seite, pep.com.cn 必修一（只链 Ressourcen.md，不抄题）。

## 6. Lernreise

- [Lernreise/Chemie-CN-Formeln-L1.md](../Lernreise/Chemie-CN-Formeln-L1.md)（已建，本篇为课程源候选）

## 7. Fehlerlog

- [ ] Kc 写进固体 → 回 §1 平衡组重读"纯固体不写入"。

## VERGLEICH: 对比/辨别实验 (interleaving + discrimination)

- A题（浓度 c）：问"溶液多浓"→ 用 $$c = n/V$$，判据：给了体积 L。
- B题（质量分数 w）：问"溶液多稠（百分比）"→ 用 $$w = m_{\mathrm{Stoff}}/m_{\mathrm{Loesung}}$$，判据：给了总质量 g。
- 二选程序（先选再做）：“这题用哪个？因为题干给体积 L 所以选 A，因为给总质量 g 所以选 B。”
- 一句话区别（A vs B）：c 按体积计（mol/L），w 按质量计（无单位/百分比）。

## FEHLVORSTELLUNG: 常见误解 + 纠偏

- 误解1：pH 3 比 pH 5 只酸一点 → 纠偏：对数标尺，差 2 个单位 = 100 倍（正确：$$[H^+] = 10^{-pH}$$）。
- 误解2：$$V_m = 22{,}4\,\mathrm{L/mol}$$ 任何条件都可用 → 纠偏：只在标准状况（0 °C, 101,3 kPa），其他条件用 $$pV = nRT$$。

## check / ANTWORT (TAP：题目格式 ≈ Klausur 格式)

- Aufgabe (Klausur-format, mit Operator)：Berechne (Operator berechnen): $$[H^+] = 10^{-4}\,\mathrm{mol/L}$$. (a) pH-Wert, (b) $$[OH^-]$$ bei 25 °C. Nenne zusaetzlich die CN-Namen der verwendeten Groessen.
- Antwort (合书先写)：(a) $$pH = 4$$; (b) $$[OH^-] = 10^{-10}\,\mathrm{mol/L}$$; CN: 氢离子浓度/摩尔浓度，pH值，离子积 Kw。
- KR（对/错）：待自判。
- Korrektur + 错因归类（辨别错 / 知识错 / 表达错）：指数符号错→知识错；Kw 写成 10^-7→知识错；单位丢了→表达错。

## TAKEAWAY: 1盒总结

> 六卡口诀：摩浓气pH氧衡，写式带单位、算完验量级；Klausur 句：`Die Formel traegt Einheiten, das Ergebnis traegt eine Pruefung.`

## REFLEXION: 2问 (一过程 + 一元认知)

1. 过程（assisted自解释）：这道题关键一步用了哪个规则？因为 pH 是对数定义，所以先把指数直接读成 pH 再用 Kw 求 OH-。
2. 元认知：哪里最卡/最易混？因为 c 与 w 都谈"浓"，所以下次先看单位（L 选 c，g/% 选 w）。
