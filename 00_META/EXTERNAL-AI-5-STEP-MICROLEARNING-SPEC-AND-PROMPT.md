---
fach: "SoWi"
thema: "5-Schritte-Konstruktivismus Micro-Learning Standard & External AI Production Prompt"
operatoren: [analysieren, beurteilen, darstellen]
klausurrelevant: true
datum: 2026-10-11
tags: [EF, Meta, MicroLearning, Didaktik, ProductionPrompt]
version: 2.0-Production
---

# 5 步建构主义互动微课 · 标准化生产规范与外部 AI 批量设计 Prompt

> **文件定位**: 本规范总结了经过反复实战迭代、测试验收与教研重构打磨成型的**「5 步建构主义互动微课 (5-Schritte-Konstruktivismus)」终极交互与教学闭环**。  
> **核心用途**: 供外部顶级大模型（Claude 3.7 Sonnet / GPT-4o / DeepSeek-V3 / o3-mini）直接消费，用于批量生产北威州高中（Gymnasium EF/Q1/Q2）全学科高质量、严谨学术级、可直接驱动前端组件的高交互课程数据。

---

## 一、 为什么抛弃传统网课？5 步建构主义核心心流剖析

传统线上课件最大的痛点是**“阅读大段文字 -> 点击下一步 -> 做一道侮辱智商的假单选题”**，这种模式不仅学习效率低下，而且完全无法应对德国文理高中高要求的**学术专业语言（Fachsprache）**与**因果链条（Kausalkette）**考核。

本系统确立的 **5 步建构主义闭环（Zero-Scroll 桌面双栏工作台）** 严格遵循以下认知认知递进：

```
[ Step 1: 直觉冲突 ] ➔ [ Step 2: 动手探究 ] ➔ [ Step 3: 公理拼图 ] ➔ [ Step 4: 0分排雷 ] ➔ [ Step 5: 15NP标答 ]
 (生活两难·零剧透)     (微世界·调参出清)     (假设vs现实·对决)     (真实错题·找茬诊断)   (双层双语·AFB III)
```

| 步骤 | 名称 | 核心使命 | 教学动作与状态机阻尼 |
| :--- | :--- | :--- | :--- |
| **Step 1** | **直觉冲突与学术解码** (*Intuitions-Konflikt*) | 打破生活常识，建立理论好奇心 | **左栏生活两难**（<80字，无理论透露）+ **零剧透二选一**；点击后**右栏展开 2 句因果穿透 + 极简 Tufte 黑白数理坐标图 + 5 大前提清单**。 |
| **Step 2** | **动手探究实验台** (*Labor-MicroWorld*) | 亲手操纵参数，发现边界与规律 | **Zero-Scroll 单屏工作台**；通过滑块或控制器调整变量；**严格阻尼感**（未进目标区间保持禁用，达成靶心瞬时点亮因果结论与高阶考点）。 |
| **Step 3** | **公理与现实对决拼图** (*Konzept-Puzzle*) | 拆解模型理想假定与真实世界破绽 | **4-vs-4 认知对抗拼图**（左栏模型假设，右栏现实破绽）；双层中德学术语言；单行 Spotlight 锁定反馈；全部正确配对后解锁下一步。 |
| **Step 4** | **考场真实 0 分答案找茬** (*0-NP Absturz-Falle*) | 直面真实考场经典失分陷阱 | **盖印 `0 / 15 NP` 考场印章**；展示真实考生高频失分错题（如混淆配置效率与社会福利）；**高对抗性诊断选项**（杜绝稻草人弱智选项）；答对出具考官标准订正卡。 |
| **Step 5** | **15 NP 会考金句与终局大题** (*15-NP-Meistersatz*) | 形成兼顾事实与价值的高阶评价能力 | **零剧透双层双语**：主文为德语真实高考长难句（`»Zwar... dennoch...«`），副文为严谨中文提炼；包含标准踩分项与典型片面失分项；答对授予 15 NP 勋章与关键词。 |

---

## 二、 外部 AI 必须无条件恪守的【八大红线与排雷铁律】

外部 AI 在设计任何学科内容时，**必须逐条审查以下红线**。违反任何一条即属于废品：

1. 🚫 **【严禁元数据剧透与答案外泄 (Zero-Spoiler)】**：
   - 选项文本中**严禁出现任何透露正误的标签**（例如绝对禁止写 `满分 15 NP 评价大题金句:`、`（失分症结：...）`、`（正确）`、`（错误）`、`（混淆了...）`）。
   - 题干与选项在提交前必须保持客观、中立、严肃；所有诊断性失分分析与表扬**必须严格放在提交后的 `explanation` 字段中**！
2. 🚫 **【严禁稻草人弱智干扰项 (No Strawman Options)】**：
   - 绝对禁止编写明显搞笑、一眼看穿的假选项（如：“一个日常通俗的大杂烩词汇”）。
   - 干扰项必须是**真实尖子生在考场高压下最容易踩中、逻辑极其自洽的高频失分陷阱**（如片面强调市场自发效率而忽视宪法社会国家原则、混淆微观市场模型与现实宏观福利政策）。
3. 🚫 **【严禁跨学科逻辑串台与幽灵文本残留 (Domain Integrity)】**：
   - 微观经济学（Mikroökonomie: 完全市场、供求出清、价格弹性）**绝不允许混入**宏观经济学内容（Makroökonomie: 央行利率、稳定法案、魔术四角形、凯恩斯总需求）。
   - 交互提示语必须紧扣本实验对象，**绝不允许残留其他教具的模板文案**（如在供求曲线上出现“天平砝码力矩”、“伦理权衡”）。
4. 🚫 **【严禁手机隧道病与单列挤压 (Desktop-First Zero-Scroll)】**：
   - 布局必须充分利用宽屏显示器，采用 45%/55% 双栏或紧凑图文工作台，在 1080p 视口内实现 **Zero-Scroll（免滚轮浏览）**。
5. 🚫 **【严禁低幼化情绪词与 RPG 戏谑剧情 (Academic Tone)】**：
   - 严禁出现“虚拟城邦告急”、“秒转隔壁”、“严重误判！”等网文词汇。
   - 全程采用德国文理高中与学术研讨会标准的 **Fachsprache（学科专业语言）** 与严肃考场设问。
6. 🚫 **【严禁彩色杂质与阴影（Tufte 黑白纸墨宪法）】**：
   - 界面纯粹基于 `--paper`（纯白/柔纸）、`--paper-subtle`、`--ink`（墨色）与 `--line`（1px 细线）。
   - 严禁使用 Emoji、严禁彩色高饱和度卡片、严禁 Tailwind shadows（`shadow-sm` 属于代码违规）。
   - 箭头统一使用纯 ASCII `->`，严禁使用 Unicode `➔`。
7. 🚫 **【严禁状态机未动先判定达成 (True State Friction)】**：
   - 实验台滑块在初始位置（0% 或基准状态）时，必须保持 `[ 待探究 ]` 状态，通关按钮严格禁用（Disabled）。
   - 必须真实拉动到设定靶心区间（如 `+48% ~ +52%`），方可触发达成判定。
8. 🚫 **【德语语法与双层双语文法精准 (Grammar & Locale)】**：
   - 德语单复数严格校准（如天数：`1 Tag` vs `2 Tage`；中文模式显示 `天`）。
   - 德语文科/社科大题必须严格绑定考纲操作动词（Operatoren: *darstellen (AFB I), analysieren (AFB II), beurteilen / erörtern (AFB III)*）。

---

## 三、 标杆范例剖析（Gold Standard Benchmark: 完全市场与供求机制）

以下是经过全量验证并已跑通的标杆数据，供外部 AI 精确对齐其学术深度与结构骨架：

### 1. Step 1 直觉冲突 (Intuitions-Konflikt)
- **生活场景 (Scenario)**: 汉堡鱼市露天大棚，100 家摊位都在卖一模一样的大西洋三文鱼，公认市场出清价均为 10 €/kg。今天捕捞成本猛涨，小李率先涨到 11 €/kg，隔壁 99 家依然卖 10 €。
- **直觉设问 (Question)**: 小李今天早上的三文鱼销量会发生什么？
- **零剧透选项**:
  - `[ A ]`: 销量温和下滑（老顾客仍会顺手购买，薄利多销）。
  - `[ B ]`: 销量瞬间暴跌至 0，一条鱼也卖不出去。
- **学术解码 (Decoded Insight)**:
  - 选择后揭示：日常直觉在理论模型中彻底失效！因为模型假定**商品完全同质**、**市场信息完全透明**且**顾客完全无偏好**。单个商贩面对一条水平需求曲线（$E = \infty$），毫无定价权，只能作为纯粹的“**价格接受者兼产量调整者 (Preisnehmer / Mengenanpasser)**”。

### 2. Step 2 动手探究 (Labor-MicroWorld)
- **教具类型**: `markt-sim`（2D 供求曲线坐标系）
- **探究任务**: 极端寒潮导致挪威三文鱼捕捞成本暴增，拖动右侧【生产成本】滑块至 `+50%` 靶心区间，观察供给曲线平移及均衡点 $G^*$ 的自发调整。
- **状态机靶心**: `costPercent: 50%`（区间 48%~52%）。
- **实验规律沉淀**: 供给曲线 $S$ 向上/左平移至 $S'$，自发推高均衡价格至 $14\text{ €}$，需求量被动压缩至 $300\text{ kg}$。价格机制通过“信号与配给职能 (Signal- & Allokationsfunktion)”在无任何行政命令干预下自发出清市场。

### 3. Step 3 公理与现实对决拼图 (Konzept-Puzzle)
- **对决配对 (4 组理想公理 vs 真实破绽与考场结论)**:
  1. `Homogenität der Güter` (商品完全同质) <-> `Produktdifferenzierung / Branding` (品牌溢价与质量差异) -> *Klausur: 现实中厂商通过商标与特色打造垄断竞争，摆脱纯价格被动接受。*
  2. `Vollständige Markttransparenz` (信息完全透明) <-> `Informationsasymmetrien` (信息不对称 / 柠檬市场) -> *Klausur: 买家无法瞬时获知所有报价，高价商家仍可利用信息差牟利。*
  3. `Keine persönlichen Präferenzen` (完全无偏好) <-> `Kundenbindung / Sympathie` (老客信任与就近便利) -> *Klausur: 消费者具有路径依赖与情感黏性，价格弹性并非无限大。*
  4. `Unendliche Reaktionsgeschwindigkeit` (瞬时无阻反应) <-> `Marktzutrittsschranken & Friktionen` (转换成本与准入壁垒) -> *Klausur: 资本与买家转移需要时间与交易成本，市场出清存在滞后时滞。*

### 4. Step 4 真实 0 分答案找茬诊断 (0-NP-Absturz-Falle)
- **考场原题**: *Erläutern Sie die Steuerungsfunktion des Preises auf dem vollkommenen Markt. (AFB II)*
- **0 分学生答卷**: »Der Gleichgewichtspreis sorgt dafür, dass alle Bürger mit lebensnotwendigen Gütern versorgt werden und verhindert gleichzeitig ungerechte Unternehmensgewinne durch den Staat.« (0 / 15 NP)
- **高对抗性诊断选项**:
  - `[ A (正确) ]`: 混淆了概念：价格机制只管「出清效率 (Effizienz)」，绝不保证「社会公正 (Gerechtigkeit)」或人人买得起。
  - `[ B (高迷惑干扰项) ]`: 制度混淆：该考生漏写了政府在完全市场中必须通过最高限价（Höchstpreis）来稳定物价，防止居民生活成本过高。
  - `[ C (高迷惑干扰项) ]`: 角色误判：以为单个商贩具有主动调控价格以谋求暴利的能力，忽视了其作为「价格接受者 (Preisnehmer)」的被动地位。
- **考官订正示范**: 完全市场对财富分配是冷血盲目的；保障弱势群体生存属于“社会市场经济”的二次分配，绝非价格内生功能。

### 5. Step 5 15 NP 会考金句终局考核 (15-NP-Meistersatz)
- **会考设问**: *Beurteilen Sie die Funktionsfähigkeit des Preismechanismus nach Art. 20 GG. (AFB III)*
- **双层双语选项**:
  - `[ A (正确 15 NP) ]`:
    - 德文主干: `»Zwar garantiert der vollkommene Preismechanismus eine allokative Effizienz im Sinne des Pareto-Optimums, dennoch erfordert das grundgesetzliche Sozialstaatsprinzip (Art. 20 GG) ordnungspolitische Korrekturen, da der reine Markt weder Verteilungsgerechtigkeit noch soziale Absicherung gewährleistet.«`
    - 中文学术提炼: `（既精确剖析完全市场在资源配置上的帕累托效率，又立足基本法社会国家原则论证秩序政策兜底的不可或缺性。）`
  - `[ B (片面市场崇拜干扰项) ]`:
    - 德文主干: `»Der Preismechanismus des vollkommenen Marktes führt stets zu optimalen Wohlfahrtsergebnissen, weshalb staatliche Markteingriffe ausnahmslos als wohlstandsmindernd abzulehnen sind.«`
    - 中文学术提炼: `（完全竞争市场的价格机制始终能实现最优福利结果，因此国家任何干预无一例外都会损害经济繁荣，应当予以彻底抵制。）`
  - `[ C (统制经济极端干扰项) ]`:
    - 德文主干: `»Die Soziale Marktwirtschaft erfordert die flächendeckende Ersetzung des freien Preismechanismus durch staatliche Festpreise, um absolute Verteilungsgerechtigkeit zu erzwingen.«`
    - 中文学术提炼: `（社会市场经济要求在全行业以国家统制定价彻底取代自由价格机制，以强制实现绝对的结果均等。）`
- **踩分关键词**: `Preismechanismus, Allokationsfunktion, Allokationseffizienz, Pareto-Optimum, Sozialstaatsprinzip, Verteilungsgerechtigkeit, Marktversagen`。

---

## 四、 外部 AI 核心生产 Prompt 模板（复制给 AI 的指令稿）

外部 AI 生成新课时，用户只需将以下虚线框内的指令连同课题信息复制给模型：

```markdown
### 角色定义
你是一名德国文理高中最高等级（Gymnasium Sekundarstufe II / Abitur NRW）资深学科教研专家兼顶级计算机互动教学架构师。
你的任务是将指定的高中课题，转化为一套符合【5 步建构主义 (5-Schritte-Konstruktivismus)】与【Tufte 黑白学术纸墨风】的高交互课程数据。

### 输入课题信息
- 学科 (Fach): [在此填入学科，如 SoWi / Philosophie / Deutsch / Physik / Chemie / Bio]
- 课题名称 (Thema): [在此填入德语主题名称，如 Soziale Marktwirtschaft: Prinzipien & Marktversagen]
- 对应考纲 Inhaltsfeld 与阶段: [如 NRW KLP SoWi IF 2: Marktwirtschaftliche Ordnung]
- 核心操作动词 (Operator): [如 beurteilen / analysieren / erörtern]

### 严苛生产标准
1. 必须完全符合《5-Schritte-Konstruktivismus Micro-Learning Standard》：
   - Step 1: 直觉冲突 (生活场景 <80字 + A/B 零剧透站队 + 右栏因果穿透与数理图解 + 5大公理清单)
   - Step 2: 动手探究实验台 (指定工具类型，明确参数微调靶心，严禁学科串台与幽灵文案)
   - Step 3: 公理与现实对决拼图 (4 组 4-vs-4 理想假设 vs 现实破绽，双层中德学术语言，附考场结论)
   - Step 4: 考场 0 分答案找茬诊断 (真实 0/15 NP 学生错句 + 拒绝稻草人假选项的高对抗性诊断)
   - Step 5: 15 NP 会考金句考核 (双层双语：德文高考长难句 + 中文学术摘要，零剧透选项，AFB III 辩证评价)
2. 绝对红线：
   - 选项文字严禁包含 `满分金句:` 或 `（失分症结：...）` 等剧透前缀；
   - 严禁 Emoji、严禁彩色背景、严禁 Tailwind shadows、箭头必须使用纯 ASCII `->`；
   - 德语文法严谨精准（单复数与专业术语无拼写错误）。

### 输出格式
请以纯 JSON 格式输出，数据结构必须严格对齐以下 TypeScript 接口：
```json
{
  "themeKey": "thema-kebab-case",
  "fach": "SoWi",
  "titleDE": "...",
  "titleZH": "...",
  "intuitionDilemma": {
    "scenarioDE": "...",
    "scenarioZH": "...",
    "questionDE": "...",
    "questionZH": "...",
    "choiceA": {
      "id": "A",
      "textDE": "...",
      "textZH": "...",
      "reactionDE": "...",
      "reactionZH": "..."
    },
    "choiceB": {
      "id": "B",
      "textDE": "...",
      "textZH": "...",
      "reactionDE": "...",
      "reactionZH": "..."
    },
    "mechanismTakeawayDE": "...",
    "mechanismTakeawayZH": "...",
    "klpCoreLogicDE": "...",
    "klpCoreLogicZH": "..."
  },
  "microWorld": {
    "toolType": "markt-sim | balance | highlighter | variable_slider",
    "toolId": "...",
    "missionPromptDE": "...",
    "missionPromptZH": "...",
    "targetCriteriaDE": "...",
    "targetCriteriaZH": "...",
    "learningTakeawayDE": "...",
    "learningTakeawayZH": "..."
  },
  "konzeptPuzzle": {
    "synthesisSummaryDE": "...",
    "synthesisSummaryZH": "...",
    "pairs": [
      {
        "id": "pair-1",
        "axiomDE": "...",
        "axiomZH": "...",
        "realityDE": "...",
        "realityZH": "...",
        "consequenceDE": "...",
        "consequenceZH": "..."
      }
    ]
  },
  "examTrapCorrection": {
    "flawedQuoteDE": "...",
    "flawedQuoteZH": "...",
    "examinerVerdictDE": "...",
    "examinerVerdictZH": "...",
    "fatalFlawPointDE": "...",
    "fatalFlawPointZH": "...",
    "diagnosticOptions": [
      {
        "id": "diag-correct",
        "textDE": "...",
        "textZH": "...",
        "isCorrect": true,
        "explanationDE": "...",
        "explanationZH": "..."
      },
      {
        "id": "diag-distractor-1",
        "textDE": "...",
        "textZH": "...",
        "isCorrect": false,
        "explanationDE": "...",
        "explanationZH": "..."
      },
      {
        "id": "diag-distractor-2",
        "textDE": "...",
        "textZH": "...",
        "isCorrect": false,
        "explanationDE": "...",
        "explanationZH": "..."
      }
    ]
  },
  "klausurSatz15NP": {
    "operator": "beurteilen",
    "musterSatzDE": "...",
    "explanationZH": "...",
    "scoringKeywords": ["..."],
    "distractors": [
      {
        "id": "muster-distractor-1",
        "textDE": "...",
        "textZH": "...",
        "isCorrect": false,
        "explanationDE": "...",
        "explanationZH": "..."
      },
      {
        "id": "muster-distractor-2",
        "textDE": "...",
        "textZH": "...",
        "isCorrect": false,
        "explanationDE": "...",
        "explanationZH": "..."
      }
    ]
  }
}
```
```

---

## 五、 后续新课程接入与工程集成标准 (Integration SOP)

外部 AI 批量设计产出的 JSON 数据，统一按照以下流程无缝接入工程体系：

1. **注册入库**: 将生成的 JSON 结构追加登记至 [`src/modules/teaching/engine/conceptDistiller.ts`](file:///C:/Users/rongj/Desktop/学习/App-EF-Lernvault/src/modules/teaching/engine/conceptDistiller.ts) 的 `DOMAIN_KNOWLEDGE_ENTRIES` 映射表中。
2. **自动化编译**: 编译器 [`lessonStepFlow.ts`](file:///C:/Users/rongj/Desktop/学习/App-EF-Lernvault/src/modules/teaching/engine/lessonStepFlow.ts) 会自动将其编译为标准的 5 步 `LessonStep` 流（Step 1 Lecture ➔ Step 2 MicroWorld ➔ Step 3 Puzzle ➔ Step 4 Trap ➔ Step 5 Quiz）。
3. **单元回归测试**: 在 `conceptDistiller.test.ts` 中补充一条测试断言，验证核心术语、踩分关键词和对决对数。
4. **质量门禁通关**: 依次执行：
   - `npx vitest run src/modules/teaching/`
   - `npx vitest run src/modules.test.tsx` (UI 规范审查)
   - `cmd /c "npx tsc -b"` (0 报错)
   - `python scripts/vault-check.py` (PASS)
