---
fach: ""
thema: "Phase-A-Lern-Engine"
datum: 2026-09-23
tags: [EF, Meta]
---

# 2026-09-23 Phase A Lern-Engine 完工（`[App] 505f205`，分阶段第一步）

## 交付（GATE1+GATE2 双绿）

- 测试地基：vitest5+jsdom+RTL+user-event（`test` watch / `test:run` 单次）；6文件48单测全绿1.3s
  scheduler（排期单调/Again上限/快照回归）· parser · loader（SKIP/分类/排序）· quizgen（AFB/sourceRef/兜底）
  storage（版本/坏串）· index（精确优先/fuzzy/CJK）
- `engine/`：storage.ts（版本化键，已迁fsrs；xp等5键待迁）+ index.ts（fuse精确优先∪模糊，Library已接）
- 设置下沉：7学习tab + 底部独立设置区（分割线+Alt 8）；顶栏齿轮移除；keys/帮助同步
- 契约：LEARNING-ENGINE.md（方法→数据→交互，外部AI照此画皮）；NOTICE同步fuse+测试链许可
- 验收：test:run 48/48 + build 2.08s + vault-check 38/203/118 PASS + 1420在线200

## 修过的BUG（测试逼出）

- fuse对路径query过召回 → 精确命中优先语义；REICH本就是Ungleichheit子串（用例错，非代码错）
- loader测拖入`?raw`课文件 → reise mock解耦（loader不管reise解析）

## 待 Phase B

- xp/vergleich/feedback/plan/onboarding迁storage.ts；向量RAG；面板数据层；交错按科开关落地Quiz
