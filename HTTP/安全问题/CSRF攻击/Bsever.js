const express = require("express");
const app = express();

app.use(express.json()); // json
app.use(express.urlencoded({ extends: true })); // x-www-form-urlencoded

app.use((req, res, next) => {
  // res.header("Access-Control-Allow-Origin", "*");
  // 允许客户端跨域传递的请求头
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", true);

  next();
});

app.use(express.static("public"));

app.get("/list", (req, res) => {
  const cookie = req.headers.cookie;
  console.log(req.headers.referer, "req.headers.referer...");
  if (cookie !== "user=allow") {
    res.sendStatus("500");
  } else {
    res.json([
      { id: 1, name: "zhangsan" },
      { id: 2, name: "lisi" },
    ]);
  }
});

app.post("/login", (req, res) => {
  res.cookie("user", "allow", {
    expires: new Date(Date.now() + 86400 * 1000),
    sameSite: "lax",
    secure: true,
  });
  res.send({ data: "success" });
});

app.post("/delete", (req, res) => {
  const cookie = req.headers.cookie;
  if (req.headers.referer !== req.headers.host) {
    console.log("should ban!");
  }
  if (cookie !== "user=allow") {
    res.sendStatus("500");
  } else {
    res.json({
      data: "delete success",
    });
  }
});

app.listen(4000, () => {
  console.log("sever 4000");
});
