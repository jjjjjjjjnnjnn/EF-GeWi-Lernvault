---
fach: ""
thema: "Journal 2026-10-08 Planetary Interaction and Navigation Redesign"
operatoren: []
klausurrelevant: false
datum: 2026-10-08
tags: [EF, Meta, Journal]
---

# 2026-10-08 — 行星知识图谱交互革命：自由节点拖拽复位、双指滚轮缩放与全科目录全景展开

## 1. 用户反馈与问题聚焦
针对用户在实际使用中的三张截图反馈，精准定位并修复了四大交互与排版痛点：
1. **知识节点自由拖拽与一键复位 (Screenshot 21-34-54)**：
   - 需求：用户希望自由拖拽改变节点位置；拖拽后需提供明显的复位功能恢复默认布局。
   - 痛点：旧版节点坐标完全由算法固定绑定，无拖拽支持，且拖拽时容易误触点击展开抽屉。
2. **多模态平滑缩放与手势支持**：
   - 需求：支持鼠标滚轮平滑以光标为焦点缩放，以及触控屏/触控板双指捏合缩放（Pinch-to-Zoom）。
   - 痛点：旧版仅有右侧 `+/-` 按钮阶梯缩放，无法直接鼠标滚轮平滑缩放。
3. **二级过滤分类栏排版重构 (Screenshot 21-37-12)**：
   - 痛点：旧版分类 Chip 存在字数换行问题（如出现“全\n部\n分\n类”等竖向拆分错位），行高参差不齐，视觉零乱。
4. **学科顶栏翻页与全景目录 (Screenshot 21-37-53)**：
   - 痛点：旧版学科按钮溢出时强行堆叠导致字形被纵向压缩折断（如“社会科\n学\n(SoWi)”），且横向滚动条需手动拖拽极其繁琐。

---

## 2. 核心架构与编码实现

1. **节点自由位移与复位引擎 (Free Dragging & Reset Engine)**：
   - 状态模型：维护 `customNodePositions: Map<string, { x: number; y: number }>`；
   - 坐标合并：`layoutedNodes` 优先应用自定义坐标并动态重算贝塞尔引力流连线；
   - 拖拽与点击手势解耦：采用 `justDraggedRef` 与 `> 3px` 位移阈值判定，拖拽抬起时不会误触发抽屉唤出；
   - 容错捕捉：知识节点绑定 `setPointerCapture`，并在 SVG 画布层提供全局拖拽位移回退捕获；
   - 显式复位：当存在自定义位移时，画布顶部浮现灵敏指示标牌 `已自定义移动 N 个节点位置 · [复位默认]`，顶栏工具区同步激活 `Reset (N)` 快捷复位按钮。
2. **光标中心滚轮缩放与触控双指手势 (Smooth Zoom Engine)**：
   - 实现 `handleWheel`：基于光标与画布视口的物理坐标换算 `(mouseX - pan.x) / zoom`，实现围绕当前鼠标指针像素点的数学中心定点缩放；
   - 触控多指映射：维护 `activeTouchPointsRef`，双指同时触控时自动根据欧几里得距离实时动态缩放画布（0.25x - 3.0x）。
3. **顶栏学科分页器与全景星系总录 (Subject Pagination & Catalog Popover)**：
   - 分页器设计：弃用原生滚动条，采用单行 `‹ 1/3 ›` 紧凑微调分页器（每页 5 科），全量 Chip 施加 `whitespace-nowrap h-7 flex-nowrap`，彻底根治汉字折行断裂；
   - 全景展开下拉卡片：新增 `全部学科 (10) ▾` 弹出层，依照北威州 Gymnasium Aufgabenfelder 规范分类（AF I 语言艺术、AF II 社会科学、AF III 数理自然、体育与扩展学科），支持一键跨科跳转并自动定位至对应分页。
4. **分类工具栏单行流式排版**：
   - 统一全部分类 Chip、标签下拉菜单及搜索框高度为 `h-7`，杜绝任何字符换行与高度跳动，符合 Tufte 纯黑白学术纸墨设计规范。

---

## 3. 门禁验证与回归测试
- **TypeScript 严格编译**：`npx tsc -b` **0 错误**；
- **组件单元测试**：`src/components/SkillTreeCanvas.test.tsx` **11/11 全部通过**（新增自由拖拽位移复位、滚轮平滑缩放、学科翻页与全景目录等专项测试）；
- **UI 设计规范测试**：`src/modules.test.tsx` **23/23 全部通过**（验证无杂色、无 emoji、无 active shadow、无 italic）；
- **全量知识库守卫**：`python scripts/vault-check.py` **PASS**；
- **Git 独立交付**：完成 `[App]` 单科规范提交。
