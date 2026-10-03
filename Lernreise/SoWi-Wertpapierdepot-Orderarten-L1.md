---
fach: SoWi
thema: "Wertpapierdepot und Orderarten"
level: 1
ziel: Klausur
xp: 100
operatoren: [darstellen, analysieren, beurteilen]
klausurrelevant: true
datum: 2026-09-28
tags: [EF, SoWi, Geldanlage, Wirtschaftspolitik]
version: Lesson-v3
---

# Lernreise: Wertpapierdepot und Orderarten (L1, Ziel Klausur)

> Kampagne *Virtuelle Stadt-Tycoon — Von der Apfelmarkt-Fehde zum modernen Sozialstaat*: Akt I-II — Vermögensaufbau und Finanzmärkte — Episode 28, Cast: Vermögensberaterin Dr. Elena Weber. Werkzeug dieser Episode: [Werkzeug: orderbuch].

<!-- Lesson v3 9步制架构：Schritt 1至8固定结构；Fehlvorstellung 夹在 Schritt 6 与 7 之间（Parser 自动跳过，不占步数）；支持内嵌 [Werkzeug: orderbuch] 交互教具；Gating: check/szenario 未过 = Weiter 置灰；XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken: Alarm in Tycoon City: Die schleichende Geldentwertung

> EPISODE 28｜Akt I-II — Vermögensaufbau und Finanzmärkte｜召集人 Vermögensberaterin Dr. Elena Weber：Die schleichende Geldentwertung。

HOOK 储蓄危机（先读剧情，再进 ZIELE）：【本集战役 EP28｜Akt I-II — Vermögensaufbau und Finanzmärkte｜虚拟城邦 Tycoon City 告急】市民 Max 带着存折急匆匆跑进咨询室：他在活期账户存了 10.000 欧元，银行仅给 0,5 % 利息，而物价通胀率高达 3,0 %。账面上看似每年多了 50 欧元，但在超市里的实际购买力却年年缩水（通胀剪刀差）。如何从制度层面区分普通银行活期账户与证券存托账户？股票交易中的订单簿与止损单如何防范暴跌风险？通关线索：TARGET: Durchlaufe alle 5 Lektionen der interaktiven Vorlesungsstrecke [Werkzeug: orderbuch], analysiere Realzins, Sondervermoegen, GWG-Legitimation, Xetra-Orderbuch und meistere das Magische Dreieck der Geldanlage. 先读 ZIELE，再啃术语，把传导机制画成你的作战地图。DE-Briefing: Episode 28 — Vermögensberaterin Dr. Elena Weber meldet Kaufkraftkrise privater Haushalte. Rette Max' Ersparnisse mit Fachanalyse, Vorlesungsstrecke und Klausur-Urteil zum Thema Wertpapierdepot und Orderarten.

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能用欧文·费雪方程式计算实际利率（Realzins ≈ Nominalzins - Inflation），并解释货币幻觉与通胀剪刀差成因。
2. 中文：能说清银行破产时活期存款（普通债权，最高10万欧保障）与存托证券（§ 92 KAGB 特种财产 Sondervermögen，100% 破产隔离）的法律本质区别。
3. 中文：能对比限价单（Limit）与市价单（Billigst/Bestens）的撮合机制与滑点风险，并运用“投资不可能三角”三维度评价资产配置方案。

Klausur-Satz: `Ein Wertpapierdepot verwahrt Aktien als Sondervermögen nach § 92 KAGB insolvenzsicher, während der Realzins als Differenz von Nominalzins und Inflation die reale Kaufkraftentwicklung bestimmt.`

## Schritt 2 — entdecken: Werkzeugkoffer von Vermögensberaterin Dr. Elena Weber: 5 Begriffe scharf stellen

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- **Realzins**（实际利率）：名义利率扣除通胀率后的真实收益；通胀高于利息时形成负实际利率。 Der Realzins beschreibt die reale Kaufkraftveraenderung einer Geldanlage nach Abzug der Inflationsrate (Fisher-Gleichung: r ≈ i - π). Bei 0,5 % Nominalzins und 3,0 % Inflation betraegt der Realzins -2,5 %. Mechanismus: Hohe Inflation entwertet Geldguthaben real, auch wenn der Kontostand nominal ansteigt. Klausur-Tipp: Schreibe immer Nominalzins minus Inflationsrate.
- **Sondervermögen (schreibe Sondervermoegen)**（独立特种资产）：存托账户资产归投资者所有，银行仅为代管人，破产时享有法定隔离。 Das Sondervermoegen nach § 92 KAGB trennt das Kundenwertpapiervermoegen strikt vom Eigenkapital der Depotbank. Im Insolvenzfall faellt es nicht in die Insolvenzmasse. Mechanismus: Glaeubiger der Bank haben keinen Zugriff; Wertpapiere bleiben zu 100 % Eigentum des Anlegers. Klausur-Tipp: Betone den Unterschied zur Einlagensicherung (100k Limit).
- **Freistellungsauftrag**（储蓄者免税额申报）：向银行申报免税额，单身每年 1.000 欧内资本利得直接免征利得税。 Mit dem Freistellungsauftrag nach § 20 EStG weist der Anleger die Bank an, Kapitalertraege bis zum Sparer-Pauschbetrag (1.000 € Alleinstehende / 2.000 € Verheiratete) ohne Abzug der Abgeltungsteuer auszuzahlen. Mechanismus: Ohne Auftrag fuehrt die Bank automatisch 25 % Abgeltungsteuer plus 5,5 % Soli ab. Klausur-Tipp: 1.000 € Freibetrag ist steuerliche Standardpflicht.
- **Orderbuch & Slippage**（订单簿与滑点）：买卖盘实时深度列表；市价单在流动性匮乏时成交价与预期价的偏差。 Das elektronische Orderbuch (z. B. Xetra) stellt Kauf- (Bid) und Verkaufsauftraege (Ask) nach Preis-Zeit-Prioritaet gegenueber. Slippage bezeichnet die Abweichung zwischen gewuenschtem Ausfuehrungspreis und tatsaechlichem Abrechnungskurs bei unlimitierten Market-Orders. Mechanismus: Mangelnde Liquiditaet fuellt Orders zu unguenstigen Tiefst- oder Hoechstkursen. Klausur-Tipp: Nenne Limit-Order als Schutz vor Slippage.
- **Magisches Dreieck**（投资不可能三角）：收益、安全、流动性三者不可兼得，任何理财产品都必须进行妥协。 Das Magische Dreieck der Vermoegensanlage umfasst Rentabilitaet, Sicherheit und Liquiditaet. Diese Ziele stehen in dauernder Konkurrenz zueinander. Mechanismus: Hohe Rendite erfordert Risikobereitschaft; taegliche Verfuegbarkeit kostet Rendite. Kein Produkt maximiert alle drei Pole. Klausur-Tipp: Begruende Diversifikation ueber Zielkonflikte.

Klausur-Satz: `Das Sondervermögen schützt Wertpapiere vor Bankinsolvenzen, während das Magische Dreieck die unüberwindbaren Zielkonflikte zwischen Rentabilität, Sicherheit und Liquidität verdeutlicht.`

## Schritt 3 — entdecken: Uhrwerk des Finanzsystems: Trennung von Geld und Wertpapier

ENTDECKEN（1概念 + 1文字图解）：

中文：银行账户不是保险箱。当你把钱存在活期账户（Girokonto）时，你在法律上是把钱借给了银行（普通无担保债权），若银行破产，仅能依赖法定存款保障基金（§ 4 EinSiG，最高 10 万欧元兜底）。而开设证券存托账户（Wertpapierdepot）后，你购买的股票、ETF 和债券依法属于“独立特种财产（Sondervermögen）”，银行只是记名代管人。两者之间通过结算走廊（Verrechnungskonto）单向连通：买股票从清算账户扣钱，卖股票与分红回款至清算账户，证券永远留在存托保险箱中。

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
+-----------------------------------+     +-----------------------------------+
|     GIRO- / VERRECHNUNGSKONTO     |     |         WERTPAPIERDEPOT           |
| (Buchgeld / Einlage bei der Bank) |     |  (Verwahrstelle / Treuhaender)    |
|                                   |     |                                   |
| - Gesetzl. Einlagensicherung      |     | - SONDERVERMOEGEN (§ 92 KAGB)     |
|   bis 100.000 € (§ 4 EinSiG)      |     | - 100 % Insolvenzschutz           |
| - Reale Negativzinsen bei         |     | - Aktien, Welt-ETFs, Anleihen     |
|   hoher Inflation                 |     | - Kein direkter Bargeldverkehr    |
+-----------------+-----------------+     +-----------------+-----------------+
                  |                                         ^
                  | Kaufauftrag: Barbetrag transferieren    |
                  +-----------------------------------------+
                  |                                         |
                  | Verkaufserloes / Dividenden gutschreiben|
                  <-----------------------------------------+
```

Klausur-Satz: `Wertpapiere im Depot gelten als Sondervermögen und bleiben bei einer Bankinsolvenz uneingeschränkt im Eigentum des Kunden, während Giroguthaben lediglich als Gläubigerforderung geschützt ist.`

## Schritt 4 — ausprobieren: Interaktive Praxis: Xetra-Orderbuch & Auftragsarten im Praxistest

[Werkzeug: orderbuch]

TARGET: Teste im interaktiven Xetra-Orderbuch die Ausführung von Billigst-/Bestens-Orders, Limit-Orders und Stop-Loss-Orders. Beobachte die Auswirkung des Spreads und die Gefahren von Slippage bei mangelnder Liquidität.

AUFGABE (analysieren & beurteilen, AFB II/III)：Ein Privatanleger verfuegt ueber 10.000 € Ersparnisse. Die Inflation betraegt 3,0 % p.a., der Zins auf dem Tagesgeldkonto 0,5 % p.a.
a) Berechnen Sie den realen Kaufkraftverlust nach 5 Jahren Naeherungsweise (Fisher-Gleichung) und erlaeutern Sie, warum Tagesgeld die Kriterien des Magischen Dreiecks nur unvollstaendig erfuellt.
b) Beurteilen Sie die Empfehlung, das gesamte Kapital sofort per unlimitierter Market-Order („Billigst“) in eine einzelne spekulative Aktie zu investieren.

HILFE:
1. Schritt 1: Realzins = 0,5 % - 3,0 % = -2,5 % pro Jahr. Nach 5 Jahren entspricht das ca. 1.100 € Kaufkraftverlust.
2. Schritt 2: Tagesgeld bietet hohe Sicherheit (Einlagensicherung) und hohe Liquiditaet (taeglich verfuegbar), opfert aber die Rentabilitaet.
3. Schritt 3: Bei einer Einzelaktie droht Klumpenrisiko (keine Diversifikation) und Slippage bei Market-Orders.

MUSTERLÖSUNG:
a) Gemaess der Fisher-Gleichung betraegt der Realzins r ≈ i - π = 0,5 % - 3,0 % = -2,5 % p.a. Bei Zinseszinswirkung sinkt die reale Kaufkraft von 10.000 € nach 5 Jahren auf ca. 8.810 €, was einem realen Verlust von knapp 1.190 € entspricht. Im Magischen Dreieck punktet das Tagesgeld bei Sicherheit (gesetzliche Einlagensicherung bis 100.000 € nach § 4 EinSiG) und Liquiditaet (taeglich verfuegbar), versagt jedoch bei der Rentabilitaet (reale Negativrendite).
b) Die Empfehlung ist aus zweierlei Gruenden fahrlaessig: Erstens fuehrt eine unlimitierte Market-Order („Billigst“) bei illiquiden Titeln zu unkontrollierten Ausfuehrungskursen (Slippage-Gefahr); geboten waere eine Limit-Order. Zweitens erzeugt die Konzentration auf eine Einzelaktie ein extremes unsystematisches Klumpenrisiko (Totalverlustgefahr). Ein breit gestreuter Welt-ETF (z. B. MSCI World mit 1.500+ Titeln) wuerde das Einzelrisiko diversifizieren und das Magische Dreieck rational ausbalancieren.

Klausur-Satz: `Market-Orders bergen erhebliche Slippage-Risiken, während eine breite Diversifikation im Depot das unsystematische Einzelwertrisiko minimiert.`

## Schritt 5 — ausprobieren: Duell der Wege: Weg A gegen Weg B

VERGLEICH辨别实验（双向辨析：流动性优先 vs. 资产配置优先）：

VERGLEICH: Wähle erst das Verfahren — 【选程序】先判断题目问的是 (i) Liquiditäts-Verfahren（无风险即时取现但承担通胀负收益：Giro/Tagesgeld、Einlagensicherung）还是 (ii) Allokations-Verfahren（承担短期波动获取长期实际正回报：Depot、Sondervermögen、Diversifikation）—— dann lösen.

DUELL Weg A (Giro-/Tagesgeldkonto) gegen Weg B (Wertpapierdepot mit Welt-ETF): Weg A waehlt maximale Liquiditaet und nominale Sicherheit: Das Geld ist taeglich verfuegbar und durch die Einlagensicherung geschuetzt, erleidet aber bei Inflation eine garantierte reale Geldentwertung. Weg B waehlt langfristigen Vermoegensaufbau: Durch weltweite Streuung in Produktivkapital werden Marktchancen genutzt und das Sondervermoegen schuetzt vor Bankenpleiten, erfordert jedoch das Aushalten kurzfristiger Kursschwankungen.

对决 Weg A（活期/储蓄账户）vs Weg B（证券存托账户与全球指数）：Weg A重在即时取现与账面保本，但代价是实际财富被通胀蚕食；Weg B重在跑赢通胀与长期复利，受破产隔离法保护，但要求忍受短期股市波动。

AUFGABE A：Ein Sparer benoetigt in 3 Monaten Geld fuer den Kauf eines Gebrauchtwagens. Welches Verfahren ist zu waehlen?

AUFGABE B：Eine 17-jaehrige Auszubildende moechte fuer ihre Altersvorsorge in 40 Jahren monatlich 50 Euro sparen. Welches Verfahren ist zu waehlen?

HILFE: A benoetigt kurzfristige Liquiditaet und absolute Kurssicherheit → Verfahren (i). B hat einen 40-jaehrigen Anlagehorizont und muss die Inflation schlagen → Verfahren (ii).

ANTWORT: Fuer A ist Verfahren (i) (Tagesgeld) optimal: Bei einem Horizont von 3 Monaten duerfen keine Kursrisiken eingegangen werden; die Inflation ist kurzfristig vernachlaessigbar. Fuer B ist Verfahren (ii) (Wertpapierdepot mit Sparplan auf Welt-ETF) zwingend: Ueber 40 Jahre wuerde die Inflation Sparguthaben zerstoeren; Kursschwankungen gleichen sich langfristig aus, und der Zinseszinseffekt entfaltet maximale Wirkung.

Klausur-Satz: `Kurzfristige Mittel erfordern Liquidität und Sicherheit auf Tagesgeldkonten, während langfristige Sparziele über diversifizierte Depots realisiert werden müssen.`

## Schritt 6 — check: Selbsttest zu Wertpapierdepot und Orderarten

CHECK检索默写（自测 3 题，与答案配对）：

- FRAGE: Warum sind Fonds- und ETF-Anteile im Depot bei einer Bankpleite nicht verloren? | ANTWORT: Weil sie rechtlich als Sondervermögen nach § 92 KAGB gelten, nicht in die Insolvenzmasse fallen und zu 100 % Eigentum des Kunden bleiben.
- FRAGE: Welcher wesentliche Nachteil droht einem Verkäufer bei der Orderart „Bestens“? | ANTWORT: Bei mangelnder Marktliquidität oder plötzlichen Kurssprüngen droht Slippage, sodass die Papiere weit unter dem fairen Wert verkauft werden.
- FRAGE: Welche drei Ziele konkurrieren im Magischen Dreieck der Geldanlage? | ANTWORT: Rentabilität (Rendite), Sicherheit (Kapitalerhalt) und Liquidität (Verfügbarkeit).

Klausur-Satz: `Das Sondervermögen schützt Wertpapiere gesetzlich vor Gläubigerzugriffen bei Bankenpleiten.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解“把钱存银行和买基金一样安全，都是国家保 10 万欧”。
   中文纠偏：性质截然相反。银行存款是银行的负债，国家法定保障限额仅 100.000 欧元（§ 4 EinSiG）；而存托账户里的证券是投资者个人的独立产权（Sondervermögen），无论 10 万还是 1000 万欧，即便银行破产，清算人也无权扣留任何一张股票。
   Korrektur-Satz: `Einlagensicherung schützt Bankguthaben bis 100.000 Euro, während Wertpapiere als Sondervermögen in unbegrenzter Höhe insolvenzfest im Eigentum des Kunden bleiben.`

2. 误解“止损单（Stop-Loss）能保证按设定的止损价格一分不差成交”。
   中文纠偏：不能。止损单一旦触发，是在毫秒内自动转为无价格保护的市价卖单（Market-Order / Bestens）。如果市场遭遇断崖式跳空低开（Gap-Down）或暴跌，实际成交价往往远低于你设定的止损触发线。
   Korrektur-Satz: `Eine Stop-Loss-Order wird nach Unterschreiten der Schwelle zur unlimitierten Market-Order und garantiert daher keine Ausführung zum exakten Stop-Kurs.`

## Schritt 7 — szenario: Klausurtransfer: Verbraucherschutz und Anlagestrategie

ROLLE: Du bist Wirtschaftsberater bei der Verbraucherzentrale NRW und verfasst eine schriftliche Stellungnahme fuer eine junge Familie.
SITUATION: Die Familie hat 20.000 Euro geerbt. Die Hausbank raet, alles auf dem Girokonto zu belassen, da Aktien „reine Zockerei“ seien. Ein Neobroker-Werbespot raet, alles ueber eine Market-Order in Tech-Aktien zu stecken. Verfasse eine fundierte Empfehlung (ca. 150 Woerter), die die gesetzlichen Schutzmechanismen (Einlagensicherung vs. Sondervermoegen), das Realzinsrisiko und das Magische Dreieck differenziert abwaegt.
RUBRIC (30 XP): Analyse der Realzinsfalle auf dem Girokonto (5 XP) | Erklaerung von Einlagensicherung vs. Sondervermoegen (§ 92 KAGB) (10 XP) | Kritik an der unlimitierten Einzelaktien-Spekulation (Slippage, Klumpenrisiko) (5 XP) | Kriteriengeleitete Portfolio-Empfehlung (Notgroschen auf Tagesgeld + breit gestreuter Welt-ETF) im Magischen Dreieck (10 XP).

Klausur-Satz: `Eine rationale Anlagestrategie teilt Vermögen in liquide Sicherheitsbausteine (Tagesgeld) und diversifizierte Sondervermögen (Welt-ETFs) auf, um das Magische Dreieck auszubalancieren.`

## Schritt 8 — reflexion: Takeaway & Reflexion: Was der Krisenstab lernt

TAKEAWAY 1盒（核心总结）：

中文：银行不是保险柜，存折也不是免死金牌。面对通胀，守着活期账户就是眼睁睁看着购买力被蚕食（负实际利率）。解决之道是“双轨制”配置：把 3-6 个月的紧急生活费放在享有 10 万欧法定保障的活期/通知存款上（保流动性与安全）；将长期资金通过证券存托账户配置到受 § 92 KAGB 法律破产隔离保护的宽基全球指数 ETF 中（用分散化打消个股风险，用时间复利打败通胀）。在交易所下单时，切记“用限价单（Limit）防滑点，用止损单（Stop-Loss）控风险”。

Takeaway-Satz: `Ein Wertpapierdepot schützt Produktivkapital als Sondervermögen vor Bankenpleiten und ermöglicht durch weltweite ETF-Diversifikation die Überwindung der Realzinsfalle.`

REFLEXION 2问：
1. 过程自省：Welche Erkenntnis war ueberraschender — dass Bankguthaben bei Pleiten in die Insolvenzmasse faellt oder dass Market-Orders kein Preislimit besitzen?
2. 元认知计划：Bei kuenftigen Anlageentscheidungen pruefe ich stets zuerst die Zieldimensionen im Magischen Dreieck und nutze grundsaetzlich Limit-Orders.

Klausur-Satz: `Produktivkapital im Depot schützt als Sondervermögen vor Inflation und Bankenrisiken, wenn es über das Magische Dreieck rational diversifiziert wird.`
