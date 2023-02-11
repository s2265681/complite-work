const { SyncHook } = require("tapable"); //这是一个同步钩子

class Compiler {
  constructor(webpackOptions) {
    this.options = webpackOptions; // 存储配置参数
    // 内部钩子
    this.hooks = {
      run: new SyncHook(),
      compile: new SyncHook(),
    };
  }
  compile(callback) {}
  //第四步：执行`Compiler`对象的`run`方法开始执行编译
  run(callback) {
    this.hooks.run.call(); // 编译前开始执行
    console.log("run");
    this.compile(onCompiled);
  }
}

//1、 第一步搭建结构，读取配置参数，这里接受的是webpack.config.js中的参数
const webpack = (webpackOptions) => {
  //第二步：用配置参数对象初始化 `Compiler` 对象
  const compiler = new Compiler(webpackOptions);
  // 第三步: 挂载配置中的插件
  if (Array.isArray(webpackOptions.plugins)) {
    webpackOptions.plugins.forEach((plugin) => {
      plugin.apply(compiler);
    });
  }
  return compiler;
};

module.exports = {
  webpack,
};
