---
fach: Meta
thema: "知识图谱文字超出方框与卡片大面积重叠物理碰撞技术根治"
operatoren: [analysieren, darstellen]
klausurrelevant: false
datum: 2026-10-09
tags: [EF, Meta, App, UI, Typography, SVG, ForceLayout]
---

# 2026-10-09 工作日志：知识图谱文字超出方框与卡片大面积重叠物理碰撞技术根治

## 1. 缺陷现象与技术根因深度分析

用户截图反映：画布中的考点文字（中德文标题、胶囊药丸文本）经常跑到卡片框外面；并且在节点被聚焦或选中时，大量卡片互相重叠遮挡，严重影响图谱的可视化美感与可读性。

经排查核心工程根因如下：
1. **SVG `<text>` 原生排版缺陷**：
   - SVG `<text>` 默认属于单行水平排版，并不具备 HTML 的 `box-sizing: border-box`、自动折行（word-wrap）以及容器超出隐藏（`overflow: hidden`）属性；
   - 一旦文本视觉渲染宽度超过卡片外边框，SVG 会无限制向右溢出绘制，直接刺破方框。
2. **字符长度（`.length`）度量失真**：
   - 原代码使用简单的字符计数 `string.length > 22` 判定是否截断；
   - 在拉丁字母（如德语、英语）中，字符宽度通常为字号的 0.5~0.6 倍，22 字符约 120px，可在 196px 卡片内从容容纳；
   - 但在 CJK（中日韩等全角汉字）中，每个汉字在字号 11px 下实际渲染占用 11.5~12px（1.05~1.1x）。一个 19 字的标题（如“系统发育树重建：同源性与原始/衍生性状”）字符计数虽为 19（未达 22），但实际视觉渲染宽度高达 215px，直接冲出 196px 卡片 20~30px！
3. **顶栏徽标固定偏移冲突**：
   - 卡片顶栏的状态徽章（如“← 前置 (远)”、“→ 进阶解锁”）采用固定宽度与固定横坐标偏移，挤压了右侧的预估时长文本（`~20m`），导致徽标背景与文字撞车。
4. **全链路 DAG 级联爆炸导致卡片连环碰撞**：
   - 此前的展开判定为 `const isFocalOrSelected = isFocal || isSelected || isHovered || isPrereq || isSuccessor;`，全量包含了所有传递闭包前置与后继（`allPrereqs` 与 `allSuccessors`）；
   - 在包含数十个节点的学科中，点击任一节点会导致多达 25 张大卡片同时展开为 196×58 的实体矩形，在星盘或力导向图中不可避免地相互挤压与重叠。

---

## 2. 核心技术解法与工程落地

### ① 建立高精度中英混排视觉宽度估算引擎 (`svgTypography.ts`)
- 新建模块 `App-EF-Lernvault/src/utils/svgTypography.ts`：
  - `estimateVisualTextWidth(text, fontSize)`：精确按照不同 Unicode 字符集加权度量（CJK 字符 = 1.08x、大写字母/宽符号 = 0.72x、小写字母/数字 = 0.58x、窄标点/空格 = 0.38x）；
  - `truncateTextToVisualWidth(text, maxPixelWidth, fontSize, ellipsis)`：严格按照像素边界累加字符宽度，在超出安全几何像素时精准补足 `…` 省略号截断，杜绝“字数合格但像素溢出”。
  - 编写配套单元测试 `svgTypography.test.ts`，验证全角汉字、德语长复合词与中德混合文本的精确截断。

### ② 引入 SVG `<clipPath>` 绝对几何安全围栏
- 在星盘学术卡片（Planetary Cartouche `cardW=208, cardH=62`）、轻量胶囊（Mini-Capsule）及认知科技树卡片（Tech Tree Box `210×80`）的 `<defs>` 中，均注入唯一的 `<clipPath id={`...-clip-${node.id}`}>`；
- 所有文本与角标完全包裹在 `<g clipPath={`url(#...-clip-${node.id})`}>` 内部；
- 形成双重防护盾：**字级精准像素截断 + 几何绝对物理裁剪**，无论系统字体如何变异，绝不允许哪怕 1 个像素越出方框边缘！

### ③ 动态智能胶囊排版计算
- 在常规态胶囊（Mini-Capsule）中：
  - 限制最大文本视觉宽度 `MAX_CAPSULE_TEXT_W = 145`；
  - 胶囊物理宽度 `pillW` 直接由 `actualTextVisualW + leftPadding + rightPadding` 动态驱动计算并受限；
  - 确保文本两端始终拥有 12~20px 的安全呼吸内边距，文字与边框和谐共存。

### ④ 精细化展开策略：1 阶紧邻展开 + 远端紧凑胶囊带方向指示
- 重构展开策略为 `isCardExpanded = isSelected || isHovered || (isFocal && !selectedNodeId) || isDirectPrereq || isDirectSuccessor`；
- 选中的焦点节点与直接 1 阶前置/后继展开为详尽学术卡片（清晰指引“从哪来到哪去”）；
- 远端依赖节点（d >= 2）保持紧凑的轻量单行胶囊，并带有精致的 `←`（上游）或 `→`（下游）因果指示符号；
- 鼠标滑过任意远端胶囊时，立即就地展开为大卡片，既杜绝了全图 20+ 张大卡片同时膨胀重叠，又保留了 100% 的因果链全貌与即时探索体验。

### ⑤ 顶栏徽章布局防撞重构
- 严格分离学段与 AFB 标号区（左侧 `cardX + 7` 至 `cardX + 68`）、因果状态徽标区（中间 `cardX + cardW - 90` 至 `cardX + cardW - 42`，宽度 48px）与时长区（右侧 `cardX + cardW - 32` 至 `cardX + cardW - 7`）；
- 区域间留足 10px+ 安全间距，杜绝徽标与文字撞车。

---

## 3. 质量门禁与验证

1. **单元测试与回归套件**：
   - `npm test -- --run src/utils/svgTypography.test.ts src/components/SkillTreeCanvas.test.tsx src/components/AllSubjectsMacroView.test.tsx`
   - 3 个测试套件，30 项测试全部 **100% PASS**（包含排版、单科画布、因果聚焦、所有学科总台等完整交互）。
2. **编译与构建验证**：
   - `npm run build`（`tsc -b && vite build`）：607 个模块打包，0 错误，0 警告阻断。
3. **知识库规范校验**：
   - `python scripts/vault-check.py`：`notes=416 csv_rows=1942(bad=0) index_links=364(missing=0) reisen=356 PASS`。
