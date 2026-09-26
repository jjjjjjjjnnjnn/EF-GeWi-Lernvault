---
fach: Musik
thema: "Zwoelftonmusik und Schoenberg"
level: 1
ziel: Klausur
xp: 100
operatoren: [darstellen, analysieren, beurteilen]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Musik, Neue-Musik]
version: Lesson-v3
---

# Lernreise: Zwoelftonmusik und Schoenberg (L1, Ziel Klausur)

<!-- Lesson v3 9步制架构：Schritt 1至8固定结构；Fehlvorstellung 夹在 Schritt 6 与 7 之间（Parser 自动跳过，不占步数）；支持内嵌 [Werkzeug: <id>] 交互教具；Gating: check/szenario 未过 = Weiter 置灰；XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能说清十二音技法的核心——十二个半音平等、无主次，用序列组织全曲。
2. 中文：能写出原形、逆行、倒影、倒影逆行四种序列形态并辨认。
3. 中文：能就"十二音是解放还是枷锁"表态并论证（AFB II-III）。

Klausur-Satz: `Die Zwoelftontechnik ersetzt die Tonarten-Hierarchie durch die Gleichberechtigung aller zwoelf Toene in einer Reihe.`

## Schritt 2 — entdecken

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 音列 — ZwölfTonreihe：十二个不同半音的固定顺序，全曲基因。【陷阱：Reihe（顺序即内容，换序即换曲）不是 Tonleiter（音阶，调式台阶）。】
- 原形 — Grundform：作曲家选定的初始序列。【陷阱：Grundform（特定顺序）不是 Grundton（主音，十二音中已废除）。】
- 逆行倒影 — Krebs und Umkehrung：倒着读、上下翻的序列变形。【陷阱：Krebs（时间倒置）不是 Umkehrung（音高镜像），两者可叠加成 Krebsumkehrung。】
- 无调性 — Atonalitaet：无主音中心，各音平等。【陷阱：atonal（无中心）不是 dissonant（不协和；十二音也可柔和）。】
- 第二维也纳乐派 — Zweite Wiener Schule：勋伯格、贝尔格、韦伯恩三人圈。【陷阱：zweite（20 世纪现代派）不是 erste（海顿莫扎特贝多芬古典派）。】

Klausur-Satz: `Grundform, Krebs, Umkehrung und Krebsumkehrung liefern das Material jeder Zwoelftonkomposition.`

## Schritt 3 — entdecken

ENTDECKEN（1概念 + 1文字图解）：

中文：调性音乐是"君主制"：主音是国王，其他音是臣民，永远围着国王转。勋伯格 1921 年搞"民主革命"：十二个半音一律平等，谁也不许重复当王——写完十二个不同音才能开始第二轮，这就是音列。四种形态是同一基因的四张脸：原形从左读，逆行从右读，倒影上下翻（大跳变小跳方向反转），逆行倒影又倒又翻。听感上"怪"不是目的，目的是旧国王（调性）用烂了之后，新组织方式照样能统一全曲。

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
   Tonal: C(DO) = Koenig, alle anderen = Diener -> Kadenz
   Zwoelfton: 12 Toene gleich, Reihe = Verfassung
   Beispiel-Reihe (Zahlen 0-11):
   Grundform:       0  3  7  2  11  5  9  1  8  4  10  6
   Krebs (rueckw.): 6 10  4  8  1   9  5 11  2   7  3  0
   Umkehrung:       0  9  5 10   1  7  3 11  4   8  2  6
   Regel: kein Ton wiederholt, bevor alle 12 erklangen
```

Klausur-Satz: `Die Reihe garantiert Einheit ohne Tonika: Gleichheit statt Hierarchie.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Schoenberg erfand die Methode 1921 und hielt sie jahrelang geheim — er sagte Freunden nur, er habe etwas gefunden, das „die Vorherrschaft der deutschen Musik fuer die naechsten hundert Jahre" sichere. Sein Schueler Webern baute daraus haiku-kurze Stuecke von zwei Minuten, sein anderer Schueler Berg schmuggelte heimlich Romantik (sogar Bach-Choral-Zitate) in die strenge Reihe.

**中文解读**: 勋伯格保密多年，夸口"保德国音乐领先百年"；大弟子韦伯恩把音列写成两分钟俳句，二弟子贝尔格偷偷往序列里藏巴赫圣咏。中国学生记住"一严一偷"：同一技术可极简可浪漫，论证"解放还是枷锁"时两面都有弹药。

**Bezug zum Konzept**: `Eine Technik, zwei Temperamente: Strenge befreit den einen und fesselt den anderen nie.`

## Schritt 4 — ausprobieren

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: zwoelfton]

AUFGABE中文导读：给一条六音示范行列，写出其逆行与倒影，并判断一段续写是否违反"十二音不重复"规则。

AUFGABE (analysieren, AFB II)：Gegeben ist die Reihenform $0$-$11$-$3$-$4$-$8$-$7$ (erste sechs Toene). Bilden Sie Krebs und Umkehrung und pruefen Sie, ob die Fortsetzung $...7$-$7$-$2$ zulaessig ist.

HILFE:
1. Schritt 1: Krebs durch Rueckwaertslesen: $7$-$8$-$4$-$3$-$11$-$0$.
2. Schritt 2: Umkehrung durch Spiegelung am Startton $0$: Intervalle $+11, +4, +1, +4, -1$ werden zu $-11, -4, -1, -4, +1$ (mod $12$): $0$-$1$-$9$-$8$-$4$-$5$.
3. Schritt 3: Wiederholungsregel: Ton $7$ direkt wiederholt ohne Durchlauf aller Zwoelf -> unzulaessig.

MUSTERLÖSUNG: Krebs lautet $7$-$8$-$4$-$3$-$11$-$0$, Umkehrung $0$-$1$-$9$-$8$-$4$-$5$. Die Fortsetzung mit sofort wiederholtem Ton $7$ verletzt die Grundregel, dass kein Ton vor vollstaendigem Reihendurchlauf wiederkehren darf; korrekt waere erst nach den restlichen sechs Toenen eine Wiederholung erlaubt (bzw. eine neue Reihenform).

Klausur-Satz: `Krebs liest die Zeit rueckwaerts, Umkehrung spiegelt den Raum der Intervalle.`

## Schritt 5 — ausprobieren

VERGLEICH辨别实验（双向辨析：调性眼 vs. 十二音眼）：

VERGLEICH: Waehle erst das Konzept — 【选概念】先听组织原则：(i) Tonal-Konzept（有主音、有终止式、有功能和声）还是 (ii) Reihen-Konzept（无主音、音列统一、四形态循环）—— dann einordnen.

AUFGABE A：Ein Stueck endet mit autentischer Kadenz Dominante-Tonika in C-Dur. Welches Konzept?
AUFGABE B：Ein Stueck nutzt nur Grundform, Krebs, Umkehrung, Krebsumkehrung einer Reihe. Welches Konzept?

HILFE: A zeigt Tonika plus Kadenz -> Konzept (i). B zeigt Reihenformen ohne Zentrum -> Konzept (ii).【选概念：题干出现 Kadenz / Tonika / Dominante 选调性；出现 Reihe / Krebs / Umkehrung / kein Zentrum 选十二音。】

ANTWORT: A erfordert Konzept (i): tonale Hierarchie mit Schlusskadenz. B erfordert Konzept (ii): Reiheneinheit ohne Hierarchie, erkennbar an den vier Formen.

Klausur-Satz: `Kadenz verrät Tonalitaet, Reihenform verrät Zwoelftontechnik.`

## Schritt 6 — check

CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Was ist die Grundregel der Reihe? | ANTWORT: Alle zwoelf Toene erklingen gleichberechtigt, keiner wiederholt sich vor dem Durchlauf.
FRAGE: Wie entstehen Krebs und Umkehrung? | ANTWORT: Krebs liest rueckwaerts, Umkehrung spiegelt Intervalle, kombinierbar.
FRAGE: Wer gehoert zur Zweiten Wiener Schule? | ANTWORT: Schoenberg, Berg, Webern.

Klausur-Satz: `Ohne Reihe keine Einheit: Die Form ersetzt die fehlende Tonika.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"十二音就是随机乱弹，越难听越现代"。
   中文纠偏：音列是全曲最严的组织者，每音皆有出处，比调性音乐更不自由。难听是听惯调性的耳朵问题，不是作曲方法问题。
   Korrektur-Satz: `Zwoelftonmusik ist strenger organisiert als viele tonale Musik, nicht freier.`

2. 误解"逆行就是倒影，反正都是变形"。
   中文纠偏：逆行翻时间（从右读），倒影翻空间（上下镜像），考试各占一分。混用等于把"倒带"和"照镜子"说成一回事。
   Korrektur-Satz: `Krebs kehrt die Zeit um, Umkehrung spiegelt die Intervalle.`

## Schritt 7 — szenario

ROLLE: Du schreibst das Programmheft zum Schulkonzert mit Webern-Miniatur.
SITUATION: Das Publikum fuerchtet „modernen Laerm", die Musiklehrerin will Verstaendnis wecken.
AUFGABE: Erklaeren Sie in ca. 150 Woertern Reihe plus eine Reihenform am Beispiel und urteilen Sie: Befreiung oder Fessel?
RUBRIC (30 XP): Reihe plus Regel korrekt (10 XP) | Eine Form demonstriert (10 XP) | Urteil Befreiung/Fessel mit Begruendung (10 XP).

## Schritt 8 — entdecken

TAKEAWAY 1盒（核心总结）：

中文：十二音一句话：废主音、立音列、走四形。君主（调性）倒了，宪法（音列）来统。逆行倒着读，倒影翻着唱。答题先判有无终止式，再找四形态。解放派弹药：新统一；枷锁派弹药：听感代价。
Takeaway-Satz: `Gleichheit statt Krone: Die Reihe regiert, wo die Tonika abdankte.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Reihenformen bilden (Schritt 4) oder die Konzeptwahl tonal gegen Reihe (Schritt 5)?
2. 元认知计划：Beim naechsten Mal nummeriere ich die Reihe zuerst 0 bis 11, bevor ich Formen bilde.
