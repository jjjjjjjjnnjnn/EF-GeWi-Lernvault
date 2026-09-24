---
fach: ""
thema: "Removal of Shortcut Badges, Uniform Sidebar Buttons and 10-Subject Expansion"
datum: 2026-09-24
tags: [EF, App, Meta]
---

# 2026-09-24 快捷键显示清理、左侧导航按键等大化与全学科数据接入（`[App]` / `[Meta]`）

## 1. 用户指令落实
- “去掉所有的快捷键显示”：
  - 清理左侧导航栏所有 `Alt 1` ~ `Alt 0`、`Alt ,` 的 `<kbd>` 快捷键角标与按键悬浮文字，消除杂乱的视觉噪点；
  - 清理 `Quiz.tsx` 中单选题选项 A / B 上的 `<kbd>1</kbd>`、`<kbd>2</kbd>` 徽标，使卡片题目更专注纯净；
  - 侧栏底部的 `? 帮助` 快捷键提示清理为极简文本按钮 `Hilfe` / `帮助`；
  - 保留底层的键盘全局监听事件（仍支持盲打高效导航，但界面上不再出现任何突兀按键标签）。
- “把左侧所有的标志按键变成同样大小，方便点击”：
  - 将左侧导航全部一级栏目按键（主页、考期、笔记库、脑图、教具、卡片、测验、模考、课程、AI 导师）以及底部的“设置”按钮统一规格；
  - 统一容器高度为 `h-10`，内边距 `px-2.5`，圆角 `rounded-[var(--radius)]`；
  - 统一左侧图标框为 `h-5 w-5 shrink-0 flex items-center justify-center`，在折叠窄屏与展开宽屏下均保持完美的触控与鼠标击中热区。
- “接入其他所有学科的信息等。可能需要你处理设计一下”：
  - 扩展系统内所有 10 门北威州高级阶段高中课程（Deutsch, Englisch, Mathe, Physik, Chemie, Bio, Philosophie, SoWi, Musik, Sport）；
  - 全面补全 `src/data.ts` 中的双语真实考纲样题、核心概念与考情笔记结构；
  - 在思维导图 `Mindmap.tsx` 中集成 10 学科筛选与拓扑聚类，点击节点精准携带学科元数据跳转笔记库。

## 2. 验证与质量保证
- **单元与契约测试**：55 个测试套件，354 个测试 100% 通过（`npm test -- --run`）。
- **生产打包**：`npm run build` TypeScript 检查（零 unused 变量、零类型错误）与 Vite 生产构建顺利通过。
- **Vault 完整性验证**：`python scripts/vault-check.py` 严格校验通过（PASS，0 坏行，0 丢失链接）。
