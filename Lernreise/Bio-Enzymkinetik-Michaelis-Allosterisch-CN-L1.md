---
fach: Bio
thema: "Enzymkinetik mit Michaelis und allosterischer Regulation"
level: 1
ziel: Klausur
xp: 100
operatoren: [darstellen, erklaeren, vergleichen]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Bio, CN]
version: Lesson-v3
---

# Lernreise: Enzymkinetik mit Michaelis und allosterischer Regulation — Episode B16: Phage Vex klopft an

<!-- Campaign: Nano-Zellfabrik-Krise | Bio | Instapower: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->
## Schritt 1 — entdecken: Das Gegengift-Rennen: Wer blockiert wen

ZIELE（本节三目标）：
1. 中文：能读米氏曲线Km与vmax。
2. 中文：能区分竞争与非竞争抑制。
3. 中文：能把别构调节讲成开关。

【危机Hook】Vergiftung um Mitternacht: Nur ein Gegengift passt, die Uhr tickt. 午夜中毒急救：解药只有一种，时钟在滴答。毒物卡在酶的活性中心，医生要么加量硬挤，要么另找侧门开关——加错剂量病人没救，找错开关毒性翻倍。今晚必须读懂那条饱和曲线，否则药变毒。

`Klausur-Satz: Gift oder Gegengift entscheidet die Kurve: Km verrät Affinitaet, vmax verrät das Limit.`

## Schritt 2 — entdecken: Die Kinetik-Werkzeugkiste der Apotheke

PRETRAINING术语盒（5大装备，中文在上、德语在下）：

- 中文：米氏常数 — 德语：Michaelis-Konstante：半速处的亲和标尺。 / Michaelis-Konstante: Die Michaelis-Konstante Km ist die Substratkonzentration bei halber Maximalrate. Kleines Km bedeutet hohe Affinitaet. Mechanismus: Bei Km ist die Haelfte der Zentren besetzt; die Kurve steigt dort am steilsten und kennt den Halbpunkt. Klausur-Tipp: Km als Halbmax-Punkt einzeichnen und Affinitaet umgekehrt deuten.

- 中文：最大速率 — 德语：Maximalrate：酶全员上岗的极限。 / Maximalrate: vmax ist die Rate bei Substratsaettigung, wenn alle Zentren besetzt sind. Sie waechst nur mit der Enzymmenge. Mechanismus: Mehr Enzym hebt das Plateau, mehr Substrat aendert nichts mehr: Die Schlange ist das Limit. Klausur-Tipp: vmax als Plateau zeichnen und nur Enzymmenge als Heber nennen.

- 中文：竞争性抑制 — 德语：Kompetitive Hemmung：抢座位，加底物可翻盘。 / Kompetitive Hemmung: Der kompetitive Hemmstoff besetzt das aktive Zentrum und konkurriert mit dem Substrat. Viel Substrat verdraengt ihn vollstaendig. Mechanismus: Km steigt scheinbar, vmax bleibt erreichbar: Bei genug Substrat laeuft die Fabrik wieder voll. Klausur-Tipp: vmax gleich, Km rechts — das Kurvenpaar als Beweis zeichnen.

- 中文：非竞争性抑制 — 德语：Nicht-kompetitive Hemmung：锁侧门，加底物也没用。 / Nicht-kompetitive Hemmung: Der nicht-kompetitive Hemmstoff bindet ausserhalb und verformt das Zentrum. Mehr Substrat hilft nicht. Mechanismus: vmax sinkt, Km bleibt: Weniger funktionierende Zentren arbeiten normal, der Rest schweigt. Klausur-Tipp: vmax unten, Km gleich — Senkung ohne Verschiebung.

- 中文：别构调节 — 德语：Allosterische Regulation：终产物按自己的开关。 / Allosterische Regulation: Allosterische Effektoren schalten Enzyme durch Bindung fern vom Zentrum um. Endprodukte hemmen oft den ersten Schritt ihrer Kette. Mechanismus: Die Kette reguliert sich selbst per Feedback: Viel Produkt drueckt den Start, wenig Produkt gibt ihn frei. Klausur-Tipp: Feedback mit Start und Ende der Kette als Regelkreis zeichnen.


`Klausur-Satz: Kompetitiv verschiebt Km nach rechts, nicht-kompetitiv drueckt vmax nach unten.`

## Schritt 3 — entdecken: Von der Saettigung zur Schaltung: Die Regulationskette

ENTDECKEN因果传导机制（中文拆解在上，德语链条在下）：

中文：因果链：底物填满中心至饱和定出vmax，半速点Km量亲和力；随后调节登场：竞争抢座、非竞争改形、别构反馈开关整条链，每种改法曲线各不同。

德语：Die Kette startet mit der **Saettigung**: Mehr Substrat fuellt mehr Zentren, bis alle besetzt sind und **vmax** das Plateau setzt. Der Halbpunkt **Km** misst die Affinitaet. Dann greift die **Regulation** ein: Kompetitive Hemmer konkurrieren um das Zentrum, nicht-kompetitive verformen es, **allosterische** Effektoren schalten ganze Ketten per Feedback. Jede Form veraendert die Kurve anders.

```diagram
Substrat hoch -> Zentren voll -> vmax-Plateau
Kompetitiv: Km rechts, vmax gleich
Nicht-kompetitiv: vmax unten, Km gleich
Allosterisch: Kette per Feedback geschaltet
```

Die Michaelis-Menten-Gleichung des Sandkastens:

$$v = \frac{v_{\max} \cdot [S]}{K_M + [S]}$$

中文：速率=vmax乘底物除以(Km加底物)，半速点即Km。 / 德语：Bei S gleich Km laeuft halbe Maximalrate; die Kurve startet linear und muendet ins Plateau.

`Klausur-Satz: Saettigung begrenzt die Rate, Regulation schaltet die Kette: Kurve plus Schalter erklaeren alles.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Penicillin blockiert bacterialische Wandbauer und rettet Millionen — ein Hemmstoff als Lebensretter.


**中文解读**: 青霉素卡住细菌建墙酶救了上亿人——抑制剂也能当救命恩人。


**Bezug zum Konzept**: Blockade als Therapie: Der richtige Hemmtyp heilt, der falsche vergiftet.

## Schritt 4 — ausprobieren: Sandkasten: Lies Km ab und stelle den Hemmtyp

[Werkzeug: formula]

AUFGABE目标挑战：已知有无抑制剂X的速率系列：定双Km与vmax，判抑制类型并论证加底物能否当解药。 德语原题：Gegeben: v-Werte bei S = 1/2/5/10/20 mM ohne und mit Hemmstoff X. Bestimme Km und vmax beider Kurven, entscheide kompetitiv oder nicht-kompetitiv und begruende, ob Substraterhoehung als Gegengift taugt.

HILFE:
1. Beide Kurven zeichnen und Plateaus vergleichen.
2. Km als Halbmax-Punkt je Kurve ablesen.
3. Hemmtyp aus Verschiebung oder Senkung ableiten.

MUSTERLOESUNG：中文：无X：Km2、vmax100；有X：Km右移vmax不变即竞争性，加底物可解。 / 德语：Ohne X: Km 2 mM, vmax 100; mit X: Km 6 mM, vmax 100: kompetitiv, denn vmax bleibt. Substraterhoehung verdraengt X und taugt als Gegengift.

`Klausur-Satz: Mit Km als Halbmax-Punkt und zwei Kurven entlarvt die Messung jeden Hemmtyp.`

## Schritt 5 — ausprobieren: Duell der Wege: Km-Rechnung gegen Hemmbild-Deutung

VERGLEICH: Waehle erst den Beweisweg, dann loesen: (i) Km-Rechenweg oder (ii) Hemmbild-Deuteweg — dann loesen.选程序：先看信号词再选路。


Weg A：Weg A (Km-Rechenweg): Km und vmax aus Messwerten quantitativ bestimmen und Kurven berechnen. Dieser Weg liefert Zahlen und ist gerichtsfest.

Weg B：Weg B (Hemmbild-Deuteweg): Kurvenbilder qualitativ vergleichen und Hemmtypen am Verlauf erkennen. Dieser Weg ist schnell, bleibt aber ohne Zahl duenn.


AUFGABE A: Km-Vergleich zweier Kurven mit Zahlen gesucht. Welcher Weg? 【选程序：先看信号词再选路】

AUFGABE B: Warum hilft Substrat nur bei einem Hemmtyp? Welcher Weg? 【选程序：先看信号词再选路】


HILFE：A nennt Zahlen — Weg A mit Rechnung. B nennt Warum mit Bild — Weg B mit Deutung.

ANTWORT：中文：A走计算路读半速点；B走图像路以中心变形作答。 / 德语：A folgt Weg A mit Halbmax-Ablesung; B folgt Weg B mit Zentrum-verformt-Argument.

`Klausur-Satz: Km rechnen lokalisiert, Hemmbilder deuten identifizieren — die Klausur braucht beides.`

## Schritt 6 — check: Selbsttest zu Enzymkinetik und Regulation

- FRAGE:：小Km代表什么？（Was bedeutet kleines Km） | ANTWORT:：亲和力高。 / Hohe Affinitaet.

- FRAGE:：竞争性抑制曲线怎么变？（Wie aendert kompetitive Hemmung die Kurve） | ANTWORT:：Km右移、vmax不变。 / Km wandert rechts, vmax bleibt.

- FRAGE:：别构调节为何像开关？（Warum wirkt allosterisch wie ein Schalter） | ANTWORT:：终产物反馈关整条链。 / Endprodukt schaltet die Kette per Feedback ab.


`Klausur-Satz: Ohne Kurvenvergleich bleibt jeder Hemmtyp geraten, mit ihm wird er gelesen.`

## Fehlvorstellung

1. 误解：Km即解离常数。
   中文纠偏：Km是半速浓度，只粗似亲和力。
   Korrektur-Satz: `Km ist die Halbmax-Konzentration: Sie aehnelt Affinitaet, ist aber eine kinetische Groesse.`

2. 误解：加底物可解百毒。
   中文纠偏：只有争座疗法可加底物解。
   Korrektur-Satz: `Nur kompetitive Hemmung laesst sich verdraengen; verformte Zentren bleiben stumm.`

## Schritt 7 — szenario: Klausurtransfer: Gutachten zum Medikamenten-Ziel

ROLLE：中文：你是药物研发组药理学家。 / 德语：Du bist Pharmakologin im Wirkstoff-Team.
SITUATION：某候选药抑制酶E：请用Km、vmax与曲线逻辑判定抑制类型、可否调剂量及对健康细胞风险（约150词）。 / 德语：Ein Kandidat hemmt Enzym E. Entscheide in ca. 150 Woertern mit Km-, vmax- und Kurvenlogik ueber Hemmtyp, Dosierbarkeit und das Risiko fuer gesunde Zellen.
RUBRIC (30 XP)：Kurvenlogik (8 XP) | Hemmtyp (8 XP) | Dosisurteil (8 XP) | Risikoabwaegung (6 XP).


`Klausur-Satz: Achtung Falle: Mehr Substrat rettet nur kompetitiv Gehemmte, nie allosterisch Verformte.`

## Schritt 8 — reflexion: Takeaway & Reflexion

TAKEAWAY核心总结：

中文：找半速点、比曲线：右移是抢座，下压是改形。
Takeaway-Satz: `Halbmax suchen, Kurven vergleichen: rechts heisst konkurrieren, unten heisst verformen.`

`Klausur-Satz: Regulation ist Voraussicht der Zelle: Sie baut Bremsen ein, bevor die Fabrik ueberlaeuft.`


REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Sandkasten-Challenge (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. 元认知计划：Beim naechsten Mal sichere ich zuerst die Werkzeugkiste, weil jeder Handgriff darauf aufbaut.
