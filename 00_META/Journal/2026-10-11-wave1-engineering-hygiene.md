---
fach: ""
thema: "Wave1工程卫生收尾8路：门禁WARN/模板对齐/gitignore/规范互冲/总纲/Skill/App令牌"
datum: 2026-10-11
tags: [EF, Meta]
---

# 2026-10-11 施工日志：Wave1 工程卫生收尾（8 路）+ 总纲数字统一口径

> 子任务收尾：新建本日志 + `00_META/INDEX.md` 仅 L19/L46 + `HANDOVER.md` 仅 L24/L197。
> 其余行与文件一律未碰，不 commit。

## 1. 做了什么（Was wurde getan）—— Wave1 工程 8 路

1. **vault-check 新 WARN**：Wave1 主线程为 `scripts/vault-check.py` 新增 5 类 warn-only 检查
   （WARN 永不计 ERR，门禁仍 PASS）。本次实测 `vergleich=0`，WARN 共 363 条：
   `stufe/kursart` 模板漂移 ×265 · 空 `[Werkzeug: <id>]` 占位 ×54（Musik/Sport/Philo 批次）·
   Lernreise Fach 前缀大小写分裂 ×42（Sowi-/Philo- 待统一为 SoWi-/Philosophie-）·
   INDEX 残留 9 步 Lesson-v3 表述 ×1（L19 已改，残留行在我拥有权之外，留 Wave2）·
   `Lesson-v3` 非 Enterprise-v5 ×1（SoWi Sinus-Milieus，已披露例外，属预期 WARN）。
2. **模板 / Agents 对齐**：`Templates/` 6 模板为唯一来源
   （Wissensnotiz/Fach/Anki-Karte/Klausur-Drill/Stunden-Nachbereitung/Kurs-Didaktik）；
   vault-check `EXEMPT_NAMES` 对脚手架模板豁免；本日志 frontmatter 按 INDEX Journal 约定
   （`fach:""` + thema 含 wave1 + tags 含 `[EF, Meta]`）。
3. **gitignore**：`.gitignore` 64 行覆盖 obsidian 状态 / `_Downloads/` / `data/` /
   apkg / 构建产物与签名密钥 / `scratch/`；Wave1 确认无新增需忽略项。
   当前唯一未提交改动为 `App-EF-Lernvault/src/index.css`（源码，属正常提交范围）。
4. **规范互冲**：App Tufte 黑白纸墨宪法（禁用绿字绿卡）vs `--success: #16A34A` 绿色令牌
   → 以行内契约注释解决（语义正确态用墨字 + 对勾图标，吉祥物三色仅吉祥物豁免），见 index.css diff。
5. **总纲**：`HANDOVER.md` L24 头行与 L197 门禁基线统一为同一口径
   （notes=420 / csv=1942 / reisen=361 / 术语 998 行 / 索引 382 / 94 套件 727 项）；
   `INDEX.md` L19（361 篇 / Enterprise-v5）与 L46（225 篇）同步。A–E 过期段不动，留 Wave3。
6. **Skill**：`Skills/` 3 考试导向 skill（klausur-drill / vokabel-trainer / texte-analyse）无变动；
   vault-check `SKIP_DIRS` 含 Skills，一致。
7. **App 令牌**：index.css 新增 `--ink-muted` / `--focus` 墨系令牌 + `--success` 使用契约注释；
   改动未提交，留主线程以 `[App]` 前缀独立 commit（含 `npx tsc -b` + build 验证）。
8. **待 Wave2 事项**：Wave1 剩余验证（vitest 94 套件 727 项 / tsc / build 三门禁复验）与
   HANDOVER A–E 过期段刷新（Wave3）移交主线程。

## 2. 真相链（Truth）

- `python -X utf8 scripts/vault-check.py` 实测：
  `notes=420 csv_rows=1942(bad=0) index_links=382(missing=0) reisen=361 vergleich=0 badnames=0 badglossar=0` → **PASS**
  （WARN 363 条全为 warn-only，不计 ERR，exit 0；分类明细见 §1.1）。
- `00_META/Glossar-DE-ZH-GeWi.md` 实算 998 行（pipe 表格行 969）。
- Wave0 日记（`2026-10-11-wave0-microlessons.md`）：94 测试套件 727 项全 PASS + tsc 零报错。
- L19 标签含义：Enterprise-v5 全量重构（360/361）+ 首批 5 门 v4 标杆 + 唯一 v3 例外
  （SoWi Sinus-Milieus 对比表结构）。

## 3. 阻塞（Blocker）

- 无阻塞。⏳ 待确认：S8-Noten-Index 标 225 篇（文件内 md 链接实数 226，差 1 为索引自链/模板链，
  沿用主线程口径 225，留 Wave2 复核）。
