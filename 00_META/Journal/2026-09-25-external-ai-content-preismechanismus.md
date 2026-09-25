---
fach: ""
thema: "外部AI内容入库：SoWi Preismechanismus（Lernreise L1 + 八段式笔记 + 词卡）"
operatoren: []
klausurrelevant: false
datum: 2026-09-25
tags: [EF, Meta]
---

# 2026-09-25 外部AI内容入库：SoWi Preismechanismus

> 触发：按 `00_META/Lehrplan-Content-Spezifikation.md` §5【即用型外部 AI 批量提示词】执行一次端到端入库。

## 做了什么

1. **选题判定（重要）**：核对真实文件系统后确认，§1 缺口清单里的"紧缺知识笔记"**基本已全部产出**（S8 收官），真实缺口在 **`Lernreise/` 交互课程**（入库前仅 4 篇 vs 需求 30–40 篇）。
2. 选定 **SoWi / Preismechanismus und Marktformen**（IF "Wirtschaft & Markt"）：§1 明确点名 `Sowi-Preismechanismus-Markt-L1.md`，且库中**无**该主题专门笔记（仅 `Marktwirtschaft-Krise.md` / `Soziale-Marktwirtschaft.md` 附带提及）。
3. 产出并入库三件套：
   - `Lernreise/Sowi-Preismechanismus-Markt-L1.md`（提示词1：9 小节 Lesson-v3，8 个 Schritt + Fehlvorstellung；含 `[Werkzeug: balance]` 与 ASCII 供求十字图解）
   - `08_SoWi/Texte-Analyse/Preismechanismus-und-Marktformen.md`（提示词2：八段式 Wissensnotiz，含 EHZ/BE 与 CN 供求十字速画法）
   - `08_SoWi/Vokabeln-Anki/SoWi-EF-Basis.csv`：**追加 18 张**新词卡（Thema: Preismechanismus），未覆盖原 179 条
4. 三处同步：`00_META/INDEX.md`（主题索引 + 互动课程源）· `00_META/Glossar-DE-ZH-GeWi.md`（+15 行术语）· CSV。
5. 门禁：`python scripts/vault-check.py` → **PASS**（notes=361 csv_rows=1418 index_links=279 reisen=5 badnames=0 badglossar=0）。

## 关键判定：`.json` 不成立

用户提示把互动课程写成 `Lernreise/<fach>-<inhaltsfeld>-<thema>.json`，但实测三条证据一致指向 **`.md`**：
- `scripts/vault-check.py` 的 `check_reise()` 只 glob `Lernreise/*.md`，`.json` 完全不被校验；
- App `src/vault/loader.ts` 的 walker 只处理 `.md` / `.csv`，**无任何 `.json` 分支** → 写成 `.json` 客户端永远读不到；
- 规范 §2 / §5 提示词1 / `AGENTS.md §1` 均规定 `Lernreise/<Fach>-<Thema>-L1.md`。

结论：按 `.md` 生成，客户端第 7 模块（Reise）可直接实时呈现。

## 待办 / 阻塞

- [ ] 其余 §1 缺口 Lernreise（约 30+ 篇）待批量生产；建议每科优先挑"vault 内已标 `（待建）`"的主题。
- [ ] Musik 的 `Lernreise/Musik-Sonatenhauptsatzform-L1.md` 在 `Musik-Halbjahr-IF1-IF2.md` 中已标待建，但同主题笔记已存在，**只补课程不补笔记**。
- [ ] Musik 学期主题仍为 🟡（见 `Blocker-Register.md`），相关新内容须标 `⏳ 待确认`。
