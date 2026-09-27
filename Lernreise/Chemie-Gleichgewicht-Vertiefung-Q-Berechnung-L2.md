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
1. 中文：会写质量作用定律并排除纯固体。
2. 中文：会用Q与K判方向。
3. 中文：会用勒夏特列分析扰动并说清K的变化。

【危机Hook】Die Reaktion schläft ein; Katalysator-Karl wird aus dem Bett geklingelt. 午夜帝国炼金基地压力警报大作：哈伯塔摇晃、氨收率暴跌，总监Vera Haber穿着白大褂冲过厂区。班长Jonas Säure盯着浓度、压强、温度三个旋钮不知先拧哪个，实习生Mia Puffer说出金句：系统总会削弱扰动。但小心：只有一个量能改变常数本身，其余只是推着比值来回跑。搞懂为何高压+适温能救塔、为何催化剂永远改不了位置，才能救下夜班。

`Klausur-Satz: K beschreibt die Lage, Q den Moment; gleich heisst Ruhe.`

## Schritt 2 — entdecken: Die Q-K-Rechenkiste der Bilanzauditoren

PRETRAINING术语盒（5大装备，中文在上、德语在下）：

- 中文：动态平衡 — 德语：Dynamisches Gleichgewicht：正逆速率相等、浓度不变。 / Hin- und Rückrate gleich, Konzentrationen konstant.
- 中文：质量作用定律 — 德语：Massenwirkungsgesetz：平衡浓度按系数幂次写成商。 / K als Quotient potenzierter Gleichgewichtskonzentrationen.
- 中文：平衡常数 — 德语：Gleichgewichtskonstante：只随温度变，指示位置。 / Nur temperaturabhängig, zeigt die Lage.
- 中文：反应商 — 德语：Reaktionsquotient Q：同式任意时刻代入，指方向。 / Gleiche Formel, beliebiger Zeitpunkt, Richtungsweiser.
- 中文：勒夏特列 — 德语：Le Chatelier：系统削弱扰动。 / System weicht der Störung aus.

`Klausur-Satz: Reine Feststoffe gehoeren nicht in den K-Ausdruck.`

## Schritt 3 — entdecken: Vom Messwert zur Richtung: Die Q-Kette

ENTDECKEN因果传导机制（中文拆解在上，德语链条在下）：

中文：因果链：K定位置，Q定此刻。Q<K缺产物→右补；Q>K产物过剩→左退；相等则静。浓度压强只改Q，系统跑到Q=K为止；只有温度改K：放热反应升温左移且K变小；催化剂只加速。

德语：Die Kette: K beschreibt die Lage, Q den Moment. Q kleiner als K heisst zu wenig Produkt — rechts nachfüllen; Q grösser als K heisst zu viel — links abbauen; gleich heisst Ruhe. Konzentration und Druck ändern nur Q, das System läuft, bis Q wieder gleich K ist. Nur Temperatur ändert K selbst: Heizen bei exotherm schiebt links und senkt K. Katalysator macht nur schneller.

```diagram
Q < K -> rechts | Q = K -> Ruhe | Q > K -> links
c/p aendern nur Q | T aendert K
Exotherm + Heizen -> links, K sinkt
```

`Klausur-Satz: Q kleiner als K heisst rechts, groesser heisst links.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Haber und Bosch stritten mit der Temperatur: Heiss läuft schnell, kühl liegt gut — der Turm lebt vom Kompromiss aus Druck und Katalysator.

**中文解读**: 哈伯与博施跟温度吵了一架：热跑得快、冷站得好——工厂靠压力与催化剂妥协求生。

**Bezug zum Konzept**: Der Turm zeigt: Lage und Tempo sind zwei Gegner.

## Schritt 4 — ausprobieren: Bilanz-Sandkasten: Jage Q zurück zu K

[Werkzeug: le-chatelier-sim]

AUFGABE目标挑战：目标挑战：K=64，H2、I2初浓度0,15 mol/L，用三段式算HI平衡浓度与转化率，转化率超70%，并验算Q=K。 德语原题：N2 + 3 H2 <-> 2 NH3, exotherm. Druck hoch, Temperatur hoch: Wohin läuft es?

HILFE:
1. Teilchen zählen: 4 gegen 2.
2. Exotherm plus Heizen heisst links.
3. Katalysator nur schneller.

MUSTERLÖSUNG：中文：加压推向气体少的右侧，升温推向吸热的左侧；工厂要高压、适温加催化剂。 / 德语：Mehr Druck schiebt rechts zu weniger Teilchen, Heizen schiebt links zur endothermen Seite; netto braucht der Turm Hochdruck, mässige Temperatur und Katalysator.

`Klausur-Satz: Hochdruck und Mass-Temperatur retten den Turm.`

## Schritt 5 — ausprobieren: Duell der Tabellen: Start gegen Gleichgewicht

VERGLEICH: Waehle erst das Auge — (i) MWG-Rechenauge oder (ii) Stoerungsauge — dann loesen.选程序：先看要数值还是判方向。

Weg A：Weg A (Rechen-Weiche): Konzentrationen gegeben, K oder Q rechnen.

Weg B：Weg B (Stoerungs-Weiche): Nur Stoerung genannt, Richtung mit Le Chatelier deuten.

AUFGABE A: c-Werte gegeben, K berechnen. Welches Auge? 【选程序：先看信号词再选路】

AUFGABE B: Nur Erhitzen genannt, Richtung gesucht. Welches Auge? 【选程序：先看信号词再选路】

HILFE：A nennt Zahlen — Weg A. B nennt Stoerung — Weg B.

ANTWORT：ANTWORT: A folgt Weg A mit MWG-Ausdruck und Dreisatztabelle; B folgt Weg B mit Le-Chatelier-Begruendung.

`Klausur-Satz: Zahlen verlangen MWG, Stoerungen verlangen Le Chatelier.`

## Schritt 6 — check: Selbsttest zu Gleichgewichtsvertiefung mit Q-Berechnung

FRAGE：什么不写入K？（Was gehört nicht in K?） | ANTWORT：纯固体与纯液体。 / Reine Feststoffe und Fluessigkeiten.
FRAGE：Q<K意味着？（Was heisst Q kleiner als K?） | ANTWORT：缺产物，右行。 / Zu wenig Produkt: rechts laufen.
FRAGE：什么改变K本身？（Was aendert K selbst?） | ANTWORT：只有温度。 / Nur die Temperatur.

`Klausur-Satz: Ohne Q bleibt Richtung geraten, mit Q wird sie gerechnet.`

## Fehlvorstellung

1. 误解：误解“催化剂右移平衡”。
   中文纠偏：见德语纠偏句。
   Korrektur-Satz: `Er beschleunigt beide Richtungen gleich und aendert weder Lage noch K.`
2. 误解：误解“平衡移动=K变了”。
   中文纠偏：见德语纠偏句。
   Korrektur-Satz: `Nur Temperatur aendert K; sonst läuft Q zurueck zu K.`

## Schritt 7 — szenario: Klausurtransfer: Auditoren-Einsatz im Messlabor

ROLLE：中文：你是化工基地夜班技术员。 / 德语：Du bist Verfahrenstechniker am Haber-Turm.
SITUATION：领导想大升温大降压，请用勒夏特列反驳并给出正确条件（约150词）。 / 德语：Die Leitung will stark heizen und Druck senken. Beurteile in ca. 150 Woertern mit Le Chatelier, welche Bedingungen wirklich helfen.
RUBRIC (30 XP)：Temperaturlogik (8 XP) | Drucklogik (8 XP) | Gegenentwurf (8 XP) | Abwaegung (6 XP).

`Klausur-Satz: Heizen bei exotherm schiebt links und senkt K.`

## Schritt 8 — reflexion: Takeaway & Reflexion

TAKEAWAY核心总结：

中文：因果链：K定位置，Q定此刻。Q<K缺产物→右补；Q>K产物过剩→左退；相等则静。浓度压强只改Q，系统跑到Q=K为止；只有温度改K：放热反应升温左移且K变小；催化剂只加速。
Takeaway-Satz: `Lage halten heisst Q zu K zurueckfuehren.`

`Klausur-Satz: Lage halten heisst Q zu K zurueckfuehren.`


REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Sandkasten-Challenge (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. 元认知计划：Beim nächsten Mal sichere ich zuerst die Werkzeugkiste, weil jeder Handgriff darauf aufbaut.
