---
fach: ""
thema: "Curriculum Deepening Batch 2 & Fach-Lernbäume for All 10 Subjects"
datum: 2026-09-24
tags: [EF, Deutsch, Englisch, Philosophie, App, Meta]
---

# 2026-09-24 课程大纲深度扩展第二批与全10门学科独立学习树系统上线

## 1. 用户指令与核心目标
- **用户指令**：
  “开始进行。我希望是最后每个学科都能有自己的学习地图或者学习树一样的东西”
- **双重执行目标**：
  1. 落地全学科大纲深度化规划第二批（Batch 2 语言与人文社科领域：德语、英语、哲学）核心原创深度笔记与专业考纲词卡；
  2. 研发并上线**全学科独立大纲学习树系统（Fach-Lernbäume & Kompetenz-Lernlandkarten）**，实现 10 门高中 EF 学科均具备自己的 Inhaltsfelder 课程领域支柱、三阶段（Stufe 1~3）里程碑路径与关联笔记全景导航。

## 2. 知识库与数据同步明细
- **三大文科/语言原创深度笔记沉淀**：
  - **德语 (`01_Deutsch`)**：[Sachtextanalyse-Leserlenkung-und-Rhetorik.md](../../01_Deutsch/Sachtextanalyse-Leserlenkung-und-Rhetorik.md)（意义段落解构、修辞手法“形式-意图-功能”三步分析法、假托论据与逻辑谬误识别）；
  - **英语 (`02_Englisch`)**：[Mediation-und-Kommunikative-Strategien.md](../../02_Englisch/Mediation-und-Kommunikative-Strategien.md)（跨文化信息调解四大准则、受众与体裁格式对齐、本土文化专有名词解释、非字面改写策略）；
  - **哲学 (`07_Philosophie`)**：[Kant-Kategorischer-Imperativ-und-Maximenpruefung.md](../../07_Philosophie/Kant-Kategorischer-Imperativ-und-Maximenpruefung.md)（先验义务论体系、准则普遍化四步推演法、设想与意愿矛盾检验、自为目的公式与尊严边界）。
- **Anki 词卡库全面扩增（534 张，0 重复项）**：
  - `01_Deutsch/Vokabeln-Anki/Deutsch-EF-Phrasen.csv`：+4 卡片（das Scheinargument, die antithetische Zuspitzung, die pragmatische Leserintention, der Dreischritt der Rhetorikanalyse）；
  - `02_Englisch/Vokabeln-Anki/Englisch-EF-Phrasen.csv`：+4 卡片（cultural contextualization, target text format, selective mediation, address-oriented register）；
  - `07_Philosophie/Vokabeln-Anki/Philo-EF-Basis.csv`：+4 卡片（die Selbstzweckformel, die widerspruchsfreie Denkbarkeit, die widerspruchsfreie Wollbarkeit, der deontologische Pflichtbegriff）。
- **全局术语表与索引**：
  - `00_META/Glossar-DE-ZH-GeWi.md`：同步增补 12 条核心术语；
  - `00_META/INDEX.md`：对应章节追加新笔记标准跳转超链接。

## 3. 全学科学习树与课程地图引擎落地 (`curriculumTree.ts` & `Mindmap.tsx`)
- **全 10 门学科课程大纲学习树全景建模 (`src/engine/curriculumTree.ts`)**：
  - 完整涵盖北威州（NRW）Kernlehrplan (KLP) 教学大纲规范；
  - 为 Deutsch, Englisch, Philosophie, SoWi, Mathe, Physik, Chemie, Bio, Musik, Sport 各建立结构化的 `Inhaltsfelder`（IF 1, IF 2, IF 3...）；
  - 每个领域细化三级学习里程碑（Stufe 1 基础概念 $\to$ Stufe 2 核心剖析 $\to$ Stufe 3 模考综合），配套核心探究导向问题（Leitfragen DE/ZH）、算子标签与笔记匹配模式。
- **思维导图与学习树双模呈现 (`Mindmap.tsx`)**：
  - 顶部增加一键展开/折叠专属学习树控件（`[+] / [-]`）；
  - 选中具体学科时，即时呈现该学科的 **Kompetenz-Lernlandkarte**，包含官方考纲出处、模考核心题型重心与三大阶段分枝卡片，实时关联已沉淀的笔记，一键点击直达；
  - 选中全部（Alle）时，呈现 10 门学科大纲学习树总览看板，点击任意卡片即可下钻到该学科的专属学习树。

## 4. 质量门禁与验证指标
1. **知识库完整性检测**：
   - `python scripts/vault-check.py` 执行通过：
   - `notes=102 csv_rows=534(bad=0) index_links=227(missing=0) reisen=4 vergleich=0 PASS`。
2. **前端单元与合约测试**：
   - `npx vitest run`：**57 个测试套件，379 个测试 100% 全部通过**。
3. **前端生产构建验证**：
   - `npm run build`：TypeScript 类型检查与 Vite 生产构建 4.64s 零错误通过。
