---
fach: ""
thema: "Feedback-Float"
datum: 2026-09-22
tags: [EF, Meta]
---

# 2026-09-22 反馈栏改全局右下角浮窗（用户需求）

## 变更（`FeedbackBox.tsx` + 三处接线，零新依赖）

- 新增 `FeedbackFloat`：fixed右下角药丸钮（`Feedback / 反馈 (n)`），点开展开320px面板（位置行+输入+保存+复制全部+最近5条可删），z-50，token/无emoji合规。
- 上下文总线：`setFeedbackContext`/`useFeedbackContext`模块级订阅；Reise按步上报（`courseId#SchrittN`，目录页报`reise:katalog`）、Quiz按模式上报（`quiz:notePath`/`vergleich:id`）、App切tab时非课程页上报（`tab:xxx`，课程页由子effect覆盖——子effect先跑，父后跑但只处理非课程页，无覆盖问题）。
- 拆除昨日行内挂载（Reise步底/Quiz底），浮窗App根单点挂载，全模块可用。

## 验收

- `npm run build` 一次过（1.09s）；vault-check PASS（93/93）。
- 用户侧待验：任意页右下角点开 → 位置行应显示当前步（如`…L1#Schritt5`）→ 写一句保存 → 复制全部贴回。
