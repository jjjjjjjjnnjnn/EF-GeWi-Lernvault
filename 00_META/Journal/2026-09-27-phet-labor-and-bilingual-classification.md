---
fach: Meta
thema: "PhET风格互动仿真实验室上线、德语真实变音字母(Umlaute)排版恢复与双语课程精准分类"
datum: 2026-09-27
tags: [EF, Meta, App]
---

# 2026-09-27 PhET风格互动仿真实验室上线、德语真实变音字母(Umlaute)排版恢复与双语课程精准分类

## 背景与目标

针对用户提出的三项核心体验升级诉求与 PhET 开源协议（MIT/GPL）架构深度结合：
1. **纯德语与双语板块分类混淆、标签缺失修复**：原筛选仅匹配 `-CN-` 导致全库 138 门双语精讲课错标为纯德语。
2. **德语变音字母自然呈现**：将页面与正文中的电报式字母组合（`ae, oe, ue`）在显示层还原为正规德语变音点标记（`ä, ö, ü, Ä, Ö, Ü` 与 `ß`），提升可读性同时严格保持底层文件命名规范（`badnames` 门禁）。
3. **复刻 PhET 风格互动探索实验室与独立专区构建**：建立首级导航模块 `Labor`（快捷键 `Alt L`），提供物理、化学、生物、数学、社科与哲学 15 大高拟真科学探索仿真组件。

---

## 本轮改动

### 1. 双语与纯德语课程分类与标签彻底根治 (`Reise.tsx`)
- 判定逻辑修正：`const isDe = r.path.includes("-DE-"); const isBilingual = !isDe;`
- 向导过滤修正：`matchEdition` 准确返回 138 门双语版（`Bilingual (DE/ZH)`）与 131 门纯德语版（`DE rein`）。
- 目录顶部计数与表格每一行增加鲜明语义胶囊标签；课程详情页面包屑实时同步版本标识。

### 2. 德语变音字母智能还原引擎 (`germanOrthography.ts` + `Blocks.tsx` + `Reise.tsx`)
- 构建 `restoreGermanUmlauts` 转换管道，建立词根级正字法白名单映射（`ueber` $\to$ `über`, `Moeglich` $\to$ `Möglich`, `Verstaendnis` $\to$ `Verständnis`, `Loesung` $\to$ `Lösung`, `Gleichgewichtsstoerung` $\to$ `Gleichgewichtsstörung` 等）。
- 增加严格的 LaTeX 公式（`$...$` 与 `$$...$$`）、HTML 标签与代码块保护，防止数学物理符号被误改。
- 融入 `renderRichTextTokens`、长文档课程标题、右侧大纲导航（TOC）与步骤标题中，阅读体验自然流畅。

### 3. PhET 风格科学交互仿真实验室专区 (`Labor.tsx` + 5 大新型仿真组件)
依照 PhET 开源项目（SceneryStack / Model-View-Controller 模式与即时可视物理引擎）：
1. **SpringPendulumSim（弹簧振子与简谐振动）**：动态弹性线圈、速度与回复力矢量箭头切换、实时机械能柱状图（$E_{\text{kin}}$, $E_{\text{spann}}$, $E_{\text{ges}}$）、天体引力预设与周期匹配挑战。
2. **CircuitOhmSim（直流电路与欧姆定律）**：真实电子微观定向移动流、可开合电键、灯泡亮度和钨丝红热仿真、串并联电阻电压电流即时计算。
3. **OpticsRefractionSim（几何光学折射与全反射）**：斯涅尔定律、激光折射全反射连续光路、半圆形折射介质池、临界角 $\alpha_{\text{grenz}}$ 探究模式。
4. **GasPropertiesSim（理想气体状态方程与分子运动）**：可调节活塞容积、压力计、开尔文热源/致冷器、麦克斯韦-玻尔兹曼分子碰撞弹性动画与波义耳定律实验。
5. **VectorAdditionSim（二维向量加法与平行四边形）**：交互式拖动端点、分量分解显示、合向量即时计算与静力平衡找平任务。
- 将仿真组件与现有 10 门学科教具整合为 15 门分类互动仿真库，支持模糊搜索、学科过滤、全屏实验与「实验发现一键导出至 KI-Tutor」闭环。

---

## 质量验证

- `npx tsc -b`：通过，0 TS 错误。
- `python scripts/vault-check.py`：PASS (`notes=396, reisen=269, badnames=0, badglossar=0`)。
- `python scripts/audit-pedagogy-integrity.py`：6 项全 0，269 门课程全绿。
- 本地开发服务器：Vite 1420 稳定运行，热重载正常。

## 待办与后续

- 结合 PhET 开源项目进一步拓展高中电磁感应与声波干涉仿真沙盘。
