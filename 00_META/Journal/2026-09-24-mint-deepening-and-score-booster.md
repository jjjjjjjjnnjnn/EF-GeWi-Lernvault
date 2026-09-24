---
fach: ""
thema: "MINT Cross-Subject Deepening from BWKI LinguaGraph and KlausurSim Scoring Diagnostic"
datum: 2026-09-24
tags: [EF, Mathe, Physik, Chemie, App, Meta]
---

# 2026-09-24 MINT 理科跨学科深度扩充与模考采分点诊断系统落地（`[Mathe]` / `[Physik]` / `[Chemie]` / `[App]` / `[Meta]`）

## 1. 用户指令与研究图谱挖掘
- **用户指令**：
  “开始进行。同时增加学科深度（增加笔记，思维导图，学科信息等内容 C:\Users\rongj\Desktop\学校\BWKI-2026-备战 这个里面研究包含化学，物理，数学的学习信息和节点相关性。如有需要可以采取）”。
- **外部知识图谱与课程标准深度提取**：
  - 调研 `BWKI-2026-备战` 核心图谱资产（`curriculum_nrw_math.json`、`curriculum_nrw_physik.json`、`chemistry_full.json`、`physics_full.json` 与 `linguaGraph.db`）；
  - 提取北威州（NRW）高中 EF 核心能力指标与中德跨学科关系链（导数 $\leftrightarrow$ 瞬时速度 $\leftrightarrow$ 反应速率；极值 $\leftrightarrow$ 能量最低原理 $\leftrightarrow$ 化学平衡）；
  - 严格遵守版权隔离：仅汲取学科概念图谱与考纲能力标准，全部笔记与题型均为 100% 独立原创与中德双语对齐。

## 2. 三大学科深度笔记与考纲词卡沉淀
1. **数学 (`03_Mathe`)**：
   - 新增核心笔记 `Ganzrationale-Funktionen-Kurvendiskussion.md`（整式多项式函数与曲线讨论：对称性、全局极限行为、零点求解、一阶与二阶导数极值拐点判据、实际极值应用建模四步法）；
   - 同步更新 `Mathe-EF-Basis.csv`，补充曲线讨论、极值问题、目标函数、边界值检验等核心词卡。
2. **物理 (`04_Physik`)**：
   - 新增核心笔记 `Newtonsche-Gesetze-und-Krafte.md`（牛顿运动定律与受力分析：惯性定律、动量定律 $\vec{F}=m\vec{a}$、反作用力定律、斜面受力分解、摩擦力模型、制动距离与机械能守恒）；
   - 同步更新 `Physik-EF-Basis.csv`，补充牛顿公理、下滑力、法向力、摩擦因数、机械能守恒等专业词卡。
3. **化学 (`05_Chemie`)**：
   - 新增核心笔记 `Saeure-Base-Gleichgewichte-pH-Wert.md`（布朗斯特酸碱质子理论：质子供体/受体、共轭酸碱对、水自耦电离与离子积常数 $K_w=10^{-14}$、对数 pH 标度、强弱酸解离与中和滴定化学计量比）；
   - 同步更新 `Chemie-EF-Basis.csv`，补充质子转移、水离子积、等当点、pOH 等专业词卡。

## 3. 提分系统与模考采分点诊断落地 (`KlausurSim.tsx`)
- **算子得分点合规诊断（Operatoren-Diagnose）**：
  在模考答卷评分面板中，根据题目的算子要求（AFB I / II / III）自动呈现考纲采分点达标提示（如 AFB III 必须提供明确评价准则、正反充分平衡与独立明确 Fazit）。
- **学术德语提分润色（Akademische Veredelung）**：
  为学生提供从口语日常表达（Alltagssprache）一键提升至学术德语（Fachsprache 与 Nominalstil 名词化结构）的高分句型建议，直接针对中国留学生在德语作答中的丢分痛点。
- **全学科图谱与数据源联动 (`data.ts`)**：
  将新增的数理化核心笔记、知识卡片与思维导图跨学科网络节点全面接入。

## 4. 验证与工程门禁
- **自动化测试**：55 个测试套件，354 个测试 **100% 全部通过**（`npm test -- --run`）。
- **生产编译**：`npm run build` 6.54s 零错误完成 Vite 构建。
- **知识库一致性**：`python scripts/vault-check.py` 严格检测通过（84 篇笔记，506 张卡片，206 条链接无断链，PASS）。
