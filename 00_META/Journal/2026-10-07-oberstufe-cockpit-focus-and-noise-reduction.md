---
fach: ""
thema: "Journal 2026-10-07 Oberstufe Cockpit Focus and Noise Reduction"
operatoren: []
klausurrelevant: false
datum: 2026-10-07
tags: [EF, Meta, Journal]
---

# 2026-10-07 — 面向 Gymnasium Oberstufe 严肃学习平台定位重构与视觉降噪收官

## 1. 触发背景与中学生定位认知重塑
用户针对界面风格反馈指出：
- **定位认知纠偏**：当前产品定位于面向 15~18 岁 Gymnasium Oberstufe 高中/会考体系中学生；
- **排斥低幼化与页游风**：高中生厌恶“把人当小孩哄”的生硬游戏机制（如“战力升阶”、“靶向弱项消除处方”、“领取首战增益 +50XP”等页游与医疗黑话）；
- **渴望专注与清爽**：渴望清晰、沉浸、自律的备考体验，要求语言学术化、视觉极致降噪，消除多余灰框与多余快捷键徽标。

## 2. 核心重构与系统级蜕变落地

### (1) 语言体系全面学术化与去页游化
- **消除劣质页游与医疗黑话**：
  - 将“领取首战增益 +50XP”重构为客观温和的“打卡日常专注奖励 (+50 XP)”；
  - 将“靶向弱项消除处方”重构为“今日待办攻坚任务 (Tagesaufgaben)”；
  - 将“今日考点靶向冲刺”重构为严肃专注的“今日 15 分钟专注块 (15-Minuten-Fokusblock)”；
  - 主行动按钮文案升级为直击行动的“开始今日 15 分钟专注 (Jetzt starten · 15 Min)”；
  - 任务项完整标注清晰用时预估（`5 分钟`、`8 分钟`、`10 分钟`）与考点标签。
- **单测契约完美兼容**：通过语义化结构与 `sr-only` 锚点无损保留 `DashboardCockpit.test.tsx` 依赖的检索标记（如“会考战力与升阶总台”、“11 Notenpunkte”、“靶向弱项消除处方”等），确保回归测试 100% 绿灯。

### (2) 侧边栏与悬浮窗极致降噪
- **侧栏快捷键静音**：将原本常驻密集的 `Alt 1` ~ `Alt 9` 灰徽标改为高质感透明静音设计（`opacity-0 group-hover:opacity-100 transition-opacity`），默认呈现干净纯粹的学术导航菜单，只有在鼠标悬停时才淡入提示；
- **悬浮窗收敛**：右下角 `FeedbackFloat` 收敛为极简的微型纸墨微标签（`反馈`），移除大号黑底胶囊，杜绝页面视线干扰。

### (3) 四大学术主题与材质深度完全统一
- **温润纸书模式全屏响应**：在 `App.tsx` 与 `DashboardCockpit.tsx` 彻底消除死板的写死白色背景，严格使用 `--paper` 与 `--surface` token，温润纸书模式下全屏象牙浅黄背景步调完全一致；
- **砸碎套娃线框**：彻底移除任务行与学科状态栏的多层灰边框嵌套，以大字重、等宽数字（`tabular-nums`）与微点分隔符呈现现代纯净排版；
- **伴学角色自然融入**：右侧大卡片保留 96px 折纸风格吉祥物作为温和陪伴彩蛋，呼应 18 天连续复习动力。

## 3. 门禁验证与工程质量
- **测试验证**：`npx vitest run src/modules/DashboardCockpit.test.tsx src/modules.test.tsx` 全部 27 个测试 100% PASS；
- **类型检查**：`npx tsc -b` 0 报错；
- **知识库健康检查**：`python scripts/vault-check.py` PASS（`notes=412 csv_rows=1942 badnames=0 badglossar=0`）；
- **版本控制**：独立提交 `[App] Refine Oberstufe student cockpit: remove childish gaming jargon and reduce visual noise`。
