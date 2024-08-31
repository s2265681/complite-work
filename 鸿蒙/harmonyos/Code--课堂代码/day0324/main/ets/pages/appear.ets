import promptAction from '@ohos.promptAction'
@Entry
@Component
struct Appear {
  @State flag:boolean=true
  @State message:string=""

  build() {
    Column() {
      Text(this.message)
      Button("挂载和卸载--组件")
        .height(200)
        .width(200)
        .onClick(()=>{
          this.flag=!this.flag
        })

      if(this.flag){
        Child()
          .onAppear(()=>{
            this.message="显示--挂载"
          })
          .onDisAppear(()=>{
            this.message="隐藏--卸载"
          })
      }
    }
    .width('100%')
    .height('100%')
  }
}

@Component
struct Child {

  build() {
    Column() {
     Text("子组件")
    }
    .width('100%')
    .height('100%')
  }
}