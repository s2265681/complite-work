/*
 * @Version: 2.0
 * @Autor: rockshang
 * @Date: 2021-12-06 08:36:36
 */

const http = require("http");

let server = http.createServer(function (request, response) {
  console.log("request come", request.headers.referer.slice(0, -1));
  let reqUrl = request.headers.referer.slice(0, -1);
  let allowRequestUrl = ["http://127.0.0.1:8887"];
  // Access to XMLHttpRequest at 'http://127.0.0.1:8888/' from origin 'http://127.0.0.1:8887' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
  let allowOriginUrl = allowRequestUrl.includes(reqUrl) ? reqUrl : "";
  console.log(reqUrl, allowOriginUrl, "allowOriginUrl...");
  response.writeHead(200, {
    "Access-Control-Allow-Origin": allowOriginUrl,
  });
  response.end("123");
});

server.listen(8888);
console.log("listen 8888");
