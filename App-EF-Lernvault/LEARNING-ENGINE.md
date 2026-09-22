# LEARNING-ENGINE — 学习引擎契约（中后端真相源，Phase A+B）

> 给外部AI（视觉）与主Agent（中后端）共用的行为契约。
> UI只调接口、不碰 localStorage；视觉可随意换皮，不得改本文件定义的语义。

## 1. 学习方法 → 模块（文献依据见 Journal audit-3 / Phase-A-Plan）

- 分布练习 spacing（教室 d=0.54，7天间隔最稳）→ `scheduler` 排期 + Planner 铺开
- 提取练习 + 反馈（有反馈 g=0.50，无反馈不如精加工）→ Quiz/Tutor 强制"作答→反馈"闭环
- 交错练习（总 g=0.42；单词类 −0.39 负效应，数学/视觉 best）→ Quiz 混合组卷按科开关
  （Mathe/Physik 默认开，Englisch 单词默认关 blocked）
- 中期小测（g=0.25）→ Reise 步骤内嵌 check
- 连续再学习 → 背卡 Again 队尾重排（会话快照语义，见 §4）

## 2. 数据流程

```
vault md/csv → vault/parser（frontmatter/Block/CSV五列）
  → vault/loader（SKIP禁区：App-EF-Lernvault/_Downloads/node_modules/dist/target/Journal；fach+datum排序）
  → engine/index（检索：精确优先 ∪ fuse模糊；空query=全量；顺序=源顺序）
  → engine/rag（L0：Block切分 path#Zeile + prompt拼装 + verifySupport字符串校验）
  → engine/embed（L2-API/L1-本地jina-de/静默降级链；移动端默认关；向量会话缓存）
  → engine/storage+stores（版本化 six键 + Backend接口 + legacy旧档heben）
  → scheduler（FSRS自研简化版；prioritizeCard/prioritizeThema错题回流）
  → engine/interleave（分科默认 + override + round-robin/blocked排序）
  → engine/overview（主页数据：到期/新卡/XP/连击/掌握度/周完成率/倒计时）
```

## 3. 交互契约（触发 → 中后端调用 → UI状态）

- 全局搜索 `/` → `searchIndex.query(q)` → 笔记库列表过滤 + filter-chip（词 + n Treffer + ×清除）
- 背卡评分 1–4 → `gradeCard(id, rating)` 落盘 + 会话快照推进
  （快照=进场冻结队列；Again 重排队尾；走完快照才算完成；header计数=快照口径）
- Quiz 生成 → `generateQuizFromNote / generateExtendedQuiz / getVergleichItems`
  （AFB triple 恒为 tasks[0..2]；sourceRef 非空强制，空则抛错；无 vault/无 klausurrelevant → MOCK 兜底）
- Vault 接入 → `pickVault()`（File System Access，需 Edge/Chrome；取消=静默）
- 设置 → 侧栏底部独立区（Alt 9），与 8 学习 tab 分离；顶栏只剩搜索 + 状态
- 主页 → `buildOverview(cards)`（到期/新卡/XP/连击/掌握度=stability映射/周完成率/考试倒计时）；nextUp 跳笔记库
- 交错 → Quiz表头开关（当前学科，默认Mathe/Physik/Chemie/Bio开）；开=跨科轮排，关=本学科置顶成块
- 错题回流 → Quiz两处"送回背卡堆" → `prioritizeThema(cards, thema)`（仅review卡即时到期）

## 4. 存储键（`version:1`，导出=整串 JSON，用户回 Obsidian 确认；App 永不写回 vault）

`eflernvault:fsrs:v1`（经 storage.ts）· `eflernvault:xp:v1` · `eflernvault:vergleich:v1` ·
`eflernvault:feedback:v1` · `eflernvault:plan:v1` · `eflernvault:onboarding:v1` · `eflernvault:interleave:v1` ·
`eflernvault:lang` · `eflernvault:ai:v1`（Key 明文 + embedModel，见 AI-SETUP 风险告知）

## 5. 测试（`npm run test:run` 全绿门禁）

`scheduler`（排期单调性/Again 上限/快照回归/回流）· `vault/parser`（frontmatter/Block/csv坏行）
· `vault/loader`（SKIP/分类/排序，reise 已 mock 解耦）· `quizgen`（AFB/sourceRef/兜底/交错正确项）
· `engine/storage`（版本/坏串/迁移安全）· `engine/index`（精确优先/fuzzy/CJK/顺序）
· `engine/stores`（legacy-heben/后端切换）· `engine/rag`（切分引用/检索/拼装/校验）
· `engine/embed`（余弦/排序/mock-fetch/mock-pipeline/降级链/缓存）
· `engine/interleave`（默认/覆盖/排序）· `engine/overview`（空档/到期/掌握度/计划率/倒计时）
