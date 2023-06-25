const express = require("express");
const app = express();

app.use(express.static("public"));
// 404 错误处理中间件

app.listen(4000, () => {
  console.log("sever 4000");
});
