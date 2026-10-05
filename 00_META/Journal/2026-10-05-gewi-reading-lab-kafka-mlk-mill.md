---
datum: 2026-10-05
thema: "GeWiReadingLab 卡夫卡《变形记》、马丁路德金《我有一个梦想》与密尔《功利主义》三大经典工坊扩充"
typ: journal
status: abgeschlossen
---

# GeWiReadingLab 卡夫卡、马丁路德金与密尔三大经典工坊扩充总结

## 1. 任务背景与核心目标
贯彻“方向一：文科学科仿真与原典精读工坊纵深拓展”，在德语戏剧/诗歌、哲学政治契约论与社会学经典落地的基础上，全面攻坚三大文科学科最核心的痛点考点：
1. **德语（Deutsch）——补齐散文叙事文学（Epik / Novelle）支柱**：
   - 录入现代主义与表现主义奠基巨著——弗朗茨·卡夫卡（Franz Kafka）《变形记》（*Die Verwandlung*，1915）；
   - 解剖限制性人物叙事（Personale Erzählhaltung）、冰冷公文写实笔调（Protokollstil）与超现实怪诞（Das Groteske）；
   - 深度联动异化劳动（Entfremdung der Arbeit）、焦虑重心倒错（Prioritätenverschiebung）与市民家庭功利性批判。
2. **英语（Englisch）——首次进驻非虚构政论演说分析（Political Speech Analysis）**：
   - 录入世界演说修辞丰碑——马丁·路德·金（Martin Luther King Jr.）《我有一个梦想》（*I Have a Dream*，1963 华盛顿大游行）；
   - 解剖商业金融扩展隐喻（Extended Financial Metaphor of Promissory Note & Bad Check）、四重首语从复（Anaphora）与感官肉体枷锁；
   - 架构亚里士多德修辞三角（Logos ↔ Ethos ↔ Pathos）与当代多元社会辩证评析（de jure vs. de facto）。
3. **哲学（Philosophie）——攻坚伦理学另一大支柱：功利主义（Utilitarismus）**：
   - 录入约翰·斯图尔特·密尔（John Stuart Mill）《功利主义》（*Utilitarismus*，1861）；
   - 确立四大功利支柱（后果、效用、快乐、普遍性），解构边沁纯量化算盘并确立质性快乐论（Qualitativer Hedonismus）；
   - 深入剖析“胜任的裁判官”（Kompetente Richter）、“苏格拉底之猪难题”以及自动驾驶算法伦理中功利论与康德尊严红线的终审对决。
4. **智能微课路由网关（Reise.tsx）全量升级**：
   - 德语、英语、哲学交互微课一键精准直达对应的原典精读工坊，彻底消除默认降级失真。

## 2. 核心交付成果
1. **学术原典数据中心扩充 (`App-EF-Lernvault/src/data/readingLabRegistry.ts`)**：
   - 3 部经典文献严格按照会考高阶标准录入，每部包含 16 行严谨德文/英文原典、中文直译与义理对照、关键术语微观标注（如 *Ungeziefer*, *panzerartig*, *promissory note*, *anaphora*, *qualitativer Hedonismus*, *kompetente Richter* 等）；
   - 配备 3 套共 12 道覆盖 AFB I–III 的会考真题，均提供正解依据与文本锚点、干扰项逐项深度诊断、时代思潮哲学脉络与 15 NP 满分德英高分答题模板。
2. **教具路由与微课联动升级 (`App-EF-Lernvault/src/modules/Reise.tsx`)**：
   - 德语工坊网关：智能挂载卡夫卡《变形记》（`kafka-verwandlung`）；
   - 英语工坊网关：智能挂载马丁·路德·金演说（`mlk-dream`）；
   - 哲学校验网关：智能挂载密尔《功利主义》（`mill-utilitarismus`）。
3. **严格质量门禁验证**：
   - 在 `pedagogy.test.tsx` 中新增 Kafka、MLK、Mill 3 个专项测试，测试集达到 32/32 100% 通过；
   - 全量回归测试：`npx vitest run` **59 个测试套件，410 个测试用例 100% 全部通过**；
   - 生产打包 `npm run build`：0 报错，耗时 6.19s；
   - 知识库合规校验 `python scripts/vault-check.py`：**PASS**；
   - 356 门交互微课程全量仿真 `python scripts/simulate-user-interaction.py`：**100% PASS**。

## 3. Git 纪律与提交状态
- `[Deutsch] Add Kafka Die Verwandlung excerpt and prose analysis workshop` (commit `ec7b2fe`)
- `[Englisch] Add Martin Luther King I Have a Dream excerpt and rhetorical analysis workshop` (commit `79e98ac`)
- `[Philo] Add John Stuart Mill Utilitarismus excerpt and qualitative hedonism workshop` (commit `6e684b6`)
- 本次 Journal 独立落库 `[Meta]`。
