/**
 * 核心就是将css转换成rem
 * 靠的就是CSS抽象语法树
 */
const css = require("css");
const pxRegExp = /\b(\d+(\.\d+)?)px\b/;
class Px2rem {
  constructor(config) {
    this.config = config;
  }
  generateRem(cssText) {
    let self = this; // 缓存this
    function processRules(rules) {
        console.log(rules,'ssssssss')
      for (let i = 0; i < rules.length; i++) {
        let rule = rules[i];
        let declarations = rule.declarations;
        console.log(declarations,'.......----')
        for (let j = 0; j < declarations&&declarations.length; j++) {
          let declaration = declarations[j];
          if (
            declaration.type === "declaration" &&
            pxRegExp.test(declaration.value)
          ) {
            declaration.value = self._getCalcValue("rem", declaration.value);
          }
        }
      }
    }
    var astObj = css.parse(cssText); // 解析css AST
    // console.log(JSON.stringify(astObj, {}, 2));
    console.log(astObj.stylesheet,'///')
    processRules(astObj.stylesheet.rules);

    let newCSSText = css.stringify(astObj); // 处理完后 在转换回来
    // console.log(newCSSText, "newCSSText");
    return newCSSText;
  }
  _getCalcValue(type, value) {
    let { remUnit, remPrecision } = this.config;
    return value.replace(pxRegExp, (_, $1) => {
    //   console.log($1);
    //   console.log(this.config);
      let val = parseFloat($1) / remUnit.toFixed(remPrecision);
      return val + type;
    });
  }
}

module.exports = Px2rem;

// {
//     "type": "stylesheet",
//     "stylesheet": {
//       "rules": [
//         {
//           "type": "rule",
//           "selectors": [
//             "#root"
//           ],
//           "declarations": [
//             {
//               "type": "declaration",
//               "property": "width",
//               "value": "750px",
//               "position": {
//                 "start": {
//                   "line": 3,
//                   "column": 10
//                 },
//                 "end": {
//                   "line": 3,
//                   "column": 22
//                 }
//               }
//             },
//             {
//               "type": "declaration",
//               "property": "height",
//               "value": "750px",
//               "position": {
//                 "start": {
//                   "line": 4,
//                   "column": 10
//                 },
//                 "end": {
//                   "line": 4,
//                   "column": 23
//                 }
//               }
//             }
//           ],
//           "position": {
//             "start": {
//               "line": 2,
//               "column": 6
//             },
//             "end": {
//               "line": 5,
//               "column": 7
//             }
//           }
//         }
//       ],
//       "parsingErrors": []
//     }
//   }
