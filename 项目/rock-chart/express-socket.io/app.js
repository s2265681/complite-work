const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

server.listen("8080", function () {
  console.log("服务启动在8080");
});

app.get("/", function (req, res, next) {
  res.sendFile(__dirname + "/index.html");
});

let users = []; // 记录当前所有用户信息

// 连接
io.on("connect", (socket) => {
  // 登陆处理w
  socket.on("login", (username, id) => {
    users.push({
      username: username,
      sockedId: id,
    });
    socket.username = username;
    // 推送登陆成功
    socket.emit("loginSuccess");
    //广播事件 io.emi 加入通知
    io.emit("notify", username);
    io.emit("updateUserList", users);
  });

  // 退出连接
  const disconnect = () => {
    if (socket.username) io.emit("loginOut", socket.username);
    users = users.filter((item) => item.username !== socket.username);
    socket.username = "";
    io.emit("updateUserList", users, socket.username);
  };

  //监听用户断开连接  和用户主动退出
  socket.on("disconnect", disconnect);
  socket.on("loginOut", disconnect);

  // 消息处理
  socket.on("message", (people) => {
    let { username, message } = people;
    io.emit("recevied", username, message);
  });

  // 断开连接
  socket.on("error", (reason) => {
    console.log(reason + "发生错误");
  });

  // 发送消息给某人
  socket.on("say to someone", (myId, userId, msg) => {
    let { sockedId, username } = users.find((el) => el.sockedId === myId);
    io.to(myId).to(userId).emit("my message", username, msg);
  });
});
