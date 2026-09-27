---
fach: Bio
thema: "Biomembran und Transportmechanismen"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, vergleichen, erklaeren]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Bio, Zellbiologie]
version: Lesson-v3
---

# Lernreise: Biomembran und Transportmechanismen — Episode B4: Fieber im Reaktorbecken

<!-- Campaign: Nano-Zellfabrik-Krise | Bio | Instapower: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken: Alarm am Tor 3 der Membranfestung

ZIELE（本节三目标）：
1. 中文：能描述流动镶嵌模型的膜结构。
2. 中文：能按浓度梯度与ATP区分被动与主动运输。
3. 中文：能用水势与膨压解释质壁分离与复原。

【危机Hook】Katalys-Reaktor heizt auf 42 Grad; Dr. Finn Katalys ruft Enzym-Notstand aus. 凌晨三点，纳米细胞工厂警铃大作：7号车间报告水分流失，液泡正在萎缩，安保队长Mara Zell举着手电冲过厂区。食堂的餐盘就是证据——中午的黄瓜片撒盐后变软出水；实验室里红细胞在蒸馏水中胀破，旁边的植物细胞却依然挺拔。为什么水一会儿往外跑、一会儿往里灌？为什么一堵墙能救一些细胞，另一些却爆掉？OSMO-9测得外界强高渗，今晚谁先搞懂“膜大门”的规则，谁就能救下整个夜班。本关你要拿下膜结构与跨膜运输的全部考点。

`Klausur-Satz: Wasser folgt dem Wasserpotenzial und stroemt stets zur Seite des niedrigeren Psi-Werts.`

## Schritt 2 — entdecken: Die Werkzeugkiste der Torwaechter

PRETRAINING术语盒（5大装备，中文在上、德语在下）：

- 中文：磷脂双分子层 — 德语：Phospholipid-Doppelschicht：头部亲水、尾部疏水，尾对尾排成两层，是膜的屏障主体。 / Zwei Reihen Schwanz-an-Schwanz; Köpfe hydrophil, Schwaenze hydrophob.
- 中文：流动镶嵌模型 — 德语：Fluessig-Mosaik-Modell：蛋白像岛一样嵌在脂海中，可侧向流动，膜兼具流动性与不对称性。 / Proteine schwimmen wie Inseln seitlich beweglich im Lipidmeer.
- 中文：选择透过性 — 德语：Selektive Permeabilitaet：小分子非极性可自由穿过，离子大分子必须走转运蛋白。 / Kleine unpolare Teilchen passieren frei, Ionen nur per Protein.
- 中文：被动运输 — 德语：Passiver Transport：顺浓度梯度、无需ATP：扩散、渗透、易化扩散。 / Mit dem Gefaelle, ohne ATP: Diffusion, Osmose, erleichterte Diffusion.
- 中文：主动运输 — 德语：Aktiver Transport：逆浓度梯度、耗ATP，如钠钾泵。 / Gegen das Gefaelle mit ATP, z. B. Na+/K+-ATPase.

`Klausur-Satz: Selektive Permeabilitaet heisst: Kleine unpolare Teilchen passieren frei, Ionen nur über Proteine.`

## Schritt 3 — entdecken: Die Weiche: Mit oder gegen das Gefaelle

ENTDECKEN因果传导机制（中文拆解在上，德语链条在下）：

中文：水永远从高水势流向低水势。外界高渗→水外流→液泡萎缩→原生质体脱壁→膨压归零，即质壁分离；外界低渗→水内流→顶住细胞壁建膨压直至平衡；动物细胞无壁则胀破溶血。另一条分支是运输岔路：顺梯度不耗能为被动，逆梯度耗ATP为主动。

德语：Wasser folgt stets dem Wasserpotenzial vom hoeheren zum niedrigeren Wert. Ist das Aussenmedium hypertonisch, verlaesst Wasser die Zelle: Die Vakuole schrumpft, der Protoplast loest sich von der Wand, der Turgor faellt auf null — Plasmolyse. Ist es hypotonisch, stroemt Wasser ein: Der Protoplast drueckt gegen die Wand, der Turgor steigt, bis Einstrom und Gegendruck sich ausgleichen. Tierische Zellen ohne Wand platzen dabei (Haemolyse). Parallel gilt die Transport-Weiche: Mit Gefaelle und ohne ATP ist es passiv, gegen Gefaelle mit ATP ist es aktiv.

```diagram
Aussen hypertonisch -> Wasser raus -> Turgor 0 -> Plasmolyse
Aussen hypotonisch -> Wasser rein -> Turgor steigt -> Deplasmolyse
Tier ohne Wand + Einstrom -> Haemolyse
Mit Gefaelle ohne ATP = passiv | Gegen Gefaelle mit ATP = aktiv
```

`Klausur-Satz: Osmose lenkt Wasser, ATP-Pumpen halten die Gefaelle dagegen aufrecht.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Salat wird in kaltem Wasser wieder knackig: Die Zellen saugen Wasser ein, der Turgor steigt, das Gewebe strafft sich — die Kueche nutzt Psi-Gefaelle ganz ohne Formel.

**中文解读**: 蔫生菜泡冷水变脆：细胞吸水、膨压回升、组织挺括——厨房天天在用“水势梯度”，只是没写公式。

**Bezug zum Konzept**: Welker Salat zeigt Deplasmolyse als Rueckstrom zum hoeheren Psi.

## Schritt 4 — ausprobieren: Sandkasten-Alarm: Rette die schrumpfende Zelle

[Werkzeug: osmose-lab]

AUFGABE目标挑战：目标挑战：设外界浓度0,25 mol/L、细胞内0,08 mol/L，先预测水流方向，再把质壁分离的细胞在5模拟分钟内救回（膨压回到0.2 MPa以上）。 德语原题：Eine Pflanzenzelle mit Psi_innen = -0,4 MPa liegt in einer Loesung mit Psi_aussen = -1,1 MPa. Berechne die Richtung und begruende den Turgor-Verlauf.

HILFE:
1. Psi-Differenz bilden: Delta = Psi_aussen minus Psi_innen.
2. Vorzeichen deuten: negativ heisst Ausstrom.
3. Turgor faellt bei Ausstrom, steigt bei Einstrom.

MUSTERLÖSUNG：中文：Delta=-0.7 MPa为负→水外流→膨压降至零→质壁分离；换清水后水势反转，内流重建膨压直至平衡，即复原。 / 德语：Delta = -1,1 minus (-0,4) = -0,7 MPa, also negativ: Wasser stroemt aus, Turgor sinkt gegen null, Plasmolyse. In reinem Wasser kehrt sich das Gefaelle um: Einstrom bis Turgor den Ausgleich herstellt.

`Klausur-Satz: Mit Delta-Psi von -0,7 MPa stroemt Wasser aus, bis Turgor null die Plasmolyse markiert.`

## Schritt 5 — ausprobieren: Duell der Wege: Kanal gegen Pumpe

VERGLEICH: Waehle erst das Verfahren — (i) Osmose-Weiche oder (ii) Pumpen-Weiche — dann loesen.选程序：先看顺/逆梯度与ATP，再选分支。

Weg A：Weg A (Osmose-Weiche): Gefaelle des Wassers pruefen, Richtung aus Delta-Psi ableiten, Turgor deuten.

Weg B：Weg B (Pumpen-Weiche): ATP-Abhaengigkeit pruefen, Transporttyp aus Richtung gegen das Gefaelle bestimmen.

AUFGABE A: Wurzelhaare nehmen nach Regen Wasser auf, ATP-Spiegel unveraendert. Welcher Weg? 【选程序：先看信号词再选路】

AUFGABE B: Nervenzelle pumpt K+ gegen das Gefaelle; Cyanid stoppt alles. Welcher Weg? 【选程序：先看信号词再选路】

HILFE：A nennt Einstrom ohne ATP — Weg A. B nennt Anreicherung gegen Gefaelle plus Gift — Weg B.

ANTWORT：ANTWORT: A folgt Weg A als Osmose über Aquaporine; B folgt Weg B als primaer aktiver Transport über die Na+/K+-ATPase, der bei ATP-Stopp zusammenbricht.

`Klausur-Satz: Zahlen mit Psi verlangen Delta-Psi, Pumpen mit ATP verlangen den Transporttyp.`

## Schritt 6 — check: Selbsttest zu Biomembran und Transportmechanismen

FRAGE：哪些粒子可自由穿过双分子层？（Welche Teilchen passieren die Doppelschicht frei?） | ANTWORT：O2、CO2等小分子非极性；离子走蛋白。 / Kleine unpolare wie O2 und CO2; Ionen brauchen Proteine.
FRAGE：植物细胞在清水中为何不爆？（Warum platzt die Pflanzenzelle in Wasser nicht?） | ANTWORT：细胞壁建膨压对抗；动物细胞无壁则溶血。 / Die Wand baut Turgor als Gegendruck auf; Tierzellen ohne Wand lysieren.
FRAGE：如何一眼认出主动运输？（Woran erkennst du aktiven Transport?） | ANTWORT：逆梯度+耗ATP。 / Bewegung gegen das Gefaelle plus ATP-Verbrauch.

`Klausur-Satz: Ohne Delta-Psi bleibt Osmose geraten, mit Delta-Psi wird sie gerechnet.`

## Fehlvorstellung

1. 误解：误解“水往盐少处跑”。
   中文纠偏：见德语纠偏句。
   Korrektur-Satz: `Wasser stroemt zur Seite der hoeheren Loesungskonzentration, also zum staerker negativen Psi.`
2. 误解：误解“渗透耗ATP”。
   中文纠偏：见德语纠偏句。
   Korrektur-Satz: `Osmose ist passiv ohne ATP; nur Transport gegen das Gefaelle kostet ATP.`

## Schritt 7 — szenario: Klausurtransfer: Nachtschicht-Protokoll am Osmose-Tor

ROLLE：中文：你是工厂夜班技术员。 / 德语：Du bist Agrarbiologin im Nachtdienst.
SITUATION：大棚番茄施肥过量后，土壤湿润却萎蔫。请用紧张度、水势、质壁分离与膨压解释并给出急救措施（约150词）。 / 德语：Gewaechaustomaten welken trotz nasser Erde nach Ueberduengung. Erklaere mit Tonizitaet, Wasserpotenzial, Plasmolyse und Turgor in ca. 150 Woertern, was auf Zellebene geschah, und nenne die Sofortmassnahme.
RUBRIC (30 XP)：Hyperton-Diagnose (8 XP) | Wasserentzug trotz Nässe (8 XP) | Turgorverlust mit Plasmolyse (8 XP) | Auswaschen mit Reinwasser (6 XP).

`Klausur-Satz: Hyperton entzieht Wasser trotz Nässe; Reinwasser spült hypertonen Dünger zur Deplasmolyse aus.`

## Schritt 8 — reflexion: Takeaway & Reflexion

TAKEAWAY核心总结：

中文：水永远从高水势流向低水势。外界高渗→水外流→液泡萎缩→原生质体脱壁→膨压归零，即质壁分离；外界低渗→水内流→顶住细胞壁建膨压直至平衡；动物细胞无壁则胀破溶血。另一条分支是运输岔路：顺梯度不耗能为被动，逆梯度耗ATP为主动。
Takeaway-Satz: `Psi rechnen statt raten: Wasser stroemt zum niedrigeren Wert, Turgor bremst bis zum Ausgleich.`

`Klausur-Satz: Psi rechnen statt raten: Wasser stroemt zum niedrigeren Wert, Turgor bremst bis zum Ausgleich.`


REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Sandkasten-Challenge (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. 元认知计划：Beim nächsten Mal sichere ich zuerst die Werkzeugkiste, weil jeder Handgriff darauf aufbaut.
