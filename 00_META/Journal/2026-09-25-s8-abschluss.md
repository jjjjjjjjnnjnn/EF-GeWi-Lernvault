---
fach: ""
thema: "S8 Notenproduktion Abschluss"
operatoren: []
klausurrelevant: false
datum: 2026-09-25
tags: [EF, Meta]
---

# S8 笔记生产 — 十科施工图全部完成

## 成果总览

| 指标 | 起始 | 现在 |
|---|---|---|
| 全库笔记 | 127 | **352**（+224 篇新笔记） |
| Anki 卡片 | 534 | **1396**（+862） |
| Glossar 术语行 | ~18 | **751**（+730 文科术语） |
| 本地官方源 | 少量 | **218 个 PDF / 127MB** |

## 十科完工状态（§4 施工图）

| 学科 | 产出/缺口 | 状态 |
|---|---|---|
| Deutsch | 16/16 | ✅ |
| Englisch | 20/20 | ✅ |
| Mathe | 23/23 | ✅ |
| Physik | 22/22 | ✅ |
| Chemie | 23/26 | ✅ 主体（余 3 项为改造既有文件） |
| Bio | 34/34 | ✅ |
| Philosophie | 21/22 | ✅ 主体 |
| SoWi | 25/25 | ✅ |
| Musik | 14/14 | ✅ |
| Sport | 26/26 | ✅ |

**合计 224/228 = 98.2%**。

## 关键补缺（本次最高价值）

1. **Sport 全科从 6 篇 → 26 篇**：IF a–f 全打通，含 IF d（Leistung/Trainingslehre）全套、IF e/f 全空白补齐、口试话术库、训练计划实操。**这是此前缺口最大的学科。**
2. **Bio Q 阶段两大真断层**：Genetik（中心法则/调控/突变/肿瘤/系谱）与 Ökologie（耐受曲线/物质循环/生态位/温室效应/种群动力学）从零建起，并显式命名「EF 无接口」。
3. **理科 LK 深层**：Physik LK-2/3/4（Schwingkreis 类比 / 现代量子 / 原子核）、Mathe LK（反常积分/正态分布=积分函数/参数族）、Chemie LK（热力学 ΔG/立体化学/染料/材料）。
4. **术语卡欠账清零**：10 科 csv 全部补入新术语，跨文科 Glossar 补 730 行。

## 大量下载（本地研究资产）

`_Downloads/CURRICULUM/`（**gitignored，绝不进仓库**）：

| 目录 | 数量 | 内容 |
|---|---|---|
| 各学科（10） | 34 | KLP 现行版 + 2027 新版、Formelsammlung、Nuklidkarte |
| `_Operatoren` | 13 | 10 科 Operatoren PDF |
| `_Abitur-Vorgaben` | 72 | Vorgaben 27–29、Konstruktion、Korrekturzeichen、Beispielaufgaben、ZKE |
| `_IQB` | 64 | 生物/化学/德语/英语/物理/数学 Poolaufgaben |
| `_China` | 21 | 教育部课标（2017年版2020年修订）全包 |

每个文件配 `.quelle.txt`（来源 URL + 许可 + 日期 + 「仅本地使用」声明）。**仅登记未下载**：BASS 13-32 Nr.6（仅 HTML，无 PDF 直链）。

## 执行教训（本轮新增）

1. **空响应 ≠ 失败**：agent 被限流/断网返回空响应时，文件可能**已部分写入**。必须 `git status` 核实后再决定重发。本次第四波 3 个 agent 中，2 个实际成功、1 个（理科 csv）确实没跑。
2. **csv 追加必须防重复**：首列术语在同一文件内重复会被 `vault-check` 判为 ERR。agent 须先建已有术语去重集合。
3. **Markdown 表格内禁用 `|`**：Glossar 有 1 行因例句含 `S(d|e)` 破坏表格结构，已修为 `S(d, e)`。
4. **每 agent 3–5 篇 + 「每篇写完立刻保存」**是本项目稳定吞吐的最优参数。

## 待办（非阻塞）

- Chemie 3 项「改造既有文件」（升级 `CN-Chemie-Tricks`、精简 `CN-Chemie-Training`）+ Philosophie 1 项
- App 侧 `src/baum/*.ts` 仍是 EF 版数据，需从新版 Markdown 派生
- **S9 建议**：把 `_Downloads/` 里的 IQB Poolaufgaben 与 Beispielaufgaben 系统转化为原创改编训练题，补进各科 `Klausur-Training/`

## 阻塞（需老师，未变）

Drama-Ganzschrift 书名 · EF young adult novel · 当届第三文化国家 · Musik Halbjahr-Thema · **Sport 2 个 Akzentuierungs-IF** · 课程类型 GK/LK。
