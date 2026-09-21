---
fach: ""
thema: "Interaction redesign"
datum: 2026-09-21
tags: [EF, Meta]
---

# 2026-09-21 交互重做记录

## 调研（见 INTERACTION-BRIEF.md）
- Anki：Space 翻卡 / 1-4 评分是肌肉记忆，直接沿用。
- Linear/Raycast：Ctrl+K 命令面板、助记单键、Esc 回退、100/150/250ms 三档动效。
- RemNote：练习队列 + 进度可见。

## 做了什么
- 全局：Ctrl/⌘K 面板（模块/笔记/操作）、`/` 搜索、`Alt 1–6` 切模块、`L` 中德切换、`?` 帮助层；`src/keys.ts` 唯一真相源。
- 背卡：键盘全流程 + 翻后左右拖（右掌握/左重来）+ 发丝进度线 + 按钮数字角标。
- 笔记库：j/k/↑↓ 走格 + 阅读列淡入；刷题：Space 计时。
- 动效 token 进 `index.css`（ease-out cubic-bezier(0.16,1,0.3,1)）。
- `npm run build` 一次通过（40 modules）。

## 待办
- P1 接线：面板"笔记直达"目前基于 mock，换真实 vault 后自动生效；加"打开知识库"动作。
- 用户实测手感（重点：拖拽阈值 90px 是否顺手）。
