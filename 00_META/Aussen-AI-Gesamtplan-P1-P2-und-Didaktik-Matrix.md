---
fach: ""
thema: "Aussen-AI Gesamtplan P1 P2 und Didaktik Matrix"
operatoren: []
klausurrelevant: false
datum: 2026-09-27
tags: [EF, Meta, Handbuch, P1, P2, Didaktik]
---

# 外部 AI 全库课件重塑总纲（P1 规范化 + P2 具名化与个性化教学设计矩阵）

> **战略目标**：继 P0 级 22 篇严重内容失配（Prompt 泄漏与文理模板污染）彻底根除后，本总纲统领全库剩余课程的**结构类型一致性校准（P1）**与 **131 篇历史/进阶 L2 课件的具名化与深度游戏化教学重塑（P2）**。
> **核心原则**：**拒绝一刀切套模，实施个性化教学设计**。每一个学科、每一个知识点都必须结合其学科本质，设计独特的引入生活反差（Hook）、交互探究沙盒挑战（PhET/Tycoon/Ethics-Tree/Text-Detective/Arena）与深度考场辨析。

---

## 一、双轨推进总体架构与工作量拆解

经过全库 `scripts/audit-pedagogy-integrity.py` 扫描，当前全库 269 篇课件的任务分工如下：

```
                    全库 269 篇课件
                         │
         ┌───────────────┴───────────────┐
         ▼                               ▼
   P1 批次（全库结构一致性）        P2 批次（历史/L2 深度重塑）
   - 目标：校准 247 篇 S8 类型      - 目标：重塑 131 篇未具名课件
   - 将 ## Schritt 8 — entdecken   - 补充 S1~S8 具名具象小节标题
     统一规范为 reflexion          - 消除 S1 空心化（丰富生活 Hook）
   - 补全 116 处 S6/S7 泛化叠词    - 绑定个性化微沙盒探究挑战任务
```

| 任务轨道 | 涉及范围 | 核心处理动作 | 预期产出指标 |
| :--- | :--- | :--- | :--- |
| **P1 批次（结构统一）** | 剩余 247 篇文件 | 1. 将 `## Schritt 8 — entdecken:` 规范更名为 `## Schritt 8 — reflexion:`；<br>2. 将 S6 `Verständnisprüfung` 替换为 `Selbsttest zu <Thema>`；<br>3. 将 S7 `Klausurtransfer & Rubric` 替换为 `Klausurtransfer: <Szenario>`。 | `audit-pedagogy-integrity.py` 中的 Bug 3 归零；TOC 中 `08` 统一部署为 `TAKEAWAY & REFLEXION`。 |
| **P2 批次（深度重塑）** | 131 篇历史未具名课件（含所有 L2 进阶课） | 1. **标题具名化 8/8**：添加冒号与具体主题；<br>2. **S1 Hook 强化**：≥100 词生活情境反差引入；<br>3. **S4 个性化微沙盘**：绑定专属工具，设计目标参数探索任务；<br>4. **S5 深度方法辨析**：真实现象双向理论对比（Weg A vs. Weg B）。 | 131 篇文件彻底消除空心化骨架，全部具备教科书级互动深度与启发性。 |

---

## 二、个性化教学设计矩阵（5 大学科交互范式与微游戏机制）

严禁所有学科千篇一律套用同一种抽象的“步骤”，必须根据**学科认知规律**落地差异化设计：

```
┌────────────────────────────────────────────────────────────────────────┐
│                      5 大学科个性化交互范式矩阵                         │
├─────────────┬──────────────────┬───────────────────┬───────────────────┤
│ 学科门类     │ 交互范式名称      │ 核心已注册工具     │ 游戏化微任务机制  │
├─────────────┼──────────────────┼───────────────────┼───────────────────┤
│ MINT 理科   │ PhET 探究实验室  │ osmose-lab,       │ 参数调谐与目标挑战 │
│ (数理化生)   │                  │ titration-lab,    │ (Target Challenge)│
│             │                  │ schiefe-ebene,    │ 观察突跃、极限逼近 │
│             │                  │ box-optimizer, etc│                   │
├─────────────┼──────────────────┼───────────────────┼───────────────────┤
│ 社会经济    │ 政策大亨沙盘     │ gini-allocator,   │ 政策权衡模拟      │
│ (SoWi)      │ (Tycoon Sandbox) │ markt-sim         │ 效率 vs 公平两难  │
│             │                  │                   │ 宏观指标动态博弈  │
├─────────────┼──────────────────┼───────────────────┼───────────────────┤
│ 人文哲学    │ 伦理裁决天平     │ balance-board     │ 道德困境决策树    │
│ (Philo)     │ (Moral Balance)  │                   │ 康德绝对命令过滤  │
│             │                  │                   │ 功利主义多维算题  │
├─────────────┼──────────────────┼───────────────────┼───────────────────┤
│ 语言文学    │ 文本侦探与积木   │ highlighter,      │ 修辞隐喻荧光解码  │
│ (德语/英语) │ (Text Detective) │ lego              │ AFB III 论证积木  │
├─────────────┼──────────────────┼───────────────────┼───────────────────┤
│ 艺术体育    │ 动作与节拍竞技场 │ oral-timer,       │ Meinl 运动相力学  │
│ (音乐/体育) │ (Biomech Arena)  │ formula           │ 瓦格纳主导动机识别│
└─────────────┴──────────────────┴───────────────────┴───────────────────┘
```

### 1. MINT 理科组：PhET-Style 探究微实验（Mathe, Physik, Chemie, Bio）
- **绝非被动读数字，而是设定“目标达成挑战”**：
  - **生物 (Bio · `osmose-lab`)**：设定挑战“将外界蔗糖浓度从低渗调至高渗，观察植物表皮细胞质壁分离（Plasmolyse），寻找膨压（Turgordruck）降为零的临界水势 $\Psi_w$”。
  - **化学 (Chemie · `titration-lab`)**：设定挑战“用 $0{,}1\,\text{mol/L}\ \text{NaOH}$ 滴定未知浓度强酸，每次滴入 $0{,}5\,\text{mL}$，在 pH 出现垂直跃迁的等当点（Äquivalenzpunkt）瞬间暂停，观察指示剂（酚酞/溴百里酚蓝）变色”。
  - **化学 (Chemie · `le-chatelier-sim`)**：设定挑战“在合成氨放热反应中升高温度与加压，根据勒夏特列原理调节旋钮，寻找产率与反应速率的最佳平衡点”。
  - **物理 (Physik · `schiefe-ebene`)**：设定挑战“调整斜面倾角 $\alpha$，观察重力沿斜面下滑分力 $F_{GH}$ 何时超越最大静摩擦力 $F_{R,\max} = \mu \cdot F_N$，测定临界自锁滑移角”。
  - **物理 (Physik · `kinematik-lab`)**：设定挑战“模拟自由落体与带空气阻力下落，改变下落体横截面积与质量，观察加速度如何逐步归零并达到终端速度 $v_{\text{terminal}}$”。
  - **数学 (Mathe · `box-optimizer`)**：设定挑战“给定 $40 \times 25\,\text{cm}$ 纸板，剪去四角边长为 $x$ 的小正方形，拖动滑块寻找容积最大值点，验证导数驻点 $V'(x) = 0$ 与 $V''(x) < 0$”。
  - **数学 (Mathe · `tangent-slider`)**：设定挑战“让割线两点距离 $h \to 0$，观察割线斜率 $\frac{\Delta y}{\Delta x}$ 如何平滑过渡为切线斜率 $f'(x_0)$”。

### 2. 社会经济组：政策大亨沙盘（SoWi）
- **工具**：`[Werkzeug: gini-allocator]`, `[Werkzeug: markt-sim]`
- **互动机制**：
  - 调节最低工资与最高租金，观察供给曲线与需求曲线之间的“无谓损失（Deadweight Loss）”与黑市排队现象；
  - 调节个人所得税最高边际税率与转移支付，观察洛伦兹曲线向对角线靠近的过程，分析基尼系数从 0.38 降至 0.28 对劳动激励的潜在影响。

### 3. 人文哲学组：伦理裁决天平（Philosophie）
- **工具**：`[Werkzeug: balance-board]`
- **互动机制**：
  - 设定具体两难情境（如自动驾驶车辆紧急避险抉择、器官移植一人救五人）；
  - 左盘放置“绝对义务论（Deontologie / Menschenwürde Art. 1 GG）”，右盘放置“行为功利主义效益最大化（Utilitarismus）”，通过向两端添加论据砝码，权衡最终价值判决。

### 4. 语言文学组：文本侦探画板与学术积木（Deutsch & Englisch）
- **工具**：`[Werkzeug: highlighter]`, `[Werkzeug: lego]`
- **互动机制**：
  - **文本侦探**：用不同颜色标注“论点（These）”、“论据（Argument）”、“修辞手法（Stilmittel wie Metapher/Alliteration）”与“论证漏洞”；
  - **句式积木**：运用 SatzbauLego 组合标准的德语学术分析句：“*Indem der Autor das Stilmittel [X] verwendet, bewirkt er beim Leser [Y], was die These [Z] stützt.*”。

### 5. 艺术体育组：动作与节奏竞技场（Musik & Sport）
- **工具**：`[Werkzeug: oral-timer]`, `[Werkzeug: formula]`
- **互动机制**：
  - **体育生物力学**：利用力学冲量公式 $J = F \cdot \Delta t = \Delta p$，分析跳远起跳阶段制动与摆臂蹬伸如何将水平助跑速度转化为最优起跳速度与轨迹；
  - **音乐口试**：启动 `oral-timer` 15 分钟倒计时手架，演练 5 分钟独立陈述（Einleitung → Analyse → Urteil）与 10 分钟答辩。

---

## 三、131 篇 P2 深度重塑学科任务包（WP1 ~ WP10）

### WP1：生物组（Bio · 13 篇未具名课程）
- **重点清单**：`Bio-Biomembran-Osmose-Vertiefung-L2.md`, `Bio-DNA-Replikation-Meselson-Stahl-L2.md`, `Bio-Enzymkinetik-Michaelis-Allosterisch-L2.md`, `Bio-Proteinbiosynthese-L2.md`, `Bio-Zellatmung-ATP-L2.md`, `Bio-Oekologie-L2.md` 等。
- **推荐教具**：`[Werkzeug: osmose-lab]`, `[Werkzeug: formula]`。
- **S1 生活 Hook 设计方向**：例如从“腌咸菜脱水与淡水鱼生活在海里为何会脱水而亡”切入渗透；从“吃生菠萝为什么舌头会有刺痛感”切入菠萝蛋白酶的专一性与最适温度。
- **8 步具名标题范例**：
  - `## Schritt 1 — entdecken: Phänomen Osmose & Plasmolyse-Einstieg`
  - `## Schritt 2 — entdecken: Fachbegriffe & Biomembran-Pretraining`
  - `## Schritt 3 — entdecken: Wasserpotenzial & Osmotischer Druck Modell`
  - `## Schritt 4 — ausprobieren: Virtuelles Plasmolyse-Labor mit [Werkzeug: osmose-lab]`
  - `## Schritt 5 — ausprobieren: Verfahrensvergleich Tier- vs. Pflanzenzelle`
  - `## Schritt 6 — check: Selbsttest zu Tonizität & Membrantransport`
  - `## Schritt 7 — szenario: Klausurtransfer Trinkwassergewinnung durch Umkehrosmose`
  - `## Schritt 8 — reflexion: Takeaway & Metakognitive Reflexion`

### WP2：化学组（Chemie · 14 篇未具名课程）
- **重点清单**：`Chemie-Chemisches-Gleichgewicht-L2.md`, `Chemie-MWG-Berechnungen-L2.md`, `Chemie-Titrationskurven-Indikatoren-L2.md`, `Chemie-pH-Stark-Schwach-Ks-L2.md`, `Chemie-Redox-L2.md` 等。
- **推荐教具**：`[Werkzeug: titration-lab]`, `[Werkzeug: le-chatelier-sim]`, `[Werkzeug: formula]`。
- **S1 生活 Hook 设计方向**：例如“打开可乐罐为什么瞬间冒出大量气泡（压强对气液平衡的影响）”；“胃酸过多时服用小苏打与铝碳酸镁的中和动力学差异”。
- **8 步具名标题范例**：
  - `## Schritt 1 — entdecken: Phänomen Sprudeln & Gleichgewicht-Einstieg`
  - `## Schritt 2 — entdecken: Fachbegriffe & MWG-Pretraining`
  - `## Schritt 3 — entdecken: Kinetik von Hin- und Rückreaktion im Modell`
  - `## Schritt 4 — ausprobieren: Haber-Bosch-Simulation mit [Werkzeug: le-chatelier-sim]`
  - `## Schritt 5 — ausprobieren: Verfahrensvergleich Homogene vs. Heterogene Katalyse`
  - `## Schritt 6 — check: Selbsttest zum Massenwirkungsgesetz`
  - `## Schritt 7 — szenario: Industrie-Optimierung einer Syntheseroute`
  - `## Schritt 8 — reflexion: Takeaway & Metakognitive Reflexion`

### WP3：物理组（Physik · 12 篇未具名课程）
- **重点清单**：`Physik-Federpendel-Schwingung-L2.md`, `Physik-Freier-Fall-Luftwiderstand-L2.md`, `Physik-Gravitation-Satelliten-L2.md`, `Physik-Impulserhaltung-Stoesse-L2.md`, `Physik-Kreisbewegung-L2.md` 等。
- **推荐教具**：`[Werkzeug: schiefe-ebene]`, `[Werkzeug: kinematik-lab]`, `[Werkzeug: formula]`。
- **S1 生活 Hook 设计方向**：从“急刹车时人为什么往前倾与冰面刹车距离激增”切入动量与摩擦力；从“跳伞运动员开伞前后的极限速度变迁”切入空气阻力动力学方程。

### WP4：数学组（Mathe · 16 篇未具名课程）
- **重点清单**：`Mathe-Extremwertprobleme-L2.md`, `Mathe-Kurvendiskussion-Wendepunkte-L2.md`, `Mathe-Vektoren-Raum-L2.md`, `Mathe-h-Methode-L2.md`, `Mathe-Steckbriefaufgaben-L2.md` 等。
- **推荐教具**：`[Werkzeug: box-optimizer]`, `[Werkzeug: tangent-slider]`, `[Werkzeug: formula]`。
- **S1 生活 Hook 设计方向**：从“饮料罐为什么普遍做成圆柱体而不是立方体（表面积最小化容积最大化）”切入极值应用；从“测速摄像头如何通过两点测速逼近瞬时车速”切入导数极限。

### WP5：德语组（Deutsch · 12 篇未具名课程）
- **重点清单**：`Deutsch-Dramenanalyse-Emilia-Galotti-L2.md`, `Deutsch-Gedichtanalyse-Expressionismus-L2.md`, `Deutsch-Dialektische-Eroerterung-L2.md`, `Deutsch-Kommunikationsmodelle-L2.md` 等。
- **推荐教具**：`[Werkzeug: highlighter]`, `[Werkzeug: lego]`。
- **S1 生活 Hook 设计方向**：从“微信聊天中‘呵呵’引发的人际沟通车祸（四耳模型 Schulz von Thun）”切入沟通理论；从“大都市拥挤晚高峰带来的疏离感与窒息感”切入表现主义城市诗歌。

### WP6：英语组（Englisch · 14 篇未具名课程）
- **重点清单**：`Englisch-American-Dream-L2.md`, `Englisch-Dystopia-1984-L2.md`, `Englisch-Postcolonial-Nigeria-L2.md`, `Englisch-Genetic-Engineering-L2.md`, `Englisch-Shakespeare-Macbeth-L2.md` 等。
- **推荐教具**：`[Werkzeug: highlighter]`, `[Werkzeug: lego]`。
- **S1 生活 Hook 设计方向**：从“好莱坞电影中的从贫民窟到华尔街神话 vs 现实阶层固化数据”切入 American Dream；从“手机人脸识别与算法监控推送”切入 1984 监控资本主义。

### WP7：社会科学组（SoWi · 22 篇未具名课程）
- **重点清单**：包含全部 L2 进阶课与专题研讨。
- **推荐教具**：`[Werkzeug: gini-allocator]`, `[Werkzeug: markt-sim]`, `[Werkzeug: balance-board]`。

### WP8：哲学组（Philo · 8 篇未具名课程）
- **重点清单**：包含意志自由、国家契约论、功利主义深化等。
- **推荐教具**：`[Werkzeug: balance-board]`。

### WP9：音乐组（Musik · 9 篇未具名课程）
- **重点清单**：调性与和声分析、主导动机分析、爵士切分音等。
- **推荐教具**：`[Werkzeug: oral-timer]`。

### WP10：体育组（Sport · 11 篇未具名课程）
- **重点清单**：乳酸阈值与能量代谢、跳远 Meinl 三阶段、协调能力与训练原则。
- **推荐教具**：`[Werkzeug: oral-timer]`, `[Werkzeug: formula]`。

---

## 四、外部 AI 执行标准 Prompt 模版

针对 P1 与 P2，外部 AI 执行时统一使用以下标准 Prompt：

```text
【任务】：请根据《Aussen-AI Gesamtplan P1 P2 und Didaktik Matrix》规范，重塑给定的 Lernreise Markdown 课件。

【目标文件】：[在此填入具体文件路径]
【学科门类】：[在此填入 Fach，如 Bio / Mathe / Deutsch 等]
【核心知识点】：[在此填入 Thema]

【改写核心要求（逐项落地）】：
1. 8 步小节标题具名化：
   - 彻底消灭纯通用标题，根据本知识点定制 8 个专属标题：
     Schritt 1 — entdecken: <Hook与生活现象引入>
     Schritt 2 — entdecken: <核心术语与预备盒>
     Schritt 3 — entdecken: <核心因果模型与传导图>
     Schritt 4 — ausprobieren: <交互实验与沙盘挑战>
     Schritt 5 — ausprobieren: <双向理论/方法对比辩析>
     Schritt 6 — check: Selbsttest zu <Thema>
     Schritt 7 — szenario: <真实考场角色情境实战>
     Schritt 8 — reflexion: Takeaway & Metakognitive Reflexion (必须使用 reflexion 代替 entdecken!)

2. 严禁模板污染与套话空话：
   - 非数理文科（文史哲社）严禁出现 $x_1, x_2, d = x_2 - x_1$, Kennzahl 计算套模；
   - 严禁出现 "Ausgangslage aus der Vorlage:" 等脚手架残留文字；
   - S1 必须具备 ≥100 词生动鲜活的生活现象引入 Hook；
   - S4 必须绑定一个已注册有效教具标签（严格在 osmose-lab, titration-lab, le-chatelier-sim, schiefe-ebene, kinematik-lab, box-optimizer, tangent-slider, gini-allocator, markt-sim, balance-board, highlighter, lego, oral-timer, formula 中选取），并设计目标达成任务（包含 HILFE 与 MUSTERLÖSUNG）。

3. 语言与格式门禁：
   - 纯德语课件（-DE-）全篇严禁包含中文字符（零 CJK）；
   - 双语桥接课件（-CN-）中文理解在上、德语答题句在下；
   - 保留 Anekdote 与 Fehlvorstellung 结构；
   - 每小节末尾保留单行反引号 `Klausur-Satz`。

【输出格式】：直接输出该文件重塑完成后的完整 Markdown 全文（含 YAML frontmatter），直接就地覆盖。
```

---

## 五、质量验收全自动指令

外部 AI 批处理完成后，在主终端执行以下三条指令进行秒级核验：

```powershell
# 1. 验证教学法完整度与无泄露
python scripts/audit-pedagogy-integrity.py

# 2. 验证 Obsidian 规范与合法小节类型
python scripts/vault-check.py

# 3. 验证前端编译与测试
cmd.exe /c npm --prefix App-EF-Lernvault run test:run
cmd.exe /c npm --prefix App-EF-Lernvault run build
```
