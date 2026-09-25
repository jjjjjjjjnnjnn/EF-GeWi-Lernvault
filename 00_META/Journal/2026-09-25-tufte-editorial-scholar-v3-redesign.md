---
fach: Meta
thema: "Tufte Editorial Scholar v3 UI与信息架构重构"
operatoren: [analysieren, implementieren, optimieren]
klausurrelevant: false
datum: 2026-09-25
tags: [EF, Meta]
---

# Tufte Editorial Scholar v3 UI与信息架构重构

> 日期：2026-09-25
> 状态：✅ 全部通过（57 个测试套件 379 项单测 100% 绿、npm run build 零错误、vault-check 校验通过、开发服务器 1420 稳定运行）

---

## 1. 痛点定位与设计调研

针对用户指出的「目前排版不好、界面太乱太复杂」的核心诉求，进行了同类优秀学术、阅读与知识管理产品（Edward Tufte CSS、Obsidian Minimal、Readwise Reader、iA Writer、德国本地学习软件 Simpleclub / StudySmarter）的系统调研：

- **核心矛盾**：
  1. **双层头部堆叠**：顶部已有标题与学科选择条，下方又常驻一层水平分段栏（Reise / Library / Lernbaum 等），挤压纵向有效阅读空间达 40px。
  2. **导航扁平断层**：左侧一级工作区只分 4 个抽屉，但各个模块在工作区内又缺乏直观的学科层级感。
  3. **向导表单感过重**：`Reise.tsx` 原先使用「1. 目标学科」「2. 学习目标」「3. 课程清单」的三步问卷形式，打碎了原本应该是一览无余的学期教学大纲（Curriculum Syllabus）。

---

## 2. 核心架构与 UI 重构

### 2.1 剔除双层头部，释放 40px 纵向学术阅读空间
- 彻底移除 `App.tsx` 中冗余的第二层水平工作区分段条。
- 将全局顶部收缩为单一标准的 44px 发丝级横栏（Hairline Border）：
  - 左侧：工作区与模块层级面包屑（Breadcrumb，如 `Lernen / 互动课程`）。
  - 中间/右侧：全局快速搜索框（`/` 快捷键）+ 全局学科过滤器 + 语言/主题快速切换。

### 2.2 左侧导航树语义分组（Home / Lernen / Wiederholen / Üben / Settings）
- 将左侧导航整合为经典的德国高中学业三阶段认知结构：
  - **Home**（`Alt 1`）
  - **LERNEN**（新知探索）：`reise`（互动大纲 `Alt 9`）、`library`（知识笔记 `Alt 2`）、`lernbaum`（知识树 `Alt B`）、`mindmap`（思维导图 `Alt 8`）
  - **WIEDERHOLEN**（巩固内化）：`flashcards`（抽认卡 `Alt 3`）、`planner`（日程规划 `Alt 7`）
  - **ÜBEN**（实战冲刺）：`klausursim`（模拟考试 `Alt 5`）、`quiz`（速测 `Alt 4`）、`tutor`（AI 助教 `Alt 6`）、`werkzeuge`（教学工具 `Alt W`）
  - **Einstellungen**（`Alt 0`）
- 保持极简发丝线与单色衬线字，无阴影、无多余装饰，完全符合 Tufte 纯粹书卷风。

### 2.3 `Reise.tsx` 学术大纲（Curriculum Syllabus）重构
- 将原有的生硬 3 步表单重构为标准的德国高中学术教学大纲（Syllabus Table）：
  - 顶部统计与学科 Pills 水平胶囊栏（`Alle 70`、`SoWi 17`、`Mathe 9` 等）。
  - 快速检索与学习目标过滤（`Alle`、`Klausur`、`Verstehen`、`Mündlich`）。
  - 清晰的大纲表格：序号、学科、主题、AFB 目标、XP 奖励，以及直接学习入口（保持 `{lang === "de" ? "Lektion starten →" : "开始学习 →"}` 保证全自动化测试套件兼容）。

### 2.4 构建与工程体系优化
- 规范化 `src/vite-env.d.ts`，为 `import.meta.glob` 补充标准的类型支持。
- 消除 `App.tsx` 中所有未读取的局部变量，确保 `tsc -b` 零告警严格通过。

---

## 3. 验证与门禁结果

- **TypeScript 严格编译**：`npx tsc -b` 零错误。
- **自动化测试套件**：`npm run test:run` 全部 57 个测试文件、379 项单元与端到端测试 100% 通过（涵盖 walkthrough 交互、narrow layout 契约、CCR 弹窗、Katex 渲染等）。
- **生产打包构建**：`npm run build` 成功完成（耗时 4.28 秒）。
- **知识库一致性校验**：`python scripts/vault-check.py` 输出：
  `notes=361 csv_rows=1595(bad=0) index_links=283(missing=0) reisen=70 vergleich=0 badnames=0 badglossar=0 PASS`。
- **本地服务**：端口 1420 正常运行，热更新就绪。

---

## 4. 下一步计划

1. 用户验收新版 Tufte Editorial Scholar v3 的视觉与交互体验（双层头部消除、大纲式课程目录）。
2. 根据用户对特定模块（如 Library 笔记排版、Tutor 侧边栏阅读视图）的进一步反馈进行细化打磨。
