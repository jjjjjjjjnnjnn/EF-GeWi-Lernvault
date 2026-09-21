# UI-SPEC-V2 — 全科 + 互动学习需求（给外部 AI，直接可开工）

> 前置必读：`UI-BRIEF.md`（tufte 设计语言）+ `INTERACTION-BRIEF.md`（键盘契约）+ `FEATURE-SPEC.md`（P2/P3 功能）。
> 本文档只增量：10 科同步 + KaTeX + 第 7 模块 Lernreise（互动探索式学习）。
> 验收铁律：`npm run build` 通过；1420 自验；不新增除 `katex` 外的依赖；零外部请求（localhost 的 LM Studio 除外）。

## 1. FACH-SYSTEM（10 科，唯一真相源）

- 新增 `src/fach.ts`：`[{id:"Deutsch", kurz:"DE"}, {id:"Englisch", kurz:"EN"}, {id:"Mathe", kurz:"MA"}, {id:"Physik", kurz:"PH"}, {id:"Chemie", kurz:"CH"}, {id:"Bio", kurz:"BI"}, {id:"Philosophie", kurz:"PL"}, {id:"SoWi", kurz:"SW"}, {id:"Musik", kurz:"MU"}, {id:"Sport", kurz:"SP"}]` + 中德全名（i18n 复用）。
- Library：学科筛换成 10 枚 Fach-Badge（细线徽章 + 计数，无色块；当前选中=靛蓝字+下划线，tufte 风格）。
- parser 的 FACH 集已含 10 科（不用改）；mock `data.ts` 可保持 2 科（回落态）。
- 命令面板加 "Fächer" 组：按学科跳笔记（`vault.notes` 按 fach 分组）。
- Planner 周模板按 10 科生成占位任务（KV：SoWi/Philo 沿用现有 planWeek，其余 "Fach: Karten wiederholen"）。

## 2. KATEX（特批的唯一新依赖）

- `npm i katex`；字体随包（`katex/dist/fonts/*`，vite 自动打进 dist，离线 exe 零外部请求）。
- `src/components/Blocks.tsx` 扩展 Block 渲染：`$$...$$` 独立公式行（居中，字号 1.05em）+ 行内 `$...$`；KaTeX CSS 只收敛到 tufte（公式黑、行距松，禁彩色）。
- 复用点：Library 阅读列、Quiz 材料区、Flashcards 背面、Mindmap 节点 label（纯文本回落：渲染失败显示源码，不崩）。
- MINT vault 笔记已用 `$$` 写好（`03_Mathe/Formel-Spickzettel.md` 等），直接可验。

## 3. LERNREISE（第 7 模块，Academy 式互动探索，核心新增）

### 3.1 课程即 vault 文件（解析器先行，UI 后行）

- 新目录 `Lernreise/*.md`（vault 内，主 Agent 维护；App 只读）：
  ```yaml
  ---
  fach: SoWi
  thema: "Soziale Marktwirtschaft"
  level: 1            # 1 Einstieg / 2 Aufbau / 3 Klausur
  ziel: Klausur       # Klausur | Verstehen | Muendlich
  xp: 100
  ---
  ## Schritt 1 — entdecken
  正文=讲解（中德对照块，复用 Blocks）。
  ## Schritt 2 — ausprobieren
  AUFGABE: <动手题>
  HILFE: <提示（默认折叠）>
  ## Schritt 3 — check
  FRAGE: <过关题> | ANTWORT: <判分要点，LM/自评用>
  ## Schritt 4 — szenario
  ROLLE: <角色> | SITUATION: <场景> | RUBRIC: <三类错+评分点>
  ## Schritt 5 — muendlich (可选, 仅 Musik/Sport/Philo)
  ZIEHUNG: <抽题> | ZEIT: 180 (秒) | SELBSTCHECK: <自评表>
  ```
- `src/reise.ts`：纯函数解析器（frontmatter + `## Schritt N — <typ>` 切分，typ ∈ entdecken/ausprobieren/check/szenario/muendlich；缺字段不崩，跳过该步）。

### 3.2 播放器 UI（`src/modules/Reise.tsx`）

- 布局：左=步骤 rail（1..N，发丝线+数字，无进度条装饰），中=当前步内容，右（宽屏）=XP/连击小字行。
- 步态组件：
  - `entdecken`：Blocks 直接渲染 + "Weiter" 按钮。
  - `ausprobieren`：输入框/填空 → 本地关键词命中即时反馈（`ANTWORT` 要点含 2/3 即过；LM 在线时加一句点评，否则只本地判）。
  - `check`：3 题（FRAGE 列表）全过解锁下一步；错题进 Fehlerlog-Entwurf（复制按钮，不写回 vault）。
  - `szenario`：角色卡（细线框）+ 作答区 + Space 计时（复用 Quiz 计时器样式）→ LM 按 RUBRIC 批改；LM 离线时显示"场景已读+自评表"，不锁死。
  - `muendlich`：抽题 → 倒计时（MediaRecorder 录音，blob 存内存+下载按钮，不上传）→ SELBSTCHECK 复选 → 完成。
- Gating：下一步按钮在 check/szenario 未过时置灰（Academy 式过关）。
- 快捷键：`Enter`=下一步/提交，`w`=Weiter？——不，数字键禁区！用 `→`（右箭头）=下一步并登记 `keys.ts`（REISE_SHORTCUTS）。

### 3.3 游戏化（localStorage 先行）

- `eflernvault:xp:v1`：`{xp: number, streak: days[], badges: {fach: level}[], done: {reiseId: stepIdx}}`。
- 规则：entdecken +5 / ausprobieren过 +15 / check过 +20 / szenario完成 +30 / muendlich完成 +30；连击=连续学习天数（Planner 首页 + Reise 首页小字行显示，无弹窗、无动画庆祝——tufte 克制）。
- 命令面板加操作："XP 导出 JSON"（`act-export-xp`，与 P2 的 FSRS 导出并列）。

### 3.4 向导入口（Reise 首页）

- 三问：Fach（10 徽章选）→ Thema（该 Fach 的 reise 列表）→ Ziel（Klausur/Verstehen/Mündlich 过滤 `ziel`）→ 生成队列（纯前端规则，无 AI 可跑）。
- 无 reise 文件时：显示"该主题暂无旅程，去 Bibliothek 先读笔记"（不显示 mock 课程）。

## 4. 本次交付清单（外部 AI 按顺序做）

1. `src/fach.ts` + Library 10-Badge + 面板 Fächer 组（mock 可验）。
2. `npm i katex` + Blocks 公式渲染（用 MINT Spickzettel 真 vault 验）。
3. `src/reise.ts` 解析器（node 可单测：丢本 SPEC 的示例能切出 5 步）。
4. `src/modules/Reise.tsx` + 第 7 导航项（图标：细线罗盘/路径 SVG，16×16 手写）+ keys 登记 + `?` 帮助自动出现。
5. XP/streak/badge（localStorage）+ 向导入口 + 导出操作。
6. 全量自验：10 科 vault 下 7 模块无 mock、无控制台红字、离线 LM 全降级可走。

## 5. 禁止项（增补）

- 游戏化弹窗/撒花/音效；XP 用途膨胀（只显示，不设等级称号）。
- KaTeX 以外的渲染依赖（MathJax 禁止）；Google Fonts 禁止（字体随包）。
- 把 Lernreise 内容硬编码进前端（课程只能来自 vault `Lernreise/`，无文件=无课程）。
- 录音上传任何服务器（blob 只活在内存+用户手动下载）。
