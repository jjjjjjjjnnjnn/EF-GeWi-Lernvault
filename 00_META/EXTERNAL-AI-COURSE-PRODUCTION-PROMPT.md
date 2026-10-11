---
fach: ""
thema: "External AI Enterprise Curriculum Production Specification & Archetypes"
operatoren: []
klausurrelevant: false
datum: 2026-10-10
tags: [EF, Meta, Curriculum, Pedagogy, Archetypes]
version: Enterprise-v4
---

# 外部 AI 企业实训级课程生产总纲与四大教学模板体系 (Master Curriculum Specification & Production Prompt)

> **文件路径 (File Path)**: `00_META/EXTERNAL-AI-COURSE-PRODUCTION-PROMPT.md`  
> **核心受众**: 外部顶级大模型（Claude 3.7 Sonnet / GPT-4o / o3-mini）与课程教研架构师。  
> **使用方式**: 用户可将本文档直接全文复制发送给外部 AI，或截取「第 2 节：外部 AI 核心发卷指令」连同「第 5 节：40 门核心课题矩阵」进行批量分批生产与互联网定向抓取。产出课件直接存入本仓库 `Lernreise/` 根目录下，文件名为 `<Fach>-<Thema-Kebab-Case>-L1.md`。

> **版本声明 / Versionsstand (2026-10-11，`Lernreise/` 实测 361 篇）**：库存事实为 **360× Enterprise-v5（8 步制）+ 1× Lesson-v3 例外，库内 0× v4 成品**——⚠️ 任务简报“5×v4 5步”与实测不符（v4 仅存于本总纲 §4–§5 四范例文本，无独立成品文件）。**新生产默认 v5（8 步）**；v4 模板 A/B/C/D 冻结，仅作标杆参照，不再用于新课。**§8 验收为 v4 口径，仅判 v4 标杆范例；严禁以 §8 五步/单一样式 Option/Archetyp 行卡 v5 新课“违规”**（此即 356 篇误判根源）。

---

## 1. 深度教学法与架构剖析：为什么传统网课与早期课件会“稀碎、学不会”？

任何面向高中与大学先修的高难度学科教学，如果无法建立有效的认知心流，其核心病灶绝非美术或样式问题，而是犯了**教学法（Pedagogy）**与**认知架构（Cognitive Architecture）**的致命错误：

### 1.1 内容表达的三大致命硬伤
1. **假费曼大白话（Pseudo-Feynman Syndrome，用更抽象的套话解释抽象概念）**：
   - *反面典型*：“在社会政治经济体系中如同联动的调节齿轮系统：制度对该维度的调控必然在市场效率与制度兜底之间触发链式反馈效应……”
   - *病理分析*：学习者的大脑工作记忆（Working Memory）容量仅为 4±1 个信息块。当 AI 用“社会政治经济体系”、“调节齿轮系统”、“制度兜底”等 3 个未定义的高阶宏大虚词去解释 1 个基础概念时，学习者产生严重的认知超载与排斥感。
   - *破局铁律*：**费曼技巧必须基于“具象生活微场景”**。比喻必须包含具体的人、具体的买卖交易行为或直观物理实体（如暴风雪抢购取暖器、二手车市场信息不对称、测速雷达抓拍刹车），**字数严禁超过 60 字**！
2. **同义反复与模板填充套娃**：
   - *病理分析*：很多批量生成的课件在“一句话本质”、“生活直觉”和“机制解析”中 100% 复制粘贴相同的废话，让学生读了半天毫无信息增量。
   - *破局铁律*：每一个层级必须有严格的信息递进台阶：**Step 1 直觉站队 ➔ Step 2 动手做实验 ➔ Step 3 因果传导链 ➔ Step 4 排雷对抗 ➔ Step 5 会考论证**。
3. **角色代入完全悬空（虚假 RPG 剧情）**：
   - *反面典型*：“虚拟城邦告急！市长办公室深夜灯火通明！……”
   - *病理分析*：煞有介事地编造廉价网文剧情，底下却既不给学生决策选择，也不模拟推演，而是直接跳到死板的概念罗列，剧情与考点完全脱节。
   - *破局铁律*：**彻底废除虚假剧情**！代之以**哈佛商业案例法（Harvard Case Method）**与真实历史/法律判例（如 2021 年柏林房租上限违宪案、自动驾驶电车难题、浮士德面对虔诚少女问询时的哲学托词）。

### 1.2 交互与布局的三大交互硬伤
1. **“框中框堆叠地狱”（Box-in-Box Syndrome）**：
   - 页面由无数带有黑色方括号的小框机械罗列，视觉毫无主次（Visual Hierarchy），极其冰冷枯燥，像医院政审表。
2. **伪多邻国流（阅读长文后点击“我已理解”）**：
   - 将 2000 字讲义硬塞进关卡壳子里，每一屏全是大段阅读，学生在进入页面的前 2 分钟没有任何交互动作，本质依然是静态电子书。
   - *破局铁律*：**进入页面的前 10 秒钟内，学生必须动手指做出二选一抉择（A vs B 直觉站队）**！选后即时弹出机制解析，才能真正激活思维。
3. **学科教学削足适履（One-Size-Fits-All Collapse）**：
   - 试图用同一种死板的模式套在所有学科上。社科需要**利益博弈与政策传导**；哲学需要**伦理天平与普遍化检验**；文学需要**戏剧冲突与修辞动机解剖**；理科需要 **POE（Predict-Observe-Explain）仿真实验与数学推导**。

---

## 2. 标杆教学体系借鉴：世界顶级企业与平台的课程架构

本规范深度融汇了全球顶尖 AI 机构与互动教育平台的教学精髓：

| 标杆体系 | 核心设计理念 | 在本系统中的落地机制 |
| :--- | :--- | :--- |
| **Anthropic 交互教程** (`anthropics/courses`) | **Motivating Failure ➔ 80/20 Mental Model ➔ Interactive Sandbox ➔ Anti-Patterns** | 从实际失效场景切入，给出最高杠杆的极简心智模型；进入沙盒参数调试；对比正反模式；综合实战。 |
| **Brilliant.org 主动学习** | **Predict-Observe-Explain (POE) 挑战先行模型** | 拒绝先讲后练；必须在未学公式前先进行**反常识直觉预测（Predict）**，再通过**动态仿真（Observe）**亲眼见证现象，最后**导出公理（Explain）**。 |
| **OpenAI / DeepLearning.AI** | **First-Principles Hands-on Lab** | 消除死记硬背，将抽象模型拆解为可操作变量，让学生在互动调参中发现边界条件（Edge Cases）。 |
| **Study-Mate** (`Miaotofu01/Study-Mate`) | **Learn with Doing & Embedded Wissensnotiz** | 边做边学；课程内无缝挂载考纲标准化速查笔记，答题与知识沉淀融为一体。 |
| **Gymnasium NRW (Sek II KLP)** | **AFB I-III 阶梯、因果传导链 (Kausalkette) 与双轨论证** | 严格对齐北威州考纲：AFB I 概念重现 ➔ AFB II 机制分析 ➔ AFB III 依据事实标准（Sachurteil）与价值标准（Werturteil）做出高阶评价。 |

---

## 3. 外部 AI 互联网与 GitHub 深度搜索与调研指引 (Research & Crawl SOP)

若外部 AI（如配备网络搜索与代码浏览能力的 Claude / GPT）在编写前需要抓取更前沿的教学案例，应重点检索以下公开资源与关键词：

### 3.1 核心检索源与 GitHub 仓库
1. **Anthropic 官方课程仓库**：
   - GitHub 检索：`anthropics/prompt-eng-interactive-tutorial` 与 `anthropics/courses`
   - 重点提取：其在 Jupyter Notebook 中采用的“故意让模型失败 ➔ 引导学员体验痛点 ➔ 给出一句话规则 ➔ 在 Playground 中动手调试 ➔ 总结 Anti-Patterns”的认知闭环设计。
2. **Study-Mate 智能学习助手**：
   - GitHub 检索：`Miaotofu01/Study-Mate`
   - 重点提取：其「概念课 / 实操课 / 实验课」三轨分类法，以及工作区记忆沉淀与教科书级笔记配图融合逻辑。
3. **PhET 互动仿真实验实验室**：
   - 来源：`phet.colorado.edu` 及相关开源 HTML5 仿真组件
   - 重点提取：物理运动学、化学平衡移动、生物膜渗透的变量联动逻辑与即时动态图表。
4. **德国北威州官方高中考纲 (KLP NRW)**：
   - 来源：`Schulentwicklung NRW (Standardsicherung)` 官方课程标准
   - 重点检索词：`Kernlehrplan Gymnasium Sekundarstufe II NRW [Fach]`，尤其是每个 Inhaltsfeld 规定的核心术语（Fachbegriffe）、操作动词（Operatoren: *analysieren, darstellen, beurteilen, erörtern*）与阅卷标准（Erwartungshorizont）。

---

## 4. 四大分科黄金教学模板体系 (The 4 Canonical Course Archetypes)

本规范制定了严格的四大分科教学模板，所有未来课件必须对号入座，严禁跨门类混淆：

### 4.1 模板 A：社科博弈与因果闭环模型 (SoWi / Politik / Wirtschaft)
- **核心逻辑**：稀缺资源分配 ➔ 利益博弈 ➔ 价格四大功能 ➔ 政策干预的副作用 ➔ 效率 vs 公平双轨评价。
- **五步结构**：
  1. `## Schritt 1 — entdecken`: **10 秒直觉站队 (Intuitions-Check)** —— 给出真实紧缺场景（如暴风雪取暖器稀缺），二选一（A: 自由涨价出清 vs B: 政府限价排队），选后立即揭示价格机制的冷酷效率与社会正义底线。
  2. `## Schritt 2 — ausprobieren`: **供求沙盒与政策实验台 (`[Werkzeug: markt-sim]` / `balance`)** —— 调节供给需求或限价滑块，观察超额需求、短缺与无谓损失。
  3. `## Schritt 3 — entdecken`: **因果链条 (Kausalkette) 与三大考纲术语** —— 严整的因果流程图与 Fachbegriffe（中德双语）。
  4. `## Schritt 4 — check`: **排雷对抗与政策误区 (Anti-Patterns)** —— 辨析常见考场陷阱（如把完全市场当成真实超市）。
  5. `## Schritt 5 — szenario`: **15 NP 会考双轨评价 (Kriteriengeleitetes Urteil, AFB III)** —— 从 Sachurteil（经济效率）与 Werturteil（社会公平）两个维度做出满分论证。

### 4.2 模板 B：伦理法庭与第一性原理思辨模型 (Philosophie / Ethik)
- **核心逻辑**：极端伦理困境 ➔ 功利算盘 vs 绝对义务 ➔ 利益天平权衡 ➔ 康德普遍化逻辑检验 ➔ 合题论证。
- **五步结构**：
  1. `## Schritt 1 — entdecken`: **伦理站队与道德电车 (Moralisches Dilemma)** —— 给出不可回避的现实两难（如自动驾驶致命避险决策），二选一（A: 功利主义追求整体福祉最大化 vs B: 康德义务论坚守个体尊严底线），选后即时揭示目的论与义务论的根本哲学冲突。
  2. `## Schritt 2 — ausprobieren`: **交互伦理天平 (`[Werkzeug: ethik-waage]` / `balance`)** —— 调节当事各方的利益、生命数与道德权重，观察天平倾斜与幸福极大化困境。
  3. `## Schritt 3 — entdecken`: **康德普遍化逻辑检验 (Kants Universalisierungs-Filter)** —— 行为准则（Maxime）➔ 普遍法则 ➔ 逻辑自洽检验 ➔ 绝对命令（Kategorischer Imperativ）。
  4. `## Schritt 4 — check`: **庸俗化假辩证排雷 (Fehlvorstellung)** —— 破除将康德定言命令庸俗化为“黄金法则（己所不欲勿施于人）”等失分误区。
  5. `## Schritt 5 — szenario`: **15 NP 会考哲学价值裁决 (Werturteil nach KLP NRW, AFB III)** —— 产出符合德国高中哲学会考标准的 15 NP 学术范文收尾句。

### 4.3 模板 C：文学戏剧解剖与时代修辞透镜模型 (Deutsch / Englisch)
- **核心逻辑**：戏剧冲突节选 ➔ 潜台词与深层动机 ➔ 修辞显微镜 ➔ 时代思潮暗流 (Epochen-DNA) ➔ 会考三段论分析。
- **五步结构**：
  1. `## Schritt 1 — entdecken`: **台词交锋与动机站队 (Text-Bühne & Motiv-Check)** —— 截取一段极其尖锐的名篇原著名段台词（如浮士德面对宗教诘问），二选一（A: 崇高真诚的泛神论告白 vs B: 哲学回避与诱捕少女的话术），选后揭示时代思想对立。
  2. `## Schritt 2 — ausprobieren`: **修辞显微镜与高亮分析台 (`[Werkzeug: highlighter]`)** —— 选出核心修辞格（排比、反问、隐喻），进行功能分析（Funktionsanalyse）而非报菜名。
  3. `## Schritt 3 — entdecken`: **时代 DNA 与戏剧结构轴 (Epochen-DNA & Freytags Pyramide)** —— 启蒙理性 vs 狂飙突进本能；五幕剧金字塔节点定位。
  4. `## Schritt 4 — check`: **抄书翻译陷阱排雷 (Paraphrase-Abwehr)** —— 考官扣分红线：严禁纯粹复述故事情节（Inhaltsangabe），必须分析“形式如何承载内容”。
  5. `## Schritt 5 — szenario`: **15 NP 会考戏剧分析标准句 (Dramenanalyse-Meistersatz, AFB II/III)** —— 严格输出符合德国考场采分点的结构化范文。

### 4.4 模板 D：理科 POE 仿真探究实验室 (Mathe / Physik / Chemie / Bio)
- **核心逻辑**：反常识预测 ➔ 动态仿真微世界 ➔ 极限与定律公式推导 ➔ 考场计算防错 ➔ 三步法题解。
- **五步结构**：
  1. `## Schritt 1 — entdecken`: **反常识预测挑战 (Predict)** —— 抛出直觉冲突（如平均速度 vs 测速雷达瞬间抓拍），二选一预测，选后揭示“割线到切线、差商到微商”的极限本质。
  2. `## Schritt 2 — ausprobieren`: **动态微积分/物理参数沙盒 (`[Werkzeug: tangent-slider]` / `kinematik`)** —— 拖动 $h \to 0$ 滑块，亲眼看着两点逐步逼近，割线演化为切线。
  3. `## Schritt 3 — entdecken`: **定律推导与几何/物理意义 (Explain & Herleitung)** —— LaTeX 规范公式 $f'(x_0) = \lim_{h \to 0} \frac{f(x_0+h) - f(x_0)}{h}$，中德专业含义拆解。
  4. `## Schritt 4 — check`: **符号误区与单位陷阱 (Rechenfalle)** —— 排查高频失分点（平均变化率 vs 瞬时变化率混淆、导数符号格式不合德标规范）。
  5. `## Schritt 5 — szenario`: **15 NP 会考三步求解范式 (Ansatz -> Rechnung -> Interpretation)** —— 给出标准计算大题与踩分示范。

---

## 5. 四门标杆课件完整工业级范例 (Exemplars)

为确保外部 AI 拥有 100% 毫无歧义的生成依据，以下分别提供四类模板的完整标准 Markdown 范本：

### 5.1 模板 A 范例：`Lernreise/SoWi-Vollkommener-Markt-Angebot-Nachfrage-L1.md`

```markdown
---
fach: SoWi
thema: "Modell des vollkommenen Marktes (Angebot & Nachfrage)"
level: 1
ziel: Klausur
xp: 100
operatoren: [darstellen, analysieren, beurteilen]
klausurrelevant: true
datum: 2026-10-10
tags: [EF, SoWi, Wirtschaft]
version: Enterprise-v4
---

# Lernreise: Modell des vollkommenen Marktes (Angebot & Nachfrage) (L1, Ziel: Klausur)

> 💡 **Didaktischer Archetyp**: A: 社科博弈与因果闭环模型 (Dilemma-Incentive-Kausalkette)  
> 🎯 **核心教具标号 (Werkzeug ID)**: `[Werkzeug: markt-sim]`

---

## Schritt 1 — entdecken: Der Schneesturm-Stresstest (Intuitions-Check)

> **真实情境**: 一场极端暴风雪导致全城取暖供气瘫痪。全城仅剩最后 100 台取暖器，却有 5000 户居民急需取暖。

**设问 (Leitfrage)**: 如果把这 100 台取暖器的分配完全交由“自由市场机制（Freier Markt）”，会发生什么？

- **[ Option A ]**: 商家疯狂涨价至 2000 欧：谁出钱多谁买走。穷人冻死，但商品绝不滞销（瞬间出清）。
  - *Mechanismus A*: 这就是完全竞争市场冷酷而高效的本质！价格不是用来做慈善的，而是作为“稀缺信号（Knappheitssignal）”指示紧缺，并把商品配置给支付意愿最高的人（Allokationsfunktion）。商品实现市场出清（Räumungsfunktion），但完全不考虑社会公正。
- **[ Option B ]**: 政府强制最高限价 50 欧：人人买得起，前 100 个人买走，剩下的人有钱也买不到，滋生黑市与黄牛。
  - *Mechanismus B*: 政府限价虽然维持了名义平价，却直接引发严重的“超额需求（Nachfrageüberhang）”！因为价格被锁死，丧失了排队筛除功能与供给激励，导致大排长龙、商品短缺与黑市蔓延。

> **一句话因果本质**: 价格是灵敏的“稀缺温度计”，不是福利救济金：它保障资源配置的高效率，但天生不具备社会公平兜底能力。

**Klausur-Satz**: `Der Preismechanismus koordiniert Angebot und Nachfrage über den Gleichgewichtspreis und sichert im Modell des vollkommenen Marktes eine effiziente Allokation, ignoriert jedoch soziale Verteilungsgerechtigkeit.`

---

## Schritt 2 — ausprobieren: Interaktiver Sandkasten [Werkzeug: markt-sim]

AUFGABE (analysieren, AFB II):
1. Öffne das Markt-Labor und setze die Nachfragekurve auf $N(p) = 120 - 4p$ und das Angebot auf $A(p) = 20 + 6p$.
2. Ermittle den Gleichgewichtspreis $p_G$ und die gehandelte Menge $q_G$.
3. Führe einen Probe-Höchstpreis von $p_{max} = 8\text{ €}$ ein und analysiere die resultierende Mengen-Differenz.

HILFE:
- Schnittpunkt setzen: $120 - 4p = 20 + 6p \rightarrow 100 = 10p \rightarrow p_G = 10\text{ €}$.
- Bei $p_G = 10$ ist die Menge $q_G = 80$.
- Liegt $p_{max} = 8$ unter $p_G$, frage $N(8) = 88$ und $A(8) = 68$ ab.

MUSTERLÖSUNG:
Der staatliche Höchstpreis unterhalb des Gleichgewichts erzeugt einen Nachfrageüberhang von $88 - 68 = 20$ Einheiten. Güterknappheit und Warteschlangen sind die unmittelbare Folge.

Klausur-Satz: `Ein administrativer Höchstpreis unterhalb des Marktgleichgewichts führt unweigerlich zu einem Nachfrageüberhang und induziert Wohlfahrtsverluste.`

---

## Schritt 3 — entdecken: Kausalkette & KLP-Begriffsmatrix

### 3.1 价格机制因果闭环图解

```diagram
[ Knappheitssignal: Hohe Nachfrage / Geringes Angebot ]
                         |
                         v
[ Preisanstieg lenkt Kauf- und Verkaufsentscheidungen (Allokation) ]
                         |
                         v
[ Angebot steigt, Nachfrage sinkt bis zum Schnittpunkt ]
                         |
                         v
[ Gleichgewichtspreis räumt den Markt (Markträumung) ]
```

### 3.2 考纲核心三词 (KLP-Termini)

1. **Preismechanismus** (价格机制): 自发协调供求双方决策的去中心化价格调节系统。
2. **Allokationseffizienz** (配置效率): 稀缺经济资源准确流向产出效益最高领域的效率状态。
3. **Nachfrageüberhang** (超额需求): 价格低于均衡点时，意愿购买量大于意愿供给量的短缺状态。

**Klausur-Satz**: `Über die Signal-, Allokations- und Räumungsfunktion steuert der Preis die dezentralen Wirtschaftspläne aller Akteure hin zum markträumenden Gleichgewicht.`

---

## Schritt 4 — check: Fehlvorstellung & Anti-Patterns (排雷对抗)

### 4.1 典型认知误区 (Fehlvorstellung)
- **误区**: 学生往往误以为“完全市场模型就是德国现实生活中的自由菜市场或超市”。
- **考官扣分真相**: 忽视了完全市场是一个“纯理论抽象模型（Homogene Güter, Markttransparenz, keine Präferenzen）”。现实中存在信息不对称与垄断，因此必有市场失灵。
- **解毒心智**: 区分“理论参考标尺（Referenzmodell）”与“现实混合经济（Soziale Marktwirtschaft）”。

### 4.2 关卡微测对抗
`FRAGE: Warum beseitigt ein gesetzlicher Mietendeckel unter dem Gleichgewichtspreis keine Wohnungsnot? | ANTWORT: Weil er das Angebot dämpft (geringere Bauanreize) und die Nachfrage befeuert, wodurch der Nachfrageüberhang vergrößert wird.`

**Klausur-Satz**: `Staatliche Fixpreise verzerren das Preissignal und führen zu Fehlallokationen sowie informellen Ausweichmärkten.`

---

## Schritt 5 — szenario: 15 NP Klausur-Transfer (AFB III)

> **ROLLE**: Leitender ökonomischer Berater des Wirtschaftsministeriums NRW.  
> **SITUATION**: Angesichts explodierender Strompreise fordern Bürgerinitiativen einen bundesweiten Strompreisdeckel von 20 Cent/kWh, während Energiekonzerne vor Versorgungszusammenbrüchen warnen.

**AUFGABE (beurteilen, AFB III)**:
Beurteilen Sie die Einführung eines staatlichen Strompreisdeckels aus ordnungspolitischer Sicht unter Abwägung von ökonomischer Effizienz und sozialer Verteilungsgerechtigkeit.

**BEWERTUNGSRUBRIK (15 NP)**:
1. **Sachkriterium (Effizienz)**: Aufzeigen des Nachfrageüberhangs, der gedämpften Sparanreize und des drohenden Wohlfahrtsverlusts (Markträumung blockiert).
2. **Wertkriterium (Gerechtigkeit)**: Anerkennung des Sozialstaatsgebots (Schutz einkommensschwacher Haushalte vor Kältearmut).
3. **Synthese**: Empfehlung zielgerichteter direkter Transferzahlungen (z.B. Wohngeld-Zuschuss) statt marktverzerrender Preisdeckel.

**15 NP MUSTER-KLAUSURSATZ**:
> `"Während ein Strompreisdeckel kurzfristig soziale Härten abfedert, zerstört er die Signalfunktion des Preises und verschärft das Knappheitsproblem; ordnungspolitisch vorzuziehen sind daher einkommensbasierte Direkttransfers, die den Preismechanismus intakt lassen."`
```

---

### 5.2 模板 B 范例：`Lernreise/Philosophie-Kants-Kategorischer-Imperativ-L1.md`

```markdown
---
fach: Philosophie
thema: "Kants Kategorischer Imperativ"
level: 1
ziel: Klausur
xp: 100
operatoren: [darstellen, analysieren, beurteilen]
klausurrelevant: true
datum: 2026-10-10
tags: [EF, Philosophie, Ethik]
version: Enterprise-v4
---

# Lernreise: Kants Kategorischer Imperativ (L1, Ziel: Klausur)

> 💡 **Didaktischer Archetyp**: B: 伦理法庭与第一性原理思辨模型 (Ethical Crucible & Logic Scaffolding)  
> 🎯 **核心教具标号 (Werkzeug ID)**: `[Werkzeug: ethik-waage]`

---

## Schritt 1 — entdecken: Das Notlügen-Dilemma (Intuitions-Check)

> **真实情境**: 一名无辜的朋友躲在你家地下室逃避暴徒追杀。暴徒手持武器敲门逼问你：“他在不在你里面？”

**设问 (Leitfrage)**: 你该说实话还是说谎？哪一种行为符合最高的道德准则？

- **[ Option A ]**: 坚决撒谎保护朋友：生命高于诚实！只要结局拯救了生命，说谎在道德上就是完全正当的。
  - *Mechanismus A*: 这是功利主义后果论（Utilitarismus / Teleologie）：道德评判完全取决于最终行为带来的后果与幸福总量。但在极端情况下，如果为了多数人的利益，个人权利随时可以被践踏。
- **[ Option B ]**: 坚守诚实绝不说谎：说谎在任何情况下都是绝对错误的，人不能以欺骗为手段。
  - *Mechanismus B*: 这就是康德义务论（Deontologie）的终极坚持：诚实是绝对责任（Unbedingte Pflicht）。如果你把说谎合法化，就会摧毁全人类互信的逻辑基础。人是目的，绝不能成为工具。

> **一句话因果本质**: 功利主义用“天平称量后果”，康德义务论用“纯粹理性检验原则”：道德不是利益的算盘，而是无条件的命令。

**Klausur-Satz**: `Nach Kants deontologischer Ethik besitzt die moralische Pflicht kategorischen Charakter, wodurch Handlungen unabhängig von ihren empirischen Folgen allein an ihrer Vernunftgemäßheit zu messen sind.`

---

## Schritt 2 — ausprobieren: Interaktive Ethik-Waage [Werkzeug: ethik-waage]

AUFGABE (analysieren, AFB II):
1. Belade die linke Waagschale (Utilitarismus) mit den geretteten Leben (5 Personen) und die rechte Schale mit Kants Würde-Axiom (1 Person als reines Mittel).
2. Beobachte, wie der Utilitarismus kippt, während Kants Imperativ die Verrechnung von Menschenleben prinzipiell untersagt.

HILFE:
- Prüfe: Darf ein Mensch instrumentalisiert werden, um fünf andere zu retten?
- Siehe Art. 1 Abs. 1 GG (Die Würde des Menschen ist unantastbar).

MUSTERLÖSUNG:
Die quantitative Nutzenrechnung stößt an die Grenze der unantastbaren Menschenwürde (Selbstzweckformel).

Klausur-Satz: `Die Instrumentalisierung eines Menschen zur Rettung anderer widerspricht der Selbstzweckformel und ist moralisch unzulässig.`

---

## Schritt 3 — entdecken: Kants Universalisierungs-Filter

```diagram
[ Subjektive Maxime: "Ich darf lügen, um Not abzuwenden" ]
                          |
                          v
[ Universalisierung: Gesetz für alle Menschen ]
                          |
                          v
[ Widerspruch im Denken: Begriff des Versprechens zerstört sich selbst ]
                          |
                          v
[ Urteil: Verwerfung der Maxime -> Pflicht zum Nicht-Lügen ]
```

### 考纲核心三词 (KLP-Termini)

1. **Kategorischer Imperativ** (定言命令): 无条件的理性道德法则：“只按照你同时希望它成为普遍法则的准绳行动”。
2. **Deontologie** (义务论): 依据行为本身的内在道德性质（出于义务），而非后果进行裁决的伦理学体系。
3. **Selbstzweckformel** (人是目的公式): 任何人绝不能仅仅被当作实现其他目的的手段，而必须始终被视为目的本身。

**Klausur-Satz**: `Der Kategorische Imperativ fungiert als formaler Prüfstein, der Maximen auf ihre logische Universalisierbarkeit ohne inneren Widerspruch testet.`

---

## Schritt 4 — check: Schein-Argumente & Abwehr (排雷对抗)

### 4.1 典型认知误区 (Fehlvorstellung)
- **误区**: 把康德定言命令等同于俗语“黄金法则（Goldene Regel: Was du nicht willst, dass man dir tu...）”。
- **考官扣分真相**: 黄金法则依赖于“主观偏好与情感渴望”，而康德的定言命令是基于“纯粹客观理性的无条件必然性”。
- **解毒心智**: 扣住定言命令的“无条件性（Unbedingtheit）”与“逻辑非矛盾性”。

### 4.2 关卡微测对抗
`FRAGE: Warum scheitert die Maxime 'Falschgeld drucken bei Geldnot' am Kategorischen Imperativ? | ANTWORT: Weil eine Universalisierung den Geldwert und das Währungssystem zerstören würde, sodass Falschgeld keinen Nutzen mehr hätte (Widerspruch im Wollen und Denken).`

**Klausur-Satz**: `Eine Maxime ist dann moralisch unzulässig, wenn ihre Verallgemeinerung den Zweck der Handlung logisch untergräbt.`

---

## Schritt 5 — szenario: 15 NP Philosophisches Werturteil (AFB III)

> **ROLLE**: Mitglied des Deutschen Ethikrats.  
> **SITUATION**: Die Bundeswehr erwägt den Abschuss eines entführten Passagierflugzeugs, das von Terroristen auf ein vollbesetztes Fußballstadion mit 70.000 Menschen gesteuert wird.

**AUFGABE (beurteilen, AFB III)**:
Beurteilen Sie die verfassungsrechtliche und philosophische Zulässigkeit des Abschusses unter Kontrastierung von Utilitarismus und Kants Deontologie.

**BEWERTUNGSRUBRIK (15 NP)**:
1. **Utilitaristische Position**: Rettung von 70.000 Menschen überwiegt den Verlust der Flugzeuginsassen (Folgenkalkül).
2. **Kantische Kritik**: Die Passagiere werden zum bloßen Objekt und Mittel fremder Zwecke degradiert; Verstoß gegen Art. 1 Abs. 1 GG (Luftsicherheitsgesetz-Urteil BVerfG 2006).
3. **Fazit**: Zurückweisung des Abschusses auf Basis des absoluten Würdeschutzes.

**15 NP MUSTER-KLAUSURSATZ**:
> `"Da das menschliche Leben der quantitativen Verrechnung von vornherein entzogen ist, verbietet Kants Selbstzweckformel die Aufrechnung von Passagieren gegen Stadionbesucher und begründet das absolute Tötungsverbot unschuldiger Dritter."`
```

---

### 5.3 模板 C 范例：`Lernreise/Deutsch-Goethe-Faust-Gretchenfrage-L1.md`

```markdown
---
fach: Deutsch
thema: "Goethes Faust I: Die Gretchenfrage"
level: 1
ziel: Klausur
xp: 100
operatoren: [darstellen, analysieren, interpretieren]
klausurrelevant: true
datum: 2026-10-10
tags: [EF, Deutsch, Drama]
version: Enterprise-v4
---

# Lernreise: Goethes Faust I: Die Gretchenfrage (L1, Ziel: Klausur)

> 💡 **Didaktischer Archetyp**: C: 文学戏剧解剖与时代修辞透镜模型 (Text-Anatomy & Rhetorical Strategy)  
> 🎯 **核心教具标号 (Werkzeug ID)**: `[Werkzeug: highlighter]`

---

## Schritt 1 — entdecken: Marthens Garten: Das Bekenntnis-Duell (Motiv-Check)

> **戏剧场景**: 玛塔的花园中，单纯虔诚的少女马加蕾特（Gretchen）直视大学者浮士德，抛出了灵魂审问：“Nun sag, wie hast du’s mit der Religion?”

**设问 (Leitfrage)**: 浮士德随后滔滔不绝讲了一大段赞美自然与情感的壮丽长篇，他的根本动机是什么？

- **[ Option A ]**: 崇高真诚的泛神论哲学表达：他超越了传统教会的狭隘教条，向少女袒露内心纯粹的泛神论信仰。
  - *Mechanismus A*: 这是表层的文本误读。浮士德的话虽然优美，却巧妙回避了客观基督教义（Gott, Sakramente），企图用高深莫测的形而上修辞掩盖自己的虚无。
- **[ Option B ]**: 哲学回避与诱捕少女的修辞操控：以崇高的话术消解道德边界，旨在打消少女的戒心并实现肉体诱惑。
  - *Mechanismus B*: 这正是浮士德复杂而危险的人格分裂！他借狂飙突进（Sturm und Drang）的情感主义（Gefühl ist alles）取代启蒙理智与宗教戒律，将崇高的形而上思考异化为情欲征服的工具。

> **一句话因果本质**: 浮士德用崇高辞藻将“信仰”偷换为“情感体验”，表面上解放了人性，实质上为后续悲剧埋下了道德虚无的祸根。

**Klausur-Satz**: `Fausts Ausflucht in ein pantheistisches Gefühlsbekenntnis dient der rhetorischen Demontage kirchlicher Dogmen und maskiert seine Verführungsabsicht hinter einem erhabenen Sprachgestus.`

---

## Schritt 2 — ausprobieren: Rhetorische Lupe [Werkzeug: highlighter]

AUFGABE (analysieren, AFB II):
Markiere in Fausts Rede (V. 3432–3458) die zentralen rhetorischen Stilmittel und bestimme deren appellative Funktion.

HILFE:
- Achte auf die Häufung von Alliterationen und Tautologien ("Gefühl ist alles; Name ist Schall und Rauch").
- Analysiere das Oxymoron und die Metaphorik des "Umwölbens".

MUSTERLÖSUNG:
Die Entwertung der Benennung ("Name ist Schall und Rauch") delegitimiert Gretchens dogmatische Glaubenswelt und etabliert das unkontrollierbare Gefühl als höchste Instanz.

Klausur-Satz: `Durch die antithetische Gegenüberstellung von Begriff ("Schall und Rauch") und Gefühl ("alles") entzieht sich Faust jeder verbindlichen theologischen Festlegung.`

---

## Schritt 3 — entdecken: Epochen-DNA & Dramaturgische Achse

```diagram
[ Gretchens Welt: Kleinbürgerliche Frömmigkeit & kirchliche Bindung ]
                                  |
                   (Konflikt / Gretchenfrage)
                                  v
[ Fausts Welt: Titanischer Wissensdrang & Sturm-und-Drang-Subjektivismus ]
                                  |
                                  v
[ Syntheseversuch scheitert -> Moralischer Verfall und Gretchentragödie ]
```

### 考纲核心三词 (KLP-Termini)

1. **Gretchenfrage** (宗教拷问/试金石之问): 指代触及核心原则、令人难堪且不可回避的根本立场拷问。
2. **Pantheismus** (泛神论): 将神与宇宙/自然合而为一的哲学世界观（Deus sive Natura）。
3. **Sturm-und-Drang-Subjektivismus** (狂飙突进主观主义): 将个体澎湃的情感与冲动置于社会既定秩序与伦理规范之上的思潮。

**Klausur-Satz**: `Der Dialog in Marthens Garten markiert das Aufeinandertreffen ständischer Restriktion und geniezeitlicher Entgrenzung und leitet die Katastrophe der Gretchentragödie ein.`

---

## Schritt 4 — check: Paraphrase-Abwehr (排雷对抗)

### 4.1 典型认知误区 (Fehlvorstellung)
- **误区**: 把课本上的情节机械复述一遍，当成文本分析（Inhaltsangabe statt Textanalyse）。
- **考官扣分真相**: 阅卷评分标准明确要求：凡只写“浮士德说了什么”而未结合“辞格形式（Wie）如何服务于人物博弈心理（Warum）”，最高只能拿到 4 NP（不及格）。
- **解毒心智**: 牢记三段论公式：**文本证据 (Beleg) ➔ 形式手法 (Mittel) ➔ 心理与时代功能 (Funktion)**。

### 4.2 关卡微测对抗
`FRAGE: Warum antwortet Gretchen resigniert mit: 'Das ist alles recht schön und gut; Ungefähr sagt das der Pfarrer auch, Nur mit ein bißchen andern Worten'? | ANTWORT: Weil sie intuitiv erfasst, dass Fausts schöne Worte eine Leerstelle umhüllen: Er bekennt sich nicht zur christlichen Moral.`

**Klausur-Satz**: `Gretchens Entgegnung offenbart die Unvereinbarkeit ihrer dogmatischen Glaubensgewissheit mit Fausts säkularisierter Gefühlsreligion.`

---

## Schritt 5 — szenario: 15 NP Klausur-Textanalyse (AFB II/III)

> **ROLLE**: Literaturwissenschaftlicher Gutachter für das Abitur Zentralprüfungswesen NRW.  
> **SITUATION**: Die Szene "Marthens Garten" soll im Abitur als zentrales Drama-Textbeispiel zur Epoche zwischen Aufklärung und Klassik vorgelegt werden.

**AUFGABE (interpretieren, AFB III)**:
Interpretieren Sie Fausts Antwort auf die Gretchenfrage im Hinblick auf den dramatischen Figurenkonflikt und das epochentypische Menschenbild.

**BEWERTUNGSRUBRIK (15 NP)**:
1. **Textimmanente Analyse**: Präzise Belege für Fausts rhetorische Ausweichstrategie (Metaphorik des Gefühls).
2. **Kontextualisierung**: Einbettung in Goethes Epochenüberwindung (Aufklärung vs. Sturm und Drang).
3. **Wirkung auf Gretchen**: Das Ausgeliefertsein der religiös geprägten Frauenfigur gegenüber dem intellektuell überlegenen Gelehrten.

**15 NP MUSTER-KLAUSURSATZ**:
> `"Indem Faust die religiöse Frage ins Ästhetische und Emotionale verlagert, verführt er Gretchen auf sprachlicher Ebene und besiegelt damit das Schicksal der von Schuldgefühlen zerrissenen Kindsmörderin."`
```

---

### 5.4 模板 D 范例：`Lernreise/Mathe-Von-der-Sekante-zur-Tangente-L1.md`

```markdown
---
fach: Mathe
thema: "Von der Sekante zur Tangente (Ableitung)"
level: 1
ziel: Klausur
xp: 100
operatoren: [berechnen, darstellen, interpretieren]
klausurrelevant: true
datum: 2026-10-10
tags: [EF, Mathe, Analysis]
version: Enterprise-v4
---

# Lernreise: Von der Sekante zur Tangente (Ableitung) (L1, Ziel: Klausur)

> 💡 **Didaktischer Archetyp**: D: 理科 POE 仿真探究实验室 (Predict-Observe-Derive)  
> 🎯 **核心教具标号 (Werkzeug ID)**: `[Werkzeug: tangent-slider]`

---

## Schritt 1 — entdecken: Die Radarfallen-Täuschung (Predict)

> **现实情境**: 一辆跑车在 10 秒内加速驶过一段 200 米的测速路段。交警测得它的平均速度是 $20\text{ m/s}$（即 $72\text{ km/h}$，未超速）。但在第 8 秒那一个瞬间，激光测速枪记录到的真实车速到底是多少？

**设问 (Leitfrage)**: 能否用简单的“距离差除以时间差（$\frac{\Delta s}{\Delta t}$）”求出第 8 秒瞬间的精确速度？

- **[ Option A ]**: 当然可以：只要把时间区间设为 1 秒（从第 8 秒到第 9 秒），平均速度就等于瞬间速度。
  - *Mechanismus A*: 这是初等数学的常见错觉！只要 $\Delta t > 0$，算出来的就永远是“割线斜率（Sekantensteigung / mittlere Änderungsrate）”，在这 1 秒内汽车依然在加速，因此存在无法消除的滞后误差。
- **[ Option B ]**: 必须让时间区间无限逼近于 0：让两个测量点极限重合，求解切线斜率（Tangentensteigung）。
  - *Mechanismus B*: 这正是微积分的革命性飞跃！通过极限过程（Limes $h \to 0$），将差商蜕变为瞬时微商 $f'(x)$。割线在极限处演变为切线，精确捕捉瞬间演化速率。

> **一句话因果本质**: 割线是两点间的“宏观平均”，切线是单点处的“瞬时灵魂”：微积分的全部秘密就是让两点距离 $h$ 无限逼近于 0。

**Klausur-Satz**: `Der Differenzenquotient beschreibt die mittlere Änderungsrate über ein Intervall, während der Differentialquotient als Grenzwert für $h \to 0$ die lokale Momentanänderungsrate im Punkt exakt erfasst.`

---

## Schritt 2 — ausprobieren: Interaktiver Tangenten-Slider [Werkzeug: tangent-slider]

AUFGABE (berechnen, AFB II):
1. Wähle die Funktion $f(x) = x^2$ an der Stelle $x_0 = 2$.
2. Verringere den Abstand $h$ über den Schieberegler von $h = 1$ schrittweise auf $h = 0{,}1$ und $h = 0{,}001$.
3. Beobachte die Dreieckssteigung und wie die Sekante sich der Berührgeraden (Tangente) anpasst.

HILFE:
- Berechne für $h=1$: $\frac{(2+1)^2 - 2^2}{1} = \frac{9-4}{1} = 5$.
- Berechne für $h=0{,}1$: $\frac{(2{,}1)^2 - 4}{0{,}1} = \frac{4{,}41 - 4}{0{,}1} = 4{,}1$.
- Welcher Zahl nähert sich die Steigung für $h \to 0$?

MUSTERLÖSUNG:
Für $h \to 0$ konvergiert der Wert exakt gegen $m = 4$. Dies ist der Wert der ersten Ableitung $f'(2) = 4$.

Klausur-Satz: `Beim Grenzübergang $h \to 0$ geht die Sekante durch $P(x_0 \mid f(x_0))$ und $Q(x_0+h \mid f(x_0+h))$ in die Tangente mit der Steigung $m = f'(x_0)$ über.`

---

## Schritt 3 — entdecken: Formale Herleitung & KLP-Begriffsmatrix

### 3.1 极限推导三步图解

```diagram
[ Punkt P(x0) und entfernter Punkt Q(x0+h) ]
                     |
         (Differenzenquotient bilden)
                     v
[ Steigung der Sekante: m_s = (f(x0+h) - f(x0)) / h ]
                     |
         (Grenzübergang Limes h -> 0)
                     v
[ Tangentensteigung: f'(x0) = lim (h->0) (f(x0+h) - f(x0)) / h ]
```

### 3.2 考纲核心三词 (KLP-Termini)

1. **Differenzenquotient** (差商): 割线斜率，表示某一闭区间内的平均变化率（mittlere Änderungsrate）。
2. **Differentialquotient / Ableitung** (微商/导数): 差商在 $h \to 0$ 时的极限，表示特定点的瞬时变化率（lokale Änderungsrate）。
3. **Tangente** (切线): 在特定点与函数曲线相切且斜率严格等于该点导数值的直线方程 $t(x) = f'(x_0)(x - x_0) + f(x_0)$。

**Klausur-Satz**: `Die Ableitung einer Funktion $f$ an der Stelle $x_0$ entspricht der Steigung der Tangente an den Funktionsgraphen in diesem Punkt.`

---

## Schritt 4 — check: Rechenfalle & GTR/CAS-Abgleich (排雷对抗)

### 4.1 典型认知误区 (Fehlvorstellung)
- **误区**: 把 $h = 0$ 直接代入分母，得出“除以 0 无意义”的错误结论。
- **考官扣分真相**: 极限不是把 0 代入分母，而是先进行分子代数因式分解并约分 $h$，再让剩余项中的 $h$ 趋向于 0。直接代入 0 导致步骤分全扣。
- **解毒心智**: 记住“先化简约分，后取极限（Erst kürzen, dann Grenzprozess）”。

### 4.2 关卡微测对抗
`FRAGE: Was ist der geometrische Unterschied zwischen der Sekantensteigung und der Tangentensteigung? | ANTWORT: Die Sekantensteigung schneidet die Kurve in zwei getrennten Punkten (Intervall), während die Tangente die Kurve im Berührpunkt lokal linear approximiert.`

**Klausur-Satz**: `Im Unterschied zur Sekante, die ein durchschnittliches Intervallverhalten abbildet, beschreibt die Tangente das momentane lokale Änderungsverhalten.`

---

## Schritt 5 — szenario: 15 NP Klausur-Rechnung (Dreischritt)

> **SITUATION**: Gegeben ist die Flugbahn einer Modellrakete durch $h(t) = -5t^2 + 30t$ ($t$ in Sekunden, $h$ in Metern).

**AUFGABE (berechnen & interpretieren, AFB II/III)**:
1. Bestimmen Sie die mittlere Steiggeschwindigkeit im Intervall $[1; 3]$.
2. Berechnen Sie die Momentangeschwindigkeit zum Zeitpunkt $t_0 = 1$ exakt über den Grenzwert des Differenzenquotienten.
3. Interpretieren Sie das Vorzeichen der Ableitung zum Zeitpunkt $t = 4$.

**MUSTERLÖSUNG (15 NP Dreischritt)**:
1. **Schritt 1 (Ansatz & mittlere Rate)**:
   $$\frac{h(3) - h(1)}{3 - 1} = \frac{(-45 + 90) - (-5 + 30)}{2} = \frac{45 - 25}{2} = 10\text{ m/s}$$
2. **Schritt 2 (Lokale Rate über Limes)**:
   $$h'(1) = \lim_{t \to 1} \frac{h(t) - h(1)}{t - 1} = \lim_{t \to 1} \frac{-5t^2 + 30t - 25}{t - 1} = \lim_{t \to 1} \frac{-5(t-1)(t-5)}{t - 1} = -5(1 - 5) = 20\text{ m/s}$$
3. **Schritt 3 (Interpretation Sachkontext)**:
   $$h'(4) = -10(4) + 30 = -10\text{ m/s}$$
   Das negative Vorzeichen bedeutet, dass die Rakete zum Zeitpunkt $t = 4$ sinkt (Sinkgeschwindigkeit $10\text{ m/s}$).

**15 NP MUSTER-KLAUSURSATZ**:
> `"Während die mittlere Steiggeschwindigkeit im Intervall $[1; 3]$ $10\text{ m/s}$ beträgt, erreicht die Rakete bei $t = 1$ eine Momentangeschwindigkeit von $20\text{ m/s}$; das negative Vorzeichen von $h'(4) = -10\text{ m/s}$ indiziert physikalisch den Sinkflug."`
```

---

## 6. 40 门高优先级核心课表生产矩阵 (40-Unit Gap Matrix)

下表列出北威州重点文理高中（Gymnasium NRW）EF 阶段当前亟待批量扩充的 40 个核心课题，外部 AI 请按此表分配的【建议模板】与【建议教具】进行严格对号入座生成：

| 序号 | 学科 (Fach) | 课题名称 (Thema-DE-Kebab-Case) | 建议模板 | 建议教具 ID | 核心考点与生活锚点 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **SoWi** | `Modell-des-vollkommenen-Marktes` | 模板 A | `markt-sim` | 暴风雪取暖器稀缺、价格四大功能、超额需求 |
| 2 | **SoWi** | `Mietendeckel-und-Preisinterventionen` | 模板 A | `markt-sim` | 柏林租金管制判例、黑市滋生与投资萎缩 |
| 3 | **SoWi** | `Soziale-Ungleichheit-und-Gini-Koeffizient` | 模板 A | `balance` | 财富二八定律、基尼系数与税收再分配兜底 |
| 4 | **SoWi** | `Magisches-Viereck-Zielkonflikte` | 模板 A | `magisches-viereck` | 通胀 vs 失业的菲利普斯曲线两难 |
| 5 | **Philosophie** | `Kants-Kategorischer-Imperativ` | 模板 B | `ethik-waage` | 追杀中的善意谎言、定言命令普遍化法则 |
| 6 | **Philosophie** | `Utilitarismus-Bentham-Mill` | 模板 B | `ethik-waage` | 经典电车难题、功利主义幸福算盘与多数人暴政 |
| 7 | **Philosophie** | `Staatsphilosophie-Hobbes-Locke` | 模板 B | `balance` | 自然状态下的所有人对所有人的战争 vs 社会契约 |
| 8 | **Philosophie** | `Rawls-Schleier-des-Nichtwissens` | 模板 B | `rawls-sim` | 无知之幕、最小受惠者利益最大化（差异原则） |
| 9 | **Deutsch** | `Goethe-Faust-Gretchenfrage` | 模板 C | `highlighter` | 玛塔花园信仰拷问、泛神论修辞掩盖诱导动机 |
| 10 | **Deutsch** | `Schiller-Die-Raeuber-Figurenkonflikt` | 模板 C | `highlighter` | 卡尔·摩尔父子决裂、狂飙突进青年叛逆与社会法权 |
| 11 | **Deutsch** | `Sachtextanalyse-Argumentationsstruktur` | 模板 C | `highlighter` | 数字化时代注意力危机评论、论证逻辑漏洞解剖 |
| 12 | **Deutsch** | `Rhetorische-Mittel-und-Funktionsanalyse` | 模板 C | `highlighter` | 政治演讲排比与隐喻操纵、拒绝修辞手法报菜名 |
| 13 | **Mathe** | `Von-der-Sekante-zur-Tangente` | 模板 D | `tangent-slider` | 测速雷达与平均速度 vs 瞬时速度、$h \to 0$ 极限 |
| 14 | **Mathe** | `Ableitungsregeln-Potenz-Faktor-Summe` | 模板 D | `tangent-slider` | 多项式函数求导法则的第一性原理几何验证 |
| 15 | **Mathe** | `Extremwertprobleme-und-Optimierung` | 模板 D | `tangent-slider` | 包装箱容积最大化、一阶导为 0 与二阶导判别 |
| 16 | **Mathe** | `Wendepunkte-und-Kruemmungsverhalten` | 模板 D | `tangent-slider` | 流行病感染峰值增速拐点、二阶导变号判定 |
| 17 | **Physik** | `Gleichmaessig-beschleunigte-Bewegung` | 模板 D | `kinematik` | 高铁刹车制动距离与反应时间的力学安全裕度 |
| 18 | **Physik** | `Newtonsche-Gesetze-und-Kraeftegleichgewicht`| 模板 D | `kinematik` | 火箭发射推力加速度与地面支持力矢量合成 |
| 19 | **Physik** | `Energieerhaltung-und-Spannenergie` | 模板 D | `kinematik` | 蹦极跳极值点重力势能与动能、弹性势能守恒 |
| 20 | **Physik** | `Gleichfoermige-Kreisbewegung-Zentripetalkraft`| 模板 D | `kinematik` | 弯道行车打滑临界速度与向心力计算 |
| 21 | **Chemie** | `Chemisches-Gleichgewicht-und-Le-Chatelier`| 模板 D | `formula` | 哈伯法合成氨工业条件优化（高压与适温妥协） |
| 22 | **Chemie** | `Reaktionsgeschwindigkeit-und-Katalyse` | 模板 D | `formula` | 汽车尾气三元催化转化器降低活化能机理 |
| 23 | **Chemie** | `Saeure-Base-Titration-und-pH-Wert` | 模板 D | `formula` | 强酸强碱滴定等当点突跃与缓冲溶液计算 |
| 24 | **Chemie** | `Massenwirkungsgesetz-und-Konz-Effekte` | 模板 D | `formula` | 离子沉淀溶解平衡与共同离子效应推导 |
| 25 | **Bio** | `Zellmembran-Osmose-und-Diffusion` | 模板 D | `formula` | 红细胞在生理盐水、高渗高糖与纯水中的膨胀溶血 |
| 26 | **Bio** | `Enzymkinetik-und-Substratsaettigung` | 模板 D | `formula` | 米氏方程、竞争性抑制剂（如青霉素）阻断机理 |
| 27 | **Bio** | `Zellatmung-und-Glykolyse-ATP` | 模板 D | `formula` | 氰化物阻断呼吸链电子传递质子泵的致死机理 |
| 28 | **Bio** | `Aktionspotenzial-und-Refraktaerzeit` | 模板 D | `formula` | 神经元钠钾泵离子通道去极化与动作电位全或无 |
| 29 | **Englisch** | `Shakespeare-Macbeth-Soliloquy-Analysis` | 模板 C | `highlighter` | 麦克白内心独白中的野心与道德焦虑解剖 |
| 30 | **Englisch** | `Stylistic-Devices-in-Political-Speeches` | 模板 C | `highlighter` | 马丁·路德·金演讲排比与圣经隐喻感染力分析 |
| 31 | **Englisch** | `Dystopian-Literature-1984-Surveillance`| 模板 C | `balance` | 极权电幕全景监控与个人思想自由的剥夺困境 |
| 32 | **Englisch** | `Postcolonialism-and-Identity-Loss` | 模板 C | `balance` | 移民二代文化夹缝与双重认同危机分析 |
| 33 | **Musik** | `Sonatenhauptsatzform-Exposition-Reprise`| 模板 C | `oral-timer` | 贝多芬第五交响曲第一乐章主副部动机斗争展开 |
| 34 | **Musik** | `Kadenzen-und-Harmonielehre-T-S-D-T` | 模板 D | `formula` | 巴赫平均律与现代流行乐和声终止式声部进行 |
| 35 | **Musik** | `Filmmusik-Leitmotivtechnik-Wirkung` | 模板 C | `oral-timer` | 约翰·威廉姆斯与汉斯·季默主导动机心理操纵 |
| 36 | **Sport** | `Phasenstruktur-nach-Meinel-Schnabel` | 模板 D | `oral-timer` | 跳远助跑、起跳与着地三阶段力学衔接分析 |
| 37 | **Sport** | `Biomechanik-Prinzip-der-Anfangskraft` | 模板 D | `kinematik` | 铅球滑步反向预摆对最终出手初速度的力学贡献 |
| 38 | **Sport** | `Energiebereitstellung-im-Muskel-Laktat` | 模板 D | `formula` | 400 米冲刺乳酸堆积无氧阈值与能量系统切换 |
| 39 | **SoWi** | `Europaeischer-Binnenmarkt-Vier-Freiheiten`| 模板 A | `markt-sim` | 劳动力与商品跨境自由流动引发的社会倾销争议 |
| 40 | **Mathe** | `Integralrechnung-als-Flaecheninhaltsrechnung`| 模板 D | `tangent-slider` | 黎曼和矩形分割逼近曲边梯形面积极限 |

---

## 7. 外部 AI 核心发卷指令 (Copy-Paste Master Prompt)

当您需要外部 AI 生产某门课程时，直接复制以下这一段并填入参数：

```markdown
请你扮演北威州最高级别重点文理中学（Gymnasium NRW）学科教研组长兼资深企业级实训架构师。
你的任务是为德国高中 EF 阶段编写一套达到【麦肯锡商学院决策案 / Anthropic 互动式教程 / Brilliant.org 挑战先行 POE 模式 / Study-Mate 考纲笔记沉淀】标准的顶尖课件。

### 待生产课件信息：
- 学科 (Fach): 【填写学科，例如：SoWi / Philosophie / Deutsch / Mathe / Physik / Chemie / Bio】
- 课题名称 (Thema): 【填写课题，例如：Modell des vollkommenen Marktes (Angebot & Nachfrage)】
- 指定教学模板: 【填写模板 A / 模板 B / 模板 C / 模板 D】
- 建议教具标号 (Werkzeug ID): 【填写教具 ID，例如：markt-sim / ethik-waage / highlighter / tangent-slider / balance / formula / kinematik】

---

### 严格的生产规范（必须 100% 遵照，否则无法通过自动化工程校验）：
1. **Frontmatter 格式**：必须为标准 YAML，包含 fach, thema, level: 1, ziel: Klausur, xp: 100, operatoren: [...], klausurrelevant: true, datum: <生产当日 YYYY-MM-DD>, tags: [EF, <Fach>, ...], version: Enterprise-v5（新生产默认 v5；仅复刻 §5 四标杆范例时才写 Enterprise-v4）。
2. **文件名命名法则**：`<Fach>-<Thema-Kebab-Case>-L1.md`（如 `SoWi-Modell-des-vollkommenen-Marktes-L1.md`），严禁变音符号与空格（必须用 ae/oe/ue 代替 ä/ö/ü）。
3. **语言排版铁律**：中文深度认知理解在上，德语考场高分学术表达（Klausur-Satz）在下。术语必须标注中德双语。
4. **数学与科学公式规范**：所有变量、方程、物理化学式必须使用标准的 LaTeX KaTeX 语法（行内 `$f'(x)$`，独立行 `$$...$$`）。
5. **严禁四大禁区**：
   - 严禁假费曼套话（比喻必须包含真实的人、具体买卖交易或物理动作，字数严禁超过 60 字）；
   - 严禁虚假 RPG 网文剧情（直接切入真实历史案例、司法争议或名篇原句）；
   - 严禁在 Step 1 堆砌大段教材阅读（必须在 10 秒内强制进行 A/B 直觉站队，选后即时弹出机制解析）；
   - 严禁使用 Emoji，所有箭头统一使用 ASCII 字符 `->`。
6. **完整包含五大步骤（v4 冻结版；v5 新课为八步制，须另取 v5 生产提示词，不得用本五步指令套写 v5 课）**：
   - ## Schritt 1 — entdecken (Intuitions-Check & Kausaler Dilemma-Anker)
   - ## Schritt 2 — ausprobieren (Interaktiver Sandkasten & Parameter-Labor mit [Werkzeug: <canonical-id, 见第 8 条注册表>])
   - ## Schritt 3 — entdecken (Kausalkette & KLP-Begriffsmatrix)
   - ## Schritt 4 — check (Fehlvorstellung & Anti-Patterns)
   - ## Schritt 5 — szenario (15 NP Klausur-Transfer, Urteilsbildung AFB III)
7. **语法与标签格式强制约束（预防 Subagent 共性偏差）**：
   - **教具标签**：必须写作 `[Werkzeug: <canonical-id>]`（例如 `[Werkzeug: orderbuch-sim]`），严禁漏掉方括号或写作 `Werkzeug ID: xxx`；**严禁 `[Werkzeug: <id>]` / `[Werkzeug: <tool-id>]` 等占位符**——id 必须出自本指令第 8 条注册表，旧 ID 按映射表改写；
   - **选项标号**：`- [Option A]` 与 `- [ Option A ]` **两种均合法**（紧凑/宽松各一；实测全库宽松式零命中，校验器只认一种即全军覆没），A/B 均须带方括号，理科亦同；严禁写成 `预测 A`、`选项 A` 或无标号文本；加粗与否不限；
   - **Archetyp 行可选**：头部 `> 💡 **Didaktischer Archetyp**: ...` 行为**可选项**（实测全库仅 5 篇含此行），缺失**不得**判违规；
   - **Step 5 角色与题解规范**：模板 A/B/C 强制要求 `ROLLE: ...` 与 `RUBRIC: ...`；模板 D（理科）免除 `ROLLE`，但必须严格包含 `MUSTERLÖSUNG (15 NP Dreischritt: Schritt 1: Ansatz -> Schritt 2: Rechnung -> Schritt 3: Interpretation)` 并给出三步推导要点。
8. **教具 Canonical ID 注册表（v5 新生产唯一合法表，共 16 件；§6 旧 ID 一律按右列改写）**：
   | # | Canonical ID | 学科/用途 | 退役旧 ID 映射 |
   | :--- | :--- | :--- | :--- |
   | 1 | `magisches-viereck` | SoWi 目标冲突 | — |
   | 2 | `gini-allocator` | SoWi 分配不均 | `balance-board`（SoWi 课）改用此件 |
   | 3 | `orderbuch-sim` | SoWi 市场出清 | `markt-sim` -> `orderbuch-sim`（库内 `orderbuch` 视为同一件，统一写作 `orderbuch-sim`） |
   | 4 | `ethik-waage` | Philo 功利/义务权衡 | `balance-board`（Philo 课）改用此件 |
   | 5 | `tangent-slider` | Mathe 割线到切线 | — |
   | 6 | `box-optimizer` | Mathe 极值优化 | — |
   | 7 | `kinematik-sim` | Physik/Sport 运动学 | `kinematik` / `kinematik-lab` / `schiefe-ebene` -> `kinematik-sim` |
   | 8 | `haber-bosch` | Chemie 平衡移动 | `le-chatelier-sim` -> `haber-bosch` |
   | 9 | `osmose-lab` | Bio 渗透/扩散 | — |
   | 10 | `satzbau-lego` | Deutsch 句式拼装 | 库内 `lego`（语言类）统一写作 `satzbau-lego` |
   | 11 | `gewi-reading` | GeWi 文本精读 | 库内 `text-analyse`（GeWi 课）改用此件 |
   | 12 | `oral-timer` | Musik/Sport 口试计时 | — |
   | 13 | `highlighter` | Deutsch/Englisch 修辞显微镜 | — |
   | 14 | `rawls-sim` | Philo 无知之幕 | — |
   | 15 | `titration-lab` | Chemie 滴定 | 库内 `formula`（滴定课）改用此件 |
   | 16 | `wahlsystem-sim` | SoWi 选举制度 | — |
   （注：`formula` 为过渡兼容 ID，仅既有理科存量课保留，新课须用对口 canonical；裸 `balance` 已退役，按学科归属改写。）
9. **超纲红线（EF 范围硬约束，违者整课打回）**：
   - **SoWi 止于 Viereck**：`Magisches Viereck` 为 EF 讲授上限；`Magisches Sechseck`、Phillips-Kurve、Okun-Gesetz **不得作为新授核心概念**，仅可放入 Q 池/拓展问答（§6 表第 4 行“菲利普斯曲线两难”一句为存量背景表述，特此祖父化，不作新课范例）；
   - **Physik 自由落体忽略阻力**：EF 自由落体/抛体一律按真空理想模型（Luftwiderstand = 0），空气阻力仅可在“模型边界”一句中声明，不进入计算；
   - **每课 ≥1 条真实 vault 外链**：正文必须含至少一条指向本仓库真实文件的相对外链（形如 `[...](../01_Deutsch/...)`，目标文件须存在），杜绝空链与纯外部 URL 充数。

请严格参照《master specification》中对应模板的格式与范文，直接输出完整的 Markdown 内容，不要带有任何多余的寒暄或包装性文本。
```

---

## 8. 自动化质检验收红线 (Automated Quality Rubric & Verification Checklist)

任何由外部 AI 生成并拟合入本仓库的课件文件，在合入前必须 100% 通过以下检查：

- [ ] **路径合规**：保存在 `Lernreise/` 根目录下，文件名为 `<Fach>-<Thema-Kebab-Case>-L1.md`；
- [ ] **无禁用字符**：纯英文 kebab-case，禁用空格，禁用变音符号（ä/ö/ü 必须写作 ae/oe/ue）；
- [ ] **Frontmatter 完整**：包含 `fach`, `thema`, `level: 1`, `ziel: Klausur`, `xp: 100`, `operatoren`, `tags`；`version` 三者居一：`Enterprise-v5`（新课）/ `Enterprise-v4`（仅 §5 标杆复刻）/ `Lesson-v3`（特批例外），**版本与步数必须自洽**（v5=八步，v4=五步）；
- [ ] **标签格式**：头部与实验步必须包含 `[Werkzeug: <canonical-id>]`（带方括号，id 出自 §7 第 8 条注册表）；**严禁 `[Werkzeug: <id>]` 占位符**；选项接受 `[Option A]` / `[ Option A ]`（及 B）两种，加粗不限；
- [ ] **Archetyp 行可选**：`Didaktischer Archetyp` 行缺失不判违规（全库仅 5 篇含此行）；
- [ ] **步数双轨**：v4 标杆=`## Schritt 1` 至 `## Schritt 5` 五步闭环；v5 新课=八步制（`entdecken`/`ausprobieren`/`check`/`reflexion`）；**严禁以本 §8 五步口径判 v5 课违规**；
- [ ] **Step 5 角色/三步法**：模板 A/B/C 强制包含 `ROLLE` 与 `RUBRIC`；模板 D 免除 `ROLLE`，强制包含 `15 NP Dreischritt` 步骤；
- [ ] **绝无假费曼空话**：没有出现“齿轮调节系统”、“宏大社会政治体系”等假大空抽象比喻；
- [ ] **纯黑白纸墨风 (Tufte)**：全局 0 emoji，所有箭头一律使用 ASCII `->`（严禁出现 unicode 箭头如 →、⇒、←）；
- [ ] **超纲红线**：SoWi 核心讲授止于 Viereck（Sechseck/Phillips/Okun 仅 Q 池）；自由落体计算忽略阻力；全文 ≥1 条指向库内真实文件的相对外链（目标须存在）；
- [ ] **公式排版**：所有数学与物理表达式均被 `$ ... $` 或 `$$ ... $$` 严密包裹；
- [ ] **仓库自动化校验通过**：运行 `python scripts/vault-check.py`，必须输出 `PASS`，0 badnames，0 badglossar。
