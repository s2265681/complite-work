const express = require("express");
const fs = require("fs");
const { docx2html } = require("zl-docx2html");
// const docx2html = require("docx2html");
const path = require("path");
var mammoth = require("mammoth");
let fileName = "test.docx";
let docxPath = path.join(path.resolve("."), fileName); //通过path.join可以解决mac和window路径规则不一致的情况
let outPath = path.join(
  path.resolve("."),
  "/html",
  fileName.split(".")[0] + ".html"
);
const app = express();

app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });

  // (
  //   // 生成html到本地
  //   async function () {
  //     await docx2html({
  //       docxPath: docxPath,
  //       outPath: outPath,
  //       showWarnMessage: false,
  //       imgTobase64: true,
  //     });
  //     res.send("创建成功");
  //   }
  // )();

  // 生成内容输出到浏览器
  useMammothFn((text) => {
    res.end(text);
  });
});

const useMammothFn = (callback) => {
  mammoth
    .convertToHtml({ path: docxPath })
    .then(function (result) {
      var text = result.value;
      callback && callback(text);
    })
    .done();
};

app.listen(3001, () => {
  console.log("App listen at 3001");
});
