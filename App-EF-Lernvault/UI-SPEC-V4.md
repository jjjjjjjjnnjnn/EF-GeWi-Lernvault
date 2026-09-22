# UI-SPEC-V4 — Vergleich步态 + 反馈三层 + desirable-difficulty 文案（Appendix，只增不改）

> **Append-only 附录**：本文件只新增 V4 界面需求，**不许改 `UI-SPEC-V2.md` / `UI-SPEC-V3.md` 与任何 `src/` 现状**。冲突时以 V2/V3 为准，本文件自动让位。
> 你只做**界面实现**，功能契约以 `FEATURE-SPEC.md`（P2/P3/P4 已验收）为准，设计语言以 `UI-BRIEF.md`（tufte token）为准，交互契约以 `INTERACTION-BRIEF.md` + `src/keys.ts` 为准，方法依据以 `00_META/Lernmethoden-Evidenz.md` 为准。
> 文案一律中德双语：DE 考试语言在上/大，ZH 理解语言在下/小灰。禁 emoji，图标手写内联 SVG。
> **落实方式：发外部 AI 落实，主 Agent 只验 `npm run build`**（PASS + `npm run dev` 1420 六模块逐一切换无控制台红字即收）。

## 0. 范围（读完再做）

- V4 只加两块 UI：**Vergleich 步态**（辨别题 + 对比题 AB 并排 + gating）与**反馈三层**（L1 即时 KR → L2 延迟展开 → L3 过程+元认知），另加 5 条 desirable-difficulty 文案挂载。
- 已验收的不碰：P2 FSRS 队列/完成态、P3 Tutor 对话 + Zitierpflicht chips + Quiz 五步、P4 Planner/Mindmap/`vault ?? mock`/`act-export`、Bibliothek/Lernreise/Blocks 渲染、parser/loader 格式。
- 全局三态沿用 V3 §1（空态 `max-w-xl` 居中灰字、不许白屏转圈；降级态琥珀 hairline + mono 小字模板模式；错误态 mono 红字 `text-[#991B1B]` + 5 秒后可重试；输入框聚焦时全局单键不劫持，`isTyping()` 守卫不可删）。
- tufte token（沿 `UI-BRIEF.md`）：纸 `#FAFAF7` / 墨 `#1C1B17` / 次要 `#6B675C` / 发丝线 `#E5E1D8` / 强调靛蓝 `#4338CA`（只用于可点击/当前步/紧急）/  warn `#B45309` / 红 `#991B1B`。直角或 `rounded`（2~4px），禁用大圆角/投影/渐变/色块平铺。DE serif（`Georgia, 'Songti SC', 'SimSun', serif`），ZH sans 小一号灰色在下，**禁用斜体**。动效 ≤150ms 淡入（翻卡除外）。
- 缺的文案 key 加进 `src/i18n.ts`，不许硬编码单语；新全局快捷键先登记 `src/keys.ts`（无登记不许上线）；零外部请求（唯一例外 localhost LM Studio），禁用网络字体/CDN（离线 exe）。

## §1 Vergleich 步态 UI

> 方法依据：`Lernmethoden-Evidenz.md` §1（Practice testing hoch：凡"觉得会了"强制 check 步验证）+ §2（检索练习 d≈1.0，默写 > 重读）。Vergleich 步态的选择**不写入 FSRS**（不计 Again），只写练习计数，见 §2 L3。

### 1.1 辨别题展示（题干 + 二选一 + 为什么）

- 题干区：DE serif 正文在上，ZH sans 小灰在下；Operator 动词高亮 `text-[#4338CA]`（沿 V3 Quiz Aufgabe 样式）；材料引用只用笔记 blocks 原文 quote 样式。
- 二选一程序按钮：A/B 两个**文字按钮**（沿 P2 Again/Hard/Good/Easy 一排文字按钮：下划线/细线分隔，**不是**两色大按钮）；选中态墨底白字，未选中空心灰；键盘 `1` / `2` 可选（若加键先登记 `src/keys.ts`）。
- "为什么"输入框：二选一之下放单块 textarea（2 行，hairline 框 `border-[#E5E1D8]`），placeholder 双语：`Warum? Ein Satz genügt / 为什么？一句话就够`；聚焦时全局单键不劫持。
- 提交行：主按钮 `Vergleichen / 对照看看`（文字按钮，靛蓝）；**选错也可提交、可进解析，不锁死**（见 1.3 gating）。

### 1.2 对比题 AB 并排（tufte 小多组图风格）

- 两列并排（`grid-cols-2`，中间 1px hairline `bg-[#E5E1D8]`分隔，无卡片容器）：每列 = 小标题（mono 11px 灰，形如 `A · Angebot / A · 供给`）+ 材料块（笔记原文 quote，只读）+ 结论行（DE serif 一句 + ZH 小灰一句）。
- 差异高亮：**只用底线 + 加粗**（`font-medium underline decoration-[#4338CA] underline-offset-2`），不许红绿大面积平铺；每列最多 3 处，多了就是装饰，打回。
- 窄窗（<900px）自动上下堆叠，hairline 转为横线；德语长词（如 Chancengerechtigkeit）不溢出（沿 UI-BRIEF 验收第 2 条）。
- 纯展示，不许拖拽编辑（沿 V3 Mindmap 约束）。

### 1.3 gating（选错可进解析，不锁死）

- 程序选错 → L1 徽标 `Falsch / 错了`（空心 + `text-[#991B1B]`，禁大红块）+ 旁挂文案（§3 `ddError`）：`Fehler sind gute Signale / 选错是好信号`（mono 11px 灰，不嘲讽、不扣分表情）。
- 按钮 `Zur Erklärung / 进解析` **永远可点**，不许禁用下一步、不许锁死重选；重选允许且不计 FSRS。
- 解析入口默认收起 L2 折叠区（见 §2），由用户主动展开（desirable difficulty：制造提取困难，但不制造流程卡点）。

## §2 反馈三层 UI

> 方法依据：`Lernmethoden-Evidenz.md` §1（Self-explanation mittel：对照修正；Elaborative interrogation：为什么三连）+ §4（Zitierpflicht：无引用断言视为无效）。

### L1 — 即时 KR（Knowledge of Result，对/错 + 1 行）

- 选择/提交后**即时**（≤150ms 淡入）显示徽标行：`Richtig / 对了`（墨底白字细线徽章）或 `Falsch / 错了`（空心 + 红字），+ 1 行 mono 11px 灰（如 `Richtig: B regelt die Menge / 对：B 管数量`）。
- L1 只给对错，**不许泄露解析**（L2 折叠区默认收起）；计时显示沿用 Quiz mono 大字 `tabular-nums`。

### L2 — 延迟展开（check 步后"对照解析"折叠区）

- check 步（提交/计时停止）后出现折叠按钮：`Lösung vergleichen / 对照解析`（文字按钮 + 细线 SVG 箭头，禁 emoji）；默认收起，用户主动展开。
- 展开内容：① 模板 rubric pills（沿 V3 三类 `Operator verfehlt / Fachbegriff falsch / Beleg fehlt`，命中实心墨、未命中空心灰）；② 每条批改带 **Zitierpflicht chip**（沿 V3 §3：`font-mono text-[10px] text-[#4338CA]`，形如 `SoWi/Soziale-Marktwirtschaft.md#12`，点击跳 Library 并搜索该主题；无引用断言行尾挂 `ohne Beleg / 无出处` 灰 chip，不 blocking）；③ 引用的笔记块原文（quote 样式只读对照，超纲时写"不在 vault 里"，沿 FEATURE-SPEC P3 system prompt）。
- **Zitierpflicht 未松动**：模板 rubric 本身是规则不需引用；LM/模板的实质事实断言一律要 chip，否则按无效处理（沿 FEATURE-SPEC §3）。

### L3 — 过程 + 元认知（RUBRIC 过程维 + "下次先…"）

- 过程维展示（L2 之下另起 hairline 分隔行，只两项，多了打回）：pills `Belegkette / 证据链` + `Operatorabfolge / 程序顺序`，命中规则同 V3（实心/空心），mono 10px。
- "下次先…"输入框：单行 input（hairline 框），label 双语 `Nächstes Mal zuerst… / 下次先…`，placeholder `z. B. Erst Operator markieren / 比如：先标 Operator`；失焦/Enter 存 **localStorage**，key `eflernvault:vergleich:v1`（JSON，含 `version: 1`，P5 迁移复用同一 schema）；刷新后仍在，下次同主题预填为小灰提示。
- App 不写 vault：L3 只生成**文本补丁预览**（mono 块，`+` 行前缀）+ 复制按钮（沿 V3：`Kopieren / 复制` → `Kopiert ✓ / 已复制` 1.5s），用户回 Obsidian 手动确认（沿 FEATURE-SPEC 铁律第 5 条）。

## §3 desirable-difficulty 文案表

> 方法依据：`Lernmethoden-Evidenz.md` §1–§2（Testing hoch / Distributed hoch / Interleaved mittel / Rereading niedrig / Retrieval > Elaboration）+ Klausur-Satz（`Abrufen schlägt Wiederlesen`）。缺的 key 加进 `src/i18n.ts`，不许硬编码单语（沿 V3 §6）。

| key | DE | ZH | 挂载位置 |
|---|---|---|---|
| ddHard | Schwer beim Üben, leicht in der Klausur | 练时难，考时易 | Quiz 页头小字行（步骤 hairline 下第二行，`text-[11px] font-mono text-[#6B675C]`，常驻） |
| ddError | Fehler sind gute Signale | 选错是好信号 | Vergleich gating 徽标旁 + Quiz Korrektur 步头部（mono 11px 灰，选错/有 pills 命中时出现） |
| ddInterleave | Mischen schlägt Pauken | 穿插刷比连刷记得牢 | Planner 周视图头部倒计时下 + Quiz Thema 步主题列表下（mono 11px 灰，常驻） |
| ddRetrieval | Abrufen schlägt Wiederlesen | 合上书默写，胜过重读三遍 | Fehlerlog 空态（三态空态样式内第二行小灰字）+ Flashcards 完成态统计下 |
| ddExample | Erst Beispiel, dann selbst | 先看例题，再自己来 | Quiz Aufgabe 步材料区头（quote 区上一行 mono 11px 灰，常驻） |

## §4 验收清单

> 对照 V3 §7 验收风格逐项打勾或打回。**发外部 AI 落实，主 Agent 只验 `npm run build`**（PASS + 六模块无控制台红字即收，不逐项代验）。

- [ ] Vergleich 辨别题：题干 DE 上/ ZH 下小灰 + A/B 文字按钮 + "为什么"输入框 + `Vergleichen / 对照看看`可提交；聚焦输入框时单键不劫持。
- [ ] 对比题 AB 并排：两列 + 中线 hairline，差异高亮≤3 处/列（底线 + 加粗，无红绿平铺）；<900px 堆叠不断裂，长词不溢出。
- [ ] gating 不锁死：程序选错出现 `Falsch / 错了` + `Fehler sind gute Signale / 选错是好信号`，`Zur Erklärung / 进解析`永远可点，可重选且不计 FSRS。
- [ ] L1 即时 KR：提交后即时徽标 + 1 行 mono 灰；L2 折叠区默认收起，无解析泄露。
- [ ] L2 延迟展开：check 步后 `Lösung vergleichen / 对照解析`可展开；内含 rubric pills + 笔记块原文引用 + chip；无出处挂 `ohne Beleg / 无出处`。
- [ ] L3 过程+元认知：过程维两 pills（`Belegkette / 证据链` + `Operatorabfolge / 程序顺序`）展示正确；"下次先…"可存，刷新后仍在（`eflernvault:vergleich:v1`，含 `version: 1`）；补丁预览 + 复制按钮行为同 V3。
- [ ] 5 条 desirable-difficulty 文案中德齐全、挂载位置正确（Quiz 页头 / Fehlerlog 空态 / Planner 周视图），无硬编码单语，缺 key 已进 `src/i18n.ts`。
- [ ] **Zitierpflicht 未松动**：实质断言有 chip 或 `ohne Beleg`（同 V3 §3 标准）；模板 rubric 不需引用；超纲说"不在 vault 里"。
- [ ] **P2/P3/P4 零回归**：FSRS 队列/完成态、Tutor 降级态、Quiz 五步、Planner/Mindmap/`vault ?? mock`/`act-export`行为不变；三态沿 V3 §1，无白屏转圈。
- [ ] **离线可用** + build：零外部请求（除 localhost LM），无网络字体/CDN；`npm run build` PASS + 6 模块逐一切换无控制台红字；新键已登记 `src/keys.ts`（若有）。

## 交付格式（每次，沿 V3 §8）

1. 改了哪几个文件、每个文件一句话。
2. `npm run build` 输出（必须 PASS）。
3. 自验声明或截图。
4. 已知降级/未覆盖项。
