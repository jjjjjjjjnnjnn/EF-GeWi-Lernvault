---
fach: ""
thema: "Reise-Katex-KI-FelloFish"
datum: 2026-09-23
tags: [EF, Meta]
---

# 2026-09-23 用户反馈三修：公式懒加载+为啥置灰+check步FelloFish批改（`[App] ffd56d6`，195单测）

## 反馈原文（`L1#Schritt6`浮窗）

1. 数学公式首次刷新太慢 2. "为啥？AI讲解"无法点击 3. 要FelloFish式AI自动打分/分析/评估/纠错/教学

## 根因与修法

- 公式慢：`import katex`静态打进首chunk（~270KB阻塞首绘）。→新`MathHtml.tsx`：首绘立即出原文（同字号占位），KaTeX动态import异步排版+模块级公式缓存（二次渲染零代价）+idle预取；dist验证katex已独立成256KB chunk按需加载
- 为啥点不动：默认引擎off，所有KI按钮静默早返（能点但无反应=体感"无法点击"）。→off时按钮置灰+文案后缀"（AI未开启）"+title指路"点顶栏齿轮去AI设置打开"（check为啥/szenario批改/check新批改三处；ausprobieren检查答案离线可用不受影响）
- FelloFish循环：check步以前只能自标通过，无处交答案。→每题加"合书默写"输入+`AI批改·打分`：`buildCheckScorePrompt`强制四段（PUNKTE 0-3星/FEHLERANALYSE引原文/KORREKTUR句型+例句/LEHRE记忆钩+回哪步）+中文2句总结+"改完再评（第N轮）"；门禁（自标通过）与XP不变

## 取证

- 195/195单测（新MathHtml 3+reise-ki 1+walkthrough门禁断言）+build 6.03s+vault-check(38/203/129)+1420在线
- 用户开AI引擎（顶栏齿轮→AI设置→API直连填Key）后刷新，Schritt6三按钮即生效
