---
fach: ""
thema: "Journal 2026-10-08 Course Zone Skill Tree Roadmap"
operatoren: []
klausurrelevant: false
datum: 2026-10-08
tags: [EF, Meta, Journal]
---

# 2026-10-08 — 课程专区学科图谱与前置解锁技能树架构路线图规划

## 1. 业务目标与用户诉求 (Ziele)
用户明确指示：**“我希望增加课程专区，主要是为了让用户获得学科/课程/知识图谱（比如思维导图，或者蜘蛛网发散式，后面课程解锁需要学习前置课程）。进行这方面计划。到github或者互联网上查看有没有类似功能架构的或者类似功能或者想法的信息，开源仓库等。避免造轮子。进行开发流程设计。即将切换会话。目前只需要设计路线图，更新项目，交接项目，增加索引，维护项目等”**。

## 2. 开源调研与架构对标成果 (Open Source Benchmarking)
通过对 GitHub 顶级开源项目及流行学习平台的调研，提炼并锁定了最优技术选型：
1. **[Roadmap.sh](https://github.com/kamranahmedse/roadmap.sh)**：纯前端轻量化 JSON/YAML DAG 拓扑，按章节与主干路线分级，支持点击抽屉展示资源；
2. **[Boot.dev](https://boot.dev) / [Duolingo](https://www.duolingo.com)**：经典游戏化技能树，节点状态机分为 `locked` $\to$ `available` $\to$ `in_progress` $\to$ `mastered`，通过前置课程通关判定（Prerequisite Gatekeeper）点亮后续高阶关卡；
3. **[SkillTreePlatform](https://skilltreeplatform.dev)**：三级技能与微技能依赖架构（Subject $\to$ Skill Group $\to$ Skill）；
4. **技术栈与图形学选型**：坚守本项目**“零新增 npm 依赖”**与 **Tufte 纯黑白学术纸墨风**铁律，避免引入臃肿庞大的 React-Flow。复用现有 `Mindmap.tsx` 的极坐标放射算法与 `Lernbaum.tsx` 的树形渲染逻辑，基于纯原生 SVG 与 React 状态机自研 60FPS 硬件加速双模画布。

## 3. 全套规约与路线图设计落地 (Deliverables)
1. **全景方案规约文档**：产出并固化 [`00_META/Course-Zone-SkillTree-Roadmap.md`](../Course-Zone-SkillTree-Roadmap.md)；
2. **数据结构与解锁算法**：
   - 定义 `CourseSkillNode`、`SubjectSkillGraph` 与 `SkillNodeStatus`；
   - 编写 `computeGraphUnlockStates(graph, completedNodeIds)` 状态机判定算法；
3. **双模式可视化形态**：
   - 模式 A：RPG 通关技能树（纵向阶梯主干 + 支线探索 + 锁止标记）；
   - 模式 B：蜘蛛网放射星云图谱（中心枢纽发散辐射 + 极细贝塞尔虚实连线）；
4. **模块化研发四步流程**：
   - ① 独立制作 (`skillTree.ts` + `SkillTreeCanvas.tsx`)；
   - ② 独立测试（单测覆盖拓扑排序、解锁算法、SVG 几何中心防位移）；
   - ③ 接入集成（接入课程专区总线，与 `Reise` 微课通关打通闭环）；
   - ④ 集成验证（`npx tsc -b` 0 报错、`npm run build`、`vault-check.py` PASS）。

## 4. 交接与项目状态 (Handover)
- 更新 [`HANDOVER.md`](../../HANDOVER.md) 第一页最新状态与下一会话首要主线任务；
- 更新 [`00_META/INDEX.md`](../INDEX.md) 新增路线图全景索引；
- 门禁状态全绿：`scripts/vault-check.py` 报告 PASS。
