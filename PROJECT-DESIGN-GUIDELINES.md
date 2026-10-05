# EF-GeWi-Lernvault 项目设计方案与架构策略全景指南
# PROJECT-DESIGN-GUIDELINES.md

> 本文件是 EF-GeWi-Lernvault 系统的**设计、架构、交互与扩展实施总纲**。
> 任何 AI Agent（Gemini / Claude Code / OpenAI / 其他自主智能体）或人类开发者在为本项目创建、重构、扩展模块或移植仿真实验前，**必须完整研读并严格恪守**本指南中的各项方案与策略。

---

## 1. 项目定位与核心哲学 (Mission & Philosophy)

### 1.1 项目使命
本项目是专为**德国北威州高级文理中学引入期（Gymnasium Einführungsphase, EF）**打造的双语高能学术辅导与深度学习工作站。
系统深度整合：
1. **德语区文理中学顶级学术规范**：严格对齐 KLP (Kernlehrplan) 考纲、AFB I-III 认知梯度、Operatoren 指令词与官方评分细则（Erwartungshorizont, EHZ）；
2. **爱德华·塔夫特（Edward Tufte）数据墨水比设计**：摒弃廉价卡通化与臃肿卡片堆砌，追求学术出版物级的排版沉静感与信息密度；
3. **科罗拉多大学 PhET 风格可探究微世界（Interactive Micro-Worlds）**：第一性原理物理/数学动态模拟，60 FPS 丝滑微观可交互体验；
4. **认知门禁（Cognitive Gating）垂直画卷式微课**：一图一解、答对解锁、平滑顺流。

### 1.2 核心模式隔离策略（开发者模式 vs 普通学生模式）
- **普通学习者模式（Default Normal User）**：
  - 侧边栏与主导航保持极度专注与纯净，仅保留正式学习、复习、练习模块；
  - **`designlab`（设计展厅 / 开发者测试室）默认绝对对普通用户隐藏**，杜绝未打磨的临时 UI 与试验性画卷造成学习认知干扰。
- **开发者与测试模式（Developer Mode / Dev-Mode）**：
  - 触发机制：
    1. 浏览器 URL 参数注入 `?dev=1`；
    2. 本地存储持久化标识 `localStorage.getItem("ef_dev_mode") === "true"`；
    3. 全局隐蔽快捷键 `Ctrl + Shift + D` 瞬间切换；
    4. 设置中心（Settings §8）直观开关勾选。
  - 开启效果：在侧边栏、快捷搜索（Command Palette）中解锁 `Design-Lab`，供开发者测试全量原子组件、颜色梯度与微观交互。

### 1.3 模块化研发生命周期铁律 (Modular Production Protocol: Isolate ➔ Test ➔ Integrate ➔ Verify)
后续凡涉及任何交互板块（仿真实验、学科工坊、研习组件、真题评分台等）的开发与升级，**严禁在未完工状态下随手并入全局视图**，必须完整落实四步闭环：
1. **第一步：独立制作（Isolate & Build）**：
   - 提取或创建独立的组件文件（如 `SinusMilieusSim.tsx`, `TrilemmaSim.tsx`），保持内部状态自闭环；
   - **全景可视原则**：每个模式或子 Tab（如画像漫游、因果推演、真题解构）必须配备核心视觉画布或结构化流转图谱，**严禁出现只留滑块、无画布、大片空白的未设计半成品**。
2. **第二步：独立交互测试（Standalone Testing & Verification）**：
   - 在独立或 Dev-Mode 沙盒中完成全部交互验证；
   - 检验滑块调控与图表/动画的强联动（参数变动时图形必有直观响应）；
   - 检验 SVG 缩放中心绑定（必须显式标注 `transformOrigin: \`${cx}px ${cy}px\`` 与 `transformBox: "view-box"`，杜绝偏心位移）；
   - 检验排版色彩合规性（**绝对禁用绿色/彩色字体与杂色背景**，严格恪守 Tufte 纯黑白纸墨标准，对比度达到 AAA 级）。
3. **第三步：系统接入与集成（System Integration）**：
   - 在路由总线（如 `Labor.tsx`, `Reise.tsx`）中建立精确匹配与白名单分流，禁止粗暴的泛类型 fallback，杜绝跨学科串味；
   - 确保组件属性（Props）、多语言（`lang`）、状态复位（`useEffect` 监听 ID 切换）完整对齐。
4. **第四步：端到端回归验证（E2E Regression Testing）**：
   - 终端静态类型校验通过：`cmd /c "npx tsc -b"` 零报错；
   - 运行自动化验证脚本与交互仿真；
   - 确认无副作用后，按学科独立 Commit 入库并记录 Journal。

---

## 2. 仓库规范与知识库宪法 (Vault Constitutional Rules)

### 2.1 目录拓扑与落位准则（严禁私创顶层目录）
```
00_META/            # 全局目标、考纲总览、术语表、索引、日志、设计指南
01_Deutsch/         # 德语文学与社论剖析
02_Englisch/        # 英语文化与跨语言调解 (Mediation)
07_Philosophie/     # 哲学伦理与人学思考
08_SoWi/            # 政治学、经济学、社会学综合
03_Mathe/ ~ 06_Bio/ # 理科模块（数学、物理、化学、生物）
09_Musik/ 10_Sport/ # 艺术与体育口试学科
Templates/          # 唯一模板库（新建笔记必须套用模版）
Skills/             # 考试技能定义库 (SKILL.md)
Lernreise/          # 交互课程脚本源（只读消费源，Lesson-v3 规范）
App-EF-Lernvault/   # 跨平台桌面/Web客户端源码（React 19 + Vite 7 + Tailwind v4 + Tauri）
scripts/            # 自动化审计脚本与工具
```

### 2.2 文件命名铁律 (Kebab-Case without Umlauts)
- 格式：`Fach-Thema-DE-kebab-case.md`（如 `SoWi-Wertpapierdepot-Orderarten-L1.md`）；
- **严禁变音符号与空格**：德语变音符号必须转写为 `ae / oe / ue / ss`，文件名禁止任何空格——由 `scripts/vault-check.py` 严格校验阻断。

### 2.3 知识笔记八段结构 (Wissensnotiz 8-Section Standard)
新笔记必须套用 `Templates/Wissensnotiz-Template.md`，必须包含以下八大支柱：
1. **中文直觉理解**：以生动直观的比喻或第一性原理建立心智模型；
2. **核心概念与法条/学说**：德语精准学术定义、德语原典引用、法律条款（如 § 92 KAGB, § 10 GWG）；
3. **知识系统结构**：传导链条、机制对比、机理解剖；
4. **解题方法论**：面对不同 Operator（如 analysieren, beurteilen）的步骤法则；
5. **🇨🇳 CN-Methode 速记法**：中国留学生考场快速突破的象限法、口诀或几何解构图；
6. **Klausur-Training**：梯度真题（AFB I-III）与标准评分细则（EHZ）；
7. **高频丢分陷阱（Fehlerquellen）**：考场典型概念混淆与扣分点防范；
8. **学科交叉网络（Vernetzung）**：跨学科横向思维联结（如 SoWi 市场机制与哲学罗尔斯正义论）。

### 2.4 三处同步闭环原则 (Tri-Sync Rule)
每当新增一个主题知识点或微课：
1. **索引登记**：在 `00_META/INDEX.md` 学科目录下新增一行双向锚点；
2. **术语录入**：在 `00_META/Glossar-DE-ZH-GeWi.md` 追加标准 4 列术语表格行；
3. **卡片生成**：在各科 `Vokabeln-Anki/*.csv` 追加 5 列标准 Anki 卡片行（分号分隔，UTF-8）。
一次 commit 必须包含上述三处同步。

---

## 3. 视觉与排版系统规范 (Tufte Editorial UI System)

### 3.1 核心调色板与对比度要求（拒绝浅绿浅黄弱对比）
| 角色 | 变量/Token | Hex 色值 | 适用场景 |
| :--- | :--- | :--- | :--- |
| **纸张底色** | `--paper` | `#FAFAFA` | 默认文献页面纯净白纸底 |
| **微光底衬** | `--paper-subtle` | `#F4F4F5` | 实验台面板、批注边框背景 |
| **工作台板** | `--surface` | `#FFFFFF` | 交互画布、输入卡片顶层 |
| **印刷墨色** | `--ink` | `#18181B` | 正文字体、一级标题、主刻度 |
| **古典边线** | `--line` | `#E4E4E7` | 0.5px 发丝级分割线与边框 |
| **学术蓝调** | `--accent` | `#2563EB` | 重点链接、关键参数、高亮标记 |
| **森林深墨** | `emerald-950` / `emerald-900` | `#022c22` | 正向判定、正确选项、能量动能 |
| **宝石深红** | `rose-900` / `rose-700` | `#881337` | 错误阻断、重力势能、通胀剪刀差 |

> **关键准则**：严禁在浅色背景上使用 `text-emerald-200/300` 或浅黄色文字！在暗色模式与浅色模式切换时，文字必须保持 9:1 以上 WCAG AAA 级高对比度。

### 3.2 跨页排版（Editorial Spread）破除“套娃卡片”
- **禁止“框中框”（Box-in-Box）堆砌**：不要在一个卡片里套 8 个圆角粗边框小卡片；
- **采用学术报刊跨页风格**：
  - 极简章节眉标（如 `01 / PROBLEMSTELLUNG`）；
  - 古典衬线体大标题（`font-serif text-xl sm:text-2xl`）；
  - 德汉原声双语引言（Pullquote）；
  - 自然文献垂直流：顶栏无粗暴固定悬浮遮挡（Zero Sticky Blocking），保证 100% 垂直视野。

### 3.3 图标与图形规范 (Zero Emoji Policy)
- **禁止 emoji 滥用**：严禁在生产级界面或导航中大量使用表情符号；
- **手写内联轻量 SVG**：所有导航与操作图标统一手写 16x16 矢量 SVG，`stroke="currentColor"`，线条粗细固定为 `1.4px ~ 1.5px`，`strokeLinecap="round"`。

---

## 4. 探究式微课画卷设计策略 (Interactive Lecture Theatre)

### 4.1 垂直流式无播放键哲学 (Vertical Scroll Stream)
- 放弃视频播放条与传统的左右翻页 PPT 模式；
- 采用垂直长画卷（Vertical Continuous Monograph）：一幅动态可交互原理图 + 紧凑考纲讲解文字 + 即时理解检查点。

### 4.2 认知门禁状态机 (Cognitive Gating Engine)
- **逐节递进展开（Progressive Unfolding）**：
  - 用户初次进入微课时，下方未学内容完全不渲染，避免下拉刷屏造成的浮躁心智；
  - 只有当用户在当前节的互动思考题中**选择完全正确的选项**，才触发解锁下一个新章节；
  - 解锁后，系统通过平滑滚动（Smooth Auto-Scroll）以 360ms 阻尼自然向下滑至下一节。
- **右侧侧面导航电梯索引（Sticky Side Elevator Index）**：
  - 桌面端右侧保留发丝线导航轨道，实时同步章节学习进度（`✓ 已掌握` / `● 正在学习` / `🔒 待解锁`）；
  - 仅允许点击回跳已掌握的章节，未解锁章节禁止偷跑。

### 4.3 题目选项随机洗牌算法 (Fisher-Yates Dynamic Option Shuffling)
- **消除位置记忆偏差（Position Bias）**：
  - 选项内部逻辑通过不变的唯一 ID（如 `"a"`, `"b"`, `"c"`）绑定正确答案判定；
  - 前端渲染时采用标准的 Fisher-Yates 算法原地洗牌；
  - 展示序号根据乱序后的视觉位置动态打标：`String.fromCharCode(65 + optIdx) + "."`（A., B., C.）；
  - 每次点击「↺ 重播」或重置时重新洗牌，确保学生必须每次真正读题理解。

---

## 5. PhET-Labor 物理/数学仿真器工程标准 (PhET Simulation Guidelines)

### 5.1 60 FPS 无顿挫物理循环 (Decoupled rAF Loop)
- **根本痛点解决**：严禁在每帧 `requestAnimationFrame` 中调用 React 的 `setState`（如更新位移、速度），这会导致整个组件树每秒重渲染 60 次产生严重的掉帧和输入延迟；
- **解耦准则**：
  1. 物理状态（位置、速度、加速度、能量）完全保存在 `useRef` 或纯对象中；
  2. Canvas 绘制直接在 rAF 中执行，利用双缓冲/DPR 高清绘制；
  3. DOM 上的数字读数（如周期、高度）通过帧计数器**每 6 帧（约 10 FPS）节流更新一次 React State**，保证物理 60 FPS 丝滑，界面显示清晰稳健。

### 5.2 指针捕获与无断连拖拽 (Pointer Capture Standard)
- 拖拽物理对象（如滑板人、单摆球、斜面滑块、电荷）时，必须在 `onPointerDown` 中调用：
  ```ts
  (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  ```
- 并在 `onPointerUp` 中调用 `releasePointerCapture`。即使鼠标急速拖出画布外，物理对象也绝不会中途脱手掉落。

### 5.3 标准仿真器功能标配
每一个移植或新建的 PhET 仿真器必须具备以下标准配置：
1. **双速控制**：提供播放/暂停（Play/Pause）、慢动作（Slow-Motion 0.3x）与一键重置；
2. **能量分解与向量可视化**：
   - 机械能转化条形图（动能 $E_{kin}$ 翡翠绿、势能 $E_{pot}$ 晴空蓝、内能 $E_{therm}$ 玫瑰红、总能 $E_{ges}$）；
   - 速度与受力矢量实时箭头标注；
3. **考纲公式联动**：内置德国高考核心考点定理卡片（KaTeX 格式推导）；
4. **一键生成 Prompt 回流至 AI 助教**：
   - 提供「将实验数据带入 AI 助教讨论」按钮，自动格式化输入参数、实测值与理论偏差，一键唤醒 Tutor 模块进行深度考点剖析。

### 5.4 全景研习工坊大屏模式与面板折叠规范 (Studio Expanded Mode & Panel Folding)
- **左侧导航常驻原则**：全屏大屏模式**绝不能遮挡或覆盖左侧导航标签栏**，用户随时需要切换章节或学科；
- **右侧工作区铺满**：
  - 激活仿真器时，外层容器取消 `max-w-5xl` 约束，采用 `max-w-none px-0` 充分利用整个右侧视口；
  - 画布舞台高度自动放大为 `h-[420px] sm:h-[480px]`（相比普通视图的 360px 提升 33% 视野）；
- **参数面板自由折叠（Distraction-Free Exploration）**：
  - 顶部工具栏提供面板折叠开关（`◧ / ◩`）；
  - **展开态**：画布舞台占 67%（`lg:col-span-8`），右侧物理调控卡片占 33%（`lg:col-span-4`）；
  - **折叠态**：参数面板完全隐藏，画布舞台自动铺满 100% 宽度（`col-span-12`），便于学生精细观察微观运动轨迹与关键受力。
- 更多详细代码实现规范参见：[`App-EF-Lernvault/LABOR-PEDAGOGY-DESIGN.md`](App-EF-Lernvault/LABOR-PEDAGOGY-DESIGN.md)。

---

## 6. 核心仿真器清单与扩展规范 (Simulation Catalog)

| ID | 名称 (DE / ZH) | 物理/数学第一性原理公式 | 核心交互与探究功能 |
| :--- | :--- | :--- | :--- |
| `schiefe-ebene` | **Schiefe Ebene Dynamik**<br>斜面动力学博弈 | $F_{GH} = mg\sin\alpha$<br>$F_R \le \mu_s mg\cos\alpha$ | 60FPS 动力学循环，倾角 $\alpha$、静/动摩擦因数 $\mu_s/\mu_k$ 实时调节，滑块拖拽释放，受力矢量箭头分解，底部碰撞缓冲 |
| `spring` | **Masse-Feder-System**<br>弹簧振子谐振 | $y_{eq} = y_0 + \frac{mg}{k}$<br>$T = 2\pi\sqrt{\frac{m}{k}}$ | 物理挂钩零延迟硬连接，多重力场预设（地球/月球/火星/失重），平衡位置动态漂移，指针拖拽释放，受迫振动与能量转化 |
| `wave` | **Doppelspalt & Welleninterferenz**<br>双缝干涉与波动光学 | $\Delta s = d\sin\theta = k\lambda$<br>$\Delta y = \frac{L\lambda}{d}$ | 380-750nm 连续光谱波长调节，双缝间距 $d$ 与屏距 $L$ 调控，2D 画布真实光波衍射干涉场，实时间距光强分布曲线 $I(y)$ |
| `orbit` | **Gravitations- & Orbitallabor**<br>天体引力与开普勒轨道 | $F = G\frac{M\cdot m}{r^2}$<br>$\frac{T^2}{a^3} = \frac{4\pi^2}{G\cdot M}$ | 中心星质量与初始环绕初速度调控，第一宇宙/圆轨道速度 $v_k$ 与逃逸速度 $v_{esc}$ 临界计算，开普勒第二定律面积速度守恒，轨迹尾迹 |
| `skate` | **Energie-Skaterpark**<br>能量滑板场 | $E_{ges} = E_{pot} + E_{kin} + E_{therm}$ | U型半管/斜坡切换，滑板人拖拽释放，浮动能量饼图，摩擦生热，Studio 视口高度自动适配 |
| `pendulum` | **Pendel-Labor**<br>单摆实验室 | $T = 2\pi\sqrt{\frac{L}{g}}$ | 非线性摆动微分方程，摆长调控，光电门周期计时器，天体重力切换，参数面板一键折叠 |
| `projectile` | **Wurfbewegung**<br>抛体弹道运动 | $x(t) = v_0\cos\theta\cdot t$<br>$y(t) = h_0 + v_0\sin\theta\cdot t - \frac{1}{2}gt^2$ | 仰角大炮发射，二次空气阻力，射程高程轨迹追踪，地面靶心命中判定，参数面板一键折叠 |
| `buoyancy` | **Dichte & Auftrieb**<br>密度与阿基米德浮力 | $F_A = \rho_{\text{Fluid}}\cdot V_{\text{verdr}}\cdot g$ | 液体密度切换（水/油/蜜），物体沉浮判定，排开体积量筒，底部秤重，参数面板一键折叠 |
| `coulomb` | **Coulomb-Gesetz**<br>库仑定律与静电力 | $F = \frac{1}{4\pi\varepsilon_0}\frac{\|q_1 q_2\|}{r^2}$ | 刻度尺双电荷移动，反平方律力大小，引力/斥力矢量，二维电场线分布，参数面板一键折叠 |
| `circuit` | **Virtueller Stromkreis**<br>直流电路与欧姆定律 | $I = \frac{U}{R}, \quad P = U\cdot I$ | 电子定向移动流动画，电压滑动变阻器，白炽灯发光度与功率 |
| `optics` | **Optics Refraction**<br>斯涅尔折射定律 | $n_1\sin\alpha = n_2\sin\beta$ | 激光束介质界面偏折，入射角调节，全反射临界角，法线与反射线 |
| `gas` | **Ideales Gasgesetz**<br>理想气体状态方程 | $p\cdot V = n\cdot R\cdot T$ | 活塞容积压缩，热运动分子碰撞，压力表与温度计动态响应 |
| `vector` | **Vektor-Addition**<br>二维向量加法 | $\vec{c} = \vec{a} + \vec{b}$ | 几何平行四边形定则，向量拖拽，正交分量分解 |

---

## 7. 自动化质量门禁与验证流程 (Quality Gates & Verification)

任何代码修改或新内容创建必须一次性通过三级质量大门：

1. **知识库合规性静态门禁**：
   ```powershell
   python scripts/vault-check.py
   ```
   - 验证要求：`badnames=0`、`badglossar=0`、`missing=0`、`reisen` 语法完全正确，返回 `PASS`。
2. **TypeScript 严格类型检查**：
   ```powershell
   cd App-EF-Lernvault
   npx tsc -b
   ```
   - 验证要求：零错误（0 errors）。
3. **生产环境构建与打包验证**：
   ```powershell
   npm run build
   ```
   - 验证要求：Vite 生产打包通过，资产分块压缩成功。

---

> **结语**：遵循上述系统方案与策略，即可确保 EF-GeWi-Lernvault 在任何智能体或开发者手中保持坚不可摧的架构一致性、学术严谨度与顶级交互体验。
