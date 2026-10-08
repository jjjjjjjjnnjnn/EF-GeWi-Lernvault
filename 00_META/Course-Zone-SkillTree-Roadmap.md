---
fach: ""
thema: "Course Zone Skill Tree Roadmap"
operatoren: []
klausurrelevant: false
datum: 2026-10-08
tags: [EF, Meta]
---

# 【课程专区】学科知识图谱与前置解锁技能树系统架构设计方案与路线图
> EF-GeWi-Lernvault 核心学习工作台体系升级规约 · 2026-10-08

---

## 一、 用户核心诉求与业务愿景 (Vision)

用户要求在 `EF-Lernvault` 中新增**「课程专区」**，核心解决两大痛点：
1. **全局认知与知识图谱全景**：学生学单科知识点时容易“只见树木不见森林”，需要有直观的**思维导图 / 蜘蛛网放射发散图谱 / 技能树**，全景呈现学科知识的内在机理与流向；
2. **通关式心流与前置依赖解锁机制（Prerequisite Unlock DAG）**：杜绝盲目刷高难度题或跳课，后面的高阶课时、AFB III 辩证议题、真题模拟，必须在前置基础概念/微课通关并自测达标后，方可由灰变亮逐步解锁，形成如 RPG 游戏技能树般欲罢不能的正向成长反馈。

---

## 二、 开源生态调研与架构对标（避免重复造轮子）

为了避免闭门造车和重新发明轮子，我们深入调研了 GitHub 与工业界成熟的开源技能图谱与依赖解锁架构：

| 对标项目 / 体系 | 架构哲学与核心技术 | 对本项目的价值与复用策略 |
|---|---|---|
| **[kamranahmedse/roadmap.sh](https://github.com/kamranahmedse/roadmap.sh)** | 纯前端驱动的现代化技术学习路线图，基于 JSON/YAML 定义知识点 DAG 节点与连线，支持节点展开详情抽屉与资源链接。 | **借鉴其节点元数据与关联表达**：无需臃肿后端，采用声明式 JSON 定义章节主干（Main Path）、支线（Side Quests）与考点拓展（Deep Dives）。 |
| **[Boot.dev](https://boot.dev) / [Duolingo](https://www.duolingo.com)** | 经典游戏化技能树（Skill Tree）。节点状态机分阶（`locked` $\to$ `available` $\to$ `in_progress` $\to$ `mastered`），严格的前置依赖门槛（Prerequisite Gatekeeper），完成奖励经验值 XP 与徽章。 | **完整移植其解锁状态机算法**：未满足前置依赖时节点呈现锁孔与提示“需先完成 [前置课时 A] 与 [前置课时 B]”；满足时触发解锁动效并点亮。 |
| **[NationalSecurityAgency/skills-service](https://github.com/NationalSecurityAgency/skills-service)** / **[SkillTreePlatform](https://skilltreeplatform.dev/)** | 企业级开源技能树微学习系统。具备科目（Subject） $\to$ 技能群（Skill Group） $\to$ 独立微技能（Skill）的三级依赖拓扑模型。 | **借鉴其三级学科空间映射**：将北威州高中 EF 考纲的 Inhaltsfeld（领域） $\to$ Schwerpunkt（重点） $\to$ Lernreise/Notiz 映射为三级依赖图。 |
| **React-Flow / D3-dag vs. 自研原生 SVG 引擎** | React-Flow 功能庞大但包体积增加 300KB+，违反本项目“零新增 npm 依赖”铁律；且外来库极难完美契合 Tufte 纯黑白纸墨学术风。 | **核心选型：基于项目中已有的原生数学几何与 SVG 引擎自研**：复用 `Mindmap.tsx`（已实现多中心放射极坐标发散 Nebula/Orbit 算法）与 `Lernbaum.tsx`（已实现紧凑树形拓扑），打造轻量级零依赖 60FPS 拓扑画布。 |

---

## 三、 系统核心架构设计 (Architecture)

### 1. 数据结构：有向无环图 (Skill Tree DAG)
```typescript
/** 节点通关状态机 */
export type SkillNodeStatus = "locked" | "available" | "in_progress" | "mastered";

/** 技能图谱节点定义 */
export interface CourseSkillNode {
  readonly id: string;                     // 唯一标识，如 "sowi-markt-01"
  readonly fach: FachId;                   // 学科，如 "SoWi", "Mathe"
  readonly titleDE: string;                // 德语名称（会考标准术语）
  readonly titleZH: string;                // 中文名称（通俗认知）
  readonly level: 1 | 2 | 3;               // 难度梯度（AFB I, II, III）
  readonly xp: number;                     // 通关奖励经验值（如 100 XP）
  readonly prerequisites: readonly string[];// 前置节点 ID 列表（必须全部通关才解锁）
  readonly linkedReiseId?: string;         // 关联的互动微课 ID（Lernreise）
  readonly linkedNoteId?: string;          // 关联的考纲笔记 ID（Library）
  readonly linkedToolId?: string;          // 关联的认知教具 ID（如 ethik-waage）
  readonly coordinates?: { x: number; y: number }; // 拓扑排布静态或动态坐标
}

/** 学科图谱全貌 */
export interface SubjectSkillGraph {
  readonly fach: FachId;
  readonly nodes: readonly CourseSkillNode[];
  readonly edges: readonly { from: string; to: string; type: "prerequisite" | "synergy" }[];
}
```

### 2. 解锁判定引擎 (Prerequisite Gatekeeper Engine)
```typescript
/**
 * 计算整个技能图谱各节点的实时解锁状态
 * @param graph 静态图谱结构
 * @param completedNodeIds 用户已完成通关的节点 ID 集合（从 xpStore / 本地存储加载）
 */
export function computeGraphUnlockStates(
  graph: SubjectSkillGraph,
  completedNodeIds: Set<string>
): Map<string, SkillNodeStatus> {
  const statusMap = new Map<string, SkillNodeStatus>();

  for (const node of graph.nodes) {
    if (completedNodeIds.has(node.id)) {
      statusMap.set(node.id, "mastered");
      continue;
    }

    // 检查所有前置依赖是否全部完成
    const allPrerequisitesMet = node.prerequisites.every((preId) => completedNodeIds.has(preId));

    if (allPrerequisitesMet) {
      statusMap.set(node.id, "available"); // 前置均已满足，解锁可学！
    } else {
      statusMap.set(node.id, "locked");    // 前置未齐，置灰加锁
    }
  }

  return statusMap;
}
```

### 3. 可视化双模呈现引擎 (Visual Dual-Mode Renderer)
遵循 Tufte 纯黑白纸墨宪法（禁用绿色与彩底卡片，全部采用高对比度 `--ink`、`--paper`、`--line`）：
1. **模式 A：RPG 通关技能树（Skill Tree Pathway）**：
   - 纵向/分层清晰递进，类似线性技能晋升树；
   - 包含主线节点（Core Milestones）、支线挑战（Bonus Quests）、BOSS关卡（全真会考模考）；
   - 节点带锁图标（手写内联 SVG Lock），悬停提示缺失的前置课时。
2. **模式 B：蜘蛛网 / 放射星云发散图谱（Spiderweb / Divergent Nebula）**：
   - 以学科核心原理为中心枢纽（Hub），向四周呈同心圆/发散蜘蛛网辐射扩展；
   - 连线采用 SVG 极细发丝线（贝塞尔弧线），若连线两端已解锁则连线高亮墨色，若未解锁则呈现半透明虚线（`stroke-dasharray="3,3"`）。

---

## 四、 模块化研发设计流程 (Process Design)

严格遵循 `AGENTS.md` 四步闭环铁律：

1. **① 独立制作 (Isolate & Build)**：
   - 新建 `App-EF-Lernvault/src/engine/skillTree.ts`（拓扑数据结构、依赖计算、拓扑排序、防死锁环检测 Cycle Detection）；
   - 新建 `App-EF-Lernvault/src/components/SkillTreeCanvas.tsx`（纯 SVG 独立画布组件，支持缩放、拖拽平移、节点交互高亮）；
   - 严禁空壳页面，每个节点必须能够点击展开抽屉查看：考点详情、前置要求、关联微课直达按钮与教具沙盘。
2. **② 独立测试 (Standalone Test)**：
   - 编写 `skillTree.test.ts` 与 `SkillTreeCanvas.test.tsx`；
   - 测试覆盖：前置解锁判别、无前置节点自解锁、单链式解锁、多依赖汇聚解锁、SVG 缩放中心绑定（`transformOrigin` 居中防飘移）。
3. **③ 接入集成 (Integrate)**：
   - 在左侧主导航栏或顶栏聚合注册「课程专区 (`Kurs-Zone / SkillTree`)」；
   - 打通与 `Reise`（微课完成时回调 `xpStore.markDone(id)` 并通知更新解锁状态）的闭环联动。
4. **④ 集成回归验证 (E2E Regression Test)**：
   - 执行 `npx tsc -b` 0 报错；
   - 执行 `npm run build` 打包验证；
   - 执行 `python scripts/vault-check.py` 确保全库 PASS。

---

## 五、 四阶段实施路线图 (Roadmap)

* **阶段一：图谱数据拓扑模型与依赖解锁引擎 (Milestone 1)**：
  - 提取十大学科的课程树依赖映射表（已有的 356 门微课 + 412 篇笔记）；
  - 实现 `skillTree.ts`（DAG 依赖解析器、解锁状态机算法、单测 100% 绿灯）。
* **阶段二：Tufte 纯黑白原生 SVG 技能树画布研制 (Milestone 2)**：
  - 开发独立组件 `SkillTreeCanvas.tsx`（RPG 通关主干路线、锁止徽标、解锁微光动效、节点卡片、视口平移缩放）；
  - 编写并跑通组件交互单测。
* **阶段三：发散式蜘蛛网/星云图谱与多模切换 (Milestone 3)**：
  - 开发 `SpiderwebGraphCanvas.tsx`（极坐标发散蜘蛛网算法、同心环形轨道、跨学科协同连线）；
  - 支持一键在「RPG 技能树」与「发散蜘蛛网图谱」之间平滑切换。
* **阶段四：全局课程专区融合与会考闭环打通 (Milestone 4)**：
  - 注册 `App.tsx` 的全新工作区「课程专区」；
  - 联动 `Reise` 模块：学生通关微课后触发即时解锁庆祝动效，下一个节点点亮。
