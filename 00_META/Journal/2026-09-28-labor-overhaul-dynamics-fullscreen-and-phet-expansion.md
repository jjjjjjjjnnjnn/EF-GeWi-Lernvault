---
fach: Meta
thema: "Labor-Overhaul: Schiefe-Ebene-Dynamik, Federpendel-Refactor, Vollbild & PhET-Ausbau"
datum: 2026-09-28
tags: [EF, Meta, Journal, App, PhET, Pedagogy, Labor, Fullscreen]
---

# 2026-09-28 施工日志：物理实验室动态仿真重构、全屏与折叠面板及 PhET 规模扩充

## 1. 做了什么

针对用户对互动探索实验室（PhET-Labor）提出的深度反馈与需求，完成了四项关键技术突破与新仿真入库：

1. **斜面动力学 60FPS 实时动态与交互拖拽深度重构 (`SchiefeEbeneSim.tsx`)**：
   - 彻底修复此前“斜面受力分析仅有静态矢量图、滑块无动态运动”的问题。
   - 引入 **Decoupled 60FPS rAF 积分循环**：实时解算静摩擦力阈值 $F_{R,max} = \mu_s F_N$ 与滑动加速度 $a = g(\sin\alpha - \mu_k\cos\alpha)$。
   - 当倾角 $\tan\alpha > \mu$ 时，滑块沿斜面平滑加速滑落；在坡底设置缓冲挡板防穿透。
   - 支持**直接鼠标/手指在斜面上拖拽滑块（Pointer Capture）**，松手后按重力与摩擦条件自主滑动或静止。
   - 提供推力脉冲按钮（向上推/向下推）以及动态受力矢量分解箭头（$F_G$ 重力、$F_N$ 支持力、$F_{GH}$ 下滑分力、$F_R$ 摩擦力）。

2. **弹簧振子重物运动与线圈脱节底层根治 (`SpringPendulumSim.tsx`)**：
   - 根治了此前 SVG 矩形由于 CSS `transition-all` 补间插值导致与 rAF 逐帧即时坐标对抗、从而发生“重物运动与弹簧不匹配”的根本原因。
   - 实现重物金属挂钩与贝塞尔螺旋弹簧底端坐标在像素级上 100% 刚性锁定。
   - 物理内核升级：振子静态平衡位置根据重力加速度与质量真实伸长 $\Delta l = \frac{m \cdot g}{k}$，支持地球 ($9.8$)、月球 ($1.6$)、火星 ($3.7$) 与失重太空 ($0g$) 真实切换。
   - 支持**直接拖拽重物（Drag-and-Release）**拉伸或压缩弹簧，实时更新 $E_{kin}$、$E_{spann}$、$E_{therm}$ 与 $E_{ges}$ 动态四色能级柱状图。
   - 纠正了原代码中回复力矢量箭头方向颠倒的物理缺陷。

3. **全景全屏沉浸演示与变量/数据显示折叠收起**：
   - **双层全屏模式支持**：
     - 单体仿真级：各个实验室均支持 `⛶ 全屏演示` / `✖ 退出全屏`（HTML5 Fullscreen API + 原生 CSS Fallback 覆盖）。
     - 实验室工作台级：在 `Labor.tsx` 顶栏增加全局全屏工作台切换。
   - **面板折叠收起 (Panel Folding)**：
     - 为实验台开发 `◧ Einklappen / 折叠侧栏` 切换机制。
     - 一键折叠右侧复杂的滑块参数控制面板与读数卡片，物理模拟画布即时横向拉伸至 100% 全宽，杜绝遮挡，方便精细化科研观测。

4. **PhET 探索实验室全新扩充入库**：
   - **杨氏双缝干涉与波动光学实验室 (`WaveInterferenceLabSim.tsx`)**：
     - 经典还原 PhET Wave Interference：波长 $\lambda$ (380nm–750nm 连续光谱色带)、缝间距 $d$ 与屏距 $L$ 自由调控。
     - 2D Canvas 实时波前干涉场动画，呈现相长干涉（明条纹）与相消干涉（暗条纹）。
     - 接收屏光强空间分布曲线（Intensity Distribution）实时绘制，定量标定 $\Delta y = \frac{L\lambda}{d}$。
   - **天体引力与开普勒轨道实验室 (`GravityOrbitSim.tsx`)**：
     - 经典还原 PhET My Solar System：中心大质量恒星引力场反平方律积分。
     - 初速度矢量手柄、偏心率调节、轨道历史轨迹云（Fading Trail）。
     - 呈现第一宇宙速度（圆轨道）、开普勒椭圆轨道、第二宇宙速度（逃逸双曲线）与坠毁判定。
   - 在 `laborRegistry.ts` 与 `Labor.tsx` 中完成全量类型安全注册与挂载。

## 2. 门禁验证结果

- `cd App-EF-Lernvault && npx tsc -b`：0 错误。
- `cd App-EF-Lernvault && npm run build`：455 modules transformed, 生产打包 100% 成功 (7.97s)。
- `python scripts/vault-check.py`：PASS (`notes=399 csv_rows=1599(bad=0) index_links=329(missing=0) reisen=271 vergleich=0 badnames=0 badglossar=0`)。
