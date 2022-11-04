/*
 * @Version: 2.0
 * @Autor: rockshang
 * @Date: 2021-12-06 08:36:36
 */

const http = require("http");
const fs = require("fs");

let server = http.createServer(function (request, response) {
  console.log("request come", request.url);
  const html = fs.readFileSync("index.html", "utf-8");
  response.writeHead(200, {
    "content-Type": "text/html", // text/plain
  });
  response.end(html);
});

server.listen(8887);
console.log('listen 8887')
