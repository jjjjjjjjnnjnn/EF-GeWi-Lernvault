---
fach: Bio
thema: "Signaltransduktion und Zell-Zell-Erkennung (信号转导与细胞识别)"
operatoren: [erklaeren, erlaeutern, begruenden, darstellen, analysieren, skizzieren]
klausurrelevant: true
datum: 2026-09-24
tags: [EF, Bio, Zellbiologie]
stufe: "EF"
kursart: "GK|LK"
---

# Signaltransduktion und Zell-Zell-Erkennung (信号转导与细胞识别)

> **中文理解**：信号转导（Signaltransduktion）是 EF 唯一 IF「Zellbiologie」中 `Biochemie der Zelle` 的明文条目——KLP 原文写作 `Biomembranen: Transport, Prinzip der Signaltransduktion, Zell-Zell-Erkennung` [已验证，Bio-Oberstufe.md §2 IF1]。它是细胞之间「对话」的分子基础：信号分子结合受体 → 级联放大 → 细胞响应。
>
> **Klausur-Relevanz**：它是 EF→Q **Neurobiologie** 的**两个有机接口之一**（另一个是 Membrantransport）——Q 的突触传递、受体电位、激素作用全部建立在它之上，**无需新知识作桥** [已验证，Bio-DE-CN-Mapping §0.4]。⚠️ 该条目在德国**几乎属 DE-only**（中国要到选择性必修1 才出现），因此**必须新建**，不能靠中国存量直接迁移 [据推断，Bio-DE-CN-Mapping EF-08]。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 要点 | 备注 |
|---|---|---|---|---|
| `Signal(stoff)` / `Ligand` | 信号（分子）/ 配体 | signal / ligand | 传递信息的小分子（激素、递质等） | 第一信使 |
| `Rezeptor` | 受体 | receptor | 特异识别并结合信号的蛋白 | 专一性 = 锁钥 |
| `Membranrezeptor` | 膜受体 | membrane receptor | 位于膜上的受体（跨膜蛋白） | 亲水信号用 |
| `intrazellulärer Rezeptor` | 胞内受体 | intracellular receptor | 位于细胞内，配体须能穿膜（如脂溶性激素） | 对比点 |
| `Second Messenger` | 第二信使 | second messenger | 胞内扩散的信号分子（如 cAMP、Ca²⁺） | 级联中枢 |
| `Signalkaskade` | 信号级联 | signalling cascade | 多步酶促反应逐级放大信号 | 核心特征 |
| `Amplifikation` / `Verstärkung` | 放大效应 | amplification | 一个信号分子激活多个下游分子 | 高频得分点 |
| `Zielzelle` | 靶细胞 | target cell | 带相应受体、能对信号作出反应的细胞 | 应答专一性 |
| `zelluläre Antwort` | 细胞应答 | cellular response | 基因表达改变、代谢改变、分泌等 | 终点 |
| `Zell-Zell-Erkennung` | 细胞识别 | cell-cell recognition | 靠膜表面糖链（Glykokalyx）识别「自己/非己」 | 免疫基础 [据推断] |
| `Desensibilisierung` | 脱敏 | desensitisation | 受体长时间受刺激后反应下降 | 延伸概念 |

---

## 2. 知识结构 (Struktur)

### 2.1 四段通用模型（Signal → Rezeptor → Kaskade → Antwort）

中文：所有信号转导都可拆成**四段**：① **信号结合受体**——配体与受体特异结合（形状互补）；② **受体激活**——受体构象改变，激活膜内侧的效应酶或通道；③ **级联放大**——通过第二信使与一系列激酶逐级放大，**一个信号分子可激活成千上万个下游分子**；④ **细胞应答**——代谢改变、基因表达改变或分泌，最终信号被降解/重摄取而终止。

> *Klausur-Satz*: Ein Signalmolekül bindet spezifisch an einen Rezeptor; die Bindung löst eine Signalkaskade aus, in der das Signal über Second Messenger und Enzyme **kaskadenartig verstärkt** wird, bis in der Zielzelle eine spezifische Antwort erfolgt. [已验证]

### 2.2 放大效应（Amplifikation）——最易失分的一环

中文：级联的意义在于**放大**：一个信号分子 → 多个酶 → 更多第二信使 → 更多靶蛋白。这解释了为什么**极低浓度**的激素就能引起显著生理效应。

> *Klausur-Satz*: Durch die Kaskade wird ein einzelnes Signalmolekül zu einer großen Zahl aktivierter Effektormoleküle verstärkt (Amplifikation); daher genügen bereits sehr geringe Signalstoffkonzentrationen für eine deutliche Reaktion. [据推断]

### 2.3 实例链：Adrenalin → Glykogenabbau

| 步骤 | 事件 |
|---|---|
| 1 | Adrenalin bindet an einen **Membranrezeptor** (β-Rezeptor) |
| 2 | Rezeptor aktiviert ein **G-Protein** |
| 3 | G-Protein aktiviert die **Adenylatcyclase** |
| 4 | Bildung des Second Messengers **cAMP** |
| 5 | cAMP aktiviert die **Proteinkinase A** |
| 6 | Kaskade führt zum **Glykogenabbau** in Glucose → zelluläre Antwort |

> *Klausur-Satz*: Die Bindung von Adrenalin an den β-Rezeptor aktiviert über ein G-Protein die Adenylatcyclase, die cAMP bildet; dieser Second Messenger verstärkt das Signal kaskadenartig und führt zum Glykogenabbau. [据推断，实例取自常规教材链，未逐字搬运]

### 2.4 细胞识别（Zell-Zell-Erkennung）

中文：细胞膜外表面的糖链（`Glykokalyx`：糖脂与糖蛋白）构成「身份标签」，使细胞能识别同类、区分「自己/非己」。这是组织形成与免疫识别的基础。

> *Klausur-Satz*: Die Glykokalyx an der Membranaußenseite dient der Zell-Zell-Erkennung, da ihre Zuckerketten als spezifische Erkennungsmerkmale wirken. [据推断]

---

## 3. 解题方法 (Methoden)

### 3.1 「四段流程图法」——描述任意信号通路

**编号步骤**：
1. **信号**：写明配体名称 + 来源。—— *KLP 工具：`darstellen`*
2. **受体**：写明受体位置（膜/胞内）+ 类型。—— *KLP 工具：`erklaeren`*
3. **级联**：至少写两步 + 第二信使，并**显式点出 Amplifikation**。—— *KLP 工具：Basiskonzept `Information und Kommunikation`*
4. **应答 + 终止**：写细胞响应，并补信号终止方式（降解/重摄取）。—— *KLP 工具：`erlaeutern`*

> **判据 / 决策点**：题目出现 `erklaeren` 时，**缺 Amplifikation 一句即为结构性失分**——这是德国评分点，不是可选项。

### 3.2 「受体位置判别法」

**编号步骤**：
1. 看信号分子性质：**亲水**（肽类激素、递质）→ 不能穿膜 → **膜受体**。—— *KLP 工具：`Biomembranen: Transport`（EF 已教）*
2. **脂溶性**（类固醇激素）→ 可穿膜 → **胞内受体**，直接作用于 DNA。—— *KLP 工具：`begruenden`*
3. 结论句用「因为…所以…」结构回扣膜的选择透过性。

> **判据 / 决策点**：受体位置由**配体极性**决定，不由细胞类型决定。

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 物质与能量收支表法（Bilanz）—— ⚠️ 定量边界

- **技法内容**：把信号通路中的**能量与物质消耗**列成收支表——输入（ATP 用于磷酸化级联）与输出（被激活的效应分子数），从而**量化**「放大」这一步。例如：级联中每一次磷酸化消耗 ATP，可通过统计磷酸化步数估算放大倍数。[CN-课标] 必修1 2.2.2（ATP 是直接能源物质）+ 学业要求「运用统计与概率」。[据推断]
- **DE-Anschluss**：EF 的 `ATP-ADP-System`（**EF 已教**）· `Enzyme: Kinetik`（**EF 已教**，激酶即酶）· `Redoxreaktionen`（EF）· `Biomembranen: Transport`（EF）。**工具全部已教**。
- **合规性**：⚠️ **需注意（定量边界）** —— 德国 EF/GK 对信号转导只要求**定性**描述（流程 + 放大这一**性质**），**不要求定量核算**。中国的定量收支训练虽强，但 **GK 使用此技法时须避免给出具体 ATP 计量数字**，只保留「多步磷酸化 → 放大」这一**定性**结论 [据推断，Bio-DE-CN-Mapping CN-Methode 7]。
- **⚠️ 分层差异**：**定量**的能量核算集中在 **LK 的能量模型**（Stoffwechsel 的 `Energetisches Modell`）；**GK 不引入定量**。
- **Abitur 应用**：用于把「放大」写得更扎实（AFB II）；但答题**只写定性**：`Die Kaskade verstärkt das Signal, da jeder Schritt viele Moleküle aktiviert.`
- **来源**：`[CN-课标]` + `[CN-教材]`

> 补充说明：信号转导的**结构方法**（四段流程图）在德国属 `erklaeren` 的官方要求（见 §3.1），**不依赖中国技法**；本节 CN-Methode 仅提供「放大」这一步的量化视角，且**明确限制在定性使用**。

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | **Aufgabenart I** `Materialgebundene Aufgabe`（配信号通路示意图 / 实验数据）[已验证] |
| Operator | `erklaeren` · `erlaeutern` · `darstellen` · `begruenden` |
| AFB | I（标图）→ **II（解释流程，重心）** → III（若加物质作用评价） |
| 建议分值 / 时长 | 3 题约 20–25 BE，约 25 min [已验证，GK 255 min] |

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`
> Die Abbildung zeigt die Wirkung eines Peptidhormons auf eine Leberzelle: Das Hormon bindet an einen Rezeptor in der Membran; daraufhin steigt die Konzentration von cAMP im Zellinneren, und die Zelle beginnt, Glykogen abzubauen.
> a) Beschreiben Sie die abgebildeten Vorgänge mit Fachbegriffen.
> b) Erläutern Sie, warum bereits eine sehr geringe Hormonkonzentration ausreicht, um eine deutliche Reaktion auszulösen.

**Aufgabe 2** `[原创]`
> Ein Forscher stellt fest, dass ein fettlösliches Steroidhormon seine Wirkung auch dann entfaltet, wenn die Zellmembran für Proteine undurchlässig gemacht wurde.
> Begründen Sie, welchen Rezeptortyp dieses Hormon nutzt, und grenzen Sie ihn vom Rezeptortyp aus Aufgabe 1 ab.

**Aufgabe 3** `[NRW-改编]`
> Bei einem Experiment wird der Rezeptor durch ein künstliches Molekül so verändert, dass er zwar noch das Hormon bindet, aber kein G-Protein mehr aktivieren kann.
> Erklären Sie die Folgen dieser Veränderung für die Signaltransduktion.

### 5.3 Musterlösung

**Aufgabe 1**
1. **a) 描述**：Das Peptidhormon wirkt als **Ligand** und bindet **spezifisch** an einen **Membranrezeptor** der Leberzelle (Schlüssel-Schloss-Prinzip). ✓
2. Der Rezeptor aktiviert über ein G-Protein die Adenylatcyclase; diese bildet **cAMP** als **Second Messenger**. ✓ 得分点（点名 Second Messenger）
3. cAMP löst eine **Signalkaskade** aus, an deren Ende die Zelle **Glykogen abbaut** (**zelluläre Antwort**). ✓
4. **b) 放大**：Durch die Kaskade wird das Signal **amplifiziert**: Ein einzelnes Hormonmolekül aktiviert über die Zwischenschritte viele Enzymmoleküle, sodass schon **geringe Hormonkonzentrationen** eine deutliche Reaktion bewirken. ✓ 得分点（必须写 Amplifikation）

**Aufgabe 2**
1. **受体类型**：Das Hormon nutzt einen **intrazellulären Rezeptor**. ✓
2. **Begründung**：Da es **fettlöslich** ist, kann es die Lipiddoppelschicht **passiv durchqueren** und muss nicht an einen Membranrezeptor binden; die Undurchlässigkeit der Membran für Proteine ist daher ohne Bedeutung. ✓ 得分点（极性 → 穿膜 → 胞内受体）
3. **Abgrenzung**：Das Peptidhormon aus Aufgabe 1 ist **wasserlöslich** und kann die Membran nicht passieren; es wirkt deshalb über einen **Membranrezeptor** und Second Messenger. ✓ 得分点（两型对照）
4. **标准句**：Die Rezeptorlage wird durch die **Löslichkeit des Liganden** bestimmt: fettlösliche Signale wirken über intrazelluläre, wasserlösliche über Membranrezeptoren. ✓

**Aufgabe 3**
1. **Ausgangslage**：Der Rezeptor kann das Hormon noch binden, aber das **G-Protein nicht mehr aktivieren**. ✓
2. **Folge**：Die Signalweitergabe **bricht an dieser Stelle ab**: Die Adenylatcyclase wird nicht aktiviert, **cAMP wird nicht gebildet**. ✓ 得分点（指出断点位置）
3. **Konsequenz**：Die nachgeschaltete Kaskade bleibt aus, sodass die **zelluläre Antwort** (Glykogenabbau) **nicht erfolgt**. ✓
4. **标准句**：Da die Aktivierung des G-Proteins entfällt, wird die Kaskade nicht ausgelöst und die Zielzelle reagiert nicht auf das Hormon. ✓

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 把 `Membranrezeptor` 与 `intrazellulärer Rezeptor` 混用 | 判据 = **配体极性**（亲水/脂溶） |
| 辨别错 | 把 Second Messenger（cAMP）当成第一信号 | 第一信使 = 胞外配体；第二信使 = 胞内分子 |
| 知识错 | 漏掉 **Amplifikation**，只写「信号传进去」 | 每次答信号题**强制**写一句放大 |
| 知识错 | 忘记信号**终止**机制（降解/重摄取） | 四段模型第 4 段补终止 |
| 表达错 | 只写「受体结合」不写受体**位置** | `erklaeren` 要求写明膜上/胞内 |

---

## 7. Vernetzung

- **上游**：[`Biomembran-Transportmechanismen-und-Osmose.md`](Biomembran-Transportmechanismen-und-Osmose.md)（膜结构 + 受体）
- **下游**：Q-Neurobiologie 的 `Synapse-und-neuromuskulaere-Synapse.md`（⚠️ 缺口，**最平滑的 EF→Q 桥**）· `Hormone-und-Stressreaktion.md`（⚠️ 缺口，[LK]）
- **横向**：[`Enzymkinetik-und-Regulation.md`](Enzymkinetik-und-Regulation.md)（激酶 = 酶）· `ATP-ADP-und-Redoxreaktionen.md`（⚠️ 缺口）
- **Basiskonzept**：`Information und Kommunikation`（第 3 轴）· `Steuerung und Regelung`（第 4 轴）
- **术语卡**：`Signaltransduktion` · `Ligand` · `Rezeptor` · `Second Messenger` · `Signalkaskade` · `Amplifikation` · `Zell-Zell-Erkennung`

---

> **来源标注说明**：`[已验证]` = 实际访问官方源确认 · `[据推断]` = 基于官方条目/项目推导 · `[未获取到]` = 未找到，如实标注。
> 题目来源层级：`[NRW-官方公开]` / `[NRW-改编]` / `[CN-改编]` / `[原创]`。所有解析均为原创，不搬运教辅或教材原文。
