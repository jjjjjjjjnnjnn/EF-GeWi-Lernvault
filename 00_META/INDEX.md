# INDEX — 全库导航（人读+机器查统一入口）

> Agent：先读`HANDOVER.md`（一页交接），再读本页定位，再读目标学科 `Lehrplan.md`。新增笔记后更新对应链接行。

## 学科地图

| 学科 | 状态 | Lehrplan | Ressourcen | Anki | Klausur-Training | Texte |
|---|---|---|---|---|---|---|
| SoWi | ✅ 本期 | [Lehrplan](../08_SoWi/Lehrplan.md) | [Ressourcen](../08_SoWi/Ressourcen.md) | [SoWi-EF-Basis](../08_SoWi/Vokabeln-Anki/SoWi-EF-Basis.csv) | [Satzbausteine](../08_SoWi/Klausur-Training/Satzbausteine.md) · [Fehlerlog](../08_SoWi/Klausur-Training/Fehlerlog.md) | [Karikatur-Anleitung](../08_SoWi/Texte-Analyse/Karikatur-Anleitung.md) |
| Philosophie | ✅ 本期 | [Lehrplan](../07_Philosophie/Lehrplan.md) | [Ressourcen](../07_Philosophie/Ressourcen.md) | [Philo-EF-Basis](../07_Philosophie/Vokabeln-Anki/Philo-EF-Basis.csv) | [Satzbausteine](../07_Philosophie/Klausur-Training/Satzbausteine.md) · [Fehlerlog](../07_Philosophie/Klausur-Training/Fehlerlog.md) | [Menschenbild](../07_Philosophie/Texte-Analyse/Menschenbild-Überblick.md) · [Utilitarismus-vs-Kant](../07_Philosophie/Texte-Analyse/Utilitarismus-vs-Kant.md) · [Fragen-Typen](../07_Philosophie/Texte-Analyse/Philosophische-Fragen-Typen.md) |
| Deutsch | 🟡 本期开动 | [Lehrplan](../01_Deutsch/Lehrplan.md) | [Ressourcen](../01_Deutsch/Ressourcen.md) | [Deutsch-EF-Phrasen](../01_Deutsch/Vokabeln-Anki/Deutsch-EF-Phrasen.csv) | [Fehlerlog](../01_Deutsch/Klausur-Training/Fehlerlog.md) | [Lyrik-Sturm-Drang](../01_Deutsch/Texte-Analyse/Lyrik-Sturm-Drang-Goethe.md) |
| Englisch | 🟡 本期开动 | [Lehrplan](../02_Englisch/Lehrplan.md) | [Ressourcen](../02_Englisch/Ressourcen.md) | [Englisch-EF-Phrasen](../02_Englisch/Vokabeln-Anki/Englisch-EF-Phrasen.csv) | [Fehlerlog](../02_Englisch/Klausur-Training/Fehlerlog.md) | [Role-Models](../02_Englisch/Texte-Analyse/Role-Models-Analysis.md) |
| Mathe/Physik/Chemie/Bio | ✅ 骨架EF | [Mathe-Lehrplan](../03_Mathe/Lehrplan.md) · [Physik](../04_Physik/Lehrplan.md) · [Chemie](../05_Chemie/Lehrplan.md) · [Bio](../06_Bio/Lehrplan.md) | 各 `Ressourcen.md` + `_Downloads/` KLP全文 | — | — | 各 `Formel-Spickzettel.md` (KaTeX) |
| Musik/Sport mündl. | 🟡 口试开动 | [Musik](../09_Musik-mündl/Lehrplan.md) · [Sport](../10_Sport-mündl/Lehrplan.md) | 各 `Ressourcen.md` | — | — | [Beethoven-Motiv](../09_Musik-mündl/Texte-Analyse/Beethoven-Motiv-Hoeren.md) |

## App（桌面软件，一站式入口）
- [App-EF-Lernvault](../App-EF-Lernvault/README.md) — EF-Lernvault：六模块 + 命令面板/快捷键/拖拽 + P1接线（顶栏打开真实vault，笔记/背卡/面板全切真实数据）；`npm run dev` 预览（1420）。
- [LICENSE](../App-EF-Lernvault/LICENSE)（半开源，已定稿） · [NOTICE](../App-EF-Lernvault/NOTICE.md)（第三方署名，实测版本）
- 规范：[UI-BRIEF](../App-EF-Lernvault/UI-BRIEF.md)（tufte简洁风） · [INTERACTION-BRIEF](../App-EF-Lernvault/INTERACTION-BRIEF.md)（交互） · [FEATURE-SPEC](../App-EF-Lernvault/FEATURE-SPEC.md)（功能需求，给外部AI） · [UI-SPEC-V2](../App-EF-Lernvault/UI-SPEC-V2.md)（全科+KaTeX+Lernreise，给外部AI） · [UI-SPEC-V3](../App-EF-Lernvault/UI-SPEC-V3.md)（P2/P3/P4界面需求，给外部AI）
- 互动课程源：[Lernreise/](../Lernreise/)（vault即课程，首个示范：Sowi-Soziale-Marktwirtschaft-L1）
- 约定：App 只读 vault（内容源），不写回；commit 前缀 `[App]`；构建产物与签名密钥永不进 git。
- P0产物（本地 `src-tauri/target/release/bundle/`，不进git）：`EF-Lernvault_0.1.0_x64-setup.exe`（1.8MB）· MSI（2.7MB），已验启动（窗口标题正常，常驻~25MB）。

## META

- [HANDOVER](../HANDOVER.md) — 一页交接（新agent/用户先读）
- [Ziele](Ziele.md) · [NRW-EF-Lehrplan-Übersicht](NRW-EF-Lehrplan-Übersicht.md) · [Lernsystem](Lernsystem.md) · [Lernmethoden-Evidenz](Lernmethoden-Evidenz.md) · [Methoden-Quellen](Methoden-Quellen.md) · [Operatoren-NRW-GeWi](Operatoren-NRW-GeWi.md) · [Glossar-DE-ZH-GeWi](Glossar-DE-ZH-GeWi.md)
- [Download-Quellen](Download-Quellen.md) — 本地 `_Downloads/` 采集清单（PDF不进git）
- [DeepTutor](DeepTutor.md) — 提分引擎：Quiz/抽认卡/模拟卷命令手册
- Skills：[klausur-drill](../Skills/klausur-drill/SKILL.md) · [vokabel-trainer](../Skills/vokabel-trainer/SKILL.md) · [texte-analyse](../Skills/texte-analyse/SKILL.md)

## 主题索引（新增一行一条）
### SoWi

- Identität & Jugend (Kap. 1) — [Identitaet-Jugend](../08_SoWi/Texte-Analyse/Identitaet-Jugend.md)（Shell/六模型/媒体/多元文化）
- Sozialisation & Rolle (Kap. 2) — [Sozialisation-Rolle](../08_SoWi/Texte-Analyse/Sozialisation-Rolle.md)（初级/次级/角色三冲突/Rollendistanz）
- Grundgesetz & Verfassungsprinzipien (Kap. 3) — [Grundgesetz-Verfassungsprinzipien](../08_SoWi/Texte-Analyse/Grundgesetz-Verfassungsprinzipien.md)（Art.1/20/79III/打架规则）
- Verfassungsorgane (Kap. 4) — [Verfassungsorgane](../08_SoWi/Texte-Analyse/Verfassungsorgane.md)（立法路/党纪vs良心/2023选举改革/§8 Unterrichts-Anker）
- Parteien & Willensbildung (Kap. 5) — [Parteien-Willensbildung](../08_SoWi/Texte-Analyse/Parteien-Willensbildung.md)（Art.21/三思潮/人民党危机/媒体）
- Partizipation (Kap. 6) — [Partizipation](../08_SoWi/Texte-Analyse/Partizipation.md)（青年参与/直接民主/公民委员会/§8 Kap6.1 Shell+M6+Lindner）
- Wehrhafte Demokratie (Kap. 7) — [Wehrhafte-Demokratie](../08_SoWi/Texte-Analyse/Wehrhafte-Demokratie.md)（三色极端/民粹/NPD案）
- Konsum & Wirtschaften (Kap. 8) — [Konsum-Wirtschaften](../08_SoWi/Texte-Analyse/Konsum-Wirtschaften.md)（概念链/经济人批判/可持续）
- Soziale Marktwirtschaft (Kap. 9) — [Soziale-Marktwirtschaft](../08_SoWi/Texte-Analyse/Soziale-Marktwirtschaft.md)（Smith/弗莱堡/艾哈德/生态，配Lernreise L1）
- Betrieb & Mitbestimmung (Kap. 10) — [Betrieb-Mitbestimmung](../08_SoWi/Texte-Analyse/Betrieb-Mitbestimmung.md)（ Arbeit 4.0/两模式/共决三级/罢工案）
- Marktwirtschaft in der Krise (Kap. 11) — [Marktwirtschaft-Krise](../08_SoWi/Texte-Analyse/Marktwirtschaft-Krise.md)（竞争/最低工资/能源三难，SoWi收官✅）
- Soziale Ungleichheit — [Soziale-Ungleichheit](../08_SoWi/Texte-Analyse/Soziale-Ungleichheit.md)（EF最高频，Template v2首篇：Pro/Contra+三数+5 Klausur-Sätze）
- Karikatur方法 — [Karikatur-Anleitung](../08_SoWi/Texte-Analyse/Karikatur-Anleitung.md)
- 电子书11章地图 — [Sowi-NRW-EF-Buch-Navigator](../08_SoWi/Texte-Analyse/Sowi-NRW-EF-Buch-Navigator.md)（C.C.Buchner click & study，需学校登录；Ungleichheit无专章）

### Philosophie
- Menschenbild — [Menschenbild-Überblick](../07_Philosophie/Texte-Analyse/Menschenbild-Überblick.md)
- Ethik: Utilitarismus vs Kant — [Utilitarismus-vs-Kant](../07_Philosophie/Texte-Analyse/Utilitarismus-vs-Kant.md)
- Philosophische Fragen stellen (Plickat) — [Philosophische-Fragen-Typen](../07_Philosophie/Texte-Analyse/Philosophische-Fragen-Typen.md)（5 Fragetypen/Operatoren-Mapping）

### Deutsch
- Lyrik: Sturm und Drang (Goethe) — [Lyrik-Sturm-Drang-Goethe](../01_Deutsch/Texte-Analyse/Lyrik-Sturm-Drang-Goethe.md)（Willkommen und Abschied/6 Mittel/Deutungshypothese）
- Drama-Ganzschrift: Kandidaten + Werkzeugkasten — [Drama-Ganzschrift-Kandidaten](../01_Deutsch/Texte-Analyse/Drama-Ganzschrift-Kandidaten.md)（Dürrenmatt/Frisch-Shortlist/五段/人物关系/对话分析，待老师定书名）

### Englisch
- Role Models — [Role-Models-Analysis](../02_Englisch/Texte-Analyse/Role-Models-Analysis.md)（Teil A三任务链/Summary自查/P.E.E./Comment句型）
- Teil B Doppelpack — [Klausur-Teil-B-Doppelpack](../02_Englisch/Texte-Analyse/Klausur-Teil-B-Doppelpack.md)（Hörverstehen四题型+Mediation三段式，待老师定考轨）

### Musik (mündlich)
- Motiv und motivische Arbeit (Beethoven 5) — [Beethoven-Motiv-Hoeren](../09_Musik-mündl/Texte-Analyse/Beethoven-Motiv-Hoeren.md)（Motiv三要素/Verarbeitung表/Takt 1-20/Hör-Bausteine）

### Physik
- Gleichförmige Bewegung: Training — [Gleichfoermige-Bewegung-Training](../04_Physik/Gleichfoermige-Bewegung-Training.md)（s-t读画/平均vs瞬时/Excel四步/Klausur四行）

### Bio
- Zellbiologie-Grundlagen — [Zellbiologie-Grundlagen](../06_Bio/Zellbiologie-Grundlagen.md)（Mikroskop/Skala/Pflanze-Tier-Bakterium/Operatoren）

## Journal（每日/每次交接一条，最新在下）

- [2026-09-21-handover](Journal/2026-09-21-handover.md) — 建库全过程 + 待办
- [2026-09-21-app-kickoff](Journal/2026-09-21-app-kickoff.md) — App 桌面软件立项
- [2026-09-21-ui-redesign-tufte](Journal/2026-09-21-ui-redesign-tufte.md) — App UI 重做（Tufte Data-Ink 风格）
- [2026-09-21-ui-spec-v2-lernreise](Journal/2026-09-21-ui-spec-v2-lernreise.md) — UI-SPEC-V2：10 科徽章 + KaTeX + Lernreise 第 7 模块
- [2026-09-21-nav-icons](Journal/2026-09-21-nav-icons.md) — 导航去 emoji 换细线 SVG
- [2026-09-21-interaction](Journal/2026-09-21-interaction.md) — 交互重做（命令面板/快捷键/拖拽）
- [2026-09-21-p1-audit](Journal/2026-09-21-p1-audit.md) — P1 接线 + 全库审计
- [2026-09-21-p0-tauri](Journal/2026-09-21-p0-tauri.md) — P0 脚手架就绪，待 MSVC 链接器
- [2026-09-21-p0-exe](Journal/2026-09-21-p0-exe.md) — P0 首个 exe 出炉并验启动
- [2026-09-21-maintenance](Journal/2026-09-21-maintenance.md) — 维护专场（卫生+文档同步）
- [2026-09-21-webui](Journal/2026-09-21-webui.md) — 日常走 WebUI（一键脚本）
- [2026-09-21-material](Journal/2026-09-21-material.md) — 资料大搜集（BWKI mining/电子书/官方下载/FEATURE-SPEC）
- [2026-09-21-alle-faecher](Journal/2026-09-21-alle-faecher.md) — 全科进攻（10科骨架/39PDF/Playwright/SPEC-V2/Lernreise示范）
- [2026-09-21-ebook](Journal/2026-09-21-ebook.md) — 电子书抓取（登录+管线+OCR后台）
- [2026-09-21-ui-done](Journal/2026-09-21-ui-done.md) — UI落地验收+Web重启（7模块+构建通过）
- [2026-09-21-audit](Journal/2026-09-21-audit.md) — 全项目审核（csv误报+两处修复）
- [2026-09-22-integration-v2](Journal/2026-09-22-integration-v2.md) — 集成方法v2（记录·设计·执行）
- [2026-09-22-ebook-ui-spec-v3](Journal/2026-09-22-ebook-ui-spec-v3.md) — 电子书完工切分+UI-SPEC-V3
- [2026-09-22-ui-spec-v3-implementation](Journal/2026-09-22-ui-spec-v3-implementation.md) — P2/P3/P4落地+主Agent验收（2处偏离接受）
- [2026-09-22-material-offensive](Journal/2026-09-22-material-offensive.md) — 考纲真题教材批量落地（80文件/1.15GB）
- [2026-09-22-material-runde2](Journal/2026-09-22-material-runde2.md)
- [2026-09-22-klett-handover-audit](Journal/2026-09-22-klett-handover-audit.md) — Klett交接18/23+更新+审核（vault-check PASS）
- [2026-09-22-lernmethode-v3](Journal/2026-09-22-lernmethode-v3.md) — 学习方法v3：证据库§6–§9+Template v3+Sowi-L1试点+出题链升级+UI-SPEC-V4
- [2026-09-22-lehrerkanal-runde3](Journal/2026-09-22-lehrerkanal-runde3.md) — 教师渠道全收95件：NRW官源/OER/媒体库/Goethe+商业只记链
- [2026-09-22-stansi-runde4](Journal/2026-09-22-stansi-runde4.md) — StanSi全站通扫58件：9路并行+三科补缺+登录墙三站确认
- [2026-09-22-ui-spec-v4-implementation](Journal/2026-09-22-ui-spec-v4-implementation.md) — UI-SPEC-V4落地（外部AI）：Vergleich步态+反馈三层+dd文案挂载
- [2026-09-22-ui-spec-v4-review](Journal/2026-09-22-ui-spec-v4-review.md) — V4复核PASS：构建复现+零回归+2条技术债
- [2026-09-22-reise-nav-fix-feedback](Journal/2026-09-22-reise-nav-fix-feedback.md) — Reise硬编码跳转修复+v3八步全通+Dev-Feedback两处挂载
- [2026-09-22-feedback-float](Journal/2026-09-22-feedback-float.md) — 反馈栏改全局右下角浮窗+上下文总线自动带位置
- [2026-09-22-audit-handover](Journal/2026-09-22-audit-handover.md) — 全项目审核+维护+交接（git干净/build过/94链全有效）
- [2026-09-22-lane-a](Journal/2026-09-22-lane-a.md) — A路：Philo-L2九步试点+csv/Glossar/Fehlerlog三同步（v3跨科成立）
- [2026-09-22-lane-b](Journal/2026-09-22-lane-b.md) — B路：Vergleich真数据管线+四维RUBRIC统一（V4技术债清零）
- [2026-09-22-klett-rohrer-hygiene](Journal/2026-09-22-klett-rohrer-hygiene.md) — C路：Klett映射5单元23媒体+Rohrer补源3/5+文档卫生
- [2026-09-23-sowi-lehrer-r1](Journal/2026-09-23-sowi-lehrer-r1.md) — R1 SoWi富化：Kap4/Kap6/Karikatur Unterrichts-Anker
- [2026-09-23-deutsch-lyrik-r2](Journal/2026-09-23-deutsch-lyrik-r2.md) — R2 Deutsch新笔记：Lyrik Sturm und Drang (Goethe)
- [2026-09-23-englisch-rolemodels-r3](Journal/2026-09-23-englisch-rolemodels-r3.md) — R3 Englisch新笔记：Role Models Analysis
- [2026-09-23-philo-fragen-r4](Journal/2026-09-23-philo-fragen-r4.md) — R4 Philo新笔记：Plickat五问
- [2026-09-23-musik-beethoven-r5](Journal/2026-09-23-musik-beethoven-r5.md) — R5 Musik新笔记：Beethoven-Motiv + HEIC转码
- [2026-09-23-mathe-funktionen-r6](Journal/2026-09-23-mathe-funktionen-r6.md) — R6 Mathe：Spickzettel补缺+Fehlerlog新建
- [2026-09-23-physik-ggb-r7](Journal/2026-09-23-physik-ggb-r7.md) — R7 Physik新笔记：ggB训练
- [2026-09-23-bio-zelle-r8](Journal/2026-09-23-bio-zelle-r8.md) — R8 Bio新笔记：Zellbiologie + Open-Book
- [2026-09-23-luecken-doc20-notenlehre](Journal/2026-09-23-luecken-doc20-notenlehre.md) — Dokument 20破案（Buchner S.154–158 Impfpflicht）+ Notenlehre截断待补 + 问老师德语清单
- [2026-09-23-audit-2](Journal/2026-09-23-audit-2.md) — 二轮全项目审核+维护+交接（212文件干净/build过/110链全有效）
- [2026-09-23-internet-lueckenfueller](Journal/2026-09-23-internet-lueckenfueller.md) — 联网补缺口：Musik IF1+IF2假设/Drama三选一/Teil-B双轨（待老师核对）
- [2026-09-23-onboarding](Journal/2026-09-23-onboarding.md) — App首次使用流三步引导+系统语言默认（build过/1420冒烟200）
- [2026-09-23-dual-engine-ki](Journal/2026-09-23-dual-engine-ki.md) — 内置双引擎AI：API直连/WebLLM本地/关闭+8预设+AI-SETUP手册（LM Studio摘除）
- [2026-09-23-feedback-fixes-3](Journal/2026-09-23-feedback-fixes-3.md) — 反馈三连修：搜索chip/设置中心/背卡会话快照（build过）
- [2026-09-23-audit-3](Journal/2026-09-23-audit-3.md) — 三轮严格审核+维护+交接（226文件干净/38-203-117/build过/1420在线）
- [2026-09-23-phase-a-lern-engine](Journal/2026-09-23-phase-a-lern-engine.md) — Phase A完工：48单测/engine检索+存储/设置下沉/LEARNING-ENGINE契约
- [2026-09-23-phase-b-lern-engine](Journal/2026-09-23-phase-b-lern-engine.md) — Phase B完工：存储收敛/RAG三档/交错回流/主页tab（97单测全绿）
- [2026-09-23-c-runde-sim-test](Journal/2026-09-23-c-runde-sim-test.md) — C轮：语义stage-2/云Backend/视觉契约/全链模拟（113单测全绿）
- [2026-09-23-d-runde-reise-ki](Journal/2026-09-23-d-runde-reise-ki.md) — D轮：Reise动态化FelloFish式（图解修复+自动讲解+写作评分改写循环，128单测）
- [2026-09-23-e-runde-download-fix](Journal/2026-09-23-e-runde-download-fix.md) — E轮：下载卡死修复（auto零隐式下载+HF镜像+显式加载，130单测）
- [2026-09-23-wartung-4](Journal/2026-09-23-wartung-4.md) — 第四轮维护：三扫干净/130绿/AI-SETUP向量章节补齐
- [2026-09-23-ai-backend-overhaul](Journal/2026-09-23-ai-backend-overhaul.md) — AI中后端全阶重构：流式传输+打分防误判+IDB向量持久化+Token预算+心跳探针（151单测全绿）
- [2026-09-23-tutor-zero-latency-history](Journal/2026-09-23-tutor-zero-latency-history.md) — 助教极速无感回复+瞬时前导卡+多会话历史记录抽屉+思考强度调配（162单测全绿）
- [2026-09-23-next-gen-learning-engine](Journal/2026-09-23-next-gen-learning-engine.md) — 下一代引擎落地：RRF混合检索+双向图谱+BKT认知诊断+Oberstufe全真模考+每日15分极速冲刺（189单测全绿）
- [2026-09-23-audit-handover-nextgen](Journal/2026-09-23-audit-handover-nextgen.md) — 全项目对齐、架构维护与交接验证（189单测/build/vault-check PASS）
- [2026-09-23-v1-walkthrough-sim](Journal/2026-09-23-v1-walkthrough-sim.md) — V1模拟走查：真L1穿真UI全绿（191单测，门禁/XP/反馈上下文全过）
- [2026-09-23-reise-katex-ki-fellofish](Journal/2026-09-23-reise-katex-ki-fellofish.md) — 用户反馈三修：公式懒加载+为啥置灰+check步FelloFish批改（195单测）
- [2026-09-23-provider-modellpull](Journal/2026-09-23-provider-modellpull.md) — 新渠道Zen/商汤+Base-URL改写+ccswitch式模型拉取（199单测）
- 约定：文件名 `YYYY-MM-DD-<thema>.md`，头部frontmatter（`fach`可空，`tags: [EF, Meta]`）。

## Dataview（Obsidian内自动索引，GitHub上仅作备份显示）

```dataview
TABLE thema, datum FROM "07_Philosophie" OR "08_SoWi" OR "01_Deutsch" OR "02_Englisch"
WHERE klausurrelevant = true
SORT datum DESC
```

```dataview
LIST FROM #EF WHERE fach = "SoWi"
```
