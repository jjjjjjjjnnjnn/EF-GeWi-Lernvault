---
fach: ""
thema: "互动研习工坊集成闭环与学科专区双雄架构"
operatoren: []
klausurrelevant: false
datum: 2026-10-12
tags: [EF, Meta, App]
---

# Journal — 互动研习工坊集成闭环与学科专区双雄架构

## 目标与定位
响应用户需求，将「互动研习工坊 (TeachingStudio / ActiveLearningWorkshop)」重塑为一个全集成的动态课程学习大板块，并与静态的「学科专区 (SubjectWorkspace)」形成清晰的双雄并立分工：
- **🏛️ 学科专区 (Subject Workspace · 静态数字图书馆)**：全景大纲树、笔记库检索室、单词卡盒、实验展厅、真题试卷卷宗。
- **⚡ 互动研习工坊 (Active Learning Workshop · 动态研学飞轮)**：围绕任务推进的闭环学习工作流（① 新知课程 ➔ ② 仿真操盘 ➔ ③ 笔记提炼 ➔ ④ 刷题自测 ➔ ⑤ 达标升级）。

## 核心交付与变动
1. **数据中枢与状态引擎**：
   - 新建 `src/modules/teaching/engine/topicHub.ts`，定义 `UnifiedTopicLoop` 结构，打通 `Lernreise`、`Labor`、`Library`、`Quiz` 四大板块映射与全学科核心预设；
   - 升级 `src/modules/teaching/engine/teachingStore.ts`，支持四步闭环进度追踪与持久化、防刷降权与 712 节点技能树广播联动；
   - 补齐 `topicHub.test.ts`（17 项全部通过）。
2. **动态学习闭环组件**：
   - 新建 `src/modules/teaching/components/ActiveLearningWorkshop/` 套件：
     - `ActiveLearningWorkshop.tsx`（主控台、阶段步进控制轨、快捷键支持）；
     - `PhaseLectureView.tsx`（阶段 1 · 认知两难与新知精讲）；
     - `PhaseLaborView.tsx`（阶段 2 · 真实 Labor/MicroWorld 仿真实验嵌入）；
     - `PhaseNotesView.tsx`（阶段 3 · CN-Methode、15 NP 核心金句与考场陷阱）；
     - `PhaseQuizView.tsx`（阶段 4 · 考场实战闯关与即时评分）；
     - `PhaseMasteryView.tsx`（阶段 5 · 五维能力雷达、错题导出与进阶）；
     - `ActiveLearningWorkshop.test.tsx`（7 项全部通过）。
3. **两极打通与路由集成**：
   - 升级 `TeachingStudio.tsx`，将 `loop`（动态闭环工坊）设为默认第一主视图；
   - 升级 `SubjectWorkspace.tsx`、`SkillTreeCanvas.tsx`、`SkillTreeModal.tsx`，在知识树、笔记卡片处增设“In Lern-Loop bearbeiten”入口，一键将上下文传递至研习工坊；
   - 升级 `App.tsx`，打通顶层上下文传参。
4. **Tufte 学术风与工程合规**：
   - 严格消除所有 emoji 与违规字符，采用纯黑白纸墨对比；
   - SVG 悬停放大显式绑定几何中心（`transformOrigin` 与 `transformBox: "view-box"`）。

## 门禁验证结果
- `python scripts/vault-check.py`：**PASS**
- `npx vitest run`：**96 个测试套件，763 项测试 100% 全部通过**
- `npm run build` (`tsc -b && vite build`)：**零错误通过**
