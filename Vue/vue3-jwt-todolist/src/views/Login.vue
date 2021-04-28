<template>
  <div v-if="state.modalStatus" class="auth-modal-box">
    <div class="auth-form">
      <div class="panfish">
        <img
          v-show="
            !state.usernameInputIsFocus &&
            !state.passwordInputIsFocus &&
            !state.confirmPasswordInputIsFocus
          "
          src="../assets/normal.png"
          class="normal"
          alt=""
        />
        <img
          v-show="state.usernameInputIsFocus"
          src="../assets/greeting.png"
          class="greeting"
          alt=""
        />
        <img
          v-show="
            state.passwordInputIsFocus || state.confirmPasswordInputIsFocus
          "
          src="../assets/blindfold.png"
          class="blindfold"
          alt=""
        />
      </div>
      <div class="panel">
        <span class="title">{{ state.loginType ? '登录' : '注册' }}</span>
        <i class="close-btn" @click="close"></i>
      </div>
      <div class="input-box">
        <input
          class="username"
          :class="state.usernameInputIsFocus && 'focus'"
          type="text"
          maxlength="10"
          v-model="state.username"
          placeholder="请输入用户名/手机号"
          @focus="onFocus('usernameInputIsFocus')"
          @blur="onBlur('usernameInputIsFocus')"
        />
        <input
          class="password"
          :class="state.passwordInputIsFocus && 'focus'"
          type="password"
          maxlength="20"
          v-model="state.password"
          placeholder="请输入密码"
          @keyup.enter="doSubmit"
          @focus="onFocus('passwordInputIsFocus')"
          @blur="onBlur('passwordInputIsFocus')"
        />
        <input
          v-show="!state.loginType"
          class="confirm-password"
          :class="state.confirmPasswordInputIsFocus && 'focus'"
          type="password"
          maxlength="20"
          v-model="state.confirmPassword"
          placeholder="请确认密码"
          @focus="onFocus('confirmPasswordInputIsFocus')"
          @blur="onBlur('confirmPasswordInputIsFocus')"
        />
      </div>

      <button class="submit-btn" @click="submit">
        {{ state.loginType ? '登 录' : '注 册' }}
      </button>
      <div class="prompt-box" @click="switcher">
        {{
          state.loginType
            ? '还未注册？快去注册吧！'
            : '账号已注册，快去登录吧！'
        }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { registerAPI, loginAPI } from '../api/user.js';
export default defineComponent({
  name: 'Login',
  setup(props, ctx) {
    const state = reactive({
      loginType: 1, //0:注册,1:登录
      username: '', //用户名
      password: '', //密码
      confirmPassword: '', //确认密码
      modalStatus: true, //模态框显示隐藏状态
      usernameInputIsFocus: false, //用户名输入框焦点状态
      passwordInputIsFocus: false, //密码输入框焦点状态
      confirmPasswordInputIsFocus: false, //确认密码输入框焦点状态
    });
    const router = useRouter();
    //获取焦点
    function onFocus(statusName) {
      state[statusName] = true;
    }
    //失去焦点
    function onBlur(statusName) {
      state[statusName] = false;
    }
    //关闭模态窗
    function close() {
      state.modalStatus = false;
    }
    //切换登录/注册
    function switcher() {
      state.loginType = state.loginType ? 0 : 1;
      state.username = '';
      state.password = '';
      state.confirmPassword = '';
    }
    //提交
    function submit() {
      if (!state.username.trim()) {
        this.$message.warning('用户名不能为空');
        return;
      }
      if (!state.password.trim()) {
        this.$message.warning('密码不能为空');
        return;
      }
      if (!state.loginType && !state.confirmPassword.trim()) {
        this.$message.warning('确认密码不能为空');
        return;
      }
      if (!state.loginType && state.password !== state.confirmPassword) {
        this.$message.warning('两次密码输入不一致,请重新输入');
        return;
      }
      //注册
      if (!state.loginType) {
        registerAPI({
          username: state.username,
          password: state.password,
        }).then((res) => {
          if (res.error == 0) {
            this.$message.success('注册成功');
            switcher();
          }
        });
      } else {
        //登录
        loginAPI({
          username: state.username,
          password: state.password,
        }).then((res) => {
          if (res.error == 0 && res.data) {
            //将令牌存入本地缓存
            localStorage.setItem('token', res.data.token);
            //路由跳转至首页
            router.replace('/');
            this.$message.success('登录成功');
          }
        });
      }
    }
    //keyup.enter执行提交
    function doSubmit() {
      if (state.loginType) {
        submit.call(this);
      }
    }
    return {
      state,
      close,
      onFocus,
      onBlur,
      switcher,
      submit,
      doSubmit,
    };
  },
});
</script>

<style lang="scss" scoped>
.auth-modal-box {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 500;
  .auth-form {
    position: relative;
    padding: 2rem;
    width: 28rem;
    max-width: 100%;
    font-size: 1.167rem;
    background-color: #fff;
    border-radius: 2px;
    .panfish {
      img {
        height: auto;
        &.normal {
          position: absolute;
          top: 0;
          left: 50%;
          width: 10rem;
          z-index: 1;
          transform: translate(-50%, -83%);
        }
        &.greeting {
          position: absolute;
          top: 0;
          left: 50%;
          width: 10rem;
          z-index: 1;
          transform: translate(-50%, -75.8%);
        }
        &.blindfold {
          position: absolute;
          top: 0;
          left: 50%;
          width: 8.6rem;
          transform: translate(-50%, -75%);
          z-index: 1;
        }
      }
    }
    .panel {
      display: flex;
      justify-content: space-between;
      align-content: center;
      margin: 0 0 2rem;
      .title {
        font-weight: 700;
        font-size: 1.5rem;
      }
      .close-btn {
        position: relative;
        cursor: pointer;
        &::before,
        &::after {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 15px;
          height: 2px;
          content: '';
          border-radius: 1px;
          background-color: #767676;
        }
        &:before {
          transform: translate(-50%, -50%) rotate(45deg);
        }
        &:after {
          transform: translate(-50%, -50%) rotate(-45deg);
        }
      }
    }
    .input-box {
      position: relative;
      margin-bottom: 0.8rem;
      .username,
      .password,
      .confirm-password {
        width: 100%;
        margin-bottom: 0.8rem;
        padding: 10px;
        border: 1px solid #e9e9e9;
        border-radius: 2px;
        outline: none;
        &.focus {
          border-color: #007fff;
        }
      }
    }
    .submit-btn {
      width: 100%;
      height: 3.334rem;
      color: #fff;
      background-color: #007fff;
      border-radius: 2px;
      outline: none;
      box-sizing: border-box;
      cursor: pointer;
      margin-top: 5px;
      border: 0;
      outline: none;
    }
    .prompt-box {
      margin: 1rem 0 0;
      color: #007fff;
      cursor: pointer;
    }
  }
}
</style>
