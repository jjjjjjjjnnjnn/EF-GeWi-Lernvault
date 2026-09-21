# AGENTS.md — EF-GeWi-Lernvault Agent规范

> 任何AI agent（opencode / Claude Code / 其他）在本仓库工作前必读。目标：可维护、检索快、不侵权。

## 1. 结构（固定，不许自创新顶层目录）

```
00_META/          # Ziele, Lehrplan总览, Lernsystem, Operatoren, Glossar, INDEX, Journal/
01_Deutsch/ 02_Englisch/ 07_Philosophie/ 08_SoWi/   # 文科（本期）
03_Mathe/ 04_Physik/ 05_Chemie/ 06_Bio/ 09_Musik-mündl/ 10_Sport-mündl/  # 占位（Phase 3）
Templates/        # 唯一模板来源，新建笔记必须套模板
```

每科固定子集：`Lehrplan.md` / `Ressourcen.md` / `Vokabeln-Anki/` / `Klausur-Training/`，文科加 `Texte-Analyse/`。
新知识笔记放：学科根目录或 `Texte-Analyse/`，文件名 `Thema-DE-kebab-case.md`（如 `Soziale-Mobilitaet.md`，不用变音符号，ae/oe/ue代替ä/ö/ü）。

## 2. Frontmatter（Wissensnotizen强制，固定文件豁免）

`Lehrplan.md / Ressourcen.md / Satzbausteine.md / Fehlerlog.md / README.md` 豁免，其余每个 `.md` 笔记头必须：

```yaml
---
fach: SoWi            # 固定词：Deutsch|Englisch|Mathe|Physik|Chemie|Bio|Philosophie|SoWi|Musik|Sport
thema: "…"            # 短标题，德语优先
operatoren: []        # 如 [darstellen, analysieren, beurteilen]，无则 []
klausurrelevant: true # bool
datum: YYYY-MM-DD
tags: [EF, SoWi]      # 首标签=EF，次标签=学科
---
```

正文规范：中文理解在上、德语Klausur-Satz在下；新术语必须同步到 `00_META/Glossar-DE-ZH-GeWi.md` 加一行；错题只记 `Klausur-Training/Fehlerlog.md`。

## 3. Anki规范

- 来源唯一：各科 `Vokabeln-Anki/*.csv`，格式 `Deutsch;Chinesisch;Beispielsatz;Fach;Thema`，分号+UTF-8。
- Obsidian内背诵用 `Begriff::Definition / 中文` 单行写法（SR插件）。
- 不提交 `*.apkg / *.colpkg`（见 .gitignore）。

## 4. 版权红线（Public仓库！）

- 只写原创笔记/总结。绝不提交：老师Klausur原题全文、出版社教材扫描、同学个人信息、学校内部文件全文。
- `Ressourcen.md` 只放外链+许可注明（Serlo CC-BY-SA / OpenStax CC BY-NC-SA·仅本地学习 / bpb免费 / LEIFI免费）。
- 对外引用第三方段落必须注明来源链接。
- 批量下载只进本地 `_Downloads/`（gitignore，不推送），每文件配同名 `.quelle.txt`（来源+许可+日期）。`Anlagen/` 只放自制小图。清单唯一真相源：`00_META/Download-Quellen.md`。

## 5. Agent工作流

1. 先读 `00_META/INDEX.md` 定位，再读目标学科 `Lehrplan.md`，确认EF范围后再写。
2. 写完笔记后：更新 `00_META/INDEX.md` 的对应链接行（如新增主题），Glossar加术语行，csv加卡片行——三处同步，一次commit。
3. Commit信息前缀：`[SoWi] / [Philo] / [Meta] / [Deutsch] / [Englisch]` + 动词短句。一次只做一科，不跨科混commit。
4. 不装新Obsidian插件、不改 `.obsidian/*.json`（除非用户明确要求）；`workspace.json / cache / data.json` 永不提交。

## 6. 检索入口

- 人读：`README.md` → `00_META/INDEX.md`。
- 机器查：按 `fach:` + `tags:` + 文件名kebab-case；Dataview示例见 `00_META/INDEX.md` 底部。
