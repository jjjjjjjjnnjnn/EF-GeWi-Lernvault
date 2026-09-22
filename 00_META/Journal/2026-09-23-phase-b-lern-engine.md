---
fach: ""
thema: "Phase-B-Lern-Engine"
datum: 2026-09-23
tags: [EF, Meta]
---

# 2026-09-23 Phase B 完工（`[App] 24ec1ba`，存储→RAG→交错→主页）

## 交付（GATE-B0/B1/B2/B3 全绿：97单测/build/vault-check 38-203-119/1420在线）

- B0存储：`engine/stores.ts`五键收敛（旧档heben回写）+`StorageBackend`接口（memory切换已测，云同步只换实现）；lang/ai按计划保留
- B1检索：`rag.ts`（Block切分path#Zeile+拼装下沉+verifySupport）接Tutor/Quiz，旧"前8笔记"退役；
  `embed.ts`（L2-API/L1-jina-de-q8/静默降级/会话缓存/移动端默认关）接Tutor（RAG-Lx标签+Unsicher标记）；AiSettings加embedModel栏
- B2交错：`interleave.ts`（理科学科默认开+override+轮排/成块）接Quiz列表+表头开关；
  `prioritizeCard/prioritizeThema`+两处"送回背卡堆"
- B3主页：`overview.ts`（到期/新卡/XP/连击/掌握度/周完成率/倒计时）+Home tab首位landing；
  快捷键Alt1-8模块、Alt9设置；LEARNING-ENGINE/NOTICE/INTERACTION-BRIEF同步

## 博弈记录（阶段性决策）

- fuse路径过召回→精确优先语义；loader测`?raw`越界→reise mock解耦
- REICH系Ungleichheit子串（用例错非代码错）；Tutor首次L1下载走本地进度条明示，不静默
- interleave开关绑定当前学科（列表跟随重排，index语义=排序后位置）；回流仅review卡计数

## 待后续

- L1语义校验 stage-2（scoreClaimSupport已备纯函数）；云同步Backend实现；外部AI按契约做主页/整体视觉
