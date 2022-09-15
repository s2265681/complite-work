// const express = require('express')
const express = require("./express");

const app = express();

app.get("/", (req, res) => {
  res.end("helloWord");
});

app.get("/users", (req, res) => {
  res.end(JSON.stringify({ name: "abc" }));
});

app.listen(3004, () => {
  console.log("App listen at 3004");
});
