---
fach: ""
thema: "V1-Walkthrough-Simulation"
datum: 2026-09-23
tags: [EF, Meta]
---

# 2026-09-23 V1模拟走查：真L1穿真UI全绿（`[App] 6c9c100`，191单测）

## 做法（无浏览器，用真代码模拟用户）

- HTTP层：1420在线200；`/src/reise.ts`编译200；L1经`/@fs/`?raw 200内容正确
- 新`src/walkthrough.test.tsx`：fs直读真`Lernreise/Sowi-...-L1.md`→真`parseReiseFile`→RTL挂载真`ReiseModule`+真`FeedbackFloat`（engine-off离线档），一步步点完8步

## 断言结果（全部通过）

- 解析：8步型序entdecken×3/ausprobieren×2/check/szenario/entdecken；step3含diagram块；Fehlvorstellung被skip；check3题；rubric≥2
- 门禁：初始仅01可用（02 disabled）；check未全标→下一步disabled；szenario<2勾→disabled
- 离线：step3出ASCII保底（MARKT-Säule）；ausprobieren提交→"Versuch notiert"静态反馈
- 收尾：alert触发+XP入库+回目录；Schritt6开浮窗上下文=`<kurs-id>#Schritt6`，反馈入库ctx精确

## 顺手修

- `vite.config.ts`加`server.fs.allow:[".."]`（exemplar ?raw引vault-root文件；dev本就如此服务，补声明+让vitest可测）

## 留给真人（机器测不到）

- V2三档体感/前导卡毫秒感；V3整场45分钟+评分可信度；V4冲刺凑齐感——仍需用户走，清单见上一轮对话
