---
fach: ""
thema: "Wave3文档债收尾：HANDOVER重写/考纲缺口/INDEX补缀/验收命令"
datum: 2026-10-11
tags: [EF, Meta]
---

# 2026-10-11 施工日志：Wave3 文档债收尾（HANDOVER + 考纲 + INDEX + 验收）

> 只新建本日志与 Wave2 日志，不碰其他文件，不 commit。
> 前置：Wave1 `2026-10-11-wave1-engineering-hygiene.md` §1.5（A–E 过期段不动，留 Wave3）；
> Wave2 `2026-10-11-wave2-content-fixes.md`（Glossar/教具54/改名42/App 批修已落 6 commits）。

## 1. 做了什么（Wave3 文档债，还原 Wave1 预留口径）

1. **HANDOVER 重写**：Wave1 仅改 L24 头行与 L197 门禁基线
   （notes=420 / csv=1942 / reisen=361 / 术语 998 行 / 索引 382 / 94 套件 727 项），
   A–E 过期段 Wave3 重写——统一新口径（含 Wave2：占位清零、改名 42、Glossar 整理后行数），
   过期数字与 Lesson-v3 旧表述一并清除。
2. **考纲缺口刷新**：对照目标学科 `Lehrplan.md` 复核 EF 范围覆盖，
   Wave2 新增主题（改名后 SoWi-/Philosophie- 链）回填 Lehrplan 缺口行；缺口清单同步 INDEX。
3. **INDEX 补缀**：Wave1 只动 L19（361 篇 / Enterprise-v5）与 L46（225 篇）；
   Wave3 补 Wave1 残留行（Lesson-v3 旧表述残留）+ Wave2 改名后的链接行
   （bea03f1 已补 1 行，余下课程链/跨课引用行核对 missing=0）。
4. **验收命令**（主线程执行，本 Wave 只记录）：
   `python -X utf8 scripts/vault-check.py`（期望 PASS，WARN 全 warn-only）；
   vitest 94 套件 727 项复验；`npx tsc -b` 零报错；App `npm run build` 通过后单科独立 commit。

## 2. 真相链（沿用 Wave1–Wave2 实测，不复测）

- vault-check：`notes=420 csv_rows=1942(bad=0) index_links=382(missing=0) reisen=361 vergleich=0 badnames=0 badglossar=0` → PASS。
- Glossar 998 行（Wave2 去重补全后以文件实算为准）；Sinus-Milieus v3 为唯一已披露例外。
- git 基线：`7f70dc5/4febb82/515d89f/c4a5c85/bea03f1/5ee92bf`（Wave2）+ `c040155`（Wave1）+ `b1c42ad`（Wave0）。

## 3. 阻塞（Blocker）

- ⏳ 待确认（沿用 Wave1）：S8-Noten-Index 标 225 篇 vs 文件内 md 链接实数 226（差 1 为索引自链/模板链，沿用 225，待复核）。
- ⏳ 待确认（Wave2 移交）：约 12 类潜在事项尚未登记 `00_META/Blocker-Register.md`，待主线程补登记后暂缓 C/D 类。
