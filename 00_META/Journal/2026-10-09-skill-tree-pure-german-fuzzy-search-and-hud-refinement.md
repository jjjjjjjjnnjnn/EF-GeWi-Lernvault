---
fach: Meta
thema: "知识图谱德语纯净模式、全语言模糊检索引擎与极简HUD工作台交接"
operatoren: [darstellen, analysieren]
klausurrelevant: false
datum: 2026-10-09
tags: [EF, Meta, App, UI, i18n, FuzzySearch, UX]
---

# 2026-10-09 工作日志：知识图谱德语纯净模式、全语言模糊检索引擎与极简HUD工作台交接

## 1. 任务背景与核心诉求

根据用户的实测反馈与最新指示，对知识图谱与学业工作台进行全链路重构升级与体验收敛：
1. **纯德语模式零中文泄漏**：德语版本下依然残留中文副标题及字符，要求实现纯德语无缝体验；
2. **语言控制权全局统一**：消除画布上多余的独立分段语言切换器，将中德语切换统一步调收敛至顶栏右上角（`AppHeader`）及系统设置；
3. **消除重复学科选择器**：删掉画布中部的重复学科设置栏，保留顶栏全局学科选择与全科宏观星图总台；
4. **星区分类下拉化（和标签功能一致）**：原横向平铺的十多个星区按钮群挤占空间，改为点击展开式下拉选择器；
5. **全语言多要素模糊检索**：所有搜索升级为模糊检索（Fuzzy Search），支持中/德/代码/公式/标签/易错点任意收录语言与字符的错别字、子序列、德语变音符号容错。

---

## 2. 核心架构重构与工程落地

### ① 节点多语言引擎优化与零中文泄漏 (`nodeLocalization.ts`)
- 当全局语言为德语（`mode === "de"`）时：
  - 副标题强制清空（`secondaryTitle: ""`，`isBilingual: false`）；
  - 研习抽屉、因果推进清单步骤流严格展示纯正德语考纲规范术语，彻底隐藏 `ZH ·` 标签与中文行；
  - 行星星盘太阳核心自适应呈现德语学科全称（如 `Sozialwissenschaften`），进度胶囊呈现 `${mastered}/${total} gemeistert`；
  - 卡片在纯德语单标题下自动计算并应用单行垂直居中排版。

### ② 全局语言控制权统一收敛
- 移除画布内部散落的独立 `[ DE | DE·ZH | ZH ]` 按钮组；
- 图谱语言状态完全解绑内部 localStorage 独立缓存，直接绑定全局 `lang` 属性，与全局顶栏 `AppHeader` 保持 100% 步调一致。

### ③ 单行集成 HUD 工作台与星区下拉化 (`SkillTreeCanvas.tsx`)
- 彻底剔除中部冗余的学科翻页条；
- 废弃横向平铺星区按钮群，在 HUD 左侧重构为与标签统一规范的点击展开式原生下拉框：
  - `[ 星区: (全部分类 ▼) ]` (`filter-category-select`)
  - `[ 标签: (全部标签 ▼) ]` (`filter-tag-select`)
  - 高度统一为 `h-7`，高对比度纸墨微边框，悬停 ink 变色与无障碍焦点导航；
- 右侧精简集成：全语言模糊搜索框（带清空按钮）+ 复位移动按钮 + 视图模式切换（行星星系 / 阶梯树）+ 宏观进度胶囊 + 实用动作组（`+ 拼插知识点`、`一键排布`、`JSON` 导入导出、`缩放`）。

### ④ 独立模糊检索引擎研发与多场景接入 (`fuzzySearch.ts`)
- 新建高性能、纯算法模块 `App-EF-Lernvault/src/utils/fuzzySearch.ts`：
  - **文本标准化**：德语变音符号与双写字母映射（`ä` $\leftrightarrow$ `ae`/`a`、`ö` $\leftrightarrow$ `oe`/`o`、`ü` $\leftrightarrow$ `ue`/`u`、`ß` $\leftrightarrow$ `ss`）及标点忽略；
  - **多词 AND 联合检索**：空格分隔的多词支持在不同字段任意顺序命中（例如输入 `preis 市场` 同时匹配德中词汇）；
  - **子序列与编辑距离容错**：输入 `prmech` 可精准定位 `Preismechanismus`，`bedurfnis` 容错匹配 `beduerfnis`；
  - **多要素候选字段池**：同时索引中德标题、副标题、摘要、考点金句、易错点、代码/ID、分类与标签。
- 全量接入：
  1. `SkillTreeCanvas.tsx`：单科图谱实时高亮与节点过滤；
  2. `AllSubjectsMacroView.tsx`：全科 700+ 考点闪电穿梭检索与相关度打分排序；
  3. `SubjectWorkspace.tsx`：考点笔记目录多要素模糊检索。

---

## 3. 门禁验证结果

1. **单元测试与回归测试全绿通过**：
   - `SkillTreeCanvas.test.tsx`：20/20 全部 PASS；
   - `AllSubjectsMacroView.test.tsx`：6/6 全部 PASS；
   - `fuzzySearch.test.ts`：5/5 全部 PASS；
   - `svgTypography.test.ts`：5/5 全部 PASS；
   - **4 个测试套件共 36 项测试 100% 通过**。
2. **TypeScript 编译校验**：
   - `npx tsc -b` 零报错（Code 0）。
3. **知识库规范校验**：
   - `python scripts/vault-check.py` 运行结果：`PASS`（416 篇知识笔记、1942 行 Anki 词卡、364 条索引链接全部合规无损坏）。

---

## 4. 下一步待办与交接说明 (Upcoming UI Design & Expansion)

1. **全科宏观星图与跨学科战役 UI 进一步打磨**：
   - 跨学科融通战役流水线剧本的进一步富文本沉浸化；
   - 探究式微课（Lernreise）与知识图谱节点双向锚定体验深化；
2. **更多交互工坊（Labor）的模块化扩展**：
   - 依据四步闭环铁律（独立制作 ➔ 独立测试 ➔ 接入集成 ➔ 集成验证）继续按需拓展文理科仿真教具。
