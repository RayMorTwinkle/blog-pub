---
title: Mac电源管理设置优化休眠策略
date: 2026-04-18 23:08:45
tags:
  - 工具
  - 自动化
---

https://www.toutiao.com/article/7629211454708711945/?&source=m_redirect
我最终执行了
sudo pmset -a powernap 0
sudo pmset -b standbydelayhigh 3600
sudo pmset -b standbydelaylow 1800