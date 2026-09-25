---
fach: ""
thema: "Notenproduktion Plan S8"
operatoren: []
klausurrelevant: false
datum: 2026-09-24
tags: [EF, Meta, Curriculum, Plan]
---

# 笔记生产计划（S8）— 十科全量扩充

> **上位文档**：[`00-Abi-Baum-Design.md`](00-Abi-Baum-Design.md)（设计总纲）· 十科 `Lernbaum-<Fach>.md` §4（施工图）
> **本文件角色**：S8 阶段的唯一施工宪法。定义产出标准、版权政策、协作协议与进度台账。
> **范围**：十科 §4 缺口清单合计 **228 项**目标笔记。

---

## 0. 目标与范围

| 学科 | 缺口数 | 施工图位置 | 最高优先项 |
|---|---|---|---|
| Mathe | 23 | `Lernbaum-Mathe.md` §4 | 《Basis und Linearkombination》·《Vom Extremwert zum Beweis》 |
| Physik | 22 | `Lernbaum-Physik.md` §4 | 《LK-DGL 前置包》·《Lorentzkraft 轨迹几何法》·《Impuls + 一维碰撞》 |
| Chemie | 26 | `Lernbaum-Chemie.md` §4 | 《MWG-zu-KS-Ableitungskette》·《Elektrochemie-Vier-Elemente-Raster》 |
| Bio | 34 | `Lernbaum-Bio.md` §4 | 《CN-Bio-Genetik-Rechenschema》· Meiose / Enzymkinetik / Signaltransduktion |
| Deutsch | 16 | `Lernbaum-Deutsch.md` §4 | 《Sprache-Ebenen-und-Varietaeten》·《Medien-Information-und-Partizipation》 |
| Englisch | 20 | `Lernbaum-Englisch.md` §4 | 《Sprechen-Muendliche-Abiturpruefung》·《Orientierungswissen-UK/USA》 |
| SoWi | 25 | `Lernbaum-SoWi.md` §4 | 《Wirtschaftspolitische-Konzeptionen》·《Ungleichheitsmodelle-Theorien》 |
| Philosophie | 22 | `Lernbaum-Philosophie.md` §4 | EF 层四篇（用户当前在读）+《Kontraktualismus 四家》 |
| Musik | 14 | `Lernbaum-Musik.md` §4 | IF3 全套（口试直接风险）·《Paradigmenwechsel》 |
| Sport | 26 | `Lernbaum-Sport.md` §4 | IF d（Leistung）全套 · 口试话术库 |
| **合计** | **228** | — | — |

**每篇笔记必须同时覆盖三要素**（用户明确要求）：① 知识点 ② 解题方法 ③ 真题/训练题。

---

## 1. 产出标准：八段笔记模板

模板文件：`Templates/Wissensnotiz-Template.md`。所有新笔记按其骨架，可增删节但**不得缺失 1/3/5 三节**。

```markdown
---
fach: <Fach>              # 固定词表，不可为空
thema: "<德语短标题>"
operatoren: [<官方动词>]   # 从 Operatoren-NRW-Alle-Faecher.md 取，无则 []
klausurrelevant: true
datum: 2026-09-24
tags: [EF, <Fach>, <IF/领域>]
stufe: "EF|Q1|Q2"
---

# <德语标题> (<中文标题>)

> **中文理解**：<3–6 句：这个概念是什么 / 在 KLP 里的位置 / 考试怎么考它>

## 1. 核心概念 (Kernbegriffe)
<表格：术语 DE | 中文 | EN | 定义或公式 | 备注>

## 2. 知识结构 (Struktur)
<要点式；中文理解在上，德语 Klausur-Satz 在下>

## 3. 解题方法 (Methoden)          ← 必填
<编号步骤；每步标注「这一步用的 KLP 工具」>

## 4. 🇨🇳 CN-Methode                  ← 理科必填，文科写「不适用」
<技法内容 / DE-Anschluss / 合规性 ✅⚠️ / Abitur 应用>

## 5. Klausur-Training              ← 必填
### 5.1 官方题型定位（Aufgabenart / Operator / AFB / 分值）
### 5.2 训练题（每题标来源层级）
### 5.3 Musterlösung（分步，标得分点）

## 6. Fehlerquellen（典型错误三行：辨别错 / 知识错 / 表达错）

## 7. Vernetzung（上下游节点 + 相关笔记 + 术语卡）
```

**质量门槛（不合格即返工）**：
1. **双语**：中文理解在上，德语 Klausur-Satz 在下。纯中文或纯德语均不合格。
2. **可考性**：第 3、5 节必须能直接用于备考，不许写百科式泛论。
3. **来源标注**：每条实质信息标 `[已验证]` / `[据推断]` / `[未获取到]`。
4. **不编造**：官方原文拿不到就写「未获取到」，比编造有价值。
5. **文件名无变音符号**（ä→ae / ö→oe / ü→ue / ß→ss）。

---

## 2. 版权与真题政策（Public 仓库，强制）

### 2.1 可用的真题来源（合法）

| 来源 | 性质 | 使用方式 |
|---|---|---|
| **IQB Abituraufgabenpools** | 全国共享公开题库 | 可引用**题干结构**（题型/Operator/材料类型） |
| **standardsicherung NRW** 的 Beispielaufgaben / 已公开 Zentralabitur 任务书 | 政府公开文件 | 同上；解析必须原创 |
| **ZKE 官方 Beispielaufgaben** | 公开 | 同上 |
| 各科 KLP 内的 Aufgabenbeispiele | 公开 | 同上 |

### 2.2 绝对禁止

- ❌ 出版社教辅（Stark / Klett Abitur-Training 等）的题目与解析原文
- ❌ 中国高考真题原题照搬（**只能原创改编**）
- ❌ 教材正文段落搬运
- ❌ 同学个人信息、学校内部文件全文

### 2.3 来源层级标注（每道题必标）

`[NRW-官方公开]` / `[NRW-改编]` / `[CN-改编]` / `[原创]`

> 铁律：**结构可引，原文不抄；解析必原创**。

---

## 3. 命名与路径

- **路径以各科 `Lernbaum-<Fach>.md` §4 表格的「目标笔记文件」列为准**，一字不改。
- 文件名 `Thema-DE-kebab-case.md`，无变音符号。
- 同一主题的多篇按 §4 给定的编号顺序。

---

## 4. 协作协议（agent 边界，防止写冲突）

| 角色 | 允许写 | 禁止写 |
|---|---|---|
| **subagent** | 仅其被分配的**笔记文件**（精确路径） | INDEX.md · Glossar · 任何 csv · 其他学科文件 · Lernbaum 树 |
| **主线程** | 全部 | — |

- 一波之内**一科只派一个 agent**（同科多篇由同一 agent 顺序产出），避免同文件冲突。
- INDEX / Glossar / csv 的同步**由主线程在波次校验后统一执行**，避免并行写冲突。
- 每波结束：`python scripts/vault-check.py` → 修错 → `git commit`。

---

## 5. 波次台账

> 状态：⬜ 未开始 · 🔄 进行中 · ✅ 已完成 · 数字 = 本次 S8 实际新增笔记数 / §4 缺口总数

| 学科 | 已产出 | 缺口总数 | 状态 |
|---|---|---|---|
| **Deutsch** | 16 | 16 | ✅ **完成** |
| **Englisch** | 20 | 20 | ✅ **完成** |
| **Mathe** | 23 | 23 | ✅ **完成** |
| **Physik** | 22 | 22 | ✅ **完成** |
| **Chemie** | 23 | 26 | ✅ **主体完成**（余 3 项为「升级/精简既有文件」的改造项，非新笔记） |
| **Bio** | 34 | 34 | ✅ **完成** |
| **Philosophie** | 21 | 22 | ✅ **主体完成**（余 1 项） |
| **SoWi** | 25 | 25 | ✅ **完成** |
| **Musik** | 14 | 14 | ✅ **完成** |
| **Sport** | 26 | 26 | ✅ **完成** |
| **合计** | **224** | **228** | **98.2%** |

**已完成波次**：W1（10 科首波）· W2（第二批）· W3（第三批）· W4（Sport/Bio 攻坚）· W5（术语卡补齐 + SoWi/Mathe/Physik 收官）· W6（Chemie/Philosophie/Musik 收官）

**附带成果**：
- **官方源本地化**：`_Downloads/CURRICULUM/` 下 **218 个官方 PDF / 127MB**（KLP 十科 · Operatoren · Abitur-Vorgaben 27–29 · IQB Poolaufgaben · 中国课标），全部配 `.quelle.txt`，全部 gitignored。
- **术语卡补齐**：Anki csv **534 → 1396 张**（+862）；`Glossar-DE-ZH-GeWi.md` **+730 行**（文科术语）。

**剩余（非阻塞）**：① Chemie 3 项「改造既有文件」任务（升级 `CN-Chemie-Tricks` / 精简 `CN-Chemie-Training` 等）；② Philosophie 1 项；③ App 侧 `src/baum/*.ts` 仍是 EF 版数据。

**进度索引**：[`../S8-Noten-Index.md`](../S8-Noten-Index.md)（224 篇逐条链接）。

---

## 6. 已知阻塞项（不影响结构，只影响内容填充）

| 阻塞 | 影响学科 | 处理 |
|---|---|---|
| Drama-Ganzschrift 书名未定 | Deutsch | 用「候选短名单 + 通用工具箱」策略 |
| EF young adult novel 未定 | Englisch | 结构照写，文学段留 `⏳ 待确认` |
| 当届第三文化国家未核实 | Englisch | 按 Nigeria 写并标 `[据推断]` |
| Musik Halbjahr-Thema 未定 | Musik | 按 IF 全覆盖写，不押单一主题 |
| **Sport 2 个 Akzentuierungs-IF 未定** | Sport | IF a–f 全写（不押注），标 `⏳` |
| 课程类型 GK/LK 未定 | 多科 | LK 专属笔记标 `[LK]`，不阻塞 |

---

## 变更记录

- 2026-09-24：创建。定义 S8 笔记生产阶段的产出标准（八段模板）、版权与真题政策、agent 协作边界、四波次计划与阻塞项。
