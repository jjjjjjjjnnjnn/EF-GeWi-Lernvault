---
fach: Meta
thema: "富文本高亮排版、KaTeX公式手写体渲染与教学层次重构"
operatoren: [analysieren, implementieren, optimieren]
klausurrelevant: false
datum: 2026-09-26
tags: [EF, Meta, App]
---

# 富文本高亮排版、KaTeX公式手写体渲染与教学层次重构

> 日期：2026-09-26
> 状态：✅ 全部达成，三门禁全绿（vault-check PASS / Vitest 58 套件 387 测试全过 / npm run build 零错误通过）

---

## 1. 用户反馈与痛点定位

1. **数学公式排版生硬（单行 ASCII 文本）**：
   - 现存课程与笔记中部分公式以原始线性 ASCII 展现（如 `f(x) = 4x^3 - 5x^2 + 7x - 2`、`(x^n)' = n * x^(n-1)`）。
   - 用户明确要求全面使用标准的学术手写/排版印刷字体（KaTeX / LaTeX 排版，具备分数、幂次、上下标、斜体与极限符号）。
2. **重点强调符泄露与排版缺乏层次**：
   - 网页版与 App 界面中出现了原始 Markdown 符号（如 `**树图（Baumdiagramm）**按阶段展开，适合**多步**`）。
   - 用户要求：绝不展示原始 `**`，改为粗体、强调色背景微光微圆角高亮；各教学段落必须有清晰的结构重点（如中文理解、Klausur-Satz、口诀、决策点等）。
3. **Web 与 App 双端统一渲染**：
   - 确保无论在浏览器端（`localhost:1420`）还是 Tauri 原生桌面端，公式、图解与排版层级完全一致。

---

## 2. 解决方案与核心改造

### 1) 统一富文本排版器 (`Blocks.tsx`)
- 构建通用 `renderFormattedText(text: string): ReactNode`（并兼容导出 `renderMathText`）：
  - **KaTeX 双轨排版**：支持行内 `$ ... $` 与块级 `$$ ... $$` 公式解析，基于 `MathHtml` 异步首绘+缓存加速。
  - **公式嗅觉与代码块增强**：识别反引号代码中的数学公式（如 `(x^n)' = n \cdot x^{n-1}`），自动转入 KaTeX 印刷体排版；非数学代码保留 Tufte 等宽代码芯片。
  - **重点粗体强调（Zero-Asterisk）**：将 `**term**` 解析为 `<strong className="font-semibold text-[var(--ink)] bg-[var(--accent)]/10 px-1 py-0.5 rounded-[var(--radius)]">`，彻底消除原生星号，增加强调色浅底衬托。
  - **结构化教学标签徽章**：将段首的 `中文理解：`、`Klausur-Satz:`、`口诀：`、`决策点：`、`AUFGABE:`、`HILFE:`、`MUSTERLÖSUNG:`、`ANTWORT:` 解析为语义标签，增强教学视觉焦点。
  - **存证标签徽章化**：将 `[已验证]`、`[据推断]`、`[原创]` 解析为极简等宽微徽章，提升学术严谨性。
  - **严格遵守 Tufte 规范**：无禁止的 `em`、`i` 斜体元素或 `.italic` 类，零 emoji，图标与文字保持纯净学术风。

### 2) 客户端各模块全覆盖 (`Reise.tsx` & `Library.tsx`)
- 在 `Reise.tsx` 的实操（Ausprobieren）、自测过关（Check）、情境实战（Szenario）、口试准则（Mündlich）所有题干、提示、答案、情境描述中全量接入 `renderFormattedText`。
- 清理 `Library.tsx` 中已废弃的残留 `viewMode` 引用。

### 3) 动态与静态解析管道全线放行粗体 (`parser.ts` & `export-vault-data.py`)
- 修改 `parser.ts` 中的 `inline()`，不再盲目剥除 `**`，使 Obsidian 正文与笔记块能够将重点标记原样传递给渲染器。
- 修改 `scripts/export-vault-data.py` 中的 `clean_inline()`，保留 `**` 标记并重新导出 `generatedVaultNotes.ts` 与 `generatedNotes.ts`。

### 4) 核心示范课程公式规范升级 (`Mathe-Ableitungsregeln-Polynome-L1.md`)
- 将 Schritt 1 至 8 内所有涉及的多项式求导公式全面升级为标准 LaTeX 语法（包含 `$$f(x) = 4x^3 - 5x^2 + 7x - 2 \implies f'(x) = 12x^2 - 10x + 7$$`、差商极限 $\frac{(x_0 + h)^2 - x_0^2}{h} = 2x_0 + h \xrightarrow{h \to 0} 2x_0$ 等）。

---

## 3. 验收结果

1. **Vault 完整性门禁**：
   `python scripts/vault-check.py` $\to$ `notes=388 csv_rows=1595(bad=0) index_links=307(missing=0) reisen=88 vergleich=0 badnames=0 badglossar=0 PASS`
2. **单元测试与契约套件**：
   `npx vitest run` $\to$ **58 passed (58 文件全部通过，387 项用例 100% 成功)**，新增 `Blocks.test.tsx` 针对重点高亮、KaTeX 渲染、徽章转换与无斜体契约进行严格校验。
3. **打包与类型安全**：
   `npm run build` $\to$ **4.57s 零错误编译通过**，TypeScript 0 告警，KaTeX 字体与 vendor chunk 完整构建进离线 dist 资产目录。
