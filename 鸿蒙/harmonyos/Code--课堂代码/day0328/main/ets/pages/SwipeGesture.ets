
@Entry
@Component
struct SwipeG {
  @State rotateAngle: number = 0
  @State speed: number = 1

  build() {
    Column() {
      Column() {
        Text("SwipeGesture speed\n" + this.speed)
        Text("SwipeGesture angle\n" + this.rotateAngle)
      }
      .border({ width: 3 })
      .width(300)
      .height(200)
      .margin(100)
      .rotate({ angle: this.rotateAngle })
      // 单指竖直方向滑动时触发该事件
      .gesture(
        SwipeGesture({
          direction:SwipeDirection.Horizontal
        })
          .onAction((e)=>{
            this.speed=e.speed
            this.rotateAngle=e.angle
          })
      )
    }.width('100%')
  }
}