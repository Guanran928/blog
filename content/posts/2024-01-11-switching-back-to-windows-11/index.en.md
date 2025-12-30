+++
title = 'Switching back to Windows 11 && Software that I use'
date = 2024-01-11T07:11:37+08:00
tags = ['Windows']
summary = "Recently I've dealt with a lot of bugs/problems on my NixOS installation, and I've decided to switch to another operating system that \"just works\" -- (Dual booting) Windows 11"
+++

## Intro

Recently I've dealt with a lot of bugs/problems on my NixOS installation, and I've decided to switch to another operating system that "just works" -- (Dual booting) Windows 11

## Installation

The installation part is just boring, everyone knows how to shrink a partition and install Windows. Just skip to the next part.

Keep in mind you might want to build your installation ISO using [tiny11bulider](https://github.com/ntdevlabs/tiny11builder).

## Post-Installation

To actually make Windows 11 usable :-)

- (Obviously) Install drivers for your device

- Enable BitLocker and Secure Boot

- Enable DoH (DNS over HTTPS)

  Settings -> Network & Ethernet -> Wi-Fi -> Hardware properties -> DNS server management

- Disable fast startup (https://wiki.archlinux.org/title/Dual_boot_with_Windows#Fast_Startup_and_hibernation)

  Control Panel -> Hardware and Sound -> Power Options -> System Settings -> Disable "Turn on fast startup".

- UTC in Microsoft Windows (https://wiki.archlinux.org/title/System_time#UTC_in_Microsoft_Windows)

  Run `reg add "HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\TimeZoneInformation" /v RealTimeIsUniversal /d 1 /t REG_DWORD /f` as admin.

- Privacy stuff
  - [privacy.sexy](privacy.sexy) scripts

  - [WPD](https://wpd.app/)

    (`winget install WPD.WPD`)

  - [StevenBlack hosts](https://github.com/StevenBlack/hosts)

- [CompactGUI](https://github.com/IridiumIO/CompactGUI), compresses files transparently.

- Dependencies
  - [Visual C++ Redistributable Runtimes](https://learn.microsoft.com/en-US/cpp/windows/latest-supported-vc-redist?view=msvc-170#visual-studio-2015-2017-2019-and-2022)

    (`winget install Microsoft.VCRedist.2015+.x64`, 2015+ is enough.)

  - [.NET Desktop Runtime](https://dotnet.microsoft.com/en-us/download/dotnet)

    (`winget install Microsoft.DotNet.DesktopRuntime.6 Microsoft.DotNet.DesktopRuntime.8`)

  - [Adoptium OpenJDK](https://adoptium.net/download) (Mostly for Minecraft)

    (`winget install EclipseAdoptium.Temurin.8.JRE EclipseAdoptium.Temurin.17.JRE`)

## Applications

All software that I mentioned below is fully FOSS (Free and open source software) :-)

### [LibreWolf](https://librewolf.net/)

(`winget install 9NVN9SZ8KFD7`)

A privacy-focused browser that just works.

Based on Firefox, no telemetry works OOTB (out-of-the-box).

I also recommend using [SearXNG](https://github.com/searxng/searxng) as your search engine.

~~I don't use Firefox + Arkenfox literally because I'm just too lazy to download and install another file.~~

### [VSCodium](https://vscodium.com/)

(`winget install VSCodium.VSCodium`)

Open-source software binaries of VSCode.

### [BitWarden](https://bitwarden.com/)

(`winget install 9PJSDV0VPK04`)

Cross-platform password manager with online sync.

### [NanaZip](https://github.com/M2Team/NanaZip)

(`winget install 9N8G7TSCL18R`)

Fork of the classic 7-zip, now supports Windows 11 context menu and packaging with MSIX.

### [PrismLauncher](https://prismlauncher.org/)

(`winget install PrismLauncher.PrismLauncher`)

Clean, fast, easy-to-use Minecraft launcher.

Based on MultiMC, powerful than ever.

Multi-instance management, modpack downloads, one-click mod updates.

### [Unigram](https://github.com/UnigramDev/Unigram)

(`winget install 9N97ZCKPD60Q`)

Telegram client based on UWP.

Ultra smooth. I prefer it over the official Qt-based client.

### [Cinny](https://cinny.in/)

(`winget install cinnyapp.cinny-desktop`)

Matrix client with calm visual.

### [Mumble](https://www.mumble.info/)

(`winget install Mumble.Mumble.Client`)

Simple VoIP software, great alternative to TeamSpeak.
