@Entry
@Component
struct IndexA {
  settings:RenderingContextSettings=new RenderingContextSettings(true)
  context:CanvasRenderingContext2D=new CanvasRenderingContext2D(this.settings)
  build() {
    Column() {
      Canvas(this.context)
        .width("100%")
        .aspectRatio(1)
        .backgroundColor("#ccc")

      Row(){
        Button("画线")
          .onClick(() => {
            // 闭环隔离  开始绘制-结束绘制
            this.context.beginPath()//开始绘制
            this.context.strokeStyle = 'blue'//线的颜色
            this.context.moveTo(10, 10)
            this.context.lineTo(150, 150)
            this.context.stroke()
            this.context.closePath() // 结束绘制

            this.context.beginPath()
            this.context.lineWidth = 4 // 线的宽度
            this.context.strokeStyle = "red"
            this.context.moveTo(200, 10)
            this.context.lineTo(50, 100)
            this.context.stroke()
            this.context.closePath()
          })

        Button("画圆")
          .onClick(() => {
            this.context.beginPath()
            this.context.lineWidth = 4
            this.context.strokeStyle = "#f00"
            this.context.arc(200, 200, 50, 0, 360)
            this.context.stroke()
            this.context.closePath()
          })

        Button("画矩形")
          .onClick(()=>{
            this.context.beginPath()
            this.context.lineWidth=4
            this.context.strokeStyle="blue";
            this.context.fillStyle="red";
            this.context.rect(100,100,200,200)
            this.context.stroke()
            this.context.fill()
            this.context.closePath()
          })

        Button("清空画布")
          .onClick(()=>{
            this.context.clearRect(0,0,360,360)
          })
      }
    }
    .width('100%')
    .height('100%')
  }
}


