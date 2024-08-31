@Entry
@Component
struct Pinch {
  @State message:string="hello"
  @State scaleValue:number=1
  @State scalePrevValue:number=1//上一次缩放的倍数


  build() {
    Column() {
      Text(this.message)
        .fontSize(30)
        .margin({top:20})

      Column(){

      }
      .height(200)
      .width(200)
      .backgroundColor(Color.Pink)
      .scale({x:this.scaleValue,y:this.scaleValue})
      .gesture(
        PinchGesture({
          fingers:2//手指数，最少为2
        }).onActionStart(()=>{

        }).onActionUpdate((e)=>{
          this.scaleValue=e.scale*this.scalePrevValue //缩放的倍数
        }).onActionEnd(()=>{
          this.scalePrevValue=this.scaleValue
        })
      )

    }
    .width('100%')
    .height('100%')
  }
}