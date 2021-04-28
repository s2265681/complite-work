<template>
  <div class="about">
    <!-- <h1></h1> -->
     <div class="logo">
      <img src ="https://rockshang.cn/image/rock.jpeg" alt=""/>
    </div>
    <cube-form
      :model="model"
      :schema="schema"
      @submit="submitHandler"
      :options="options"
      @validate="validateHandler"
      @reset="resetHandler"
    >
     <cube-form-group>
          <cube-form-item :field="schema.fields[0]"/>
          <cube-form-item :field="schema.fields[1]"/>
          <cube-form-item :field="schema.fields[2]"/>
           <cube-form-group>
            <cube-button type="submit">注册</cube-button>
          </cube-form-group>
    </cube-form-group>
  
  </cube-form>
  </div>
</template>
<script>
// import axios from "axios";
export default {
  created() {
    // 获取用户信息
    // axios.get("/api/userinfo");
  },
  data() {
    return {
      isVis:false,
      model: {
        username: "",
        password: "",
        realname: ""
      },
      schema: {
        // 表单的结构定义
        fields: [
          // 用户名
          {
            type: "input",
            modelKey: "username",
            label: "用户名",
            props: {
              placeholder: "请输入用户名"
            },
            rules: {
              required: true
            },
            trigger: "blur" // input 输入校验
          },
          {
            type: "input",
            modelKey: "password",
            label: "密码",
            props: {
              type: "password",
              placeholder: "请输入密码"
            },
            rules: {
              required: true
            },
            trigger: "blur"
          },
          {
            type: "input",
            modelKey: "realname",
            label: "真实姓名",
            props: {
              type: "realname",
              placeholder: "请输入真实姓名"
            },
            rules: {
              required: true
            },
            trigger: "blur"
          }
        ]
      },
      options: {
        scrollToInvalidField: true,
        layout: "standard" // classic fresh
      }
    };
  },
  methods: {
    submitHandler(e) {
      e.preventDefault();
      window.console.log("submit", this.model);
       // 发送注册请求
             this.$store.dispatch('register',this.model)
             .then(code=>{
               if(code){
                 // 注册成功
              const toast = this.$createToast({
                 time:500,
                 txt:"注册成功，请登录！",
                 type:'success'
               })
               toast.show();
                setTimeout(() => {
                  this.$router.push('/login')
                 }, 1000);
               }
             }).catch(error=>{
               const toast = this.$createToast({
                 time:2000,
                 txt:error.message || error.response.data.message || "注册失败",
                 type:'error'
               })
               toast.show();
             })
    },
     
    validateHandler(result) {
      this.validity = result.validity;
      this.valid = result.valid;
      window.console.log(
        "validity",
        result.validity,
        result.valid,
        result.dirty,
        result.firstInvalidFieldIndex
      );
    },
    resetHandler(e) {
      window.console.log("reset", e);
    }
  }
};
</script>
<style>
 .logo img{
    width: 200px;
    margin-top: 50px;
 }
</style>