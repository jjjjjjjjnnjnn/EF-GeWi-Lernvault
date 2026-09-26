---
fach: Mathe
thema: "Mockklausur: Waermepumpe — ganzrationale Leistungskurve und Integral"
operatoren: [beschreiben, darstellen, untersuchen, anwenden, überprüfen, in Beziehung setzen, beurteilen, bewerten]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Mathe, Analysis, Integralrechnung, Modellierung, Klausur]
---

# Mockklausur NRW Mathematik — Wärmepumpe: ganzrationale Leistungskurve + Integral

> **中文一句话理解**：本卷用「热泵日负荷曲线」这一个情境串起 EF→Q1 的全部核心动作——由 **Steckbrief 反求三次函数系数**（建模）、**Ableitung 求极值点与拐点**（考察变化率）、**定积分求日耗电量**（建模与解释）、**积分分窗比较 + 电价评价**（论证与决策）。
> 德语定位：Eine Klausur im Inhaltsfeld *Funktionen und Analysis*, die Modellieren, Operieren und Argumentieren in einem durchgängigen Sachkontext prüft.

---

## 1. Prüfungsrahmen

| Merkmal | Angabe |
|---|---|
| **Fach** | Mathematik (Grundkurs, Inhaltsfeld *Funktionen und Analysis*) |
| **Jahrgang / Zielstufe** | Q1 (Leistungsstand: EF-Ableitungsregeln werden vorausgesetzt, Integralrechnung ist Q1-Gegenstand) — ⏳ 待确认：若本班仍在 EF 阶段（Integral 未讲授），请先完成 `03_Mathe/Lehrplan.md` §1 的 EF-Teil 后再做本卷 |
| **Dauer** | **90 Minuten** (GK-Standardklausur; LK 可按 120 min 延长) |
| **Hilfsmittel** | CAS / Modulares Mathematiksystem (MMS), zugelassene **Formelsammlung NRW 2024**, Papier und Bleistift für die Skizze |
| **Gesamt-BE** | **100 BE** |
| **AFB-Verhältnis** | **AFB I + AFB II = 80 BE (80 %) · AFB III = 20 BE (20 %)** — davon AFB I = 30 BE, AFB II = 50 BE |
| **Aufgabenanzahl** | 6 (davon 2 × AFB I, 3 × AFB II, 1 × AFB III) |
| **Operator-Regel** | Haupt-Operator jeder Aufgabe stammt aus dem NRW-Operatorkatalog (`beschreiben`, `darstellen`, `untersuchen`, `anwenden`, `überprüfen`, `in Beziehung setzen`, `beurteilen`, `bewerten`). Teiloperationen wie *berechnen / bestimmen / skizzieren* werden innerhalb der Teilaufgaben nach mathematikfachlicher Konvention verwendet. |

**Zeitverteilung (Vorschlag, Σ = 90 min)**

| Aufgabe | AFB | BE | Minuten |
|:--|:--|:--:|:--:|
| 1 — Material und Messreihe | I | 14 | 8 |
| 2 — Steckbrief / Funktion aufstellen | I | 16 | 15 |
| 3 — Kurvendiskussion | II | 18 | 18 |
| 4 — Integral: Tagesenergie | II | 18 | 18 |
| 5 — Integral: Anteile und Zeitpunkte | II | 14 | 13 |
| 6 — Modellkritik und Tarifentscheidung | III | 20 | 18 |
| **Σ** | | **100** | **90** |

---

## 2. Material — 原创德语文献材料

> ⚠️ 原创仿写 Modelltext（仿科普/技术期刊 · Ratgebertexte 风格撰写，非真实出版物摘录；数据与名称均为虚构）

### M1 — „Stromverbrauch einer Wärmepumpe: Warum das Lastprofil entscheidet"

Eine Wärmepumpe entzieht ihrer Umgebung — der Außenluft, dem Erdreich oder dem Grundwasser — Wärmeenergie und hebt diese mit Hilfe eines Kältemittelkreislaufs auf ein für die Heizungsanlage nutzbares Temperaturniveau. Den größten Teil der Antriebsenergie liefert ein elektrisch betriebener Verdichter. Das Verhältnis aus abgegebener Wärmeenergie und eingesetzter elektrischer Energie heißt Leistungszahl, international auch Coefficient of Performance, kurz COP. Eine Leistungszahl von 3,4 besagt, dass aus einer Kilowattstunde Strom 3,4 Kilowattstunden Wärme werden; die Differenz stammt aus der Umwelt und ist nicht kostenpflichtig. Eben deshalb kann eine Wärmepumpe trotz ihres Strombedarfs effizient heizen.

Die Leistungszahl ist jedoch keine Konstante. Sinkt die Außentemperatur, muss der Verdichter eine größere Temperaturdifferenz zwischen Wärmequelle und Vorlauf überwinden, und die Leistungszahl fällt. An einem Wintertag mit Werten zwischen minus vier und plus drei Grad arbeitet eine Luft-Wasser-Wärmepumpe deutlich ungünstiger als an einem milderen Herbsttag. Für Auslegung und Betriebskosten eines Einfamilienhauses ist deshalb nicht die auf dem Typenschild angegebene Nennleistung maßgeblich, sondern der Verlauf der elektrischen Leistungsaufnahme über den Tag.

Diesen Verlauf nennt man Lastprofil. Ein typisches Winter-Lastprofil steigt in den frühen Morgenstunden an und erreicht seinen höchsten Wert etwa dann, wenn die Außentemperatur am tiefsten liegt. Bis zum späten Nachmittag fällt es ab, weil die Sonne über die Fensterflächen und über die Gebäudehülle Wärme nachliefert. Am Abend steigt es wieder an, sobald die Außentemperatur sinkt und die Gebäudehülle schneller Wärme verliert, als nachgeliefert wird. Wer den Verlauf nur über seinen Tagesmittelwert beschreibt, unterschätzt die Spitzenlast — und gerade diese Spitzenlast bestimmt die Dimensionierung des Hausanschlusses sowie die Wahl des Stromtarifs.

Versorgungsunternehmen reagieren auf diese Lastspitzen mit Tarifen und mit Sperrzeiten. Ein Wärmepumpenstromtarif ist im Nachtfenster günstiger, setzt aber häufig einen zweiten Stromzähler voraus, der mit einer jährlichen Grundgebühr zu Buche schlägt; in einer Sperrzeit darf der Netzbetreiber die Anlage für wenige Stunden drosseln. Ob sich ein solcher Tarif lohnt, lässt sich nur entscheiden, wenn man weiß, welcher Anteil des Tagesenergiebedarfs tatsächlich in das Nachtfenster fällt. Auch diese Frage beantwortet das Integral der Leistungsfunktion.

Mathematisch lässt sich ein solches Lastprofil durch eine ganzrationale Funktion dritten Grades beschreiben. Der Gewinn ist zweifach: Aus den Ableitungen der Funktion lassen sich Hochpunkt, Tiefpunkt und Wendestelle des Graphen exakt bestimmen, und das Integral der Leistungsfunktion über die Zeit liefert unmittelbar den Energieverbrauch. Die Fläche zwischen dem Graphen und der Zeitachse ist also keine abstrakte Rechengröße, sondern genau die Strommenge, die später auf der Rechnung steht. In der Praxis wird die Modellkurve aus Messwerten gewonnen: Ein Datenlogger zeichnet die Leistungsaufnahme in festen Abständen auf, anschließend wird eine Ausgleichskurve so gelegt, dass die Abweichungen zwischen Messung und Modell klein bleiben.

Solche Modelle haben klare Grenzen. Sie gelten nur für den beobachteten Zeitraum, sie kennen keine Wetterumschwünge und keine Nutzungsgewohnheiten der Bewohner, und an den Rändern des Modellierungszeitraums sind sie besonders unsicher, weil dort keine Messwerte auf beiden Seiten liegen. Dennoch sind sie ein brauchbares Werkzeug, um Stromtarife zu vergleichen, Sperrzeiten des Netzbetreibers zu beurteilen und die Wirtschaftlichkeit einer Anlage zu bewerten. Die entscheidende These lautet daher: Nicht der Nennwert der Anlage, sondern die Form des Lastprofils entscheidet über die Stromrechnung — und diese Form lässt sich mit den Werkzeugen der Analysis beschreiben, bewerten und kritisieren.

[Wortzahl: 531] — （连续德语正文 521 Wörter + 标题行 10 Wörter）

### Tabelle 1 — Messreihe und Modellkurve (fiktiv)

$t$ = Stunden nach 0:00 Uhr; $\vartheta$ = Außentemperatur; $P_{\text{mess}}$ = gemessene elektrische Leistungsaufnahme; $P(t)$ = Wert der Modellkurve; $\Delta = P_{\text{mess}} - P(t)$

| Uhrzeit | $t$ in h | $\vartheta$ in °C | $P_{\text{mess}}$ in kW | Modellwert $P(t)$ in kW | $\Delta$ in kW |
|:--|:--:|--:|--:|--:|--:|
| 0:00 | 0 | −1,8 | 1,24 | 1,20 | +0,04 |
| 2:00 | 2 | −2,9 | 2,01 | 2,05 | −0,04 |
| 4:00 | 4 | −3,7 | 2,55 | 2,51 | +0,04 |
| 6:00 | 6 | −4,2 | 2,61 | 2,64 | −0,03 |
| 8:00 | 8 | −3,1 | 2,48 | 2,53 | −0,05 |
| 10:00 | 10 | −0,6 | 2,30 | 2,27 | +0,03 |
| 12:00 | 12 | +1,2 | 1,96 | 1,92 | +0,04 |
| 14:00 | 14 | +2,5 | 1,53 | 1,57 | −0,04 |
| 16:00 | 16 | +3,2 | 1,28 | 1,31 | −0,03 |
| 18:00 | 18 | +3,4 | 1,16 | 1,20 | −0,04 |
| 20:00 | 20 | +1,9 | 1,38 | 1,33 | +0,05 |
| 22:00 | 22 | +0,2 | 1,84 | 1,79 | +0,05 |
| 24:00 | 24 | −1,2 | 2,58 | 2,64 | −0,06 |

### Tabelle 2 — Kennwerte der Anlage und des Tarifs (fiktiv)

| Kenngröße | Wert |
|---|---|
| Gebäude | Einfamilienhaus, Baujahr 1998, Wohnfläche 148 m² |
| Anlage | Luft-Wasser-Wärmepumpe, elektrische Nennleistung 2,8 kW |
| Leistungszahl (COP), Tagesmittel | $\varepsilon = 3{,}4$ |
| Vorlauftemperatur | 42 °C |
| Modellierungszeitraum | $0 \le t \le 24$, $t$ in Stunden nach 0:00 Uhr |
| Arbeitspreis Einheitstarif | 0,28 €/kWh |
| Arbeitspreis Nachtfenster (22:00–6:00 Uhr) | 0,22 €/kWh |
| Arbeitspreis Tagfenster (6:00–22:00 Uhr) | 0,30 €/kWh |
| Zusatzkosten zweiter Stromzähler | 60 € pro Jahr |

### 2.1 Material-Kennzeichnung

| Merkmal | Angabe |
|---|---|
| **Textsorte** | popularwissenschaftlicher Ratgebertext (Sachtext mit modellierendem Anspruch), ⚠️ fiktiv |
| **Quellenart (仿)** | 仿 Fachzeitschrift für Gebäudeenergetik, Ratgeberstrecke „Wärmepumpe im Winter"; kein reales Publikationsorgan, Autor nicht genannt |
| **Kernthese (1 Satz)** | Nicht die Nennleistung der Anlage, sondern die Form des Lastprofils entscheidet über die Stromrechnung — und diese Form lässt sich mit einer ganzrationalen Funktion und ihrem Integral beschreiben, bewerten und kritisieren. |
| **Schlüsselbegriffe** | **Lastprofil**（负荷曲线，日负荷随时间变化曲线）· **Leistungszahl / COP**（性能系数）· **Ausgleichskurve / Modellkurve**（拟合曲线）· **Sperrzeit**（电网限时段/封锁时段）· **Nennleistung**（额定功率） |
| **Materialfunktion für die Klausur** | 情境 liefert 变量与单位、Messreihe liefert  Modellkritik-Beleg、Tariftabelle liefert  AFB-III-Entscheidungsdaten |

---

## 3. Aufgaben (AFB I–III)

**Aufgabe 1 [AFB I] · Operator: beschreiben · 14 BE · 8 min**

> **Beschreiben Sie** anhand von Material M1 und Tabelle 1 den Verlauf der elektrischen Leistungsaufnahme über den Modellierungszeitraum. **Benennen Sie** den Zeitpunkt der höchsten und der niedrigsten gemessenen Leistungsaufnahme, **geben Sie** Definitionsbereich und Wertebereich des Modells sowie die Einheiten von $t$, $P(t)$ und $\int_{a}^{b} P(t)\,dt$ an und **beschreiben Sie**, was das Integral der Leistungsfunktion im Sachkontext bedeutet und welche Rolle die Leistungszahl dabei spielt.

中文提示：考「单位链 + 积分的量纲意义」——$P$ in kW × $t$ in h ⇒ Integral in **kWh**；陷阱是把 Wertebereich 写成测量值区间 [1,16; 2,61] 而非模型区间 [1,20; 2,64]，以及把 COP 当成效率百分比。

---

**Aufgabe 2 [AFB I] · Operator: darstellen · 16 BE · 15 min**

> Das Lastprofil soll für $0 \le t \le 24$ durch eine ganzrationale Funktion dritten Grades $P(t) = at^3 + bt^2 + ct + d$ mit $a \ne 0$ beschrieben werden. **Stellen Sie** die Funktionsgleichung auf. Der Steckbrief liefert dazu:
>
> (i) Um 0:00 Uhr beträgt die Leistungsaufnahme 1,20 kW.
> (ii) Bei $t = 6$ liegt ein lokaler Hochpunkt mit $P(6) = 2{,}64$ kW.
> (iii) Bei $t = 18$ liegt ein lokaler Tiefpunkt.
> (iv) Bei $t = 12$ liegt die Wendestelle des Graphen.
>
> Lösen Sie das entstehende lineare Gleichungssystem, **geben Sie** $P(t)$ mit Einheiten an und **überprüfen Sie** abschließend, dass Ihr Modell auch Bedingung (iv) erfüllt.

中文提示：考「Steckbrief → LGS」的标准套路：$d$ 直接由 $P(0)$ 得到，$P'(6)=0$ 与 $P'(18)=0$ 相减先得 $b=-36a$；陷阱是只列 $P(6)=2{,}64$ 而忘写必要条件 $P'(6)=0$，四条件缺一即无法定解。

---

**Aufgabe 3 [AFB II] · Operator: untersuchen · 18 BE · 18 min**

> **Untersuchen Sie** den Graphen von $P$ im Modellierungszeitraum $[0; 24]$:
>
> a) **Bestimmen Sie** $P'(t)$ und $P''(t)$ und **weisen Sie** die lokalen Extremstellen mit notwendiger und hinreichender Bedingung nach.
> b) **Bestätigen Sie** die Wendestelle durch einen Vorzeichenwechsel von $P''$ und **geben Sie** ihre Koordinaten an.
> c) **Geben Sie** die Monotonieintervalle an und **bestimmen Sie** durch einen Randwertvergleich das globale Maximum und das globale Minimum. **Erläutern Sie** beide Ergebnisse im Sachkontext.

中文提示：考「极值点证明的完整三段式」（必要条件 → 充分条件 → 端点比较）。陷阱：不做 Randwertvergleich 就宣布 $H(6\mid 2{,}64)$ 为全局最大值——本模型 $P(24)=2{,}64$ 与之相等，全局最大值出现在**两处**。

---

**Aufgabe 4 [AFB II] · Operator: anwenden · 18 BE · 18 min**

> a) **Stellen Sie** eine Stammfunktion $F$ zu $P$ auf und **berechnen Sie** den Energieverbrauch $W_{\text{Tag}} = \int_{0}^{24} P(t)\,dt$ in kWh.
> b) **Berechnen Sie** die mittlere Leistungsaufnahme $\overline{P}$ über $[0;24]$ und **stellen Sie fest**, in welcher Beziehung $\overline{P}$ zum Funktionswert an der Wendestelle steht; **erklären Sie** diesen Zusammenhang grafisch.
> c) **Berechnen Sie** die Energiemengen für die Zeitfenster $[0;6]$, $[6;18]$ und $[18;24]$ sowie die Stromkosten des Tages zum Einheitstarif.
> d) **Überprüfen Sie** das Ergebnis durch eine Plausibilitätskontrolle über die abgegebene Wärmeenergie (Leistungszahl $\varepsilon = 3{,}4$).

中文提示：考「定积分 = 面积 = 电量」以及**点对称带来的免费校验**；陷阱：忘记负号（$-\frac{1}{50}t^3$）或把 $F(24)$ 直接当成电量而不减 $F(0)$（此处 $F(0)=0$，仍须写明）。

---

**Aufgabe 5 [AFB II] · Operator: überprüfen / in Beziehung setzen · 14 BE · 13 min**

> a) Die Fachfirma behauptet: „Zwischen 6:00 und 18:00 Uhr verbraucht die Anlage mehr als die Hälfte des Tagesenergiebedarfs." **Überprüfen Sie** diese Behauptung rechnerisch.
> b) **Bestimmen Sie** alle Zeitpunkte im Modellierungszeitraum, an denen die Leistungsaufnahme genau dem Tagesmittelwert aus Aufgabe 4 b) entspricht, und **geben Sie** die zugehörigen Uhrzeiten an.
> c) **Setzen Sie** die lokale Änderungsrate $P'(12)$ und die mittlere Änderungsrate über $[6;18]$ **in Beziehung** und **erklären Sie** die Differenz.

中文提示：a) 是**陷阱题**——结果恰好是 50 %，「mehr als die Hälfte」不成立；b) 用因式分解 $(t-12)(t^2-24t+36)=0$；c) $P'$ 是开口向上的抛物线，在拐点处取最小值，故正午下降最快。

---

**Aufgabe 6 [AFB III] · Operator: beurteilen / bewerten · 20 BE · 18 min**

> a) **Beurteilen Sie** die Güte des Modells: **Vergleichen Sie** Messwerte und Modellwerte aus Tabelle 1, **diskutieren Sie** mindestens zwei strukturelle Grenzen des Modells und **beurteilen Sie**, für welche Fragestellungen das Modell brauchbar ist und für welche nicht.
> b) Der Betreiber erwägt den Wechsel in einen Wärmepumpenstromtarif mit einem Nachtfenster von 22:00 bis 6:00 Uhr. **Berechnen Sie** die Energiemengen im Nachtfenster und im Tagfenster sowie die Tageskosten im Vergleich zum Einheitstarif. **Bewerten Sie** anschließend, ob sich der Wechsel lohnt, wenn pro Jahr 100 Tage mit diesem Lastverlauf auftreten und der zweite Stromzähler 60 € pro Jahr kostet. Nehmen Sie begründet Stellung und gehen Sie auf ein Gegenargument ein.

中文提示：AFB III 不是「自由发挥」——必须先算（积分分窗 + 金额），再按 These → Begründung → Gegenargument → Abwägung → begründetes Urteil 五步收口；陷阱：只算每日节省 0,48 € 就下结论，而忘记与 60 € 年费做**同一量纲**比较。

---

## 4. Erwartungshorizont (EHZ) — 80:20 采分点标准

| Aufgabe | AFB | BE | Erwartete Leistung | Typischer Fehler |
|:--|:--:|:--:|---|---|
| 1 | I | 4 | ✓ Verlauf in drei Phasen beschrieben: Anstieg $0 \to 6$ h, Abfall $6 \to 18$ h, erneuter Anstieg $18 \to 24$ h | 只写「先升后降」，漏掉第三段再上升 |
| 1 | I | 2 | ✓ Maximum aus der Messreihe benannt (ca. 6:00 Uhr, $2{,}61$ kW) und Minimum (ca. 18:00 Uhr, $1{,}16$ kW) | 把 Modellwert 2,64 当成 Messwert |
| 1 | I | 2 | ✓ $D = [0; 24]$ ($t$ in h) und $W = [1{,}20; 2{,}64]$ (in kW) angegeben | Wertebereich 用测量值区间 |
| 1 | I | 2 | ✓ Einheitenkette: $t$ in h, $P(t)$ in kW, $\int_a^b P(t)\,dt$ in kWh | 把 Integral 的单位写成 kW |
| 1 | I | 2 | ✓ Integral als Energieverbrauch (Strommenge) im Sachkontext gedeutet | 只说「Fläche」，不翻译回 kWh |
| 1 | I | 2 | ✓ Leistungszahl eingeordnet: Wärmeenergie $= \varepsilon \cdot W_{\text{el}}$, kein Wirkungsgrad in Prozent | COP 3,4 误读为 340 % |
| 2 | I | 2 | ✓ Ansatz $P(t) = at^3 + bt^2 + ct + d$, $a \ne 0$, mit $P'(t) = 3at^2 + 2bt + c$ | Ansatz 遗漏 $a \ne 0$ |
| 2 | I | 1 | ✓ $d = 1{,}20$ aus $P(0) = 1{,}20$ | — |
| 2 | I | 4 | ✓ drei Gleichungen: $216a + 36b + 6c = 1{,}44$; $108a + 12b + c = 0$; $972a + 36b + c = 0$ | 必要条件 $P'(6)=0$ 未写出 |
| 2 | I | 3 | ✓ aus der Differenz der beiden Ableitungsgleichungen $b = -36a$, dann $c = 324a$ | 四个未知数直接硬解，符号错 |
| 2 | I | 2 | ✓ $144a = 0{,}24 \Rightarrow a = \frac{1}{600}$ (also $b = -\frac{3}{50}$, $c = \frac{27}{50}$) | $0{,}24 : 144$ 除法错 |
| 2 | I | 2 | ✓ Funktionsgleichung $P(t) = \frac{1}{600}t^3 - \frac{3}{50}t^2 + \frac{27}{50}t + \frac{6}{5}$ mit Einheiten ($P$ in kW, $t$ in h) | 函数式不带单位 |
| 2 | I | 2 | ✓ Probe: $P''(12) = 0$ bzw. $P(18) = 1{,}20$ kW bestätigt Bedingung (iv) | 完全不做 Probe |
| 3 | II | 2 | ✓ $P'(t) = \frac{1}{200}t^2 - \frac{3}{25}t + \frac{27}{50}$ | Faktorregel: $2 \cdot \frac{3}{50} = \frac{3}{25}$ 漏 2 |
| 3 | II | 1 | ✓ $P''(t) = \frac{1}{100}t - \frac{3}{25}$ | — |
| 3 | II | 3 | ✓ notwendige Bedingung $P'(t) = 0 \Rightarrow t^2 - 24t + 108 = 0 \Rightarrow t_1 = 6$, $t_2 = 18$ | 未乘 200 直接解，判别式算错 |
| 3 | II | 3 | ✓ hinreichende Bedingung: $P''(6) = -0{,}06 < 0$ → Hochpunkt; $P''(18) = +0{,}06 > 0$ → Tiefpunkt | 只写 $P'=0$ 就下结论 |
| 3 | II | 2 | ✓ $P(6) = 2{,}64$ kW, $P(18) = 1{,}20$ kW | 只给 $x$-Koordinate，不算法值 |
| 3 | II | 3 | ✓ $P''(12) = 0$ mit Vorzeichenwechsel ($-$ auf $+$) → $W(12 \mid 1{,}92)$ | $P''=0$ 无 VZW 验证 |
| 3 | II | 2 | ✓ Monotonie: steigend auf $[0;6]$ und $[18;24]$, fallend auf $[6;18]$ | 区间端点写成开区间 |
| 3 | II | 2 | ✓ Randwertvergleich $P(0) = 1{,}20$, $P(24) = 2{,}64$ → globales Maximum $2{,}64$ kW (6:00 **und** 24:00 Uhr), globales Minimum $1{,}20$ kW (0:00 **und** 18:00 Uhr) | 漏 Randwertvergleich |
| 4 | II | 2 | ✓ $F(t) = \frac{1}{2400}t^4 - \frac{1}{50}t^3 + \frac{27}{100}t^2 + \frac{6}{5}t$ | $\frac{27}{50}t \to \frac{27}{100}t^2$ 系数错 |
| 4 | II | 2 | ✓ $F(24) = 138{,}24 - 276{,}48 + 155{,}52 + 28{,}80$; $F(0) = 0$ | 中间结果不写，无法追溯 |
| 4 | II | 2 | ✓ $W_{\text{Tag}} = 46{,}08$ kWh | 单位写成 kW |
| 4 | II | 2 | ✓ $\overline{P} = \frac{46{,}08}{24} = 1{,}92$ kW | 除以 12（半天） |
| 4 | II | 2 | ✓ Erklärung: Punktsymmetrie zum Wendepunkt $W(12 \mid 1{,}92)$, daher Mittelwert $= P(12)$ | 只说「刚好相等」，无 Begründung |
| 4 | II | 2 | ✓ $W_{[0;6]} = F(6) - F(0) = 13{,}14$ kWh | — |
| 4 | II | 2 | ✓ $W_{[6;18]} = F(18) - F(6) = 36{,}18 - 13{,}14 = 23{,}04$ kWh | 用 $P(18)-P(6)$ 当电量 |
| 4 | II | 2 | ✓ $W_{[18;24]} = F(24) - F(18) = 46{,}08 - 36{,}18 = 9{,}90$ kWh | — |
| 4 | II | 1 | ✓ Kosten: $46{,}08 \text{ kWh} \cdot 0{,}28\ \text{€/kWh} = 12{,}90$ € | 金额不写 € |
| 4 | II | 1 | ✓ Plausibilität: $46{,}08 \cdot 3{,}4 = 156{,}7$ kWh Wärme → mittlere Heizlast $\approx 6{,}53$ kW (plausibel für 148 m²) | Plausibilitätskontrolle 完全省略 |
| 5 | II | 2 | ✓ $\int_{6}^{18} P(t)\,dt = 36{,}18 - 13{,}14 = 23{,}04$ kWh | 直接算 $[0;18]$ |
| 5 | II | 2 | ✓ Anteil $\frac{23{,}04}{46{,}08} = 0{,}50 = 50\ \%$ | — |
| 5 | II | 2 | ✓ Urteil: Die Behauptung ist **falsch** — genau die Hälfte, nicht mehr als die Hälfte | 「richtig」误判 |
| 5 | II | 2 | ✓ Gleichung $P(t) = 1{,}92 \Rightarrow t^3 - 36t^2 + 324t - 432 = 0$ | 乘 600 时 432 写错 |
| 5 | II | 2 | ✓ Abspalten: $(t-12)(t^2 - 24t + 36) = 0$ | 只报 $t=12$ 一个解 |
| 5 | II | 2 | ✓ $t_1 = 12 - 6\sqrt{3} \approx 1{,}61$ h (ca. 1:36 Uhr), $t_2 = 12$ h (12:00 Uhr), $t_3 = 12 + 6\sqrt{3} \approx 22{,}39$ h (ca. 22:24 Uhr) | 解不转成 Uhrzeit |
| 5 | II | 2 | ✓ $P'(12) = -0{,}18$ kW/h gegen mittlere Rate $\frac{1{,}20-2{,}64}{12} = -0{,}12$ kW/h; Begründung: $P'$ ist eine nach oben geöffnete Parabel mit Minimum bei $t = 12$ | 说「两者应相等」 |
| 6 | III | 2 | ✓ Abweichungen quantifiziert: $\lvert \Delta \rvert \le 0{,}06$ kW über die gesamte Messreihe | 只说「大致吻合」，无数值 |
| 6 | III | 3 | ✓ Grenze 1: $P(0) = 1{,}20\ \text{kW} \ne P(24) = 2{,}64\ \text{kW}$ → Modell ist **nicht periodisch fortsetzbar** | 未发现端点不自洽 |
| 6 | III | 2 | ✓ Grenze 2: kein Wetterumschwung, kein Nutzerverhalten, nur ein einziger Tag; Randbereiche besonders unsicher | 只写一条 Grenze |
| 6 | III | 3 | ✓ Beurteilung: brauchbar für Tagesenergie, Spitzenlast und Tarifvergleich; **ungeeignet** für Jahres- oder Wochenprognose | 「Modell ist gut/schlecht」无区分 |
| 6 | III | 2 | ✓ $W_{\text{Nacht}} = 13{,}14 + (46{,}08 - 41{,}73) = 13{,}14 + 4{,}35 = 17{,}49$ kWh | 漏 $[22;24]$ 这一段 |
| 6 | III | 1 | ✓ $W_{\text{Tagfenster}} = 46{,}08 - 17{,}49 = 28{,}59$ kWh | — |
| 6 | III | 3 | ✓ $K = 17{,}49 \cdot 0{,}22 + 28{,}59 \cdot 0{,}30 = 3{,}85 + 8{,}58 = 12{,}42$ € gegen $12{,}90$ € → Ersparnis $0{,}48$ € pro Tag | 用 0,28 乘夜间电量 |
| 6 | III | 2 | ✓ Hochrechnung: $100 \cdot 0{,}48 = 47{,}79$ € pro Jahr < 60 € Zählergebühr | 只报每日节省 |
| 6 | III | 2 | ✓ begründetes Urteil mit Gegenargument (z. B. steigende Strompreise / mehr als 100 Kältetage) und Abwägung | 结论无 Gegenargument |

`Σ AFB I: 30 BE + AFB II: 50 BE = 80 BE (80 %) · AFB III: 20 BE (20 %) · Gesamt 100 BE`

---

## 5. Notenstufen-Umrechnung (15 分制)

| Erreichte BE | % | Notenpunkte | Note |
|:--|:--:|:--:|:--:|
| 100 – 95 | 100 – 95 | 15 | 1+ (1,0) |
| 94 – 90 | 94 – 90 | 14 | 1 (1,3) |
| 89 – 85 | 89 – 85 | 13 | 1− (1,7) |
| 84 – 80 | 84 – 80 | 12 | 2+ (2,0) |
| 79 – 75 | 79 – 75 | 11 | 2 (2,3) |
| 74 – 70 | 74 – 70 | 10 | 2− (2,7) |
| 69 – 65 | 69 – 65 | 9 | 3+ (3,0) |
| 64 – 60 | 64 – 60 | 8 | 3 (3,3) |
| 59 – 55 | 59 – 55 | 7 | 3− (3,7) |
| 54 – 50 | 54 – 50 | 6 | 4+ (4,0) |
| 49 – 45 | 49 – 45 | 5 | 4 (4,3) |
| 44 – 40 | 44 – 40 | 4 | 4− (4,7) |
| 39 – 35 | 39 – 35 | 3 | 5+ (5,0) |
| 34 – 30 | 34 – 30 | 2 | 5 (5,3) |
| 29 – 25 | 29 – 25 | 1 | 5− (5,7) |
| ≤ 24 | ≤ 24 | 0 | 6 (6,0) |

Umrechnungsformel: $\text{Note} = 1 + \frac{15 - \text{Notenpunkte}}{3}$ (für Notenpunkte $\ge 1$); 0 Punkte $\Rightarrow$ Note 6,0.

⏳ 待确认：Prozent-Punkte-Raster 各校略有差异，以本班 Lehrkraft 下发的 Notenstufen 为准。

---

## 6. Musterlösung

### Aufgabe 1 (AFB I, 14 BE)

**a) Verlauf**（中文：三段式描述必须带 Uhrzeit）

> *Klausur-Satz*: Die Leistungsaufnahme steigt von 0:00 Uhr bis etwa 6:00 Uhr von 1,20 kW auf ihren höchsten Wert an, fällt dann bis etwa 18:00 Uhr auf ihren niedrigsten Wert ab und steigt anschließend bis 24:00 Uhr wieder an.

**b) Extremwerte der Messreihe**: Maximum $P_{\text{mess}} = 2{,}61$ kW um 6:00 Uhr; Minimum $P_{\text{mess}} = 1{,}16$ kW um 18:00 Uhr.

**c) Definitions- und Wertebereich**: $D = [0; 24]$ mit $t$ in Stunden; $W = [1{,}20; 2{,}64]$ mit $P(t)$ in kW.

**d) Einheitenkette**: $t$ in h · $P(t)$ in kW · $\int_a^b P(t)\,dt$ in kW · h = **kWh**.

**e) Sachkontext**: Das Integral ist die in der Zeit von $a$ bis $b$ bezogene Strommenge, also der Energieverbrauch; die Fläche unter dem Graphen ist damit keine Rechengröße, sondern die Größe auf der Stromrechnung.

**f) Leistungszahl**: Mit $\varepsilon = 3{,}4$ folgt $W_{\text{Wärme}} = 3{,}4 \cdot W_{\text{el}}$; die Leistungszahl ist ein **Verhältnis**, kein Wirkungsgrad in Prozent (中文：COP 是倍数关系，最大物理上限由 Carnot 给出，绝不是「340 % 效率」).

---

### Aufgabe 2 (AFB I, 16 BE) — Steckbrief

**Rechengang**

1. Ansatz: $P(t) = at^3 + bt^2 + ct + d$, $a \ne 0$; $P'(t) = 3at^2 + 2bt + c$; $P''(t) = 6at + 2b$.
2. Bedingung (i): $P(0) = d = 1{,}20$ → $d = \frac{6}{5}$.
3. Bedingung (ii), Wert: $P(6) = 216a + 36b + 6c + 1{,}20 = 2{,}64$ → $216a + 36b + 6c = 1{,}44$ → (geteilt durch 6) $36a + 6b + c = 0{,}24$.
4. Bedingung (ii), notwendige Bedingung: $P'(6) = 108a + 12b + c = 0$.
5. Bedingung (iii), notwendige Bedingung: $P'(18) = 972a + 36b + c = 0$.
6. Differenz (5) − (4): $864a + 24b = 0 \Rightarrow b = -36a$.
7. Einsetzen in (4): $108a - 432a + c = 0 \Rightarrow c = 324a$.
8. Einsetzen in (3): $36a - 216a + 324a = 0{,}24 \Rightarrow 144a = 0{,}24 \Rightarrow a = \frac{0{,}24}{144} = \frac{1}{600}$.
9. Damit $b = -\frac{36}{600} = -\frac{3}{50}$ und $c = \frac{324}{600} = \frac{27}{50}$.

**Ergebnis**

$$P(t) = \frac{1}{600}t^3 - \frac{3}{50}t^2 + \frac{27}{50}t + \frac{6}{5}, \qquad t \text{ in h}, \ P(t) \text{ in kW}, \ D = [0;24]$$

**Probe (Bedingung iv)**: $P''(t) = \frac{1}{100}t - \frac{3}{25}$; $P''(12) = 0{,}12 - 0{,}12 = 0$ ✓ — die Wendestelle liegt tatsächlich bei $t = 12$.

**Plausibilitätskontrolle**: $P(18) = \frac{5832}{600} - \frac{3}{50}\cdot 324 + \frac{27}{50}\cdot 18 + \frac{6}{5} = 9{,}72 - 19{,}44 + 9{,}72 + 1{,}20 = 1{,}20$ kW — der Tiefpunkt ist also niedriger als der Hochpunkt, und der Wert stimmt mit dem Messwert $1{,}16$ kW bis auf 0,04 kW überein.

> *Antwortsatz*: Das Lastprofil wird für $0 \le t \le 24$ durch $P(t) = \frac{1}{600}t^3 - \frac{3}{50}t^2 + \frac{27}{50}t + \frac{6}{5}$ mit $P(t)$ in kW und $t$ in Stunden beschrieben.

---

### Aufgabe 3 (AFB II, 18 BE) — Kurvendiskussion

**a) Ableitungen**

- $P'(t) = \frac{3}{600}t^2 - \frac{6}{50}t + \frac{27}{50} = \frac{1}{200}t^2 - \frac{3}{25}t + \frac{27}{50}$
- $P''(t) = \frac{2}{200}t - \frac{3}{25} = \frac{1}{100}t - \frac{3}{25}$

**b) Lokale Extrema**

- Notwendige Bedingung: $P'(t) = 0 \iff \frac{1}{200}t^2 - \frac{3}{25}t + \frac{27}{50} = 0$. Multiplikation mit 200 liefert $t^2 - 24t + 108 = 0$.
- $t_{1,2} = 12 \pm \sqrt{144 - 108} = 12 \pm 6 \Rightarrow t_1 = 6$, $t_2 = 18$.
- Hinreichende Bedingung: $P''(6) = 0{,}06 - 0{,}12 = -0{,}06 < 0$ → **Hochpunkt**; $P''(18) = 0{,}18 - 0{,}12 = +0{,}06 > 0$ → **Tiefpunkt**.
- Funktionswerte: $P(6) = 0{,}36 - 2{,}16 + 3{,}24 + 1{,}20 = 2{,}64$ kW; $P(18) = 9{,}72 - 19{,}44 + 9{,}72 + 1{,}20 = 1{,}20$ kW.
- Extrempunkte: $H(6 \mid 2{,}64)$, $T(18 \mid 1{,}20)$.

**c) Wendestelle**

- $P''(t) = 0 \iff \frac{1}{100}t = \frac{3}{25} \iff t = 12$.
- Vorzeichenwechsel: für $t < 12$ ist $P''(t) < 0$ (Rechtskrümmung), für $t > 12$ ist $P''(t) > 0$ (Linkskrümmung) → Krümmungswechsel, also Wendestelle.
- $P(12) = 2{,}88 - 8{,}64 + 6{,}48 + 1{,}20 = 1{,}92$ → $W(12 \mid 1{,}92)$.

**d) Monotonie und globale Extrema**

- $P'$ ist eine nach oben geöffnete Parabel mit Nullstellen 6 und 18: $P'(t) > 0$ auf $[0;6[ \ \cup\ ]18;24]$, $P'(t) < 0$ auf $]6;18[$.
- Monotonie: $P$ steigt auf $[0;6]$ und $[18;24]$, fällt auf $[6;18]$.
- Randwertvergleich: $P(0) = 1{,}20$ kW, $P(6) = 2{,}64$ kW, $P(18) = 1{,}20$ kW, $P(24) = \frac{13824}{600} - 34{,}56 + 12{,}96 + 1{,}20 = 23{,}04 - 34{,}56 + 12{,}96 + 1{,}20 = 2{,}64$ kW.
- Kandidatenvergleich: größter Wert $2{,}64$ kW, kleinster Wert $1{,}20$ kW.

> *Antwortsatz*: Die Anlage erreicht ihre höchste Leistungsaufnahme von **2,64 kW** um **6:00 Uhr** und noch einmal um **24:00 Uhr**; die niedrigste Leistungsaufnahme von **1,20 kW** liegt um **0:00 Uhr** und um **18:00 Uhr** vor.

**Plausibilitätskontrolle**: Der Hochpunkt liegt bei 6:00 Uhr, also genau dort, wo laut Tabelle 1 mit −4,2 °C die tiefste Außentemperatur gemessen wird; der Tiefpunkt liegt bei 18:00 Uhr mit der höchsten Außentemperatur von +3,4 °C. Das Modell bildet damit den im Material beschriebenen Zusammenhang zwischen Außentemperatur und Leistungsaufnahme sachgerecht ab.

---

### Aufgabe 4 (AFB II, 18 BE) — Integral und Energieverbrauch

**a) Stammfunktion**

$$F(t) = \frac{1}{2400}t^4 - \frac{1}{50}t^3 + \frac{27}{100}t^2 + \frac{6}{5}t$$

(Probe durch Ableiten: $F'(t) = \frac{4}{2400}t^3 - \frac{3}{50}t^2 + \frac{54}{100}t + \frac{6}{5} = \frac{1}{600}t^3 - \frac{3}{50}t^2 + \frac{27}{50}t + \frac{6}{5} = P(t)$ ✓)

**b) Tagesenergieverbrauch**

- $F(24) = \frac{331776}{2400} - \frac{13824}{50} + \frac{27}{100}\cdot 576 + \frac{6}{5}\cdot 24 = 138{,}24 - 276{,}48 + 155{,}52 + 28{,}80$
- Zwischenergebnisse: $138{,}24 - 276{,}48 = -138{,}24$; $-138{,}24 + 155{,}52 = 17{,}28$; $17{,}28 + 28{,}80 = 46{,}08$
- $F(0) = 0$
- $W_{\text{Tag}} = \int_0^{24} P(t)\,dt = F(24) - F(0) = 46{,}08\ \text{kWh}$

> *Antwortsatz*: Die Wärmepumpe bezieht an diesem Tag **46,08 kWh** elektrische Energie.

**c) Mittlere Leistungsaufnahme**

- $\overline{P} = \frac{1}{24 - 0}\int_0^{24} P(t)\,dt = \frac{46{,}08\ \text{kWh}}{24\ \text{h}} = 1{,}92\ \text{kW}$
- Beziehung: $\overline{P} = P(12) = 1{,}92$ kW — der Mittelwert ist gleich dem Funktionswert an der Wendestelle.
- Begründung: Eine ganzrationale Funktion dritten Grades ist punktsymmetrisch zu ihrem Wendepunkt $W(12 \mid 1{,}92)$; da das Intervall $[0;24]$ symmetrisch zu $t = 12$ liegt, heben sich die Abweichungen nach oben und unten genau auf.

**d) Teilfenster und Kosten**

- $F(6) = \frac{1296}{2400} - \frac{216}{50} + \frac{27}{100}\cdot 36 + \frac{6}{5}\cdot 6 = 0{,}54 - 4{,}32 + 9{,}72 + 7{,}20 = 13{,}14$ kWh
- $F(18) = \frac{104976}{2400} - \frac{5832}{50} + \frac{27}{100}\cdot 324 + \frac{6}{5}\cdot 18 = 43{,}74 - 116{,}64 + 87{,}48 + 21{,}60 = 36{,}18$ kWh
- $W_{[0;6]} = 13{,}14 - 0 = \mathbf{13{,}14\ kWh}$; $W_{[6;18]} = 36{,}18 - 13{,}14 = \mathbf{23{,}04\ kWh}$; $W_{[18;24]} = 46{,}08 - 36{,}18 = \mathbf{9{,}90\ kWh}$
- Summenprobe: $13{,}14 + 23{,}04 + 9{,}90 = 46{,}08$ kWh ✓
- Kosten: $K = 46{,}08\ \text{kWh} \cdot 0{,}28\ \frac{\text{€}}{\text{kWh}} = 12{,}9024\ \text{€} \approx \mathbf{12{,}90\ \text{€}}$

> *Antwortsatz*: Auf die drei Zeitfenster entfallen 13,14 kWh (0:00–6:00 Uhr), 23,04 kWh (6:00–18:00 Uhr) und 9,90 kWh (18:00–24:00 Uhr); beim Einheitstarif kostet der Tag 12,90 €.

**e) Plausibilitätskontrolle**

- Wärmeenergie: $W_{\text{Wärme}} = \varepsilon \cdot W_{\text{el}} = 3{,}4 \cdot 46{,}08\ \text{kWh} = 156{,}672\ \text{kWh} \approx 156{,}7\ \text{kWh}$
- Mittlere Heizlast: $\frac{156{,}672\ \text{kWh}}{24\ \text{h}} = 6{,}528\ \text{kW} \approx 6{,}53\ \text{kW}$
- Einordnung: Für ein unsaniertes Einfamilienhaus mit 148 m² Wohnfläche an einem Wintertag mit Außentemperaturen zwischen −4,2 °C und +3,4 °C ist eine mittlere Heizlast von etwa 6,5 kW plausibel; zugleich bleibt die Spitzenlast von 2,64 kW unter der elektrischen Nennleistung von 2,8 kW. Beide Kontrollen bestätigen das Ergebnis.

**Typischer Fehler**: Wer $F(24)$ ohne Abzug von $F(0)$ als Energieverbrauch angibt, verliert die Darstellungsleistung, auch wenn hier $F(0) = 0$ gilt — der Ansatz $F(b) - F(a)$ muss sichtbar sein.

---

### Aufgabe 5 (AFB II, 14 BE)

**a) Überprüfung der Behauptung**

- $W_{[6;18]} = \int_6^{18} P(t)\,dt = F(18) - F(6) = 36{,}18\ \text{kWh} - 13{,}14\ \text{kWh} = 23{,}04\ \text{kWh}$
- Anteil: $\frac{23{,}04\ \text{kWh}}{46{,}08\ \text{kWh}} = 0{,}5 = 50\ \%$

> *Antwortsatz*: Die Behauptung ist **falsch**: Zwischen 6:00 und 18:00 Uhr werden genau 23,04 kWh und damit **genau die Hälfte** — nicht mehr als die Hälfte — des Tagesenergiebedarfs von 46,08 kWh verbraucht.

**Begründung ohne erneute Rechnung** (Zusatzargument): Da $P$ punktsymmetrisch zu $W(12 \mid 1{,}92)$ ist und $[6;18]$ symmetrisch zu $t = 12$ liegt, gilt $\int_6^{18} P(t)\,dt = 12\ \text{h} \cdot 1{,}92\ \text{kW} = 23{,}04\ \text{kWh}$; das ist genau die Hälfte von $24\ \text{h} \cdot 1{,}92\ \text{kW}$.

**b) Zeitpunkte mit $P(t) = 1{,}92$ kW**

- Gleichung: $\frac{1}{600}t^3 - \frac{3}{50}t^2 + \frac{27}{50}t + \frac{6}{5} = 1{,}92 \iff \frac{1}{600}t^3 - \frac{3}{50}t^2 + \frac{27}{50}t - 0{,}72 = 0$
- Multiplikation mit 600: $t^3 - 36t^2 + 324t - 432 = 0$
- Abspalten der bekannten Lösung $t = 12$ (Probe: $1728 - 5184 + 3888 - 432 = 0$ ✓): $(t - 12)(t^2 - 24t + 36) = 0$
- $t^2 - 24t + 36 = 0 \Rightarrow t = 12 \pm \sqrt{144 - 36} = 12 \pm \sqrt{108} = 12 \pm 6\sqrt{3}$
- $t_1 = 12 - 6\sqrt{3} \approx 1{,}6077$ h; $t_2 = 12$ h; $t_3 = 12 + 6\sqrt{3} \approx 22{,}3923$ h — alle drei liegen in $[0;24]$ ✓
- Umrechnung: $0{,}6077\ \text{h} \cdot 60 = 36{,}5\ \text{min}$ → ca. **1:36 Uhr**; $0{,}3923\ \text{h} \cdot 60 = 23{,}5\ \text{min}$ → ca. **22:24 Uhr**

> *Antwortsatz*: Die Leistungsaufnahme erreicht den Tagesmittelwert von 1,92 kW um etwa 1:36 Uhr, um 12:00 Uhr und um etwa 22:24 Uhr.

**c) Lokale gegen mittlere Änderungsrate**

- Lokal: $P'(12) = \frac{144}{200} - \frac{36}{25} + \frac{27}{50} = 0{,}72 - 1{,}44 + 0{,}54 = -0{,}18\ \frac{\text{kW}}{\text{h}}$
- Mittel über $[6;18]$: $\frac{P(18) - P(6)}{18 - 6} = \frac{1{,}20 - 2{,}64}{12} = \frac{-1{,}44}{12} = -0{,}12\ \frac{\text{kW}}{\text{h}}$
- Erklärung: $P'(t) = \frac{1}{200}(t - 12)^2 - 0{,}18$ ist eine nach oben geöffnete Parabel mit dem Minimum $-0{,}18$ bei $t = 12$. Die lokale Rate am Wendepunkt ist daher der steilste Abfall des Tages, während die mittlere Rate den Gesamtabfall von 1,44 kW gleichmäßig auf 12 Stunden verteilt; deshalb ist $\lvert P'(12) \rvert > \lvert \text{mittlere Rate} \rvert$.

---

### Aufgabe 6 (AFB III, 20 BE)

**a) Modellkritik**

> *These*: Das Modell ist für die Beschreibung **eines** Wintertages und für Tarifvergleiche brauchbar, für jede über den Tag hinausgehende Prognose jedoch ungeeignet.

- **Beleg 1 (Güte der Anpassung)**: Die Abweichungen $\Delta = P_{\text{mess}} - P(t)$ liegen über alle 13 Messzeitpunkte zwischen $-0{,}06$ kW und $+0{,}05$ kW, also betragsmäßig unter 0,06 kW. Bezogen auf die Spitzenlast von 2,64 kW entspricht das einer Abweichung von rund 2,3 % — für eine Ausgleichskurve ist das tragbar.
- **Grenze 1 (Periodizität)**: $P(0) = 1{,}20\ \text{kW} \ne P(24) = 2{,}64\ \text{kW}$. Die Zeitpunkte $t = 0$ und $t = 24$ beschreiben aber denselben Übergang zwischen zwei Tagen. Das Modell ist folglich **nicht periodisch fortsetzbar**: Würde man es für einen zweiten Tag unverändert weiterverwenden, entstünde an der Taggrenze ein Sprung von 1,44 kW, der physikalisch nicht existiert.
- **Grenze 2 (Modellumfang)**: Das Modell kennt nur die Uhrzeit. Wetterumschwünge, Bewölkung, Lüftungsverhalten und die Anwesenheit der Bewohner gehen nicht ein; zudem stützt es sich auf einen einzigen Tag, und an den Rändern des Modellierungszeitraums fehlen Messwerte auf der jeweils anderen Seite, sodass gerade die für die Tariffrage wichtigen Randwerte am unsichersten sind.
- **Abwägung / Urteil**: Für Spitzenlast, Tagesenergie und den Vergleich von Tarifvarianten ist das Modell ein brauchbares Werkzeug; für eine Wochen-, Monats- oder Jahresprognose ist es ungeeignet, weil dafür mindestens die periodische Fortsetzbarkeit und eine Wettervariable nötig wären.

**b) Tarifentscheidung**

**Rechengang**

1. Nachtfenster $[22;24]$: $F(22) = \frac{234256}{2400} - \frac{10648}{50} + \frac{27}{100}\cdot 484 + \frac{6}{5}\cdot 22 = 97{,}6067 - 212{,}96 + 130{,}68 + 26{,}40 = 41{,}7267$ kWh
2. $\int_{22}^{24} P(t)\,dt = 46{,}08 - 41{,}7267 = 4{,}3533$ kWh
3. $W_{\text{Nacht}} = W_{[0;6]} + W_{[22;24]} = 13{,}14\ \text{kWh} + 4{,}3533\ \text{kWh} = 17{,}4933\ \text{kWh} \approx \mathbf{17{,}49\ kWh}$
4. $W_{\text{Tagfenster}} = W_{\text{Tag}} - W_{\text{Nacht}} = 46{,}08 - 17{,}4933 = 28{,}5867\ \text{kWh} \approx \mathbf{28{,}59\ kWh}$
5. Summenprobe: $17{,}49 + 28{,}59 = 46{,}08$ kWh ✓
6. Kosten Nacht-Kombination: $K_{\text{Kombi}} = 17{,}4933 \cdot 0{,}22\ \text{€} + 28{,}5867 \cdot 0{,}30\ \text{€} = 3{,}8485\ \text{€} + 8{,}5760\ \text{€} = 12{,}4245\ \text{€} \approx \mathbf{12{,}42\ €}$
7. Kosten Einheitstarif: $K_{\text{Einheit}} = 46{,}08 \cdot 0{,}28\ \text{€} = 12{,}9024\ \text{€} \approx 12{,}90\ \text{€}$
8. Ersparnis: $\Delta K = 12{,}9024 - 12{,}4245 = 0{,}4779\ \text{€} \approx \mathbf{0{,}48\ €\ pro\ Tag}$
9. Hochrechnung: $100 \cdot 0{,}48\ \text{€} = 47{,}79\ \text{€}$ pro Jahr; die Zählergebühr beträgt 60,00 € pro Jahr → Nettoeffekt $47{,}79 - 60{,}00 = -12{,}21\ \text{€}$.

> *Antwortsatz*: Im Nachtfenster (22:00–6:00 Uhr) werden 17,49 kWh und im Tagfenster 28,59 kWh bezogen; die Tageskosten sinken von 12,90 € auf 12,42 €, also um 0,48 € pro Tag. Bei 100 derartigen Tagen ergibt das eine Ersparnis von 47,79 € pro Jahr, die die Zählergebühr von 60,00 € nicht deckt.

**Begründetes Urteil**

> *Klausur-Satz*: Der Wechsel in den Wärmepumpenstromtarif lohnt sich unter den gegebenen Annahmen **nicht**, da die jährliche Ersparnis von 47,79 € unter den zusätzlichen Zählerkosten von 60,00 € liegt und das Modell selbst an der Taggrenze — also genau im Nachtfenster — mit $P(0) \ne P(24)$ seine größte Unsicherheit aufweist.

- **Gegenargument**: Steigt die Zahl der Kältetage über etwa 126 (denn $60 : 0{,}4779 \approx 125{,}5$) oder erhöhen sich die Arbeitspreise für den Tagstrom überproportional, kippt die Rechnung; auch ein vom Versorger bezuschusster Zähler würde das Ergebnis umkehren.
- **Abwägung**: Da der break-even bei rund 126 Kältetagen liegt und ein durchschnittlicher Winter in NRW deutlich weniger derart kalte Tage hat, überwiegt das Risiko der Fehlentscheidung; zudem ist die Ersparnis klein gegenüber der Modellunsicherheit von rund 2 %.
- **Fazit**: Entscheidend ist nicht der niedrigere Nachtpreis an sich, sondern der **Anteil des Verbrauchs**, der tatsächlich in das Nachtfenster fällt — hier 17,49 kWh von 46,08 kWh, also rund 38 %.

**Plausibilitätskontrolle**: Das Nachtfenster umfasst 8 von 24 Stunden, also ein Drittel des Tages; der darin verbrauchte Anteil von 38 % liegt darüber, weil die Last in den frühen Morgenstunden überdurchschnittlich hoch ist. Das Ergebnis ist damit konsistent mit dem im Material beschriebenen Lastprofil.

---

## 7. Zeit- und Punktstrategie（中文应试策略）

### 7.1 Zeitverteilung

| Aufgabe | AFB | BE | Minuten | 备注 |
|:--|:--:|:--:|:--:|---|
| 1 Material / Messreihe | I | 14 | 8 | 纯送分：读完表格直接写，别超过 8 分钟 |
| 2 Steckbrief | I | 16 | 15 | 列方程 5 分钟，解 LGS 8 分钟，写 Probe 2 分钟 |
| 3 Kurvendiskussion | II | 18 | 18 | 三段式（必要/充分/端点）必须写全 |
| 4 Integral | II | 18 | 18 | 每个 Zwischenergebnis 单列一行，方便复查 |
| 5 Anteile / Zeitpunkte | II | 14 | 13 | a) 是陷阱题，b) 因式分解要写 |
| 6 Modellkritik + Tarif | III | 20 | 18 | 先算后评，5 步收口 |
| **Σ** | | **100** | **90** | 留 0 分钟缓冲 → 若卡住，先跳到下一题再回补 |

### 7.2 「保 80 分」三条（AFB I + II 可复制套路）

1. **Steckbrief 万能四步**：$f(x)=ax^3+bx^2+cx+d$ → 代入值条件 → 代入 $f'(x_E)=0$（必要条件，别漏）→ 相减消元先消 $c$，再消 $b$。写完全套，16 BE 基本全拿。
2. **极值证明三段式**：`Notwendige Bedingung: f'(x)=0` → `Hinreichende Bedingung: f''(x_E) ≠ 0 (oder VZW)` → `Randwertvergleich: f(a), f(b)`。缺任一段扣 2–3 BE，这是 NRW 最常见的失分项。
3. **积分题的「单位 + 中间结果 + 答句」三件套**：$F(t)$ 先写出并求导验算 → $F(b)-F(a)$ 逐步算出中间值 → Antwortsatz 必须带 kWh / €。哪怕最后数字算错，Darstellungsleistung 仍保住一半分。

### 7.3 「抢 20 分」三条（AFB III 五步结构）

1. **These 先行**：第一句就直接下判断（„Das Modell ist … brauchbar, aber … ungeeignet" / „Der Wechsel lohnt sich nicht"），不要铺垫三段背景。
2. **量化 Begründung**：AFB III 也必须有数字——本题用 $\lvert\Delta\rvert \le 0{,}06$ kW、$P(0) \ne P(24)$、$47{,}79\ \text{€} < 60\ \text{€}$ 三处硬数据支撑，比形容词堆砌更能得分。
3. **Gegenargument → Abwägung → Urteil**：主动给出反例（126 Kältetage / 补贴计数器 / 涨价），再说明为什么在当前假设下反例不成立，最后一句 Fazit 回到量纲（„entscheidend ist der Anteil … von rund 38 %"）。

### 7.4 高频失分点三条

1. **忘记 Randwertvergleich**：本题 $P(24) = P(6) = 2{,}64$ kW，全局最大值出现两处；只写 $H(6\mid2{,}64)$ 会丢 2 BE 并被视为概念错误（见 `Klausur-Training/Fehlerlog.md` 同条）。
2. **单位链条断裂**：$\int P\,dt$ 的单位是 kWh 不是 kW；$\overline{P} = \frac{\text{kWh}}{\text{h}} = $ kW；$P'(t)$ 的单位是 kW/h。每处 Einheit 都是独立采分点。
3. **把 Mittelwert 当极值或反之**：$\overline{P} = 1{,}92$ kW 是**全天平均**，不是某个时刻的最小/最大值；只有借助点对称性才恰好与 $P(12)$ 相等，必须在答案中说明这个理由才得分。

---

## 8. Glossar-Zeilen（待合并）

| Deutsch | Chinesisch | Mathe | Beispielsatz |
|---|---|---|---|
| das Lastprofil | 负荷曲线（功率随时间变化曲线） | Mathe | Das Lastprofil wird für $0 \le t \le 24$ durch eine ganzrationale Funktion dritten Grades modelliert. |
| die Leistungszahl (COP) | 性能系数（制热量/耗电量之比） | Mathe | Bei einer Leistungszahl von 3,4 entstehen aus 46,08 kWh Strom etwa 156,7 kWh Wärme. |
| die Stammfunktion | 原函数 | Mathe | Eine Stammfunktion von $P$ lautet $F(t) = \frac{1}{2400}t^4 - \frac{1}{50}t^3 + \frac{27}{100}t^2 + \frac{6}{5}t$. |
| der Steckbrief | （函数）条件清单 | Mathe | Aus dem Steckbrief mit vier Bedingungen ergibt sich das lineare Gleichungssystem für $a$, $b$, $c$ und $d$. |
| die Punktsymmetrie | 点对称（关于拐点中心对称） | Mathe | Wegen der Punktsymmetrie zum Wendepunkt gilt $\overline{P} = P(12) = 1{,}92$ kW. |
| die Plausibilitätskontrolle | 合理性检验 | Mathe | Die Plausibilitätskontrolle über die Wärmeenergie bestätigt das Integral als Tagesenergieverbrauch. |

---

## 9. Vernetzung

- `03_Mathe/Ganzrationale-Funktionen-Kurvendiskussion.md` — 极值点/拐点证明的标准写法
- `03_Mathe/Integralrechnung-Sechs-Konzepte.md` — 定积分的六种语义（Fläche, Kumulation, Mittelwert …）
- `03_Mathe/Steckbriefaufgaben-und-Funktionsanpassung.md` — Steckbrief 与拟合
- `03_Mathe/Klausur-Training/Mathe-EF-Klausurtraining-Analysis.md` — 同题型姊妹篇（雨水池截面，三次函数最值，无积分）
- `04_Physik/` — Leistung $P = E/t$ 与 Energieeinheit kWh 的物理侧对照

⏳ 待确认：本卷定位 Q1（含 Integralrechnung）；若本班 EF 尚未讲 Integral，请先做 Aufgabe 1–3， Aufgabe 4–6 待 Q1 补做。
