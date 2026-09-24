---
fach: ""
thema: "Lernbaum App落地：十科交互学习树"
datum: 2026-09-24
tags: [EF, Meta, App, Lernbaum]
---

# 2026-09-24 Lernbaum App 落地（设计→代码，六路并行+主线程接线）

## 用户指令

把十科学习树做到 WebUI 上；不改变原有设计风格格式；用户能拖动、交互、搜索索引。

## 架构（新增 `src/baum/`，复用 Mindmap 惯用法）

- `baum/types.ts`（主线程手写契约）：BaumNode L0–L3（id/level/code/中德标题/operatoren/klausur/leitfrage/noteKeywords/children）+ FachBaum + SuchEintrag + NotizStichwort + MasteryEintrag。
- `baum/*.ts` 十科数据（4 路并行）：260 个 L3 全带 operatoren +  Leitfrage + keywords（主线程脚本全量审计通过）；L1/L2 按契约留空；ID 全 ASCII。
- `baum/engine.ts`（桩→实现）：flacheBaum/elternKarte/baueSuchIndex/sucheBaum（多 token 全包含）/findeNotizen/masteryFuerKnoten/statusFuer（luecke/offen/aktiv/beherrscht 阈值 0/0.35/0.8）/ladeMasteryEintraege（读 MASTERY_STORAGE_KEY，防御式）。13 测试。
- `baum/index.ts`（主线程）：BAEUME/BAEUME_LISTE/getBaum 注册表。
- `modules/Lernbaum.tsx`（1 路，1081 行）：Fach-Pillen + 实时搜索（Enter 选中首命中并居中，Esc 清空）+ SVG 三次曲线边 + HTML 节点 + **背景拖拽平移**（pointer）+ 滚轮/按钮/键盘缩放（0.5–1.6）+ 分支折叠 + 详情面板（衬线德语标题/小灰中文/发丝 operatoren/考试挂钩/ Leitfrage/关联笔记跳 Library）+ 状态聚合（子全掌握才掌握）+ BKT 叠加。11 测试。
- 接线（主线程）：`keys.ts` ModuleId + **Alt B** + PER_MODULE_KEYS.lernbaum（F/E/+/-/0）+ LERNBAUM_SHORTCUTS；`i18n` 学习树；`App.tsx` Tab/图标（手写树形 SVG）/知识区导航/渲染/初始 tab 白名单；HelpOverlay 新增段。

## 主线程三次干预

1. **跨学科防串扰**：引擎 findeNotizen 按签名无法按 fach 过滤（BaumNode 无 fach 字段），而 stichworte 含全科笔记（如 "analyse" 会串）。在 berechneStatus 与详情面板两处按 `baum.fach` 预过滤后再匹配。
2. **快捷键单源**：UI 自带 KEY_* 本地定义与 keys.ts 重复，改为直接引用 `PER_MODULE_KEYS.lernbaum[0–4]`；对应更新 Lernbaum.test 源扫描断言（锁新形态）与 keys.test/modules.test 注册表期望（加 Alt B，非弱化）。
3. **D 路 agent 中途失败**：Philo/SoWi/Musik/Sport 四文件重派一次成功。

## 门禁

**57 套件 / 379 测试全绿**（+25：engine 13 + Lernbaum 11 + keys 1）· `tsc --noEmit` 干净 · `npm run build` 过（5.56s）· 新文件零 hex/shadow/italic/emoji · 真实数据冒烟（10 科渲染 +"Ableitung" 搜索命中 + Enter 开详情，临时测试已删）。

## 有意取舍（记录）

- 拖动 = 画布平移 + 缩放 + 折叠，**不支持单节点自由拖位**（与自动 tidy 布局冲突；如需节点级拖拽要换力导布局，另立项）。
- 无 vault 连接时诚实显示 Lücke，不伪造进度；BKT 叠加仅在 Quiz 产生 Mastery 数据后生效。
- UI 内含与引擎同语义的 try/catch 本地回退（引擎桩时期产物）；现引擎已落地走引擎路径，回退仅作保险。
