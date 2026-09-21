# INDEX — 全库导航（人读+机器查统一入口）

> Agent：先读`HANDOVER.md`（一页交接），再读本页定位，再读目标学科 `Lehrplan.md`。新增笔记后更新对应链接行。

## 学科地图

| 学科 | 状态 | Lehrplan | Ressourcen | Anki | Klausur-Training | Texte |
|---|---|---|---|---|---|---|
| SoWi | ✅ 本期 | [Lehrplan](../08_SoWi/Lehrplan.md) | [Ressourcen](../08_SoWi/Ressourcen.md) | [SoWi-EF-Basis](../08_SoWi/Vokabeln-Anki/SoWi-EF-Basis.csv) | [Satzbausteine](../08_SoWi/Klausur-Training/Satzbausteine.md) · [Fehlerlog](../08_SoWi/Klausur-Training/Fehlerlog.md) | [Karikatur-Anleitung](../08_SoWi/Texte-Analyse/Karikatur-Anleitung.md) |
| Philosophie | ✅ 本期 | [Lehrplan](../07_Philosophie/Lehrplan.md) | [Ressourcen](../07_Philosophie/Ressourcen.md) | [Philo-EF-Basis](../07_Philosophie/Vokabeln-Anki/Philo-EF-Basis.csv) | [Satzbausteine](../07_Philosophie/Klausur-Training/Satzbausteine.md) · [Fehlerlog](../07_Philosophie/Klausur-Training/Fehlerlog.md) | [Menschenbild](../07_Philosophie/Texte-Analyse/Menschenbild-Überblick.md) · [Utilitarismus-vs-Kant](../07_Philosophie/Texte-Analyse/Utilitarismus-vs-Kant.md) |
| Deutsch | 🟡 占位 | [Lehrplan](../01_Deutsch/Lehrplan.md) | [Ressourcen](../01_Deutsch/Ressourcen.md) | [Deutsch-EF-Phrasen](../01_Deutsch/Vokabeln-Anki/Deutsch-EF-Phrasen.csv) | [Fehlerlog](../01_Deutsch/Klausur-Training/Fehlerlog.md) | — |
| Englisch | 🟡 占位 | [Lehrplan](../02_Englisch/Lehrplan.md) | [Ressourcen](../02_Englisch/Ressourcen.md) | [Englisch-EF-Phrasen](../02_Englisch/Vokabeln-Anki/Englisch-EF-Phrasen.csv) | [Fehlerlog](../02_Englisch/Klausur-Training/Fehlerlog.md) | — |
| Mathe/Physik/Chemie/Bio | ⏳ Phase 3 | 各目录 README | — | — | — | — |
| Musik/Sport mündl. | ⏳ Phase 3 | 各目录 README | — | — | — | — |

## App（桌面软件，一站式入口）
- [App-EF-Lernvault](../App-EF-Lernvault/README.md) — EF-Lernvault v0.1.0-prototype：笔记/背卡/刷题/AI助教/规划/导图六模块；`npm run dev` 预览。
- [LICENSE](../App-EF-Lernvault/LICENSE)（半开源草案，待定稿） · [NOTICE](../App-EF-Lernvault/NOTICE.md)（第三方署名）
- 约定：App 只读 vault（内容源），不写回；commit 前缀 `[App]`；构建产物与签名密钥永不进 git。

## META

- [HANDOVER](../HANDOVER.md) — 一页交接（新agent/用户先读）
- [Ziele](Ziele.md) · [NRW-EF-Lehrplan-Übersicht](NRW-EF-Lehrplan-Übersicht.md) · [Lernsystem](Lernsystem.md) · [Operatoren-NRW-GeWi](Operatoren-NRW-GeWi.md) · [Glossar-DE-ZH-GeWi](Glossar-DE-ZH-GeWi.md)
- [Download-Quellen](Download-Quellen.md) — 本地 `_Downloads/` 采集清单（PDF不进git）
- [DeepTutor](DeepTutor.md) — 提分引擎：Quiz/抽认卡/模拟卷命令手册
- Skills：[klausur-drill](../Skills/klausur-drill/SKILL.md) · [vokabel-trainer](../Skills/vokabel-trainer/SKILL.md) · [texte-analyse](../Skills/texte-analyse/SKILL.md)

## 主题索引（新增一行一条）

### SoWi
- Soziale Ungleichheit — 起点：[Lehrplan](../08_SoWi/Lehrplan.md)（待拆独立笔记）
- Karikatur方法 — [Karikatur-Anleitung](../08_SoWi/Texte-Analyse/Karikatur-Anleitung.md)

### Philosophie
- Menschenbild — [Menschenbild-Überblick](../07_Philosophie/Texte-Analyse/Menschenbild-Überblick.md)
- Ethik: Utilitarismus vs Kant — [Utilitarismus-vs-Kant](../07_Philosophie/Texte-Analyse/Utilitarismus-vs-Kant.md)

## Journal（每日/每次交接一条，最新在下）

- [2026-09-21-handover](Journal/2026-09-21-handover.md) — 建库全过程 + 待办
- [2026-09-21-app-kickoff](Journal/2026-09-21-app-kickoff.md) — App 桌面软件立项
- [2026-09-21-ui-redesign-tufte](Journal/2026-09-21-ui-redesign-tufte.md) — App UI 重做（Tufte Data-Ink 风格）
- [2026-09-21-nav-icons](Journal/2026-09-21-nav-icons.md) — 导航去 emoji 换细线 SVG
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
