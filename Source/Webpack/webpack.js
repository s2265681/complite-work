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
  compile(callback) {
    //虽然webpack只有一个Compiler，但是每次编译都会产出一个新的Compilation，
    //这里主要是为了考虑到watch模式，它会在启动时先编译一次，然后监听文件变化，如果发生变化会重新开始编译
    //每次编译都会产出一个新的Compilation，代表每次的编译结果
    let compilation = new Compilation(this.options);
    compilation.build(callback); //执行compilation的build方法进行编译，编译成功之后执行回调
  }

  //第四步：执行`Compiler`对象的`run`方法开始执行编译
  run(callback) {
    this.hooks.run.call(); //在编译前触发run钩子执行，表示开始启动编译了
    const onCompiled = () => {
      this.hooks.done.call(); //当编译成功后会触发done这个钩子执行
    };
    this.compile(onCompiled); //开始编译，成功之后调用onCompiled
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

//将\替换成/
function toUnixPath(filePath) {
  return filePath.replace(/\\/g, "/");
}
const baseDir = toUnixPath(process.cwd()); //获取工作目录，在哪里执行命令就获取哪里的目录，这里获取的也是跟操作系统有关系，要替换成/
class Compilation {
  constructor(webpackOptions) {
    this.options = webpackOptions;
    this.modules = []; //本次编译所有生成出来的模块
    this.chunks = []; //本次编译产出的所有代码块，入口模块和依赖的模块打包在一起为代码块
    this.assets = {}; //本次编译产出的资源文件
    this.fileDependencies = []; //本次打包涉及到的文件，这里主要是为了实现watch模式下监听文件的变化，文件发生变化后会重新编译
  }

  build(callback) {
    //第五步：根据配置文件中的`entry`配置项找到所有的入口
    let entry = {};
    if (typeof this.options.entry === "string") {
      // 单入口，将entry xx 变成 {main: xx}
      entry.main = this.options.entry;
    } else {
      entry = this.options.entry;
    }

    //这里开始做编译工作，编译成功执行callback
    callback();
  }
}
