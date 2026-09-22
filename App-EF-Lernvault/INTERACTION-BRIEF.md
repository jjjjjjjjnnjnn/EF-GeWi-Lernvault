# INTERACTION-BRIEF — 交互规范（与 UI-BRIEF 并列，UI 不许违背）

> 调研来源：Anki 肌肉记忆（Space 翻卡/1-4 评分）、Linear/Raycast 键盘优先
> （Ctrl+K 面板、助记单键、Esc 回退、sub-100ms 体感）、RemNote 练习队列。
> 原则：键盘永远比鼠标快，但鼠标永远可用；动效只做 opacity/位移，≤250ms ease-out。

## 1. 全局键（`src/keys.ts` 是唯一真相源，HelpOverlay `?` 直接渲染它）
- `Strg/⌘ K` 命令面板（模块/笔记/操作三组，↑↓+Enter+Esc）
- `/` 聚焦搜索（自动切到笔记库）；`Alt 1–8` 切模块（含8=设置）；`L` 中德切换；`Esc` 关闭弹层
- 新增全局键必须先登记进 `keys.ts`，否则 Help 里没有 = 不许上线

## 2. 分模块交互
- **背卡**：Space/Enter 翻卡，翻后 1-4 评分；翻后可左右拖（>90px：右=掌握/左=重来，边缘出 mono 提示）；
  顶部发丝进度线（本轮位置），底部按钮带数字角标；评分行保留点击（触屏/鼠标兜底）
- **笔记库**：`j/k` 或 ↑↓ 在过滤列表走格，阅读列 key 切换淡入（180ms rise）
- **刷题**：Space 计时开始/停止（输入框聚焦时不触发）
- **命令面板**：模块直达（hint 显示 Alt+数字）、笔记直达（自动填搜索）、操作（语言/帮助）

## 3. 动效 token（`index.css` 的 :root，Linear 同款数值）
- `--ease-out: cubic-bezier(0.16,1,0.3,1)`；fast 100ms（按压）、normal 150ms（hover/面板）、view 250ms（上限）
- `.tab-enter` / `.palette-enter`：opacity + 6px rise；禁止弹跳/漂浮/循环装饰
- 按压反馈沿用上一轮：`active:scale` + 背景加深 + `focus-visible` 靛蓝细线

## 4. 禁止项
- 为交互加装饰性动效；快捷键冲突（数字键只属于背卡评分，全局切模块必须带 Alt）；
  面板/弹层无 Esc 出口；输入框聚焦时全局单键劫持（`isTyping()` 是守卫，删了算违规）
