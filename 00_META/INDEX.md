# INDEX — 全库导航（人读+机器查统一入口）

> Agent：先读本页定位，再读目标学科 `Lehrplan.md`。新增笔记后更新对应链接行。

## 学科地图

| 学科 | 状态 | Lehrplan | Ressourcen | Anki | Klausur-Training | Texte |
|---|---|---|---|---|---|---|
| SoWi | ✅ 本期 | [Lehrplan](../08_SoWi/Lehrplan.md) | [Ressourcen](../08_SoWi/Ressourcen.md) | [SoWi-EF-Basis](../08_SoWi/Vokabeln-Anki/SoWi-EF-Basis.csv) | [Satzbausteine](../08_SoWi/Klausur-Training/Satzbausteine.md) · [Fehlerlog](../08_SoWi/Klausur-Training/Fehlerlog.md) | [Karikatur-Anleitung](../08_SoWi/Texte-Analyse/Karikatur-Anleitung.md) |
| Philosophie | ✅ 本期 | [Lehrplan](../07_Philosophie/Lehrplan.md) | [Ressourcen](../07_Philosophie/Ressourcen.md) | [Philo-EF-Basis](../07_Philosophie/Vokabeln-Anki/Philo-EF-Basis.csv) | [Fehlerlog](../07_Philosophie/Klausur-Training/Fehlerlog.md) | [Menschenbild](../07_Philosophie/Texte-Analyse/Menschenbild-Überblick.md) · [Utilitarismus-vs-Kant](../07_Philosophie/Texte-Analyse/Utilitarismus-vs-Kant.md) |
| Deutsch | 🟡 占位 | [Lehrplan](../01_Deutsch/Lehrplan.md) | [Ressourcen](../01_Deutsch/Ressourcen.md) | — | — | — |
| Englisch | 🟡 占位 | [Lehrplan](../02_Englisch/Lehrplan.md) | [Ressourcen](../02_Englisch/Ressourcen.md) | — | — | — |
| Mathe/Physik/Chemie/Bio | ⏳ Phase 3 | 各目录 README | — | — | — | — |
| Musik/Sport mündl. | ⏳ Phase 3 | 各目录 README | — | — | — | — |

## META

- [Ziele](Ziele.md) · [NRW-EF-Lehrplan-Übersicht](NRW-EF-Lehrplan-Übersicht.md) · [Lernsystem](Lernsystem.md) · [Operatoren-NRW-GeWi](Operatoren-NRW-GeWi.md) · [Glossar-DE-ZH-GeWi](Glossar-DE-ZH-GeWi.md)
- Journal：`Journal/YYYY-MM-DD.md`

## 主题索引（新增一行一条）

### SoWi
- Soziale Ungleichheit — 起点：[Lehrplan](../08_SoWi/Lehrplan.md)（待拆独立笔记）
- Karikatur方法 — [Karikatur-Anleitung](../08_SoWi/Texte-Analyse/Karikatur-Anleitung.md)

### Philosophie
- Menschenbild — [Menschenbild-Überblick](../07_Philosophie/Texte-Analyse/Menschenbild-Überblick.md)
- Ethik: Utilitarismus vs Kant — [Utilitarismus-vs-Kant](../07_Philosophie/Texte-Analyse/Utilitarismus-vs-Kant.md)

## Dataview（Obsidian内自动索引，GitHub上仅作备份显示）

```dataview
TABLE thema, datum FROM "07_Philosophie" OR "08_SoWi" OR "01_Deutsch" OR "02_Englisch"
WHERE klausurrelevant = true
SORT datum DESC
```

```dataview
LIST FROM #EF WHERE fach = "SoWi"
```
