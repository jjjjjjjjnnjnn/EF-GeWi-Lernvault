# 行星引力知识星系 —— 预设数据契约 (Preset Contract)

> 本目录存放 EF-GeWi-Lernvault 的**官方基准图谱数据**，供「课程专区 / 技能树」通过
> `scripts/export-vault-data.py` 编译进 App 内置图谱。
>
> **本文件是 10 门学科图谱生成的唯一共同依据。** 新增或修改任何图谱前先读这里；
> 契约层面的变更必须同时更新本文件与该学科图谱。

---

## 1. 文件清单

| 批次 | 文件名 | `fach` | 节点 ID 前缀 |
|---|---|---|---|
| 一 | `sowi-graph.json` | `SoWi` | `sowi-` |
| 一 | `philosophie-graph.json` | `Philosophie` | `philo-` |
| 一 | `mathe-graph.json` | `Mathe` | `mathe-` |
| 一 | `physik-graph.json` | `Physik` | `physik-` |
| 二 | `deutsch-graph.json` | `Deutsch` | `deutsch-` |
| 二 | `englisch-graph.json` | `Englisch` | `englisch-` |
| 二 | `chemie-graph.json` | `Chemie` | `chemie-` |
| 二 | `bio-graph.json` | `Bio` | `bio-` |
| 二 | `musik-graph.json` | `Musik` | `musik-` |
| 二 | `sport-graph.json` | `Sport` | `sport-` |

`fach` **只能取 `App-EF-Lernvault/src/fach.ts` 中 `FachId` 的 10 个规范值**。
注意 `Mathe` 的 `nameDE` 是 `Mathematik`，`SoWi` 的 `nameDE` 是 `Sozialwissenschaften` ——
写错会在注册表里多出一个学科键，导致学科筛选错位。

> 本目录**只放图谱 JSON**。`validate-graph-json.py` 的目录模式会递归解析目录下所有 `.json`，
> 任何非图谱 JSON 都会导致校验失败。

---

## 2. ID 契约

节点 `id` 必须匹配 `^[a-z0-9]+(-[a-z0-9]+)*$`：**仅小写字母、数字与单个连字符**。

- 禁大写、下划线、空格、点号
- 禁首尾连字符、禁连续连字符
- 变音符号必须转写：`ä->ae`、`ö->oe`、`ü->ue`、`ß->ss`
- 希腊字母与专有名词一律拼写展开（如 `nash`、`keynes`、`kant`）

`category` 值**允许大写**（kebab 规则只管 `id`），沿用「德语复合词 + 连字符」写法：
`Mikrooekonomie`、`Politisches-System`、`Materialgestuetztes-Schreiben`。

---

## 3. 冻结 ID（不可重命名、不可删除）

以下 21 个 ID 已随 App 发布，用户学习进度以 `localStorage["skill_tree_mastered_<fach>"]`
按 ID 持久化。**重命名等于清空用户进度**，只允许新增节点与新增依赖。

**SoWi（12）**
```
sowi-beduerfnis-knappheit    sowi-preismechanismus      sowi-marktversagen
sowi-marktformen-monopol     sowi-spieltheorie-nash     sowi-soziale-marktwirtschaft
sowi-magisches-viereck       sowi-ezb-geldpolitik       sowi-keynes-vs-friedman
sowi-soziale-schichtung      sowi-buergergeld-transfer  sowi-soziale-ungleichheit
```

**Mathe（5）**
```
mathe-aenderungsrate-sekante      mathe-lokale-ableitung-grenzwert
mathe-ableitungsregeln-polynom    mathe-kurvendiskussion-kriterien
mathe-extremwert-optimierung
```

**Philosophie（4）**
```
philo-hedonismus-bentham   philo-utilitarismus-mill
philo-kant-kategorischer-imperativ   philo-dilemma-diskurs
```

> `sowi-spieltheorie-nash` 现为 `Uni_Prep` 轨道锚点，扩容时保持其语义位置，不得下移轨道。

---

## 4. 分类星区契约（每科 4-6 区，每区 >= 6 节点）

每个星区在行星图上占一段等角扇区，节点数过少会没有视觉厚度。

| 学科 | 分类星区 (`category`) |
|---|---|
| **SoWi** | `Mikrooekonomie` · `Makrooekonomie` · `Ordnungspolitik` · `Sozialstruktur` · `Politisches-System` |
| **Philosophie** | `Utilitarismus` · `Deontologie` · `Anthropologie` · `Angewandte-Ethik` · `Erkenntnistheorie` |
| **Mathe** | `Analysis` · `Kurvendiskussion` · `Optimierungsmodell` · `Lineare-Algebra` · `Stochastik` |
| **Physik** | `Kinematik` · `Dynamik` · `Energie-Impuls` · `Elektrodynamik` · `Thermodynamik` · `Quantenphysik` |
| **Deutsch** | `Sachtextanalyse` · `Lyrik-Analyse` · `Drama-Analyse` · `Epik-Analyse` · `Sprachreflexion` · `Medien-und-Kommunikation` |
| **Englisch** | `Comprehension-and-Analysis` · `Mediation` · `Literature-and-Film` · `Society-and-Identity` · `Grammar-and-Stylistics` · `Landeskunde` |
| **Chemie** | `Atombau-und-Bindung` · `Chemische-Reaktionen` · `Kinetik-und-Gleichgewicht` · `Saeure-Base` · `Elektrochemie` · `Organische-Chemie` |
| **Bio** | `Zellbiologie` · `Stoffwechsel-Energie` · `Genetik` · `Neurobiologie` · `Oekologie` · `Evolution` |
| **Musik** | `Satzlehre-und-Form` · `Musikgeschichte-Epochen` · `Werkanalyse` · `Musik-und-Kontext` · `Aesthetik-und-Reflexion` |
| **Sport** | `Trainingslehre` · `Sportphysiologie` · `Bewegungslehre-und-Biomechanik` · `Sportpsychologie` · `Sportsoziologie` · `Sportmedizin-Praevention` |

---

## 5. 轨道配额（每科 60-80 节点）

| 轨道 | `curriculumTier` | `level` (AFB) | `stage` 建议 | 节点数 | 视觉半径 |
|---|---|---|---|---|---|
| I | `Sek_I` | 1 | `einfuehrung` | 8-12 | 180 px |
| II | `EF` | 1-2 | `einfuehrung` / `grundlagen` | 16-20 | 310 px |
| III | `Q1` | 2 | `grundlagen` / `vertiefung` | 14-18 | 440 px |
| IV | `Q2` | 2-3 | `synthese` / `klausur_praxis` | 10-14 | 570 px |
| V | `Uni_Prep` | 2-3 | `vertiefung` / `synthese` | 6-10 | 700 px |

`stage` 只能取：`einfuehrung` / `grundlagen` / `vertiefung` / `synthese` / `klausur_praxis`
`level` 只能取：`1` / `2` / `3`

---

## 6. DAG 不变量（构造性防死锁）

**核心不变量 —— 只要满足，图必然是 DAG，环检测不可能报错：**

> 每条前置依赖都必须满足
> `layerIndex(前置) < layerIndex(本节点)`
> 且 `tierRank(前置) <= tierRank(本节点)`
>
> `tierRank`：`Sek_I=0`、`EF=1`、`Q1=2`、`Q2=3`、`Uni_Prep=4`

`layerIndex` 用连续整数 `0..N`，数值越大越靠外环。

**拓扑硬性要求**

1. **无流水线**：每个星区内部至少 2 条并行支线（共享祖先但路径不同），不得出现单链星区
2. **多前置汇聚**：每科至少 3 个节点的 `prerequisites.length >= 3`；其中
   - >= 1 个为终极大题汇聚：`level: 3` + `stage: "klausur_praxis"` + `curriculumTier: "Q2"`
     （统一命名 `<prefix>-klausur-synthese-abitur`）
   - >= 1 个为 `Uni_Prep` 理论汇聚
3. **源头在外圈**：`Sek_I` 节点允许 `prerequisites: []`；`EF` 及以上必须有前置
4. **每星区贯穿多轨道**：不允许某星区全部挤在同一轨道

**边规范**

- `prerequisites` 中每一条都必须在 `edges[]` 里有对应的 `type: "prerequisite"` 边。
  应用侧 `detectGraphCycles()`（`skillTree.ts:204`）会把所有 `prerequisite` 边折进依赖图，
  与 CLI 只看 `prerequisites` 不同 —— 两者不一致会导致「CLI 过、App 挂」。
- edge `id` 用稳定可读格式 `e-<from>-<to>`；既有种子短 id（`e1`/`me1`/`pe1`）原样保留
- 另补 `synergy`（星区内共振）与少量 `cross_disciplinary` 边增强网状感。
  **这两类只在同文件内连线** —— 跨文件会悬空，因为注册表按学科隔离。

---

## 7. 标签词表 (`availableTags`)

标签取值收敛在下列三组内，根级 `availableTags` 汇总该科实际用到的全部标签。

- **知识属性**：`Formel` · `Modell` · `Axiom` · `Definition` · `Verfahren` · `Grafik` · `Quelle`
- **考点权重**：`Basiswissen` · `Klausur-Dauerbrenner` · `Schwerpunkt-2026` · `AFB-III` · `Uni-Prep`
- **专题领域**：各科自定，但必须在该科根级 `availableTags` 里出现

---

## 8. 字段规范

每节点必填（覆盖率要求 100%）：

| 字段 | 要求 |
|---|---|
| `id` / `fach` / `titleDE` / `titleZH` | 见 §2；德语用考纲规范术语，中文用通俗精准理解 |
| `summaryDE` / `summaryZH` | 一句话核心机理 / 因果推演 |
| `category` | 取自 §4 该科星区列表 |
| `curriculumTier` / `stage` / `level` | 见 §5 |
| `xpReward` | 60-200，随轨道层级递增 |
| `estimatedMinutes` | 6-30 |
| `prerequisites` | 见 §6 |
| `layerIndex` | 见 §6 不变量 |
| `keyFormulaOrSentence` | **可直接抄进 15 Notenpunkte 答卷的德语规范句或公式** |
| `commonFallacy` | 该考点最致命的 `Fehlvorstellung` / 失分陷阱 |
| `tags` | >= 2 个，取自 §7 |

**留空**：`coordinates` —— 引擎在注册与导入时会用
`computePlanetaryRadialLayout` 重算极坐标，手写坐标是无效数据。
`linkedReiseId` / `linkedNoteId` / `linkedToolId` 无实据就不要编。

---

## 9. 质量门禁

```bash
python scripts/validate-graph-json.py 00_META/presets/            # 目录模式，全部文件
python scripts/validate-graph-json.py 00_META/presets/<file>.json # 单文件
python scripts/check-graph-invariants.py                          # 结构不变量（§6 中 CLI 覆盖不到的部分）
```

期望每个文件：`[PASS]`，节点数 60-80，星区 4-6，**15NP 核心句覆盖率 100.0% /
易错误区覆盖率 100.0%**，AFB 三级均有分布，退出码 0，末尾输出
`[RESULT] 所有图谱数据均已 100% 通过死锁与质量门禁校验！`

---

## 10. 生成与接入

```bash
python scripts/export-vault-data.py
```

该脚本会读取本目录下所有 `*-graph.json`，编译为
`App-EF-Lernvault/src/generatedGraphs.ts`，由 `skillTree.ts` 的 `registerBuiltinGraphs()`
注册进 `graphRegistry`，App 启动即可用，无需手动粘贴导入。

> **不要手改 `generatedGraphs.ts`** —— 它带 `DO NOT EDIT MANUALLY` 头，每次生成都会被覆盖。


---

## 11. 内容依据 (Grounding)

节点内容**不得凭空杜撰**。生成前必须先读下列仓库内权威来源，节点术语、`Inhaltsfeld` 归类与
`operatoren` 必须与之一致：

| 来源 | 路径 | 用途 |
|---|---|---|
| 应用内课程树 | `App-EF-Lernvault/src/engine/curriculumTree.ts` | `CURRICULUM_TREES` 逐科给出 NRW KLP 的 `Inhaltsfeld`（含 `titleDE`/`titleZH`/`operatoren`/`noteKeywords`）。**星区划分与节点命名以此为准** |
| 考纲全文 | `00_META/Curriculum/Deutschland/<Fach>-Oberstufe.md` | 各科 24-70 KB 的 NRW KLP 原文摘编（EF/Q1/Q2 的 Inhaltsfelder 与 Schwerpunkte），带 `klp_heft` 出处 |
| 学科笔记 | `01_Deutsch/` … `10_Sport-mündl/` 下 `Texte-Analyse/` 或学科根目录 | 每科 21-51 篇既有笔记，是节点候选池；`linkedNoteId` 只能指向真实存在的文件 |
| 动词表 | `00_META/Curriculum/Deutschland/Operatoren-NRW-Alle-Faecher.md` | AFB 分级（`nennen`/`erlaeutern` -> AFB I，`analysieren` -> AFB II，`beurteilen`/`erwaegen` -> AFB III）与 `level` 取值 |
| 微课库 | `Lernreise/<id>.md` | `linkedReiseId` 只能指向真实存在的微课 |

**引证红线**：只写原创概念表述，不得抄录教材段落、Klausur 原题全文或第三方受版权保护的文本
（本仓库为 Public 仓库，见 `AGENTS.md` §4）。