// 生产环境
const path = require('path')
module.exports = {
  // 设置编译的入口文件
  entry:'./src/main.js',
  // 设置编译的出口文件
  output:{
    // 编译后的文件
    filename: 'bundle.[hash].min.js',
    path: path.resolve(__dirname,'build')
  },
  mode:'production'
}