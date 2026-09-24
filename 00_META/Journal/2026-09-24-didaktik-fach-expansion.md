---
fach: ""
thema: "Domain Adaptive Didaktik System & Subject Expansion"
datum: 2026-09-24
tags: [EF, App, Meta]
---

# 2026-09-24 删减顶栏语言切换与全学科教学法接入（`[App]` / `[Meta]`）

## 1. 用户指令落实
- “删掉右上角的语言热切换功能”：顶栏右侧的 DE/中文 胶囊切换按钮彻底移除，释放顶部空间；语言设置收敛至系统设置（`Settings.tsx`）及全局快捷键（`L`）。
- “扩展接入学科。注意不同学科有不同学习方法，以及教育方法和呈现方法”：
  全面接入高中 Gymnasium EF 阶段全科体系（共 10 门学科），按四大知识认知域（GeWi / Sprachen / MINT / Mündlich）划分学科教学法（Fachdidaktik），构建领域自适应的无痛学习交互矩阵。

## 2. 核心架构与功能落地

### ① 学科认知域与教学法引擎 (`src/engine/fachDidaktik.ts`)
- **四大认知领域划分**：
  1. `gewi`（社会科学与哲学：SoWi, Philosophie）：标准导向价值裁决（Effizienz & Legitimität / 义务论 vs 功利论），配备 `Urteils-Waage` 辩证天平、`Satzbau-Lego` 句式积木。
  2. `sprachen`（现代语言：Deutsch, Englisch）：意义段落解构、P.E.E. 论据链（观点-证据-阐释）、阐释假说构建，配备 `Dekonstruierer` 荧光标注解构画板、`Satzbau-Lego`。
  3. `mint`（数学与自然科学：Mathe, Physik, Chemie, Bio）：现象模型化、严格四步解题法（已知-公式-代入-解释）、切线逼近，配备 `Tangenten-Sim` 导数沙盘、`MINT-Scaffold` 四步解题脚手架。
  4. `muendlich`（口试与体艺：Musik, Sport）：听觉微观动机分析、动作力学三阶段，配备 `OralExamTimer` 15分钟备考/5分钟独立陈述全真计时器与结构化陈述大纲。

### ② 新增教学法交互组件
- **`FormulaScaffold.tsx`**：MINT 四步规范求解器（Gegeben/Gesucht, Formel, Einsetzen & Einheiten, Antwortsatz），自带各科典型高考考点预设与单位换算提示。
- **`OralExamTimer.tsx`**：口试 15 分钟备考（1:30 引言 / 2:30 分析 / 1:00 评价）与 5 分钟独立陈述双模倒计时，支持典型口试试题一键载入与 Markdown 题解生成。

### ③ 全局学科上下文与模块联动
- **顶栏学术学科选择器 (`App.tsx`)**：代替语言切换胶囊，支持在“所有学科 (10)”与各个学科之间自由过滤。
- **单词卡片学科过滤 (`Flashcards.tsx`)**：根据所选学科动态过滤卡片队列，卡片上方提供带数量统计的学术标签栏，支持按科突击冲刺。
- **AI 助教自适应教具与徽章 (`Tutor.tsx`)**：根据当前学科动态展示对应的 Didaktik 专属工具按钮与教学法说明徽章，彻底避免通用生硬模板。
- **模考与自测联动 (`Quiz.tsx`, `KlausurSim.tsx`)**：联动选中学科，优先筛选该科考点与试题。

## 3. 思维导图跨学科跳转修复与选中高亮色调优化

1. **思维导图跨学科跳转修复**：
   - **根本原因**：此前在思维导图（`Mindmap`）中点击不同学科的笔记节点时，`jumpToLibrary` 仅将主题关键词推入 `query`，而未同步全局 `selectedFach`，导致 `Library` 依然在旧学科下过滤，因学科不匹配而过滤为空（“显示错了学科，未找到相关笔记”）。
   - **修复落地**：
     - `App.tsx` 的 `jumpToLibrary` 引入 `selectedNoteId` 与学科自动同步联动；
     - `Library.tsx` 引入关键词/主题所属学科自动嗅探同步效应：当接收到笔记关键词或 ID 时，自动将学科标签切换至该笔记所在学科（`target.fach`），并选定打开该笔记，彻底消除“未找到相关笔记”与学科错位问题；
     - `Home.tsx` 与 `Quiz.tsx` 的跳转亦同步对齐学科传参。
2. **选择高亮色调过深优化**：
   - 彻底移除 AI 助教顶栏思考强度（“极速 / 均衡 / 深度思考”）中过于刺眼沉重的纯黑背景（`bg-[var(--ink)] text-[var(--paper)]`），重塑为温润内敛的学术低对比底衬（`bg-[var(--paper-subtle)] text-[var(--ink)] border border-[var(--line)]`）；
   - 同步优化卡片库（`Flashcards.tsx`）的“全部”胶囊，消除深黑块，使整体界面视觉更加轻盈、干净、学术。

## 4. 质量与合规检验
- `npx vitest run`: 55 个测试套件，354 项自动化测试 100% 全部通过。
- `npm run build`: TypeScript 强类型校验与 Vite 生产构建 0 错误通过。
- `python scripts/vault-check.py`: 81 篇笔记、481 行单词卡片、200 条索引链接全部合规 PASS。
