# NOTICE — 第三方组件署名（随版本更新，CI自动核对；实测版本 2026-09-21）

权利归各自作者所有，原文许可随包附带。

## A. 随包分发（runtime，打进 exe 的只有这些）
- react / react-dom 19.3.0 — MIT — Meta Platforms, Inc.
- fuse.js 7.x（笔记检索模糊层，精确优先∪fuzzy；用户特批引入 Phase A 2026-09-23）— MIT — Kiro Risk
- @mlc-ai/web-llm 0.2.85（浏览器内本地推理，懒加载，仅本地引擎启用时下载模型权重；用户特批引入 2026-09-23）— Apache-2.0 — MLC AI (Apache TVM 社区)
- @huggingface/transformers 3.x（浏览器内本地向量，懒加载，jina-embeddings-v2-base-de量化q8；移动端默认关闭；用户特批引入 Phase B 2026-09-23）— Apache-2.0 — Hugging Face
- tauri 2.x / @tauri-apps/api 2.x（Rust 壳 + 前端桥）— MIT / Apache-2.0 — Tauri Programme
- serde / serde_json 1.x（Rust 序列化）— MIT / Apache-2.0

## B. 构建时（devDependencies，不进安装包，仅本地构建用）
以下均为构建工具链，不链接进分发产物：
- vite 7.3.6 / @vitejs/plugin-react — MIT — Evan You & contributors
- tailwindcss 4.3.3 / @tailwindcss/vite — MIT — Tailwind Labs, Inc.
- typescript 5.9.3 — Apache-2.0 — Microsoft Corporation
- vitest 5.x / jsdom / @testing-library/react+jest-dom+user-event（单测工具链，用户特批引入 Phase A 2026-09-23）— MIT — Vitest Team / jsdom contributors / Testing Library
- @tauri-apps/cli 2.x / tauri-build 2.x — MIT / Apache-2.0（打包工具，不进产物）
- esbuild / rollup / postcss 等传递依赖 — MIT / ISC / BSD-3-Clause（全量扫描见 Journal 审计记录）
- 例外（构建时、文件中转，不进产物）：caniuse-lite — CC-BY-4.0（浏览器数据表）；
  lightningcss — MPL-2.0（CSS 压缩器，文件级弱 copyleft，未修改、未链接分发）
- 门禁：运行 `npm run build` 产物仅含 A 组代码；B 组永不打包（Tauri 打包时复查）。

## C. 架构与算法设计借鉴（Clean-Room 原生实现，零外部代码复制，零新 npm 依赖）
- Headroom — Apache-2.0 — Headroom Labs, Inc.
  借鉴其上下文管理核心理念：
  1. CCR (Compress-Cache-Retrieve) 可逆内容寻址缓存（FNV-1a 哈希键 `h-xxxxxx` + IndexedDB/内存双层存储，保留压缩前全文以供随时无损还原）；
  2. SmartCrusher 结构化表格折叠（表头抽取与 Markdown 表格模式压缩）；
  3. 5D Scoring 上下文裁剪（首轮 Anchor 1 永久锚定、最近两轮 Rezenz 保留、学生答题错误与助教批改 100% Error Preservation 保留）。
- CC-Switch — MIT — farion1231/cc-switch
  借鉴其多端点与路由管理设计模式：
  1. 多端点独立配置与活跃主路由切换（Active Endpoint Switch）；
  2. 故障级联自动转移机制（Active -> Fallback -> Vault Native）；
  3. Token 消耗统计看板与每日预算预警管理（Token Ledger & Daily Budget Alert）。

## 待引入（P2+，引入时补记）
- ts-fsrs — MIT — Open Spaced Repetition（记忆调度）

