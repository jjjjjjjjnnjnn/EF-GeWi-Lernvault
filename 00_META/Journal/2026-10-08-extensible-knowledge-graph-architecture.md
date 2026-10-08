---
fach: ""
thema: "Journal 2026-10-08 Extensible Knowledge Graph Architecture"
operatoren: []
klausurrelevant: false
datum: 2026-10-08
tags: [EF, Meta, Journal]
---

# 2026-10-08 — 学科知识图谱与可插拔技能树架构逻辑设计落地

## 1. 架构目标与对标实践 (Architektur-Ziele)
围绕用户核心指示：“注意这个板块的可拓展性。先创建架构逻辑等。我希望可以以学科分类，以单个学科知识点和学习流程为核心，树的节点是知识点。同时整个图可拓展，每个节点随时拼插（当然，学科板块也可以增加（支持自定义/增加学科）），以及外部信息可以直接上传（自动拆书提取，互联网/网页/视频信息抓取等，这是后期计划，目前只记录，不涉及）”。

我们在 `App-EF-Lernvault` 中独立研制并交付了全新的学科图谱与可插拔技能树核心引擎 (`src/engine/skillTree.ts`)：
1. **以学科分类且无限动态拓展 (`SubjectKey = FachId | string`)**：
   - 内置支持标准 10 门考纲学科，开箱即用；
   - 提供全局注册中心 `graphRegistry`，支持运行时通过 `createCustomSubject` 动态创建并注册全新的自定义学科（如 `Informatik` 计算机科学、`Kunst` 等）；
2. **以单个学科知识点 (`KnowledgeNode`) 为树节点**：
   - 节点即知识点，包含中德双语规范考纲术语、概念机理简述；
   - 显式建模认知难度 `level` (AFB I/II/III) 与建议专注耗时；
   - 提分武器库：会考 15 NP 得分核心句 (`keyFormulaOrSentence`)、典型易错误区 (`commonFallacy`) 与审题作答策略 (`klausurTip`)；
   - 原生资源插槽：关联探究式微课 (`linkedReiseId`)、考纲笔记 (`linkedNoteId`)、学科仿真教具 (`linkedToolId`) 与 Anki 词卡；
3. **以学习流程 (`LearningStage`) 为核心进阶轴**：
   - 严格遵循五阶认知递进：`einfuehrung` (概念引入) $\to$ `grundlagen` (模型建构) $\to$ `vertiefung` (双向深化) $\to$ `synthese` (结构整合) $\to$ `klausur_praxis` (会考实战)；
   - 支持多前置 AND 汇聚门禁与 OR 选择逻辑门；
   - 状态机四态流转：`locked` $\to$ `available` $\to$ `in_progress` $\to$ `mastered`；
4. **图谱与节点随时热插拔 (Hot-Pluggable Operators)**：
   - 纯函数式不可变操作原语：`insertKnowledgeNode` (插入/拼插)、`removeKnowledgeNode` (级联移除)、`connectKnowledgeNodes` (连线)、`disconnectKnowledgeNodes` (解绑)；
   - 防死锁环路拦截器 (`detectGraphCycles`)：基于 DFS 三色标记法实时侦测闭环死锁，阻止循环前置；
   - 拓扑学习流推演 (`topologicalSort`) 与目标知识点溯源链 (`getPrerequisiteChain`)；
5. **外部信息直接上传与提取的预留架构契约 (Ingestion Specification)**：
   - 在 `KnowledgeNode` 中预留 `externalResources: ExternalResourceSlot[]` 外部资源插槽（书籍章节、权威网页、视频时间戳片段、论文）；
   - 预留 `extractionMeta: ExtractionMetadata` 自动拆书提取元数据插槽；
   - 产出完整架构设计规范文档 `00_META/Extensible-Knowledge-Graph-Architecture.md`。

---

## 2. 质量门禁与全量验证
- **契约测试与代码整洁性治理**：将 `App.tsx`、`CoursePipelineModal.tsx`、`coursePipeline.ts`、`Settings.tsx` 中的非 ASCII 箭头符号 `➔` 统一替换为规范的纯文本 `->`，消除 Unicode 禁令报警；
- **单元测试 100% 绿灯**：
  - 新建 `src/engine/skillTree.test.ts`，16 个单元测试 100% 通过（涵盖状态机流转、AND/OR 门禁、拓扑排序、防死锁拦截、节点热插拔、自定义学科动态创建）；
  - `vitest run` 关键契约与业务测试 35/35 全部通过；
- **TypeScript 强类型检查**：`cmd /c "npx tsc -b"` **0 错误** 完美通过；
- **Vault 一致性**：更新 `00_META/INDEX.md` 索引链接，规范对齐。
