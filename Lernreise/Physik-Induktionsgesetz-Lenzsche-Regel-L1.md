---
fach: Physik
thema: "Faradaysches Induktionsgesetz und Lenzsche Regel"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, herleiten, beurteilen]
klausurrelevant: true
datum: 2026-10-03
tags: [EF, Physik, Elektromagnetismus, Induktion, Lenzsche-Regel, Wirbelstrom]
version: Lesson-v3
---

# Lernreise: Faradaysches Induktionsgesetz und Lenzsche Regel (L1, Ziel Klausur)

<!-- Campaign: Elektrodynamik-und-Induktion | Episode 5/10 | Krise: Wie bremst ein unsichtbares Magnetfeld freifallende Koerper beruehrungslos ab? | Zielgroessen: Magnetischer Fluss, Induktionsgesetz, Lenzsche Regel, Wirbelstrom | Tool: lego -->

## Schritt 1 — entdecken: Der Fallschirmspringer im Kupferrohr
ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能说清磁通量（Magnetischer Fluss $\Phi = B \cdot A$）与法拉第电磁感应定律（Faradaysches Induktionsgesetz $U_{\text{ind}} = -n \cdot \frac{d\Phi}{dt}$）的物理机制。
2. 中文：能运用楞次定律（Lenzsche Regel）精准推导感应电流及其磁场的方向，解释为什么它是能量守恒在电磁学中的直接体现。
3. 中文：能在现代科技综合考题（AFB I/II/III）中分析涡流（Wirbelstrom）阻尼现象，计算跳楼机与高速列车电磁制动的力学与热能转化过程。

### Hook / Phaenomen

Du laesst eine massive Eisenkugel durch ein senkrechtes, zwei Meter langes Kunststoffrohr fallen. Nach exakt 0,64 Sekunden schlaegt sie mit einem lauten Knall unten auf dem Boden auf – freier Fall pur mit einer Erdbeschleunigung von fast zehn Metern pro Quadratsekunde. Nun nimmst du eine identisch schwere Kugel aus Neodym, dem staerksten Dauermagneten der Welt, und laesst sie durch ein massives Kupferrohr gleiten. Kupfer ist voellig unmagnetisch; die Kugel bleibt an der Rohrwand nirgendwo haften. Doch was jetzt geschieht, widerspricht jeder alltaeglichen Intuition: Die Magnetkugel rast nicht herab, sondern schwebt wie in zaehem Honig in Zeitlupe nach unten und braucht ueber zehn Sekunden bis zum Ausstieg. Unsichtbare Kraefte bremsen das Metall vollkommen lautlos und beruehrungsfrei ab. Genau dieser geheimnisvolle physikalische Daempfungseffekt rettet Menschenleben in den Bremssystemen moderner Freifalltuerme und ICE-Zuege.

`Klausur-Satz: Jede zeitliche Aenderung des magnetischen Flusses durch eine Leiterschleife induziert eine Spannung, deren resultierender Strom seiner Entstehungsursache stets entgegenwirkt.`

## Schritt 2 — entdecken: Die Leitbegriffe der Elektrodynamik
PRETRAINING术语盒（核心4词，先读三遍中德，合书自测中文→德语）：

- 磁通量 — Magnetischer Fluss ($\Phi = \vec{B} \cdot \vec{A}$): 穿过某一封闭导线框面积的磁感线总数。 Das Mass fuer die Anzahl der magnetischen Feldlinien, die eine gegebene Leiterschleifenflaeche senkrecht durchsetzen. Mechanismus: $\Phi = B \cdot A \cdot \cos(\alpha)$.
- 法拉第电磁感应定律 — Faradaysches Induktionsgesetz ($U_{\text{ind}} = -n \cdot \frac{d\Phi}{dt}$): 导体回路中感应电动势的大小与穿过回路的磁通量的变化率成正比。 Die induzierte Spannung ist direkt proportional zur zeitlichen Aenderungsrate des magnetischen Flusses.
- 楞次定律 — Lenzsche Regel: 感应电流的效果总是反抗引起感应电流的原因。 Der Induktionsstrom ist stets so gerichtet, dass sein eigenes Magnetfeld der urspruenglichen Flussunteraenderung entgegenwirkt (Garant der Energieerhaltung).
- 涡流 — Wirbelstrom: 处于变化磁场中的块状金属导体内部感应出的闭合循环电流。 Geschlossene Kreisstroeme in massiven Leitern, die zu starker Erwaermung und elektromagnetischer Abbremsung fuehren.

## Schritt 3 — entdecken: Der Wirbelstrom-Daempfungsmechanismus
ENTDECKEN（1概念 + 1文字图解）：

```diagram
Bewegung des Magneten nach unten (v v)
          [ N ]
          [ S ]  (Magnetischer Nordpol taucht ein)
            |
            v
+-----------------------+  <-- Oberer Rand der Leiterschleife:
|  (B_induktiv nach     |      Fluss nimmt ab -> anziehender Gegenpol induziert!
|   oben gerichtet)     |
+-----------------------+
            |
            v
+-----------------------+  <-- Unterer Bereich vor dem Magneten:
|  (B_induktiv nach     |      Fluss nimmt zu -> abstossender Gegenpol (N)!
|   oben gerichtet)     |      Erzeugt Gegenkraft F_Lenz gegen die Bewegung!
+-----------------------+
```

`Klausur-Satz: Da der induzierte Wirbelstrom gemaess der Lenzschen Regel eine der Bewegungsrichtung entgegengesetzte Lorentzkraft erzeugt, verrichtet das Feld mechanische Bremsarbeit und dissipiert Bewegungsenergie in Joule-Waerme.`

## Schritt 4 — ausprobieren: Das Wirbelstrom-Labor im Freifallturm

[Werkzeug: lego]

AUFGABE (herleiten & berechnen, AFB I/II):
Ein Fahrgasttraeger eines Freifallturms der Masse $m = 2000\,\text{kg}$ rast mit der Geschwindigkeit $v_0 = 25\,\text{m/s}$ in die Wirbelstrom-Bremsstrecke am Fuss des Turms ein. An der Gondel sind Neodym-Magnete befestigt, die zwischen vertikalen Kupferplatten hindurchfahren.
1. Leite her, warum die Bremskraft $F_{\text{brems}}$ direkt proportional zur aktuellen Momentangeschwindigkeit $v$ der Gondel ist ($F_{\text{brems}} = k \cdot v$).
2. Berechne die Bremskonstante $k$, wenn die Gondel im ersten Augenblick mit einer maximal vertraeglichen Verzoegerung von $a = 3{,}5 \cdot g$ ($g \approx 9{,}81\,\text{m/s}^2$) abgebremst werden soll.

MUSTERLOESUNG:
1. Herleitung:
   - Die Geschwindigkeit $v$ bestimmt die zeitliche Aenderung der vom Magnetfeld ueberstrichenen Leiterschleifenflaeche: $\frac{dA}{dt} = L \cdot v$.
   - Nach Faraday betraegt die induzierte Ringspannung in den Kupferplatten: $U_{\text{ind}} = B \cdot L \cdot v$.
   - Nach dem Ohmschen Gesetz erzeugt dies einen Wirbelstrom: $I = \frac{U_{\text{ind}}}{R} = \frac{B \cdot L \cdot v}{R}$.
   - Auf diesen Strom wirkt im Magnetfeld eine hemmende Lorentzkraft: $F_{\text{brems}} = B \cdot I \cdot L = \frac{B^2 \cdot L^2}{R} \cdot v = k \cdot v$. Die Bremskraft waechst streng linear mit der Geschwindigkeit!
2. Berechnung:
   - Nach Newton gilt: $F_{\text{brems}} = m \cdot a = 2000\,\text{kg} \cdot (3{,}5 \cdot 9{,}81\,\text{m/s}^2) = 68.670\,\text{N}$.
   - Bremskonstante: $k = \frac{F_{\text{brems}}}{v_0} = \frac{68.670\,\text{N}}{25\,\text{m/s}} \approx 2746{,}8\,\text{N}\cdot\text{s/m}$.

## Schritt 5 — ausprobieren: Duell der Magnetfelder: Statisch vs. Dynamisch

VERGLEICH: Statisches Magnetfeld vs. Zeitlich veraenderlicher magnetischer Fluss (选概念)

- Position A (Ruhender Magnet im Leiter):
  - Flussableitung $\frac{d\Phi}{dt} = 0$.
  - Induktionsspannung $U_{\text{ind}} = 0\,\text{V}$.
  - Keine Wirbelstroeme, keine Kraftwirkung auf das Kupferrohr.
- Position B (Bewegter Magnet im Leiter):
  - Zeitliche Flussfluktuation $\frac{d\Phi}{dt} \neq 0$.
  - Ringspannung treibt gigantische Wirbelstroeme im niederohmigen Kupfer an.
  - Das resultierende Gegen-Magnetfeld stemmt sich massiv gegen den eindringenden Magneten.

Entscheidungsregel fuer die Klausur:
Wird nach `Induktionswirkung` gefragt, pruefe immer zuerst: "Aendert sich entweder die Flaeche $A(t)$ oder die Flussdichte $B(t)$ mit der Zeit? Wenn beide konstant sind, ist die Induktionsspannung strikt null!"

## Schritt 6 — check: Klausur-Transfer Supraleiter und Sicherheitsbremsen

PRUEFUNGSSZENARIO (KLP NRW Physik LK Inhaltsfeld 3: Elektrodynamik):

### AFB I: Wissensabfrage
Formuliere das Faradaysche Induktionsgesetz in mathematischer Form und erlaeutere die physikalische Bedeutung des negativen Vorzeichens.

### AFB II: Sicherheitsanalyse
Erklaere detailliert anhand der Lenzschen Regel, warum eine Wirbelstrombremse im ICE oder Freizeitpark selbst bei einem totalen Netzausfall absolut fehlersicher funktioniert und niemals mechanisch verschleissen kann.

### AFB III: Kritisches Urteil
Ein Ingenieur schlaegt vor, die Kupferplatten am Bremsfuss durch supraleitendes Material mit dem elektrischen Widerstand $R = 0$ zu ersetzen. 
Beurteile diesen Vorschlag hinsichtlich theoretischer Machbarkeit, resultierender Beschleunigungskraefte und gesundheitlicher Risiken fuer Fahrgaeste.

## Schritt 7 — check: Format-Check & Scoring

30 XP Schnelltest zur Verstaendigungssicherung:

FRAGE: Warum fuehrt ein Laengsschlitz im Kupferrohr dazu, dass der Magnet fast im freien Fall hindurchfaellt?
ANTWORT: Durch den Laengsschlitz wird der geschlossene Kreisstrom um den Zylinderumfang unterbrochen. Da ohne geschlossenen Leiterkreis kein grossflaechiger Wirbelstrom fliessen kann, wird kein effektives magnetisches Gegenfeld aufgebaut und die Bremskraft nach Lenz sinkt drastisch ab.

FRAGE: Welche zwei Moeglichkeiten gibt es grundsaetzlich, um eine Induktionsspannung in einer Spule zu erzeugen?
ANTWORT: Entweder durch zeitliche Veraenderung der magnetischen Flussdichte B bei konstanter Flaeche A (z. B. Wechselstrom im Elektromagneten) oder durch zeitliche Veraenderung der vom Feld durchsetzten Flaeche A bei konstanter Flussdichte (z. B. Rotation einer Leiterschleife im homogenen Feld).

## Schritt 8 — reflexion: Meisterschaft & Naechste Mission

REFLEXION:
Du hast verinnerlicht, wie das Faradaysche Induktionsgesetz und die Lenzsche Regel zusammenwirken, um mechanische Bewegungsenergie ueber Wirbelstroeme beruehrungslos in thermische Energie umzuwandeln.

In der naechsten Physik-Episode untersuchen wir elektromagnetische Schwingkreise aus Spule und Kondensator und schlagen die Bruecke zur Erzeugung hochfrequenter Radiowellen.
