---
fach: ""
thema: "PhET 批量重构与个性化落地规范及外部 AI 自审核手册"
operatoren: []
klausurrelevant: false
datum: 2026-09-28
tags: [EF, Meta, PhET, Labor, SOP, Architecture]
---

# PhET 批量重构与个性化落地规范及外部 AI 自审核手册
# PHET-CONVERSION-BATCH-SOP.md

> **文件定位**：本文件是 `C:\Users\rongj\Desktop\PheT` 离线仿真库向 `EF-GeWi-Lernvault` 本地原生组件批量移植、个性化升华与自动化自审核的**最高执行纲领与工业级 SOP**。  
> **面向对象**：Claude Code、GPT-4o、DeepSeek、Cursor Agent 或任何接手批量代码编写的外部自主 AI 与人类开发者。  
> **核心使命**：以**第一性原理物理建模与教学探究机制**为核心，将 120 款仿真实验**原创性重塑**为符合德国高中（Gymnasium EF/Q1/Q2）考纲、具备 Edward Tufte 学术出版物美学、支持双语认知脚手架的原生 React 18/TypeScript 交互工坊。

---

## 1. 知识产权与防侵权红线（Zero-Infringement Iron Law）

任何参与批量移植的 AI 必须**绝对恪守以下版权与知识产权铁律**。本仓库为公开学术代码库，严禁任何形式的侵权行为：

### 1.1 严禁侵权行为清单（绝对红线）
1. **严禁直接嵌入原版二进制/打包文件**：
   - 严禁将 `C:\Users\rongj\Desktop\PheT\sims` 下的原版 `*.html` 单文件打包体或 Scenery 专有运行时直接作为 `<iframe>` 或代码块内嵌到本项目中；
2. **严禁商标冒用（Trademark Policy）**：
   - "PhET" 及 PhET 官方 Logo 是科罗拉多大学校董会（Regents of the University of Colorado）的注册商标；
   - 严禁在软件主界面、导航栏、模块标题中将本项目或本模块命名为 "PhET"；
   - 本模块正规命名为：**`Labor`（实验研习工坊）** 或 **`EF-Physik-Labor`**；
   - 仅允许在学术参考或底层致敬副标题中使用纯学术声明，例如：*(Inspiriert von offenen Modellen der University of Colorado Boulder)*；
3. **彻底剔除原版卡通人物形象与立绘**：
   - 严禁复制或模仿原版的卡通角色立绘（例如 John Travoltage 搓地毯卡通人、卡通滑板狗、卡通人脸表情等）；
   - 一律重构为 **Edward Tufte 风格的学术工程图解**：抽象质点、极简滑块、光滑曲面、几何探针、矢量受力箭头与等高线；
4. **禁止新增任何未经许可的 npm 依赖包**：
   - 严禁引入三方游戏引擎（如 Phaser、Three.js、Pixi.js 等）；
   - 必须基于仓库现有的 **React 18 + 原生 HTML5 2D Canvas / 矢量 SVG + Tailwind CSS** 原创手写。

### 1.2 合规开发方法：洁净室重构（Clean-Room Reverse Engineering）
- **学什么**：仅学习其公开的**物理/数学微分方程、第一性原理受力模型、参数调节范围与教学探究变量**；
- **怎么写**：从第一行代码开始，采用本项目统一的 TSX 组件模板进行独立自主编写；
- **致谢规范**：在 `NOTICE.md` 中统一规范注明理论模型灵感来源：
  > *"Theoretical modeling and physics mechanics inspired by open science education resources from University of Colorado Boulder (PhET Project, GPLv3/MIT)."*

---

## 2. 视觉排版与 Tufte 学术工坊设计标准 (Design Guidelines)

所有生成的实验组件必须与主项目设计系统（[`PROJECT-DESIGN-GUIDELINES.md`](PROJECT-DESIGN-GUIDELINES.md)）完全融为一体，严禁花哨廉价的游戏化感：

### 2.1 配色方案映射表（高对比度学术墨水哲学）

| UI 元素 | CSS 变量 / Tailwind Token | 推荐 HEX 色值 | 适用场景与规范 |
| :--- | :--- | :--- | :--- |
| **画布舞台底色** | `var(--paper-subtle)` / `var(--paper)` | `#F4F4F5` / `#FAFAFA` | 默认物理实验台背景，柔和护眼 |
| **面板边线** | `var(--line)` | `#E4E4E7` (浅色) / `#27272A` (深色) | 0.5px 发丝级分割线，杜绝粗重黑框 |
| **墨水文字** | `var(--ink)` | `#18181B` (浅色) / `#F4F4F5` (深色) | 标题、刻度、关键数值标签 |
| **次级说明** | `var(--ink-muted)` | `#71717A` | 辅助说明、单位标注、未激活状态 |
| **动能 $E_{kin}$** | `emerald-800` / `emerald-900` | `#065f46` / `#022c22` | **严禁使用浅绿**，必须高对比深翡翠绿 |
| **重力势能 $E_{pot}$** | `blue-800` / `blue-900` | `#1e40af` / `#1e3a8a` | 深海蓝，标注文档与势能转化 |
| **热能/损耗 $E_{therm}$** | `rose-800` / `rose-900` | `#9f1239` / `#881337` | 宝石深红，摩擦耗散与错误警示 |
| **受力/电场矢量** | `zinc-700` / `amber-800` | `#3f3f46` / `#92400e` | 受力分解箭头、磁感线、电场线 |

> ⚠️ **严防弱对比度反面教材**：绝对禁止在浅色背景上使用 `text-emerald-200/300/400` 或黄色荧光文字！任何文本与背景的对比度必须 $\ge 7:1$（WCAG AAA 级）。

### 2.2 视觉排版铁律 (Editorial Spread Layout)
1. **破除“套娃卡片”（Anti-Box-in-Box）**：严禁在一个容器内部嵌套层叠多个圆角粗边框小卡片；
2. **纯手写内联 SVG（Zero Emoji Policy）**：
   - 界面上严禁使用 Emoji 表情符号（如 🚀, 🔬, ⚡️ 等）；
   - 所有按钮图标（播放、暂停、慢速、重置、面板折叠）一律手写 16x16 矢量 SVG，统一属性：`stroke="currentColor"`、`strokeWidth="1.4"`、`strokeLinecap="round"`；
3. **字体与数字排印**：
   - 标题：古典衬线体 `font-serif tracking-tight`；
   - 测量读数与仪表板：等宽排印 `font-mono tabular-nums`，杜绝数字跳动引起抖动。

---

## 3. 架构规范与核心交互工程准则 (Engineering Architecture)

### 3.1 统一双层控制模式与左侧常驻原则 (Studio Mode)
- **左侧导航永久固定**：
  - 软件左侧的学科/模块主导航栏**必须常驻可见**，严禁使用原生浏览器 `requestFullscreen()` 导致整屏被单一游戏占满而无法导航；
- **右侧工作区铺满**：
  - 激活实验工坊时，外层容器取消 `max-w-5xl` 限制，采用 `max-w-none px-0` 铺满右侧工作区；
  - 统一由顶层 `Labor.tsx` 控制 `[ ⤡ 退出宽屏 / ⤢ 宽屏全景模式 ]`，**子实验组件内部严禁再放全屏按钮**，杜绝多层按钮冲突；
  - 画布舞台高度自适应为 `h-[420px] sm:h-[480px]`（提升 33% 探究视野）。

### 3.2 变量面板一键折叠（Distraction-Free Exploration）
每个仿真器必须实现内部右侧参数面板的自由折叠机制：
```tsx
const [showPanels, setShowPanels] = useState(true);
```
- **展开态（`showPanels === true`）**：
  - 实验舞台占约 67%（`lg:col-span-8`）；
  - 右侧物理参数卡与调节滑块占约 33%（`lg:col-span-4`）；
- **折叠态（`showPanels === false`）**：
  - 右侧面板完全收起隐藏；
  - 实验舞台自动占满 100% 视口（`col-span-12`），提供纯净的沉浸式观察环境；
- 切换按钮置于舞台工具栏右上方：`[ ◧ 折叠侧栏 / ◩ 展开侧栏 ]`。

### 3.3 物理引擎与 React 渲染严格解耦（60FPS Decoupled rAF Loop）
- **性能红线**：严禁在 `requestAnimationFrame` 的物理帧循环中高频调用 `setState`！
- **正确实现标准**：
  1. 运动坐标、速度、加速度、粒子数组等所有高频演化数据保存在 `useRef` 中（如 `simRef`）；
  2. rAF 物理步进与 Canvas 2D 绘制在底层独立无顿挫运行，稳定保持 60 FPS；
  3. 数字读数面板通过**帧计数器节流（每 6 帧即约 10FPS 触发一次 React state 同步）**，消除界面顿挫与 React 垃圾回收延迟。

### 3.4 动态 DPR 自适应画布（彻底根治拉伸变形）
- **变形根源排查**：严禁在 `<canvas>` 标签上硬编码固定的 `width={640} height={380}` 属性并配合 CSS `w-full`！这会导致浏览器在窗口拉伸或切换宽屏时按非等比拉伸图像，导致正圆波前变椭圆、斜坡倾角失真。
- **强制解法**：在每一帧渲染或 `ResizeObserver` 尺寸变更时，实时获取 CSS 物理像素并乘以 `devicePixelRatio`：
  ```ts
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const dispW = Math.max(1, Math.floor(rect.width));
  const dispH = Math.max(1, Math.floor(rect.height));
  if (canvas.width !== Math.floor(dispW * dpr) || canvas.height !== Math.floor(dispH * dpr)) {
    canvas.width = Math.floor(dispW * dpr);
    canvas.height = Math.floor(dispH * dpr);
  }
  ctx.save();
  ctx.scale(dpr, dpr);
  // 执行基于真实 dispW, dispH 的数学绘制
  // ...
  ctx.restore();
  ```

### 3.5 无脱手指针捕获拖拽（Pointer Capture Standard）
拖拽可移动对象（如单摆球、滑块、电荷、活塞柄等）时，必须使用现代化 Pointer 事件并在 `onPointerDown` 中捕获指针：
```ts
const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
  e.currentTarget.setPointerCapture(e.pointerId);
  // 记录拖拽初始状态
};
const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
  if (e.currentTarget.hasPointerCapture(e.pointerId)) {
    e.currentTarget.releasePointerCapture(e.pointerId);
  }
};
```
杜绝鼠标在快速滑动飞出画布边缘时发生断连或物体卡死的糟糕体验。

---

## 4. 双语学术脚手架标准 (Bilingual Pedagogy Standard)

每个移植组件不仅是物理动画，更是德国高中高分辅导工具。每个组件底部必须固定渲染以下 4 大教学脚手架卡片：

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
  {/* 1. 第一性原理与公式推导 */}
  <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
    <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">01 / Formel & Gesetz</div>
    <div className="font-serif font-medium text-[var(--ink)] mb-1">{formulaName}</div>
    <div className="font-mono text-xs text-[var(--accent)] mb-1.5">{formulaKaTeX}</div>
    <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">{formulaDesc}</p>
  </div>

  {/* 2. 北威州高中 KLP 考纲点与典型题型 */}
  <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
    <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">02 / Abitur KLP NRW</div>
    <div className="font-serif font-medium text-[var(--ink)] mb-1">{curriculumTopic}</div>
    <div className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
      <strong>Operator:</strong> <code className="bg-[var(--paper-subtle)] px-1">{operator}</code>
      <p className="mt-1">{curriculumTask}</p>
    </div>
  </div>

  {/* 3. 中国留学生直觉速记法（CN-Methode） */}
  <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
    <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">03 / 🇨🇳 CN-Methode</div>
    <div className="font-serif font-medium text-[var(--ink)] mb-1">{cnMethodTitle}</div>
    <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">{cnMethodIntuition}</p>
  </div>

  {/* 4. 一键回流至 AI 助教研讨 */}
  <div className="p-3 bg-[var(--surface)] border border-[var(--line)] flex flex-col justify-between">
    <div>
      <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">04 / KI-Tutor Dialog</div>
      <div className="font-serif font-medium text-[var(--ink)] mb-1">Befunde exportieren</div>
      <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
        Übertrage die aktuellen Messwerte direkt in den KI-Tutor zur vertieften Analyse.
      </p>
    </div>
    <button
      onClick={() => onExportFinding?.(generateReport())}
      className="mt-2.5 w-full py-1.5 px-2 bg-[var(--paper-subtle)] hover:bg-[var(--line)] text-[var(--ink)] border border-[var(--line)] text-[11px] font-medium transition-colors"
    >
      An Tutor senden ↗
    </button>
  </div>
</div>
```

---

## 5. 120 款仿真器批量全景分类与 6 大批次路线图 (Batch Waves)

根据 `C:\Users\rongj\Desktop\PheT\catalog.json` 目录结构与德国文理中学理科大纲，规划以下 6 大批次。外部 AI 可按批次（Wave 1 ~ Wave 6）或按单个 ID 批量执行：

### 🌊 Wave 1：经典力学与动力学（Mechanik & Dynamik，最优先）
| 建议 SimID | 德语标题 | 中文标题 | 对照 PhET 原型目录名 | 核心公式与探究点 |
| :--- | :--- | :--- | :--- | :--- |
| `skate` | Energie-Skaterpark | 能量滑板场 | `energy-skate-park` | $E_{ges} = E_{kin} + E_{pot} + E_{therm}$；无轨滑板、动能/势能饼图 |
| `pendulum` | Pendel-Labor | 单摆实验室 | `pendulum-lab` | $T = 2\pi\sqrt{L/g}$；非线性单摆微分方程、摆长调控、光电门计时 |
| `spring` | Masse-Feder-System | 弹簧振子系统 | `masses-and-springs` | $T = 2\pi\sqrt{m/k}$；弹簧胡克定律、天体重力场、受迫阻尼振动 |
| `projectile` | Wurfbewegung | 抛体运动 | `projectile-motion` | 抛射角 $\theta$、初速 $v_0$、二次空气阻力模型、射程与落点精度 |
| `schiefe-ebene` | Schiefe Ebene | 斜面动力学 | 自研/扩展自 `forces-and-motion-basics` | $F_{GH}=mg\sin\alpha$、$F_R \le \mu mg\cos\alpha$；摩擦自锁临界角 |
| `collision` | Stoß-Labor | 二维弹性碰撞 | `collision-lab` | 动量守恒 $\vec{p}_1 + \vec{p}_2 = \vec{p}'_1 + \vec{p}'_2$、动能守恒判定 |
| `orbit` | Gravitation & Orbits | 天体引力与公转 | `gravity-and-orbits` | $F=G\frac{Mm}{r^2}$；第一宇宙速度、逃逸速度、开普勒三定律 |
| `lever` | Drehmoment & Hebel | 杠杆与力矩平衡 | `balancing-act` | $\sum M = \sum (F_i \cdot l_i) = 0$；重物质量、支点力臂微调 |
| `hooke` | Hookesches Gesetz | 胡克定律弹性实验 | `hookes-law` | $F = -k\cdot \Delta x$；串并联弹簧刚度等效计算 |
| `friction` | Reibungsphysik | 接触面微观摩擦 | `friction` | 界面原子热振动发热模拟、静摩擦到动摩擦过渡 |

### 🌊 Wave 2：波动光学与电磁学（Wellen, Optik & Elektromagnetismus）
| 建议 SimID | 德语标题 | 中文标题 | 对照 PhET 原型目录名 | 核心公式与探究点 |
| :--- | :--- | :--- | :--- | :--- |
| `wave` | Doppelspalt-Interferenz | 双缝干涉与波动 | `wave-interference` | $\Delta y = \frac{L\lambda}{d}$；光波衍射干涉场、动态光屏、光强分布 |
| `optics-refraction`| Lichtbrechung | 几何光学与折射定律 | `bending-light` | $n_1\sin\alpha = n_2\sin\beta$；全反射临界角、光速比值色散 |
| `optics-lens` | Dünne Linsen & Spiegel | 凸透镜成像实验 | `geometric-optics` | $\frac{1}{f} = \frac{1}{g} + \frac{1}{b}$；实像/虚像、三条特殊光线 |
| `circuit-dc` | Stromkreis DC | 直流电路与欧姆定律 | `circuit-construction-kit-dc` | $I=U/R, P=UI$；串并联支路电流分流、滑动变阻器 |
| `coulomb` | Coulomb-Gesetz | 库仑定律与静电力 | `coulombs-law` | $F=\frac{1}{4\pi\varepsilon_0}\frac{\|q_1 q_2\|}{r^2}$；双电荷距离调控与矢量指示 |
| `charges-fields`| Ladungen & Felder | 二维电荷与电场线 | `charges-and-fields` | 电势等势线绘制、电偶极子场强矢量阵列 |
| `faraday` | Elektromagnetische Induktion| 法拉第电磁感应 | `faradays-law` | $\mathcal{E} = -\frac{d\Phi}{dt}$；磁铁穿过螺线管、灯泡亮度、检流计偏转 |
| `wave-string` | Seilwellen & Resonanz | 绳波与驻波谐振 | `wave-on-a-string` | $v=\sqrt{T/\mu}$；驱动端频率、固定/自由端反射、驻波节点 |

### 🌊 Wave 3：热力学与物质状态（Thermodynamik & Phasen）
| 建议 SimID | 德语标题 | 中文标题 | 对照 PhET 原型目录名 | 核心公式与探究点 |
| :--- | :--- | :--- | :--- | :--- |
| `gas` | Ideales Gasgesetz | 理想气体状态方程 | `gas-properties` | $pV = nRT$；活塞压缩、分子平均动能与温度、压力计波动 |
| `buoyancy` | Dichte & Auftrieb | 密度与阿基米德浮力 | `buoyancy` | $F_A = \rho_{Fl}\cdot V_{verd}\cdot g$；物体沉浮条件、排液体积测定 |
| `states-matter` | Aggregatzustände | 物质三态与相变 | `states-of-matter` | 固-液-气三态分子间范德华力、加热/冷却曲线、潜热 |
| `under-pressure`| Hydrostatischer Druck | 液体内部压强 | `under-pressure` | $p(h) = p_0 + \rho g h$；U型连通管、帕斯卡水压机原理 |
| `diffusion` | Teilchendiffusion | 粒子扩散速率 | `diffusion` | 菲克定律、分子质量对扩散方均根速率的影响 |

### 🌊 Wave 4：近代物理与量子微观（Moderne Physik & Quanten）
| 建议 SimID | 德语标题 | 中文标题 | 对照 PhET 原型目录名 | 核心公式与探究点 |
| :--- | :--- | :--- | :--- | :--- |
| `photoelectric` | Photoelektrischer Effekt | 光电效应与光子论 | `photoelectric` | $E_{kin,max} = h\nu - W_A$；截止电压、光强与电流、极限频率 |
| `rutherford` | Rutherford-Streuung | 卢瑟福 $\alpha$ 粒子散射 | `rutherford-scattering` | 原子核库仑排斥势、极少数大角度反弹、原子核式结构 |
| `hydrogen-atom` | Bohr-Wasserstoffmodell | 玻尔氢原子能级跃迁 | `models-of-the-hydrogen-atom` | $\Delta E = h\nu = E_n - E_m$；吸收/发射光谱线、巴尔末系 |
| `blackbody` | Schwarzkörperstrahlung | 黑体辐射谱 | `blackbody-spectrum` | 维恩位移定律 $\lambda_{max}T=b$、普朗克辐射公式、斯特藩-玻尔兹曼定律 |

### 🌊 Wave 5：化学反应与微观平衡（Chemie-Labore）
| 建议 SimID | 德语标题 | 中文标题 | 对照 PhET 原型目录名 | 核心公式与探究点 |
| :--- | :--- | :--- | :--- | :--- |
| `titration` | Säure-Base-Titration | 酸碱滴定曲线 | 自研/扩展自 `ph-scale` | $\text{pH} = -\log[H^+]$；滴定终点突跃、酚酞/甲基橙变色点 |
| `molecule-shape`| VSEPR Molekülgeometrie | 价层电子对互斥理论 | `molecule-shapes` | 孤对电子排斥、直线/平面三角/四面体构型 3D 旋转 |
| `equilibrium` | Chemisches Gleichgewicht| 勒夏特列化学平衡 | `reactants-products-and-leftovers` | 压强/温度移动平衡移动、哈伯制氨法最优产率调控 |
| `concentration`| Molarität & Lambert-Beer| 溶液浓度与比尔定律 | `beers-law-lab` | $A = \varepsilon \cdot c \cdot d$；吸光度与光程、分光光度计比色 |

### 🌊 Wave 6：高中数学与生物探究（Mathematik & Biologie）
| 建议 SimID | 德语标题 | 中文标题 | 对照 PhET 原型目录名 | 核心公式与探究点 |
| :--- | :--- | :--- | :--- | :--- |
| `vector` | Vektor-Addition 2D | 二维向量合成与分解 | `vector-addition` | $\vec{c} = \vec{a} + \vec{b}$；平行四边形定则、正交分量投影 |
| `calculus` | Ableitungs- & Tangentenlabor | 导数与切线斜率探究 | `calculus-grapher` | $f'(x) = \lim_{\Delta x \to 0}\frac{\Delta y}{\Delta x}$；割线逼近切线、导函数动态波形 |
| `probability` | Plinko Galton-Brett | 高尔顿板与正态分布 | `plinko-probability` | 二项分布逼近正态分布钟形曲线、大数定律模拟 |
| `membrane` | Membrantransport | 细胞膜被动与主动运输 | `membrane-transport` | 脂双分子层、通道蛋白、浓度梯度扩散与 ATP 泵泵入 |
| `neuron` | Aktionspotenzial | 神经元动作电位脉冲 | `neuron` | 钠钾离子通道启闭、极化/去极化/复极化/超极化全过程 |

---

## 6. 标准组件代码工程范式模版 (Production-Ready Template)

外部 AI 编写任何新仿真组件时，必须以以下 TSX 模板为基准骨架，保存在 `App-EF-Lernvault/src/components/pedagogy/[Component]Sim.tsx`：

```tsx
import React, { useRef, useEffect, useState, useCallback } from "react";
import type { Lang } from "../../i18n";

export interface StandardSimProps {
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

export const SamplePhysicsSim: React.FC<StandardSimProps> = ({
  lang,
  studioMode = true,
  onExportFinding,
}) => {
  const isZh = lang === "zh";

  // 1. 探究变量状态（由用户滑动调节）
  const [paramL, setParamL] = useState<number>(1.0); // 长度 (m)
  const [gravity, setGravity] = useState<number>(9.81); // 重力加速度 (m/s^2)
  const [paused, setPaused] = useState<boolean>(false);
  const [slowMo, setSlowMo] = useState<boolean>(false);
  const [showPanels, setShowPanels] = useState<boolean>(true);

  // 2. 测量读数节流状态（每 6 帧更新一次，保证 React 性能）
  const [readout, setReadout] = useState({ period: 2.01, velocity: 0, energy: 0 });

  // 3. 物理引擎 Ref（完全脱离 React state 避免掉帧）
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const physicsRef = useRef({
    theta: Math.PI / 6,
    omega: 0,
    alpha: 0,
    time: 0,
    frameCount: 0,
  });

  // 4. 重置状态回调
  const handleReset = useCallback(() => {
    physicsRef.current.theta = Math.PI / 6;
    physicsRef.current.omega = 0;
    physicsRef.current.alpha = 0;
    physicsRef.current.time = 0;
  }, []);

  // 5. 60 FPS 物理微分循环与动态 DPR 画布渲染
  useEffect(() => {
    let animId: number;
    let lastTs = performance.now();

    const loop = (now: number) => {
      animId = requestAnimationFrame(loop);
      const dtRaw = Math.min((now - lastTs) / 1000, 0.05);
      lastTs = now;
      const dt = slowMo ? dtRaw * 0.3 : dtRaw;

      const p = physicsRef.current;
      if (!paused) {
        // 第一性原理微分方程迭代（如 Runge-Kutta 或半隐式 Euler）
        p.alpha = -(gravity / paramL) * Math.sin(p.theta);
        p.omega += p.alpha * dt;
        p.theta += p.omega * dt;
        p.time += dt;
      }

      // 节流同步读数给 React DOM
      p.frameCount++;
      if (p.frameCount % 6 === 0) {
        const theoreticalPeriod = 2 * Math.PI * Math.sqrt(paramL / gravity);
        const v = Math.abs(p.omega * paramL);
        setReadout({
          period: Number(theoreticalPeriod.toFixed(3)),
          velocity: Number(v.toFixed(2)),
          energy: Number((0.5 * v * v).toFixed(2)),
        });
      }

      // 动态 DPR Canvas 渲染
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const dispW = Math.max(1, Math.floor(rect.width));
      const dispH = Math.max(1, Math.floor(rect.height));

      if (canvas.width !== Math.floor(dispW * dpr) || canvas.height !== Math.floor(dispH * dpr)) {
        canvas.width = Math.floor(dispW * dpr);
        canvas.height = Math.floor(dispH * dpr);
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, dispW, dispH);

      // --- 绘制实验背景网格与物理对象 (Tufte 高雅学术风格) ---
      // (在此编写具体的物理图形、矢量箭头、能量条形图绘制代码)

      ctx.restore();
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [paused, slowMo, paramL, gravity]);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* 实验舞台与控制面板主体 */}
      <div className="grid grid-cols-12 gap-3 items-start">
        {/* 物理画布舞台 (折叠时占满 12 列，展开时占 8 列) */}
        <div className={`relative ${showPanels ? "col-span-12 lg:col-span-8" : "col-span-12"} transition-all duration-200`}>
          <div className="relative border border-[var(--line)] bg-[var(--paper-subtle)] overflow-hidden">
            {/* 顶层实验标题与操作栏 */}
            <div className="px-3 py-2 border-b border-[var(--line)] bg-[var(--surface)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-serif font-medium text-xs text-[var(--ink)]">
                  {isZh ? "单摆实验室与谐振周期" : "Pendel-Labor & Schwingungsdauer"}
                </span>
                <span className="font-mono text-[10px] text-[var(--ink-muted)]">
                  L = {paramL.toFixed(2)} m | g = {gravity.toFixed(2)} m/s²
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setShowPanels(!showPanels)}
                  className="px-2 py-0.5 text-[11px] font-mono border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--surface)] text-[var(--ink)]"
                  title={showPanels ? "面板折叠" : "展开面板"}
                >
                  {showPanels ? "◧ 折叠侧栏" : "◩ 展开侧栏"}
                </button>
              </div>
            </div>

            {/* 60FPS 画布容器 (自适应 Studio 高度) */}
            <div className="w-full h-[420px] sm:h-[480px]">
              <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />
            </div>

            {/* 底部播放/暂停/慢速/重置控制条 */}
            <div className="px-3 py-2 border-t border-[var(--line)] bg-[var(--surface)] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-mono">
                <button
                  onClick={() => setPaused(!paused)}
                  className="px-2.5 py-1 border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--surface)] font-medium text-[var(--ink)]"
                >
                  {paused ? "▶ Fortsetzen" : "⏸ Pause"}
                </button>
                <button
                  onClick={() => setSlowMo(!slowMo)}
                  className={`px-2.5 py-1 border border-[var(--line)] font-medium ${
                    slowMo ? "bg-[var(--accent)] text-white" : "bg-[var(--paper-subtle)] text-[var(--ink)]"
                  }`}
                >
                  0.3x Slow
                </button>
                <button
                  onClick={handleReset}
                  className="px-2.5 py-1 border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--surface)] text-[var(--ink)]"
                >
                  ↺ Reset
                </button>
              </div>

              {/* 实时物理指标读数 (等宽数字) */}
              <div className="flex items-center gap-3 font-mono text-[11px] text-[var(--ink)]">
                <span>T = <strong className="text-[var(--accent)]">{readout.period.toFixed(3)}</strong> s</span>
                <span>v = <strong>{readout.velocity.toFixed(2)}</strong> m/s</span>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧参数控制面板 (当 showPanels 为 false 时隐藏) */}
        {showPanels && (
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
            <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
              <div className="font-serif font-medium text-xs text-[var(--ink)] mb-3 pb-1 border-b border-[var(--line)]">
                {isZh ? "物理参数调控" : "Physikalische Parameter"}
              </div>

              {/* 调节滑块 1 */}
              <div className="mb-3">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span>{isZh ? "摆长 (L)" : "Fadenlänge (L)"}</span>
                  <span className="font-medium text-[var(--accent)]">{paramL.toFixed(2)} m</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="2.5"
                  step="0.05"
                  value={paramL}
                  onChange={(e) => setParamL(parseFloat(e.target.value))}
                  className="w-full accent-[var(--accent)]"
                />
              </div>

              {/* 调节滑块 2 */}
              <div className="mb-1">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span>{isZh ? "重力场 (g)" : "Gravitation (g)"}</span>
                  <span className="font-medium text-[var(--accent)]">{gravity.toFixed(2)} m/s²</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 mt-1.5 font-mono text-[11px]">
                  <button onClick={() => setGravity(9.81)} className={`py-1 border border-[var(--line)] ${gravity === 9.81 ? "bg-[var(--ink)] text-white" : "bg-[var(--paper-subtle)] text-[var(--ink)]"}`}>Erde (9.81)</button>
                  <button onClick={() => setGravity(1.62)} className={`py-1 border border-[var(--line)] ${gravity === 1.62 ? "bg-[var(--ink)] text-white" : "bg-[var(--paper-subtle)] text-[var(--ink)]"}`}>Mond (1.62)</button>
                  <button onClick={() => setGravity(3.71)} className={`py-1 border border-[var(--line)] ${gravity === 3.71 ? "bg-[var(--ink)] text-white" : "bg-[var(--paper-subtle)] text-[var(--ink)]"}`}>Mars (3.71)</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部四列双语学术脚手架 */}
      {/* (按 §4 双语学术脚手架规范填写) */}
    </div>
  );
};
```

---

## 7. 即用型外部 AI 批量执行提示词 (External AI Execution Master Prompt)

用户可直接复制以下 Prompt 发送给任意外部 AI（如 Claude 3.5 Sonnet / Opus, GPT-4o, Cursor Agent, DeepSeek-V3 等）开始批量执行：

```markdown
### 外部 AI 执行任务书：PhET 物理仿真器原创重构与落位

你被指派为 EF-GeWi-Lernvault 系统的物理/数学/化学互动仿真器高级架构师。
你的任务是将离线目录 `C:\Users\rongj\Desktop\PheT\sims` 中的目标实验原型，依照仓库宪法 `00_META/PHET-CONVERSION-BATCH-SOP.md` 与 `PROJECT-DESIGN-GUIDELINES.md`，原创实现为本项目内部的高水准 TSX 组件。

【本次指派的目标仿真器】：
- 目标 SimID：[在此填入建议 SimID，例如 wave-string 或 photoelectric]
- 目标主题：[在此填入学科与主题名称]
- 参考 PhET 原型目录名：`C:\Users\rongj\Desktop\PheT\sims\[目录名]`

【必须绝对遵守的执行铁律】：
1. 严禁侵权：严禁复制/内嵌原版打包的 HTML/JS，严禁在界面显示 "PhET" 商标（命名统一为 Labor 研习工坊），严禁使用原版卡通人物立绘，一律采用 Tufte 纯几何工程图解；
2. 视觉排版：严格使用 Tufte 极简学术设计系统（`var(--paper)`, `var(--ink)`, `var(--line)`），杜绝低对比度文字（严禁在浅色背景上使用浅绿/浅黄），零 Emoji，统一手写 16x16 矢量 SVG；
3. 架构与性能：
   - 物理状态保存在 `useRef`，60FPS rAF 解耦更新，严禁每帧调用 `setState`；DOM 读数每 6 帧节流一次；
   - Canvas 必须动态绑定 DPR（`canvas.width = Math.floor(rect.width * dpr)` + `ctx.scale(dpr, dpr)`），严禁静态宽高拉伸变形；
   - 交互拖拽必须使用 `setPointerCapture` / `releasePointerCapture`；
   - 必须提供 `[ ◧ 折叠侧栏 / ◩ 展开侧栏 ]`，折叠时画布舞台自动占满 100% 宽度；
4. 德汉双语脚手架：底部必须提供完整的 4 联排学术卡片（第一性原理公式 KaTeX、德国北威州考纲点与典型题型、🇨🇳 CN-Methode 直觉速记、一键将数据导出至 AI 助教研讨）；
5. 注册与挂载：
   - 在 `App-EF-Lernvault/src/components/pedagogy/[SimName]Sim.tsx` 创建组件；
   - 在 `App-EF-Lernvault/src/modules/laborRegistry.ts` 追加对应的 `LaborSimId` 与元数据字典项；
   - 在 `App-EF-Lernvault/src/modules/Labor.tsx` 中挂载该组件。

【输出要求】：
直接输出完整的代码文件，并执行自审核清单，确认无任何 TypeScript 报错。
```

---

## 8. 外部 AI 自审核清单与自动化验收门禁 (Self-Audit Checklist)

外部 AI 在交付代码前，必须对照以下 **10 项死命令（Audit Gateways）** 进行逐条自检：

- [ ] **1. 版权与商标无侵权**：未内嵌任何 PhET 专有闭包或单文件 HTML，UI 主标题中无 "PhET" 品牌侵权，无任何卡通人脸立绘，代码 100% 洁净室手写。
- [ ] **2. 依赖零增加**：没有通过 npm/yarn 安装任何新包，所有逻辑均基于 React 18 + 原生 Canvas/SVG + Tailwind 完成。
- [ ] **3. 性能解耦无卡顿**：运动参量存放在 `useRef` 中，rAF 循环内无每帧 `setState`，DOM 数字读数采用每 6~10 帧节流。
- [ ] **4. 画布拉伸无变形**：移除了 `<canvas width={640}>` 等静态尺寸，每帧通过 `getBoundingClientRect()` 动态获取视口并乘以 `devicePixelRatio`，圆形波前与粒子严格 1:1 无椭圆拉伸。
- [ ] **5. 指针手势防脱手**：所有拖拽交互均挂载 `setPointerCapture` 与 `releasePointerCapture`，鼠标快速滑出舞台绝不卡死。
- [ ] **6. 面板折叠无遮挡**：支持 `[ ◧ 折叠侧栏 / ◩ 展开侧栏 ]`，折叠后舞台铺满 100%（`col-span-12`），展开时分栏 8:4。
- [ ] **7. Tufte 学术视觉合规**：全界面无 Emoji，底色采用 `var(--paper)` 系列，对比度符合 WCAG AAA，能量采用深翡翠绿/深海蓝/宝石深红。
- [ ] **8. 双语与德国考纲脚手架**：底部具备完整的四联排卡片（公式推导、NRW EF 考点与 Operator、🇨🇳 CN-Methode、导出至 AI 助教按钮）。
- [ ] **9. 注册挂载闭环**：新组件已在 `laborRegistry.ts` 中注册并配置多语言标签，且在 `Labor.tsx` 动态渲染映射中挂载。
- [ ] **10. 严格命令静态检查通过**：
  ```powershell
  cd App-EF-Lernvault
  npx tsc -b                     # 必须 0 errors
  npm run build                  # 必须构建通过
  cd ..
  python scripts/vault-check.py  # 必须完全 PASS
  ```

---
*EF-GeWi-Lernvault Architecture & Pedagogy Committee · 2026-09-28*
