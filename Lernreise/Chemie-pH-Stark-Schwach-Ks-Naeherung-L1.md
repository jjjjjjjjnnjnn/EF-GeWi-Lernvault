---
fach: Chemie
thema: "pH starker und schwacher Saeuren mit Ks-Naeherung"
level: 1
ziel: Klausur
xp: 100
operatoren: [aufstellen, berechnen, begruenden]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Chemie, Saeuren]
version: Enterprise-v5
---

# Lernreise: pH starker und schwacher Saeuren mit Ks-Naeherung — Episode C29: Milchiges Geheimnis im Becken

<!-- Campaign: Imperium-Alchemie | Chemie | entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->
## Schritt 1 — entdecken: Der Pool kippt: Eine Kelle zu viel Saeure

ZIELE（本节三目标）：
1. 中文：能用Ks区分强弱酸。
2. 中文：能直接算强酸pH。
3. 中文：能用近似算弱酸pH。

【危机Hook】Pool-pH 3,2: Kinder reiben sich die Augen, Bademeister greift zur Kelle. 泳池pH3.2：孩子们揉眼睛，救生员抄起药勺。多倒一勺酸水质达标，倒过一勺满池流泪——强酸一滴入魂、弱酸温吞半离，今晚必须算准那勺的分寸，否则清澈见底的水照样伤人。

`Klausur-Satz: Der Pool lehrt: Stark trifft voll, schwach trifft zum Teil — Ks entscheidet die Dosis.`

## Schritt 2 — entdecken: Die Saeure-Werkzeugkiste der Bademeister

PRETRAINING术语盒（5大装备，中文在上、德语在下）：

- 中文：酸度常数 — 德语：Saeurekonstante：强弱一刀切的标尺。 / Saeurekonstante: Die Saeurekonstante Ks misst die Protolysestaerke als Gleichgewichtswert. Grosses Ks heisst starke, kleines heisst schwache Saeure. Mechanismus: Man schreibt das MWG der Protolyse; pKs als negativer Log macht kleine Zahlen handlich. Klausur-Tipp: pKs klein heisst stark als Merksatzpaar.

- 中文：强酸 — 德语：Starke Saeure：彻底离解直接算。 / Starke Saeure: Starke Saeuren protolysieren praktisch vollstaendig. Die Oxoniumkonzentration gleicht der Anfangskonzentration. Mechanismus: Man setzt c0 direkt in die pH-Formel ein; keine Naeherung, keine Wurzel. Klausur-Tipp: Stark heisst pH gleich minus Log c0 als Sofortsatz.

- 中文：弱酸 — 德语：Schwache Saeure：部分离解需近似。 / Schwache Saeure: Schwache Saeuren protolysieren nur zu Bruchteilen. Das MWG mit Ks bestimmt den Rest. Mechanismus: Man naehert mit Wurzel aus Ks mal c0 und prueft die 5-Prozent-Regel. Klausur-Tipp: Wurzel plus Check als Pflichtduo.

- 中文：近似条件 — 德语：Naeherungsbedingung：离解度低于5%才准用。 / Naeherungsbedingung: Die Naeherung gilt nur bei kleinem Umsatz relativ zu c0. Sie streicht x gegen c0 aus dem Nenner. Mechanismus: Man rechnet genähert und teilt x durch c0: Unter 5 Prozent gilt, darueber nicht. Klausur-Tipp: Check hinschreiben, sonst kein Punkt fuer die Wurzel.

- 中文：缓冲痕迹 — 德语：Pufferspur：弱酸共轭碱成对出现。 / Pufferspur: Schwache Saeuren bilden mit ihrer korrespondierenden Base Puffersysteme. Das Paar faengt Saeure- und Basenstoesse ab. Mechanismus: Henderson-Hasselbalch verbindet pH mit dem Verhaeltnis der Partner. Klausur-Tipp: Paar benennen als Bruecke zum Pufferkapitel.


`Klausur-Satz: Stark heisst pH gleich minus Log c0, schwach heisst Wurzel aus Ks mal c0.`

## Schritt 3 — entdecken: Von der Staerke zum pH: Die Dissoziationskette

ENTDECKEN因果传导机制（中文拆解在上，德语链条在下）：

中文：离解链：Ks大则全离解直接代，Ks小则走平衡式开方近似再验5%门槛，最后取负对数进pH标尺。

德语：Die Dissoziationskette startet bei **Ks**: gross heisst vollstaendig, klein heisst bruchteilig. Starke Saeure setzt **c0** direkt in Oxonium um. Schwache Saeure folgt dem **MWG**: Wurzel aus Ks mal c0 naehert, der **5-Prozent-Check** bestaetigt. Der **Log** quetscht das Ergebnis in die pH-Skala.

```diagram
Ks gross -> vollstaendig -> pH = -log c0
Ks klein -> MWG -> Wurzel(Ks*c0) -> Check
Log quetscht Zehnerpotenzen in pH
```

Die beiden pH-Wege des Sandkastens:

$$pH = -\log c_0 \quad \text{(stark)} \quad ; \quad pH = \tfrac{1}{2}(pK_S - \log c_0) \quad \text{(schwach)}$$

中文：强酸直接负对数，弱酸取半和式再验门槛。 / 德语：Jede Wurzel ohne Check ist in der Klausur wertlos.

`Klausur-Satz: Dissoziation bestimmt Oxonium, Oxonium bestimmt pH: Die Kette endet im Log.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Magen mit pH 2 verdaut Steak und schont sich selbst mit Schleim — Staerke plus Schutz als Paket.


**中文解读**: 胃酸pH2化牛排却靠黏液自保——强悍加防护打包出售。


**Bezug zum Konzept**: Scharf plus Hülle: Der Magen dosiert Staerke mit Schleim.

## Schritt 4 — ausprobieren: Sandkasten: Rechne stark exakt und schwach genaehert

[Werkzeug: formula]

AUFGABE: Berechne 已知盐酸与醋酸浓度及Ks：算双pH、验近似并预测稀释十倍的变化。 德语原题：Gegeben: 0,01 mol/L HCl und 0,10 mol/L Essigsaeure mit Ks = 1,8 mal 10 hoch minus 5. Berechne beide pH-Werte, pruefe die Naeherung und sage die pH-Aenderung bei zehnfacher Verduennung voraus. [AFB II]

HILFE:
- Fachdimension: Nutze Ks-Naeherung (stark direkt, schwach mit Wurzel); klaere zuerst Saeurentyp (stark/schwach) und Naeherungsbedingung vor der Rechnung, ohne das Ergebnis vorwegzunehmen.
- Rechenweg: Lege die Reihenfolge von Ausgangsgroesse zu Zielgroesse fest; schreibe nur die Abfolge auf, setze keine Zahlen ein.
- Pruefdimension: Plane die Kontrolle ueber Einheit und Groessenordnung, ohne das Resultat zu nennen.


COMPLETION (Lückentext):
- Lies die Aufgabe und ergaenze aus dem Gedaechtnis, ohne zurueckzublaettern:
- Fuer ___ gilt $\mathrm{pH} = -\lg[H_3O^+]$ mit starker Dissoziation.
- Zuerst bestimme ich ___, dann folgt ___ aus $[H_3O^+] = \sqrt{K_S \cdot c_0}$.

ERWARTUNGSHORIZONT
Teilleistung | Punkte | Alternativweg
Saeurentyp klaeren | 5 NP | Leitfaehigkeitsblick als Alternativweg
pH direkt oder mit Wurzel | 5 NP | Naeherungs-Check als Alternativweg
Verdünnungseffekt begruenden | 5 NP | Quadratwurzel-Probe als Alternativweg
Gesamt: 15 NP

MUSTERLOESUNG：中文：盐酸pH2，醋酸约2.87且过检，稀释十倍强升1弱升0.5。 / 德语：HCl stark: pH 2; Essig: pH halb mal (4,74 plus 1) gleich 2,87, Check 1,3 Prozent gilt; Verduennung hebt stark um 1, schwach um 0,5.

`Klausur-Satz: Mit pH 2 aus 0,01 mol/L HCl und pH 3 aus Essig-Naeherung misst der Sandkasten statt zu raten.`

## Schritt 5 — ausprobieren: Duell der Wege: Direktrechnung gegen Ks-Naeherung

VERGLEICH: Waehle erst den Saeure-Weg, dann loesen: (i) Direkt-Rechenweg oder (ii) Ks-Naeherweg — dann loesen.选程序：先看信号词再选路。


Weg A (Direkt-Rechenweg): Der Weg steht zur Wahl.
- [Weg A] Wenn du Weg A waehlst, arbeitest du in Schritt 7 vor allem mit Direktzahlen und Wurzeln.

Weg B (Ks-Naeherweg): Der Weg steht zur Wahl.
- [Weg B] Wenn du Weg B waehlst, arbeitest du in Schritt 7 vor allem mit Nachweis- und Staffeldeutung.


AUFGABE A: pH aus 0,01 mol/L HCl exakt gesucht. Welcher Weg? 【选程序：先看信号词再选路】

AUFGABE B: Essig-pH mit Gueltigkeitsnachweis gesucht. Welcher Weg? 【选程序：先看信号词再选路】


HILFE: Pruefe dimensionsgeleitet, welcher Weg passt: Zahlen- und Signalwoerter sprechen fuer Weg A, Deutungs- und Bereichswoerter fuer Weg B. Ordne selbst zu; die Zuordnung wird nicht vorweggenommen.

ANTWORT：中文：A走直算路取对数；B走近似路开方加验。 / 德语：A folgt Weg A mit minus-Log-Rechnung; B folgt Weg B mit Wurzel-plus-Check-Protokoll.

AUFLÖSUNG (nach der Wahl lesen)
Erst nach der Wahl von Weg A oder Weg B lesen; hier steht der ueberfuehrte Mechanismus vor dem Ein-Satz-Kern:
- Ueberfuehrt aus VERGLEICH (Vorwahl-Fassung): ANTWORT：中文：A走直算路取对数；B走近似路开方加验。 / 德语：A folgt Weg A mit minus-Log-Rechnung; B folgt Weg B mit Wurzel-plus-Check-Protokoll. // Weg B (Ks-Naeherweg): Schwache Saeuren qualitativ einordnen und mit Wurzel plus Check naehern. Dieser Weg braucht den Check als Siegel.
- Ueberfuehrt aus Schritt-5-HILFE (Vorwahl-Fassung): HILFE：A nennt stark — Weg A direkt. B nennt Nachweis — Weg B mit Check.
- Mechanismus A: ANTWORT：中文：A走直算路取对数；B走近似路开方加验。 / 德语：A folgt Weg A mit minus-Log-Rechnung; B folgt Weg B mit Wurzel-plus-Check-Protokoll.
- Ein-Satz-Kern: Direkt rechnen beweist, naehern mit Check sichert — die Klausur braucht beides.

<!-- C1-Bestaetigung: Vorwahl neutral, Mechanismus in AUFLOESUNG. -->

`Klausur-Satz: Direkt rechnen beweist, naehern mit Check sichert — die Klausur braucht beides.`

## Schritt 6 — check: Selbsttest zu Starke und schwache Saeuren

- FRAGE: 强酸pH怎么算？（Wie rechnest du starke Säuren） | ANTWORT: 直接负对数c0。 / Direkt minus Log c0.

- FRAGE: 弱酸pH怎么算？（Wie rechnest du schwache Säuren） | ANTWORT: 开方加检验。 / Wurzel plus 5-Prozent-Check.

- FRAGE: 近似门槛多少？（Wann gilt die Näherung） | ANTWORT: x低于5%初值。 / Wenn x unter 5 Prozent von c0 liegt.


`Klausur-Satz: Ohne 5-Prozent-Check bleibt jede Wurzel geraten, mit ihm wird sie gerechnet.`

## Fehlvorstellung

1. 误解：pH3是6的两倍酸。
   中文纠偏：pH差3即千倍酸，差1即十倍。
   Korrektur-Satz: `Die Skala ist logarithmisch: pH 3 ist tausendmal saurer als pH 6.`

2. 误解：酸都一个算法。
   中文纠偏：强直算弱开方，混用必错。
   Korrektur-Satz: `Stark direkt, schwach mit Wurzel: Wer tauscht, rechnet daneben.`

## Schritt 7 — szenario: Klausurtransfer: Protokoll zur Pool-Rettung

ROLLE：中文：你是手持药勺的救生员。 / 德语：Du bist Bademeister mit Kelle.
SITUATION：泳池pH3.2：请用强弱酸与Ks解释事故并算出纠正剂量（约150词）。 / 德语：Der Pool zeigt pH 3,2. Erklaere in ca. 150 Woertern mit stark, schwach und Ks, was geschah, und berechne die Korrektur.
AUFGABE: Begruende die Transferlage in ca. 150 Woertern mit Einordnung, Beleg und Schlussurteil. [AFB III]
RUBRIC (30 XP)：Diagnose (8 XP) | Rechnung (8 XP) | Korrektur (8 XP) | Sicherheit (6 XP).
ZEITREGEL: MAX 2 Minuten — 90秒分强弱算双pH，30秒写稀释升值句，然后交卷；Timer stellen.


ERWARTUNGSHORIZONT
Teilleistung | Punkte | Alternativweg
Typ-Einordnung mit Beleg | 5 NP | Ks-Beleg als Alternativweg
pH-Analyse mit Naeherung | 5 NP | Prozent-Check als Alternativweg
Urteil mit Massstab und Schluss | 5 NP | Offenes Urteil mit Rueckbindung als Alternativweg
Gesamt: 15 NP

`Klausur-Satz: Achtung Falle: Verduennen hebt pH starker Saeuren um eins pro Faktor zehn, schwacher nur um halb.`

KERNSATZ (auswendig):
- Kernsatz: `Starke Saeuren protolysieren vollstaendig, schwache nur teilweise nach ihrer Ks-Konstante.`
- Zerlegung: Subjekt | Mechanismus | Urteil
- Aufschluesselung: Subjekt = Saeurestaerke | Mechanismus = Dissoziationsgrad nach Ks | Urteil = pH-Staffel als Urteil
- Selbsttest: Starke Saeuren protolysieren vollstaendig, schwache nur teilweise nach ihrer ___.
## Schritt 8 — reflexion: Takeaway & Reflexion

TAKEAWAY核心总结：

中文：强直算、弱开方加验：先看Ks再取对数。
Takeaway-Satz: `Stark direkt, schwach mit Wurzel und Check: Ks zuerst, Log danach.`

`Klausur-Satz: Staerke ist relativ: Dieselbe Saeure wirkt in Wasser anders als die Skala verspricht.`


REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Sandkasten-Challenge (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. 元认知计划：Beim naechsten Mal rechne ich zuerst die Wurzel aus Ks mal c0 am Essig-Fall (pH 2,87) mit 5-Prozent-Check, weil jede Verduennungs-Entscheidung darauf aufbaut.
