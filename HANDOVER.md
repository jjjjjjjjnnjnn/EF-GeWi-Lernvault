# HANDOVER — 一页交接（新agent/用户先读我）

> 目标：Gymnasium EF (NRW, Schloss Heessen) 8科笔试提分，中德双语。Public repo: https://github.com/jjjjjjjjnnjnn/EF-GeWi-Lernvault

## 新agent阅读顺序（5分钟接手）
1. 本文件 → 2. `AGENTS.md`（规范） → 3. `00_META/INDEX.md`（导航） → 4. 目标学科 `Lehrplan.md` → 5. `00_META/Journal/` 最新一篇（当前上下文）。

## 当前状态（2026-09-22）
- ✅ SoWi收官12/12：Ungleichheit独立篇 + Kap.1–11（csv 147行，INDEX 82链全有效，vault-check PASS）。
- ✅ Material四轮：`_Downloads/` 约1480件/约3.0GB（全gitignored）——N8 NRW官源33 + N9 OER 29 + N10 Siemens 16 + N11 Goethe 17 + **N14 StanSi全站通扫58（9路并行，Physik/Chemie/Bio三科operatoren/konstruktions/korrekturzeichen实缺已补）**；登录墙清单已列（StanSi真题/SESAM/FWU/eduki找老师要）。
- ✅ Klett Green Line Transition (ab 2024) Medien：23/23收官（mp3×9+mp4×14全验头+quelle.txt），落`_Downloads/Englisch/klett-bridge/`，Klett版权本地永不提交。
- ✅ P2/P3/P4已落地并验收（外部AI `949984a` + 主Agent复核PASS；2处偏离接受）；抓取脚本锁全部原子化（fetch.lock/klett-fetch.lock防双跑）。
- ✅ 骨架：Obsidian vault + git + CC-BY-SA + link-check CI + `_Downloads/`(gitignore, 39件官方PDF已下) + `Anlagen/`。
- ✅ 10/10学科骨架：SoWi/Philo填实；Deutsch/Englisch KLP2023校准+csv各30条（等Lektüre/Topic）；MINT四科KLP校准+Formel-Spickzettel(KaTeX)；Musik/Sport口试骨架。
- ✅ 官方弹药：SoWi/Philo/Deutsch/Englisch/Mathe全套Operatoren+Konstruktion+Korrekturzeichen+Beispiele；Formelsammlung NRW 2024。
- ✅ Playwright电子书脚手架就绪（`scripts/ebook-fetch/`，等用户登录一次）。
- ✅ App需求：FEATURE-SPEC + UI-SPEC-V2；**外部AI已落地**（`b17999d`）：10科徽章+KaTeX离线公式+Lernreise第7模块（5步态+gating+XP localStorage），`npm run build`亲验通过；课程3个（SoWi-L1示范 + Musik-Höranalyse-L1 + Sport-Bewegung-L1，均muendlich步）。
- ✅ 集成方法v2：`Lernmethoden-Evidenz.md`单真相源 + Template v2（检索优先/Pro-Contra/Fehlvorstellungen）+ `vault-check.py`四检PASS + parser修csv表头卡/quote/math块（build过）+ P3加Zitierpflicht。
- ✅ 电子书抓取**完工**（429/430页，缺media 2封面背）：已按11章切分进 `_Downloads/SoWi/split/`（gitignored，边界±2页待核），可写SoWi正式笔记。
- ✅ UI-SPEC-V4已落地并复核PASS（外部AI `a1ba979` + 主Agent复核：构建复现+5步零回归+Zitierpflicht未松；技术债：Vergleich暂用MOCK数据/双RUBRIC并存，下轮收）。
- ✅ 学习方法v3（Academy-Lernreise，6 agent并行）：证据库§6–§9（Adesope/Rohrer/Barbieri/Brummer/Mayer）+ `Methoden-Quellen.md`16篇 + 论文本地4/9（Rohrer主机502待补）+ Template v3（9步，旧字段全留）+ Sowi-L1试点重写 + quizgen辨别/对比题型与过程维 + `vault-check` vergleich规则 + `UI-SPEC-V4.md`（发外部AI）；vault-check PASS + build过。

## 环境（接手必备）
- 日常开发走本地 WebUI：vault根目录跑 `. .\scripts\webui.ps1`（起1420+自动开浏览器；热更新）。
- exe 仅发版时打（`npx tauri build`，需 VS C++ workload + rust stable）。
- 新终端先跑：`. .\scripts\dt-env.ps1`（设DEEPTUTOR_HOME + UTF-8，防data污染vault/防GBK崩溃）。
- DeepTutor家目录：`C:\Users\rongj\.deeptutor-home`（vault外）。LM Studio需开着（模型llama-3-sauerkrautlm-8b-instruct）。

## 待办（按优先级）
1. Klett单元→IQB主题映射表（5单元对Themenfelder）→ Englisch听力计划。
2. 用户贴：Deutsch Lektüre + Englisch Topic/Teil-B类型 + 课堂笔记 → 开下一科（写→三同步→vault-check→一科一commit）。
3. 近3年真题Login墙（找老师要Zugangsdaten）+ Stark纸书 + P5发版（最后）。

## 铁律
- 一次只做一科一commit（前缀`[SoWi]/[Philo]/[Meta]/[Deutsch]/[Englisch]/[App]`）；`data/`、`_Downloads/`、`*.apkg`、App构建产物（`target|gen|dist|*.key|*.exe|*.msi`）永不进git；只写原创笔记（版权红线见AGENTS.md §4）。
