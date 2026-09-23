# EF-Lernvault — Gymnasium Lernstudio (EF)

> 一站式单入口桌面学习软件：主页 / 笔记库 / 背卡 / 刷题 / 全真模考 / AI助教 / 规划 / 导图 / 互动旅程。
> 核心引擎：BM25+向量 RRF 混合检索、Vault 双向图谱、BKT 贝叶斯认知追踪与 NRW 考纲掌握度雷达、15 分钟自适应每日冲刺。
> 唯一入口：安装后打开 `EF-Lernvault`，左侧导航即全部功能（Alt 1-9 模块切换，Alt 0 设置）。

## 状态
- P0已出 exe（NSIS 1.8MB，常驻~25MB）；P1接线完成；Next-Gen 引擎与全真三段式 Klausur 模拟器全面落地。
- 自动化测试：31 个测试套件，189 项单测 100% 全部通过；生产构建通过。
- 日常开发走本地 WebUI（热更新），exe 只在发版时打。

## 快速开始（开发者）
```powershell
# 懒人入口（vault根目录）：启动+自动开浏览器
. .\scripts\webui.ps1

# 手动：
cd App-EF-Lernvault
npm install
npm run dev      # WebUI http://localhost:1420（日常开发就用这个）
npm run build    # 类型检查+生产构建（改完必须过）
npx tauri build  # 仅发版时打 exe（需 VS C++ workload + rust stable）
```

## 许可
见 [LICENSE](LICENSE)（半开源：可看不可拿；二进制仅官方 Releases 分发）。
第三方组件署名见 [NOTICE.md](NOTICE.md)。

## 版权防火墙
- 本目录不含 DeepTutor / Anki / AGPL 代码（clean-room 自研）。
- 不打包任何 OER PDF、教材、Klausur 原题；只读用户本地 vault。
