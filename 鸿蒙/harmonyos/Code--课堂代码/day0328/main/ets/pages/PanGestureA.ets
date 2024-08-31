
@Entry
@Component
struct Index {
  @State message:string="hello"
  @State offsetX:number=0
  @State offsetY:number=0
  @State prevoffsetX:number=0//上一次拖拽的值
  @State prevoffsetY:number=0

  build() {
    Column() {
      Text(this.message)
        .fontSize(30)
        .margin({top:20})

      Column(){
        Text(`X:${this.offsetX} \nY:${this.offsetY}`)
      }
      .height(200)
      .width(300)
      .backgroundColor(Color.Pink)
      .translate({x:this.offsetX,y:this.offsetY})
      .gesture(
        PanGesture({
          fingers:1,
          direction:PanDirection.All,
          distance:10//最小拖动距离，默认5
        }).onActionStart(()=>{
          this.message="start"
        }).onActionUpdate((e:GestureEvent)=>{
          this.message="update"
          this.offsetX=e.offsetX+this.prevoffsetX
          this.offsetY=e.offsetY+this.prevoffsetY
        }).onActionEnd(()=>{
          this.prevoffsetX=this.offsetX
          this.prevoffsetY=this.offsetY
          this.message="end"
        })
      )


    }
    .width('100%')
    .height('100%')
  }
}
