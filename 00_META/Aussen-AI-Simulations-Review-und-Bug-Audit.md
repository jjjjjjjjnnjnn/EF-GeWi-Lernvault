---
fach: ""
thema: "Aussen-AI Simulations-Review und Bug-Audit"
operatoren: []
klausurrelevant: false
datum: 2026-09-27
tags: [EF, Meta, Handbuch, Simulation, Review, QA]
---

# 外部 AI 学生端全链路模拟审查与隐蔽 Bug 排查任务包（Simulation Walkthrough + Scoring + Bug Hunting）

> **用法**：用户全选复制 §1 的提示词块，填入【审查目标 / 学科与主题】后发给外部 AI。一次只审一课，原样精读文件全文，禁止凭印象编分。
> **范围**：`Lernreise/` 全库 269 课（WP-A~F 见 §2）。试点课：`Lernreise/Sowi-Soziale-Marktwirtschaft-DE-L1.md`（SoWi / Soziale Marktwirtschaft，示例输出见 §3）。
> **关联手册**：质检去水铁律见 `00_META/Aussen-AI-Qualitaets-Audit-und-Anti-Monotonie-Handbuch.md`；战役宇宙与教具注册表见 `00_META/Aussen-AI-Kampagnen-und-Storyline-Didaktik.md`（注册教具仅 14 种）。

---

## 1. 复制提示词发送给外部 AI（逐字保留用户原规范 + 防幻觉补丁）

```text
================================================================================
【EF-GeWi-Lernvault 课件模拟用户交互、主观体验与隐蔽 Bug 审查指令】
================================================================================
你现在是一名就读于德国北威州（NRW）Gymnasium 的高中生（EF 阶段），正在使用《EF-GeWi-Lernvault》桌面学习端。
你不仅要以严苛的高中生身份模拟从 Schritt 1 到 Schritt 8 的全部交互过程，还要作为专业教学体验评估师，对目标课件进行主客观打分与 Bug 排查。

【审查目标】：[填写课程文件，如 Lernreise/Sowi-Soziale-Marktwirtschaft-DE-L1.md]
【学科与主题】：[填写 Fach 与 Thema，如 SoWi / Soziale Marktwirtschaft]

附加铁律（防幻觉，必须遵守）：
- 必须逐行精读目标文件的全部 Markdown 原文后作答，引用缺陷时给出原文行号与原文引文（≤2 行）。
- 找不到原文证据不得判 Bug；不确定的判“疑似”并说明缺哪条证据。
- 文科无公式时 Schritt 3 的 KaTeX 项记 N/A，不得扣分；理科无 highlighter 时 Primärtext 项记 N/A。
- DE 版出现 CJK 即判 Bug 5；CN 版允许中德双语，但德语术语拼写错误仍要报。

--------------------------------------------------------------------------------
一、8 步交互全流程模拟审查（Simulation Walkthrough）
--------------------------------------------------------------------------------
请按顺序模拟并检查以下 8 个步骤的画面与逻辑表现：

1. Schritt 1 (Hook & Phänomen):
   - 检查是否有真实生活矛盾或悬念案例？文字是否控制在 2~3 段（短段落）？
   - 目标卡（ZIELE）是否清晰拆为 3 个递进要点？考点句是否一眼可读？

2. Schritt 2 (Kernbegriffe & Wirkungsgefüge):
   - 是否包含 5 个专业术语盒？每个术语是否由【定义 + 机制 + 采分点】三层构成？
   - 是否存在大段不分段的“字墙”？关键术语是否加粗？

3. Schritt 3 (Mechanismus & KaTeX):
   - 因果推导链是否严密？
   - 数理公式是否独立成行（$$...$$）？有无公式错乱、未闭合或挤在行内的情况？（文科无公式记 N/A）

4. Schritt 4 (Ausprobieren & Sandkasten):
   - 教具（[Werkzeug: ...]）是否与本课原理 100% 吻合？
   - 文科课程：是否在此步完整提供了 100~200 词带行号（Z. 1-15）的德国原著/演讲引文？
   - 理科课程：是否有具体的实验数值与沙盘操作任务？HILFE 与 答案解析是否完整？

5. Schritt 5 (Methoden-Vergleich & Weiche):
   - 是否呈现了真正的理论/方法路线大对决（Weg A vs. Weg B）？
   - 对决标准是否清晰？是否只是空洞的同义反复？

6. Schritt 6 (Check & Active Recall):
   - 题目是否完整出现？是否存在空白、占位符或缺失？
   - 答案是否默认遮挡、支持点击揭晓？错题补丁（FEHLERLOG）是否针对本课考点？

7. Schritt 7 (Klausurtransfer & Szenario):
   - ROLLE（角色）、SITUATION（情境）、RUBRIC（评分细则）是否齐全？
   - 2 分钟倒计时与限时作答要求是否符合 NRW 考试实际？

8. Schritt 8 (Takeaway & Reflexion):
   - 是否包含合书能背的极简黄金句（Takeaway-Satz）？
   - 2 行反思（过程反思 + 元认知反思）是否明确引导下一步复习？

--------------------------------------------------------------------------------
二、四大维度综合打分量表（满分 100 分制）
--------------------------------------------------------------------------------
1. 画面主观视觉分（Visual & Typography Score, 0-100 分）：
   - [90-100] 呼吸感极强、无沉闷字墙、卡片层级分明、术语胶囊突出、字体排版优雅。
   - [70-89] 结构完整，但个别段落文字偏长，缺乏卡片跳跃感。
   - [<70] 大段无聊文字堆砌、未分段、公式乱挤在行内、像廉价 AI 机器人输出。

2. 习惯性与交互流畅度（Usability & Interaction Score, 0-100 分）：
   - 检查从上至下的滚动体验是否丝滑，有无阻断感；
   - 翻转自测、提示折叠展开、错题复制按钮是否合乎直觉。

3. 学习性与考纲契合度（Pedagogy & NRW Alignment Score, 0-100 分）：
   - 是否真正落实了主动回忆（Active Recall）；
   - Klausur-Satz 是否能作为 NRW Abitur/Klausur 答卷上的采分得分句。

4. 痼疾与 Bug 严查（Bug Hunting）：
   - [Bug 1: 区域空白] 任何步骤出现无内容、空容器或未渲染现象。
   - [Bug 2: 教具错配] 挂载了不相关的模拟器（如弹簧振子用斜面）。
   - [Bug 3: 幽灵教具] 声明了 highlighter 但无原版选段。
   - [Bug 4: 占位符泄漏] 出现 "Siehe Schritt-Inhalt"、"TODO" 等机械字样。
   - [Bug 5: 语言污染] 德语课件中出现不该有的 CJK 乱码或混杂。

--------------------------------------------------------------------------------
三、标准化审查输出格式（JSON + 诊断报告）
--------------------------------------------------------------------------------
请直接输出以下格式的诊断结果：

```json
{
  "target_file": "Lernreise/...",
  "scores": {
    "visual_typography": 92,
    "usability_interaction": 95,
    "pedagogy_learning": 90,
    "overall_score": 92.3
  },
  "bugs_found": [],
  "monotony_check": {
    "has_duplicate_klausur_satz": false,
    "has_wall_of_text": false,
    "has_primary_source_text": true
  },
  "improvement_suggestions": "具体针对本课体验的 1~2 条优化建议"
}
```

注：bugs_found 若有则每条含 {code, step, evidence_lines, description}；monotony_check 另附 8 个 Klausur-Satz 是否逐节独立的逐条结论；末尾附 3~5 行中文诊断说明。
================================================================================
```

---

## 2. 分批清单（269 课，六路并行，每路一个外部 AI 实例）

| 批次 | 覆盖（glob） | 数量 | 备注 |
|---|---|---|---|
| WP-A 生化 | `Lernreise/Bio-*.md` + `Lernreise/Chemie-*.md` | 58 | 理科：S3 必须查 KaTeX 独立行；S4 查实验数值+HILFE+MUSTERLÖSUNG |
| WP-B 理数 | `Lernreise/Physik-*.md` + `Lernreise/Mathe-*.md` | 61 | 重点查 Bug 2 教具错配（禁 schiefe-ebene 乱挂）+ Bug 4 占位符 |
| WP-C 社科 | `Lernreise/SoWi-*.md`（大小写同一批） | 44 | S5 必须真路线对决；S4 政治/经济查 markt-sim / balance-board 契合度 |
| WP-D 哲学 | `Lernreise/Philo-*.md` | 16 | S4 highlighter 必须有 100~200 词选段 + Z. 行号 + GELB/BLAU 任务 |
| WP-E 语言 | `Lernreise/Deutsch-*.md` + `Lernreise/Englisch-*.md` | 52 | Bug 3 幽灵教具重灾区；查选段零重复、行号用 (Z. N) |
| WP-F 音体 | `Lernreise/Musik-*.md` + `Lernreise/Sport-*.md` | 38 | 查 oral-timer / formula 契合度；赛事曲目/训练数值唯一性 |

> 取数方法（发给外部 AI 之前本地校验）：`Get-ChildItem Lernreise -Filter "*.md"` 应为 269。

---

## 3. 试点示例输出（Sowi-Soziale-Marktwirtschaft-DE-L1，主线程精读全文后标定）

```json
{
  "target_file": "Lernreise/Sowi-Soziale-Marktwirtschaft-DE-L1.md",
  "scores": {
    "visual_typography": 88,
    "usability_interaction": 92,
    "pedagogy_learning": 90,
    "overall_score": 90.0
  },
  "bugs_found": [],
  "monotony_check": {
    "has_duplicate_klausur_satz": false,
    "has_wall_of_text": false,
    "has_primary_source_text": true,
    "note": "S4 与 S8 均出现 Schiedsrichter-nicht-Spieler 母题，但表述不同（S4 定量规律句 vs S8 元认知句），判 motif-repeat 非复读；8 个 Klausur-Satz 逐节独立。"
  },
  "improvement_suggestions": "S1 Hook 信息密度高（Mietendeckel + WR1948 双案例），建议视觉上拆卡；S3 可加一行 Angebots-Nachfrage-Preis 关系式以强化传导链记忆点。"
}
```

诊断说明：S1 真实矛盾（11 Euro vs Deckel 8 Euro + 1948 夜）+ 3 递进 ZIELE 齐全；S2 五术语均有 定义+Mechanismus+Klausur-Tipp；S4 markt-sim 100% 契合且 TARGET 数值具体（8–12 Euro / 100 Einheiten / 6 Euro）；S5 Markt vs Ordnungspolitik 真对决；S6 3×FRAGE|ANTWORT；S7 ROLLE/SITUATION/AUFGABE/RUBRIC 齐全；S8 Takeaway + 2 Reflexion。KaTeX 记 N/A（SoWi 无公式，diagram 因果链完整）。

---

## 4. 验收与回流要求

1. 每个文件输出一个 JSON 块 + 3~5 行中文诊断；JSON 必须可解析。
2. Bug 必须给原文证据（行号 + 引文），无证据的一律退回。
3. overall_score = 三项均值保留 1 位小数；≥90 免修，75~89 给 1~2 条优化建议，<75 列入返工单并说明卡在哪一步。
4. 回流时只交 JSON 诊断报告，不直接改 `Lernreise/` 原文；返工由主线程按单科 commit 执行。
