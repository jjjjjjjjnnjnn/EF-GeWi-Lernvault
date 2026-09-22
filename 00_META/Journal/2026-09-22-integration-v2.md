---
fach: ""
thema: "Integrationsmethoden v2"
datum: 2026-09-22
tags: [EF, Meta]
---

# 2026-09-22 集成方法v2：记录·设计·执行

## 记录（研究→证据）

- 9路检索约50源，结论沉淀为 `00_META/Lernmethoden-Evidenz.md`（单真相源）：
  Dunlosky十策略等级 / Karpicke检索d≈1.0 / FSRS retention 0.9 / 三轮重学 /
  RAG不清零→Zitierpflicht / ITS g=.42-.57 + 2σ证伪 / JIM 231min+15min微会话。
- 来源只记链接（paywall多，不批量下，版权红线）。

## 设计（v2三层+一校验）

- 内容层：Fach-Template v2（Pro/Contra·Fehlvorstellungen·Aufgabenart三选一§2+evidenz字段+Lernreise行）；
  Nachbereitung v2（合书默写→开书对照，检索优先）。
- 契约层：parser跳csv表头（修4张废卡）+quote/math新Block+坏行丢弃不移位；
  loader SKIP加Journal；课程按thema自动反链（零迁移）。
- 编排层：15min标准步长；Planner三轮倒排；Musik/Sport各1个muendlich课程；P3加Zitierpflicht。
- 校验层：`scripts/vault-check.py`（notes/csv/INDEX/Lernreise四检，PASS才合）。

## 执行（本轮）

- vault-check首跑即抓到范围bug（Lernreise/Skills误检）→ 修SKIP → PASS
  （notes=16 csv=74 bad=0 links=64 missing=0 reisen=3）。
- `npm run build` PASS（tsc+vite 1.63s）。
- 待办：SoWi 11篇按Template v2写；Planner三轮倒排进P4；SoWi Kap.5加Fake-News-Check。
