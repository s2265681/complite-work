// var net = require("net");
// var server = net.createServer((connection) => {
//   console.log("client connected");
//   connection.on("data", (data) => {
//     console.log("Server接收: " + data.toString());
//   });
//   connection.on("end", function () {
//     console.log("客户端关闭连接");
//   });
//   connection.end("Hello I am \r\n");
// });
// server.listen(3000, function () {
//   console.log("server is listening at 3000");
// });

const net = require("net");

const createFormater = require("./formater");
const formater = createFormater("response");
const res = {
  version: "HTTP/1.1",
  status: "200",
  message: "OK",
  headers: {
    date: "Sat, 04 Dec 2021 14",
    connection: "keep-alive",
    "keep-alive": "timeout=5",
    // "content-length": "19",
  },
  body: "<h1> Hello HTTP<h1>",
};

const server = net.createServer(function (connection) {
  console.log("client connected");
  connection.on("data", (data) => {
    console.log(data.toString());
  });
  connection.on("end", function () {
    console.log("客户端关闭连接");
  });
  connection.end(formater.format.call(res));
});
server.listen(3000, function () {
  console.log("server is listening");
});
