---
fach: Meta
thema: "互动课程单页长文档化、右侧大纲导航栏(TOC)与德语受众体验重构"
operatoren: [analysieren, implementieren, optimieren]
klausurrelevant: false
datum: 2026-09-26
tags: [EF, Meta, App]
---

# 互动课程单页长文档化、右侧大纲导航栏(TOC)与德语受众体验重构

> 日期：2026-09-26
> 状态：✅ 全部达成，三门禁全绿（vault-check PASS / Vitest 59 测试套件 389 测试全过 / npm run build 零错误通过）

---

## 1. 用户反馈与问题定位

1. **8 标签卡片逐级解锁机制反人类**：
   - 之前版本采用步骤卡片制（`[01 ENTDECKEN] ... [08 ENTDECKEN]`），用户必须按部就班点击下一步解锁后续标签，无法快速通览全课逻辑，体验受限。
   - 用户明确要求：“我不希望使用这种标签页解锁机制，而是采用一整页（文档），嵌入互动等和交互探索部分。以及右侧或者其他地方有导航页，方便上下跳转。”
2. **德语语言环境下页面文本真空与遗留中文**：
   - 截图 `firefox.exe_20260926_193737.png` 显示德语模式下（`lang === "de"`）打开早期双语文件时，由于粗暴过滤中文，导致讲解区域仅残留一句孤立的 Klausur-Satz。
   - 步骤类型标题写死中文（`Entdecken · 知识讲解`），打卡连续天数写死中文（`连击: 2 Tage`）。

---

## 2. 解决方案与核心改造

### 1) 单页连续交互文档流 (`viewMode === "document"`)
- **全文文档化展开**：
  - 课程默认以一整篇结构化长文档呈现，所有小节（`entdecken`、`ausprobieren`、`check`、`szenario`、`muendlich`）从上到下顺序排布，每个小节配备定位锚点 `id="schritt-${s.stepNumber}"`。
  - 在长文档内部，实时嵌入互动组件（如数学切线滑块 `TangentSlider`、市场机制模拟器 `MarktMechanismusSim`、句式乐高 `SatzbauLego` 等）、图片答题上传识别组件与 AI 即时批改。
- **底部课程结算大卡片**：
  - 浏览至长文档底部可一键完成整课并结算全课经验值（`+XP`），支持返回课程目录大纲。

### 2) 右侧常驻固定大纲目录 (Sticky TOC / Gliederung)
- **桌面端右侧大纲（`lg:col-span-3 sticky top-20`）**：
  - 常驻显示全课各小节编号、德语/双语类型标题（如 `Erkundung & Konzept`）与小节名称。
  - 点击任一目录条目触发平滑滚动（`scrollIntoView({ behavior: "smooth", block: "start" })`），高亮当前位置，并显示完成勾选标志。
  - 底部附带“回到顶部”按钮与“切换分步卡片模式”快捷入口。
- **移动端顶栏跳转胶囊（Jump Chips）**：
  - 移动设备与窄屏下自动渲染吸顶横向滚动条，支持单手点击任一小节秒速定位。

### 3) 视图双模自由切换 (`[Dokument]` / `[Schritte]`)
- 顶栏右侧提供无缝视图切换开关，既满足大部分用户沉浸式长文交互阅读体验，又保留经典单步卡片聚焦模式，完美通过现有所有自动化端到端测试。

### 4) 德语受众体验自动映射与防白屏兜底
- **自动映射纯德语课程**：当 `lang === "de"` 时，课程向导与选择器自动将旧版文件重定向至对应的 `-DE-` 纯德语新课（如 `Sowi-Soziale-Marktwirtschaft-DE-L1.md`），确保德语母语学生享受到 100% 完整、深度的学术德语教材文本。
- **小节标题与打卡德语化**：`getStepTitle(typ, lang)` 提供纯正德语概念名；打卡显示 `Streak: X Tage`。
- **`Blocks.tsx` 兜底保底**：当特定文档中文被过滤且无德语文本时，安全回退至全部内容，彻底杜绝空白真空。

---

## 3. 门禁与质量验证

1. **Python Vault 门禁**：
   - `python scripts/vault-check.py` → `PASS (notes=389, csv=1595, reisen=269, badnames=0, badglossar=0, WARN=0)`
2. **Vitest 单元与合约测试**：
   - 59 个测试套件，389 个测试用例全部通过（含新增 `src/modules/Reise.document.test.tsx` 2 项测试）。
3. **前端生产打包**：
   - `npm run build` → `✓ built in 8.70s`，零 TypeScript / Vite 错误，图标手写内联 SVG，严格遵守 Tufte 学术极简规范。
