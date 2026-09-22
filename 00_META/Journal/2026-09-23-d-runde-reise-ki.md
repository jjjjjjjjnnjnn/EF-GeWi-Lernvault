---
fach: ""
thema: "D-Runde-Reise-KI"
datum: 2026-09-23
tags: [EF, Meta]
---

# 2026-09-23 D轮完工：Reise动态化FelloFish式（`[SoWi] 284b5b6` + `[App] 9e959ca`，128单测全绿）

## 用户原诉求 → 根因 → 交付

1. "Schritt3没有图"→```块被parser一律喂KaTeX→```diagram独立成块+ASCII保底<pre>，
   LLM按约束出SVG（allowlist消毒+会话缓存），离线/失败仍有原稿图
2. "教学LLM动态调配"→Reise零LLM→entdecken进步骤自动讲解+追问；ausprobieren提交即点评；
   check设Warum单题讲解；引擎off全回静态（诚实降级）
3. "写文章AI校准打分+教怎么做"→自评勾选→szenario/muendlich提交即批改
   （逐rubric+0-15分+句型架+改写示范，记轮次取最佳）；门禁仍看手动勾选（AI只做形成性）
4. "和fellofish一样"→研读fellofish.com：多轮改写循环+可操作建议+辅助（双语）已落地；
   老师仪表盘不做（单机定位，主页掌握度覆盖个人侧）

## 验收

- 128/128 + build + vault-check 38/203/121 + 1420在线200
- 修补记录：muendlich评分块误插szenario-IIFE（已搬正）；测试断言错位两次（REICH子串/系统vs用户消息）

## 用户验证（需开AI引擎）

- Reise进Schritt3：先见ASCII原稿→数秒变SVG图（标题栏注明）；关引擎→只见原稿
- entdecken追问框连问2轮；ausprobieren随便写一句点检查；szenario写3句点AI批改→改一版→点"改完再评"
