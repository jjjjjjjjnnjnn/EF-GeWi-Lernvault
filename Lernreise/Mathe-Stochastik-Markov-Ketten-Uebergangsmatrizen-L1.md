---
fach: Mathe
thema: "Stochastik & Lineare Algebra: Markov-Ketten und Uebergangsmatrizen"
level: 1
ziel: Klausur
xp: 100
operatoren: [modellieren, multiplizieren, bestimmen]
klausurrelevant: true
datum: 2026-10-03
tags: [EF, Mathe, Stochastik, Lineare-Algebra, Markov-Kette, Uebergangsmatrix, Grenzverteilung, Fixvektor]
version: Lesson-v3
---

# Lernreise: Stochastik & Lineare Algebra: Markov-Ketten und Uebergangsmatrizen (L1, Ziel Klausur)

<!-- Campaign: Stochastische-Prozesse-und-Matrizen | Episode 3/10 | Krise: Wohin wandern Millionen E-Scooter in einer Grossstadt, und pendelt sich jemals ein stabiles Gleichgewicht ein? | Zielgroessen: Zustandsdiagramm, Uebergangsmatrix M, Stochastische Matrix, Matrizenmultiplikation, Stationaere Verteilung, Fixvektor | Tool: lego -->

## Schritt 1 — entdecken: Das Raetsel der wandernden Leihraeder
ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能将现实世界中的离散随机迁移过程抽象为状态转移图（Zustandsdiagramm）并建立标准随机转移矩阵（stochastische Uebergangsmatrix $M$）。
2. 中文：能熟练运用矩阵乘法计算经过 $n$ 个步长后的状态概率分布向量（$\vec{v}_n = M^n \cdot \vec{v}_0$）。
3. 中文：能在高考随机过程综合大题（AFB I/II/III）中通过求解齐次线性方程组（$(M - E)\vec{v} = \vec{0}$ 结合归一化条件 $\sum v_i = 1$）精准求解系统长期演化的稳态平衡向量（stationaere Grenzverteilung / Fixvektor）。

### Hook / Phaenomen

Ein modernes Mobilitaetsunternehmen betreibt zehntausend knallgruene E-Scooter in den drei Stadtbezirken einer Metropole: Zentrum ($Z$), Wohnviertel ($W$) und Universitaetscampus ($U$). Jeden Tag mieten Zehntausende Buerger die Roller, fahren kreuz und quer durch die Stadt und stellen sie an ihrem Zielort wieder ab. Die Verkehrsanalysten messen stabile taegliche Uebergangswahrscheinlichkeiten: 60 Prozent der im Zentrum ausgeliehenen Roller verbleiben im Zentrum, 30 Prozent landen im Wohnviertel und 10 Prozent am Campus. Aehnliche feste Wanderungsraten gelten fuer die anderen beiden Stadtteile. Zu Beginn des Jahres startet das Unternehmen ein riskantes Experiment: Am 1. Januar werden alle zehntausend Roller ausschliesslich im Zentrum aufgestellt! Am naechsten Tag stehen schon Tausende im Wohnviertel. Nach zehn Tagen scheinen die Roller voellig wild verteilt. Doch als die Mathematiker die Verteilung nach hundert Tagen analysieren, erleben die Flottenmanager eine verblueffende Sensation: Egal, wo die Roller am Anfang standen – nach einigen Wochen stellt sich Tag fuer Tag exakt dieselbe prozentuale Verteilung zwischen den Bezirken ein! Ein unsichtbares mathematisches Gravitationsgesetz haelt das System in perfekter Balance: die stationaere Grenzverteilung einer Markov-Kette.

`Klausur-Satz: Ein stochastischer Prozess heisst Markov-Kette mit Gedaechtnislosigkeit, wenn die Uebergangswahrscheinlichkeit in den Folgezustand ausschliesslich vom aktuellen Ist-Zustand und nicht von der vorangegangenen Vorgeschichte abhaengt.`

## Schritt 2 — entdecken: Der Werkzeugkasten der stochastischen Prozesse
PRETRAINING术语盒（核心4词，先读三遍中德，合书自测中文→德语）：

- 随机转移矩阵 — Stochastische Uebergangsmatrix ($M$): 一种方阵，其中第 $j$ 列第 $i$ 行的元素 $m_{ij}$ 表示从状态 $j$ 转移到状态 $i$ 的条件概率，每列元素之和严格等于 1。 Eine quadratische Matrix, deren Spaltensummen jeweils exakt 1 ergeben und deren Eintraege Uebergangswahrscheinlichkeiten darstellen.
- 状态向量 — Zustandsvektor ($\vec{v}_n$): 列出在时刻 $n$ 系统处于各个可能状态的绝对数量或相对概率分布的列向量。 Ein Spaltenvektor, der die prozentuale oder absolute Verteilung auf die Systemzustaende zum Zeitschritt $n$ abbildet.
- 稳态分布 / 不动点向量 — Stationaere Verteilung / Fixvektor ($\vec{v}^*$): 满足方程 $M \cdot \vec{v}^* = \vec{v}^*$ 的概率向量，一旦系统达到该状态，后续转移不再发生任何宏观分布改变。 Ein Wahrscheinlichkeitsvektor, der sich unter der Multiplikation mit der Uebergangsmatrix nicht mehr veraendert.
- 遍历性 / 收敛定理 — Ergodizitaet: 当转移矩阵的所有元素在某次幂后严格大于零时，系统必定从任意初始向量收敛于唯一的稳态平衡分布。 Die Eigenschaft regulaerer Markov-Ketten, unabhaengig vom Startzustand gegen dieselbe eindeutige Grenzverteilung zu konvergieren.

## Schritt 3 — entdecken: Das Modell des dynamischen Zustandsuebergangs
ENTDECKEN（1概念 + 1文字图解）：

```diagram
Zustandsdiagramm fuer 2 Zustaende (z. B. Sonnenschein S vs. Regen R):

             0,8 (bleibt sonnig)
           +----+
           |    v
         [ SONNE (S) ] <========= 0,4 (wird sonnig) ========+
               |                                            |
         0,2 (wird regnerisch)                              |
               |                                            |
               v                                            |
         [ REGEN (R) ] =========== 0,6 (bleibt regnerisch) -+
           |    ^
           +----+
```

Zugehoerige Uebergangsmatrix $M$ (Spalten = Von, Zeilen = Nach):
$$M = \begin{pmatrix} P(S \to S) & P(R \to S) \\ P(S \to R) & P(R \to R) \end{pmatrix} = \begin{pmatrix} 0{,}8 & 0{,}4 \\ 0{,}2 & 0{,}6 \end{pmatrix}$$
(Spaltensumme Spalte 1: $0{,}8 + 0{,}2 = 1{,}0$; Spalte 2: $0{,}4 + 0{,}6 = 1{,}0$!).

`Klausur-Satz: Der Zustand zur Zeit n berechnet sich durch die n-fache Multiplikation der Matrix mit dem Anfangsvektor v_0 gemaess v_n = M^n * v_0.`

## Schritt 4 — ausprobieren: Das Rechenlabor fuer Wetter- und Markov-Prognosen

[Werkzeug: lego]

AUFGABE (multiplizieren & bestimmen, AFB I/II):
Gegeben ist die Uebergangsmatrix des Wettermodells:
$$M = \begin{pmatrix} 0{,}8 & 0{,}4 \\ 0{,}2 & 0{,}6 \end{pmatrix}$$
mit Zustand 1 = Sonne ($S$) und Zustand 2 = Regen ($R$).
Am Montag (Tag 0) regnet es zu 100 Prozent: $\vec{v}_0 = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$.
1. Berechne die Wahrscheinlichkeitsverteilung fuer Dienstag (Tag 1) und Mittwoch (Tag 2).
2. Bestimme die stationaere Grenzverteilung (den Fixvektor) $\vec{v}^* = \begin{pmatrix} x \\ y \end{pmatrix}$ mit der Normierungsbedingung $x + y = 1$.

MUSTERLOESUNG:
1. Schrittweise Entwicklung:
   - Tag 1 (Dienstag):
     $$\vec{v}_1 = M \cdot \vec{v}_0 = \begin{pmatrix} 0{,}8 & 0{,}4 \\ 0{,}2 & 0{,}6 \end{pmatrix} \cdot \begin{pmatrix} 0 \\ 1 \end{pmatrix} = \begin{pmatrix} 0{,}8 \cdot 0 + 0{,}4 \cdot 1 \\ 0{,}2 \cdot 0 + 0{,}6 \cdot 1 \end{pmatrix} = \begin{pmatrix} 0{,}4 \\ 0{,}6 \end{pmatrix}$$
     (Dienstag regnet es noch mit 60 % Wahrscheinlichkeit, Sonne mit 40 %).
   - Tag 2 (Mittwoch):
     $$\vec{v}_2 = M \cdot \vec{v}_1 = \begin{pmatrix} 0{,}8 & 0{,}4 \\ 0{,}2 & 0{,}6 \end{pmatrix} \cdot \begin{pmatrix} 0{,}4 \\ 0{,}6 \end{pmatrix} = \begin{pmatrix} 0{,}8 \cdot 0{,}4 + 0{,}4 \cdot 0{,}6 \\ 0{,}2 \cdot 0{,}4 + 0{,}6 \cdot 0{,}6 \end{pmatrix} = \begin{pmatrix} 0{,}32 + 0{,}24 \\ 0{,}08 + 0{,}36 \end{pmatrix} = \begin{pmatrix} 0{,}56 \\ 0{,}44 \end{pmatrix}$$
     (Am Mittwoch liegt die Sonnenwahrscheinlichkeit bereits bei 56 %).
2. Bestimmung der stationaeren Grenzverteilung:
   - Ansatz: $M \cdot \vec{v}^* = \vec{v}^* \iff (M - E) \cdot \vec{v}^* = \vec{0}$:
     $$\begin{pmatrix} 0{,}8 & 0{,}4 \\ 0{,}2 & 0{,}6 \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} x \\ y \end{pmatrix}$$
   - Zeile 1:
     $$0{,}8x + 0{,}4y = x \iff 0{,}4y = 0{,}2x \iff x = 2y$$
   - Normierungsbedingung einsetzen ($x + y = 1$):
     $$2y + y = 1 \iff 3y = 1 \implies y = \frac{1}{3} \approx 33{,}3\,\%$$
     $$x = 2y = \frac{2}{3} \approx 66{,}7\,\%$$
   - Ergebnis: Auf lange Sicht scheint an genau $\frac{2}{3}$ aller Tage die Sonne und an $\frac{1}{3}$ aller Tage regnet es – vollkommen unabhaengig vom Wetter am Starttag!

`Klausur-Satz: Bei Aufgaben zu Stochastik & Lineare Algebra: Markov-Ketten und Uebergangsmatrizen muss die theoriegeleitete Begruendung stets durch exakte Fachtermini und empirische Belege abgesichert werden.`

## Schritt 5 — ausprobieren: Duell der Berechnungsmethoden: Potenzierung vs. Fixvektor

VERGLEICH: Matrizenpotenz M^n vs. Lineares Gleichungssystem M*v=v (选程序)

- Position A (Matrizenpotenz $M^{100}$ / Naeherungsverfahren):
  - Vorgehensweise: Mit dem GTR/CAS-Taschenrechner wird die Matrix 100-mal mit sich selbst multipliziert.
  - Vorteil: Geht schnell im hilfsmittelfreien Teil nicht, aber liefert am Computer einen ersten Eindruck.
  - Nachteil: Liefert nur Gleitkommanaeherungen und keinen algebraisch exakten mathematischen Beweis.
- Position B (Fixvektor-Berechnung $(M - E)\vec{v} = \vec{0}$):
  - Vorgehensweise: Aufstellen eines linearen Gleichungssystems mit anschliessender Normierung $\sum v_i = 1$.
  - Vorteil: Liefert die exakten Brueche, beweist die Eindeutigkeit des Gleichgewichts und erhaelt die volle Punktzahl im Abitur.

Entscheidungsregel fuer die Klausur:
Vergiss bei der Fixvektorberechnung niemals die Normierungszeile ($x + y + z = 1$)! Weil die Spaltensummen der Matrix 1 ergeben, ist die Determinante von $(M - E)$ immer null (linear abhaengige Zeilen); ohne die Normierungsgleichung hat das LGS unendlich viele Loesungen!

## Schritt 6 — check: Klausur-Transfer Google PageRank und Kundenfluktuation

PRUEFUNGSSZENARIO (KLP NRW Mathematik LK Inhaltsfeld 3: Stochastik & Lineare Algebra):

### AFB I: Matrix-Aufstellung
Drei Streaming-Dienste $A$, $B$ und $C$ konkurrieren um Abonnenten. 
Stelle die $3 \times 3$-Uebergangsmatrix $M$ auf, wenn monatlich 10 % der Kunden von $A$ zu $B$ und 5 % zu $C$ wechseln, waehrend $B$ 80 % seiner Kunden haelt und 20 % an $A$ verliert, und $C$ stabil bei 90 % Kundenbindung bleibt (10 % wechseln zu $A$).

### AFB II: Grenzverteilung berechnen
Berechne die langfristigen Marktanteile der drei Konzerne durch Loesen des Gleichungssystems $(M - E)\vec{v} = \vec{0}$.

### AFB III: PageRank-Algorithmus
Der beruehmte Google-PageRank-Algorithmus modelliert das weltweite Websurfen als riesige Markov-Kette ueber Milliarden von Webseiten.
Diskutiere, warum Google einen "Zufaelligkeits-Dampfungsfaktor" (Damping Factor $d = 0{,}85$) einfuehrte, um zu verhindern, dass Web-Surfer in toten Schleifen (Dead Ends / Sackgassen ohne ausgehende Links) gefangen bleiben.

## Schritt 7 — check: Format-Check & Scoring

30 XP Schnelltest zur Verstaendigungssicherung:

FRAGE: Welche mathematische Eigenschaft muessen die Spalten einer stochastischen Uebergangsmatrix immer erfuellen?
ANTWORT: Die Summe aller Elemente in jeder einzelnen Spalte muss exakt gleich 1 (100 %) sein, da sich die Gesamtwahrscheinlichkeit aller moeglichen Folgezustaende zu 1 addieren muss.

FRAGE: Warum darf man beim Loesen von (M - E)*v = 0 eine der Gleichungen einfach streichen und durch die Normierungsbedingung x + y + ... = 1 ersetzen?
ANTWORT: Weil die Zeilen der Matrix (M - E) aufgrund der Spaltensummen-Eigenschaft stets linear abhaengig sind (eine Zeile ist redundant). Die Normierungsgleichung liefert die notwendige zusaetzliche Information, um eine eindeutige Loesung zu erhalten.

`Klausur-Satz: Die differenzierte Reflexion erfordert eine stringente Verknuepfung von theoretischem Kriterienkatalog und konkretem Klausurmaterial.`

## Schritt 8 — reflexion: Meisterschaft & Naechste Mission

REFLEXION:
Du hast die bruederliche Verschmelzung von Linearer Algebra und Wahrscheinlichkeitsrechnung gemeistert. Du kannst dynamische Prozesse modellieren, Matrizenpotenzen beherrschen und Fixvektoren krisenfest berechnen.

Im kommenden Mathematik-Modul wenden wir uns den Hypothesentests zu: Signifikanztests, Fehler 1. und 2. Art (Alpha- und Beta-Fehler) und Entscheidungsregeln im Qualitaetsmanagement.
