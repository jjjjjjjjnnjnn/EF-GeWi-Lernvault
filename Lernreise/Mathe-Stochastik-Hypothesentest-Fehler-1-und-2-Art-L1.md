---
fach: Mathe
thema: "Stochastik: Einseitiger und zweiseitiger Hypothesentest sowie Fehler 1. und 2. Art"
level: 1
ziel: Klausur
xp: 100
operatoren: [berechnen, interpretieren, beurteilen]
klausurrelevant: true
datum: 2026-10-03
tags: [EF, Mathe, Stochastik, Hypothesentest, Signifikanzniveau, Fehler-1-Art, Fehler-2-Art, Binomialverteilung]
version: Lesson-v3
---

# Lernreise: Stochastik: Einseitiger und zweiseitiger Hypothesentest sowie Fehler 1. und 2. Art (L1, Ziel Klausur)

<!-- Campaign: Stochastik-und-Wahrscheinlichkeit | Episode 5/10 | Krise: Wie faellt eine pharmazeutische Zulassungsbehoerde oder ein Industriehersteller eine gerichtsfeste Entscheidung unter Ungewissheit, ohne sich von Zufallsschwankungen blenden zu lassen? | Zielgroessen: Nullhypothese, Gegenhypothese, Signifikanzniveau, Annahme- und Ablehnungsbereich, alpha-Fehler, beta-Fehler | Tool: balance-board -->

## Schritt 1 — entdecken: Das Dilemma des Richters und der statistische Beweis
ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能准确构建二项分布假设检验框架：设立零假设（Nullhypothese $H_0: p \le p_0$ 或 $p = p_0$）、备择假设（Gegenhypothese $H_1$）、明确样本容量 $n$ 与显著性水平（Signifikanzniveau $\alpha$）。
2. 中文：能通过二项分布累积概率表或正态近似准确计算临界值（kritischer Wert $k$），划分接受域（Annahmebereich $A$）与拒绝域（Ablehnungsbereich / Verwerfungsbereich $\bar{A}$）。
3. 中文：能在高考数学综合题（AFB I/II/III）中深刻辨析并量化计算第一类错误（Fehler 1. Art / $\alpha$-Fehler: 弃真）与第二类错误（Fehler 2. Art / $\beta$-Fehler: 存伪），并分析样本量 $n$ 对两类错误权衡的影响。

### Hook / Phaenomen

Ein Pharmaunternehmen behauptet stolz, ein neues Schmerzmittel lindere chronische Migraene bei mindestens $80\,\%$ aller Patienten. Ein unabhaengiges Verbraucherschutzinstitut vermutet jedoch, dass das Medikament in Wahrheit unwirksamer ist und die Erfolgsquote unter $80\,\%$ liegt. Nun testen Aerzte das Mittel an einer Stichprobe von $n = 100$ zufaellig ausgewaehlten Probanden. Angenommen, genau 74 Patienten berichten von einer Besserung. Reicht dieser Befund aus, um den Hersteller oeffentlich des Betrugs zu bezichtigen? Was, wenn das Mittel in Wirklichkeit hervorragend wirkt und die 26 Misserfolge rein zufaellig in dieser einen Stichprobe aufgetreten sind? Vor Gericht gilt: "In dubio pro reo" (im Zweifel fuer den Angeklagten). In der Stochastik uebersetzt sich dieses Prinzip in den Hypothesentest: Die Nullhypothese gilt so lange als wahr, bis die empirischen Daten so extrem unwahrscheinlich sind, dass ein reiner Zufall nahezu ausgeschlossen werden kann!

`Klausur-Satz: Der Fehler 1. Art bezeichnet die Wahrscheinlichkeit, die Nullhypothese H0 irrtuemlich abzulehnen, obwohl sie in Wirklichkeit wahr ist; diese Irrtumswahrscheinlichkeit wird durch das vorgegebene Signifikanzniveau alpha nach oben begrenzt.`

## Schritt 2 — entdecken: Das mathematische Vokabular der Testtheorie
PRETRAINING术语盒（核心4词，先读三遍中德，合书自测中文→德语）：

- 零假设与备择假设 — Nullhypothese ($H_0$) & Gegenhypothese ($H_1$): Die zu pruefende Basisaussage (meist der Status quo oder die Behauptung des Herstellers), die nur verworfen wird, wenn die Stichprobe signifikant dagegen spricht.
- 显著性水平 — Signifikanzniveau ($\alpha$): Die maximal zulaessige Obergrenze fuer die Wahrscheinlichkeit, die Nullhypothese faelschlicherweise abzulehnen (haeufig $\alpha = 0{,}05$ oder $\alpha = 0{,}01$).
- 拒绝域与临界值 — Ablehnungsbereich ($\bar{A}$) & Kritischer Wert ($k$): Die Menge aller Stichprobenergebnisse, bei deren Auftreten die Nullhypothese zugunsten von $H_1$ verworfen wird.
- 第一类与第二类错误 — Fehler 1. Art ($\alpha$) & Fehler 2. Art ($\beta$): Fehler 1. Art = Ablehnung von $H_0$, obwohl $H_0$ wahr ist; Fehler 2. Art = Beibehaltung von $H_0$, obwohl $H_1$ (eine alternative Wahrscheinlichkeit $p_1$) zutrifft.

## Schritt 3 — entdecken: Die Geometrie des einseitigen Signifikanztests
ENTDECKEN（1概念 + 1文字图解）：

```diagram
Struktur eines linksseitigen Hypothesentests:
H0: p >= 0.80   vs.   H1: p < 0.80   (Stichprobe n = 100, alpha = 0.05)

Zaehldichte P(X = k):
          |                   . * * .
          |                . *         * .
          |              .                 .
          |            .                     .
          |          .                         .
  --------+---------+----------------------------+-------> Trefferanzahl X
          0    ...  k            ...            n = 100
          |<-  A_quer  ->| |<------  Annahmebereich A  ------>|
           (Ablehnung H0)         (H0 wird beibehalten)

Bedingung fuer den kritischen Wert k:
   P_{p=0.80}(X <= k) <= alpha = 0.05   und   P_{p=0.80}(X <= k+1) > 0.05

Entscheidungstabelle:
                           Wirklichkeit: H0 ist wahr | Wirklichkeit: H0 ist falsch
Entscheidung: H0 annehmen | Richtige Entscheidung    | FEHLER 2. ART (beta)
Entscheidung: H0 ablehnen | FEHLER 1. ART (<= alpha) | Richtige Entscheidung (1 - beta)
```

## Schritt 4 — ausprobieren: Das Wahrscheinlichkeits-Labor der Entscheidungsfehler
[Werkzeug: balance-board]
Balanciere auf dem stochastischen Balance-Board das Verhaeltnis zwischen Signifikanzniveau $\alpha$ und dem Fehler 2. Art $\beta$ fuer einen Test mit $n = 100$:

| Gewaehlte Teststrategie | Signifikanzniveau $\alpha$ | Kritischer Wert $k$ | Annahmebereich $A$ | Ablehnungsbereich $\bar{A}$ | Fehler 2. Art $\beta$ (bei $p_1 = 0{,}70$) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Streng gegen falsche Anschuldigung** | $\alpha = 0{,}01$ (1%) | $k = 70$ | $[71; 100]$ | $\{0; \dots; 70\}$ | $\beta = P_{p=0{,}70}(X \ge 71) \approx 54{,}9\,\%$ |
| **Standard-Signifikanztest** | $\alpha = 0{,}05$ (5%) | $k = 73$ | $[74; 100]$ | $\{0; \dots; 73\}$ | $\beta = P_{p=0{,}70}(X \ge 74) \approx 22{,}4\,\%$ |
| **Aggressiver Aufdeckertest** | $\alpha = 0{,}10$ (10%) | $k = 75$ | $[76; 100]$ | $\{0; \dots; 75\}$ | $\beta = P_{p=0{,}70}(X \ge 76) \approx 11{,}7\,\%$ |

*Erkenntnis*: Je kleiner man $\alpha$ waehlt (Schutz vor Fehler 1. Art), desto groesser wird zwangslaeufig $\beta$ (Gefahr, eine echte Unwirksamkeit nicht zu bemerken). Die einzige Moeglichkeit, BEIDE Fehler gleichzeitig zu senken, ist die Erhoehung des Stichprobenumfangs $n$!

`Klausur-Satz: Bei Aufgaben zu Stochastik: Einseitiger und zweiseitiger Hypothesentest sowie Fehler 1. und 2. Art muss die theoriegeleitete Begruendung stets durch exakte Fachtermini und empirische Belege abgesichert werden.`

## Schritt 5 — check: Das Konzeptduell
VERGLEICH: Fehler 1. Art ($\alpha$-Fehler) versus Fehler 2. Art ($\beta$-Fehler)

- **Fehler 1. Art ($\alpha$-Fehler, "Der ungerechtfertigte Alarm")**: Die Nullhypothese $H_0$ stimmt in Wirklichkeit (das Medikament ist wirksam), aber durch eine unglueckliche Zufallsauswahl der Stichprobe landet man im Ablehnungsbereich $\bar{A}$ und erklaert das Produkt faelschlicherweise fuer mangelhaft. Dieser Fehler ist durch $\alpha$ mathematisch strikt kontrollierbar.
- **Fehler 2. Art ($\beta$-Fehler, "Das uebersehene Problem")**: Die Nullhypothese $H_0$ ist in Wirklichkeit falsch (das Medikament ist minderwertig mit $p_1 < p_0$), aber die Stichprobe landet zufaellig im Annahmebereich $A$. Man bemerkt den Mangel nicht und belaesst alles beim Alten. $\beta$ kann erst berechnet werden, wenn ein konkreter Alternativwert fuer $p_1$ vorgegeben ist!

## Schritt 6 — szenario: Die Klausuraufgabe
Eine Gluecksspielbehoerde testet einen Wuerfel auf Fairness. Der Betreiber behauptet, die Sechs faellt mit $p = \frac{1}{6}$. Die Pruefer vermuten Falschspiel zugunsten der Sechs ($p > \frac{1}{6}$). Es werden $n = 600$ Wuerfe ausgefuehrt. Das Signifikanzniveau betraegt $\alpha = 0{,}05$.

1. **AFB I**: Formuliere die Nullhypothese $H_0$ sowie die Gegenhypothese $H_1$ und bestimme den Erwartungswert $\mu$ und die Standardabweichung $\sigma$ unter der Annahme, dass $H_0$ wahr ist.
2. **AFB II**: Ermittle mithilfe der Normalverteilungsnaeherung (mit Stetigkeitskorrektur) oder der kumulierten Binomialverteilung den kleinstmoeglichen kritischen Wert $k$, ab dem der Wuerfel beschlagnahmt wird.
3. **AFB III**: Angenommen, der Wuerfel wurde tatsaechlich manipuliert und zeigt die Sechs mit einer Wahrscheinlichkeit von $p_1 = 0{,}25$. Berechne die Wahrscheinlichkeit eines Fehlers 2. Art und beurteile die Guete des Tests.

`Musterloesungshinweis`:
- AFB I: $H_0: p \le \frac{1}{6}$ vs. $H_1: p > \frac{1}{6}$ (rechtsseitiger Test). $\mu = n \cdot p = 600 \cdot \frac{1}{6} = 100$. $\sigma = \sqrt{n \cdot p \cdot (1-p)} = \sqrt{600 \cdot \frac{1}{6} \cdot \frac{5}{6}} = \sqrt{83{,}33} \approx 9{,}13$. Da $\sigma > 3$, ist die Laplace-Bedingung erfuellt.
- AFB II: Rechtsseitiger Ablehnungsbereich $\bar{A} = \{k; \dots; 600\}$. Gesucht ist $k$ mit $P_{p=1/6}(X \ge k) \le 0{,}05 \iff P(X \le k - 1) \ge 0{,}95$. Mit $z_{0{,}95} \approx 1{,}645$: $\frac{(k - 0{,}5) - 100}{9{,}13} \ge 1{,}645 \implies k - 0{,}5 \ge 115{,}02 \implies k \ge 115{,}52$, also $k = 116$. Ablehnungsbereich ist $[116; 600]$.
- AFB III: Ein Fehler 2. Art liegt vor, wenn trotz gezinktem Wuerfel ($p_1 = 0{,}25$) nicht abgelehnt wird, also $X \in A = \{0; \dots; 115\}$. Unter $p_1 = 0{,}25$ ist $\mu_1 = 600 \cdot 0{,}25 = 150$, $\sigma_1 = \sqrt{600 \cdot 0{,}25 \cdot 0{,}75} = \sqrt{112{,}5} \approx 10{,}61$. $P_{p=0{,}25}(X \le 115) = \Phi\left(\frac{115{,}5 - 150}{10{,}61}\right) = \Phi(-3{,}25) \approx 0{,}0006 = 0{,}06\,\%$. Der Test entlarvt den gezinkten Wuerfel mit ueberwaeltigender Wahrscheinlichkeit von $99{,}94\,\%$ (hohe Teststaerke / Power).

## Schritt 7 — muendlich: Die muendliche Blitzpruefung
Simuliere ein muendliches Abiturszenario:

FRAGE: Pruefer: "Warum kann man die Nullhypothese niemals mathematisch 'beweisen', sondern sie lediglich 'nicht verwerfen'?"

ANTWORT: Pruefling: "Ein Hypothesentest ist asymmetrisch aufgebaut. Die Nullhypothese $H_0$ wird als Unschuldsvermutung vorangestellt, und wir begrenzen lediglich die Wahrscheinlichkeit eines Fehlers 1. Art durch das Signifikanzniveau $\alpha$. Liegt das Stichprobenergebnis im Annahmebereich, bedeutet dies keineswegs, dass $p$ exakt dem postulierten Wert entspricht. Es bedeutet lediglich, dass die empirischen Daten nicht ausreichend extrem waren, um $H_0$ bei dem gewaehlten Sicherheitsniveau zweifelsfrei zu widerlegen. Zudem kann der Fehler 2. Art $\beta$ erheblich sein, sodass auch voellig andere Wahrscheinlichkeiten mit dem Stichprobenergebnis vereinbar waeren."

## Schritt 8 — reflexion: Metakognition und Fehlerschutz
Reflektiere deine Konzeptbeherrschung mit 3 diagnostischen Kontrollfragen:

1. Verwechselst du beim Formulieren der Hypothesen niemals $H_0$ und $H_1$ (Beachte: Das, was der Forscher statistisch absichern will, gehoert meist in $H_1$)?
2. Kannst du den Unterschied zwischen einem linksseitigen ($H_1: p < p_0$) und einem rechtsseitigen Test ($H_1: p > p_0$) anhand der Lage des Ablehnungsbereichs sofort visualisieren?
3. Warum ist die Aussage 'Das Testergebnis belegt $H_0$ mit 95% Wahrscheinlichkeit' mathematischer Unsinn?

## Schritt 9 — reflexion: Der Spickzettel fuer die Klausur
SPICKZETTEL (Maximal 5 Merkpunkte, ideal zum Einpraegen vor dem Klausurbeginn):

- **Hypothesenpaar**: $H_0$ enthaelt immer das Gleichheitszeichen ($\le, \ge, =$); $H_1$ ist die Gegenvermutung ($<, >, \ne$).
- **Ablehnungsbereich**: Linksseitig $\bar{A} = \{0; \dots; k\}$ mit $P(X \le k) \le \alpha$; Rechtsseitig $\bar{A} = \{k; \dots; n\}$ mit $P(X \ge k) \le \alpha$.
- **Fehler 1. Art ($\alpha$)**: $H_0$ ist wahr, wird aber irrtuemlich verworfen; maximal gleich $\alpha$.
- **Fehler 2. Art ($\beta$)**: $H_0$ ist falsch ($p_1$), wird aber faelschlicherweise beibehalten: $\beta = P_{p_1}(X \in A)$.
- **Fehler-Kopplung**: Verkleinerung von $\alpha$ vergroessert $\beta$; nur hoeheres $n$ senkt beide Fehler gleichzeitig.
