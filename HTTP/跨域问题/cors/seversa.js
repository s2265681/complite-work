const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/count", (req, res) => {
  // 从请求中获取 cookie
  console.log(req.cookie, "cookie");
  const count = req.cookies?.count;
  // 设置 cookie
  res.cookie("count", count + 1, { maxAge: 3600000 });
  res.send("Hello, world!");
});

app.listen(3000, () => {
  console.log("sever 3000");
});
