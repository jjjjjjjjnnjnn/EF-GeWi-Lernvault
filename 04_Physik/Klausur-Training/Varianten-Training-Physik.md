---
fach: Physik
thema: "E-Bike-Generator: Induktion, Leistung und Energieertrag"
operatoren: [beschreiben, berechnen, herleiten, erläutern, auswerten, bewerten]
klausurrelevant: true
datum: 2026-09-25
stufe: "Q1"
kursart: "GK"
tags: [Q1, Physik, Induktion, Klausur-Training]
---

# Varianten-Training Physik — E-Bike-Generator (Induktion)

> **中文一句话**：一份题打通「**磁通量 $\Phi$ → 感应电压 $U_\text{ind}$ → 功率与能量 → 效率与评价**」整条链；原型题练**标准写法**，A/B/C 三变式练**数据变 / 模型变 / 情境迁移 + AFB III**。
>
> **Abgrenzung（避免重复）**：`Mockklausur-NRW-Physik.md` = Windkraftanlage（圆周 + $P=\frac12\rho A v^3$）；`GK-3-Elektromagnetische-Induktion-und-Energieuebertragung.md` = 概念与变压器/电容；`CN-Physik-Training.md` = EF 力学四练。**本份主题唯一：E-Bike-Generator（Nabengenerator / Rekuperation）**。
> **考纲锚点**：Q-Phase `IF-GK-3 Elektrodynamik und Energieübertragung`（`magnetischer Fluss` · `Induktionsgesetz` · `Wechselspannung` · `Generator` · `Energierückgewinnung`）；Basiskonzepte `Erhaltung`（能量守恒）与 `System`（Generator + Akku）。
> ⏳ **待确认**：`04_Physik/Lehrplan.md` 目前只登记 EF 两个 Inhaltsfeld；本主题属 **Q-Phase**，已按 Q1-GK 边界写作，Lehrplan/INDEX 的 Q 段待主线程补入。
> ⏳ **待确认**：本文件按 `P3-Spec` 六节结构（Klausur-Training 类），未套 `Templates/Wissensnotiz-Template.md` 八段骨架。

---

## 1. Standard-Modellierungsaufgabe（标准德语建模题）

### Material M1 — Datenblatt „VeloDrive NG-300"（Nabengenerator für Pedelecs）

> ⚠️ 原创仿写 Modelltext（仿 Hersteller-Datenblatt / Schulbuch-Materialteil 风格撰写，非真实出版物摘录；数据与人名均为虚构）

Der Nabengenerator „VeloDrive NG-300" wird anstelle eines konventionellen Nabendynamos in das Vorderrad eines Pedelecs eingebaut. Beim Bremsen arbeitet er als Generator und speist über einen Gleichrichter sowie eine Ladeelektronik den Antriebsakku zurück; dieses Verfahren wird als **Rekuperation** bezeichnet. Im Generator rotiert eine rechteckige Spule in einem näherungsweise homogenen Magnetfeld. Der Läufer wird über ein schlupffreies Planetengetriebe von der Radnabe angetrieben, sodass für die Kreisfrequenz des Läufers $\omega_\text{Gen}=k\cdot\omega_\text{Rad}$ gilt. Die Spulenachse steht bei $t=0$ parallel zur Feldrichtung, der magnetische Fluss durch eine Windung ist dann maximal.

**Kennwerte (Modellwerte des Herstellers):**

| Größe | Formelzeichen | Wert |
|---|---|---|
| Windungszahl der Spule | $N$ | $300$ |
| Spulenquerschnitt ($5{,}0\ \mathrm{cm}\times 4{,}0\ \mathrm{cm}$) | $A$ | $20{,}0\ \mathrm{cm^2}$ |
| magnetische Flussdichte (homogen angenommen) | $B$ | $0{,}350\ \mathrm{T}$ |
| Übersetzungsverhältnis Rad $\to$ Läufer | $k$ | $6{,}00$ |
| Radradius | $r$ | $0{,}350\ \mathrm{m}$ |
| Fahrgeschwindigkeit (als konstant angenommen) | $v$ | $20{,}0\ \mathrm{km/h}$ |
| mechanische Leistungsaufnahme des Generators | $P_\text{mech}$ | $150\ \mathrm{W}$ |
| Wirkungsgrad Generator + Ladeelektronik | $\eta$ | $0{,}720$ |
| Gesamtmasse Fahrer + Rad | $m$ | $95{,}0\ \mathrm{kg}$ |
| Länge der Gefällestrecke | $s$ | $2{,}00\ \mathrm{km}$ |
| Höhenunterschied der Gefällestrecke | $\Delta h$ | $100\ \mathrm{m}$ |
| Fahrtdauer auf der Gefällestrecke | $t_F$ | $6{,}00\ \mathrm{min}$ |
| Kapazität des Antriebsakkus | $W_\text{Akku}$ | $500\ \mathrm{Wh}$ |

**Wertetabelle (Modellrechnung des Herstellers, eine halbe Läuferumdrehung):**

| $t$ in $\mathrm{ms}$ | $0$ | $8{,}25$ | $16{,}5$ | $24{,}7$ | $33{,}0$ |
|---|---|---|---|---|---|
| $\Phi$ in $10^{-4}\ \mathrm{Wb}$ | $7{,}00$ | $4{,}95$ | $0$ | $-4{,}95$ | $-7{,}00$ |
| $U_\text{ind}$ in $\mathrm{V}$ | $0$ | $14{,}1$ | $20{,}0$ | $14{,}1$ | $0$ |

---

### Aufgabe: „Rekuperation am Pedelec"

Ein Pedelec fährt mit konstanter Geschwindigkeit $v=20{,}0\ \mathrm{km/h}$ eine Gefällestrecke hinab; der Nabengenerator „VeloDrive NG-300" bremst dabei elektrisch und lädt den Akku.

**a) Magnetischer Fluss und Drehbewegung**  *(8 BE)*

1. Geben Sie die Definition des magnetischen Flusses an und **berechnen** Sie den maximalen Fluss $\Phi_\text{max}$ durch eine Windung sowie den Fluss bei einem Winkel von $60^\circ$ zwischen Feldrichtung und Flächennormalen. *(4 BE)*
2. **Berechnen** Sie die Drehzahl des Laufrades und des Generatorläufers in $\mathrm{min^{-1}}$ sowie die Periodendauer $T$ des Flussverlaufs. *(4 BE)*

**b) Induzierte Spannung**  *(10 BE)*

1. **Leiten** Sie aus dem Ansatz $\Phi(t)=\Phi_\text{max}\cdot\cos(\omega t)$ den zeitlichen Verlauf der induzierten Spannung $U_\text{ind}(t)$ her und geben Sie die Beziehung zwischen der maximalen Spannung und der Kreisfrequenz an. *(4 BE)*
2. **Berechnen** Sie den Maximalwert $U_\text{max}$ sowie den Effektivwert $U_\text{eff}$ der induzierten Wechselspannung. Vergleichen Sie $U_\text{max}$ mit der Wertetabelle in M1. *(3 BE)*
3. **Berechnen** Sie den Betrag der **mittleren** Induktionsspannung während einer Vierteldrehung (von $\Phi_\text{max}$ bis $\Phi=0$) über den Quotienten $\Delta\Phi/\Delta t$. *(3 BE)*

**c) Leistung, Energie und Wirkungsgrad**  *(12 BE)*

1. **Berechnen** Sie die elektrische Nutzleistung $P_\text{el}$ sowie die auf der Gefällestrecke zurückgewonnene elektrische Energie $W_\text{el}$ in $\mathrm{kJ}$ und in $\mathrm{Wh}$. *(4 BE)*
2. **Berechnen** Sie die Bremskraft $F_B$, die der Generator auf das Rad ausübt, sowie die verbleibende Widerstandskraft (Roll- und Luftwiderstand) unter der Annahme einer konstanten Fahrgeschwindigkeit. *(4 BE)*
3. Ein Werbetext behauptet: „Mit Rekuperation gewinnen Sie auf jeder Bergabfahrt ein Drittel der Akkukapazität zurück.“ **Überprüfen** Sie diese Aussage quantitativ. *(4 BE)*

**Gesamt: 30 BE**

---

### 中文题干理解（3–4 句）

电动自行车在下坡时由前轮轮毂发电机把**制动（机械）功率**转成电功率给电池充电：先由 $\Phi=BA\cos\theta$ 与 $\omega_\text{Gen}=k\,v/r$ 定出磁通与转速，再由 $U_\text{ind}=-N\,\mathrm d\Phi/\mathrm dt$ 得 $U_\text{max}=NBA\omega$，最后由 $P_\text{el}=\eta P_\text{mech}$ 与 $W=P\,t$ 算出回收能量并与电池容量比较。整条链的关键陷阱是**单位换算**（$\mathrm{cm^2\to m^2}$、$\mathrm{km/h\to m/s}$、$\mathrm{Wh\to J}$）与**$\Phi$ 最大处 $U_\text{ind}=0$**（正弦与余弦相差 $90^\circ$）。

### 考点映射（Prüfungsabbildung）

| Teilaufgabe | Inhaltsfeld / Inhaltlicher Schwerpunkt | AFB | Operator |
|---|---|:--:|---|
| a1 | `magnetischer Fluss`（$\Phi=BA\cos\theta$） | I/II | angeben, berechnen |
| a2 | `Kreisbewegung`（$\omega=2\pi n$）、`Generator` | I/II | berechnen |
| b1 | `Induktionsgesetz`（**微分形式**，GK 亦要求） | II | herleiten |
| b2 | `Wechselspannung`（Effektivwert） | II | berechnen, vergleichen |
| b3 | `Induktionsgesetz`（**平均变化率形式**） | II | berechnen |
| c1 | `Energierückgewinnung`、`Wirkungsgrad` | II | berechnen |
| c2 | Kräftegleichgewicht、`Leistung $P=Fv$` | II | berechnen |
| c3 | `Energiespeicherung`、Bewertungskompetenz（vorläufig） | II | überprüfen |

---

## 2. DE-Lösungsstandard（德国官方标准解题步骤）

> **写作模板（每步四要素）**：① **Was ist zu tun?**（德语指令，含 Operator） ② **Rechengang**（符号式 → 代入 → 中间结果，全程 Einheit；先精确后舍入） ③ **Antwortsatz**（德语完整句，带 Ergebnis + Einheit） ④ **Plausibilitätskontrolle**（每小问末步必写）

### Lösung zu a) — magnetischer Fluss und Drehbewegung

**Schritt a1 — Was ist zu tun?** *Modellannahmen formulieren und den magnetischen Fluss berechnen.*

- **Modellannahme:** Das Magnetfeld sei homogen, die Spulenfläche eben, der Winkel $\theta$ between Feldrichtung und Flächennormaler betrage bei $t=0$ null Grad.
- **Rechengang:**
  - Definition: $\Phi = B\cdot A\cdot\cos\theta$, Einheit $[\Phi]=1\ \mathrm{T\cdot m^2}=1\ \mathrm{Wb}=1\ \mathrm{V\,s}$.
  - Fläche: $A = 20{,}0\ \mathrm{cm^2} = 20{,}0\cdot 10^{-4}\ \mathrm{m^2} = 2{,}00\cdot 10^{-3}\ \mathrm{m^2}$.
  - $\Phi_\text{max} = B\cdot A\cdot\cos 0^\circ = 0{,}350\ \mathrm{T}\cdot 2{,}00\cdot 10^{-3}\ \mathrm{m^2}\cdot 1 = 7{,}00\cdot 10^{-4}\ \mathrm{Wb}$.
  - Bei $60^\circ$: $\Phi_{60^\circ} = 0{,}350\ \mathrm{T}\cdot 2{,}00\cdot 10^{-3}\ \mathrm{m^2}\cdot\cos 60^\circ = 7{,}00\cdot 10^{-4}\ \mathrm{Wb}\cdot 0{,}500 = 3{,}50\cdot 10^{-4}\ \mathrm{Wb}$.
- **Antwortsatz:** *„Der magnetische Fluss durch eine Windung beträgt maximal $\Phi_\text{max}=7{,}00\cdot 10^{-4}\ \mathrm{Wb}$; bei einem Winkel von $60^\circ$ zwischen Feldrichtung und Flächennormalen beträgt er $\Phi=3{,}50\cdot 10^{-4}\ \mathrm{Wb}$.“*
- **Plausibilitätskontrolle:** $\Phi_\text{max}$ liegt in der Größenordnung $10^{-4}\ \mathrm{Wb}$ — typisch für eine Spule von wenigen $\mathrm{cm^2}$ in einem Dauermagnetfeld von einigen $10^{-1}\ \mathrm T$; der Wert bei $60^\circ$ ist genau die Hälfte des Maximalwertes, wie es $\cos 60^\circ=0{,}5$ verlangt.

**Schritt a2 — Was ist zu tun?** *Die Bewegung mathematisieren: Bahngeschwindigkeit → Kreisfrequenz → Drehzahl → Periodendauer.*

- **Rechengang:**
  - $v = 20{,}0\ \mathrm{km/h} = \dfrac{20{,}0}{3{,}6}\ \mathrm{m/s} = 5{,}56\ \mathrm{m/s}$.
  - $\omega_\text{Rad} = \dfrac{v}{r} = \dfrac{5{,}556\ \mathrm{m/s}}{0{,}350\ \mathrm{m}} = 15{,}9\ \mathrm{rad/s}$.
  - $\omega_\text{Gen} = k\cdot\omega_\text{Rad} = 6{,}00\cdot 15{,}873\ \mathrm{rad/s} = 95{,}2\ \mathrm{rad/s}$ *(Zwischenwert ungerundet weiterverwendet: $95{,}24\ \mathrm{rad/s}$)*.
  - $n_\text{Rad} = \dfrac{\omega_\text{Rad}}{2\pi} = \dfrac{15{,}873}{6{,}283}\ \mathrm{s^{-1}} = 2{,}526\ \mathrm{s^{-1}} = 151{,}6\ \mathrm{min^{-1}} \approx 152\ \mathrm{min^{-1}}$.
  - $n_\text{Gen} = 6{,}00\cdot 151{,}6\ \mathrm{min^{-1}} = 909\ \mathrm{min^{-1}}$.
  - $T = \dfrac{2\pi}{\omega_\text{Gen}} = \dfrac{6{,}283}{95{,}24\ \mathrm{rad/s}} = 6{,}60\cdot 10^{-2}\ \mathrm s = 66{,}0\ \mathrm{ms}$.
- **Antwortsatz:** *„Das Laufrad dreht sich mit $n_\text{Rad}\approx 152\ \mathrm{min^{-1}}$, der Generatorläufer mit $n_\text{Gen}\approx 909\ \mathrm{min^{-1}}$; der magnetische Fluss verläuft periodisch mit der Periodendauer $T=66{,}0\ \mathrm{ms}$.“*
- **Plausibilitätskontrolle:** Bei einem Radumfang von $2\pi r=2{,}20\ \mathrm m$ macht das Rad $\frac{5{,}56}{2{,}20}=2{,}53$ Umdrehungen pro Sekunde — das entspricht $152\ \mathrm{min^{-1}}$ und ist für $20\ \mathrm{km/h}$ realistisch. Die Getriebeübersetzung $k=6{,}00$ liefert die erwartete sechsfache Läuferdrehzahl.

### Lösung zu b) — induzierte Spannung

**Schritt b1 — Was ist zu tun?** *Das Induktionsgesetz in der differentiellen Form anwenden und herleiten.*

- **Rechengang:**
  - Ansatz: $\Phi(t) = B\,A\cos(\omega t) = \Phi_\text{max}\cos(\omega t)$.
  - $\dfrac{\mathrm d\Phi}{\mathrm dt} = -\Phi_\text{max}\,\omega\sin(\omega t) = -B\,A\,\omega\sin(\omega t)$.
  - Induktionsgesetz: $U_\text{ind}(t) = -N\dfrac{\mathrm d\Phi}{\mathrm dt} = N\,B\,A\,\omega\sin(\omega t)$.
  - Amplitude: $U_\text{max} = N\,B\,A\,\omega$; Einheitenprobe: $[N\,B\,A\,\omega] = 1\cdot\mathrm T\cdot\mathrm{m^2}\cdot\mathrm{s^{-1}} = 1\ \mathrm{V}$.
  - Phasenbeziehung: $U_\text{ind}$ ist gegen $\Phi$ um $90^\circ$ phasenverschoben; bei maximalem Fluss ist die Induktionsspannung null.
  - **Lenz'sche Regel:** *„Das negative Vorzeichen im Induktionsgesetz bringt die lenzsche Regel zum Ausdruck: Die Induktionsspannung wirkt der Ursache ihrer Entstehung entgegen.“*
- **Antwortsatz:** *„Die induzierte Spannung verläuft sinusförmig, $U_\text{ind}(t)=N\,B\,A\,\omega\sin(\omega t)$, mit der Amplitude $U_\text{max}=N\,B\,A\,\omega$; sie ist gegenüber dem magnetischen Fluss um eine Viertelperiode phasenverschoben.“*
- **Plausibilitätskontrolle:** Für $\omega t=0$ folgt $U_\text{ind}=0$ bei $\Phi=\Phi_\text{max}$ — dies deckt sich mit der Wertetabelle in M1 ($t=0$: $\Phi=7{,}00\cdot10^{-4}\ \mathrm{Wb}$, $U_\text{ind}=0$).

**Schritt b2 — Was ist zu tun?** *Maximalwert und Effektivwert der Wechselspannung berechnen.*

- **Rechengang:**
  - $U_\text{max} = N\,B\,A\,\omega_\text{Gen} = 300\cdot 0{,}350\ \mathrm T\cdot 2{,}00\cdot 10^{-3}\ \mathrm{m^2}\cdot 95{,}24\ \mathrm{rad/s}$.
  - Zwischenschritt: $N\,B\,A = 300\cdot 7{,}00\cdot 10^{-4}\ \mathrm{Wb} = 0{,}2100\ \mathrm{Wb}$.
  - $U_\text{max} = 0{,}2100\ \mathrm{Wb}\cdot 95{,}24\ \mathrm{s^{-1}} = 20{,}0\ \mathrm V$.
  - $U_\text{eff} = \dfrac{U_\text{max}}{\sqrt{2}} = \dfrac{20{,}0\ \mathrm V}{1{,}414} = 14{,}1\ \mathrm V$.
- **Antwortsatz:** *„Die induzierte Wechselspannung erreicht den Maximalwert $U_\text{max}=20{,}0\ \mathrm V$; ihr Effektivwert beträgt $U_\text{eff}=14{,}1\ \mathrm V$.“*
- **Plausibilitätskontrolle (zweiter, unabhängiger Weg über die Lorentzkraft):** Die beiden aktiven Spulenseiten der Länge $l=5{,}0\ \mathrm{cm}$ bewegen sich auf dem Radius $d/2=2{,}0\ \mathrm{cm}$ mit $u=\omega_\text{Gen}\cdot\frac d2 = 95{,}24\ \mathrm{rad/s}\cdot 0{,}0200\ \mathrm m = 1{,}90\ \mathrm{m/s}$ senkrecht zum Feld. Damit $U = 2\,N\,B\,l\,u = 2\cdot 300\cdot 0{,}350\ \mathrm T\cdot 0{,}0500\ \mathrm m\cdot 1{,}90\ \mathrm{m/s} = 20{,}0\ \mathrm V$ — derselbe Wert. Außerdem stimmt er mit dem Tabellenwert $20{,}0\ \mathrm V$ in M1 überein.

**Schritt b3 — Was ist zu tun?** *Die mittlere Induktionsspannung über eine Vierteldrehung mit der mittleren Änderungsrate des Flusses berechnen.*

- **Rechengang:**
  - $\Delta t = \dfrac{T}{4} = \dfrac{66{,}0\ \mathrm{ms}}{4} = 16{,}5\ \mathrm{ms} = 1{,}65\cdot 10^{-2}\ \mathrm s$.
  - $|\Delta\Phi| = |\Phi_2-\Phi_1| = |0-7{,}00\cdot 10^{-4}\ \mathrm{Wb}| = 7{,}00\cdot 10^{-4}\ \mathrm{Wb}$.
  - $|\overline{U}_\text{ind}| = N\dfrac{|\Delta\Phi|}{\Delta t} = 300\cdot\dfrac{7{,}00\cdot 10^{-4}\ \mathrm{Wb}}{1{,}65\cdot 10^{-2}\ \mathrm s} = 300\cdot 4{,}24\cdot 10^{-2}\ \mathrm V = 12{,}7\ \mathrm V$.
  - Kontrolle mit dem exakten Mittelwert des Sinus: $\frac{2}{\pi}U_\text{max} = 0{,}6366\cdot 20{,}0\ \mathrm V = 12{,}7\ \mathrm V$.
- **Antwortsatz:** *„Während einer Vierteldrehung beträgt der Betrag der mittleren induzierten Spannung $|\overline{U}_\text{ind}|=12{,}7\ \mathrm V$; er liegt erwartungsgemäß unter dem Maximalwert von $20{,}0\ \mathrm V$.“*
- **Plausibilitätskontrolle:** Der Mittelwert muss zwischen null und dem Maximalwert liegen; das Verhältnis $\frac{12{,}7}{20{,}0}=0{,}637$ entspricht exakt $\frac{2}{\pi}$, dem Mittelwert des Betrages einer Sinusfunktion über eine Viertelperiode.

### Lösung zu c) — Leistung, Energie, Wirkungsgrad

**Schritt c1 — Was ist zu tun?** *Den Wirkungsgrad anwenden und die elektrische Energie über die Energieertrag-Beziehung $W=P\,t$ berechnen.*

- **Rechengang:**
  - $P_\text{el} = \eta\cdot P_\text{mech} = 0{,}720\cdot 150\ \mathrm W = 108\ \mathrm W$.
  - $t_F = 6{,}00\ \mathrm{min} = 360\ \mathrm s$.
  - $W_\text{el} = P_\text{el}\cdot t_F = 108\ \mathrm W\cdot 360\ \mathrm s = 3{,}888\cdot 10^{4}\ \mathrm J = 38{,}9\ \mathrm{kJ}$.
  - Umrechnung: $W_\text{el} = \dfrac{3{,}888\cdot 10^{4}\ \mathrm J}{3{,}600\cdot 10^{3}\ \mathrm{J/Wh}} = 10{,}8\ \mathrm{Wh}$.
  - Kontrollrechnung über die mechanische Seite: $W_\text{mech}=150\ \mathrm W\cdot 360\ \mathrm s = 54{,}0\ \mathrm{kJ}$; Verlust $W_\text{Verlust}=54{,}0\ \mathrm{kJ}-38{,}9\ \mathrm{kJ}=15{,}1\ \mathrm{kJ}$.
- **Antwortsatz:** *„Der Generator liefert eine elektrische Nutzleistung von $P_\text{el}=108\ \mathrm W$; auf der Gefällestrecke werden $W_\text{el}=38{,}9\ \mathrm{kJ}=10{,}8\ \mathrm{Wh}$ elektrische Energie zurückgewonnen.“*
- **Plausibilitätskontrolle:** Die mechanische Bremsleistung von $150\ \mathrm W$ liegt in der Größenordnung der Dauerleistung eines Menschen ($10^2\ \mathrm W$); die Verlustleistung von $42\ \mathrm W$ ($28\ \%$ der zugeführten Leistung) ist für Kupfer-, Eisen- und Gleichrichterverluste eines Klein generators realistisch.

**Schritt c2 — Was ist zu tun?** *Die Leistungsbeziehung $P=F\,v$ anwenden und das Kräftegleichgewicht am Hang aufstellen.*

- **Rechengang:**
  - Bremskraft des Generators: $F_B = \dfrac{P_\text{mech}}{v} = \dfrac{150\ \mathrm W}{5{,}556\ \mathrm{m/s}} = 27{,}0\ \mathrm N$.
  - Neigungswinkel: $\sin\alpha = \dfrac{\Delta h}{s} = \dfrac{100\ \mathrm m}{2{,}00\cdot 10^{3}\ \mathrm m} = 5{,}00\cdot 10^{-2}$ $(\alpha\approx 2{,}9^\circ)$.
  - Hangabtriebskraft: $F_H = m\,g\sin\alpha = 95{,}0\ \mathrm{kg}\cdot 9{,}81\ \mathrm{m/s^2}\cdot 5{,}00\cdot 10^{-2} = 46{,}6\ \mathrm N$.
  - Gleichgewicht bei konstanter Geschwindigkeit: $F_H = F_B + F_W \Rightarrow F_W = 46{,}6\ \mathrm N - 27{,}0\ \mathrm N = 19{,}6\ \mathrm N$.
- **Antwortsatz:** *„Der Generator übt eine Bremskraft von $F_B=27{,}0\ \mathrm N$ auf das Rad aus; bei konstanter Fahrgeschwindigkeit verbleiben $F_W=19{,}6\ \mathrm N$ für Roll- und Luftwiderstand.“*
- **Plausibilitätskontrolle:** Bei $20\ \mathrm{km/h}$ sind Roll- und Luftwiderstand zusammen in der Größenordnung $10^{1}\ \mathrm N$ realistisch ($\mu_r\approx 0{,}005\Rightarrow F_\text{roll}\approx 4{,}7\ \mathrm N$; Luftwiderstand $\approx 8\ \mathrm N$). Die Summe $F_B+F_W=46{,}6\ \mathrm N$ stimmt mit der Hangabtriebskraft überein — die Geschwindigkeit kann also tatsächlich konstant bleiben.

**Schritt c3 — Was ist zu tun?** *Die Werbeaussage quantitativ überprüfen (Soll-Ist-Vergleich).*

- **Rechengang:**
  - Ein Drittel der Akkukapazität: $\frac13 W_\text{Akku} = \frac13\cdot 500\ \mathrm{Wh} = 167\ \mathrm{Wh}$.
  - Tatsächlicher Ertrag: $W_\text{el} = 10{,}8\ \mathrm{Wh}$; Anteil $\dfrac{10{,}8\ \mathrm{Wh}}{500\ \mathrm{Wh}} = 2{,}16\cdot 10^{-2} = 2{,}2\ \%$.
  - Erforderliche Fahrtdauer für $167\ \mathrm{Wh}$: $t = \dfrac{167\ \mathrm{Wh}}{108\ \mathrm W} = 1{,}54\ \mathrm h = 92{,}6\ \mathrm{min}$.
  - Zugehörige Strecke: $s = v\cdot t = 20{,}0\ \mathrm{km/h}\cdot 1{,}54\ \mathrm h = 30{,}9\ \mathrm{km}$; zugehöriger Höhenunterschied $\Delta h = 30{,}9\ \mathrm{km}\cdot 5{,}00\cdot 10^{-2} = 1{,}55\ \mathrm{km}$.
  - Energiekontrolle über die Lageenergie: $W_\text{pot} = m\,g\,\Delta h = 95{,}0\ \mathrm{kg}\cdot 9{,}81\ \mathrm{m/s^2}\cdot 100\ \mathrm m = 93{,}2\ \mathrm{kJ}$; davon entfallen $\dfrac{38{,}9\ \mathrm{kJ}}{93{,}2\ \mathrm{kJ}} = 41{,}7\ \%$ auf den elektrischen Ertrag, $58\ \%$ auf den Generator und $42\ \mathrm{kJ}$ auf die Fahrwiderstände.
- **Antwortsatz:** *„Die Aussage ist in dieser Form nicht haltbar: Die zurückgewonnene Energie von $10{,}8\ \mathrm{Wh}$ entspricht nur $2{,}2\ \%$ der Akkukapazität und nicht einem Drittel; für ein Drittel wäre eine ununterbrochene Bergabfahrt von $30{,}9\ \mathrm{km}$ mit $1{,}55\ \mathrm{km}$ Höhenunterschied erforderlich.“*
- **Plausibilitätskontrolle:** Der elektrische Ertrag kann höchstens so groß sein wie die freigesetzte Lageenergie ($93{,}2\ \mathrm{kJ}$); der ermittelte Wert $38{,}9\ \mathrm{kJ}$ liegt mit $41{,}7\ \%$ plausibel darunter, weil ein Teil der Energie in die Fahrwiderstände geht.

---

### ⭐ 德国评分惯例 5 条（Bewertungskonventionen）

| Nr. | 惯例 | 德语落实写法 |
|:--:|---|---|
| ① | **Zwischenschritte 必须可见**：结果对但无过程 = 0 BE | 每题先写 `gegeben / gesucht / Ansatz`，Ansatz 用符号式（$U_\text{max}=N\,B\,A\,\omega$），再代数字；**公式本身就是 1–2 BE** |
| ② | **Einheit 全程**：每个 Zwischenergebnis 后跟单位 | $\Phi = 7{,}00\cdot10^{-4}\ \mathrm{Wb}$；$\omega = 95{,}2\ \mathrm{rad/s}$；$W_\text{el} = 38{,}9\ \mathrm{kJ}$；换算必写（$20{,}0\ \mathrm{cm^2}=2{,}00\cdot10^{-3}\ \mathrm{m^2}$） |
| ③ | **Antwortsatz 必写**：完整德语句 = Ergebnis + Einheit | *„Die induzierte Spannung beträgt …“* / *„Die Aussage ist nicht haltbar, weil …“*；无 Antwortsatz 通常扣 1 BE |
| ④ | **变量与 Modellannahmen 明确定义** | 开篇一句：*„Das Magnetfeld wird als homogen angenommen; $k$ bezeichnet das Übersetzungsverhältnis zwischen Rad und Läufer.“* |
| ⑤ | **图表必须 beschriftet**：Achsen + Einheit + Skala + Legende | 若自绘 $\Phi(t)$：横轴 $t$ in $\mathrm{ms}$，纵轴 $\Phi$ in $10^{-4}\ \mathrm{Wb}$，标 $T=66{,}0\ \mathrm{ms}$，曲线加 Legende |

---

## 3. 🇨🇳 CN-Methode vs DE-Standard（中德极速洞察技巧对比）

| 环节 | 中国技法（具体可操作） | 德国标准做法 | 合规性 | 在 Abitur 怎么用（且不丢分） |
|---|---|---|:--:|---|
| **① 设而不求**（符号化运算） | 先全用字母推到底再代数字：$U_\text{eff}=\frac{NBA\omega}{\sqrt2}$，比值类问题（$\eta=\frac{R_L}{R_i+R_L}$）直接约掉 $\omega$，根本不算数 | `Ansatz in Symbolen aufstellen, dann einsetzen`（先符号式，后代入） | ✅ | 写两行：**符号 Ansatz 一行 + 代入一行**。符号式本身就进 EHZ，代错数字也不丢这 1–2 BE |
| **② 特值 / 极限检验**（Grenzfallprobe） | 代入极端值看趋势：$v=0\Rightarrow U_\text{ind}=0$；$\Phi$ 恒定 $\Rightarrow U=0$；$R_L\to\infty\Rightarrow I=0$ 且 $P_\text{Nutz}=0$ | `Plausibilitätskontrolle / Größenordnungsabschätzung`，写成一句完整德语 | ✅ | **只写在“Kontrolle”一句里**，不进主 Rechengang：`Für v = 0 m/s ergibt sich U_ind = 0 V, wie zu erwarten.` —— 白送 1 BE |
| **③ 量纲检验**（Dimensionsprobe） | 代入数字前先乘除单位：$[NBA\omega]=\mathrm{T\,m^2\,s^{-1}}=\mathrm{V}$；$[\Delta\Phi/\Delta t]=\mathrm{Wb/s}=\mathrm{V}$ | `Einheitenprobe` / `Dimensionskontrolle`，须写在 Rechengang 里 | ✅ | 在 Ansatz 后加半句：`Die Einheitenprobe ergibt V, der Ansatz ist damit dimensionsrichtig.` |
| **④ 对称与换元化简** | 换元 $\varphi=\omega t$ 把时间换成无量纲相位；利用正弦/余弦的 $90^\circ$ 相位差直接判「$\Phi$ 最大 $\Leftrightarrow U=0$」 | `Zusammenhang herleiten`（$\Phi(t)\to U_\text{ind}(t)$ 明确求导）、`Phasenverschiebung benennen` | ✅ | 求导过程**必须写出来**（`herleiten` 的踩分点就是那一步微分），换元只作为验算句；别只写结论 |
| **⑤ 结果反代验证**（Rückprobe） | 把 $U_\text{max}$ 反代回 $U(t)$：在 $\omega t=\frac\pi2$ 得 $20{,}0\ \mathrm V$ ✓；功率反代：$P\,t=W$，$108\ \mathrm W\cdot360\ \mathrm s=38{,}9\ \mathrm{kJ}$ ✓ | `Probe durch Rücksubstitution` / `zweiter Lösungsweg`（如 Lorentzkraft 独立路径） | ✅ | 写成**第二个独立解法**最有价值（§2 b2 的 Lorentzkraft 验算），EHZ 常有「Kontrolle」专项分 |
| **⑥ 估算定位答案区间**（Überschlag） | 先估量级：$0{,}21\cdot95\approx20\ \mathrm V$；$150\ \mathrm W\cdot360\ \mathrm s\approx5{,}4\cdot10^4\ \mathrm J$；先定位再精算 | `Größenordnungsabschätzung`，**只能作为 Kontrolle，不能替代 Rechengang** | ⚠️（单独用会丢分） | 心算写在草稿纸，**卷面仍写完整 Rechengang**；在答案后加一句 `Der Wert liegt in der erwarteten Größenordnung von 10^1 V.` |
| **⑦ 数形结合**（图解法） | $\Phi$-$t$ 图：**斜率** $=U_\text{ind}/N$，**面积**无意义；$U$-$t$ 图：峰值读 $U_\text{max}$，$\frac1{\sqrt2}$ 峰值读 $U_\text{eff}$；割线斜率 = 平均值，切线斜率 = 瞬时值 | `grafische Auswertung`：Achsen + Einheit + Skala + Legende 缺一不可；`Sekantensteigung` vs `Tangentensteigung` 要区分 | ✅ | 读图题先写「Achse + Einheit」再读值；**用割线还是切线必须用德语点名**，这是最常见的过程分 |
| **⑧ 心算跳步 / 只写答案**（Kopfrechnen） | 中国卷：熟练者直接写数值，过程可在草稿 | ❌ **Ergebnis ohne Rechengang = 0 BE**（德国阅卷按 EHZ 步骤给分，结果不是给分点） | ⚠️ **不合规** | 改写成「三行式」：① 符号 Ansatz（$U_\text{max}=NBA\omega$）② 代入含单位（$0{,}2100\ \mathrm{Wb}\cdot95{,}24\ \mathrm{s^{-1}}$）③ Antwortsatz。三行 ≤ 30 秒，**比心算快且拿满分** |

> **一句话**：中国技法负责**算得快、算得对**，德国标准负责**写得出来、拿得到分**。凡心算跳步，一律补「符号式 + 代入式 + Antwortsatz」三行；凡估算，一律降级为末尾的 Plausibilitätskontrolle。

---

## 4. Fehlerquellen（扣分避坑要点）

| # | 坑 | 典型表现 | 丢分后果 | 规避动作（德语动作指令） |
|:--:|---|---|---|---|
| 1 | **单位缺失或换算错** | $20\ \mathrm{cm^2}$ 直接当 $0{,}20\ \mathrm{m^2}$；$20\ \mathrm{km/h}$ 不除 $3{,}6$；$\mathrm{Wh}$ 与 $\mathrm J$ 混用 | 整题连锁错，常丢 4–6 BE | `Alle Größen vor dem Einsetzen in SI-Einheiten umrechnen und die Umrechnung hinschreiben: A = 20,0 cm² = 2,00·10⁻³ m².` |
| 2 | **过早舍入**（Zwischenrundung） | $\omega_\text{Gen}=95\ \mathrm{rad/s}$ 就代进去，$\omega_\text{Rad}=16\ \mathrm{rad/s}$ 再乘 6 得 $96$ → $U_\text{max}=20{,}2\ \mathrm V$ | 末位偏差，Effektivwert 全错 | `Zwischenergebnisse ungerundet weiterverwenden und erst das Endergebnis runden.` |
| 3 | **无 Antwortsatz** | 只写 `$U_\text{max}=20\ \mathrm V$`，没有完整德语句 | 每题扣 1 BE，全卷可丢 3–4 BE | `Jedes Teilergebnis in einem vollständigen Antwortsatz mit Größe, Zahlenwert und Einheit formulieren.` |
| 4 | **变量未定义** | $k$、$N$、$\omega_\text{Gen}$、$\eta$ 直接用；$\omega_\text{Rad}$ 与 $\omega_\text{Gen}$ 混为一谈 | AFB II 过程分减半 | `Alle Formelzeichen mit Einheit in einer Variablenliste definieren und Rad- von Läufergrößen unterscheiden.` |
| 5 | **图表无标注** | 画 $\Phi(t)$ 只写 $\Phi$ 和 $t$，无单位、无刻度、无 Legende | 图表题直接扣 2–3 BE | `Achsen mit Größe und Einheit beschriften, Skala und Legendeneintrag ergänzen.` |
| 6 | **Modellannahmen 未说明** | 默认磁场均匀、传动无滑差、速度恒定，却一字不写 | AFB II/III 的「建模」分丢失 | `Die Modellannahmen zu Beginn benennen: homogenes Feld, schlupffreies Getriebe, sinusförmiger Verlauf.` |
| 7 | **只给结果不给解释** | `herleiten` 只写 $U_\text{ind}=NBA\omega\sin\omega t$，跳过 $\mathrm d\Phi/\mathrm dt$；`begründen` 只说「因为感应」 | `herleiten` 几乎 0 BE | `Den Zwischenschritt der Ableitung ausschreiben und jeden Schritt begründen.` |
| 8 | **德语专业词拼写** | `Grosse`  statt **Größe**；`Einheit` 写成 `Einheiten`；`Skala` 拼错；`Wirkungsgrad` / `Flussdichte` / `Windungszahl` 拼漏字母 | 表达分被扣，术语密集段落尤甚 | `Die Fachbegriffe Größe, Einheit, Skala, Wirkungsgrad, Flussdichte, Windungszahl korrekt schreiben.` |
| 9 | **有效数字不当**（gültige Ziffern） | 输入 $0{,}350\ \mathrm T$（3 位）却答 $U_\text{eff}=14{,}142\ \mathrm V$（5 位）；或反之下取整 | 结果分扣 1 BE | `Das Endergebnis mit der kleinsten Anzahl gültiger Ziffern der Eingangsdaten angeben (hier drei).` |
| 10 | **符号混淆**（$\Delta$ vs $\mathrm d$、$U$ vs $u$、$K$ vs $k$、$N$ vs $n$） | $\frac{\Delta\Phi}{\Delta t}$ 与 $\frac{\mathrm d\Phi}{\mathrm dt}$ 混用；$u$（Umfangsgeschwindigkeit）写成 $U$；$n$（Drehzahl）写成 $N$（Windungszahl） | 概念性错误，AFB II 丢分 | `Δ für endliche Differenzen, d für Differentiale verwenden; U für Spannung, u für Geschwindigkeit; N für Windungszahl, n für Drehzahl.` |
| 11 | **术语性别错**（der/die/das） | *die* Fluss / *der* Spannung / *das* Kraft | 德语表达分（Sprachrichtigkeit）被扣 | `Merke: der magnetische Fluss, die Induktionsspannung, die Lorentzkraft, der Wirkungsgrad, die Windungszahl, die Flussdichte, das Magnetfeld, die Drehzahl, der Energieertrag.` |
| 12 | **$\Phi$ 与 $B$ 混为一谈 / 相位错** | 认为 $\Phi$ 最大时 $U_\text{ind}$ 最大；把「阻碍变化」说成「阻止变化」 | 概念错，Lenz 题整问丢分 | `Φ = B·A·cos θ ist der Fluss, B die Flussdichte; U_ind ist maximal, wenn Φ = 0 ist. Nach der lenzschen Regel wird die Änderung gehemmt, nicht verhindert.` |

---

## 5. Drei Varianten（3 道变式题）

### Variante A — 数据变（Zahlen variiert, Methode identisch）

**德文题干**

> Ein zweites Pedelec nutzt den Generator „VeloDrive NG-500" mit $N=500$ Windungen, $A=15{,}0\ \mathrm{cm^2}$, $B=0{,}280\ \mathrm T$ und der Übersetzung $k=5{,}00$. Der Radradius beträgt weiterhin $r=0{,}350\ \mathrm m$, die Fahrgeschwindigkeit $v=15{,}0\ \mathrm{km/h}$, der Wirkungsgrad $\eta=0{,}680$, die mechanische Leistungsaufnahme $P_\text{mech}=120\ \mathrm W$, die Fahrtdauer $t=8{,}00\ \mathrm{min}$.
> a) Berechnen Sie den maximalen magnetischen Fluss durch eine Windung. *(2 BE)*
> b) Berechnen Sie die Kreisfrequenz und die Drehzahl des Generatorläufers sowie die Periodendauer. *(4 BE)*
> c) Berechnen Sie $U_\text{max}$, $U_\text{eff}$ und den Betrag der mittleren Induktionsspannung während einer Vierteldrehung. *(6 BE)*
> d) Berechnen Sie die elektrische Nutzleistung, den Energieertrag in $\mathrm{Wh}$ sowie die Bremskraft. *(4 BE)*

**变化点说明**：仅更换数值（$N,A,B,k,v,\eta,P_\text{mech},t$），**方法链完全不变**；新增 $\overline{U}$ 与 $F_B$ 的组合问法，训练「一题多问」的分步给分。

**BE：16 BE**

**完整解答**

- **a)** $A = 15{,}0\ \mathrm{cm^2} = 1{,}50\cdot 10^{-3}\ \mathrm{m^2}$
  $\Phi_\text{max} = B\,A = 0{,}280\ \mathrm T\cdot 1{,}50\cdot 10^{-3}\ \mathrm{m^2} = 4{,}20\cdot 10^{-4}\ \mathrm{Wb}$
  *Antwortsatz:* „Der maximale magnetische Fluss durch eine Windung beträgt $\Phi_\text{max}=4{,}20\cdot 10^{-4}\ \mathrm{Wb}$.“
- **b)** $v = \frac{15{,}0}{3{,}6}\ \mathrm{m/s} = 4{,}17\ \mathrm{m/s}$ → $\omega_\text{Rad} = \frac{4{,}167\ \mathrm{m/s}}{0{,}350\ \mathrm m} = 11{,}9\ \mathrm{rad/s}$
  $\omega_\text{Gen} = 5{,}00\cdot 11{,}905\ \mathrm{rad/s} = 59{,}5\ \mathrm{rad/s}$
  $n_\text{Gen} = \frac{\omega_\text{Gen}}{2\pi} = \frac{59{,}524}{6{,}283}\ \mathrm{s^{-1}} = 9{,}47\ \mathrm{s^{-1}} = 568\ \mathrm{min^{-1}}$
  $T = \frac{2\pi}{\omega_\text{Gen}} = \frac{6{,}283}{59{,}524\ \mathrm{rad/s}} = 0{,}1056\ \mathrm s = 106\ \mathrm{ms}$
  *Antwortsatz:* „Der Läufer dreht mit $n_\text{Gen}=568\ \mathrm{min^{-1}}$ ($\omega_\text{Gen}=59{,}5\ \mathrm{rad/s}$); die Periodendauer beträgt $T=106\ \mathrm{ms}$.“
- **c)** $N\,B\,A = 500\cdot 4{,}20\cdot 10^{-4}\ \mathrm{Wb} = 0{,}2100\ \mathrm{Wb}$
  $U_\text{max} = N\,B\,A\,\omega_\text{Gen} = 0{,}2100\ \mathrm{Wb}\cdot 59{,}524\ \mathrm{s^{-1}} = 12{,}5\ \mathrm V$
  $U_\text{eff} = \frac{12{,}5\ \mathrm V}{\sqrt2} = 8{,}84\ \mathrm V$
  $\Delta t = \frac{T}{4} = \frac{0{,}1056\ \mathrm s}{4} = 2{,}64\cdot 10^{-2}\ \mathrm s$
  $|\overline{U}_\text{ind}| = N\frac{|\Delta\Phi|}{\Delta t} = 500\cdot\frac{4{,}20\cdot 10^{-4}\ \mathrm{Wb}}{2{,}64\cdot 10^{-2}\ \mathrm s} = 7{,}96\ \mathrm V$ （Kontrolle: $\frac2\pi U_\text{max}=7{,}96\ \mathrm V$）
  *Antwortsatz:* „Es ergeben sich $U_\text{max}=12{,}5\ \mathrm V$, $U_\text{eff}=8{,}84\ \mathrm V$ und $|\overline{U}_\text{ind}|=7{,}96\ \mathrm V$.“
- **d)** $P_\text{el} = \eta\,P_\text{mech} = 0{,}680\cdot 120\ \mathrm W = 81{,}6\ \mathrm W$
  $t = 8{,}00\ \mathrm{min} = 480\ \mathrm s$ → $W_\text{el} = 81{,}6\ \mathrm W\cdot 480\ \mathrm s = 3{,}92\cdot 10^{4}\ \mathrm J = 10{,}9\ \mathrm{Wh}$
  $F_B = \frac{P_\text{mech}}{v} = \frac{120\ \mathrm W}{4{,}167\ \mathrm{m/s}} = 28{,}8\ \mathrm N$
  *Antwortsatz:* „Die elektrische Nutzleistung beträgt $81{,}6\ \mathrm W$, der Energieertrag $10{,}9\ \mathrm{Wh}$ und die Bremskraft $28{,}8\ \mathrm N$.“
- **Plausibilitätskontrolle:** $s = v\,t = 4{,}167\ \mathrm{m/s}\cdot 480\ \mathrm s = 2{,}00\ \mathrm{km}$ — trotz geringerer Geschwindigkeit dieselbe Strecke wie im Prototyp, weil die Fahrtdauer länger ist. Da $\omega\propto v$ und $v$ um $25\ \%$ kleiner ist als im Prototyp, muss $U_\text{max}\propto v$ ebenfalls kleiner sein: $\frac{15}{20}\cdot\frac{5{,}00}{6{,}00}\cdot\frac{0{,}2100}{0{,}2100}\cdot 20{,}0\ \mathrm V = 12{,}5\ \mathrm V$ ✓

**中文点评**：陷阱在 **$N\,B\,A$ 恰好又等于 $0{,}2100\ \mathrm{Wb}$**——容易照抄原型结论而不重算；正确做法是**每道题都重列符号式再代入**。迁移点是「$\omega\propto v$、$U\propto\omega$」的**正比链**，可用比例法 3 秒估出 $U_\text{max}$ 的量级再精算。单位上 $15{,}0\ \mathrm{cm^2}=1{,}50\cdot10^{-3}\ \mathrm{m^2}$ 是老坑。

---

### Variante B — 条件/情境变（Innenwiderstand und Leerlaufverluste：重新建模）

**德文题干**

> Derselbe Generator wie im Prototyp ($N=300$, $A=20{,}0\ \mathrm{cm^2}$, $B=0{,}350\ \mathrm T$, $k=6{,}00$, $r=0{,}350\ \mathrm m$) wird nun **realistischer modelliert**: Die Spule besitzt den ohmschen Innenwiderstand $R_i=2{,}0\ \Omega$ und speist einen Lastwiderstand $R_L=10\ \Omega$. Zusätzlich treten mechanische Leerlaufverluste (Lager- und Reibungsverluste) der Leistung $P_R=6{,}0\ \mathrm W$ auf. Der Fahrer bremst von $20{,}0\ \mathrm{km/h}$ gleichmäßig auf $12{,}0\ \mathrm{km/h}$ ab.
> **Modellannahme:** Der gleichgerichtete Verlauf wird durch den **Effektivwert** ersetzt; für die zeitlich veränderliche Geschwindigkeit wird mit der mittleren Geschwindigkeit $\overline v = 16{,}0\ \mathrm{km/h}$ gerechnet.
> a) Begründen Sie, warum diese Modellannahme für die Spannung zulässig ist, für die Leistung jedoch nur näherungsweise gilt. *(3 BE)*
> b) Berechnen Sie mit $\overline v$ die Kreisfrequenz des Läufers, $U_\text{max}$ und $U_\text{eff}$. *(4 BE)*
> c) Berechnen Sie die Stromstärke $I$, die Klemmenspannung $U_\text{Kl}$, die Nutzleistung $P_\text{Nutz}=I^2R_L$, die Kupferverlustleistung $P_\text{Cu}=I^2R_i$ und den elektrischen Wirkungsgrad $\eta_\text{el}$. *(5 BE)*
> d) Berechnen Sie die insgesamt dem Rad entzogene mechanische Leistung, den Gesamtwirkungsgrad $\eta_\text{ges}$ und die Bremskraft. Vergleichen Sie mit dem Prototyp. *(4 BE)*

**变化点说明**：原型把发电机当作**固定效率的黑箱**（$\eta=0{,}720$ 给定）；本变式**打开黑箱**——引入内阻分压、负载匹配、空载损耗，效率**由负载决定而非常数**；且速度不再恒定，须先做「平均值」建模。

**BE：16 BE**

**完整解答**

- **a)** $U_\text{eff}\propto\omega\propto v$：**线性**关系，故 $v$ 的时间平均可直接代入，$U(\overline v)$ 是精确的时间平均。而 $P_\text{Nutz}=I^2R_L\propto U^2\propto v^2$：**平方**关系，时间平均 $\overline{v^2}\neq\overline v^{\,2}$。
  *Antwortsatz:* „Wegen $U_\text{eff}\propto v$ darf die mittlere Geschwindigkeit für die Spannung verwendet werden; wegen $P\propto v^2$ gilt dies für die Leistung nur näherungsweise.“
  **Zusatz (Kontrolle):** $\overline{v^2}=\frac{v_1^2+v_1v_2+v_2^2}{3}=\frac{(5{,}556)^2+5{,}556\cdot3{,}333+(3{,}333)^2}{3}\ \mathrm{m^2/s^2}=20{,}2\ \mathrm{m^2/s^2}$ → $v_\text{eff}=\sqrt{20{,}2}=4{,}49\ \mathrm{m/s}$ statt $\overline v=4{,}44\ \mathrm{m/s}$; die Leistung wird damit um $\left(\frac{4{,}49}{4{,}44}\right)^2-1=2{,}1\ \%$ unterschätzt.
- **b)** $\overline v = \frac{16{,}0}{3{,}6}\ \mathrm{m/s} = 4{,}44\ \mathrm{m/s}$ → $\omega_\text{Rad} = \frac{4{,}444\ \mathrm{m/s}}{0{,}350\ \mathrm m} = 12{,}7\ \mathrm{rad/s}$
  $\omega_\text{Gen} = 6{,}00\cdot 12{,}698\ \mathrm{rad/s} = 76{,}2\ \mathrm{rad/s}$
  $U_\text{max} = N\,B\,A\,\omega_\text{Gen} = 0{,}2100\ \mathrm{Wb}\cdot 76{,}190\ \mathrm{s^{-1}} = 16{,}0\ \mathrm V$
  $U_\text{eff} = \frac{16{,}0\ \mathrm V}{\sqrt2} = 11{,}3\ \mathrm V$
  *Antwortsatz:* „Bei der mittleren Geschwindigkeit ergeben sich $\omega_\text{Gen}=76{,}2\ \mathrm{rad/s}$, $U_\text{max}=16{,}0\ \mathrm V$ und $U_\text{eff}=11{,}3\ \mathrm V$.“
- **c)** $I = \frac{U_\text{eff}}{R_i+R_L} = \frac{11{,}314\ \mathrm V}{2{,}0\ \Omega+10\ \Omega} = \frac{11{,}314\ \mathrm V}{12{,}0\ \Omega} = 0{,}943\ \mathrm A$
  $U_\text{Kl} = I\,R_L = 0{,}9428\ \mathrm A\cdot 10\ \Omega = 9{,}43\ \mathrm V$ （Probe: $U_\text{eff}-I R_i = 11{,}31\ \mathrm V-1{,}89\ \mathrm V = 9{,}43\ \mathrm V$ ✓）
  $P_\text{Nutz} = I^2R_L = (0{,}9428\ \mathrm A)^2\cdot 10\ \Omega = 8{,}89\ \mathrm W$
  $P_\text{Cu} = I^2R_i = (0{,}9428\ \mathrm A)^2\cdot 2{,}0\ \Omega = 1{,}78\ \mathrm W$
  $P_\text{Quelle} = U_\text{eff}\,I = 11{,}314\ \mathrm V\cdot 0{,}9428\ \mathrm A = 10{,}7\ \mathrm W$ （Probe: $8{,}89\ \mathrm W+1{,}78\ \mathrm W = 10{,}67\ \mathrm W$ ✓）
  $\eta_\text{el} = \frac{P_\text{Nutz}}{P_\text{Quelle}} = \frac{8{,}889\ \mathrm W}{10{,}667\ \mathrm W} = 0{,}833 = 83{,}3\ \%$ （Kontrolle: $\frac{R_L}{R_i+R_L}=\frac{10}{12}=83{,}3\ \%$ ✓）
  *Antwortsatz:* „Es fließt ein Strom von $0{,}943\ \mathrm A$; die Klemmenspannung beträgt $9{,}43\ \mathrm V$, die Nutzleistung $8{,}89\ \mathrm W$, die Kupferverlustleistung $1{,}78\ \mathrm W$ und der elektrische Wirkungsgrad $83{,}3\ \%$.“
- **d)** $P_\text{mech} = P_\text{Quelle}+P_R = 10{,}7\ \mathrm W+6{,}0\ \mathrm W = 16{,}7\ \mathrm W$
  $\eta_\text{ges} = \frac{P_\text{Nutz}}{P_\text{mech}} = \frac{8{,}889\ \mathrm W}{16{,}667\ \mathrm W} = 0{,}533 = 53{,}3\ \%$
  $F_B = \frac{P_\text{mech}}{\overline v} = \frac{16{,}667\ \mathrm W}{4{,}444\ \mathrm{m/s}} = 3{,}75\ \mathrm N$
  *Antwortsatz:* „Dem Rad werden $P_\text{mech}=16{,}7\ \mathrm W$ entzogen; der Gesamtwirkungsgrad beträgt $53{,}3\ \%$ und die Bremskraft $3{,}75\ \mathrm N$.“
- **Plausibilitätskontrolle und Vergleich:** Der Gesamtwirkungsgrad ($53{,}3\ \%$) liegt **unter** dem Pauschalwert des Prototyps ($72{,}0\ \%$), weil die Leerlaufverluste bei kleiner Last stark ins Gewicht fallen. Die Brem skraft ist mit $3{,}75\ \mathrm N$ deutlich kleiner als die $27{,}0\ \mathrm N$ des Prototyps — im Einklang mit der um mehr als eine Größenordnung kleineren Nutzleistung $(8{,}89\ \mathrm W \ll 108\ \mathrm W)$.

**中文点评**：两处陷阱——① **效率不是常数**：$\eta_\text{el}=\frac{R_L}{R_i+R_L}$ 只由电阻比决定，与转速**无关**，而 $\eta_\text{ges}$ 随负载下降（空载损耗占比上升）；② **线性量与平方量的平均不能混用**：电压可用 $\overline v$，功率必须用 $\overline{v^2}$（本题偏差 $2{,}1\ \%$，速度变化越大偏差越大）。迁移点：**最大功率传输条件 $R_L=R_i$**（可作延伸追问），与「电源—内阻—负载」建模范式。德语上要区分 `Klemmenspannung`（端电压）与 `Urspannung`/`Quellenspannung`。

---

### Variante C — 迁移/综合（E-Lastenrad im Kurzstrecken-Lieferverkehr + AFB III）

**德文题干**

> Ein E-Lastenrad der fiktiven Firma „CargoVelo" ($m_\text{ges}=140\ \mathrm{kg}$ inklusive Fahrer und Ladung, $r=0{,}350\ \mathrm m$) fährt im innerstädtischen Lieferverkehr. An jedem Lieferstopp wird es mit der Rekuperationsbremse von $v=20{,}0\ \mathrm{km/h}$ bis zum Stillstand abgebremst. Der Generator hat $N=750$ Windungen, $A=25{,}0\ \mathrm{cm^2}$, $B=0{,}350\ \mathrm T$, $k=5{,}00$; der Wirkungsgrad der Wandlung beträgt $\eta=0{,}720$, die mechanische Bremsleistung des Generators $P_\text{mech}=150\ \mathrm W$. Der Akku hat eine Nennspannung von $36\ \mathrm V$ und eine Kapazität von $500\ \mathrm{Wh}$.
> a) Berechnen Sie den maximalen magnetischen Fluss, die Kreisfrequenz des Läufers, $U_\text{max}$ und $U_\text{eff}$ bei $20{,}0\ \mathrm{km/h}$. *(6 BE)*
> b) Ein Ladestrom fließt nur, wenn der Effektivwert die Akkunennspannung übersteigt. Berechnen Sie die Grenzgeschwindigkeit $v_\text{min}$, unterhalb derer ohne Hochsetzsteller nicht mehr geladen werden kann. *(4 BE)*
> c) Berechnen Sie die je Bremsung zurückgewonnene elektrische Energie (in $\mathrm{kJ}$), den Energieertrag pro Tag bei $60$ Stopps (in $\mathrm{Wh}$) und dessen Anteil an der Akkukapazität. *(5 BE)*
> d) Berechnen Sie Bremsdauer und Bremsweg dieser rein rekuperativen Bremsung und prüfen Sie die Plausibilität. *(2 BE)*
> e) **Bewerten** Sie, ob sich Rekuperation für dieses E-Lastenrad lohnt. Der Hersteller beziffert die Mehrkosten mit $180\ \mathrm{€}$ und das Mehrgewicht mit $2{,}5\ \mathrm{kg}$; die eingesparten Bremsbelagkosten werden mit etwa $50\ \mathrm{€/a}$ angegeben, der Strompreis beträgt $0{,}35\ \mathrm{€/kWh}$, der Einsatz an $250$ Tagen pro Jahr. *(5 BE)*

**变化点说明**：情境从「下坡回收**势能**」迁移到「城市配送回收**动能**」；新增**充电门槛电压**这一边界条件（$U_\text{eff}>U_\text{Akku}$），并要求 AFB III 经济—技术综合评价。

**BE：22 BE**

**完整解答**

- **a)** $A = 25{,}0\ \mathrm{cm^2} = 2{,}50\cdot 10^{-3}\ \mathrm{m^2}$；$\Phi_\text{max} = 0{,}350\ \mathrm T\cdot 2{,}50\cdot 10^{-3}\ \mathrm{m^2} = 8{,}75\cdot 10^{-4}\ \mathrm{Wb}$
  $\omega_\text{Rad} = \frac{5{,}556\ \mathrm{m/s}}{0{,}350\ \mathrm m} = 15{,}9\ \mathrm{rad/s}$；$\omega_\text{Gen} = 5{,}00\cdot 15{,}873\ \mathrm{rad/s} = 79{,}4\ \mathrm{rad/s}$
  $N\,B\,A = 750\cdot 8{,}75\cdot 10^{-4}\ \mathrm{Wb} = 0{,}6563\ \mathrm{Wb}$
  $U_\text{max} = 0{,}6563\ \mathrm{Wb}\cdot 79{,}365\ \mathrm{s^{-1}} = 52{,}1\ \mathrm V$；$U_\text{eff} = \frac{52{,}1\ \mathrm V}{\sqrt2} = 36{,}8\ \mathrm V$
  *Antwortsatz:* „Bei $20{,}0\ \mathrm{km/h}$ ergeben sich $\Phi_\text{max}=8{,}75\cdot 10^{-4}\ \mathrm{Wb}$, $\omega_\text{Gen}=79{,}4\ \mathrm{rad/s}$, $U_\text{max}=52{,}1\ \mathrm V$ und $U_\text{eff}=36{,}8\ \mathrm V$.“
- **b)** Bedingung: $U_\text{eff} = \frac{N\,B\,A\,\omega_\text{Gen}}{\sqrt2} \ge 36\ \mathrm V \Rightarrow U_\text{max} \ge 36\ \mathrm V\cdot\sqrt2 = 50{,}9\ \mathrm V$
  $\omega_\text{Gen,min} = \frac{50{,}91\ \mathrm V}{0{,}6563\ \mathrm{Wb}} = 77{,}6\ \mathrm{rad/s}$ → $\omega_\text{Rad,min} = \frac{77{,}58}{5{,}00}\ \mathrm{rad/s} = 15{,}5\ \mathrm{rad/s}$
  $v_\text{min} = \omega_\text{Rad,min}\cdot r = 15{,}516\ \mathrm{rad/s}\cdot 0{,}350\ \mathrm m = 5{,}43\ \mathrm{m/s} = 19{,}6\ \mathrm{km/h}$
  *Antwortsatz:* „Unterhalb von $v_\text{min}\approx 19{,}6\ \mathrm{km/h}$ liegt der Effektivwert unter der Akkunennspannung, sodass ohne Hochsetzsteller kein Ladestrom mehr fließt.“
- **c)** $E_\text{kin} = \frac12 m v^2 = \frac12\cdot 140\ \mathrm{kg}\cdot (5{,}556\ \mathrm{m/s})^2 = 2{,}16\ \mathrm{kJ}$
  $W_\text{el,1} = \eta\,E_\text{kin} = 0{,}720\cdot 2{,}160\ \mathrm{kJ} = 1{,}56\ \mathrm{kJ} = 0{,}432\ \mathrm{Wh}$
  Pro Tag: $W_\text{el,d} = 60\cdot 1{,}556\ \mathrm{kJ} = 93{,}3\ \mathrm{kJ} = 25{,}9\ \mathrm{Wh}$
  Anteil: $\frac{25{,}9\ \mathrm{Wh}}{500\ \mathrm{Wh}} = 5{,}19\ \mathrm{\%}$
  *Antwortsatz:* „Je Bremsung werden $1{,}56\ \mathrm{kJ}$ zurückgewonnen; bei $60$ Stopps entspricht das einem Energieertrag von $25{,}9\ \mathrm{Wh}$ pro Tag bzw. $5{,}2\ \%$ der Akkukapazität.“
- **d)** $t_B = \frac{W_\text{mech}}{P_\text{mech}} = \frac{2{,}160\ \mathrm{kJ}}{150\ \mathrm W} = 14{,}4\ \mathrm s$；$\overline v = \frac{5{,}556\ \mathrm{m/s}}{2} = 2{,}78\ \mathrm{m/s}$
  $s_B = \overline v\cdot t_B = 2{,}778\ \mathrm{m/s}\cdot 14{,}40\ \mathrm s = 40{,}0\ \mathrm m$；$a = \frac{\Delta v}{t_B} = \frac{5{,}556\ \mathrm{m/s}}{14{,}40\ \mathrm s} = 0{,}386\ \mathrm{m/s^2}$
  *Antwortsatz:* „Die rein rekuperative Bremsung dauert $14{,}4\ \mathrm s$ und erfordert einen Bremsweg von $40{,}0\ \mathrm m$.“
  *Plausibilitätskontrolle:* $a = 0{,}386\ \mathrm{m/s^2}$ entspricht nur $3{,}9\ \%$ der Fallbeschleunigung — eine sehr sanfte Verzögerung, wie sie für eine rein elektrische Bremsung typisch ist; im realen Betrieb wird sie durch die mechanische Bremse ergänzt.
- **e) Bewertung — Kriterium → Abwägung → Urteil**
  - **Kriterium 1 (Energieertrag):** $W_\text{el,d}=25{,}9\ \mathrm{Wh}$; bei $250$ Einsatztagen $W_\text{el,a}=25{,}9\ \mathrm{Wh}\cdot250 = 6{,}48\ \mathrm{kWh/a}$; Stromkostenersparnis $6{,}48\ \mathrm{kWh/a}\cdot0{,}35\ \mathrm{€/kWh} = 2{,}27\ \mathrm{€/a}$.
  - **Kriterium 2 (Verschleiß):** Die Rekuperationsbremse übernimmt bei $60$ Bremsungen pro Tag einen erheblichen Teil der Bremsarbeit; der Hersteller beziffert die Einsparung bei den Bremsbelägen mit etwa $50\ \mathrm{€/a}$.
  - **Kriterium 3 (Gegenkosten und Nebenwirkungen):** Mehrkosten $180\ \mathrm{€}$; Mehrgewicht $2{,}5\ \mathrm{kg}$ → zusätzlicher Energiebedarf je $100\ \mathrm m$ Steigung $\Delta W = 2{,}5\ \mathrm{kg}\cdot9{,}81\ \mathrm{m/s^2}\cdot100\ \mathrm m = 2{,}45\ \mathrm{kJ} = 0{,}68\ \mathrm{Wh}$. Bei vollem oder kaltem Akku fällt die Rekuperation aus; die mechanische Bremse muss daher jederzeit die volle Bremsleistung übernehmen können (Sicherheitsaspekt).
  - **Kriterium 4 (technische Grenze):** Nach b) wirkt die Rekuperation nur oberhalb von $19{,}6\ \mathrm{km/h}$; im innerstädtischen Lieferverkehr wird diese Schwelle häufig unterschritten.
  - **Abwägung:** *„Der monetäre Energieertrag allein ($2{,}27\ \mathrm{€/a}$) rechtfertigt die Investition von $180\ \mathrm{€}$ nicht — die Amortisationszeit läge bei rund $79$ Jahren. Erst zusammen mit den eingesparten Bremsbelagkosten ($\approx50\ \mathrm{€/a}$) ergibt sich eine Amortisation von etwa $3{,}5$ Jahren. Gegenläufig wirken das Mehrgewicht von $2{,}5\ \mathrm{kg}$ und die Spannungsschwelle von $19{,}6\ \mathrm{km/h}$, die den nutzbaren Anteil der Bremsungen im Stadtverkehr verringern.“*
  - **Urteil:** *„Für ein E-Lastenrad im Kurzstrecken-Lieferverkehr mit vielen Bremsungen ist die Rekuperation **unter der Bedingung** sinnvoll, dass ein Hochsetzsteller die Ladung auch unterhalb von $19{,}6\ \mathrm{km/h}$ ermöglicht und die Einsparung beim Bremsverschleiß in die Rechnung einbezogen wird. Als Maßnahme zur Stromkostensenkung ist sie physikalisch und wirtschaftlich nicht tragfähig, weil der Energieertrag mit $5{,}2\ \%$ der Akkukapazität pro Tag in der Größenordnung von wenigen Euro pro Jahr bleibt.“*

**中文点评**：迁移点是「**回收动能 $\frac12 mv^2$ 而非势能 $mg\Delta h$**」——注意 $\frac12mv^2$ 与 $mg\Delta h$ 量级相当（2,16 kJ vs 93,2 kJ，后者因质量与落差更大）。两处陷阱：① **电压门槛**：只算能量不算电压条件，会高估可用份额（城市平均车速常低于 $19{,}6\ \mathrm{km/h}$）；② **AFB III 必须超出学科内部**（`nicht rein innerfachlich`）——只谈 $U_\text{ind}$ 与效率不得分，必须落到经济（$\mathrm{€/a}$、Amortisation）、安全（机械制动冗余）、生态与日常适用性。德语范式：`Kriterium → Abwägung → begründetes Urteil`，每段一句起首句，**没有明确 Urteil 直接砍半**。

---

## 6. Zeitstrategie & Glossar-Zeilen

### 6.1 时间分配表（原型题 30 BE，Richtwert 1,2–1,5 min/BE）

| Teilaufgabe | AFB | BE | Minuten | 关键动作 |
|---|:--:|:--:|:--:|---|
| Material lesen + 数值圈画（$N,A,B,k,r,v,\eta,P_\text{mech},W_\text{Akku}$） | — | — | 4 | 顺手把 $\mathrm{cm^2}$、$\mathrm{km/h}$ 换算写在材料旁 |
| a1 Fluss | I/II | 4 | 4 | $\Phi=BA\cos\theta$ + 单位换算 |
| a2 Drehzahl / Periode | I/II | 4 | 4 | $\omega=v/r\to k\omega\to 2\pi n$ |
| b1 Herleitung | II | 4 | 5 | 必须写出 $\mathrm d\Phi/\mathrm dt$ 那一步 |
| b2 $U_\text{max}$, $U_\text{eff}$ | II | 3 | 4 | 与 Wertetabelle 对照 |
| b3 $\overline U$ | II | 3 | 3 | $\Delta t=T/4$ 别写成 $T/2$ |
| c1 $P_\text{el}$, $W_\text{el}$ | II | 4 | 5 | $\mathrm{kJ}$ 与 $\mathrm{Wh}$ 双答案 |
| c2 Bremskraft + Kräftegleichgewicht | II | 4 | 5 | 先 $\sin\alpha=\Delta h/s$ |
| c3 Überprüfen der Werbeaussage | II | 4 | 6 | Soll-Ist-Vergleich + 反算所需条件 |
| Schlusskontrolle（Einheit / Antwortsatz / Plausibilität） | — | — | 5 | 逐条扫 §4 表 |
| **Σ** | | **30** | **45** | 卡顿时优先压缩 b3 与 c2 的文字部分 |

### 6.2 「先保分后抢分」三条

1. **公式先行、数字后填**：每题先写 `gegeben / gesucht / Ansatz`，Ansatz 用符号式（$U_\text{max}=N\,B\,A\,\omega$）——**公式本身即 1–2 BE**，算错也保住。
2. **单位跟到底 + Zwischenergebnisse 不取整**：每个中间结果后强制写单位（$\mathrm{Wb}$、$\mathrm{rad/s}$、$\mathrm{min^{-1}}$、$\mathrm{ms}$、$\mathrm V$、$\mathrm W$、$\mathrm{kJ}$、$\mathrm{Wh}$、$\mathrm N$）。单位写对的中间结果即使数值错也能拿部分分。
3. **每小问末句必写 Plausibilitätskontrolle**：`Für v = 0 folgt U_ind = 0 V — wie erwartet.` 这类一句检验是 EHZ 里的白送分，却是全德高发丢分项。AFB III（变式 C e）留到最后 6 分钟，**先写 Urteil 句再补论据**，避免没有结论被砍半。

### 6.3 Glossar-Zeilen（待合并，≤6 行）

| Deutsch | Chinesisch | Fach | Beispielsatz |
|---|---|---|---|
| magnetischer Fluss | 磁通量 | Physik | Der magnetische Fluss durch eine Windung betraegt Phi gleich B mal A mal cos theta. |
| Induktionsspannung | 感应电压 | Physik | Die Induktionsspannung ist proportional zur Aenderung des magnetischen Flusses. |
| Windungszahl | 线圈匝数 | Physik | Die Windungszahl der Spule bestimmt die Hoehe der induzierten Spannung. |
| Lorentzkraft | 洛伦兹力 | Physik | Die Lorentzkraft auf die bewegten Ladungstraeger erklaert die Induktionsspannung. |
| magnetische Flussdichte | 磁感应强度 | Physik | Die magnetische Flussdichte B wird in Tesla angegeben. |
| Rekuperation | 制动能量回收 | Physik | Bei der Rekuperation wird Bremsenergie in elektrische Energie umgewandelt. |

> 待合并说明：以上 6 行需人工粘贴进 `00_META/Glossar-DE-ZH-GeWi.md`（本文件不修改共享文件）。表中采用与现有词条一致的**无变音符号**写法（ae/oe/ue），且已避开 `Mockklausur-NRW-Physik.md` 已报备的 `Wirkungsgrad / Energieertrag / Nennleistung / Volllaststunden / Leistungsbeiwert / Zentripetalbeschleunigung`。

---

> **版权与自查**：全部题干、数据、Wertetabelle 均为原创仿写（`[原创仿写]`），未使用真实出版物段落或真题原题；公式与概念锚定 NRW Q-Phase `IF-GK-3`，未引入超纲内容（无定积分运算、无 LK 自感/DGL）。所有数值已复算自洽。
