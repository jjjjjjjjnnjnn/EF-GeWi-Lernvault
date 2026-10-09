---
fach: Meta
thema: "知识图谱全科学业宏观星图与跨学科聚合板块"
operatoren: [darstellen, analysieren]
klausurrelevant: false
datum: 2026-10-09
tags: [EF, Meta, App, UI, SkillTree, AlleFaecher]
---

# 2026-10-09 工作日志：知识图谱全科学业宏观星图与跨学科聚合板块

## 1. 任务背景与核心目标

根据用户明确需求（“目前知识图谱缺少‘所有学科’ 的聚合性板块。进行补充。这个页面自己特殊化设计（整体设计逻辑要和其他一样，但是可以特殊化，功能化）”），在恪守 **Tufte 纯黑白学术纸墨风** 与 **四步闭环模块化交付（独立制作 ➔ 独立测试 ➔ 接入集成 ➔ 集成验证）** 铁律的前提下，设计并研发了全新的全科宏观聚合总台：

1. **特殊化与高度功能化设计**：
   - **`astrolabe` 全科学术引力星盘**：以 2027 年高中毕业会考（Abitur 2027）为引力中心太阳，环绕 10 门考纲学科的极坐标星系核。每个学科外向辐射 AFB I/II/III 锚点卫星，并由纯矢量弧线动态织就四大跨学科引力连线网络；
   - **`matrix` 十科学阶阵列矩阵**：直观展示全科掌握率水平进度条、已精通/总考点数、三阶段标杆考点预览，并提供 `[ 深入该学科精细图谱 ➔ ]` 一键直达跳转；
   - **`synergies` 四大跨学科黄金融通战役流水线**：涵盖数理 Analysis-Kinetik、社哲 Rationalismus-Gerechtigkeit、生化 Membran-Transport、德哲 Rhetorik-Epistemologie 的前置因果推演链；
   - **全局 700+ 考点闪电检索**：顶栏内置模糊搜索，检索全科中德规范术语并提供高亮匹配，支持点击直开研习抽屉；
   - **全科学业宏观 KPI**：涵盖全科学考总知识点数、已精通总数、全局精通率以及 MINT（理科）vs GeWi（文科）学力平衡指数。

2. **模块化研发与无缝集成体验**：
   - **独立制作**：研制 [`AllSubjectsMacroView.tsx`](file:///C:/Users/rongj/Desktop/学习/App-EF-Lernvault/src/components/AllSubjectsMacroView.tsx)，严格绑定 SVG 中心变换；
   - **独立测试**：编写 [`AllSubjectsMacroView.test.tsx`](file:///C:/Users/rongj/Desktop/学习/App-EF-Lernvault/src/components/AllSubjectsMacroView.test.tsx)，5 项端到端单测 100% PASS；
   - **统一抽屉复用与学科穿梭**：在图谱 HUD 学科切换栏设立高对比度 `[ 所有学科 ]`（Alle Fächer）主入口；用户在全科视图中点击任意考点，无缝滑出右侧统一的八段研习抽屉，并在抽屉头部与操作区提供 `[ ${fach} ➔ ]` 快速穿梭按钮，形成“宏观鸟瞰 ➔ 考点研习 ➔ 单科深入”的闭环。

## 2. 变更清单

- [`App-EF-Lernvault/src/components/AllSubjectsMacroView.tsx`](file:///C:/Users/rongj/Desktop/学习/App-EF-Lernvault/src/components/AllSubjectsMacroView.tsx)：独立全科宏观星图与聚合总台组件；
- [`App-EF-Lernvault/src/components/AllSubjectsMacroView.test.tsx`](file:///C:/Users/rongj/Desktop/学习/App-EF-Lernvault/src/components/AllSubjectsMacroView.test.tsx)：全科视图独立单元测试套件（5/5 PASS）；
- [`App-EF-Lernvault/src/components/SkillTreeCanvas.tsx`](file:///C:/Users/rongj/Desktop/学习/App-EF-Lernvault/src/components/SkillTreeCanvas.tsx)：集成 `AllSubjectsMacroView`，添加 `[ 所有学科 ]` HUD 按钮与抽屉一键穿梭入科功能；
- [`App-EF-Lernvault/src/components/SkillTreeCanvas.test.tsx`](file:///C:/Users/rongj/Desktop/学习/App-EF-Lernvault/src/components/SkillTreeCanvas.test.tsx)：扩充全科学科切换、考点检索与穿梭入科集成测试。
