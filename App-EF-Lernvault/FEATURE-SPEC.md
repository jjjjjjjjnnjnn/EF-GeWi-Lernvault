# FEATURE-SPEC — EF-Lernvault 功能需求文档（给外部 AI 看）

> 你只做**功能实现**，不改设计语言（tufte token 见 `UI-BRIEF.md`）、不改交互契约（`INTERACTION-BRIEF.md` + `src/keys.ts`）。
> 做完每个 P 必须 `npm run build` 一次通过，并在 `npm run dev`（http://localhost:1420）自验。
> 语言：给用户的文案一律中德双语（DE 考试语言在上/大，ZH 理解语言在下/小灰）。

## 0. 项目速览

- Tauri 2.x 壳 + React 19 + TS + Tailwind v4 + Vite 7，dev 端口 **1420**。
- 用户：德国 Gymnasium 11 年级（EF, NRW），备考 Klausur。8 笔试科当前只填实 SoWi/Philosophie。
- 数据：vault（Obsidian 笔记库）是唯一真相源，App **只读不写回**；已接线（顶栏"打开知识库"→ File System Access API 读 md/csv，见 `src/vault/loader.ts` + `parser.ts`，无 vault 时回落 `src/data.ts` mock）。
- 六模块：Bibliothek（笔记库）/ Karteikarten（背卡）/ Quiz（刷题）/ KI-Tutor / Lernplan / Mindmap。
- 后端计划：本地 LM Studio（`http://localhost:1234/v1`，模型 llama-3-sauerkrautlm-8b-instruct），**原生 fetch 直连，无 SDK 依赖**。

## 1. 铁约束（违反即打回）

1. **不新增 npm 依赖**（`ts-fsrs` 是唯一的例外，已批准；Tauri 官方包由主 Agent 加）。
2. **零外部网络请求**（离线 exe；唯一例外：localhost 的 LM Studio）。
3. **版权防火墙**：不含 DeepTutor/Anki/AGPL 代码；不打包 OER PDF/教材/Klausur 原题；引用 vault 原文出题可以（用户自己的笔记），引用出版社电子书正文不行。
4. 新全局快捷键先登记 `src/keys.ts`（`?` 帮助页直接渲染它，无登记=不许上线）；输入框聚焦时全局单键不许劫持（`isTyping()` 守卫不可删）。
5. App 不写 vault：Fehlerlog/进度导出只生成**文本补丁预览**，用户回 Obsidian 手动确认。
6. 图标手写内联 SVG，禁 emoji；动效只走 `index.css` token（`--ease-out`，100/150/250ms）。

## 2. P2 — 背卡真实记忆调度（无外部依赖，先做）

**目标**：背卡按艾宾浩斯/FSRS 排到期队列，刷新不丢进度。

- 新增 `src/scheduler.ts`（纯函数，可被 node 直接单测）：
  - 封装 `ts-fsrs`：`grade(card, rating 1-4)` → 新 due；`dueQueue(cards, states)` → 按到期排序；缺 state 的卡视为新卡（绝不崩）。
  - 卡 id = `csv相对路径#行号`（如 `08_SoWi/Vokabeln-Anki/SoWi-EF-Basis.csv#3`），删行/改文件不崩。
- 改 `src/modules/Flashcards.tsx`：`rate()` 走 scheduler；队列按 due 排；顶栏小字行显示"到期 N / 共 M"；全部背完显示完成态（不是无限循环）。
- 持久化：**localStorage**，key `eflernvault:fsrs:v1`（JSON，schema 含 `version: 1` 字段，P5 迁移 Tauri 文件时复用同一 schema）。
- **验收**：build 通过；背 3 张→刷新→due 不变；空 vault/换 vault 不崩；到期数为 0 时有完成态。

## 3. P3 — Tutor 真对话 + Quiz 混合组卷（需 LM Studio 开着，后做）

**策略（已定，不许改成纯 LM 出题）**：题干/材料/评分 rubric 由**模板从 vault 原文组装**（超纲率=0），LM 只做润色题面 + 按 rubric 批改。

- 新增 `src/quizgen.ts`（纯函数，脱离 LM 可单测）：
  - 输入：vault notes（取 `klausurrelevant=true` 的）；输出：三段式 Aufgaben（`darstellen → analysieren → beurteilen`，SoWi/Philo 通用）+ 每段 rubric（Operator verfehlt / Fachbegriff falsch / Beleg fehlt 三类）。
  - 材料只能用笔记 blocks 原文；Operatoren 动词必须出现在题干（对照 `_Downloads/SoWi/af2-sw_operatoren.pdf` 官方表）。
- 改 `src/modules/Tutor.tsx`：fetch 接 LM Studio OpenAI-compatible `/chat/completions`（stream 可选，至少非 stream 可用）；system prompt 限定"EF 水平德语+中文对照+引用笔记原文"；loading 态=一行 mono 小字；**LM 不可达时降级回占位提示**（"请打开 LM Studio"，绝不白屏转圈）。
- 改 `src/modules/Quiz.tsx`：流程"选主题→模板组卷→作答（Space 计时保留）→送 LM 批改→rubric 打分→Fehlerlog 文本补丁预览（复制按钮）"。
- **验收**：关 LM 时两模块降级不崩；开 LM 时 SoWi 主题端到端出一套+批改；无 vault 时用 mock 走通全流程。

## 4. P4 — 剩余三模块切真实数据（P2/P3 后顺手）

- Quiz/Planner/Mindmap 照抄 Library/Flashcards 模式：`vault ?? mock`（props 从 `App.tsx` 透传）。
- Planner：周任务清单可勾选（状态放 localStorage，key `eflernvault:plan:v1`）；倒计时目标日期可设（默认 Klausur 季 6 月底，可改）。
- Mindmap：从笔记 `thema/tags` 生成节点（根=学科，叶=主题），纯展示+点击跳转 Library 搜索。
- 命令面板加一项操作："FSRS 进度导出 JSON"（`act-export`，下载文件，P5 迁移用）。
- **验收**：打开真实 vault 后六模块无一显示 mock；无 vault 时六模块全回 mock。

## 5. P5 — 发版（最后，独立批次，需主 Agent 配合）

- FSRS/Planner 的 localStorage 数据迁 Tauri 文件（`progress.json`，IPC 参考现有 `vault_default_path` 实现，schema 复用 P2 的 `version: 1`）。
- `npx tauri build` 出 NSIS+MSI（需 VS C++ workload + rust stable；产物/签名 `.key` 永不进 git）。
- 署名变动同步 `NOTICE.md`。

## 6. 文件地图

- `src/App.tsx` — 导航+顶栏+命令面板装配（props 透传中枢）。
- `src/modules/*.tsx` — 六模块；`src/components/Palette.tsx, HelpOverlay.tsx, Blocks.tsx`。
- `src/vault/parser.ts, loader.ts` — vault 解析（P2/P3 只读它，不许改格式）。
- `src/i18n.ts` — 文案字典（缺文案找主 Agent 要，不许硬编码单语）。
- **不许碰**：`package.json / vite.config.ts / tsconfig.json / src-tauri/*`（要动先问）。

## 7. 交付格式（每次）

1. 改了哪几个文件、每个文件改了什么（一句话/文件）。
2. `npm run build` 输出（必须 PASS）。
3. 自验截图或"6 模块逐一切换无控制台红字"声明。
4. 已知降级/未覆盖项（如"LM 关闭时…"）。
