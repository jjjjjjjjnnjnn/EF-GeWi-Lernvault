---
fach: ""
thema: "Wave4全量审核与P0修复"
operatoren: []
klausurrelevant: false
datum: 2026-10-11
tags: [EF, Meta, App]
---

# Journal — Wave4 全量审核（十路并行）与 P0 修复落库

## 门禁基线（本轮实测）
- vault-check **PASS**（420/1942/361/388；新增orderbuch拼写WARN×2，其余WARN为已知遗留）
- tsc 0 报错 · vitest **94套件734项全绿**（730+4新）

## 十路审计结论（只读，未写盘；主线程已独立复核标星项）
1. **vault frontmatter**：P0零缺陷；P1落位违规30（Deutsch 3/Englisch 3/Philo 24文科根目录滞留）+ Kant正文缺训练题1；P2 stufe/kursart WARN约200+（已知遗留）
2. **Anki/Glossar/Fehlerlog**：CSV表中空行8+尾空行1、缺表头10、Glossar重复5组8行+表中断裂2、Mathe表破裂6行、Englisch/Bio空壳表；INDEX 170链零死链、S8抽查10/10
3. **Lernreise 361**：emoji 0、Werkzeug标签0缺失、KERNSATZ/AUFGABE 0缺失；断裂引用5条；`orderbuch`拼写×2；9步制5篇缺MUSTERL*；SoWi 51篇无AUFLÖSUNG/Option（整科模板）；正文ASCII `->` 353篇（风格残留）
4. **引擎**：P0-1 `pro`子串误杀（已修）· P0-2/3 quiz/trap经济泄漏（已修）· P0-4 无archetype学科冒SoWi+Chemie误拿微积分（已修）；另normalizeQuery字符类、跨fach抢夺（已修）
5. **挂载**：App.tsx伪造`||18`/`120`（已修，含SidebarPet默认值与18天话术）；Runner缺wahlsystem/rawls/gini/orderbuch映射（已显式对齐PlayableStudio）；拼图提示硬编码4组（已动态化）；Tufte shadow/italic/绿色大片残留（未动，另起任务）
6. **仿真普查**：LogicBlockBuilder/ScenarioDecisionTree高危（同构硬编码，无scenarioId，Runner只传title）——未动，需单开任务仿markt-sim模式治理；VariableSlider/Dilemma中危；FormulaScaffold唯一传参范本
7. **考纲图谱**：00-Design S8过期、01-Quellen乱码行过期、SoWi Q1/Q2自相矛盾、Sport缺口与Blocker矛盾、Operatoren ASCII/Umlaut混写、App baum EF-only与Markdown分叉（D7属实）
8. **脚本配置**：checker漏报7（落位/注册表/kebab/空operatoren/CSV空字段/Journal跳过/INDEX数量漂移）+ INDEX `Sowi-`盲点（已加WARN）+ dt-env/create-shortcut中文无BOM风险 + NOTICE katex缺署名/transformers版本漂移 + aiGatewayProxy开放代理（dev-only）
9. **文档**：HANDOVER 998→977、727→730、760→1420、712口径不明、C/D暂缓互冲、INDEX示例`Sowi-`断链、Journal缺4篇登记、G6/G7问询稿缺失（已修口径类，未动G6/G7内容）
10. **门禁员**：三绿确认（PASS/0错/94·730→734）

## 本轮修复（[App] + [Meta] 两commit）
**[App]**：App.tsx真实store口径；SidebarPet默认0/0+去18天话术+测试；`pro`词边界+测试；lessonStepFlow fach分支（concept/trap/quiz）+Chemie测试；Runner四映射显式化；拼图提示动态化；conceptDistiller归一化/fach门禁/中性archetype/中性dilemma兜底+MINT守卫+2测试
**[Meta]**：`.gitignore`收窄（已验tracked源码零影响）；INDEX大小写+4日志登记；HANDOVER五口径+Wave4段+C/D恢复；vault-check新增INDEX大小写WARN+Werkzeug注册表WARN（orderbuch拼写×2已告警）

## 残留（按优先级，需另起任务）
- P1：LogicBlockBuilder/ScenarioDecisionTree情境化（仿markt-sim）；Tufte残留批量（shadow/italic/emerald）；Lernreise 5断裂引用+`orderbuch`改名+5篇MUSTERL*；Mathe Fehlerlog破裂；CSV空行/表头；Glossar去重；G6/G7问询稿；文科30篇落位；Kant训练题；Curriculum三过期；Sport缺口；Operatoren归一；baum派生管线；NOTICE/katex/代理收紧
