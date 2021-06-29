

[参考git提交规范](https://www.jianshu.com/p/201bd81e7dc9?utm_source=oschina-app)


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




## 生成 Change log

- New features
- Bug fixes
- Breaking changes.

```js
$ npm install -g conventional-changelog-cli
$ cd my-project
$ conventional-changelog -p angular -i CHANGELOG.md -w -r 0
```