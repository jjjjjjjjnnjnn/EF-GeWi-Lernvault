---
fach: Meta
thema: "Labor 修复 EZB 利率走廊文字碰撞重叠、福利国家 Bürgergeld 响应与供求福利沙盘二合一"
operatoren: [analysieren, optimieren, implementieren, beurteilen]
klausurrelevant: false
datum: 2026-10-04
tags: [EF, Meta, App, Labor, SoWi]
---

# Labor 修复 EZB 利率走廊文字碰撞重叠、福利国家 Bürgergeld 响应与供求福利沙盘二合一

## 1. 用户反馈定位与问题病灶

用户通过两张截图及文字需求指出了三项具体问题：
1. **截图 1 (`EzbGeldpolitikSim.tsx`)**：
   - “显示存在问题，而且看不清楚”：
     - 在欧央行利率走廊（Zinskorridor）图示中，边际贷款便利（Spitzenzins）、主再融资利率（Leitzins）、存款便利（Einlagezins）三个利率水平线仅相差 0.25%，在原 22px/1% 比例尺下垂直距离仅 5.5px，而三个文字标签均右对齐锚定在 `x="142"`，文字重叠挤压成一团，完全不可读；
     - 右侧“北威州会考采分核心规范”卡片字色偏浅淡绿，低对比度难以辨认。
2. **截图 2 (`UniversalInteractiveWorkbench.tsx - sozialstaat`)**：
   - “公民基本指数这个地方调整了，在图上没有作用”：
     - `sowi-sozialstaat-transfer` 中，滑块 B（Grundsicherungs-Niveau Bürgergeld，公民基本生活兜底保障金基数）未参与任何再分配平抑与二次净收入基尼系数（`sekGini`）计算；
     - 且在下方 SVG 洛伦兹曲线中，二次分配曲线仅用了 `paramA`，完全忽略了 `paramB`，导致拖动滑块 B 时图形没有任何反应。
3. **两大致命同质化实验合并 (`MarktMechanismusSim` 与 `MarktWelfareLab`)**：
   - 用户明确指示：“供求曲线与市场价格机制沙盘”与“市场干预、福利几何与无谓损失沙盘”功能割裂分散，要求“把这两个合成成一个互动”。

## 2. 解决方案与实施

### 1. `EzbGeldpolitikSim.tsx`（利率走廊图表重构与高对比度）
- **根除文字碰撞**：
  - 规范 Y 轴线性映射区间（0% 至 6% 映射高度 155px，左侧绘制 0%, 2%, 4%, 6% 精确刻度线与参考虚线）；
  - 将利率走廊上下限之间绘制为半透明淡蓝色“走廊通道带”（Korridor-Band）；
  - 三大标签采用防碰撞错位布局：
    - `Spitzenzins` 严格置于红虚线上方，带红色标头 `▲ Spitzen: X.XX%`；
    - `Leitzins` 居中徽章化，置于白底圆角胶囊药丸中 `Leit: X.XX%`；
    - `Einlagezins` 严格置于绿虚线下方，带绿色标头 `▼ Einlage: X.XX%`；
- **提高文本对比度**：
  - 右下角“北威州会考采分核心规范”改为 Tufte 纯净学术纸张底色 + 墨绿色左边饰条（`border-l-4 border-l-emerald-600`）+ 深墨色正文（`text-[var(--ink)]`），字体清晰锐利。

### 2. `UniversalInteractiveWorkbench.tsx - sozialstaat`（Bürgergeld 物理随动）
- **经济学数理逻辑补齐**：
  - 累进所得税（`paramA`）调节顶层极高收入（平抑减幅上限 0.12）；
  - 公民保障金 Bürgergeld（`paramB`）直接托底底层 20% 贫困人群（平抑减幅上限 0.08）；
  - 综合平抑幅度：`transferReduktion = +(taxReduktion + buergergeldReduktion).toFixed(2)`；
  - 动态计算二次分配净收入基尼系数 `sekGini = +(0.48 - transferReduktion).toFixed(2)`。
- **洛伦兹曲线 SVG 动态联动**：
  - 将二次分配曲线重构为三次贝塞尔曲线（Cubic Bezier），控制点 1（底层 20% 人口收入段）由 `paramB` 强力抬升；
  - 在横轴 20% 处显式标记动点与虚线：`Bürgergeld (+paramB%)`，拖动滑杆时不仅曲线上浮，指示点与底座抬升效果立竿见影！

### 3. 供求价格机制与福利经济学二合一 (`MarktMechanismusSim.tsx` + `laborRegistry.ts`)
- **全面升级 `MarktMechanismusSim.tsx` 为综合旗舰实验**：
  - **动态供求基本面**：支持需求曲线平移（$\Delta D$）与供给曲线平移（$\Delta S$）；
  - **宏观价格管制模式切换**：
    - 🕊️ 自由市场均衡出清（Markträumung，帕累托最优，DWL = 0）；
    - 🛡️ 法定最低限价（Mindestpreis，如 Mindestlohn、农产品保价收购，展示供给过剩与 DWL）；
    - 🏠 法定最高限价（Höchstpreis，如 Mietpreisbremse 房租管制，展示供不应求短缺与 DWL）；
  - **完整透光福利几何多边形**：
    - 蓝色透光多边形展示 **CS（消费者剩余 Konsumentenrente）**；
    - 绿色透光多边形展示 **PS（生产者剩余 Produzentenrente）**；
    - 玫瑰红透光三角形直观标注 **DWL（死重损失/无谓损失 Deadweight Loss）**；
    - 轴正交投影与供需缺口卡尺标注；
  - **4 栏 Tufte KPI 仪表盘**：
    - 市场价格 $P$ 与交易量 $Q_{\text{trans}}$、CS、PS、DWL 实时精确数值；
  - **AFB III 考场评价三重视角**：
    - 🏛️ 社会总福利（Allokationseffizienz & DWL）；
    - 🏭 生产者/企业视角（超额利润 vs 滞销积压与失业风险）；
    - 🛒 消费者/买方视角（福利挤压 vs 排队配给与黑市）；
  - **会考标准采分句（Klausursatz）** 一键复制与导出。
- **注册表与路由平滑合并**：
  - 在 `laborRegistry.ts` 中将 `markt` 与 `markt-welfare` 合并为一个完整条目；
  - 在 `Labor.tsx` 中将 `markt` 和 `markt-welfare` 统一路由至 `<MarktMechanismusSim />`；
  - `MarktWelfareLab.tsx` 重定向导出为 `MarktMechanismusSim`，保障旧引用 100% 兼容。

## 3. 验收验证

- 执行 `npx tsc -b`：**0 错误通过**。
