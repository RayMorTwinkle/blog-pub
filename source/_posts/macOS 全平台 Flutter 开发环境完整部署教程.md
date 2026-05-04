---
title: macOS Flutter 全平台开发环境部署
date: 2026-05-04 20:46:51
tags:
  - 教程
  - 前端
  - 工具
---

# macOS 全平台 Flutter 开发环境完整部署教程

## 前言

本文记录的是在 macOS 上搭建完整 Flutter 全栈开发环境的全过程。涵盖 iOS、Android、Web 三端的开发环境配置，采用官方源 + 梯子的方式，不依赖国内镜像。

## 环境说明

- **系统**: macOS 15.3.1 (Apple Silicon)
- **IDE**: VS Code / Trae（不使用 Android Studio 作为主 IDE）
- **网络**: 需要梯子访问官方源
- **目标**: 支持 iOS、Android、Web 三端开发

## 前置准备

### 必装软件

以下两个软件是绕不开的，必须安装：

1. **Xcode** - iOS/macOS 开发必备，从 App Store 安装
2. **Android Studio** - 虽然不用它写代码，但需要用它来管理 Android SDK

## 第一步：安装 Xcode

从 App Store 搜索并安装 Xcode。安装完成后，打开 Xcode，同意协议，并安装必要的组件。

**注意**: Xcode 的补全模型（约 2GB）可以不下，不影响 Flutter 开发。

## 第二步：配置 Flutter SDK

### 2.1 配置环境变量

```bash
# 添加 Flutter 和 pub-cache 到 PATH
echo 'export PATH="$PATH:$HOME/flutter/bin"' >> ~/.zshrc
echo 'export PATH="$PATH:$HOME/.pub-cache/bin"' >> ~/.zshrc
source ~/.zshrc
```

### 2.2 克隆 Flutter SDK（官方源）

确保梯子开启，然后执行：

```bash
cd ~ && git clone https://github.com/flutter/flutter.git -b stable flutter
```

### 2.3 验证 Flutter 安装

```bash
flutter --version
```

### 2.4 运行环境诊断

```bash
flutter doctor
```

## 第三步：配置edge为 Web 调试浏览器

```bash
echo 'export CHROME_EXECUTABLE="/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge"' >> ~/.zshrc
source ~/.zshrc
```

## 第四步：安装 Ruby 和 CocoaPods

CocoaPods 是 iOS 依赖管理工具，必须通过 Ruby 安装。

### 4.1 安装 rbenv

```bash
brew install rbenv
```

### 4.2 初始化 rbenv

```bash
rbenv init
```

### 4.3 安装 Ruby 3.3.8

```bash
rbenv install 3.3.8
```

**可选**: 如果安装失败，先更新 ruby-build：

```bash
brew update
brew upgrade ruby-build
rbenv install --list-all  # 查看所有可用版本
```

### 4.4 设置全局 Ruby 版本

```bash
rbenv global 3.3.8
ruby --version  # 验证
```

### 4.5 安装 CocoaPods

```bash
sudo gem install cocoapods
```

### 4.6 配置 rbenv 自动初始化

```bash
echo 'eval "$(rbenv init -)"' >> ~/.zshrc
source ~/.zshrc
pod --version  # 验证
```

## 第五步：配置 Android SDK

### 5.1 打开 Android Studio

1. 打开 Android Studio
2. 进入系统设置（Settings）
3. 搜索 "SDK"，找到 SDK Tools
4. **确保开启全局梯子**，然后勾选以下组件：
   - ✅ Android SDK Build-Tools
   - ✅ Android SDK Command-line Tools
   - ✅ Android Emulator
   - ✅ Android SDK Platform-Tools
   - ✅ CMake
   - ✅ NDK (Side by side)
5. 点击 Apply 下载安装

### 5.2 接受 Android 许可证

```bash
flutter doctor --android-licenses
```

一路输入 `y` 接受所有许可证。

## 第六步：验证环境

运行最终诊断命令：

```bash
flutter doctor
```

预期输出：

```
Doctor summary (to see all details, run flutter doctor -v):
[✓] Flutter (Channel stable, 3.41.9, on macOS 15.3.1 24D70 darwin-arm64, locale zh-Hans-CN)
[!] Android toolchain - develop for Android devices (Android SDK version 36.1.0)
    ! Some Android licenses not accepted. To resolve this, run: flutter doctor --android-licenses
[✓] Xcode - develop for iOS and macOS (Xcode 16.4)
[✓] Chrome - develop for the web
[✓] Connected device (2 available)
[✓] Network resources
```

执行最后的许可证接受命令：

```bash
flutter doctor --android-licenses
```

完成后再次运行 `flutter doctor`，应该全部显示 `[✓]`。

## 大功告成

现在你可以使用 VS Code 或 Trae 打开 Flutter 项目，开始全栈开发了！

### 常用命令

```bash
# 创建新项目
flutter create my_app

# 运行到 iOS 模拟器
flutter run

# 运行到 Android 模拟器
flutter run -d android

# 运行到 Web
flutter run -d chrome
```

## 总结

整个部署流程的核心要点：

1. **Xcode 和 Android Studio 必装** - 即使不用 Android Studio 写代码
2. **使用官方源 + 梯子** - 不配置国内镜像，避免各种奇怪问题
3. **Ruby 版本管理** - 使用 rbenv 安装 Ruby 3.3.8，再装 CocoaPods
4. **Android SDK 工具** - 通过 Android Studio 的 SDK Manager 安装必要组件
5. **许可证接受** - 最后别忘了执行 `flutter doctor --android-licenses`

祝开发愉快！
