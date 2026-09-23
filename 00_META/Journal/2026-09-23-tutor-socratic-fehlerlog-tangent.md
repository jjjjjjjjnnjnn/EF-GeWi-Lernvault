---
fach: ""
thema: "Tutor Sokratisch, Fehlerlog-Patch & Mathe Tangenten-Sandkasten"
operatoren: []
klausurrelevant: false
datum: 2026-09-23
tags: [EF, Meta]
---

# Journal: 2026-09-23 Tutor Sokratisch, Fehlerlog-Patch & Mathe Tangenten-Sandkasten

## 做了什么
1. **启发引导 vs. 考纲直出双态分流 (`src/ai/socratic.ts`)**:
   - 贯彻支架式教学（Scaffolding）与苏格拉底产婆术（Mäeutik），新增 `TutorPedagogyMode`（`socratic` vs. `direct`）。
   - 启发引导模式下，禁止直接给出答案，自动注入引导性提示词（Leitfragen），引导学生自主推导考纲论证链与核心概念；
   - 考纲直出模式下，严格按照 NRW 官方 Erwartungshorizont (EHZ) 结构输出：AFB 层级、标准德语 Klausursatz 答题句及失分雷区警示。
   - `Tutor.tsx` 顶栏新增双态快速切换胶囊，状态持久化至 `localStorage`。

2. **错题沉淀闭环与合规补丁生成 (`src/components/FehlerlogModal.tsx`)**:
   - AI 助教消息气泡底部新增「📌 沉淀为错题」按钮，一键提炼问答核心、错因类型与标准纠偏句；
   - 严格遵循 `AGENTS.md` 铁律（App 只读 Vault，不直接写入文件），自动生成符合对应学科 `Fehlerlog.md` 标准的 Markdown 表格行文本补丁；
   - 弹窗支持自主编辑学科、主题、错因（Wissenslücke / Logik / Fachsprache / AFB），一键复制并在 Obsidian 中确认粘贴。

3. **原生图片/漫画粘贴与多模态分析输入**:
   - Tutor 输入框原生监听 `onPaste` 剪贴板图片提取与本地文件选择，支持时政漫画 (Karikatur)、物理/数学函数图表直接传入；
   - 输入框上方显示可移除的图片预览胶囊，发送后在用户气泡中直观展示缩略图。

4. **理科几何直观：割线逼近切线沙盘 (`src/components/pedagogy/TangentSlider.tsx`)**:
   - 针对北威州 EF 微积分入门（Differentialrechnung），构建动态 SVG 导数沙盘；
   - 学生滑动 $\Delta x$ 步长滑块（$2.0 \to 0.02$），实时观察割线与切线旋转重合过程，直观感知差商 $\frac{\Delta y}{\Delta x}$ 如何收敛到导数瞬时变化率 $f'(x_0)$，一键带入标准德语 Klausursatz 考纲答题句。
   - 成功挂载至 Tutor 顶部无痛学习交互抽屉，与句式积木、辩证天平、文本解构并列为四大教学利器。

5. **质量与构建验收**:
   - 43 套件 256 项单元与交互测试 100% 全绿；
   - `npm run build` (tsc -b && vite build) 6.45s 零错误通过。

## 待办 / 下一步
- [ ] 探索 CC-Switch 配置文件（`config.json`）一键导入/导出同步解析器。
- [ ] 针对已入库的德语 Sachtextanalyse 和英语 Mediation 真实笔记，设计并在 Reise 模块中落地交互微课程。
