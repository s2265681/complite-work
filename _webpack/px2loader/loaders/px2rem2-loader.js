/**
 * parser转化成AST语法树
 * 1. 分词
 * 2. 语法分析、
 *
 */
// let Px2rem = require("px2rem");
let Px2rem = require("./pm2rem");

function loader(source) {
  // 安装了webpack后 就会有一个这个工具类 通过它可以获取loader，里面配置的参数对象
  // 通过getOptions方法可以获得webpack.config.js中设置的options
  let loaderUtils = require("loader-utils");
  let options = loaderUtils.getOptions(this);

  console.log(this.resource,'resource+++');
  if(options.exclude&&options.exclude.test(this.resource)){
      return source;  // 不转换，直接返回
  }
  let px2rem = new Px2rem(options);
  let targetSource = px2rem.generateRem(source); // 生成rem
  console.log(targetSource);
  return targetSource;
}

module.exports = loader;

// let source = `
//      #root{
//          width: 750px;
//          height: 750px;
//      }
//  `;

// loader(source);
