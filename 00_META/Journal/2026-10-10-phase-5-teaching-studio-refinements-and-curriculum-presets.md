---
fach: ""
thema: "TeachingStudio 体验进化与全科考纲预设扩充落地"
operatoren: [darstellen, analysieren, beurteilen]
klausurrelevant: false
datum: 2026-10-10
tags: [EF, Meta, App, TeachingStudio, Phase5, MicroWorld, Pacing]
---

# 教学研习工坊 (TeachingStudio) 体验进化与全科考纲预设扩充交付记录 (Phase 5)

## 1. 交付目标与背景

本阶段严格遵循模块化研发四步闭环（独立制作 -> 独立测试 -> 接入集成 -> 集成验证）与 Tufte 纯黑白学术纸墨宪法，吸收外部 AI 架构评估中针对使用阻尼、心流稳定与认知负荷的诊断意见，全面落地 Phase 5 核心体验进化与真实教材大纲扩充。

---

## 2. 核心交付成果

### ① 课型自适应编译器 (`lessonStepFlow.ts`)
- 支持 `interactive_deep`（默认 5 步完整微世界递进流）与 `concept_light`（轻量 3 步流：生活直觉 -> 核心机制 -> 15 NP 会考小测）；
- 避免纯文学、修辞或事实性概念陷入“为了交互而强塞微世界”的冗余认知负荷；
- 单测 5/5 绿灯覆盖。

### ② 真实北威州教材大纲预设库 (`bookIngestParser.ts`)
- 扩充北威州 Gymnasium EF 真实教学大纲预设：
  - **Deutsch**: Goethe《Faust I》（Gelehrtentragödie, Gretchenfrage, Pakt vs. Wette）；
  - **Mathe**: Differentialrechnung（Sekante zur Tangente, Differenzenquotient, Ableitungsregeln, Extremstellen）；
  - 保留并兼容原 SoWi、Philo、Physik 预设，全部满足 DAG 依赖校验与无环约束。

### ③ 智能复习欠账平滑衰减规划 (`pacingPlanner.ts`)
- 落地 `smartReschedulePlan` 算法：
  - 对积压逾期的复习任务自动降维为 3 分钟闪电温故（D+1 Blitz）；
  - 平滑分摊至未来 3-5 天，每日时间严格受控在阈值内，杜绝复习债务滚雪球雪崩导致弃坑。

### ④ 微世界沙盒宽容度、磁性吸附与直达推导 (`GenericMicroWorlds/`)
- **`VariableSliderBox.tsx`**：
  - 支持 `targetY` 目标通道与 ±5% 宽容判定带；
  - 接近目标平衡点时提供平滑磁性吸附辅助（`hasSnapped`）；
  - 20 秒超时触发苏格拉底脚手架启发；
  - 提供「直接推导 (Zur Herleitung)」直达通道，自动解算最优参数，杜绝因微操卡关。
- **`DilemmaBalanceScale.tsx`**：
  - 引入 `toleranceDeg`（默认 2.5°）反思平衡容错带与磁性水平归零吸附；
  - 提供「平衡推导直达 (Balance herstellen)」按钮，一键自动补齐对冲论据，确保哲学推演顺畅。

### ⑤ 错题沉淀降阻、会话恢复与触觉实体交互 (`LessonRunner/`)
- **`VictoryRewardScreen.tsx`**：
  - 提供 `[Patch kopieren]`（一键剪贴板复制）与 `[.md Herunterladen]`（一键导出标准补丁文件）双通道；
  - 新增内嵌式迷你审阅抽屉（Inline Review Drawer），支持会话错题批量核验；
- **`InteractiveLessonRunner.tsx`**：
  - 升级为 3px 几何阶段断点刻度轨（Step Ticks）；
  - 控件注入 2px 实体粗墨边框与 `active:translate-y-[1px]` 物理按压手感；
  - 支持 `localStorage` 会话进度自动持久化与断点一键恢复。

---

## 3. 工程质量与门禁审计

- **自动化单测与契约测试**：全量 89 个测试套件、681 项测试 100% PASS；
- **代码规范契约**：`modules.test.tsx` 严格扫描零 Emoji、零动态阴影、零 italic；
- **TypeScript 编译检查**：`cmd /c "npx tsc -b"` 0 报错；
- **知识库一致性审计**：`python scripts/vault-check.py` 418 篇笔记、1942 行 Anki 词卡 100% PASS。
