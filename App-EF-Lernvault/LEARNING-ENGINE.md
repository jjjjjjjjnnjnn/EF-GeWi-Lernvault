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
  → engine/embed（L2-API/L1-本地jina-de/静默降级链；移动端默认关；向量会话缓存；
  E轮：auto永不隐式下载+HF镜像源+显式加载按钮；进度按loaded/total字节比）
  → engine/storage+stores（版本化 six键 + Backend接口 + legacy旧档heben）
  → scheduler（FSRS自研简化版；prioritizeCard/prioritizeThema错题回流）
  → engine/interleave（分科默认 + override + round-robin/blocked排序）
  → engine/overview（主页数据：到期/新卡/XP/连击/掌握度/周完成率/倒计时）
  → engine/diagram（LLM-SVG约束生成+消毒allowlist+会话缓存）+ engine/reise-ki（entdecken/ausprobieren/check/szenario prompt构造）
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
- Reise动态（FelloFish式）：entdecken进步骤自动KI讲解+追问；ausprobieren提交即AI点评；
  check设"Warum"单题讲解；szenario/muendlich提交即AI校准打分（逐rubric+句型架+改写示范，记轮次取最佳）；
  门禁仍看手动勾选（AI只做形成性）；引擎off全回静态
- 图解 → ```diagram围栏独立成块（纯```仍走公式）；Reise按约束出SVG（消毒+缓存），离线/失败回ASCII原稿

## 4. 存储键（`version:1`，导出=整串 JSON，用户回 Obsidian 确认；App 永不写回 vault）

`eflernvault:fsrs:v1`（经 storage.ts）· `eflernvault:xp:v1` · `eflernvault:vergleich:v1` ·
`eflernvault:feedback:v1` · `eflernvault:plan:v1` · `eflernvault:onboarding:v1` · `eflernvault:interleave:v1` ·
`eflernvault:lang` · `eflernvault:ai:v1`（Key 明文 + embedModel，见 AI-SETUP 风险告知）
· `eflernvault:sync:v1`（endpoint/token/lastSync；Key material nur lokal）

### Cloud-Protokoll（自备服务器实现，任意技术栈）

- `GET {endpoint}/{key}` → `{ "value": "<raw-string>" }`，缺失回 404（客户端视为 null）
- `PUT {endpoint}/{key}` + `{ "value": "<raw-string>" }` → 2xx
- 鉴权：`Authorization: Bearer <token>`（token 为空则不带头）；key 须 `encodeURIComponent`
- 语义：本地常驻（离线可用）；上传=全量 keys 覆盖；下载=服务端赢；冲突不合并（以后加 updatedAt 再谈）

## 5. 测试（`npm run test:run` 全绿门禁）

`scheduler`（排期单调性/Again 上限/快照回归/回流）· `vault/parser`（frontmatter/Block/csv坏行）
· `vault/loader`（SKIP/分类/排序，reise 已 mock 解耦）· `quizgen`（AFB/sourceRef/兜底/交错正确项）
· `engine/storage`（版本/坏串/迁移安全）· `engine/index`（精确优先/fuzzy/CJK/顺序）
· `engine/stores`（legacy-heben/后端切换）· `engine/rag`（切分引用/检索/拼装/校验）
· `engine/embed`（余弦/排序/mock-fetch/mock-pipeline/降级链/缓存）
· `engine/interleave`（默认/覆盖/排序）· `engine/overview`（空档/到期/掌握度/计划率/倒计时）
· `engine/sync`（mock-server roundtrip/404/500/头规范）· `engine/embed` stage-2（claim切分/阈值/缓存复用）
· `flow`（vault→chunk→retrieve→quiz→rubric→lernsitzung→overview 全链模拟）
· `modules`（Home/Library/Settings 渲染冒烟 + 芯片清除/同步报错交互）

## 6. 视觉契约（给外部AI：只换皮，不改语义；行为见 §3）

- Token（`index.css`）：纸面 `#FAFAF7` / 墨 `#1C1B17` / 灰 `#6B675C` / 线 `#E5E1D8` / 强调 `#4338CA`；
  离线系统字体（serif 标题 + sans 正文 + mono 数据）；16×16 手绘细线 SVG 图标；禁 emoji
- 导航：侧栏 8 学习 tab（主页首位）+ 底部独立设置区（分割线 + Alt 9）；顶栏=搜索 + 状态；
  命令面板（Strg/⌘K）+ `?` 帮助 + 右下反馈浮窗常驻
- 组件清单（改皮时逐个认领）：Home 四统计 + 优先重背 chips + 掌握度条；Library 学科徽章 + filter-chip +
  双列阅读；Flashcards 翻卡 + 1-4 评分 + 拖拽；Quiz 五步 drill + 对比双栏 + 四维 rubric pills +
  错题补丁 + 送回按钮；Tutor 对话 + 引用 chips + ohne-Beleg/Unsicher/Semantik 标记 + 引擎标签；
  Planner 倒计时 + 周任务勾选；Mindmap 学科分组叶节点；Reise 五型步骤播放器 + XP/徽章；
  Settings 六节 + 云同步区；Onboarding 三步全屏
- 断点：桌面双列（Library/Quiz）；窄屏 <640px 单列堆叠、触摸目标 ≥40px；德语长词允许 break-words
- 红线：引用 `[Pfad#Zeile]` 必须可点击回跳；降级标记（ohne Beleg/Unsicher）不可藏；
  快捷键以 `keys.ts` 为唯一真相源（改键先登记）
