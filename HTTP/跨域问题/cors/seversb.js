const express = require("express");
const app = express();

app.use(express.static("public"));

app.use(express.json()); // json
app.use(express.urlencoded({ extends: true })); // x-www-form-urlencoded

const whiteList = ["http://localhost:3000"];

app.use((req, res, next) => {
  // 允许哪些来源跨域访问， * 代表允许任何来源
  if (whiteList.includes(req.headers.origin)) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
  }
  // 如果客户端设置了withCredentials为true Origin不能为* 还要设置 withCredentials
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  // 如果客户端携带了cookie， 服务端需要返回一个这样的响应头
  res.header("Access-Control-Allow-Credentials", true);
  // 允许客户端跨域传递的请求头
  res.header(
    "Access-Control-Allow-Headers",
    // "Authorization, Content-Type, custom, credentials"
    "custom, Content-Type, Accept"
  );
  //  指定在跨域的时候向客户端暴露的响应投头
  res.header("Access-Control-Expose-Headers", "custom-response-header");
  //  正常情况下如何客户端想跨越向服务器发送请求的时候，会发送一个预检请求，判断一下是否允许跨域
  //  设置预检请求的结果可以缓存多久 3600 秒一个小时内不再发送预检请求
  res.header("custom-response-header", "custom");

  if (req.method === "OPTIONS") {
    // 如果客户端发过来的是一个预检用的OPTIONS请求，那么可以直接返回，因为这种请求只需要响应头就行了，不需要响应体
    return res.sendStatus(200);
  }
  next();
});

app.get("/users", (req, res) => {
  res.json([{ id: 1, name: "zhangsan" }]);
});

app.get("/count", (req, res) => {
  const countStr = req.headers.cookie || 1;
  const count = countStr?.replace?.("countzzz=", "") || 0;
  // 从请求中获取 cookie
  res.cookie("countzzz", +count + 1, {
    expires: new Date(Date.now() + 86400 * 1000), // 过期时间为 24 小时后
    httpOnly: true, // 限制客户端 JavaScript 访问 Cookie
    path: "/", // 设置 Cookie 的路径
    secure: true, // 只在 HTTPS 连接下传输 Cookie
    domain: "localhost", // 设置 Cookie 的域名
    sameSite: "None", // 跨站点携带cookie
  });
  res.send({
    count: +count + 1,
  });
});
app.listen(4000, () => {
  console.log("sever 4000");
});
