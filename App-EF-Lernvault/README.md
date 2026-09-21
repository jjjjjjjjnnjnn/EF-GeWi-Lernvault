# EF-Lernvault — Gymnasium Lernstudio (EF)

> 一站式单入口桌面学习软件：笔记 / 背卡 / 刷题 / AI助教 / 规划 / 导图。
> 唯一入口：安装后打开 `EF-Lernvault`，左侧导航即全部功能。

## 状态
- v0.1.0-prototype：纯前端原型（6模块+mock数据），`npm run dev` 预览。
- P0目标：Tauri 打包出首个 `.exe`。

## 快速开始（开发者）
```powershell
cd App-EF-Lernvault
npm install
npm run dev      # 浏览器预览 http://localhost:1420
npm run build    # 类型检查+生产构建
```

## 许可
见 [LICENSE](LICENSE)（半开源：可看不可拿；二进制仅官方 Releases 分发）。
第三方组件署名见 [NOTICE.md](NOTICE.md)。

## 版权防火墙
- 本目录不含 DeepTutor / Anki / AGPL 代码（clean-room 自研）。
- 不打包任何 OER PDF、教材、Klausur 原题；只读用户本地 vault。
