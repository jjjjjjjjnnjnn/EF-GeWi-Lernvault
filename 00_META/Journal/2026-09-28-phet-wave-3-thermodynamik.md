---
fach: Meta
thema: "PhET Wave 3 Thermodynamik: 5 Simulationen"
datum: 2026-09-28
tags: [EF, Meta, Journal, App, Labor, PhET]
---

# 2026-09-28 施工日志：PhET Wave 3 热力学与物质状态（5 款）

## 1. 做了什么（5 轨并行）

- **重写 2**：GasPropertiesSim 874行（理论+碰撞计数双通道压强、Boyle 验证模式）/ BuoyancyDensitySim 644行（清掉旧 💡 与 shadow-xs，三灯判据）。
- **新建 3**：StatesMatterSim 733行（内能反演熔沸平台、LJ 定性粒子）/ HydroPressureSim 500行（探针双控+p-h 直线图）/ DiffusionSim 624行（浓度时间曲线+J 读数）。
- **主 Agent 注册挂载**：states-matter/under-pressure/diffusion 三 ID + Labor 挂载；gas 注册表去品牌。

## 2. 测试审核

- `tsc` 零错；`build` 通过（8.19s）；全量 vitest 7 失败 389 通过（持平）；emoji 清单 W3 五文件零检出；`vault-check` PASS。
- Labor 共 33 个仿真。

## 3. 待办

- Wave 4 近代物理 4 款（photoelectric/rutherford/hydrogen-atom/blackbody 全新建）待继续。

## 4. 用户报障补记（温度计标尺倒置，已修）

- 现象：三态仿真右侧温度计高温沉底、低温在上，与标注相反。
- 根因：三处映射写反——`ph.probe=(T_MAX-temp)/range`（显示）、`c=T_MAX-frac*range`（拖拽反解）、初值 `(300-20)/350`。
- 修复：显示改 `(temp-T_MIN)/range`、反解改 `T_MIN+frac*range`、初值改 `(20+50)/350`；`tsc`+`build` 全绿。曲线 `yOf` 本就正确，无需动。
