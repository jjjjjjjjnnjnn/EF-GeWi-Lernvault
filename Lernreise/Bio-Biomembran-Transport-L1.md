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

# Lernreise: Biomembran und Transportmechanismen (L1, Ziel Klausur)

<!-- Lesson v3 9步制架构：Schritt 1至8固定结构；Fehlvorstellung 夹在 Schritt 6 与 7 之间（Parser 自动跳过，不占步数）；支持内嵌 [Werkzeug: <id>] 交互教具；Gating: check/szenario 未过 = Weiter 置灰；XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能说清流动镶嵌模型的三件套——磷脂双分子层、膜蛋白、糖萼，并用一句"结构→选择透过性"解释膜为什么能当门卫。
2. 中文：能区分被动与主动运输，抓住三个判别轴——顺/逆浓度梯度、是否耗 ATP、是否需要载体蛋白，先定轴再选术语。
3. 中文：能按 AFB II 用德语描述一次渗透实验（Plasmolyse / Deplasmolyse），写出带 Fachbegriff 的因果链。

Klausur-Satz: `Die Biomembran ist nach dem Flüssig-Mosaik-Modell aufgebaut und aufgrund ihrer Phospholipid-Doppelschicht selektiv permeabel.`

## Schritt 2 — entdecken

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 流动镶嵌模型 — Flüssig-Mosaik-Modell：磷脂双分子层作"海"，蛋白像"冰山"漂浮其中，可横向移动。
- 磷脂双分子层 — Phospholipid-Doppelschicht：亲水头朝内外水相，疏水尾相对朝内，构成膜的基本骨架。
- 选择透过性 — selektive Permeabilität：膜只放行部分物质，是"结构决定功能"的典型。
- 渗透作用 — Osmose：水分子顺浓度梯度通过半透膜的定向扩散，动的是水而不是溶质。
- 主动运输 — aktiver Transport：逆浓度梯度、耗 ATP、需载体蛋白，例如钠钾泵。

Klausur-Satz: `Während passive Transportvorgänge dem Konzentrationsgefälle folgen, arbeitet der aktive Transport unter ATP-Verbrauch gegen das Gefälle.`

## Schritt 3 — entdecken

ENTDECKEN（1概念 + 1文字图解）：

中文：膜不是一堵死墙，而是一层会流动的"油膜加浮岛"。磷脂分子一头亲水、一头疏水，于是自发排成双层：头朝外、尾朝内。小而非极性的分子（O2、CO2）能直接从脂层里钻过去，这叫简单扩散；带电或极性的粒子（水、离子、葡萄糖）穿不过疏水区，只能借膜蛋白的通道或载体过去，这叫易化扩散——两者都顺浓度梯度、都不耗能，所以同属被动运输。当细胞需要把物质逆着梯度搬（比如把 K+ 往高浓度里塞），就必须烧 ATP、动用泵蛋白，这就是主动运输。三个判别轴——梯度方向、ATP、载体——决定了你该写哪一个术语。植物细胞外面还套着刚性细胞壁，于是失水时原生质体会从壁上"缩"下来，这就是质壁分离（Plasmolyse）；补水后它又能贴回去（Deplasmolyse）。

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
   aussen (extrazellulaer)
   ==================================================
    o   o   o   o   o   o   o   o   o   o   o   o
   /|\ /|\ /|\ /|\ /|\ /|\ /|\ /|\ /|\ /|\ /|\ /|\   <- hydrophile Koepfe
   ||| ||| ||| ||| ||| [K] ||| ||| ||| [C] ||| |||   [K] Kanalprotein
   ||| ||| ||| ||| ||| [K] ||| ||| ||| [C] ||| |||   [C] Carrierprotein
   \|/ \|/ \|/ \|/ \|/ \|/ \|/ \|/ \|/ \|/ \|/ \|/   <- hydrophobe Schwanzn
   ==================================================
    o   o   o   o   o   o   o   o   o   o   o   o
   innen (intrazellulaer)

   Transportwege:
   O2 / CO2   -->  einfache Diffusion   (direkt durch die Lipidschicht)
   H2O / K+   -->  Kanalprotein         (erleichterte Diffusion, passiv)
   Glucose    -->  Carrierprotein       (erleichterte Diffusion, passiv)
   Na+ / K+   <--  Ionenpumpe           (aktiver Transport, ATP)
```

Klausur-Satz: `Kleine unpolare Moleküle diffundieren direkt durch die Lipiddoppelschicht, während Ionen und polare Stoffe auf Kanal- oder Carrierproteine angewiesen sind.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Wer eine Gurkenscheibe mit Salz bestreut, sieht bald Wassertropfen austreten und die Scheibe schlaff werden. Das Salz draußen bildet eine hypertonische Lösung, und das Wasser in den Zellen folgt dem osmotischen Gefälle nach außen. Genau deshalb wird Gemüse vor dem Einlegen zuerst "gesalzen" und so entwässert.

**中文解读**: 黄瓜撒盐后出水变软，是因为外部盐水是高渗溶液，细胞内的水顺浓度梯度经选择性透性膜外流，膨压下降、组织松弛。这是渗透作用最直观的厨房版本，也解释了腌菜为什么要先用盐“杀水”。

**Bezug zum Konzept**: `Die Salzgurke zeigt die Osmose: Wasser wandert durch die selektiv permeable Biomembran zur hypertonischen Seite, wodurch der Turgor der Zelle sinkt.`

## Schritt 4 — ausprobieren

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: lego]

AUFGABE (beschreiben und erklären, AFB II)：Zwei gleich lange Kartoffelstäbchen werden gewogen und anschließend für eine Stunde in zwei Bechergläser gelegt: Becher A enthält destilliertes Wasser, Becher B eine konzentrierte Kochsalzlösung. Danach werden die Stäbchen erneut gewogen. Beschreiben Sie die zu erwartenden Masseänderungen und erklären Sie sie mit den Fachbegriffen Osmose und Turgor.

HILFE:
1. Schritt 1: Beschreibe zuerst nur, was messbar ist (Operator beschreiben): Stäbchen A nimmt an Masse zu, Stäbchen B nimmt ab.
2. Schritt 2: Bestimme die Richtung des Wassers: Wasser fließt osmotisch immer zur Seite der höheren Konzentration gelöster Teilchen.
3. Schritt 3: Verknüpfe mit der Struktur (Struktur-Funktion): Die große Zentralvakuole speichert Wasser und erzeugt Turgor; Wassereinstrom hebt ihn, Wasserverlust senkt ihn.

MUSTERLÖSUNG: In Becher A nimmt das Kartoffelstäbchen an Masse zu, in Becher B nimmt es ab. Ursache ist die Osmose: Da destilliertes Wasser im Vergleich zum Zellinneren hypotonisch ist, diffundiert Wasser durch die selektiv permeable Biomembran in die Zellen ein; die Zentralvakuole vergrößert sich, der Turgor steigt und das Gewebe wird straff. In der konzentrierten Kochsalzlösung ist das Außenmedium dagegen hypertonisch, sodass Wasser osmotisch aus den Zellen nach außen strömt. Der Turgor bricht zusammen, das Gewebe erschlafft und die Masse sinkt. Entscheidend ist, dass sich das Wasser bewegt und nicht das Salz, da die Membran für gelöste Ionen nahezu undurchlässig ist.

Klausur-Satz: `Da Wasser osmotisch dem Konzentrationsgefälle folgt, gewinnt die Zelle im hypotonischen Medium Wasser und verliert es im hypertonischen Medium.`

## Schritt 5 — ausprobieren

VERGLEICH辨别实验（双向辨析：被动眼 vs. 主动眼）：

VERGLEICH: Wähle erst das Verfahren — 【选程序】先判断题目问的是 (i) Passiv-Verfahren（顺梯度、无 ATP、可有/无载体：einfache oder erleichterte Diffusion）还是 (ii) Aktiv-Verfahren（逆梯度、耗 ATP、必须有 Pump-/Carrierprotein）—— dann lösen.

AUFGABE A：In einem Text heißt es, Sauerstoff gelange aus der Lungenluft in die roten Blutkörperchen, ohne dass die Zelle dafür Energie aufwendet. Welches Verfahren ist zu wählen, und wie lässt sich der Vorgang erklären?

AUFGABE B：In einem Text heißt es, eine Zelle reichert Kaliumionen gegen das bestehende Konzentrationsgefälle an und verbraucht dabei ATP. Welches Verfahren ist zu wählen, und wie lässt sich der Vorgang erklären?

HILFE: A nennt keine Energie und ein kleines unpolares Molekül → Verfahren (i). B nennt ausdrücklich "gegen das Gefälle" und ATP-Verbrauch → Verfahren (ii).【选程序：顺梯度+无 ATP = 被动；逆梯度+耗 ATP = 主动。载体有无只区分简单/易化扩散，不改变被动这一大类。】

ANTWORT: A erfordert Verfahren (i): Sauerstoff ist klein und unpolar und diffundiert daher direkt entlang des Konzentrationsgefälles durch die Lipiddoppelschicht, also durch einfache Diffusion ohne Energieverbrauch. B erfordert Verfahren (ii): Da Kaliumionen entgegen ihrem Konzentrationsgefälle transportiert werden, muss die Zelle eine Ionenpumpe (Transport-ATPase) einsetzen; die dafür nötige Energie liefert die Hydrolyse von ATP zu ADP und Phosphat. Beide Vorgänge unterscheiden sich also nicht in der Stoffmenge, sondern in der Richtung relativ zum Gefälle und im Energiebedarf.

Klausur-Satz: `Passiver Transport folgt dem Konzentrationsgefälle ohne ATP, während aktiver Transport unter ATP-Verbrauch gegen das Gefälle verläuft.`

## Schritt 6 — check

CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Aus welchen drei Hauptbestandteilen besteht die Biomembran nach dem Flüssig-Mosaik-Modell? | ANTWORT: Aus der Phospholipid-Doppelschicht, den darin eingelagerten Membranproteinen und der Glykokalyx aus Glykolipiden und Glykoproteinen.
FRAGE: Warum ist die Biomembran selektiv permeabel? | ANTWORT: Weil die hydrophobe Lipiddoppelschicht nur kleine unpolare Moleküle passieren lässt, während polare Teilchen auf spezifische Transportproteine angewiesen sind.
FRAGE: Was geschieht bei der Plasmolyse und was bei der Deplasmolyse? | ANTWORT: Bei der Plasmolyse verliert die Zelle in einem hypertonischen Medium Wasser, der Turgor sinkt und der Protoplast löst sich von der Zellwand; bei der Deplasmolyse strömt in einem hypotonischen Medium Wasser zurück und der Protoplast legt sich wieder an die Zellwand an.

Klausur-Satz: `Die Plasmolyse beruht auf einem Wasserverlust im hypertonischen Medium, die Deplasmolyse auf einem Wassereinstrom im hypotonischen Medium.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"渗透作用就是溶质穿过膜跑到另一边"。
   中文纠偏：方向搞反了。渗透里真正在动的是水，膜对溶质近似不透。水总是向溶质浓度更高的一侧净移动，所以盐溶液一侧会失水而非"盐跑过去"。写成"盐进入细胞所以变软"直接判错。
   Korrektur-Satz: `Bei der Osmose bewegt sich ausschließlich das Wasser durch die selektiv permeable Membran zur Seite der höheren Teilchenkonzentration, während die gelösten Stoffe zurückgehalten werden.`

2. 误解"顺浓度梯度的运输就是简单扩散，一定不需要蛋白"。
   中文纠偏：不对。顺梯度只保证"被动"，不等于"不用蛋白"。葡萄糖、水、离子虽是顺梯度，却因体积或极性过不了脂层，必须借助载体或通道蛋白，这叫易化扩散，仍然不耗 ATP。判断先看梯度与能量，再看载体。
   Korrektur-Satz: `Auch die erleichterte Diffusion folgt dem Konzentrationsgefälle und benötigt kein ATP, ist aber auf Kanal- oder Carrierproteine angewiesen.`

## Schritt 7 — szenario

ROLLE: Du bist Tutorin in einem Bio-Grundkurs der gymnasialen Oberstufe und sollst einer Mitschülerin ein Experiment erklären.
SITUATION: Ein Mikroskopierpräparat mit roten Zwiebelzellen wird zunächst mit einer konzentrierten Kaliumnitratlösung und danach mit destilliertem Wasser behandelt. Deine Mitschülerin fragt, warum sich der gefärbte Zellsaftraum erst zusammenzieht und später wieder ausdehnt. Erkläre beide Beobachtungen in einer zusammenhängenden Stellungnahme (ca. 150 Wörter) mit den Fachbegriffen Osmose, hypertonisch, hypotonisch, Turgor, Plasmolyse und Deplasmolyse.
RUBRIC (30 XP): Benennung der beiden Medien als hypertonisch bzw. hypotonisch (5 XP) | Richtige Bestimmung der Wasserbewegung über die selektiv permeable Membran (10 XP) | Erklärung von Plasmolyse und Deplasmolyse über den Turgor und die Zellwand (10 XP) | Fachsprachlich korrekte, kausale Formulierung mit passenden Fachbegriffen (5 XP).

## Schritt 8 — reflexion: Takeaway & Reflexion

TAKEAWAY 1盒（核心总结）：

中文：膜是一层会流动的油膜，头朝外尾朝内，蛋白浮在里面，这套结构直接决定了"谁能过"。做题三步走：先看梯度方向（顺还是逆），再看要不要 ATP，最后看有没有载体——三个轴一填，术语自然就出来了。记住那句口诀：顺梯度、不烧能的是被动；逆梯度、烧 ATP 的是主动；渗透里动的永远是水，不是盐。
Takeaway-Satz: `Die Struktur der Biomembran bestimmt ihre Funktion: Die Lipiddoppelschicht erlaubt die passive Diffusion, während Transportproteine und ATP den aktiven Transport gegen das Gefälle ermöglichen.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Zuordnung der Transportart über die drei Kriterien (Schritt 5) oder die Formulierung des osmotischen Vorgangs mit Fachbegriffen (Schritt 4)?
2. 元认知计划：Beim nächsten Mal prüfe ich zuerst die Richtung relativ zum Konzentrationsgefälle und den ATP-Bedarf, bevor ich den Transportbegriff auswähle.
