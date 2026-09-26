---
fach: ""
thema: "四套 Abitur 任务包 P1-P4 并行入库（十科模拟卷 + 文科材料 + 理科变式 + 口语问答链）"
operatoren: []
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Meta, Pruefungspakete]
---

# 2026-09-26 四套 Abitur 任务包 P1–P4 并行入库（22 份）

> 触发：用户以「外部高级大模型」身份下发四套可直接用于 Abitur 备考的工业级任务包（十科全真模拟卷 / 文科一手德语材料与政治漫画 / 理科变式与中国技法 / 四大学科口语问答链），要求多线程遵循并执行。

## 做了什么

1. **先建统一施工规格**（`.workbuddy-ai/specs/`，不进 git）：`_COMMON.md`（版权红线/命名/frontmatter/双语顺序/禁改共享文件/术语回报格式）+ `P1-Spec` / `P2-Spec` / `P3-Spec` / `P4-Spec`。22 条线程共用同一口径，避免各科漂移。
2. **22 条并行子线程**（general-purpose，文件所有权零重叠）分两波派发：
   - 波次 1：P1 十科模拟卷（10 线程）；
   - 波次 2：P2 四份 + P3 四份 + P4 四份（12 线程）——其中 3 条命中 429 限流，其中 Physik/Bio 两份实际已落盘，**Mathe 一份次日补跑**。
3. **统一口径落地**：十科模拟卷一律 **Gesamt 100 BE · AFB I 30 + AFB II 50 = 80 BE (80 %) · AFB III 20 BE (20 %)**，配同一张 15 分制换算表（100–95→15 … ≤24→0），八节固定结构（Prüfungsrahmen → Material → Aufgaben → EHZ → Notenstufen → Musterlösung → Zeitstrategie → Glossar）。
4. **材料全部原创仿写**：十科德语材料 493–646 Wörter（P2 正文 483–646；P4 陈述稿 1054–1164 Wörter），均在规定区间内，各文件材料处标 `⚠️ 原创仿写 Modelltext`；人名/机构/统计/漫画/听例一律虚构。
5. **三处同步（AGENTS.md §3）**：
   - 新建总入口 [`00_META/Pruefungspakete-Uebersicht.md`](../Pruefungspakete-Uebersicht.md)（四包一览 + 80:20 口径 + 15 分表 + 三轮打法 + 版权声明 + ⏳ 清单）；
   - `00_META/INDEX.md`：META 段加总入口链接 + 新增「考试包 P1–P4」小节（22 条链接）；
   - `00_META/Glossar-DE-ZH-GeWi.md`：**去重合并 +120 行**（跳过 13 条重复），797 → 917 行；
   - `00_META/Blocker-Register.md`：新增 **§G（7 项 ⏳ + 已就绪部分）** 与变更记录。
6. **门禁**：`python scripts/vault-check.py` → **PASS**（notes=**383**（361→383，+22）csv_rows=1595(bad=0) index_links=283(missing=0) reisen=70 badnames=0 badglossar=0）。

## 关键判定与经验

- **子线程 429 限流 ≠ 未落盘**：报错发生在子线程后续模型调用时，文件可能已写入。**必须用 `ls`/`wc` 复核真实文件系统再决定是否补跑**，否则会重复劳动（本次 Physik/Bio 即属此例，实际已完整 6 节）。
- **共享文件必须单写者**：22 条线程一律禁止碰 INDEX / Glossar / Lehrplan，术语以「待合并清单」回报主线程，由主线程用一个去重脚本（`.workbuddy-ai/specs/merge_glossar.py`）统一合并 —— 否则并发写会互相覆盖。
- **规格里的一处笔误被下游发现**：P1-Spec §5 原文把 Notenpunkte 4 档写成「1=4−」，与实际 NRW 换算（4 Punkte = 4−、1 Punkt = 5−）不符；SoWi 线程主动标注了该冲突。已按通用换算统一，规格文件同步修正。

## 待办 / 阻塞

- §G 7 项待老师口径（时长 / Punkte-Raster / 口试学科与权重 / EF 进度 / Englisch Teil B 形态），**均不影响现在开练**。
- 可选后续：把 P1 十卷的 EHZ 接入 App `KlausurSim`（现为「Erwartungshorizont einblenden」自评模式）；P4 四份的 Hörbeispiel 需考前替换为真实听例。
- 未做：git commit（22 份跨十科，按铁律「一次只做一科一 commit」，建议分批提交或由用户决定）。
