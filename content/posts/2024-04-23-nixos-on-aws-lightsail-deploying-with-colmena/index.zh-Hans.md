+++
title = '在 AWS Lightsail 上安装并使用 NixOS && 使用 Colmena 实现远程部署'
date = 2024-04-23T01:14:34+08:00
tags = ['NixOS', 'VPS']
summary = '最近把自己的 VPS 从 Vultr 换成了 AWS 的 Lightsail，决定正好装上我正在用的 NixOS'
+++

# 序

最近把自己的 VPS 从 Vultr 换成了 AWS 的 Lightsail，决定正好装上我正在用的 NixOS。

## 安装 NixOS

在不提供安装自定义系统的 VPS 提供商上安装 NixOS 主要有两种方式，分别是 [`nixos-infect`](https://github.com/elitak/nixos-infect) 和 [`nixos-anywhere`](https://github.com/nix-community/nixos-anywhere)

> NixOS-Infect 工具的原理是在本地系统上安装 Nix Daemon，再使用它构建一个完整的 NixOS 系统，最后将原系统的启动项替换成 NixOS 的。由于这种方法不需要在内存中解压 NixOS 的完整安装镜像，这种方法更适合小内存的 VPS。但这种方法的缺点是无法自定义分区结构和文件系统类型。只能使用 VPS 服务商的默认分区配置。对于使用 Btrfs/ZFS 以及 Impermanence 等非标准分区方案/文件系统的用户不友好。
>
> 而 NixOS-Anywhere 的原理是通过 Linux 内核的 kexec 功能替换当前运行的内核，直接启动到内存中的 NixOS 的安装镜像，本质原理与 netboot.xyz 大致相同，因此也与 netboot.xyz 一样需要较大的内存空间。

-- Lan Tian @ [NixOS 系列（五）：制作小内存 VPS 的 DD 磁盘镜像](https://lantian.pub/article/modify-computer/nixos-low-ram-vps.lantian/)

`nixos-infect` 相对来说比 `nixos-anywhere` 简单，只需要跑一个脚本即可。由于我没有尝试过 `nixos-infect` 故本文不赘述。

在 Lightsail 上使用 `nixos-infect` 安装 NixOS 只需要运行以下这条命令，通常来说大致运行十分钟就会自动重启到 NixOS。重启后可以直接使用 AWS 提供的 ssh key 登陆 root 账户。

```sh
curl https://raw.githubusercontent.com/elitak/nixos-infect/master/nixos-infect | PROVIDER="lightsail" NIX_CHANNEL=nixos-23.05 bash
```

## 配置 NixOS

Nixpkgs 里包含了 AWS EC2/Lightsail 的懒人配置，会自动获取机器的 metadata 与配置 hostname, ssh key, NTP 等。

实现详情可以查看 https://github.com/NixOS/nixpkgs/blob/master/nixos/modules/virtualisation/amazon-image.nix

你可以在 `/etc/nixos/configuration.nix` 找到 `nixos-infect` 提前帮你安装的配置，通常来说会长这样：

```nix
{ config, pkgs, modulesPath, lib, ... }:
{
  imports = [ "${modulesPath}/virtualisation/amazon-image.nix" ];
  boot.loader.grub.device = lib.mkForce "/dev/nvme0n1";
}
```

## 配置 Colmena

其实完成上一步后你已经可以使用完整的 NixOS 了，~~但是因为某些不知名的原因~~我还是选择了使用 [Colmena](https://github.com/zhaofengli/colmena)。
（对于我一台机器来说是有点大材小用了，Colmena 主要还是更适用于批量部署。）

假设你已经在使用 Flake，第一步是在你的 `flake.nix` 里添加 Colmena 的 output 配置与在本地安装 Colmena。

可以在 https://colmena.cli.rs/unstable/reference/index.html 找到选项的详细信息。

```nix
{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    ...
  };

  outputs = inputs: {
    nixosConfigurations = {
      ...
    };

    colmena = {
      meta = {
        specialArgs = {inherit inputs;}; # 在配置文件里使用 flake inputs
        nixpkgs = import inputs.nixpkgs {
          system = "x86_64-linux";
        };
      };

      "lightsail-tokyo" = {
        imports = [./hosts/lightsail-tokyo]; # 导入配置文件或 modules
                                             # 相当于 imports = [./hosts/lightsail-tokyo/default.nix];
        deployment = {
          targetHost = "123.456.789.012"; # 替换为你自己机器的地址

          targetPort = 2222; # ssh 端口

          # 标签，可以通过 colmena apply --on 'web' 仅部署给部分机器，支持通配符。
          deployment.tags = [ "web" "infra-lax" ];
        };
      };
    };
  };
}
```

接下来你需要在 `~/.ssh/config` 配置 VPS 需要的 ssh 密钥，格式如下：

```
Host 123.456.789.012
  IdentityFile ~/Documents/LightsailDefaultKey
-ap-xxx-1.pem.crt
```

（不要忘记 `chmod 600`。）

## 使用 Colmena

你可以通过 `colmena -h` 查看帮助，简要的教程是：

- 通过 `colmena apply` 可以批量部署。

  添加 `--on xxx` 可以用 tags 指定部分机器。

  添加 `--build-on-target` 在远端构建。

  添加 `-v` 显示日志。

- 通过 `colmena build` 可以批量构建所有机器的 NixOS

- 通过 `colmena exec "echo \$LANG | tee /tmp/test"` 可以批量远程运行命令。

  ```
  ❯ cat /tmp/test
  en_US.UTF-8
  ```
