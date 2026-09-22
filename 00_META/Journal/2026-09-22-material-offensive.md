---
fach: ""
thema: "Material-Offensive"
datum: 2026-09-22
tags: [EF, Meta]
---

# 2026-09-22 Material-Offensive（考纲真题教材批量落地）

## 下了什么（约80文件，`_Downloads/` 1121件/1.15GB，全gitignored）

- KMK Bildungsstandards Abi（D+E）+ Klett IQB-Themenfelder（E 2024-26）。
- OpenStax ×4：Bio 392MB / Chemie 213MB / Physik 257MB / Psychologie 56MB（CC BY-NC-SA，仅本地）。
- StanSi Vorgaben 2027–2029 六科 + 各科Operatoren/Konstruktion/Chemie-Formeldokument。
- IQB Pool真题：Mathe 2017×6 / Englisch HV+Med / Deutsch Analyse+Erörterung+Beispiele / NaWi 2025–26新题。

## 脚本

- `scripts/fetch-material.py`（KMK/Klett/OpenStax-resolver/StanSi-crawl/IQB-crawl，一键重跑，%PDF验头+quelle.txt）。
- `scripts/fixup-material.py`（IQB slug发现 + Playwright取OpenStax直链）。
- `scripts/fixup-material2.py`（OpenStax四本 + IQB ü-slug五科）。
- 教训：PS5.1内联python引号必炸→一律写文件再跑；IQB非Mathe slug含ü（%C3%BC）；OpenStax详情页JS渲染→Playwright取链。

## 缺口（需用户，傻瓜指南已在对话给出）

- StanSi Login墙近3年真题 / Stark纸书 / bpb 354纸质 / 课堂Klausur / Lektüre+Topic。
