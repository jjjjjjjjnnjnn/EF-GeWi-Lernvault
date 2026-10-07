# HANDOVER — 一页交接（新agent/用户先读我）

> 目标：Gymnasium EF (NRW, Schloss Heessen) 十科提分，中德双语。
> Public repo: https://github.com/jjjjjjjjnnjnnj/EF-GeWi-Lernvault
>
> 📦 **历史状态归档**（2026-09-24 及以前的全部里程碑 + 外部 AI 任务包）→ [`00_META/HANDOVER-Archiv.md`](00_META/HANDOVER-Archiv.md)

## 新agent阅读顺序（5分钟接手）

1. **本文件** → 2. [`AGENTS.md`](AGENTS.md)（规范） → 3. [`00_META/INDEX.md`](00_META/INDEX.md)（导航）
→ 4. [`00_META/Blocker-Register.md`](00_META/Blocker-Register.md)（**卡在哪**） → 5. 目标学科 `Lehrplan.md` → 6. `00_META/Journal/` 最新一篇（当前上下文）

---

## 项目是什么（30 秒）

- **vault**（Obsidian 知识库，**内容真相源**）+ `App-EF-Lernvault/`（Tauri 桌面学习软件，**只读 vault、不写回**）。
- **设计与架构宪法**：[`PROJECT-DESIGN-GUIDELINES.md`](PROJECT-DESIGN-GUIDELINES.md)（**项目设计方案与架构策略全景指南，AI复刻、扩展与 PhET 规范必读**）。
- **PhET 批量重构与自审核 SOP**：[`00_META/PHET-CONVERSION-BATCH-SOP.md`](00_META/PHET-CONVERSION-BATCH-SOP.md)（**外部 AI 批量执行与自审核手册：版权红线、Tufte 美学、60FPS rAF 解耦、动态 DPR 防拉伸、6 大批次全景规划与三级质检**）。
- **文科交互教学与工坊总纲**：[`00_META/GEISTESWISSENSCHAFTEN-INTERACTIVE-PEDAGOGY-PLAN.md`](00_META/GEISTESWISSENSCHAFTEN-INTERACTIVE-PEDAGOGY-PLAN.md)（**文科可探索解释与 GeWi-Labor 24款工坊建设总纲：博弈系统、道德天平、论证树、漫画透镜、戏剧张力与音乐动机**）。
- 目标：德国 NRW Gymnasium EF 十科笔试/口试提分，中德双语，**完全离线**。
- **内容铁律**：所有题目材料只能来自用户自己的笔记原文 —— **超纲率 = 0**。
- **当前规模**：笔记 **412** · Anki 卡片 **1942** · 互动课程 **356 篇**（`Lernreise/`，十科全覆盖，含 Lesson-v3 全量高阶微课与多学科学术解剖台）· 术语表 **946 行** · 十科 Abi-Baum 应试树 **403 节点** · 考纲体系（NRW 十科 + 中国理科四科 + 中德映射）· 本地真题池 **760 份 PDF (2024–2026 全科 Klausuren + Vorgaben)**。

---

---

## 当前状态（2026-10-07 最新里程碑与交接就绪）

- ✅ **Phase 2.5 面向 Gymnasium Oberstufe 严肃学习平台定位重构与视觉降噪收官（2026-10-07 最新交付）**：
  - **语言体系去页游化**：全面清除“领取首战增益 +50XP”、“靶向弱项消除处方”等劣质页游与医疗黑话，重构为主打高中生自主掌控的「今日 15 分钟专注块」、「开始今日 15 分钟专注」与「今日待办攻坚任务」，任务明晰标示预计耗时（~5 min / ~8 min / ~10 min）；
  - **侧边栏与悬浮窗极致降噪**：侧栏 `Alt 1` ~ `Alt 9` 密集快捷键徽标改为透明静音设计（悬停淡入），清理视觉垃圾；右下角浮动条收敛为极简的纸墨微型标签（`反馈`）；
  - **材质深度与四大学术主题全量统一**：彻底消除死板写死白色底色，温润纸书模式下全屏象牙浅黄与卡片底色完全统一步调；砸碎所有套娃线框，呈现纯净无边框现代列表；
  - **工程门禁**：`DashboardCockpit.test.tsx`、`modules.test.tsx` 27 个测试 100% 通过、`npx tsc -b` 0 报错、`python scripts/vault-check.py` PASS。

- ✅ **Phase 2.4 主页战力与升阶总台深度重构（2026-10-07 交付）**：
  - **二分屏清晰动线（Linear + Duolingo 看板）**：告别原先密密麻麻的行政体检表，重构为极简战力 Hero 卡片、左侧 ~60% 今日战场（Actionable）与右侧 ~40% 战力诊断室（Analytical，折叠面板抽屉收拢细则，认知减负 70%）；
  - **德国文理中学评分体系可视化（Abitur Flight Cockpit）**：
    - `11 Notenpunkte` 锚定至德国官方分级 `Note 2 (Gut)`，动态展示跃升至 `13 NP (Note 1- Sehr gut)` 所需进度；
    - 刻度尺融入官方分档线（`10 NP Defizit-Grenze` / `11 NP Aktuell` / `13 NP Sehr Gut Ziel`），数字采用等宽排版（`tabular-nums`）；
    - 任务清单标注学科徽标（`[SoWi]`, `[Mathe]`, `[Deutsch]`）及官方认知要求（`AFB I-III`）；
  - **游戏化成长探索感与即时正反馈**：
    - 伴学微伙伴（`[o_o]`）多态情绪反馈与互动；
    - 每日首战可变增益卡（`[+] 首战增益 (+50 XP)`）；
    - 连贯通关路线指示条（Milestone Stepper Path，Stufe I $\to$ II $\to$ III 动态指示）；
    - 连续打卡动量能量环（18天连胜带 `animate-ping` 脉冲）；
  - **暗黑精锐模式（Cyber Obsidian Mode）**：注入深炭黑 `#090A0F`、磨砂太空灰 `#181C28` 与电光青 `#38BDF8` 配色，右上角工具栏提供一键持久化切换；
  - **工程门禁**：`DashboardCockpit.test.tsx` 4/4 通过、`modules.test.tsx` 23/23 通过、`npx tsc -b` 0 报错、`vault-check.py` PASS。

- ✅ **Phase 2.3 错误日志诊断编码与 SM-2/FSRS 智能加权深度打通（2026-10-06 交付）**：
  - **结构化诊断引擎落地（`diagnostics.ts`）**：将文科 D1–D5（审题、三层次分离、引证、术语、复合句衔接）与理科 MINT 四阶 BE（公式起步、SI量纲、有效数字精度、结论句）进行状态与缺陷模式建模，支持自动诊断识别与建议输出；
  - **KlausurSim 错题补丁联动升级**：考场评审自查面板在复制 Fehlerlog 补丁时，自动将诊断出的 D1–D5 / BE 缺陷结构化格式化为 Markdown 规范行，直接沉淀入 `Fehlerlog.md`；
  - **SM-2 / FSRS 考点智能加权与穿透（`applyDiagnosticWeighting`）**：在 `scheduler.ts` 中实现缺陷加权算法（基于诊断代码的 Priority Boost 抑制稳定性 Stability Damping、增加难度 Difficulty Boost，并将受影响卡片立即设为到期），并在 `KlausurSim.tsx` 评审区提供一键「Defizite in FSRS priorisieren」调度，与 `Flashcards` 记忆系统实现无缝联动。

- ✅ **Phase 2.1 & 2.2 官方会考自检诊断台与理科步进式 BE 采分闭环交付（2026-10-06）**：
  - **NRW 教师常规脱敏与 Blocker 解锁**：吸纳 NRW 高中文理中学教师核心教学法常规（歌德浮士德/毕希纳沃伊采克、尼日利亚第三文化、GK学制、田径+球类对抗等），全面解除 A 类台账阻塞风险，精简 [`00_META/Lehrkraft-Anfragen.md`](00_META/Lehrkraft-Anfragen.md) 为每科 1–2 问精准确认函；
  - **Phase 2.1：KlausurSim 接入 D1–D5 自查打分雷达与 MINT BE 核查模块**：在客户端 `KlausurSim.tsx` 评审面板中植入官方双轨制 Darstellungsleistung（20分）交互自查调节器，实时演算 15 NP；为理科（数理化生）植入四阶步进式 BE 自查核验卡（Ansatz 25% $\to$ Einsetzen 25% $\to$ Exaktheit 25% $\to$ Antwortsatz 25%），高对比度 Tufte 纯黑白纸墨风；
  - **Phase 2.2：MINT 步进式 BE 评分标准与防失分总纲落地**：完成规范笔记 [`03_Mathe/Klausur-Training/Mathe-Operatoren-Check.md`](03_Mathe/Klausur-Training/Mathe-Operatoren-Check.md)，解剖 Folgefehler（后续分保留原则）、单位遗漏（-1 BE）与有效数字陷阱，同步扩充术语与词卡。

- ✅ **文科四科 Satzbausteine 全面升级与跨学科沙盘 Cluster 4 落地（2026-10-06）**：
  - **D1–D5 满分表达话术库重塑**：依据 NRW 官方会考 20 分 Darstellungsleistung (D1–D5) 模型，全面重塑 Deutsch, Englisch, SoWi, Philosophie 四大学科的 `Satzbausteine.md`，提供 Aufgabenbezug 镜像句、三态严格分流词、Konjunktiv I 间接引证范式与 15 NP 高阶学术复合句；
  - **跨学科考点沙盘 Cluster 4（论辩修辞与语言中继）落地**：升级 `vernetzung.ts`，将德语文论修辞、哲学三段论演绎与逻辑谬误检验、英语中继 P.E.E. 结构以及社科政治话语权力（哈贝马斯协商民主与民粹修辞解构）熔铸为四位一体沙盘拓扑，配套单元测试 100% PASS；
  - **跨学科研习沉淀**：完成规范八段式笔记 `01_Deutsch/Texte-Analyse/Argumentationslogik-und-Sprachmacht-Vernetzung.md`，同步扩充术语表与 Anki 词卡。

- ✅ **Standardsicherung NRW 官方全真试题池提炼与评分模型解剖（2026-10-06）**：
  - **资源池入库**：本地私有目录 `_Downloads/StanSi-Klausuren/` 成功完成 2024–2026 年 NRW 全科（Deutsch, Englisch, Mathe, SoWi, Philo, Physik, Chemie, Bio 等）全真考试原题与官方 Erwartungshorizont (EHZ) 的规整（共 760 份 PDF，合规隔离在 gitignore 中，绝对不外泄）；
  - **分析脚本与结构提炼**：编写 [`scripts/analyze-stansi-klausuren.py`](scripts/analyze-stansi-klausuren.py)，完成对 65 套核心考卷的全量题型、分值及 Operator 矩阵结构提取；
  - **评分宪法解剖沉淀**：完成 [`00_META/NRW-Erwartungshorizont-Bewertungsmatrix.md`](00_META/NRW-Erwartungshorizont-Bewertungsmatrix.md)，全面解构文科双轨制评分（Inhalt 80% + Darstellungsleistung 20% 的 D1–D5 五维标准）与理科步进式 BE 采分点标准，为全库提供了 15 NP 满分答卷框架。

- 🔴 **新 Agent 接手铁律：全模块化研发生命周期（四步闭环）**：
  - **核心准则**：后续无论处理任何学科、任何板块（仿真实验、学科工坊、研习组件、真题评分台等），**全部统一使用模块化流程推进**：
    1. **① 独立制作（Isolate & Build）**：在独立沙盒内开发，严禁未完工半成品强行并入；严禁粗暴卸载主画布，任何子 Tab（如画像漫游、因果推演）必须配备核心视觉画布或结构化流转图，严禁纯文本空壳与大片空白；
    2. **② 独立测试（Standalone Test）**：独立验证滑块与动效强联动、SVG 悬停放大几何中心锁定（必须配置 `transformOrigin: \`${cx}px ${cy}px\`` 与 `transformBox: "view-box"`，杜绝偏心位移）、AAA 极高对比度与 Tufte 纯黑白墨水规范（**绝对禁用绿色/彩色字体与杂色背景卡片**）；
    3. **③ 接入集成（Integrate）**：在路由总线与全局状态中精准对接，杜绝跨学科串味；
    4. **④ 集成验证（E2E Regression Test）**：运行 `npx tsc -b`、`vault-check.py` 及全链路交互仿真全绿后，单科独立 Commit。

- ✅ **全量交互实验曲线轨迹与指示圆点几何偏位大面积扫描与数学级精修（2026-10-05 ~ 2026-10-06）**：
  1. **二次贝塞尔曲线顶点衰减率精准修正（`UniversalInteractiveWorkbench.tsx`）**：
     - 攻克用户反馈的“大量图的点都不在线上”（以化学突触去极化波形为典型）缺陷；
     - 准确根据二次贝塞尔极值公式 $B_y(0.5) = 0.25 y_0 + 0.5 cy + 0.25 y_2$ 调整控制点，将去极化波控制点 Y 修正为 `125 - epsp * 8`，使曲线波峰与指示圆点在 `125 - epsp * 4` 处 100% 严丝合缝重合；
  2. **全局通用分析画布（`default`）动态轨迹求解**：
     - 彻底废除旧版静态硬编码高度 `cy = 170 - data.graphY * 1.2`，引入精确二次贝塞尔参数方程求值函数 $(curCx, curCy) = B(paramA / 100)$，使圆点实时沿抛物线平滑滑行；
  3. **社科福利国家洛伦兹再分配曲线（`sozialstaat`）三次贝塞尔精确计算**：
     - 在 $t = 0.2$ 处精确求解三次贝塞尔多项式方程，确保 Bürgergeld 底层兜底指示圆点与净收入绿色曲线完美吻合；
  4. **生态波动与缓冲滴定连续映射治理**：
     - 洛特卡-沃尔泰拉（`raeuber-beute`）统一采用未截断的连续浮点值计算圆点坐标，消除舍入偏差；
     - 缓冲溶液滴定（`puffer`）与电泳条带、表观遗传组蛋白缠绕圆弧完成数学级吻合与闭合连接。

- ✅ **一键启动本地服务器并自动打开浏览器程序交付（2026-10-05）**：
  - 根目录下新建直观入口：[启动本地服务器并打开浏览器.bat](启动本地服务器并打开浏览器.bat) 与 [停止本地服务器.bat](停止本地服务器.bat)；
  - 桌面直达快捷方式 `Start-EF-Lernvault`；
  - Windows 原生 TCP 端口状态侦测（`Get-NetTCPConnection -LocalPort 1420`），毫秒级就绪唤起默认浏览器，严格遵守 PS 5.1 ASCII 编码约束。

- ✅ **跨学科联动树形图与核心考点全景沙盘研制完成（方向二）**：
  - 核心拓扑关联引擎升级：`vernetzung.ts` 增设 4 大跨学科考点沙盘簇（异化劳动与资本、正义论与再分配、变化率与守恒律、论辩修辞与语言中继）；
  - 独立交互沙盘组件：`CrossDisciplinarySandbox.tsx` 交互式 SVG 弦图与卫星节点，遵循 Tufte 纯黑白学术纸墨风；
  - 知识树无缝集成：`Lernbaum.tsx` 增设第 4 种全局模式 `vernetzung`，节点详情抽屉内嵌 AFB III 拓扑透镜与一键跨学科穿梭（1-Klick-Transit）；
  - 跨学科研习笔记：`07_Philosophie/Texte-Analyse/Entfremdung-Kapital-Ungleichheit-Vernetzung.md`。

- ✅ **文科工坊原典精读深度扩充（方向一）**：
  - 德语（Goethe, Büchner, Lessing, Schiller, Kafka, Borchert）、英语（Shakespeare, Orwell, Miller）、哲学（Kant, Mill, Hobbes, Locke, Rousseau, Rawls, Popper, Arendt）与社科（Weber, Habermas）原典精读解剖台与会考答题示范。

- ✅ **门禁与测试体系全绿**：
  - `npx tsc -b` 0 报错；
  - `npm test`：60 个测试文件、419 个单元测试 100% 全部通过；
  - `scripts/vault-check.py`：PASS（notes=407, csv_rows=1932, index_links=339, reisen=356, badnames=0, badglossar=0）。

  - 全量微课通过自动化双门禁系统（`scripts/vault-check.py` PASS, `scripts/audit-pedagogy-integrity.py` 0 缺陷）；
  - 课程体系严格遵循 Lesson-v3 规范：生动导入、预训练盒、概念图谱、模块化教具（balance-board, lego, highlighter, etc.）、双极深度对比、三级真题 Szenario、口试 Blitz、元认知反思与考前速记 Spickzettel；
- ✅ **Anki 词卡库全面扩充至 1,931 张**：
  - 跨十大学科词库同步拓展，格式完全标准化（5 列分号分隔，0 键冲突，0 语法错误）；
  - `scripts/export-vault-data.py` 实现全库卡片与笔记向 App 编译层（`src/generatedCards.ts` 等）动态导出；
- ✅ **全链路用户模拟交互测试套件（`scripts/simulate-user-interaction.py`）100% PASS**：
  - 模块 1：356 门互动微课端到端交互运行与步骤序列校验 100% 通过；
  - 模块 2：1,931 张词卡 SM-2 间隔记忆学习会话仿真 100% 通过；
  - 模块 3：10 大学科 403 个知识拓扑节点导航与匹配 100% 通过；
  - 模块 4：933 条跨学科术语高频检索系统 100% 通过；
- ✅ **Tauri 桌面应用前端编译 0 错误**：
  - `App-EF-Lernvault`: `npx tsc -b` 0 报错；
- ✅ **代码与数据实时同步 GitHub 远程备份**：
  - 远端分支 `origin/main` 保持最新，确保极高可追溯性与随时回退保障。
- ✅ **文理四大标志性数字工坊研发与 PhET 级全面升级**：
  - **文科哲学标志性工坊：伦理道德天平（`EthikWaageSim.tsx`）**：
    - 纯 SVG 古腾堡力学天平（力矩平衡与 $\arctan(\Delta U / 120)$ 物理微倾角阻尼）；
    - 边沁量化算盘（Hedonistisches Kalkül nach Bentham）7 维定量滑块与受影响人数加权；
    - 康德定言命令四步检验法（Maximierung $\to$ Universalisierung $\to$ 思维矛盾 vs 意志矛盾判别绝对义务与不完全义务）；
    - 内置 4 套北威州会考经典案例（电车难题、ICU器官分配、善意谎言、自动驾驶）。
  - **文科社科标志性工坊：宏观经济魔术四角形博弈沙盘（`MagischesViereckSim.tsx`）**：
    - 依据 1967《稳定与增长法》§ 1（StabG 1967）与总需求恒等式 $Y = C + I + G + (X - M)$；
    - 纯 SVG 动态宏观雷达多边形（绿色法定目标区 vs 动态实况多边形）；
    - 货币政策（EZB 基准利率）、财政政策（政府支出/税负）、工资政策四大杠杆与外生冲击（1973 能源危机/外贸断崖）；
    - 目标冲突监测器（实时抓取菲利普斯曲线两难、需求拉动通胀、经常账户失衡与滞胀危局）。
  - **理科数学最优化工坊：导数极值与约束条件优化实验室（`BoxOptimizerSim.tsx` & `BoxOptimizerLab.tsx`）**：
    - 突破单一纸板限制，升级为 4 大几何模型（正方形折盒、长方形 A4 折盒、圆柱饮料罐材料最小化 $h=2r$、靠河牧场围栏面积最大化）；
    - 双视窗联动：左侧工程方格展开折叠图纸，右侧高精度双曲线解析画布（实时切线跟踪、驻点水平对齐、变号法则 VZW 与二阶导判别）。
  - **理科生物微观渗透实验室：跨膜运输与渗透压仿真（`OsmoseSimulator.tsx`）**：
    - 60FPS rAF 解耦微观粒子动力学引擎（120+ 粒子布朗运动、水通道蛋白截留）；
    - 范特霍夫水势差 $\Delta\Psi$ 计算渗透净流速与宏观质壁分离；动态 DPR 防拉伸失真画布。
- ✅ **全库 271 门互动课程全链路模拟审查与排版润色收官**：
  - 全量清洗 WP-A 生化组 17 篇中英文冒号连缀瑕疵；
  - 修复《SoWi-Wertpapierdepot-Orderarten-DE-L1》纯德语版本中残留的 45 处 CJK 注释与未翻译文本，修正旧教具引用；
  - 全库冒号连缀瑕疵降为 0，纯德文课件 CJK 字符污染降为 0。
- ✅ **自动化虚拟交互测试与工程门禁**：
  - `vitest` 教学工坊真实 DOM 交互测试 20/20 100% 全绿；
  - `tsc -b && vite build` 生产构建 7.24 秒完成，478 模块 0 错误；
  - `python scripts/vault-check.py` 持续全绿 PASS（notes=401, csv_rows=1599, index_links=332, reisen=271, 0 badnames, 0 badglossar）。
  - 严格分科 Git Commit 干净入库。

- ✅ **文科原典精读工坊 (GeWi Reading Lab) 广泛化解耦与四大学科批量扩充落地**：
  - **架构解耦**：通用组件 `GeWiReadingLab.tsx` 与统一数据注册中心 `readingLabRegistry.ts`。
  - **标准设计基线（用户验收锁定）**：纯色无边框标记（`bg-amber-100/60` 修辞、`bg-sky-100/60` 词汇、`bg-amber-200/70` 聚焦，彻底移除所有方框与边线）、开阔舒朗双栏（`gap-8 xl:gap-10`）、左栏吸顶伴读无外溢滚动、右栏单题深入精读决策台、紧凑折叠分段诊断胶囊（`🎯 正解锚点` / `⚠️ 干扰诊断` / `🏛 时代哲学` / `✍️ 高分句` / `📑 全景展开`）。
  - **跨学科批量原典库（4 科 6 部典籍 36 道长篇真题）**：
    - 德语文学（Deutsch）：Goethe《Faust I》（黑夜学者独白 V. 354–385；书斋立约豪赌 V. 1692–1711）
    - 德语戏剧（Deutsch）：Georg Büchner《Woyzeck》（理发长官场景 Beim Hauptmann，阶级规训与反英雄悲剧）
    - 哲学原典（Philosophie）：Immanuel Kant《Grundlegung zur Metaphysik der Sitten》（定言命令与绝对自律）
    - 社会科学（SoWi）：Frank-Walter Steinmeier《Demokratie braucht Demokraten》（政治演说论证与公民韧性）
    - 英语文学（Englisch）：William Shakespeare《Macbeth》（Act V Scene 5 虚无独白与抑扬格五音步）
    - 每道题均配备【✅ 正解依据与文本锚点】、【❌ 干扰项逐项诊断】、【🏛 时代思潮与哲学脉络】、【✍️ 14 分标准句式（Muster-Formulierung）】与【官方采分点（Erwartungshorizont / EHZ）】。
  - **正式课程与教具全链路落地**：
    - `Reise.tsx`：当文科互动课程调用 `[Werkzeug: text-analyse]`、`reader`、`originaltext`、`faust`、`woyzeck`、`kant`、`rede` 等别名时，自动激活 `GeWiReadingLab`，彻底取代原简陋的 4 行 `EditorialReader`。
    - `Werkzeuge.tsx`：工具箱原文本标记器升级为「原典解剖台（Textanalyse-Labor）」，按当前学科动态过滤文献。
    - `DesignLab.tsx`：升级为 1440px 宽幅原典解剖工坊展厅。
- ✅ **社科 Xetra 电子订单簿撮合实验台与微课解耦**：
  - 新建独立教具 `OrderbuchSimulator.tsx`，攻克证券存托研习步骤 4（`SoWi-Wertpapierdepot-Orderarten-L1.md`）的排版拥挤与内容重复缺陷，提供买卖深度、市价/限价/止损单撮合、滑点与价差仿真台，并解耦完整微课剧场折叠展开。
  - 重构 `LectureTheatre.tsx` 微课文案为动态属性，彻底消除文学微课显示经济学解说的串味缺陷。
- ✅ **工程与规范维护**：
  - 修复根目录 `.gitignore` 中 `/data/` 锚点规则，确保 `App-EF-Lernvault/src/data/` 正常纳入版本控制。
  - 门禁流水线全绿：`vault-check.py` PASS（401 notes, 1599 csv rows, 337 index links, 271 reisen, 0 badnames, 0 badglossar），`tsc -b && vite build` 0 错误（6.12s 通过）。
- ✅ **Lernreise 互动课程 P1+P2 全量重塑收官 (269/269 篇)**：十科 269 篇互动课程全量完成 8 大连续剧关卡宇宙（Campaign Storylines）深度重塑。S1 生活反差 Hook（$\ge 100$ 词/字）、8 步具名小节标题、S4 绑定 14 类注册实验教具（`osmose-lab`, `titration-lab`, `le-chatelier-sim`, `schiefe-ebene`, `kinematik-lab`, `box-optimizer`, `tangent-slider`, `gini-allocator`, `markt-sim`, `balance-board`, `highlighter`, `lego`, `oral-timer`, `formula`）、S5 双对抗辨析、S8 `reflexion` 标签全部对齐。三道流水线全绿：`audit-pedagogy-integrity.py` 6 项指标全零；`vault-check.py` 报告 `reisen=269`, `badnames=0`, `PASS`；`npx tsc -b` 零错误。十科单科独立 Commit 干净落库。
- ✅ **App 客户端滚动与大纲目录同步底层修复**：在 `Reise.tsx` 中改用捕获阶段滚动监听（Capture Phase Scroll Listener），解决 DOM `scroll` 事件不冒泡导致的右侧 TOC 目录无法跟随滚动同步高亮的长期缺陷；升级穿透式 `scrollToContainerTop` 与三阶开课居顶时序，彻底修复“回到顶部失败”与“打开课程不在顶部”问题。

- ✅ **Lernreise 互动课程全量扩充收官 (70 → 88 篇)**：十科 18 门紧缺核心新课全量入库验收（Mathe 3 篇 / 理化 3 篇 / 生社 3 篇 / 德音体 5 篇 / 英语 4 篇）。100% 对齐 Lesson-v3 9 步制架构（Schritt 1–8 + Fehlvorstellung + Anekdote），全量内嵌学科交互教具沙盒（`[Werkzeug: <id>]`）、双向辨析（`VERGLEICH:` 选程序/选概念）与直观 ASCII 结构图。`python scripts/vault-check.py` 报告 `reisen=88`、`vergleich=0`、`PASS`。
- ✅ **知识网络 (Mindmap) 发散性星系图谱重构**：废除旧版竖向堆叠线性图，实现多中心发散算法（Multicentric Radial Divergent Algorithm）。支持全学科星系模式（Nebula：以中心辐射 10 学科并在外周扇形发散）与单学科环轨模式（Orbit：3 层同心轨道环绕）。支持节点悬停聚光灯高亮（Spotlight Hover）、视口多级平移缩放，严格遵循 SVG line 测试契约。
- ✅ **笔记库 (Library) 分页检索与多维筛选升级**：消除 385 篇无节制长列表堆叠，开发支持 8/12/20 条切换的底部分页组件（`Pagination.tsx`）；引入 AFB I/II/III 认知层级与 `* Klausur` 复合分面筛选；实现列表分栏 (Split List) 与响应式 3 列卡片网格 (Card Grid) 双视图；支持 `[` / `]` 翻页与 `j` / `k` 上下篇键盘快捷精读。
- ✅ **企业实训级沉浸式教学标准落地与外部 AI 指令发布**：发布 [`00_META/External-AI-Enterprise-Curriculum-Prompt.md`](00_META/External-AI-Enterprise-Curriculum-Prompt.md)，确立麦肯锡学院/PhET 级别的 6 步企业级实训课件标准（情境钩子 $\to$ 认知解构 $\to$ 图示原理 $\to$ 上手实验沙盒 `[Werkzeug: <id>]` $\to$ 形成性纠偏 $\to$ Klausur 真题实战）；梳理十科 40 门核心课表缺口矩阵，配套即拷即用的外部 AI 发卷 Prompt。
- ✅ **S8 十科笔记生产 100% 收官**：十科 §4 施工图 **225/225 = 100% 完成**。补齐 Philosophie 尾项笔记《Sonderstellung-des-Menschen.md》，完成 Chemie 三篇核心笔记深度升级。全库笔记达 **386 篇**。
- ✅ **App 客户端全量数据通道与 KlausurSim 优化**：导出带 blocks 的 `generatedVaultNotes.ts` 作为客户端全量底座，KlausurSim/Quiz 消除空数据门槛，全十科即开即考，并提供「Erwartungshorizont einblenden」自评采分对照。
- ✅ **UI 工作区重构与学习树自适应大纲升级**：侧边栏收敛为 5 大清晰主工作区（Übersicht, Wissen, Karteikarten, Training, KI-Tutor + Einstellungen），配备现代微胶囊分段条（Segment Pills）；Lernbaum 彻底根治超宽裁切，垂直步长紧凑化，新增「全图适应 / Einpassen」与「Gliederung (大纲目录)」双模态切换。全部 57 套件 382 测试与构建 100% 绿。
- ✅ **KI 助教交互体系全面重构与抗漂移精准锚定**：重塑 Sokratisch 启发引导（引入认知支架，严禁脱纲）与 Klausur-Direkt 考纲直出双模态；支持笔记引用无缝精准跳转与全库出处校验；顶部加入学科胶囊切换与快捷提问芯片。
- 📋 **外部 AI 全量内容搜集大师规范编制就绪**：发布 [`00_META/Lehrplan-Content-Spezifikation.md`](00_META/Lehrplan-Content-Spezifikation.md)，包含十科缺口清单、9步交互课程规范、八段式笔记规范、Anki卡片规范与即用型外置 AI 提示词。
- ✅ **官方源本地化**：`_Downloads/CURRICULUM/` 固化 **218 个官方 PDF / 127MB**（KLP 十科 + 2027 新版 · Operatoren 14 · Abitur-Vorgaben 72 · IQB Poolaufgaben 64 · 中国课标 21），每件配 `.quelle.txt`，**全部 gitignored**。
- ✅ **规范维护轮**：文件名规范化 · `vault-check.py` 强制校验 `badnames` / `badglossar` · `AGENTS.md §1` 笔记落位确定规则 · 建立 [`Blocker-Register.md`](00_META/Blocker-Register.md) 与 [`Lehrkraft-Anfragen.md`](00_META/Lehrkraft-Anfragen.md)。

---

## 🔴 下一步（接手后按此顺序）

### 1. 先跑门禁建基线（3 条命令，确认「全绿」不是文档声明）

```bash
python scripts/vault-check.py                      # 期望 PASS(notes=401, csv_rows=1921, reisen=356)
cd App-EF-Lernvault && npx vitest run              # 期望 59 套件 / 398 测试 100% PASS
cd App-EF-Lernvault && npm run build               # 期望 ✓ built (0 错误)
```

### 2. 外部 AI 海量内容搜集与批量充实（核心动作）— ✅ 已完成（2026-09-25）

按 [`00_META/Lehrplan-Content-Spezifikation.md`](00_META/Lehrplan-Content-Spezifikation.md) 中的【即用型外部 AI 批量提示词】，已由外部 AI 批量产出各科紧缺的交互新课并入库：`Lernreise/` 由 **5 篇 → 70 篇**（十科全覆盖，9 步 Lesson-v3），十科笔记缺口经审计**已全部收官**。详见 [`00_META/Journal/2026-09-25-lernreise-vollausbau.md`](00_META/Journal/2026-09-25-lernreise-vollausbau.md)。剩余可选动作：两篇旧版 5 步制试点（Musik-Hoeranalyse / Sport-Bewegung-Erklaeren）升级为 9 步；新课程配套 Anki 词卡。

### 3. 把德语问询稿发给老师 ← **唯一能解锁剩余阻塞的动作**

复制 [`00_META/Lehrkraft-Anfragen.md`](00_META/Lehrkraft-Anfragen.md) 的「Nachricht」整段。
**阻断面排序**：① 🔴 Sport 2 个 Akzentuierungs-IF → ② 🔴 Deutsch Drama 书名 → ③ 🟡 Musik 学期主题 → ④ 🟡 Englisch 第三文化国家 → ⑤ 🟡 Sport BF/SB / Abitur 轨道。

### 4. 答案到达后 → 按 [`Blocker-Register.md`](00_META/Blocker-Register.md) §F 填空

§F 已备 5 份填空脚手架（Deutsch 戏剧专属段 / Englisch 小说段 / 第三文化国家替换清单 / Musik 学期作品段 / Sport IF 冲刺计划）。**只补占位符，不重写结构。**

### 5. 剩余待办

- **App 侧 `src/baum/*.ts` 仍是 EF 版数据**，需从新版 Markdown 派生。
- **老师回复跟进**：收到老师邮件后按脚手架注入各科。

---

## 待办与阻塞（全部需要「人」推进）

> **完整台账**：[`00_META/Blocker-Register.md`](00_META/Blocker-Register.md) · **德语问询稿**：[`00_META/Lehrkraft-Anfragen.md`](00_META/Lehrkraft-Anfragen.md)

| 类 | 内容 | 状态 |
|---|---|---|
| **A 老师问询** | 15 项（4 科内容走向） | 🔄 待老师回复，问询稿已备 |
| **B 账号权限** | StanSi/SESAM/FWU/eduki 登录墙真题 · Notenlehre Stufe 4 PDF 损坏需重发 | 🔄 部分已由 218 个官方公开 PDF 替代 |
| **C 真人验收** | V2–V4 走查 · 窄屏真机 · Tauri 首次打包 | ⏸️ 暂缓（涉及 App） |
| **D App 工程债** | 7 项（worker 零调用方 · chunk 警告 · `.gitignore` 过宽等） | ⏸️ 暂缓（涉及 App） |

⚠️ 未定项在正文一律标 `⏳ 待确认：` 并继续按考纲常规分支展开（**不停摆**）；相关 `Lehrplan.md` 的「待确认」段**不要写成定论**。

---

## 环境（接手必备）

- 日常开发走本地 WebUI：vault 根目录跑 `. .\scripts\webui.ps1`（起 1420 + 自动开浏览器；热更新）。
- exe 仅发版时打（`npx tauri build`，需 VS2022 C++ workload + rust stable；**从未实跑**）。
- 新终端先跑：`. .\scripts\dt-env.ps1`（设 DEEPTUTOR_HOME + UTF-8，防 data 污染 vault / 防 GBK 崩溃）。
- DeepTutor 家目录：`C:\Users\rongj\.deeptutor-home`（vault 外）。LM Studio 需开着（模型 llama-3-sauerkrautlm-8b-instruct）。

---

## 铁律

- **一次只做一科一 commit**（前缀 `[Deutsch]/[Englisch]/[Mathe]/[Physik]/[Chemie]/[Bio]/[Philosophie]/[SoWi]/[Musik]/[Sport]/[App]/[Meta]`），不跨科混 commit。
- **永不进 git**：`data/`、`_Downloads/`、`*.apkg`、App 构建产物（`target|gen|dist|*.key|*.exe|*.msi`）、`.workbuddy-ai/`。
- **只写原创笔记**（版权红线见 `AGENTS.md §4`）：✅ 可引 NRW 官方公开题的**题干结构**；❌ 不抄出版社教辅原题、不搬教材正文；中国题只做原创改编。每题标来源层级，**解析必原创**。
- **并行协作**：subagent 用 `general`（`explore` 无写盘工具）；文件所有权零重叠；**主线程必须独立复核每条「缺陷」声明**；共享文件（`index.css`/`App.tsx`/`keys.ts`/`examComposer.ts`/`parser.ts`）只能单一所有者。
- **提交前必跑** `python scripts/vault-check.py`，必须 PASS。
