---
fach: ""
thema: "Lernmethode-v3"
datum: 2026-09-22
tags: [EF, Meta]
---

# 2026-09-22 学习方法v3（Academy-Lernreise，6 agent并行）

## 做了什么

- 证据库v3：`Lernmethoden-Evidenz.md` 48→73行，新增§6–§9（Adesope检索精细化/Rohrer穿插辨别/Barbieri例题边界/Brummer反馈+Mayer多媒体）；新建`Methoden-Quellen.md`（16篇分4组）。
- 论文本地：`_Downloads/_Papers/` 4/9成功（adesope/durkin/ma/barbieri，均验`%PDF-`头+`.quelle.txt`+`_manifest.txt`）；Rohrer实验室主机502，5篇失败待补（ResearchGate/DOI换源）。
- Template v3：`Fach-Template.md` +54行（9步导航+ZIELE/PRETRAINING/BEISPIEL/VERGLEICH/FEHLVORSTELLUNG/TAKEAWAY/REFLEXION，旧§1–7逐字保留）；`Stunden-Nachbereitung-GeWi.md`改15分钟四段（默写5→对照3→辨别3→Anki+assisted自解释4）。
- 试点：`Lernreise/Sowi-Soziale-Marktwirtschaft-L1.md` 9步重写（6685字符，Schritt全白名单，德语Satz 11句）。
- 出题链：`quizgen.ts`加discrimination/contrast两builder+`vorgehen`过程维（前3题逐字未动）；`Quiz.tsx`适配4维RUBRIC；`keys.ts`加D/V；`klausur-drill` SKILL加穿插+TAP组卷；`vault-check.py`加`check_vergleich`（WARN不fail）。
- App契约：`UI-SPEC-V4.md`新建93行（Vergleich UI+反馈三层+5条desirable文案+10项验收，发外部AI落实）。

## 验收

- `vault-check.py` PASS（notes=29 csv=147 bad=0 links=84 missing=0 reisen=3 vergleich=0）。
- `npm run build` 一次过（3.90s/2.22s两轮）。
- 6 commits已推（见下）。

## 待办/阻塞

- Rohrer 5篇待补源；Methoden-Quellen里年份不确定条目用Scholar链占位，下到PDF后对齐文件名。
- UI-SPEC-V4发外部AI落实后，主Agent验build+零回归。
- 下一课试点建议：Philo（文科第二优先）或等用户Lektüre/Topic开语言科。
