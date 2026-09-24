---
fach: ""
thema: "Uebernahme-Ausfuehrungsplan"
operatoren: []
klausurrelevant: false
datum: 2026-09-24
tags: [EF, Meta]
---

# 接手执行计划 — EF-GeWi-Lernvault

> 生成时间：2026-09-24 16:40（接手方接盘时点）
> 交接依据：`HANDOVER.md`（第 8 行起「当前状态」段）+ `00_META/Journal/2026-09-24-wartung-7.md`（最新一条，16:04）
> **门禁已由接手方独立实测复核，非采信文档声明**（见 §1 末）。

---

## 1. 当前任务状态与已完成进度

### 1.1 项目定位

| 项 | 内容 |
|---|---|
| 目标 | Gymnasium EF（NRW, Schloss Heessen）8 科笔试提分，中德双语 |
| 仓库 | Public：`github.com/jjjjjjjjnnjnn/EF-GeWi-Lernvault` |
| 双主体 | ① vault 知识库（Obsidian，内容真相源）② `App-EF-Lernvault/`（Tauri 桌面软件，只读 vault） |
| 授权 | CC-BY-SA（vault）；半开源自有 LICENSE（App） |

### 1.2 交接断点（git HEAD）

```
d2dc6c8  [Meta] Wartung-7: Vollstaendige Projektwartung, Indexaktualisierung und Dokumentenuebergabe  ← HEAD
166d136  [Meta] Glossar, Journal und HANDOVER fuer Batch 2 und Fach-Lernbaeume aktualisieren
ebd1484  [App]  Fach-Lernlandkarten und 10-Faecher-Curriculum-Trees in Mindmap integrieren
444448b  [Philo] Kant Kategorischer Imperativ und Maximenpruefung vertiefen
08563a7  [Englisch] Mediation und Kommunikative Strategien vertiefen
12a00ea  [Deutsch] Sachtextanalyse Leserlenkung und Rhetorik vertiefen
```

工作区 **clean**，无未提交改动、无未完成分支。可安全接盘。

### 1.3 已完成进度总览

**vault 侧（内容层）**

- 10/10 学科骨架齐备；SoWi、Philosophie **已填实收官**（SoWi Kap.1–11 全 12 篇）；Deutsch/Englisch **本期开动**；MINT 四科与 Musik/Sport 骨架 + 训练笔记就位。
- 102 篇核心笔记 / 534 张 Anki 词卡（bad=0）/ 234 条有效索引链接（missing=0）/ 4 门 Lernreise 互动课程。
- 全学科大纲深度化 **两批已落地**：
  - 第一批（MINT）：待定系数建模、匀加速与自由落体、分子间作用力、跨膜运输与渗透
  - 第二批（文史哲）：修辞三步走、Mediation 跨文化调解、康德定言命令四步检验法
- 十科独立学习树（Lernbaum，L0–L3）设计层 + App 落地均已完成。

**App 侧（工程层）**

- 模块齐全：Home / Library / Flashcards / Quiz / KlausurSim / Tutor / Planner / Mindmap / Lernbaum / Reise / Werkzeuge / Settings。
- 核心引擎：BM25+向量 RRF 混合检索、Vault 双向知识图谱、BKT 认知诊断 + 考纲掌握度、15 分钟自适应每日冲刺、KlausurSim 全真三段式模考（AFB I–III + EPA 0–15 评分 + Operatoren 合规诊断）、Headroom Token 压缩、CC-Switch 风格多端点路由与 Token 账本。
- 工程健康度：**57 套件 / 379 单测 100% 全绿**；`npm run build` 通过；UI 契约（零 emoji、零硬编码色值、纯语义 token）已收口。

### 1.4 接手方独立复核结果（实测）

| 门禁 | 交接文档声明 | 实测结果 | 结论 |
|---|---|---|---|
| `python scripts/vault-check.py` | PASS(102/534/234) | `notes=102 csv_rows=534(bad=0) index_links=234(missing=0) reisen=4` → **PASS** | ✅ 一致 |
| `npx vitest run` | 57 套件 / 379 测试 | **57 passed (57) / 379 passed (379)**，42.47s | ✅ 一致 |
| `npm run build` | 4.64s 零警告 | **✓ built in 9.06s**（本机更快/更慢属正常浮动） | ✅ 通过 |
| git 工作区 | 干净 | clean | ✅ 一致 |

> 唯一非零项：build 后仍有 `webllm-vendor` 6.05MB / `transformers-vendor` 583kB 的 chunk 体积警告 —— 已登记在待办 §4，非阻断。

**结论：交接断点可信，无隐藏的半成品改动。**

---

## 2. 具体的开发目标与功能需求

### 2.1 北极星目标（不变的验收标准）

> 让学生能在**完全离线**的桌面软件里，完成「读笔记 → 背词卡 → 刷题 → 全真模考 → 定位薄弱点 → 回补笔记」的完整闭环，且所有题目/评分材料**只能来自用户自己的 vault 笔记原文**（超纲率 = 0）。

### 2.2 铁约束（违反即打回，见 `FEATURE-SPEC.md §1` + `AGENTS.md`）

1. **不新增 npm 依赖**（`ts-fsrs` 是唯一例外，已批准；Tauri 官方包由主 Agent 加）
2. **零外部网络请求**（离线 exe；唯一例外：localhost 的本地模型）
3. **版权防火墙**：不含 DeepTutor/Anki/AGPL 代码；不打包 OER PDF、教材、Klausur 原题；引用用户自己笔记可以，引用出版社电子书正文不行
4. 新全局快捷键必须先登记 `src/keys.ts`；`isTyping()` 守卫不可删
5. **App 只读 vault，绝不写回**：Fehlerlog/进度导出只生成文本补丁预览，用户回 Obsidian 手动确认
6. 图标手写内联 SVG，禁 emoji；动效只走 `index.css` token

### 2.3 功能需求全景

**A. 已交付（作为回归基线，不可破）**

| 域 | 能力 |
|---|---|
| 检索 | BM25 + 向量 RRF 混合排序、德语变音正规化、薄弱/时序加权 |
| 知识网 | Vault 双向图谱、孤岛检测、跨学科思维桥（<50 token 压缩注入） |
| 认知诊断 | BKT 掌握度模型、学期管理（EF.1 / EF.2 / 归档重置） |
| 模考 | KlausurSim 三段式组卷（官方 2026 时长表）、EPA 0–15 评分、Operatoren 合规诊断、学术德语提分建议 |
| 助教 | 苏格拉底启发 / 考纲直出双态、多会话历史、瞬时前导卡、多端点故障级联、Token 账本 |
| 教具 | 句式积木 / 辩证天平 / 文本荧光解构 / 导数沙盘 / 四步解题 / 口试矩阵（独立 Werkzeuge 专区） |
| 课 | Lernreise 互动课程引擎（vault 即课程源，4 门已上） |

**B. 待开发（按优先级排，详见 §3）**

---

## 3. 后续执行计划

### 3.1 优先级分层

| 级别 | 项 | 性质 | 前置 |
|---|---|---|---|
| **P0** | 四项老师确认（Musik / Deutsch / Englisch / Sport） | 只能人推进 | 无 |
| **P1** | V2–V4 真人走查 + 窄屏真机验收 | 只能人推进 | 可打 exe |
| **P1** | Tauri 打包实跑（首次） | 工程 + 环境 | VS2022 C++ workload + rust stable |
| **P2** | 工程待办 6 项（见 §4） | 纯工程，可随时做 | 无 |
| **P3** | 内容继续深挖（第三批大纲 / 待老师定题后补） | 内容 | 部分依赖 P0 |

### 3.2 建议的第一周动作

**Day 1 — 环境与基线复现（无风险，先做）**

1. 新终端先执行 `. .\scripts\dt-env.ps1`（设 `DEEPTUTOR_HOME` + UTF-8，防 `data/` 污染 vault、防 GBK 崩溃）
2. 跑 `. .\scripts\webui.ps1` 起 1420 端口，浏览器人工点一遍 12 个模块，确认无控制台红字
3. 复现 §1.4 三项门禁（已由接手方跑通，但建议在自己机器再确认一次）

**Day 2–3 — 清理工程债（低风险高收益）**

按 §4 清单逐条处理，每条一个 commit，前缀 `[App]` 或 `[Meta]`。建议顺序：

1. `.gitignore` 的 `probe*.py` 收窄（当前误伤真实源码 `scripts/ebook-fetch/probe-klett.py`）
2. `worker/compute.ts` 决定接线或删除（当前零生产调用方）
3. `engine/diagram.ts` 4 处 SVG 约束色（prompt 内，非 UI）

**Day 4–5 — 真人验收准备**

1. 若环境齐备，跑 `npx tauri build` 出 NSIS+MSI，验证窗口标题与常驻内存
2. 准备 V2/V3/V4 走查脚本（体感延迟、45 分钟整场模考、每日冲刺凑齐感）
3. 窄屏真机：1100px / 640px 换行裁切、480ms 翻卡手感、字体加载、KaTeX 溢出

**持续 — 内容推进**

- P3 内容按「一科一 commit」推进，前缀 `[Deutsch]/[Englisch]/[Mathe]/…`
- **P0 四问未回复前**，相关 `Lehrplan.md` 的「待确认」段不得写成定论

### 3.3 协作铁律（若启用并行 subagent）

- subagent 必须用 `general`（`explore` 无写盘工具）
- 文件所有权必须**零重叠**划分
- **主线程必须独立复核每条「缺陷」声明**（历史上出现过基于旧快照的误报）
- 共享文件（`index.css` / `App.tsx` / `keys.ts` / `examComposer.ts` / `parser.ts`）**只能指派单一所有者**

### 3.4 Commit 规范（铁律）

- 一次只做一科一 commit；前缀 `[Deutsch]/[Englisch]/[Mathe]/[Physik]/[Chemie]/[Bio]/[Philosophie]/[SoWi]/[Musik]/[Sport]/[App]/[Meta]`
- 永不进 git：`data/`、`_Downloads/`、`*.apkg`、`target|gen|dist|*.key|*.exe|*.msi`
- 只写原创笔记（版权红线见 `AGENTS.md §4`）

---

## 4. 待办清单（可直接勾选）

### A. 阻塞学习内容 —— 需老师回复（人推进）

- [ ] **Musik**：Halbjahr-Thema（Epoche/Werk）？口试流程（时长、是否有 Hörbeispiel）？
- [ ] **Deutsch**：读哪部长篇（Drama）？Klausur 什么时候？
- [ ] **Englisch**：Teil B 是 Sprachmittlung 还是 Hörverstehen？Klausur 时间？有 Lektüre（novel）吗？
- [ ] **Sport**：课程项目（可换短跑/铅球）+ 考试形式 —— 目前仍是假设

> 三问德语原句已拟，可直接转发（见 Journal `2026-09-23-luecken-doc20-notenlehre.md`）

### B. 阻塞真题弹药 —— 需账号

- [ ] **StanSi** 近 3 年真题 + ZKE 往年卷（JS 门 + 登录墙）
- [ ] **SESAM / FWU / eduki** 同（登录墙）
- [ ] **Notenlehre Stufe 4 AB PDF 已损坏**（恰好截断 256.0 KiB、无 `%%EOF`、0 页可读）→ 需重发或改用照片
- [ ] Stark 纸质教辅需购买；IQB-HV mp3 仅播放器无直链；官方真题池止于 2025（2026 池 404）

### C. 阻塞产品验收 —— 需真人

- [ ] **V2 走查**：三档延迟体感与前导卡
- [ ] **V3 走查**：45 分钟整场模考 + 评分可信度
- [ ] **V4 走查**：每日冲刺凑齐感
- [ ] **窄屏真机**：1100px / 640px 真实换行与裁切、480ms 翻卡手感、字体实际加载与灰字对比度、KaTeX 字体与溢出
- [ ] **Tauri 打包**：`npx tauri build` 首次实跑（需 VS2022 C++ workload + rust stable）

> jsdom 只能证结构，证不了以上体感 —— 测试中已明确声明该边界。

### D. 工程待办 —— 不阻塞，可随时做

- [ ] `worker/compute.ts` 已转真 Web Worker 但**零生产调用方** → 接线或删除
- [ ] `webllm-vendor` 6 MB / `transformers-vendor` 583 kB 仍触发 chunk 警告；内嵌 WebLLM 是否值得待质疑
- [ ] `engine/diagram.ts` 4 处 SVG 约束色（prompt 内，非 UI）
- [ ] 云同步白名单已显式化；日后新增持久化键**必须显式决策**是否进云，不要依赖自动包含
- [ ] 官方时长表建议同时引用 `BASS 13-32 Nr. 3.2`（规章）与 `Nr. 6`（年度时长表）
- [ ] `.gitignore` 的 `probe*.py` 过宽，会隐藏真实源码（`scripts/ebook-fetch/probe-klett.py` 当前被忽略）→ 收窄或消毒后纳管
- [ ] `Block.raw` 已删；若再有人加回，注意它是无用字段

---

## 5. 接手方建议（不是待办，是判断）

1. **先别急着写新功能。** 项目工程成熟度已经很高（379 测试 + build + vault-check 三重门禁），当前真正的瓶颈**不在代码，在「人」**——四项老师确认卡着内容走向，V2–V4 真人验收卡着产品可信度。建议 Day 1 先把三项门禁在自己机器复现，建立信心基线。
2. **优先清 D 组工程债。** 6 条都是低风险、可独立 commit、有明确验收标准的小活，适合热身兼熟悉代码库。
3. **注意 `HANDOVER.md §2 待办与阻塞` 的原话**：A/B/C 三组「全部需要人推进，代码无法解决」。不要试图用代码绕过（例如去爬登录墙真题——会踩版权红线）。
4. **文档即接口。** 这个项目的 `HANDOVER.md` / `INDEX.md` / `Journal/` 三处同步是硬约定（`AGENTS.md §5.3`）。每次会话结束在 `00_META/Journal/YYYY-MM-DD-<thema>.md` 留一条，否则下一位接手者会断线。
