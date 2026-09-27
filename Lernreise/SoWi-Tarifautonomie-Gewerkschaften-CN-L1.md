---
fach: SoWi
thema: "Tarifautonomie und Gewerkschaften im Arbeitskampf"
level: 1
ziel: Klausur
xp: 100
operatoren: [darstellen, analysieren, beurteilen]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, SoWi, CN]
version: Lesson-v3
---

# Lernreise: Tarifautonomie und Gewerkschaften im Arbeitskampf (L1, Ziel Klausur)

<!-- Lesson v3 9步制架构：Schritt 1至8固定结构；Fehlvorstellung 夹在 Schritt 6 与 7 之间（Parser 自动跳过，不占步数）；支持内嵌 [Werkzeug: <id>] 交互教具；Gating: check/szenario 未过 = Weiter 置灰；XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken: Ziele & Phänomen-Einstieg

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能说出劳资自治含义——工会与雇主协会不经国家直接订立 Tarifvertrag。
2. 中文：能列出罢工与闭厂的法律条件——最后手段、比例原则、仅 Tarif 事项。
3. 中文：能评价一次罢工的合法性与适当性（选程序：合法审查 vs 效果评价）。

Voraussetzung（窄切口）：只做集体劳动法，不展开个体 Kündigungsschutz；已会 Sozialpartnerschaft 概念。


Hook中文生活切入:

想象全班和食堂谈判餐价:一个人去谈没人理,全班推代表去谈,食堂就得坐下来;谈崩了就集体罢餐,食堂损失更大,只好让步。劳资谈判同理:单个工人议价能力为零,工会把分散的议价权聚成拳头,罢工作为最后筹码,谈出的合同管全行业。这场谈判桌两边的筹码对比,正是本节要建模的议价机制。

Phaenomen-Satz (DE): Einer bettelt, alle verhandeln, das macht den Unterschied am Tisch.

中文机制铺垫:结社自由与劳资自治是宪法地基,工会与雇主协会对等谈判签集体合同,和平义务期内不得罢工,调解失败才可升级;答题链是议价失衡到集体行动再到合同覆盖,罢工合法性看四要件。

Mechanismus-Satz (DE): Autonomie verhandelt, Streik erzwingt, der Tarif bindet die Branche.

Klausur-Satz: `Tarifautonomie heisst: Loehne werden frei verhandelt, Arbeitskampf ist dabei das ultima-ratio-Mittel.`

## Schritt 2 — entdecken: Fachbegriffe & Pre-Training

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 劳资自治 — Tarifautonomie：国家不干预工资谈判的基本权（Art. 9 Abs. 3 GG）。
- 工会 — Gewerkschaft：雇员的结社组织，如 ver.di、 IG Metall。
- 工资协议 — Tarifvertrag：对成员有直接约束力的集体合同。
- 罢工 — Streik：集体停工以施压，需工会组织与 Urabstimmung。
- 比例原则 — Verhaeltnismaessigkeit：手段须适度，调解优先、范围限 Tarif 事项。

Klausur-Satz: `Streik und Aussperrung sind nur als verhaeltnismaessige Kampfmittel um Tarifziele zulaessig.`

## Schritt 3 — entdecken: Kernkonzept & Wirkungsmodell

ENTDECKEN（1概念 + 1文字图解，中文在上、德语在下）：

Hook中文生活切入：

中文：想象班级春游AA：没人想多掏，推个人跟商家谈折扣，谈崩了就集体说不去。这就是工资谈判的班级版。

Phaenomen-Satz (DE): Frei verhandeln, zur Not gemeinsam stehenbleiben.

Spiel-Aufgabe沙盒操作指引：

中文：打开沙盒，拖动滑块调涨薪诉求与企业报价（关键词：Tarifautonomie, Schlichtung, Warnstreik, ultima ratio），看谈判、调解、罢工三步如何依次解锁。

Beobachtungs-Satz (DE): Erst verhandeln, dann schlichten, erst danach streiken.

Aha-Moment因果链：

中文因果链：工资由劳资自治谈判而非国家定价，罢工与闭厂是最后手段且须合比例、只为关税目标；先走完谈判与调解，罢工才合法，合法性看规则、明智看代价。

Gesetz-Satz (DE): Ohne Tarifziel und ohne ultima ratio ist kein Streik rechtmaessig.

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
Verhandlung -> Schlichtung -> Warnstreik -> Streik
Filter: Tarifziel? ultima ratio? verhaeltnismaessig?
Urteil: rechtmaessig (Regeln) + sinnvoll (Kosten/Druck)
```
Klausur-Satz: `Erst verhandeln, dann schlichten, erst danach streiken — und nur um Tarifziele.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: 1951 erkampfte die IG Metall in Nordrhein-Westfalen nach einem der laengsten Streiks der Bundesrepublik die Lohnfortzahlung im Krankheitsfall — heute eine Selbstverstaendlichkeit. Tarifkaempfe schreiben Sozialgeschichte.

**中文解读**: 今天习以为常的病假工资，曾是漫长罢工换来的。记住这个例子，罢工的"最后手段"就有了历史分量。

**Bezug zum Konzept**: `Was heute normal wirkt, war gestern ein Tarifkampf.`

## Schritt 4 — ausprobieren: Interaktive Praxis & Labor

[Werkzeug: markt-sim]

BEISPIEL（正确例题示范，含教具操作与解答，中文在上、德语在下）：

AUFGABE中文导读（判定谜题）：调解耗尽后工会为加薪发起警告性罢工。请判定其合法性并评价是否明智。

AUFGABE (pruefen, AFB II/III): Nach erschoepfter Schlichtung streikt die Gewerkschaft fuer Lohn. Pruefen Sie Rechtmaessigkeit und Sinn.

HILFE（中德双语步骤）：

1. 中文：第1步验目标：为工资即关税目标通过，关键词：Ziel。
   Schritt 1 (DE): Tarifziel bejahen.
2. 中文：第2步验步骤：调解耗尽即最后手段通过，关键词：Stufen。
   Schritt 2 (DE): ultima ratio nach Schlichtung bejahen.
3. 中文：第3步评明智：算代价与压力效果，关键词：Kosten。
   Schritt 3 (DE): Kosten gegen Druck abwaegen.

MUSTERLOESUNG：中文：目标是工资、步骤走完调解，合法性两关全过；明智与否看罢工基金能撑多久、舆论与订单压力能否换来加价，合法不等于划算。

MUSTERLOESUNG (DE): Als gewerkschaftlicher Warnstreik um Lohn nach erschoepfter Schlichtung ist die Aktion rechtmaessig und verhaeltnismaessig. Sinnvoll ist sie, wenn Druck und Kosten stimmen.
Klausur-Satz: `Als gewerkschaftlicher Warnstreik um Lohn nach erschoepfter Schlichtung ist die Aktion rechtmaessig und verhaeltnismaessig.`

## Schritt 5 — ausprobieren: Verfahrensvergleich & Abgrenzung

VERGLEICH辨别实验（双向辨析：合法审查 vs 效果评价）：

VERGLEICH: Waehle erst das Verfahren — 【选程序】先看设问词：(i) 合法审查（rechtmaessig/zulaessig：查主体、目标、最后手段、比例）oder (ii) 效果评价（sinnvoll/erfolgreich：讲组织度、替代性、公众成本）—— dann loesen.

AUFGABE A：Ist der Streik rechtmaessig? Pruefen Sie.
AUFGABE B：War der Streik sinnvoll? Beurteilen Sie seine Wirksamkeit.

HILFE: A 问 rechtmaessig → Verfahren (i) 走四要件。B 问 sinnvoll → Verfahren (ii) 讲筹码与代价。【选程序：问合法查要件；问值否算得失。】

ANTWORT: A erfordert Verfahren (i): Nur die Viererpruefung (Traeger, Tarifziel, ultima ratio, Verhaeltnismaessigkeit) entscheidet; Ergebnis und Sympathie sind irrelevant. B erfordert Verfahren (ii): Hoher Organisationsgrad plus schwer ersetzbare Arbeit erhoeht Druck, lange Dauer und Fremdschaeden (Pendler, Kliniken) senken Legitimation; ein kurzer Warnstreik vor neuer Runde ist oft wirksamer als ein Erzwingungsstreik. Rechtmaessig heisst nicht automatisch sinnvoll — und umgekehrt.

Klausur-Satz: `Rechtmaessigkeit folgt den Kampfregeln, Sinnhaftigkeit den Kosten und dem Druck.`

## Schritt 6 — check: Selbsttest zu Tarifautonomie und Gewerkschaften im Arbeitskampf
CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Was schuetzt Art. 9 Abs. 3 GG? | ANTWORT: Die Koalitionsfreiheit: Gewerkschaften und Arbeitgeber verhandeln Loehne frei vom Staat.
FRAGE: Welche vier Bedingungen machen einen Streik rechtmaessig? | ANTWORT: Gewerkschaft als Traeger, Tarifziel, erschoepfte Verhandlung/Schlichtung, Verhaeltnismaessigkeit.
FRAGE: Was ist die Aussperrung? | ANTWORT: Das spiegelbildliche Kampfmittel der Arbeitgeber: voruebergehender Ausschluss von der Arbeit.

Klausur-Satz: `Ohne Tarifziel und ohne ultima ratio ist kein Streik rechtmaessig.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"任何人随时可罢工"。
   中文纠偏：罢工权属于工会组织的集体行动， wildcat-Streik 无工会背书不受保护；且须先走完谈判与调解。
   Korrektur-Satz: `Nur ein gewerkschaftlich getragener Streik um Tarifziele nach ultima ratio ist geschuetzt.`

2. 误解"国家应直接定工资"。
   中文纠偏：这违反 Tarifautonomie；国家只设定底线（Mindestlohn、 Arbeitszeitgesetz），具体工资留给劳资博弈。
   Korrektur-Satz: `Der Staat setzt Rahmen, die Tarifparteien setzen Loehne.`

## Schritt 7 — szenario: Klausurtransfer: Tarifautonomie und Gewerkschaften im Arbeitskampf
ROLLE: Du bist Schuelervertreter in einer Podiumsdiskussion zum OePNV-Streik.
SITUATION: Pendler klagen ueber Ausfaelle, die Gewerkschaft verweist auf gescheiterte Schlichtung. Nimm in einer zusammenhaengenden Stellungnahme (ca. 150 Woerter) dazu Stellung: War der Streik rechtmaessig und war er sinnvoll?
RUBRIC (30 XP): Rechtmaessigkeitspruefung in vier Punkten (12 XP) | Wirksamkeitsabwaegung mit Kosten (10 XP) | Eigenes kriteriengeleitetes Urteil (4 XP) | Adressatengerechte Stellungnahme (4 XP).

## Schritt 8 — reflexion: Takeaway & Metakognitive Reflexion

TAKEAWAY 1盒（核心总结）：

中文：劳资自治是国家让位、规则兜底。合法看四要件，有效看筹码与代价。记住一句话——先谈后调再罢工，只为工资不为政。
Takeaway-Satz: `Tarifautonomie heisst frei verhandeln unter Kampfregeln.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Rechtmaessigkeitspruefung (Schritt 4) oder die Trennung von Recht und Sinn (Schritt 5)?
2. 元认知计划：Beim naechsten Mal pruefe ich zuerst Traeger und Ziel, dann ultima ratio.
