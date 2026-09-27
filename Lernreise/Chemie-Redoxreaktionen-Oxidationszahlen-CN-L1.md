---
fach: Chemie
thema: "Redoxreaktionen und Oxidationszahlen"
level: 1
ziel: Klausur
xp: 100
operatoren: [bestimmen, aufstellen, begruenden]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Chemie, Redox]
version: Lesson-v3
---

# Lernreise: Redoxreaktionen und Oxidationszahlen (L1, Ziel Klausur)

<!-- Lesson v3 9步制架构：Schritt 1至8固定结构；Fehlvorstellung 夹在 Schritt 6 与 7 之间（Parser 自动跳过，不占步数）；支持内嵌 [Werkzeug: <id>] 交互教具；Gating: check/szenario 未过 = Weiter 置灰；XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken: Ziele & Phänomen-Einstieg

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能说清氧化数升降与得失电子的对应关系——升是失电子被氧化，降是得电子被还原。
2. 中文：能用七条规则快速标出常见化合物中各元素的氧化数。
3. 中文：能配平简单的氧化还原方程式并指出氧化剂还原剂，写出德语标准结论句（AFB II）。


Hook中文生活切入:

想象班级 jump 绳接力时交接棒:棒从一个人手里传到另一个人手里,有人递出,必有人接住,棒的总数不变,只是换了主人。化学里的电子交接完全一样:有人失去电子,就必有人得到电子,得失数量严格相等,氧化数就是记录这场交接的账本,账平了方程式才成立。

Phaenomen-Satz (DE): Jede Uebergabe braucht einen Geber und einen Nehmer, die Bilanz bleibt gleich.

中文机制铺垫:氧化数升高的半反应是氧化,降低的是还原,两者耦合为氧化还原;先标出变价元素、算出得失电子数,再用最小公倍数配平方程式,最后用原子守恒补齐其余元素,电子账与原子账必须同时平衡。

Mechanismus-Satz (DE): Oxidation gibt Elektronen ab, Reduktion nimmt sie auf, die Bilanz gleicht beide aus.

Klausur-Satz: `Oxidation bedeutet Elektronenabgabe mit Erhoehung der Oxidationszahl, Reduktion bedeutet Elektronenaufnahme mit Erniedrigung.`

## Schritt 2 — entdecken: Fachbegriffe & Pre-Training

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 氧化数 — Oxidationszahl：假想离子电荷，记作 $+II$、$-I$ 等罗马数字。【陷阱：Oxidationszahl（形式电荷，可分数可零）不是 Ladung（真实离子电荷）也不是 Wertigkeit（价态旧称）。】
- 氧化 — Oxidation：失电子、氧化数升高。【陷阱：Oxidation（失电子）不是 Sauerstoffaufnahme（只是氧化的一种表象，真正判据是电子）。】
- 还原 — Reduktion：得电子、氧化数降低。【陷阱：Reduktion（得电子）不是 Sauerstoffabgabe（表象之一）。】
- 氧化剂 — Oxidationsmittel：得电子的对方，自己被还原。【陷阱：Oxidationsmittel（让别人氧化，自己还原）方向别反。】
- 还原剂 — Reduktionsmittel：失电子的对方，自己被氧化。【陷阱：Reduktionsmittel（让别人还原，自己氧化）与 Oxidationsmittel 成对反向。】

Klausur-Satz: `Oxidations- und Reduktionsmittel erkennt man an der Erhoehung und Erniedrigung der Oxidationszahlen.`

## Schritt 3 — entdecken: Kernkonzept & Wirkungsmodell

ENTDECKEN（1概念 + 1文字图解，中文在上、德语在下）：

Hook中文生活切入：

中文：想象切开的苹果放一会儿变黄、铁钉淋雨生锈：都是有东西丢了电子、有东西捡了电子，得失永远成对出现。

Phaenomen-Satz (DE): Wo einer Elektronen abgibt, nimmt ein anderer sie auf.

Spiel-Aufgabe沙盒操作指引：

中文：打开沙盒，拖动滑块给每个原子标氧化数（关键词：Oxidationszahl, Elektronenabgabe, Elektronenaufnahme, Oxidationsmittel），看哪边升高、哪边降低，再配平得失电子数。

Beobachtungs-Satz (DE): Steigt eine Oxidationszahl, faellt eine andere; die Elektronenzahl bleibt in der Summe gleich.

Aha-Moment因果链：

中文因果链：氧化数升高就是丢电子的氧化、降低就是得电子的还原；一种物质被氧化必有另一种被还原，配平时先定变价原子、再用得失电子守恒定系数，总氧化数之和等于电荷。

Gesetz-Satz (DE): Oxidation heisst Abgabe, Reduktion heisst Aufnahme von Elektronen.

$Cu \to Cu^{2+} + 2e^-$

$NO_3^- + 4H^+ + 3e^- \to NO + 2H_2O$

$\sum OZ = Ladung$

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
OXIDATION: Cu(0) --2e- ab--> Cu(+II)  [ reducing agent ]
REDUKTION: N(+V) --3e- auf--> N(+II)  [ oxidising agent ]
Ausgleich: 3 Cu + 8 HNO3 -> 3 Cu(NO3)2 + 2 NO + 4 H2O
```
Klausur-Satz: `Die Summe aller Oxidationszahlen einer Verbindung entspricht ihrer Gesamtladung.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Das Wort Oxidation kommt von Oxygenium (Sauerstoff), weil man frueher nur das Rosten von Eisen kannte. Erst spaeter merkte man: Auch ohne Sauerstoff — etwa bei der Reaktion von Natrium mit Chlor — wandern Elektronen. Der alte Name blieb, die Definition wurde elektronisch.

**中文解读**: "氧化"这个名字是历史包袱：最初只认识铁生锈（和氧结合），后来发现钠和氯反应根本没氧参与，照样是氧化还原。中国学生记住电子定义才是现代判据，"得氧失氧"只是生锈这种特例的表象。

**Bezug zum Konzept**: `Jede Sauerstoffreaktion mit Elektronenuebergang ist Redox, aber nicht jede Redoxreaktion braucht Sauerstoff.`

## Schritt 4 — ausprobieren: Interaktive Praxis & Labor

[Werkzeug: le-chatelier-sim]

BEISPIEL（正确例题示范，含教具操作与解答，中文在上、德语在下）：

AUFGABE中文导读（沙盒谜题）：铜片投入稀硝酸产生无色气体，标出变价原子的氧化数，指出谁被氧化、谁被还原并配平。

AUFGABE (anwenden, AFB II): Kupfer reagiert mit Salpetersaeure zu $Cu(NO_3)_2$, $NO$ und $H_2O$. Bestimmen Sie die Oxidationszahlen, benennen Sie Oxidation und Reduktion und gleichen Sie aus.

HILFE（中德双语步骤）：

1. 中文：第1步标出Cu、N的氧化数前后变化，关键词：Oxidationszahl。
   Schritt 1 (DE): Markieren Sie $Cu: 0 \to +II$ und $N: +V \to +II$.
2. 中文：第2步定氧化剂还原剂：降者为氧化剂、升者为还原剂，关键词：Mittel。
   Schritt 2 (DE): $HNO_3$ ist Oxidationsmittel, $Cu$ ist Reduktionsmittel.
3. 中文：第3步按得失电子3对2配平并检验原子守恒，关键词：Ausgleich。
   Schritt 3 (DE): Gleichen Sie mit $3$ zu $2$ aus und pruefen Sie die Atome.

MUSTERLOESUNG：中文：铜从0升到正二被氧化作还原剂，硝酸中氮从正五降到正二被还原来作氧化剂，按得失电子最小公倍数6配平得3比2，全式原子守恒。

MUSTERLOESUNG (DE): $Cu$ wird oxidiert ($0 \to +II$), $HNO_3$ wird reduziert ($+V \to +II$). Mit $3 \times 2e^-$ gegen $2 \times 3e^-$ folgt $3\,Cu + 8\,HNO_3 \to 3\,Cu(NO_3)_2 + 2\,NO + 4\,H_2O$.
Klausur-Satz: `Kupfer wird oxidiert und Salpetersaeure wird reduziert, die ausgeglichene Bilanz traegt $3$ zu $2$.`

## Schritt 5 — ausprobieren: Verfahrensvergleich & Abgrenzung

VERGLEICH辨别实验（双向辨析：氧化剂眼 vs. 还原剂眼）：

VERGLEICH: Waehle erst das Verfahren — 【选程序】先标氧化数再看升降：(i) Oxidationsmittel-Verfahren（某元素氧化数下降 → 该物质是氧化剂）还是 (ii) Reduktionsmittel-Verfahren（某元素氧化数上升 → 该物质是还原剂）—— dann benennen.

AUFGABE A：In $2\,Mg + O_2 \to 2\,MgO$: Welcher Stoff ist das Oxidationsmittel?
AUFGABE B：In derselben Reaktion: Welcher Stoff ist das Reduktionsmittel?

HILFE: $Mg$ $0 \to +II$ steigt -> Verfahren (ii). $O$ $0 \to -II$ faellt -> Verfahren (i).【选程序：题干问 Oxidationsmittel 找氧化数下降者；问 Reduktionsmittel 找氧化数上升者；问氧化产物找升高的产物。】

ANTWORT: A erfordert Verfahren (i): $O_2$ sinkt von $0$ auf $-II$, also Oxidationsmittel, wird selbst reduziert. B erfordert Verfahren (ii): $Mg$ steigt von $0$ auf $+II$, also Reduktionsmittel, wird selbst oxidiert.

Klausur-Satz: `Das Mittel bewirkt beim Partner das Gegenteil dessen, was es selbst erleidet.`

## Schritt 6 — check: Verständnisprüfung

CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Was bedeutet Oxidation in Elektronensprache? | ANTWORT: Elektronenabgabe mit Erhoehung der Oxidationszahl.
FRAGE: Wie erkennt man Oxidations- und Reduktionsmittel? | ANTWORT: Oxidationsmittel enthaelt das fallende Element, Reduktionsmittel das steigende.
FRAGE: Welche Oxidationszahl hat Sauerstoff in $H_2O_2$? | ANTWORT: $-I$ (Peroxid-Ausnahme, sonst $-II$).

Klausur-Satz: `Ohne Aenderung einer Oxidationszahl liegt keine Redoxreaktion vor.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"有氧气参加的才是氧化还原反应"。
   中文纠偏：现代定义只看电子。钠和氯气反应生成食盐，没有氧却是教科书级氧化还原；反过来酸碱中和有氧有氢参与（如盐酸和氢氧化钠），氧化数全程不变，根本不是氧化还原。
   Korrektur-Satz: `Entscheidend ist der Elektronenuebergang, nicht die Anwesenheit von Sauerstoff.`

2. 误解"氧化剂被氧化，还原剂被还原"。
   中文纠偏：正好说反了。氧化剂让别人氧化，自己得电子被还原；还原剂让别人还原，自己失电子被氧化。名字说的是"对别人的作用"，不是"自己的遭遇"。
   Korrektur-Satz: `Das Oxidationsmittel wird reduziert, das Reduktionsmittel wird oxidiert.`

## Schritt 7 — szenario: Klausurtransfer & Rubric

ROLLE: Du bist Tutor und erklaerst Redox im Chemiekurs.
SITUATION: Eine Mitschuelerin behauptet, bei $Zn + 2\,HCl \to ZnCl_2 + H_2$ aendere sich keine Oxidationszahl, weil kein Sauerstoff vorkomme.
AUFGABE: Widerlegen Sie das in ca. 150 Woertern mit Oxidationszahlen von $Zn$ und $H$ und benennen Sie Mittel und Vorgaenge.
RUBRIC (30 XP): Oxidationszahlen $Zn$ $0 \to +II$, $H$ $+I \to 0$ (10 XP) | Oxidation/Reduktion zugeordnet (10 XP) | Mittel korrekt plus Sauerstoff-Irrtum korrigiert (10 XP).

## Schritt 8 — entdecken: Takeaway & Metakognitive Reflexion

TAKEAWAY 1盒（核心总结）：

中文：氧化还原认电子不认氧：升失氧（还原剂被氧化），降得还（氧化剂被还原）。标数按优先级，最后用总和反推。配平先配电子得失，再补原子电荷。无升降即非氧化还原。
Takeaway-Satz: `Steigen und Fallen der Oxidationszahlen verraten Mittel, Richtung und Bilanz jeder Redoxreaktion.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Elektronenbilanz mit Koeffizienten (Schritt 4) oder die Mittelwahl nach Steigen und Fallen (Schritt 5)?
2. 元认知计划：Beim naechsten Mal schreibe ich ueber jede Formel zuerst die Oxidationszahlen, bevor ich Mittel benenne.
