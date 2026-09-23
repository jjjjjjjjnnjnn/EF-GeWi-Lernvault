# HANDOVER — 一页交接（新agent/用户先读我）

> 目标：Gymnasium EF (NRW, Schloss Heessen) 8科笔试提分，中德双语。Public repo: https://github.com/jjjjjjjjnnjnn/EF-GeWi-Lernvault

## 新agent阅读顺序（5分钟接手）
1. 本文件 → 2. `AGENTS.md`（规范） → 3. `00_META/INDEX.md`（导航） → 4. 目标学科 `Lehrplan.md` → 5. `00_META/Journal/` 最新一篇（当前上下文）。

## 当前状态（2026-09-23晚·启发式引导/考纲直出双态分流、错题补丁与数学导数几何沙盘）
- ✅ 启发引导/考纲直出双态分流、错题补丁弹窗与数学割线逼近切线沙盘（`[App] 6d378af`+`[App] 55792bc`+本交接）：落地苏格拉底产婆术启发引导（Socratic）与官方 Erwartungshorizont 考纲直出（Direct Exam）双态无缝切换；消息气泡一键「📌 沉淀为错题」并自动生成合规 Markdown 表格行文本补丁（严格遵循 App 只读 Vault 规范）；原生图片/漫画粘贴与本地图表选择；首创理科几何直观工具 `TangentSlider`（割线 $\Delta x \to 0$ 连续逼近切线过程动态力学与差商收敛模拟）；43 单测套件 256 测试 100% 全绿 / build 6.45s 零错误（Journal 2026-09-23-tutor-socratic-fehlerlog-tangent）。
- ✅ EXT-01~04四科Texte-Analyse并行落地（`[Deutsch]/[Philosophie]/[SoWi]/[Englisch]` 4 commits+本交接）：Sachtextanalyse论证+Dilemmata案例集+Karikatur三例+Mediation双范文，全v3九步完整版，全原创；vault-check PASS（notes=42/csv=240/links=141）（Journal 2026-09-23-ext-01-04-texte-analyse）。
- ✅ 无痛自然习得教育组件库与 AI 助教全闭环集成（`[App] c6402c1`+本交接）：贯彻“无痛、自然学会”教育哲学，解决长句下笔难与价值判断主观情绪化问题；落地 `SatzbauLego` 句式积木（出处/动词/手法/效果 4 大卡槽即插即拔拼装考纲句）、`BalanceBoard` 辩证天平（SVG 物理倾斜力矩与 AFB III 考纲级价值裁决合成器）、`TextHighlighter` 荧光文本标注解构画板（4色划词实时聚类论证树）；顶栏无缝嵌入 AI 助教工作台，一键将拼装成果与裁决文本推入聊天流；新增 8 项专用单测，41 单测套件 242 测试 100% 全绿 / build 6.23s 零错误 / 1420 在线（Journal 2026-09-23-pedagogy-ui-library）。

- ✅ CC-Switch 风格 LLM 路由、端点自定义与原生协议适配（`[App] 28e4d7b`+`[App] 8fcc056`+`[App] 7afa925`+本交接）：彻底解决商汤（SenseNova）等代理报错（原生 Anthropic Messages 协议 `/v1/messages` + `x-api-key` + `anthropic-version: 2023-06-01` + 动态 `system` 字段与流式 `content_block_delta` 解析）；实测用户 Key（`sk-t6my3...`）200 OK 连通；落地 HTTP 429 限速自动退避重试（最多 3 次到达上限）；端点编辑保存后自动无缝激活为主路由；落地 CC-Switch 风格 Token 自动补齐机制（客户端启发式自动填补缺失的 Token 审计数据）；弹窗内即时闭环连通性测试与自愈排查反馈；对话历史去噪隔离过滤离线报错防止大模型复读错误话术；40 单测套件 234 测试 100% 全绿 / build 4.57s 零错误 / vault-check(38/203/135) PASS（Journal 2026-09-23-ccswitch-llm-routing）。
- ✅ 助教教学区域轻量化、自主模型填写、显式保存设置与CC-Switch供应商交互流对齐（`[App] 5fdca6f`）：剥离 Tutor 教学区臃肿的内嵌设置，极简顶栏保留端点药丸+新增“⚙️ 配置端点与模型”直达全局设置；简单模式新增自主模型直接填写框与常见模型快捷标签，右侧提供显式“💾 保存设置”按钮与即时保存提示；对齐 CC-Switch 供应商交互流（全面解禁预设端点编辑权限、API Key 密码掩码显隐眼标、Base-URL 兼容提示、Model ID 自由输入与角色映射、蓝底显式“保存”按钮与 `✓ 配置已保存` 反馈）；新增两项端到端模拟交互单测；40 单测套件 233 测试 100% 全绿（Journal 2026-09-23-ccswitch-ui-model-save）。
- ✅ LM Studio 报错根除、全内置应用内诊断与模拟交互测试规范落地（`[App] b7beb70`）：`sanitizeChatMessages` 规整清洗，彻底杜绝 LM Studio 400 `'messages' field is required`；内嵌“⚡ 测试连接 (Ping)”与“💬 实时对话探针 (Chat Probe)”控制台与自愈排查指引；落地端到端全流程模拟交互测试套件（`simulatedInteraction.test.tsx`）；40 单测套件 230 测试全绿（Journal 2026-09-23-lmstudio-inapp-diagnostic-and-sim-test）。
- ✅ CC-Switch 风格多端点路由与 Token 看板全栈落地（`[App] 9eb40f2`+本交接）：Clean-Room 原生重构（零外部代码/依赖引入，NOTICE 署名 MIT）+ 四 Tab 专业架构（极简推荐/端点路由/Token看板/高级向量）+ 多端点管理与测速探针（`endpoints.ts`）+ Token 账本与每日预算预警（`tokenLedger.ts`）+ 智能级联故障转移（`router.ts`，主端点->备用端点->Vault离线兜底）+ 流式 `include_usage` 精准采集（`streamClient.ts`）；39 单测套件 222 测试全绿 / build 6.03s / vault-check(38/203/134) PASS（Journal 2026-09-23-ccswitch-endpoint-routing-token-ledger）。
- ✅ 维护-5（`[App] 8e02537`+本交接）：315文件干净三扫零泄漏（2误报已证）；36套件210单测/build/vault-check(38/203/133)/1420全过；LEARNING-ENGINE Next-Gen补齐+AI-SETUP拉取排错FAQ（Journal 2026-09-23-wartung-5）。
- ✅ Headroom 启发式 Token 压缩与可逆缓存引擎落地（`[App] 271d7d7`+本交接）：Clean-Room 原生实现（零外部代码/依赖引入，NOTICE 署名 Apache-2.0）+ FNV-1a CCR 可逆内容寻址双层缓存（`ccrStore.ts`）+ SmartCrusher 表格折叠与 5D 评分裁剪（`compressor.ts`，首轮/最近/错误100%保留）+ Hot/Warm/Live 三区 KV-Cache 优化组装（`context.ts`）+ AI 助教交互式 `[Ref: #h-xxxxxx]` 点击无损还原（`Tutor.tsx`）；36 单测套件 210 测试全绿 / build 6.1s / vault-check(38/203/133) PASS（Journal 2026-09-23-headroom-token-compression）。
- ✅ 拉取失败修复（`[App] 627b670`+本交接）：dev同源代理Node代取（CORS-free，Key只走头）+直连兜底+错误分类中文明示；34单测套件202测试全绿 / build过 / vault-check(38/203/131) / 代理实测OpenRouter回200真名单（Journal 2026-09-23-modellpull-proxy-fix；opencode go端点待用户给URL）。
- ✅ 新渠道+模型拉取（`[App] fd4ed3d`+本交接）：OpenCode Zen/SenseNova商汤预设+Base-URL改写+ccswitch式⇩拉取模型列表点选即用；34单测套件199测试全绿 / build过 / vault-check(38/203/130) / 1420在线（Journal 2026-09-23-provider-modellpull）。
- ✅ 用户反馈三修（`[App] ffd56d6`+本交接）：KaTeX懒加载独立chunk（首绘不再堵）+引擎off时KI按钮置灰明示+check步默写+AI打分纠错教学FelloFish循环；33单测套件195测试全绿 / build过 / vault-check(38/203/129) / 1420在线（Journal 2026-09-23-reise-katex-ki-fellofish）。
- ✅ V1模拟走查（`[App] 6c9c100`+本交接）：真L1文件穿真解析真UI跑完8步（门禁/XP离线保底/反馈上下文全过）；32单测套件191测试全绿 / build过 / 1420在线（Journal 2026-09-23-v1-walkthrough-sim；V2–V4体感/整场仍待真人）。
- ✅ 下一代智能引擎全栈落地（`[App] e20ed22`+本交接）：双引擎RRF混合检索(BM25+Vector) + 双向引用知识图谱网络(vaultGraph.ts，孤岛检测/核心节点) + BKT认知诊断与考纲掌握度模型(mastery.ts)支持自主开启/关闭学期管理(EF.1/EF.2/归档重置) + Oberstufe全真三段式Klausur模拟器(KlausurSim.tsx，算法动态抽取38篇笔记材料与AFB I-III试题，EPA 0-15评分) + 每日15分钟自适应混合极速冲刺(DailySprintModal.tsx，打卡连续Streak天数)；31单测套件189测试100%全绿 / npm run build 3.15s过 / 1420在线 / vault-check(38/203/127) PASS（Journal 2026-09-23-next-gen-learning-engine）。
- ✅ AI助教极速无感回复与多会话历史系统（`[App] aa7169f`）：10ms瞬时前导卡(extractInstantSnippet) + 多会话抽屉管理(Heute/Gestern/Früher/重命名/删除/清空/导出.md) + 思考强度三档(Schnell/Ausgewogen/Tiefgründig) + 一键智能调配(LM Studio离线自动调配至Vault原生考点合成)；25单测套件162测试全绿 / build过 / 1420在线（Journal 2026-09-23-tutor-zero-latency-history）。
- ✅ AI中后端全阶重构（`[App] 32345b5`）：统一流式传输(SSE/WebLLM/AbortSignal) + 结构化评分防假阳性(parseKlausurEvaluation) + IndexedDB高维向量二级持久化 + Token动态预算(3000上限) + 本地LLM心跳存活探针(1234/11434毫秒级感知)；22单测套件151测试全绿（Journal 2026-09-23-ai-backend-overhaul）。
- ✅ 维护-4（`[App] c29b4d5`+本交接）：262文件干净三扫零泄漏；130单测/build/vault-check(38/203/123)/1420全过；AI-SETUP向量章节补齐（Journal 2026-09-23-wartung-4）。
- ✅ E轮下载卡死修复（`[App] 0166f47`）：auto永不隐式下载+HF镜像+显式加载按钮+本地引擎重置；130单测/build/vault-check(38/203/123)/1420全过（Journal 2026-09-23-e-runde-download-fix）。
- ✅ D轮Reise动态化（`[SoWi] 284b5b6`+`[App] 9e959ca`）：diagram独立块+LLM-SVG/自动讲解追问/提交即点评/写作评分改写循环（FelloFish式）；128单测/build/vault-check(38/203/121)/1420全过（Journal 2026-09-23-d-runde-reise-ki）。
- ✅ C轮（`[App] 924facb`）：语义stage-2+云Backend（显式push/pull）+视觉契约§6+全链模拟测试；113单测/build/vault-check(38/203/120)/1420全过（Journal 2026-09-23-c-runde-sim-test）。
- ✅ Phase B Lern-Engine（`[App] 24ec1ba`）：存储收敛+Backend接口 / RAG三档（L2-API/L1-jina-de/L0）+verifySupport / 交错开关+错题回流 / 主页tab+Alt1-9；97单测/build/vault-check(38/203/119)/1420全过（Journal 2026-09-23-phase-b-lern-engine）。
- ✅ Phase A Lern-Engine（`[App] 505f205`）：48单测全绿 + `engine/`存储/检索层 + 设置沉底独立 + LEARNING-ENGINE.md契约；test:run/build/vault-check(38/203/118)/1420全过（Journal 2026-09-23-phase-a-lern-engine）。
- ✅ 三轮审核（亲验）：在库226文件零>1MB、禁区/PII/密钥零泄漏；vault-check PASS（38/203/117链）；build 1.92s；1420在线200；_Downloads实数1713件/3.23GB（下文两处旧数已订正）。
- ✅ 反馈三连修（`[App] b2e5b4f`）：笔记库残留搜索chip一键清除 / 新设置中心tab（语言·Vault·AI·导出·快捷键·关于，顶栏只剩搜索+齿轮）/ 背卡会话快照（Again重排队尾，不再早退）；build过，1420在线。
- ✅ 内置双引擎AI（LM Studio摘除）：KI-Tutor顶部AI设置三段切换（API直连/本地WebLLM/关闭）+ 8服务商预设 + Key自填 + AI-SETUP手册；Quiz同引擎；Zitierpflicht保留；web-llm 0.2.85特批入包（NOTICE同步）；build过，1420在线（Journal 2026-09-23-dual-engine-ki）。
- ✅ App首次使用流：三步引导（Vault→Fächer三态→Klausurtermin进Lernplan）+ 首页DE/中文切换 + 默认语言跟系统（兜底德语，可切换持久化）+ 落地Lernreise；build过（Journal 2026-09-23-onboarding）。
- ✅ 联网补缺口（用户拍板不等老师，假设版待核对）：Musik Halbjahr假设=IF1+IF2维也纳古典/奏鸣曲式+Stufe-4音程爬梯（csv新12卡）/ Deutsch Drama三选一（Dürrenmatt Besuch/Physiker、Frisch Andorra）+通用工具箱 / Englisch Teil-B双轨（HV四题型+Mediation三段式，官方评分表链）；vault-check PASS（notes=38 csv=203）。
- ✅ 缺口清理：Dokument 20破案（Buchner S.154–158 Impfpflicht/M21–M25，笔记+§8b+M23先例）；Notenlehre-Stufe-4源头截断（256KiB无EOF）待重发（§5b为公开结构反推假设版）；问老师德语三问已拟（Journal 2026-09-23-luecken）。
- ✅ 老师资料R4–R8（五agent并行，一科一commit）：Philo新笔记Plickat五问+Operatoren映射（csv+6）/ Musik新笔记Beethoven-Motiv+Hör-Bausteine（HEIC 4/4 ffmpeg转码成功；Notenlehre-Stufe-4 PDF截断待补）/ Mathe补Spickzettel八缺口+新建Fehlerlog（Zwei-Punkte符号错两条）/ Physik新笔记ggB训练（Excel四步+3,6换算）/ Bio新笔记Zellbiologie+Open-Book-Checkliste（dreamstime图只转述不复制）；原件全进`_Downloads/<Fach>/lehrer-2026-09/`+quelle。
- ✅ 老师资料R1–R3（三agent并行，一科一commit）：SoWi富化Kap.4/Kap.6/Karikatur（Unterrichts-Anker+自制Lückentext，csv+2）/ Deutsch新笔记Lyrik-Sturm-Drang-Goethe（AB1四步+6 Mittel+Deutungshypothese-Lückentext，csv+8）/ Englisch新笔记Role-Models-Analysis（Teil A三任务链+P.E.E.+Comment句型，csv+10）；原件全进`_Downloads/<Fach>/lehrer-2026-09/`+quelle（gitignored），vault零原文复制；名单/Codes截图永不入库。vault-check PASS（notes=36 csv=181 links=102）。
- ✅ 归属纠正：`2_Werkzeugkasten`实为SoWi Buchner S.148–153（WkV1–WkV5，无文本层，内容未进笔记）；`Fragen über Fragen`+09-21扫描归Philo（已归档，R4已落地Plickat笔记）；`Sprachdetektive`连字符改名已注quelle。
- ✅ SoWi收官12/12：Ungleichheit独立篇 + Kap.1–11（csv累计181行，INDEX 102链全有效，vault-check PASS）。
- ✅ Philo-L2试点：`Lernreise/Philo-Utilitarismus-Kant-L2.md` 9步（德语Satz 11句）+ csv/Glossar/Fehlerlog三同步——v3模板跨科成立。
- ✅ App Vergleich真管线：`getVergleichItems`从vault笔记生成（空才回MOCK），双RUBRIC统一四维；V4技术债清零，build过。
- ✅ Englisch听力计划：Klett 5单元23媒体→Themenfelder映射 + Teil A四级顺序（混淆ID假设待Transition目录页核对）。
- ✅ 论文库7/9：Rohrer 2007/2015/2020补下（全验头+quelle）；taylor-2010/wittwer-renkl无合法开放源，放弃留证。
- ✅ Reise跳转修复：硬编码1/2/3改为相对导航（v3八步全通）+ ausprobieren通用文案。
- ✅ Dev-Feedback全局浮窗：右下角药丸钮，全模块可用，上下文总线自动带位置（`courseId#SchrittN`/`quiz:…`/`tab:…`），存`eflernvault:feedback:v1`。
- ✅ Material四轮：`_Downloads/` 约1710件/约3.2GB（全gitignored，2026-09-23实数1713件/3.23GB）——N8 NRW官源33 + N9 OER 29 + N10 Siemens 16 + N11 Goethe 17 + **N14 StanSi全站通扫58（9路并行，Physik/Chemie/Bio三科operatoren/konstruktions/korrekturzeichen实缺已补）**；登录墙清单已列（StanSi真题/SESAM/FWU/eduki找老师要）。
- ✅ Klett Green Line Transition (ab 2024) Medien：23/23收官（mp3×9+mp4×14全验头+quelle.txt），落`_Downloads/Englisch/klett-bridge/`，Klett版权本地永不提交。
- ✅ P2/P3/P4已落地并验收（外部AI `949984a` + 主Agent复核PASS；2处偏离接受）；抓取脚本锁全部原子化（fetch.lock/klett-fetch.lock防双跑）。
- ✅ 骨架：Obsidian vault + git + CC-BY-SA + link-check CI + `_Downloads/`(gitignore约1710件/3.2GB) + `Anlagen/`。
- ✅ 10/10学科骨架：SoWi/Philo填实；Deutsch开动（Lyrik+Drama候选笔记，csv 43行，待老师定书名）/Englisch开动（Role Models+Teil-B双轨笔记，csv 43行，Topic定，待定考轨）；MINT四科KLP校准+Formel-Spickzettel(KaTeX)+Mathe/Physik/Bio训练笔记；Musik口试开动（Beethoven-Motiv+Halbjahr假设+csv 12卡，待确认）；Sport口试骨架。
- ✅ 官方弹药：SoWi/Philo/Deutsch/Englisch/Mathe全套Operatoren+Konstruktion+Korrekturzeichen+Beispiele；Formelsammlung NRW 2024。
- ✅ Playwright电子书脚手架就绪（`scripts/ebook-fetch/`，等用户登录一次）。
- ✅ App需求：FEATURE-SPEC + UI-SPEC-V2；**外部AI已落地**（`b17999d`）：10科徽章+KaTeX离线公式+Lernreise第7模块（5步态+gating+XP localStorage），`npm run build`亲验通过；课程4个（SoWi-L1示范 + Philo-L2试点 + Musik-Höranalyse-L1 + Sport-Bewegung-L1，均muendlich步）。
- ✅ 集成方法v2：`Lernmethoden-Evidenz.md`单真相源 + Template v2（检索优先/Pro-Contra/Fehlvorstellungen）+ `vault-check.py`四检PASS + parser修csv表头卡/quote/math块（build过）+ P3加Zitierpflicht。
- ✅ 电子书抓取**完工**（429/430页，缺media 2封面背）：已按11章切分进 `_Downloads/SoWi/split/`（gitignored，边界±2页待核），可写SoWi正式笔记。
- ✅ UI-SPEC-V4已落地并复核PASS（外部AI `a1ba979` + 主Agent复核：构建复现+5步零回归+Zitierpflicht未松；技术债已清：Vergleich真管线+四维RUBRIC统一）。
- ✅ 学习方法v3（Academy-Lernreise，6 agent并行）：证据库§6–§9（Adesope/Rohrer/Barbieri/Brummer/Mayer）+ `Methoden-Quellen.md`16篇 + 论文本地7/9（Rohrer 2007/2015/2020已补；taylor-2010/wittwer-renkl无开放源放弃）+ Template v3（9步，旧字段全留）+ Sowi-L1试点重写 + quizgen辨别/对比题型与过程维 + `vault-check` vergleich规则 + `UI-SPEC-V4.md`（发外部AI）；vault-check PASS + build过。

## 环境（接手必备）
- 日常开发走本地 WebUI：vault根目录跑 `. .\scripts\webui.ps1`（起1420+自动开浏览器；热更新）。
- exe 仅发版时打（`npx tauri build`，需 VS C++ workload + rust stable）。
- 新终端先跑：`. .\scripts\dt-env.ps1`（设DEEPTUTOR_HOME + UTF-8，防data污染vault/防GBK崩溃）。
- DeepTutor家目录：`C:\Users\rongj\.deeptutor-home`（vault外）。LM Studio需开着（模型llama-3-sauerkrautlm-8b-instruct）。

## 外部 AI 专属外包任务包（Track A：资料搜集与学科语料提取）

> 💡 **使用指引**：本节专供用户直接复制 Prompt 派发给其他联网或大上下文 AI（如 Perplexity / Claude 3.5 / GPT-4o）。每个任务均定义了严格的学科格式与落盘路径，外部 AI 输出后直接保存到对应文件即可。

#### 📋 任务 1【德语 Sachtextanalyse 论据类型与范文语料】(TASK-EXT-01) — ✅ 已由外部 AI 完成并入库
- **成果落盘路径**：`01_Deutsch/Texte-Analyse/Sachtextanalyse-Argumentation.md` 及 `Deutsch-EF-Phrasen.csv`
- **派发给外部 AI 的 Prompt 存档**：
  > “请针对德国北威州高中 (NRW Gymnasium Oberstufe EF) 德语课 Sachtextanalyse（议论文分析）编写一份标准分析语料。要求：
  > 1. 列举 6 种考试必考论据类型（Faktenargument, Normatives Argument, Autoritätsargument, Analogisierendes Argument, Indirektes Argument, Plausibilitätsargument），每种附带 1 个贴合青年与数字化议题的德语典型例句及简要分析；
  > 2. 提供 10 句高分分析性动词句式（如 `verdeutlicht`, `appelliert an`, `entkräftet`, `fungiert als`）；
  > 3. 严格遵循双语规范：中文理解在上，德语 Klausur-Satz 在下。”

### 📋 任务 2【哲学 Kant 绝对命令与四大伦理困境案例】(TASK-EXT-02)
- **派发给外部 AI 的 Prompt**：
  > “请针对 NRW Gymnasium EF 哲学伦理学单元，整理 Kant 绝对命令 (Kategorischer Imperativ) 与功利主义 (Utilitarismus) 的 4 大经典案例对比库。要求：
  > 1. 包含 4 个案例：电车难题 (Trolley-Problem)、撒谎救人案 (Lügenverbot)、无辜替罪案、器官移植救五人；
  > 2. 每个案例提供：A. 情境描述（中德双语）；B. 功利主义视角（Hedonistisches Kalkül 计算）；C. 康德视角（普遍化公式 Universalisierungsformel 与目的公式 Menschheitszweckformel 检验）；D. 核心冲突价值（如 Leben vs Würde）；
  > 3. 每个案例提炼 2 句标准德语 Klausur-Merksatz。”
- **输出落盘路径**：`07_Philosophie/Texte-Analyse/Ethische-Dilemmata-Sammlung.md`

### 📋 任务 3【SoWi 3 幅经典政治漫画 (Karikatur) 解构与评分细则】(TASK-EXT-03)
- **派发给外部 AI 的 Prompt**：
  > “请搜集或重构 3 幅德国 NRW 高中 SoWi 考试最常考的政治漫画题型（主题：1. 贫富差距 Soziale Ungleichheit; 2. 环保与经济增长 Zielkonflikt; 3. 青年政治参与 Politikverdrossenheit）。要求：
  > 1. 每幅漫画提供详细视觉元素描述清单（Bildbeschreibung：人物、衣着、手持物、文字标签）；
  > 2. 象征与隐喻解构（Deutung：每个元素代表什么现实经济/政治现象）；
  > 3. 按照标准 AFB II / AFB III 给出 Erwartungshorizont (EHZ 踩分点) 与 3 句高分德语答案。”
- **输出落盘路径**：`08_SoWi/Texte-Analyse/Karikatur-Fallbeispiele.md`

### 📋 任务 4【英语 Mediation 中德调解写作高分题库与模板】(TASK-EXT-04) — ✅ 已由外部 AI 完成并入库
- **成果落盘路径**：`02_Englisch/Texte-Analyse/Mediation-Mustertexte.md` 及 `Englisch-EF-Phrasen.csv`
- **派发给外部 AI 的 Prompt 存档**：
  > “请针对 NRW Gymnasium EF 英语考试 Teil B (Mediation 德译英中继写作) 编写 2 篇全真训练题。要求：
  > 1. 提供一篇约 250 词的德语报刊材料（主题：Freiwilliges Soziales Jahr 或 Social Media Detox）；
  > 2. 设定英方收信人（如英国交换学校校长或国际青年论坛）；
  > 3. 给出标准写作指导：如何提炼 3 个关键事实，避免逐字翻译；
  > 4. 分别给出 Formal 与 Semi-formal 两篇地道满分范文，标注高分连接词 (Connectors)。”


---

## 铁律
- 一次只做一科一commit（前缀`[SoWi]/[Philo]/[Meta]/[Deutsch]/[Englisch]/[App]`）；`data/`、`_Downloads/`、`*.apkg`、App构建产物（`target|gen|dist|*.key|*.exe|*.msi`）永不进git；只写原创笔记（版权红线见AGENTS.md §4）。
