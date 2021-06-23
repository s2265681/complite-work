//https://socket.io/docs/v3/server-api/
var socket = io.connect("http://localhost:3000/chat");
var socket;
var app = new Vue({
  el: "#app",
  data: {
    userInfoform: {
      avatar: "",
      id: "",
      username: "",
      count: 0,
    },
    title: "rock chart!",
    active_user: {
      avatar: "",
      id: "METTING",
      username: "大厅",
    },
    chartList: [],
    // msgInfo: "",
    meeting: {
      avatar: "./image/avatar2.jpg",
      id: "METTING",
      username: "大厅",
      toWhoId: "METTING",
      isRead: 1,
      count: 0,
    },
    defaultMsg: {
      avatar: "./image/avatar2.jpg",
      id: "METTING",
      username: "官方",
      data_time: "12:00",
      message: "欢迎来到聊天室",
      type: 1, // 1 代表左边 我接收的消息  2 代表右边 我发出的消息
      toWho: "ereryOne",
      toWhoId: "METTING",
    },
    messageList: [],
    chartAreaDomHeight: 345,
    msglistAreaDomHeight: 0,
    chartAreaTop: 0, // 右侧区域据上面的高度
    show: false,
    // 新消息
    allNoReadCount: 0,
    // 处理未读的数组
    unReadList: [], // 未读消息列表
    receiveMsgList: [], // 我接收的所有消息
    isPackup: false,
    isInputUser: { username: "", receiveId: "" },
  },
  beforeCreate() {
    const loading = this.$loading({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(250, 250, 250, 0.8)",
    });
    setTimeout(() => {
      loading.close();
    }, 500);
  },
  created() {
    var userId = window.location.search.slice(8);
    // 将当前用户id传入
    socket = io.connect("http://localhost:3000/chat", {
      query: {
        userId: decodeURI(userId),
      },
    });
    socket.on("notify", this.notify);
    socket.on("updateUserList", this.updateUserList);
    socket.on("sockedloginOut", this.sockedloginOut);
    socket.on("receviedMessage", this.receviedMessage);
    socket.on("isInputting", this.isInputting);
    socket.on("loginFail", this.loginFail);
    socket.on("loginSuccess", this.loginSuccess);
  },
  mounted() {
    this.msglistAreaDomHeight = this.$refs.message_list_area.clientHeight;
    this.$refs.right_chart_container.addEventListener(
      "scroll",
      this.scrollHander,
      true
    );

    //发送表情
  },
  computed: {
    isShowToBottom: function () {
      let chartAreaDomHeight = this.chartAreaDomHeight;
      let msglistAreaDomHeight = this.msglistAreaDomHeight;
      this.show = false;
      if (chartAreaDomHeight + this.chartAreaTop < msglistAreaDomHeight - 30) {
        this.show = true;
      }
      return this.show;
    },
    filterMessageList: function () {
      let msg = [];
      // 大厅情况下
      if (this.active_user.id === "METTING") {
        msg = [
          this.defaultMsg,
          ...this.messageList.filter((el) => el.toWhoId === "METTING"),
        ];
      } else {
        // 非大厅
        // 过滤掉非大厅的
        msg = this.messageList.filter((el) => el.toWhoId !== "METTING");
        // 过滤出我收到的和我发出的
        msg = msg.filter(
          (item) =>
            item.toWhoId === this.userInfoform.id ||
            item.id === this.userInfoform.id
        );
        // 过滤出当前标签 我发出的 和 发给我的
        msg = msg.filter(
          (item) =>
            item.toWhoId === this.active_user.id ||
            item.id === this.active_user.id
        );
      }
      // 处理 自己发的消息的时候 滚到最下面
      msg.map((item) => {
        if (
          item.id === this.userInfoform.id &&
          this.active_user.id === item.toWhoId
        ) {
          this.backNewMsg();
        }
      });
      return msg;
    },
  },
  watch: {
    receiveMsgList: function () {
      debugger;
      // 改变总的消息数量
      let unReadList = this.receiveMsgList.filter((el) => el.isRead === 0);
      // 还要过滤掉不是发给本人的消息
      unReadList = unReadList.filter(
        (el) => el.toWhoId === "METTING" || el.toWhoId === this.userInfoform.id
      );
      this.allNoReadCount = unReadList.length;
      // 改变单个用户列表的数量变化
      let sifaNum = unReadList.filter(
        (el) => el.toWhoId === this.userInfoform.id
      ).length;
      let qufaNum = unReadList.filter((el) => el.toWhoId === "METTING").length;
      this.chartList.forEach((item, index) => {
        // 大厅
        if (item.id === "METTING") {
          item.count = qufaNum;
        } else if (!sifaNum) {
          item.count = 0;
        } else {
          unReadList.forEach((el) => {
            if (el.toWhoId === this.userInfoform.id && item.id === el.id) {
              // 私发
              item.count = sifaNum;
            }
          });
        }
      });
      this.unReadList = unReadList;
    },
  },
  methods: {
    // 登陆
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loginFormVisible = false;
          this.userInfoform.id = socket.id;
          socket.emit("login", this.userInfoform);
        } else {
          return false;
        }
      });
    },
    // 登陆成功的处理
    loginSuccess(userInfo, users, messageList) {
      this.userInfoform = userInfo;
      this.updateUserList(users);
      this.receviedMessage({}, messageList);
    },
    // 登陆失败
    loginFail(msg = "没有权限!") {
      this.$message({
        message: msg,
        type: "error",
      });
      setTimeout(() => {
        window.location.href = "/login.html";
      }, 500);
    },
    // 通知所有用户的消息
    notify(userInfo, users, messageList) {
      this.$message({
        message: `${userInfo.username} 加入了聊天室, 找他聊聊吧！`,
        type: "warning",
      });
    },
    // 更新用户列表
    updateUserList(users) {
      if (this.userInfoform.id) {
        this.chartList = [
          this.meeting,
          ...users.filter((user) => user.id !== this.userInfoform.id),
        ];
        return;
      }
      this.chartList = [
        this.meeting,
        ...users.filter((user) => user.id !== this.userInfoform.id),
      ];
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 退出登陆方法
    loginOut() {
      socket.emit("loginOut", this.userInfoform);
      this.userInfoform = { avatar: "", id: "", username: "" };
      this.$message({ type: "success", message: "退出成功！" });
      setTimeout(() => {
        window.location.href = "/login.html";
      }, 500);
    },
    // 广播退出消息给其他人
    sockedloginOut(username) {
      this.$message({ message: `${username} 退出了聊天室！`, type: "warning" });
    },
    // 处理发送消息
    onKeyDown(event) {
      let evt = window.event || event;
      let msg = evt.target.innerText.trim();
      let sockedType = "everyone"; // 大厅 ereryone or someone 私聊
      let toWho = this.meeting;
      // 正在输入
      socket.emit("isInputing", this.userInfoform, this.active_user);
      if (evt.ctrlKey && evt.keyCode === 13) {
        this.$refs.input_content.innerHTML += "<br/>";
        //设置输入焦点
        var o = this.$refs.input_content.lastChild;
        var textbox = this.$refs.input_content;
        var sel = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(textbox);
        range.collapse(false);
        range.setEndAfter(o); //
        range.setStartAfter(o); //
        sel.removeAllRanges();
        sel.addRange(range);
      }
      if (!evt.ctrlKey && evt.keyCode == 13) {
        evt.preventDefault(); // 不慌换行
        if (!this.$refs.input_content.lastChild)
          return this.$message({ message: "消息不能为空！", type: "error" });
        msg = evt.target.innerHTML;
        if (!this.userInfoform.username)
          return this.$message({ message: "请先登陆！", type: "error" });
        if (this.active_user.id !== "METTING") {
          sockedType = "someone";
          toWho = this.active_user;
        }
        // 重新计算消息高度属性
        this.$nextTick(() => {
          this.msglistAreaDomHeight = this.$refs.message_list_area.clientHeight;
        });
        this.sendMsg(this.userInfoform, sockedType, toWho, msg.trim());
        this.$refs.input_content.innerHTML = "";
      }
    },
    // 对方正在输入
    isInputting(userInfo) {
      this.isInputUser = {
        username: userInfo.username,
        receiveId: userInfo.id,
      };
      setTimeout(() => {
        this.isInputUser = { username: "", receiveId: "" };
      }, 1000);
    },
    // 发送消息 sockedType 判断是群发 还是私发 默认群发
    sendMsg(sendUser, sockedType = "everyone", toWho, messageValue) {
      socket.emit("to send msg", sendUser, toWho, messageValue, sockedType);
    },
    // 接收大厅消息
    receviedMessage(toWho, messageList) {
      // 先根据时间过滤我接收的最新消息吧 后面在改成 生成唯一key
      let arr = this.receiveMsgList;
      this.receiveMsgList = messageList.filter(
        (item) => item.id !== this.userInfoform.id
      );
      this.messageList = messageList;
      if (arr.length === 0) return;

      this.receiveMsgList.forEach((item) => {
        arr.forEach((el) => {
          if (item.uuid === el.uuid) {
            item.isRead = el.isRead;
          }
        });
      });
    },
    // 切换聊天对象
    changeChartObj(userInfo) {
      this.active_user = userInfo;
      // 滑动到底部
      this.backNewMsg();
      // 未读改已读
      this.dealUnread(userInfo.id);
    },
    // 处理未读
    dealUnread(userid) {
      this.receiveMsgList.map((item) => {
        if (userid === "METTING" && item.toWhoId === "METTING") {
          item.isRead = 1;
        } else if (userid === item.id && item.toWhoId !== "METTING") {
          item.isRead = 1;
        }
      });
      this.receiveMsgList = this.receiveMsgList.slice();
    },
    // 滑动区域触发
    scrollHander() {
      this.chartAreaTop = this.$refs.right_chart_container.scrollTop;
    },
    // 回到最新
    backNewMsg() {
      this.isShowToBottom = false;
      this.$nextTick(function () {
        this.$refs.right_chart_container.scrollTo(0, this.msglistAreaDomHeight);
      });
    },
    // 发送图片
    sendImage(e) {
      let _this = this;
      //拿到上传的文件
      var file = e.target.files[0];
      //把文件发送的服务器，使用H5的功能fileReader,读取上传的文件
      var fr = new FileReader();
      fr.readAsDataURL(file);
      let sockedType = "everyone",
        toWho = this.meeting;
      if (this.active_user.id !== "METTING") {
        sockedType = "someone";
        toWho = this.active_user;
      }
      fr.onload = function () {
        _this.sendMsg(_this.userInfoform, sockedType, toWho, fr.result);
      };
    },
  },
});
