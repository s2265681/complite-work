const Koa = require("koa");
const fs = require("fs");
const path = require("path");
const app = new Koa();
const compilerSfc = require("@vue/compiler-sfc");
const compilerDom = require("@vue/compiler-dom");

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
  } else if (url.includes(".vue")) {
    // 最后导出的是 {render:render(ctx,catch){xxx}, setup:(){xxx}}
    // 支持 SFC 组件 单文件组件
    // *.vue => template 模板 => render 函数
    const p = path.resolve(__dirname, url.split("?")[0].slice(1));
    const { descriptor } = compilerSfc.parse(fs.readFileSync(p, "utf-8"));
    if (!query.type) {
      // 第一步 vue 文件  => template 模板 、script ( compiler-sfc ) 检查.vue 中是不是有模版
      // descriptor.script => js + template 生成 render 部分
      ctx.type = "application/javascript";
      // 借用vue自导的compile框架 解析但文件组件，其实相当于vue-loader做的事情
      ctx.body = `
      ${rewriteImport(
        descriptor.script.content.replace(
          "export default ",
          "const __script = "
        )
      )}
      import { render as __render } from "${url}?type=template"
      __script.render = __render
      export default __script
      `;
    } else {
      // 第二步 template 模版 => render 函数 ( compiler-dom )
      const template = descriptor.template;
      const render = compilerDom.compile(template.content, { mode: "module" });
      console.log(render, "render..");
      ctx.type = "application/javascript";
      ctx.body = rewriteImport(render.code);
    }
  } else if (url.includes(".css")) {
    // 利用css 转化为js
    // 利用js添加一个style标签
    const p = path.resolve(__dirname, url.slice(1));
    const file = fs.readFileSync(p, "utf-8");
    const content = `
     const css = "${file.replace(/\n/g, "")}"
     let link = document.createElement('style')
     link.setAttribute('type','text/css')
     document.head.appendChild(link)
     link.innerHTML = css
     export default css
    `;
    ctx.type = "application/javascript";
    ctx.body = content;
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
