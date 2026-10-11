---
fach: ""
thema: "SoWi-AUFLÖSUNG全量对齐与FSRS考点记忆引擎"
operatoren: []
klausurrelevant: false
datum: 2026-10-11
tags: [EF, Meta, App, SoWi]
---

# Journal — SoWi AUFLÖSUNG 全量对齐与 FSRS 考点记忆引擎 (Phase 6 Tier 2)

## 交付概要
1. **全库 361 门互动课程 100% 对齐 Enterprise-v5 全套要素**：
   - 彻底解决了早期 50 门 SoWi 课程缺少 `AUFLÖSUNG (nach der Wahl lesen)` 模块的历史断层；
   - 升级 `v5Parser.ts` 解析容错性，完美兼容连字符、`Option/Weg A/B` 以及 `Ein-Satz-Kern` 结构；
   - 全库 10 学科（Bio 38/38, Chemie 37/37, Deutsch 32/32, Englisch 34/34, Mathe 44/44, Musik 27/27, Philo 31/31, Physik 38/38, SoWi 52/52, Sport 28/28）实现 `AUFLÖSUNG`、`KERNSATZ`、`ERWARTUNGSHORIZONT` 100% 满配。
2. **Phase 6 Tier 2: 考点间隔重复引擎（SRS / Kernsatz FSRS Integration）落地**：
   - `KernsatzCard` 深度集成本地零依赖 FSRS 间隔重复引擎（`eflernvault:fsrs:v1`）；
   - 在卡片底部注入 4 阶打卡自评评级（`1 · Nochmal`, `2 · Schwer`, `3 · Gut`, `4 · Einfach`）；
   - 顶部实时渲染记忆稳定性天数（$S$）与累计复习打卡次数；
   - 严格遵循 Tufte 纯黑白学术纸墨风，零 Emoji，零渐变阴影。

## 单科独立 Commit 记录
1. **[App] cb0cd7e**: `v5Parser AUFLOESUNG Syntax-Toleranz fuer Bindestrich- und Weg-Formate erweitert`
   - 正则增强支持 `- Mechanismus A/B:`, `Option/Weg A/B` 与 `Ein-Satz-Kern`；
   - `v5Components.test.tsx` 补充容错解析单测。
2. **[SoWi] 953f1fa**: `Schritt 5 AUFLOESUNG Kausalmechanismen in 50 Kursen einheitlich standardisiert`
   - 批量规范化 50 门 SoWi 互动课程，注入结构化 `Mechanismus zu Option A/B`、`Ein-Satz-Kern` 与 `Klausur-Satz`。
3. **[App] 299213f**: `KernsatzCard FSRS Spaced Repetition Anbindung und Selbstbewertungs-Steuerung`
   - `KernsatzCard` 接入 `gradeCard` / `getCardState`；
   - `Reise.tsx` 注入标准规范化卡片 ID；
   - `v5Components.test.tsx` 补充 FSRS 交互打卡与排程断言单测。

## 门禁验证结果（全绿）
- `python scripts/vault-check.py`: PASS（420 篇知识笔记、1942 行 Anki 词条、361 门互动课程全部为 Enterprise-v5、389 条索引链接）；
- `npx tsc -b`: 0 报错；
- `npx vitest run`: 94 套测试套件，739 项测试全绿；
- 工作树完全干净（`working tree clean`）。
