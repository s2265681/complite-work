#! /usr/bin/env node

// console.log('node')

const path = require('path');
// config配置文件 读取原文件下的webpack.config.js
let config = require(path.resolve('webpack.config.js'));
let Compiler = require('../lib/Compiler.js')
let compiler = new Compiler(config);
// 标识运行编译
compiler.run()