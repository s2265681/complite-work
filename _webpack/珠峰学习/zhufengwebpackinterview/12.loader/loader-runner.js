let path = require("path");
let fs = require("fs");
let { runLoaders } = require("loader-runner");
let loaderDir = path.resolve(__dirname, "loaders");
let request = "inline-loader1!inline-loader2!./index.js";
//最前面的前缀去掉,多个!合并成一个
let inlineLoaders = request
  .replace(/^-?!+/, "")
  .replace(/!!+/g, "!")
  .split("!");
let resource = inlineLoaders.pop(); // 获取资源的路径 resource = index.js 
//传进去一个loader的相对路径,返回一个绝对路径
let resolveLoader = (loader) => path.resolve(loaderDir, loader);
//从相对路径变成绝对路径
inlineLoaders = inlineLoaders.map(resolveLoader);//[inline-loader1,inline-loader2]
let rules = [
  {
    enforce: "pre", //指定loader的类型 前置 
    test: /\.js?$/,
    use: ["pre-loader1", "pre-loader2"],
  },
  {
    test: /\.js?$/,
    use: ["normal-loader1", "normal-loader2"],
  },
  {
    enforce: "post", //指定loader的类型 后置
    test: /\.js?$/,
    use: ["post-loader1", "post-loader2"],
  },
];
let preLoaders = [];
let postLoaders = [];
let normalLoaders = [];
for (let i = 0; i < rules.length; i++) {
  let rule = rules[i];
  if (rule.test.test(resource)) {
    if (rule.enforce == "pre") {
      preLoaders.push(...rule.use);
    } else if (rule.enforce == "post") {
      postLoaders.push(...rule.use);
    } else {
      normalLoaders.push(...rule.use);
    }
  }
}
preLoaders = preLoaders.map(resolveLoader);
postLoaders = postLoaders.map(resolveLoader);
normalLoaders = normalLoaders.map(resolveLoader);

let loaders = [];
//noPrePostAutoLoaders  忽略所有的 preLoader / normalLoader / postLoader
if (request.startsWith("!!")) {
  loaders = inlineLoaders; //只保留inline
  //noPreAutoLoaders 是否忽略 preLoader 以及 normalLoader
} else if (request.startsWith("-!")) {
  loaders = [...postLoaders, ...inlineLoaders]; //只保留post和inline
  //是否忽略 normalLoader
} else if (request.startsWith("!")) {
  loaders = [...postLoaders, ...inlineLoaders, ...preLoaders]; //保留post inline pre
} else {
  loaders = [...postLoaders, ...inlineLoaders, ...normalLoaders, ...preLoaders];
}
console.log(loaders);
runLoaders(
  {
    //包含查询字符串的资源绝对路径
    resource: path.join(__dirname, "./src/index.js"),
    //String[]：loader的绝对路径字符串数组(可以包括查询字符串)
    //{loader, options}[]: 使用参数对象的loaders的绝对路径
    loaders,
    //额外的上下文信息
    context: { minimize: true },
    //一个用来读取资源的函数 必须拥有签名 function(path, function(err, buffer))
    readResource: fs.readFile.bind(fs),
  },
  /**
   *
   * @param {*} err 错误对象
   * @param {*} result
   *      result Buffer或者String
   *      resourceBuffer Buffer
   *      cacheable 结果是否可缓存还是需要重新执行
   *      fileDependencies 结果依赖的文件列表字符串数组
   *      contextDependencies 结果依赖的字符串列表字符串数组
   */
  function (err, result) {
    console.log(err);
    console.log(result);
  }
);
