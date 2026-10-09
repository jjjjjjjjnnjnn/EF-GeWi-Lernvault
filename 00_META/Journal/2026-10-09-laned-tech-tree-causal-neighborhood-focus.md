---
fach: ""
thema: "Journal 2026-10-09 Laned Tech Tree Causal Neighborhood Focus"
operatoren: []
klausurrelevant: false
datum: 2026-10-09
tags: [EF, Meta, Journal]
---

# 2026-10-09 — 技能树认知模型重构：多泳道科技树网格、因果链悬停降噪与全科目录精简

## 1. 痛点洞察与方案决策

针对用户实测截图反馈与认知负荷瓶颈，深度重构技能树中枢：
1. **删除遮挡的全科目录弹窗**：
   - 痛点：顶栏 `全部学科 (10) ▾` 下拉弹窗容易出现遮挡，且与 `‹ 1/3 ›` 翻页器功能冗余；
   - 裁决：遵照用户指令彻底移除弹窗与按钮，精简释放顶栏左侧空间，保留 `‹ 1/3 ›` 纯单行翻页与 `+ 学科`。
2. **结构形态与因果解锁心智对齐（多泳道科技树 Laned Tech Tree）**：
   - 痛点：极坐标引力放射图虽有天体测绘美感，但当全量 70+ 节点同屏平铺时，有向因果前置关系交叉纵横，存在严重“蜘蛛网效应”；
   - 方案 A 落地：重构 `认知阶梯树` 为经典横向多泳道科技树（Tech Tree）：
     - 横向按领域分类划定平行轨道（Lanes）；
     - 纵深从左往右分为 5 大递进阶段：`SEK I · 基础认知 (AFB I)` ➔ `EF · 核心奠基 (AFB II)` ➔ `Q1 · 进阶机制 (AFB II)` ➔ `Q2 · 会考综合 (AFB III)` ➔ `UNI · 先修拓展 (AFB III)`；
     - 贝塞尔流向曲线从前置节点右侧指向后继节点左侧，单向演进逻辑一目了然。
3. **因果链交互聚焦与全局降噪（Causal Focus & Dimming）**：
   - 痛点：70+ 节点全量连线导致视线折返迷失，无法直观看出“学这个必须先学什么，学完能解锁什么”；
   - 方案 B 落地：
     - 默认状态下所有连线降为极淡发丝线（透明度 0.14~0.28），根除满盘蜘蛛网；
     - 鼠标悬停（Hover）或点击选中任意节点时，自动执行 DAG 递归因果链路探索（Ancestors & Successors）；
     - 背景无关节点深度压暗虚化（透明度降至 `0.12`，非相关连线降至 `0.03`）；
     - 链路中的上游前置节点点亮并附加 `[ ← 前置 ]` 角标，下游解锁节点附加 `[ → 解锁 ]` 角标，因果连线加粗为纯黑实线（`strokeWidth: 2.4`，纯墨箭头指示）。
4. **强对比三态视觉编码（Tufte 黑白纸墨规范，严禁 Emoji）**：
   - **已掌握 (Mastered)**：实心墨黑顶部标饰条 + 手绘矢量小勾 `✓` + `[ 掌握 ]` 反色墨底白字胶囊；
   - **待攻坚/可解锁 (Available - Hero State)**：视觉重心突出，实心墨瞳圆心聚焦 + 双发丝高反差外框 + `[ 待学 ]` 纯白底黑边胶囊；
   - **未解锁 (Locked)**：透明度降至 `0.38` + 虚线外框 + 纯矢量挂锁图标（Padlock SVG，严格手绘无 Emoji）+ `[ 锁定 ]` 淡墨胶囊。
5. **顶栏控制重组与进度胶囊前置**：
   - 视图模式切换采用高对比度 Segmented Toggle 并配专属极简 SVG 标识：圆环引力星轨图图标 vs 科技树横向分叉分支图标；
   - 进度前置展示状态胶囊：`[ 8/72 (11%) · 64 待攻坚 ]` 配高反差进度条。

---

## 2. 核心架构与修改文件

1. **`App-EF-Lernvault/src/components/SkillTreeCanvas.tsx`**：
   - 移除 `isCatalogOpen` 状态与全部相关遮挡弹窗，彻底精简顶栏；
   - 新增 `hoveredNodeId` 状态与 `causalAnalysis` 因果链路 DAG 递归拓扑分析器；
   - 重构 `layoutedNodes` 树形模式布局算法，生成 `(lane, column)` 网格坐标与 `lanesMeta`；
   - 在主画布 SVG 中注入 `tech-tree-background-layer`（阶段里程碑标牌、演进连线、泳道标题与横向轨道分隔线）；
   - 更新 `renderedEdges` 与行星/树形节点卡片的高对比三态与因果指示角标。
2. **`App-EF-Lernvault/src/components/SkillTreeCanvas.test.tsx`**：
   - 更新分页导航测试用例；
   - 新增因果链路悬停聚焦与科技树里程碑网格渲染的端到端测试。

---

## 3. 门禁验证与交付状态

- **TypeScript 严格编译**：`npx tsc -b` **PASS (0 错误)**；
- **组件单元测试**：`src/components/SkillTreeCanvas.test.tsx` **12/12 全部 PASS**；
- **模块规范契约**：`src/modules.test.tsx` **23/23 全部 PASS**（无 Emoji、无杂色、零 active shadow）；
- **全量知识库检测**：`python scripts/vault-check.py` **PASS**；
- **Git 提交交付**：已按仓库铁律提交 `[App]` 独立 commit (`41c0fcc`)。
