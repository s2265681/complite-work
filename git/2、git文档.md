


# git的常见用法与使用

## 1. 基本介绍
首先介绍下 git 的三个区： 工作区 、 暂存区/过渡区、历史区/版本库
> 工作区： 本地代码编写区   - git init

> 暂存区/过渡区：临时保存代码，承上启下  - git add 

> 历史区/版本库：代码提交完成，自动成一个版本号，可用来更改版本，在不同版本中穿梭，配合 git log / git reflog 使用


## 2. 配置用户

> 1. 查看本地git信息，必须设置有name和email
>
> 2. 查看  git config --list
>
> 3. 设置  git config --global user.name="your 
name"
       git config --global user.email="your email" 
>       
> 4. 修改：git config --global --replace-all user.name "yourNewName"

  

## 3、基本命令
  
   - *常用命令*

 >  1. 初始化仓库：git init
 >
 >  2. 提交到暂存区：git add . | file | -A
 >
 >  3. 提交到历史区：git commit -m “信息”
 >
 >  4. 暂存+提交： git commit -a -m "信息"  
   (必须已经有过一个git add提交记录后才可以使用)
 >
 >  5. 查看日志 版本号：git log
 >
 >  6. 查看版本的主线：git log --graph | git log --graph--oneline
 >
 >  7. 查看当前状态：git status
 >
 > 8.  查看所有的活动日志(回滚穿越版本时要用)：git reflog 


- **查看差异**

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20190704192838863.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDE2MDM4NQ==,size_16,color_FFFFFF,t_70)

 > 1. 比较工作区和暂存区的区别  ： git diff 
 >  
 > 2. 比较暂存区和版本库的区别 ：git diff --cached | git rm --cached + XX
 >
 > 3. 比较工作区和版本库的区别 ： git diff master | 两个版本号

- **撤销操作**
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20190704192852356.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDE2MDM4NQ==,size_16,color_FFFFFF,t_70)
 >  1. 代码暂存后： git rm --cached + file 取消暂存  
 >
 >  2. 恢复修改之前的内容：（没暂存的内容）：git checkout  .
 >  
 > 3.  如果已经暂存但是还没有提交到历史区可以先使用 git rm --cached + file 然后在 git checkout 或者 用
     git reset HEAD + <文件名 > （暂存区的版本覆盖- 会用上一个版本暂存区的内容覆盖刚刚写错了的内容）
     然后在用git checkout 工作区就会还原上一版本的内容
 >
 > 4.  如果已经提交到了历史区但是不想要这个版本了：
       git log 查看日志 复制版本号
       git reset --hard + < 版本号 >
       这时就会恢复以前的版本了
 >
 > 
 >5.  如果想找回最新的版本
      使用git reflog   查看所有版本的版本号（使用git log 会查不到， 对于当前来说，是未来时 ）
      然后使用 git reset --hard + < 版本号 >
      （ 注： git reset 回滚远端分支需要git push -f”强制推上去，否则报错 ）
 >
 >6.  远端分支回滚版本也可使用 revert  
 >    git revert -n 版本号  
   （会生成一个新版本号，但是和要回滚的版本号的内容是一样的）
 >

- **合并请求**

   - 查看分支 git branch  
   - 新建分支  git branch <分支名>
   - 切换分支  git checkout <分支名> 
   - 新建并切换分支  git checkout -b <分支名>
   - 删除分支 git branch -D <分支名>
   - 合并分支 git merge 

- **提交到远端仓库**

   -  查看远端仓库信息：git remote -v
   - 添加远端仓库：git remote add <仓库名> + <仓库地址>
   -  修改、删除远端仓库
         git remote set-url <仓库名> + <仓库地址> 
          git remote rm  <仓库名>
   - git push -u <仓库名> <仓库分支名> 
   <br/>
      
   > 例子： 如何添加两个远端仓库并分别把代码提交上去
   > - 添加仓库1: git remote add name1 http://github1.com
   > - 添加仓库2: git remote add name2 http://github2.com
   > - 这时git remote -v  会有两个仓库的名字 name1 和 name2
   > - 提交push代码的时候
   > - 执行git push -u name1 master  就会将代码推到github1的master分支上了
   > - 执行git push -u name2 master  就会将代码推到github2的master分支上了
   > - git push -u 执行一次 如果下次不改变仓库名，只需要git push 即可
<br/>
<br/>
<br/>

- **git push 错误撤销推送的方法**
    ```js
	   git reset --soft xx版本号xxxx  | git reset --soft HEAD~1 
	   git reset --hard xx版本号xxx | git reset --hard HEAD~1  
    ```
    区别：第二种（hard）强制返回版本代码多余会删除（慎用）
               第一种软回退，代码会回退到暂存区，git status查看，通过
               git rm --cached xxx文件名xxx 取消暂存可通过git reflog验证
               这时修改后提交会有远端版本提前不可提交的问题
               解决方法：git push origin 分支 --force 
               这时远端超前一个版本，git pull一下即可
              
   - git revert -n commit_id
  > git reset 虽然可以会退远程的错误，但是可能会导致本地低于远端推送，导致其他人也进行回退，git revert是更好的方式， 回退某次提交



- **git cherry-pick  合并某次提交的内容**
	> git命令行提交到远端步骤
	git branch -b new-feature
	git checkout new-featyre
	git add .
	git commit -m "new changes"
	git push --set-upstream origin new-feature
	
	
	> git 找出那次提交合到主分支
	git log -pretty=oneline (复制要提交的hash如f7e45bf)
	git checkout master 
	git cherry-pick (提交这个hash f7e45bf)


<br/>

链接： [github地址](https://github.com/s2265681/git/tree/master)
参考: [我在工作中是如何使用 git ](https://juejin.cn/post/6974184935804534815)
[git提交规范](https://www.jianshu.com/p/201bd81e7dc9?utm_source=oschina-app)


