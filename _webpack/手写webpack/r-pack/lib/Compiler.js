let path = require("path");
let fs = require("fs");
const babylon = require("babylon");
let types = require("@babel/types");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;

class Compiler {
  constructor(config) {
    this.config = config;
    this.root = process.cwd(); // 工作路径
    this.entry = config.entry;
  }

  getSource(modulePath) {
    return fs.readFileSync(modulePath, "utf-8");
  }

  parse(source, parentPath) {
    // 资源和./src
    // AST 解析语法树  分析依赖关系数组
    let AST = babylon.parse(source);
    let dependencies = []; // 收集依赖
    // console.log(AST)
    traverse(AST, {
      CallExpression(p) {
        let node = p.node; // 对应的节点
        // console.log(p, "pp");
        if (node.callee.name === "require") {
          node.callee.name = "__webpack_require__";
          let moduleName = node.arguments[0].value; // 渠道的就是模块的引用名字
          console.log(moduleName, "moduleName...");
          // [ { type: 'StringLiteral', value: './a.js' } ] ' node.arguments ...'
          // ./c.js moduleName...
          // [ { type: 'StringLiteral', value: './c.js' } ] ' node.arguments ...'
          dependencies.push(moduleName);
          node.arguments = [types.stringLiteral(moduleName)];
        }
      },
    });
    let sourceCode = generator(AST).code;
    return {
      sourceCode,
      dependencies,
    };
  }

  // 执行
  // 1、循环解析依赖  找到依赖项 组成key： value格式数据
  buildModule(modulePath, isEntry) {
    // 拿到模块内容
    let source = this.getSource(modulePath);
    // 拿到当前的相对路径作为模块名
    let moduleName = "./" + path.relative(this.root, modulePath);
    //  console.log(moduleName,'moduleName...') // './src/index.js '

    let [sourceCode, dependencies] = this.parse(
      source,
      path.dirname(moduleName)
    );
  }

  // 2、发送数据渲染js模版
  emitFile() {}

  run() {
    let modulePath = path.resolve(this.root, this.entry);
    this.buildModule(modulePath, true);
    this.emitFile();
  }
}

module.exports = Compiler;
