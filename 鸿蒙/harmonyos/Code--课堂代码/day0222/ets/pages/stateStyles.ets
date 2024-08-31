
@Entry
@Component
struct Index {
  @State flag:boolean=true
  build() {
    Column() {
      TextInput({placeholder:"请输入用户名"})
        .stateStyles({
          focused:{
            .border({
              width:3,
              color:"#f00"
            })
          },
          normal:{
            .border({
              width:3,
              color:"#00f"
            })
          }
        })
      TextInput({placeholder:"请输入密码"})
        .stateStyles({
          focused:{
            .border({
              width:3,
              color:"#f00"
            })
          },
          normal:{
            .border({
              width:3,
              color:"#00f"
            })
          }
        })

      Button("按钮")
        .stateStyles({
          pressed:{
            .backgroundColor(Color.Red)
          },
          normal:{
            .backgroundColor(Color.Blue)
          }
        })

      Text("切换flag的值").onClick(()=>{
        this.flag=!this.flag
      })

      Button("按钮")
        .enabled(this.flag)
        .stateStyles({
          disabled:{//禁用--不生效
            .backgroundColor(Color.Black)
          },
          normal:{
            .backgroundColor(Color.Blue)
          }
        })
    }
    .width("100%")
    .height("100%")
  }
}