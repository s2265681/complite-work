#! /usr/bin/env node
// 当前代码需要node环境执行
// 把这个包链接到全局 npm link  当执行这个命令就会找到这个包
// /usr/local/bin/rock-pack -> /usr/local/lib/node_modules/rock-pack/bin/rock-pack.js
// /usr/local/lib/node_modules/rock-pack -> /Users/rockshang/Desktop/complete-works/_webpack/手写webpack/rock-pack
// 在当前包  用的时候 通过npm link rock-pack 链接到这个包
// 后面可以直接用npx rock-pack执行

// console.log('hello ++')
let path = require('path');

// config配置文件 读取原文件下的webpack.config.js
let config = require(path.resolve('webpack.config.js'));
let Compiler = require('../lib/Compiler.js')
let compiler = new Compiler(config);
// 标识运行编译
compiler.run()