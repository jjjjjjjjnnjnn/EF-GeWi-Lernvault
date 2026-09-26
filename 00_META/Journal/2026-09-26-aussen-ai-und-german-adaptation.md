---
fach: Meta
thema: "德语纯净模式适配、UI溢出防遮挡与外部AI交接总指南"
operatoren: [analysieren, implementieren, optimieren]
klausurrelevant: false
datum: 2026-09-26
tags: [EF, Meta, App]
---

# 德语纯净模式适配、UI溢出防遮挡与外部AI交接总指南

> 日期：2026-09-26
> 状态：✅ 全部达成，三门禁全绿（vault-check PASS / Vitest 58 套件 387 测试全过 / npm run build 零错误通过）

---

## 1. 本轮需求与目标

1. **德语纯净模式（German Native Mode）深度净化**：
   - 针对德语区本地高中生（Gymnasium NRW），当选择德语模式（`lang === "de"`）时，剔除任何中文脚手架（如中文理解、CN-Methode、中德双语斜杠、中文提示等），保留纯正德语学术规范与 AFB I/II/III 答题要求。
2. **德语长词与按钮排版防遮挡（Overflow & Truncation Fix）**：
   - 德语复合词过长导致按钮换行、被遮挡或产生横向滚动条的问题彻底修复。
   - 顶栏自适应高度重构，移动端/窄屏自适应折行。
3. **外部 AI 生产交接总指南与 10 科考纲缺口清单**：
   - 为大规模生成 10 科课程与笔记创建完整的交接文档，涵盖提示词工程、质量门禁、排版契约与标准工作流。

---

## 2. 核心实施成果

### 1) 德语纯净模式与受众配置引擎 (`audience.ts` + `Blocks.tsx` + `Library.tsx` + `Reise.tsx`)
- 新建 `App-EF-Lernvault/src/config/audience.ts`，定义德语本地生（`de-native`）、中国留学生双语桥接（`zh-bilingual`）和国际生（`en-intl`）三种受众模式，并内嵌北威州 NRW 考试 Operatoren 字典（含 AFB 难度等级与考点技巧）。
- 在 `Blocks.tsx` 中增加 `pureGerman` 支持与过滤器，自动过滤中文块及段落内中文引导标记。
- 在 `Library.tsx` 增加 `[DE rein]` 与 `[Bilingual]` 模式切换，并为每个主题显示对应的 AFB 徽章与动词考点说明。
- 在 `Reise.tsx` 中将按钮文案进行自适应紧凑化改造（例如精简为 `Weiter (+5 XP) →` 和 `Erneut prüfen`），彻底消除溢出遮挡。

### 2) 外部 AI 生产交接总文档 (`00_META/Aussen-AI-Gesamtfahrplan-und-Aufgabenpakete.md`)
- 梳理 10 科北威州 Inhaltsfelder 与全部缺口主题，形成清晰的任务矩阵。
- 给出三套工业级 Prompt 模板：
  - **任务包 A**：现有 88 篇课程的德语深度净化；
  - **任务包 B**：全新德语母语级课程批量生成；
  - **任务包 C**：中德双语桥接深度课程生成。
- 明确前端 UI 与字符长度限制规范（按钮不超过 18 个字符），并给出交付验证步骤与校验脚本执行方法。

---

## 3. 门禁验证状态

- **Vitest 测试套件**：58 个测试文件全部通过（387 passed）。
- **Python Vault 检查**：`python scripts/vault-check.py` 报告 `PASS (badnames=0, badglossar=0)`。
- **App 生产打包**：`npm run build` 成功完成，零 TypeScript/Vite 构建错误。
