---
fach: ""
thema: "重做学习树为多邻国式阶梯关卡地图（4 个 Unit + 可关闭侧边抽屉 + 课程直达联动）"
operatoren: []
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Meta, App]
---

# 2026-09-26 重做学习树为多邻国式阶梯关卡地图（4 个 Unit + 可关闭抽屉 + 课程联动）

> 触发：用户反馈学习树右侧详情栏常驻 320px 导致空间严重受限且无法关闭；2D 画布过度横向伸展无法看全；各节点缺乏实际课程对应。要求重做学习树，将其演进为类似多邻国/可汗学院的分阶段闯关学习地图（前置基础 → 核心模型 → 算子突破 → 全真模考），并支持点击直接上课。

## 做了什么

1. **研发课程桥接引擎**（[`App-EF-Lernvault/src/engine/curriculumBridge.ts`](../../App-EF-Lernvault/src/engine/curriculumBridge.ts)）：
   - 将 10 大学科动态编排为四个进阶阶段（Unit 1: Grundlagen AFB I / Unit 2: Kernkompetenzen AFB II / Unit 3: Vertiefung AFB II-III / Unit 4: Abitur-Transfer AFB III）；
   - 自动挂载 70 门 `Lernreise` 原生互动课、385 篇 `Wissensnotizen` 知识笔记与各科全真模考大题。
2. **彻底解决空间遮挡与画布过大问题**（[`App-EF-Lernvault/src/modules/Lernbaum.tsx`](../../App-EF-Lernvault/src/modules/Lernbaum.tsx)）：
   - 移除未选中时的常驻右侧空白栏，未选择节点时画布/地图占据 100% 满屏宽度；
   - 选中节点时弹出抽屉，提供纯 SVG 关闭按钮（`✕`）与 Escape 键盘一键关闭，恢复满屏视野；
   - 引入三重视图切换：`[ Lernpfad | 关卡路线 ]`（默认推荐）、`[ Karte | 画布 ]`、`[ Gliederung | 大纲 ]`。
3. **平台化课程直达与联动**（[`App-EF-Lernvault/src/App.tsx`](../../App-EF-Lernvault/src/App.tsx) & [`Reise.tsx`](../../App-EF-Lernvault/src/modules/Reise.tsx)）：
   - 节点与抽屉中提供直接操作按钮：`开始上课`（自动切入目标互动课程）、`查看笔记`（联动知识库）、`模考演练`（直达模考仿真器）。
4. **质量与规范门禁**：
   - 全套 57 个测试套件（382 项测试）100% 通过（新增关卡与抽屉测试通过）；
   - `npm run build` 编译打包 0 错误通过；
   - `python scripts/vault-check.py` 严格校验通过（0 badnames, 0 badglossar, PASS）。

## 待办 / 下一步

1. 保持当前 Vite dev server（`task-7900`）运行，供用户本地体验多邻国式关卡路线；
2. 后续可根据学生刷题反馈继续丰富更多学科阶段专属练习。
