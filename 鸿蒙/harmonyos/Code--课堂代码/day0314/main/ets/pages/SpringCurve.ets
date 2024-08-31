import curves from '@ohos.curves'
@Entry
@Component
struct IndexE {
  @State translateX:number=0

  build() {
    Column() {
      Row(){}
      .height(100)
      .width(100)
      .translate({x:this.translateX})
      .backgroundColor(Color.Red)

      Button("按钮")
        .onClick(()=>{
          this.translateX=20//弹簧动画的开始位置
          animateTo({
            duration:1000,
            // 速度  质量 刚度 阻尼
            curve:curves.springCurve(10,1,1,1)
          },()=>{
            //动画结束后的位置
            this.translateX=0
          })
        })


    }.width('100%')
    .height('100%')
  }
}