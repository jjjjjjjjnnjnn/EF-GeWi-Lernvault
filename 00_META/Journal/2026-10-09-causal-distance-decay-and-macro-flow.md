---
fach: ""
thema: "Journal 2026-10-09 Causal Distance Decay & Macro Forest Flow"
operatoren: []
klausurrelevant: false
datum: 2026-10-09
tags: [EF, Meta, Journal]
---

# 2026-10-09 — 知识图谱体验优化：拓扑距离梯度衰减、宏观星盘扇区底衬与抽屉线性推进清单

## 1. 用户反馈与设计决策

针对第一代因果聚焦机制的实测反馈，攻克三大深层体验痛点：
1. **拓扑距离梯度衰减（Topological Distance Decay）**：
   - 痛点：因果链上所有节点和连线同等高亮，上游三层之外的远端前置与直接前置混淆，视线在圆盘内四处折返；
   - 落地：通过 BFS 拓扑分层算法实时计算图距离 $d$：
     - $d=0$（当前攻坚焦点）：100% 墨黑高亮（`opacity: 1.0`，反墨名牌 `[ 核心焦点 ]`）；
     - $d=1$（直接前置/直接后继）：`opacity: 0.95`，连线 2.4px，角标 `[ ← 前置 ]` / `[ → 直接解锁 ]`；
     - $d=2$（次级依赖）：`opacity: 0.78`，连线 1.6px，角标 `[ ← 前置 (远) ]` / `[ → 进阶解锁 ]`；
     - $d \ge 3$（远端根基/深层进阶）：`opacity: 0.60`，连线 1.1px。
2. **宏观森林定位感保留（Macro Forest Context & Sector Donut Meshes）**：
   - 痛点：此前将背景未激活节点压暗至 0.12 略显过激，导致用户“只见树木不见森林”，丢失在学科整体中的定位；
   - 落地：
     - 将未激活背景节点的透明度提升至 `0.30`（背景细发丝连线提升至 `0.05`），既不形成视觉噪点，又能感知宏观全貌；
     - 在天体星盘底层渲染 **分类扇区甜甜圈网格（Sector Donut Meshes）**：当因果链路跨越特定分类时，动态点亮该扇区的微透宣纸底衬与发丝边缘弧线，让学习者一眼看出当前考点跨越了哪些领域（例如微观经济与政治体制）。
3. **右侧知识点抽屉线性步骤清单（Kausal-Lernpfad Progression Flow）**：
   - 痛点：天体圆盘具有极坐标向外辐射的探索感，但阅读顺序仍不够线性单向；
   - 落地：在右侧研习抽屉顶部注入 `因果推进学习清单 (全链路)`：
     - 将拓扑链条自动展平为有序线性步骤：`前置基石 (d=2) ➔ 前置基石 (d=1) ➔ 当前攻坚焦点 ➔ 解锁进阶 (d=1) ➔ 解锁进阶 (d=2)`；
     - 每一步包含序列标号、角色徽记、中文名称、德语考纲术语与掌握状态徽标；
     - 支持交互式跳转：点击任意步骤即可在画布上选中并平移聚焦该知识点。
4. **高对比三态正反馈与 Tufte 纯黑白纸墨标准**：
   - **已掌握 (Mastered)**：`--paper-subtle` 质感纸面底色 + 墨黑粗标饰条 + 手绘矢量勾选标记 + `[ 已掌握 ]` 反色墨胶囊；
   - **推荐攻坚 (Available - Hero Focus)**：纯白表面底色 + 双层墨线外框 + 墨瞳核点 + `[ 可攻坚 ]`；
   - **前置锁定 (Locked)**：虚线描边 + 手绘纯矢量锁标 + `[ 前置锁定 ]`；
   - **红线遵守**：严格杜绝任何 Unicode Emoji（通过 `src/modules.test.tsx` 0 字符门禁），全部采用内联矢量 SVG。

---

## 2. 核心架构与修改文件

1. **`App-EF-Lernvault/src/components/SkillTreeCanvas.tsx`**：
   - `causalAnalysis` 新增 BFS 队列探索与拓扑距离映射（`nodeDistances`、`edgeDistances`、`activeCategories`、`progressionSteps`）；
   - `renderedEdges` 采用距离驱动的线宽与透明度阶梯算法；
   - 星盘底层新增 `sectorWedges` 扇区微透底衬与弧形发丝网格；
   - 节点卡片（星盘 Cartouche 与科技树 Card）根据状态与拓扑距离精细化渲染；
   - 右侧知识抽屉新增有序可点击的 `因果推进学习清单`。
2. **`App-EF-Lernvault/src/components/SkillTreeCanvas.test.tsx`**：
   - 保持 12 项端到端及交互测试 100% 兼容。

---

## 3. 门禁验证与交付状态

- **TypeScript 严格编译**：`npx tsc -b` **PASS (0 错误)**；
- **组件单元测试**：`src/components/SkillTreeCanvas.test.tsx` **12/12 全部 PASS**；
- **模块契约门禁**：`src/modules.test.tsx` **23/23 全部 PASS**（零 Emoji、零 active shadow、纯黑白学术纸墨）；
- **全量知识库检测**：`python scripts/vault-check.py` **PASS**；
- **Git 状态**：保留既有 4 个未提交文件完好无损。
