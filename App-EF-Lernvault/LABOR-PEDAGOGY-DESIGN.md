# LABOR-PEDAGOGY-DESIGN — PhET 风格互动研习实验室架构与扩展设计规范

> **面向对象**：未来接手本仓库的任意 AI Agent 或人类开发者。  
> **核心目标**：提供清晰、模块化、可复刻的工程与教学设计标准，使任意 AI 均能在此架构下零障碍复刻、维护并无限扩展高品质互动仿真实验室。

---

## 1. 核心设计哲学与教学定位

1. **直观具象与高考严谨性的双螺旋（Dual-Track Pedagogy）**：
   - 德国 NRW（北威州）Gymnasium 高中文科与理科考核（Klausur / Abitur）要求极高的概念精确度。单纯公式背诵容易产生认知断层。
   - 实验室模块采用 **PhET Interactive Simulations** 教学法：通过交互式变量探究（摩擦系数、重力加速度、初速度、摆长、电荷量、双缝间距等），让学生在动手调整和实时 60FPS 动态反馈中先建立物理/数理直觉（Intuition First），再将实验结论无缝转化为德语 Klausur 标准答案句式。
2. **Tufte 极简数据墨水比（High Data-Ink Ratio）**：
   - 严禁花哨的装饰性渐变、高饱和荧光绿/刺眼霓虹色、多余圆角与玻璃拟态。
   - 分隔一律采用 `var(--line)` 发丝级细线；底色采用柔和纸面色 `var(--paper)` / `var(--paper-subtle)` / `var(--surface)`；文字层级采用德语 serif 标题 + 等宽数字 tabular-nums。
   - 矢量箭头使用语义色：重力红色/暖色、支持力/法向力深色、摩擦力/阻力琥珀色、浮力/电场蓝色、速度绿色。

---

## 2. 界面与交互系统（UI/UX Standards）

### 2.1 全景研习工坊大屏模式（Studio Expanded Mode）
- **左侧导航常驻原则**：大屏模式绝不能使用原生浏览器 `requestFullscreen()` 或固定全屏 `fixed inset-0` 遮挡软件全局左侧索引栏！左侧学科与核心模块导航必须随时可用。
- **内容区满屏延展**：
  - 激活仿真实验时，外层容器取消 `max-w-5xl` 限制，采用 `max-w-none px-0`，充分利用视口右侧全部横向空间。
  - 顶部工具栏提供快捷切换按钮：`[ ⤡ 紧凑模式 ]` / `[ ⤢ 全景放大模式 ]`。
  - 仿真实验视口高度自适应放大（由普通视图的 `h-[360px]` 放大至 `h-[420px] sm:h-[480px]`），为复杂运动轨迹、多粒子电场或波场干涉提供宏大的观察舞台。

### 2.2 变量面板自由折叠（Collapsible Panels）
- 每个仿真组件均配备面板折叠开关（`showPanels`，按钮图标 `◧ / ◩`）。
- **展开状态（Default）**：画布舞台占约 67% 宽度（`lg:col-span-8`），右侧参数调节与理论推导卡片占约 33% 宽度（`lg:col-span-4`）。
- **折叠状态（Distraction-Free Mode）**：右侧面板隐藏，画布舞台自动铺满 100% 宽度（`col-span-12`），便于精细观察微观运动、光电门计时、轨迹交点等细节。

### 2.3 物理引擎与视觉渲染严格解耦（60FPS decoupled rAF）
- **绝不在 React 状态中高频更新物理坐标**：
  - 严禁在 `requestAnimationFrame` 每一帧中调用 `setState({ x, y })`，否则必然造成 React 重渲染掉帧、卡顿与手势脱节。
  - 物理仿真核心变量（位置、速度、加速度、能量等）全部保存在 `useRef` 中（如 `stateRef`、`flightRef`），由 `requestAnimationFrame` 循环在 HTML5 `<canvas>` 或独立 SVG 路径中以 60FPS 平滑绘制。
  - 界面显示的数字指标（周期、瞬时速度等）采用时间节流（Throttled），每 6~10 帧同步一次给 React 状态即可。
- **物理锚点绝对对齐（No Visual Lag）**：
  - 在 SVG/Canvas 渲染物体连接处（例如弹簧下端挂钩与重物顶端环扣、斜面倾角与滑块底面），严禁在 CSS 中给运动物体添加 `transition: all`，否则物理坐标与视觉图形会发生严重滞后和断裂分离。

---

## 3. 标准组件接口规范（Component API）

每一个 PhET 互动实验室组件必须满足统一的标准接口：

```typescript
import type { Lang } from "../../i18n";

export interface StandardSimProps {
  /** 当前用户语言环境："de"（考试语）或 "zh"（母语理解） */
  lang: Lang;
  /** 是否处于全景工坊大屏模式（控制画布高度与比例） */
  studioMode?: boolean;
  /** 将实验观测数据与物理结论导出至错题本/笔记/AI 助教研讨的回调函数 */
  onExportFinding?: (findingText: string) => void;
}
```

### 标准代码结构骨架
```tsx
export function MyCustomSim({ lang, studioMode = true, onExportFinding }: StandardSimProps) {
  // 1. 参数与控制状态（受控或非受控）
  const [isPlaying, setIsPlaying] = useState(true);
  const [showPanels, setShowPanels] = useState(true);
  const [isExpanded, setIsExpanded] = useState(studioMode);
  
  // 2. 物理引擎与拖拽状态（useRef 保证 60FPS 零卡顿）
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const physicsRef = useRef({ x: 0, v: 0, a: 0, isDragging: false });

  // 3. 响应外部 studioMode 变更
  useEffect(() => {
    setIsExpanded(studioMode);
  }, [studioMode]);

  // 4. 60FPS 动力学循环
  useEffect(() => {
    let animId: number;
    const loop = (timestamp: number) => {
      // 物理步进计算与 Canvas 绘制...
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [/* 仅放入关键物理常数依赖，避免高频卸载重启 */]);

  // 5. 渲染：外层根据 showPanels 切换栅格
  return (
    <div className="space-y-4">
      {/* 顶部工具栏：快速预设、折叠开关、全屏开关 */}
      {/* 栅格布局：画布区（col-span-8 或 col-span-12）+ 控制面板（col-span-4） */}
    </div>
  );
}
```

---

## 4. 扩展新实验的三步操作指南（How to Add a New Lab）

任何后续 AI Agent 如需扩充新的互动实验室（例如光电效应、RC 充放电电路、受激辐射等），遵循以下三步即可：

### 第一步：在 `src/components/pedagogy/` 下编写仿真组件
- 命名：`[Topic]Sim.tsx`（例如 `PhotoelectricEffectSim.tsx`）。
- 遵循第 3 节的标准属性接口与 60FPS decoupled rAF 架构。
- 引入 `<MathHtml>` 展示 NRW 考纲核心公式。

### 第二步：在 `src/modules/laborRegistry.ts` 中注册元数据
在 `SIMULATION_REGISTRY` 数组中追加一项：
```typescript
{
  id: "photoelectric",
  titleDE: "Photoelektrischer Effekt & Planck-Wirkungsquantum",
  titleZH: "光电效应实验：截止电压、逸出功与普朗克常量",
  fach: "Physik",
  kategorie: "Quantenphysik",
  difficulty: "Fortgeschritten",
  icon: "photon",
  summaryDE: "Lichtquanten schlagen Elektronen aus Zinkplatten. Bestimmung von h.",
  summaryZH: "探究光子频率、截止电压与金属逸出功关系，模拟经典密立根实验验证光量子假说。",
  tags: ["Lichtquanten", "Austrittsarbeit", "Abitur-Kernlehrplan"],
  curriculumRef: "NRW Q1/Q2 Quantenphysik",
  phetSlug: "photoelectric",
}
```

### 第三步：在 `src/modules/Labor.tsx` 中挂载组件
在 `renderActiveSimulator()` 的 `switch (activeSimId)` 分支中增加：
```tsx
case "photoelectric":
  return <PhotoelectricEffectSim lang={lang} studioMode={isStudioExpanded} onExportFinding={handleExportFinding} />;
```

运行 `cmd /c "npm run build"` 即可验证通过并即刻上线！

---

## 5. 当前已实现 PhET 互动实验室清单

| 编号 | 仿真 ID | 中文名称 | 核心物理/数理模型与可调变量 |
|:---:|:---|:---|:---|
| 1 | `schiefe-ebene` | 斜面动力学博弈 | 倾角 $\alpha$、静/动摩擦因数 $\mu_s/\mu_k$、下滑力与摩擦阻力动态矢量平衡、碰撞缓冲回弹 |
| 2 | `spring` | 弹簧振子与受迫振动 | 劲度系数 $k$、悬挂质量 $m$、重力环境（地球/月球/火星/失重）、平衡位置漂移、阻尼衰减 |
| 3 | `skate` | 能量滑板公园 | 抛物线/双坡轨道、动能-势能-热能动态实时柱状图、机械能守恒定律 |
| 4 | `pendulum` | 单摆振动与光电门 | 摆长 $L$、摆角 $\theta$、小角度周期理论 $T=2\pi\sqrt{L/g}$、光电门周期实测 |
| 5 | `projectile` | 抛体运动与外弹道学 | 抛射角 $\theta$、初速度 $v_0$、发射高程 $h_0$、二次空气阻力、射程与落点判定 |
| 6 | `buoyancy` | 阿基米德浮力与密度 | 液体密度 $\rho_f$（纯水/油/蜂蜜）、材质与体积质量（木块/冰块/砖块/铝块）、沉浮临界判据 |
| 7 | `coulomb` | 库仑定律与静电场 | 双点电荷带电量 $q_1, q_2$、间距刻度尺平移 $r$、反平方律 $F \propto 1/r^2$、二维电场线分布 |
| 8 | `wave` | 双缝干涉与波动光学 | 光源波长 $\lambda$ (380-750nm)、缝宽/缝距 $d$、屏距 $L$、2D 波场与实时间距强度曲线 |
| 9 | `orbit` | 天体引力与开普勒轨道 | 中心星质量 $M$、环绕初速度 $v_0$、第一宇宙速度 $v_k$、逃逸速度 $v_{esc}$、开普勒第二/第三定律 |
| 10 | `circuit` | 欧姆定律与电路仿真 | 电压、电阻与电流动态发热比拟 |
| 11 | `optics` | 几何光学与斯涅尔折射 | 两种介质折射率、全反射临界角、光路折射率图谱 |
| 12 | `gas` | 理想气体状态方程 | 压强 $P$、体积 $V$、温度 $T$ 分子热运动动力学碰撞仿真 |
| 13 | `vector` | 二维矢量合成与正交分解 | 力的合成平行四边形定则、正交分量投影 |

---

## 6. 质量把控标准（Quality Gates）

任何修改或新功能提交前，必须满足：
1. **TypeScript 无损编译**：`npx tsc -b` 0 报错。
2. **生产构建检查**：`npm run build` 成功输出打包产物。
3. **Vault 数据合规性检查**：`python scripts/vault-check.py` 必须输出 `PASS`（0 badnames, 0 badglossar, 0 broken links）。
