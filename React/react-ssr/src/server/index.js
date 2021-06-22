import React, { Component, Fragment } from "react";
let express = require("express");
let app = express();

app.use(express.static("public"));
import render from './render'
app.get("*", (req, res) => {
    render(req, res)
});

app.listen(3000, function () {
  console.log(`server started at port 3000`);
});
