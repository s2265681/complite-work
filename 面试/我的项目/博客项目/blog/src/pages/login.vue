
<template>
  <div class="login">
    <img src="https://blog.rockshang.cn/sea.jpg" class="header" alt>
    <span class="logintxt">
      <span @click="toRegiter">注册</span>|
      <span @click="wxLogin">微信登录</span>
    </span>
    <div class="title">登录</div>
    
    <div class="loginForm">
      <el-form :model="loginForm" ref="loginForm" label-width="100px">
        <el-form-item
          label="用户名"
          prop="username"
          style="color:#000"
          :rules="[
                { required: true, message: '用户名不能为空'}
              ]"
          size="mini"
        >
          <el-col :span="20">
            <el-input type="username" v-model.number="loginForm.username" auto-complete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          style="color:#000"
          :rules="[
                { required: true, message: '密码不能为空'}
              ]"
          size="mini"
        >
          <el-col :span="20">
            <el-input type="password" v-model.number="loginForm.password" auto-complete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')" size="mini">提交</el-button>
          <el-button @click="resetForm('loginForm')" size="mini">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- <alert-tip v-if="true" :showHide="showAlert" :alertText="1111"></alert-tip> -->
  </div>
</template>
<script>
import { accountLogin } from "./../service/getData";
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      showAlert: false,
      userInfo: ""
    };
  },
    mounted(){
    // https%3A%2F%2Fwww.rockshang.cn%2F%23%2Flogin
    // https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxbe670ef0710c928a&redirect_uri=https%3A%2F%2Fwww.rockshang.cn%2F%23%2Flogin&response_type=code&scope=snsapi_base#wechat_redirect
     
  },
  methods: {
    //发送登录信息
    async submitForm() {
      if (!this.loginForm.username) {
        return;
      } else if (!this.loginForm.password) {
        return;
      }
      //用户名登录
      this.userInfo = await accountLogin(
        this.loginForm.username,
        this.loginForm.password
      );
      if (this.userInfo.errno === -1) {
        this.$message({
          message: this.userInfo.message,
          type: "error"
        });
      } else {
        this.$message({
          message: this.userInfo.message,
          type: "success"
        });
        this.$router.push("/index");
      }

      // await getBlogList()
      await accountLogin(this.loginForm.username, this.loginForm.password);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toRegiter() {
      console.log("33");
      this.$router.push("./register");
    },
    wxLogin(){
    window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxbe670ef0710c928a&redirect_uri=https%3A%2F%2Fblog.rockshang.cn%2F%23%2Findex&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'

    }
  }
};
</script>
<style scoped>
.title {
   position: fixed;
  width: 100%;
  text-align: center;
  font-size: 0.6rem;
  color: #5d2f2f;
  top: 0.25rem;
}

.header {
  background-color: #55547be0;
  width: "100%";
}
.login {
  background-color: hsla(242, 19%, 41%, 0.878);
  height: 100vh;
}
.loginForm .el-form-item__label {
  color: #333;
}

.logintxt {
  position: fixed;
  right: 0.3rem;
  font-size: 0.35rem;
  color: #9e3519;
  top: 0.1rem;
  z-index: 1;
}
</style>