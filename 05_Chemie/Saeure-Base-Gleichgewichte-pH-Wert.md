---
fach: Chemie
thema: "Saeure-Base-Gleichgewichte und pH-Wert"
operatoren: [beschreiben, berechnen, begruenden, erlaeutern]
klausurrelevant: true
datum: 2026-09-24
tags: [EF, Chemie, Saeure-Base]
---

# Saeure-Base-Gleichgewichte und pH-Wert (酸碱平衡与 pH 值计算)

> **中文理解**：在北威州高中 EF 阶段化学中，酸碱反应的核心是**质子转移反应 (Protolyse / Protonenübergang)**。
> 掌握该主题需要掌握以下五大支柱：
> 1. **布朗斯特-劳里酸碱理论 (Brønsted-Lowry-Konzept)**：酸是质子供体 (Protonendonator)，碱是质子受体 (Protonenakzeptor)；
> 2. **共轭酸碱对 (Korrespondierende Säure-Base-Paare)**：任何酸失去质子后即转化为其共轭碱（如 $\text{HCl} \rightleftharpoons \text{Cl}^- + \text{H}^+$）；
> 3. **水自耦电离与离子积 (Autoprotolyse des Wassers & Ionenprodukt)**：水分子之间自发转移质子，$K_w = [H_3O^+] \cdot [OH^-] = 10^{-14}\,\text{mol}^2/\text{l}^2$（$25^\circ\text{C}$）；
> 4. **pH 值对数标度 (Logarithmische pH-Skala)**：$\text{pH} = -\lg[H_3O^+]$，$\text{pOH} = -\lg[OH^-]$，恒有 $\text{pH} + \text{pOH} = 14$；
> 5. **强酸与弱酸的区分与中和滴定 (Starke vs. Schwache Säuren & Titration)**：强酸几乎 $100\%$ 完全电离，弱酸建立动态化学平衡（酸常数 $K_s$ 与 $pK_s$）。

---

## 1. 核心化学原理与常数表 (Theoretische Grundlagen)

| 核心概念 | 德语学术名称 | 化学反应方程式 / 计算公式 | 核心特征与定义 |
|---|---|---|---|
| **质子转移 (Protolyse)** | *Protonenübertragungsreaktion* | $\text{HA} + \text{B} \rightleftharpoons \text{A}^- + \text{HB}^+$ | 酸失去质子转移给碱，形成动态平衡 |
| **水自耦电离** | *Autoprotolyse des Wassers* | $2\,\text{H}_2\text{O} \rightleftharpoons \text{H}_3\text{O}^+ + \text{OH}^-$ | 水分子既充当酸又充当碱（两性电解质 / Ampholyt） |
| **水离子积常数** | *Ionenprodukt des Wassers* | $K_w = c(\text{H}_3\text{O}^+) \cdot c(\text{OH}^-) = 10^{-14}\,\frac{\text{mol}^2}{\text{l}^2}$ | 常温下乘积恒定，决定中性溶液 $c = 10^{-7}\,\text{mol/l}$ |
| **pH 值定义** | *Negativer dekadischer Logarithmus* | $\text{pH} = -\lg\left(\frac{c(\text{H}_3\text{O}^+)}{\text{mol/l}}\right)$ | 负常用对数标度：浓度改变 10 倍，pH 改变 1 单位 |
| **强酸 pH 计算** | *Vollständige Dissoziation* | $\text{pH} = -\lg(c_0(\text{Säure}))$ | 强酸完全解离，水合氢离子浓度等于初始酸浓度 |
| **强碱 pH 计算** | *Vollständige Dissoziation* | $\text{pH} = 14 - \text{pOH} = 14 + \lg(c_0(\text{Base}))$ | 强碱完全电离释放氢氧根离子 |
| **中和反应** | *Neutralisation* | $\text{H}_3\text{O}^+ + \text{OH}^- \to 2\,\text{H}_2\text{O}$ | 酸与碱等物质的量反应生成水与盐 |

---

## 2. 算题演练：北威州标准考试题型 (Klausur-Musterfall)

### 任务情境 (Aufgabenstellung)
Im Schullabor steht eine wässrige Salzsäurelösung ($\text{HCl}$) der Ausgangskonzentration $c_0 = 0{,}005\,\text{mol/l}$. Weiterhin wird eine Natronlauge ($\text{NaOH}$) der Konzentration $c = 0{,}02\,\text{mol/l}$ vorbereitet.

#### 子任务 1 (Operator: berechnen & begruenden)
> *Berechnen Sie den pH-Wert der Salzsäurelösung und begründen Sie die gewählte Berechnungsformel anhand des Dissoziationsgrades.*

**推演步骤 (Lösungsschritte)**:
1. **化学解离方程式 (Reaktionsgleichung)**:
   $$\text{HCl} + \text{H}_2\text{O} \to \text{Cl}^- + \text{H}_3\text{O}^+$$
2. **原理解释 (Begründung)**:
   > Salzsäure ist eine sehr starke einprotonige Säure ($pK_s \approx -6$). Sie dissoziiert in verdünnter wässriger Lösung nahezu vollständig ($\alpha \approx 100\%$). Daher gilt:
   $$c(\text{H}_3\text{O}^+) = c_0(\text{HCl}) = 0{,}005\,\frac{\text{mol}}{\text{l}} = 5 \cdot 10^{-3}\,\frac{\text{mol}}{\text{l}}$$
3. **计算 pH 值 (Berechnung)**:
   $$\text{pH} = -\lg(5 \cdot 10^{-3}) = -(\lg(5) + \lg(10^{-3})) = -(0{,}70 - 3) = 2{,}30$$
4. **Klausur 答题规范句 (DE)**:
   > *Da Salzsäure eine sehr starke Säure ist, dissoziiert sie in wässriger Lösung vollständig. Bei einer Konzentration von $c_0 = 0{,}005\,\text{mol/l}$ beträgt die Konzentration der Oxoniumionen ebenfalls $0{,}005\,\text{mol/l}$. Der pH-Wert der Lösung liegt somit bei $\text{pH} = 2{,}30$.*

---

#### 子任务 2 (Operator: berechnen)
> *Berechnen Sie das Volumen der Natronlauge ($c = 0{,}02\,\text{mol/l}$), das zur vollständigen Neutralisation von $100\,\text{ml}$ der vorgelegten Salzsäurelösung ($c_0 = 0{,}005\,\text{mol/l}$) erforderlich ist.*

**推演步骤 (Lösungsschritte)**:
1. **化学计量比 (Stöchiometrie)**:
   $$\text{HCl} + \text{NaOH} \to \text{NaCl} + \text{H}_2\text{O}$$
   Am Äquivalenzpunkt gilt: $n(\text{H}_3\text{O}^+) = n(\text{OH}^-)$.
2. **物质的量平衡 (Stoffmengenansatz)**:
   $$c_1 \cdot V_1 = c_2 \cdot V_2$$
   $$V_2 = \frac{c_1 \cdot V_1}{c_2} = \frac{0{,}005\,\text{mol/l} \cdot 100\,\text{ml}}{0{,}02\,\text{mol/l}} = \frac{0{,}5}{0{,}02}\,\text{ml} = 25\,\text{ml}$$
3. **Klausur-Satz (DE)**:
   > *Am Äquivalenzpunkt entspricht die Stoffmenge der zugegebenen Hydroxidionen genau der Stoffmenge der vorliegenden Oxoniumionen. Es werden exakt $25\,\text{ml}$ der Natronlauge für die vollständige Neutralisation benötigt.*

---

## 3. 跨学科知识网络联系 (MINT-Vernetzung: LinguaGraph-Knoten)

- **数学关联 (Mathe Analysis)**：
  pH 值为对数函数 $\text{pH} = -\lg c$。若溶液稀释 10 倍，酸性减弱，pH 值上升 1 个单位；稀释 100 倍，pH 上升 2 个单位。
- **物理关联 (Physik Ladungstransport)**：
  在水溶液中，离子浓度越高，溶液的导电性（elektrische Leitfähigkeit $\sigma$）越强。滴定过程中当恰好完全中和时，若产物为难溶沉淀或弱电解质，导电性往往出现极小值（Konduktometrische Titration）。
- **生物关联 (Biologie Enzymatik)**：
  酶（Enzyme）作为生物催化剂，其空间三级结构对 pH 值极度敏感。仅在特定最适 pH（pH-Optimum，如胃蛋白酶 Pepsin 在 pH 2，胰蛋白酶 Trypsin 在 pH 8）下才能保持活性构象，这与蛋白质侧链基团的质子化/去质子化状态直接绑定。
