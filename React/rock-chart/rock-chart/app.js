const app = require("express")();
const server = require("http").Server(app);
const moment = require("moment");
var UUID = require("uuid");
const io = require("socket.io")(server);
const { UserModel, MessageModel } = require("./db");

app.get("/", (req, res) => {
  // 重定向到首页
  res.redirect("/login.html");
});
// let users = []; // 记录当前所有用户信息 { avatar: "",id: "", username: "", count: 0} count 未读消息数量
// let messageList = []; // 存放消息 { avatar: "", id: "1", username: "沉默王二", data_time: "12:00", message: "你好啊，重阳微噪", fromWho:'' , toWho:'大厅' , to '' }
const checkToken = async function (userId, socket, chat) {
  let userInfoform = (await UserModel.findOne({ userId: userId })) || {};
  if (userInfoform.id && userInfoform.islogin) {
    // 有这个用户 首先更新一下 sockId
    if (socket.id !== userInfoform.id) {
      await UserModel.updateOne(
        { id: userInfoform.id },
        { $set: { id: socket.id } },
        { multi: true }
      );
      socket.broadcast.emit("notify", userInfoform);
      userInfoform = (await UserModel.findOne({ userId: userId })) || {};
      let users = await UserModel.find({ islogin: 1 });
      // 查我的消息 和发给我的消息 和大厅消息
      let messageList = await MessageModel.find();
      socket.emit("loginSuccess", userInfoform, users, messageList);
      chat.emit("updateUserList", users);
    }
  } else if (userInfoform.id && !userInfoform.islogin) {
    socket.emit("loginFail", "您已退出, 请重新登陆!");
  } else {
    socket.emit("loginFail", "该用户没有权限, 请重新登陆!");
  }
};

var chat = io.of("/chat").on("connection", function (socket) {
  let userId = socket.handshake.query.userId;
  userId = decodeURI(userId);
  if (userId) checkToken(userId, socket, chat);
  // 退出连接
  const disconnect = async () => {
    let userId = socket.handshake.query.userId;
    let user = await UserModel.findOne({ userId: userId });
    if (userId && user !== "null" && user.islogin) {
      socket.broadcast.emit("sockedloginOut", user.username);
      await UserModel.updateOne(
        { userId: userId },
        { $set: { islogin: 0 } },
        { multi: true }
      );
      let users = await UserModel.find({ islogin: 1 });
      // 更新用户列表
      await chat.emit("updateUserList", users);
    }
  };
  //监听用户断开连接  和用户主动退出 刷新保留 非正常情况下 退出不能更新了
  socket.on("disconnect", disconnect);
  socket.on("loginOut", disconnect);
  // 接收消息 发送给所有人 参数第一个 谁发的 第二个 发给谁  第三个具体信息  第四个 是所有人信息还是私聊 everyone|someone
  socket.on(
    "to send msg",
    async (userInfo, toWho, message, sockedType = "everyone") => {
      await MessageModel.insertMany({
        username: userInfo.username,
        avatar: userInfo.avatar,
        id: userInfo.id,
        toWhoId: toWho.id,
        toWhoName: toWho.username,
        toWho,
        uuid: UUID.v1(),
        message,
        isRead: 0, // 所有消息都是未读的
        data_time: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      });
      let messageList = await MessageModel.find();
      // 写入数据库
      if (sockedType === "everyone")
        chat.emit("receviedMessage", toWho, messageList);
      if (sockedType === "someone")
        chat
          .to(socket.id)
          .to(toWho.id)
          .emit("receviedMessage", toWho, messageList);
    }
  );
  // 处理谁正在输入...
  socket.on("isInputing", (userInfo, toWho) => {
    chat.to(toWho.id).emit("isInputting", userInfo, toWho);
  });

  // 断开连接
  socket.on("error", (reason) => {
    console.log(reason + "发生错误");
  });
});

var login = io.of("/login").on("connection", function (socket) {
  socket.on("login", async (userInfoform) => {
    let hasRes = await UserModel.findOne({ username: userInfoform.username });
    let data_time = new Date().toLocaleString();
    if (!hasRes) {
      let userId = UUID.v1();
      await UserModel.insertMany({
        avatar: userInfoform.avatar || "./image/avatar.jpg",
        username: userInfoform.username,
        count: userInfoform.count || 0,
        data_time,
        id: socket.id,
        userId,
        islogin: 1, //  islogin 1 登陆中 or 0 退出了
      });
      userInfoform.userId = userId;
    } else {
      // 更新为登陆中
      await UserModel.updateOne(
        { username: userInfoform.username },
        { $set: { islogin: 1, data_time, avatar: userInfoform.avatar } },
        { multi: true }
      );
      userInfoform.userId = hasRes.userId;
    }
    // 推送登陆成功 更新自己
    socket.emit("loginSuccess", userInfoform);
  });
});
//处理静态资源,把public目录设置为静态资源
app.use(require("express").static("public"));

server.listen("3000", function () {
  console.log("服务启动在3000");
});
