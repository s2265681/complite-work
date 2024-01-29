const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default; // es module 导出的 commonjs 导入.default
const generate = require("@babel/generator").default;
const types = require("@babel/types");
const template = require("@babel/template").default;
const { transformFileSync } = require("@babel/core");
const insertParametersPlugin = require("./plugin/consolelogPlugins");
const path = require("path");

const sourceCode = `console.log(1);`;

const sourceCode2 = `let name = 1; console.log(name);`;

// const ast = parser.parse(sourceCode2, {
//   sourceType: "unambiguous",
//   plugins: ["jsx"],
// });

// traverse(ast, {
//   CallExpression(path, state) {
//     console.log(path.node.callee, "path.node.callee");
//     if (
//       types.isMemberExpression(path.node.callee) &&
//       path.node.callee.object.name === "console" &&
//       ["log", "info", "error", "debug"].includes(path.node.callee.property.name)
//     ) {
//       let lables = path.node.arguments.map((item) => item.name);
//       path.node.arguments.unshift(
//         types.stringLiteral(lables.join(" ") + ">>>")
//       );
//     }
//   },
// });

// -------------- 简化 ----------------//

// const targetCalleeNames = ["log", "info", "error", "debug"].map(
//   (item) => `console.${item}`
// );
// traverse(ast, {
//   CallExpression(path, state) {
//     // const calleeName = generate(path.node.callee).code;
//     const calleeName = path.get("callee").toString();
//     if (targetCalleeNames.includes(calleeName)) {
//       let lables = path.node.arguments.map((item) => item.name);
//       path.node.arguments.unshift(
//         types.stringLiteral(lables.join(" ") + ">>>")
//       );
//     }
//   },
// });

// --------------- 改造jsx ------------------//

// const targetCalleeNames = ["log", "info", "error", "debug"].map(
//   (item) => `console.${item}`
// );
// traverse(ast, {
//   CallExpression(path, state) {
//     if (path.node.isNew) {
//       return;
//     }
//     const calleeName = path.get("callee").toString();
//     if (targetCalleeNames.includes(calleeName)) {
//       let lables = path.node.arguments.map((item) => item.name);
//       const newNode = template.expression(
//         `console.log("${lables.join(" ")}>>>:")`
//       )();
//       newNode.isNew = true;
//       if (path.findParent((path) => path.isJSXElement())) {
//         path.replaceWith(types.arrayExpression([newNode, path.node]));
//         path.skip();
//       } else {
//         path.insertBefore(newNode);
//       }
//     }
//   },
// });

// --------------- 使用插件 -----------------------//

console.log(insertParametersPlugin, "insertParametersPlugin");
console.log(path.join(__dirname, "./sourceCode.js"), ";;;;");
const { code } = transformFileSync(path.join(__dirname, "./sourceCode.js"), {
  plugins: [insertParametersPlugin],
  parserOpts: {
    sourceType: "unambiguous",
    plugins: ["jsx"],
  },
});
console.log(code);
