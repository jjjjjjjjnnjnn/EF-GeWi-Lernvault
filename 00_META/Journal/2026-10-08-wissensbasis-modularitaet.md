---
fach: ""
thema: "Journal 2026-10-08 Wissensbasis Modularitaet"
operatoren: []
klausurrelevant: false
datum: 2026-10-08
tags: [EF, Meta, Journal]
---

# 2026-10-08 — 解耦可扩展知识库框架与导入导出管理总台落成

## 1. 架构目标与对标实践 (Architektur-Ziele)
围绕用户核心诉求：**“把项目模块化。提供知识库框架。内部存在默认的学科知识，同时用户可以选择导入、导出、添加知识库内容。提取骨架，使项目模块化、可拓展化，方便用户使用和开发者扩充（对标 BiliNote 插件式扩展）”**。

我们在 `App-EF-Lernvault` 中确立并实现了全新的知识库框架层 (`src/framework/`) 与统一管理总台 (`KnowledgeManagerModal`)：
1. **内置开箱即用知识库**：官方 Gymnasium EF/Oberstufe 10 门标准学科考纲笔记（412篇）与 Anki 词卡（1942张）开箱即用，零配置启动；
2. **三层融合与统一仓储 (`KnowledgeRepository`)**：
   - 底层（Preset）：官方静态预置知识库；
   - 增量层（User Custom）：保存在浏览器安全的本地持久化存储 (`localStorage`)，杜绝因外部权限问题引发崩溃；
   - 外部挂载层（Folder Vault）：用户使用 File System Access API 挂载本地 Obsidian 目录时平滑接入，外部文件保持只读保护；
   - 单一真相源：`getAllNotes()` 与 `getAllCards()` 负责三层合并、自定义覆盖与去重；
3. **响应式订阅广播系统 (`subscribe / notify`)**：
   - 用户在 App 内添加、编辑、删除或批量导入笔记与词卡后，单例立即触发变更广播；
   - `App.tsx` 与各业务模块（`Library`、`Flashcards`、`Quiz`、`KlausurSim`、`Tutor`、`Lernbaum`、`Planner`、`DailySprint`）通过 React 状态无缝同步响应刷新；
4. **全格式多通道导入与导出能力**：
   - **导入器 (`importer.ts`)**：支持导入 YAML frontmatter 规范的 Markdown 笔记、纯文本笔记分段抽取、Anki 分号 CSV、以及标准化知识包 JSON；
   - **导出器 (`exporter.ts`)**：支持导出为标准化知识包 JSON (`schemaVersion: 1`)、Obsidian 兼容的 Markdown 考点笔记、Anki 导入格式 CSV，前端使用原生 Blob 触发纯离线极速下载；
5. **开发者模块化学科插件注册表 (`FachRegistry`)**：
   - 采用标准接口 `FachPlugin`，开放 `registerSubject(plugin)` API；
   - 开发者扩展全新学科（如计算机科学 Informatik、艺术 Kunst 等）与专属 Operatoren 时，无需修改核心路由或侵入老业务代码。

---

## 2. 界面与交互交付 (`KnowledgeManagerModal` & `App-Chrome`)
- **Tufte 纯黑白学术纸墨美学**：遵守全无彩色、无外部阴影 (`shadow-none`)、无 Emoji、手绘内联细线 SVG 图标规范；
- **五大多功能 Tab 管理台**：
  1. `Übersicht & Status`：统计全库总览（预置 vs 用户自定义笔记/卡片量、学科分布与存储健康度）；
  2. `Hinzufügen`：结构化新建考点笔记与双语词卡表单，即时校验并持久化；
  3. `Importieren`：支持本地文件选择或文本粘贴导入 Markdown / CSV / JSON，支持导入前学科绑定；
  4. `Exportieren`：支持按全科或特定学科一键导出 JSON 知识包、Markdown 笔记或 Anki CSV；
  5. `Entwickler-Skelett`：提供标准的插件注册代码示例与事件通信指南；
- **全局触达与操作闭环**：
  - 顶部导航栏右侧常驻 `[Wissensbasis / 知识库]` 极简按钮；
  - 设置页面（`Settings.tsx`）第 3 节专属卡片一键唤起；
  - 全局命令面板 (`Cmd/Ctrl+K`) 注册 `act-knowledge-manager` 操作项，支持键盘直达；
  - 快捷键 `Escape` 统一层叠式关闭。

---

## 3. 质量门禁与全量验证
- **TypeScript 强类型检查**：`cmd /c "npx tsc -b"` 零报错通过；
- **新增框架单元测试**：`src/framework/framework.test.ts` 14 个测试全量通过；
- **全量单元与契约测试**：`cmd /c "npx vitest run"` 66 个测试文件、**454 个测试全部 100% 绿灯 PASS**（原基线 438 个）；
- **生产打包构建**：`npm run build`（Vite 7 生产打包，耗时 11.86s）成功输出生产静态包；
- **Vault 物理一致性检验**：`python scripts/vault-check.py` 验证输出 `PASS`（notes=412, csv_rows=1942, badnames=0, badglossar=0）。
