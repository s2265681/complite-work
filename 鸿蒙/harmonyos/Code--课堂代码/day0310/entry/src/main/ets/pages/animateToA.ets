

@Entry
@Component
struct AnimateTo {
  @State w:number=100
  @State h:number=100

  build() {
    Row() {
      Column() {

        Row(){}
        .height(this.h)
        .width(this.w)
        .backgroundColor(Color.Red)

        Button("实现显示动画").onClick(()=>{
          animateTo({
            duration:1000,
            iterations:3,
            curve:Curve.EaseIn
          },()=>{
            this.w=200
            this.h=200
          })
        })

      }
      .width('100%')
    }
    .height('100%')
  }
}
