---
fach: ""
thema: "Journal 2026-10-08 Planetary Astrolabe Visual Redesign"
operatoren: []
klausurrelevant: false
datum: 2026-10-08
tags: [EF, Meta, Journal]
---

# 2026-10-08 — 行星引力图星盘测天仪 (Astrolabe Star Atlas) 视觉重塑与学术排版升级

## 1. 痛点洞察与视觉根因剖析
针对用户提供的实际运行截图反馈（“太丑了，重新设计编码”），深度排查确认了旧版画布存在的四大视觉冲突与审美缺陷：
1. **坐标系本体冲突（极坐标 vs 直角网格）**：旧版在圆周极坐标系上强行使用 24px 方格纸与粗硬横向文本框，造成视觉割裂与严重杂乱感；
2. **节点缺乏天体引力形态（只有文本卡片没有天体）**：旧版节点为普通矩形白底输入框，直接压在轨道曲线上，缺失行星本体（Planet Orb）、轨道卡扣感与吸积光环；
3. **学科恒星与轨道刻度生硬**：核心太阳仅为简陋双圆，轨道文字直铺在虚线上，缺乏文艺复兴星盘测天仪（Astrolabium / Tycho Brahe / Kepler Himmelsatlas）的古典学术雕刻质感与刻度齿牙；
4. **文字溢出与层级混乱**：卡片宽度受限导致重要中文德文术语以 `...` 粗暴截断，字距局促。

---

## 2. 核心重构与编码方案 (Celestial Astrolabe Overhaul)

1. **星盘外缘与极坐标经纬网 (Astrolabe Limbus & Meridians)**：
   - 双环星盘天球外缘：半径 $r=746, 754$，刻画 360 度圆周细分齿牙（每 $5^\circ$ 一小齿，每 $15^\circ$ 一大齿，每 $90^\circ$ 一主轴齿）；
   - 二十四时角经度射线：自中心向外发散，每 $30^\circ$ 注入赤经方位度数标牌（如 `000°`, `030°`, `060°` ...）；
   - 五大教学同心引力轨道雕刻标牌：轨道顶端设立象限里程碑铭牌（`ORBIT I · SEK I · FUNDAMENTAL` 至 `ORBIT V · UNI-PREP · DISKURS`）；
   - 星区扇域徽标：各分类边缘配备椭圆拱形星座标牌 `[ Sektor ]`。
2. **学科核心恒星重塑 (Discipline Sun Nucleus / Sol Gravitas)**：
   - 24 齿星盘擒纵发散刻度围绕外周；
   - 动态圆形进度弧（Circular Mastery Arc）：基于当前精通比例实时计算周长圆弧（$r=46$，动态 `strokeDasharray`）；
   - 恒星内核双同心雕刻环、学术 Latin 代号 `SOL · GRAVITAS` 与宋黑双语典范标题。
3. **真实行星引力节点形态 (Planetary Body Orb + Tether + Cartouche)**：
   - **天体星核 (Orb)**：严格坐落于轨道圆周正中 $(0, 0)$，半径 $r=15$，外附 $r=21$ 动态光晕环与精通四向十字星芒；
   - **高阶吸积光环**：为 AFB III 综合点与 Q2/Uni 节点自动生成倾斜 $24^\circ$ 的土星型椭圆吸积光环（Saturnian Ring）；
   - **外向辐射结构 (Radially Outward Cartouche)**：卡片根据节点所处星盘象限（左半球/右半球）通过点阵引力悬臂桥梁自然向外侧延伸，彻底释放中心留白与引力流向视野；
   - **学术定位准星 (Reticle Brackets)**：选中节点时卡片四角唤醒天文测天仪定位十字框。
4. **引力流动箭头 (Directional Gravitational Vectors)**：
   - 注入 SVG 定位箭头（`marker-end: url(#grav-arrow-active)`），清晰指示知识点的流向与前置驱动关系。

---

## 3. 门禁验证与交付状态
- `npx tsc -b`：**0 错误**；
- `vitest run src/components/SkillTreeCanvas.test.tsx`：**8/8 全部通过**；
- `vitest run src/modules.test.tsx`：**23/23 全部通过**（禁 emoji、键盘语义、模块切换验证）；
- `python scripts/vault-check.py`：**PASS**（415 篇笔记，0 坏词，0 坏名）。
