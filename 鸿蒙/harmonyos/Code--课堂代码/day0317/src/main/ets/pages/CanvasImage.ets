@Entry
@Component
struct IndexB {
  settings:RenderingContextSettings=new RenderingContextSettings(true)
  context:CanvasRenderingContext2D=new CanvasRenderingContext2D(this.settings)

  panImg:ImageBitmap=new ImageBitmap("/images/clock_pan.png")
  pointerImg:ImageBitmap=new ImageBitmap("/images/ic_second_pointer.png")

  build() {
    Column() {
      Canvas(this.context)
        .width(232)
        .aspectRatio(1)
        .onReady(()=>{
          this.context.drawImage(this.panImg,0,0,232,232)
          //画布旋转的开始的坐标位置（0.0），无法修改画布的旋转点
          // 1度= Math.PI/180
          this.context.translate(116,116)
          this.context.rotate(Math.PI/180*180)
          this.context.translate(-116,-116)
          this.context.drawImage(this.pointerImg,112,0,8,232)
        })
    }
    .width('100%')
    .height('100%')
  }
}
