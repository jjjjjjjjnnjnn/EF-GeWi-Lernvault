---
fach: Meta
thema: "知识图谱节点收起后自动弹出与拼插式多语言模块化体系"
operatoren: [darstellen, analysieren]
klausurrelevant: false
datum: 2026-10-09
tags: [EF, Meta, App, UI, i18n]
---

# 2026-10-09 工作日志：知识图谱节点收起后自动弹出与拼插式多语言模块化体系

## 1. 任务背景与核心突破

根据用户明确需求与体验反馈（“我希望点击节点以后就自动弹出来啊（如果本来是收回的话）。相关操作和动态，你自己根据情况设计。以及增加多语言适配，目前大量节点只有中文显示。语言板块我也希望拼插性，模块化，方便维护和更新”），本轮迭代重点解决了抽屉交互响应与多语言可扩展性：

1. **节点收起后点击必弹出（Auto-Popup & Single-Touch Fix）**：
   - **双重反选根因排查与清除**：排查发现原代码在 `<g>` 元素上同时挂载了 `onPointerUp` 与 `onClick`，两者在非拖拽点击时各自触发 `setSelectedNodeId((prev) => (prev === nodeId ? null : nodeId))`，形成桌面浏览器上的“指针抬起打开 ➔ 紧随的点击立即反选关闭”双重抵消现象。本次全面规范了拖拽与点击职责，抬起仅做位移标记（`justDraggedRef`），点击统一由 `onClick` 处理；
   - **智能弹出交互契约**：当抽屉处于收回状态（`!isDrawerOpen`）时，无论用户点击的是否与上一次相同的节点，均确立“展开唤醒”意图，直接强开抽屉并更新选中节点；若抽屉已在展开状态，点击同节点收回，点击其他节点平滑切换。
2. **拼插式模块化多语言体系（Pluggable i18n Architecture）**：
   - 新建独立分层架构 `src/i18n/`：
     - `types.ts`：定义 `Lang` (`de` | `zh`)、`NodeLanguageMode` (`de` | `zh` | `bilingual`)、`I18nModule`、`NodeLocalizedContent`；
     - `registry.ts`：可插拔模块注册中心单例 `PluggableI18nRegistry`，支持运行时动态装配子模块；
     - `nodeLocalization.ts`：知识图谱节点多语言核心处理器，支持运行时学科外挂术语字典注册（`registerSubjectTermDictionary`），提供智能降级与中德双语对齐；
     - `modules/skillTree.ts`：图谱、抽屉、因果链模块化词条包；
     - `index.ts` / `src/i18n.ts`：100% 向下兼容既有 `t(lang)` 全量功能。
3. **知识图谱 HUD 多语言切换器与全景响应**：
   - 在图谱顶栏 HUD 嵌入 `[ DE 德语考纲 | DE·ZH 双语对照 | ZH 中文理解 ]` 切换胶囊；
   - 节点胶囊、学术大卡片、阶梯树节点以及右侧研习抽屉标题/摘要/因果步骤全链路接入语言模式，满足德语会考原版术语与中文概念理解的不同学习诉求。
4. **门禁与测试全绿验证**：
   - `SkillTreeCanvas.test.tsx`：扩充自动化测试至 15 项全绿（涵盖收起状态下任意节点自动弹出抽屉、同一节点反选、ESC 键收回、HUD 多语言切换等）；
   - `npx tsc -b`：TypeScript 全量编译零报错；
   - `npm run build`：Vite 生产环境完整打包通过；
   - `python scripts/vault-check.py`：416 笔记、1942 单词行、361 索引链接、356 微课全绿通过（PASS）。

## 2. 变更清单

- [`App-EF-Lernvault/src/i18n/`](file:///C:/Users/rongj/Desktop/学习/App-EF-Lernvault/src/i18n/)：新增多语言类型、注册中心、节点本地化引擎与图谱模块词典；
- [`App-EF-Lernvault/src/i18n.ts`](file:///C:/Users/rongj/Desktop/学习/App-EF-Lernvault/src/i18n.ts)：保留向下兼容转发；
- [`App-EF-Lernvault/src/components/SkillTreeCanvas.tsx`](file:///C:/Users/rongj/Desktop/学习/App-EF-Lernvault/src/components/SkillTreeCanvas.tsx)：集成自动弹出、多语言切换器与本地化渲染；
- [`App-EF-Lernvault/src/components/SkillTreeCanvas.test.tsx`](file:///C:/Users/rongj/Desktop/学习/App-EF-Lernvault/src/components/SkillTreeCanvas.test.tsx)：新增 2 个端到端单元测试用例。
