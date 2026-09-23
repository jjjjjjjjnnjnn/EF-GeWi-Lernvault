---
fach: ""
thema: "Next-Gen-Learning-Engine"
datum: 2026-09-23
tags: [EF, Meta]
---

# 2026-09-23 下一代智能学习与认知引擎全栈落地（`[App] e20ed22`，31 套测试 189 题全绿）

## 取证与基线

- **单元测试**：31/31 个测试套件，**189/189 项单测 100% 全部通过**（新增 27 项全面覆盖 BM25、RRF、VaultGraph、Mastery/BKT、KlausurExtractor、DailyMix）。
- **生产打包**：`npm run build` 耗时 3.15s，零错误打包完成。
- **Vault 校验**：`python scripts/vault-check.py` 输出 `notes=38 csv_rows=203(bad=0) index_links=126(missing=0) reisen=4 vergleich=0 PASS`。

## 核心演进与功能落地

1. **Phase 1: 双引擎 RRF (Reciprocal Rank Fusion) 混合检索与双向图谱**
   - 新增 `src/engine/bm25.ts`：支持德语连词/标点切分、停用词过滤、法律条款结构识别（如 `Art. 9 Abs. 3 GG`）、中文字符双字切分与字段加权。
   - 新增 `src/engine/rrfSearch.ts`：实现倒数排名融合算法（$RRF = \frac{1}{60 + r_{bm25}} + \frac{1}{60 + r_{vec}}$），精准兼顾字面法条与语义意图。
   - 新增 `src/engine/vaultGraph.ts`：解析 `[[...]]` 与 Markdown 链接，构建入链/出链双向图谱，支持孤岛概念检测与邻域子图遍历。

2. **Phase 2: 贝叶斯认知诊断与考纲知识追踪（BKT / DKT）**
   - 新增 `src/engine/competencyMap.ts`：精准对齐 NRW 教学大纲各学科 Inhaltsfelder (IF 1-3)。
   - 新增 `src/engine/mastery.ts`：基于贝叶斯后验更新 $P(L_t)$ 动态追踪知识掌握度，并严格落实**用户自主开启/关闭学期管理（EF.1 / EF.2）**与数据归档/重置。
   - 新增 `src/components/MasteryRadar.tsx`：Tufte 风格可视化考纲掌握度进度条与学期切换控制栏。

3. **Phase 3: 德国高中 Oberstufe 全真三段式模考模拟器（Klausur-Simulator）**
   - 新增 `src/types/klausur.ts` 与 `src/engine/klausurExtractor.ts`：
     - **算法优先**从 38 篇笔记的 `Klausur-Training/`、`## 2. 争议/辨析` 与 `## 3. 德语 Klausur-Sätze` 中**动态抽取材料与三段式试卷**。
     - 严格遵循 KMK/NRW EPA 标准：AFB I (Darstellen 25P) + AFB II (Analysieren 45P) + AFB III (Beurteilen 30P) + Darstellungsleistung (20P)。
     - 输出官方 0 - 15 Notenpunkte 标准换算分、失分点分析，并提供一键追加 Fehlerlog 与同步写入知识雷达。
   - 新增 `src/modules/KlausurSim.tsx`：左侧材料研读 + 右侧 AFB 阶梯作答，配合 45 分钟倒计时与沉浸式考场体验。

4. **Phase 4: 自适应每日 15 分钟极速混合冲刺（Heute lernen - Daily Sprint）**
   - 新增 `src/engine/dailyMix.ts`：动态组装 4 张到期 FSRS 记忆卡 + 1 道 BKT 薄弱考点诊断题 + 1 组理论对比题。
   - 新增 `src/components/DailySprintModal.tsx`：全局顶栏一键呼出，流式单步穿插练习，记录连续学习打卡天数（Study Streak）。
   - 深度融入全局导航、命令面板（`Strg K`）与多语言体系。
