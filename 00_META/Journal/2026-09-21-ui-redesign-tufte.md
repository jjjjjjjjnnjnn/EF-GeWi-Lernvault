---
fach: ""
thema: "App UI Redesign Tufte Data-Ink"
datum: 2026-09-21
tags: [EF, Meta]
---

# 2026-09-21 App UI 重做记录（Tufte Data-Ink 风格）

## 背景与目标
接手 `App-EF-Lernvault/UI-BRIEF.md`，执行桌面学习软件从原型到 Tufte Data-Ink 设计语言的重构：
- 严格遵循信息墨水比（Data-Ink），消除堆叠卡片、饱和紫色与阴影装饰。
- 采用纸墨三色（纸面 `#FAFAF7`、墨水 `#1C1B17`、次要灰 `#6B675C`，点缀靛蓝 `#4338CA`）。
- 离线系统字体：德语学术古典衬线（Georgia/宋体）与中文人文 Sans 对照排版，严禁斜体。
- 零新增依赖、不改 `data.ts` 与 `i18n.ts`、通过 `npm run build`。

## 已完成
1. `src/index.css`：定义 Tufte 颜色与字体 Token；配置平稳 3D 翻卡（0.48s 无弹跳）；添加长词换行防护。
2. `src/App.tsx`：重构左侧导航（低调纸墨底、发丝细线右界、深靛蓝当前指示器）；顶栏极简搜索与双语切换；支持 URL 参数定位模块以便自动化测试。
3. `src/modules/Library.tsx`：实现 `~46rem` 经典居中阅读列；中德对照块改为"中文灰在前、德语衬线墨黑在后"；Operatoren 等宽细线标签与 Klausur 徽章。
4. `src/modules/Flashcards.tsx`：单张纸白卡片（无阴影、发丝线边框）；背面去除紫色大色块；底部评分按钮改为横向细线分隔文本按钮组。
5. `src/modules/Quiz.tsx`：等宽无修饰大计时器（tabular-nums）；1./2./3. 步骤细线清单；Fehlerlog 标本式虚线代码块。
6. `src/modules/Tutor.tsx`：重塑为纸面对话流（AI 无底色+左细指示线，用户浅灰底）；离线警示精简为单行小字状态。
7. `src/modules/Planner.tsx`：衬线大数字倒计时；发丝细线周任务清单（勾选后灰度删除线）。
8. `src/modules/Mindmap.tsx`：蓝图线框风格 SVG；修复左边界与节点文字重叠问题；建立自然的层级分支树。
9. 验收通过：`npm run build`（tsc+vite 0报错0警告）；1100px 宽度无溢出；6 模块截图已留档验收。

## 待办 / 下一步
- P1 阶段：将 `data.ts` 替换为真实 Obsidian vault Markdown 与 frontmatter 解析器。
- 等待 MSVC BuildTools 安装完毕后进行 Tauri 端打包测试。
