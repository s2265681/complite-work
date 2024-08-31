@Entry
@Component
struct Index {
  @State angleValue: number = 0
  @State flag: boolean =false

  build() {
    Column({ space: 15 }) {
      Row()
        .width(200)
        .height(200)
        .backgroundColor(Color.Red)
        .rotate({
          y:1,
          angle:this.angleValue
        })
        // .animation({
        //   duration: 1000
        // })

      Button("实现动画").onClick(() => {
        animateTo({duration:1000},()=>{
          this.flag=!this.flag
          if(this.flag){
            this.angleValue=360
          }else{
            this.angleValue=0
          }
        })

      })
    }
    .height('100%')
    .width('100%')
    .justifyContent(FlexAlign.Center)
  }
}