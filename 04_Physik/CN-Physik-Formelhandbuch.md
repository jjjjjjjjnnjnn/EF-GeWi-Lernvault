---
fach: Physik
thema: "CN Formelhandbuch"
operatoren: []
klausurrelevant: true
datum: 2026-09-23
tags: [EF, Physik, CN]
---

# CN-Physik-Formelhandbuch (中德英三语公式手册·EF力学+场)

> 中文一句话理解：中国方法重“先列公式再代数”，德国 Klausur 重“ Ansatz + Einheit + Bewertung ”，本手册把同一公式写成三语对照，公式背中文口诀，考试写德语步骤。
>
> EN one-liner: Same formula, three languages: memorize the logic in Chinese, write the solution in German, check the meaning in English.
>
> Lesson v3（9步制）导航：1 ZIELE → 2 PRETRAINING → 3 BEISPIEL → 4 中文讲一遍 → 5 争议/辨析 → 6 Klausur-Sätze → 7 VERGLEICH → 8 FEHLVORSTELLUNG + check/ANTWORT → 9 TAKEAWAY + REFLEXION。对齐 00_META/Lernmethoden-Evidenz.md §6–§9。

## ZIELE: 本课学完能… (3条)

- [ ] 能默写 EF 六组核心公式并说出每字母含义与单位（Operator：darstellen）
- [ ] 能用能量或动量守恒选 Ansatz 并带单位算出结果（Operator：berechnen）
- [ ] 能判断公式适用条件并用一句话评价结果合理性（Operator：beurteilen）

## PRETRAINING: 术语盒 (Mayer pre-training，先词后课)

中文在上：先认表再看公式，做题前遮住中文自测一遍。EN in last column for quick check.

| Deutsch | 中文 | EN + 一句话释义 |
|---|---|---|
| die Strecke s (m) | 路程/位移 | distance / displacement: 运动走过的量，EF 用 m |
| die Geschwindigkeit v (m/s) | 速度 | velocity: 单位时间走多远 |
| die Beschleunigung a (m/s^2) | 加速度 | acceleration: 速度变化快慢 |
| die Kraft F (N) | 力 | force: 改变运动状态的原因，1 N = 1 kg m/s^2 |
| die Energie E (J) | 能量 | energy: 做功的能力，1 J = 1 N m |
| der Impuls p (kg m/s) | 动量 | momentum: 运动的“冲量存量”，p = m v |
| die Kreisfrequenz omega (1/s) | 角速度 | angular velocity: 转得多快 |
| die Feldstaerke (N/kg, N/C) | 场强 | field strength: 单位质量/电荷受的力 |

德语小结：`Ohne Ansatz mit Formel und Einheit gibt es keine volle Punktzahl.`
EN note: No formula plus unit, no full marks.

## BEISPIEL: 正确例题 (worked example，先例后题)

- 例题（题干，自编）：小车质量 2,0 kg，从 3,0 m 高的光滑斜面静止滑下，求到底端速度（g = 10 m/s^2，自编数）。
- 正确解法（分步，每步注规则）：
  - Schritt 1（规则：先选守恒再列式）：光滑无摩擦，机械能守恒，`m g h = (1/2) m v^2`。
  - Schritt 2（规则：代数化简再代入）：约掉 m，得 $v = \sqrt{2gh}$，代入 $v = \sqrt{2 \cdot 10 \cdot 3,0} \approx 7,7 \, \mathrm{m/s}$。
  - Schritt 3（规则：单位加评价）：单位 m/s 正确，7,7 小于自由落体同高度值？相等，合理，因为同属能量守恒。
- 新题（同类，独立做，见下方 check）：把高度换成 5,0 m，自己算一遍。

## 1. 中文讲一遍 (Feynman)

中文在上，德语复述在下，EN 关键词句尾补充。三语对照，公式全部自写推导说明，不抄任何教材原文。

### A. 运动学 Kinematik / 运动学 / kinematics

- 匀速：路程 = 速度 × 时间，$s = v \cdot t$。DE: gleichfoermige Bewegung. EN: uniform motion.
- 匀加速（初速 v0）：$v = v_0 + a t$，$s = v_0 t + \frac{1}{2} a t^2$，无时间公式 $v^2 - v_0^2 = 2 a s$（由前两式消 t 自推）。
- 自由落体即竖直匀加速，a = g：$h = \frac{1}{2} g t^2$，$v = g t$。
- 德语复述：`Bei gleichmaessig beschleunigter Bewegung ohne Anfangsweg gilt s gleich ein halb a t Quadrat.`
- EN: For constant acceleration from rest, distance grows with time squared.

### B. 受力 Kräfte / 受力 / forces

- 牛顿第二定律：$F = m \cdot a$（合外力=质量×加速度）。DE: resultierende Kraft. EN: net force.
- 重力：$F_G = m \cdot g$。摩擦力：$F_R = \mu \cdot F_N$（mu 为摩擦系数，FN 为正压力）。
- 胡克定律（弹簧）：$F = D \cdot s$（D 为劲度系数，s 为形变量）。
- 德语复述：`Die resultierende Kraft ist gleich Masse mal Beschleunigung.`
- EN: Net force equals mass times acceleration.

### C. 能量 Energie / 能量 / energy

- 动能：$E_{kin} = \frac{1}{2} m v^2$。重力势能：$E_{pot} = m g h$。弹性势能：$E_{spann} = \frac{1}{2} D s^2$。
- 功：$W = F \cdot s \cdot \cos\alpha$（alpha 为力与位移夹角）。功率：$P = W / t = F \cdot v$（匀速共线时）。
- 机械能守恒（只有重力/弹力做功）：$E_{pot} + E_{kin} = \text{const}$。
- 德语复述：`Ohne Reibung bleibt die Summe aus Lage- und Bewegungsenergie erhalten.`
- EN: Without friction, mechanical energy is conserved.

### D. 动量 Impuls / 动量 / momentum

- 定义：$p = m \cdot v$。冲量：$I = F \cdot \Delta t = \Delta p$（动量定理）。
- 一维碰撞动量守恒（无外冲量）：$m_1 v_1 + m_2 v_2 = m_1 v_1' + m_2 v_2'$。
- 弹性碰撞额外守恒动能，完全非弹性碰撞碰后共速、机械能损失最大。
- 德语复述：`Ohne aeussere Kraefte bleibt der Gesamtimpuls erhalten.`
- EN: Without external impulse, total momentum is conserved.

### E. 圆周 Kreisbewegung / 圆周运动 / circular motion

- 线速度与角速度：$v = \omega \cdot r$。周期频率：$\omega = 2\pi / T = 2\pi f$。
- 向心力（指向圆心，合力提供）：$F_z = m \cdot v^2 / r = m \cdot \omega^2 \cdot r$。
- 万有引力：$F = G \cdot m_1 m_2 / r^2$。开普勒第三定律：$T_1^2 / T_2^2 = a_1^3 / a_2^3$。
- 德语复述：`Die Zentripetalkraft zeigt zum Kreismittelpunkt und wird von der resultierenden Kraft gestellt.`
- EN: Centripetal force points to the center and is provided by the net force.

### F. 场 Felder / 场 / fields (EF 展望，Q1 衔接)

- 引力场强：$g = F / m$（单位 N/kg）。电场强度定义：$E = F / q$（单位 N/C）。
- 匀强电场中电荷受力：$F = q \cdot E$。点电荷场可类比万有引力写法（EF 只记类比，不深算）。
- 德语复述：`Die Feldstaerke gibt die Kraft pro Ladung beziehungsweise pro Masse an.`
- EN: Field strength means force per charge or per mass.

## 2. 争议/辨析 (MINT: Fehlvorstellungen)

### Pro / 常见正确理解

- 公式是 Ansatz 不是答案：先写字母式再代入，字母式对了就有步骤分。
- 守恒先问条件：无摩擦看能量，无外冲量看动量，圆周先找谁提供向心力。

### Contra / 典型错概念

- 背公式不背条件：把 $mgh = mv^2/2$ 用在有摩擦斜面，丢了摩擦做功项。
- 向心力当成额外受力：受力图多画一个“向心力箭头”，实际上它是合力的名字。

### Stellungnahme-Satz (beurteilen)

- `Obwohl die Energieformel kurz ist, gilt sie nur ohne Reibung, daher wird zuerst die Bedingung geprueft und dann der Ansatz gewaehlt.`
- EN version: Although the formula is short, it holds only without friction, so check the condition first.

## 3. 德语 Klausur-Sätze (用Operatoren)

- `Gegeben sind m gleich 2,0 kg und h gleich 3,0 m, gesucht ist v; mit dem Ansatz der Energieerhaltung folgt v gleich Wurzel aus 2 g h.`
- `Die resultierende Kraft wird aus Masse und Beschleunigung mit F gleich m mal a berechnet und mit Newton angegeben.`
- `Der Gesamtimpuls bleibt erhalten, weil keine aeusseren Kraefte wirken, daher gilt p vorher gleich p nachher.`
- `Die Zentripetalkraft wird von der angegebenen Kraft gestellt, weil nur die resultierende Kraft die Kreisbahn erzwingt.`
- `Das Ergebnis wird beurteilt, weil Einheit und Groessenordnung zur Alltagserfahrung passen muessen.`

## 4. Fachbegriffe (进Anki)

| Deutsch | Chinesisch | Beispielsatz |
|---|---|---|
| die resultierende Kraft | 合力 | Die resultierende Kraft bestimmt die Beschleunigung. |
| die Erhaltung | 守恒 | Ohne Reibung gilt die Erhaltung der mechanischen Energie. |
| die Zentripetalkraft | 向心力 | Die Zentripetalkraft zeigt zum Mittelpunkt. |
| die Feldstaerke | 场强 | Die Feldstaerke gibt Kraft pro Ladung an. |
| die Groessenordnung | 数量级 | Die Groessenordnung des Ergebnisses wird geprueft. |

## 5. Quelle / Aufgabe

- LEIFI Grundwissen (nur paraphrasiert, nichts kopiert): https://www.leifiphysik.de/ und Mechanik-Pfad gleichfoermige/beschleunigte Bewegung.
- PhET Simulationen (frei, nur als Experiment-Anschauung): https://phet.colorado.edu/sims
- Lehrplan-Anker: `04_Physik/Lehrplan.md` Abschnitt 1–2 (Mechanik + Kreis/Gravitation).
- Stil-Abgrenzung: `04_Physik/Formel-Spickzettel.md` (knappe Liste dort, hier mit CN-Merklogik + Bedingungen), `04_Physik/Physik-IQB-EF-Training.md` (Diagramme dort, Formeln hier).

## 6. Lernreise

- `Lernreise/Physik-Formeln-L1.md`（待建，本篇为唯一课程源候选，只读消费）

## 7. Fehlerlog

- [ ] Sechs Formelgruppen je einmal auswendig aufschreiben, Fehler in `Klausur-Training/Fehlerlog.md` sammeln (falls vorhanden).

## VERGLEICH: 对比/辨别实验 (interleaving + discrimination)

- A题（能量守恒）：光滑、无摩擦、问速度与高度关系，用 $E_{pot} + E_{kin} = \text{const}$。
- B题（动量守恒）：碰撞、爆炸、反冲、问碰后速度，用 $p_{vorher} = p_{nachher}$。
- 二选程序（先选再做）：“这题用哪个？因为题干说光滑下滑所以选A，因为题干说两车相撞所以选B。”
- 一句话区别（A vs B）：A 管一个物体不同位置的能量转换，B 管多个物体相互作用前后的总量不变。
- EN: Energy tracks one object over positions, momentum tracks many objects before and after interaction.

## FEHLVORSTELLUNG: 常见误解 + 纠偏

- 误解1：公式越多越好，见题就套 → 纠偏：先写已知未知再选一个 Ansatz，因为 Ansatz 错则全错（正确：条件定公式）。
- 误解2：向心力是多出来的力 → 纠偏：它是合力的别名，因为圆周运动需要合力指向圆心（正确：受力图不单独画它）。

## check / ANTWORT (TAP：题目格式 ≈ Klausur 格式)

- Aufgabe (Klausur-format, mit Operator)：Stelle die Energieerhaltung fuer den Wagen aus dem BEISPIEL dar, berechne v fuer h gleich 5,0 m mit Ansatz und Einheit, und beurteile die Groessenordnung.
- Antwort (合书先写)：
- KR（对/错）：
- Korrektur + 错因归类（辨别错 / 知识错 / 表达错）：重点查字母式、单位、weil 句是否完整。

## TAKEAWAY: 1盒总结

> 条件定公式，字母式先行，单位跟到底，守恒看条件，圆周找提供。`Bedingung waehlt Ansatz, Formel mit Einheit, Ergebnis mit Urteil.`

## REFLEXION: 2问 (一过程 + 一元认知)

1. 过程（assisted自解释）：这道题关键一步用了哪个规则？因为…所以…
2. 元认知：哪里最卡/最易混？因为…所以下次先…
