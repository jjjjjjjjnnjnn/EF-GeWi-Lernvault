---
fach: Mathe
thema: "Mathe Operatoren & Bewertungseinheiten (BE) Check"
operatoren: [berechnen, bestimmen, skizzieren, interpretieren, beweisen, beurteilen]
klausurrelevant: true
datum: 2026-10-06
tags: [EF, Mathe, Klausur, BE]
---

# Mathe Operatoren & Bewertungseinheiten (BE) Check（数学算子与步进式采分点总纲）

> **中文一句话核心**：数学卷不给同情分，只看步进式采分点 (Bewertungseinheiten, BE)！算题先写公式模型，代入必须明写计算过程与单位，图形必须标坐标轴与极值，解释与判定必须写带情境单位的完整结论句。

---

## 1. NRW 数学卷步进式采分点结构 (Das 4-Schritte BE-Raster)

在 NRW 高中会考与 EF 统考 (ZKE) 中，每道小题的满分（通常 3–8 BE）按严格的四阶步进式采分模型切分：

| 采分阶 | 步骤名称 (Schritt) | 占比 (BE-Anteil) | 采分硬性要求与标准表述 | 典型失分陷阱 (Abzug) |
|---|---|---|---|---|
| **BE 1** | **Ansatz & Modellwahl** (列式与模型声明) | ca. 25% | 显式写出基础公式或数学定理，如：$f'(x_0) = 0$ (notwendige Bed.), $t(x) = f'(x_0)(x-x_0)+f(x_0)$。 | 直接在计算器按出数字未写判据公式 $\to$ 扣全部 Ansatz-BE。 |
| **BE 2** | **Algebraische Durchführung** (代数推演与代入) | ca. 25% | 写出代入已知数值的具体方程或导函数表达式，清晰呈现降次、因式分解或方程化简。 | 过程跳步过大导致阅卷老师无法追溯运算逻辑。 |
| **BE 3** | **Rechnerische Exaktheit** (准确值与有效位) | ca. 25% | 得出精确解（如分数 $\frac{3}{4}$、根式 $\sqrt{2}$）或题干要求的小数位（NRW 惯例保留 2–3 位）。 | 提前四舍五入导致最终累积误差超出容差范围。 |
| **BE 4** | **Sachbezogene Antwort & Einheit** (情境解释与单位) | ca. 25% | 将数值还原至物理/几何现实（例如：“Der maximale Zufluss beträgt $45{,}2\,\text{m}^3/\text{h}$ nach $3{,}5$ Stunden.”）。 | 仅写数字 $45{,}2$ 缺少单位或未回答实际问题 $\to$ 扣 1 BE。 |

---

## 2. 官方高频 Operatoren 答题规范对照表

| Operator | 认知层级 | 考场动作与规范要求 (Erwartungshorizont) | 标准答题示范句 (Muster-Formulierung) |
|---|---|---|---|
| **berechnen** | AFB I/II | **纯代数推演**：必须完整写出计算过程，严禁仅写 WTR/CAS 结果！ | `Ansatz: f'(x) = 0. Notwendige Bedingung: 3x² - 6x = 0 <=> 3x(x - 2) = 0. Daraus folgt x₁ = 0, x₂ = 2.` |
| **bestimmen / ermitteln** | AFB I/II | **结合图形/工具求解**：可借助图形计算器或已知图表，但必须清晰声明判据与路径。 | `Aus dem Graphen der Ableitung f' lässt sich der Vorzeichenwechsel von + nach - an der Stelle x = 2 ablesen; folglich liegt ein lokales Maximum vor.` |
| **skizzieren** | AFB I | **徒手规范草图**：必须使用铅笔/直尺标明坐标轴名称 ($x, y$)、比例刻度、关键点（截距、极值、拐点）。 | `Achsen beschriften, charakteristische Punkte (Nullstellen, Hoch-/Tiefpunkte) maßstäblich eintragen und den Kurvenverlauf knickfrei verbinden.` |
| **interpretieren** | AFB II/III | **背景还原**：必须将数学符号（如 $f(t), f'(t), \int$）用现实情境中的具体物理量与时间点完整叙述。 | `Die Steigung f'(3) = 12 bedeutet im Sachzusammenhang, dass die Pflanze zum Zeitpunkt t = 3 Wochen mit einer momentanen Wachstumsrate von 12 cm pro Woche wächst.` |
| **begründen / nachweisen** | AFB II/III | **逻辑定理援引**：通过数学定理（如中间值定理、符号改变准则 VZW）进行严密逻辑推演。 | `Da f auf [0; 5] stetig ist und f(0) = -2 < 0 sowie f(5) = 4 > 0 gilt, existiert nach dem Zwischenwertsatz mindestens eine Nullstelle im Intervall.` |
| **beurteilen** | AFB III | **批判性裁决**：依据数学边界和现实约束（如材料负荷、成本边界）进行优缺点权衡与最终定夺。 | `Unter Berücksichtigung der technischen Toleranz erweist sich das vorgeschlagene Modell als ungeeignet, da die maximale Randsteigung von 18 % die Sicherheitsnorm übersteigt.` |

---

## 3. NRW 评卷标志与扣分潜规则 (Korrekturzeichen & Fallstricke)

- **`f` (falsch / fachlicher Fehler)**: 选错数学公式或逻辑错误（如把极值充分条件写成 $f''(x) = 0$）。
- **`F` (Folgefehler)**: **对中国学生的重大保护规则**！只要前一步计算失误但后续算法逻辑完全正确，后续步骤仍然获得全额后续 BE (volle Folgepunkte)！
- **`E` (Einheitenfehler)**: 遗漏物理/几何单位，整道题最多扣 1 BE。
- **`R / r` (Rechenfehler)**: 纯算术错误，扣除该步计算分，保留后续推导分。
- **`G` (Genauigkeit)**: 未按要求取保留位数，或提前舍入导致终值漂移。

---

## 4. 满分答卷自查清单 (Checkliste vor Abgabe)

- [ ] **Modell deklariert?**（是否写明了所用的导数、方程或几何定理名称？）
- [ ] **Bedingungen explizit?**（极值题是否同时写了必要条件 $f'(x)=0$ 与充分条件 $f''(x) \neq 0$ / VZW？）
- [ ] **Einheiten vorhanden?**（所有物理量与结果是否都附带了正确单位，如 $\text{m}, \text{s}, \text{kg}, \text{EUR}$？）
- [ ] **Antwortsatz formuliert?**（应用大题最后一句是否针对题目的现实问题给出了完整的肯定/否定陈述？）
