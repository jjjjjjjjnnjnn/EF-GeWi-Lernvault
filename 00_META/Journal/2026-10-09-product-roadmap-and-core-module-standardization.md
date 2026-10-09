---
fach: Meta
thema: "产品化演进路线图与核心业务模块标准化"
operatoren: [darstellen, analysieren]
klausurrelevant: false
datum: 2026-10-09
tags: [EF, Meta, App, UI]
---

# 2026-10-09 工作日志：产品化演进路线图与核心业务模块标准化

## 1. 任务背景与核心突破

针对用户提出的核心诉求：“将目前项目中散落的 415 篇双语笔记、1942 张词卡、356 门微课与仿真实验室等大量功能，凝聚为一个真正可供用户上手的现代化学习网站产品；吸收借鉴外部 Top-6 开源仓库（Recall, quanta-fsrs, SkillTreeOSS, pathforge, PhET, page-assist）的设计与算法，避免重复造轮子”，本轮工作完成以下攻坚交付：

1. **制定宏观产品化发展路线图与开源吸收方案**：
   - 沉淀战略路线图于 Artifact 中，明确痛点诊断（信息架构过载、学习闭环缺乏漏斗、视觉一致性割裂）；
   - 梳理 Top-6 开源项目取舍表：从 `Recall` 提取 Study Mode 复习流与掌握度指标，从 `quanta-fsrs` 提取临考加权，从 `SkillTreeOSS` 提取技能依赖，从 `PhET` 提取矢量实验，从 `page-assist` 提取 Zitierpflicht 出处引用；
2. **学科专区（`SubjectWorkspace.tsx`）标准化**：
   - 顶部 5 大子标签页（图谱、笔记、词卡、实验、模考）升级为标准 `Button`；
   - 快捷行动栏（卡片背诵、45分模考、AI助教）接入规范 `Button`；
   - 考点抽屉集成标准 `Input` 与状态 `Badge`；
3. **知识文库（`Library.tsx`）标准化**：
   - 阅读主栏与属性标签接入标准 `Card` 与 `Badge`（AFB 区分度、考纲重点高亮）；
4. **抽认卡片（`Flashcards.tsx`）吸收 `Recall` 结算流**：
   - 完成学习时展现 `SessionSummary` 数据看板（复习张数、准确率 %、获得 XP、连续天数 Streak、二次强化标记、双向动作出口）；
   - 严格遵守 Tufte 纯黑白无杂色与无障碍规范；
5. **严密工程验证全绿**：
   - `npx vitest run`：74 个测试套件，534 个测试用例全部通过（100% PASS）；
   - `npm run build`：TypeScript 类型检查与 Vite 生产打包零报错；
   - `python scripts/vault-check.py`：PASS。

## 2. 下一步建议

1. 继续推进 `Labor.tsx`（仿真实验台）借鉴 `PhET example-sim` 进行黑白矢量仪表盘重构；
2. 持续优化侧边栏架构，实现高阶备考主线的极简折叠。
