---
fach: Meta
thema: "PhET Wave 1 Mechanik: 10 Simulationen Clean-Room-Rewrite plus Trademark-Bereinigung"
datum: 2026-09-28
tags: [EF, Meta, Journal, App, Labor, PhET]
---

# 2026-09-28 施工日志：PhET Wave 1 力学十款洁净室重写 + T0 商标清洗

## 1. 做了什么（11 轨并行）

- **T0 商标清洗**：74 处 "PhET" 品牌残留→Labor（导航/keys/注册表标题+tags/仿真横幅/导出文案/DesignLab 方案五）；NOTICE.md 追加 UC Boulder 学术致谢；顺手修 OpticsRefractionSim shadow-sm；残留仅 6 处内部 MathHtml cacheKey（允许类）+ 1 纯 URL 外链。
- **W1 十款全重写**（SOP §6 模板：useRef+rAF 解耦、6 帧节流、动态 DPR、setPointerCapture、◧/◩ 折叠、四联排脚手架）：
  - 重写 6：EnergySkateParkSim 757行 / PendulumLabSim 710行 / SpringPendulumSim 804行 / ProjectileMotionSim 746行 / SchiefeEbeneSim 823行 / GravityOrbitSim 1009行。
  - 新建 4：CollisionLabSim 763行 / LeverBalanceSim 647行 / HookeLawSim 524行 / FrictionMicroSim 732行。
- **主 Agent 注册挂载**：laborRegistry 新增 collision/lever/hooke/friction 四 ID（tags 用 Labor），Labor.tsx 挂载四分支；schiefe-ebene tag 顺手去品牌。

## 2. 测试审核

- `tsc` 全仓零错；`build` 通过（4.93s）；`vault-check` PASS（notes=400, reisen=271）；`audit` 6 项全 0。
- 全量 vitest 7 失败 389 通过：与基线持平零新增（emoji 失败清单 W1 十文件零检出；残留失败为 BentoMastery/Buoyancy 等存量债 + Help 快捷键在途 + walkthrough/FormulaScaffold 基线）。
- 好消息：keys.test.ts 10/10 通过（T0 改名修掉了之前的 keys 在途失败）。

## 3. 待办

- 用户 Alt L 进 Labor 目视抽查十款（折叠/拖拽/DPR 拉伸/60FPS）；Wave 2（波动光学与电磁 8 款）待指令。
- 未 commit（等用户审查后定夺）。
