---
fach: ""
thema: "Curriculum Deepening Batch 1 MINT - Mathe, Physik, Chemie, Bio and App Sync"
datum: 2026-09-24
tags: [EF, Mathe, Physik, Chemie, Bio, App, Meta]
---

# 2026-09-24 课程大纲深度扩展第一批：MINT理科核心重难点与应用同步

## 1. 任务背景与执行目标
根据用户指令及《全学科课程大纲知识深度化与提分强化规划》（`curriculum_deepening_and_score_enhancement_plan.md`），基于北威州（NRW）Kernlehrplan (KLP) 教学大纲与概念图谱，全面推进知识库与前端应用的内容深度建设。
第一批次（Batch 1）聚焦 MINT 理科四大学科（数学、物理、化学、生物）的高频大题与核心概念：
1. **数学 (`03_Mathe`)**：`Steckbriefaufgaben-und-Funktionsanpassung.md`（待定系数法、函数重构建模、几何条件翻译与线性方程组解法）。
2. **物理 (`04_Physik`)**：`Gleichmaessig-beschleunigte-Bewegung-Freier-Fall.md`（匀加速直线运动、自由落体规律、重力加速度量纲与运动独立性叠加原理）。
3. **化学 (`05_Chemie`)**：`Zwischenmolekulare-Kraefte-und-Stoffeigenschaften.md`（分子间作用力层级、范德华力/偶极/氢键、沸点熔点与相似相溶机理）。
4. **生物 (`06_Bio`)**：`Biomembran-Transportmechanismen-und-Osmose.md`（流动镶嵌膜模型、通道/载体蛋白主动与被动运输、洋葱质壁分离与复原实验）。

## 2. 知识库与数据同步明细
- **原创深度笔记沉淀**：
  - 中文理解在上（直击思维痛点与物理/化学机制直观直觉）；
  - 德文高分 Klausur-Satz 在下（规范学科术语、算子结构与采分标准）。
- **Anki 词卡库扩充**：
  - `03_Mathe/Vokabeln-Anki/Mathe-EF-Basis.csv`：+4 卡片（Steckbriefaufgabe, Funktionsrekonstruktion, Bedingungsgleichung, Wendetangente）。
  - `04_Physik/Vokabeln-Anki/Physik-EF-Basis.csv`：+4 卡片（gleichmäßig beschleunigte Bewegung, freier Fall, Superpositionsprinzip, Bahnkurve）。
  - `05_Chemie/Vokabeln-Anki/Chemie-EF-Basis.csv`：+4 卡片（zwischenmolekulare Kräfte, Van-der-Waals-Kräfte, Dipol-Dipol-Wechselwirkung, Wasserstoffbrückenbindung）。
  - `06_Bio/Vokabeln-Anki/Bio-EF-Basis.csv`：+4 卡片（Carrierprotein, Kanalprotein, Plasmolyse, Deplasmolyse）。
  - 严格避免重复项，分号分隔 + UTF-8 编码。
- **全局术语表与索引**：
  - `00_META/Glossar-DE-ZH-GeWi.md`：同步增补 12 条数理化生核心术语中德释义。
  - `00_META/INDEX.md`：对应学科章节追加新笔记标准跳转超链接。
- **前端应用同步 (`App-EF-Lernvault/src/data.ts`)**：
  - 同步扩充 `mockNotes`：增补 `mathe-steckbrief`、`physik-freier-fall`、`chemie-zmk`、`bio-biomembran-osmose` 4 篇中德双语精要。
  - 同步扩充 `cards`：增补 `c24`~`c27` 四大学科代表性复习卡片。

## 3. 质量门禁与验证指标
1. **知识库完整性检测**：
   - `python scripts/vault-check.py` 执行通过：
   - `notes=88 csv_rows=522(bad=0) index_links=211(missing=0) reisen=4 vergleich=0 PASS`。
2. **前端单元与合约测试**：
   - `npm test -- --run`：55 个测试套件，354 个测试 **100% 全部通过**。
3. **前端构建验证**：
   - `npm run build`：TypeScript 类型检查与 Vite 生产打包零错误通过（6.46s）。
4. **本地服务状态**：
   - 持续健康运行在 `http://localhost:1420/`。

## 4. 下一步计划
- 继续推进 Batch 2（文科与语言学科深度化：德语文学分析与诗歌修辞、英语调解与非虚构文本论述、哲学规范伦理与认识论）。
