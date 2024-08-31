
import promptAction from '@ohos.promptAction';
@Entry
@Component
struct Index {
  @State username:string=""
  @State pwd:string=""

  login(){
    //admin 123456
    if(this.username==="admin"&&this.pwd==="123456"){
      // AlertDialog.show({
      //   message:"登录成功"
      // })111
      promptAction.showToast({
        message:"登录成功"
      })
      this.username="";
      this.pwd="";
    }else{
      // AlertDialog.show({
      //   message:"登录失败"
      // })
      promptAction.showToast({
        message:"登录失败"
      })
    }
  }

  validate(){
    return this.username!==""&&this.pwd!==""
  }

  build() {
      Column({space:10}) {
        TextInput({placeholder:"请输入用户名"})
          .onChange((value)=>{
             this.username=value;
          })
        TextInput({placeholder:"请输入密码"})
          .type(InputType.Password)
          .onChange((value)=>{
            this.pwd=value;
          })

        Button("登录").onClick(()=>{
           this.login()
        }).enabled(this.validate())
      }
      .width('100%')
      .height('100%')
      .padding(15)
  }
}