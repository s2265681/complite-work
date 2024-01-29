# babel 的编译流程

- parse：通过 parser 把源码转成抽象语法树（AST）
- transform：遍历 AST，调用各种 transform 插件对 AST 进行增删改
- generate：把转换后的 AST 打印成目标代码，并生成 sourcemap

# babel 的五个 包

> https://www.babeljs.cn/docs/babel-parser

@babel/parser，@babel/traverse，@babel/generator，@babel/types，@babel/template 这五个包的 api 的使用。

## @babel/parser

## 手写 babel 插件

```js
// 方式一
export default function (api, options, dirname) {
  // api {types、template} options 参数  dirname 目录名
  return {
    inherits: parentPlugin, // 继承某个插件
    manipulateOptions(options, parserOptions) {
      // 修改 options
      options.xxx = "";
    },
    pre(file) {
      this.cache = new Map();
    },
    visitor: {
      // traverse 时
      StringLiteral(path, state) {
        this.cache.set(path.node.value, 1);
      },
    },
    post(file) {
      console.log(this.cache);
    },
  };
}
// 方式二 直接导出一个plugin对象 不需要处理参数
export default plugin =  {
    pre(state) {
      this.cache = new Map();
    },
    visitor: {
      StringLiteral(path, state) {
        this.cache.set(path.node.value, 1);
      }
    },
    post(state) {
      console.log(this.cache);
    }
};
```
