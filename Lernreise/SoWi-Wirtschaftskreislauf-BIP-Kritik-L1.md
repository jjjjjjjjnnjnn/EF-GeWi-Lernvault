---
fach: SoWi
thema: "Wirtschaftskreislauf und BIP-Kritik"
level: 1
ziel: Klausur
xp: 100
operatoren: [analysieren, beurteilen]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, SoWi, Wirtschaft]
version: Lesson-v3
---

# Lernreise: Wirtschaftskreislauf und BIP-Kritik (L1, Ziel Klausur)

<!-- Lesson v3 8-Schritt-Architektur: Schritt 1-8 feste Struktur; Fehlvorstellung zwischen Schritt 6 und 7 (Parser skip, kein Schritt); [Werkzeug: <id>] interaktiv; Gating: check/szenario nicht bestanden = Weiter grau; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能画出扩展经济循环五部门——家庭、企业、国家、银行（资本市场）、国外，并标出货币流与实物流方向相反（货币顺时针、商品劳务逆时针，考试必画双箭头）。
2. 中文：能一句话说清 GDP 三种核算——生产法（增加值加总）、支出法（消费 + 投资 + 政府支出 + 净出口）、收入法（工资 + 利润 + 税收净额），并指出三者在理论上结果一致。
3. 中文：能完整写出 BIP 批判四点并做出判断——不计家务与 Ehrenamt、不计环境破坏与资源消耗、掩盖分配不均、把有害交易也算成增长，再用 NWI/HDI 一句收尾（AFB III 判断题标准结构）。

Klausur-Satz: `Der erweiterte Wirtschaftskreislauf zeigt die Geld- und Gueterstroeme zwischen fuenf Sektoren, das BIP misst nur deren monetarisierten Ausschnitt.`

## Schritt 2 — entdecken

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语）：

中文在上，德语在下：

- 经济循环 — Wirtschaftskreislauf：家庭与企业之间货币流与实物流循环流动的模型，erweitert mit Staat, Banken und Ausland。
- 货币流 vs. 实物流 — Geldstrom vs. Gueterstrom：货币为购买支付，方向与商品劳务流相反，是画图得分关键。
- 国内生产总值 — BIP (Bruttoinlandsprodukt)：一国一年内生产的最终产品与服务的市场价值总和。
- 外部性 — Externalitaet：市场价格未包含的副作用，如环境污染， gruene Rechnung will sie einpreisen。
- 福利与发展指数 — NWI und HDI：NWI (Nationaler Wohlfahrtsindex) 修正环境与分配，HDI misst Bildung, Gesundheit und Einkommen statt nur Wachstum。

Klausur-Satz: `Geldstroeme und Gueterstroeme laufen im Kreislauf in entgegengesetzter Richtung zwischen Haushalten und Unternehmen.`

## Schritt 3 — entdecken

ENTDECKEN（1概念 + 1文字图解）：

中文：经济循环的核心思想是"钱货对流"。家庭向企业提供劳动，企业向家庭支付工资（货币流），家庭回头用工资买商品（货币流回去），企业交付商品劳务（实物流反向）。扩展到五部门：国家收税再支出（转移支付 + 公共品），银行汇集储蓄再放贷投资，国外通过出口进口连通内外。GDP 只是给这个循环"量体温"——生产法看企业造了多少增加值，支出法看各部门花了多少钱，收入法看要素分了多少钱，三种量法量的是同一池水。而 BIP 批判恰恰指出体温计的盲区：家务没标价就不算，污染没标价也不扣，穷富差距看不见，修车扫灾难也算增长。绿色核算（NWI）与 HDI 就是两副"矫正眼镜"：一个扣掉环境账，一个加上教育健康账。

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
                    Gueterstrom (reale Stroeme, gegen Uhrzeiger)
   Haushalte -----------------------> Unternehmen
   (Arbeit, Ersparnis)               (Gueter, Dienste)
         ^                                    |
         |                                    v
         +------- Geldstrom (Uhrzeiger) -------+
         (Lohn, Konsumausgaben)

   Erweiterung:
   Staat: Steuern <-- Haushalte/Unternehmen --> Transfers + oeffentliche Gueter
   Banken: Ersparnis --> Kredite --> Investitionen (Vermoegensaenderung)
   Ausland: Exporte <-> Importe (Aussenbeitrag = Ex - Im)

   BIP = C + I + G + (Ex - Im)  [Ausgabenansatz in einem Satz]
```

Klausur-Satz: `Im erweiterten Kreislauf ergaenzen Staat, Banken und Ausland den Tausch zwischen Haushalten und Unternehmen um Umverteilung, Finanzierung und Aussenhandel.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Nach einem schweren Sturm steigt das BIP oft an, weil Reparaturen, Ersatzkaeufe und Bauleistungen als Umsatz gezaehlt werden. Der zerstoerte Wald, die verlorene Freizeit und die seelische Belastung tauchen dagegen nirgends als Minus auf. Oekonomen nennen das die Blindheit des BIP fuer Wohlfahrt. Die gruene Rechnung fordert daher: Wer die Umwelt nutzt, soll die Kosten in den Preisen sichtbar machen, sonst subventioniert die Natur unfreiwillig das Wachstum.

**中文解读**: 风暴过后 GDP 反而上涨——修房子买家电都算增长，被毁的森林与失去的闲暇却不扣分。这个"灾害悖论"就是 BIP 批判最直观的 Hook：GDP 只认标价，不认福利。绿色核算要做的，就是把外部性标价，让污染者买单。

**Bezug zum Konzept**: `Das BIP zaehlt monetaere Transaktionen, nicht Wohlfahrt; Externalitaeten bleiben ohne gruene Korrektur unsichtbar.`

## Schritt 4 — ausprobieren

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: markt]

AUFGABE (analysieren, AFB II)：Analysieren Sie den erweiterten Wirtschaftskreislauf mit seinen fuenf Sektoren und erklaeren Sie in einem Satz die drei Berechnungsarten des BIP.

HILFE:
1. Schritt 1: Fuenf Sektoren auflisten: Haushalte, Unternehmen, Staat, Banken (Kapitalmarkt), Ausland.
2. Schritt 2: Zwei Stroeme mit Richtung zeichnen: Geldstrom im Uhrzeigersinn, Gueterstrom dagegen; Staat ueber Steuern/Transfers, Banken ueber Sparen/Investieren, Ausland ueber Ex/Im anbinden.
3. Schritt 3: BIP-Satz bauen: Entstehungsrechnung summiert Wertschoepfung, Verwendungsrechnung summiert Ausgaben, Verteilungsrechnung summiert Einkommen.

MUSTERLÖSUNG: Der erweiterte Kreislauf verbindet Haushalte und Unternehmen im Kerntausch Arbeit gegen Lohn sowie Konsumausgaben gegen Gueter. Der Staat schaltet sich ueber Steuern, Transfers und oeffentliche Gueter ein, die Banken sammeln Ersparnisse und finanzieren Investitionen, das Ausland ist ueber Exporte und Importe verbunden. Geldstroeme fliessen dabei entgegengesetzt zu Gueterstroemen. Das BIP laesst sich dreifach bestimmen: Die Entstehungsrechnung addiert die Wertschoepfung aller Produzenten, die Verwendungsrechnung addiert Konsum plus Investitionen plus Staatsausgaben plus Aussenbeitrag, die Verteilungsrechnung addiert Loehne plus Gewinne plus Nettoabgaben; alle drei messen denselben Kreislauf aus drei Blickwinkeln.

Klausur-Satz: `Entstehung, Verwendung und Verteilung berechnen dasselbe BIP aus Produktions-, Ausgaben- und Einkommenssicht.`

## Schritt 5 — ausprobieren

VERGLEICH辨别实验（双向辨析：增长眼 vs. 福利眼）：

VERGLEICH: Waehle erst das Verfahren — 【选程序】先判断题目要的是 (i) Kreislauf-Verfahren（画五部门 + 双向箭头 + 答 Geld/Gueterstroeme 方向）还是 (ii) BIP-Kritik-Verfahren（四点批判 + NWI/HDI 一句 + beurteilen 判断句）—— dann rechnen.

AUFGABE A：Skizzieren Sie den erweiterten Kreislauf und ordnen Sie Steuern, Ersparnis und Exporte je einem Sektor zu.
AUFGABE B：Beurteilen Sie die Aussage: Ein steigendes BIP bedeutet automatisch mehr Wohlfahrt.

HILFE: A nennt skizzieren plus Steuern/Ersparnis/Exporte -> Verfahren (i), Kreislauf zeichnen. B nennt beurteilen plus Wohlfahrt/automatisch -> Verfahren (ii), Kritik plus Urteil.【选程序：题干出现 Kreislauf / Sektor / Strom 选循环画图；出现 Kritik / Wohlfahrt / beurteilen / Nachhaltigkeit 选四点批判。】

ANTWORT: A erfordert Verfahren (i): Fuenf Sektoren mit Geldstrom im Uhrzeigersinn und Gueterstrom dagegen; Steuern zum Staat, Ersparnis zu Banken, Exporte zum Ausland. B erfordert Verfahren (ii): Nein, das BIP ignoriert Hausarbeit und Ehrenamt, zieht Umweltschaeden nicht ab, verdeckt Verteilung und zaehlt auch schaedliche Umsaetze als Plus; NWI und HDI korrigieren dies ueber Umwelt-, Verteilungs-, Bildungs- und Gesundheitsindikatoren. Urteil: Wachstum ist nicht gleich Wohlfahrt.

Klausur-Satz: `Wachstum des BIP ist ohne Verteilungs-, Umwelt- und Sozialindikatoren kein Beweis fuer mehr Wohlfahrt.`

## Schritt 6 — check

CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Nennen Sie die fuenf Sektoren und die zwei Stroeme mit Richtung. | ANTWORT: Haushalte, Unternehmen, Staat, Banken, Ausland; Geldstrom im Uhrzeigersinn, Gueterstrom entgegengesetzt.
FRAGE: Nennen Sie die drei BIP-Berechnungsarten in einem Satz. | ANTWORT: Entstehung summiert Wertschoepfung, Verwendung summiert Konsum plus Investitionen plus Staat plus Aussenbeitrag, Verteilung summiert Einkommen.
FRAGE: Nennen Sie vier Kritikpunkte am BIP plus Alternative. | ANTWORT: unbezahlte Arbeit fehlt, Umweltschaeden ohne Abzug, Verteilung blind, schaedliche Umsaetze als Plus; Korrektur durch NWI und HDI.

Klausur-Satz: `Das BIP misst Marktwerte eines Jahres, nicht Nachhaltigkeit oder Gerechtigkeit.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"货币流与实物流方向相同，都是从企业流向家庭"。
   中文纠偏：两者永远反向。企业给家庭发工资（货币顺时针），家庭给企业提供劳动（实物逆时针）；家庭付款买货（货币顺时针），企业交货（实物逆时针）。画同向必丢分。
   Korrektur-Satz: `Geldstroeme und Gueterstroeme verlaufen im Kreislauf stets in entgegengesetzter Richtung.`

2. 误解"BIP 上涨就等于人人过得更好，所以批判 BIP 就是反对增长"。
   中文纠偏：批判不是否定核算，而是限定解释力。BIP 能衡量市场产出规模，但看不见分配、环境与健康；NWI/HDI 是补充不是替代，判断句要写"增长必要但不充分"。
   Korrektur-Satz: `Die BIP-Kritik bestreitet nicht die Messung von Wachstum, sondern dessen Gleichsetzung mit Wohlfahrt.`

## Schritt 7 — szenario

ROLLE: Du bist EF-Schuelerin und schreibst einen Leserbrief an die Lokalzeitung.
SITUATION: Die Stadt feiert ein gestiegenes regionales BIP nach einem Sturmjahr mit viel Wiederaufbau, waehrend Parks zerstoert und viele ehrenamtliche Helfer erschoepft sind. Beurteilen Sie in einer zusammenhaengenden Darstellung (ca. 150 Woerter) die Lage mit dem erweiterten Kreislauf, der BIP-Kritik in vier Punkten und NWI/HDI.
RUBRIC (30 XP): Kreislauf mit Sektorbezug korrekt (5 XP) | Drei Berechnungsarten oder Formel C + I + G + (Ex - Im) genannt (5 XP) | Vier Kritikpunkte vollstaendig (10 XP) | NWI/HDI plus begruendetes Urteil Wachstum vs. Wohlfahrt (10 XP).

## Schritt 8 — entdecken

TAKEAWAY 1盒（核心总结）：

中文：本课 = 五部门双流 + 三核算一句 + 四批判一补充。五部门：家庭企业为主，国家银行国外为辅；双流：钱货永远反向；三核算：生产加总、支出加总（C + I + G + 净出口）、收入加总；四批判：家务不算、污染不扣、分配不见、坏事也算；一补充：NWI 扣环境账、HDI 加教育健康。判断句模板：BIP 涨 ≠ 福利涨，绿色核算让外部性显形。
Takeaway-Satz: `Fuenf Sektoren tauschen Geld gegen Gueter, das BIP misst nur Marktwerte; erst NWI und HDI machen Wohlfahrt und Nachhaltigkeit sichtbar.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Kreislauf-Skizze mit zwei Stromrichtungen (Schritt 4) oder die Trennung von Wachstum und Wohlfahrt (Schritt 5)?
2. 元认知计划：Beim naechsten Mal zeichne ich zuerst die zwei Gegenpfeile und pruefe danach jeden BIP-Anstieg mit den vier Kritikpunkten.
