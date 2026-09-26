---
fach: ""
thema: "学科知识网络去重与全学科探索性互动教具嵌入（PhET / Brilliant 式沙盘）"
operatoren: []
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Meta, App]
---

# 2026-09-26 学科知识网络去重与全学科探索性互动教具嵌入（PhET / Brilliant 式沙盘）

> 触发：用户提问「学科知识网络底部的 `[+]10门学科大纲学习树` 是干什么的，是否重复，能否合并？」，并指出希望将直观探索性教具（如导数割线逼近切线、供求均衡曲线平移、物理运动学沙盘）直接嵌入到互动课程中，让学生在课堂动手观察探索。

## 做了什么

1. **知识网络（Mindmap）去重与定位厘清**（[`App-EF-Lernvault/src/modules/Mindmap.tsx`](../../App-EF-Lernvault/src/modules/Mindmap.tsx)）：
   - 彻底移除了 `Mindmap.tsx` 中重复嵌入的 `[+] 10门学科大纲学习树总览 (CURRICULUM_TREES)` 折叠卡片与冗余依赖；
   - 明确职责划分：`Lernbaum` 专司 10 门学科教学大纲关卡地图，`Mindmap` 专司 Obsidian 双向图谱网状知识链接与跨学科交汇枢纽。

2. **课程引擎嵌入教具解析与双阶段挂载**（[`App-EF-Lernvault/src/reise.ts`](../../App-EF-Lernvault/src/reise.ts) & [`Reise.tsx`](../../App-EF-Lernvault/src/modules/Reise.tsx)）：
   - 升级 `parseReiseFile` 解析器，支持在步进对象中提取 `toolId?: string`，并消除任务提示中的语法残留；
   - 修复仅在 `entdecken` 渲染教具的限制，在 `entdecken`（知识讲解）与 `ausprobieren`（动手实操）两大关键环节全面挂载交互教具；
   - 增加学科/主题上下文智能回退（`getAutoToolForContext`），确保每门课在无显式标记时自动匹配契合该课主题的教具（数学导数、社科市场机制、物理运动学、哲学辩证天平、德语/英语文本解构、理科四步法等）。

3. **PhET / Brilliant 风格探索性互动教具开发与升级**：
   - **数学分析**（[`TangentSlider.tsx`](../../App-EF-Lernvault/src/components/pedagogy/TangentSlider.tsx)）：$f(x) = x^2$ 割线逼近切线沙盘，可拖拽步长 $\Delta x \to 0$ 观察割线绕基准点旋转重合为切线，计算差商与导数；
   - **社会科学**（[`MarktMechanismusSim.tsx`](../../App-EF-Lernvault/src/components/pedagogy/MarktMechanismusSim.tsx)）：供求曲线平移、均衡点 ($p^*, q^*$) 实时解算、最高限价/最低限价政府干预、供给/需求过剩量动态计算与德语考场标准结论句生成；
   - **物理力学**（[`KinematikSim.tsx`](../../App-EF-Lernvault/src/components/pedagogy/KinematikSim.tsx)）：运动学仿真物理沙盘，支持自由调节初速度 $v_0$ 与加速度 $a$，实时轨迹跑道动画、位移-时间图 $s(t)$ 曲线绘制与 $t, s, v, a$ 核心物理量联动推导。

4. **教具独立探索中心集成**（[`App-EF-Lernvault/src/modules/Werkzeuge.tsx`](../../App-EF-Lernvault/src/modules/Werkzeuge.tsx) & [`src/engine/fachDidaktik.ts`](../../App-EF-Lernvault/src/engine/fachDidaktik.ts)）：
   - 在独立教具中心新增供求沙盘（`markt`）与运动实验（`kinematik`）卡片，支持自由探索并一键将生成论证句带入 AI 导师深入研讨。

5. **门禁与测试**：
   - 57 个测试套件（382 项测试）100% 通过；
   - `tsc -b && vite build` 生产构建 0 错误；
   - `python scripts/vault-check.py` 完整校验 PASS（0 badnames, 0 badglossar）。
