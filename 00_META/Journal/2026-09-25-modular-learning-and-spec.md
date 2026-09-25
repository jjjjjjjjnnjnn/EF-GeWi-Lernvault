---
fach: Meta
thema: "三段模块化学习架构重构与全考纲内容搜集交付总纲"
operatoren: [konzipieren, implementieren, dokumentieren]
klausurrelevant: false
datum: 2026-09-25
tags: [EF, Meta]
---

# 三段模块化学习架构重构与全考纲内容搜集交付总纲

> 日期：2026-09-25
> 状态：✅ 全部通过（57 个测试套件 379 项测试 100% 通过、npm run build 构建成功、vault-check 校验通过、1420 端口实时运行）

---

## 1. 任务背景与核心诉求

用户在审查现有项目时提出两项核心改进诉求：
1. **产品与交互架构重塑**：
   - 现有的学科树与各模块功能分散，交互不够顺滑。
   - 互动旅程（Lernreise）板块缺少实质教学内容，应当重构为**新内容学习板块**。
   - 将整个客户端划分为清晰的「**学习 (Lernen) · 复习 (Wiederholen) · 练习 (Üben)**」三段闭环，并将学科教具（Werkzeuge）直接嵌入互动课程步骤中（如探索/动手阶段直接呼出沙盘教具），实现学练一体。
2. **知识内容完备化与交接方案**：
   - 用户明确指示：**当前不直接由本 Agent 耗费大量上下文去手写零碎内容**，而是由本 Agent 输出极其详尽严谨的**考纲全量内容搜集与生成规范（Master Specification）**，用户将使用外部高级大模型（Claude 3.5 Sonnet / GPT-4o）进行批量抓取与标准化生成。

---

## 2. 核心成果与变更明细

### A. 编制全量考纲内容规格说明书 (`00_META/Lehrplan-Content-Spezifikation.md`)
- **十大学科缺口全景审计**：梳理北威州（NRW EF）Deutsch、Englisch、Mathe、Physik、Chemie、Bio、Philosophie、SoWi、Musik、Sport 共 10 门学科的 Inhaltsfelder 缺口清单与知识树叶子节点需求。
- **规范 A：Lernreise 9 步互动课脚本标准模板**：制定了严格的 JSON 结构规范（entdecken/ausprobieren/check/szenario/muendlich 等步骤），定义了内嵌教具语法 `[Werkzeug: tangent/balance/lego/highlighter/formula/oral-timer]`、XP 激励机制、Sokratisch 启发提示词约束及双语字段规范。
- **规范 B：Wissensnotiz 八段式知识笔记标准模板**：严格遵照 `Templates/Wissensnotiz-Template.md`（中文理解、核心概念、知识结构、解题方法、理科 CN-Methode、考试真题 AFB I–III 及评分准则 EHZ、高频错因陷阱、网状关联），禁止非法变音符（ä/ö/ü 代以 ae/oe/ue），明确考点与思维模型。
- **规范 C：Anki CSV 双向卡片规范**：分号分隔、UTF-8 编码、双语严格对照、无单元格内换行。
- **即用型外部 AI 批量生成 Prompt（Master Prompts）**：为 Claude 3.5 Sonnet / GPT-4o 编写了开箱即用的两套批量生成提示词，保障外部 AI 吐出的内容可无缝合入本仓库与客户端。

### B. 客户端交互架构模块化重构 (`App.tsx`)
- **三段式工作区划分**：
  - **学习 (Lernen · 新知)**：
    - `reise`（互动课程 / Alt 9）：作为获取新知识的核心枢纽，互动引导与内嵌沙盘。
    - `library`（知识库 / Alt 2）：查阅八段式精讲笔记与中德考纲映射。
    - `lernbaum`（考纲树 / Alt B）：自顶向下的知识大纲视图与全图缩放。
    - `mindmap`（思维导图 / Alt 8）：全局关联网络与多维图谱。
  - **复习 (Wiederholen · 卡片)**：
    - `flashcards`（智能抽认卡 / Alt 3）：FSRS 记忆算法、分级遗忘复习。
    - `planner`（进度计划 / Alt 7）：学习日程、热力图与冲刺目标。
  - **练习 (Üben · 实战)**：
    - `klausursim`（全真模考 / Alt 5）：NRW 标答 EHZ 对照、算子打分与时间控制。
    - `quiz`（闪电测验 / Alt 4）：高频概念快问快答与即时反馈。
    - `tutor`（AI 助教 / Alt 6）：启发式 Sokratisch 追问与考前直出双模态辅导。
    - `werkzeuge`（学科教具 / Alt W）：6 大可视化交互教具独立操作台。
- **顶部微胶囊分段条联动**：根据当前所选的主工作区自动激活对应的子功能栏，保持页面极简无噪音。
- **快捷键保持完全向后兼容**：所有原快捷键映射保持稳定，快捷键帮助与命令面板无缝衔接。

### C. 互动课程内嵌可视化教具 (`Reise.tsx` + `SatzbauLego.tsx`)
- 在 `Reise.tsx` 中实现 `renderEmbeddedTool` 渲染管道，支持在互动课程的 `entdecken`（概念发现）与 `ausprobieren`（动手实践）步骤内无缝加载：
  - `[Werkzeug: tangent]` → 割线逼近切线导数沙盘 (`TangentSlider`)
  - `[Werkzeug: balance]` → 辩证价值裁决天平 (`BalanceBoard`)
  - `[Werkzeug: lego]` → 考场学术句式积木 (`SatzbauLego`)，支持传入当前学科自动匹配模板
  - `[Werkzeug: highlighter]` → 多维文本解构器 (`TextHighlighter`)
  - `[Werkzeug: formula]` → MINT 规范四步解题脚手架 (`FormulaScaffold`)
  - `[Werkzeug: oral-timer]` → 口试实战计时矩阵 (`OralExamTimer`)
- 使得学科教具不再是脱节的小玩具，而是深度参与到新课程的每一步互动体验中。

---

## 3. 门禁验证结果

1. **测试套件**：`npm run test:run`
   - **57 个测试文件全部通过（57 passed）**
   - **379 项单元测试与集成测试全部通过（379 passed）**
   - 耗时约 57 秒，零错误，零报警中断。
2. **生产构建**：`npm run build`
   - `tsc -b && vite build` 成功完成，零类型报错，生成 148 个模块打包产物。
3. **仓库规范校验**：`python scripts/vault-check.py`
   - 360 篇笔记全数合规，1400 条 CSV 词汇行全部格式正确，276 条 INDEX 链接完整对应，Lernreise 命名与步骤检查 100% 通过，`PASS`。
4. **开发服务器**：
   - 持续运行在 `http://localhost:1420/`，实时热更新正常。

---

## 4. 后续交接与外部协作指引

- **用户操作指引**：
  1. 打开 `00_META/Lehrplan-Content-Spezifikation.md`。
  2. 复制第 5 节的 **外部 AI 批量提示词**（Master Prompt 1 用于生成新互动课程，Master Prompt 2 用于生成八段式笔记与词卡）。
  3. 粘贴到 Claude 3.5 Sonnet / GPT-4o 中批量生成所需章节。
  4. 将生成的 `.json` 文件放入 `Lernreise/`，`.md` 文件放入对应学科的 `Texte-Analyse/`（文科）或根目录（理科），CSV 行追加至对应学科的 `Vokabeln-Anki/`。
  5. 运行 `python scripts/vault-check.py` 即可一键审计合规性并自动呈现在客户端！
