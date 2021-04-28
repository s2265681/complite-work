<template>
    <div>
    <div class="logo">
      <img src ="https://rockshang.cn/image/rock.jpeg" alt=""/>
    </div>
    <!-- cube-button 登录-->
        <cube-form
          :model="model"
          :schema="schema"
          @validate="handleValidate"
          @submit="handleLogin"
          >
      </cube-form>

    </div>
</template>

<script>
    export default {
         data() {
          return {
            model: {
               username:"",
               passwd:""
            },
            schema:{    // 表单的结构定义
              fields:[
                // 用户名
                {  // 字段数组
                type:"input",  
                modelKey: "username",
                label:"用户名",
                props:{     // 属性
                  placeholder:"请输入用户名"
                }, 
                rules:{      // 校验
                   required:true
                },
                trigger:'blur' // input 输入校验 
              }, 
              //  密码
                {  // 字段数组
                type:"input",  
                modelKey: "passwd",
                label:"密码",
                props:{  // 属性
                  type:'password',
                  placeholder:"请输入密码",
                  eye:{    //眼睛 ，能不能看见密码
                    open:true
                  }
                }, 
                rules:{  // 校验
                   required:true
                },
                trigger:'blur'  
              },
              // 登录按钮
              {
                 type:"submit",
                 label:"登录"
              }
              ]
            }
          }
         },
         methods:{
           handleLogin(e){
             // 组织表单的默认提交行为
             e.preventDefault();
             // 发送登录请求
             this.$store.dispatch('login',this.model)
             .then(code=>{
               if(code){
                 // 登录成功
                 const path = this.$route.query.rediret || '/';
            
              const toast = this.$createToast({
                 time:500,
                 txt:"登录成功",
                 type:'success'
               })
               toast.show();
                 this.$router.push(path)

               }
             }).catch(error=>{
               // 发生错误或者登录失败
               const toast = this.$createToast({
                 time:2000,
                 txt:error.message || error.response.data.message || "登录失败",
                 type:'error'
               })
               toast.show();
             })
           },
           handleValidate(event){
               window.console.log(event,'event')
           }
         }
    }
</script>

<style lang="less" scoped>
 .logo img{
    width: 200px;
    margin-top: 50px;
 }
</style>