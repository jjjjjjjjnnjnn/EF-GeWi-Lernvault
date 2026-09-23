---
fach: ""
thema: "CN-MINT-Vernetzung"
datum: 2026-09-23
tags: [EF, Meta]
---

# 2026-09-23 中德理科互通扩展：MINT四科CN桥（4+1 commits）

## 策略（版权安全）

- 学科网/菁优/教辅全是付费版权——**真题只收官链（pep.com.cn/neea/LEIFI/Serlo/PhET/OpenStax/learn.genetics），一律不爬不存**；卷面题全部自编改编（Gaokao风味+自造数字）。
- 每科3件套：DE-CN-EN对照手册 + 6招CN技巧集（含自编mini例+德语映射）+ 4题改编训练（EHZ+DE-Transfer句）；全v3九步三语版。

## 落盘

- Mathe：Formelhandbuch（7式）+ Tricks（特殊值/排除/数形/Vieta/AM-GM/分离参数）+ Training（切线/向量/树图/AM-GM最值）+ csv10 + Ressourcen CN节（追加式）+ Glossar5 → `[Mathe]`
- Physik：Formelhandbuch（6组）+ Tricks（受力/整体隔离/面积/等效/量纲/二级结论）+ Training（Bus-vt/箱+坡/旋转+摆/单摆）+ csv10 + Glossar5 → `[Physik]`
- Chemie：Formelhandbuch（6组）+ Tricks（守恒/差量/极值/官能团/电化学口诀/氧化数）+ Training（Mg/HCl对、CaCO3、Fe/CuSO4、Ne/KBr/O2）+ csv10 + Glossar5 → `[Chemie]`
- Bio：Begriffshandbuch（6词×5事实）+ Tricks（系谱/曲线三看/对照/光合呼吸/酶口诀/生态位）+ Training（曲线/系谱/实验/细胞比较）+ csv10 + Glossar5 → `[Bio]`
- vault-check PASS（notes=71/csv=334 bad=0/links=163 missing=0）；INDEX四科+CN行。

## 事故

- Physik/Chemie/Bio三worker把Ressourcen.md重写了（删本地_Downloads/KLP/EF深链）→主Agent已恢复原文，新链改为CN-Vernetzung追加节。教训：prompt须写"Ressourcen.md只许append不许rewrite"。
- 上轮4 worker tasks中途被cancel→本轮切build模式用general子代理重发，一次全成。
