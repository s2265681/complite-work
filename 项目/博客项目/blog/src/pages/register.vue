
<template>
  <div class="login">
    <img src="https://blog.rockshang.cn/sea.jpg" class="header" alt>
    <div class="title">注册</div>
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
         <el-form-item
          label="真实姓名"
          prop="realname"
          style="color:#000"
          :rules="[
                { required: true, message: '真实姓名不能为空'}
              ]"
          size="mini"
        >
          <el-col :span="20">
            <el-input type="realname" v-model.number="loginForm.realname" auto-complete="off"></el-input>
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
import { accountRegister } from "./../service/getData";
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        realname:""
      },
      showAlert: false,
      userInfo: ""
    };
  },
  methods: {
    //发送登录信息
    async submitForm() {
      if (!this.loginForm.username) {
        return;
      } else if (!this.loginForm.password) {
        return;
      }else if (!this.loginForm.realname) {
        return;
      }
      //用户名注册
      this.userInfo = await accountRegister(
        this.loginForm.username,
        this.loginForm.password,
        this.loginForm.realname,
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
        this.$router.push("/login");
      }

      // await getBlogList()
      // await accountRegister(this.loginForm.username, this.loginForm.password);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  }
};
</script>
<style>
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
</style>