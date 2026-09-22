# INDEX — 全库导航（人读+机器查统一入口）

> Agent：先读`HANDOVER.md`（一页交接），再读本页定位，再读目标学科 `Lehrplan.md`。新增笔记后更新对应链接行。

## 学科地图

| 学科 | 状态 | Lehrplan | Ressourcen | Anki | Klausur-Training | Texte |
|---|---|---|---|---|---|---|
| SoWi | ✅ 本期 | [Lehrplan](../08_SoWi/Lehrplan.md) | [Ressourcen](../08_SoWi/Ressourcen.md) | [SoWi-EF-Basis](../08_SoWi/Vokabeln-Anki/SoWi-EF-Basis.csv) | [Satzbausteine](../08_SoWi/Klausur-Training/Satzbausteine.md) · [Fehlerlog](../08_SoWi/Klausur-Training/Fehlerlog.md) | [Karikatur-Anleitung](../08_SoWi/Texte-Analyse/Karikatur-Anleitung.md) |
| Philosophie | ✅ 本期 | [Lehrplan](../07_Philosophie/Lehrplan.md) | [Ressourcen](../07_Philosophie/Ressourcen.md) | [Philo-EF-Basis](../07_Philosophie/Vokabeln-Anki/Philo-EF-Basis.csv) | [Satzbausteine](../07_Philosophie/Klausur-Training/Satzbausteine.md) · [Fehlerlog](../07_Philosophie/Klausur-Training/Fehlerlog.md) | [Menschenbild](../07_Philosophie/Texte-Analyse/Menschenbild-Überblick.md) · [Utilitarismus-vs-Kant](../07_Philosophie/Texte-Analyse/Utilitarismus-vs-Kant.md) |
| Deutsch | 🟡 占位 | [Lehrplan](../01_Deutsch/Lehrplan.md) | [Ressourcen](../01_Deutsch/Ressourcen.md) | [Deutsch-EF-Phrasen](../01_Deutsch/Vokabeln-Anki/Deutsch-EF-Phrasen.csv) | [Fehlerlog](../01_Deutsch/Klausur-Training/Fehlerlog.md) | — |
| Englisch | 🟡 占位 | [Lehrplan](../02_Englisch/Lehrplan.md) | [Ressourcen](../02_Englisch/Ressourcen.md) | [Englisch-EF-Phrasen](../02_Englisch/Vokabeln-Anki/Englisch-EF-Phrasen.csv) | [Fehlerlog](../02_Englisch/Klausur-Training/Fehlerlog.md) | — |
| Mathe/Physik/Chemie/Bio | ✅ 骨架EF | [Mathe-Lehrplan](../03_Mathe/Lehrplan.md) · [Physik](../04_Physik/Lehrplan.md) · [Chemie](../05_Chemie/Lehrplan.md) · [Bio](../06_Bio/Lehrplan.md) | 各 `Ressourcen.md` + `_Downloads/` KLP全文 | — | — | 各 `Formel-Spickzettel.md` (KaTeX) |
| Musik/Sport mündl. | 🟡 口试骨架 | [Musik](../09_Musik-mündl/Lehrplan.md) · [Sport](../10_Sport-mündl/Lehrplan.md) | 各 `Ressourcen.md` | — | — | — |

## App（桌面软件，一站式入口）
- [App-EF-Lernvault](../App-EF-Lernvault/README.md) — EF-Lernvault：六模块 + 命令面板/快捷键/拖拽 + P1接线（顶栏打开真实vault，笔记/背卡/面板全切真实数据）；`npm run dev` 预览（1420）。
- [LICENSE](../App-EF-Lernvault/LICENSE)（半开源，已定稿） · [NOTICE](../App-EF-Lernvault/NOTICE.md)（第三方署名，实测版本）
- 规范：[UI-BRIEF](../App-EF-Lernvault/UI-BRIEF.md)（tufte简洁风） · [INTERACTION-BRIEF](../App-EF-Lernvault/INTERACTION-BRIEF.md)（交互） · [FEATURE-SPEC](../App-EF-Lernvault/FEATURE-SPEC.md)（功能需求，给外部AI） · [UI-SPEC-V2](../App-EF-Lernvault/UI-SPEC-V2.md)（全科+KaTeX+Lernreise，给外部AI） · [UI-SPEC-V3](../App-EF-Lernvault/UI-SPEC-V3.md)（P2/P3/P4界面需求，给外部AI）
- 互动课程源：[Lernreise/](../Lernreise/)（vault即课程，首个示范：Sowi-Soziale-Marktwirtschaft-L1）
- 约定：App 只读 vault（内容源），不写回；commit 前缀 `[App]`；构建产物与签名密钥永不进 git。
- P0产物（本地 `src-tauri/target/release/bundle/`，不进git）：`EF-Lernvault_0.1.0_x64-setup.exe`（1.8MB）· MSI（2.7MB），已验启动（窗口标题正常，常驻~25MB）。

## META

- [HANDOVER](../HANDOVER.md) — 一页交接（新agent/用户先读）
- [Ziele](Ziele.md) · [NRW-EF-Lehrplan-Übersicht](NRW-EF-Lehrplan-Übersicht.md) · [Lernsystem](Lernsystem.md) · [Lernmethoden-Evidenz](Lernmethoden-Evidenz.md) · [Operatoren-NRW-GeWi](Operatoren-NRW-GeWi.md) · [Glossar-DE-ZH-GeWi](Glossar-DE-ZH-GeWi.md)
- [Download-Quellen](Download-Quellen.md) — 本地 `_Downloads/` 采集清单（PDF不进git）
- [DeepTutor](DeepTutor.md) — 提分引擎：Quiz/抽认卡/模拟卷命令手册
- Skills：[klausur-drill](../Skills/klausur-drill/SKILL.md) · [vokabel-trainer](../Skills/vokabel-trainer/SKILL.md) · [texte-analyse](../Skills/texte-analyse/SKILL.md)

## 主题索引（新增一行一条）
### SoWi

- Identität & Jugend (Kap. 1) — [Identitaet-Jugend](../08_SoWi/Texte-Analyse/Identitaet-Jugend.md)（Shell/六模型/媒体/多元文化）
- Sozialisation & Rolle (Kap. 2) — [Sozialisation-Rolle](../08_SoWi/Texte-Analyse/Sozialisation-Rolle.md)（初级/次级/角色三冲突/Rollendistanz）
- Soziale Ungleichheit — [Soziale-Ungleichheit](../08_SoWi/Texte-Analyse/Soziale-Ungleichheit.md)（EF最高频，Template v2首篇：Pro/Contra+三数+5 Klausur-Sätze）
- Karikatur方法 — [Karikatur-Anleitung](../08_SoWi/Texte-Analyse/Karikatur-Anleitung.md)
- 电子书11章地图 — [Sowi-NRW-EF-Buch-Navigator](../08_SoWi/Texte-Analyse/Sowi-NRW-EF-Buch-Navigator.md)（C.C.Buchner click & study，需学校登录；Ungleichheit无专章）

### Philosophie
- Menschenbild — [Menschenbild-Überblick](../07_Philosophie/Texte-Analyse/Menschenbild-Überblick.md)
- Ethik: Utilitarismus vs Kant — [Utilitarismus-vs-Kant](../07_Philosophie/Texte-Analyse/Utilitarismus-vs-Kant.md)

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
