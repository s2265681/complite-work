const express = require("express");
const app = express();

app.use(express.static("./public"));

// 404 错误处理中间件
app.use((req, res, next) => {
  res.status(404).send("Sorry, the page you requested was not found.");
});

app.listen(3000, () => {
  console.log("sever 3000");
});
