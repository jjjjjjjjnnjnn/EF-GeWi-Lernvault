---
fach: ""
thema: "Journal 2026-10-08 Ten Subject Planetary Graph Expansion"
operatoren: []
klausurrelevant: false
datum: 2026-10-08
tags: [EF, Meta, Journal, Knowledge-Graph]
---

# 2026-10-08 — 十科行星引力知识星系批量扩张、结构不变量门禁与编译期图谱接入

## 1. 施工目标与成果规模

把「课程专区 / 技能树」从 3 科小种子（SoWi 12 / Mathe 5 / Philosophie 4 节点）扩张为**十科全景图谱**，
覆盖 Sek_I -> EF -> Q1 -> Q2 -> Uni_Prep 五重同心轨道，并让图谱在 App 启动时即内置可用。

| 学科 | 节点 | 连线 | 星区 | 15NP 核心句 / 易错误区覆盖 |
|---|---|---|---|---|
| SoWi | 70 | 109 | 5 | 100% / 100% |
| Philosophie | 70 | 99 | 5 | 100% / 100% |
| Mathe | 70 | 139 | 5 | 100% / 100% |
| Physik | 72 | 129 | 6 | 100% / 100% |
| Deutsch | 72 | 138 | 6 | 100% / 100% |
| Englisch | 72 | 141 | 6 | 100% / 100% |
| Chemie | 72 | 157 | 6 | 100% / 100% |
| Bio | 72 | 150 | 6 | 100% / 100% |
| Musik | 70 | 144 | 5 | 100% / 100% |
| Sport | 72 | 171 | 6 | 100% / 100% |
| **合计** | **712** | **1377** | — | **全部 100%** |

## 2. 新增的工程资产

1. **预设数据契约** `00_META/presets/README.md`：十科的文件名/ID 前缀表、**21 个冻结 ID 清单**、
   分类星区契约、轨道配额表、**防死锁不变量**（`layerIndex(前置) < layerIndex(本节点)` 且
   `tierRank(前置) <= tierRank(本节点)`）、标签词表、内容依据（`curriculumTree.ts` 与
   `00_META/Curriculum/Deutschland/<Fach>-Oberstufe.md`）。
2. **结构不变量自检器** `scripts/check-graph-invariants.py`：补齐 CLI 门禁覆盖不到的结构约束——
   `edges[]` 的 prerequisite 边与 `prerequisites` 字段一致性、layerIndex/tier 单调性、
   汇聚节点数量、星区厚度、冻结 ID 存续。它成功诊断出旧 SoWi 种子的一处真实缺陷
   （`sowi-marktversagen` 与 `sowi-magisches-viereck` 的 layerIndex 相同，违反严格单调）。
3. **编译期接入**：`scripts/export-vault-data.py` 新增 `export_graphs()`，读取
   `00_META/presets/*-graph.json`，**先跑完两道门禁再编译**为 `src/generatedGraphs.ts`；
   `skillTree.ts` 的 `registerBuiltinGraphs()` 消费该生成物。
4. **防漂移守卫测试** `src/engine/generatedGraphs.test.ts`（8 项）：十科齐备、每科 60-80 节点、
   4-6 星区且每区 >= 6 节点、应用侧校验 0 error 且 0 warning、汇聚节点与终极大题齐备、
   五重轨道全覆盖、21 个冻结 ID 与中文标题逐字保留、**712 个节点坐标互不重叠**。

## 3. 两处必须记录的技术决策

1. **`import type` 断裂运行时循环依赖**：`skillTree.ts` 值导入 `generatedGraphs.ts`，
   而生成物只以 `import type` 反向引用类型定义。类型导入在编译期被擦除，
   因此不会形成 `skillTree -> generatedGraphs -> skillTree` 的真实 ESM 环
   （否则模块底部的 `graphRegistry` 单例可能观察到未初始化绑定）。
   附带收益：生成物带 `SubjectKnowledgeGraph[]` 标注，非法 `stage`/`level` 字面量会直接让
   `tsc -b` 报错，等于白送第二道门禁。
2. **注册改为按需引力排布（延迟布局）**：十科合计数百节点，若在模块初始化时为全部学科执行
   `computePlanetaryRadialLayout`，**每个 vitest 工作线程都要付一次全量布局开销**，
   实测使全量测试从 61s 涨到 112s，并让「渲染 70 节点 SVG」的组件测试超时。
   现改为 `registerLazy()`：首次 `get(fach)` 时才排布该科图谱；渲染本来就只读当前学科。
   语义与 `register()` 一致（`get`/`getAll` 均返回已排布图谱），测试回到全绿。
   另将 `vite.config.ts` 的 `testTimeout` 设为 20s——70 节点 SVG 在 jsdom 中渲染本就需要数秒，
   属真实耗时而非挂死，已在配置注释中说明理由。

## 4. 验收证据

```bash
python scripts/validate-graph-json.py 00_META/presets/     # 10/10 PASS，exit 0
python scripts/check-graph-invariants.py 00_META/presets/  # 全部不变量通过，exit 0
python scripts/export-vault-data.py                        # 编译 10 张图谱
cmd /c "npx tsc -b"                                        # 0 报错
npm run build                                              # 打包通过
npm run test:run                                           # 73 文件 513 测试全绿
python scripts/vault-check.py                              # PASS（415 笔记 / 353 链接 / 0 坏名）
```

## 5. 进度口径变化（重要）

十科升级后，**既有用户进度的分母变大**：例如某生在 SoWi 已精通 5 个知识点，
升级前显示 5/12，升级后显示 5/70。**数据零丢失**——进度按
`localStorage["skill_tree_mastered_<fach>"]` 存节点 ID，21 个既有 ID 全部逐字保留
（SoWi 12 / Mathe 5 / Philosophie 4），仅百分比口径变化。

## 6. 待办与遗留

- `00_META/presets/README.md` 的星区契约目前只对批次二 6 科做过与 `curriculumTree.ts` 的对齐；
  批次一 4 科沿用 SOP 原始星区，若后续要与 KLP Inhaltsfeld 完全同名可再统一一轮。
- 用户自定义学科（`createCustomSubject`）与手工拼插的节点**仍不持久化**（刷新即丢），
  与本批次的「内置图谱」是两件事；如需保留，另开任务把注册表写进 localStorage/IndexedDB
  并在 `storageKeys` 登记。
- `SkillTreeCanvas.tsx` 画布中心 (580,520) 与引擎默认中心 (560,500) 相差 20px，
  导致「导入的图谱」与「UI 拼插节点」排布有轻微偏移，属既有观感瑕疵，未在本批次处理。
