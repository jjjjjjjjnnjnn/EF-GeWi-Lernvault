---
fach: App
thema: "全学科高保真实验室重构：三维深度研学套件、典型工况预设、动态状态HUD与会考EHZ采分标准"
operatoren: [analysieren, modellieren, strukturieren, validieren]
klausurrelevant: false
datum: 2026-10-04
tags: [EF, App, Labor, Klausur, EHZ]
---

# 全学科高保真实验室重构：三维深度研学套件、典型工况预设、动态状态HUD与会考EHZ采分标准

> 日期：2026-10-04  
> 状态：✅ 全面落地，通过 TypeScript 强类型校验、生产构建 `npm run build`、双门禁审计，已推送 GitHub 远端

---

## 1. 核心需求剖析与重构动机

用户反馈：
> *"目前的实验室都不直观，感觉内容也不清楚，重新挨个设计"*

- **旧版痛点**：
  1. **缺乏操作目标与工况指引**：打开实验室后仅有一块画布与两个生硬滑块，学生不清楚标准工况、极限工况与会考设题场景；
  2. **调节不精准**：纯滑块在手机与触控/鼠标操作下难以微调到特定数值，缺乏 `[-]` / `[+]` 精密步进按钮；
  3. **缺少实时反馈状态**：没有动态 HUD 判定当前是处于“平衡态”、“临界态”还是“失衡态”；
  4. **缺乏学科深度因果推演与答题对应**：仅在底部有一行泛化的结论，缺少德语高中（Gymnasiale Oberstufe: EF/Q1/Q2）会考原题、EHZ 评分标准（Erwartungshorizont）与 15 分满分答题范文。

---

## 2. 深度重构成果：三维互动实验室套件 (UniversalInteractiveWorkbench V3)

将单一实验画布升级为 **三维全景互动实验室套件**：

### 🔬 维度 1：互动实验台 (Labor-Workbench)
1. **典型工况一键直达 (Presets Bar)**：
   - 每一个实验室均配备三大高频工况：
     - **标准基准工况 (Standard-Referenz)**：学科标准参考系（如丹尼尔电池 1.10V / 李贝特 350ms 准备电位 / 经典五幕剧平衡态）；
     - **极限工况与临界响应 (Grenzfall / Maximierung)**：极端边界参数探索；
     - **北威州会考设题态 (Klausur-Szenario NRW)**：高频考查工况。
   - 一键点击自动设定双通道参数，支持一键重置 (50/50)。
2. **状态 HUD 与视觉强化**：
   - 画布高度提升为 `h-64 sm:h-72`，视野宽阔清晰；
   - 动态 HUD 状态指示灯：`🟢 达成目标工况 (Zielzustand)` / `🟡 临界响应区 (Grenzbereich)` / `🔵 运行调整中 (Aktiv)`；
   - 双通道参数实时数值标签与核心测定物理量卡片。
3. **精密调节双通道控制台**：
   - 滑块配合 `[-]` 和 `[+]` 5 单位精密微调步进按钮，方便精确定位。
4. **🎯 探究挑战目标 (Forschungsauftrag)**：
   - 明确标出实验目标（如调整离子浓度使电池电动势达到最大、寻找戏剧转折点 Peripetie 等）；
   - 实时自动校验达成状态，完成时亮起绿标 `✓ 目标达成！`，探索中呈现 `⏳ 探索调整中`。

### 📖 维度 2：现象推演与微观因果 (Phänomen & Kausalität)
1. **动态因果推演链 (Wenn-Dann-Analyse)**：
   - 实时依据滑块设定，推演系统宏观现象（现象随参数连续变化的动态因果表述，德汉对照）。
2. **微观本质机制深度剖析 (Wissenschaftliche Erklärung)**：
   - 底层分子、电化学、神经皮层、戏剧结构或经济学机制的原理解释，杜绝死记硬背。
3. **官方考纲核心术语清单 (Fachbegriffe & Vokabular)**：
   - 核心专业术语卡片（德语原文、中文翻译、高中考纲严格定义）。

### 📝 维度 3：会考真题与采分标准 (Klausur & EHZ-Standard)
1. **北威州高中真题原题题干**：
   - 标明算子（Operator）、能力层级（AFB I / II / III）与总分值（如 14 Punkte）。
2. **官方阅卷采分要点 (Erwartungshorizont - EHZ)**：
   - 序号化考官采分标准，精确指引得分采分点。
3. **15 分满分德语答题模版 (Formulierungshilfe)**：
   - 纯正德语学术规范用语（引用连词 `Infolgedessen`、`Demzufolge`、`Daraus lässt sich schließen...`）。
4. **💡 中文得分陷阱与审题破局点拨 (Tipps & Stolpersteine)**：
   - 针对中国留学生在德语考试中最容易丢分的陷阱提供针对性指导。

---

## 3. 全量自动化验证与指标

- **TypeScript 强类型校验**：`npx tsc -b` 0 错误通过；
- **生产打包构建**：`npm run build` 10.69s 编译成功，dist 产物完整；
- **双门禁全量回归测试**：
  - `python scripts/vault-check.py`：401 篇笔记、1921 词条、332 链接、356 门课程全部 PASS；
  - `python scripts/simulate-user-interaction.py`：全学科 403 个知识树节点、356 门互动微课 100% 通过；
- **持续运行**：本地开发服务器（`http://localhost:1420/`）平稳运行中。
