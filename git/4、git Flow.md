<!--
 * @Version: 2.0
 * @Autor: rockshang
 * @Date: 2021-12-03 14:41:20
-->
GitFlow作者：nvie，原文：A successful Git branching model，中文翻译：成功的Git分支模型。
成功的git分支模型(https://www.jianshu.com/p/48c41ab18a94)

总览图

关键点

分支的两个类型

● 主分支：永远存在的分支，包括master分支和develop分支
● 支持性分支：用完就必须删掉的分支，包括feature、release和hotfix分支，每一种分支都有一个特别的目的，并且有严格的规则

master分支

● 只有管理员才有权限提交master分支，必须严格控制
● 提交必须打tag，可以集成CI
● 只能合并release分支和hotfix分支

develop分支
用于日常开发的主干分支，只有一个

● 不允许合入master分支

feature分支
用于开发新功能的分支。命名规范，统一前缀feature/{name}

● 来自develop分支
● 必须合入develop分支
● 通常仅存在于开发者的代码库中

release分支
用于新版本发布的分支。命名规范，统一前缀release/{name}

● 创建自开发好的develop分支，就在此刻更新版本信息（手动或配合工具）
● 出于效率考虑，允许修复迷你小bug
● 大的修复或功能点，不要在release上开发，应该放入下一次的发布
● 发布到master之后，也必须合入develop分支
● 发布之后，必须删除

hotfix分支
用于修复线上紧急bug的分支。命名规范，统一前缀hotfix/{name}

● 创建该分支时，记得更新版本信息，通常是版本号的最后一位。如当前版本是1.2.0，新的版本是1.2.1
● 可以直接发布master分支
● 发布后，必须合入develop分支


工具利器SourceTree

不用输入一堆堆的命令，非常快速。

