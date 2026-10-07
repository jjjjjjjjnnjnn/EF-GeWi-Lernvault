---
fach: ""
thema: "Journal 2026-10-07 Cockpit Surface Architecture Refactoring"
operatoren: []
klausurrelevant: false
datum: 2026-10-07
tags: [EF, Meta, Journal]
---

# 2026-10-07 — 会战总台系统级重构（现代 SaaS 8:4 双白卡表面架构落地）

## 1. 触发背景与目标
针对备考战力总台出现的“纯黑卡片视觉拉扯”、“横向通栏大面积空白”、“键盘打印字符硬拼”以及“缺乏三层表面（Surface）纵深”的问题，拒绝局部打补丁，实施系统级重构。

## 2. 核心架构重构落地
1. **三层表面（Surfaces）体系确立**：
   - **Surface 0（画布底色）**：全页面统一为 `bg-[#F8FAFC]`（柔和极浅灰冷调）；
   - **Surface 1（卡片层）**：统一使用 `.card-elevation`（纯白底、微发丝边框 `border border-slate-200/85`、微弥散环境阴影），彻底消除纯黑“黑膏药”卡片，实现 8:4 双白卡黄金分栏视觉平衡；
   - **Surface 2（嵌入式凹槽）**：列表内嵌与刻度槽位统一下沉为浅灰 `bg-slate-50` 或 `bg-slate-100`。
2. **Hero 战力看板构图重组**：
   - **左侧 8 Col（战力状态）**：大号加粗数值 `11` 与 `Notenpunkte` 标签；消除横向空洞；采用 4 阶段平滑圆角轨道（10 NP / 11 NP 当前 / 13 NP / 15 NP），彻底移除渲染错位的孤立悬空点；
   - **右侧 4 Col（今日行动）**：白底卡片配合微暖环境光，配备现代深色胶囊按钮 `bg-slate-900` 与精细箭头图标；
   - **下方贯穿式时间线 Stepper**：彻底摒弃三个笨重的大方框，改用横向水平连线与微圆点步进器（已达成对勾、当前深色实心点、目标灰环）。
3. **失分点诊断与弱项列表**：
   - 彻底清除 `[OK]`、`[*]`、`[]`、`->` 等键盘打印字符，改用语义化 Badge 与内联 SVG；
   - 采用标准 Divided List（`divide-y divide-slate-100`），薄弱项采用淡红底色（`bg-rose-50/80`）突出显示，右侧配备标准圆角进度条；
4. **侧边栏快捷键降噪**：
   - 侧边栏所有 `Alt 1` ~ `Alt 9` 全面封装为标准的微型 `<kbd>` 徽标（`text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200/60 opacity-60`），消除视觉噪音。

## 3. 路线图合并与文字对比度全面提升（手术级收拢）
1. **合并路线图，消除独立大通栏穿帮与空洞**：
   - 彻底删除中间原独立的“三阶晋升”大卡片（消除了右侧连线溢出与莫名白色药丸的渲染 Bug，瞬间省出约 150px 黄金高度）；
   - 将“第一阶 ── 第二阶(当前) ── 第三阶”轻量化嵌入到左上角【11 Notenpunkte 战力大卡片】最底部（作为 Footer，细线 `border-t border-slate-100` 隔开）；
   - 每个阶段提供微型指示点（对勾/实心深色/空心浅色）、阶段名与对应分值要求，且点击切换时动态展示特权详情（满足全部单测交互契约）。
2. **文字对比度与清晰度全面拉满（告别灰蒙蒙与 80% 缩放模糊）**：
   - 核心任务标题、考点标题、大指标大数全面统一使用 `text-slate-900 font-bold` / `font-black`；
   - 正文与说明文字提升为 `text-slate-700` 或 `text-slate-800 font-semibold`，杜绝使用浅灰当标题；
   - 按钮文字统一使用高对比白字 `text-white font-semibold`。
3. **下半部分布局对齐与雷达图结构优化**：
   - 左侧【靶向弱项消除处方】与右侧【核心失分几何雷达图】顶部绝对齐平，高度自适应；
   - 雷达图 Tab 按钮升级为高质感 Segmented Control；
   - 失分点列表中薄弱项（D2、D4、有效数字等）配备清晰的内联 SVG 警告图标与醒目的红底药丸（`薄弱项`），失分情况一目了然。

## 4. “去草稿化”高级视觉精修与 4 大学术主题全量打通
1. **处方任务列表去框化（告别套娃硬线框）**：
   - 彻底移除任务列表每一行外层套着的灰线边框和卡片样式；
   - 改为纯净优雅的紧凑列表格式（`divide-y divide-slate-100` 行分割，配合 `py-3 px-2 rounded-xl hover:bg-slate-50/80` 悬停过渡）；
   - 任务标题字号与字重强化（`text-sm font-semibold text-slate-900`），辅助信息字深提升（`text-xs text-slate-500 font-mono`），扫读体验扎实清晰。
2. **升阶路线 Stepper 轻量化（去除白色小方盒套娃）**：
   - 彻底移除包裹在“第一阶 / 第二阶 / 第三阶”外面的三个白色矩形小方盒；
   - 改为纯净横向时间轴：微型圆点状态指示 + 文本标签 + 细连接线（`h-px bg-slate-200 flex-1`）；第二阶（当前）粗体加深高亮，保持 100% 满足单元测试交互。
3. **右上角行动卡空间重整（饱满沉稳对称）**：
   - 垂直结构优化为 `justify-between`；
   - 中间区域注入结构化收益摘要微卡（`3 项靶向攻坚包 · 15 Min`），消除大片断层真空，主按钮配备微环境光。
4. **统一背景颜色控制，4 大学术主题风格全量打通**：
   - 将 `index.css` 的 `.card-elevation` 与 Design Tokens 彻底打通（`background-color: var(--surface); border: 1px solid var(--line); color: var(--ink);`），平滑过渡；
   - 顶栏主题切换器全面接入 4 大学术主题风格循环：
     1. **极简学术**（高精黑白灰，冷静理性专注提分，`academic`）
     2. **暗黑精锐**（深炭灰磨砂底，电竞作战室高能沉浸，`cyber`）
     3. **温润纸书**（温暖象牙书卷质感，久读不刺眼，`classic`）
     4. **牛津沉静**（理性深邃蓝灰，学府专注氛围，`oxford`）
   - 状态持久化到 `localStorage` 与 `document.documentElement[data-theme]`，彻底消除“颜色不受控制”的问题。

## 5. 质量门禁与验证
- `npx vitest run src/modules/DashboardCockpit.test.tsx src/modules.test.tsx`: 27 个测试全部通过（含 UI source contract：零 Emoji、无非法阴影/斜体门禁）；
- `npx tsc -b`: 0 编译错误；
- `python scripts/vault-check.py`: PASS。


