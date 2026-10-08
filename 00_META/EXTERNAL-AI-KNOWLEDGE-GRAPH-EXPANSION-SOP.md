---
fach: ""
thema: "External AI Knowledge Graph Expansion SOP"
operatoren: []
klausurrelevant: false
datum: 2026-10-08
tags: [EF, Meta, SOP, External-AI, Planetary-Graph]
---

# 【外部 AI 任务包】全学科行星引力知识星系与多维技能树批量扩充指南 (SOP)

> **核心目标**：将 EF-GeWi-Lernvault 升级为**以学科分类、以单个知识点及其认知学习流程为中枢、支持全学科无上限拓展（涵盖初中 Sek I、高中 EF/Q1/Q2 至大学先修 Uni-Prep）、具备多维分类与标签标记系统的“行星引力发散式知识星系图谱 (Planetary Gravitational Radial Graph)”**。
> **使用者**：外部 AI 研发集群（Claude 3.7 / GPT-4o / DeepSeek-R1 / Gemini 2.0 等）与项目师生。本指南包含架构规约、发卷 Prompt、用户交互手册与自动化质量门禁。

---

## 一、 行星引力发散式星系架构 (Planetary Gravitational Architecture)

### 1. 为什么采用行星引力发散图？
传统知识图谱多为平铺直叙的线性链条或杂乱力导向图，在节点超过 20 个时便会出现严重的重叠、视口溢出与认知负荷。
本项目独创的**行星引力多轨星系架构**具有以下天然优势：
1. **宏观发散、清晰不重叠**：以学科核心公理为中枢太阳（Sun Nucleus），知识点沿着极坐标扇区（Category Sectors）与同心轨道（Orbits）向外呈阶梯发散，视界开阔、结构井然；
2. **无限容量与学段全覆盖**：打破节点数量人为限制，同心轨道天然支持从基础到高阶无限向外扩展，完美承载从初中到大学先修（Uni-Prep）乃至更高阶学术研究的庞大知识体；
3. **因果引力流向**：节点间的前置依赖（Prerequisite）呈现为自内向外的引力流向，概念协同（Synergy）呈现为跨星区共振波；
4. **自动化极坐标几何演算**：无需外部 AI 手动计算像素坐标，系统内置 `computePlanetaryRadialLayout` 引力算法，自动根据分类星区与学段轨道完成等角发散排布！

```
                                  [ 外缘：大学先修与会考评价 ]
                                              │
                      ┌───────────────────────┴───────────────────────┐
                      │    Orbit V: Uni-Prep (大学先修理论导引)        │
                      ├───────────────────────────────────────────────┤
                      │    Orbit IV: Q2 · Abitur-Synthese (会考评价)  │
                      ├───────────────────────────────────────────────┤
                      │    Orbit III: Q1 · Vertiefung (机制深化)      │
                      ├───────────────────────────────────────────────┤
                      │    Orbit II: EF · Kernmodelle (核心建构)      │
                      ├───────────────────────────────────────────────┤
                      │    Orbit I: Sek I · Grundlagen (基础公理)     │
                      └───────────────────────┬───────────────────────┘
                                              │
                                   ┌──────────┴──────────┐
                                   │  ★ 学科核心太阳 ★   │ (Discipline Nucleus)
                                   │   (Subject Center)  │
                                   └─────────────────────┘
                                  /           │           \
                                 /            │            \
                        Sector A:          Sector B:        Sector C:
                      微观机制星区        宏观调控星区     社会分配星区
```

### 2. 同心引力轨道分层规范 (Concentric Orbit Tiers)
| 轨道等级 | 学段标识 (`curriculumTier`) | 认知难度 (`level`) | 学习阶段 (`stage`) | 轨道半径 ($R$) | 考纲定位 |
|---|---|---|---|---|---|
| **Orbit I** | `Sek_I` | AFB I (识记) | `einfuehrung` | $\approx 180\text{px}$ | 初中基础公理、直观生活经验与基石概念 |
| **Orbit II** | `EF` | AFB II (机制) | `grundlagen` | $\approx 310\text{px}$ | 高中导入期（EF），标准理论模型建构 |
| **Orbit III** | `Q1` | AFB II (推演) | `vertiefung` | $\approx 440\text{px}$ | 高二核心期（Q1），双向辨析与量化测算 |
| **Orbit IV** | `Q2` | AFB III (评价) | `synthese` / `klausur_praxis` | $\approx 570\text{px}$ | 高三冲刺（Q2），会考大题多支线汇聚与评析 |
| **Orbit V** | `Uni_Prep` | AFB II–III (先修) | `vertiefung` / `synthese` | $\approx 700\text{px}$ | 大学先修基础（微观博弈论、高等代数、范式辩论等） |

---

## 二、 多维分类与标记系统契约 (Taxonomy & Tagging Specification)

外部 AI 输出的每个知识点，必须具备清晰的分类大类与多维标签：

### 1. 核心分类星区 (`category`)
每个学科划分 3–6 个核心大类星区。例如：
- **SoWi**：`Mikrooekonomie` (微观机制)、`Makrooekonomie` (宏观调控)、`Ordnungspolitik` (经济秩序与法治)、`Sozialstruktur` (社会结构与不平等)、`Politisches-System` (宪政民主)；
- **Mathe**：`Analysis` (微积分理论)、`Kurvendiskussion` (函数性质)、`Optimierungsmodell` (最优化建模)、`Lineare-Algebra` (线性代数与空间几何)、`Stochastik` (概率统计)；
- **Philosophie**：`Utilitarismus` (功利主义)、`Deontologie` (康德义务论)、`Anthropologie` (人论与自由意志)、`Angewandte-Ethik` (应用伦理与科技困境)；
- **Physik**：`Kinematik` (运动学)、`Dynamik` (牛顿力学)、`Energie-Impuls` (能量动量守恒)、`Elektrodynamik` (电磁场)、`Quantenphysik` (量子物理先修)。

### 2. 多维标记标签 (`tags`)
包含多维检索标签数组，如：
- 知识属性：`["Formel", "Modell", "Axiom", "Grafik"]`
- 考点权重：`["Schwerpunkt-2026", "Klausur-Dauerbrenner", "AFB-III"]`
- 专题领域：`["EZB", "Inflation", "Gini", "Nash-Gleichgewicht", "Uni-Prep"]`

---

## 三、 数据模型契约与输出格式 (JSON Specification)

外部 AI 交付的数据必须是合法的 JSON 对象，格式如下：

```json
{
  "schemaVersion": 1,
  "fach": "SoWi",
  "nameDE": "Sozialwissenschaften",
  "nameZH": "社会科学 (SoWi)",
  "descriptionDE": "Wirtschaftspolitik, Soziale Marktwirtschaft, Ungleichheit und Spieltheorie",
  "descriptionZH": "经济政策、社会市场经济机制、分配不平等与现代博弈论 (全景引力星系图谱)",
  "isCustomSubject": false,
  "categories": [
    "Mikrooekonomie",
    "Makrooekonomie",
    "Ordnungspolitik",
    "Sozialstruktur"
  ],
  "availableTags": [
    "Markt",
    "EZB",
    "Inflation",
    "Gini",
    "Sozialstaat",
    "Dilemma",
    "Uni-Prep"
  ],
  "nodes": [
    {
      "id": "sowi-spieltheorie-nash",
      "fach": "SoWi",
      "titleDE": "Spieltheorie & Nash-Gleichgewicht",
      "titleZH": "博弈论与纳什均衡 (大学先修)",
      "summaryDE": "Strategische Interaktion im Oligopol: Gefangenendilemma und dominante Strategien.",
      "summaryZH": "寡头市场战略互动；囚徒困境与占优策略；非合作博弈在卡特尔合谋稳定性中的应用。",
      "category": "Mikrooekonomie",
      "curriculumTier": "Uni_Prep",
      "stage": "vertiefung",
      "level": 2,
      "xpReward": 150,
      "estimatedMinutes": 20,
      "prerequisites": ["sowi-marktformen-monopol"],
      "keyFormulaOrSentence": "Im Nash-Gleichgewicht hat kein Spieler einen einseitigen Anreiz, von seiner gewählten Strategie abzuweichen.",
      "commonFallacy": "Glaube, dass das Nash-Gleichgewicht stets die gesellschaftlich beste Lösung (Pareto-Optimum) darstellt.",
      "klausurTip": "Auszahlungsmatrix präzise aufstellen und Beste-Antworten unterstreichen.",
      "tags": ["Spieltheorie", "Nash-Gleichgewicht", "Uni-Prep"]
    }
  ],
  "edges": [
    {
      "id": "e-uni-1",
      "from": "sowi-marktformen-monopol",
      "to": "sowi-spieltheorie-nash",
      "type": "prerequisite",
      "descriptionZH": "寡头垄断定价权推演出策略博弈与纳什均衡"
    }
  ]
}
```

### 字段严格要求：
1. **`id`**：严格小写 kebab-case（如 `mathe-ableitung-grenzwert`），禁空格与下划线；
2. **`category`**：必填，必须归属于该学科定义的分类星区之一；
3. **`curriculumTier`**：必填，只能是 `"Sek_I" | "EF" | "Q1" | "Q2" | "Uni_Prep"`；
4. **`stage`**：必填，只能是 `"einfuehrung" | "grundlagen" | "vertiefung" | "synthese" | "klausur_praxis"`；
5. **`level`**：必填，`1` (AFB I), `2` (AFB II), `3` (AFB III)；
6. **`keyFormulaOrSentence`**：**必须填写能直接在 15 Notenpunkte 答卷中引用的德语规范句或数学物理公式**；
7. **`commonFallacy`**：**必须填写会考中最致命的易错误区与失分陷阱 (Fehlvorstellung)**；
8. **`coordinates`**：**可留空！** 系统在导入时会自动执行引力算法生成行星极坐标排布。

---

## 四、 框架与用户交互操作手册 (User Interaction Manual)

系统为用户提供了全自动化、直观便捷的操作流：

### 1. 视图无缝切换
- **[行星引力星系 (Planetary View)]**（默认推荐）：同心圆轨道与扇区辐射展开，宏观透视全学科知识分布，清晰不重叠；
- **[认知阶梯树 (Tree View)]**：左至右流程推进，专注阶梯式攻关与前后解锁。

### 2. 多维分类与标签高亮联动
- **星区 Chips 过滤**：点击顶部的分类按钮（如 `[Mikrooekonomie]`），画布中属于该星区的行星保持高亮对比度，非匹配节点优雅弱化（25% 虚化），保留星系全局视野；
- **多维标签下拉与关键词搜索**：输入关键字（如 `Inflation` 或 `导数`），即时高亮匹配知识点、15 NP 核心句及考点；
- **视口缩放与平移**：支持鼠标滚轮与拖拽平移视口，点击 `[1:1]` 瞬时复位。

### 3. 用户可视化编辑与节点拼插
- **查看详情**：点击任意行星或卡片，右侧弹出研习抽屉，展开双语因果链、15 NP 核心句、易错误区、关联微课/笔记/教具；
- **打标签与管标签**：在抽屉中可直接查看当前标签，点击 `x` 删除标签，或输入新名称点击 `+` 即可一键绑定；
- **编辑节点**：点击抽屉底部的 `[编辑此节点属性]`，可在弹窗中自由修改标题、分类、学段、难度、公式与考点；
- **动态拼插**：点击顶部 `[拼插知识点]`，可无缝向任何星区和前置节点追加新知识点；
- **一键引力排布**：随时点击顶部 `[一键引力排布]`，画布自动以极坐标最优解重新重整所有行星位置。

### 4. JSON 导入导出与外部 AI 对接中心
- 点击顶部 `[JSON]` 按钮打开导入导出中心；
- **导出**：点击 `[复制当前 JSON]`，即可将当前学科图谱完整拷出并分发给外部 AI 扩充；
- **导入**：直接将外部 AI 生产的 JSON 粘贴至文本框，点击 `[校验并导入图谱]`，系统会自动执行死锁循环检测与数据合规校验，合规后即刻渲染进星系画布！

---

## 五、 外部 AI 发卷任务模板 (Ready-to-Use Prompt)

直接复制以下整段提示词发送给外部大模型，并填入 `${学科名称}` 与 `${计划提取节点数}`（例如 40 到 80 个节点）：

````markdown
# 任务：为 EF-GeWi-Lernvault 编写【${学科名称}】全景行星引力知识星系数据 (大容量批量提取)

你是一名专精于德国北威州高中高级阶段（Gymnasium Oberstufe）及大学先修教育（Universitäts-Vorbereitung / Uni-Prep）的资深教研总监与知识图谱架构师。

请为学科【${学科名称}】输出完整的 JSON 知识图谱数据，要求构建一个**大容量、非线性、涵盖初中基石 (Sek I)、高中考纲 (EF/Q1/Q2) 至大学先修导引 (Uni-Prep) 的行星引力星系图谱**。

### 一、 核心铁律
1. **大容量网状拓扑**：输出 ${计划提取节点数} 个知识点（建议 30–80 个），绝非单向流水线！必须包含 3~5 个核心大类星区，多条并行支线，多前置汇聚终极大题，以及大学先修延伸节点；
2. **多维分类与学段标记**：
   - 每个节点必须指定 `category`（如该学科的核心领域）；
   - 每个节点必须指定 `curriculumTier`（"Sek_I" | "EF" | "Q1" | "Q2" | "Uni_Prep"）；
   - 每个节点必须配置实用 `tags` 数组；
3. **中德双语学术标准**：`titleDE` 必须是德国官方考纲与大学导论规范学术术语，`titleZH` 必须是生动精准的中文通俗理解；
4. **必须包含提分硬货**：
   - `keyFormulaOrSentence`：能直接在 15 Notenpunkte 试卷中引用的德语规范句或公式；
   - `commonFallacy`：该考点最致命的易错误区与失分陷阱；
5. **死锁防范**：纯小写 kebab-case ID，前置依赖必须真实存在且绝不允许形成闭环死锁；
6. **坐标免填**：无需填写 coordinates，系统将通过引力算法自动计算极坐标排布。

### 二、 输出格式
请仅输出严格的 JSON 代码块：
```json
{
  "schemaVersion": 1,
  "fach": "${学科名称}",
  "nameDE": "...",
  "nameZH": "...",
  "descriptionDE": "...",
  "descriptionZH": "...",
  "isCustomSubject": false,
  "categories": ["CategoryA", "CategoryB", "CategoryC"],
  "availableTags": ["Tag1", "Tag2"],
  "nodes": [
    {
      "id": "${学科前缀}-node-id",
      "fach": "${学科名称}",
      "titleDE": "...",
      "titleZH": "...",
      "summaryDE": "...",
      "summaryZH": "...",
      "category": "CategoryA",
      "curriculumTier": "EF",
      "stage": "grundlagen",
      "level": 2,
      "xpReward": 100,
      "estimatedMinutes": 12,
      "prerequisites": [],
      "keyFormulaOrSentence": "...",
      "commonFallacy": "...",
      "tags": ["Tag1"]
    }
  ],
  "edges": [
    {
      "id": "e-1-2",
      "from": "from-node-id",
      "to": "to-node-id",
      "type": "prerequisite",
      "descriptionZH": "依赖逻辑说明"
    }
  ]
}
```
````

---

## 六、 自动化质量门禁与自审核清单 (Quality Gate Tooling)

### 1. 自动化 CLI 质量门禁检测器
本仓库已配备专门的质量门禁检测脚本 [`scripts/validate-graph-json.py`](file:///C:/Users/rongj/Desktop/学习/scripts/validate-graph-json.py)。
外部 AI 或开发者在生成 JSON 文件后，必须在终端执行：

```bash
# 检测单个图谱文件
python scripts/validate-graph-json.py 00_META/presets/sowi-graph.json

# 或批量检测某个文件夹下的全部 JSON 文件
python scripts/validate-graph-json.py path/to/json_folder/
```

#### 门禁检测项：
- `[PASS]` **JSON 语法规范**：符合标准 JSON，无控制字符与格式异常；
- `[PASS]` **模式完整性**：`schemaVersion === 1`，包含必须的 `categories` 与双语名称；
- `[PASS]` **ID 合法性**：全部节点 ID 均为规范的 kebab-case，无重复 ID；
- `[PASS]` **死锁循环检测**：基于 DFS 三色标记法，100% 确认无有向闭环死锁（Cycle Free）；
- `[PASS]` **前置引用存在性**：所有 `prerequisites` 引用的节点 ID 均在当前图谱中真实存在；
- `[PASS]` **提分硬货覆盖率**：审查 15 NP 得分核心句与易错误区覆盖度。

只有当检测器输出 **`[RESULT] 所有图谱数据均已 100% 通过死锁与质量门禁校验！`**（退出码为 0）时，方可正式合流进知识库！
