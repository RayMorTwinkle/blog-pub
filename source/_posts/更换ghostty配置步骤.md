---
title: Ghostty终端配置指南
date: 2026-04-10 11:16:48
tags:
  - 工具
  - 教程
---

# 更换ghostty配置步骤


<aside>
😀 更换ghostty配置步骤

</aside>

# 📝 主旨内容

## 1.安装ghostty

> 参考 [https://www.ypplog.cn/ghostty-macos-terminal-2026/](https://www.ypplog.cn/ghostty-macos-terminal-2026/)
> 
> 
> 在 [Ghostty 下载页面](https://ghostty.org/download) 下载 `.dmg` 文件，打开后将 Ghostty 拖入「应用程序」文件
> 

## 2.配置

> 不想折腾的可以，选择看下这个配置文件，放在 GitHub 上：[Ghostty 终极配置 · GitHub](https://github.com/BruceLanLan/bruceblue-ghostty-config)
> 
> 
> 在仓库页面点击绿色 Code 按钮 → Download ZIP，解压后把 `config` 文件复制到 `~/.config/ghostty/` 文件夹里。
> 

## 3.使用

> 
> 
> - `Cmd + D` 一键左右分屏（写代码 + debug 两不误）
> - `Cmd + Shift + Enter` 一键放大当前分屏
> 
> 按 `Cmd + Shift + P` 打开命令面板
> 
> | `Cmd + T` | 新建标签页 |
> | --- | --- |
> | `Cmd + D` | 垂直分屏 |
> | `Cmd + Shift + D` | 水平分屏 |
> | `Cmd + W` | 关闭当前标签 / 分屏 |
> | `Cmd + [ / ]` | 切换上 / 下一个标签页 |
> | `Cmd + F` | 终端内搜索（实时高亮） |
> | `Cmd + + / - / 0` | 增大 / 减小 / 重置字号 |
> | `Cmd + Shift + ,` | 重载配置 |
> | `Cmd + Shift + Enter` | 切换分屏全屏 / 还原 |
> | `Cmd + Alt + 方向键` | 分屏间跳转 |
> | `Cmd + Ctrl + 方向键` | 调整分屏大小 |

## 4.拓展插件

> 星船
> 

> 
> 
> 
> ```bash
> brew install starship
> //配置
> starship preset catppuccin-powerline -o ~/.config/starship.toml
> nano ~/.zshrc
> //最后一行加入
> eval "$(starship init zsh)"
> //ctrl+O保持ctrl+X退出
> ```
> 

> 
> 
> - **Yazi**（终端文件管理器）：输入 `yazi`，可视化文件操作，搭配分屏更顺手，最常用cc复制文件目录。q退出。回车编辑文件。:q退出，:q!强制退出。u撤销。:w保存。
> - **Lazygit**（Git 客户端）：输入 `lazygit`，终端内管理 Git，分屏查看日志 / 提交一目了然
> 
> # 2. 安装 Lazygit（终端里的图形化 Git 客户端）
> 
> brew install lazygit
> 
> # 3. 安装 Yazi（终端文件管理器）按.显示隐藏文件
> 
> brew install yazi
> 
> 安装btop
> 
> brew install btop
> 

## 5.vim拓展（弃用）

只有 gruvbox 配色 + pathogen 插件管理器

## 6.拓展

yazi：

## Shell wrapper

We suggest using this `y` shell wrapper that provides the ability to change the current working directory when exiting Yazi.

- Bash / Zsh

```bash
functiony(){localtmp="$(mktemp-t"yazi-cwd.XXXXXX")" cwdcommand yazi"$@" --cwd-file="$tmp"IFS=read-r-d'' cwd<"$tmp"["$cwd"!="$PWD"]&&[-d"$cwd"]&&builtincd --"$cwd"rm-f --"$tmp"}
```

To use it, copy the function into the configuration file of your respective shell.

Then use `y` instead of `yazi` to start, and press q to quit, you'll see the CWD changed. Sometimes, you don't want to change, press Q to quit.

2.用homebrew安装helix后export EDITOR='hx' （弃用，太难用了）

Helix 配置方案
配置文件路径
~/.config/helix/config.toml
推荐配置（基于你阅读的 3 篇文档）
theme = "gruvbox-material"
[editor]
line-number = "relative"
mouse = true
cursorline = true
color-modes = true
auto-completion = true
auto-format = true
bufferline = "multiple"
true-color = true
undercurl = true
[editor.cursor-shape]
normal = "block"
insert = "bar"
select = "underline"
[editor.statusline]
left = ["mode", "spinner", "file-name", "file-modification-indicator"]
center = []
right = ["diagnostics", "selections", "position", "file-encoding", "file-type"]
separator = "│"
[editor.lsp]
display-messages = true
display-inlay-hints = true
snippets = true
[editor.search]
smart-case = true
wrap-around = true
[editor.indent-guides]
render = true
character = "╎"
[editor.soft-wrap]
enable = true
max-wrap = 25
[editor.file-picker]
hidden = false
[editor.inline-diagnostics]
cursor-line = "warning"
other-lines = "disable"
[keys.normal]
C-s = ":write"
C-q = ":quit"
C-f = ":open ~/.config/helix/config.toml"
[keys.insert]
j = { k = "normal_mode" }

# 🤗 总结归纳

[终端工具配置指南.md](%E6%9B%B4%E6%8D%A2ghostty%E9%85%8D%E7%BD%AE%E6%AD%A5%E9%AA%A4/%E7%BB%88%E7%AB%AF%E5%B7%A5%E5%85%B7%E9%85%8D%E7%BD%AE%E6%8C%87%E5%8D%97.md)

[fresh-config.json](%E6%9B%B4%E6%8D%A2ghostty%E9%85%8D%E7%BD%AE%E6%AD%A5%E9%AA%A4/fresh-config.json)

[ghostty-config](%E6%9B%B4%E6%8D%A2ghostty%E9%85%8D%E7%BD%AE%E6%AD%A5%E9%AA%A4/ghostty-config.txt)

[zshrc](%E6%9B%B4%E6%8D%A2ghostty%E9%85%8D%E7%BD%AE%E6%AD%A5%E9%AA%A4/zshrc.txt)

# 📎 参考文章

- 一些引用
- 引用文章

<aside>
💡 有关Notion安装或者使用上的问题，欢迎您在底部评论区留言，一起交流~

</aside>