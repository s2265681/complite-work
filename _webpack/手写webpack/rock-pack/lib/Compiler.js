let path = require("path");
let fs = require("fs");
const babylon = require("babylon"); // 源代码转化为语法树
let types = require("@babel/types"); // 是否指定或者生成一个新节点
const traverse = require("@babel/traverse").default; // 递归分析依赖节点 维护来整个树状态 可以实现节点的增删
const generator = require("@babel/generator").default; // 将AST节点转化成代码

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
    this.modules = {}; // 存放着所有的模块
    (this.chunks = {
      // 用来存放代码块
      main: {},
    }),
      (this.entry = config.entry); //入口文件路径
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
    // console.log(modulePath, "modulePath...");
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
  /**
   *
   * @param {*} source
   * @param {*} parentPath
   * @returns
   * *  源代码-> babylon 转成语法树 -> traverse递归语树结构 -> types 操作节点 -> generator
   */
  parse(source, parentPath = "") {
    // AST 解析语法树
    let ast = babylon.parse(source, {
      plugins: ["dynamicImport"],
    });
    let _this = this;
    let dependencies = []; // 依赖的数组
    traverse(ast, {
      CallExpression(nodePath) {
        // a()  require()  执行表达式
        let node = nodePath.node; // 对应的节点
        let moduleName = node.arguments[0].value || "";
        moduleName = moduleName + (path.extname(moduleName) ? "" : ".js"); // 渠道的就是模块的引用名字
        if (node.callee.name === "require") {
          node.callee.name = "__webpack_require__";
          let dependencyModuleId = "./" + path.join(parentPath, moduleName); // ./ src/ a.js
          dependencies.push(dependencyModuleId);
          node.arguments = [types.stringLiteral(dependencyModuleId)];
        } else if (types.isImport(node.callee)) {
          console.log("遇到 import 语句， 拆截chunk， 通过异步读取文件");
          let dependencyModuleId = "./" + path.join(parentPath, moduleName); // ./ src/ a.js
          //   代码块id src/hello.js => src_hello_js + '.js'
          let dependencyChunkId =
            dependencyModuleId.slice(2).replace(/(\/|\.)/g, "_") + ".js"; // src_hello_js.js
            console.log(dependencyChunkId,'dependencyChunkId....');
          // import("./hello").then((result) => {
          //   console.log(result.default);
          // });
          //   console.log('走');
          // 整个替换上面代码 异步加载我们的代码 封装一下 通过.default 拿到值
          nodePath.replaceWithSourceString(`
              __webpack_require__.e("${dependencyChunkId}").then(__webpack_require__.t.bind(__webpack_require__, "${dependencyModuleId}"))
          `);

          _this.buildModule(dependencyModuleId, false, dependencyChunkId);
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
  // 配置懒加载

  buildModule(modulePath, isEntry, chunkId='main') {
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

    // 对模块进行拆分 拆成chunk
    this.chunks[chunkId] = this.chunks[chunkId] || {}
    this.chunks[chunkId][moduleName] = sourceCode || {};

    console.log(chunkId,'chunkId...');
    console.log(moduleName,'moduleName...');
    // this.chunks[chunkId] = sourceCode


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
    console.log(this.chunks,'chunks');
    // 现在 增加 懒加载写法
    Object.keys(this.chunks).forEach(chunkId=>{
        if(chunkId == 'main'){
            console.log('sssss');
            let outputFile = path.join(this.config.output.path, this.config.output.filename);
            let moduleTemplateStr = this.getSource(path.join(__dirname, "main.ejs"));
            let bundle = ejs.compile(moduleTemplateStr)({ entryId: this.entryId,modules:this.chunks[chunkId]})
            fs.writeFileSync(outputFile, bundle , 'utf8');
        }else{
            console.log('wwwww');
            console.log(chunkId,'chunkId.....');
            let outputFile = path.join(this.config.output.path, chunkId);
            let chunkTemplateStr = this.getSource(path.join(__dirname, "chunk.ejs"));
            let bundle = ejs.compile(chunkTemplateStr)({ chunkId, modules:this.chunks[chunkId]})
            fs.writeFileSync(outputFile, bundle , 'utf8');
        }
    })

    return  // 原来的写法 
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
    this.buildModule(path.resolve(this.root, this.entry), true, "main");
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
      //   console.log(err, code);
    };
  }
}

// const webpack = (webpackOptions, callback) => {
//   let compiler = new Compiler(webpackOptions,callback);
//   compiler.run(callback);
//   return compiler;
// };

module.exports = Compiler;
