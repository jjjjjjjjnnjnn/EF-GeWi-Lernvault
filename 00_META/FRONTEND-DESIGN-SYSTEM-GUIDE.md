---
fach: ""
thema: "Frontend Design System Guide"
operatoren: []
klausurrelevant: false
datum: 2026-10-07
tags: [EF, Meta, UI, DesignSystem]
---

# 前端工程与美学设计系统实施白皮书
# FRONTEND-DESIGN-SYSTEM-GUIDE.md

> 针对 EF-GeWi-Lernvault 桌面客户端与 Web 体系的视觉系统、组件架构、设计令牌与美学工程落地指南。

---

## 1. 核心方法论与项目转译 (Methodologies into Project Practice)

### 1.1 Atomic Design (原子设计在项目的映射)

本项目将界面系统严密分为五层：

```
[Atoms 原子] ────────> [Molecules 分子] ────────> [Organisms 组织] ────────> [Templates 模板] ────────> [Pages 页面]
(Tokens/图标/Badge)   (倒计时/搜索输入/指标项)   (雷达图/任务卡/导航栏)   (二分屏航行架/阅读双栏)   (Dashboard/Library)
```

1. **Atoms (原子)**：
   * 调色板 Tokens（`var(--ink)`, `var(--fox-orange)` 等）；
   * 发丝级细线网格（`1px solid var(--line)`）；
   * 极简手绘单色图标（`16x16`, `stroke=currentColor`，无 emoji）；
   * 键盘微标（`<kbd className="kbd-badge">`）；
   * 纯矢量折纸吉祥物核心几何切面（`MascotFox` 的耳、眼、尾、呆毛）。
2. **Molecules (分子)**：
   * 状态徽标组（学科 `[SoWi]` + 认知层级 `AFB II` + 难度评分）；
   * 任务勾选单行项（Checkbox + 任务文案 + 执行按钮）；
   * 带有悬停反馈的雷达指标点（`circle` + `text` + `transformOrigin` 居中锁定）；
   * 连续打卡动量条（托火小狐狸 + 18天连续打卡数值）。
3. **Organisms (组织)**：
   * **Abitur Flight Hero**：15 Notenpunkte 战力大号徽标 + 官方分级刻度槽 + 经验跃升指示器；
   * **Tufte 几何纸墨雷达室**：240px 双轨雷达画布 + 放大镜探查小狐狸 + 核心指标表 + 折叠抽屉；
   * **今日战场**：学科切换筛选器 + 处方任务列表 + 通关酣睡狐狸空状态。
4. **Templates (模板)**：
   * **二分屏开阔架**（左 58% 行动战场 + 右 42% 诊断室，`max-w-7xl`）；
   * **双栏学术精读架**（左栏文章伴读 + 右栏原典解剖台）；
   * **发散图谱星系架构**（中心向外同心环轨）。
5. **Pages (页面/模块)**：
   * `DashboardCockpit.tsx`、`Library.tsx`、`Flashcards.tsx`、`Reise.tsx` 等。

---

### 1.2 Design Tokens (设计令牌体系)

所有样式必须严格引用 CSS 变量，严禁硬编码随意颜色与尺寸：

```css
/* 纸张与空间基线 */
--paper: #FAFAFA;            /* 纯净纸面 */
--paper-subtle: #F4F4F5;     /* 浅灰底衬 */
--surface: #FFFFFF;          /* 顶层画布卡片 */
--line: #E4E4E7;             /* 发丝级分割线 (1px) */
--ink: #18181B;              /* 浓墨文字与最高优先级线条 */
--gray: #71717A;             /* 次级学术注释与辅助信息 */

/* 伴学吉祥物体系 (Origami Fox Companion) */
--fox-orange: #D96E3A;       /* 赤狐主橙 (焦点强调、活力) */
--fox-orange-dark: #B85526;  /* 狐身阴影切面 */
--fox-cream: #E6D9C8;        /* 暖米白面部与尾尖 */
--fox-slate: #2D4F5C;        /* 学考深靛蓝 (黑鼻、手柄、轮廓) */
--fox-gold: #F2C94C;         /* 奖杯金 (升阶满额) */
--fox-red: #EB5757;          /* 诊断警戒红 (失分薄弱点) */
```

---

### 1.3 尼尔森十大可用性原则落地规范

1. **状态可见度 (Visibility of System Status)**：
   * 15 NP 航行仪表盘动态指示当前积分（`11 NP`）以及跃升至 `13 NP` 的精确差值；
   * 连续打卡通过托火小狐狸动态呈现动量，任务完成时即时打勾并结算 XP。
2. **贴近现实世界 (Match between System and Real World)**：
   * 严格对应德国北威州高中真实的 `AFB I-III` 认知层级与 `D1-D5` / `MINT-BE` 采分点标准，而非虚构的游戏术语。
3. **一致性与标准化 (Consistency and Standards)**：
   * 全站统一直角或最多 `rounded: 4px`；
   * 全站禁止 Emoji，一律使用 16×16 内联手绘细线 SVG。
4. **防错与诊断支持 (Error Prevention & Diagnosis)**：
   * 当诊断出薄弱点时，放大镜小狐狸自动出现在雷达右上角聚焦该点，并在抽屉中给出“化解法则（Fix）”。

---

## 2. 业界标杆与美学借鉴 (Benchmarking & Aesthetic DNA)

### 2.1 Linear (linear.app)
* **借鉴点**：
  * **键盘驱动（Keyboard-first）**：全局支持快捷键（如 `Alt 1~9` 切模块、`/` 聚焦搜索、`Ctrl+Shift+D` 开发者模式）；
  * **高反差发丝线排版**：利用 1px 细线划分内容，摒弃厚重卡片投影与毛玻璃杂色；
  * **微交互阻尼**：悬停时微幅平移（`-translate-y-0.5`）、点击时微缩（`active:scale-95`），克制从容。

### 2.2 Edward Tufte (数据墨水比原则)
* **核心信条**：*“Every drop of ink must carry information.”（每一滴墨水都承载信息）*。
* **做法**：
  * 废除所有多余装饰背景；
  * 数据图表（雷达图、折线图）只绘制刻度经纬与真实数据点，不画虚假阴影；
  * 德语正文采用古典学术衬线字体（Georgia / 宋体），中文对照采用人文无衬线（System Sans），层级分明。

### 2.3 折纸吉祥物伴学哲学 (Origami Companion Aesthetic)
* **低多边形（Low-Poly）折纸风**：与德国理性的几何度量感完美兼容；
* **五大核心姿态矩阵**：
  1. `avatar`（刊头守护徽标）；
  2. `streak`（托火动量连胜）；
  3. `deficit`（手持放大镜聚焦失分点）；
  4. `idle`（完成所有待办后的卷尾安睡，减轻考试焦虑）；
  5. `levelup`（满额升阶时的高举金杯星光庆祝）。

---

## 3. 前端工程规范与防御性约束 (Engineering Protocols)

1. **零外部网络请求（Offline First）**：
   * 打包为 Tauri 离线桌面程序时，不加载任何 CDN 字体、外部图片或脚本；全矢量资产内联化。
2. **严格代码审查与无 Emoji 门禁**：
   * 自动化测试套件（`modules.test.tsx`）会自动扫描全库源代码，确保无任何 Unicode Emoji、无未受控的阴影类（`shadow-`）。
3. **SVG 缩放几何中心锁定铁律**：
   * 任何 SVG 内部元素的缩放动效，必须显式注入：
     ```tsx
     style={{
       transformOrigin: `${cx}px ${cy}px`,
       transformBox: "view-box",
     }}
     ```
   * 严禁出现向右下方或屏幕外漂移的失真现象。
4. **门禁闭环检验命令**：
   ```bash
   npx vitest run                             # 单元与契约测试 100% 通过
   npx tsc -b                                 # TypeScript 零报错
   python scripts/vault-check.py              # 知识库双链与合规 PASS
   ```
