---
fach: ""
thema: "Journal 2026-10-08 Fach-Bereich Workspace Demo"
operatoren: []
klausurrelevant: false
datum: 2026-10-08
tags: [EF, Meta, Journal]
---

# 2026-10-08 — 学科专区一站式空间化工作台落成与架构重组验证

## 1. 目标与背景 (Hintergrund & Ziele)
针对用户核心反馈：
> “目前网站的内容结构分类不好结构不清晰，不方便。参考类似于这种网站进行项目内容分类设计：https://www.bilinote.net/workspace/dashboard 或者学习方法论等。主要是要清晰地集成我项目的大量内容。名字起得直观简单一点。开始进行。先做单独的 demo，测试可行性。注意备份。建议先备份到 git。”

我们严格按照 `AGENTS.md` 施工宪法与“四步闭环（独立制作 ➔ 独立测试 ➔ 接入集成 ➔ 集成验证）”全面推进：
1. **安全备份**：在开始之前打上了全局 Git 标签 `backup-before-workspace-restructure`；
2. **通俗直观命名**：摒弃晦涩的玄学抽象名词，采用全站最通俗、中学生一眼看懂的**“学科专区 (Fach-Bereich)”**，并在内部设立**四大直观内容分类（1. 知识笔记 / 2. 抽认卡片 / 3. 实验与教具 / 4. 模拟真题）**；
3. **独立 Demo 先行**：在独立沙盒与组件内开发测试完成，验证可行性后再平滑注册进主导航。

## 2. 核心架构设计与空间化聚合 (Architektur & Features)
在 `src/modules/SubjectWorkspace.tsx` 中实现了对 412 篇考纲笔记、1942 张概念词卡、42 款仿真沙盘与全真会考卷的高效聚合：

### ① 顶部 10 门学科药丸切换器 (Fach-Pill Selector)
- 横向陈列 DE (语文)、EN (英语)、MA (数学)、PH (物理)、CH (化学)、BI (生物)、PL (哲学)、SW (社科)、MU (音乐)、SP (体育)；
- 一键切换当前聚焦学科，实时刷新该学科的专属资产看板（考点数、词卡数、互动沙盘数、模拟试卷规范）。

### ② 核心行动推荐条 (Contextual Action Bar)
- 根据当前所选学科，直观提供三大高频行动按钮：
  - “开启词卡背诵 (Alt 2)”：直达本学科词卡的 FSRS 记忆轮次；
  - “开始 45 分钟模考 (Alt 3)”：直达本学科 NRW 全真会考组卷与计时答题；
  - “向 AI 助教请教 (Alt 6)”：带入本学科知识图谱与错题上下文与苏格拉底助教对话。

### ③ 四大直观分类内容工作台 (4 Core Tabs)
1. **1. 知识笔记 (Wissensnotizen)**：
   - 左侧：考点搜索、重要度徽标 (Klausur) 与文章列表；
   - 右侧：八段式考纲长文档精读，支持“在文库全屏阅读”深度跳转；
2. **2. 抽认卡片 (Karteikarten)**：
   - 该学科专属词卡网格，支持原地点击翻转（正面概念/背面解析+例句）；
   - 一键开启全屏沉浸背诵轮次；
3. **3. 实验与教具 (Labore & Werkzeuge)**：
   - 物理/化学/生物自动呈现专属的 Canvas/WebGL 仿真实验（自由落体、驻波、酸碱滴定、分子构型等）；
   - 社科/文科自动呈现辩证天平、句式积木等高阶思维教具；
4. **4. 模拟真题 (Klausur & Training)**：
   - 标准 45 分钟 / 26 BE NRW 会考模拟卷；
   - 随堂 5 分钟智能小测入口。

## 3. 质量门禁与工程验证 (Testing & Verification)
1. **独立单元测试 (`SubjectWorkspace.test.tsx`)**：
   - 覆盖 10 科切换、指标统计渲染、四大 Tab 平滑流转、卡片翻转、快捷操作回调，**5/5 100% 绿灯 PASS**；
2. **零破坏与防回归**：
   - 全量回归测试通过，既有 14 个功能 Tab、全局快捷键映射完全不受影响；
   - Tufte 纯黑白纸墨宪法严格自检（禁 emoji、禁 active shadows、禁 italic utility），完全合规；
3. **构建与一致性校验**：
   - `cmd /c "npx tsc -b"`：0 错误通过；
   - `cmd /c "npm run build"`：生产构建 8.11s 顺利完成；
   - `python scripts/vault-check.py`：`notes=412 csv_rows=1942 reisen=356 PASS`。

## 4. 下一步规划 (Nächste Schritte)
- 收集用户对学科专区布局与动线的实测体验反馈；
- 进一步优化各学科笔记与实验之间的拓扑双向穿透；
- 保持既有模块平稳运行，逐步引导用户以“学科”为中心展开高效学习闭环。
