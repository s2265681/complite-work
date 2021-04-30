let path = require("path");
let fs = require("fs");
const babylon = require("babylon");
let types = require("@babel/types");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;
let ejs = require("ejs");
const { SyncHook } = require("tapable");
// babylon 把源码转化成AST
// @babel/traverse 遍历对应的节点
// @babel/types 替换结果
// @babel/generator  将AST结果生成代码

class Compiler {
  constructor(config) {
    // enrty output
    this.config = config;
    // 需要报错入口文件路径
    this.entryId; // ‘./src/index.js’
    // 需要保存所有的模块依赖
    this.modules = {};
    this.entry = config.entry; //入口文件路径
    // 工作路径
    this.root = process.cwd();
    // 处理loaders
    this.rules = config.module.rules || [];
    // 增加生命周期钩子
    this.hooks = {
      entryOption: new SyncHook(),
      compile: new SyncHook(),
      afterCompiler: new SyncHook(),
      afterPlugins: new SyncHook(),
      run: new SyncHook(),
      emit: new SyncHook(),
      done: new SyncHook(),
    };
    // 如果传递了plugins参数
    let plugins = this.config.plugins || [];
    if (Array.isArray(plugins)) {
      plugins.forEach((plugin) => {
        plugin.apply(this);
      });
    }
    this.hooks.afterPlugins.call();
  }
  getSource(modulePath) {
    console.log(modulePath, "modulePath...");
    ///Users/rockshang/Desktop/complete-works/_webpack/手写webpack/product/src/index.less modulePath...
    let content = fs.readFileSync(modulePath, "utf-8");
    // dealLoader
    content = this.useLoader(content, modulePath);
    return content;
  }

  // useLoader
  useLoader(content, modulePath) {
    let _this = this;
    let rules = this.rules || [];
    for (let i = 0; i < rules.length; i++) {
      let rule = rules[i];
      let { test, use } = rule;
      let len = use.length - 1;
      if (test.test(modulePath)) {
        function nextLoader() {
          let loader = require(use[len--]);
          content = loader.call(_this, content);
          if (len >= 0) {
            nextLoader();
          }
        }
        nextLoader();
      }
    }
    return content;
  }

  // 解析源码
  parse(source, parentPath) {
    // AST 解析语法树
    let ast = babylon.parse(source);
    let dependencies = []; // 依赖的数组
    traverse(ast, {
      CallExpression(p) {
        // a()  require()  执行表达式
        let node = p.node; // 对应的节点
        if (node.callee.name === "require") {
          node.callee.name = "__webpack_require__";
          let moduleName = node.arguments[0].value; // 渠道的就是模块的引用名字
          moduleName = moduleName + (path.extname(moduleName) ? "" : ".js"); // ./a.js
          moduleName = "./" + path.join(parentPath, moduleName); // ./ src/ a.js
          dependencies.push(moduleName);
          node.arguments = [types.stringLiteral(moduleName)];
        }
      },
    });
    let sourceCode = generator(ast).code;
    return {
      sourceCode,
      dependencies,
    };
  }

  // 构建模块
  buildModule(modulePath, isEntry) {
    // 拿到模块的内容
    let source = this.getSource(modulePath);
    // 拿到模块id modulePath = modulePath - this.root
    let moduleName = "./" + path.relative(this.root, modulePath);
    // 保存入口的名字
    if (isEntry) {
      this.entryId = moduleName;
    }
    // 解析需要把source源码进行改造，返回一个依赖列表
    let { sourceCode, dependencies } = this.parse(
      source,
      path.dirname(moduleName)
    ); // src
    // console.log(sourceCode, dependencies,'1')
    // const str = __webpack_require__("./src/a.js");
    // console.log(str); [ './src/a.js' ]
    // path.dirname
    // 相对路径和模块中的内容对应起来
    this.modules[moduleName] = sourceCode;
    // 递归
    dependencies.forEach((dep) => {
      // 附模块的加载 递归加载
      this.buildModule(path.join(this.root, dep), false);
    });
  }

  emitFiles() {
    // 发射文件  用数据  渲染模版
    // 用数据渲染
    // 拿到输出到哪个目录下
    let main = path.join(this.config.output.path, this.config.output.filename);
    let templateStr = this.getSource(path.join(__dirname, "main.ejs"));
    let code = ejs.render(templateStr, {
      entryId: this.entryId,
      modules: this.modules,
    });
    this.assets = {};
    this.assets[main] = code;
    fs.writeFileSync(main, this.assets[main]);
  }

  run(cb = () => {}) {
    this.hooks.run.call();
    // 解析依赖
    // 执行创建模块的依赖关系
    // 拿到模块内容
    this.hooks.compile.call();
    this.buildModule(path.resolve(this.root, this.entry), true);
    this.hooks.afterCompiler.call();
    // console.log(this.modules, this.entry)
    // 发射一个文件 打包后的文件
    this.emitFiles();
    this.hooks.emit.call();
    this.hooks.done.call();
    cb();
  }

  async() {
    return function (err, code) {
      console.log(err, code);
    };
  }
}

const webpack = (webpackOptions, callback) => {
  let compiler = new Compiler(webpackOptions);
  compiler.run(callback);
  return compiler;
};

module.exports = webpack;
