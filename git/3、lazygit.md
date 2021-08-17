
# Install
> brew install jesseduffield/lazygit/lazygit

# Use
> lazygit

- 1、左右切换不同面板，在不同面板上按x 打开帮助 提示
- a

快捷键 
 sasdadca 
 
Status

a —— git add .
space —— 取消暂存
c —— git commit 
A —— amend 提交到上次提交的里面  git commit --amend  --no-edit --allow-empty
amend 一下啊
q —— 关lazygit
lazygit —— 打开
d —— 删除该文件
D -- 更多删除选择
p -- pull
P -- push

branches面板
空格 _ 切换分之
n _ 新建分支 在哪个分支使用就是基于哪个
s _ stash  暂存起来
g _ pop 出来
d _ drop 掉satsh的东西
M _ 合并分支 在当前接收的这个分支上  在要合并的分支上按M合并 
[ ] 切换tag或者分支
，。 翻页 
<  >  最上最下
/ 搜索

Commits 提交界面
g 重置
z - 在Reflog中 撤销操作
c - newfeature中的提交按c复制  在新分支v粘贴， 再按c取消复制
在commits中 按d 删除某次在commits中
在branch中按d删某次分支

contrl+p 自定义补丁更改，  使用move patch to selected commit ...
抓出来放到工作目录等等。。。
 

解决冲突
同时改一个文件  上下左右切换  b都保留  空格选哪个

排查错误实用功能

control+f filter by 'a.json'
预览只对a.json的更改内容

在某次提交上 按M  上下动查看diff  按M更多选项 


brew install ranger
在不同的地方迅速打开lazygit
设置
～/./config/ranger/

设置map快捷键
# Open lazygit 
map <c-g> shell lazygit
map <c-n> shell lazynpm



在shell中打开lazygit
cd ～/./config/ranger/
vim rc.conf
echo $SHELL
/usr/bin/zsh
alias lg='lazygit'
ls
ra
cd 





# Link

> b站视频
https://www.bilibili.com/video/av413585263/

> 简体中文git
https://git-scm.com/book/zh/v2

> 官网
https://github.com/jesseduffield/lazygit
