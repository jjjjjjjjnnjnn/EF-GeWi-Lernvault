---
fach: ""
thema: "Journal 2026-10-08 Course Series Pipeline"
operatoren: []
klausurrelevant: false
datum: 2026-10-08
tags: [EF, Meta, Journal]
---

# 2026-10-08 — 书本到趣味互动课程集生成流水线引擎与工坊总台落地

## 1. 业务目标与用户诉求 (Ziele)
针对用户核心要求：**“开始进行课程集流水线设计。给如一本书，就能设计好全部完整课程（好玩等）”**。

在 `App-EF-Lernvault` 中全面构建了从一本书/讲义大纲到一整套沉浸式、趣味化、关卡化互动课程集（Course Series）的自动化生成流水线，并完成与研习室（Reise）等模块的闭环集成。

## 2. 核心架构与工程实现 (Architektur & Implementierung)

### ① 架构规划规约
产出完备设计规约：`Course_Series_Pipeline_Design.md`（涵盖书籍解构引擎、好玩战役世界观构建、认知教具智能匹配矩阵与 8 步微课编译器）。

### ② 核心流水线引擎 (`App-EF-Lernvault/src/engine/coursePipeline.ts`)
1. **智能目录解析器 (`parseBookTableOfContents`)**：
   - 支持解析多级章节 Markdown 标题（`#`、`##`）、列表要点（`-`、`*`、`1.1`）及缩进提纲；
   - 支持智能兜底为各学科经典标准大纲；
2. **战役世界观与危机Hook引擎 (`generateCampaignUniverse`)**：
   - 拒绝死板灌输，根据学科（SoWi/Philo/Mathe/Physik/Chemie/Bio）与趣味风格（冒险危机、探案辩论、实验沙盘、会考速通）为全书生成宏大战役标题与高沉浸身份；
   - 注入动态危机倒计时情境（如“凌晨 03:00 通胀率剧烈飙升，内阁紧急热线要求 30 分钟内交出货币与财政双轨平衡方案”）；
3. **16 款仿真实验与交互教具匹配矩阵 (`matchPedagogicalTool`)**：
   - 智能识别关键词，精准对接项目已有教具（魔法四角沙盘、伦理辩证天平、导数切线逼近沙盘、渗透实验沙盘、两难抉择剧场、学术句式积木等）；
4. **8步互动微课编译器 (`generateEpisodeMarkdown`)**：
   - 产出完全兼容 `Lesson-v3` 标准规范的单课 Markdown；
   - 包含前置预训练术语盒（德中双语机制+考场提示）、因果模型拆解、教具交互插槽、两难决斗、自测 3 题与角色情境题；
   - 经单元测试检验，产出的 Markdown 100% 能够直接被项目中的 `parseReiseFile` 解析为即开即玩的 `Reise` 互动对象。

### ③ 流水线工坊交互界面 (`App-EF-Lernvault/src/components/CoursePipelineModal.tsx`)
1. **双栏纸墨学术风布局**：
   - 左栏：预设教材快捷模版（SoWi 经济政策、Philosophie 实践理性、Mathe 微积分、Bio 细胞运输等）、参数配置（书名、学科、趣味风格、目录文本输入）；
   - 右栏：关卡战役地图（Quest Map）、关卡总览看板（XP 徽章、危机 Hook、教具卡片）与 Markdown 源码预览；
2. **一键启动与导出**：
   - 支持一键复制生成的标准微课 Markdown 脚本；
   - 支持“在研习室启动这节课”，直接跳转互动微课模块开展闯关。

### ④ 全局集成与路由打通 (`App.tsx` & `Settings.tsx`)
- 顶部导航栏增加「课程工坊 (`Kurs-Pipeline`)」常驻功能按钮；
- 全局命令面板 (`Cmd+K / Palette`) 注册快捷动作 `P`；
- 设置中心第三板块「知识库架构与模块化管理」接入课程流水线直达入口。

## 3. 验证与门禁结果 (Verifikation)
- **单元测试**：
  - `src/engine/coursePipeline.test.ts` 4/4 绿灯通过；
  - `src/components/CoursePipelineModal.test.tsx` 4/4 绿灯通过；
- **类型安全**：`npx tsc -b` 0 报错通过；
- **前端打包**：`npm run build` 打包成功（`✓ built in 36.76s`）；
- **数据一致性校验**：`python scripts/vault-check.py` PASS。
