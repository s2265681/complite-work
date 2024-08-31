import settings from '@ohos.settings'
@Entry
@Component
struct CanvasPage {

 //画笔如果出现锯齿，消除锯齿
  settings:RenderingContextSettings=new RenderingContextSettings(true)
  //画布是2D
  context:CanvasRenderingContext2D=new CanvasRenderingContext2D(this.settings)

  build() {
    Column()  {
      Canvas(this.context)
        .width("100%")
        .height(360)
        .backgroundColor("#ccc")

      Row(){
        Button("画线").onClick(()=>{
          this.context.beginPath()
          this.context.lineWidth=4
          this.context.strokeStyle="blue"
          this.context.moveTo(10,10)
          this.context.lineTo(150,150)
          this.context.stroke()
          this.context.closePath()

          this.context.beginPath()
          this.context.lineWidth=4
          this.context.strokeStyle="red"
          this.context.moveTo(200,10)
          this.context.lineTo(50,100)
          this.context.lineTo(64,140)
          this.context.stroke()
          this.context.closePath()
        })

        Button("画圆").onClick(()=>{
          //形成闭环
          this.context.beginPath()
          this.context.lineWidth=3
          this.context.strokeStyle="blue"
          this.context.fillStyle="red";
          this.context.arc(200,200,50,0,360)
          this.context.stroke()
          this.context.fill()
          this.context.closePath()
        })
      }
    }
    .width('100%')
    .height('100%')
  }
}