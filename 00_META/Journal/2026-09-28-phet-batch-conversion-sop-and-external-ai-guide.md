---
fach: Meta
thema: "PhET-Batch-Conversion-SOP: Anti-Infringement, Tufte-Design, Waves 1-6 & External AI Self-Audit"
datum: 2026-09-28
tags: [EF, Meta, Journal, PhET, SOP, External-AI, Labor, Architecture]
---

# 2026-09-28 施工日志：PhET 离线全库批量原创重构 SOP 与外部 AI 自审核手册编制

## 1. 做了什么

针对用户提供的外部下载离线 PhET 全库（`C:\Users\rongj\Desktop\PheT`，包含 120 个仿真项目），系统编制了工业级落地规范文档与外部 AI 批量执行交接案，旨在通过**第一性原理洁净室重构（Clean-Room Reverse Engineering）**，将其无侵权、高质量地转化为符合本项目 Tufte 学术工坊美学与德国高中文理中学（Gymnasium EF/Q1/Q2）大纲的原生 React 18/TypeScript 交互组件：

1. **确立宪法级知识产权与防侵权红线（Zero-Infringement Policy）**：
   - 彻底禁止内嵌原版单文件 HTML 打包体与专有框架；
   - 彻底禁止在 UI 标题与软件品牌中将 "PhET" 用作官方名称（统一使用 `Labor` 研习工坊），规避科罗拉多大学校董会商标风险；
   - 彻底剔除卡通人脸与非学术立绘，全部重塑为 Tufte 纯粹几何质点、仪器探针与矢量箭头；
   - 在 `NOTICE.md` 规范致谢理论物理与开放科学教育灵感来源。

2. **锁定核心设计系统与工程铁律（Tufte Atelier Guidelines）**：
   - 统一 CSS 调色板映射：`var(--paper)`, `var(--ink)`, `var(--line)`，高对比度 WCAG AAA；
   - 严禁任何浅绿/浅黄低对比度文字，物理能量色系统一为深翡翠绿（$E_{kin}$）、深海藏蓝（$E_{pot}$）、宝石深红（$E_{therm}$）；
   - 零 Emoji 政策，手写 16x16 矢量 SVG 图标；
   - 单一 Studio 模式：左侧导航常驻可见，右侧舞台取消最大宽度限制，画布自适应放大为 `h-[420px] sm:h-[480px]`；
   - 面板自由折叠：`[ ◧ 折叠侧栏 / ◩ 展开侧栏 ]`，折叠时实验舞台占满 100% 宽度；
   - 动态 DPR 画布缓冲自适应：每帧动态读取 `canvas.getBoundingClientRect()` 乘以 `devicePixelRatio`，彻底杜绝窗口拉伸导致正圆变椭圆、倾角变形；
   - 60FPS 解耦积分循环：状态存放在 `useRef`，每 6 帧节流一次 React 状态更新；
   - 无脱手指针捕获：`setPointerCapture` / `releasePointerCapture`。

3. **双语学术脚手架深度绑定**：
   - 底板固定四联排卡片：第一性原理公式（KaTeX）、德国北威州 KLP 考纲点与典型题型、🇨🇳 CN-Methode 直觉速记、导出至 AI 助教研讨。

4. **120 款仿真全景批次路线图编制（Waves 1 ~ 6）**：
   - Wave 1（力学与动力学，15款）：斜面、单摆、弹簧、抛体、碰撞、天体公转、杠杆等；
   - Wave 2（波动光学与电磁学，18款）：双缝干涉、光折射、透镜成像、直流电路、库仑定律、法拉第电感等；
   - Wave 3（热力学与流体，12款）：理想气体、相态、浮力密度、液体压强等；
   - Wave 4（近代物理与量子，10款）：光电效应、卢瑟福散射、氢原子跃迁、黑体辐射等；
   - Wave 5（化学平衡与微观，12款）：酸碱滴定、分子立体构型、化学平衡、比尔定律等；
   - Wave 6（数学与生物探究，15款）：二维向量加减、导数切线、高尔顿正态分布、细胞膜运输、神经动作电位等。

5. **输出外部 AI 批量提示词与 10 项严苛自审核清单**：
   - 编写完成开箱即用的标准系统 Prompt，外部 AI 只要填入目标 SimID 即可全自动输出；
   - 制定 10 项逐条自检清单与 3 级终端命令验证门禁（`npx tsc -b`, `npm run build`, `python scripts/vault-check.py`）。

6. **同步维护与索引落库**：
   - 核心文档落位于 [`00_META/PHET-CONVERSION-BATCH-SOP.md`](../PHET-CONVERSION-BATCH-SOP.md)；
   - 关联同步更新了 [`00_META/INDEX.md`](../INDEX.md) 与 [`HANDOVER.md`](../../HANDOVER.md)；
   - 静态审计 `python scripts/vault-check.py` 检验完全通过（`notes=400 csv_rows=1599 index_links=330 PASS`）。

## 2. 待办与后续

- 外部 AI 按照 SOP 手册分批次（Wave 1 ~ Wave 6）批量提交新仿真 TSX 组件。
- 每次提交后自动运行三级门禁验证并挂载进 `laborRegistry.ts`。

## 3. 阻塞项

- 无内部技术阻塞。
