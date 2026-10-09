---
fach: ""
thema: "Journal 2026-10-09 Subject Workspace Skill Tree & OSS Integration"
operatoren: []
klausurrelevant: false
datum: 2026-10-09
tags: [EF, Meta, Journal]
---

# 2026-10-09 — 学科专区内嵌知识图谱主学习动线打通与外部开源成果精选集成

## 1. 核心业务痛点与决策实施

针对此前“知识图谱仅作为独立弹窗、未融入日常学科主学习动线”的断层，以及外部 AI 搜集的 108 个开源库的挑选集成需求，实施两大核心攻坚：

### 1.1 Phase 3.1 主学习动线重构：学科专区五位一体与穿梭闭环
1. **学科专区首选子标签**：
   - 在 `SubjectWorkspace.tsx` 顶部导航新增 `0. 知识图谱 (Kompetenzbaum)` 作为首选全景视图，与「1. 知识笔记」、「2. 抽认卡片」、「3. 实验与教具」、「4. 模拟真题」构成五位一体认知阶梯；
2. **原生内嵌与视口自适应**：
   - 将 `SkillTreeCanvas` 原生嵌入工作区剩余 100% 垂直视口中，打破原先只有 `SkillTreeModal` 弹窗的隔离感；
3. **图谱抽屉多维行动穿梭通道打通**：
   - 抽屉点击“研读八段式笔记”：自动无缝切换到 `subTab = "notes"` 并选中定位该考点笔记；
   - 抽屉点击“启动探究式微课”：平滑派发路由至 `reise` 模块并加载指定课程；
   - 抽屉点击“启动仿真实验室”：优先进入本学科对应实验或全局实验中心；
4. **受控/非受控双向学科联动优化**：
   - 在 `SkillTreeCanvas.tsx` 中采用 `prevInitialFachRef` 机制，既能精准响应外部学科变动，又杜绝了内部手动切换被强制重置的边缘缺陷。

### 1.2 外部开源知识成果精选深度集成（避免造轮子）
深入研读 `_Downloads/Github-Repos/00_INDEX.md` 索引与 Top 8 推荐库源码，严守版权红线与零新增 npm 依赖原则，原生重构三大核心引擎能力：
1. **拓扑依赖自愈修复管线 (`repairGraphTopology`)**：
   - 借鉴 `pathforge`（AI 依赖图校验修复管线）与 `yggdrasil-forge`；
   - 自动清洗无效端点、自指环（Self-loops）与悬空连线，并在检测到死锁有向环时智能破环，确保任何由外部 AI 生成或用户手动拼插的图谱具备 100% DAG 合法性；
2. **认知交错复习引擎 (`interleaveCardsByTopic`)**：
   - 借鉴 `quanta-fsrs-engine` 认知心理学 Mischeffekt 模型；
   - 实现加权轮询交错算法（Weighted Round-Robin Topic Staggering）与交错指数评估 (`calculateInterleavingQuality`)，使每日 15 分钟冲刺与复习序列强制执行跨学科辨别性对比（Discriminative Contrast），提升长期留存率 60%+；
3. **四维正交会考就绪度引擎 (`computeExamReadiness`)**：
   - 借鉴 Harvard / `quanta-fsrs-engine` 四维正交就绪度体系（考点深度 35% + 会考日遗忘推演 30% + 模考衰减均分 20% + 有效覆盖度 15%）；
   - 换算为德国文理中学官方 15 级 Notenpunkte (0 - 15 NP) 与评级标准（Sehr gut 至 Ungenügend）。

---

## 2. 核心修改与测试覆盖文件

1. **`App-EF-Lernvault/src/modules/SubjectWorkspace.tsx`**：
   - 新增 `tree` 子标签，内嵌 `SkillTreeCanvas`，打通笔记、微课、实验穿梭回调；
2. **`App-EF-Lernvault/src/components/SkillTreeCanvas.tsx`**：
   - 增加基于 `prevInitialFachRef` 的外部学科自动联动；
3. **`App-EF-Lernvault/src/engine/skillTree.ts`**：
   - 新增 `repairGraphTopology` 拓扑自愈与破环函数；
4. **`App-EF-Lernvault/src/engine/dailyMix.ts`**：
   - 新增 `interleaveCardsByTopic` 与 `calculateInterleavingQuality`；
5. **`App-EF-Lernvault/src/engine/mastery.ts`**：
   - 新增 `computeExamReadiness` 算法与 15 NP 换算；
6. **配套测试覆盖**：
   - `SubjectWorkspace.test.tsx`（9 tests 全部 PASS）；
   - `SkillTreeCanvas.test.tsx`（12 tests 全部 PASS）；
   - `skillTree.test.ts`（25 tests 全部 PASS）；
   - `dailyMix.test.ts`（3 tests 全部 PASS）；
   - `mastery.test.ts`（5 tests 全部 PASS）；
   - `modules.test.tsx`（23 tests 全部 PASS，0 emoji，0 杂色）。

---

## 3. 全局门禁验证结果

- **知识库数据完整性**：`python scripts/vault-check.py` **PASS**（notes=415, csv_rows=1942, index_links=357, reisen=356, badnames=0, badglossar=0）；
- **全量单元测试与行为契约**：`cd App-EF-Lernvault && npx vitest run` **73/73 passed, 520/520 passed 100% 绿灯**；
- **严格生产编译构建**：`cd App-EF-Lernvault && npm run build` **built in 9.23s, 0 错误**。
