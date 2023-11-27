const formater = require("./formater");
console.log(formater, "formater....");

const req = {
  method: "GET",
  url: "/",
  version: "HTTP/1.1",
  headers: { "user-agent": "curl/7.71.1", accept: "*/*" },
  body: "",
};

console.log(formater.format(req));

var net = require("net");
const client = net.connect(80, "www.baidu.com", () => {
  console.log("连接到服务器！");
  client.write(formater.format(req));
});
// let n = 3;
// const interval = setInterval(() => {
//   const msg = "Time " + new Date().getTime();
//   console.log("客户端发送: " + msg);
//   client.write(msg);
//   if (n-- === 0) {
//     client.end();
//     clearInterval(interval);
//   }
// }, 500);
client.on("data", function (data) {
  console.log(data.toString());
  client.end();
});

client.on("end", function () {
  console.log("断开与服务器的连接");
});
