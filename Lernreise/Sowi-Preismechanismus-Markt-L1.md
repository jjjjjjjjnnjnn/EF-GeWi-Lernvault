---
fach: SoWi
thema: "Preismechanismus und Marktformen"
level: 1
ziel: Klausur
xp: 100
operatoren: [darstellen, analysieren, beurteilen]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, SoWi, Marktwirtschaft]
version: Lesson-v3
---

# Lernreise: Preismechanismus und Marktformen (L1, Ziel Klausur)

<!-- Lesson v3 9步制架构：Schritt 1至8固定结构；Fehlvorstellung 夹在 Schritt 6 与 7 之间（Parser 自动跳过，不占步数）；支持内嵌 [Werkzeug: <id>] 交互教具；Gating: check/szenario 未过 = Weiter 置灰；XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能说清价格机制的三件套——供求、均衡价格、自动出清，并指出价格在自由市场上扮演"信号+配置"双重角色。
2. 中文：能区分两套程序——"市场自己怎么调节"用供求程序，"国家限价造成什么后果"用干预程序，先选程序再动笔。
3. 中文：能按 AFB II 写一段 analysieren 小答（含 Fachbegriff + Wirkung + 后果判断），并按 AFB III 给出一个 kriteriengeleitetes Urteil。

Klausur-Satz: `Der Preismechanismus koordiniert Angebot und Nachfrage über den Gleichgewichtspreis und sorgt im Modell des vollkommenen Marktes für eine effiziente Allokation der Güter.`

## Schritt 2 — entdecken

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 价格机制 — Preismechanismus：供求通过价格信号自动达成一致，无需中央指令。
- 均衡价格 — Gleichgewichtspreis：使 Angebotsmenge 与 Nachfragemenge 恰好相等的那个价格，即两曲线交点。
- 需求过剩（供不应求） — Nachfrageüberhang：价格低于均衡价时，想买的多于想卖的。
- 供给过剩（供大于求） — Angebotsüberhang：价格高于均衡价时，想卖的多于想买的。
- 价格弹性 — Preiselastizität：需求量对价格变动的敏感程度，弹性小者被限价伤得更重。

Klausur-Satz: `Im Gleichgewicht entspricht die angebotene Menge der nachgefragten Menge, sodass weder ein Nachfrage- noch ein Angebotsüberhang besteht.`

## Schritt 3 — entdecken

ENTDECKEN（1概念 + 1文字图解）：

中文：价格机制不是谁在发号施令，而是千万个买卖决定"碰"出来的结果。供给曲线向右上（价高愿多卖），需求曲线向右下（价高愿少买）；两条线一交叉，就落在一个双方都愿意成交的价格上——这就是均衡价格。价格一旦偏离，市场自己会把它推回来：价格偏高，仓库堆积（Angebotsüberhang），卖家被迫降价；价格偏低，货架空空（Nachfrageüberhang），买家抬价抢货。国家若用 Höchstpreis / Mindestpreis 把价格钉死在均衡点之外，这个自动回推机制就被阻断，短缺或过剩随之出现。这就是 EF 考卷里"价格干预负效应"题的全部内核。

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
        p ^
          |        S (Angebot)
          |       /
  p_min > | - - -/- - - - - - - -   <-- Mindestpreis (ueber P_G)
          |     / :  \        .
          |    /  :   \  Angebotsueberhang
          |   /   :    \  (Ueberschuss)
          |  /    :     \
   P_G -> | *G ----------------  D (Nachfrage)
          |/      :        \
          +---------------------------> q
                q_D   q_G   q_S
     q_D < q_G < q_S  =>  Angebotsueberhang
```

Klausur-Satz: `Da die Nachfragekurve mit steigendem Preis fällt und die Angebotskurve steigt, stellt sich am Schnittpunkt beider Kurven der markträumende Gleichgewichtspreis ein.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Dass staatliche Höchstpreise nicht funktionieren, ist kein modernes Problem. Schon der römische Kaiser Diokletian versuchte gegen Ende des dritten Jahrhunderts, für Waren im ganzen Reich verbindliche Höchstpreise festzusetzen. Das Ergebnis war das Gegenteil des Erhofften: Viele Händler verschwanden vom Markt, es kam zu Warenknappheit, Hamsterkäufen und Schwarzhandel. Der Preis ließ sich per Gesetz verbieten — die Knappheit nicht.

**中文解读**: 这是个两千年前的经典案例：罗马皇帝狄奥克勒提安试图用法令给全帝国的商品规定最高价，结果商人退出市场、货物短缺、黑市兴起。它印证了本课的核心——价格可以被命令，但短缺不会因命令而消失，这正是"限价在均衡点之下必然造成需求过剩"的古老版本。

**Bezug zum Konzept**: `Das historische Beispiel zeigt, dass ein Höchstpreis unter dem Gleichgewichtspreis keine Knappheit beseitigt, sondern sie in Warteschlangen und Schwarzmärkte verlagert.`

## Schritt 4 — ausprobieren

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: balance]

AUFGABE (berechnen, AFB II)：Auf einem Markt gelten die Nachfragefunktion p_N(q) = 40 - 2q und die Angebotsfunktion p_A(q) = 10 + q (p in Euro, q in Mengeneinheiten). Bestimmen Sie den Gleichgewichtspreis und die Gleichgewichtsmenge. Prüfen Sie anschließend, welche Mengen angeboten und nachgefragt werden, wenn der Staat einen Mindestpreis von 25 Euro festsetzt.

HILFE:
1. Schritt 1: Im Gleichgewicht gilt p_N(q) = p_A(q). Setze 40 - 2q = 10 + q.
2. Schritt 2: Löse nach q auf und setze q in eine der beiden Funktionen ein, um p zu erhalten.
3. Schritt 3: Setze p = 25 in beide Funktionen ein und vergleiche q_A und q_N.

MUSTERLÖSUNG: Aus 40 - 2q = 10 + q folgt 30 = 3q, also q_G = 10. Eingesetzt in p_A ergibt sich p_G = 10 + 10 = 20. Der Gleichgewichtspreis beträgt somit 20 Euro bei einer Gleichgewichtsmenge von 10 Einheiten. Bei einem Mindestpreis von 25 Euro liegt der Preis über dem Gleichgewicht: Die Anbieter sind nun zu q_A = 25 - 10 = 15 Einheiten bereit, die Nachfrager verlangen jedoch nur q_N = (40 - 25) / 2 = 7,5 Einheiten. Es entsteht ein Angebotsüberhang von 7,5 Einheiten; der Mindestpreis hat den Markt nicht geräumt, sondern die Räumungsfunktion des Preises außer Kraft gesetzt.

Klausur-Satz: `Ein über dem Gleichgewichtspreis festgesetzter Mindestpreis führt zu einem Angebotsüberhang, weil er die Anbieter belohnt, aber die Nachfrager abschreckt.`

## Schritt 5 — ausprobieren

VERGLEICH辨别实验（双向辨析：市场眼 vs. 干预眼）：

VERGLEICH: Wähle erst das Verfahren — 【选程序】先判断题目问的是 (i) Markt-Verfahren（市场如何自己调节：供求变动、均衡价格、Allokation）还是 (ii) Interventions-Verfahren（国家限价造成什么后果：Höchst-/Mindestpreis、Überhang、Fehlallokation）—— dann lösen.

AUFGABE A：Ein Sachtext beschreibt, dass eine Missernte die Weizenernte halbiert und der Weizenpreis daraufhin deutlich steigt. Welches Verfahren ist zu wählen, und wie lässt sich der Vorgang erklären?

AUFGABE B：Ein Sachtext beschreibt, dass die Regierung eine Mietpreisbremse einführt, woraufhin Wohnungen knapp werden und Schattenmärkte entstehen. Welches Verfahren ist zu wählen, und wie lässt sich der Vorgang erklären?

HILFE: A fragt nach dem Selbstausgleich über Preise ohne staatliche Preisgrenze → Verfahren (i). B fragt nach einer staatlich fixierten Preisgrenze und ihren Folgen → Verfahren (ii).【选程序：无价格上限/下限 = 市场程序；有价格上限/下限 = 干预程序。】

ANTWORT: A erfordert Verfahren (i): Die Missernte verschiebt die Angebotskurve nach links; da die Nachfrage unverändert bleibt, steigt der Preis bis zum neuen Gleichgewicht und rationiert so die knappe Ware über die Zahlungsbereitschaft — der Preis erfüllt seine Signalfunktion. B erfordert Verfahren (ii): Die Mietpreisbremse wirkt als Höchstpreis unterhalb des Gleichgewichts; bei niedrigerem Preis steigt die Nachfrage, während die Vermieter weniger Wohnraum anbieten, sodass ein Nachfrageüberhang entsteht, der sich in Wartelisten, Fehlallokation und Schattenmärkten äußert.

Klausur-Satz: `Wird ein Höchstpreis unterhalb des Gleichgewichtspreises festgesetzt, entsteht ein Nachfrageüberhang, weil die Nachfrage steigt, das Angebot jedoch sinkt.`

## Schritt 6 — check

CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Wie lautet die Bedingung für das Marktgleichgewicht? | ANTWORT: Im Gleichgewicht gilt p_N(q) = p_A(q), das heißt angebotene und nachgefragte Menge stimmen überein.
FRAGE: Welche vier Funktionen erfüllt der Preis im Modell des vollkommenen Marktes? | ANTWORT: Signal-, Allokations-, Ausgleichs- (Räumungs-) und Selektionsfunktion.
FRAGE: Warum entfaltet ein Mindestpreis nur dann Wirkung, wenn er über dem Gleichgewichtspreis liegt? | ANTWORT: Liegt er darunter, ist er nicht bindend; erst oberhalb des Gleichgewichts verhindert er das Absinken des Preises und erzeugt einen Angebotsüberhang.

Klausur-Satz: `Ein staatlicher Mindestpreis entfaltet nur dann ökonomische Wirkung, wenn er über dem Gleichgewichtspreis fixiert wird.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"价格干预只是换个价格数字，市场照样出清"。
   中文纠偏：完全不是。价格一旦被钉在均衡点之外，自动回推机制就断了。限价在均衡点之上必然造成过剩（Angebotsüberhang），在均衡点之下必然造成短缺（Nachfrageüberhang）；被压制的价格不会消失，只会以排队、关系、黑市的形式回来。
   Korrektur-Satz: `Ein staatlich fixierter Preis setzt die Räumungsfunktion des Marktes außer Kraft, sodass sich die Knappheit nicht auflöst, sondern nur ihre Erscheinungsform ändert.`

2. 误解"沿着需求曲线移动"和"整条需求曲线平移"是一回事。
   中文纠偏：完全不同。只因该商品自身价格变化而改变购买量，是"沿曲线移动"（Bewegung auf der Kurve）；因收入、偏好、替代品价格等外部因素而改变，才是"整条曲线平移"（Verschiebung der Kurve）。分析题里凡是把平移写成移动，因果链就全错了。
   Korrektur-Satz: `Eine Preisänderung des betrachteten Gutes bewirkt eine Bewegung auf der Nachfragekurve, während veränderte Präferenzen oder Einkommen die gesamte Nachfragekurve verschieben.`

## Schritt 7 — szenario

ROLLE: Du bist Referent in einer Verbraucherzentrale und sollst auf einer Podiumsdiskussion die geplante Mietpreisbremse der Stadt fachlich bewerten.
SITUATION: Die Stadt will per Satzung die Miete auf höchstens 8 Euro pro Quadratmeter festsetzen; der aktuelle Marktmietpreis liegt bei 11 Euro. Ein Teil des Publikums erwartet dadurch billigeren Wohnraum, ein anderer Teil warnt vor Wohnungsmangel. Beurteile die Maßnahme in einer zusammenhängenden Stellungnahme (ca. 150 Wörter) unter Rückgriff auf Preismechanismus und Marktformen.
RUBRIC (30 XP): Benennung der Maßnahme als Höchstpreis unterhalb des Gleichgewichts (5 XP) | Analyse der Mengenwirkung — Nachfrage steigt, Angebot sinkt, Nachfrageüberhang (10 XP) | Darlegung der Folgeeffekte — Fehlallokation, Schattenmarkt, sinkende Investitionen in Neubauten (10 XP) | Kriteriengeleitetes Urteil mit Abwägung von Effizienz und sozialer Zielsetzung (5 XP).

## Schritt 8 — reflexion: Takeaway & Reflexion

TAKEAWAY 1盒（核心总结）：

中文：自由市场上，价格是唯一的指挥棒——高了就过剩，低了就短缺，它自己会走回均衡点。做题第一步先"选程序"：题目问"市场怎么调节"，走供求程序（曲线怎么动、新均衡在哪）；题目问"国家限价怎么样"，走干预程序（限价在均衡之上还是之下、造出哪种过剩、后果是什么）。记住一句话：价格可以被命令，但短缺不会被命令消失。
Takeaway-Satz: `Der Preis lenkt die Allokation über Signale; wer ihn administrativ fixiert, hebt die Räumungsfunktion auf und verwandelt Knappheit in Überhang statt sie zu beseitigen.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — das rechnerische Bestimmen des Gleichgewichts (Schritt 4) oder die Wahl des richtigen Verfahrens im Vergleich (Schritt 5)?
2. 元认知计划：Beim nächsten Mal prüfe ich zuerst, ob der Text eine Preisgrenze (Höchst-/Mindestpreis) nennt oder nicht, und wähle danach das Verfahren.
