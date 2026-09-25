---
fach: Mathe
thema: "Klausurtraining: Analysis im Sachkontext"
operatoren: [berechnen, bestimmen, interpretieren, beurteilen]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Mathe]
---

# Klausurtraining: Analysis im Sachkontext (雨水蓄水池容积与截面建模综合大题)

> **中文理解**：
> 在 NRW 高中阶段（EF），分析学（Analysis）的重点在于把微积分工具置于**真实情境（Sachkontext）**中进行建模与最值求解。考题通常给出一个三次或四次多项式函数，描述横截面轮廓、注水速率或地形起伏。
> 解题的关键绝非单纯求导，而是**算子对齐与情境还原**：
> - 算子 `berechnen` 要求给出严密的代数推演步骤；
> - 算子 `bestimmen` 允许借助已知条件或计算器，但必须明确指出判定依据（如必要条件与充分条件）；
> - 算子 `interpretieren` 必须将数学量（导数值、零点、极值点、定积分）翻译回物理或工程背景（例如将 $f'(t)$ 解释为瞬时注水流量，单位为 $\text{m}^3/\text{h}$）；
> - 算子 `beurteilen` 则要求基于模型边界对实际工程方案的合理性或安全性做出批判性裁决。

---

## 1. 核心概念与算子标准 (Kernbegriffe & Operatoren)

- **Randwertbetrachtung (边界效应)**:
  > *Klausur-Satz*: Bei Optimierungsproblemen im Sachkontext muss neben den stationären Punkten im Inneren des Definitionsbereichs ($f'(x)=0$) stets der Funktionswert an den Intervallgrenzen verglichen werden, um das globale Extremum zweifelsfrei zu identifizieren.
- **Wendestelle als maximales Gefaelle (拐点作为最陡坡度)**:
  > *Klausur-Satz*: Die Wendestelle einer Profillinie $f(x)$ entspricht der lokalen Extremstelle der Ableitungsfunktion $f'(x)$ und markiert somit den Ort der maximalen Steigung bzw. des steilsten Gefälles.
- **Tangentengleichung (切线方程规范)**:
  > *Klausur-Satz*: Die Gleichung der Tangente an den Graphen von $f$ an der Stelle $x_0$ lautet $t(x) = f'(x_0) \cdot (x - x_0) + f(x_0)$.

---

## 2. 知识结构与思维导图 (Wissensstruktur)

```
Analysis im Sachkontext (EF)
├── 1. Grundmodellierung
│   ├── Funktionsgleichung f(x) mit Definitionsbereich D = [0; b]
│   └── Symmetrie & Achsenschnittpunkte (Nullstellen: f(x) = 0)
├── 2. Lokale Analyse
│   ├── Steigungsverhalten: Monotoniesatz (f'(x) > 0 vs. f'(x) < 0)
│   ├── Extrema: Notwendige Bedingung f'(x) = 0, hinreichende Bedingung f''(x) != 0
│   └── Wendepunkte: Krümmungswechsel f''(x) = 0 mit Vorzeichenwechsel
├── 3. Sachbezogene Optimierung
│   ├── Nebenbedingungen (z.B. Materialbeschränkung, Stauwandhöhe)
│   └── Zielfunktion V(x) aufstellen und globales Maximum bestimmen
└── 4. Interpretation & Reflexion
    ├── Einheitenkontrolle (m, m², m³, m/s)
    └── Modellgrenzen (Knickfreiheit, physikalische Plausibilität)
```

---

## 3. 标准四步解题法 (Schritt-für-Schritt-Verfahren)

1. **Definitionsbereich & Kontext sichern**:
   - Skizze anfertigen, Achsenbeschriftungen mit physikalischen Einheiten versehen ($x$ in Metern, $y = f(x)$ in Metern).
2. **Ableitungen systematisch vorbereiten**:
   - $f(x)$ ausmultiplizieren oder faktorisiert ableiten; $f'(x)$ und $f''(x)$ übersichtlich notieren.
3. **Bedingungen formal deklarieren**:
   - Notwendige Bedingung immer explizit als Formel hinschreiben: $f'(x) = 0$.
   - Hinreichende Bedingung überprüfen: Entweder Vorzeichenwechselkriterium (VZW) oder $f''(x_E) < 0$ (Hochpunkt) bzw. $f''(x_E) > 0$ (Tiefpunkt).
4. **Antwortsatz im Sachkontext formulieren**:
   - Koordinaten $x_E$ und Funktionswert $f(x_E)$ getrennt berechnen und physikalisch deuten.

---

## 4. 🇨🇳 技巧与中德思维桥 (CN-Methode & Denkbruecke)

- **🇨🇳 极值与边界的「双保险法」**:
  国内高考常默认导数为零点即为极值点，而在 NRW 评分细则（Erwartungshorizont）中，若未显式检验区间端点 $f(a)$ 与 $f(b)$，会被直接扣除 1–2 个评估分（BE）。
- **德语表达模板 (Klausur-Satzbausteine)**:
  - *Notwendige Bedingung*: "Für ein lokales Extremum muss gelten: $f'(x) = 0$."
  - *Hinreichende Bedingung*: "Da $f'(x_1) = 0$ und $f''(x_1) = -1{,}2 < 0$, liegt an der Stelle $x_1$ ein relatives Maximum vor."
  - *Randwertvergleich*: "Ein Vergleich mit den Randwerten $f(0) = 0$ und $f(10) = 2$ bestätigt, dass an der Stelle $x_1$ auch das globale Maximum angenommen wird."
  - *Interpretation*: "Die maximale Tiefe des Beckens beträgt somit $4{,}5\text{ m}$ und wird in einem horizontalen Abstand von $6\text{ m}$ vom linken Beckenrand erreicht."

---

## 5. 全真训练题与标准评分指南 (Klausur-Training & Erwartungshorizont)

### 题目背景 (Kontext)
Die Querschnittslinie eines neu geplanten Regenrückhaltebeckens wird für $0 \le x \le 12$ durch die ganzrationale Funktion dritten Grades beschrieben:
$$f(x) = \frac{1}{36}x^3 - \frac{1}{2}x^2 + 2x$$
Dabei beschreibt $x$ die horizontale Entfernung vom westlichen Beckenrand in Metern ($x \in [0; 12]$) und $f(x)$ die vertikale Höhe des Beckenbodens über einer Referenzebene in Metern. Die Wasseroberfläche bei Vollstau liegt auf der Höhe der beiden Beckenränder bei $y = 0$.

### Teilaufgabe a) [AFB I, 6 BE]
**Berechnen Sie** die Stellen, an denen der Beckenboden die Referenzebene schneidet, und **bestimmen Sie** den Funktionswert am rechten Rand des Modellierungsbereichs ($x = 12$).

### Teilaufgabe b) [AFB II, 10 BE]
1. **Untersuchen Sie** das Beckenprofil auf lokale Extrempunkte. Bestimmen Sie insbesondere die Stelle, an der das Becken am tiefsten ist, sowie die maximale Wassertiefe.
2. An der Stelle $x = 2$ soll eine geradlinige Inspektionsrampe tangential an den Beckenboden angelegt werden. **Ermitteln Sie** die Gleichung dieser Tangente $t(x)$.

### Teilaufgabe c) [AFB III, 8 BE]
Aus Sicherheitsgründen schreibt die Bauverordnung vor, dass die Böschungsneigung an keiner Stelle des Beckens einen Betrag von $45^\circ$ (entspricht einer Steigung von $|f'(x)| = 1$) überschreiten darf.
**Untersuchen Sie**, an welcher Stelle des Beckenprofils das steilste Gefälle vorliegt, und **beurteilen Sie**, ob das geplante Becken die behördliche Sicherheitsvorgabe erfüllt.

---

### Erwartungshorizont & Bewertungsbogen (官方标准评分表)

| Teilaufgabe | Erwartete Teilleistung | BE |
|---|---|:---:|
| **a) Schnittpunkte & Randwert** | Setzt $f(x) = 0 \iff x \cdot (\frac{1}{36}x^2 - \frac{1}{2}x + 2) = 0$. | 2 |
| | Löst die quadratische Gleichung $x^2 - 18x + 72 = 0 \iff (x - 6)(x - 12) = 0$. Schnittstellen: $x_1 = 0$, $x_2 = 6$, $x_3 = 12$. | 2 |
| | Berechnet den Funktionswert am rechten Rand: $f(12) = 0\text{ m}$. Formuliert das Ergebnis im Sachkontext. | 2 |
| **b1) Lokale Extrema & Tiefe** | Bildet die ersten beiden Ableitungen korrekt: $f'(x) = \frac{1}{12}x^2 - x + 2$, $f''(x) = \frac{1}{6}x - 1$. | 2 |
| | Setzt notwendige Bedingung $f'(x) = 0$: $x^2 - 12x + 24 = 0 \implies x_{1,2} = 6 \pm \sqrt{12} \approx 6 \pm 3{,}464$. Also $x_{\text{min}} \approx 9{,}46\text{ m}$ und $x_{\text{max}} \approx 2{,}54\text{ m}$. | 2 |
| | Prüft hinreichende Bedingung: $f''(2{,}54) < 0$ (Hochpunkt) und $f''(9{,}46) > 0$ (Tiefpunkt/tiefste Stelle). | 2 |
| | Berechnet die Funktionswerte: $f(2{,}54) \approx 2{,}31\text{ m}$ und $f(9{,}46) \approx -2{,}31\text{ m}$. | 2 |
| | Formuliert Antwort: Maximale Beckentiefe beträgt ca. $2{,}31\text{ m}$ unterhalb der Nullinie an der Stelle $x \approx 9{,}46\text{ m}$. | 1 |
| **b2) Tangentengleichung** | Berechnet Steigung an der Stelle $x = 2$: $m = f'(2) = \frac{1}{12}\cdot 4 - 2 + 2 = \frac{1}{3}$. | 1 |
| | Berechnet Funktionswert $f(2) = \frac{8}{36} - 2 + 4 = \frac{2}{9} + 2 = \frac{20}{9} \approx 2{,}22$. | 1 |
| | Stellt Tangente auf: $t(x) = \frac{1}{3}(x - 2) + \frac{20}{9} = \frac{1}{3}x + \frac{14}{9}$. | 1 |
| **c) Steilstes Gefälle & Beurteilung** | Erkennt, dass das steilste Gefälle an der Wendestelle vorliegt: Bedingung $f''(x) = 0$. | 2 |
| | Löst $\frac{1}{6}x - 1 = 0 \iff x_W = 6\text{ m}$. | 2 |
| | Berechnet die Steigung an der Wendestelle: $f'(6) = \frac{36}{12} - 6 + 2 = 3 - 6 + 2 = -1$. | 2 |
| | Wertet $|f'(6)| = |-1| = 1$ aus und vergleicht mit dem Maximalwert an den Rändern ($f'(0) = 2 > 1$, $f'(12) = 2 > 1$). | 1 |
| | Beurteilt fundiert: An der Wendestelle wird die Grenze von $45^\circ$ exakt erreicht; an den Rändern wird die maximale Steigung von $1$ jedoch überschritten ($m = 2 \implies \alpha \approx 63{,}4^\circ$). Das geplante Profil verletzt somit die Vorgabe und muss an den Rändern abgeflacht werden. | 1 |
| **Gesamt** | | **26 BE** |

---

## 6. Häufige Fehlerquellen (Fehlerlog-Prävention)

1. **Unzureichende Begründung des globalen Maximums/Minimums**:
   - Nur $f'(x) = 0$ auszurechnen genügt nicht. Wer die Randwerte $f(0)$ und $f(12)$ nicht mit einbezieht, verliert formal die BE für den Existenzbeweis.
2. **Vorzeichen-Fehler beim Wassertiefen-Begriff**:
   - $f(9{,}46) \approx -2{,}31$. Die Tiefe ist ein positiver geometrischer Abstand ($2{,}31\text{ m}$), keine negative Zahl.
3. **Ableitung an der Wendestelle nicht als Steigung erkannt**:
   - Häufig wird $f(x_W)$ statt $f'(x_W)$ berechnet, um das Gefälle zu bewerten. Steigung ist immer die erste Ableitung.

---

## 7. Vernetzung & Querverweise (Vernetzung)

- **Verwandte Wissensnotizen**:
  - `03_Mathe/Differentialrechnung-Ableitungsregeln.md`
  - `03_Mathe/Kurvendiskussion-Uebersicht.md`
  - `04_Physik/Kinematik-Grundlagen.md` (Geschwindigkeit als Ableitung $v(t) = s'(t)$)
- **Klausur-Satz**:
  - *Analysis ist die Sprache der Änderungsraten: Wer die Ableitung physikalisch versteht, beherrscht jede Sachkontext-Aufgabe.*
