---
datum: 2026-10-05
thema: "GeWiReadingLab 哲学与社科四部经典巨著扩充与微课程联动"
typ: journal
status: abgeschlossen
---

# GeWiReadingLab 哲学与社科四部经典巨著扩充与微课程联动总结

## 1. 任务背景与核心目标
贯彻“方向一：文科学科仿真与原典精读工坊升级”，在德语文学巨著三部曲（纳坦、阴谋与爱情、重逢与别离）落地的基础上，进一步深挖哲学（Philosophie）与社会科学（SoWi）的核心思想宝库：
1. **哲学（Philosophie）**：
   - 扩充托马斯·霍布斯（Thomas Hobbes）《利维坦》（*Leviathan*，自然状态、所有人对所有人的战争与绝对主权契约）；
   - 扩充汉娜·阿伦特（Hannah Arendt）《极权主义的起源》（*Elemente und Ursprünge totaler Herrschaft*，意识形态与恐怖、人之复数性与诞生性）；
2. **社会科学（SoWi）**：
   - 扩充马克斯·韦伯（Max Weber）《经济与社会》（*Wirtschaft und Gesellschaft*，权力与支配的界分、合法统治的三种纯粹类型、官僚科层制与奴役铁笼）；
   - 扩充尤尔根·哈贝马斯（Jürgen Habermas）《公共领域的结构转型》（*Strukturwandel der Öffentlichkeit*，启蒙市民公共领域理想、更好论据的无强制力量、大众媒介再封建化与协商民主）；
3. **微课程联动（Lernreise）**：
   - 升级 `App-EF-Lernvault/src/modules/Reise.tsx` 智能教具路由网关，自动识别德语、哲学、社科的学科篇目主题，实现狂飙突进诗歌、启蒙戏剧、霍布斯政治哲学、韦伯支配社会学等微课一键直接唤起对应的原典精读工坊。

## 2. 核心交付成果
1. **学术原典数据中心扩充 (`App-EF-Lernvault/src/data/readingLabRegistry.ts`)**：
   - 4 部社科与哲学经典巨著全部按照会考高阶标准录入，每部包含 16 行严谨德文学术原典、中文直译与义理对照、关键术语微观标注（如 *Ius naturale*, *Lex naturalis*, *Pluralität*, *Natalität*, *Bürokratie*, *Charisma*, *Räsonnement*, *Refeudalisierung* 等）；
   - 配备 4 套共 16 道覆盖 AFB I–III 的会考真题，均提供正解依据与文本锚点、干扰项逐项深度诊断、时代哲学脉络与 15 NP 满分德语 Klausursatz 答题模板。
2. **教具路由与微课联动升级 (`App-EF-Lernvault/src/modules/Reise.tsx`)**：
   - 德语工坊网关：智能挂载《智者纳坦》、《阴谋与爱情》、《重逢与别离》；
   - 哲学校验网关：支持霍布斯《利维坦》与阿伦特《极权主义的起源》自动对接；
   - 社科教具网关：支持韦伯《经济与社会》与哈贝马斯《公共领域的结构转型》自动对接；
   - 更新对应德语与社科微课中的 `[Werkzeug: gewi-reading]` 锚点。
3. **严格质量门禁验证**：
   - 在 `src/components/pedagogy/pedagogy.test.tsx` 中新增霍布斯、阿伦特、韦伯、哈贝马斯 4 个专项测试，测试集达到 29/29 100% 通过；
   - 全量回归测试：`npx vitest run` **59 个测试套件，407 个测试用例 100% 全部通过**；
   - 生产打包 `npm run build`：0 报错，耗时 6.04s；
   - 知识库合规校验 `python scripts/vault-check.py`：**PASS**；
   - 356 门交互微课程全量仿真 `python scripts/simulate-user-interaction.py`：**100% PASS**。

## 3. Git 纪律与提交状态
- `[Deutsch] Route Sturm und Drang and drama lessons to GeWiReadingLab excerpts` (commit `e0f6dd8`)
- `[Philo] Add Hobbes Leviathan and Arendt Totalitarismus to GeWiReadingLab` (commit `23d77ad`)
- `[SoWi] Add Weber Herrschaft and Habermas Oeffentlichkeit to GeWiReadingLab` (commit `2aba5c7`)
- 本次 Journal 独立落库 `[Meta]`。
