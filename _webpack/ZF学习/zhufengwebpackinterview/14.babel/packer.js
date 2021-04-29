const fs = require("fs");//读文件
const path = require("path");//处理路径的
const types = require("babel-types");//处理类型
const parser = require("@babel/parser");//把源代码转成抽象语法树
const traverse = require("@babel/traverse").default;//遍历语法树
const generate = require("@babel/generator").default;//把语树生成源代码
const baseDir = process.cwd().replace(/\\/g,path.posix.sep);//根目录 /
const entry = path.posix.join(baseDir, "src/index.js");//打包的入口文件
let modules = [];//数组里面放着本次编译的所有模块
function buildModule(absolutePath){
  const body = fs.readFileSync(absolutePath, "utf-8");//读取文件内容
  const ast = parser.parse(body, {
    sourceType: "module",//源代码转成抽象语法树
  });
  const moduleId = "./" + path.posix.relative(baseDir, absolutePath);// ./src/index.js
  const module = { id: moduleId, deps:[] };//模块对象
  traverse(ast, {
    CallExpression({ node }) {
      if (node.callee.name === 'require') {
        node.callee.name = "__webpack_require__";
        let moduleName = node.arguments[0].value; //./title.js
        //C:\aprepare\zhufengwebpackinterview\14.babel\src
        const dirname = path.posix.dirname(absolutePath); //14.babel\src
        //C:\aprepare\zhufengwebpackinterview\14.babel\src/title.js
        const depPath = path.posix.join(dirname, moduleName);
        //./src/title.js
        const depModuleId = "./" + path.posix.relative(baseDir, depPath);
        node.arguments = [types.stringLiteral(depModuleId)];
        module.deps.push(buildModule(depPath));
      }
    }
  });
  let { code } = generate(ast);
  module._source = code;//module._source重新生成后的代码
  modules.push(module);
  return module;
}
let entryModule = buildModule(entry);

let content = `
(function (modules) {
    function __webpack_require__(moduleId) {
        var module = {
            i: moduleId,
            exports: {}
        };
        modules[moduleId].call(
            module.exports,
            module,
            module.exports,
            __webpack_require__
        );
        return module.exports;
    }

    return __webpack_require__("${entryModule.id}");
})(
    {
      ${modules
        .map(
          (module) =>
            `"${module.id}": function (module, exports,__webpack_require__) {${module._source}}`
        )
        .join(",")}
    }
);
`;

fs.writeFileSync("./dist/bundle.js", content);
