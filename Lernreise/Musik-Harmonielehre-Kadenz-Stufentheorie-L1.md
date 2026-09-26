---
fach: Musik
thema: "Harmonielehre Kadenz und Stufentheorie"
level: 1
ziel: Klausur
xp: 100
operatoren: [bestimmen, aufstellen]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Musik, Harmonielehre]
version: Lesson-v3
---

# Lernreise: Harmonielehre Kadenz und Stufentheorie (L1, Ziel Klausur)

<!-- Lesson v3 9步制架构：Schritt 1至8固定结构；Fehlvorstellung 夹在 Schritt 6 与 7 之间（Parser 自动跳过，不占步数）；支持内嵌 [Werkzeug: <id>] 交互教具；Gating: check/szenario 未过 = Weiter 置灰；XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能说清六个顺阶三和弦的级数与性质（I 大、ii 小、iii 小、IV 大、V 大、vi 小），并指出 T-S-D-T 的功能归属。
2. 中文：能写出 C 大调正格终止 I-IV-V-I 四个和弦，并解释为何它有收束感（低音四五度进行加导音倾向）。
3. 中文：能按声部进行规则连写两个和弦，保持共同音、其余声部级进，避免平行五八度（AFB II）。

Klausur-Satz: `Die authentische Kadenz I-IV-V-I verbindet die Stufen- mit der Funktionstheorie und schliesst durch Bassquinten und Leittonwirkung.`

## Schritt 2 — entdecken

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 级数 — Stufe：按音阶顺序在每一级上叠三度构成的三和弦，C 大调为 C-d-e-F-G-a。
- 正格终止 — Authentische Kadenz：I-IV-V-I 的标准收束进行，主功能开头结尾，考试最常考。
- 功能组 — Funktionsgruppe：主 T（I, vi, iii）、下属 S（IV, ii）、属 D（V, vii0），T-S-D-T 为基本方向。
- 共同音 — Gemeinsamer Ton：相邻两和弦共有的音，连写时应保留在同一声部。
- 平行五八度 — Parallele Quinten/Oktaven：两声部同向进行并保持纯五或纯八度，传统和声中禁止。

Klausur-Satz: `Gemeinsame Toene werden gehalten, die uebrigen Stimmen bewegen sich stufenweise in Gegenbewegung zum Bass.`

## Schritt 3 — entdecken

ENTDECKEN（1概念 + 1文字图解）：

中文：级数理论回答"和弦是哪一级"，功能理论回答"它往哪里走"。C 大调六个和弦中，I 是家，V 是门（有导音 B 拉向 C），IV 是另一条路。T-S-D-T 是单行道：主可以去任何地方，下属去属，属回家，属之后不可直接回下属（逆功能要扣分）。终止感来自两件事：低音 G 到 C 的纯四度上行（即五度下行），加三音 B 到 C 的半音解决。连写时先找共同音钉住，再让其他声部走小步，低音与高音反向最安全。

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
  C-Dur Stufen (Dreiklaenge):
  I=C   ii=d   iii=e   IV=F   V=G   vi=a
  Dur   moll   moll    Dur    Dur   moll
  [T]   [S]    [T]     [S]    [D]   [T]

  Kadenzweg T-S-D-T:
  I  ---->  IV  ---->  V  ---->  I
  C         F          G         C
  Bass: C -> F -> G -> C (Quarte+Quinte)
  Leitton: H -> C (Halbton, nur in V->I)
  Verboten: S nach D ja, D nach S nein
```

Klausur-Satz: `Die Kadenz folgt dem Weg T-S-D-T, weil nur diese Richtung Leittonspannung und Bassquinten zur Tonika aufloest.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: In alten Harmonielehren hiess es, Parallelen klingen wie ein Schatten, der an der Wand mitlaeuft: Zwei Stimmen, die alles gleich machen, zaehlen ploetzlich nur noch als eine. Pruefer hoeren daher zuerst auf Bass und Sopran. Wer dort Gegenbewegung zeigt, wirkt sofort sicher, auch wenn eine Mittelstimme einmal springt.

**中文解读**: 平行五八度的禁令不是刁难，而是"四个声部要像四个人唱歌"。两个人永远隔同样距离齐步走，听起来就像一个人，考试会判声部缺失。低音与高音反向走，立刻显得专业。

**Bezug zum Konzept**: `Selbstaendige Stimmfuehrung mit Gegenbewegung sichert den vierstimmigen Satz gegen verbotene Parallelen.`

## Schritt 4 — ausprobieren

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: formula]

AUFGABE (bestimmen, AFB II)：Bestimme in C-Dur die Stufen und Funktionen von C, F, G, C und setze die Kadenz I-IV-V-I vierstimmig in enger Lage, Soprananfang g2. Beachte die Stimmfuehrung ohne parallele Quinten/Oktaven.

HILFE:
1. Schritt 1: Akkorde den Stufen zuordnen: C=I=T, F=IV=S, G=V=D, C=I=T.
2. Schritt 2: Gemeinsame Toene suchen: I->IV teilt C, IV->V teilt kein Dreiklangston voll, V->I teilt G.
3. Schritt 3: Sopran und Bass in Gegenbewegung fuehren, Leitton H in V nach C aufloesen, Quinten zwischen allen Stimmenpaaren pruefen.

MUSTERLOESUNG: Positiv-Beispiel 1 (I->IV, C nach F): I = C-E-G mit Sopran g2, IV = F-A-C mit Sopran a2. Gemeinsamer Ton C bleibt im Alt (c2->c2), Tenor E->F stufenweise, Bass C->F in Quarte, Sopran g2->a2 stufenweise; keine Parallelen. Positiv-Beispiel 2 (V->I, G nach C): V = G-H-D mit Sopran d2, I = C-E-G mit Sopran c2. Leitton H im Tenor steigt nach C, D->E stufenweise, G->G bleibt im Alt, Bass G->C in Quarte; Sopran faellt, Bass steigt (Gegenbewegung), Schlussakkord mit verdoppeltem Grundton C. Negativ-Beispiel (Fehler, zum Vergleich): V->I mit Sopran d2->e2 und Bass G->A fuehrt Tenor H->A und Alt G->E parallel in Quinten; zusaetzlich bleibt der Leitton H unaufgeloest. Fehlerurteil: Parallele Quinten zwischen Aussenstimmen plus fehlende Leittonaufloesung, daher als Kadenzschluss unbrauchbar.

Klausur-Satz: `Die korrekte Kadenz haelt gemeinsame Toene, loest den Leitton auf und vermeidet Parallelen durch Gegenbewegung.`

## Schritt 5 — ausprobieren

VERGLEICH辨别实验（双向辨析：和弦归属与进行方向）：

VERGLEICH: Waehle erst das Konzept — 【选概念】先判断题目问的是 (i) Stufen-Bestimmung（看根音是第几级、大小性质是什么）还是 (ii) Funktions-Weg（看 T-S-D-T 方向是否允许）—— dann loesen.

AUFGABE A：Bestimme in C-Dur den Dreiklang A-C-E nach Stufe und Funktion. AUFGABE B：Ist die Folge V-IV-I als Kadenznachsatz zulaessig?

HILFE: A fragt nach Name und Gruppe -> Konzept (i): Zaehle von C aus (A = VI), pruefe Terz (klein = moll), ordne T zu. B fragt nach Richtung -> Konzept (ii): Pruefe T-S-D-T.【选概念：问"这是什么和弦"选级数加功能；问"能否这样接"选方向规则，D 回 S 否决。】

ANTWORT: A erfordert Konzept (i): A-C-E ist Stufe VI in Moll und gehoert zur Tonika-Gruppe als Vertreter von I. B erfordert Konzept (ii): V->IV verletzt die Richtung D->S und zerstoert die Schlusswirkung; korrekt waere IV->V->I. Die Kadenz lebt von der Quintspannung vor der Tonika, ein Rueckschritt nimmt ihr die Energie.

Klausur-Satz: `Die Stufe VI vertritt die Tonika, doch die Folge Dominante vor Subdominante widerspricht dem Kadenzweg.`

## Schritt 6 — check

CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Welche Stufen gehoeren in Dur zu T, S und D? | ANTWORT: T = I, iii, vi; S = IV, ii; D = V, vii0; Grundweg T-S-D-T.
FRAGE: Warum wirkt V->I schliessend? | ANTWORT: Bassquinte G->C plus Leitton H->C in Halbtonspannung loesen sich gemeinsam zur Tonika auf.
FRAGE: Wie vermeidet man parallele Quinten praktisch? | ANTWORT: Gemeinsame Toene halten, uebrige Stimmen stufenweise und Bass gegen Sopran in Gegenbewegung fuehren.

Klausur-Satz: `Der vierstimmige Satz verlangt regelmaessig verdoppelten Grundton und Aufloesung aller Leittoene.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"只要和弦级数写对，声部怎么走都行"。
   中文纠偏：级数只给名字，分数大头在连接。共同音不留、声部大跳加同向，平行五八度一出现整题降档。
   Korrektur-Satz: `Die Stufenbestimmung benennt nur den Akkord, erst die korrekte Stimmfuehrung macht daraus einen Kadenzsatz.`
2. 误解"V 到 IV 也是下行，听起来顺就可以当地终止"。
   中文纠偏：终止是功能方向不是顺耳与否。D 必须解向 T，D 回 S 是逆功能，考场直接判错。
   Korrektur-Satz: `Nach der Dominante ist nur die Tonika als Ziel zulaessig, nicht die Subdominante.`

## Schritt 7 — szenario

ROLLE: Du bist Klavierbetreuer der EF-Musikgruppe und erklaerst einer Mitschuelerin die Klausuraufgabe.
SITUATION: Sie hat C-F-G-C korrekt als I-IV-V-I bestimmt, doch ihr vierstimmiger Satz enthaelt parallele Oktaven zwischen Bass und Tenor und der Leitton bleibt liegen.
AUFGABE: Schreibe eine zusammenhaengende Korrektur (ca. 150 Woerter), in der du Stufe und Funktion bestaetigst, die zwei Stimmfuehrungsfehler benennst und je eine konkrete Umlagerung mit Beibehaltung des gemeinsamen Tons vorschlaegst.
RUBRIC (30 XP): Stufen plus Funktionen korrekt (10 XP) | Beide Fehler mit Stimmenangabe benannt (10 XP) | Zwei praktikable Korrekturen mit Gegenbewegung (10 XP).

## Schritt 8 — entdecken

TAKEAWAY 1盒（核心总结）：

中文：六级只记"大小小大大小"加 T-S-D-T 单行道。终止四步 I-IV-V-I，低音 C-F-G-C，导音 B 必须到 C。连写三招：钉住共同音、小步走、与低音反向。检查只看两件事：外声部有无平行，导音解了没。
Takeaway-Satz: `Stufen kennen, Weg T-S-D-T einhalten, gemeinsame Toene halten und Parallelen durch Gegenbewegung vermeiden.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Stufen- und Funktionsbestimmung (Schritt 4) oder das fehlerfreie Fortschreiten der Stimmen (Schritt 5)?
2. 元认知计划：Beim naechsten Mal pruefe ich zuerst Bass gegen Sopran und loese dann erst die Mittelstimmen auf.
