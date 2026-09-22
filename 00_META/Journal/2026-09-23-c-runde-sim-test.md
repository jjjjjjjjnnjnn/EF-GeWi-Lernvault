---
fach: ""
thema: "C-Runde-Sim-Test"
datum: 2026-09-23
tags: [EF, Meta]
---

# 2026-09-23 C轮完工 + 全功能模拟测试（`[App] 924facb`，113单测全绿）

## 交付

- L1语义stage-2：`splitClaims/verifySemantic/chunkVectors/claimVectors`（阈值0.5，空=放行）+ Tutor接线
  （L1/L2回答后逐句打分，弱支撑最多标2句，失败静默回字符串级）；mock向量单测锁定
- 云Backend：`engine/sync.ts`（GET/PUT/none-404/Bearer头）+ syncStore + Settings同步区
  （地址/令牌/上传/下载/上次时间）；本地常驻、显式push/pull（透明swap语义有坑，已否决留证）
- 视觉契约：LEARNING-ENGINE §6（token/导航/组件清单/断点/红线）+ 云协议§；外部AI按此画皮
- 模拟测试：`flow.test.ts`（vault→chunk→retrieve→quiz→rubric→lernsitzung→overview全链一条龙，
  接口一散先崩此处）+ `modules.test.tsx`（Home/Library/Settings渲染冒烟+芯片清除+同步报错交互）
- 验收：113/113 + build + vault-check 38/203/120 + 1420在线200

## 能否正常使用（诚实结论）

- 自动覆盖：全部中后端函数 + 三模块渲染 + 关键交互（自动机验证通过）
- 未自动覆盖：真实浏览器点击流（无Playwright）、真模型下载（L1约200MB+、只在桌面端按需触发）、
  真云服务器对接（需用户自备endpoint按§云协议实现）、Tauri打包（需VS2022工具链）
- 用户WebUI必走清单：引导三步→主页四数→背卡走完→Quiz交错开关+送回→Tutor问答看RAG-Lx标签→设置同步区空地址点上传看报错
