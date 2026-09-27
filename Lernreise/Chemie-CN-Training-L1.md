---
fach: Chemie
thema: "CN-Training: Zeitlimit und EHZ-Selbstbewertung"
level: 1
ziel: Klausur
xp: 100
operatoren: [darstellen, berechnen, bestimmen, auswerten]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Chemie, CN]
version: Lesson-v3
---

# Lernreise: CN-Training mit Zeitlimit und EHZ (L1, Ziel Klausur)

<!-- Lesson v3 9步制架构：Schritt 1至8固定结构；Fehlvorstellung 夹在 Schritt 6 与 7 之间（Parser 自动跳过，不占步数）；支持内嵌 [Werkzeug: <id>] 交互教具；Gating: check/szenario 未过 = Weiter 置灰；XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能在限时条件下按"配平 → 系数比 → 带单位计算 → 量级检查"一条链完成四类基础题。
2. 中文：能用 Erwartungshorizont (EHZ) 给自己的答案逐点打分，找出丢分的那一步。
3. 中文：能把每道题的最后一步写成德语 Transfer-Satz，达到 AFB II 作答标准。

Klausur-Satz: `Gleichung, Verhältnis, Einheit und Prüfung – jeder Schritt trägt Punkte.`

## Schritt 2 — entdecken

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 配平 — ausgleichen：只改系数，不改下标，改完数一遍原子数。
- 期望视界 — der Erwartungshorizont (EHZ)：评分点清单，每步对应若干分。
- 物质的量 — die Stoffmenge n：连接质量、粒子数与浓度的中心枢纽。
- 观察与解释分离 — Trennung von Beobachtung und Deutung：先描述现象，再用规则解释。
- 迁移句 — der Transfer-Satz：把结论翻成德语 Klausur 句。

Klausur-Satz: `Beobachtung und Deutung werden getrennt: Zuerst wird das Phänomen beschrieben, dann mit der Regel erklärt.`

## Schritt 3 — entdecken

ENTDECKEN（1概念 + 1文字图解）：

中文：限时训练的目的不是"做对"，而是"在时间压力下按评分点写全"。德国 Klausur 给分极细，EHZ（Erwartungshorizont）会把一道题拆成若干采分点：方程式骨架、系数、单位、量级检验各占分数。所以做题必须走固定链：配平方程式 → 读出系数比（= 摩尔比）→ 用 n = m/M 等公式带单位计算 → 最后做量级检查并写一句德语迁移句。下面四道自编题覆盖配平、摩尔、氧化还原、pH 四类基础，每道都附 EHZ 采分点和德语检验句；给自己限时 20 分钟，做完按 EHZ 逐点自查，丢分的那一步就是你的 Fehlerlog 条目。

**Aufgabe 1 Ausgleichen（darstellen）**：Gleiche aus: Al + HCl -> AlCl3 + H2.
解：2 Al + 6 HCl -> 2 AlCl3 + 3 H2；检验 Al 2:2, H 6:6, Cl 6:6。
EHZ (4 分)：骨架正确 1 + 系数 Al/HCl 2 + 系数 AlCl3/H2 与计数检验 1。
德语检验句：`Die Gleichung ist richtig ausgeglichen, weil die Atomanzahl jedes Elements auf beiden Seiten gleich ist.`

**Aufgabe 2 Mol-Rechnung（berechnen/auswerten）**：4,4 g Kohlenstoffdioxid (CO2, M = 44 g/mol) liegen vor. Berechne n und V im Standardzustand (V_m = 22,4 L/mol).
解：n = 4,4 / 44 = 0,10 mol；V = 0,10 * 22,4 = 2,24 L。
EHZ (5 分)：n 公式+单位 2 + V 计算 1 + 量级评价（约 2 L 量级，合理）1 + 德语句 1。
德语检验句：`Mit n = m/M und dem molaren Volumen folgt V(CO2); die Größenordnung entspricht etwa einer 2-L-Flasche.`

**Aufgabe 3 Redox（bestimmen/begruenden）**：2 Na + Cl2 -> 2 NaCl. Bestimme die Oxidationszahlen und benenne Oxidations- sowie Reduktionsmittel.
解：Na 0 -> +1（升，失电子，还原剂）；Cl 0 -> -1（降，得电子，氧化剂）；电子数 2:2 守恒。
EHZ (5 分)：氧化数 2 + 试剂命名 2 + 电子守恒论证 1。
德语检验句：`Natrium wird oxidiert und ist das Reduktionsmittel, Chlor wird reduziert und ist das Oxidationsmittel.`

**Aufgabe 4 pH-Wert（berechnen）**：Eine Salzsäurelösung hat c0 = 0,002 mol/L. Berechne den pH-Wert.
解：HCl 完全电离 → [H3O+] = 2,0 * 10^-3 mol/L；pH = -lg(2,0 * 10^-3) = -(0,30 - 3) = 2,70。
EHZ (4 分)：完全电离判断 1 + 代入对数式 2 + 结果与单位 1。
德语检验句：`Da Salzsäure vollständig dissoziiert, gilt [H3O+] = c0, und der pH-Wert beträgt 2,70.`

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
  ZEITLIMIT 20 min  --->  FESTE KETTE (jeder Schritt = Punkte)
  ----------------------------------------------------------
  1. Gleichung aufstellen / ausgleichen    [EHZ 1-2 P]
  2. Koeffizientenverhaeltnis ablesen      [EHZ 1 P]
  3. n = m/M  (Einheiten mitfuehren!)      [EHZ 2 P]
  4. Zielgroesse (V, pH, ...) berechnen    [EHZ 1-2 P]
  5. Groessenordnungspruefung + DE-Satz    [EHZ 1 P]
  ----------------------------------------------------------
  Selbst-Check:  fehlt eine Einheit? fehlt die Pruefung?
```

Klausur-Satz: `Der Erwartungshorizont zeigt die Punkte pro Schritt, sodass jede Teilrechnung einzeln überprüft werden kann.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Im Jahr 1999 ging die NASA-Raumsonde Mars Climate Orbiter verloren. Die Ursache war kein technischer Defekt, sondern ein Einheitenfehler: Ein Team rechnete in metrischen Einheiten, ein anderes in amerikanischen Einheiten. Weil die Einheiten nicht durch alle Rechenschritte mitgeführt wurden, stimmte am Ende das Ergebnis nicht – ein einziger fehlender Schritt kostete die ganze Mission.

**中文解读**: 这正是本节"每一步都要带单位、每个采分点都算分"的现实版：哪怕公式正确，只要某一步的单位没有贯穿到底，整条链就会崩。做题时把单位写全，就是在给整道题保命。

**Bezug zum Konzept**: Ein einziger fehlender Einheitenschritt kann das gesamte Ergebnis unbrauchbar machen; deshalb trägt in der Klausur jeder Schritt Punkte.

## Schritt 4 — ausprobieren

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: formula]

AUFGABE (berechnen & auswerten, AFB II)：6,0 g Kohlenstoff (C, M = 12 g/mol) werden vollständig verbrannt: C + O2 -> CO2. Berechnen Sie die Stoffmenge und das Volumen des entstehenden Kohlenstoffdioxids im Standardzustand (V_m = 22,4 L/mol) und bewerten Sie die Größenordnung. Schreiben Sie am Ende einen deutschen Transfer-Satz.

HILFE:
1. Schritt 1: Prüfe, ob die Gleichung ausgeglichen ist (C + O2 -> CO2: C 1:1, O 2:2).
2. Schritt 2: Berechne n(C) = m/M.
3. Schritt 3: Nutze das Koeffizientenverhältnis (1:1) für n(CO2) und berechne V = n * V_m.
4. Schritt 4: Prüfe die Größenordnung und formuliere den Transfer-Satz.

MUSTERLÖSUNG: Die Gleichung C + O2 -> CO2 ist bereits ausgeglichen (C 1:1, O 2:2). Es gilt n(C) = m/M = 6,0 g / 12 g/mol = 0,50 mol. Da die Koeffizienten von C und CO2 beide 1 sind, folgt n(CO2) = 0,50 mol. Das Volumen im Standardzustand ist V(CO2) = n * V_m = 0,50 mol * 22,4 L/mol = 11,2 L. Die Größenordnung ist plausibel: Aus einer kleinen Portion Kohlenstoff entsteht ein Gasvolumen von etwa 11 L, was einem größeren Ballon entspricht. EHZ-Kontrolle: n-Formel mit Einheit (2 P), Koeffizientenverhältnis (1 P), V-Berechnung (1 P), Größenordnung (1 P). Transfer-Satz: Mit n = m/M und dem Stoffmengenverhältnis folgt das Volumen des Kohlenstoffdioxids; die Größenordnung entspricht etwa einem 11-L-Ballon.

Klausur-Satz: `Mit n = m/M und dem Koeffizientenverhältnis folgt die Stoffmenge des Produkts, und über das molare Volumen ergibt sich das Gasvolumen im Standardzustand.`

## Schritt 5 — ausprobieren

VERGLEICH辨别实验（双向辨析：摩尔眼 vs. pH 眼）：

VERGLEICH: Wähle erst das Verfahren — 【选程序】先判断题目给的是 (i) Mol-Verfahren（给了质量 m in g，要求 n 或 V）还是 (ii) pH-Verfahren（给了酸的浓度 c0，要求 pH）—— dann lösen.

AUFGABE A：2,2 g Kohlenstoffdioxid (CO2, M = 44 g/mol) liegen vor. Berechnen Sie die Stoffmenge und das Volumen im Standardzustand (V_m = 22,4 L/mol).

AUFGABE B：Eine Salzsäurelösung hat c0 = 0,002 mol/L. Berechnen Sie den pH-Wert.

HILFE: A gibt eine Masse und verlangt n bzw. V → Verfahren (i). B gibt eine Säurekonzentration und verlangt einen pH-Wert → Verfahren (ii).【选程序：题干给 g / 质量 = 摩尔程序（n = m/M 起步）；题干给酸浓度 c0 = pH 程序（先判强弱再取对数）。】

ANTWORT: A erfordert Verfahren (i): n(CO2) = m/M = 2,2 g / 44 g/mol = 0,050 mol. Damit ist V(CO2) = 0,050 mol * 22,4 L/mol = 1,12 L; die Größenordnung von etwa 1 L ist plausibel. B erfordert Verfahren (ii): Salzsäure ist eine starke Säure und dissoziiert vollständig, daher gilt [H3O+] = c0 = 2,0 * 10^-3 mol/L. Es folgt pH = -lg(2,0 * 10^-3) = -(0,30 - 3) = 2,70. Die beiden Verfahren greifen auf verschiedene Formelkarten zu: A nutzt n = m/M und das molare Volumen, B nutzt die logarithmische pH-Definition.

Klausur-Satz: `Das Mol-Verfahren führt über die Stoffmenge zur Gasmenge, während das pH-Verfahren direkt über den Logarithmus der Oxoniumionenkonzentration arbeitet.`

## Schritt 6 — check

CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Was gibt der Erwartungshorizont (EHZ) an? | ANTWORT: Er listet die Punkte pro Lösungsschritt auf, sodass jede Teilrechnung einzeln bewertet werden kann.
FRAGE: Warum muss vor jeder Stoffmengenrechnung die Gleichung ausgeglichen sein? | ANTWORT: Weil das Koeffizientenverhältnis das Stoffmengenverhältnis bestimmt; ohne Ausgleichen ist das Verhältnis falsch.
FRAGE: Warum darf man Beobachtung und Deutung nicht in einem Satz vermischen? | ANTWORT: Weil die Klausur eine klare Trennung verlangt: zuerst das Phänomen beschreiben, dann mit der Regel erklären.

Klausur-Satz: `Gleichung, Verhältnis, Einheit und Prüfung – jeder Schritt trägt Punkte.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"摩尔题可以跳过配平，直接按质量比算"。
   中文纠偏：质量比不等于摩尔比。只有在方程式系数比为 1:1 且摩尔质量相同时两者才偶然相等；一般情况下必须先用系数比换成摩尔比，再回到质量或体积。跳过配平是摩尔题最常见的失分点。
   Korrektur-Satz: `Massenverhältnisse sind nur über die Koeffizienten und die molaren Massen in Stoffmengenverhältnisse umzurechnen.`

2. 误解"把观察和解释写在同一句里更省时间"。
   中文纠偏：德国 Klausur 明确要求把 Beobachtung（看到了什么）与 Deutung（用规则解释）分开。混写会丢掉"论证结构"的分，尤其是实验题和 redox 题。标准写法是先写现象，再另起一句用规则解释。
   Korrektur-Satz: `Beobachtung und Deutung müssen getrennt dargestellt werden: zuerst das Phänomen, dann die Erklärung mit der Regel.`

## Schritt 7 — szenario

ROLLE: Du simulierst unter Zeitdruck eine EF-Klausur und bewertest dich anschließend selbst mit dem EHZ.
SITUATION: In 20 Minuten sind vier Aufgaben zu lösen: (1) Al + HCl -> AlCl3 + H2 ausgleichen; (2) aus 4,4 g CO2 (M = 44 g/mol) n und V im Standardzustand berechnen; (3) in 2 Na + Cl2 -> 2 NaCl Oxidations- und Reduktionsmittel bestimmen; (4) den pH-Wert einer Salzsäure mit c0 = 0,002 mol/L berechnen. Schreibe eine zusammenhängende Auswertung (ca. 150 Wörter), die deine Ergebnisse, die EHZ-Punkte pro Aufgabe und einen deutschen Transfer-Satz enthält.
RUBRIC (30 XP): Aufgabe 1 korrekt ausgeglichen 2 Al + 6 HCl -> 2 AlCl3 + 3 H2 (6 XP) | Aufgabe 2 n = 0,10 mol und V = 2,24 L mit Einheit (8 XP) | Aufgabe 3 Na als Reduktionsmittel, Cl als Oxidationsmittel mit Oxidationszahlen (8 XP) | Aufgabe 4 pH = 2,70 mit Begründung der vollständigen Dissoziation (8 XP).

## Schritt 8 — reflexion: Takeaway & Reflexion

TAKEAWAY 1盒（核心总结）：

中文：限时训练的核心是"按评分点写全"。四类基础题共用一条链——配平方程式 → 读系数比 → 带单位计算 → 量级检查 → 德语迁移句。做完立刻用 EHZ 逐点自查：缺单位、缺检验、缺理由，各扣一分，把丢分的那一步写进 Fehlerlog。记住两条：质量比必须经系数比换成摩尔比；观察与解释必须分开写。
Takeaway-Satz: `Gleichung, Verhältnis, Einheit und Prüfung – jeder Schritt trägt Punkte, und der EHZ macht sie sichtbar.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Stoffmengenrechnung unter Zeitdruck (Schritt 4) oder die Wahl zwischen Mol- und pH-Verfahren (Schritt 5)?
2. 元认知计划：Beim nächsten Mal notiere ich vor dem Rechnen die EHZ-Punkte und schreibe nach jedem Ergebnis sofort Einheit und Größenordnungsprüfung dazu.
