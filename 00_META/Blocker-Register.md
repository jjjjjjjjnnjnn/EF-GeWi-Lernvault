---
fach: ""
thema: "Blocker-Register"
operatoren: []
klausurrelevant: false
datum: 2026-09-25
tags: [EF, Meta, Blocker]
---

# Blocker-Register — 阻塞项统一台账（唯一真相源）

> **本文件角色**：全项目所有「非代码可解」阻塞的唯一台账。每条含 **阻断什么 / 已如何脱敏 / 答案到达后的动作**。
> **配套**：[`Lehrkraft-Anfragen.md`](Lehrkraft-Anfragen.md)（可直接转发给老师的德语问询稿）。
> **范围说明**：本次仅处理 **A（老师问询）与 B（账号权限）** 两类；**C（真人验收）与 D（App 工程债）本轮暂缓**（用户指示：暂不涉及 web/App）。

---

## 0. 状态图例

| 符号 | 含义 |
|---|---|
| 🔴 | 阻断性 —— 不定就无法定稿 |
| 🟡 | 影响优先级排序 —— 内容可写但重心无法定 |
| 🟢 | 已完全脱敏 —— 答案到达只需小改 |
| ⏸️ | 本轮暂缓（涉及 web/App） |

---

## A. 老师问询类（内容走向）

> 完整德语问询稿见 [`Lehrkraft-Anfragen.md`](Lehrkraft-Anfragen.md)。**一次问完，不要分次打扰。**

| ID | 学科 | 问题 | 阻断什么 | 脱敏状态 | 答案到达后的动作 |
|---|---|---|---|---|---|
| **A1** | Deutsch | **Drama-Ganzschrift 书名 + 作者** | 全书专属内容（人物表、场次梗概、主题线索） | 🟢 已备 `Texte-Analyse/Drama-Ganzschrift-Kandidaten.md`（候选短名单 + 通用工具箱） | 补「本书专属人物表 + 场次梗概」两节；更新该文件与 `Lernbaum-Deutsch.md` §4 |
| **A2** | Deutsch | 平时 Klausur 日期 + ZKE 日期 | 复习节奏编排 | 🟡 | 填 `01_Deutsch/Lehrplan.md` §3 TODO；`ZKE-Deutsch-Timing-100min.md` 补实际日期 |
| **A3** | Deutsch | 本学期 Sachtext 话题 | 材料准备方向 | 🟡 | 在 `Sachtextanalyse-*` 两篇补「本期话题」段 |
| **A4** | Englisch | **EF 是否有 Lektüre（young adult novel），书名** | 文学段内容填充 | 🟢 结构不受影响（`Textsortenmerkmale-und-Belegtechniken.md` 的文学段已用通用写法） | 补「本书专属」段；更新 `Lernbaum-Englisch.md` §4 |
| **A5** | Englisch | **当届第三文化国家**（除 UK/USA 外） | `Orientierungswissen` 第三文化块 | 🟡 已按 **Nigeria** 写并标 `[据推断]`（`Bezugskultur-Nigeria-LK.md`） | 若答案 ≠ Nigeria → 该块需重建（约 1 篇）；若 = Nigeria → 去掉 `[据推断]` 标记 |
| **A6** | Englisch | 平时 Klausur 形式（Teil B = Sprachmittlung 还是 Hörverstehen）+ 日期 | EF 层训练重心 | 🟢 Abitur 层已确认 **DE→EN** `[已验证]`；EF 层有双轨 `Klausur-Teil-B-Doppelpack.md` | 填 `02_Englisch/Lehrplan.md` §3 TODO |
| **A7** | Musik | **Halbjahr-Thema（Epoche/Werk）** | §6 优先级排序（哪块先深挖） | 🟢 **已按 IF1–3 全覆盖写**（14 篇，不押单一主题）；`Musik-Halbjahr-IF1-IF2.md` 用「Beethoven/Klassik」假设版并标注 | 勾选 `09_Musik-mündl/Lehrplan.md` §3 TODO；把对应作品段从「假设」改为「确认」；重排 §6 优先级 |
| **A8** | Musik | **Hörbeispiele-Liste**（听力例曲清单） | 听辨训练素材 | 🟡 `Klangvorstellungen-Epochenvergleich.md` 提供巴洛克/浪漫/20 世纪锚点，可先练 | 建「例曲 → 对应笔记」对照表 |
| **A9** | Musik | 口试日期 + 时长 + **Kurs 类型（GK/LK）** | 备考规划 | 🟡 | 填 TODO；若为 LK → 检查 LK 专属篇是否需增补 |
| **A10** | Sport | **本校 Profil bildend 的 2 个 BF/SB** | 实践备考范围 | 🟡 现有 `Sport-Bewegungsanalyse.md` 仅 Weitsprung | 见 §A.1「Sport IF 组合速查」→ 定位对应笔记 |
| **A11** | Sport | **GK 选作 Akzentuierung 的 2 个 IF** 🔴 | **理论备考范围（最关键）** | 🟢 **已按 IF a–f 全覆盖写 26 篇**（不押注） | 见 §A.1 → 用速查表锁定必考 IF 的笔记 |
| **A12** | Sport | **Abitur 轨道**（第 4 Fach 口试+实践 / 普通口试） | 考试形式与训练形态 | 🟢 `Klausur-Training/Muendliche-Pruefung-Training.md` 已覆盖三轨道 | 圈定对应轨道，删掉不适用的分支 |
| **A13** | Sport | 实践考试项目 + 耐力测试形式（跑步距离/时长） | 实践训练计划 | 🟡 `Phasenmodelle-und-Beobachtungsbogen.md` 已备分相约定 | 建「项目 → 分相 → 观察表」实例 |
| **A14** | 多科 | **课程类型 GK/LK** | LK 专属笔记是否必需 | 🟢 LK 篇已标 `kursart: LK`，**不阻塞**（多写不亏） | 按实际课程类型圈定必读范围 |
| **A15** | Sport | 「可换短跑/铅球」是否指 BF/SB3 内 inhaltliche Kerne 替换 | 实践项目 | 🟡 当前为**假设，未经确认** | 确认后修正 `Sport-Bewegungsanalyse.md` |

### A.1 Sport「IF 组合速查」（应对 A10/A11 的核心脱敏件）

> 老师一旦回复「2 个 Akzentuierungs-IF」，用本表**直接定位该读哪几篇**，无需重写内容。

| 若选中的 IF | 必读笔记（`10_Sport-mündl/Texte-Analyse/`） | 优先级 |
|---|---|---|
| **a** Bewegungsstruktur und Bewegungslernen | `Motorisches-Lernen-Lernphasen.md` · `Lernmethoden-Vergleich.md` · `Informationsverarbeitung-im-Sport.md` · `Koordinative-Faehigkeiten.md` · `Sport-Bewegungsanalyse.md` | 🔴 第一重点，必考 |
| **b** Bewegungsgestaltung | `Gestaltungskriterien-und-Indikatoren.md` · `Improvisation-und-Variation.md` | 🟡 |
| **c** Wagnis und Verantwortung | `Handlungssteuerung-unter-Emotionen.md` · `Motivation-im-Sport.md` | 🟡 |
| **d** Leistung | `Belastungsgroessen.md` · `Trainingsprinzipien.md` · `Ausdauertraining-Methoden.md` · `Superkompensation-und-Anpassung.md` · `Energiebereitstellung.md` · `Muskulatur-und-Bewegung.md` · `LK-Leistungsdiagnostik.md` | 🔴 条目最多 |
| **e** Kooperation und Konkurrenz | `Regeln-und-Spielgelegenheiten.md` · `Fairness-und-Aggression.md` · `LK-Spielvermittlungsmodelle.md` · `LK-Steuerung-und-Manipulation.md` | 🟡 |
| **f** Gesundheit | `Gesundheit-Nutzen-und-Risiken.md` · `Fitness-als-Basis.md` · `LK-Gesundheitskonzepte.md` · `LK-Doping-und-unphysiologische-Massnahmen.md` | 🟡 |
| 跨 IF（必读，不随选择变） | `Klausur-Training/Muendliche-Pruefung-Training.md` · `Phasenmodelle-und-Beobachtungsbogen.md` · `Klausur-Training/Trainingsplan-Erstellen-LK.md` | 🔴 |

> **读法**：选中 2 个 IF → 读该 2 行 + 「跨 IF 必读行」。其余 IF 的笔记作为**对照背景**保留（口试可能追问跨 IF 关系）。

---

## B. 账号 / 权限类（真题弹药）

| ID | 缺口 | 阻断什么 | 现状与替代 |
|---|---|---|---|
| **B1** | **StanSi 近 3 年真题 + ZKE 往年卷**（JS 门 + 登录墙） | 真题实战 | 🟢 **已大幅替代**：`_Downloads/CURRICULUM/` 已固化 **218 个官方公开 PDF**，含 IQB Poolaufgaben 64 件 + Abitur-Beispielaufgaben 12 件 + ZKE 8 件 |
| **B2** | SESAM / FWU / eduki（需账号） | 补充素材 | 🟡 未获取；LEIFI/Serlo/bpb 免费源已覆盖大部分 |
| **B3** | **Notenlehre Stufe 4 AB PDF 损坏**（恰好截断 256.0 KiB、无 `%%EOF`、0 页可读） | Musik 一个作业页 | 🔴 需**重发**或改用**照片**（`§5b` 已有公开结构反推的假设版） |
| **B4** | Stark 纸质教辅需购买 | 商业题库 | 🟡 不引入（版权红线）；用官方公开题替代 |
| **B5** | IQB-HV mp3 仅播放器无直链 | 听力真题 | 🟡 未获取；`Hoer-und-Hoersehverstehen-QPhase.md` 用方法替代 |
| **B6** | Abitur-Vorgaben 2029+ 未发布 | 远期规划 | 🟢 不影响（当前备考期覆盖 27–29） |

---

## C. 真人验收类（⏸️ 本轮暂缓 — 涉及 web/App）

| ID | 项 | 说明 |
|---|---|---|
| C1 | V2–V4 走查 | 三档延迟体感 / 45 分钟整场模考 / 每日冲刺凑齐感 |
| C2 | 窄屏真机 | 1100px / 640px 换行裁切、480ms 翻卡手感、KaTeX 溢出 |
| C3 | Tauri 首次打包 | 需 VS2022 C++ workload + rust stable，从未实跑 |

> ⏸️ **用户指示：暂不涉及 web/App** → 本轮不动。恢复时见 `HANDOVER.md` §C。

---

## D. 工程债（⏸️ 本轮暂缓 — 全部在 App 侧）

| ID | 项 |
|---|---|
| D1 | `worker/compute.ts` 已转真 Web Worker 但零生产调用方 → 接线或删除 |
| D2 | `webllm-vendor` 6 MB chunk 警告 |
| D3 | `engine/diagram.ts` 4 处 SVG 约束色 |
| D4 | 云同步白名单新键须显式决策 |
| D5 | 官方时长表建议同时引用 BASS 13-32 Nr. 3.2 与 Nr. 6 |
| D6 | `.gitignore` 的 `probe*.py` 过宽 |
| D7 | **App 侧 `src/baum/*.ts` 仍是 EF 版数据**，需从新版 Markdown 派生 |

> ⏸️ **用户指示：暂不涉及 web/App** → 本轮不动。恢复时见 `HANDOVER.md` §D。

---

## E. 本轮已完成的「处理」（不依赖老师即可做）

| # | 动作 | 结果 |
|---|---|---|
| E1 | 建立本台账 | 全项目阻塞首次集中登记，含「答案到达后的动作」列 |
| E2 | 建立德语问询稿 | `Lehrkraft-Anfragen.md`，可直接转发 |
| E3 | Sport 脱敏 | §A.1「IF 组合速查」—— 任一 IF 组合都能 5 秒定位必读笔记 |
| E4 | 全科 IF/能力域覆盖 | 十科 224 篇笔记按 §4 施工图全量产出，**未押注任何未确认分支** |
| E5 | 真题替代 | 218 个官方公开 PDF 固化本地，部分替代登录墙真题 |
| E6 | 标记规范化 | 全库 `⏳ 待确认：` 统一指向本台账 |

---

## F. 待填模板（答案到达后直接套用）

> **目的**：把「等答案」变成「填空」。答案一到，只补占位符，**不重写结构**。
> 已确认无需模板的：**A1 戏剧**（`Drama-Ganzschrift-Kandidaten.md` 已有 `Universal-Werkzeugkasten`，与书名无关）、**A7 音乐**（IF1–3 已全覆盖）、**A11 体育**（IF a–f 已全覆盖 + §A.1 速查表）。

### F1. Deutsch · 戏剧专属段（A1 到达后 → 填入 `01_Deutsch/Texte-Analyse/Drama-Ganzschrift-Kandidaten.md`）

```markdown
## 4. Werk-Spezifisch: <Titel> (<Autor>, <Jahr>)

| 项 | 内容 |
|---|---|
| Gattung / Epoche | <…> |
| 作者与时代背景（3 句） | <…> |
| 核心人物（5–7 位） | <名 — 一句话功能> |
| 场次梗概（Akt I–V） | <每幕 2 句> |
| 核心冲突 | <…> |
| 主题线索（3 条） | <…> |
| 与 Universal-Werkzeugkasten 的对接点 | <哪几个分析工具可直接用> |
```

配套：更新 `Lernbaum-Deutsch.md` §4 状态；若为 Ib 对照，同步 `Drama-Strukturvergleich-QP.md`。

### F2. Englisch · 小说专属段（A4 到达后 → 填入 `02_Englisch/Texte-Analyse/Textsortenmerkmale-und-Belegtechniken.md`）

```markdown
## X. Lektüre-Spezifisch: <Titel> (<Autor>, <Jahr>)

| 项 | 内容 |
|---|---|
| Genre / Zielgruppe | young adult novel |
| Setting / Zeit | <…> |
| Hauptfiguren + Entwicklung | <…> |
| Zentrale Themen | <…> |
| Erzählperspektive | <…> |
| Typische Klausur-Aufgaben | character analysis / creative writing / comment |
```

### F3. Englisch · 第三文化国家替换清单（A5 回复 ≠ Nigeria 时）

- [ ] `Bezugskultur-Nigeria-LK.md` → 重命名 + 重写（国别史 / 殖民遗产 / 当代议题 / 世界观与历史视角）
- [ ] 去掉全文 `[据推断]` 标记（回复 = Nigeria 时**只做这一步**）
- [ ] `Lernbaum-Englisch.md` §4 更新
- [ ] `02_Englisch/Vokabeln-Anki` 对应术语卡替换

### F4. Musik · 学期作品专属段（A7 到达后）

```markdown
## X. Halbjahr-Thema: <Epoche/Werk>

| 项 | 内容 |
|---|---|
| Epoche / Werk | <…> |
| 核心参数特征 | <Melodik / Harmonik / Rhythmik / Klangfarbe / Form> |
| 与 IF1 / IF2 / IF3 的连接点 | <每个 IF 各 1 条> |
| 可能的 Hörbeispiele | <…> |
```

配套：重排 `Lernbaum-Musik.md` §4 优先级；勾选 `09_Musik-mündl/Lehrplan.md` §3 TODO。

### F5. Sport · IF 组合冲刺计划（A11 到达后）

1. 用 §A.1 速查表列出「选中的 2 行 + 跨 IF 必读行」的笔记清单
2. 排序：**理论骨架 → 口试话术 → 实践挂靠**
3. **未选中的 4 个 IF 笔记保留作对照背景**（口试可能追问跨 IF 关系），但不投入主力时间
4. 实践部分：按 A10/A13 圈定 BF/SB 与项目，用 `Phasenmodelle-und-Beobachtungsbogen.md` 建实例

---

## 变更记录

- 2026-09-25：创建。汇总 A（老师问询 15 项）· B（账号权限 6 项）· C（真人验收 3 项）· D（App 工程债 7 项）；本轮处理 A/B，C/D 暂缓（用户指示）。
