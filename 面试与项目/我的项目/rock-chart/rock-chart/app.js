const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const moment = require("moment");
var UUID = require("uuid");

app.get("/", (req, res) => {
    console.log('ssss')
  //重定向到首页
  res.redirect("/index.html");
});

let users = []; // 记录当前所有用户信息 { avatar: "",id: "", username: "", count: 0} count 未读消息数量
let messageList = []; // 存放消息 { avatar: "", id: "1", username: "沉默王二", data_time: "12:00", message: "你好啊，重阳微噪", fromWho:'' , toWho:'大厅' , to '' }

// 连接
io.on("connect", (socket) => {
  // 登陆处理
  socket.on("login", (userInfoform) => {
    users.push(userInfoform);
    socket.userId = userInfoform.id;
    socket.username = userInfoform.username;
    userInfoform.data_time = new Date().toLocaleString();
    // 推送登陆成功
    socket.emit("loginSuccess");
    // socket.broadcast.emit 加入通知 除去自己
    socket.broadcast.emit("notify", userInfoform);
    // 广播事件 io.emi  包括自己都可以收到 登陆成功更新 用户列表和消息列表
    io.emit("updateUserList", users);
  });
  // 退出连接
  const disconnect = (userInfo) => {
    if (!socket.userId) return;
    socket.broadcast.emit("sockedloginOut", socket.username);
    users = users.filter((item) => item.id !== socket.userId);
    socket.userId = "";
    io.emit("updateUserList", users);
  };
  //监听用户断开连接  和用户主动退出
  socket.on("disconnect", disconnect);
  socket.on("loginOut", disconnect);
  // 接收消息 发送给所有人 参数第一个 谁发的 第二个 发给谁  第三个具体信息  第四个 是所有人信息还是私聊 everyone|someone
  socket.on(
    "to send msg",
    (userInfo, toWho, message, sockedType = "everyone") => {
      let newMsg = {
        ...userInfo,
        toWhoId: toWho.id,
        toWho,
        message,
        uuid: UUID.v1(),
        isRead: 0, // 所有消息都是未读的
        data_time: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      };
      messageList.push(newMsg);
      if (sockedType === "everyone")
        io.emit("receviedMessage", toWho, messageList);
      if (sockedType === "someone")
        io.to(userInfo.id)
          .to(toWho.id)
          .emit("receviedMessage", toWho, messageList);
    }
  );

  // 断开连接
  socket.on("error", (reason) => {
    console.log(reason + "发生错误");
  });
});

//处理静态资源,把public目录设置为静态资源
app.use(require("express").static("public"));
  

server.listen("3000", function () {
  console.log("服务启动在3000");
});
