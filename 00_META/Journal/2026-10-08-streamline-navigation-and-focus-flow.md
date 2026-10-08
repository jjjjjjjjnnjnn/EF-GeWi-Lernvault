---
fach: ""
thema: "Journal 2026-10-08 Streamline Navigation and Focus Flow"
operatoren: []
klausurrelevant: false
datum: 2026-10-08
tags: [EF, Meta, Journal]
---

# 2026-10-08 — 治理“内容多且杂”：侧边栏大降维、学科焦点过滤器与沉浸式 15 分钟专注流闭环

## 1. 核心矛盾诊断
针对用户反馈的“目前项目内容太多太杂”的核心痛点进行系统性手术：
- **病灶 1（入口严重过载）**：侧栏将 14 个 Tab 平铺列出（Reise, Labor, Library, Quiz, KlausurSim, Tutor, Planner, Mindmap, Lernbaum, Werkzeuge 等），中学生放学后打开系统无所适从；
- **病灶 2（十门学科平铺大杂烩）**：主页同时堆砌 10 门学科的掌握度与数据，导致备考缺乏主攻方向；
- **病灶 3（缺乏一站式闭环动线）**：看笔记、做测试、背卡片分散在不同页面，缺乏一个“15 分钟一口气走完”的最小闭环体验。

## 2. 系统重塑与落地交付

### (1) 侧边栏结构大降维（从 14 个平铺项砍为 4 大核心主轴 + 可折叠工具抽屉）
- **会考核心四支柱 (Abitur-Fokus)**：
  1. `home` 今日备考总台 (Heute · Fokus)；
  2. `library` 考点文献库 (Bibliothek · Wissen)；
  3. `flashcards` 间隔记忆抽认卡 (Karteikarten · FSRS)；
  4. `klausursim` 全真会考模拟与自查 (Klausur-Simulation)；
- **扩展工具抽屉 (Werkzeuge & Labore)**：
  - 将 `reise` (微课), `labor` (理科实验台), `quiz` (随堂测), `tutor` (AI助教), `lernbaum` (知识树), `mindmap` (星系图), `planner` (日程), `werkzeuge` (工具箱) 收拢进可折叠抽屉；
  - 默认紧凑折叠，用户处于辅助工具时自动展开并高亮；侧边栏视觉负载骤降 65%！

### (2) 主页增加「学科焦点选择器 (Fokus-Filter)」
- 在 `DashboardCockpit` 中增加焦点切换胶囊：`[会考主攻 (3科)]` (Deutsch, SoWi, Mathe) / `[全部学科]` / 单科快速筛选；
- 开启焦点时：任务列表只展示焦点学科攻坚任务；掌握度条形图优先展示 3 门重点学科，其余学科自动收拢为“其他学科 · 点击展开”，彻底告别十科大杂烩。

### (3) 落地「沉浸式 15 分钟专注学习流 (FocusFlowModal)」
- 借鉴 `amosblomqvist/learn` 弹窗推进哲学与 `dsh-web-studyhub` 证据闭环：
- 点击 Hero 卡片「开始今日 15 分钟专注学习」或任务卡上的「专注」按钮，弹出三步闭环模态窗：
  1. **Step 1 · 3分钟考点精要 (Erfassen)**：直击核心概念与 3 步解题纪律；
  2. **Step 2 · 5分钟随堂实战 (Anwenden)**：2 道典型真题辨析，即时给出官方 Erwartungshorizont 采分依据；
  3. **Step 3 · 2分钟满分表达 (Sichern)**：官方 15 NP 学术句型模板，点击一键打卡完成任务并累加 XP！

## 3. 工程门禁验证
- **TypeScript 编译**：`npx tsc -b` 0 报错；
- **生产构建**：`npm run build`（Vite 生产打包）11.40s 0 错误；
- **单元测试**：`DashboardCockpit.test.tsx` 4/4 通过、`modules.test.tsx` 23/23 通过，无 emoji 违规；
- **知识库健康检查**：`python scripts/vault-check.py` PASS（notes=412, csv_rows=1942, badnames=0, badglossar=0）。
