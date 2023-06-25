const express = require("express");
const app = express();

app.use(express.static("./public"));

app.use(express.json()); // json
app.use(express.urlencoded({ extends: true })); // x-www-form-urlencoded

const whiteList = ["http://localhost:3000"];

app.use((req, res, next) => {
  // req.header.origin  => whiteList.includes(req.header.origin)
  // if (whiteList.includes(req.header.origin)) {
  //   // 允许哪些来源跨域访问， * 代表允许任何来源
  //   res.header("Access-Controll-Allow-Origin", req.header.origin);
  // }

  // 如果客户端设置了withCredentials为true Origin不能为* 还要设置 withCredentials
  res.header("Access-Controll-Allow-Origin", "*");
  // 如果客户端携带了cookie， 服务端需要返回一个这样的响应头
  res.header("Access-Control-Allow-Credentials", true);
  // 允许客户端跨域传递的请求头
  res.header("Access-Control-Allow-Headers", "Content-Type");
  // 指定在跨域的时候向客户端暴露的响应投头
  res.header("Access-Control-Expose-Headers", "custom-response-header");
  // 正常情况下如何客户端想跨越向服务器发送请求的时候，会发送一个预检请求，判断一下是否允许跨域
  // 设置预检请求的结果可以缓存多久 3600 秒一个小时内不再发送预检请求
  res.header("custom-response-header", "custom");
  if (req.method === "OPTIONS") {
    // 如果客户端发过来的是一个预检用的OPTIONS请求，那么可以直接返回，因为这种请求只需要响应头就行了，不需要响应体
    return res.sendStatus(200);
  }
  // Request header field age is not allowed by Access-Control-Allow-Headers in prefligh response
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// 404 错误处理中间件
app.use((req, res, next) => {
  res.status(404).send("Sorry, the page you requested was not found.");
});

app.get("/users", (req, res) => {
  const newUsers = req.body;
  res.json([{ id: 1, name: "zhangsan" }]);
});

app.get("/count", (req, res) => {
  // 从请求中获取 cookie
  const count = req.cookies.count;
  // 设置 cookie
  res.cookie("count", count + 1, { maxAge: 3600000 });
  res.send("Hello, world!");
});
app.listen(4000, () => {
  console.log("sever 4000");
});
