# UI-SPEC-V3 — P2/P3/P4 界面需求文档（给外部 AI 看）

> 你只做**界面实现**，功能契约以 `FEATURE-SPEC.md` 为准，设计语言以 `UI-BRIEF.md` 为准，交互契约以 `INTERACTION-BRIEF.md` + `src/keys.ts` 为准。
> 做完每个 P 必须 `npm run build` 一次通过，并在 `npm run dev`（http://localhost:1420）自验 6 模块无控制台红字。
> 文案一律中德双语：DE 考试语言在上/大，ZH 理解语言在下/小灰。禁 emoji，图标手写内联 SVG。

## 0. 范围

- P2：Karteikarten 接 FSRS（`src/scheduler.ts` 新建，见 FEATURE-SPEC §2）。
- P3：KI-Tutor 真对话 + Quiz 混合组卷（见 FEATURE-SPEC §3 + Zitierpflicht）。
- P4：Quiz/Planner/Mindmap 切真实数据 + 命令面板 `act-export`（见 FEATURE-SPEC §4）。
- 已完成的别碰：Bibliothek、Lernreise（含 exemplar）、Blocks 渲染、parser/loader 格式。

## 1. 全局三态规范（所有模块统一）

1. **空态**（无 vault / 无数据）：沿用 Flashcards 现有样式——`max-w-xl` 居中，`font-sans text-sm text-[#6B675C]`，文案"Keine … / 暂无… — oben „Vault öffnen“ / 点顶部"打开知识库""。不许白屏、不许转圈。
2. **降级态**（LM 不可达，仅 P3）：琥珀色 hairline 框（`border-[#E5E1D8]` + 左 2px `border-[#B45309]`），mono 小字"LM Studio nicht erreichbar / LM 未连接——Vorlagen-Modus / 模板模式"，功能降级为纯模板组卷+自评，绝不假装批改。
3. **错误态**：单行 mono 红字（`text-[#991B1B]`），5 秒后可重试按钮。输入框聚焦时全局单键不劫持（`isTyping()` 守卫不可删）。

## 2. P2 — Karteikarten（改 `src/modules/Flashcards.tsx`，新建 `src/scheduler.ts`）

- 顶栏小字行（现有 hairline 下加第二行，`text-[11px] font-mono text-[#6B675C]`）：
  `fällig N / M · 新卡 K / 到期 N / 共 M · 新卡 K`。N=0 时显示完成态，见下。
- `rate()` 必须走 scheduler 并传入真实 rating（现状四个按钮行为相同是 bug，修掉）：
  Again=1 左滑，Hard=2，Good=3 右滑，Easy=4。左滑=Again，右滑=Good（现有手势保留）。
- 评分后卡片角落瞬显下次到期（transient，1.2s 淡出，mono 10px）：如 `→ 3d / 3天后`。
- **完成态**（到期数为 0）：替代无限循环——居中完成块：`Fertig für heute / 今天已完成` + 本轮统计（`X Karten · Y Again`）+ 按钮`Trotzdem weiter / 继续浏览`（只浏览不计 scheduler）。
- 队列按 due 排序；缺 state 的卡=新卡排最前；空 vault/换 vault 不崩（现有 useEffect 重置保留）。
- 快捷键不变（Space/Enter 翻卡，1–4 评分，拖拽），`CARD_SHORTCUTS` 已登记，无需加键。

## 3. P3 — KI-Tutor（改 `src/modules/Tutor.tsx`）

- 对话区：用户右（纸白卡，DE serif），AI 左（hairline 分隔，ZH sans 小灰 + DE serif 正文，沿用 Blocks 渲染，引用 chips 见下）。
- 输入行：单行 input + 发送按钮（`Senden / 发送`）；Enter 发送（`isTyping()` 下全局键不冲突即可）；Space 在此模块**不许**触发计时（Quiz 的 Space 计时只在 Quiz 模块生效）。
- 状态行（mono 11px 灰）：`denkt nach… / 思考中…`；失败→错误态规范；LM 不可达→降级态规范（占位提示"请打开 LM Studio"，绝不白屏转圈）。
- **Zitierpflicht chips**：AI 回复中每条实质断言后跟引用 chip（`font-mono text-[10px] text-[#4338CA]`，形如 `SoWi/Soziale-Marktwirtschaft.md#12`），点击跳 Library 并搜索该主题；无引用的断言行尾挂警告 chip `ohne Beleg / 无出处`（灰色，不 blocking）。
- system prompt（写死前端常量，不暴露 UI）："EF 水平德语+中文对照+只引用笔记原文+超纲拒绝（超纲时说不在 vault 里）"。

## 4. P3 — Quiz（改 `src/modules/Quiz.tsx`）

五步流程，一屏一步，顶部步骤 hairline（`1 Thema · 2 Aufgabe · 3 Antwort · 4 Korrektur · 5 Fehlerlog`，当前步 `text-[#4338CA]`）：

1. **Thema**：下拉/列表选主题（只列 `klausurrelevant=true` 的笔记 thema）+ AFB 徽章（`AFB II` mono 10px 框）。
2. **Aufgabe**：模板三段式卡（`darstellen → analysieren → beurteilen`，Operator 动词高亮 `text-[#4338CA]`）+ 材料区（笔记 blocks 原文，quote 样式沿用 Blocks）。
3. **Antwort**：textarea 作答 + Space 计时（现有行为保留，计时显示 mono 大字 `12:34`，开始/停止同键）。
4. **Korrektur**：rubric 三类 pills（`Operator verfehlt / Fachbegriff falsch / Beleg fehlt`，命中 pills 实心墨、未命中空心灰）+ 每条批改带 Zitierpflicht chip（同 Tutor）+ 总分行。
5. **Fehlerlog**：文本补丁预览（mono 块，`+` 行前缀）+ 复制按钮（`Kopieren / 复制`，复制后变`Kopiert ✓ / 已复制` 1.5s）。
- 无 vault 时用 mock 走通全流程（FEATURE-SPEC 验收要求）。

## 5. P4 — Planner / Mindmap / Quiz 数据 + act-export

- **Planner**：周任务清单（checkbox，tufte 方框 `border-[#6B675C]`，勾选态墨底白勾）+ 倒计时头（`Noch X Tage bis Klausur (30.06.) / 距考试 X 天`，日期可设，默认 6 月 30 日）+ 状态 localStorage `eflernvault:plan:v1`。空态规范。
- **Mindmap**：根=学科徽章（沿用 `fach.ts` 10 色徽章），叶=thema 节点（hairline 连接线，无曲线库，CSS 直线即可）；点击叶节点→跳 Library 并填入搜索；纯展示，不许拖拽编辑。
- **Quiz/Planner/Mindmap**：`vault ?? mock`（props 从 `App.tsx` 透传，照抄 Library/Flashcards 模式）。
- **命令面板**：加 `act-export`（`FSRS 进度导出 JSON / 导出进度`），下载 `eflernvault-fsrs-v1.json`；新键先登记 `src/keys.ts`（规则，不登记不许上线）。

## 6. 文案表（缺的 key 加进 `src/i18n.ts`，不许硬编码单语）

| key | DE | ZH |
|---|---|---|
| dueToday | fällig N / M | 到期 N / 共 M |
| newCards | Neue K | 新卡 K |
| doneToday | Fertig für heute | 今天已完成 |
| browseAnyway | Trotzdem weiter | 继续浏览 |
| nextDue | → Xd | X天后 |
| lmDown | LM Studio nicht erreichbar — Vorlagen-Modus | LM 未连接——模板模式 |
| noSource | ohne Beleg | 无出处 |
| copyPatch | Kopieren | 复制 |
| copied | Kopiert ✓ | 已复制 |
| daysLeft | Noch X Tage bis Klausur | 距考试 X 天 |
| exportFsrs | FSRS Fortschritt exportieren | 导出FSRS进度 |

## 7. 验收清单（逐项打勾orse打回）

- [ ] P2：背 3 张→刷新→due 不变；N=0 完成态出现；空 vault 不崩；四个评分行为不同。
- [ ] P3 关 LM：Tutor+Quiz 降级态出现，可模板自评，全程无白屏转圈。
- [ ] P3 开 LM：SoWi 主题端到端出一套+批改，每条断言有 chip 或 ohne Beleg。
- [ ] P4：开真实 vault 后六模块无一显示 mock；关 vault 全回 mock；act-export 下载 JSON 可读。
- [ ] 快捷键：`?` 帮助页能看到所有新键；输入框聚焦时单键不劫持。
- [ ] `npm run build` PASS + 6 模块逐一切换无控制台红字。

## 8. 交付格式（每次）

1. 改了哪几个文件、每个文件一句话。
2. `npm run build` 输出（必须 PASS）。
3. 自验声明或截图。
4. 已知降级/未覆盖项。
