### 1、前言

Socket.io将数据传输部分独立出来形成engine.io，engine.io对WebSocket和AJAX轮询进行了封装，形成了一套API，屏蔽了细节差异和兼容性问题，实现了跨浏览器/跨设备进行双向数据通信。
WebSocket是一种**双向通信协议，**WebSocket与HTTP协议一样都是基于TCP的

### 2、功能与效果

- 登陆、登出
- 多用户聊天
- 效果如下

                                    ![未命名.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0da774340c20497795aefcb5f2798d4f~tplv-k3u1fbpfcp-zoom-1.image)

### 3、目录结构

                                        ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c72f63ba6e340019e2ee720b38b4148~tplv-k3u1fbpfcp-zoom-1.image)


### 4、Node端服务

socket.io 服务需要依赖http服务，通过安装express，起一个http服务，然后安装socket.io

```javascript
npm i socket.io express -S
```


通过访问localhost:3000 访问页面

```javascript
// app.js
const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.get("/", function (req, res, next) {
  res.sendFile(__dirname + "/index.html");
});

server.listen("3000", function () {
  console.log("服务启动在3000");
});
```


###### 服务端用到的socket.io的api

```javascript
const io = require("socket.io")(server);
// 连接socket.io
io.on("connect", (socket) => {
    // socket.emit 代表着向客户端发送消息，客户端通过 socket.on("receive", params); 接收
    socket.emit("receive",params);
    // socket.on('send') 代表着接收客户端发来的消息， 客户端通过 socket.emit("send", params); 发送
    socket.on("send",params);
    // io.emit("all") 代表广播，给每个客户端发消息
    io.emit("all",params)
}) 
```


### 5、客户端socket的使用

客户端主要是使用socket.io的 emit 发送消息和on接收消息，和服务端的api相同
index.html

```javascript
// 客户端需要引入包
<script src="/socket.io/socket.io.js"></script>
<script>
    // 使用
    let socket = io("http://localhost:3000");
    // 1、等待服务端的消息通知
    socket.on("notify", (username) => {
      message(`${username}加入进来了!`, 1);
    });
     // 2、发送消息给服务端
    function send() {
      if (!info.value) message("请输入消息", 0);
      socket.emit("message", people);
    }
</script>
```


### 6、用户登陆和列表展示流程

- 客户端登陆通过sock.emit 将账号名称发给服务端
- 服务端通过socket.emit 发送给客户端登陆成功，  通过 io.emit 广播给所有客户端
- 服务端保存用户信息到user中，广播给客户端
- 客户端通过拿到的数据展示





### 7、完成代码

#### 1、客户端

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Title</title>
  </head>
  <style>
    #btn,
    #info {
      display: none;
    }
  </style>
  <body>
    <h4>简易聊天室</h4>
    <div>
      当前用户列表
      <ul id="userList"></ul>
    </div>
    <input type="text" id="account" />
    <button onclick="login()">登陆</button>
    <button onclick="loginOut()">退出登陆</button>
    

    <input type="text" id="info" />
    <button id="btn" onclick="send()">发送</button>
    <div id="text"></div>
    <script src="/socket.io/socket.io.js"></script>
    <script>
      let account = document.querySelector("#account");
      let info = document.querySelector("#info");
      let text = document.querySelector("#text");
      let btn = document.querySelector("#btn");
      let userList = document.querySelector("#userList");
      let socket = io("http://localhost:3000");

      let SUCCESS = "#4d834d",
        ERROR = "#f00",
        OTHER = "orange";

      let people = {
        username: "",
        message: "",
      };

      // 1、 登陆成功，通知服务端，广播消息
      function login() {
        let accountName = account.value;
        if (!accountName) return message("请输入账号！", 0);
        if (people.username) return message("您已登陆！", 0);
        people.username = accountName;
        socket.emit("login", accountName);
      }

      socket.on("loginSuccess", (users) => {
        message(people.username + "登陆成功！", 1);
        info.style.display = "inline-block";
        btn.style.display = "inline-block";
      });

      socket.on("updateUserList", (users) => {
        // 更新用户列表
        let liTxt = "";
        users.map((item) => {
          let txt =
            item.username === people.username
              ? item.username + "(本人)"
              : item.username;
          liTxt += "<li style='color:blue;'>" + txt + "</li>";
        });
        userList.innerHTML = liTxt;
      });

      // 2、发送消息，广播消息
      function send() {
        if (!info.value) message("请输入消息", 0);
        people.message = info.value;
        info.value = "";
        socket.emit("message", people);
      }

      // 3、退出操作
      function loginOut() {
        socket.emit("loginOut");
        info.style.display = "none";
        btn.style.display = "none";
        account.value = "";
        people = {};
      }

      socket.on("loginOut", (username) => {
        if (username) {
          message(username + "退出了群聊！", 0);
          return;
        }
        message("您未登陆！", 0);
      });

      // 处理加入通知
      socket.on("notify", (username) => {
        message(`${username}加入进来了!`, 1);
      });

      // 接收处理消息
      socket.on("recevied", (username, msg) => {
        let date = new Date().toLocaleString();
        message(`${username}: ${msg}---------${date}`, 3);
      });

      // 统一处理消息
      function message(message, status) {
        let color = { 1: SUCCESS, 0: ERROR, 3: OTHER };
        text.innerHTML += `<span style='color:${color[status]};'>${message}</span><br/>`;
      }
    </script>
  </body>
</html>

```


#### 2、服务端

```javascript
const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

server.listen("3000", function () {
  console.log("服务启动在3000");
});

app.get("/", function (req, res, next) {
  res.sendFile(__dirname + "/index.html");
});

let users = []; // 记录当前所有用户信息

// 连接
io.on("connect", (socket) => {
  // 登陆处理
  socket.on("login", (username) => {
    users.push({
      username: username,
    });
    socket.username = username;
    name = username;
    // 推送登陆成功
    socket.emit("loginSuccess");
    //广播事件 io.emi 加入通知
    io.emit("notify", username);
    io.emit("updateUserList", users);
  });
  // 消息处理
  socket.on("message", (people) => {
    let { username, message } = people;
    io.emit("recevied", username, message);
  });

  // 退出连接
  socket.on("loginOut", () => {
    // 退出的时候广播，退出处理
    io.emit("loginOut", socket.username);
    users = users.filter((item) => item.username !== socket.username);
    socket.username = "";
    io.emit("updateUserList", users, socket.username);
  });
});

```

### 

### 5、参考

##### 文档：[https://socket.io/docs/v3/index.html](https://socket.io/docs/v3/index.html)

##### websocket+nodejs实现聊天室:  [https://juejin.cn/post/6844904178481889293](https://juejin.cn/post/6844904178481889293)

