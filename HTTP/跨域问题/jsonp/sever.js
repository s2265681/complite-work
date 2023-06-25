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

app.listen(3000, () => {
  console.log("sever 3000");
});
