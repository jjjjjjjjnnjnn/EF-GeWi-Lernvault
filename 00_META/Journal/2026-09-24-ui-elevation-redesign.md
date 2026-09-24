---
fach: ""
thema: "UI Aesthetic Redesign and Elevation"
datum: 2026-09-24
tags: [EF, App, Meta]
---

# 2026-09-24 UI 美学升格与微卡片重塑（`[App]` / `[Meta]`）

## 1. 触发背景与根本病灶治理

用户指出当前 UI “被改丑了，设计不好看之类的”，授权“重新设计，如有必要全面重塑”。经全链路排查，锁定了四大核心视觉病灶：
1. **全局字体污染**：此前 `body` 与全部 `button, input, select, textarea` 继承了衬线体 `Georgia/SimSun`，导致非正文阅读区域（侧边栏、按钮、状态标签、输入框）汉字粗糙毛刺、笔画发虚，失去现代软件的精密与高级感。
2. **教条式去卡片化导致“毛坯账本感”**：前期为遵循契约消除了所有阴影，粗暴采用 `border-y sm:divide-x` 线性线条，使仪表盘指标、背卡评分区、对话气泡退化为冰冷线框，界面支离破碎，缺乏学术纸面呼吸感。
3. **底色暗浊发黄**：`--paper` 偏灰暗黄色，缺少明澈度，且与 `--surface` 缺乏层级对比。
4. **助教顶栏拥挤杂乱**：多层工具按钮挤压折行。

## 2. 核心实施与设计落地

### ① 样式系统全局升格 (`App-EF-Lernvault/src/index.css`)
- **排版分层**：Body、按钮、输入框、元数据彻底回归高精现代无衬线体 `var(--font-zh)`，长文正文与核心大数字保留优雅衬线体（Georgia / SimSun），实现“界面如精工仪器，阅读如羊皮纸书”。
- **调色板温润化升格**：
  - `--paper`: `#F9F8F5`（明澈高阶暖象牙白，消除脏灰发黄感）；
  - `--paper-subtle`: `#F3EFE8`（温和低饱和度背景）；
  - `--surface`: `#FFFFFF`（纯净高光纸白，与底衬拉开清晰卡片层级反差）；
  - `--line`: `#E8E4DC`（柔和暖石细线，消除冷硬刺目纯灰）；
  - `--radius`: `5px`（微圆角，温润雅致）。
- **新增 `.tufte-card` 纸质微卡片体系**：纯白底衬、暖石细线、温润微圆角，提供零阴影下的高贵层次感。

### ② 首页仪表盘重塑 (`Home.tsx`)
- 废除简陋 `border-y sm:divide-x` 线条布局，重构为 4 块独立的纸白微卡片（`tufte-card`），大号关键指标采用优雅 Georgia 衬线与加宽微距，排版极具学术殿堂质感。
- “近期到期”与“学科掌握度”封装入精致容器，进度条与状态微调升格。

### ③ 侧边栏与骨架质感升级 (`App.tsx`)
- 侧边栏激活项升级为纯白微卡高亮底衬（`bg-[var(--surface)] text-[var(--accent)] border-l-2 border-[var(--accent)]`），与象牙白底色拉开温润对比。
- 顶栏收敛为统一高光纸质水平工作台。

### ④ AI 助教消息流卡片化 (`Tutor.tsx`)
- 消息气泡由裸线退化升级为独立的纯白纸感卡片（`rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)]`），配备尊荣身份顶栏与引擎标签。
- 跨学科思维桥胶囊（`vernetzungBridge`）升级为精致书卷批注微卡。
- 学科工具栏（句式积木、辩证天平、文本解构、导数沙盘）优化按钮微卡交互。

### ⑤ 核心学习模块升格 (`Flashcards.tsx`, `Quiz.tsx`, `KlausurSim.tsx`)
- **Flashcards**：底部评分条重塑为微圆角纸白卡片容器，卡片翻转正反面质感增强。
- **Quiz**：模考主题列表与二选一程序概念（Option A/B）由线条式升级为精致纸感分段微卡，保持完整快捷键与无障碍契约。
- **KlausurSim**：消除 React 样式属性冲突警告，面板与按钮全面对齐 `surface` 与 `radius`。

## 3. 质量与契约校验

- **全量自动化测试**：`npx vitest run` 运行 **55 个测试套件，352 项测试 100% PASS**（含 9 大模块契约测试、narrowLayout 窄屏测试、final-token-migration 零硬编码色值测试、SimulatedInteraction 全流程测试）。
- **生产构建打包**：`npm run build`（`tsc -b && vite build`）零错误零告警通过。
- **知识库校验**：`python scripts/vault-check.py` 输出 PASS（notes=81 csv_rows=481 index_links=199 reisen=4）。
