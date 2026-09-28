---
fach: ""
thema: "UI/UX 全新重构设计与外部 AI 自由共创任务书"
operatoren: []
klausurrelevant: false
datum: 2026-09-27
tags: [EF, Meta, App]
---

# EF-Lernvault 全新 UI/UX 重构设计与外部 AI 自由共创任务书

> 本文档用于指导外部 AI、设计模型及开发者对本项目的视觉、排版、交互与动画进行自由重构与提案。
> 项目当前版本已于 `_Downloads/App-EF-Lernvault.backup-20260927/` 建立完整冷备份，所有设计实验均处于安全受控环境。

---

## 一、 为什么必须重构 UI？（现状与核心痛点诊断）

目前项目涵盖高中 EF 至 Abitur 阶段十门核心学科（德语、英语、数学、物理、化学、生物、哲学、社科、音乐、体育），沉淀了 396 篇科学笔记、1595 张记忆卡片与 269 门互动课程。

然而，在界面呈现上存在严重的体验短板：
1. **「字海窒息感」（Wall of Text）**：
   - 尽管经过分段，页面仍然以大段文本阅读为主，学生打开后容易产生认知疲劳，抓不到焦点。
2. **缺乏视觉心智模型（Visual Mental Models）**：
   - 科学与人文概念（如物理简谐振动、化学酸碱中和突跃、生物细胞膜渗透势能差、数学切线极限收敛、社科弗莱堡秩序自由主义）缺少直观的**图解、动图、微观示意图、坐标动态轨迹**。
3. **界面过于「AI 化 / 机械化」**：
   - 过于规整但缺乏呼吸感与设计品味，缺少现代顶级产品（如 Linear、Craft、Brilliant、Duolingo、Stripe）那种丝滑、精致、有质感的交互微动效。
4. **原则边界**：
   - **页面依然以清爽为主**，但**不局限于生硬的纯文本学术风**。我们要的是：**现代、高级、清爽、生动、直观、富有沉浸感**。

---

## 二、 行业标杆与 5 大 UI 设计范式（已在客户端内提供可运行 Demo）

客户端内已部署首级专区 **「设计展厅 (Design-Lab)」**（快捷键 `Alt D`），实现并对比了 5 种截然不同的视觉方向：

| 方案 | 风格命名 | 视觉特征与灵感源泉 | 适用场景 |
| :--- | :--- | :--- | :--- |
| **方案 1** | **Brilliant 渐进卡片流** | 碎片化步骤卡片、微积分/物理仿真居中、轻拟态 Ambient Glow 氛围光、即时选择题交互检验 | 理科重难点探究、实验互动课 |
| **方案 2** | **Craft / Notion 杂志画刊** | 大幅艺术渐变封面 Banner、流式优雅留白、悬浮大纲胶囊、带插画的重点引言卡片 | 德语文学分析、社科时政、哲学论证 |
| **方案 3** | **Duolingo 关卡冒险探险图** | 沿路径弯曲分布的关卡节点、伴随角色（Tutor Companion）对话气泡、即时 XP 与连胜反馈 | 每日复习、生词巩固、闯关测验 |
| **方案 4** | **Linear 极简暗光工艺风** | 极细微边框（1px border）、半透明磨砂玻璃、高对比度数据仪表盘（HUD）、极度克制与专业 | 考前倒计时、模拟考答题控制台 |
| **方案 5** | **双栏沉浸式实验工作台** | 左侧 60% 物理/化学动态 Canvas 仿真大视窗，右侧 40% 采分点标准陈述与评分细则 | PhET 探索、Klausur 答题精修 |

---

## 三、 外部 AI 自由设计任务要求

外部 AI 可不受现有生产代码束缚，从以下几个维度自由发挥并输出完整的 React / Tailwind / SVG 前端组件代码或设计规范：

### 1. 视觉元素丰富度（必须告别纯文字）
- **原创矢量插画 / 图解 (Pure Inline SVG)**：
  - 严禁使用 Emoji 作为主要视觉元素（遵照项目专业性要求）。
  - 使用优雅、富有表现力的内联 SVG，展现科学结构（如双分子脂质层、DNA 复制、原子轨道、透镜折射光路、洛伦茨曲线等）。
- **动态交互与微动效 (CSS / Framer / Canvas)**：
  - 添加细腻的过渡效果（弹簧阻尼微动效、数值跳动动画、脉冲光晕、进度条发光）。
  - 支持用户拖动滑块（Slider）、点击按钮或切换开关时，画面中的图形产生实时的物理反馈。
- **背景与层次设计 (Depth & Atmosphere)**：
  - 引入柔和的径向渐变（Radial Mesh Gradients）、极简暗色微纹理网格、轻量毛玻璃（Backdrop Blur）。

### 2. 设计规范与技术栈约定
- **框架**：React 18 / 19 + TypeScript (`.tsx`)。
- **样式**：Tailwind CSS（支持利用 CSS 变量如 `var(--bg)`, `var(--text)`, `var(--card)`，或自带深色调设计）。
- **图标**：纯手工内联 SVG（线条统一 1.4px ~ 1.6px，`strokeLinecap="round"`）。
- **性能**：高帧率流畅运行，避免沉重的外部不可控依赖；Canvas 粒子动画需具备清理定时器或 `requestAnimationFrame` 机制。

### 3. 组件交付模板接口 (Props 约定)

外部 AI 可设计单个独立页面（Page）或通用排版容器（Layout），建议遵循如下标准 Props 接口：

```tsx
export interface InteractiveLessonProps {
  // 课程基本信息
  courseTitle: string;
  subject: "Deutsch" | "Englisch" | "Mathe" | "Physik" | "Chemie" | "Bio" | "Philosophie" | "SoWi" | "Musik" | "Sport";
  level: "EF" | "Q1" | "Q2";
  edition: "bilingual" | "de-only";

  // 当前激活的步骤与内容
  currentStepIndex: number;
  totalSteps: number;
  stepTitle: string;
  stepHookText: string;

  // 核心视觉区（插图 / 交互仿真器 / 图表）
  renderVisualCanvas?: () => React.ReactNode;

  // 引导思考与即时检验
  quickCheckQuestion?: {
    questionText: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };

  // 交互回调
  onStepChange: (newStepIndex: number) => void;
  onExportFindingToTutor: (findingText: string) => void;
}
```

---

## 四、 成果提交与评审流程

1. **外部 AI 生成代码**：外部 AI 输出的代码可以直接作为一个全新的独立组件文件存放在 `src/modules/DesignStudio/` 下。
2. **免冲突接入**：在 `DesignLab.tsx` 的选项卡列表中注册新方案（如新增 `方案六：XYZ Style`）。
3. **用户实时审查决策**：用户启动本地客户端（`http://localhost:1420`），点击顶部 `Design-Lab`，即可一键在各方案之间切换审查，直观评判视觉高级感与学习沉浸度。
4. **最终落地决策**：由用户选定最佳方案（或组合方案，如「Brilliant 卡片流 + Craft 杂志头图」），由主 Agent 安全重构至全局页面中。
