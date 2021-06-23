//https://socket.io/docs/v3/server-api/
// var socket = io();
var socket = io.connect('http://localhost:3000/login');
var app = new Vue({
  el: "#login",
  data: {
    avatars: [
      "./image/avatar.jpg",
      "./image/avatar01.jpg",
      "./image/avatar02.jpg",
      "./image/avatar03.jpg",
      "./image/avatar04.jpg",
      "./image/avatar05.jpg",
      "./image/avatar06.jpg",
      "./image/avatar07.jpg",
      "./image/avatar08.jpg",
      "./image/avatar09.jpg",
      "./image/avatar10.jpg",
      "./image/bg.jpg",
    ],
    loginFormVisible: true,
    userInfoform: {
      avatar: "",
      id: "",
      username: "",
      count: 0,
      userId:''
    },
    formLabelWidth: "120px",
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
    socket.on("loginSuccess", this.loginSuccess);
    socket.on("loginFail", this.loginFail);
  },
  methods: {
    // 登陆
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        //   this.loginFormVisible = false;
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
      this.$message({
        message: "恭喜你，登陆成功！",
        type: "success",
      });
      setTimeout(()=>{
        window.location.href = "/index.html?userId="+ encodeURI(`${userInfo.userId}`)
      },500)
    },
     // 登陆失败
     loginFail(msg = '登陆失败！') {
        this.$message({
          message:msg,
          type: "error",
        });
        this.resetForm()
      },
    // 重置表单
    resetForm(formName='loginForm') {
      this.$refs[formName].resetFields();
    }
  },
});
