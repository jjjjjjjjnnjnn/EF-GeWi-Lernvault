---
fach: ""
thema: "E-Runde-Download-Fix"
datum: 2026-09-23
tags: [EF, Meta]
---

# 2026-09-23 E轮：本地模型下载卡死修复（`[App] 0166f47`，130单测全绿）

## 根因（用户报"一直卡在本地模型下载中"）

- Tutor每问走retrieveHybrid(auto)，桌面auto=直接拉jina-de（~300MB，HuggingFace国内blocked/极慢）→假死；
  同理本地聊天引擎首问拉Qwen（1-2GB）。进度条只有单文件粒度，看着像卡住。

## 修法

- auto永不隐式下载：L1只在已加载时用；想用向量=显式点"现在加载"（关/自动/开三档存配置）
- HF镜像源：AiSettings可填（如https://hf-mirror.com），经env.remoteHost生效（v3官方口）
- 进度按loaded/total字节比（旧progress/100在v3下不可靠）；本地聊天引擎加"重置"按钮
- 单测锁定：auto未加载→L0且零pipeline接触；设置页断言idle文案"不会卡死"

## 用户即刻解套（不升级也行）

1. 刷新页面（空中下载随页面死掉）2. 设置→AI引擎切API直连或关闭
3. 升级后：Tutor默认RAG-L0零等待；向量想用=填镜像+点加载（看清~300MB）
