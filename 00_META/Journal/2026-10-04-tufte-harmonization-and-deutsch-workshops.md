---
fach: Meta
thema: "Tufte经典学术极简风格收敛与德语文科空白工坊全量重构"
operatoren: [analysieren, beurteilen, gestalten]
klausurrelevant: false
datum: 2026-10-04
tags: [EF, Meta, App, Labor, Deutsch, Bio, Philosophie]
---

# Tufte经典学术极简风格收敛与德语文科空白工坊全量重构

## 1. 核心问题回顾与审核定位

针对用户提出的截图与反馈问题，进行了精准根因排查与定位：
1. **视觉风格与规范脱节（湖泊与哲学实验高饱和/暗色割裂）**：
   - 湖泊生态沙盘 (`SeeOekologieSim.tsx`) 此前使用了深色夜景与高饱和度蓝/绿，与整套 App 的 **Tufte Editorial 学术极简风格**（`--paper` 纸张质感、`--line` 细线网格、高数据墨水比）脱节；
   - 自由意志/利贝特实验 (`LibetExperimentSim.tsx`) 采用了极深黑底与霓虹发光刻度，未能体现学术生理学/脑电图示波器的专业素描感。
2. **公式与文本溢出/未解析 Bug**：
   - 某些工坊中直接在 SVG `<text>` 节点中输出 raw LaTeX 字符串（如截图中展示的 `t_{\text{BP}} (-550\text{`），导致渲染出未编译代码并且字符被遮挡截断；
   - 通用实验台中存在硬编码的“核心变量 A / 关联变量 B”滑块，缺少学科领域物理含义。
3. **德语文科板块大量存在空内容/白屏**：
   - 排查发现 `GewiInteractiveWorkbench.tsx` 虽然在 `useMemo` 中映射了模式（`brecht`, `kafka` 等），但在 JSX 渲染分支中缺失对应的 `mode === "brecht"` 与 `mode === "kafka"` 渲染区块，导致学生切换到对应德语主题时界面呈现完全空白。

## 2. 计划与执行：重构与加固

### (1) Tufte Editorial 学术风全面收敛与重绘
- **`SeeOekologieSim.tsx` 重塑**：
  - 彻底移除 `bg-sky-950`、纯黑夜景与过饱和色块；
  - 采用经典教科书风格的垂向横截面矢量绘图（表水层、温跃层、深水层与底泥层），右侧配置双曲线科研水深测温图表（$T(z)$ 与 $O_2(z)$ 随深度 $0\dots25\text{m}$ 科学曲线）；
  - 保留四季全对流与富营养化恶化演进，以淡雅学术配色清晰表达。
- **`LibetExperimentSim.tsx` 重构**：
  - 告别游戏化暗黑夜景，重塑为经典医学生理学示波器白底盘面（Tufte 单色极简，0.75px 细微刻度环与毫秒指针）；
  - 绘制真实的 EEG 脑电波准备电位（Bereitschaftspotenzial）时序图谱，清晰标注 $-550\text{ms}$（潜意识电位累积）、$-200\text{ms}$（显意识冲动产生 W点）以及 $-100\dots0\text{ms}$ 的自由否决权窗口（Free Won't / Veto）。

### (2) KaTeX 科学排版与通用工作台修复
- **`UniversalInteractiveWorkbench.tsx` 改造**：
  - 引入全局 `<MathHtml code={sim.formula} ... />`，彻底废除 SVG `<text>` 输出生硬 LaTeX 字符串的历史遗留问题；
  - 将兜底变量滑块升级为基于 `sim.themenZH` 与 `sim.themenDE` 的自适应参数名称，保证每个通用工坊均拥有贴合学科背景的控制维度。

### (3) 德语文科四大全新独立解剖工坊落地
在 `GewiInteractiveWorkbench.tsx` 中完整补齐并深化德语文科工坊：
- **布莱希特叙事剧工作坊 (`mode === "brecht"`)**：
  - 支持“亚里士多德式沉浸共情”与“史诗叙事剧间离反思”双态对比；
  - 交互式 4 大间离手柄（打破第四面墙、插入歌曲与投影说明、历史化处理、社会姿态 Gestus），实时展示观众批判性思维指数（Kritische Distanz）；
- **卡夫卡《变形记》异化空间与权力解剖台 (`mode === "kafka"`)**：
  - 精确还原萨姆沙公寓三道门空间拓扑（父亲房、客厅/代理人、妹妹房）；
  - 动态“推销员经济剩余价值 vs 甲虫异化度”联动滑块，背部溃烂苹果物理隐喻与马克思“物化”（Verdinglichung）及父权惩戒理论剖析；
- **博尔歇特废墟文学零度语言解剖台 (`mode === "borchert"`)**：
  - 涵盖《门外》(Draußen vor der Tür) 与《面包》(Das Brot) 经典选段；
  - 交互式断奏过滤手柄（全句 / 断奏短句 / 首语重复），配合实时语体统计仪表盘（平均句长 5.4 词、极度短促 parataxe）；
- **图尔敏论证六要素解剖工坊 (`mode === "toulmin"`)**：
  - 完整解构依据 (Datum) $\to$ 保证 (Warrant) $\to$ 支撑 (Backing) $\to$ 限制限定 (Qualifier) $\to$ 反驳反例 (Rebuttal) $\to$ 最终主张 (Claim)；
  - 动态逻辑链自检：当缺失反驳限定或论证支撑时，实时警示论证破绽与考卷丢分点。

## 3. 自动化测试与合规验收

1. `npx tsc -b`：全部类型校验 0 错误通过；
2. `python scripts/vault-check.py`：
   - 401 篇笔记、1921 词库词条、356 门互动课程全部校验通过；
   - `badnames=0`, `missing=0`, `badglossar=0`，完全符合知识库规范。
