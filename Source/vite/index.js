const Koa = require("koa");
const fs = require("fs");
const path = require("path");
const app = new Koa();
app.use(async (ctx) => {
  const { url, query } = ctx.request;
  if (url === "/") {
    let content = fs.readFileSync("./index.html", "utf-8");
    // 入口文件，加入环境变量
    content = content.replace(
      "<script",
      `
      <script>
       window.process = {env: {NODE_ENV: "dev"}};
      </script> 
      <script
      `
    );
    ctx.type = "text/html";
    ctx.body = content;
  } else if (url.endsWith(".js")) {
    // /src/main.js => 代码文件所在位置 xxx/src/main.js
    const p = path.resolve(__dirname, url.slice(1));
    const content = fs.readFileSync(p, "utf-8");
    ctx.type = "application/javascript";
    ctx.body = rewriteImport(content);
  } else if (url.startsWith("/@modules")) {
    // node_modules/vue/ 的 es 模块入口
    // 读取 package.json 中的 module 属性
    const prefix = path.resolve(
      __dirname,
      "node_modules",
      url.replace("/@modules/", "")
    );
    const module = require(prefix + "/package.json").module;
    const p = path.resolve(prefix, module);
    const ret = fs.readFileSync(p, "utf-8");
    ctx.type = "application/javascript";
    ctx.body = rewriteImport(ret);
  }

  // 支持 第三方 库 无法去 node_modules 中去找 欺骗浏览器不要报错，
  // 设置一个别名 vue => /@modules/vue 合法路径
  // 改写函数
  function rewriteImport(content) {
    // 正则替换
    return content.replace(/ from ['|"]([^'"]+)['|"]/g, (s0, s1) => {
      // 排除绝对路径或相对路径
      if (s1[0] !== "." && s1[1] !== "/") {
        return ` from '/@modules/${s1}'`;
      } else {
        return s0;
      }
    });
  }
});
app.listen(3000, () => {
  console.log("app sever 3000");
});
