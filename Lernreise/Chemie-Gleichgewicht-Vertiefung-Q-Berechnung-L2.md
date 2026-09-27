---
fach: Chemie
thema: "Gleichgewichtsvertiefung mit Q-Berechnung"
level: 2
ziel: Klausur
xp: 100
operatoren: [aufstellen, berechnen, begruenden]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Chemie, Gleichgewicht]
version: Lesson-v3
---

# Lernreise: Gleichgewichtsvertiefung mit Q-Berechnung — Episode C10: Nachtschicht am Rührkessel

<!-- Campaign: Imperium-Alchemie | Chemie | entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->
## Schritt 1 — entdecken: Der Eilzug Q gegen den Felsen K

ZIELE（本节三目标）：
1. 中文：会列三段表写质量作用定律。
2. 中文：会用瞬时值算Q。
3. 中文：能论证温度对K的改写。

【危机Hook】Chargenfreigabe 04:00 Uhr: Q weicht ab, tausend Liter warten. 凌晨四点批次放行：Q值偏离，一千升料液等着签字。审计员Jonas盯着色谱数据不敢落笔——放行错了整批报废，扣下又误了交期。K是岩石、Q是列车，今晚必须算出列车 relative 岩石的位置，否则签字变赌博。

`Klausur-Satz: Der Felsen K steht, der Zug Q faehrt: Nur der Abstand entscheidet ueber Freigabe oder Sperrung.`

## Schritt 2 — entdecken: Die Q-K-Rechenkiste der Bilanzauditoren

PRETRAINING术语盒（5大装备，中文在上、德语在下）：

- 中文：三段表 — 德语：Dreisatztabelle：初变平三行算平衡。 / Dreisatztabelle: Die Dreisatztabelle ICE (initial, change, equilibrium) ordnet Start, Umsatz und Gleichgewicht. Sie macht jede MWG-Rechnung fehlerfest. Mechanismus: Man traegt c0 ein, zieht den Umsatz x mit Koeffizienten ab und setzt die Reste in K ein. Klausur-Tipp: Tabelle zeichnen bringt Strukturpunkte auch bei Rechenfehlern.

- 中文：瞬时Q — 德语：Momentan-Q：此刻代入指方向。 / Momentan-Q: Q aus Momentanwerten zeigt die augenblickliche Lage relativ zu K. Es ist der Kompass jeder Charge. Mechanismus: Man setzt aktuelle c-Werte in die K-Formel ein und vergleicht: kleiner, groesser oder gleich. Klausur-Tipp: Q ausrechnen plus Pfeil zeichnen als Doppelpunkt.

- 中文：温度耦合 — 德语：Temperatur-Kopplung：放吸热定K升降。 / Temperatur-Kopplung: Die Temperatur koppelt ueber die Reaktionswaerme an K: Exotherm plus Heizen senkt K, endotherm plus Heizen hebt K. Mechanismus: Van-t-Hoff quantifiziert die Kopplung; das Vorzeichen von Delta-H entscheidet die Richtung. Klausur-Tipp: Delta-H-Vorzeichen zuerst, K-Aussage danach.

- 中文：转化变量 — 德语：Umsatzvariable：x设得好方程解得快。 / Umsatzvariable: Die Umsatzvariable x fasst den Reaktionsfortschritt in einer Zahl. Sie verbindet alle Konzentrationen linear. Mechanismus: Mit x schreibt man das Gleichungssystem in einer Unbekannten und loest quadratisch oder genähert. Klausur-Tipp: x definieren mit Einheit mol/L nicht vergessen.

- 中文：近似判据 — 德语：Naeherungsregel：5%门槛省去二次方程。 / Naeherungsregel: Die Naeherungsregel erlaubt x << c0 zu streichen, wenn K winzig ist. Sie spart quadratische Gleichungen. Mechanismus: Man rechnet genähert und prueft: Ist x unter 5 Prozent von c0, gilt die Loesung. Klausur-Tipp: 5-Prozent-Check hinschreiben, sonst kein Naeherungspunkt.


`Klausur-Satz: Reine Feststoffe gehoeren nicht in den K-Ausdruck, x gehoert in jede Tabelle.`

## Schritt 3 — entdecken: Vom Messwert zur Richtung: Die Q-Kette

ENTDECKEN因果传导机制（中文拆解在上，德语链条在下）：

中文：Q链：列表填初值、减转化x、余值代K求平衡；再判Q相对K定方向；只有温度搬得动K这块岩石。

德语：Die Q-Kette startet mit der Tabelle: Startwerte eintragen, Umsatz **x** abziehen, Reste in **K** einsetzen. So wird aus Messung Gleichgewicht. Dann faellt die Entscheidung: **Q** gegen **K** halten und Richtung ableiten. Nur **Temperatur** verschiebt den Felsen selbst; alles andere bewegt nur den Zug.

```diagram
c0 -> minus x -> c_eq -> K
Q messen -> gegen K halten
T aendert K | Rest aendert nur Q
```

Die Entscheidungs-Ungleichungen des Audits:

$$Q = \frac{[C]^c [D]^d}{[A]^a [B]^b} \quad ; \quad Q < K \Rightarrow \text{rechts}$$

中文：Q同K式此刻代入，小了右补、大了左退、等了放行。 / 德语：Jede Seite braucht Exponenten aus der Gleichung; Feststoffe entfallen.

`Klausur-Satz: Q kleiner als K heisst rechts, groesser heisst links, gleich heisst unterschreiben.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Bosch fuhr 1909 den ersten Hochdruckversuch — der Autoklav hielt, die Chemie gehorchte.


**中文解读**: 1909年博施首试高压釜：钢罐挺住，化学听话。


**Bezug zum Konzept**: Vom Versuch zur Tonne: Rechnen macht aus Labor Industrie.

## Schritt 4 — ausprobieren: Rechen-Sandkasten: Q gegen K im Duell

[Werkzeug: formula]

AUFGABE目标挑战：已知K=4与瞬时浓度：算Q判方向并列三段表算到放行。 德语原题：Gegeben: A + B <-> C, K = 4,0; Momentanwerte cA = 0,50, cB = 0,50, cC = 0,50 mol/L. Berechne Q, entscheide die Richtung und stelle die Dreisatztabelle bis zur Freigabe auf.

HILFE:
1. Q aus Momentanwerten berechnen.
2. Q gegen K halten und Pfeil setzen.
3. Tabelle mit x bis c_eq aufstellen.

MUSTERLOESUNG：中文：Q=2小于K=4故右补，三段表解得x=0.11，Q=K时放行。 / 德语：Q = 2,0 kleiner K = 4,0: rechts nachfuellen; Tabelle liefert c_eq mit x = 0,11 mol/L; Freigabe bei Q gleich K.

`Klausur-Satz: Mit Dreisatztabelle und Q-Rechnung faellt das Audit statt zu raten.`

## Schritt 5 — ausprobieren: Duell der Wege: Tabellenrechnung gegen Stoerungsblick

VERGLEICH: Waehle erst den Audit-Weg, dann loesen: (i) Tabellen-Rechenweg oder (ii) Stoerungsblick-Weg — dann loesen.选程序：先看信号词再选路。


Weg A：Weg A (Tabellen-Rechenweg): Umsaetze quantitativ tabellieren und Gleichgewichte ausrechnen. Dieser Weg liefert c_eq-Zahlen und ist freigabefest.

Weg B：Weg B (Stoerungsblick-Weg): Stoerungen qualitativ deuten und Richtungen schnell abschaetzen. Dieser Weg ist schnell, bleibt aber ohne Zahl weich.


AUFGABE A: c_eq aus K exakt gesucht. Welcher Weg? 【选程序：先看信号词再选路】

AUFGABE B: Wohin laeuft es nach plotsichem Druckstoss? Welcher Weg? 【选程序：先看信号词再选路】


HILFE：A nennt exakt — Weg A mit Tabelle. B nennt Stoerung — Weg B mit Blick.

ANTWORT：中文：A走表格路解x；B走直觉路数粒子。 / 德语：A folgt Weg A mit ICE-Tabelle und x-Loesung; B folgt Weg B mit Teilchenzahl-Argument.

`Klausur-Satz: Tabellen rechnen beweist, Stoerungen deuten warnt — der Auditor braucht beides.`

## Schritt 6 — check: Selbsttest zu Gleichgewicht mit Q-Berechnung

- FRAGE: 三段表三行是什么？（Wie heissen die ICE-Zeilen） | ANTWORT: 初变平。 / Initial, Change, Equilibrium.

- FRAGE: Q大于K向哪？（Was heisst Q grösser als K） | ANTWORT: 产物过剩向左。 / Zu viel Produkt, also links.

- FRAGE: 近似的门槛是什么？（Wann gilt die Näherung） | ANTWORT: x低于5%初值。 / Wenn x unter 5 Prozent von c0 liegt.


`Klausur-Satz: Ohne Tabelle bleibt jede Q-Aussage geraten, mit ihr wird sie gerechnet.`

## Fehlvorstellung

1. 误解：Q即K。
   中文纠偏：K定位Q定刻，相等罕见比较为王。
   Korrektur-Satz: `K beschreibt die Lage, Q den Moment: Gleichheit ist selten, Vergleich ist alles.`

2. 误解：近似永远对。
   中文纠偏：无检验的近似是错误。
   Korrektur-Satz: `Nur mit 5-Prozent-Check: Sonst wird aus Bequemlichkeit ein Fehler.`

## Schritt 7 — szenario: Klausurtransfer: Auditbericht zur Chargenfreigabe

ROLLE：中文：你是夜班结算审计员。 / 德语：Du bist Bilanzauditor in der Nachtschicht.
SITUATION：某批次偏离：请写约150词放行报告，含Q计算、三段表与温度核查。 / 德语：Eine Charge weicht ab. Schreibe in ca. 150 Woertern einen Freigabebericht mit Q-Rechnung, Tabelle und Temperaturpruefung.
RUBRIC (30 XP)：Q-Rechnung (8 XP) | Tabelle (8 XP) | Temperatur (8 XP) | Urteil (6 XP).
ZEITREGEL: MAX 2 Minuten — 90秒算Q列三段表，30秒写放行裁决句，然后交卷；Timer stellen.


`Klausur-Satz: Achtung Falle: Naeherung ohne 5-Prozent-Check ist in NRW null Punkte wert.`

## Schritt 8 — reflexion: Takeaway & Reflexion

TAKEAWAY核心总结：

中文：列表、算Q、敬K：岩石只随温度走。
Takeaway-Satz: `Tabelle aufstellen, Q halten, K ehren: Der Felsen bewegt sich nur mit Temperatur.`

`Klausur-Satz: Rechnen ist Verantwortung: Hinter jedem Q stehen tausend Liter und ein Name darunter.`


REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Sandkasten-Challenge (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. 元认知计划：Beim naechsten Mal rechne ich zuerst Q = 2,0 gegen K = 4,0 am Chargen-Fall und loese x = 0,11, weil jede Freigabe-Entscheidung darauf aufbaut.
