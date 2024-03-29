const express = require("express");

const app = express();

app.get("/sugrec", (req, res) => {
  // 查询参数
  const { cb, wd } = req.query;
  const result = {
    g: Array.from({ length: 10 }, (_, i) => ({ q: `${wd}${i + 1}` })),
  };
  res.send(`${cb}(${JSON.stringify(result)})`);
});

app.get("/jsonp", (req, res) => {
  // 查询参数
  const { jsonp, q, w } = req.query;
  const result = {
    g: Array.from({ length: 10 }, (_, i) => ({ q: `${w}${i + 1}` })),
  };
  res.send(`${jsonp}(${JSON.stringify(result)})`);
});

app.listen(4000, () => {
  console.log("sever 4000");
});
