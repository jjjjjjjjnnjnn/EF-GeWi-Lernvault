---
fach: Meta
thema: "知识图谱画布平移拖拽与空白点击抽屉关闭防误触分离"
operatoren: [darstellen, analysieren]
klausurrelevant: false
datum: 2026-10-09
tags: [EF, Meta, App, UI, Bugfix, Interaction]
---

# 2026-10-09 工作日志：知识图谱画布平移拖拽与空白点击抽屉关闭防误触分离

## 1. 缺陷现象与根因定位

1. **第一阶段缺陷**：用户反馈在知识图谱画布中按住鼠标左键移动视口时，系统误判为点击了空白外部区域，自动关闭了侧边研习抽屉和当前选中的知识节点；
2. **第二阶段缺陷**：此前在修补平移拖拽时，由于把点击收回逻辑完全押在 `<rect>` 的 `onClick` 上，但在部分 WebView/Chromium 环境下，`<svg>` 在捕获指针或点击非 `<rect>` 背景要素时不会向 `<rect>` 派发 `click`，并且在「所有学科」宏观星盘视图（`AllSubjectsMacroView`）中彻底缺少对空白画布的取消选中处理，导致用户单点空白区域时无法收回抽屉与取消选择；
3. **冒泡重复触发隐患**：在同时为 `<svg>` 与 `<rect>` 绑定 `handleCanvasBgClick` 时，若未调用 `e.stopPropagation()`，点击 `<rect>` 时事件冒泡至 `<svg>`，第一次调用重置了 `canvasHasMovedRef`，第二次冒泡调用直接触发了 `setSelectedNodeId(null)`，导致拖拽抬起时误关抽屉。

## 2. 解决方案与工程重构

1. **双重保障判定机制（PointerUp 距离门禁 + Click 兜底）**：
   - 在 `SkillTreeCanvas.tsx` 与 `AllSubjectsMacroView.tsx` 中建立统一的 `canvasPointerDownPosRef` 与 `canvasHasMovedRef`；
   - `handlePointerDown`：记录初始触点坐标，将 `canvasHasMovedRef.current` 置为 `false`；
   - `handlePointerMove`：计算移动欧式距离，当位移大于 8px（行业标准手势容差）时置 `canvasHasMovedRef.current = true`；
   - `handlePointerUp`：计算抬起时总位移。若位移 `<= 8px` 且未发生有效拖拽移动，直接触发取消选择与抽屉收回（`setSelectedNodeId(null)` / `onDeselectNode?.()`），不依赖有延迟或受环境干扰的原生 click 派发；
   - `handleCanvasBgClick`：保留作为合成点击与无障碍点击兜底，并在入口处显式调用 `e.stopPropagation()`，彻底切断 `<rect>` 向 `<svg>` 的二次冒泡穿透。
2. **全科学业总台（`AllSubjectsMacroView`）全场景支持**：
   - `AllSubjectsMacroViewProps` 新增 `onDeselectNode?: () => void` 回调，由 `SkillTreeCanvas` 接入 `onDeselectNode={() => setSelectedNodeId(null)}`；
   - 在宏观星盘 SVG（`all-subjects-astrolabe`）与背景网格纸层（`all-subjects-astrolabe-bg`）上挂载相同的拖拽判定与空白点击取消选择逻辑；
   - 在「跨学科战役」与「学阶矩阵」Tab 中，容器空白背景点击亦支持一键收回抽屉。
3. **自动化测试与质量门禁验证**：
   - 在 `SkillTreeCanvas.test.tsx` 新增：
     - `retracts drawer when single-clicking empty canvas via pointer events without dragging`（纯指针单点收回抽屉）；
     - `retracts drawer when clicking empty canvas in '所有学科' macro view`（所有学科宏观星图单点空白背景收回抽屉）；
     - `does not close drawer when dragging or panning canvas with mouse move`（拖拽平移视口不误关抽屉回归验证）；
   - 在 `AllSubjectsMacroView.test.tsx` 新增：
     - `calls onDeselectNode when clicking on blank astrolabe space, but not when panning`（星盘单点触发取消选择、平移不触发）；
   - 全部 25 项测试 100% PASS，`npm run build`（`tsc -b && vite build`）零报错，`vault-check.py` PASS。

## 3. 变更清单

- [`App-EF-Lernvault/src/components/SkillTreeCanvas.tsx`](file:///C:/Users/rongj/Desktop/学习/App-EF-Lernvault/src/components/SkillTreeCanvas.tsx)：完善双重门禁逻辑、事件冒泡隔离与向 `AllSubjectsMacroView` 传递 `onDeselectNode`；
- [`App-EF-Lernvault/src/components/AllSubjectsMacroView.tsx`](file:///C:/Users/rongj/Desktop/学习/App-EF-Lernvault/src/components/AllSubjectsMacroView.tsx)：支持 `onDeselectNode`、星盘空白单点与平移手势判定；
- [`App-EF-Lernvault/src/components/SkillTreeCanvas.test.tsx`](file:///C:/Users/rongj/Desktop/学习/App-EF-Lernvault/src/components/SkillTreeCanvas.test.tsx)：补充单点收回与平移互斥测试；
- [`App-EF-Lernvault/src/components/AllSubjectsMacroView.test.tsx`](file:///C:/Users/rongj/Desktop/学习/App-EF-Lernvault/src/components/AllSubjectsMacroView.test.tsx)：补充所有学科宏观星图空白单点取消选择与平移互斥测试；
- [`00_META/Journal/2026-10-09-canvas-pan-drag-vs-click-fix.md`](file:///C:/Users/rongj/Desktop/学习/00_META/Journal/2026-10-09-canvas-pan-drag-vs-click-fix.md)：更新本次闭环修复记录。
