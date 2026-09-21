# NOTICE — 第三方组件署名（随版本更新，CI自动核对；实测版本 2026-09-21）

权利归各自作者所有，原文许可随包附带。

## A. 随包分发（runtime，打进 exe 的只有这些）
- react / react-dom 19.3.0 — MIT — Meta Platforms, Inc.
- tauri 2.x / @tauri-apps/api 2.x（Rust 壳 + 前端桥）— MIT / Apache-2.0 — Tauri Programme
- serde / serde_json 1.x（Rust 序列化）— MIT / Apache-2.0

## B. 构建时（devDependencies，不进安装包，仅本地构建用）
以下均为构建工具链，不链接进分发产物：
- vite 7.3.6 / @vitejs/plugin-react — MIT — Evan You & contributors
- tailwindcss 4.3.3 / @tailwindcss/vite — MIT — Tailwind Labs, Inc.
- typescript 5.9.3 — Apache-2.0 — Microsoft Corporation
- @tauri-apps/cli 2.x / tauri-build 2.x — MIT / Apache-2.0（打包工具，不进产物）
- esbuild / rollup / postcss 等传递依赖 — MIT / ISC / BSD-3-Clause（全量扫描见 Journal 审计记录）
- 例外（构建时、文件中转，不进产物）：caniuse-lite — CC-BY-4.0（浏览器数据表）；
  lightningcss — MPL-2.0（CSS 压缩器，文件级弱 copyleft，未修改、未链接分发）
- 门禁：运行 `npm run build` 产物仅含 A 组代码；B 组永不打包（Tauri 打包时复查）。

## 待引入（P2+，引入时补记）
- ts-fsrs — MIT — Open Spaced Repetition（记忆调度）
