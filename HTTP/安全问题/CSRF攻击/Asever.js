const express = require("express");
const app = express();

// 这个一定要放禁用页面下方
app.use(express.static("public"));

app.listen(3000, () => {
  console.log("sever 3000");
});
