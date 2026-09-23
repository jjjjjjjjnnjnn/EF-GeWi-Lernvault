---
fach: Chemie
thema: "CN Tricks Verfahren"
operatoren: []
klausurrelevant: true
datum: 2026-09-23
tags: [EF, Chemie, CN]
---

# CN-Chemie-Tricks（中国化学六法 + 德语映射）

> 中文一句话理解：中国化学把解题压缩成六句口诀（守恒/差量/极值/官能团/电化学/氧化数），德国 Klausur 考的是同一逻辑的不同问法；本篇每法配一道自编 mini 例题，全部原创，不碰 Grundlagen-Training 的 8 道旧题。
>
> Lesson v3（9步制）导航：1 ZIELE → 2 PRETRAINING → 3 BEISPIEL → 4 中文讲一遍 → 5 争议/辨析 → 6 Klausur-Sätze → 7 VERGLEICH → 8 FEHLVORSTELLUNG + check/ANTWORT → 9 TAKEAWAY + REFLEXION。对齐 00_META/Lernmethoden-Evidenz.md §6–§9。

## ZIELE: 本课学完能… (3条)

- [ ] 能说出六法的中文名并各用一句话讲清原理（Operator：nennen / beschreiben）
- [ ] 能把每法映射到德语 Klausur-问法并选出正确公式（Operator：zuordnen / begruenden）
- [ ] 能用口诀独立解一道同类 mini 题并评价答案量级（Operator：berechnen / auswerten）

## PRETRAINING: 术语盒 (Mayer pre-training，先词后课)

| Deutsch | 中文 | English | 一句话释义 |
|---|---|---|---|
| die Erhaltung (Masse/Ladung/Elektronen) | 守恒（质量/电荷/电子） | conservation | 反应前后原子、电荷、电子总数不变 |
| die Differenzmethode | 差量法 | difference method | 用固体/质量差反推摩尔数 |
| die Extremwertannahme | 极值假设 | extreme-value assumption | 假设全是 A 或全是 B，夹出范围 |
| die funktionelle Gruppe | 官能团 | functional group | 决定有机物性质的原子团 |
| die Elektrochemie (Anode/Kathode) | 电化学（阳极/阴极） | electrochemistry | 失电子氧化在阳极，得电子还原在阴极 |
| die Oxidationszahl | 氧化数 | oxidation number | 电子得失记账，见 Formelhandbuch |

## BEISPIEL: 正确例题 (worked example，先例后题)

- 例题（题干，自拟，守恒法）：2,4 g Mg reagieren vollstaendig mit HCl. Stelle die Gleichung auf und berechne n(H2).
- 正确解法（分步，每步注规则）：
  - Schritt 1（规则：先配平）：$$Mg + 2HCl \rightarrow MgCl_2 + H_2$$（Mg 1:1, H 2:2, Cl 2:2）。
  - Schritt 2（规则：$$n = m/M$$）：$$n(Mg) = 2{,}4/24 = 0{,}10\,\mathrm{mol}$$。
  - Schritt 3（规则：系数比 = 摩尔比，守恒）：$$n(H_2) = n(Mg) = 0{,}10\,\mathrm{mol}$$。
- 新题（同类，独立做，见下方 check）：把 Mg 换成 6,5 g Zn（M = 65 g/mol），同式 $$Zn + 2HCl \rightarrow ZnCl_2 + H_2$$ 自算。

## 1. 中文讲一遍 (Feynman)

### Trick 1 守恒法 shouheng-fa（Erhaltung)

- 原理：原子守恒 + 电荷守恒 + 电子守恒；配平方程式就是守恒的书写。Mini 例题见 BEISPIEL（Mg/HCl，自编）。德语映射：`begruende mit Massenerhaltung` / `stelle die Gleichung auf`。EN: atoms, charge and electrons are conserved.

### Trick 2 差量法 chaliang-fa（Differenzmethode)

- 原理：固体质量差对应固定摩尔关系，用"差值"代替"绝对值"。Mini 例题（自编）：CuO + H2 还原，固体从 8,0 g CuO 变 6,4 g Cu，差 1,6 g 为失去的 O；$$n(O) = 1{,}6/16 = 0{,}10\,\mathrm{mol}$$，故 $$n(Cu) = 0{,}10\,\mathrm{mol}$$。德语映射：`werte die Massendifferenz aus`。EN: mass difference gives moles directly.

### Trick 3 极值假设 jizhi-jiashe（Extremwertannahme)

- 原理：混合物不好算，就假设"全是 A"或"全是 B"，真值必在两极值之间。Mini 例题（自编）：Na/K 混合物 5,0 g 全与水反应放 H2，若全为 Na 得 H2 约 0,109 mol，若全为 K 得约 0,064 mol，则真实 $$n(H_2)$$ 在 0,064–0,109 mol 之间。德语映射：`schaetze den Bereich ab` / `grenze ein`。EN: bracket the true value between two extremes.

### Trick 4 官能团谱 guannengtuan-pu（Funktionelle Gruppen)

- 原理：一眼认官能团就知道反应类型：R-OH 醇（取代/消去/氧化），C=C 双键（加成），-COOH 羧基（酸性/酯化）。Mini 例题（自编）：未知物 X 使溴水褪色且能与 Na 放 H2 → 含 C=C（加成褪色）+ R-OH（与 Na 反应），EF 只要求认出两类。德语映射：`ordne die Stoffklasse zu` / `beschreibe die typische Reaktion`。EN: functional group determines reaction type.

### Trick 5 电化学口诀 dianhuaxue-koujue（Elektrochemie-Merksatz)

- 原理：中文口诀"阳氧阴还" = 阳极氧化（失电子）、阴极还原（得电子）；德语桥：AnOde = Oxidation（o 对 o），Kathode = Reduktion。Mini 例题（自编）：Zn/Cu 原电池，Zn 极质量减小 → Zn 失电子为阳极（负极），$$Zn \rightarrow Zn^{2+} + 2e^-$$；Cu 极增重为阴极。德语映射：`ordne Anode/Kathode zu und begruende den Elektronenfluss`。EN: anode oxidation, cathode reduction (AnOx, CathRed).

### Trick 6 氧化数-Schnelltest yanghuashu（Oxidationszahl-Test)

- 原理：三秒判 redox——标氧化数，升高失电子被氧化（还原剂），降低得电子被还原（氧化剂）。Mini 例题（自编）：$$Zn + Cu^{2+} \rightarrow Zn^{2+} + Cu$$：Zn 0→+2（升失氧，做还原剂），Cu +2→0（降得还，做氧化剂）。德语映射：`bestimme die Oxidationszahlen und benenne Oxidations-/Reduktionsmittel`。EN: OILRIG, oxidant vs reductant.

Deutsch unten: Jedes CN-Verfahren endet in einer deutschen Klausurhandlung: aufstellen, ausgleichen, berechnen, zuordnen, begruenden, auswerten.

## 2. 争议/辨析 (MINT: Fehlvorstellungen kurz)

### Pro / 常见正确理解

- 口诀是检索器不是证明器：先用口诀定位公式，再用德语写出论证链。
- 六法全是守恒的变体：差量是质量守恒，电化学是电子守恒，极值是守恒的边界。

### Contra / 典型错概念

- 以为背下口诀就不用配平（错：口诀第一步永远是配平方程式）。
- 以为极值假设给出精确值（错：只给范围，精确值要另算）。

### Stellungnahme-Satz (beurteilen/eroertern)

- Die CN-Tricks sind zulaessige Heuristiken, weil sie auf Erhaltungssaetzen beruhen; klausurtauglich werden sie erst mit Gleichung, Einheiten und Begruendung.

## 3. 德语 Klausur-Sätze (用Operatoren)

- `Die Gleichung wird aufgestellt und nur mit Koeffizienten ausgeglichen (Massenerhaltung).`
- `Aus der Massendifferenz folgt die Stoffmenge des umgesetzten Anteils.`
- `Der wahre Wert liegt zwischen den beiden Extremfaellen und wird so abgeschaetzt.`
- `Die Stoffklasse folgt aus der funktionellen Gruppe und bestimmt die typische Reaktion.`
- `An der Anode laeuft die Oxidation, an der Kathode die Reduktion (Elektronenfluss wird begruendet).`
- `Die Oxidationszahl steigt beim Reduktionsmittel und faellt beim Oxidationsmittel.`

English transfer:

- `The mass difference yields the moles converted.`
- `Oxidation occurs at the anode, reduction at the cathode.`

## 4. Fachbegriffe (进Anki)

| Deutsch | Chinesisch | Beispielsatz |
|---|---|---|
| die Erhaltung | 守恒 | Die Erhaltung der Masse gilt fuer jede Reaktion. |
| die Massendifferenz | 质量差 | Die Massendifferenz zeigt die umgesetzte Menge. |
| die Anode / die Kathode | 阳极 / 阴极 | An der Anode laeuft die Oxidation ab. |

## 5. Quelle / Aufgabe

- 6 法原理为通用中学方法论转述 + 全部 mini 例题自编（Mg/HCl、CuO/H2、Na/K-Mischung、X mit C=C+OH、Zn/Cu-Zelle、Zn/Cu2+），未复制 Grundlagen-Training（C/CH4/Al/C3H8/NaOH/Zucker）与 IQB 原题。
- 映射问法对标 Klausur-Training/Chemie-Operatoren-Check.md（Operatoren/观察解释分离）与 KLP Chemie 2022（`05_Chemie/Lehrplan.md`）。
- Freie Quellen nur verlinkt in `05_Chemie/Ressourcen.md`（LEIFI/Serlo/pep）。

## 6. Lernreise

- `Lernreise/Chemie-CN-Tricks-L1.md`（待建，本篇为课程源候选）

## 7. Fehlerlog

- [ ] 阳极阴极写反 → 回 Trick 5 念三遍 AnOde-Oxidation；氧化剂还原剂说反 → 回 Trick 6 查升降。

## VERGLEICH: 对比/辨别实验 (interleaving + discrimination)

- A题（氧化剂是谁）：问"谁得电子"→ 看氧化数降低者（判据：降得还）。
- B题（阳极是谁）：问"电子从哪流出"→ 失电子极（判据：阳氧）。
- 二选程序：“这题用哪个？因为问得失电子归属所以选 A 氧化数法，因为问电极位置所以选 B 电化学口诀。”
- 一句话区别（A vs B）：A 给物质贴标签（氧化剂/还原剂），B 给地点贴标签（阳极/阴极）。

## FEHLVORSTELLUNG: 常见误解 + 纠偏

- 误解1：差量法不用配平 → 为什么错：差值与摩尔的比例来自系数比 → 正确：先配平再列差量比。
- 误解2：原电池中阳极一定是正极 → 为什么错：原电池阳极失电子为负极，电解池才反过来 → 正确：记反应（阳氧）不记正负，EF 只考原电池情形先看电子流向。

## check / ANTWORT (TAP：题目格式 ≈ Klausur 格式)

- Aufgabe (Klausur-format, mit Operator)：Begruende (Operator begruenden): In $$Zn + Cu^{2+} \rightarrow Zn^{2+} + Cu$$ benenne Anode/Kathode (als galvanische Zelle gedacht) sowie Oxidations-/Reduktionsmittel mit Oxidationszahlen.
- Antwort (合书先写)：Zn: 0→+2，失电子，阳极，还原剂；Cu2+: +2→0，得电子，阴极，氧化剂；电子 Zn→Cu。
- KR（对/错）：待自判。
- Korrektur + 错因归类（辨别错 / 知识错 / 表达错）：正负极与阴阳极混→辨别错；氧化数标错→知识错；没写电子流向→表达错。

## TAKEAWAY: 1盒总结

> 六法一句：恒差极团电氧——守恒打底、差量抄近、极值夹逼、官能定性、电化定向、氧化数记账；Klausur 句：`Jeder Trick endet in Gleichung, Einheit und Begruendung.`

## REFLEXION: 2问 (一过程 + 一元认知)

1. 过程（assisted自解释）：这道题关键一步用了哪个规则？因为氧化数升降直接给出得失电子，所以先标数再贴标签。
2. 元认知：哪里最卡/最易混？因为氧化剂与被氧化长得像，所以下次先写"升失氧还（剂）"再落笔。
