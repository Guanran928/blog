+++
title = '如何救回来一台失联的 AWS Lightsail 机器'
date = 2025-08-25T12:52:06+08:00
tags = ['Linux', 'NixOS', 'AWS']
+++

# 序

昨天入坑 DN42 的时候被自己蠢哭，不小心在 Lightsail 的一台东京机器[^1]上把 systemd 对 eth0[^2] 管理的 .network 文件删掉了，reboot 后因为没有 DHCP 就失联了...

[^1]: ~~笑死其实我总共就一台机器~~

[^2]: 其实是 ens5，见 https://systemd.io/PREDICTABLE_INTERFACE_NAMES/

Lightsail 是亚马逊类似 AWS EC2 的服务，但是 Lightsail 相比 EC2 和其他云服务商的机器缺少的功能太多了... 就比如说 serial console 或者 remote vnc... 然后我就彻底连不上这台机器了...

## 那怎么办呢？

我试了 AWS 网页端内置的 ssh，但是很可惜它不是 serial-based 而是 network-based，所以当网络炸了的时候也连不上去...

又尝试了打 snapshot 然后下载到本地，但是发现根本没有这个选项，只能导出到 EC2...

于是最后找到的解决方法很麻烦...

1. 你要先给你的 Lightsail 实例打个快照
2. 把快照导出到 EC2 EBS
3. 临时开台 EC2 的机器，如每小时 $0.02 USD 的 `t3.small`
4. 把快照挂载到 EC2 机器上
5. 把原来的 Lightsail 删掉重新开一台（跑 `nixos-anywhere` 坑了我好久...）
6. 用 rsync / scp 等工具把数据复制回原来的机器上...
