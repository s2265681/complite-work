@Entry
@Component
struct Index {
  @State flag: boolean =false

  build() {
    Column({ space: 15 }) {
      if(this.flag){
        Row()
          .width(100)
          .height(100)
          .backgroundColor(Color.Red)
          .transition({type:TransitionType.All,translate:{x:300}})
          // .transition({type:TransitionType.Delete,translate:{y:300}})
      }

      Button("实现动画").onClick(() => {
        animateTo({duration:1000},()=>{
          this.flag=!this.flag
        })
      })
    }
    .height('100%')
    .width('100%')
    .justifyContent(FlexAlign.Center)
  }
}