---
fach: ""
thema: "Extensible Knowledge Graph Architecture"
operatoren: []
klausurrelevant: false
datum: 2026-10-08
tags: [EF, Meta, Architecture]
---

# 【学科知识图谱与可插拔技能树】架构逻辑与扩展规约

> 核心目标：以学科为边界、以单个学科知识点及其认知学习流程为中枢，构建高度可拓展、节点随时拼插、学科动态可增、并为未来外部拆书与多源抓取预留标准插槽的高中提分知识树体系。

---

## 一、 架构愿景与设计哲学 (Vision & Philosophy)

在德国北威州高中高级阶段（Gymnasium Oberstufe / EF 至 Abitur）的备考过程中，传统知识呈现常存在三大缺陷：
1. **单点碎片化**：学生在背诵单一概念时“只见树木不见森林”，无法看清知识点之间的上下游依赖关系；
2. **缺乏通关进阶动力**：所有内容平铺直叙，缺少如技能树般由浅入深、逐级解锁的正向反馈与掌控感；
3. **架构死板不可拓展**：传统系统写死学科与结构，无法随时增删知识点、无法插入新学科、更无法平滑挂载外部教材与网络资源。

针对上述挑战，本架构确立以下四大核心哲学：
- **学科强分类，全域可扩展 (Subject Boundaries with Infinite Extensibility)**：
  每个学科拥有独立自治的有向无环图（DAG），标准 10 门考纲学科开箱即用，同时开放扩展注册表，支持用户和开发者随时动态开辟全新学科（如 Informatik、Kunst 等）；
- **节点即知识点，连线即学习流 (Nodes as Knowledge Points, Edges as Learning Flows)**：
  每个节点锚定具体可考核的考纲知识点，连线刻画由概念引入到建模、深化、直至会考实战的真实认知顺序；
- **纯函数式可插拔 (Hot-Pluggable Operators)**：
  知识点与连线支持自由插拔增删，内置拓扑排序与防死锁环检测算法（Cycle Detection），杜绝循环依赖；
- **内外资源双重挂载 (Native & External Sockets)**：
  内部无缝连接微课、考纲笔记与实验仿真教具；外部预留标准资源插槽，为后续**自动拆书、网页抓取与视频索引**奠定坚实的数据模型底座。

---

## 二、 核心数据模型契约 (Data Schema)

已在 `App-EF-Lernvault/src/engine/skillTree.ts` 中完成工业级强类型落地：

### 1. 知识点核心定义 (`KnowledgeNode`)

```typescript
export interface KnowledgeNode {
  readonly id: string;                               // 唯一标识 (kebab-case，如 "sowi-preismechanismus")
  readonly fach: SubjectKey;                         // 所属学科 (支持标准 FachId 或自定义学科字符串)
  readonly titleDE: string;                          // 德语考纲标准术语
  readonly titleZH: string;                          // 中文通俗理解
  readonly summaryDE?: string;                       // 德语文论核心机理
  readonly summaryZH?: string;                       // 中文因果推演逻辑
  readonly category?: string;                        // 所属核心分类星区 (如 "Mikrooekonomie", "Analysis")
  readonly subdiscipline?: string;                   // 二级子学科 / 研习专题
  readonly curriculumTier?: CurriculumTier | string; // 学段分级 (Sek_I / EF / Q1 / Q2 / Uni_Prep)
  readonly stage: LearningStage;                     // 进阶阶段 (einfuehrung -> grundlagen -> vertiefung -> synthese -> klausur_praxis)
  readonly level: CognitiveLevel;                    // 认知深度 AFB I, II, III (1, 2, 3)
  readonly xpReward: number;                         // 通关奖励经验值 (60 - 160 XP)
  readonly estimatedMinutes: number;                 // 建议专注耗时 (如 8 - 15 分钟)
  readonly prerequisites: readonly string[];          // 前置依赖知识点 ID 列表
  readonly unlockLogic?: "AND" | "OR";               // 解锁逻辑门 (默认 AND: 需全部前置掌握)
  readonly keyFormulaOrSentence?: string;            // 会考 15 NP 得分核心句或数学公式
  readonly commonFallacy?: string;                   // 典型易错误区 (Fehlvorstellung)
  readonly klausurTip?: string;                      // 审题与作答踩分技巧
  
  // 原生系统连接槽位
  readonly linkedReiseId?: string;                   // 关联探究式微课 ID (Lernreise)
  readonly linkedNoteId?: string;                    // 关联八段式考纲笔记路径
  readonly linkedToolId?: string;                    // 关联仿真教具 ID (如 markt-sim, ethik-waage)
  readonly linkedCardIds?: readonly string[];        // 关联 Anki 词卡 ID 列表
  
  // 外部信息挂载插槽 (为后期自动拆书、网页/视频抓取预留)
  readonly externalResources?: readonly ExternalResourceSlot[];
  readonly extractionMeta?: ExtractionMetadata;
  
  // 画布排布与元数据
  readonly coordinates?: { readonly x: number; readonly y: number };
  readonly radialPosition?: { readonly orbitRadius: number; readonly angleDeg: number }; // 行星引力极坐标 (由布局算法写入)
  readonly layerIndex?: number;                      // 逻辑推进层级 (0, 1, 2, 3, 4)
  readonly isCustom?: boolean;                       // 是否为用户自主添加/拼插的知识点
  readonly tags?: readonly string[];
}
```

### 2. 外部资源与提取元数据插槽 (`ExternalResourceSlot` & `ExtractionMetadata`)

```typescript
export interface ExternalResourceSlot {
  readonly id: string;
  readonly type: "book_chapter" | "web_page" | "video_clip" | "academic_paper" | "pdf_document";
  readonly title: string;
  readonly urlOrPath?: string;
  readonly summaryZH?: string;
  readonly summaryDE?: string;
  readonly timestampOrPage?: string;
  readonly addedAt: string;
  readonly isAutoExtracted?: boolean;
}

export interface ExtractionMetadata {
  readonly sourceTitle?: string;
  readonly sourceBookIsbn?: string;
  readonly extractorEngine?: "ai_pipeline" | "rule_parser" | "crawler" | "manual";
  readonly confidenceScore?: number; // 0.0 - 1.0
  readonly extractedAt?: string;
  readonly originalSnippet?: string;
}
```

### 3. 单学科全景图谱 (`SubjectKnowledgeGraph`)

```typescript
export interface SubjectKnowledgeGraph {
  readonly schemaVersion: 1;
  readonly fach: SubjectKey;
  readonly nameDE: string;
  readonly nameZH: string;
  readonly descriptionDE?: string;
  readonly descriptionZH?: string;
  readonly isCustomSubject?: boolean;                // 是否为自定义新增学科
  readonly categories?: readonly string[];           // 核心分类星区列表 (行星图扇区)
  readonly availableTags?: readonly string[];        // 常用多维标记列表
  readonly nodes: readonly KnowledgeNode[];
  readonly edges: readonly KnowledgeEdge[];
  readonly metadata?: {
    readonly version?: string;
    readonly author?: string;
    readonly updatedAt?: string;
    readonly sourceBook?: string;
  };
}
```

### 4. 知识点连线 (`KnowledgeEdge`)

```typescript
export type KnowledgeEdgeType =
  | "prerequisite"        // 严格前置依赖 (必须先学)
  | "synergy"             // 概念协同与启发关联 (推荐组合，不参与解锁门槛)
  | "cross_disciplinary"; // 跨学科辐射 (跨学科互通)

export interface KnowledgeEdge {
  readonly id: string;
  readonly from: string;                             // 源知识点 ID (前置/上游)
  readonly to: string;                               // 目标知识点 ID (后继/下游)
  readonly type: KnowledgeEdgeType;
  readonly descriptionDE?: string;
  readonly descriptionZH?: string;
}
```

> ⚠️ **一致性铁律**：`detectGraphCycles()` 除了读取节点的 `prerequisites` 字段，
> **还会把所有 `type === "prerequisite"` 的边一并折进依赖图**。因此 `edges[]` 中的
> prerequisite 边必须与 `prerequisites` 字段**完全一一对应**，否则会出现
> 「CLI 质量门禁通过、App 运行时拒绝」的撕裂状态。`synergy` 与 `cross_disciplinary`
> 边不参与环检测，可自由用于跨星区共振。

---

## 三、 动态可插拔与算法体系 (Pluggable Operators & Algorithms)

引擎为全图提供了不可变纯函数式的操作原语，保障任何操作均可安全回滚与状态重算：

```
                    ┌─────────────────────────┐
                    │  用户操作 / 拆书流水线  │
                    └────────────┬────────────┘
                                 │
     ┌───────────────────────────┼───────────────────────────┐
     ▼                           ▼                           ▼
insertKnowledgeNode    connectKnowledgeNodes      attachExternalResource
 (插入/拼插新知识点)        (动态连线建立依赖)         (挂载外部教材/网页)
     │                           │                           │
     └───────────────────────────┼───────────────────────────┘
                                 ▼
                     detectGraphCycles 环路拦截
                     (DFS 三色标记法，检测死锁)
                                 │
                     ┌───────────┴───────────┐
                     │ PASS (无环)           │ 发现闭环
                     ▼                       ▼
            topologicalSort (拓扑流)    回滚并提示阻断路径
                     │
                     ▼
         computeGraphUnlockStates
   (实时计算: locked / available / mastered)
```

1. **`computeGraphUnlockStates(graph, masteredNodeIds)`**：
   - 严格区分无前置自解锁、单前置解锁、多前置 AND 汇聚门禁与 OR 选择门禁；
2. **`detectGraphCycles(graph)`**：
   - 基于 DFS 三色标记法实时侦测返祖边，阻断循环前置死锁，保障图谱严格满足 DAG 拓扑；
3. **`topologicalSort(graph)`**：
   - 为学生计算最佳线性推荐研习序列，给出平滑的学习坡度；
4. **`getPrerequisiteChain(graph, targetNodeId)`**：
   - 针对任意高阶考点，一键逆向溯源该知识点的完整前置学习链路，明确突破重点；
5. **`calculateSubjectProgress(graph, masteredNodeIds)`**：
   - 实时生成学科完成度百分比、掌握知识点数、以及全图建议攻克的下一个目标。

---

## 四、 学科板块动态扩展机制 (Subject Extensibility)

系统提供全局单例注册中心 `graphRegistry`，支持跨学科管理与运行时新增学科：

* **内置标杆学科（开箱即用）**：
  - **兜底种子（3 科，随源码固化）**：`BUILTIN_SOWI_GRAPH` / `BUILTIN_MATHE_GRAPH` / `BUILTIN_PHILO_GRAPH`，分别 12 / 5 / 4 个知识点；当编译期图谱缺失时保证 App 仍可用（优雅降级）；
  - **编译期全景图谱（10 科，由预设编译）**：`00_META/presets/<fach>-graph.json` 经
    `scripts/export-vault-data.py` 编译为 `src/generatedGraphs.ts`（导出 `GENERATED_SUBJECT_GRAPHS`），
    在 `registerBuiltinGraphs()` 中按 `fach` 覆盖同名兜底图谱。每科 60-80 个知识点，
    贯穿 Sek_I / EF / Q1 / Q2 / Uni_Prep 五重同心轨道。图谱数据契约见 `00_META/presets/README.md`。
    > 生成物内部仅以 `import type` 反向引用本文件，故不构成运行时循环依赖；重跑
    > `python scripts/export-vault-data.py` 即可刷新，勿手改 `generatedGraphs.ts`。
* **用户/开发者自定义扩展学科**：
  ```typescript
  // 一行代码开辟全新的学科空间
  const infoGraph = graphRegistry.createCustomSubject(
    "Informatik",
    "Informatik",
    "计算机科学 (Informatik)",
    "面向北威州高中算法与面向对象建模"
  );
  
  // 自由插入知识点
  const updatedGraph = insertKnowledgeNode(infoGraph, myNewNode);
  graphRegistry.register(updatedGraph);
  ```

---

## 五、 后期规划记录：外部信息直接上传与提取规约 (Future Ingestion Specification)

> **注**：本节为已定稿的远期扩展技术契约，目前仅定义接口与协议，不强行引入网络爬虫或复杂的解析依赖。

### 1. 自动拆书提取管线 (Book Ingestion Pipeline)
* **目标**：用户上传教材 PDF、教学大纲或扫描目录后，系统自动解构出章节骨架并生成候选知识点树；
* **工作流**：
  1. **章节目录解构 (TOC Parsing)**：利用 `coursePipeline.ts` 中的多级目录解析器，将书本解构为三级层级：`Hauptkapitel` (领域) $\to$ `Thema` (主题) $\to$ `Wissenspunkt` (知识点)；
  2. **认知难度评估 (AFB Tagging)**：依据章节内的关键词与 Operatoren（如 *nennen/erläutern* 标定为 AFB I，*analysieren/untersuchen* 标定为 AFB II，*beurteilen/erörtern* 标定为 AFB III）；
  3. **前置依赖推断 (Prerequisite Inference)**：按照教材天然的章节先后顺序，自动建立初始线性前置连线；
  4. **元数据装配 (Slot Filling)**：自动在节点的 `extractionMeta` 中注入 `sourceTitle`、`sourceBookIsbn` 与原文字段。

### 2. 权威互联网网页与 OER 资源抓取 (Web / OER Ingestion)
* **目标**：针对北威州官方推荐的权威学术与教学资源（bpb 联邦政治教育中心、Serlo CC-BY-SA、LEIFI 物理、IQB 试题池），支持一键抓取并挂载；
* **数据流**：
  - 抓取页面标题、权威定义段落与来源 URL；
  - 生成 `ExternalResourceSlot`，注入指定知识点节点的 `externalResources` 数组；
  - 客户端点击知识点抽屉时，支持一键预览外部文献摘要并直达权威链接。

### 3. 音视频精讲片段索引 (Video Timestamp Ingestion)
* **目标**：为抽象理科知识点（如化学原电池、物理匀加速平抛）或文科历史演讲（如马丁·路德·金 I Have a Dream）挂载时间戳微片段；
* **数据格式**：
  - 存储于 `ExternalResourceSlot.timestampOrPage`（如 `"03:25 - 06:10"`），供学生点亮知识点后按需调取精准视频节点。

---

## 六、 门禁与工程验证标准

本架构严格遵从项目工程铁律：
1. **类型安全**：`cmd /c "npx tsc -b"` **0 错误**；
2. **单元测试**：`src/engine/skillTree.test.ts` **24/24 100% 绿灯 PASS**（另含 `SkillTreeCanvas.test.tsx` 8/8、`SkillTreeModal.test.tsx` 1/1）；
3. **零外部依赖新增**：纯原生 TypeScript + 数学几何与图算法实现，包体积零膨胀；
4. **Tufte 学术纸墨规范**：数据层完全独立解耦，为下一阶段纯黑白高对比度 SVG 画布渲染提供稳健保障。
