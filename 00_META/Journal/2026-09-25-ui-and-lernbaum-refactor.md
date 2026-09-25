---
fach: Meta
thema: "UI工作区重构与学习树自适应大纲系统升级"
operatoren: [analysieren, implementieren, optimieren]
klausurrelevant: false
datum: 2026-09-25
tags: [EF, Meta]
---

# UI工作区重构与学习树自适应大纲系统升级

> 日期：2026-09-25
> 状态：✅ 全部收官，三道门禁 100% 绿（vault-check PASS(359/1400/273) / Vitest 57 套件 379 测试全过 / npm run build 零错误 / 本地开发服务器持续运行于 1420 端口）

---

## 1. 背景与目标

针对用户提出的「UI、结构、笔记太乱、太复杂，学科树太大导致显示不全」的痛点，本轮完成了系统级的简洁、顺滑 UI 重构与学科学习树自适应设计：
1. **解决学习树（Lernbaum）超宽与裁切问题**：
   - 彻底解决当选中全部学科或复杂层级时宽度达数万像素导致的视觉溢出与无法尽览问题。
   - 垂直紧凑化调整（层级步长由 150px 优化至 124px，画布高度增至 520px），保证 4 级考纲全部垂直可视。
   - 增加「Ansicht einpassen / 全图自适应」算法与重置逻辑，自动根据视口长宽比计算最佳缩放比例与中心对齐偏移。
   - 引入双模态切换：「Karte (画布关系图)」与「Gliederung (层级结构大纲)」。在大纲视图下提供 100% 自适应宽度的折叠式目录树，算子标签、考试重点与关联笔记一目了然，零横向滚动压力。
2. **工作区架构重塑（Workspace Refactor）**：
   - 将侧边栏 12 个平铺杂乱选项收敛重构为 5 个核心主工作区（Übersicht, Wissen, Karteikarten, Training, KI-Tutor + 底部 Einstellungen）。
   - 在多工具工作区（Wissen, Training, Tutor）顶部提供现代微胶囊分段导航条（Segment Pills），清晰标注 Alt 快捷键提示。
   - 保留全部全局与模块级快捷键绑定（Alt 1..0, Alt B, Alt W），平滑兼容命令面板（Palette）与键盘流操作。
3. **笔记库（Library）版面与排版呼吸感提升**：
   - 笔记列表增加算子（Operatoren）标签预览；
   - 阅读区增加标签（Tags）与日期徽章，强化 Tufte 纯净学术风版面。

---

## 2. 完成工作

### 1. Lernbaum.tsx 重构
- 增设 `ansicht` 状态（`"karte" | "liste"`），并于工具栏配备切换胶囊按钮；
- 增设 `einpassen` 回调与操作按钮，根据当前视口与节点边界自动计算最佳 scale 与 translate；
- 实现 `renderGliederungsKnoten` 纯净递归大纲渲染器，无 Emoji、无阴影、严格符合 Tufte 设计宪法与 11 项代码契约测试；
- 缩减垂直步长（150px -> 124px），画布自适应 520px，保证 Level 0-3 纵向一次性尽收眼底。

### 2. App.tsx 工作区重构
- 梳理工作区映射模型 `PrimaryWorkspace` 与 `getWorkspaceForTab`；
- 侧边栏精简为 5 大主工作区按键，记忆各工作区上一次激活的子功能；
- 顶层注入工作区微胶囊分段条（Segment Bar），直观展示各子模块名称与快捷键；
- 严格遵循 `narrowLayout.contract.test.tsx` 响应式断点与类名层级约束。

### 3. Library.tsx 排版优化
- 列表项卡片增加算子胶囊直观预览；
- 阅读区 Header 增加 `#tags` 与日期元数据展示，提高检索与扫读效率。

---

## 3. 门禁验证结果

- `python scripts/vault-check.py`：`notes=359 csv_rows=1400(bad=0) index_links=273(missing=0) reisen=4 vergleich=0 badnames=0 badglossar=0` $\to$ **PASS**
- `npx vitest run`：`57 passed (57) | 379 passed (379)` $\to$ **PASS**
- `npm run build`：`✓ built in 18.96s` $\to$ **PASS**
- 本地开发服务器保持活跃：`http://localhost:1420/`
