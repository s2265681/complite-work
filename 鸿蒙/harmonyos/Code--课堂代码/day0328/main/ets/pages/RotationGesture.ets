
@Entry
@Component
struct RotationGestureA {
  @State angle: number = 0
  @State rotatePrevValue: number = 0

  build() {
    Column() {
      Column() {
        Text('RotationGesture angle:' + this.angle)
      }
      .height(200)
      .width(200)
      .padding(20)
      .border({ width: 3 })
      .margin(80)
      .rotate({ angle: this.angle })
      // 双指旋转触发该手势事件
      .gesture(
        RotationGesture({})
          .onActionStart(()=>{

          })
          .onActionUpdate((e)=>{
            this.angle=e.angle+this.rotatePrevValue
          })
          .onActionEnd(()=>{
            this.rotatePrevValue=this.angle
          })

      )
    }.width('100%')
  }
}