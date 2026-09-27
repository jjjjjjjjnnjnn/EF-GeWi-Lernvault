---
fach: Bio
thema: "Zellatmung und ATP-Synthese"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, erklaeren]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Bio, Zellbiologie]
version: Lesson-v3
---

# Lernreise: Zellatmung und ATP-Synthese — Episode B27: Das Leck in Halle 7

<!-- Campaign: Nano-Zellfabrik-Krise | Bio | Instapower: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->
## Schritt 1 — entdecken: Der Marathon-Crash: Wenn der Akku leer ist

ZIELE（本节三目标）：
1. 中文：能定位糖酵解、三羧酸与呼吸链。
2. 中文：能论证32个ATP的账。
3. 中文：能把发酵讲成备用电源。

【危机Hook】Kilometer 35: Beine Blei, Lunge Feuer — der Akku ist leer. 马拉松35公里处：腿灌铅、肺着火，电池见底。肌肉喊着要氧气，线粒体开足马力烧糖，可终点还有七公里——是咬牙挺进有氧，还是切无氧先顶住？今晚必须算清那32个ATP，否则抽筋替你做决定。

`Klausur-Satz: Ohne Sauerstoff läuft die Taschenlampe, mit Sauerstoff das Kraftwerk.`

## Schritt 2 — entdecken: Die Kraftwerks-Werkzeugkiste der Zelle

PRETRAINING术语盒（5大装备，中文在上、德语在下）：

- 中文：糖酵解 — 德语：Glykolyse：细胞质中拆糖赚2ATP。 / Glykolyse: Glykolyse spaltet Glukose im Zytoplasma zu zwei Pyruvat. Sie liefert netto zwei ATP und braucht keinen Sauerstoff. Mechanismus: Enzyme halbieren den Zucker, NADH sammelt Elektronen; die Kette laeuft auch im Sprint ohne Luft. Klausur-Tipp: Ort Zytoplasma plus netto zwei ATP als Pflichtpaar.

- 中文：三羧酸循环 — 德语：Citratzyklus：线粒体基质产CO2与载体。 / Citratzyklus: Der Citratzyklus oxidiert Pyruvat in der Mitochondrienmatrix zu CO2. Er laedt NADH und FADH2 als Elektronentaxis. Mechanismus: Acetyl-CoA kreist durch acht Schritte; pro Runde entstehen drei NADH, ein FADH2 und ein ATP. Klausur-Tipp: CO2 als Abfall plus Traeger als Gewinn als Bilanz.

- 中文：呼吸链 — 德语：Atmungskette：内膜上用氧印ATP。 / Atmungskette: Die Atmungskette pumpt an der Innenmembran Protonen und baut ATP mit Sauerstoff als Endakzeptor. Hier fallen die meisten ATP. Mechanismus: Elektronen fliessen bergab, Protonen stauen sich, ATP-Synthase mahlt pro Glukose etwa 28 ATP. Klausur-Tipp: Sauerstoff als Endakzeptor plus Innenmembran als Ort.

- 中文：ATP合酶 — 德语：ATP-Synthase：质子流驱动的磨坊。 / ATP-Synthase: ATP-Synthase ist die rotierende Muehle, die aus Protonenstrom ATP mahlt. Sie sitzt in der Innenmembran. Mechanismus: Der Gradient dreht den Rotor, jede Drehung knuepft drei ATP: Chemiosmose als Kraftwerk. Klausur-Tipp: Gradient plus Rotation als Mechanismuspaar.

- 中文：发酵 — 德语：Gaerung：无氧备用电源。 / Gaerung: Gaerung regeneriert NAD+ ohne Sauerstoff und liefert nur zwei ATP. Sie haelt die Glykolyse am Laufen. Mechanismus: Milchsaeure im Muskel oder Ethanol in Hefe entsorgen Pyruvat; der Preis ist mickriger Ertrag. Klausur-Tipp: Notstrom plus zwei ATP als Abgrenzung zur Atmung.


`Klausur-Satz: Glykolyse liefert zwei, Kette liefert 28: Der Ort entscheidet den Ertrag.`

## Schritt 3 — entdecken: Vom Zucker zum Strom: Die Energieleiter

ENTDECKEN因果传导机制（中文拆解在上，德语链条在下）：

中文：能量梯：糖酵解保底2个ATP，有氧则三羧酸装载电子载体，呼吸链兑现大头；无氧只剩发酵2个。

德语：Die Energieleiter startet mit der **Glykolyse**: Glukose zerfaellt zu Pyruvat, zwei ATP sind sicher. Mit Sauerstoff steigt der **Citratzyklus** ein und laedt Elektronentaxis. Die **Atmungskette** kassiert: Elektronen fliessen, Protonen stauen sich, **ATP-Synthase** mahlt den Rest. Ohne Sauerstoff bleibt nur **Gaerung** als Notstrom mit zwei ATP.

```diagram
Glukose -> Glykolyse (2 ATP) -> Pyruvat
Pyruvat -> Citratzyklus -> NADH/FADH2
Kette + O2 -> 28 ATP | Ohne O2 -> Gaerung (2 ATP)
```

Die Gesamtbilanz der aeroben Atmung:

$$C_6H_{12}O_6 + 6\,O_2 \to 6\,CO_2 + 6\,H_2O + 32\,ATP$$

中文：一分子葡萄糖有氧呼吸净得约32个ATP。 / 德语：Zwei aus Glykolyse, zwei aus Zyklus, 28 aus der Kette: Jeder Summand braucht seinen Ort.

`Klausur-Satz: Zucker faellt die Leiter hinab, Elektronen pumpen Protonen, Protonen mahlen ATP.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Kolibris verfeuern pro Gramm mehr als jede Maschine — Mitochondrien als Rennmotoren.


**中文解读**: 蜂鸟单位体重耗能超一切机器——线粒体就是赛车引擎。


**Bezug zum Konzept**: Vom Sprint zum Winterschlaf: Dieselbe Leiter, anderes Tempo.

## Schritt 4 — ausprobieren: Sandkasten: Bilanziere 32 ATP und finde den Blocker

[Werkzeug: formula]

AUFGABE目标挑战：已知180克葡萄糖：算有氧与氰化物阻断两案的ATP，定位阻断点并解释糖酵解为何不停。 德语原题：Gegeben: 180 g Glukose, volle Aerobiose gegen Cyanid-Blockade. Berechne ATP beider Faelle, bestimme den Blockadeort und begruende, warum Glykolyse weiterläuft.

HILFE:
1. Mol Glukose aus 180 g berechnen: ein Mol.
2. ATP beider Faelle bilanzieren: 32 gegen zwei.
3. Blockade an Komplex IV mit Endakzeptor-Argument begruenden.

MUSTERLOESUNG：中文：有氧32、无氧2，氰化物卡复合体IV，糖酵解不依赖链故照转。 / 德语：Ein Mol liefert aerob 32 mol ATP, mit Cyanid nur zwei aus Glykolyse; Blockade an Komplex IV, weil Sauerstoff fehlt; Glykolyse läuft ohne Kette weiter.

`Klausur-Satz: Mit 32 ATP pro Glukose und Cyanid als Kettensperre rechnet der Sandkasten statt zu raten.`

## Schritt 5 — ausprobieren: Duell der Wege: ATP-Bilanz gegen Gift-Deutung

VERGLEICH: Waehle erst den Energie-Weg, dann loesen: (i) ATP-Bilanzweg oder (ii) Giftdeute-Weg — dann loesen.选程序：先看信号词再选路。


Weg A (ATP-Bilanzweg): Stoff- und Energiebilanzen quantitativ aufstellen und ATP berechnen. Dieser Weg liefert Mol-Zahlen und ist klausurfest.

Weg B (Giftdeute-Weg): Giftwirkungen qualitativ am Schaubild verorten und Symptome erklaeren. Dieser Weg ist schnell, bleibt aber ohne Zahl weich.


AUFGABE A: ATP aus Gramm Glukose exakt gesucht. Welcher Weg? 【选程序：先看信号词再选路】

AUFGABE B: Warum tötet Cyanid in Minuten? Welcher Weg? 【选程序：先看信号词再选路】


HILFE：A nennt Gramm — Weg A mit Bilanz. B nennt Warum mit Gift — Weg B mit Kette.

ANTWORT：中文：A走结算路摩尔乘32；B走毒理路以链断电作答。 / 德语：A folgt Weg A mit Mol-mal-32-Rechnung; B folgt Weg B mit Kette-blockiert-Argument.

`Klausur-Satz: Bilanzen zaehlen, Gifte deuten — die Klausur braucht beides.`

## Schritt 6 — check: Selbsttest zu Zellatmung und ATP

- FRAGE:：糖酵解在哪？净得多少？（Wo läuft Glykolyse, wie viel netto） | ANTWORT:：细胞质净2ATP。 / Zytoplasma, netto zwei ATP.

- FRAGE:：氧是什么角色？（Welche Rolle spielt Sauerstoff） | ANTWORT:：链末端电子受体。 / Endakzeptor der Kette.

- FRAGE:：氰化物卡哪？（Wo blockiert Cyanid） | ANTWORT:：复合体IV，链断电。 / Komplex IV, die Kette steht.


`Klausur-Satz: Ohne Bilanz bleibt jede Energieaussage geraten, mit 32 wird sie gerechnet.`

## Fehlvorstellung

1. 误解：呼吸即喘气。
   中文纠偏：细胞呼吸是砸糖取能，喘气只是送氧。
   Korrektur-Satz: `Zellatmung ist Energiefreisetzung mit Sauerstoff als Endakzeptor: Atmen liefert nur die Luft dazu.`

2. 误解：发酵也差不多。
   中文纠偏：发酵只有2不是32，手电不是电厂。
   Korrektur-Satz: `Gaerung liefert zwei statt 32 ATP: Notstrom, kein Kraftwerk.`

## Schritt 7 — szenario: Klausurtransfer: Protokoll zum Cyanid-Fall

ROLLE：中文：你是急诊毒理医生。 / 德语：Du bist Toxikologin im Notdienst.
SITUATION：病人闻苦杏仁味后倒下：请用呼吸链、终受体与结算解释氰化物为何致命、单靠吸氧为何救不了（约150词）。 / 德语：Ein Patient kollabiert nach Bittermandelgeruch. Erklaere in ca. 150 Woertern mit Kette, Endakzeptor und Bilanz, warum Cyanid tötet und warum Beatmung allein nicht rettet.
RUBRIC (30 XP)：Kettenlogik (8 XP) | Endakzeptor (8 XP) | Bilanz (8 XP) | Therapie (6 XP).


`Klausur-Satz: Achtung Falle: Cyanid stoppt die Kette, nicht die Glykolyse — der Unterschied rettet Punkte.`

## Schritt 8 — reflexion: Takeaway & Reflexion

TAKEAWAY核心总结：

中文：按梯子想：胞质保2、电厂出大头、氧气收银。
Takeaway-Satz: `Leiter denken: zwei im Plasma, Rest im Kraftwerk, Sauerstoff kassiert.`

`Klausur-Satz: Atmung ist kontrolliertes Feuer: Die Zelle verbrennt Zucker in Raten statt zu explodieren.`


REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Sandkasten-Challenge (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. 元认知计划：Beim naechsten Mal sichere ich zuerst die Werkzeugkiste, weil jeder Handgriff darauf aufbaut.
