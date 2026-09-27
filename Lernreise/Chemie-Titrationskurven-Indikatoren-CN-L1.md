---
fach: Chemie
thema: "Titrationskurven und Indikatoren"
level: 1
ziel: Klausur
xp: 100
operatoren: [darstellen, begruenden, auswaehlen]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Chemie, Saeure-Base]
version: Lesson-v3
---

# Lernreise: Titrationskurven und Indikatoren — Episode C22: Pink bleibt aus am Titriertisch

<!-- Campaign: Imperium-Alchemie | Chemie | entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->
## Schritt 1 — entdecken: Der störrische Indikator: Pink bleibt aus

ZIELE（本节三目标）：
1. 中文：能描述滴定操作。
2. 中文：能用c乘V定等当点。
3. 中文：能按变色域选指示剂。

【危机Hook】Phenolphthalein bleibt farblos, wo Pink erwartet war: Der Automat streikt. 酚酞该变粉却无色：自动滴定仪罢工了。质检员Mia盯着锥形瓶——多一滴整批误判，少一滴浓度成谜。等当点藏在pH陡升的那一跳里，指示剂选错等于闭眼打靶。今晚必须亲手滴出那一跳，否则出厂单没人敢签。

`Klausur-Satz: Pink bleibt aus, wo der Automat streikt: Nur die Hand am Hahn findet den Sprung.`

## Schritt 2 — entdecken: Die Titrations-Werkzeugkiste der Analysten

PRETRAINING术语盒（5大装备，中文在上、德语在下）：

- 中文：滴定 — 德语：Titration：用已知浓度测未知。 / Titration: Titration bestimmt Unbekanntes mit bekannter Massloesung aus der Buerette. Tropfenweise Naeherung an den Aequivalenzpunkt. Mechanismus: Man laesst Massloesung zu, bis der Indikator umschlaegt, und liest das Volumen ab. Klausur-Tipp: Massloesung plus Buerette als Geraetepaar.

- 中文：等当点 — 德语：Aequivalenzpunkt：酸碱摩尔恰相等。 / Aequivalenzpunkt: Am Aequivalenzpunkt gleichen sich Saeure- und Basenmengen exakt aus. Hier springt die Kurve am steilsten. Mechanismus: Man rechnet c-mal-V beider Seiten gleich und loest nach Unbekannt auf. Klausur-Tipp: cS-mal-VS-gleich-cM-mal-VM als Kerngleichung.

- 中文：pH突跃 — 德语：pH-Sprung：等当点处的陡升。 / pH-Sprung: Der pH-Sprung ist der steile Anstieg der Kurve am Aequivalenzpunkt. Ein Tropfen aendert Einheiten. Mechanismus: Stark-stark springt durch 7, schwach-stark startet hoeher: Die Lage verrät die Staerke. Klausur-Tipp: Sprunglage als Staerke-Beweis lesen.

- 中文：指示剂 — 德语：Indikator：变色域配突跃。 / Indikator: Indikatoren schlagen in engen pH-Bereichen farbig um. Richtig gewaehlt faerben sie genau den Sprung. Mechanismus: Phenolphthalein 8 bis 10 faengt den stark-stark-Sprung, Methylorange 3 bis 4 den schwachen. Klausur-Tipp: Bereich plus Sprung als Wahlpaar begruenden.

- 中文：滴定曲线 — 德语：Titrationskurve：pH对体积的画像。 / Titrationskurve: Die Titrationskurve zeichnet pH gegen Volumen mit Start, Pufferzone, Sprung und Plateau. Jede Phase erzaehlt Chemie. Mechanismus: Man liest Halb-Aequivalenz als pKs und Aequivalenz als Sprungmitte. Klausur-Tipp: Vier Phasen benennen als Gliederungspunkt.


`Klausur-Satz: Aequivalenz heisst: Saeure-Mol gleich Base-Mol, c-mal-V entscheidet.`

## Schritt 3 — entdecken: Vom Tropfen zum Sprung: Die Neutralisationskette

ENTDECKEN因果传导机制（中文拆解在上，德语链条在下）：

中文：中和链：逐滴加液pH先缓后陡跳，等当点处cV相等，指示剂变色域须套住突跃。

德语：Die Neutralisationskette startet mit **Tropfen**: Massloesung fliesst zu, H3O+ schrumpft. Die **Kurve** steigt erst flach durch Puffer, dann schiesst der **Sprung** hoch. Am **Aequivalenzpunkt** gilt c-mal-V-Gleichheit; der **Indikator** bestaetigt farbig, was die Rechnung vorhersagte. Falscher Bereich, falsches Pink.

```diagram
Tropfen -> Puffer flach -> Sprung steil -> Plateau
cS*VS = cM*VM am Punkt
Indikator-Bereich muss Sprung treffen
```

Die Aequivalenzgleichung des Sandkastens (1 zu 1):

$$c_S \cdot V_S = c_M \cdot V_M \quad \text{(Aequivalenzpunkt 1:1)}$$

中文：等当点1比1时浓度乘体积两边相等。 / 德语：Bei anderen Verhaeltnissen Koeffizienten als Faktoren davorsetzen.

`Klausur-Satz: Tropfen naehern, Sprung verrät, Indikator bestaetigt: Die Kette endet in Pink.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Apotheker titrieren seit 200 Jahren von Hand — die Buerette ist aelter als das Auto.


**中文解读**: 药剂师手滴两百年——滴定管比汽车还老。


**Bezug zum Konzept**: Alt plus exakt: Die Hand am Hahn schlaegt manchen Automaten.

## Schritt 4 — ausprobieren: Sandkasten: Titriere bis zum Umschlag

[Werkzeug: titration-lab]

AUFGABE目标挑战：已知25毫升未知醋、0.1摩尔氢氧化钠：滴到粉红读数算浓度，再为弱碱对强酸选指示剂。 德语原题：Gegeben: 25 mL Essig unbekannt, 0,1 mol/L NaOH, Phenolphthalein. Titriere im Simulator bis Pink, lies das Volumen ab und berechne c; waehle dann den Indikator fuer schwache Base gegen starke Saeure.

HILFE:
1. Langsam zutropfen und Farbe beobachten.
2. Volumen am Umschlag ablesen.
3. c-mal-V-Gleichung nach Unbekannt loesen.

MUSTERLOESUNG：中文：12.5毫升变色得醋0.05摩尔每升，弱碱对强酸突跃偏酸故选甲基橙。 / 德语：Umschlag bei 12,5 mL: c Essig gleich 0,05 mol/L; schwache Base gegen starke Saeure braucht Methylorange, weil der Sprung sauer liegt.

`Klausur-Satz: Mit 12,5 mL fuer 25 mL 0,1-molarer Saeure titriert der Sandkasten statt zu raten.`

## Schritt 5 — ausprobieren: Duell der Wege: Bueretten-Rechnung gegen Kurven-Deutung

VERGLEICH: Waehle erst den Analyse-Weg, dann loesen: (i) Bueretten-Rechenweg oder (ii) Kurven-Deuteweg — dann loesen.选程序：先看信号词再选路。


Weg A：Weg A (Bueretten-Rechenweg): Volumina quantitativ ablesen und Konzentrationen ausrechnen. Dieser Weg liefert c-Zahlen und ist protokollfest.

Weg B：Weg B (Kurven-Deuteweg): Kurvenformen qualitativ lesen und Indikatoren begruenden. Dieser Weg waehlt richtig, rechnet aber nichts.


AUFGABE A: Essigkonzentration aus Volumen exakt gesucht. Welcher Weg? 【选程序：先看信号词再选路】

AUFGABE B: Welcher Indikator bei saurem Sprung? Welcher Weg? 【选程序：先看信号词再选路】


HILFE：A nennt Volumen — Weg A mit Gleichung. B nennt Sprung — Weg B mit Bereich.

ANTWORT：中文：A走滴定管路列式算；B走曲线路由域套跳选。 / 德语：A folgt Weg A mit c-mal-V-Rechnung; B folgt Weg B mit Bereich-trifft-Sprung-Argument.

`Klausur-Satz: Buerette rechnen beweist, Kurven deuten warnen — die Klausur braucht beides.`

## Schritt 6 — check: Selbsttest zu Titration und Indikatoren

- FRAGE: 等当点公式是什么？（Wie lautet die Äquivalenzgleichung） | ANTWORT: cV等于cV。 / c-mal-V gleich c-mal-V.

- FRAGE: 酚甲基橙适合哪？（Wozu passt Phenolphthalein） | ANTWORT: 强酸强碱跳突跨7。 / Stark-stark mit Sprung ueber 7.

- FRAGE: 变色等于等当吗？（Ist Umschlag gleich Äquivalenz） | ANTWORT: 接近即可罕见相等。 / Nah genug zaehlt, exakt ist selten.


`Klausur-Satz: Ohne Sprunglage bleibt jede Indikatorwahl geraten, mit ihr wird sie begruendet.`

## Fehlvorstellung

1. 误解：变色即等当。
   中文纠偏：变色靠近而罕合，套住突跃即中。
   Korrektur-Satz: `Umschlag liegt nah, selten exakt: Nah genug zaehlt als Treffer.`

2. 误解：指示剂通用。
   中文纠偏：变色域必须套住突跃。
   Korrektur-Satz: `Bereich muss Sprung treffen: Phenolphthalein verfehlt saure Spruenge.`

## Schritt 7 — szenario: Klausurtransfer: Analyseprotokoll zur Essigprobe

ROLLE：中文：你是食品实验室分析员。 / 德语：Du bist Analystin im Lebensmittellabor.
SITUATION：食醋样品偏离：请写约150词分析报告，含滴定、计算与指示剂选择。 / 德语：Die Essigprobe weicht ab. Schreibe in ca. 150 Woertern ein Protokoll mit Titration, Rechnung und Indikatorwahl.
RUBRIC (30 XP)：Durchfuehrung (8 XP) | Rechnung (8 XP) | Indikatorwahl (8 XP) | Urteil (6 XP).
ZEITREGEL: MAX 2 Minuten — 90秒滴至粉红读数，30秒写甲基橙选择句，然后交卷；Timer stellen.


`Klausur-Satz: Achtung Falle: Umschlag ungleich Aequivalenz — nah genug zaehlt, gleich ist selten.`

## Schritt 8 — reflexion: Takeaway & Reflexion

TAKEAWAY核心总结：

中文：域套跳：指示剂要在曲线跳处跳。
Takeaway-Satz: `Bereich auf Sprung legen: Der Indikator muss springen, wo die Kurve springt.`

`Klausur-Satz: Titration ist Geduld als Methode: Tropfen zaehlen, bis die Chemie spricht.`


REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Sandkasten-Challenge (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. 元认知计划：Beim naechsten Mal verfolge ich zuerst Tropfen, Puffer, Sprung und Plateau am 25-mL-Essig-Fall, weil jede Umschlag-Entscheidung darauf aufbaut.
