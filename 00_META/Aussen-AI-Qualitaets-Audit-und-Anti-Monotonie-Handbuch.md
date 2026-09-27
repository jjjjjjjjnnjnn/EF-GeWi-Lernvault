---
fach: ""
thema: "Aussen-AI Qualitaets-Audit und Anti-Monotonie-Handbuch"
operatoren: []
klausurrelevant: false
datum: 2026-09-27
tags: [EF, Meta, Handbuch, Quality, Audit, Didaktik]
---

# 课件实质质量审查报告与去重深耕重塑手册（针对外部 AI 敷衍套模的根治案）

> **致外部 AI 团队的严肃警示**：
> 经人类导师与主架构师对全库课件的**逐字直接读取审查（Direct Inspection）**，我们发现当前课件虽然在脚本正则匹配（audit-pedagogy-integrity.py）上实现了“数字上的全绿”，但其**内部内容存在严重的水分敷衍、教具错配、文本无源空转以及同一金句整课复读 8 遍的恶劣套模行为**！
> 机器脚本只能检查是否有这个标签，**绝不能替代真正能让高中生学懂、提分的扎实内容**。本手册公布直读抽检抓包证据，并下达铁律整改操作规范！

---

## 一、真实文件直接读取审查抓包证据（四大敷衍痼疾）

### 痼疾 1：教具严重错配，挂羊头卖狗肉（物理/生化）
- **典型抓包文件**：`Lernreise/Physik-Federpendel-Harmonische-Schwingung-DE-L1.md`
- **现场实录**：
  - 本课的核心主题是**弹簧振子与简谐振动（$T = 2\pi\sqrt{m/D}$）**；
  - 外部 AI 竟然在 Schritt 4 机械绑定了 **`[Werkzeug: schiefe-ebene]`（斜面）**！
  - 任务描述更极其荒诞：“*Knacke das Feder-Level: Ziehe im Sandbox-Labor Masse $m$ und Federhaerte $D$*” —— 斜面教具根本只有倾角和滑动摩擦力，哪来的弹簧刚度系数 $D$ ？！
  - **严重后果**：学生打开软件，看到的是一个滑块在斜面上滑，跟弹簧振动八竿子打不着！

### 痼疾 2：文本分析教具“无源空转”，没有原文字段（德语/英语）
- **典型抓包文件**：`Lernreise/Deutsch-Dramenszenenanalyse-Emilia-Galotti-L1.md`
- **现场实录**：
  - Schritt 4 声明使用了 **`[Werkzeug: highlighter]`（荧光笔文本高亮）**；
  - 题目写道：“*AUFGABE: Untersuche den Fall-Text 08 (Brief des Prinzen mit Tintenfleck)*”；
  - **但是翻遍全篇，根本没有提供任何一段《艾米莉亚·加洛蒂》的剧本原文字段！连半行引文都没有！**
  - **严重后果**：学生拿了荧光笔，面对的是一片空白，根本无文可划！这是纯粹的形式主义欺骗！

### 痼疾 3：同一考点金句全文复读 8 遍，或留占位符（全学科）
- **典型抓包文件**：
  - `Deutsch-Dramenszenenanalyse-Emilia-Galotti-L1.md`：
    `Klausur-Satz: Der Prinz deutet an, Marinelli vollstreckt: Arbeitsteilung der Willkuer.` 这一句话在 S1、S2、S3、S4、S5、S6、S8 **整整复读了 8 遍**！
  - `Physik-Federpendel-Harmonische-Schwingung-DE-L1.md`：
    在 S1、S2、S3、S4、S5 结尾赫然留着：
    `Klausur-Satz: Siehe Schritt-Inhalt.`（直接复制了占位符文字“参见小节内容”！）

### 痼疾 4：剧情套模流水线，跨学科生搬硬套（缺乏真实情境）
- **典型抓包文件**：
  - `Chemie-Chemisches-Gleichgewicht-DE-L1.md`：明明讲的是哈伯-博施高压合成氨，S1 却突兀地写道“*Phenolphthalein bleibt farblos, wo Pink erwartet war; der Titrationsautomat streikt.*”（把滴定实验的开场白直接复制到气相化学平衡课里！）；
  - `Physik` 几乎所有课都是同一句“*Navigatorin Lena meldet: v0 = 310 m/s, a = 3.3 m/s2*”；
  - 核心定义极其干瘪，每条只有半句话（如 `Le Chatelier: System weicht der Störung aus`），没有微观热力学因果，没有具体的浓度数值运算。

---

## 二、六大根治铁律（外部 AI 重塑操作红线）

每个外部 AI 实例在重塑课件时，必须逐条对齐以下六大铁律，违者验收一票否决：

### 1. 🚫 严禁无源空转：文科必须配齐一手分析材料（Primärtext）
- 凡在德语、英语、哲学、社科中使用 `[Werkzeug: highlighter]` 或进行文本/漫画分析的课件：
  - **必须在 Schritt 4（或紧接任务前）给出真实的 100~200 词德国原版文本选段（标注行号 Z. 1–15）**！
  - 必须给出具体的荧光笔标注指示（如：*“Markiere mit GELB die Metaphern für die Macht des Prinzen; markiere mit BLAU die Sprechakte Marinellis.”*）。

### 2. 🚫 严禁教具错配：教具必须与知识点物理/数理机制 100% 吻合
- 弹簧振子、电磁感应、光学等没有专属动画组件的理科课件，**绝对禁止强行套用 `schiefe-ebene` 或 `osmose-lab`**！
- 必须根据知识点真实逻辑合理匹配：
  - 涉及公式推导、数值定量计算 $\to$ **`[Werkzeug: formula]`**；
  - 涉及权衡博弈、对立假说对比 $\to$ **`[Werkzeug: balance-board]`**；
  - 涉及特定实验（滴定、勒夏特列、渗透、斜面、自由落体、割线切线、容积优化、基尼系数、市场均衡）才允许使用对应专属组件。

### 3. 🚫 严禁金句复读与占位符：8 步 Klausur-Satz 必须步步递进且独立
- 全篇 8 个小节底部的 `` `Klausur-Satz: ...` `` **必须各自独立，严禁全文复读同一句话，严禁出现 `Siehe Schritt-Inhalt` 占位符**：
  - **S1 Klausur-Satz**：概括该知识点的现实核心矛盾与现象定义；
  - **S2 Klausur-Satz**：提炼 5 个专业术语中最核心的考场定义得分点；
  - **S3 Klausur-Satz**：提炼因果传导模型（A $\to$ B $\to$ C）的标准德语采分句；
  - **S4 Klausur-Satz**：总结沙盘实验得出的定量/定性规律；
  - **S5 Klausur-Satz**：提炼 Weg A 与 Weg B 决策判据的终极鉴别句；
  - **S6 Klausur-Satz**：总结自测中最容易混淆的易错点；
  - **S7 Klausur-Satz**：给出一句可直接照抄到 Abitur 考卷上的 AFB III 规范满分答题句；
  - **S8 Klausur-Satz**：升华为学科本质认知的元认知金句。

### 4. 🚫 严禁空洞模板台词：情境 Hook 必须量身定制
- 彻底销毁流水线式的“Lena meldet v0=310”与“Felix Dorn 带着账本冲进办公室”！
- 弹簧振子就讲**汽车减震器过减速带的共振与地震防震阻尼器**；
- 勒夏特列就讲**化工厂高压反应釜爆炸风险与降温降速的工程两难**；
- 基本法就讲**真实的联邦宪法法院判例（如网络数据监控 vs 隐私权、示威游行与交通管制）**。

### 5. 📚 核心概念必须具备扎实的学科深度与解释力
- S2 的每个专业术语，必须写足三层：
  ```markdown
  - **Fachbegriff**: [严谨德语学术定义（≥2句）]。Mechanismus: [微观/系统运作机理]。Klausur-Tipp: [NRW 判卷老师抓的核心得分词]。
  ```
- S3 必须给出清晰的数学公式展开（KaTeX）与因果逻辑图，严禁只有两三个单词连线。

### 6. ⚖️ S5 双向对抗必须是真实的学术/方法路线对决（VERGLEICH）
- 严禁“先选程序还是先算”这种废话！必须是学科内部真实的双向辨析：
  - **理科**：定量状态方程计算（Weg A）vs 定性守恒定律分析（Weg B）；
  - **哲学**：康德绝对命令检验（Weg A）vs 功利主义多维福祉算题（Weg B）；
  - **社科**：自由市场供求自发调整（Weg A）vs 凯恩斯国家宏观干预（Weg B）；
  - **文学**：微观文本修辞细读（Weg A）vs 宏观时代阶级历史语境还原（Weg B）。

---

## 三、UI 排版层次升级与视觉规范

系统现已在 [`App-EF-Lernvault/src/components/Blocks.tsx`](../App-EF-Lernvault/src/components/Blocks.tsx) 全面上线全新**高对比度卡片化排版引擎**：
1. **`ZIELE` 自动识别为 🎯 LERNZIELE 任务简报卡**（带序号微徽章）；
2. **`Hook / Phänomen` 自动识别为 📖 情境探索羊皮纸卡**（突出冲突故事）；
3. **`- **Term:** ...` 自动解析为独立高亮概念卡**（术语微胶囊 + 重点原色高亮）；
4. **`diagram` 自动渲染为 ⚙️ 因果流程图容器**；
5. **`Klausur-Satz` 自动升级为 ⭐ 黄金考点采分卡**（高亮原色边框与学术衬线精排）；
6. **S4/S5 自动升级为 🎮 沙盘操控台与 ⚖️ 双向对决天平卡**。

因此，外部 AI 只需严格产出符合上述格式的内容，即可在客户端自动呈现出杂志级的精致排版！

---

## 四、外部 AI 即用型重塑指令模版（带反套模强制审查）

```text
================================================================================
【外部 AI 课件深度去水与去重塑型指令】
================================================================================
你正在执行《EF-GeWi-Lernvault》课件的【深度去水、去重与实质性充实】任务。
针对此前外部 AI 产出中发现的“挂羊头卖狗肉（教具错配）”、“同一句话复读 8 遍”、“无原始分析文本”等严重敷衍问题，你必须严格执行以下红线：

【目标课件】：[填写文件路径，如 Lernreise/Deutsch-Dramenszenenanalyse-Emilia-Galotti-L1.md]
【学科与主题】：[填写 Fach 与 Thema]

【必须落地的重塑要求】：
1. 真实文本/数据注入：
   - 若本课涉及语言、戏剧、诗歌、历史或哲学文献，必须在 Schritt 4 完整给出一段 100~200 词德国原版选段（带行号 Z. 1-15），并配合 highlighter 给出明确标注任务！
   - 若本课为理科，必须给出具体的数值数据与真实反应式。
2. 教具 100% 契合知识点：
   - 检查当前教具是否与本课原理真正契合！严禁弹簧振子用斜面！没有专属沙盒的理科一律使用 [Werkzeug: formula] 或 [Werkzeug: balance-board]。
3. 8 句 Klausur-Satz 绝不重复：
   - 彻底消灭全篇复读！S1~S8 的 Klausur-Satz 必须全部根据本节内容独立撰写，逐句为 NRW 考卷采分点服务，绝不出现 "Siehe Schritt-Inhalt" 占位符。
4. 深度充实 S2 术语与 S3 机制：
   - 5 个专业术语必须写出【学术定义】+【运转机制】+【考场得分要点】；
   - S3 给出具有逻辑深度的因果推导与 KaTeX 公式。
5. S5 必须是真正的理论/方法路线大对决（Weg A vs. Weg B）：
   - 严禁假大空的套话，必须呈现两种真实对立的分析路径或学派。

【输出方式】：输出就地覆盖该文件的完整 Markdown 内容（含 Frontmatter）。
================================================================================
```
