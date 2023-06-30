const express = require("express");
const app = express();

app.use(express.static("public"));
// 404 错误处理中间件
const whiteList = ["http://127.0.0.1:5501"];

app.get("/users", (req, res) => {
  res.json([{ id: 1, name: "zhangsan" }]);
});

app.get("/list", (req, res) => {
  res.json([
    { id: 1, list: "1" },
    { id: 2, list: "2" },
  ]);
});

app.listen(4000, () => {
  console.log("sever 4000");
});
