const express = require("express");
const app = express();

app.get("/jsonp", (req, res) => {
  console.log("sssss");
  // 查询参数
  const { jsonp, q, w } = req.query;
  const result = {
    g: Array.from({ length: 10 }, (_, i) => ({ q: `${w}${i + 1}` })),
  };
  // res.send(`${jsonp}(${JSON.stringify(result)})`);
  res.send("<p>some html</p>");
});

app.listen(4000, () => {
  console.log("sever 4000");
});
