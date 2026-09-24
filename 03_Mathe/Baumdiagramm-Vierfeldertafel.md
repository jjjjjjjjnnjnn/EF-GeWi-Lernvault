---
fach: Mathe
thema: "Baumdiagramm und Vierfeldertafel"
operatoren: [darstellen, berechnen, beschreiben, ermitteln, bestimmen, deuten, beurteilen]
klausurrelevant: true
datum: 2026-09-24
tags: [Q1, Mathe, Stochastik]
stufe: "Q1"
---

# Baumdiagramm ↔ Vierfeldertafel (树图⇄四格表：全概率与反向推断)

> **中文理解**：多阶段随机试验有两种标准表征——**树图（Baumdiagramm）**按阶段展开，适合**多步**；**四格表（Vierfeldertafel）**按两个特征交叉分类，适合**两步**。二者可以**互相译写** [已验证]。
> 树图的两条**路径法则（Pfadregeln）**：**沿一条路径相乘**（乘积法则）、**互斥路径相加**（求和法则）。
> 德国树图是**正向**的（由阶段推结果）。补上半步：当题目问「已知结果，反推它来自哪条路径」时，先用**全概率**把各路径概率乘积累加得结果概率，再用**比值**把概率分配回各路径——这就是**反向推断** [已验证]。
> 中国的贡献是把「全概率 + 反向推断」系统化；但它**就是 `Pfadregeln` 的直接推论**，无需新概念 [已验证]。
>
> **Klausur-Relevanz**：S 域 AFB II 高频情境（质量检验、故障溯源、调查统计）；末段常接结果解释 / 模型评判（AFB III）；数值设计为整除时免工具段也可用 [已验证]。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| Baumdiagramm | 树图 | tree diagram | 按阶段展开的树状图 | 正向、多步 [已验证] |
| Pfadregel (Produkt) | 路径乘积法则 | multiplication rule | 沿一条路径的概率 = 各段概率之积 | 树图上相乘 |
| Pfadregel (Summe) | 路径求和法则 | addition rule | 互斥路径的概率相加 | 树图下相加 |
| Vierfeldertafel | 四格表 | four-field table | 两个特征 × 两种取值的 $2\times2$ 表 | 含边际和 [已验证] |
| bedingte Wahrscheinlichkeit | 条件概率 | conditional probability | $P(A\mid B)=\dfrac{P(A\cap B)}{P(B)}$ | $P(B)>0$ |
| totale Wahrscheinlichkeit | 全概率 | total probability | $P(B)=\sum_i P(A_i)\,P(B\mid A_i)$ | = 路径求和 [已验证] |
| Rückwärts-Schluss | 反向推断 | reverse inference | 由结果反推来源路径 | 用比值分配 |
| Gegenwahrscheinlichkeit | 对立事件概率 | complementary probability | $P(\bar{A})=1-P(A)$ | 简化计算 |
| stochastische Unabhängigkeit | 随机独立 | independence | $P(A\cap B)=P(A)\cdot P(B)$ | 判定用 |

---

## 2. 知识结构 (Struktur)

### 2.1 树图：正向推结果

第一层是「特征 A」（$A$ / $\bar{A}$），第二层是「特征 B」（$B$ / $\bar{B}$），共四条路径：$A\cap B$、$A\cap\bar{B}$、$\bar{A}\cap B$、$\bar{A}\cap\bar{B}$。

- **沿路径相乘**：$P(A\cap B)=P(A)\cdot P(B\mid A)$
- **互斥路径相加**：$P(B)=P(A\cap B)+P(\bar{A}\cap B)$ ← 这就是**全概率**

> *Klausur-Satz*: Nach der ersten Pfadregel ist die Wahrscheinlichkeit eines Pfades das Produkt der Wahrscheinlichkeiten längs dieses Pfades; nach der zweiten Pfadregel ist die Wahrscheinlichkeit eines Ereignisses die Summe der Wahrscheinlichkeiten der zugehörigen (disjunkten) Pfade.

### 2.2 四格表：两步的表格表征

| | $B$ | $\bar{B}$ | Summe |
|---|---|---|---|
| $A$ | $P(A\cap B)$ | $P(A\cap\bar{B})$ | $P(A)$ |
| $\bar{A}$ | $P(\bar{A}\cap B)$ | $P(\bar{A}\cap\bar{B})$ | $P(\bar{A})$ |
| **Summe** | $P(B)$ | $P(\bar{B})$ | $1$ |

- **行和 / 列和**是边际概率
- **条件概率**从表里直接读：$P(B\mid A)=\dfrac{P(A\cap B)}{P(A)}$（**分母是该行的和**）

> ⚠️ **头号错误**：$P(A\mid B)$ 与 $P(B\mid A)$ **分子相同、分母不同**（一个除以行和、一个除以列和）——这是本项目预判的**头号辨别错** [据推断]。

> *Klausur-Satz*: In einer Vierfeldertafel erhält man bedingte Wahrscheinlichkeiten, indem man die gemeinsame Wahrscheinlichkeit durch die zugehörige Randwahrscheinlichkeit dividiert.

### 2.3 树图 ⇄ 四格表：什么时候用哪个

| 判据 | 用树图 | 用四格表 |
|---|---|---|
| 阶段数 | 多步（≥3） | 两步 |
| 提问方向 | 正向（由阶段推结果） | 正反皆可 |
| 已知条件 | 各阶段条件概率 | 交叉频数 / 联合概率 |
| 反向推断 | 可做但较繁 | **更直观** |

> **口诀**：**「多步用树、两步用表；反推先换表」**。遇到「正算容易反推难」时，先把树图信息搬进四格表 [已验证]。

> *Klausur-Satz*: Baumdiagramm und Vierfeldertafel sind zwei Darstellungen desselben Sachverhalts; ein Wechsel der Darstellung ist ein zulässiges und oft hilfreiches Vorgehen.

### 2.4 反向推断：两步走

1. **全概率**：$P(B)=P(A\cap B)+P(\bar{A}\cap B)$ —— 得「结果 $B$ 的总概率」
2. **比值分配**：$P(A\mid B)=\dfrac{P(A\cap B)}{P(B)}$ —— 把总概率按路径大小分配回来源

> ⚠️ **分母必须是全概率**（不是单条路径），否则结果必然偏大 [已验证]。

> *Klausur-Satz*: Um von einem eingetretenen Ergebnis auf seine Ursache zurückzuschließen, wird zunächst die Gesamtwahrscheinlichkeit des Ergebnisses (totale Wahrscheinlichkeit) bestimmt und anschließend der Anteil der betrachteten Ursache daran berechnet.

---

## 3. 解题方法 (Methoden)

### 3.1 方法 A：树图正算（三步）

1. **画树**：第一层特征 A、第二层特征 B，枝上标概率 —— *KLP 工具：`Baumdiagramm`*
2. **沿路径相乘**得每条路径概率 —— *KLP 工具：`Pfadregel (Produkt)`*
3. **求和**得目标事件概率 —— *KLP 工具：`Pfadregel (Summe)`*

> **判据 / 决策点**：题目给的是「各阶段的条件概率」（如「$A$ 中 60% 满足 $B$」）时用树图。**树图必须画在卷面上**（过程分）[据推断]。

### 3.2 方法 B：四格表法（两步题首选）

1. **画表**：填已知的联合/边际概率 —— *KLP 工具：`Vierfeldertafel`*
2. **补全**：用「和」关系填出空格（行和、列和、总和 $=1$）—— *KLP 工具：`Gegenwahrscheinlichkeit`*
3. **读条件概率**：分子取交叉格，分母取**对应的行和或列和** —— *KLP 工具：`bedingte Wahrscheinlichkeit`*

> **判据 / 决策点**：题目给的是「频数」或「联合概率」时用四格表；两步题几乎都能用四格表解得更快。

### 3.3 方法 C：反向推断（条件概率的反向）

1. **识别方向**：题目问的是 $P(\text{来源}\mid\text{结果})$，而给的是 $P(\text{结果}\mid\text{来源})$ —— *KLP 工具：`bedingte Wahrscheinlichkeit`*
2. **先算全概率** $P(\text{结果})$（路径求和）—— *KLP 工具：`Pfadregel (Summe)`*
3. **再算比值** $\dfrac{P(\text{来源}\cap\text{结果})}{P(\text{结果})}$ —— *KLP 工具：`bedingte Wahrscheinlichkeit`*
4. **回译现实**：用一句现实语言解释结果 —— *KLP 工具：`deuten`/`beurteilen`*

> **判据 / 决策点**：看到「已知…，问它是来自…的概率」就用方法 C；**先把树图信息转成四格表**可显著降低出错率。

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 全概率与「反向树图」（条件概率的系统化）

- **技法内容**：德国的树图是**正向**的。补上半步：当题目问「已知结果，反推它是哪条路径来的」时，先用**全概率公式**把各路径的概率乘积累加得到结果概率，再用**比值**把概率按比例分配回各路径。四格表与树图可互相译写——四格表适合两步、树图适合多步；遇到「正算容易反推难」时**先换表征**。
- **DE-Anschluss**：GK 已教 `mehrstufige Zufallsexperimente`、`Baumdiagramm`、`Vierfeldertafel`、`bedingte Wahrscheinlichkeiten`、`Pfadregeln` [已验证]。**全概率就是路径概率的求和**，是 `Pfadregeln` 的直接推论，无需新概念；反向推断可用四格表的比值表述，**不引入新术语** [已验证]。
- **合规性**：✅ 完全合规 —— 纯属既有工具的系统化编排；且「换一种表征再算」正好落在 KLP 点名的 13 条启发式策略之一 `Darstellungswechsel` 上 [已验证]。
- **Abitur 应用**：S 域 AFB II 高频情境（质量检验、故障溯源、调查统计）；末段常接 AFB III 的「结果解释 / 模型评判」；Aufgabenart I 亦可用（数值设计为整除）[已验证]。
- **来源**：`[CN-课标]` 条件概率、乘法公式、全概率公式（贝叶斯选学）· `[CN-教材]` 树图与表格互译 · `[CN-高考]` 全概率与条件概率综合

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | 2. Prüfungsteil 常规题；数值整除时也可作免工具小问 [据推断] |
| Operator | `darstellen` / `berechnen` / `ermitteln` / `deuten` / `beurteilen`（数学不按动词分 AFB）[已验证] |
| AFB | I–II（画图、算概率）为主，末段 AFB III（解释与评判）[据推断] |
| 建议分值 / 时长 | 情境题 8–15 BE / 约 12–18 min [据推断] |

### 5.2 训练题

**Aufgabe 1** `[原创]`（树图正算）
> In einer Fabrik werden Bauteile auf zwei Maschinen $M_1$ und $M_2$ produziert. $60\%$ stammen von $M_1$, $40\%$ von $M_2$. Von den Teilen aus $M_1$ sind $5\%$ defekt, von denen aus $M_2$ sind $10\%$ defekt.
> a) Zeichnen Sie ein Baumdiagramm.
> b) Berechnen Sie die Wahrscheinlichkeit, dass ein zufällig entnommenes Teil defekt ist.

**Aufgabe 2** `[原创]`（四格表 + 条件概率）
> Bei einer Umfrage unter $200$ Personen gaben $120$ an, Sport zu treiben. Von diesen nutzen $90$ ein Fahrrad; von den übrigen nutzen $30$ ein Fahrrad.
> a) Erstellen Sie eine Vierfeldertafel.
> b) Bestimmen Sie $P(\text{Fahrrad}\mid\text{Sport})$.
> c) Bestimmen Sie $P(\text{Sport}\mid\text{Fahrrad})$.

**Aufgabe 3** `[CN-改编]`（反向推断）
> Ein Test weist eine bestimmte Eigenschaft nach. $2\%$ aller Gegenstände besitzen die Eigenschaft. Besitzt ein Gegenstand die Eigenschaft, so zeigt der Test sie mit Wahrscheinlichkeit $0{,}95$ an; besitzt er sie nicht, so zeigt der Test fälschlich mit Wahrscheinlichkeit $0{,}05$ an.
> Ein Gegenstand wird positiv getestet. Bestimmen Sie die Wahrscheinlichkeit, dass er die Eigenschaft tatsächlich besitzt.

**Aufgabe 4** `[NRW-改编]`（模型评判，AFB III）
> In Aufgabe 3 zeigt der Test positiv. Eine Person behauptet: „Ein positiver Test bedeutet fast sicher, dass die Eigenschaft vorliegt.“
> Beurteilen Sie diese Aussage mit den Ergebnissen aus Aufgabe 3.

### 5.3 Musterlösung

**Aufgabe 1**
1. **a) Baum**: Erste Stufe $M_1$ ($0{,}6$) / $M_2$ ($0{,}4$); zweite Stufe jeweils „defekt“ ($0{,}05$ bzw. $0{,}10$) / „intakt“. ✓ 得分点：树图画在卷面、枝上标概率
2. **b) Pfad $M_1\cap D$**: $0{,}6\cdot0{,}05=0{,}03$ ✓ 得分点：沿路径相乘
3. **b) Pfad $M_2\cap D$**: $0{,}4\cdot0{,}10=0{,}04$ ✓
4. **b) Summe**: $P(D)=0{,}03+0{,}04=0{,}07$ ✓ 得分点：路径相加（全概率）
5. **Antwort**: Die Wahrscheinlichkeit, dass ein Teil defekt ist, beträgt $7\%$. ✓

**Aufgabe 2**
1. **a) Vierfeldertafel** (Sport / kein Sport × Fahrrad / kein Fahrrad):

| | Fahrrad | kein Fahrrad | Summe |
|---|---|---|---|
| Sport | $90$ | $30$ | $120$ |
| kein Sport | $30$ | $50$ | $80$ |
| Summe | $120$ | $80$ | $200$ |

✓ 得分点：行和列和全填对（$120-90=30$; $200-120=80$; $80-30=50$; $90+30=120$; $30+50=80$）
2. **b) $P(F\mid S)$**: Nenner ist die **Zeile** „Sport“: $\dfrac{90}{120}=0{,}75$ ✓ 得分点：分母取行和
3. **c) $P(S\mid F)$**: Nenner ist die **Spalte** „Fahrrad“: $\dfrac{90}{120}=0{,}75$ ✓ 得分点：分母取列和，与 b) 区分

**Aufgabe 3**
1. **Bezeichnungen**: $E$ = Eigenschaft vorhanden, $T$ = Test positiv. Gegeben: $P(E)=0{,}02$, $P(T\mid E)=0{,}95$, $P(T\mid\bar{E})=0{,}05$. ✓ 得分点：显式记事件与已知量
2. **Pfad $E\cap T$**: $P(E)\cdot P(T\mid E)=0{,}02\cdot0{,}95=0{,}019$ ✓
3. **Pfad $\bar{E}\cap T$**: $P(\bar{E})\cdot P(T\mid\bar{E})=0{,}98\cdot0{,}05=0{,}049$ ✓
4. **Totale Wahrscheinlichkeit**: $P(T)=0{,}019+0{,}049=0{,}068$ ✓ 得分点：分母必须是全概率
5. **Rückwärts**: $P(E\mid T)=\dfrac{P(E\cap T)}{P(T)}=\dfrac{0{,}019}{0{,}068}\approx0{,}279$ ✓ 得分点：比值分配
6. **Antwort**: Die Wahrscheinlichkeit beträgt ca. $27{,}9\%$. ✓

**Aufgabe 4**
1. **Kriterium**: Ein positiver Test bedeutet nur dann „fast sicher“ die Eigenschaft, wenn $P(E\mid T)$ nahe bei $1$ liegt. ✓ 得分点：给出评判标准
2. **Vergleich**: Aus Aufgabe 3 gilt $P(E\mid T)\approx0{,}279$, also nur etwa $28\%$. ✓
3. **Beurteilung**: Die Aussage ist **falsch**: Da die Eigenschaft insgesamt sehr selten ist ($2\%$), liefern die falsch-positiven Ergebnisse (hier $0{,}049$) den größten Anteil aller positiven Tests. Die Aussage verwechselt offenbar $P(T\mid E)$ mit $P(E\mid T)$. ✓ 得分点：指出混淆 + 用数据支撑（AFB III）

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | $P(A\mid B)$ 与 $P(B\mid A)$ **分子分母颠倒**（头号错误） | 四格表里：分母看**行/列**，先问「已知谁」 |
| 知识错 | 反向推断时分母用了**单条路径**而非全概率 | 方法 C 第 2 步先算 $P(\text{结果})$ |
| 知识错 | 把「检测阳性」直接等同于「患病/具备性质」（忽略基础率） | 显式比较全概率与单条路径的大小 |
| 表达错 | 树图不画、只写算式 → 过程分丢失 [据推断] | 树图/四格表**必须画在卷面** |
| 表达错 | 只给小数不给情境结论 | 末段写一句现实语言的 `Antwort` |

---

## 7. Vernetzung

- **上游**：`MA-S1-01` Urnenmodelle · `MA-S1-02` Baumdiagramm und Pfadregeln · `MA-S1-03` Vierfeldertafel · `MA-S1-04` Bedingte Wahrscheinlichkeiten（本节点 `MA-S1-05`）
- **下游**：`MA-S2-01` Erwartungswert · `MA-S3-01` Binomialverteilung · `MA-S4-01` Prognoseintervall（LK）
- **横向**：SoWi（抽样与调查数据的解释）；与 `Stochastik-Q1-Baumdiagramm-bis-Binomialverteilung.md` 直接衔接
- **术语卡**：`Baumdiagramm` / `Pfadregel` / `Vierfeldertafel` / `bedingte Wahrscheinlichkeit` / `totale Wahrscheinlichkeit` / `Rückwärts-Schluss`（建议由主线程补入 Q1-S 术语表）

---

> **来源标注说明**：`[已验证]` = 实际访问官方源确认 · `[据推断]` = 基于搜索摘要 · `[未获取到]` = 未找到，如实标注。
> **版权**：本笔记仅引用 NRW 官方公开题的结构与题型；训练题全部为原创或改编（CN 技法只取方法层，不搬高考原题），解析为原创。不搬运出版社教辅原文。情境设计已避开医学敏感表述。
