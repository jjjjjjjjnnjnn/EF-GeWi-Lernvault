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

## Philosophie（优先）

| # | 文件 | 许可 | URL | 本地 | 状态 |
|---|---|---|---|---|---|
| P1 | OpenStax Introduction to Philosophy (WEB-PDF, 48MB) | CC BY-NC-SA 4.0 (nur lokal, Namensnennung) | https://assets.openstax.org/oscms-prodcms/media/documents/Introduction_to_Philosophy-WEB.pdf | `_Downloads/Philosophie/openstax-introduction-to-philosophy_WEB.pdf` | ok |
| P2 | GitHub源码 osbooks-introduction-philosophy | CC-BY | https://github.com/openstax/osbooks-introduction-philosophy | 不clone，按需在线读 | 在线 |

## MINT（Phase 3，按需）

- OpenStax Physics / Chemistry / Biology WEB-PDF：`https://assets.openstax.org/oscms-prodcms/media/documents/<slug>_-_WEB.pdf`，用时再下（每本20–50MB）。
- LEIFIphysik / LEIFIchemie：无批量下载，在线用 + 单页打印PDF自存。
- Serlo：CC-BY-SA，在线用；导出走站内Export功能。

## Obsidian附件说明

- `Anlagen/`：只放自己画的图/截图标注（小文件，进git）。
- `_Downloads/`：批量PDF staging（不进git）。引用时用 `![[../../_Downloads/SoWi/xxx.pdf]]` 仅本地有效，公开笔记里只写清单链接，不链本地绝对路径。
