# UI-BRIEF — EF-Lernvault 界面重做交接（给接手的 UI Agent 看）

> 你只做 UI 重做（样式+排版+动效），不改功能逻辑、不改数据结构、不加依赖。
> 做完必须 `npm run build` 通过（tsc + vite），并用 `npm run dev` 自验 6 个模块。

## 1. 项目速览
- 桌面学习软件 EF-Lernvault（Tauri 壳 + React 前端），一站式单窗口：左侧导航 + 顶部搜索 + 内容区。
- 技术：React 19 + TS + Tailwind CSS v4（`@import "tailwindcss"`，无 config 文件）+ Vite 7，dev 端口 **1420**。
- 双语：全站 DE（德语，考试语言）+ ZH（中文，理解语言）对照；语言切换状态在 `App.tsx` 的 `lang`。
- 用户：德国 Gymnasium 11 年级学生，备考 Klausur。当前原型"太丑"（卡片堆砌、紫色滥用）是你要修的问题。

## 2. 设计语言：tufte Data-Ink（简洁风，必读并遵守）
参考 `BWKI 介绍` 项目的 beautiful-article / tufte 主题，转译到桌面应用：

- **每一滴墨水都承载信息**：删掉所有装饰性卡片、填色块、投影、大圆角、渐变、emoji 装饰。
  结构分隔只用**发丝级细线**（`#E5E1D8` 级别）+ 留白，不用边框卡片。
- **圆角**：能直角就直角，最多 `rounded`（2~4px）；禁用大圆角 pill 按钮（语言切换等小开关除外）。
- **颜色只表达含义**，全站只用三色：
  - 纸面 `#FAFAF7` / 墨 `#1C1B17` / 次要文字 `#6B675C`
  - 唯一强调色深靛蓝 `#4338CA`，**只用于**：当前导航项、可点击、到期/紧急。禁止大面积平铺。
  - 成功/警告各一色（低饱和绿/暖红），只用于状态。
- **字体（系统字体，离线 exe 不打包网络字体）**：
  - 德语正文/标题：老式衬线 `Georgia, 'Songti SC', 'SimSun', serif`，字重 400，标题靠字号层级（h1≈1.8rem，h2≈1.3rem），克制。
  - 中文对照/标签/注释：人文 sans（系统默认），小一号、灰色，永远出现在德语之下。
  - **禁用斜体**（用字重/颜色/间距做强调）。
- **动效**：默认无。唯一允许的是背卡翻转（已有 3D 翻转，保留但放慢到 0.45s 以上、去掉弹跳感）；其余切换用即时或 ≤150ms 淡入。
- **图标**：全站禁用 emoji（含导航）。导航用 16×16 手写细线内联 SVG（`stroke=currentColor`，见 `App.tsx` 的 `icons`），正文区用文字或细线 SVG。

## 3. 六模块各自要求（功能不动，只重排）
1. **Bibliothek 笔记库**：左列表（学科筛 + 主题）/ 右阅读列（regular 宽度 ~46rem 居中）；中德对照块用"中文 sans 灰在上、德语 serif 在下"；operatoren 显示为小字标签；klausurrelevant 显示为细线徽章而非色块。
2. **Karteikarten 背卡**：中央一张"纸卡"（细线边框、无阴影），正面德语衬线大字，背面答案+例句；Again/Hard/Good/Easy 做成一排**文字按钮**（下划线/细线分隔），不是四色大按钮；顶部到期信息做成小字行。
3. **Quiz 刷题**：计时器用等宽大数字（tabular-nums），无装饰；darstellen→analysieren→beurteilen 三步做成编号清单（1./2./3. + 发丝线分隔）；Fehlerlog 草稿区做成"标本式"等宽小字块。
4. **KI-Tutor**：气泡改成"纸面对话流"（AI 消息无底色、左侧细线标识；用户消息浅灰底）；离线提示条改成一行小字，不用整条黄底。
5. **Lernplan 规划**：倒计时数字突出（衬线大数字 + "Tage/天"小字）；周任务清单每行：复选框 + 星期缩写 + 任务文字，完成项变灰删除线。
6. **Mindmap 导图**：节点改成"线框图"气质——白底、1px 墨线、无填充（根节点可用墨底白字唯一强调）；连线浅灰细线；去掉 SVG 外的卡片容器。

## 4. 文件地图（你能改的只有这些）
- `src/App.tsx` — 侧边导航 + 顶栏（搜索/语言切换）+ 模块装配。
- `src/modules/*.tsx` — 六模块（Library/Flashcards/Quiz/Tutor/Planner/Mindmap）。
- `src/index.css` — 全局 token（颜色/字体/翻卡动效）。
- **不许碰**：`src/data.ts`（mock 数据结构，P1 才换真实解析）、`src/i18n.ts`（文案字典；缺文案找你要）、`package.json` / `vite.config.ts` / `tsconfig.json`。
- **不许新增 npm 依赖**（Tauri 官方包例外，由主 Agent 加）；图标如需 SVG，手写内联。

## 5. 禁止项（出现即打回）
- 卡片堆叠、投影、大圆角、渐变背景、玻璃拟态、装饰 emoji、饱和科技蓝紫大面积使用。
- 为"好看"删功能、改文案原意、改组件 props 接口。
- 引入网络字体/CDN（离线 exe 必须零外部请求）。

## 6. 验收标准
1. `npm run build` 一次通过；`npm run dev`（1420）六模块逐一切换无报错、无控制台红字。
2. 缩放窗口到 1100px 宽不断裂；德语长词（z. B. Chancengerechtigkeit）不溢出。
3. 截图 6 张（每模块 1 张）随交付说明发回。
4. 附一句话说明：改了哪几个 token、删了哪些装饰、为什么符合 Data-Ink。
