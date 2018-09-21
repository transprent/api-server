
#! /bin/bash

# 因远程数据库不允许远程连接，本地开发使用ssh本地端口转发，将本地3306转发至远程3306.

ssh -L 3306:localhost:3306 root@www.renkun.vip