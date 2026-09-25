---
fach: Bio
thema: "Enzymaktivitaet und Einflussfaktoren"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, auswerten, erklaeren]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Bio, Zellbiologie]
version: Lesson-v3
---

# Lernreise: Enzymaktivitaet und Einflussfaktoren (L1, Ziel Klausur)

<!-- Lesson v3 9步制架构：Schritt 1至8固定结构；Fehlvorstellung 夹在 Schritt 6 与 7 之间（Parser 自动跳过，不占步数）；支持内嵌 [Werkzeug: <id>] 交互教具；Gating: check/szenario 未过 = Weiter 置灰；XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能说清酶的三条底层事实——本质多为蛋白质、降低活化能、不被反应消耗，并指出酶不改变平衡位置。
2. 中文：能读温度-pH 曲线：分段描述走向、指认最适点、用 RGT-Regel 解释升段、用 Denaturierung 解释降段。
3. 中文：能按 AFB II 用德语写出一句含 weil...deshalb 的因果链，并严格区分 Hemmung（可逆）与 Denaturierung（不可逆）。

Klausur-Satz: `Enzyme senken als Biokatalysatoren die Aktivierungsenergie, besitzen ein Temperatur- und ein pH-Optimum und werden dabei nicht verbraucht.`

## Schritt 2 — entdecken

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 酶 — Enzym：多为蛋白质的生物催化剂，只改速率、不改反应方向与平衡位置。
- 活化能 — Aktivierungsenergie：反应启动所需的最低能量，酶的作用正是把它压低。
- 活性中心 — aktives Zentrum：酶上与底物形状互补的特定区域，是专一性的结构基础。
- 变性 — Denaturierung：高温或极端 pH 破坏三级结构，活性不可逆丧失。
- 最适温度 — Temperaturoptimum：酶活性最高的温度，人体酶多在约 37 °C 附近。

Klausur-Satz: `Unterhalb des Optimums steigt die Reaktionsgeschwindigkeit nach der RGT-Regel, oberhalb des Optimums führt die Denaturierung zu einem steilen Abfall.`

## Schritt 3 — entdecken

ENTDECKEN（1概念 + 1文字图解）：

中文：酶的工作像一把锁配一把钥匙——底物嵌进活性中心，形成酶-底物复合物，反应能垒被压低，产物生成后酶原样退出，所以它不被消耗。温度是影响速率的第一把刀，但它两面都砍：在最适点以下，升温让分子动能变大、有效碰撞变多，速率按 RGT-Regel 大约每升 10 °C 翻一倍，曲线陡升；越过最适点后，高温扯断维持三级结构的氢键和离子键，活性中心变形，底物再也嵌不进去，速率骤降且不可逆，这就是 Denaturierung。pH 同理：每种酶有自己最适 pH（胃蛋白酶约 pH 2，胰蛋白酶约 pH 8），偏离会改变活性中心侧链的电荷状态，结合变差，极端时同样变性。读曲线永远三段走：升段说 RGT，峰顶说 Optimum，降段说 Denaturierung + irreversibel。

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
   Reaktions-
   geschwindigkeit
        ^
        |            .-- Optimum
        |          .'   '.
        |        .'       '.
        |      .'  RGT-     '.  Denaturierung
        |    .'    Regel      '.  (irreversibel)
        |  .'                    '.
        |.'                        '.
        +------------------------------> Temperatur
         10   20   30   40   50   60   70  [°C]
                         ^
                    Temperaturoptimum (ca. 37-40 °C)

   pH-Kurve: glockenförmig, Peak = pH-Optimum
   Pepsin  ca. pH 2   |   Trypsin  ca. pH 8
```

Klausur-Satz: `Der Anstieg der Kurve folgt der RGT-Regel, der steile Abfall nach dem Optimum beruht auf der irreversiblen Denaturierung des aktiven Zentrums.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Hohes Fieber ist lebensgefährlich, sobald die Körpertemperatur über etwa 42 °C steigt. Der Grund ist nicht die Wärme selbst, sondern die Denaturierung der körpereigenen Enzyme: Ihre Tertiärstruktur wird zerstört, das aktive Zentrum verliert seine Form. Unterhalb dieser Grenze kann Fieber dagegen die Abwehrreaktionen des Körpers beschleunigen.

**中文解读**: 高烧的危险不在“热”本身，而在于超过约 42 °C 后体内酶的三级结构被破坏、活性中心变形且不可逆。这正好把温度曲线的降段与变性，放进每个人都会经历的生理场景里。

**Bezug zum Konzept**: `Zu hohes Fieber führt zur Denaturierung der körpereigenen Enzyme und damit zu einem irreversiblen Verlust der Aktivität.`

## Schritt 4 — ausprobieren

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: balance]

AUFGABE (auswerten und erklären, AFB II)：In einem Versuch wird die Aktivität eines menschlichen Verdauungsenzyms bei Temperaturen von 10 °C bis 70 °C gemessen. Die Reaktionsgeschwindigkeit steigt bis 40 °C stark an, erreicht dort ihr Maximum und fällt danach steil ab; bei 70 °C ist keine Aktivität mehr messbar. Werten Sie den Kurvenverlauf aus und erklären Sie Anstieg und Abfall.

HILFE:
1. Schritt 1: Werte zuerst aus (Operator auswerten): beschreibe die drei Abschnitte und nenne die Zahlenwerte des Anstiegs und des Maximums.
2. Schritt 2: Erkläre den Anstieg mit der RGT-Regel — mehr kinetische Energie, häufigere wirksame Zusammenstöße.
3. Schritt 3: Erkläre den Abfall mit der Denaturierung — Zerstörung der Tertiärstruktur, Formänderung des aktiven Zentrums, Substrat kann nicht mehr binden.

MUSTERLÖSUNG: Die Kurve verläuft dreiphasig: Von 10 °C bis 40 °C steigt die Aktivität nahezu exponentiell an, bei 40 °C liegt das Temperaturoptimum, danach fällt sie steil ab und erreicht bei 70 °C den Wert null. Der Anstieg folgt der RGT-Regel: Mit steigender Temperatur nimmt die kinetische Energie der Moleküle zu, sodass es häufiger zu wirksamen Zusammenstößen zwischen Enzym und Substrat kommt und die Reaktionsgeschwindigkeit steigt. Der Abfall nach dem Optimum beruht auf der Denaturierung: Die hohe Temperatur zerstört die Wasserstoffbrücken und Ionenbindungen der Tertiärstruktur, wodurch das aktive Zentrum seine Form verändert; das Substrat kann nicht mehr binden. Diese Denaturierung ist irreversibel, deshalb ist bei 70 °C keine Aktivität mehr messbar.

Klausur-Satz: `Oberhalb des Temperaturoptimums verändert die Denaturierung die Form des aktiven Zentrums irreversibel, sodass die Reaktionsgeschwindigkeit trotz weiter steigender Temperatur sinkt.`

## Schritt 5 — ausprobieren

VERGLEICH辨别实验（双向辨析：升段眼 vs. 降段眼）：

VERGLEICH: Wähle erst das Verfahren — 【选程序】先判断题目给出的温度变化落在曲线的哪一侧：左侧走 (i) RGT-Verfahren（升温 → 分子动能升 → 有效碰撞多 → 速率升），右侧走 (ii) Denaturierungs-Verfahren（高温 → 三级结构破坏 → 活性中心变形 → 速率降，不可逆）—— dann lösen.

AUFGABE A：Ein Enzym wird von 20 °C auf 30 °C erwärmt; die Reaktionsgeschwindigkeit steigt deutlich an. Welches Verfahren ist zu wählen, und wie lässt sich der Vorgang erklären?

AUFGABE B：Dasselbe Enzym wird von 50 °C auf 60 °C erwärmt; die Reaktionsgeschwindigkeit sinkt stark ab. Welches Verfahren ist zu wählen, und wie lässt sich der Vorgang erklären?

HILFE: A liegt eindeutig unterhalb des Optimums, die Temperaturerhöhung wirkt positiv → Verfahren (i). B liegt oberhalb des Optimums, die Temperaturerhöhung wirkt zerstörend → Verfahren (ii).【选程序：先问曲线处于最适点哪一侧——左侧用 RGT，右侧用 Denaturierung；同一句"升温"在两侧含义完全相反。】

ANTWORT: A erfordert Verfahren (i): Da die Temperatur noch unterhalb des Optimums liegt, erhöht die Erwärmung die kinetische Energie der Moleküle; die Zahl der wirksamen Zusammenstöße zwischen Enzym und Substrat steigt und damit auch die Reaktionsgeschwindigkeit. B erfordert Verfahren (ii): Oberhalb des Optimums zerstört die zusätzliche Wärmeenergie die Wasserstoffbrücken und Ionenbindungen der Tertiärstruktur; das aktive Zentrum verliert seine Form, das Substrat kann nicht mehr binden und die Aktivität sinkt — die Denaturierung ist irreversibel, sodass eine Abkühlung die Aktivität nicht wiederherstellt.

Klausur-Satz: `Dieselbe Temperaturerhöhung beschleunigt die Reaktion unterhalb des Optimums nach der RGT-Regel, zerstört das Enzym jedoch oberhalb des Optimums durch Denaturierung.`

## Schritt 6 — check

CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Warum verändert ein Enzym die Lage des chemischen Gleichgewichts einer Reaktion nicht? | ANTWORT: Weil es nur die Aktivierungsenergie senkt und damit die Reaktionsgeschwindigkeit erhöht, nicht aber die Energie der Edukte und Produkte; das Gleichgewicht bleibt unverschoben.
FRAGE: Was besagt die RGT-Regel und in welchem Bereich gilt sie? | ANTWORT: Sie besagt, dass die Reaktionsgeschwindigkeit bei einer Temperaturerhöhung um 10 °C etwa auf das Doppelte steigt; sie gilt nur unterhalb des Temperaturoptimums.
FRAGE: Worin unterscheiden sich eine kompetitive Hemmung und eine Denaturierung grundsätzlich? | ANTWORT: Die kompetitive Hemmung ist reversibel, weil der Hemmstoff das aktive Zentrum nur besetzt und durch mehr Substrat verdrängt werden kann; die Denaturierung ist irreversibel, weil die Tertiärstruktur des Enzyms zerstört wird.

Klausur-Satz: `Während die kompetitive Hemmung reversibel ist, beruht die Denaturierung auf einer irreversiblen Zerstörung der Tertiärstruktur.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"酶在高温下只是暂时睡着，降温就会恢复"。
   中文纠偏：恰恰相反。高温破坏的是酶的三级结构，这是结构性损坏，不是暂停。活性中心一旦变形就回不去了，降温也只能得到一个仍被破坏的酶。只有可逆抑制（如竞争性抑制）才可能通过移除条件恢复。
   Korrektur-Satz: `Die Denaturierung ist irreversibel, da die Tertiärstruktur und damit das aktive Zentrum dauerhaft zerstört werden; eine Abkühlung stellt die Aktivität nicht wieder her.`

2. 误解"RGT-Regel 说明温度越高酶促反应越快"。
   中文纠偏：把结论无限放大了。RGT-Regel 只在最适温度以下成立，它描述的是升温对碰撞频率的促进。越过最适点后，变性带来的破坏压过升温的促进，曲线必然掉头向下。所以"越热越快"是伪规律，正确说法是"最适点以下越快，以上越慢"。
   Korrektur-Satz: `Die RGT-Regel gilt nur unterhalb des Temperaturoptimums; darüber überwiegt die Denaturierung, sodass die Reaktionsgeschwindigkeit wieder sinkt.`

## Schritt 7 — szenario

ROLLE: Du bist Referent in einem Schullabor und hältst einen Kurzvortrag für jüngere Schülerinnen und Schüler.
SITUATION: Ein Waschmittelhersteller wirbt damit, dass sein Pulver "schon bei 30 °C" wirkt, während ein älteres Produkt erst bei 60 °C optimale Leistung zeigt. In beiden Produkten stecken Proteasen, also Eiweiß spaltende Enzyme. Erkläre in einer zusammenhängenden Stellungnahme (ca. 150 Wörter), warum ein modernes Waschmittel auf ein niedrigeres Temperaturoptimum optimiert wird und was bei 60 °C mit den Enzymen geschieht.
RUBRIC (30 XP): Benennung des Temperaturoptimums als Anpassung an den Einsatzbereich (5 XP) | Erklärung der Wirkungssteigerung unterhalb des Optimums mit der RGT-Regel (8 XP) | Erklärung der Denaturierung oberhalb des Optimums mit Bezug auf die Tertiärstruktur und das aktive Zentrum (10 XP) | Kausale, fachsprachlich korrekte Stellungnahme mit den Fachbegriffen Denaturierung und irreversibel (7 XP).

## Schritt 8 — entdecken

TAKEAWAY 1盒（核心总结）：

中文：酶是压低能垒的催化剂，不被消耗也不改平衡。温度曲线永远三段：升段是 RGT-Regel（最适点以下才成立），峰顶是最适温度，降段是 Denaturierung 且不可逆。pH 曲线同构，峰即最适 pH。做题先定位曲线在哪一侧，再决定用"促进"还是"破坏"那套语言；只要写下降段，就必须出现 Denaturierung + irreversibel。
Takeaway-Satz: `Die Enzymaktivität ist temperaturabhängig: Unterhalb des Optimums beschleunigt die RGT-Regel die Reaktion, oberhalb zerstört die irreversible Denaturierung das aktive Zentrum.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — das Auswerten des Kurvenverlaufs mit Zahlenwerten (Schritt 4) oder die Unterscheidung von RGT-Regel und Denaturierung je nach Kurvenseite (Schritt 5)?
2. 元认知计划：Beim nächsten Mal prüfe ich zuerst, auf welcher Seite des Optimums die angegebene Temperatur liegt, und wähle danach die Erklärung.
