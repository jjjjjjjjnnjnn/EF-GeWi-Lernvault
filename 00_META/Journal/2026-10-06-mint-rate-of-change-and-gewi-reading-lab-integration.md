---
datum: 2026-10-06
thema: "Cluster 3 变化率与动力学守恒沙盘攻坚及文科微课挂载 GeWiReadingLab"
typ: journal
status: abgeschlossen
---

# 2026-10-06 Cluster 3 变化率与动力学守恒沙盘攻坚及文科微课挂载 GeWiReadingLab 总结

## 1. 任务背景与核心目标
按照用户明确指示，在建立基线全绿的基础上，依次攻坚推进两项核心任务并跑通四步闭环：
1. **任务一：攻坚跨学科沙盘 Cluster 3 ——「变化率与守恒律（Aenderungsrate & Erhaltungssaetze）」**：
   - 贯通数学（导数与瞬时变化率 $f'(x)$）$\leftrightarrow$ 物理（位移-速度-加速度导数关系与能量守恒）$\leftrightarrow$ 化学（化学反应速率 $v$ 与动态平衡勒夏特列）$\leftrightarrow$ 生物（生态种群增长率 $dN/dt$ 与酶促反应动力学）；
   - 沉淀跨学科核心研习宪法笔记；
   - 升级 `vernetzung.ts` 中 Cluster 3 节点详情与真题连接；
   - 同步 `00_META/INDEX.md`、`00_META/Glossar-DE-ZH-GeWi.md` 与对应词卡。
2. **任务二：互动微课深度挂载文科原典解剖台（GeWi Reading Lab）**：
   - 检查德语文学课件（浮士德、沃伊采克、席勒阴谋与爱情、卡夫卡变形记）与英语课件（麦克白、1984、推销员之死、马丁路德金演讲），将原典精读步骤无缝升级为 `[Werkzeug: text-analyse]`；
   - 在 `Reise.tsx` 中配置自动教具回退与多选段精准匹配；
   - 编写自动化单元测试验证挂载行为。
3. **任务三：四步闭环门禁与规范提交**：
   - 门禁全部全绿：`vault-check.py` PASS、`npx tsc -b` 0 报错、`vitest` 61 套件 / 421 测试 100% 通过。

## 2. 核心交付成果清单

### 2.1 任务一：理科跨学科变化率与动力学守恒沙盘
1. **八段式跨学科宪法笔记**：
   - 路径：`03_Mathe/Aenderungsrate-Erhaltungssaetze-MINT-Vernetzung.md`
   - 严格遵循 `Templates/Wissensnotiz-Template.md`：直觉破冰、SBF 机理解构、四大学科核心映射矩阵、解题三步走决策树、CN 变化率十字映射法、全真跨学科 24 BE 综合大题与采分点、易错对抗矩阵、学科双链。
2. **拓扑关联引擎升级**：
   - 文件：`App-EF-Lernvault/src/engine/vernetzung.ts`
   - 将 Cluster 3 叶子节点精确绑定至：
     - 数学：`mathe/if1/ableitung/lokale-aenderungsrate` ➔ `03_Mathe/Aenderungsrate-Erhaltungssaetze-MINT-Vernetzung.md`
     - 物理：`physik/if1/kinematik/diagramme-weg-zeit-geschwindigkeit` ➔ `04_Physik/Gleichfoermige-Bewegung-Training.md`
     - 化学：`chemie/if2/gleichgewicht-mwg/dynamisches-gleichgewicht` ➔ `05_Chemie/Kinetik-Gleichgewicht-Bio-Vernetzung.md`
     - 生物：`bio/if1/enzyme/rgt-regel` ➔ `05_Chemie/Kinetik-Gleichgewicht-Bio-Vernetzung.md`
   - 升级 AFB II/III 综合考评满分话术（德中双语）。
3. **全局索引、术语表与 Anki 卡片同步**：
   - `00_META/INDEX.md`：登记新笔记；
   - `00_META/Glossar-DE-ZH-GeWi.md`：增补 `lokale Änderungsrate`、`Fließgleichgewicht`、`Erhaltungssatz`；
   - `03_Mathe/Vokabeln-Anki/Mathe-EF-Basis.csv`：增补 4 张标准化专业词卡。

### 2.2 任务二：微课全量接入 GeWiReadingLab 文科原典解剖台
1. **微课步骤升级（Schritt 4）**：
   - `Deutsch-Drama-Faust-Gretchenfrage-L1.md` ➔ `[Werkzeug: text-analyse]`
   - `Deutsch-Epik-Kafka-Die-Verwandlung-L1.md` ➔ `[Werkzeug: text-analyse]`
   - `Deutsch-Drama-Spannungskurve-Freytag-L1.md` ➔ `[Werkzeug: text-analyse]`
   - `Englisch-Shakespeare-Monologue-Analysis-L1.md` ➔ `[Werkzeug: text-analyse]`
   - `Englisch-Dystopian-Fiction-1984-Brave-New-World-L1.md` ➔ `[Werkzeug: text-analyse]`
   - `Englisch-Drama-Death-of-a-Salesman-American-Dream-L1.md` ➔ `[Werkzeug: text-analyse]`
   - `Englisch-Political-Speeches-Civil-Rights-L1.md` ➔ `[Werkzeug: text-analyse]`
   - `Philo-Politische-Philosophie-Arendt-Banalitaet-des-Boesen-L1.md` ➔ `[Werkzeug: text-analyse]`
2. **App 客户端底层能力加固**：
   - `Reise.tsx`：升级 `getAutoToolForContext`，在文科语境下自动升级为 `text-analyse`；支持 `stepAus.werkzeug` 兼容映射；
   - `Blocks.tsx`：增加对未定义 blocks 的防御性保护，消除运行时 TypeError 风险。
3. **自动化端到端测试交付**：
   - `App-EF-Lernvault/src/modules/Reise.gewiReading.test.tsx`：覆盖浮士德与麦克白微课挂载 `GeWiReadingLab` 的真实 DOM 渲染与透镜按钮校验。

## 3. 门禁验证结果
- `python scripts/vault-check.py`：PASS（notes=408, csv_rows=1936, index_links=340, reisen=356, badnames=0, badglossar=0）；
- `npx tsc -b`：0 报错；
- `vitest`：61 个测试套件，421 个测试用例 100% 全部通过。
