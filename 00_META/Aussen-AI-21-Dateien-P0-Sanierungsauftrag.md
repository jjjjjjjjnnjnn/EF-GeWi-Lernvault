---
fach: ""
thema: "Aussen-AI 21 Dateien P0 Sanierungsauftrag"
operatoren: []
klausurrelevant: false
datum: 2026-09-27
tags: [EF, Meta, Handbuch, P0]
---

# 外部 AI P0 级 21 篇核心课件深度重塑与清洗作业派发书

> **验收基准已锁定**：示范课件 [`Lernreise/Sowi-Soziale-Marktwirtschaft-DE-L1.md`](file:///C:/Users/rongj/Desktop/学习/Lernreise/Sowi-Soziale-Marktwirtschaft-DE-L1.md) 已完成重塑并经由 `scripts/audit-pedagogy-integrity.py` 与 `scripts/vault-check.py` 验证 100% 达标通过。
> **本任务书目标**：将其余 **21 篇** 受到“数理模板污染（$x_1, x_2, d = x_2 - x_1$）”与“提示词残留”的社科/哲学核心课件，按示范标准全量清洗重写并就地覆盖原文件。

---

## 一、清洗四大红线（严防套模）

1. **绝对禁止数理符号**：文科与社科正文中**严禁出现** `$x_1$`, `$x_2$`, `$d = x_2 - x_1$`, `Kennzahl`, `Formel`, `Rechnung`。
2. **彻底清除提示词残留**：全局查找并删除 `Ausgangslage aus der Vorlage:` 及其紧随的重复文本，保留自然生动的生活案例。
3. **Schritt 5（Verfahrensvergleich）真实化**：必须改为**该学科真实的两种理论/考场分析路径对比（Weg A vs. Weg B）**。
4. **Schritt 8 规范更名**：标题必须统一使用：
   ```markdown
   ## Schritt 8 — reflexion: Takeaway & Metakognitive Reflexion
   ```
   （`vault-check.py` 已支持 `reflexion` 类型，前端将自动识别并展示为 `TAKEAWAY & REFLEXION`）。
5. **Schritt 6 与 7 具名化**：
   - `## Schritt 6 — check: Selbsttest zu <Thema>`
   - `## Schritt 7 — szenario: <Rolle & Situation>`

---

## 二、21 篇课件分批清单与核心改写指引

建议将 21 篇文件分为 4 个独立批次，分发给外部 AI 并行执行：

### 批次 1：哲学核心组（Philo，4 篇）

| 序号 | 文件路径 | 学科主题 (Thema) | Schritt 5 辩证分析路径 (Weg A vs. Weg B) 指引 |
| :---: | :--- | :--- | :--- |
| 1 | `Lernreise/Philo-Anthropologie-Sonderstellung-DE-L1.md` | 人类学与人类特殊地位 | **Weg A (Gehlen: Mängelwesen)**: 人类本能退化、需文化与制度弥补；**Weg B (Plessner: Exzentrische Positionalität)**: 人类具有自我反思与距离感。对比生物适应 vs 文化自我创造。 |
| 2 | `Lernreise/Philo-Kategorischer-Imperativ-DE-L1.md` | 康德定言命令与道德律 | **Weg A (Hypothetischer Imperativ)**: 条件性行动规则（为达成利益）；**Weg B (Kategorischer Imperativ)**: 无条件普遍化法则（出于义务的纯粹理性）。对比效用动机 vs 义务动机。 |
| 3 | `Lernreise/Philo-Utilitarismus-Kalkuel-DE-L1.md` | 功利主义与快乐算题 | **Weg A (Handlungsutilitarismus / Bentham)**: 针对具体单次行为计算最大幸福总和；**Weg B (Regelutilitarismus / Mill)**: 评估行为准则作为普遍规则对福利的长期影响。对比即时计算 vs 规则稳定。 |
| 4 | `Lernreise/Philo-Utilitarismus-Kant-DE-L1.md` | 功利主义 vs. 康德义务论 | **Weg A (Deontologische Ethik / Kant)**: 行为内在价值与动机至上，人是目的而非手段；**Weg B (Teleologische Ethik / Utilitarismus)**: 行为后果与效益最大化。对比绝对禁止（如谎言）vs 后果权衡。 |

---

### 批次 2：SoWi 政治与宪法民主组（SoWi，6 篇）

| 序号 | 文件路径 | 学科主题 (Thema) | Schritt 5 辩证分析路径 (Weg A vs. Weg B) 指引 |
| :---: | :--- | :--- | :--- |
| 5 | `Lernreise/SoWi-Grundgesetz-DE-L1.md` | 基本法与核心宪法原则 | **Weg A (Demokratieprinzip)**: 多数决与民意代表权；**Weg B (Rechtsstaatsprinzip & Art. 79 Abs. 3 GG)**: 少数人权利、权力制衡与实质正义（Ewigkeitsklausel）。对比多数决效率 vs 宪政不可侵犯底线。 |
| 6 | `Lernreise/SoWi-Verfassungsorgane-DE-L1.md` | 联邦宪法机构与制衡 | **Weg A (Parlamentarisches Regierungssystem / Bundestag & Kanzler)**: 多数信任与高效施政；**Weg B (Föderative Kontrolle / Bundesrat & BVerfG)**: 联邦多元否决权与宪法司法审查。对比施政行动力 vs 权力制衡与共识。 |
| 7 | `Lernreise/Sowi-Gesetzgebung-Demokratie-DE-L1.md` | 联邦立法流程与博弈 | **Weg A (Initative & Mehrheitsbeschluss)**: 执政联盟主导的法案推进；**Weg B (Vermittlungsausschuss & Bundesrat)**: 参议院与各邦利益的协调与妥协。对比立法速度 vs 联邦各州共识。 |
| 8 | `Lernreise/SoWi-Parteien-Willensbildung-DE-L1.md` | 政党功能与民意塑造 | **Weg A (Parteien als Vermittler / Art. 21 GG)**: 整合多元民意、参与选举与政治社会化；**Weg B (Bürgerinitiativen & Soziale Bewegungen)**: 单一议题抗议、直接施压与非体制化动员。对比体制内整合 vs 议题式聚焦。 |
| 9 | `Lernreise/SoWi-Partizipation-DE-L1.md` | 政治参与与公民介入 | **Weg A (Konventionelle Partizipation)**: 选举投票、党派参政等制度化途径；**Weg B (Unkonventionelle Partizipation)**: 示威游行、公民抗命与数字抗议。对比合法稳定性 vs 议题冲击力。 |
| 10 | `Lernreise/SoWi-Wehrhafte-Demokratie-DE-L1.md` | 防卫型民主与宪法保卫 | **Weg A (Toleranzprinzip)**: 言论自由与开放包容；**Weg B (Wehrhafter Schutz / Parteiverbot, Art. 18 GG)**: 剥夺宪政破坏者的自由。对比程序开放性 vs 自卫反击的必要边界。 |

---

### 批次 3：SoWi 经济与市场运行组（SoWi，6 篇）

| 序号 | 文件路径 | 学科主题 (Thema) | Schritt 5 辩证分析路径 (Weg A vs. Weg B) 指引 |
| :---: | :--- | :--- | :--- |
| 11 | `Lernreise/Sowi-Preismechanismus-Markt-DE-L1.md` | 价格形成与供求机制 | **Weg A (Preiselastizität & Gleichgewicht)**: 价格浮动自发自净（Allokationsfunktion）；**Weg B (Staatliche Preisintervention)**: 最高价/最低价干预以保民生。对比资源配置效率 vs 社会公平保障。 |
| 12 | `Lernreise/SoWi-Konsum-Wirtschaften-DE-L1.md` | 消费决策与可持续经济 | **Weg A (Souveräner Konsument / Nutzenmaximierung)**: 消费者主权、价格导向与自由选择；**Weg B (Ökologische & Ethische Konsumkritik)**: 外部性成本、碳足迹约束与标签规制。对比短期效用极大化 vs 长期代际责任。 |
| 13 | `Lernreise/SoWi-Betrieb-Mitbestimmung-DE-L1.md` | 企业组织与共同决定权 | **Weg A (Ökonomische Effizienz & Unternehmensführung)**: 管理层自主决策、快速应对市场；**Weg B (Betriebliche Mitbestimmung / Betriebsrat, BetrVG)**: 劳工权益保障与工业民主。对比企业决策敏捷度 vs 员工满意度与社会和平。 |
| 14 | `Lernreise/SoWi-Wirtschaftskreislauf-BIP-Kritik-DE-L1.md` | 循环模型与 GDP 指标批判 | **Weg A (Quantitatives Wachstum / BIP als Maßstab)**: 衡量生产力与就业总量；**Weg B (Qualitatives Wachstum / Alternative Wohlstandsindikatoren wie NWI)**: 扣除生态破坏与社会分化。对比总产值增长 vs 真实社会福祉。 |
| 15 | `Lernreise/Sowi-Soziale-Ungleichheit-Gini-DE-L1.md` | 洛伦兹曲线与基尼系数 | **Weg A (Markteinkommensverteilung)**: 依据要素报酬与能力表现初次分配；**Weg B (Sekundärverteilung durch den Sozialstaat)**: 累进税率、转移支付与社会保障二次分配。对比生产积极性激励 vs 贫富差距控制。 |
| 16 | `Lernreise/SoWi-Soziale-Ungleichheit-DE-L1.md` | 社会不平等的结构维度 | **Weg A (Traditionelles Schichten-/Klassenmodell)**: 聚焦收入、财产、学历等物质资本；**Weg B (Modernes Lebensstil- und Milieumodell / Sinus-Milieus)**: 聚焦文化品味、价值观与主观认同。对比垂直经济地位 vs 水平生活方式。 |

---

### 批次 4：SoWi 社会化与综合大题组（SoWi，5 篇）

| 序号 | 文件路径 | 学科主题 (Thema) | Schritt 5 辩证分析路径 (Weg A vs. Weg B) 指引 |
| :---: | :--- | :--- | :--- |
| 17 | `Lernreise/SoWi-Identitaet-Jugend-DE-L1.md` | 青年期发展任务与认同构建 | **Weg A (Hurrelmann: Produktive Realitätsverarbeitung)**: 内外现实的主观协调；**Weg B (Peer-Groups & Mediatisierung)**: 同伴压力、网络虚拟认同与社交标签。对比主体自律建构 vs 外部群体从众。 |
| 18 | `Lernreise/SoWi-Sozialisation-Rolle-DE-L1.md` | 角色理论与社会化过程 | **Weg A (Struktur-funktionalistischer Rollenansatz / Parsons)**: 角色期待具有强制规范性（Muss-/Soll-/Kann-Erwartungen）；**Weg B (Symbolischer Interaktionismus / Mead & Krappmann)**: 角色协商、角色扮演与角色距离。对比社会规范内化 vs 个体能动性与批判。 |
| 19 | `Lernreise/SoWi-Karikatur-DE-L1.md` | 政治漫画分析法 | **Weg A (Deskriptiv-ikonografische Ebene)**: 元素识别、符号解码与历史语境；**Weg B (Kritisch-analytische Deutungsebene)**: 揭示讽刺夸张手法与核心政治态度评判。对比具象元素罗列 vs 隐喻意图提炼。 |
| 20 | `Lernreise/Sowi-Gestaltung-DE-L1.md` | 行动能力与方案设计 | **Weg A (Realpolitischer Reformansatz)**: 在现存体制与财政约束下循序渐进；**Weg B (Struktureller Transformationsansatz)**: 彻底制度创新与规则重塑。对比可行性/阻力控制 vs 解决根本顽疾的彻底性。 |
| 21 | `Lernreise/Sowi-Abitur-Fokus-DE-L1.md` | Abitur 审题与综合评析 | **Weg A (AFB II: Kriteriengeleitete Analyse)**: 提炼观点、结合理论推导因果；**Weg B (AFB III: Begründete Stellungnahme & Urteil)**: 权衡效益（Effizienz）与合法性（Legitimität）。对比客观理论套用 vs 主观独立裁决。 |

---

## 三、外部 AI 执行 Prompt 模版（可整批分发）

交付给外部 AI 时，请复制以下格式的 Prompt：

````text
【任务】：请根据《Aussen-AI 21 Dateien P0 Sanierungsauftrag》规范，重塑给定的 SoWi / Philo Markdown 课件。

【目标文件】：[在此填入具体文件路径，如 Lernreise/Philo-Kategorischer-Imperativ-DE-L1.md]
【学科主题】：[在此填入对应的 Thema]

【改写规范（逐字核对）】：
1. 彻底清除脚手架残留：
   - 检查并删除所有 "Ausgangslage aus der Vorlage:" 及其紧跟的重复段落，确保 Hook 生活切入点自然流畅、引人入胜。

2. 根除数理公式与算法模板（P0 红线）：
   - 全文严禁出现 "$x_1$", "$x_2$", "$d = x_2 - x_1$", "Kennzahl", "Rechnung" 等数学代码。
   - Schritt 5（Verfahrensvergleich）必须替换为任务书中指定的两种理论/考场分析路径对比（Weg A vs. Weg B），包含：
     - VERGLEICH (Wahl des Analysewegs, Weg A gegen Weg B)
     - Weg A 描述（核心观点、优势与局限）
     - Weg B 描述（核心观点、优势与局限）
     - AUFGABE A 与 AUFGABE B（基于具体案例运用两套分析法）
     - HILFE 与 ANTWORT（解释为什么特定考题需要综合权衡两套理论）
     - 单行 Klausur-Satz

3. 重写 Fehlvorstellung（常见思维陷阱）：
   - 彻底删除关于“方法(i)和方法(ii)”的空洞套话，改为德国高中生在本科考场最容易混淆的 2 个真实概念陷阱及对应 Korrektur-Satz。

4. Schritt 8 标记与内容校准：
   - 标题严格写为：## Schritt 8 — reflexion: Takeaway & Metakognitive Reflexion
   - Takeaway-Satz 必须是对本科核心知识与解题思维的高度凝练金句。
   - REFLEXION 的 2 道题目必须引导学生反思本课的核心理论对比与 Klausur 答题规范。

5. Schritt 6 & 7 标题具名化：
   - Schritt 6 标题改为：## Schritt 6 — check: Selbsttest zu <Thema>
   - Schritt 7 标题改为：## Schritt 7 — szenario: <Rolle & Situation>

6. 格式门禁：
   - 保持 8 步完整骨架，包含 Anekdote 与 Fehlvorstellung。
   - 严禁出现未注册教具（只允许使用 balance-board, markt-sim, gini-allocator, highlighter, lego, oral-timer）。
   - 纯德语课件（-DE-）严禁包含任何中文字符（零 CJK）。

【输出格式】：直接输出该文件修复后的完整 Markdown 全文（包含 frontmatter），以便直接覆盖原文件。
````

---

## 四、外部 AI 返回后的校验自动化

外部 AI 返回并覆盖文件后，直接在终端执行：
```powershell
python scripts/audit-pedagogy-integrity.py
```
**合格判定标准**：
- `Prompt Leakage Artifacts: 0 files`
- `Cross-Discipline Math Template Leaks: 0 files`
- `Schritt 8 Mislabeled as 'entdecken': 0 files`
- `python scripts/vault-check.py` 输出 `PASS`，退出码为 0。
