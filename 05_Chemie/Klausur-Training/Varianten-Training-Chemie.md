---
fach: Chemie
thema: "Saeure-Base-Titration von Essig"
operatoren: [aufstellen, berechnen, begruenden, ueberpruefen, bewerten]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Chemie, Titration, MWG, pH-Wert]
---

# Varianten-Training Chemie — Säure-Base-Titration von Essig

> 中文一句话：以「Essig-Essenz 稀释 → 分取 → 用 NaOH 滴定」为主线，把 **Stoffmenge（n = c·V）· Massenwirkungsgesetz（K_S / K_B）· pH-Wert · Indikatorwahl · Verdünnung** 串成一条计算链；中国技法（三段式/守恒/十字交叉）负责**快速定位**，德语答卷负责**过程可见**。

---

## 1. Standard-Modellierungsaufgabe（标准德语建模题）

### Material M1 — Etikett und Titrationsprotokoll

> ⚠️ 原创仿写 Modelltext（仿 Produktetikett + Schülerlabor-Protokoll 风格撰写，非真实出版物摘录；数据与人名均为虚构）

**Etikett „Essig-Essenz ‚Kräuterkrone‘, 25 % Säure"**

Zutaten: Wasser, Essigsäure ($\mathrm{CH_3COOH}$, $M = 60{,}05\,\mathrm{g/mol}$).
Säuregehalt: 25,0 % (m/m) · Dichte $\rho = 1{,}05\,\mathrm{g/mL}$ · Inhalt 250 mL.

**Titrationsprotokoll (Schülerlabor, 25 °C)**

- 10,00 mL der Essig-Essenz werden mit einer Vollpipette in einen **250,0-mL-Maßkolben** pipettiert und mit destilliertem Wasser bis zur Marke aufgefüllt. Diese Lösung wird im Folgenden **Verdünnungslösung V** genannt.
- Aus **V** werden **25,00 mL** in einen Titrierkolben pipettiert und mit 2–3 Tropfen Phenolphthalein versetzt.
- Titriert wird mit Natronlauge der Stoffmengenkonzentration $c(\mathrm{NaOH}) = 0{,}2000\,\mathrm{mol/L}$.
- Drei Titrationen ergeben: 21,90 mL · 21,84 mL · 21,84 mL.

**Hinweise:** $K_S(\mathrm{CH_3COOH}) = 1{,}8 \cdot 10^{-5}\,\mathrm{mol/L}$ · $K_W = 1{,}0 \cdot 10^{-14}\,\mathrm{mol^2/L^2}$ (25 °C) · Umschlagsbereich Phenolphthalein: pH 8,2–10,0 · Methylorange: pH 3,1–4,4.

### Aufgaben

**a)** (4 BE) Stellen Sie die Umsetzung von Essigsäure mit Hydroxidionen als Protolysereaktion auf. Begründen Sie mithilfe des Massenwirkungsgesetzes, warum diese Reaktion trotz der geringen Säurestärke der Essigsäure praktisch vollständig abläuft.

**b)** (7 BE) Ermitteln Sie aus dem Titrationsergebnis den Massenanteil $w(\mathrm{CH_3COOH})$ in der Essig-Essenz und vergleichen Sie das Ergebnis mit der Deklaration (25,0 %).

**c)** (6 BE) Berechnen Sie den pH-Wert der Verdünnungslösung **V** mithilfe des Massenwirkungsgesetzes. Überprüfen Sie die verwendete Näherung.

**d)** (6 BE) Berechnen Sie den pH-Wert am Äquivalenzpunkt und begründen Sie daraus die Wahl des Indikators. Gehen Sie kurz darauf ein, warum Methylorange ungeeignet ist.

**e)** (6 BE) Bewerten Sie das Verfahren: Benennen Sie zwei Fehlerquellen, die das Ergebnis **systematisch** verfälschen, und beurteilen Sie, ob die Deklaration von 25,0 % als bestätigt gelten kann.

**Gesamt: 29 BE**

### 中文题干理解（3–4 句）

取 10,00 mL 密度 1,05 g/mL 的醋精，定容至 250,0 mL；取出 25,00 mL 用 0,2000 mol/L NaOH 滴定，三次读数为 21,90/21,84/21,84 mL。试题要你先写出质子转移方程式并用 $K = K_S/K_W$ 说明反应为何仍定量进行，再反推原样品的**质量分数**、算**稀释液的 pH**、算**等当点 pH** 并据此选指示剂，最后做 AFB III 的**方法评价**。核心陷阱是：等当点不是 pH 7（弱酸强碱盐使 pH ≈ 8,9），所以 Methylorange 会严重提前变色。

### 考点映射

| Teilaufgabe | Inhaltsfeld (KLP) | AFB | Operator |
|---|---|---|---|
| a | Q-1 *Säuren, Basen und analytische Verfahren*（上游锚点：EF IF 2 *Massenwirkungsgesetz*） | II | aufstellen / begründen |
| b | Q-1（Stoffmenge, Massenanteil, Verdünnung） | II | berechnen / vergleichen |
| c | Q-1（$K_S$, pH-Wert, Näherungsprüfung） | II | berechnen / überprüfen |
| d | Q-1（Äquivalenzpunkt, Indikator; LK: Titrationskurve） | II | berechnen / begründen |
| e | Q-1（Fehlerbetrachtung, Verfahrenskritik） | III | bewerten |

---

## 2. DE-Lösungsstandard（德国官方标准解题步骤）

### Modellannahmen（先写，否则丢分）

- Es gilt $T = 25\,^\circ\mathrm{C}$, daher $K_W = 1{,}0 \cdot 10^{-14}\,\mathrm{mol^2/L^2}$.
- Die Aktivitäten werden durch die Stoffmengenkonzentrationen ersetzt ($a \approx c/c^\circ$).
- Volumina sind additiv; die Volumenkontraktion beim Verdünnen wird vernachlässigt.
- Die Natronlauge ist eine Maßlösung mit exakt $c = 0{,}2000\,\mathrm{mol/L}$.

> *Klausur-Satz*: *Für die folgenden Berechnungen wird angenommen, dass die Temperatur 25 °C beträgt, die Aktivitäten durch Konzentrationen ersetzt werden dürfen und die Volumina additiv sind.*

### a) Protolysereaktion und Vollständigkeit (4 BE)

**1. Was ist zu tun:** Reaktionsgleichung aufstellen und die Gleichgewichtslage über die Konstante $K$ bewerten.

**2. Rechengang:**

$$\mathrm{CH_3COOH + OH^- \rightleftharpoons CH_3COO^- + H_2O}$$

Zur Konstante: Aus $K_S = \dfrac{c(\mathrm{CH_3COO^-}) \cdot c(\mathrm{H_3O^+})}{c(\mathrm{CH_3COOH})}$ und $K_W = c(\mathrm{H_3O^+}) \cdot c(\mathrm{OH^-})$ folgt durch Division:

$$K = \frac{c(\mathrm{CH_3COO^-})}{c(\mathrm{CH_3COOH}) \cdot c(\mathrm{OH^-})} = \frac{K_S}{K_W} = \frac{1{,}8 \cdot 10^{-5}\,\mathrm{mol/L}}{1{,}0 \cdot 10^{-14}\,\mathrm{mol^2/L^2}} = 1{,}8 \cdot 10^{9}\,\mathrm{L/mol}$$

**3. Antwortsatz:**

> *Die Essigsäure reagiert mit Hydroxidionen zu Acetat und Wasser; da die Gleichgewichtskonstante mit $K = 1{,}8 \cdot 10^{9}\,\mathrm{L/mol}$ sehr groß ist, liegt das Gleichgewicht praktisch vollständig auf der Seite der Produkte, sodass die Umsetzung für die Titration als quantitativ angesehen werden darf.*

### b) Massenanteil aus der Titration (7 BE)

**1. Was ist zu tun:** Mittelwert bilden → Stoffmenge NaOH → Stoffmenge Essigsäure → Konzentration der Verdünnungslösung → Gesamtstoffmenge im Maßkolben → Masse → Massenanteil.

**2. Rechengang:**

- Mittelwert (nur Werte mit einer Spannweite $\leq 0{,}1\,\mathrm{mL}$ werden verwendet; hier 21,90 − 21,84 = 0,06 mL ✓):

$$\bar{V}(\mathrm{NaOH}) = \frac{21{,}90 + 21{,}84 + 21{,}84}{3}\,\mathrm{mL} = 21{,}86\,\mathrm{mL} = 0{,}02186\,\mathrm{L}$$

- Stoffmenge NaOH (Zwischenergebnisse ungerundet weiterverwenden):

$$n(\mathrm{NaOH}) = c \cdot V = 0{,}2000\,\mathrm{mol/L} \cdot 0{,}02186\,\mathrm{L} = 4{,}372 \cdot 10^{-3}\,\mathrm{mol}$$

- Stoffmengenverhältnis 1 : 1 (vgl. a):

$$n(\mathrm{CH_3COOH})_{\text{Aliquot}} = 4{,}372 \cdot 10^{-3}\,\mathrm{mol}$$

- Stoffmengenkonzentration der Verdünnungslösung **V**:

$$c(\mathbf{V}) = \frac{4{,}372 \cdot 10^{-3}\,\mathrm{mol}}{0{,}02500\,\mathrm{L}} = 0{,}1749\,\mathrm{mol/L}$$

- Gesamtstoffmenge im 250,0-mL-Maßkolben (Verdünnung):

$$n_{\text{gesamt}} = 0{,}17488\,\mathrm{mol/L} \cdot 0{,}2500\,\mathrm{L} = 4{,}372 \cdot 10^{-2}\,\mathrm{mol}$$

- Masse der Essigsäure und Masse der Probe:

$$m(\mathrm{CH_3COOH}) = n \cdot M = 4{,}372 \cdot 10^{-2}\,\mathrm{mol} \cdot 60{,}05\,\mathrm{g/mol} = 2{,}625\,\mathrm{g}$$
$$m(\text{Probe}) = \rho \cdot V = 1{,}05\,\mathrm{g/mL} \cdot 10{,}00\,\mathrm{mL} = 10{,}50\,\mathrm{g}$$

- Massenanteil:

$$w(\mathrm{CH_3COOH}) = \frac{2{,}625\,\mathrm{g}}{10{,}50\,\mathrm{g}} = 0{,}2500 = 25{,}0\,\%$$

**3. Antwortsatz:**

> *Der Massenanteil der Essigsäure in der Essig-Essenz beträgt $w = 25{,}0\,\%$ (m/m); die Deklaration von 25,0 % wird damit innerhalb der Messgenauigkeit bestätigt.*

**4. Plausibilitätskontrolle:** Aus $n_{\text{gesamt}}$ folgt für die unverdünnte Essenz $c = 4{,}372\,\mathrm{mol/L}$. Ein handelsüblicher Speiseessig mit 5 % Säure und $\rho \approx 1{,}01\,\mathrm{g/mL}$ hat $c \approx 0{,}84\,\mathrm{mol/L}$; das Verhältnis $4{,}372 : 0{,}84 \approx 5{,}2$ entspricht dem erwarteten Faktor 25 % : 5 % = 5. Die Größenordnung ist damit plausibel.

### c) pH-Wert der Verdünnungslösung (6 BE)

**1. Was ist zu tun:** Dreisatztabelle aufstellen, MWG ansetzen, Näherung lösen und überprüfen, pH-Wert berechnen.

**2. Rechengang** — Protolysegleichgewicht $\mathrm{CH_3COOH + H_2O \rightleftharpoons CH_3COO^- + H_3O^+}$:

| Zeile | $\mathrm{CH_3COOH}$ | $\mathrm{H_3O^+}$ | $\mathrm{CH_3COO^-}$ |
|---|---|---|---|
| **I** Ausgang | $0{,}1749\,\mathrm{mol/L}$ | $\approx 0$ | $0$ |
| **C** Änderung | $-x$ | $+x$ | $+x$ |
| **E** Gleichgewicht | $0{,}1749 - x$ | $x$ | $x$ |

$$K_S = \frac{x \cdot x}{0{,}1749\,\mathrm{mol/L} - x} = 1{,}8 \cdot 10^{-5}\,\mathrm{mol/L}$$

Näherung $x \ll 0{,}1749\,\mathrm{mol/L}$:

$$x^2 = 1{,}8 \cdot 10^{-5} \cdot 0{,}1749 \cdot (\mathrm{mol/L})^2 = 3{,}148 \cdot 10^{-6}\,(\mathrm{mol/L})^2$$
$$x = c(\mathrm{H_3O^+}) = 1{,}774 \cdot 10^{-3}\,\mathrm{mol/L}$$

Näherungsprüfung:

$$\frac{x}{c_0} = \frac{1{,}774 \cdot 10^{-3}}{0{,}1749} = 1{,}0 \cdot 10^{-2} = 1{,}0\,\% < 5\,\% \quad \checkmark$$

pH-Wert:

$$\mathrm{pH} = -\lg\!\left(\frac{c(\mathrm{H_3O^+})}{\mathrm{mol/L}}\right) = -\lg(1{,}774 \cdot 10^{-3}) = 3 - 0{,}249 = 2{,}75$$

Rückprobe (Ergebnis zurück in das MWG einsetzen):

$$\frac{(1{,}774 \cdot 10^{-3})^2}{0{,}1749 - 0{,}001774}\,\mathrm{mol/L} = 1{,}82 \cdot 10^{-5}\,\mathrm{mol/L} \approx K_S \quad \checkmark$$

**3. Antwortsatz:**

> *Die Verdünnungslösung hat einen pH-Wert von 2,75; die Näherung ist zulässig, da der Dissoziationsgrad mit 1,0 % unter der 5-%-Grenze bleibt.*

**4. Plausibilitätskontrolle (Verdünnungsregel für schwache Säuren):** Die Essenz ($c = 4{,}37\,\mathrm{mol/L}$) hat $\mathrm{pH} = -\lg\!\sqrt{1{,}8 \cdot 10^{-5} \cdot 4{,}37} = 2{,}05$. Beim Verdünnen um den Faktor $f = 25$ steigt der pH-Wert einer schwachen Säure um $\Delta\mathrm{pH} = \tfrac{1}{2}\lg f = \tfrac{1}{2} \cdot 1{,}398 = 0{,}70$. Erwartung: $2{,}05 + 0{,}70 = 2{,}75$ — stimmt mit dem berechneten Wert überein. ✓

### d) pH-Wert am Äquivalenzpunkt und Indikatorwahl (6 BE)

**1. Was ist zu tun:** Acetatkonzentration nach der Volumenvereinigung berechnen, Basekonstante $K_B$ über $K_W/K_S$ bestimmen, pH-Wert berechnen, Umschlagsbereiche vergleichen.

**2. Rechengang:**

- Gesamtvolumen und Acetatkonzentration am Äquivalenzpunkt:

$$V_{\text{gesamt}} = 25{,}00\,\mathrm{mL} + 21{,}86\,\mathrm{mL} = 46{,}86\,\mathrm{mL} = 0{,}04686\,\mathrm{L}$$
$$c(\mathrm{CH_3COO^-}) = \frac{4{,}372 \cdot 10^{-3}\,\mathrm{mol}}{0{,}04686\,\mathrm{L}} = 0{,}0933\,\mathrm{mol/L}$$

- Protolyse des Acetations (Brønsted, **nicht** „Salzhydrolyse"!):

$$\mathrm{CH_3COO^- + H_2O \rightleftharpoons CH_3COOH + OH^-}$$
$$K_B = \frac{K_W}{K_S} = \frac{1{,}0 \cdot 10^{-14}}{1{,}8 \cdot 10^{-5}}\,\mathrm{mol/L} = 5{,}6 \cdot 10^{-10}\,\mathrm{mol/L}$$

- Hydroxidionenkonzentration (Näherung, da $K_B$ sehr klein):

$$c(\mathrm{OH^-}) = \sqrt{K_B \cdot c(\mathrm{CH_3COO^-})} = \sqrt{5{,}6 \cdot 10^{-10} \cdot 0{,}0933}\,\mathrm{mol/L} = 7{,}2 \cdot 10^{-6}\,\mathrm{mol/L}$$

Näherungsprüfung: $\dfrac{7{,}2 \cdot 10^{-6}}{0{,}0933} = 7{,}7 \cdot 10^{-5} = 0{,}008\,\% < 5\,\%$ ✓

$$\mathrm{pOH} = -\lg(7{,}2 \cdot 10^{-6}) = 5{,}14 \quad \Rightarrow \quad \mathrm{pH} = 14{,}00 - 5{,}14 = 8{,}86$$

- pH-Sprung in der Umgebung des Äquivalenzpunktes (Abschätzung über das MWG):
bei 99,9 % Neutralisation $\mathrm{pH} = \mathrm{p}K_S + \lg \frac{0{,}999}{0{,}001} = 4{,}74 + 3{,}00 = 7{,}74$;
bei 100,1 % (Überschuss $4{,}37 \cdot 10^{-6}\,\mathrm{mol}$ NaOH) $c(\mathrm{OH^-}) = 9{,}3 \cdot 10^{-5}\,\mathrm{mol/L} \Rightarrow \mathrm{pH} = 9{,}97$.

- Indikatorvergleich: Phenolphthalein schlägt im Bereich pH 8,2–10,0 um, der vollständig im Sprungbereich 7,7–10,0 und um den Äquivalenzpunkt (pH 8,86) liegt. Methylorange (pH 3,1–4,4) schlägt dagegen schon im Pufferbereich um: mit $\mathrm{pH} = \mathrm{p}K_S + \lg\frac{c(\mathrm{A^-})}{c(\mathrm{HA})}$ folgt für pH 4,4 ein Verhältnis $\frac{c(\mathrm{A^-})}{c(\mathrm{HA})} = 10^{4{,}4 - 4{,}74} = 0{,}45$, also ein Neutralisationsgrad von $\alpha = \frac{0{,}45}{1{,}45} = 0{,}31$; das entspricht $V(\mathrm{NaOH}) \approx 6{,}8\,\mathrm{mL}$ statt 21,86 mL, also einem Fehler von etwa $-69\,\%$.

**3. Antwortsatz:**

> *Am Äquivalenzpunkt beträgt der pH-Wert 8,86. Phenolphthalein ist daher geeignet, weil sein Umschlagsbereich (pH 8,2–10,0) den Äquivalenzpunkt einschließt; Methylorange würde bereits bei einem Neutralisationsgrad von etwa 31 % umschlagen und den Säuregehalt um rund 70 % zu niedrig bestimmen.*

### e) AFB III — Bewertung des Verfahrens (6 BE)

**1. Was ist zu tun:** Kriterium nennen → systematische Fehlerquellen benennen und ihre Wirkungsrichtung angeben → Urteil mit Einschränkung formulieren.

**2. Rechengang / Argumentation:**

| Fehlerquelle | Wirkungsrichtung | Größenordnung |
|---|---|---|
| Natronlauge nimmt $\mathrm{CO_2}$ aus der Luft auf; die tatsächliche Konzentration sinkt | $V$ zu groß → $w$ zu **hoch** | bis zu einigen % |
| Der Farbumschlag wird bei der ersten bleibenden Rosafärbung (pH ≈ 9) abgelesen, leicht oberhalb von pH 8,86 | $V$ zu groß → $w$ zu **hoch** | ca. 0,1–0,3 % |
| Ableseungenauigkeit der Bürette ($\pm 0{,}05\,\mathrm{mL}$ je Ablesung, zwei Ablesungen) | zufällig, ± | $\pm 0{,}1\,\mathrm{mL}/21{,}86\,\mathrm{mL} \approx \pm 0{,}5\,\%$ |

**3. Antwortsatz (Urteil):**

> *Die Deklaration von 25,0 % kann für die untersuchte Probe als bestätigt gelten, da die Abweichung unter 0,1 Prozentpunkten liegt und damit kleiner ist als die zufällige Ableseunsicherheit von etwa 0,5 %. Die Aussage ist jedoch auf diese eine Probe beschränkt: Da beide systematischen Fehler den Wert eher zu hoch ausweisen und keine Wiederholung an weiteren Flaschen erfolgte, ist das Ergebnis als **Hinweis**, nicht als **Nachweis** für die Richtigkeit der Deklaration zu bewerten.*

### 德国评分惯例 5 条

1. **Zwischenschritte 必须可见**：nur das richtige Endergebnis zu nennen, bringt **0 BE**；$c \cdot V$、Stoffmengenverhältnis、Dreisatztabelle 每一步都要写在卷面上。
2. **Einheit 全程带**：jede Zwischenzeile trägt ihre Einheit; bei Größen in Gleichungen wird die Einheit im Antwortsatz ergänzt ($\mathrm{mol/L}$, $\mathrm{g}$, $\%$, $\mathrm{L/mol}$)。
3. **Antwortsatz 必写**：Ergebnis erst durch einen vollständigen deutschen Satz mit Ergebnis **und** Einheit als Antwort kenntlich machen。
4. **变量与 Modellannahmen 明确定义**：$x$、$c_0$、$V_A$、$w$ vor der Rechnung definieren; Annahmen (25 °C, $a \approx c$, additive Volumina) vorab nennen。
5. **图表必须 beschriftet**：Dreisatztabelle mit Zeilen I/C/E **und** Einheit in der Kopfzeile; Titrationskurve mit Achsenbeschriftung ($V(\mathrm{NaOH})$ in mL / pH-Wert), Skala und Legende。

---

## 3. 🇨🇳 CN-Methode vs DE-Standard（中德极速洞察技巧对比）

| 环节 | 中国技法（口诀/操作） | 德国标准做法 | 合规性 | 在 Abitur 怎么用（不丢分）|
|---|---|---|---|---|
| **平衡计算** | **三段式 ICE 表**：起始 → 变化（按系数比 $-x/+x$）→ 平衡，平衡行代入 $K$ 解 $x$ | MWG ansetzen und nach $x$ auflösen | ✅ 完全合规（KLP 未规定方法，只要求 MWG） | 表格当**草稿工具**写在卷面，标题写 *Dreisatztabelle (Ausgang / Änderung / Gleichgewicht)*，每行带 $\mathrm{mol/L}$；这一步常直接对应 2 BE |
| **物料/电荷守恒** | **守恒法**：$n(\mathrm{HA}) + n(\mathrm{A^-}) =$ 总量不变（物料守恒），$\mathrm{H_3O^+}$ 与 $\mathrm{OH^-}$ 由电荷平衡兜底 | Stoffmengenbilanz + Elektroneutralitätsbedingung（LK 常用） | ✅ 合规 | 用于**缓冲段与半等当点**：先写 *Die Gesamtstoffmenge an Acetat-Spezies bleibt erhalten*，再列比例，比直接背 Henderson-Hasselbalch 更能拿过程分 |
| **稀释/混合** | **十字交叉**：$c_1 V_1 = c_2 V_2$ 写成十字，浓稀相减得份数比 | Verdünnungsgleichung $c_1 V_1 = c_2 V_2$ 逐步 auflösen | ✅ 合规 | 十字只在**草稿**上用；卷面必须写成 $c_2 = \frac{c_1 V_1}{V_2}$ 并带单位，否则「无过程」丢分 |
| **设而不求** | 设 $c_0$ 但不代入：稀释后 pH 变化 $\Delta\mathrm{pH} = \frac{1}{2}\lg f$（$f$ 为稀释倍数），$c_0$ 自然约掉 | Plausibilitätskontrolle über Grenzfallbetrachtung | ✅ 合规 | 作为**末步检验**写一句 *Beim Verdünnen um den Faktor f steigt der pH-Wert um ½·lg f*，属于加分项，不替代主计算 |
| **量纲检验** | 算完先看量纲：$K_S$ 单位 $\mathrm{mol/L}$，$K = K_S/K_W$ 得 $\mathrm{L/mol}$，$c = n/V$ 得 $\mathrm{mol/L}$，$w$ 无量纲 | Einheitenprobe / Dimensionskontrolle | ✅ 合规 | 在 Antwortsatz 前补一句 *Die Einheitenprobe ergibt …*；这是德国老师明确认可的 Prüfschritt |
| **特值/极限检验** | $c \to 0$（无限稀释）→ pH → 7；$V(\mathrm{NaOH}) = 0$ → pH = 起始酸 pH；$T$ 升高 → $K_W$ 增大 | Grenzfallprüfung / Plausibilitätsbetrachtung | ✅ 合规 | 每道 pH 题末尾写一行 Grenzfall，成本 30 秒，常是独立得分点 |
| **结果反代验证** | 把 $x$ 代回 $K_S = \frac{x^2}{c_0 - x}$，看是否还原 $1{,}8 \cdot 10^{-5}$ | Rückprobe / Probe durch Einsetzen | ✅ 合规 | 与「Näherungsprüfung $x/c_0 < 5\,\%$」并列写，两项各占约 1 BE |
| **估算定位答案区间** | 先估后算：0,1 mol/L 一元弱酸 pH 必在 2–3 之间；等当点必 > 7；若算出 pH = 5,3 立刻知道错 | Größenordnungsabschätzung vor der Rechnung | ✅ 合规 | 草稿上先写区间，卷面写 *Der Wert liegt erwartungsgemäß im sauren Bereich, da …* |
| **数形结合** | 画滴定曲线：拐点 = 等当点，平坦段 = 缓冲段，半等当点 pH = p$K_S$；用图形定位指示剂 | Titrationskurve auswerten / Wendepunkt bestimmen | ✅ 合规（LK 要求，GK 加分） | 图必须 beschriftet（Achsen + Einheit + Skala + Legende）；文字说明 *Der Wendepunkt der Kurve kennzeichnet den Äquivalenzpunkt* |

### 哪些「跳步」在德国评分下会丢分

- **只写答案（„pH = 2,75"）**：结果对也 0 BE。改成：Dreisatztabelle（1–2 BE）+ MWG 代入（1 BE）+ 解 $x$ 带单位（1 BE）+ pH 计算（1 BE）+ Antwortsatz（1 BE）。**心算只用于草稿定位，卷面必须有可追溯的链条。**
- **跳掉 Näherungsprüfung**：题干写 *überprüfen Sie die Näherung* 时，这一句本身就是 1 BE；不写就白丢。
- **用中文口诀当答案**：写 „三段式"、„盐类水解"、„十字交叉" 一律不算分，且 „Salzhydrolyse" 在 NRW 不是概念，会被扣 Fachsprache 分。必须改成 *Dreisatztabelle*、*Protolyse des Anions*、*Verdünnungsgleichung*。
- **跳单位、中间结果先舍入**：$0{,}1749$ 若先写成 $0{,}17$ 再往下算，末位会漂移，且被判 „ungenaue Zwischenergebnisse"。
- **跳 Modellannahmen**：题目给 $K_W$ 却没写 „bei 25 °C"，评卷视为未说明条件。
- **既快又满分的写法**：草稿上用中国技法 30 秒定位（估区间 + 十字交叉 + 极限检验），卷面上按 **表 → 式 → 数 → 单位 → Antwortsatz → Probe** 六段式展开。

---

## 4. Fehlerquellen（扣分避坑要点）

| 坑 | 典型表现 | 丢分后果 | 规避动作（德语动作指令）|
|---|---|---|---|
| **单位缺失或换算错** | mL 直接当代 L 用（$0{,}2000 \cdot 21{,}86 = 4{,}372$ 却不写 L） | 该步 0 BE，后续连带错 | *Volumen vor dem Einsetzen in Liter umrechnen und die Einheit in jeder Zeile mitschreiben.* |
| **过早舍入** | $c = 0{,}1749$ 先写成 $0{,}17$，$w$ 从 25,0 % 漂到 24,3 % | 末位错误，整条链降级 | *Zwischenergebnisse ungerundet weiterverwenden und erst das Endergebnis runden.* |
| **无 Antwortsatz** | 算式写到底就停 | 通常扣 1 BE（„Ergebnis nicht als Antwort kenntlich"） | *Das Ergebnis in einem vollständigen Satz mit Einheit formulieren.* |
| **变量未定义** | 直接用 $x$、$c_0$、$w$ 却不说明 | 可读性分丢失，GK 常见 1 BE | *Alle Größen vor der Rechnung benennen: $x = c(\mathrm{H_3O^+})$, $c_0 = \ldots$* |
| **图表无标注** | Dreisatztabelle 无表头无单位；曲线无 Achsenbeschriftung | 图表题直接扣 1–2 BE | *Achsen mit Größe und Einheit beschriften, Skala und Legende ergänzen.* |
| **Modellannahmen 未说明** | 直接用 $K_W = 10^{-14}$ 或 $a \approx c$ | „Bedingung nicht genannt"，1 BE | *Die Annahmen (25 °C, Aktivität ≈ Konzentration, additive Volumina) vorab formulieren.* |
| **只给结果不给解释** | a) 只写方程式，不写 $K = K_S/K_W$ 的理由 | AFB II 的 begründen 部分 0 BE | *Jede Behauptung mit dem MWG oder dem Stoffmengenverhältnis begründen.* |
| **德语专业词拼写** | *Grösse* / *Einheit* 拼错、*Stoffmengekonzentration* 少一个 n、*Äquivalenzpunkt* 写成 *Aequivalenzpunk* | Fachsprache 分，累积可扣 2–3 BE | *Fachbegriffe vor dem Schreiben laut prüfen: Stoffmengenkonzentration, Größenordnung, Skala, Umschlagsbereich.* |
| **有效数字** | $w = 25{,}00368\,\%$ 全抄计算器 | „unangemessene Genauigkeit"，扣表达分 | *Auf die Genauigkeit der Eingangsdaten runden ($K_S$: 2 sig. Fig. → pH auf 2 Dezimalstellen).* |
| **符号混淆** | $K$（中性化常数）与 $K_S$（酸常数）混用；$c$（浓度）与 $\beta$（质量浓度）混；$p$（压力）与 $\rho$（密度）混；$V$ 与 $\nu$（化学计量数）混；$\Delta$（差值）与 $d$（微分/密度）混 | 公式错 → 整步 0 BE | *Symbole mit Legende einführen: $K$ für die Neutralisationskonstante, $K_S$ für die Säurekonstante, $\rho$ für die Dichte.* |
| **术语性别错** | *das Indikator / der Säure / die Massenanteil* | 语言分（Sprachrichtigkeit） | *Richtig: **der** Indikator, **die** Säure, **der** Massenanteil, **die** Stoffmenge, **das** Massenwirkungsgesetz, **die** Titrationskurve, **der** pH-Wert, **die** Konzentration, **das** Mol, **das** Ion, **der** Äquivalenzpunkt.* |
| **概念用词不合规** | 写 „Salzhydrolyse"、„中和点 pH = 7" | NRW 无此概念，扣 Fachsprache 且结论错 | *Stattdessen: Protolyse des Acetations und pH-Wert am Äquivalenzpunkt > 7.* |

---

## 5. Drei Varianten（3 道变式题）

### Variante A — 数据变（数值/参数更换，方法不变）

**德语题干** `[原创仿写]`

Eine Essig-Essenz ($\rho = 1{,}05\,\mathrm{g/mL}$) wird analysiert. **10,00 mL** der Essenz werden in einen **500,0-mL-Maßkolben** pipettiert und bis zur Marke aufgefüllt (Verdünnungslösung **V**). **20,00 mL** von **V** werden mit Natronlauge ($c = 0{,}1000\,\mathrm{mol/L}$) titriert; die drei Einzelwerte lauten 17,54 mL · 17,46 mL · 17,47 mL.

**a)** (6 BE) Berechnen Sie die Stoffmengenkonzentration der Verdünnungslösung **V**, die Konzentration der unverdünnten Essenz und den Massenanteil $w(\mathrm{CH_3COOH})$.
**b)** (5 BE) Berechnen Sie den pH-Wert von **V** mithilfe des Massenwirkungsgesetzes und überprüfen Sie die Näherung.

**变化点说明**：Dichte 与称样体积不变，但**稀释倍数 25 → 50**、**分取体积 25,00 → 20,00 mL**、**NaOH 浓度 0,2000 → 0,1000 mol/L**；方法链完全相同，检验的是「稀释倍数与分取体积同步换算」是否稳。**BE: 11**

**完整解答**

**a)** Mittelwert: $\bar{V} = \frac{17{,}54 + 17{,}46 + 17{,}47}{3}\,\mathrm{mL} = 17{,}49\,\mathrm{mL} = 0{,}01749\,\mathrm{L}$（Spannweite 0,08 mL ✓）

$$n(\mathrm{NaOH}) = 0{,}1000\,\mathrm{mol/L} \cdot 0{,}01749\,\mathrm{L} = 1{,}749 \cdot 10^{-3}\,\mathrm{mol} = n(\mathrm{CH_3COOH})_{\text{Aliquot}}$$
$$c(\mathbf{V}) = \frac{1{,}749 \cdot 10^{-3}\,\mathrm{mol}}{0{,}02000\,\mathrm{L}} = 0{,}08745\,\mathrm{mol/L}$$
$$n_{\text{gesamt}} = 0{,}08745\,\mathrm{mol/L} \cdot 0{,}5000\,\mathrm{L} = 4{,}3725 \cdot 10^{-2}\,\mathrm{mol}$$
$$c(\text{Essenz}) = \frac{4{,}3725 \cdot 10^{-2}\,\mathrm{mol}}{0{,}01000\,\mathrm{L}} = 4{,}37\,\mathrm{mol/L}$$
$$m(\mathrm{CH_3COOH}) = 4{,}3725 \cdot 10^{-2}\,\mathrm{mol} \cdot 60{,}05\,\mathrm{g/mol} = 2{,}626\,\mathrm{g}$$
$$w = \frac{2{,}626\,\mathrm{g}}{1{,}05\,\mathrm{g/mL} \cdot 10{,}00\,\mathrm{mL}} = \frac{2{,}626}{10{,}50} = 0{,}250 = 25{,}0\,\%$$

> *Antwortsatz: Die Verdünnungslösung hat die Konzentration $c = 0{,}08745\,\mathrm{mol/L}$, die Essenz $c = 4{,}37\,\mathrm{mol/L}$; der Massenanteil der Essigsäure beträgt $w = 25{,}0\,\%$.*

**b)** Dreisatztabelle (I: $0{,}08745\,|\,0\,|\,0$; C: $-x\,|\,+x\,|\,+x$; E: $0{,}08745 - x\,|\,x\,|\,x$):

$$K_S = \frac{x^2}{0{,}08745 - x} \approx \frac{x^2}{0{,}08745} = 1{,}8 \cdot 10^{-5}\,\mathrm{mol/L}$$
$$x = \sqrt{1{,}8 \cdot 10^{-5} \cdot 0{,}08745}\,\mathrm{mol/L} = 1{,}254 \cdot 10^{-3}\,\mathrm{mol/L}$$
$$\text{Prüfung: } \frac{x}{c_0} = \frac{1{,}254 \cdot 10^{-3}}{0{,}08745} = 1{,}4\,\% < 5\,\% \quad \checkmark$$
$$\mathrm{pH} = -\lg(1{,}254 \cdot 10^{-3}) = 3 - 0{,}098 = 2{,}90$$

> *Antwortsatz: Der pH-Wert der Verdünnungslösung beträgt 2,90; die Näherung ist mit einem Dissoziationsgrad von 1,4 % zulässig.*

**Plausibilität:** Verdünnungsfaktor $f = 50$ → $\Delta\mathrm{pH} = \tfrac12 \lg 50 = 0{,}85$; Essenz pH 2,05 + 0,85 = 2,90 ✓

**中文点评**：陷阱在于**稀释倍数和分取体积同时改**，很多人在 $n_{\text{gesamt}} = c \cdot V_{\text{Kolben}}$ 处仍写 0,2500 L（抄原型数字）；以及 $c(\text{Essenz})$ 要用 **0,01000 L** 而不是 0,5000 L。迁移点是「结果应与原型的 25,0 % 一致」——数据变、结论不变，正好用来自检。

---

### Variante B — 条件/情境变（mehrprotonige Säure → 需重新建模）

**德语题干** `[原创仿写]`

Ein flüssiger Entkalker enthält **Zitronensäure** $\mathrm{H_3Cit}$ ($\mathrm{C_6H_8O_7}$, $M = 192{,}12\,\mathrm{g/mol}$, dreiprotonig; $\mathrm{p}K_{S1} = 3{,}13$, $\mathrm{p}K_{S2} = 4{,}76$, $\mathrm{p}K_{S3} = 6{,}40$). **20,00 mL** des Entkalkers werden mit Natronlauge ($c = 0{,}2000\,\mathrm{mol/L}$) titriert; bis zum bleibenden Farbumschlag von Phenolphthalein werden **18,00 mL** verbraucht.

**a)** (3 BE) Erläutern Sie anhand der $\mathrm{p}K_S$-Werte, warum die Titrationskurve **nur einen** ausgeprägten Äquivalenzpunkt zeigt und welcher stöchiometrische Faktor $z$ deshalb anzusetzen ist.
**b)** (5 BE) Berechnen Sie die Stoffmengenkonzentration und die Massenkonzentration $\beta$ der Zitronensäure im Entkalker.
**c)** (5 BE) Berechnen Sie den pH-Wert am Äquivalenzpunkt und begründen Sie, ob Phenolphthalein geeignet ist.

**变化点说明**：由**一元弱酸**换成**三元弱酸**；由于相邻 $\mathrm{p}K_S$ 差仅约 1,6（< 3），三步解离**合并为一个等当点**，化学计量因子由 $z = 1$ 变为 $z = 3$，等当点 pH 由 $\mathrm{Cit^{3-}}$ 的 $K_B = K_W/K_{S3}$ 决定。**BE: 13**

**完整解答**

**a)** Die Abstände betragen $\Delta\mathrm{p}K_S = 4{,}76 - 3{,}13 = 1{,}63$ und $6{,}40 - 4{,}76 = 1{,}64$; sie liegen deutlich unter 3. Daher überlagern sich die drei Protolyseschritte, die drei Äquivalenzpunkte fallen zu **einem** Sprung zusammen, und alle drei Protonen werden gemeinsam erfasst:

$$\mathrm{H_3Cit + 3\,OH^- \rightarrow Cit^{3-} + 3\,H_2O} \quad \Rightarrow \quad z = 3$$

> *Antwortsatz: Wegen der kleinen pKS-Abstände ist nur ein gemeinsamer Äquivalenzpunkt zu erwarten; die Stöchiometrie lautet 1 : 3, also ist $z = 3$ anzusetzen.*

**b)**

$$n(\mathrm{OH^-}) = 0{,}2000\,\mathrm{mol/L} \cdot 0{,}01800\,\mathrm{L} = 3{,}600 \cdot 10^{-3}\,\mathrm{mol}$$
$$n(\mathrm{H_3Cit}) = \frac{n(\mathrm{OH^-})}{z} = \frac{3{,}600 \cdot 10^{-3}\,\mathrm{mol}}{3} = 1{,}200 \cdot 10^{-3}\,\mathrm{mol}$$
$$c(\mathrm{H_3Cit}) = \frac{1{,}200 \cdot 10^{-3}\,\mathrm{mol}}{0{,}02000\,\mathrm{L}} = 0{,}06000\,\mathrm{mol/L}$$
$$\beta(\mathrm{H_3Cit}) = c \cdot M = 0{,}06000\,\mathrm{mol/L} \cdot 192{,}12\,\mathrm{g/mol} = 11{,}53\,\mathrm{g/L}$$

> *Antwortsatz: Der Entkalker enthält $c = 0{,}06000\,\mathrm{mol/L}$ Zitronensäure; das entspricht einer Massenkonzentration von $\beta = 11{,}53\,\mathrm{g/L}$.*

**c)** $V_{\text{gesamt}} = 20{,}00\,\mathrm{mL} + 18{,}00\,\mathrm{mL} = 38{,}00\,\mathrm{mL}$

$$c(\mathrm{Cit^{3-}}) = \frac{1{,}200 \cdot 10^{-3}\,\mathrm{mol}}{0{,}03800\,\mathrm{L}} = 0{,}03158\,\mathrm{mol/L}$$
$$K_B(\mathrm{Cit^{3-}}) = \frac{K_W}{K_{S3}} = \frac{1{,}0 \cdot 10^{-14}\,\mathrm{mol^2/L^2}}{4{,}0 \cdot 10^{-7}\,\mathrm{mol/L}} = 2{,}5 \cdot 10^{-8}\,\mathrm{mol/L}$$
$$c(\mathrm{OH^-}) = \sqrt{2{,}5 \cdot 10^{-8} \cdot 0{,}03158}\,\mathrm{mol/L} = 2{,}82 \cdot 10^{-5}\,\mathrm{mol/L}$$
$$\text{Prüfung: } \frac{2{,}82 \cdot 10^{-5}}{0{,}03158} = 0{,}089\,\% < 5\,\% \quad \checkmark$$
$$\mathrm{pOH} = -\lg(2{,}82 \cdot 10^{-5}) = 4{,}55 \quad \Rightarrow \quad \mathrm{pH} = 14{,}00 - 4{,}55 = 9{,}45$$

> *Antwortsatz: Am Äquivalenzpunkt beträgt der pH-Wert 9,45; Phenolphthalein (pH 8,2–10,0) ist geeignet, da der Umschlagsbereich den Äquivalenzpunkt einschließt.*

**中文点评**：最大陷阱是**忘记 $z = 3$**——按 1:1 算会得到 $c = 0{,}180\,\mathrm{mol/L}$，正好偏高 3 倍；第二个陷阱是等当点用错 $K_{S}$：三元酸等当点的碱性来自**最后一级**共轭碱，即 $K_B = K_W/K_{S3}$（对应 $\mathrm{p}K_{S3} = 6{,}40$），用 $K_{S1}$ 会算出完全错误的 pH。此外 LK 可加一句：在 $\mathrm{pH} \approx \mathrm{p}K_{S2} = 4{,}76$ 附近存在宽阔的**缓冲段**（$\mathrm{HCit^{2-}/Cit^{3-}}$ 与 $\mathrm{H_2Cit^-/HCit^{2-}}$ 共存），这正是曲线平坦、指示剂必须选在碱性区的原因。

---

### Variante C — 迁移/综合（含 AFB III Bewertung）

**德语题干** `[原创仿写]`

Ein Lebensmittellabor prüft einen **Speiseessig**, der mit „Säuregehalt 5,0 % (m/m)" deklariert ist. Dichte $\rho = 1{,}01\,\mathrm{g/mL}$. Da nur eine 10-mL-Vollpipette und Natronlauge mit $c = 0{,}5000\,\mathrm{mol/L}$ zur Verfügung stehen, wird **unverdünnt** titriert: **10,00 mL** Essig, Indikator Phenolphthalein, Verbrauch 16,48 mL · 16,40 mL · 16,38 mL.

**a)** (6 BE) Berechnen Sie den Massenanteil $w(\mathrm{CH_3COOH})$ und den pH-Wert des Speiseessigs; überprüfen Sie die Näherung.
**b)** (3 BE) Geben Sie an, welchen Verbrauch man bei einer korrekten Deklaration von 5,0 % erwarten würde, und bestimmen Sie die relative Abweichung.
**c)** (6 BE) **Bewerten Sie**, ob das Ergebnis als Nachweis für eine falsche Deklaration ausreicht. Berücksichtigen Sie dabei die Messunsicherheit (Bürette $\pm 0{,}05\,\mathrm{mL}$ je Ablesung, Vollpipette $\pm 0{,}02\,\mathrm{mL}$) und schlagen Sie eine Maßnahme zur Erhöhung der Aussagekraft vor.

**变化点说明**：由「醋精稀释滴定」迁移到「**成品检验 / 合格判定**」情境；滴定**不再稀释**（基质浓度变低）、NaOH 浓度变高；新增 **AFB III**：用**测量不确定度**判断偏差是否显著，属于典型的 *bewerten* 子问。**BE: 15**

**完整解答**

**a)** $\bar{V} = \frac{16{,}48 + 16{,}40 + 16{,}38}{3}\,\mathrm{mL} = 16{,}42\,\mathrm{mL} = 0{,}01642\,\mathrm{L}$

$$n(\mathrm{NaOH}) = 0{,}5000\,\mathrm{mol/L} \cdot 0{,}01642\,\mathrm{L} = 8{,}210 \cdot 10^{-3}\,\mathrm{mol} = n(\mathrm{CH_3COOH})$$
$$m(\mathrm{CH_3COOH}) = 8{,}210 \cdot 10^{-3}\,\mathrm{mol} \cdot 60{,}05\,\mathrm{g/mol} = 0{,}4930\,\mathrm{g}$$
$$m(\text{Probe}) = 1{,}01\,\mathrm{g/mL} \cdot 10{,}00\,\mathrm{mL} = 10{,}10\,\mathrm{g}$$
$$w = \frac{0{,}4930\,\mathrm{g}}{10{,}10\,\mathrm{g}} = 0{,}0488 = 4{,}88\,\%$$

pH-Wert: $c(\mathrm{CH_3COOH}) = \frac{8{,}210 \cdot 10^{-3}\,\mathrm{mol}}{0{,}01000\,\mathrm{L}} = 0{,}8210\,\mathrm{mol/L}$

$$x = c(\mathrm{H_3O^+}) = \sqrt{1{,}8 \cdot 10^{-5} \cdot 0{,}8210}\,\mathrm{mol/L} = 3{,}84 \cdot 10^{-3}\,\mathrm{mol/L}$$
$$\frac{x}{c_0} = \frac{3{,}84 \cdot 10^{-3}}{0{,}8210} = 0{,}47\,\% < 5\,\% \quad \checkmark \qquad \mathrm{pH} = -\lg(3{,}84 \cdot 10^{-3}) = 2{,}42$$

> *Antwortsatz: Der Speiseessig hat einen Massenanteil von $w = 4{,}88\,\%$ und einen pH-Wert von 2,42.*

**b)** Erwartete Stoffmenge bei 5,0 %: $m = 0{,}050 \cdot 10{,}10\,\mathrm{g} = 0{,}505\,\mathrm{g}$ → $n = \frac{0{,}505\,\mathrm{g}}{60{,}05\,\mathrm{g/mol}} = 8{,}41 \cdot 10^{-3}\,\mathrm{mol}$

$$V_{\text{erwartet}} = \frac{8{,}41 \cdot 10^{-3}\,\mathrm{mol}}{0{,}5000\,\mathrm{mol/L}} = 0{,}01682\,\mathrm{L} = 16{,}82\,\mathrm{mL}$$
$$\text{relative Abweichung} = \frac{16{,}42 - 16{,}82}{16{,}82} = -0{,}0238 = -2{,}4\,\%$$

> *Antwortsatz: Bei korrekter Deklaration wären 16,82 mL zu erwarten; der gemessene Wert liegt um 2,4 % niedriger.*

**c) Bewertung（Kriterium → Abwägung → Urteil）**

- **Kriterium:** Ein Nachweis für eine Falschdeklaration ist nur dann erbracht, wenn die Abweichung die Messunsicherheit des Verfahrens deutlich übersteigt und systematische Fehler ausgeschlossen sind.
- **Abwägung:** Die zufällige Unsicherheit beträgt bei zwei Bürettenablesungen $\pm 0{,}10\,\mathrm{mL}$ ($\mathrel{\hat{=}} \pm 0{,}6\,\%$) und bei der Vollpipette $\pm 0{,}02\,\mathrm{mL}$ ($\mathrel{\hat{=}} \pm 0{,}2\,\%$); zusammen etwa $\pm 0{,}7\,\%$. Die gemessene Abweichung von $-2{,}4\,\%$ ist zwar größer als diese zufällige Unsicherheit, liegt aber in der Größenordnung möglicher **systematischer** Fehler: eine durch $\mathrm{CO_2}$-Aufnahme verbrauchte Natronlauge und das subjektive Erkennen des Farbumschlags (beide wirken hier gegenläufig), ferner die Annahme $\rho = 1{,}01\,\mathrm{g/mL}$ für die Probe. Zudem wurde nur eine einzige Probe aus einer Flasche analysiert, die Wiederholstreuung ist nicht geprüft.
- **Urteil:**

> *Das Ergebnis von 4,88 % ist als belastbarer **Hinweis** auf eine zu niedrige Deklaration zu bewerten, jedoch nicht als **Nachweis**: Die Abweichung von −2,4 % übersteigt zwar die zufällige Messunsicherheit von etwa ±0,7 %, kann aber durch systematische Fehler (Titer der Natronlauge, Ablesen des Umschlags) verursacht sein. Zur Erhöhung der Aussagekraft wird vorgeschlagen, die Maßlösung mit einer Urtitersubstanz einzustellen, ein größeres Aliquot (25,00 mL) zu titrieren, den Äquivalenzpunkt pH-metrisch über den Wendepunkt der Titrationskurve zu bestimmen und die Analyse an mehreren Flaschen zu wiederholen.*

**中文点评**：迁移点有两条——(1) **不稀释直接滴定**时，样品量与 NaOH 浓度要重新匹配（10 mL × 0,5 mol/L 才落在 15–20 mL 的合理消耗区间）；(2) AFB III 的得分来自「**定量化的不确定度**」而非泛泛而谈：必须把 $\pm 0{,}05\,\mathrm{mL}$ 换算成相对百分比再与偏差比较。常见丢分：只写 „das Ergebnis ist zu niedrig"，没有 Kriterium 和 Urteil 的层次。

---

## 6. Zeitstrategie & Glossar-Zeilen

### Zeitstrategie（按 29 BE 原型题，建议 40 min）

| Teilaufgabe | BE | Minuten | 备注 |
|---|---|---|---|
| Material lesen + Modellannahmen notieren | — | 3 | 先把 $K_S$、$K_W$、Umschlagsbereiche 圈出来 |
| a) Gleichung + $K = K_S/K_W$ | 4 | 5 | 方程 1 min，量纲/结论 2 min |
| b) Stoffmenge → Massenanteil | 7 | 10 | 最长的一步，每换一次体积就检查一次单位 |
| c) Dreisatztabelle + pH + Prüfung | 6 | 9 | 表 2 min，近似+检验 3 min |
| d) Äquivalenzpunkt + Indikator | 6 | 8 | $K_B = K_W/K_S$ 是提速点 |
| e) AFB III Bewertung | 6 | 6 | Kriterium → Abwägung → Urteil，三段各 2 min |
| Schlusskontrolle（量纲 + Grenzfall） | — | 4 | 必做，德国阅卷认这一项 |
| **Summe** | **29** | **≈ 45** | 若 Klausur 总时长 90 min，本题占比约一半 |

**「先保分后抢分」三条**

1. **先把 a) b) 拿满**：方程式与物质的量链是 AFB II 的「保底分」，两者合计 11 BE 且几乎不依赖后面的结论；时间不够时 d) e) 可以先只写结论句。
2. **每一步都写 Antwortsatz**：宁可 d) 少算一个 pH-Sprung，也不要在 b) c) 省掉 Antwortsatz——前者是加分项，后者是必得分。
3. **不会算的先写「式」不写「数」**：把 MWG、Dreisatztabelle、$K_B = K_W/K_S$ 列出来即拿过程分，数字卡住时跳到下一小问，最后 4 min 回来补。

### Glossar-Zeilen（待合并到 `00_META/Glossar-DE-ZH-GeWi.md`）

| Deutsch | Chinesisch | Fach | Beispielsatz |
|---|---|---|---|
| der Indikator | 指示剂 | Chemie | Der Indikator zeigt das Ende der Titration durch einen Farbumschlag an. |
| der Umschlagsbereich | 变色范围 | Chemie | Der Umschlagsbereich von Phenolphthalein liegt zwischen pH 8,2 und 10,0. |
| die Titrationskurve | 滴定曲线 | Chemie | Der Wendepunkt der Titrationskurve kennzeichnet den Äquivalenzpunkt. |
| der Massenanteil w | 质量分数 | Chemie | Der Massenanteil w ist der Quotient aus Stoffmasse und Probenmasse. |
| die Säurekonstante K_S | 酸常数 | Chemie | Aus der Säurekonstante K_S folgt die Stärke einer schwachen Säure. |
| die Pufferwirkung | 缓冲作用 | Chemie | Die Pufferwirkung beruht auf dem Nebeneinander von Säure und konjugierter Base. |

---

## Vernetzung

- **上游**：`05_Chemie/CN-Gleichgewichts-Dreisatz-Tabelle.md`（三段式模板与 $x/c_0 < 5\,\%$ 判据）· `05_Chemie/Saeure-Base-Gleichgewichte-pH-Wert.md`（$K_S$/pH 基础）
- **平行**：`05_Chemie/MWG-Quantitative-Berechnungen-EF2.md`（MWG 定量）· `05_Chemie/Q1-LK-Puffer-Titrationskurve-KL.md`（Titrationskurve, LK）
- **下游**：`05_Chemie/Klausur-Training/Mockklausur-NRW-Chemie.md`（Abgaskatalysator 主题，不重复）· `05_Chemie/Klausur-Training/CN-Chemie-Training.md`（Halbäquivalenzpunkt/HH，本篇不重复）
- ⏳ 待确认：本班 Lehrkraft 是否将 *Titration* 放在 GK（Umschlagspunkt）还是 LK（Äquivalenzpunkt + Titrationskurve）层次；本篇两条线都给出，GK 可跳过 Variante B a) 的 $\mathrm{p}K_S$-Abstandsbegründung。
