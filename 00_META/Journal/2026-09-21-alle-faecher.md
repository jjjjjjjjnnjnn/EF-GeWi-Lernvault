---
fach: ""
thema: "Alle-Faecher-Offensive"
datum: 2026-09-21
tags: [EF, Meta]
---

# 2026-09-21 全科进攻记录

## 内容（10/10 骨架完成）

- Deutsch/Englisch：KLP 2023 校准 + csv 9→30 条 + 官方文件（ZKE Vorgaben/Operatoren/Konstruktion/Korrekturzeichen）。
  关键定向：Deutsch 很可能考 Drama-Ganzschrift；Englisch 大概率 Identity/young adult fiction。
  等用户：Lektüre 名 + Topic + Teil B 类型（Sprachmittlung/Hörverstehen 问老师）。
- MINT：4×KLP（Mathe 2023/Physik/Chemie/Bio 2022）+ ZKE Mathe Vorgaben/Beispiele + **官方 Formelsammlung 2024**
  + 每科 Lehrplan/Ressourcen/Formel-Spickzettel（KaTeX `$$` 已写好）。
- Musik/Sport：口试骨架（Ablauf+Bausteine+Selbstcheck+TODO）。
- 本地 PDF 总计 39 件（+quelle.txt），全部 Amtliche Werke/OER，不进 git。

## 电子书 Playwright

- `scripts/ebook-fetch/`（auth_login.py + fetch_sowi.py + config.py，py_compile 通过，auth/raw 已 gitignore）。
- 等用户：在自动化浏览器里登录一次（密码不经我手），然后我适配 DOM 跑全书。

## App 需求（发外部 AI）

- `UI-SPEC-V2.md`：Fach-System（10 徽章）+ KaTeX 接入 + **Lernreise 第 7 模块**
  （vault 即课程：entdecken/ausprobieren/check/szenario/muendlich 五步态 + gating + XP/连击 localStorage + 向导入口 + 录音只本地）。
- 首个示范课程：`Lernreise/Sowi-Soziale-Marktwirtschaft-L1.md`（4 步，Klausur 目标）。

## commits 本轮

- `[Deutsch]` / `[Englisch]` / `[Mathe]` / `[Physik]` / `[Chemie]` / `[Bio]` / `[Meta]`(音体) + 本次 `[Meta]`。
