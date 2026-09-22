---
fach: ""
thema: "Reise-Nav-Fix-Feedback"
datum: 2026-09-22
tags: [EF, Meta]
---

# 2026-09-22 Reise跳转修复 + Dev-Feedback（用户报障）

## 报障

- SoWi-L1 Schritt 2（entdecken）点"已理解，下一步"无反应。

## 根因

- `Reise.tsx` 三处写死旧4步课程序号：entdecken `setStepIdx(1)`、ausprobieren `unlockNextStep(2)` + Weiter跳`setStepIdx(2)`、check `setStepIdx(3)`。v3课程8步且类型重复 → Schritt 2点下一步等于原地踏步；Schritt 5/6做完会往回跳。
- 附带：ausprobieren通过文案写死旧课内容（"Staatliche Ordnung vs. Wettbewerbsfreiheit"），任何课都显示同一句。

## 修复（仅 `Reise.tsx` + 新增 `FeedbackBox.tsx` + `Quiz.tsx` 挂载，零新依赖）

- 新增 `goNextOrFinish(xp)`：相对导航 `stepIdx+1`，末步转结课（+XP/弹提示/回目录）；entdecken/ausprobieren/check三处切换；末步按钮文案切"完成课程"；szenario/muendlich本就相对，未动。
- ausprobieren通过文案改为通用句。
- Dev-Feedback（用户要的开发者功能）：新组件 `FeedbackBox`，默认折叠，textarea + 保存（`localStorage:eflernvault:feedback:v1`，version:1，条目含ts/ctx/text）+ 复制全部 + 最近5条列表可删；挂载两处——Reise每步底（ctx=`courseId#SchrittN`）、Quiz底（ctx=`quiz:notePath`/`vergleich:id`）。无新快捷键（keys.ts不动），token/无emoji合规。

## 验收

- `npm run build` 一次过（1.14s）；grep确认无残留硬编码序号（仅切课`setStepIdx(0)`）。
- 用户侧待验：重进Sowi-L1，Schritt 2→8一路下一步 + 反馈框写一句 → 复制全部贴回。
