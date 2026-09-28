---
datum: 2026-09-28
thema: "Gated Vertical Lecture Theatre — 逐题正确解锁幻灯流与无缝体验"
tags: [App, Sowi, Pedagogy, Journal]
---

# 2026-09-28 逐题正确解锁幻灯画卷（Gated Vertical Lecture Stream）

## 1. 用户核心诉求与演进
- 用户指出：「我希望回答正确以后才能解锁下一部分」，并坚持「一幅图/一个互动，配一个简单的讲解文字，往下滑就行，零进度条与零播放键」的 PPT 垂直画卷模式。
- 拒绝传统翻页与粗暴视频控制，要求构建沉浸式认知门禁（Cognitive Gating）：只有在掌握了前一阶段的德语核心要点并答对思考题后，才能向下浏览后续内容。

## 2. 核心架构与交互落地
1. **顺序门禁解锁状态机 (`LectureTheatre.tsx`)**:
   - `unlockedIdxs: number[]`（初始状态仅开启 `[0]`）。
   - 在选择检查点选项时，当且仅当 `optId === checkpoint.correctId`，触发 `idx + 1` 的解锁流。
   - 若后续连续章节无检查点，则支持透明自动通行。
2. **锁闭占位卡片 (`!isUnlocked`)**:
   - 虚线边框与毛玻璃背景，内嵌纯手写轻量 SVG 挂锁图标。
   - 明确提示：「请先在上文第 N 节正确回答思考题以解锁本内容」，阻止用户无脑下拉刷屏，引导深度阅读。
3. **顶栏胶囊直达索引联动**:
   - 已解锁已作答正确的章节：点亮翠绿勾选标识 `✓`。
   - 未解锁章节：置灰虚线显示，附带微型锁形图标，并禁用跳转点击。
4. **即时正向反馈与丝滑滚动**:
   - 用户选择正确选项后，选项变绿点亮，出现「✓ 回答正确！下一部分已解锁」翠绿贺卡。
   - 配备「向下滑动 ↓」按钮，点击自动通过 `scrollIntoView({ behavior: 'smooth' })` 平滑滚至刚解锁的新章节。
   - 最后一幕通关呈现全剧掌握贺卡。

## 3. 左侧原理解构看板构图重构 (Left Stage Composition & Layout Overhaul)
- **根因诊断**：原左侧视窗采用固定居中布局，在右侧测试题高度膨胀时产生大量灰色空白死区，且图解为单薄线框；
- **画卷看板升级 (`LectureTheatre.tsx`)**：
  - 容器升级为 `lg:w-[56%]` 专业原理解构看板，添加章节索引顶栏 `Interaktives Schaubild & Mechanik` 与主题徽标；
  - 内部弹性撑满，彻底消除上下灰边与孤立线框感。
- **5 幕知识图解全景重绘 (`SowiDepotLecture.tsx`)**：
  1. *第 1 幕*：10.000 € 名义资产 vs 真实购买力双轨演化卡片 + 5 年通胀剪刀差轨迹图（The Scissors Chart）+ 核心公式底栏；
  2. *第 2 幕*：银行业双支柱独立托管体系（Girokonto 往来账户 vs Depot 独立存托）+ 中间清算走廊 + 破产法 Sondervermögen 隔离护盾；
  3. *第 3 幕*：合规开户 3 级流水线（机构费率比较、§ GWG 反洗钱实名双通道 VideoIdent / PostIdent、1.000 € 免税额度申请）；
  4. *第 4 幕*：西门子股票实时撮合看板 + 完整买卖订单簿深度阶梯（Bid/Ask 挂单量）+ 三大委托类型机制实战卡片（市价单滑点风险、限价单保护、止损单防崩盘）；
  5. *第 5 幕*：德国经济会考经典「投资理财不可能三角（Magisches Dreieck）」精准几何坐标投影（活期、个股、房产与 MSCI World 黄金折衷）。

## 4. 侧面导航索引与动效流式推进升级 (Elevator Index, Animations & Legibility Overhaul)
- **配色与对比度全面重构（消灭浅黄发虚）**：
  - 彻底移除了原浅黄色/浅琥珀色弱对比文字，改用深墨黑（`text-zinc-900`）、深海军蓝（`text-blue-900`）、宝石红（`text-rose-900`）与深森林绿（`text-emerald-900`），保证 WCAG AA 高对比度标准；
  - 购买力缩水卡片（Reale Kaufkraft）改用纯白底板 + 鲜明玫瑰红边框 + 2xl 加粗黑体数据，数字与解读清晰锐利。
- **初次浏览自启动动画与重播支持（Replay Mechanism）**：
  - 全五幕左侧图解均内嵌独立 `requestAnimationFrame` 驱动的进入动效（通胀剪刀差平滑展开、清算走廊动态脉冲、合规步进扫描、订单簿撮合与三角极点飞入）；
  - 每幕原理解构看板右上角均配备 **「↺ 重播 / Replay」** 按钮，点击即可重置独立状态并重新推演动画；支持点击年份/类别即时模拟计算。
- **下方内容完全不预先展示 + 答对自动向下滑动（Progressive Unfolding）**：
  - 取消预先渲染的锁定占位虚线卡片，初始进入页面时**仅展示第 1 节**；
  - 答对上一节思考题后，下一节动态挂载并经由 360ms 延迟**自动平滑向下滑动（Smooth Auto-Scroll）**，无缝连贯。
- **桌面端右侧侧面导航索引（Sticky Side Elevator Index）**：
  - 右侧吸顶停靠 `Vorlesungs-Index` 导航栏，实时同步进度条（如 `2 / 5`）与纵向节点状态（`✓ 已掌握` / `● 正在学习` / `🔒 待解锁`）；
  - 已解锁章节均支持一键回跳直达。

## 5. Tufte 数据墨水比与探究式解构排版全面重构 (Explorable Monograph Refactor)
- **破除「套娃卡片（Box-in-Box）」的廉价 AI 感**：
  - 彻底抛弃了每幕嵌套 8~10 个粗边框圆角色块卡片的堆砌做法；
  - 转向《纽约时报》信息图（NYT Graphics）与 Edward Tufte 学术大作的**章节跨页（Editorial Spread）排版**：以 `01 / PROBLEMSTELLUNG` 极简眉标、大号古典衬线标题（Serif h3）与优雅的德汉原声引言（Pullquote）引领认知；
- **探究式工作台与考题极简融合**：
  - 左侧 60% 互动解构：纯净白底画板、发丝级细线、直觉滑块与动态响应模型；
  - 右侧 40% 考点自测：摒弃粗重色块按钮，采用细线左指示条高亮与墨水字重分级，答案解析以书刊边注形式从容展开；
- **建筑制图级发丝线目录索引（Architectural Elevator Index）**：
  - 侧边栏去除按钮外壳，采用单条垂直发丝线与实心/空心状态圆点构成极简阅读轨道，沉稳高级；
- **五幕探究式模型（Explorable Models）精炼**：
  - 第 1 幕：`Anlagehorizont` 时间滑块（0~5年拖拽），名义账面与实际购买力双栏动态实时联动重算 + 剪刀差 SVG；
  - 第 2 幕：双支柱（往来账户 vs 存托账户）+ 动态清算走廊与 100% 破产隔离声明；
  - 第 3 幕：合规开户三阶段可交互进度选项卡；
  - 第 4 幕：西门子 Xetra 实时盘口与三大委托策略一键模拟撮合；
  - 第 5 幕：几何不可能三角与资产类别落点动态投影。

## 6. 高对比度学术墨色校准（彻底解决弱对比与暗色浅绿发虚）
- **根因定位**：Windows/Firefox 环境启用深色偏好（`prefers-color-scheme: dark`）时，Tailwind v4 的 `dark:text-emerald-100/200/300` 会强制在浅色纸张背景（`--paper: #FAFAFA`）上渲染浅薄荷白字，导致对比度骤降至 1.4:1，极难看清。
- **全域墨色固化**：
  - 选项文字坚决锚定 `text-[var(--ink)]`，绝不随正确状态变浅白，由左侧边框及 `✓` 徽标传达状态；
  - 成功/解锁反馈条使用 `border-emerald-400 bg-emerald-100/80 text-emerald-950 font-bold`（深墨森林色），对比度高于 9:1；
  - 清理所有五幕内的 `dark:text-emerald-*` 和 `dark:text-rose-*` 残留，盘口买入改用加粗 `#065f46`，资产类别选中改用 `border-emerald-700 bg-emerald-100/90 text-emerald-950 font-bold`。

## 8. 顶栏去浮动遮挡重构与教材级深度讲义扩充 (Monograph Masthead & Deep Theory)
- **破除浮动遮挡（Zero Sticky Blocking）**：
  - 彻底移除了原微课顶栏的 `sticky top-2 z-20` 悬浮遮挡属性，重构成**静态文献卷首题头（Monograph Masthead）**；
  - 题头处于自然文档流中，向下阅读或滑动时自然滚出视窗，留出 100% 垂直视野，彻底消除横跨在屏幕中央打断思路的压迫感；
  - 章节导航与进度百分比统一收归到右侧侧边栏轨道（`aside.sticky top-20`），悬浮且永不遮挡正文。
- **教材级深度系统讲义（§ Lehrtext & Systematik）**：
  - 用户反馈原版本“作为完整课程可能不太详细”，全面升级各章教学深度，注入北威州高中 EF 经济考纲标准的理论推导与法条依据：
    1. **第 1 幕（通胀与负利率）**：欧文·费雪实际利率方程式（Fisher-Gleichung: $r \approx i - \pi$）、货币幻觉（Geldillusion）认知偏差、通胀剪刀差效应、欧洲央行（EZB）2.0% 中期调控目标；
    2. **第 2 幕（双支柱架构与资产隔离）**：活期存款的普通银行债权属性、§ 4 EinSiG 法定 10 万欧存款保障限额、§ 92 KAGB 与《存托法》独立特种财产（Sondervermögen）100% 破产隔离机制、清算账户结算走廊；
    3. **第 3 幕（开户合规与税控）**：网点银行 vs 直销银行 vs 互联网券商佣金及 PFOF 盈利模式对比、§ 10 GWG 反洗钱法 KYC 视频/邮局双认证、资本利得税（26.375%）及 § 20 EStG 储蓄者免税额度（Freistellungsauftrag）申报；
    4. **第 4 幕（交易所与委托类型）**：德意志交易所 Xetra 订单簿价格与时间优先连续竞价撮合、买卖价差（Spread）与流动性、市价单滑点（Slippage）风险、限价单保护与止损单断崖风险；
    5. **第 5 幕（不可能三角）**：收益性、安全性与流动性三维不可调和冲突，以及全球分散指数 ETF（MSCI World）消除个股非系统性风险的科学配置方案；
  - 每章均配备高醒目度的 **Klausur-Merksatz（会考必备核心准则/公式）** 提炼卡片。

## 9. 题目选项随机洗牌算法（Fisher-Yates Dynamic Option Shuffling）
- **根因诉求**：用户明确提出「增加题目选项随机」，杜绝固定位置记忆（Position Bias）导致学生未读题便盲点固定序号。
- **动态洗牌与标签一致性落地 (`LectureTheatre.tsx`)**：
  - 引入经典 Fisher-Yates 原地均匀随机置乱算法：
    ```ts
    const shuffleOptions = (opts: Option[]): Option[] => {
      const arr = [...opts];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };
    ```
  - 维护 `shuffledOptions: Record<number, Option[]>` 状态字典，组件挂载与每幕点击「↺ 重播」时动态重置洗牌；
  - 选项逻辑 `opt.id` 保持稳定以精准判定 `checkpoint.correctId`，而前端展示标签统一使用动态生成的学术序号：`String.fromCharCode(65 + optIdx) + "."`（A., B., C.），确保学生始终面对严谨整齐且顺序不可预测的自测题。

## 10. 正式课堂与全知识库闭环融合（Curriculum & Vault Integration）
- **正式课堂互动微课（Lernreise Module 7）**：
  - 双语版实战课程：`Lernreise/SoWi-Wertpapierdepot-Orderarten-L1.md`（Lesson-v3 八大步骤完整闭环，直击 `[Werkzeug: depot]`）；
  - 纯德语标准课程：`Lernreise/SoWi-Wertpapierdepot-Orderarten-DE-L1.md`；
  - App 课堂挂载优化：`App-EF-Lernvault/src/modules/Reise.tsx` 消除嵌套边框套娃，以 `my-4 w-full` 沉浸式融入正式课堂流程。
- **北威州 EF 会考知识库（Wissensnotiz）八段结构沉淀**：
  - 新增 `08_SoWi/Texte-Analyse/Wertpapierdepot-und-Orderarten.md`（完整覆盖 Fisher 公式推导、§ 92 KAGB Sondervermögen 破产隔离、Xetra 撮合规则与不可能三角，融入 CN 考场速记四象限法与会考真题训练）。
- **三处同步与全库合规校验**：
  - `00_META/INDEX.md` 同步登记微课与知识笔记双向锚点；
  - `00_META/Glossar-DE-ZH-GeWi.md` 新增 4 条核心经济法理术语（Wertpapierdepot, Sondervermögen, Freistellungsauftrag, Slippage）；
  - `08_SoWi/Vokabeln-Anki/SoWi-EF-Basis.csv` 追加 4 张高频复习卡片。

## 11. 质量门禁与验收
- `npx tsc -b`: 0 错误通过。
- `npm run build`: 生产编译完全通过（448 modules transformed, built in 5.05s）。
- `python scripts/vault-check.py`: PASS（notes=399 csv_rows=1599 index_links=328 reisen=271 vergleich=0 badnames=0 badglossar=0）。

