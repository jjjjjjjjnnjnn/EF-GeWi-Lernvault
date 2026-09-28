---
fach: Meta
thema: "PhET Wave 5 Chemie: Titration, VSEPR, Gleichgewicht, Beer-Lambert"
datum: 2026-09-28
tags: [EF, Meta, Journal, App, Labor, PhET]
---

# 2026-09-28 施工日志：PhET Wave 5 化学反应与微观平衡（4 款）

## 1. 做了什么（4 轨并行）

- 重写 TitrationSimulator 877行（强/弱酸双模型、Henderson-Hasselbalch 缓冲+半中和点、酚酞/甲基橙双指示剂、滴定管拖拽+曲线 scrub）。
- 新建 MoleculeShapeSim 611行（5 种 AXE 构型、键角点积实测、拖拽旋转）。
- 重写 GleichgewichtSimulator 906行（范特霍夫 Kc(T)、Qc 判据箭头、Arrhenius 动力学工业两难、56 粒子联动）。
- 新建 ConcentrationSim 523行（A=εcd、透射色深、可拖工作点校准直线）。
- 主 Agent 注册 molecule-shape/concentration；Labor 共 39 仿真。

## 2. 测试审核与返工

- 重写破坏 pedagogy.test 旧滴定用例 2 个（旧 UI 字符串已不存在）→ 主 Agent 将用例改写为新 UI（AP 等当点+rAF findBy、指示剂+滑杆），通过（2 passed）。
- 教训：rAF 动画类组件测试必须用 findBy 三参 `({}, {timeout})`——timeout 放第二参会被当 queryOptions 吞掉。
