const express = require("express");
const app = express();

const whiteList = ["http://127.0.0.1:5501"];
app.use((req, res, next) => {
  // 允许哪些来源跨域访问， * 代表允许任何来源
  if (whiteList.includes(req.headers.origin)) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
  }
  // 如果客户端设置了withCredentials为true Origin不能为* 还要设置 withCredentials
  res.header("Access-Control-Allow-Credentials", true);

  // 允许客户端跨域传递的请求头
  res.header("Access-Control-Allow-Headers", "custom, Content-Type");
  //  指定在跨域的时候向客户端暴露的响应投头
  res.header("Access-Control-Expose-Headers", "custom-response-header");
  //  正常情况下如何客户端想跨越向服务器发送请求的时候，会发送一个预检请求，判断一下是否允许跨域
  res.header("custom-response-header", "custom");
  //  设置预检请求的结果可以缓存多久 3600 秒一个小时内不再发送预检请求
  res.header("Access-Control-Max-Age", "3600");

  // 如果客户端携带了cookie， 服务端需要返回一个这样的响应头
  res.header("Cache-Control", "max-age=3600"); // 设置1小时强缓存

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.post("/users", (req, res) => {
  console.log(req.headers.cookie, "req.headers.cookie");
  const cookie = req.headers.cookie;
  console.log(cookie, "cookie");
  // res.cookie("countzzz", 1, {
  //   expires: new Date(Date.now() + 86400 * 1000), // 过期时间为 24 小时后
  //   httpOnly: true, // 限制客户端 JavaScript 访问 Cookie
  //   path: "/", // 设置 Cookie 的路径
  //   secure: true, // 只在 HTTPS 连接下传输 Cookie
  //   domain: "localhost", // 设置 Cookie 的域名
  //   sameSite: "None", // 跨站点携带cookie
  // });
  res.json([{ id: 1, name: "zhangsan11" }]);
});

app.listen(3000, () => {
  console.log("sever 3000");
});
