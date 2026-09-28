---
fach: Meta
thema: "PhET-Labor Overhaul, Dev-Mode Isolation und Projekt-Design-Leitfaden"
datum: 2026-09-28
tags: [EF, Meta, Journal, App, PhET, Pedagogy, DesignLab, DevMode]
---

# 2026-09-28 施工日志：PhET-Labor 大规模扩充与 Dev-Mode 开发者隔离架构

## 1. 做了什么

针对用户反馈的四项关键需求，完成全链路架构升级与教学仿真扩充：

1. **新课上线与即时发现机制 (`Reise.tsx` / `reise.ts`)**：
   - 彻底修复 `Wertpapierdepot & Orderarten` 新课在生产环境中未自动感知的问题。
   - `reise.ts` 中通过静态导入（`import raw`）为新课程注入兜底数据，解除客户端对 Vite 运行时热更新 glob 监听器的外部依赖。
   - 在 `Reise.tsx` 页面顶栏增加「快捷课程切换下拉选框（Schnellwechsel）」，并在课程目录总览顶端增加醒目的「NEU ERSCHIENEN / 最新上架」聚光灯推荐卡，支持一键直接开启沉浸式演练。

2. **开发者测试模式与普通用户隔离 (`App.tsx` / `Settings.tsx`)**：
   - 响应“designlab 默认对于普通用户隐藏，适用于开发者测试”的指示。
   - 在 `App.tsx` 中建立全局响应式 `devMode` 状态，持久化至 `localStorage ("ef_dev_mode")`，同时支持 URL 参数（`?dev=1`）即时激活。
   - 非开发者模式下，主导航条与底部模块完全隐藏 `Design-Lab` 入口；若通过 URL 强行访问则平滑重定向至首页。
   - 在 `Settings.tsx` 设置页尾部新增第 8 节「Entwickler- & Testmodus (Dev-Mode)」极简切换开关，并支持桌面端全局快捷键 `Ctrl + Shift + D` 快速切换。

3. **PhET-Labor 深度扩充与 60FPS 无抖动原生仿真构建**：
   - 针对原有仿真卡顿跳帧（React 状态驱动动画导致全树高频重绘）的问题，确立了 **Decoupled 60FPS rAF Loop（物理循环与 React 渲染解耦）** 架构。
   - 原生构建并入库 5 款具备 PhET 真实交互质感的理科/物理核心虚拟实验台（零外部依赖、高 DPI Canvas 渲染、`setPointerCapture` 防丢拖拽、矢量力图、双语对照）：
     - **EnergySkateParkSim (滑板能量守恒实验室)**：U 型滑道/斜面/回环、质点实时速度计、动能/重力势能/热能多层动态柱状图、阻尼耗散及动态饼图。
     - **PendulumLabSim (单摆运动实验室)**：非线性非小角度微分积分、摆长/重力/阻尼自由调节、验证周期独立于质量的物理定律、自动光电门测速秒表。
     - **ProjectileMotionSim (斜抛运动实验室)**：高精度抛体动力学、空气阻力二次方阻力系数调节、落点/最高点标记与可拖拽靶心判定。
     - **BuoyancyDensitySim (浮力与阿基米德浮沉子)**：液体密度与固体材质切换、阿基米德浮力计算 $F_A = \rho \cdot V \cdot g$、弹簧测力计视重测量与排水体积读数。
     - **CoulombLawSim (库仑定律与静电场)**：双点电荷拖拽、电荷极性与大小调节、平方反比库仑力矢量实时渲染、电场线空间分布动态生成。
   - 5 款全新实验台已注册至 `laborRegistry.ts` 与 `Labor.tsx`，形成体系化虚拟实验室。

4. **发布终极项目设计规范方案 (`PROJECT-DESIGN-GUIDELINES.md`)**：
   - 在仓库根目录与 `00_META/` 创建《EF-GeWi-Lernvault 项目设计方案与架构策略全景指南》，全面沉淀：
     - Tufte 数据墨水比与学术工坊配色设计规范。
     - 60FPS 解耦交互仿真开发金科玉律（指针捕获、DOM 节流、离屏 Canvas）。
     - 课程内容八段式体系与全学科互动教学设计策略。
     - 开发者隔离模式、构建门禁与全自动化扩展 SOP，确保任何外部 AI 均能无缝复刻与无损扩展。
   - 同步更新 `00_META/INDEX.md` 与 `HANDOVER.md` 索引链接，并在 `scripts/vault-check.py` 中登记豁免。

## 2. 门禁验证结果

- `python scripts/vault-check.py`：PASS (`notes=399 csv_rows=1599 index_links=329 reisen=271 vergleich=0 badnames=0 badglossar=0`)。
- `cd App-EF-Lernvault && npx tsc -b`：0 错误。
- `cd App-EF-Lernvault && npm run build`：453 modules transformed, 生产打包 100% 成功。
- 前端开发服务器（Port 1420）正常运行中。
