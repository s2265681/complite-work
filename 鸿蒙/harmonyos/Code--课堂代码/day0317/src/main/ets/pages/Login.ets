//升级： 如果没有登录，跳过广告后就去登录页面
import { MyUserStore } from '../module/Index'
// 如果登录，就直接去首页
//  看有没有 token
// 存储 token ---- PersistentStorage,但是在该案例上不行
//每个页面都可以用PersistentStorage，没有问题
//但是在 EntryAbility.ts 中通过 AppStorage.Get<string>("token") 获取不到

//所以可以选用 首选项来继续存储 token
//或者是 首选项（EntryAbility.ts）+ PersistentStorage(页面）

// Button("登录").onClick(()=>{
//   const userStore:MyUserStore=new MyUserStore(getContext(this))
//   userStore.setToken("123456")
// })

import axios from "@ohos/axios"
import md5 from "js-md5"
import router from '@ohos.router'

@Entry
@Component
struct Login {
  @State titleflag:boolean=true
  @State loginName:string=""
  @State password:string=""

  validate(){
    return this.loginName.trim()!==""&&this.password.trim()!==""
  }

  login(){
    if(this.titleflag){//登录
      axios.post("http://backend-api-01.newbee.ltd/api/v1/user/login",{
        loginName:this.loginName,
        passwordMd5:md5(this.password)
      }).then((value)=>{
         let {resultCode,data,message}=value.data
        if(+resultCode!==200){
          AlertDialog.show({
            message:message||"登录失败，请重试"
          })
          return
        }
        //存储token
        const userStore:MyUserStore=new MyUserStore(getContext(this))
        userStore.setToken(data)

       //跳转到首页
        router.pushUrl({
          url:"pages/Index"
        })

        //清空用户名和密码
        this.password=""
        this.loginName=""
      })
    }else{//注册
       axios.post("http://backend-api-01.newbee.ltd/api/v1/user/register",{
         loginName:this.loginName,
         password:this.password
       }).then((value)=>{
         let {resultCode,message}=value.data
         if(+resultCode!==200){
           AlertDialog.show({
             message:message||"网络问题"
           })
           return
         }
         //重新登录一次
         this.titleflag=true
         //清空用户名和密码
         this.password=""
         this.loginName=""
       })
    }
  }

  build() {
    Column() {
      Row(){
        Image($r("app.media.left"))
          .height(16)
          .position({
            x:10,
            y:16
          })
        Text(this.titleflag?"登录":"注册")
          .fontSize(18)
          .height(50)
          .width("100%")
          .textAlign(TextAlign.Center)
      }.height(50)
      .width("100%")

      Column({space:20}){
        TextInput({placeholder:"请输入用户名",text:this.loginName})
          .onChange((value)=>{
            this.loginName=value
          })
        TextInput({placeholder:"请输入密码",text:this.password})
          .type(InputType.Password)
          .onChange((value)=>{
            this.password=value
          })

        Text(this.titleflag?"立即注册":"立即登录")
        .onClick(()=>{
          this.titleflag=!this.titleflag
          this.password=""
          this.loginName=""
        })

        Row(){
          Button(this.titleflag?"登录":"注册")
            .width("100%")
            .margin({
              right:20
            })
            .enabled(this.validate())
            .onClick(()=>{
              this.login()
            })
        }

      }.padding(10)
      .margin({
        top:40
      })

    }
    .width('100%')
    .height('100%')
  }
}