+++
title = '换回 Windows 11 && 一些我常用的软件'
date = 2024-01-11T07:11:37+08:00
tags = ['Windows']
summary = "最近在 NixOS 上遇到点小问题和麻烦，所以想着干脆换回 \"it just works\" 的操作系统 —— Windows 11（双系统）。"
+++

## 序

最近在 NixOS 上遇到点小问题和麻烦，所以想着干脆换回 "it just works" 的操作系统 —— Windows 11（双系统）。

## 安装

现在连小学生都会操作分区和重灌系统，没劲，直接跳到下一部分。

对了，最好用 [tiny11bulider](https://github.com/ntdevlabs/tiny11builder) 构建精简版 Windows 11 的系统镜像。

## 安装后

起码能让 Windows 11 能用点 :-)

- （很明显）安装适合设备的驱动程序

- 打开 BitLocker 和安全启动

- 打开 DoH (DNS over HTTPS)

- 关闭“快速启动” (https://wiki.archlinux.org/title/Dual_boot_with_Windows#Fast_Startup_and_hibernation)

- 设置 Windows 的 UTC 时区 (https://wiki.archlinux.org/title/System_time#UTC_in_Microsoft_Windows)

  用管理员权限执行 `reg add "HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\TimeZoneInformation" /v RealTimeIsUniversal /d 1 /t REG_DWORD /f`

- 隐私向
  - [privacy.sexy](privacy.sexy) 的增强隐私脚本

  - [WPD](https://wpd.app/)

    (`winget install WPD.WPD`)

  - [StevenBlack hosts](https://github.com/StevenBlack/hosts)

- [CompactGUI](https://github.com/IridiumIO/CompactGUI)，透明压缩文件

- 依赖文件
  - [Visual C++ Redistributable Runtimes](https://learn.microsoft.com/en-US/cpp/windows/latest-supported-vc-redist?view=msvc-170#visual-studio-2015-2017-2019-and-2022)

    (`winget install Microsoft.VCRedist.2015+.x64`, 2015+ 足够了)

  - [.NET Desktop Runtime](https://dotnet.microsoft.com/en-us/download/dotnet)

    (`winget install Microsoft.DotNet.DesktopRuntime.6 Microsoft.DotNet.DesktopRuntime.8`)

  - [Adoptium OpenJDK](https://adoptium.net/download) (Minecraft)

    (`winget install EclipseAdoptium.Temurin.8.JRE EclipseAdoptium.Temurin.17.JRE`)

## 软件

下面所有提到的软件都是自由软件 (Free and open source software) :-)

### [LibreWolf](https://librewolf.net/)

(`winget install 9NVN9SZ8KFD7`)

开箱即用的隐私浏览器。

基于 Firefox，没有任何追踪程序，开箱即用。

我同时推荐使用 [SearXNG](https://github.com/searxng/searxng) 这个搜索引擎。

~~我不用 Firefox + Arkenfox 是因为我单纯懒得下载安装 user.js~~

### [VSCodium](https://vscodium.com/)

(`winget install VSCodium.VSCodium`)

开源版本的 VSCode 二进制。

### [BitWarden](https://bitwarden.com/)

(`winget install 9PJSDV0VPK04`)

有在线同步的跨平台密码管理器。

### [NanaZip](https://github.com/M2Team/NanaZip)

(`winget install 9N8G7TSCL18R`)

经典解压软件 7-zip 的 fork，支持了 Windows 11 右键菜单和 MSIX 打包。

### [PrismLauncher](https://prismlauncher.org/)

(`winget install PrismLauncher.PrismLauncher`)

简单，快速，易用的 Minecraft 启动器。

基于 MultiMC，功能强大。

多 instance 式管理，支持模组包下载，支持一键更新模组。

### [Unigram](https://github.com/UnigramDev/Unigram)

(`winget install 9N97ZCKPD60Q`)

基于 UWP 的 Telegram 客户端。

流畅丝滑，相对于官方基于 Qt 的客户端我更愿意用 Unigram。

### [Cinny](https://cinny.in/)

(`winget install cinnyapp.cinny-desktop`)

不输颜值的 Matrix 客户端。

### [Mumble](https://www.mumble.info/)

(`winget install Mumble.Mumble.Client`)

简单的在线语音软件，相对于 TeamSpeak 的更佳选择。
