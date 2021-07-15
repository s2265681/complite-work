

[参考git提交规范](https://www.jianshu.com/p/201bd81e7dc9?utm_source=oschina-app)
[规范验证](https://github.com/conventional-changelog/commitlint/#what-is-commitlint)

## 安装 commitizen 

> npm install -g commitizen

项目里运行  使其支持 Angular 的 Commit message 格式
> commitizen init cz-conventional-changelog --save --save-exact  初始化cz包

以后，凡是用到git commit命令，一律改为使用git cz。这时，就会出现选项，用来生成符合格式的 Commit message。


![cz](https://upload-images.jianshu.io/upload_images/3827973-39053e8f0259dfda.png?imageMogr2/auto-orient/strip|imageView2/2/w/557/format/webp)


## 校验提交
validate-commit-msg 用于检查项目的 Commit message 是否符合Angular规范。
> npm install --save-dev validate-commit-msg
> npm install -D husky

运行一下命令创建git hooks
> npx  husky install 
> npx husky add .husky/pre-commit "npm run test"
> npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"' 

增加提交规则 
> cnpm i commitlint -D  



## 生成 Change log

- New features
- Bug fixes
- Breaking changes.

```js
$ npm install -g conventional-changelog-cli
$ cd my-project
$ conventional-changelog -p angular -i CHANGELOG.md -w -r 0
```

## git 
git reset --sort HEAD 回退到某一次之前的代码，后面的代码都会拉下来对比
git reset --hard HEAD 回退到某一次之前的提交，后面的代码都丢掉
git revert -n commitId  反悔某一次提交到最前方
git stash  将本地暂存区的保存起来
git stash list 查看缓存的内容
git pop 将暂存的释放出来



package.json
```js
{
  "name": "reduxsty",
  "version": "0.1.0",
  "private": true,
  "dependencies": {},
  "scripts": {
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -w -r 0",
    "commitmsg": "validate-commit-msg",
    "prepare": "husky install"
  },
  "devDependencies": {
    "@commitlint/config-conventional": "^12.1.4",
    "commitlint": "^12.1.4",
    "cz-conventional-changelog": "^3.3.0"
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  }
}
```


## lazygit
> https://www.bilibili.com/video/av413585263/


> git命令行提交到远端步骤
git branch new-feature
git checkout new-featyre
git add .
git commit -m "new changes"
git push --set-upstream origin new-feature


> git 找出那次提交合到主分支
git log -pretty=oneline (复制要提交的hash如f7e45bf)
git checkout master 
git cherry-pick (提交这个hash f7e45bf)
