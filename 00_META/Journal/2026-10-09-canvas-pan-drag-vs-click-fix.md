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

用户反馈在知识图谱画布中按住鼠标左键移动视口时，系统误判为点击了空白外部区域，自动关闭了侧边研习抽屉和当前选中的知识节点（“发现小bug我鼠标左键移动的时候，它判定我点击到外面区域了，自动关掉了侧栏和节点。但是我只是想移动，而不是关闭”）。

**技术根因排查**：
1. **浏览器 DOM/SVG 原生事件流穿透**：背景层 `<rect data-testid="skill-tree-canvas-bg">` 覆盖了整个 SVG 画布（100% 宽高）。原实现中直接在其上挂载了无条件的 `onClick={() => setSelectedNodeId(null)}`；
2. **移动后抬起触发虚假 Click**：在浏览器原生事件模型中，只要 `pointerdown` 与 `pointerup` 的坐标落在同一个元素几何范围内，无论期间按住鼠标平移了多远距离（例如 50px、200px），抬起鼠标时浏览器均会按规范派发一个原生的 `click` 事件；
3. **缺少拖拽位移隔离门禁**：即使 `handlePointerUp` 中曾经尝试通过位移阈值判断，由于 `<rect>` 元素上的 `onClick` 是无条件执行的，抬起鼠标瞬间触发的 `click` 事件立即绕过校验，强行执行了 `setSelectedNodeId(null)`，导致平移视口时研习抽屉被误关。

## 2. 解决方案与工程重构

1. **引入拖拽位移门禁状态（`isCanvasPannedRef`）**：
   - 在 `SkillTreeCanvas.tsx` 中定义 `isCanvasPannedRef = useRef<boolean>(false)`；
   - 在 `handlePointerDown` 中初始化 `isCanvasPannedRef.current = false`，并调用 `setPointerCapture` 确保整个拖拽生命周期事件紧密锁定在画布上；
   - 在 `handlePointerMove` 中检测指针相对于按下起点的欧式距离 `Math.hypot(dx, dy)`，一旦超过 5px 即判定为有效视口平移，将 `isCanvasPannedRef.current` 置为 `true`。
2. **提炼专属空白点击收起处理器（`handleCanvasBgClick`）**：
   - 提取 `<rect>` 的点击逻辑：若 `isCanvasPannedRef.current === true`，表明用户刚刚是在移动/漫游画布，拦截并消费该事件，将标志位复位为 `false`，**绝对不调用 `setSelectedNodeId(null)`**；
   - 只有当 `isCanvasPannedRef.current === false` 时（即用户在空白画布上进行了静止单击/轻点，位移 <= 5px），才执行 `setSelectedNodeId(null)` 收回研习抽屉。
3. **底层装饰元素指针事件穿透（`pointerEvents: "none"`）**：
   - 将无交互行为的星盘背景刻度层（`planetary-background-layer`）、科技树里程碑泳道背景层（`tech-tree-background-layer`）以及所有贝塞尔连线（`renderedEdges`）均添加 `style={{ pointerEvents: "none" }}`；
   - 确保所有空白区域与装饰线条上的拖拽和平移事件100%直接穿透到底层背景，彻底消除了中间装饰元素抢占指针事件或拦截拖拽的隐患。
4. **测试与质量门禁验证**：
   - 在 `SkillTreeCanvas.test.tsx` 中新增端到端测试用例：`does not close drawer when dragging or panning canvas with mouse move`，17 项测试全部通过；
   - 确保 `cmd /c "npx tsc -b"`、`npm run build` 与 `python scripts/vault-check.py` 全绿。

## 3. 变更清单

- [`App-EF-Lernvault/src/components/SkillTreeCanvas.tsx`](file:///C:/Users/rongj/Desktop/学习/App-EF-Lernvault/src/components/SkillTreeCanvas.tsx)：重构视口平移与空白背景点击事件，引入 `isCanvasPannedRef` 与 `handleCanvasBgClick`，装饰图层设置 `pointerEvents: "none"`；
- [`App-EF-Lernvault/src/components/SkillTreeCanvas.test.tsx`](file:///C:/Users/rongj/Desktop/学习/App-EF-Lernvault/src/components/SkillTreeCanvas.test.tsx)：新增画布平移不关闭抽屉专项自动化测试用例；
- [`00_META/Journal/2026-10-09-canvas-pan-drag-vs-click-fix.md`](file:///C:/Users/rongj/Desktop/学习/00_META/Journal/2026-10-09-canvas-pan-drag-vs-click-fix.md)：记录本次缺陷修复与交互机制。
