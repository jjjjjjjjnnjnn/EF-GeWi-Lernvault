---
fach: ""
thema: "Aussen-AI Bugfix und Pedagogy Sanierungsplan"
operatoren: []
klausurrelevant: false
datum: 2026-09-27
tags: [EF, Meta, Handbuch, Bugfix]
---

# 外部 AI 课件标题内容失配排查与全库深度整改方案

> **编制背景**：用户在运行前端（`http://localhost:1420/?tab=reise`）查看课件（以《Soziale Marktwirtschaft》为例）时，发现**小节分类与标题冲突、正文残留脚手架提示词、文科社科被生硬塞入数学算法公式、小节间内容冗余同质化**等严重质量缺陷。
> 本手册提供**全自动排查脚本**、**全库缺陷诊断清单**、**前端系统自愈方案**与**外部 AI 批量改写任务包与提示词**。

---

## 一、截图直击与五大根因诊断

通过对用户提供的错误截图（`firefox.exe_20260927_083848.png`）及 `Sowi-Soziale-Marktwirtschaft-DE-L1.md` 的代码级审查，确诊五大核心 Bug：

| 缺陷编号 | 截图直观现象 | 根本技术与内容原因 | 影响范围 |
| :--- | :--- | :--- | :--- |
| **Bug 1: 结课反思被标记为“概念探索”** | 右侧导航 TOC 中，`08` 小节上方大字显示 `08 ERKUNDUNG & KONZEPT`，下方却为 `Takeaway & Metakognitive...` | 全库 269 篇文件全量在第 8 步使用了 `## Schritt 8 — entdecken:`。前端识别到 `entdecken` 便机械输出“概念探索”，导致结课反思与概念探索发生语义冲突。 | **269 / 269 篇 (100%)** |
| **Bug 2: 理科数学模板侵入文科社科** | 在社会经济、哲学、德语、英语课件的 S5/S8/Fehlvorstellung 中，出现 `$d = x_2 - x_1$`、`$x_1$ und $x_2$`、`Kennzahl mit $d = x_2 - x_1$` | 外部 AI 在执行批处理时，无脑套用了数理课件的对比模板（“方法 (i) 输出排序，方法 (ii) 计算指标差值”），导致文科课件在讨论社会市场、康德道德律、政体时让学生算数学公式。 | **22 篇高危核心课件** |
| **Bug 3: 提示词残留痕迹污染正文** | 截图正文中赫然出现：`Ausgangslage aus der Vorlage: Stell dir vor: Es ist Samstagmorgen...` | 外部 AI 生成时将 System Prompt 中的占位说明文字与原始语料未作清洗直接粘入正文，破坏了教科书式排版。 | **22 篇课件** |
| **Bug 4: 第 6、7 步标题同名套话重复** | TOC 和页面标题出现叠字：`06 VERSTÄNDNISPRÜFUNG / Verständnisprüfung`、`07 KLAUSURTRANSFER & RUBRIC / Klausurtransfer & Rubric` | 课件的具名小节标题（冒号后）未写具体考点，而是把分类名复读了一遍，信息量为零。 | **275 处小节** |
| **Bug 5: 第 1 步结构越权冗余** | 第 1 步不仅有 Hook，还塞入了 `### Fachbegriff & Definition` 和 `### Wirkungsgefuege / Modell` | 第 1 步（Ziele & Phänomen）过早剧透了第 2 步（Fachbegriffe）和第 3 步（Wirkungsmodell）的内容，导致前三步内容严重重合。 | **91 篇课件** |

---

## 二、全库自动化诊断脚本（已部署）

已在仓库中编写并部署全自动检测脚本：[`scripts/audit-pedagogy-integrity.py`](file:///C:/Users/rongj/Desktop/学习/scripts/audit-pedagogy-integrity.py)。

### 运行方式
```powershell
python scripts/audit-pedagogy-integrity.py
```

### 当前全库最新扫描结果汇总
```
======================================================================
LERNREISE PEDAGOGY & INTEGRITY AUDIT REPORT (Total: 269 courses)
======================================================================
[*] Bug 1 - Prompt Leakage Artifacts: 22 files
[*] Bug 2 - Cross-Discipline Math Template Leaks (SoWi/Philo/etc.): 22 files
[*] Bug 3 - Schritt 8 Mislabeled as 'entdecken' (Causes wrong TOC label): 269 files
[*] Bug 4 - Generic Redundant S6/S7 Titles (e.g. 'Verstaendnispruefung'): 275 instances
[*] Bug 5 - Schritt 1 Premature Conceptual Overload: 91 files
[*] Legacy Courses Lacking Named Step Titles: 131 files
======================================================================
```

### Bug 1 & Bug 2 受影响的 22 篇高危课件清单
1. `Lernreise/Philo-Anthropologie-Sonderstellung-DE-L1.md`
2. `Lernreise/Philo-Kategorischer-Imperativ-DE-L1.md`
3. `Lernreise/Philo-Utilitarismus-Kalkuel-DE-L1.md`
4. `Lernreise/Philo-Utilitarismus-Kant-DE-L1.md`
5. `Lernreise/SoWi-Betrieb-Mitbestimmung-DE-L1.md`
6. `Lernreise/Sowi-Abitur-Fokus-DE-L1.md`
7. `Lernreise/Sowi-Gesetzgebung-Demokratie-DE-L1.md`
8. `Lernreise/Sowi-Gestaltung-DE-L1.md`
9. `Lernreise/SoWi-Grundgesetz-DE-L1.md`
10. `Lernreise/SoWi-Identitaet-Jugend-DE-L1.md`
11. `Lernreise/SoWi-Karikatur-DE-L1.md`
12. `Lernreise/SoWi-Konsum-Wirtschaften-DE-L1.md`
13. `Lernreise/SoWi-Parteien-Willensbildung-DE-L1.md`
14. `Lernreise/SoWi-Partizipation-DE-L1.md`
15. `Lernreise/Sowi-Preismechanismus-Markt-DE-L1.md`
16. `Lernreise/Sowi-Soziale-Marktwirtschaft-DE-L1.md`
17. `Lernreise/SoWi-Soziale-Ungleichheit-DE-L1.md`
18. `Lernreise/Sowi-Soziale-Ungleichheit-Gini-DE-L1.md`
19. `Lernreise/SoWi-Sozialisation-Rolle-DE-L1.md`
20. `Lernreise/SoWi-Verfassungsorgane-DE-L1.md`
21. `Lernreise/SoWi-Wehrhafte-Demokratie-DE-L1.md`
22. `Lernreise/SoWi-Wirtschaftskreislauf-BIP-Kritik-DE-L1.md`

---

## 三、前端系统架构自愈（已完成）

为了确保无论新老 Markdown 内容如何变动，用户端界面始终保持优雅与严谨，在 `App-EF-Lernvault` 中已完成如下优化：

1. **类型增强**：在 [`src/reise.ts`](file:///C:/Users/rongj/Desktop/学习/App-EF-Lernvault/src/reise.ts) 中增加 `reflexion` 作为标准 `SchrittTyp`。
2. **智能小节分类解析（Step-aware Mapping）**：
   - 当 `stepNumber === 8` 或类型为 `reflexion` 时，分类标题自动显示为：
     - 德语：`TAKEAWAY & REFLEXION`
     - 中文：`考点精粹与元认知反思`
     （彻底终结将第 8 步展示为 `ERKUNDUNG & KONZEPT` 的荒谬现象！）
   - 当 `stepNumber === 6` 时，分类标题显示为 `SELBST-CHECK`（避免与小节标题重合为 `Verständnisprüfung / Verständnisprüfung`）。
   - 当 `stepNumber === 7` 时，分类标题显示为 `KLAUSUR-SZENARIO`。
3. **正文渲染兼容**：`Reise.tsx` 支持 `reflexion` 步骤作为结课反思渲染，奖励 +5 XP，保持状态闭环。

---

## 四、外部 AI 批量改写任务包与执行标准

外部 AI 必须按以下 4 个任务包依次清洗重塑受影响文件，**原文件就地覆盖，不得新建文件，严禁侵犯版权，严禁使用禁用工具**。

### 任务包 A（P0 紧急）：清除 22 篇社科/文科中的“数理模板”与“提示词残留”
- **目标文件**：上述清单中的 22 篇 SoWi 与 Philo 课件。
- **改写要求**：
  1. **彻底删除提示词残留**：全局查找并删除 `Ausgangslage aus der Vorlage:` 及其紧随的重复段落，确保 Hook 生活情境自成一体，语言生动自然。
  2. **重塑第 5 步（Verfahrensvergleich）**：
     - **严禁**出现 `$x_1$`, `$x_2$`, `$d = x_2 - x_1$`, `Kennzahl`, `Formel`, `Rechnung`。
     - **改为学科真实的双向考场方法对比**：
       - 例如 SoWi（社会市场经济）：对比「市场自发均衡机制（Allokationseffizienz）」与「国家秩序干预机制（Sozialer Ausgleich / Preiskontrolle）」；
       - 例如 Philo（康德绝对命令）：对比「假言命令（Hypothetischer Imperativ: Zweck-Mittel-Rationalität）」与「定言命令（Kategorischer Imperativ: Universalisierungsformel）」；
       - 例如 SoWi（经济指标）：对比「宏观增长指标（BIP）」与「分配公正指标（Gini-Koeffizient）」。
  3. **重塑 Fehlvorstellung（常见思维陷阱）**：
     - 替换掉有关“方法(i)和方法(ii)”的空洞套话，改为真实的考场高频错因（例如：“学生常误以为‘自由竞争’等于‘完全无政府干预’，忽略了秩序政策（Ordnungspolitik）是竞争的前提”）。
  4. **重塑第 8 步（Takeaway & Reflexion）**：
     - 标题改为：`## Schritt 8 — reflexion: Takeaway & Metakognitive Reflexion`；
     - `Takeaway-Satz` 与 `REFLEXION` 中的提问必须与本课政治/哲学/社会学主题高度相关，严禁出现公式与变量计算。

### 任务包 B（P1 结构）：规范全量 269 篇文件的第 8 步小节标注
- **改写规则**：
  将全部课件中的：
  ```markdown
  ## Schritt 8 — entdecken: Takeaway & Metakognitive Reflexion
  ```
  规范替换为：
  ```markdown
  ## Schritt 8 — reflexion: Takeaway & Metakognitive Reflexion
  ```
  （如果末尾有具体主题，可保留具名主题，例如 `## Schritt 8 — reflexion: Soziale Marktwirtschaft Takeaway`）。

### 任务包 C（P1 质量）：为 S6 与 S7 补充具名知识点标题
- **改写规则**：
  消除千篇一律的 `## Schritt 6 — check: Verständnisprüfung` 与 `## Schritt 7 — szenario: Klausurtransfer & Rubric`，在冒号后追加具体学科知识点：
  - 示例：`## Schritt 6 — check: Selbsttest zu Mindestlohn & Ordnungspolitik`
  - 示例：`## Schritt 7 — szenario: Bundestagsdebatte zum Mindestlohn`

---

## 五、外部 AI 改写提示词模版（Prompt Template）

将以下提示词完整交付给外部 AI 助手即可执行：

````text
【任务】：请根据《Aussen-AI Bugfix und Pedagogy Sanierungsplan》标准，对给定的 Lernreise Markdown 课件进行深度内容清洗与教学法重塑。

【需处理的文件】：[传入具体文件路径，如 Lernreise/Sowi-Soziale-Marktwirtschaft-DE-L1.md]

【硬性修改要求】：
1. 提示词痕迹清除：
   - 彻底删除所有 "Ausgangslage aus der Vorlage:"、"Vorlagentext:" 等脚手架残留文字。

2. 根除数理公式跨学科泄漏（特别是文科/社科课件）：
   - 全文严禁在文科中出现 "$x_1$", "$x_2$", "$d = x_2 - x_1$", "Kennzahl" 等数学占位代码。
   - Schritt 5（Verfahrensvergleich）必须改为该学科真实的两种理论/考场分析路径对比（如：纯市场自发调节 vs 国家秩序干预）。
   - Fehlvorstellung 必须改为该学科德国高中生在 Klausur 常见概念混淆。
   - Schritt 8（Takeaway）的 Takeaway-Satz 与两道元认知反思题目必须直击本科核心考点。

3. 小节标题与步骤类型校准：
   - Schritt 8 必须改为：`## Schritt 8 — reflexion: Takeaway & Metakognitive Reflexion`（使用 reflexion 代替 entdecken）。
   - Schritt 6 具名化：`## Schritt 6 — check: Selbsttest zu <Thema-Kern>`。
   - Schritt 7 具名化：`## Schritt 7 — szenario: <Klausur-Rolle & Thema>`。

4. 结构与格式要求：
   - 必须保持 8 步完整流程，包含 Anekdote 与 Fehlvorstellung。
   - 严禁出现未注册教具（只允许使用 osmose-lab, titration-lab, le-chatelier-sim, schiefe-ebene, kinematik-lab, box-optimizer, tangent-slider, gini-allocator, markt-sim, balance-board, highlighter, lego, oral-timer, formula）。
   - 纯德语课件严禁包含任何中文字符（零 CJK）。

【输出格式】：直接输出完整的经过修复重塑的 Markdown 文件全文。
````

---

## 六、验收门禁与验证流程

外部 AI 处理完成后，必须在终端执行以下四重校验，全部通过方可合并：

1. **教学法完整性与无泄漏校验**：
   ```powershell
   python scripts/audit-pedagogy-integrity.py
   ```
   *预期指标*：Prompt Leaks 必须归 0；Math Template Leaks 必须归 0；Schritt 8 entdecken 必须归 0。

2. **Obsidian Vault 格式门禁**：
   ```powershell
   python scripts/vault-check.py
   ```
   *预期指标*：PASS，badnames=0，badglossar=0，零警告。

3. **前端单元测试**：
   ```powershell
   npm run test:run
   ```
   *预期指标*：59 test files 全部 PASS。

4. **生产构建检查**：
   ```powershell
   cmd.exe /c npm run build
   ```
   *预期指标*：427 modules transformed，tsc -b 零报错，构建成功。
