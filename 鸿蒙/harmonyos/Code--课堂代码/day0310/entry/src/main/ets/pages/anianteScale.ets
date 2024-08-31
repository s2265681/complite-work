@Entry
@Component
struct Index {
  @State ScaleX: number = 1
  @State ScaleY: number = 1
  @State flag: boolean =false

  build() {
    Column({ space: 15 }) {
      Row()
        .width(100)
        .height(100)
        .backgroundColor(Color.Red)
        .scale({
          x:this.ScaleX,
          y:this.ScaleY
        })
        .animation({
          duration:1000
        })

      Button("实现动画").onClick(() => {
        this.flag=!this.flag
        if(this.flag){
          this.ScaleX=2
          this.ScaleY=2
        }else{
          this.ScaleX=1
          this.ScaleY=1
        }
        // animateTo({duration:1000},()=>{
        //   this.flag=!this.flag
        //   if(this.flag){
        //     this.ScaleX=2
        //     this.ScaleY=2
        //   }else{
        //     this.ScaleX=1
        //     this.ScaleY=1
        //   }
        // })
      })
    }
    .height('100%')
    .width('100%')
    .justifyContent(FlexAlign.Center)
  }
}