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

## Material-Offensive 2026-09-22（脚本 `scripts/fetch-material.py` + fixup，一键重跑）

| # | 包 | 内容 | 许可 | 本地 | 状态 |
|---|---|---|---|---|---|
| M1 | KMK Bildungsstandards Abi | Deutsch + Englisch (Fortgef-FS) 全文 | KMK, frei | `_Downloads/Deutsch+Englisch/kmk_bildungsstandards_*` | ok |
| M2 | Klett IQB-Themenfelder Englisch 2024-26 | 8 Themenbereiche→Green Line映射 | Klett, Unterrichtsgebrauch erlaubt | `_Downloads/Englisch/klett_iqb_themenfelder_*` | ok |
| M3 | OpenStax ×4 | Biology 2e (392MB) / Chemistry 2e (213MB) / College-Physics 2e (257MB) / Psychology 2e (56MB) | CC BY-NC-SA, nur lokal | `_Downloads/{Bio,Chemie,Physik,Philosophie}/openstax-*_WEB.pdf` | ok |
| M4 | StanSi Vorgaben 2027–2029 | Mathe/Deutsch/Englisch/Physik/Chemie/Bio 六科 | MSB NRW, UrhWissG 60b Lehr-/Lernzwecke | `_Downloads/<Fach>/stansi_*_2027|2028|2029_gg.pdf` | ok |
| M5 | StanSi Operatoren+Konstruktion | Englisch ab2025/Klausuren Okt2025/Physik/Chemie(Formeldokument!)/Bio/Deutsch | 同上 | `_Downloads/<Fach>/stansi_*.pdf` | ok |
| M6 | IQB Pool Mathe | 2017 Analysis (CAS/WTR, 6套) | IQB/KMK frei | `_Downloads/Mathe/iqb_2017*.pdf` | ok |
| M7 | IQB Pool Englisch | Hörverstehen 2021–23 + Mediation 2021/2025 | 同上 | `_Downloads/Englisch/iqb_202*e*.pdf` | ok |
| M8 | IQB Pool Deutsch | Analyse/Erörterung 2022–24 + Beispielaufgaben (Interpretation/materialgestützt) | 同上 | `_Downloads/Deutsch/iqb_202*.pdf` | ok |
| M9 | IQB Pool NaWi 2025–26 | Physik/Chemie/Bio (含2026新题！) | 同上 | `_Downloads/{Physik,Chemie,Bio}/iqb_202*.pdf` | ok |
| M10 | 本地总量 | 约80新文件，`_Downloads/` 共1121件/1.15GB（全gitignored） | — | — | ok |

> 缺口（需人工，见对话傻瓜指南）：StanSi Login墙内近3年真题（找老师要 Zugangsdaten）/ Stark纸书（按下单买）/
> bpb IzPB 354纸质免费订 / 课堂Klausur拍照 / Lektüre+Topic+ Halbjahr-Thema。

## Material-Runde 2 (2026-09-22, `scripts/fetch-material3.py` + fixup4/5, 分组并行)

| # | 包 | 内容 | 本地 | 状态 |
|---|---|---|---|---|
| N1 | bpb IzPB 354 PDF (8MB) | Soziale Ungleichheit 全文（Ungleichheit笔记升级弹药） | `_Downloads/SoWi/bpb_izpb354_*` | ok |
| N2 | bpb Sozialbericht 2024 (41MB) | Datenreport后继（Gini/Armut/Bildung数字核对） | `_Downloads/SoWi/bpb_sozialbericht-2024.pdf` | ok |
| N3 | KMK NaWi 2020 | Bio/Chemie/Physik Bildungsstandards Abi | `_Downloads/{Bio,Chemie,Physik}/kmk_bildungsstandards_*_abi.pdf` | ok |
| N4 | IQB深挖 (+36) | Mathe另6套/Englisch Schreiben×2/Deutsch Interpretation×5/NaWi各6 | `_Downloads/<Fach>/iqb_*` | ok |
| N5 | StanSi深挖 | Deutsch Konstruktion+Gedichtvergleich+Ma-LK / Englisch Zieltextformate-Tabelle(1.5MB!)/Mathe Operatoren26+GK-Vorblatt+Pflicht/Wahlpflicht / ZKE-Mathe Vorgaben27+TeilA×4+TeilB CAS/WTR | `_Downloads/<Fach>/stansi_*` | ok |
| N6 | 总量 | `_Downloads/` 1302件/2.33GB（全gitignored，含Klett Bridge 18/23媒体） | — | ok |
| N7 | Klett Green Line Transition (ab 2024) Medien | 5单元23媒体（mp3+mp4），用户Bildungslogin，脚本`klett_hold/map/fetch.py` | `_Downloads/Englisch/klett-bridge/`（Klett版权，本地，永不提交） | ok（23/23，mp3×9+mp4×14全验头） |
| N8 | NRW官源（learn:line已死→QUA-LiS/Bildungsportal直采） | 33 PDF：Mathe/Physik/Chemie/Bio KLP缺口补齐 + StanSi Handreichungen/Beispiele ab2025 + APO-GOSt现行版 | `_Downloads/<Fach>/nrw-amtlich/`（Amtliches Werk/UrhWissG 60b） | ok（23.7MB） |
| N9 | 联邦OER（Bildungsserver/Elixier/ZUM/twillo/lernen:digital） | 29件：ZUM 7PDF+8wikitext（CC-BY-SA）+ lernen:digital 4 Broschüren + Elixier 7（许可o.A.仅本地学）+ twillo 2 | `_Downloads/<Fach>/oer-bund/` | ok（43.8MB；oercontent.nrw域名已死/twillo-Fach在墙内） |
| N10 | 媒体库（Siemens/SESAM/FWU/LEIFI/Serlo） | Siemens 16件免登录直下（CC BY-SA，EN版可作双语）+ LEIFI/Serlo EF链接清单 | `_Downloads/<Fach>/mediathek/` + 各科Ressourcen.md外链 | ok（11.2MB；SESAM/FWU登录墙实锤零下载） |
| N11 | Goethe Deutschstunde/DaF | 17 PDF（B2/C1 Modellsatz论证参照+TnB练习册+AB集，101MB）+ 17条外链清单→Deutsch/Englisch Ressourcen.md | `_Downloads/{Deutsch,Englisch}/goethe/`（kostenfrei本地） | ok（dlapi被Akamai墙，20+PDF转在线用） |
| N12 | 商业/社群（只记链接，不爬） | meinUnterricht / eduki / Friedrich Verlag / GEW / #twlz / Deutsch für dich / Zeitgeister / PASCH | 各科`Ressourcen.md`商业节 | ok |
| N13 | 总量 | `_Downloads/` 约1420件/约3.0GB（全gitignored；本轮+95件/~180MB） | — | ok |
| N14 | StanSi全站通扫Runde4（9路并行） | 58 PDF/~20MB：SoWi 9（Vorgaben 27–29+bili-Operatoren+Gestaltungsaufgaben终版+sl/vl示例×5）/ Philo 3（27–29）/ Deutsch 2（IVa示例+2026-09 Neuerungen PPP）/ Mathe 17（ab2026 Vorblatt+Teil1 LK+Teil2 GK/LK×14 Analysis·Geo·Stoch CAS/WTR）/ Physik 3+Chemie 3+Bio 1（**operatoren/konstruktions/korrekturzeichen此前误判已有实缺，本轮补齐**）/ Querschnitt 20（ZP10德英数Operatoren+GOSt Termine 27/28+Ergebnisberichte 23–25+Abi-Formulare+Recht）。Englisch 0新增（9件全已有）；3站Prüfungsaufgaben登录墙全确认未碰（各科manifest `loginwall`数组） | `_Downloads/<Fach>/stansi-runde4/`（Amtliches Werk） | ok |

> 确认不可下：GOSt-Prüfungsaufgaben页零直链（JS门）/ aufgaben-der-letzten-jahre需Login（0 pdf，墙实锤）/
> IQB-HV无mp3直链（在线播放器）/ OpenStax需JS取链（已用Playwright解）/ Musik-Sport无中央考（只链Lehrplan）。
> Serlo/LEIFI只收链接不批量（交互题，爬无意义；写笔记时按主题链）。

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
