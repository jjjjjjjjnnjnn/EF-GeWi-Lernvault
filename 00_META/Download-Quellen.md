---
fach: ""
thema: "Download Quellen"
operatoren: []
klausurrelevant: false
datum: 2026-09-21
tags: [EF, Meta]
---

# Download-Quellen — 公开资料本地采集清单

> 规则：只收**开放许可**（CC-BY / CC-BY-SA / bpb免费 / 公有领域/Amtliche Werke §5 UrhG如Grundgesetz）。
> 绝不下载：出版社教材扫描、破解版、老师内部Klausur、任何版权不明文件。
> 大文件一律进本地 `_Downloads/`（gitignore，不推送）；仓库只留本清单 + 自己写的笔记。
> 每条记录：URL + 许可 + 本地文件名 + 状态（pending/ok）。下载后在 `_Downloads/` 同目录放同名 `.quelle.txt` 写来源与许可。

## SoWi（优先）

| # | 文件 | 许可 | URL | 本地 | 状态 |
|---|---|---|---|---|---|
| S1 | Grundgesetz (bpb, 144S, 2025) | 免费PDF (Amtliches Werk) | https://www.bpb.de/system/files/dokument_pdf/bpb_Grundgesetz_DE_2025.pdf | `_Downloads/SoWi/bpb_Grundgesetz_DE_2025.pdf` | ok |
| S2 | OpenStax Sociology 3e (WEB-PDF, 48MB) | CC BY-NC-SA 4.0 (nur lokal, Namensnennung) | https://assets.openstax.org/oscms-prodcms/media/documents/introduction-sociology-3e_-_WEB.pdf | `_Downloads/SoWi/openstax-sociology-3e_WEB.pdf` | ok |
| S3 | bpb IzPB Soziale Ungleichheit (Heft 354, HTML系列，按需单页存档) | bpb免费在线 | https://www.bpb.de/shop/zeitschriften/izpb/soziale-ungleichheit-354/ | 在线读，不下载 | 在线 |
| S4 | bpb Datenreport 2018 (Sozialbericht, PDF) | bpb免费 | https://www.bpb.de/system/files/dokument_pdf/dr2018_bf_mit_korrekturseite_142_200525.pdf | `_Downloads/SoWi/bpb-Datenreport-2018.pdf` | pending（大，按需） |
| S5 | KLP SoWi GOSt (2013/14, 435KB) | Amtliches Werk (MSB NRW) | https://lehrplannavigator.nrw.de/system/files/media/document/file/klp_gost_sowi.pdf | `_Downloads/SoWi/klp_gost_sowi.pdf` | ok |
| S6 | Operatorenübersicht SoWi (2015) | Amtliches Werk | https://www.standardsicherung.schulministerium.nrw.de/zentralabitur-gost/faecher/sozialwissenschaften | `_Downloads/SoWi/af2-sw_operatoren.pdf` | ok |
| S7 | Konstruktionsvorgaben + Erläuterungen | Amtliches Werk | 同上页 | `_Downloads/SoWi/konstruktionsvorgaben_sozialwissenschaften.pdf` + `erlaeuterungen_zu_den_konstruktionshinweisen_sw.pdf` | ok |
| S8 | Korrekturzeichen SoWi | Amtliches Werk | 同上页 | `_Downloads/SoWi/korrekturzeichen_sozialwissenschaften.pdf` | ok |
| S9 | Beispiel Gestaltungsaufgabe GK/LK (2020, Q-phase难度，看格式) | Amtliches Werk | 同上页 | `_Downloads/SoWi/sw21_w_g_xx_01_gg_beispiel_1.pdf` + `sw21_x_l_xx_01_gg_beispiel_1.pdf` | ok |
| S10 | Methodenblätter Handlungsempfehlung/Redebeitrag + Darstellungsleistung | Amtliches Werk | 同上页 | `_Downloads/SoWi/sw_m_*.pdf` + `beurteilung_sprachliche_richtigkeit_2.pdf` | ok |
| S11 | Sowi NRW EF电子书 (C.C.Buchner click & study) | 出版社版权，需学校Bildungslogin | https://www.click-and-study.de/Player/id/1162/page/14 | 不下载（Demo只给目录；只取章节标题作Navigator，正文零复制） | 在线 |
| S12 | 同上书全页原文（个人授权本地存档，RapidOCR） | 出版社版权，仅本地学习，永不提交 | Playwright + Lizenz bis 20.10.2027 | `_Downloads/SoWi/ebook-raw/{img,txt}/` + manifest.json | ok |

## Philosophie（优先）

| # | 文件 | 许可 | URL | 本地 | 状态 |
|---|---|---|---|---|---|
| P1 | OpenStax Introduction to Philosophy (WEB-PDF, 48MB) | CC BY-NC-SA 4.0 (nur lokal, Namensnennung) | https://assets.openstax.org/oscms-prodcms/media/documents/Introduction_to_Philosophy-WEB.pdf | `_Downloads/Philosophie/openstax-introduction-to-philosophy_WEB.pdf` | ok |
| P2 | GitHub源码 osbooks-introduction-philosophy | CC-BY | https://github.com/openstax/osbooks-introduction-philosophy | 不clone，按需在线读 | 在线 |
| P3 | KLP Philosophie GOSt (2013/14, 287KB) | Amtliches Werk (MSB NRW) | https://lehrplannavigator.nrw.de/system/files/media/document/file/klp_gost_philosophie.pdf | `_Downloads/Philosophie/klp_gost_philosophie.pdf` | ok |
| P4 | Operatorenübersicht + Konstruktion + Korrekturzeichen Philo | Amtliches Werk | https://www.standardsicherung.schulministerium.nrw.de/zentralabitur-gost/faecher/philosophie-gost | `_Downloads/Philosophie/af2-pl_operatoren_1.pdf` + `konstruktionsvorgaben_philosophie_0.pdf` + `korrekturzeichen_philosophie.pdf` | ok |
| P5 | Beispielaufgaben GK/LK (2016) + GK ab 2025 (Typ II C) | Amtliches Werk | 同上页 | `_Downloads/Philosophie/pl17_x_*.pdf` + `philosophie_gk_beispielaufgaben_ababitur2025.pdf` | ok |

## Deutsch（ZKE zentral！EF-Deutsch考什么看它）

| # | 文件 | 许可 | URL | 本地 | 状态 |
|---|---|---|---|---|---|
| D1 | ZKE Deutsch Vorgaben 2027 (Rahmenbedingungen+新Operatorenliste) | Amtliches Werk | https://www.standardsicherung.schulministerium.nrw.de/zentrale-klausuren-einfuehrungsphase/faecher/zke-deutsch-fachliche-vorgaben-hinweise-und | `_Downloads/Deutsch/vorgaben_zke_deutsch_2027.pdf` | ok |
| D2 | ZKE历年真题 (Deutsch/Mathe) | 官方但需登录 | 同上站 Aufgaben der letzten Jahre | 不爬（Login墙，尊重；找老师要） | 在线 |
| D3 | KLP Deutsch 2023 (548KB) | Amtliches Werk | https://lehrplannavigator.nrw.de/sekundarstufe-ii/kernlehrplaene-fuer-die-gymnasiale-oberstufe-ab-20222023/deutsch-gymnasiale | `_Downloads/Deutsch/klp_deutsch_2023.pdf` | ok |
| D4 | Operatoren ab 2023 + Konstruktion 2024 + Korrekturzeichen + Darstellungsleistung | Amtliches Werk | https://www.standardsicherung.schulministerium.nrw.de/zentralabitur-gost/faecher/deutsch-gost | `_Downloads/Deutsch/d_operatoren_ab2023.pdf` 等4件 | ok |

## Englisch（Klausur Teil A+B结构看Konstruktionshinweise）

| # | 文件 | 许可 | URL | 本地 | 状态 |
|---|---|---|---|---|---|
| E1 | KLP Englisch 2023 (469KB) | Amtliches Werk | https://lehrplannavigator.nrw.de/sekundarstufe-ii/kernlehrplaene-fuer-die-gymnasiale-oberstufe-ab-20222023/englisch-gymnasiale | `_Downloads/Englisch/klp_englisch_2023.pdf` | ok |
| E2 | Konstruktionshinweise Klausuren moderne FS (Okt 2025, 45S) | Amtliches Werk | https://www.standardsicherung.schulministerium.nrw.de/zentralabitur-gost/faecher/englisch-gost | `_Downloads/Englisch/konstruktionshinweise_klausuren_fremdsprachen.pdf` | ok |
| E3 | Operatoren ab 2025 + Zieltextformate + Korrekturzeichen | Amtliches Werk | 同上页 | `_Downloads/Englisch/e_operatoren_ab2025.pdf` 等3件 | ok |

## MINT（Phase 3，按需）

- OpenStax Physics / Chemistry / Biology WEB-PDF：`https://assets.openstax.org/oscms-prodcms/media/documents/<slug>_-_WEB.pdf`，用时再下（每本20–50MB）。
- LEIFIphysik / LEIFIchemie：无批量下载，在线用 + 单页打印PDF自存。
- Serlo：CC-BY-SA，在线用；导出走站内Export功能。

## Obsidian附件说明

- `Anlagen/`：只放自己画的图/截图标注（小文件，进git）。
- `_Downloads/`：批量PDF staging（不进git）。引用时用 `![[../../_Downloads/SoWi/xxx.pdf]]` 仅本地有效，公开笔记里只写清单链接，不链本地绝对路径。
