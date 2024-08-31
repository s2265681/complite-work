
@Entry
@Component
struct GestureGroup {
  @State scaleValue:number=1
  @State prevscaleValue:number=1
  @State offsetX:number=0
  @State offsetY:number=0
  @State prevoffsetX:number=0
  @State prevoffsetY:number=0

  build() {
    Column() {
      Column(){}
      .margin({top:100})
      .height(150)
      .width(150)
      .backgroundColor(Color.Pink)
      .scale({x:this.scaleValue,y:this.scaleValue})
      .translate({x:this.offsetX,y:this.offsetY})
      // .gesture(  //互斥 并行 连续
      //   GestureGroup(
      //     GestureMode.Exclusive,//互斥
      //     TapGesture({//注意顺序
      //       count:2
      //     }).onAction((e)=>{
      //       if(this.scaleValue>1){
      //         this.scaleValue=1
      //         //缩小后回到原来位置
      //         this.offsetX=0
      //         this.offsetY=0
      //         this.prevoffsetY=0
      //         this.prevoffsetX=0
      //       }else{
      //         this.scaleValue=2
      //       }
      //     }),
      //     TapGesture({
      //       count:1
      //     }).onAction((e)=>{
      //       if(this.scaleValue>1){
      //         this.scaleValue=1
      //         //缩小后回到原来位置
      //         this.offsetX=0
      //         this.offsetY=0
      //         this.prevoffsetY=0
      //         this.prevoffsetX=0
      //       }else{
      //         this.scaleValue=2
      //       }
      //     })
      //   )
      // )
      .gesture(
        TapGesture({//注意顺序
          count:2
        }).onAction((e)=>{
          if(this.scaleValue>1){
            this.scaleValue=1
            //缩小后回到原来位置
            this.offsetX=0
            this.offsetY=0
            this.prevoffsetY=0
            this.prevoffsetX=0
          }else{
            this.scaleValue=2
          }
        }))
      .gesture(
        TapGesture({//注意顺序
          count:1
        }).onAction((e)=>{
          if(this.scaleValue>1){
            this.scaleValue=1
            //缩小后回到原来位置
            this.offsetX=0
            this.offsetY=0
            this.prevoffsetY=0
            this.prevoffsetX=0
          }else{
            this.scaleValue=2
          }
        })
      )
      .gesture(
        PanGesture({
          fingers:1,
          direction:PanDirection.All
        }).onActionUpdate((e)=>{
          if(this.scaleValue>1){//放大后移动盒子
            this.offsetX=e.offsetX+this.prevoffsetX
            this.offsetY=e.offsetY+this.prevoffsetY
          }
        }).onActionEnd(()=>{
          this.prevoffsetX=this.offsetX
          this.prevoffsetY=this.offsetY
        })
      )
      .gesture(
        PinchGesture({
          fingers:2
        }).onActionUpdate((e)=>{
          this.scaleValue=e.scale*this.prevscaleValue
          if(this.scaleValue<1){
            this.scaleValue=1
            this.prevscaleValue=1
          }
        }).onActionEnd(()=>{
          this.prevscaleValue=this.scaleValue
        })
      )

    }.width('100%')
  }
}