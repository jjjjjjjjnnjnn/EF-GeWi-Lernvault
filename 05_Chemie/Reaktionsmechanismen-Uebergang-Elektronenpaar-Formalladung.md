---
fach: Chemie
thema: "Reaktionsmechanismen Uebergang: Elektronenpaar, Formalladung, Polarisation"
operatoren: [darstellen, erklaeren, begruenden, aufstellen, deuten]
klausurrelevant: true
datum: 2026-09-24
tags: [EF, Chemie, Reaktionsmechanismen]
stufe: "EF|Q2"
kursart: "GK|LK"
---

# Reaktionsmechanismen-Übergangsschicht: Elektronenpaar · Formalladung · Polarisation (机理过渡层：电子式 / 形式电荷 / 极化)

> **中文理解**：EF 阶段只讲**反应类型**（取代 / 加成 / 消去），完全不含 `Reaktionsmechanismen` [已验证，KLP EF-1 无机理条目]。Q-3 一开学却直接要求写机理（GK 两条、LK 五条），并要求用**弯箭头表示电子走向**。中间缺的那一层语言就是本笔记：**电子式（Lewis 式）→ 形式电荷 → 电负性与键极性 → 极化 / 诱导效应**。没有这层，机理只能死背箭头。
>
> **Klausur-Relevanz**：这是 `Lernbaum-Chemie.md §3 台阶③` 的前置（★★★）。Q-3 全部机理题（GK-16 / LK-11 / LK-12）与 LK-19「从分子结构推演反应行为」都建立在「哪里电子富、哪里电子缺、哪里被极化」这套判断上 [已验证，KLP Q-3 Schwerpunkt 3 + 5]。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| Elektronenformel (Lewis-Schreibweise) | 电子式 | Lewis structure | 用点表示**价电子**、用横线表示**成键电子对**的结构式 | EF-1 Schwerpunkt 3 的书写基础 |
| bindendes / freies Elektronenpaar | 成键 / 孤对电子对 | bonding / lone pair | 两原子共享 / 未共享的电子对 | 孤对＝潜在的亲核位点 |
| Oktettregel | 八隅体规则 | octet rule | 第二周期原子周围凑满 8 个价电子（H 为 2） | 判断电子式是否稳定的标准 |
| Formalladung (FL) | 形式电荷 | formal charge | `FL = VE(frei) − (nichtbindende e⁻ + ½ · bindende e⁻)` | **仅用于选最合理的电子式**，非真实电荷 |
| Elektronegativität (EN) | 电负性 | electronegativity | 原子吸引共享电子对的能力（F 最强） | ⚠️ 此处**只作键极性定性工具** |
| Bindungspolarität | 键极性 | bond polarity | EN 差 ΔEN 越大 → 键越极性 → 出现 δ⁺ / δ⁻ | ΔEN = 0 为纯共价，大者为离子键 |
| Partialladung δ⁺ / δ⁻ | 部分电荷 | partial charge | 极性键上电子密度偏移形成的局部电性 | 机理中「亲电/亲核」的判定依据 |
| Polarisierbarkeit | 极化性 | polarizability | 电子云在外电场下**变形**的难易；电子云越大越易极化 | 大原子（I、Br）> 小原子 |
| induktiver Effekt (−I / +I) | 诱导效应 | inductive effect | 电负性基团沿 σ 键把电子密度**拉走 / 推来** | 解释碳正离子稳定性 |
| Elektrophil / Nucleophil | 亲电体 / 亲核体 | electrophile / nucleophile | 缺电子（爱电子）/ 富电子（爱正电）的物种 | 机理两类进攻方的语言 |
| Nucleophilie | 亲核性 | nucleophilicity | 孤对或 π 电子提供电子的能力 | 与碱性相关但不等同 |

---

## 2. 知识结构 (Struktur)

### 2.1 为什么 EF 的「静态结构」不足以写机理

EF-1 只把电子式当**画结构式的工具**（Schwerpunkt 3：`Einfach- und Mehrfachbindungen`）；Q-3 却要求用它做**电子推演**——箭头从富电子处指向缺电子处 [已验证，台阶③]。同一张电子式，EF 是「静态图」，Q 是「电子流向图」。

> *Klausur-Satz*: *Die Elektronenformel beschreibt in der Einführungsphase vor allem den Bindungsaufbau; im Qualifikationsbereich wird sie zusätzlich zur Deutung der Elektronenbewegung in Reaktionsmechanismen genutzt.*

### 2.2 电子式（Lewis 式）的四条书写规则

1. **数价电子**：主族元素价电子数 = 主族号（H=1, C=4, N=5, O=6, Halogen=7）。
2. **先连骨架**：电负性小的原子放中心，H 永远在外端（H 只能形成 1 个键）。
3. **补孤对**：先给末端原子补满八隅体（H 补到 2），剩余电子给中心原子。
4. **验八隅体**：若中心原子不足 8，改用**双键 / 三键**（把邻接原子的孤对「移」进来）。

> *Klausur-Satz*: *Bei der Aufstellung der Elektronenformel werden zunächst die Valenzelektronen gezählt, das Gerüst verknüpft und anschließend freie Elektronenpaare so ergänzt, dass die Oktettregel erfüllt ist.*

### 2.3 形式电荷：三条规则 + 一个用法

**计算**：`FL = VE(freies Atom) − (nichtbindende e⁻ + ½ · bindende e⁻)`

**三条判定规则**（选最合理电子式的判据）[据推断，通用 Lewis 规则]：
- 形式电荷绝对值**越小**越好；
- 同号电荷**越分散**越好；
- 负形式电荷应落在**电负性较大**的原子上。

⚠️ **最容易混的一点**：形式电荷 ≠ 氧化数 ≠ 部分电荷。
- **形式电荷**：把成键电子对「平均分」的记账结果（用于选结构）。
- **氧化数**：把成键电子对「全给电负性大的原子」的记账结果（用于 redox）。
- **部分电荷 δ**：真实的电子密度偏移（用于极性判断）。

> *Klausur-Satz*: *Die Formalladung ist ein rein formales Buchungsverfahren zur Auswahl der plausibelsten Elektronenformel; sie ist nicht mit der Oxidationszahl und nicht mit der tatsächlichen Partialladung gleichzusetzen.*

### 2.4 电负性 → 键极性 → 反应位点

EN 差决定键的极性方向：`ΔEN > 0` → 电负性大的原子带 δ⁻，小的带 δ⁺ [据推断，常用定性判据]。

> ⚠️ **边界（重要）**：德国 KLP **未把 `Elektronegativität` 列为独立内容点** [据推断]。本笔记只把它当**键极性定性工具**用；**不得展开为周期律递变、电子排布式、能级**——那属 `CN-only`《物质结构与性质》整册，零 Abitur 价值 [已验证，Mapping X-08]。

> *Klausur-Satz*: *Je größer die Elektronegativitätsdifferenz zweier Bindungspartner ist, desto stärker ist die Bindung polarisiert; das elektronegativere Atom trägt die negative Partialladung.*

### 2.5 极化与诱导效应：机理的「力」

- **极化性**：电子云在外场下变形 → 原本非极性的分子也可被诱导出瞬时偶极（EF 的 van der Waals 力已用此概念）。
- **诱导效应**：烷基推电子（+I）→ 分散正电荷、稳定碳正离子；卤素等拉电子（−I）→ 相反。
- **反应位点判据**：找 δ⁺ 碳（易受亲核体进攻）与 δ⁻ 原子 / 孤对 / π 键（易受亲电体进攻）。

> *Klausur-Satz*: *Elektronenziehende Gruppen verstärken die Polarisation einer Bindung, elektronenschiebende Alkylgruppen stabilisieren ein Carbokation; hieraus ergibt sich, an welcher Stelle ein Nucleophil oder Elektrophil angreift.*

### 2.6 从这层语言通向两条 GK 机理

| 机理 | 用到的过渡层工具 |
|---|---|
| radikalische Substitution | 键的**均裂**（各得一个电子）→ 自由基（单电子） |
| elektrophile Addition | 键的**异裂** + 键极性 + 碳正离子稳定性（诱导效应） |

> *Klausur-Satz*: *Die radikalische Substitution verläuft über eine homolytische Bindungsspaltung zu Radikalen, die elektrophile Addition über eine heterolytische Polarisierung zu einem Carbokation.*

---

## 3. 解题方法 (Methoden)

### 3.1 电子式五步法（`darstellen` 标准程序）

1. **数价电子**（含电荷：阴离子 +1，阳离子 −1）。—— *KLP 工具：EF-1 Schwerpunkt 3 电子对键*
2. **搭骨架**（电负性小者居中，H 居端）。—— *KLP 工具：同上*
3. **连单键并补孤对**至八隅体。—— *KLP 工具：Oktettregel*
4. **算形式电荷**，用三条规则挑最合理式。—— *KLP 工具：本笔记 2.3*
5. **若需多键**，把孤对改成双/三键后**重算形式电荷**。—— *KLP 工具：Mehrfachbindungen*

> **判据 / 决策点**：题目出现 `darstellen / zeichnen`（电子式）→ 走五步；出现 `begruenden`（选结构）→ 必须**显式引用形式电荷三条规则**。

### 3.2 形式电荷三步判定法

1. 对每个原子数「非成键电子」与「成键电子对的一半」。
2. 用 `FL = VE − (nichtbindend + ½ bindend)` 逐一算。
3. 比较候选式，按「绝对值小 → 电荷分散 → 负电荷在电负性大原子」排序取优。

### 3.3 反应位点定位法（通向机理）

1. 画电子式，标孤对与 π 键。
2. 用 ΔEN 标出 δ⁺ / δ⁻。
3. 判：亲电体进攻 δ⁻ 处；亲核体进攻 δ⁺ 碳。
4. 若涉及碳正离子，用诱导效应判断哪个碳正离子更稳定 → 决定区域选择性。

> **判据 / 决策点**：题目问「为什么加成在这个碳上」→ 必须先答**碳正离子稳定性**，不许只写「马氏规则」口诀 [已验证，KLP 考机理不考口诀]。

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 电子式与形式电荷（Lewis 记账法）

- **技法内容**：把「画结构」拆成**先数价电子、再搭骨架、再补孤对、最后用形式电荷择优**的固定顺序；用形式电荷做**双查**（原子数 + 电荷数）。中国侧提供的是这套**书写与自检的熟练度**。
- **DE-Anschluss**：EF-1 Schwerpunkt 3 `Elektronenpaarbindung: Einfach- und Mehrfachbindungen` · Q-3 Schwerpunkt 3 `Elektronenpaarbindung, Oxidationszahlen, Molekülgeometrie (EPA-Modell)` · Q-3 Schwerpunkt 5 `inter- und intramolekulare Wechselwirkungen` · 德国机理题要求的「弯箭头 = 电子对移动」正是形式电荷语言的直接应用。
- **合规性**：✅ —— 用到的工具德国全部已教；引入的只是**书写顺序与自检习惯**。⚠️ **两条禁入**：① 不得引入**杂化轨道 sp/sp²/sp³ 与完整 VSEPR**（德国只到 EPA 模型）[据推断]；② 不得把**电负性展开为周期律递变 / 电子排布式**（属《物质结构与性质》整册，零价值）。
- **Abitur 应用**：Q-3 全部机理题（GK-16 / LK-11 / LK-12）的入场语言；LK-19「从分子结构推演反应行为」；以及所有 `darstellen` 电子式的 AFB I 小问。AFB I–II。
- **来源**：`[CN-教材]` 必修/选必中「电子式书写」与「结构式」的方法层；`[CN-高考]` 形式电荷自检习惯（**原创改写，不搬原题**）。

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | Aufgabenart I `Materialgebundene Aufgabe`（结构式/材料绑定）[已验证] |
| Operator | `darstellen` / `zeichnen` / `begruenden` / `aufstellen` / `deuten` |
| AFB | I（画电子式）→ II（用形式电荷/极性论证） |
| 建议分值 / 时长 | 单小题约 4–8 BE；本层内容通常作机理大题的**前置小问** |

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`
> Gegeben sind die Moleküle H₂O, NH₃ und CH₃Cl.
> **a)** Stellen Sie für jedes Molekül die Elektronenformel (Lewis-Schreibweise) dar.
> **b)** Ermitteln Sie für CH₃Cl die Formalladungen aller Atome und begründen Sie, warum diese Schreibweise plausibel ist.

**Aufgabe 2** `[原创]`
> Betrachtet werden die Bindungen H–Cl, C–Cl und C–H.
> **a)** Ordnen Sie die Bindungen nach zunehmender Polarität und begründen Sie mit der Elektronegativitätsdifferenz.
> **b)** Kennzeichnen Sie in CH₃Cl die Partialladungen δ⁺ und δ⁻.

**Aufgabe 3** `[NRW-改编]`
> Methan (CH₄) ist unpolar, Chlormethan (CH₃Cl) dagegen polar.
> **a)** Erklären Sie diesen Unterschied mithilfe der Bindungspolarität.
> **b)** Leiten Sie daraus ab, an welchem Atom in CH₃Cl ein Nucleophil bevorzugt angreift.

**Aufgabe 4** `[CN-改编]`
> Bei der Anlagerung von HBr an Propen (CH₃–CH=CH₂) entsteht überwiegend 2-Brompropan.
> **a)** Begründen Sie mithilfe der Bindungs-polarisierung und der Carbokation-Stabilität, welches Kohlenstoffatom das H-Atom trägt.
> **b)** Nennen Sie die Art der Bindungsspaltung (homolytisch/heterolytisch), die diesem Schritt zugrunde liegt.

### 5.3 Musterlösung

**Aufgabe 1**
1. **a) Elektronenformeln**：
   - H₂O：O 居中，两个 O–H 单键，O 上 **2 个孤对** ✓ 得分点
   - NH₃：N 居中，三个 N–H 单键，N 上 **1 个孤对** ✓ 得分点
   - CH₃Cl：C 居中，3 个 C–H + 1 个 C–Cl，Cl 上 **3 个孤对** ✓ 得分点
2. **b) CH₃Cl 形式电荷**：C `4 − (0 + ½·8) = 0`；H 各 `1 − (0 + ½·2) = 0`；Cl `7 − (6 + ½·2) = 0` ✓ 得分点
3. **合理性**：所有原子形式电荷为 0，绝对值最小 → 该式为最合理电子式 ✓ 得分点（**须引用「绝对值最小」规则**）

**Aufgabe 2**
1. **a) 极性排序**：C–H < H–Cl < C–Cl ✓ 得分点（依据 ΔEN：C/H 相近 → 最弱；C/Cl 差最大 → 最强）
2. **b)** C 带 **δ⁺**（与 Cl 相连），Cl 带 **δ⁻**；三个 C–H 上 C 亦为 δ⁻ 侧但很弱 ✓ 得分点

**Aufgabe 3**
1. **a)** CH₄ 中 C–H 键 ΔEN ≈ 0 → 无极性键 → 分子无偶极；CH₃Cl 中 C–Cl 键 ΔEN 大 → 键极性且分子不对称 → 有偶极 ✓ 得分点
2. **b)** C 带 δ⁺ → **亲核体（Nucleophil）进攻碳原子** ✓ 得分点

**Aufgabe 4**
1. **a)** H–Br 键极性化：H 带 δ⁺，被 π 键（富电子）进攻；两种可能的碳正离子中，**sekundäres Carbokation**（CH₃–C⁺H–CH₃）比 primäres 更稳定（两个烷基 +I 效应分散正电荷）→ H 加在**末端 CH₂** 上，Br 落在中间碳 ✓ 得分点（**必须写「碳正离子稳定性」，只写「马氏规则」不给分**）
2. **b)** **heterolytisch**（H–Br 异裂：H⁺ 与 Br⁻）✓ 得分点

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 把形式电荷当成氧化数 / 当成真实部分电荷 | 三套记账法各写一句定义：形式电荷＝平分、氧化数＝全给电负性大者、δ＝真实偏移 |
| 知识错 | 画电子式时中心原子不足八隅体却不改双键；或把 H 放中心 | 先搭骨架（H 必居端），再验八隅体、必要时改多键 |
| 表达错 | 用「马氏规则」口诀代替碳正离子稳定性论证；箭头方向画反 | 机理题只认**电子对移动方向 + 中间体电荷**；口诀不作依据 |

---

## 7. Vernetzung

- **上游**：`Chemie-EF-Grundlagen-Training.md`（价电子、离子、配平）· `Zwischenmolekulare-Kraefte-und-Stoffeigenschaften.md`（偶极与极化性）
- **下游**：`Reaktionsmechanismen-GK-radikalische-Substitution-und-elektrophile-Addition.md`（两条 GK 机理，**直接使用本层语言**）· `Organische-Struktur-und-Retrosynthese.md`（反应位点定位）
- **横向**：`03_Mathe` 向量与偶极（电性矢量和）
- **术语卡**：`Elektronenformel` / `Formalladung` / `Elektronegativitaet` / `Bindungspolaritaet` / `induktiver Effekt` / `Nucleophil` / `Elektrophil`（建议加入 csv，DE-CN-EN 三列）

---

> **来源标注说明**：`[已验证]` = 实际访问官方源（NRW KLP 2022 `gost_klp_ch_2022_06_07.pdf`）或本项目已核文件确认 · `[据推断]` = 基于本项目推导或通用化学规则 · `[未获取到]` = 未找到，如实标注。
> ⛔ **本笔记不涉及**：盐类水解体系（KLP 全文无 `Hydrolyse`）· 杂化轨道 / 晶体四分类 / 电子排布式（《物质结构与性质》整册）· 配合物系统板块。
