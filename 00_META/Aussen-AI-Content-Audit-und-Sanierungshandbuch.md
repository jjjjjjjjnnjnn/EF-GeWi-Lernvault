---
fach: ""
thema: "Aussen-AI Content Audit und Sanierungshandbuch"
operatoren: []
klausurrelevant: false
datum: 2026-09-26
tags: [EF, Meta, Handbuch]
---

# 外部 AI 课件深度审计与教学质量重塑操作手册（Lernreise 全量整改标准）

> **编制目标**：针对当前系统中 269 篇课件普遍存在的**小节标题无区分度（同名撞车）、前两步仅为骨架提纲缺乏实质教学、工具标签未注册/错位、缺少生动引入与探究式推导**等深层质量问题，制定明确的审计指标、重塑标准、工具映射表及外部 AI 批量改写提示词。

---

## 一、现状诊断与问题扫描报告（基于 scripts/scan-content-issues.py 扫描全量 269 篇）

| 问题维度 | 影响文件数 | 现象与学生端体验后果 |
| :--- | :--- | :--- |
| **1. 小节标题千篇一律** | **269 / 269 篇 (100%)** | 所有课件均采用纯通用标题 `## Schritt N — <typ>`，系统目录（TOC）机械重复显示多个“知识讲解”、“动手实操”。学生上下滚动时无法定位章节内容，不知当前在学什么。 |
| **2. 第 1 步空心化（仅列提纲）** | **167 / 269 篇 (62%)** | 第 1 步（Schritt 1）只有 20~40 个字的“ZIELE 目标清单”，**完全没有生活现象引入（Hook）、没有原理铺垫、没有背景解释**。学生点开第一节看到的不是生动教学，而是一份枯燥的教学大纲。 |
| **3. 第 2 步缺乏深度（仅列孤立词汇）** | **140 / 269 篇 (52%)** | 术语盒只有词汇罗列，缺乏微观机制与考场得分语境，未能起到降低学生认知负荷（Pre-Training）的教学法作用。 |
| **4. 工具标签未注册或无效** | **16 处未注册标签** | 部分文件出现了未经前端注册的虚拟工具标签（如 `[Werkzeug: zelle]`、`[Werkzeug: lgs]`、`[Werkzeug: plan]` 等），导致沙盒无法渲染或回退为默认界面。 |
| **5. 动手实操缺乏游戏化探索** | **210 / 269 篇 (78%)** | 第 4 步仅有静态文字题，没有指导学生如何利用互动沙盘（如调动哪个滑块、观察何种现象、记录何种数据），丧失了“做中学（Learning by doing）”的探究式乐趣。 |

---

## 二、标准规范：课件结构与九大要素重塑要求

每个课件（无论是纯德语版 `-DE-` 还是双语桥接版 `-CN-`）必须达到**教科书级详尽度与启发性**，严格遵守以下规范：

### 1. 小节标题具名化标准（强制性）
标题行后必须追加冒号与**具名小节标题**：
- `## Schritt 1 — entdecken: Ziele & Phänomen-Einstieg`（目标与现象引入）
- `## Schritt 2 — entdecken: Fachbegriffe & Pre-Training`（核心学术术语预备）
- `## Schritt 3 — entdecken: Kernkonzept & Wirkungsmodell`（核心概念与因果推导模型）
- `## Schritt 4 — ausprobieren: Interaktive Praxis & Labor`（交互实验与例题精讲）
- `## Schritt 5 — ausprobieren: Verfahrensvergleich & Abgrenzung`（双向辨析与易混解题对比）
- `## Schritt 6 — check: Verständnisprüfung`（随堂默写与过关自测）
- `## Schritt 7 — szenario: Klausurtransfer & Rubric`（真实情境考试实战）
- `## Schritt 8 — entdecken: Takeaway & Metakognitive Reflexion`（考点回顾与元认知反思）
*(注：冒号后可根据具体学科微调，例如 `Schritt 4 — ausprobieren: Zwiebelhaut-Osmose im Labor`)*

### 2. 第 1 步（Schritt 1）重写硬性指标（拒绝空心化！）
- **生活反差引入（Hook & Phänomen，至少 100 字）**：以生活常见现象、认知反差或科学史悬念切入（如：为什么腌黄瓜会缩水出水？为什么潜水员上浮过快会得减压病？为什么纸盒四个角剪小正方形容积先升后降？）；
- **核心概念极简铺垫（至少 80 字）**：用最直白通俗的语言概括核心机制，给学生建立最初的心理表象；
- **学习目标（ZIELE，3条清晰描述）**；
- **前置知识（Voraussetzung，明确窄切口）**；
- **高频核心考点句（Klausur-Satz，单行反引号）**。

### 3. 第 2 步（Schritt 2）术语盒强化
- 选取 5 个最核心的学术专有名词；
- 每个词汇包含：中文理解在先、德语定义在后、考场高频用法说明；
- 配备单行 `Klausur-Satz`。

### 4. 第 3 步（Schritt 3）核心概念因果链与 ASCII/文字图解
- 详尽阐述物理/化学/生物/社科机制（至少 150 字），揭示底层数学公式或因果链条；
- 包含标准 ASCII 图解或逻辑流程框图（用 ````diagram ... ```` 包裹）；
- 配备单行 `Klausur-Satz`。

### 5. 第 4 步（Schritt 4）沙盒绑定与游戏化实操
- 必须在开头嵌入且**仅嵌入一个有效已注册教具标签** `[Werkzeug: <id>]`；
- AUFGABE 必须结合沙盘设定**探究挑战关卡**（如：“在沙盘中将外液水势调为 -1.5 MPa，观察原生质体收缩过程并计算水势差”）；
- 给出分步 HILFE 与标准满分 MUSTERLÖSUNG；
- 配备单行 `Klausur-Satz`。

---

## 三、系统已注册专属教具沙盘对照表（外部 AI 必须严格从下表选标签）

| 学科 (Fach) | 推荐已注册工具标签 `[Werkzeug: ...]` | 对应的前端互动微游戏 | 适用知识点 |
| :--- | :--- | :--- | :--- |
| **生物 (Bio)** | `[Werkzeug: osmose-lab]` | 渗透压与植物细胞质壁分离仿真实验室 | 细胞膜结构、渗透压、动植物细胞吸水失水、水势计算 |
| **化学 (Chemie)** | `[Werkzeug: le-chatelier-sim]` | 勒夏特列平衡移动模拟器 | 化学反应平衡、MWG、温度压强浓度干扰反应移动 |
| **化学 (Chemie)** | `[Werkzeug: titration-lab]` | 酸碱滴定与指示剂变色突跃沙盘 | 强酸强碱滴定、pH 突跃计算、化学计量等当点判定 |
| **物理 (Physik)** | `[Werkzeug: schiefe-ebene]` | 牛顿力学斜面受力矢量分解沙盘 | 斜面动力学、摩擦力、重力沿斜面下滑分力与正压力 |
| **物理 (Physik)** | `[Werkzeug: kinematik-lab]` | 直线匀加速运动与落体计算器 | 自由落体、刹车位移、v-t 与 s-t 图象分析 |
| **数学 (Mathe)** | `[Werkzeug: box-optimizer]` | 纸盒容积 2D/3D 裁剪折叠极值优化沙盘 | 导数应用题、极值优化、驻点与二阶导充分条件 |
| **数学 (Mathe)** | `[Werkzeug: tangent-slider]` | 割线逼近切线导数极限沙盘 | 差商、瞬时变化率、导数几何意义（h趋向于0） |
| **经济 (SoWi)** | `[Werkzeug: gini-allocator]` | 洛伦兹曲线与基尼系数动态再分配沙盘 | 社会不平等、累进所得税、转移支付、二次分配 |
| **经济 (SoWi)** | `[Werkzeug: markt-sim]` | 供求曲线与价格形成机制沙盘 | 完全竞争市场、均衡价格、消费者与生产者剩余 |
| **哲学 (Philo)** | `[Werkzeug: balance-board]` | 辩证价值裁决天平 | 伦理学两难抉择、功利主义 vs 康德义务论论据称重 |
| **语言 (Deutsch/EN)** | `[Werkzeug: highlighter]` | 多维文本荧光解构画板 | 论证结构拆解、核心论点与论据标注 |
| **语言 (Deutsch/EN)** | `[Werkzeug: lego]` | 考场学术句式拼装积木 | 学术规范句型、过渡词与高分表达拼接 |
| **口试 (Musik/Sport)** | `[Werkzeug: oral-timer]` | 15分钟口试全真倒计时手架 | 口试审题、5分钟独立陈述结构搭建与模拟答辩 |
| **理科通用 (MINT)** | `[Werkzeug: formula]` | 理科四步规范解题手架 | 复杂综合计算题、已知求知公式代入检验 |

*严禁在理科（Bio/Chemie/Physik/Mathe）中使用 `balance-board`（天平）！*

---

## 四、黄金样板：以《Bio-Biomembran-Osmose-Vertiefung-CN-L2.md》为标准范例

请参考以下完整示范的结构、详实度与语调：

```markdown
---
fach: Bio
thema: "Biomembran und Osmose in der Vertiefung"
level: 2
ziel: Klausur
xp: 100
operatoren: [darstellen, erklaeren, begruenden]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Bio, CN]
version: Lesson-v3
---

# Lernreise: Biomembran und Osmose in der Vertiefung (L2, Ziel Klausur)

## Schritt 1 — entdecken: Ziele & Phänomen-Einstieg

【生活日常现象与思考（Hook & Phänomen）】：
为什么给新鲜的黄瓜片撒上一层食盐后，盘子里会迅速渗出大量水珠，而黄瓜片本身变得软塌塌？
为什么将红细胞放入纯净的蒸馏水中时，红细胞会迅速吸水膨胀直至破裂（溶血现象 Hämolyse），而具有相同外界环境的植物表皮细胞却能保持饱满挺拔而绝不破裂？

答案的核心在于**生物膜的微观架构（Biomembran）与渗透热力学（Osmose）**。细胞膜不是一层死气沉沉的塑料薄膜，而是一个动态流动的微观分子筛选大门。

ZIELE（本节 15 分钟深度掌握以下 3 大核心考点）：
1. **结构认知**：能准确复述并图解流动镶嵌模型（Fluessig-Mosaik-Modell）的三大要件：磷脂双分子层、镶嵌蛋白与胆固醇的流动性调控；
2. **热力学与水流判定**：能依据水势与渗透浓度梯度判断水分净移动方向（Wasserstrom），定量推导植物细胞的质壁分离（Plasmolyse）与质壁复原（Deplasmolyse）；
3. **解题方法（选程序）**：能在考试中瞬间区分顺浓度的被动运输（无需 ATP）与逆浓度的初级/次级主动运输（依赖 ATP 水解）。

Voraussetzung（知识预备与切口）：
- 已掌握扩散（Diffusion）的基本定义；
- 了解植物细胞含有中央大液泡与刚性细胞壁，而动物细胞仅有细胞膜无细胞壁。

Klausur-Satz: `Wasser folgt passiv dem Konzentrationsgefaelle des Loesungsmittels (Osmose); die selektiv permeable Biomembran reguliert den selektiven Stoffdurchtritt.`

## Schritt 2 — entdecken: Fachbegriffe & Pre-Training
...
```

---

## 五、外部 AI 批量改写任务提示词（直接复制给外部 AI）

您可以将下方提示词及文件清单直接分发给外部 AI（如 Claude 3.5 Sonnet / GPT-4o / DeepSeek），每次处理一个学科（约 10~20 篇）：

```markdown
【任务：EF-Lernvault 互动课程教学质量与结构全面重塑（SOP 规范执行）】

你是一名具有北威州（NRW）Abitur 顶级命题经验、精通现代探究式教育学（PhET/Brilliant 风格）的教学教研专家。
目前项目系统检测到部分课件存在严重质量缺陷：
1. 小节标题同名化（全是纯 ## Schritt N — entdecken，导致目录千篇一律）；
2. 第 1 步与第 2 步骨架化（只有 20 字目标提纲，缺少生活反差引入与实质概念教学）；
3. 工具标签错误或未注册；
4. 实操环节缺少沙盘探索指导。

请对以下提供的课件文件进行全量扩写与重塑：
[输入你要修改的文件路径及原内容，或指定文件名]

【必须严格执行的重塑规则】：
1. 具名化标题：每个步骤标题必须追加冒号与小节主题：
   - Schritt 1 — entdecken: Ziele & Phänomen-Einstieg
   - Schritt 2 — entdecken: Fachbegriffe & Pre-Training
   - Schritt 3 — entdecken: Kernkonzept & Wirkungsmodell
   - Schritt 4 — ausprobieren: Interaktive Praxis & Labor (或具体实验名)
   - Schritt 5 — ausprobieren: Verfahrensvergleich & Abgrenzung
   - Schritt 6 — check: Verständnisprüfung
   - Schritt 7 — szenario: Klausurtransfer & Rubric
   - Schritt 8 — entdecken: Takeaway & Metakognitive Reflexion

2. 充实第 1 步（Schritt 1）：
   - 必须先写【生活日常现象与思考（Hook & Phänomen）】（至少 100 字，生动反常识）；
   - 用通俗语言铺垫核心机制；
   - 再保留 ZIELE (3条)、Voraussetzung 和 Klausur-Satz。

3. 充实第 2 步（Schritt 2）：
   - 术语盒包含 5 个核心专业术语，附带详细的机制解析与考场采分点说明。

4. 充实第 3 步（Schritt 3）：
   - 深入剖析概念因果链，配备结构清晰的 ASCII 框图（包裹在 ```diagram ... ``` 中）。

5. 规范第 4 步（Schritt 4）沙盘工具：
   - 严禁出现 zelle / lgs / plan 等未注册工具！严格从官方已注册教具列表中选择：
     - 生物：[Werkzeug: osmose-lab]
     - 化学平衡：[Werkzeug: le-chatelier-sim]
     - 化学滴定：[Werkzeug: titration-lab]
     - 物理受力：[Werkzeug: schiefe-ebene]
     - 物理运动：[Werkzeug: kinematik-lab]
     - 数学极值：[Werkzeug: box-optimizer]
     - 数学导数：[Werkzeug: tangent-slider]
     - 经济分配：[Werkzeug: gini-allocator]
     - 经济供求：[Werkzeug: markt-sim]
     - 哲学天平：[Werkzeug: balance-board]
     - 语言句式：[Werkzeug: lego]
     - 语言高亮：[Werkzeug: highlighter]
     - 理科计算：[Werkzeug: formula]
   - AUFGABE 必须引导学生使用沙盘调动参数并得出规律。

6. 语言与排版门禁：
   - `-DE-` 文件必须 100% 纯德语母语级表达，严禁出现任何汉字 CJK；
   - `-CN-` 文件采用中德双语桥接；
   - 公式统一采用标准 KaTeX（$...$ 与 $$...$$）；
   - 保留原 frontmatter 与步骤 6-8（可润色，不可丢失）。
```

---

## 六、分学科批次施工实施计划

1. **第一批（生物与化学 MINT，共 58 篇）**：
   - 消除 `zelle`、`enzyme-lock` 误标，全量绑定 `osmose-lab`、`titration-lab`、`le-chatelier-sim`；
   - 扩写第 1 步的生活微观实验引入（如酶变性、光合作用光饱和点、化学平衡移动）。
2. **第二批（数学与物理 MINT，共 61 篇）**：
   - 消除 `lgs` 误标，全量绑定 `box-optimizer`、`tangent-slider`、`schiefe-ebene`、`kinematik-lab`；
   - 扩写几何折纸盒、运动学刹车落体等生活情境引入。
3. **第三批（社科与人文 SoWi / Philo / Deutsch / EN，共 108 篇）**：
   - 绑定 `gini-allocator`、`markt-sim`、`balance-board`、`lego`、`highlighter`；
   - 扩写社会公平、道德抉择、戏剧冲突引入。
4. **第四批（艺术与体育 Musik / Sport，共 38 篇）**：
   - 绑定 `oral-timer`、`kinematik-lab`，扩写跳远生物力学与和声调性引入。
