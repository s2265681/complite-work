

## 手写Webpack 过程


- 1、参数初始化
- 2、创建Compiler，实例化compiler，调用run方法
- 3、调用run方法中的 buildModule模块 和 emitFile模块
- 4、buileModule模块主要是根基路径进行AST语法分析，从入口开始递归遍历依赖树，找到所有文件和相对路径，组成key: value 的数组,
parse 解析阶段 通过require语法获取当前收集的依赖和源码返回， 将require改写成__webpack_require__ 抹平浏览器平台差异
- 5、emitFile阶段， 将上文中组好的key： value 通过模版的形式动态渲染，写到bundle.js文件中



### bundle.js 什么意思
bundle.js 是一个自执行函数， webpack5进行了简化， 主要是一个对象，key为文件的相对路径，value是一个函数，里面是用eval包裹的文件的执行代码，通过eval来执行，里面会通过module.export 导出结果， 将require修改成了自己的__webpack_require__ 方法， 在执行的时候，会从入口开始依次执行，传入三个参数，分别为module、__webpack_exports ，当执行到__weback_require__ 递归执行， 最后将最终的入口文件的module.export的结果展示

__webpack_require__ 是webpack自定义的一个函数 入参是模块的id，也就是文件的相对路径值， 根据路径执行方法时，返回的是module.exports ,
最终结果是返回的是index.js 的module.exports的执行结果