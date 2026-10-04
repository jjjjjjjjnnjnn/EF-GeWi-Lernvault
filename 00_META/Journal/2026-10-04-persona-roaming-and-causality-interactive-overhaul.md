---
fach: Meta
thema: "自由人画像漫游全景 2D 互动地图重构与通用工作台因果链深度设计"
operatoren: [analysieren, optimieren, implementieren, testen]
klausurrelevant: false
datum: 2026-10-04
tags: [EF, Meta, App, Labor, SoWi, UI-Design]
---

# 自由人画像漫游全景 2D 互动地图重构与通用工作台因果链深度设计

## 1. 痛点诊断与用户指令

用户提交最新截图（`firefox.exe_20261004_214553.png`）并明确指出：
- “这个部分没有设计。包括其他板块的这个部分也没有”

经过对比排查，发现以下严重的功能缺失与体验断层：
1. **Sinus-Milieus 自由人画像漫游模式（Persona-Explorer）地图完全缺失**：
   - 先前设计中，当用户切换至“👤 自由人画像漫游”Tab 时，**底层的 2D SVG 社群矩阵与坐标轴被完全卸载**；
   - 界面上仅剩两个孤零零的滑杆（经济资本、价值观取向）和一个极小的文字卡片，下方留下一大片超过 600px 的白色空白区域；
   - 导言宣称“观察个体如何在布尔迪厄的社会空间中移动，以及阶层固化的张力”，但用户拖动滑杆时**根本看不到任何空间地图、没有个人定位指针、没有阶层气泡相交高亮，也没有任何动态反馈**。
2. **北威州会考题解与采分（Klausur-EHZ）缺少交互式设计**：
   - 仅显示两块静态文字，无采分自评标准与分值核算工具。
3. **通用交互工作台（UniversalInteractiveWorkbench）次级 Tab 同样缺失交互设计**：
   - 切换至“📖 现象推演与微观因果（Causality）”和“📝 会考真题与采分（Klausur）”时，同样将工作台直接替换为干瘪的文字排版，缺少结构化因果演绎动效。

## 2. 全量重构实施

### A. Sinus-Milieus 自由人画像漫游沙盒全量重构 (`SinusMilieusSim.tsx`)
- **2D SVG 空间定格与动态指针**：
  - 在漫游模式下恢复并强化 2D SVG 坐标矩阵（横轴：价值观变迁 Tradition ↔ Modernisierung ↔ Neuorientierung；纵轴：地位与资本 Untere Lage ↔ Oberschicht）；
  - **实时个人定位锚点（Avatar Pin）**：根据 `personaWerte` 与 `personaLage` 动态计算并在 SVG 上投射 `(X, Y)` 十字投影线，配有雷达声呐波动态脉冲环（`animate-ping`）、核心实心圆点与悬浮坐标气泡（`📍 您当前漫游位置: (X%, Y%)`）；
  - **社群相交高亮**：根据算法动态匹配的最近 Milieu 气泡自动点亮脉冲外环（`animate-pulse`），不透明度提升至 0.9；
  - **阶层固化天花板标线**：在地位 70% 处增设学术虚线标示 `⚠️ Gläserne Decke (Habitus-Aufstiegsbarriere nach Bourdieu)`。
- **5大典型社会画像一键跃迁预设**：
  - 🎓 学术精英二代（Postmateriell: 85% / 72%）
  - 🚀 柏林科技创客（Expeditive: 90% / 95%）
  - 👔 务实奋斗中产（Adaptiv-Pragmatisch: 52% / 62%）
  - 🏭 鲁尔传统工薪（Traditionell: 25% / 18%）
  - 📦 零工弱势边缘（Prekär: 12% / 45%）
  - 点击任一角色，滑块与地图指针即刻飞跃定位并重新匹配社群。
- **布尔迪厄三大资本解构条**：
  - 动态计算并展示经济资本（Ökonomisch）、文化资本（Kulturell）、社会资本（Sozial）三维能量条；
  - 深度生成阶层流动性与惯习阻力研报（Habitus-Dissonanz），并提供一键导出功能。
- **会考评分演练工坊（Klausur-EHZ）升级**：
  - 拆解 15 分官方采分点（3 BE 二维结构、4 BE 惯习壁垒、4 BE 模型局限、4 BE 独立裁决）；
  - 增加 15 分满分范文与 4 分典型低分陷阱的鲜明对照。

### B. 通用交互工作台因果链与考点全真升级 (`UniversalInteractiveWorkbench.tsx`)
- **四阶段动态因果演绎链（Ursache-Wirkungs-Domino）**：
  - 将原本平铺的文字升级为清晰的 4 步进度阶梯：`01 Impuls/Ursache` ➔ `02 Mikromechanismus` ➔ `03 System-Reaktion` ➔ `04 Klausur-Fazit`；
  - 配套中德双语 Wenn-Dann 严密逻辑剖析与微观本质机制说明。
- **官方考纲学术术语库（Fachbegriffe）全景卡片**：
  - 网格化双列展示，规范 Tufte 纯净墨水排版。
- **全真会考评分细则（EHZ）与 15 NP 满分答题模版**：
  - 格式化标号与规范排版，彻底清除杂色。

## 3. 验证与编译

- 执行 `cmd /c "npx tsc -b"`，0 错误全绿通过；
- Git 提交：`[App] feat: full 2D interactive canvas for persona roaming and structured causality domino`。
