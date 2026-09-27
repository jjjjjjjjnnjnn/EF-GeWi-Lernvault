---
fach: Chemie
thema: "Reaktionsgeschwindigkeit und Katalyse"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, analysieren]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Chemie, Kinetik]
version: Lesson-v3
---

# Lernreise: Reaktionsgeschwindigkeit und Katalyse — Episode C14: Abgas-Alarm im Tunnel

<!-- Campaign: Imperium-Alchemie | Chemie | entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->
## Schritt 1 — entdecken: Der Kat, der alles schluckt: Abgas gegen Stau

ZIELE（本节三目标）：
1. 中文：能从浓度曲线定速率。
2. 中文：能论证浓度温度接触面三因子。
3. 中文：能用能量图讲催化剂。

【危机Hook】Abgas-Alarm im Tunnel: CO steigt, der Kat bleibt kalt. 隧道废气警报：CO飙升，三元催化器还是凉的。冷启动的几分钟里，尾气直排毒翻倍——是猛踩油门冲过去，还是怠速等催化剂热起来？今晚必须搞懂温度与接触面，否则省下的油变成吸进的毒。

`Klausur-Satz: Kaltstart giftet, Heisslauf reinigt: Die Rate entscheidet, was der Auspuff ausspuckt.`

## Schritt 2 — entdecken: Die Tempo-Werkzeugkiste der Leitstelle

PRETRAINING术语盒（5大装备，中文在上、德语在下）：

- 中文：反应速率 — 德语：Reaktionsgeschwindigkeit：浓度随时间的变化。 / Reaktionsgeschwindigkeit: Reaktionsgeschwindigkeit ist die Konzentrationsaenderung pro Zeit. Sie faellt mit dem Verbrauch der Edukte stetig. Mechanismus: Man liest sie als Steigung der c-t-Kurve; Anfangssteigung heisst Anfangsgeschwindigkeit. Klausur-Tipp: Steigung plus Einheit mol/(L s) als Doppelpunkt.

- 中文：碰撞理论 — 德语：Kollisionstheorie：撞得又多又狠才成。 / Kollisionstheorie: Die Kollisionstheorie fordert haeufige, energiereiche und richtig orientierte Stoesse. Nur ein Bruchteil wirkt. Mechanismus: Konzentration hebt die Haeufigkeit, Temperatur die Heftigkeit, Zerteilung die Trefferflaeche. Klausur-Tipp: Haeufig plus heftig plus richtig als Tripel.

- 中文：活化能 — 德语：Aktivierungsenergie：翻山才反应。 / Aktivierungsenergie: Aktivierungsenergie ist der Huegel zwischen Edukt und Produkt. Nur Teilchen mit genug Schwung kommen rueber. Mechanismus: Temperatur schiebt mehr Teilchen ueber den Berg; der Huegel selbst bleibt ohne Katalysator gleich. Klausur-Tipp: Huegel zeichnen und Schwelle markieren.

- 中文：催化剂 — 德语：Katalysator：开近道不耗自身。 / Katalysator: Katalysatoren oeffnen Alternativwege mit niedrigerer Aktivierungsenergie. Sie bleiben unverbraucht und aendern nie die Lage. Mechanismus: Adsorption, Reaktion, Desorption: Der Weg wird kuerzer, das Ziel bleibt gleich. Klausur-Tipp: Unverbraucht plus Lage-gleich als Abgrenzung zum Reaktanden.

- 中文：速率方程 — 德语：Zeitgesetz：浓度幂次定级数。 / Zeitgesetz: Das Zeitgesetz v gleich k mal Konzentrationen hoch Ordnungen beschreibt die Abhaengigkeit. Exponenten folgen aus Messung, nie aus Gleichung. Mechanismus: Man bestimmt Ordnungen aus Anfangsraten bei Variation je einer Groesse. Klausur-Tipp: Ordnung aus Messung als Satz gegen Gleichungsraten.


`Klausur-Satz: Hauefiger plus heftiger plus richtiger: Nur solche Stoesse reagieren.`

## Schritt 3 — entdecken: Vom Stoss zum Umsatz: Die Kollisionskette

ENTDECKEN因果传导机制（中文拆解在上，德语链条在下）：

中文：碰撞链：浓度与接触面加次数，温度加力度，取向与能量过滤；随后活化能拦路，催化剂降山口但不改位置与K。

德语：Die Kollisionskette startet mit dem **Stoss**: Konzentration und Zerteilung erhoehen Treffer, Temperatur erhoeht Schwung. Nur orientierte Treffer mit Mindestenergie zaehlen. Dann wartet der **Berg**: Die **Aktivierungsenergie** filtert die Schwachen heraus. **Katalysatoren** senken den Pass, lassen Lage und K aber unangetastet.

```diagram
c hoch -> Stoss hoch -> Rate hoch
T hoch -> Schwung hoch -> mehr ueber Berg
Kat -> Berg niedrig -> schneller, Lage gleich
```

Das Zeitgesetz des Sandkastens:

$$v = k \cdot [A]^m \cdot [B]^n$$

中文：速率=速率常数乘浓度幂，指数由实验定。 / 德语：Ordnungen m und n folgen aus Messreihen, nie aus der Reaktionsgleichung.

`Klausur-Satz: Stoss braucht Flaeche, Waerme hebt Schwung, Katalysator senkt den Berg.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Waschbaeren? Nein: Platin im Kat waescht Abgase seit 1975 — Gramm-Edelmetall gegen Tonnen Gift.


**中文解读**: 1975年起铂金洗尾气——几克贵金属对几吨毒气。


**Bezug zum Konzept**: Wenig Edelmetall, viel saubere Luft: Katalyse als Alltagsretter.

## Schritt 4 — ausprobieren: Sandkasten: Miss Raten und lege den Katalysator

[Werkzeug: formula]

AUFGABE目标挑战：已知两温度与有无催化剂的褪色数据：定初速率、论证双效应并立速率方程。 德语原题：Gegeben: c-t-Werte einer Entfaerbung bei 20 und 40 Grad sowie mit/ohne Braunstein. Bestimme Anfangsraten, deute den Temperatur- und Katalysatoreffekt und stelle das Zeitgesetz auf.

HILFE:
1. Anfangssteigungen als Tangenten legen.
2. Faktoren getrennt variieren und vergleichen.
3. Ordnungen aus Messreihen ablesen.

MUSTERLOESUNG：中文：40℃速率约四倍，催化剂减半时间且不耗，一级速率方程来自倍增实验。 / 德语：Rate bei 40 Grad etwa vierfach; Braunstein halbiert die Zeit ohne Verbrauch; Zeitgesetz erster Ordnung in Peroxid aus Verdopplungsreihe.

`Klausur-Satz: Mit Steigung aus der c-t-Kurve und halbierter Huegelhoehe misst der Sandkasten statt zu raten.`

## Schritt 5 — ausprobieren: Duell der Wege: Zeitgesetz-Rechnung gegen Diagramm-Deutung

VERGLEICH: Waehle erst den Tempo-Weg, dann loesen: (i) Zeitgesetz-Rechenweg oder (ii) Diagramm-Deuteweg — dann loesen.选程序：先看信号词再选路。


Weg A：Weg A (Zeitgesetz-Rechenweg): Raten und Ordnungen quantitativ aus Messreihen bestimmen. Dieser Weg liefert k und Exponenten.

Weg B：Weg B (Diagramm-Deuteweg): Energiediagramme qualitativ lesen und Katalysatorwege einzeichnen. Dieser Weg ist anschaulich, bleibt aber ohne Zahl weich.


AUFGABE A: Ordnung und k aus Reihen exakt gesucht. Welcher Weg? 【选程序：先看信号词再选路】

AUFGABE B: Warum wirkt der Kat auch kalt nicht? Welcher Weg? 【选程序：先看信号词再选路】


HILFE：A nennt Reihen — Weg A mit Rechnung. B nennt Warum mit Berg — Weg B mit Diagramm.

ANTWORT：中文：A走方程路用初速率法；B走图像路以山口仍高作答。 / 德语：A folgt Weg A mit Anfangsraten-Methode; B folgt Weg B mit Berg-noch-zu-hoch-Argument.

`Klausur-Satz: Zeitgesetze rechnen exakt, Diagramme deuten anschaulich — die Klausur braucht beides.`

## Schritt 6 — check: Selbsttest zu Reaktionsgeschwindigkeit und Katalyse

- FRAGE: 速率怎么读？（Wie liest du die Rate ab） | ANTWORT: 浓度曲线斯率。 / Als Steigung der c-t-Kurve.

- FRAGE: 催化剂改什么？（Was ändert der Katalysator） | ANTWORT: 只降活化能不改位。 / Nur die Aktivierungsenergie, nie die Lage.

- FRAGE: 指数从哪来？（Woher kommen die Ordnungen） | ANTWORT: 实验测定不是方程。 / Aus Messreihen, nie aus der Gleichung.


`Klausur-Satz: Ohne Steigung bleibt jede Tempoaussage geraten, mit ihr wird sie gemessen.`

## Fehlvorstellung

1. 误解：催化剂据动平衡。
   中文纠偏：催化剂双向同速，位置与K不动。
   Korrektur-Satz: `Katalysator beschleunigt beide Richtungen gleich: Lage und K bleiben.`

2. 误解：越热越彻底。
   中文纠偏：热只加速不加彻底，彻底归K管。
   Korrektur-Satz: `Heisser reagiert schneller, nicht vollstaendiger: Vollstaendigkeit regelt K, nicht T-Tempo.`

## Schritt 7 — szenario: Klausurtransfer: Gutachten zum Katalysator-Tausch

ROLLE：中文：你是车间化学师。 / 德语：Du bist Werkstatt-Chemikerin.
SITUATION：老板要用便宜材料换催化器：请用速率、山口与位置评价是否可行（约150词）。 / 德语：Der Chef will den Kat gegen billigeres Material tauschen. Bewerte in ca. 150 Woertern mit Rate, Berg und Lage, ob der Tausch traegt.
RUBRIC (30 XP)：Ratendeutung (8 XP) | Berglogik (8 XP) | Lageabgrenzung (8 XP) | Empfehlung (6 XP).
ZEITREGEL: MAX 2 Minuten — 90秒读初速率与山口，30秒写换材裁决句，然后交卷；Timer stellen.


`Klausur-Satz: Achtung Falle: Der Katalysator aendert Tempo, nie Lage und nie K.`

## Schritt 8 — reflexion: Takeaway & Reflexion

TAKEAWAY核心总结：

中文：撞、山、近道：点齐三样，速率自明。
Takeaway-Satz: `Stoss, Berg, Abkuerzung: Wer die drei benennt, erklaert jedes Tempo.`

`Klausur-Satz: Tempo ist Statistik: Milliarden Stoesse, wenige Treffer — und ein Berg dazwischen.`


REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Sandkasten-Challenge (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. 元认知计划：Beim naechsten Mal bestimme ich zuerst die Anfangsrate bei 20 und 40 Grad am Entfaerbungs-Versuch, weil jede Katalysator-Entscheidung darauf aufbaut.
