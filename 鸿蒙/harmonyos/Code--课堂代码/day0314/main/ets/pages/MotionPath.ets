
@Entry
@Component
struct IndexC {
  @State flag:boolean=true

  build() {
    Column() {
      Row(){}
      .height(100)
      .width(100)
      .backgroundColor(Color.Red)
      //0,0  (0,200)L0,400  (200,200)L400,400  360,0
      .motionPath({path:'Mstart.x start.y L400 400 Lend.x end.y',from:0.0,to:1.0,rotatable:false})
      .onClick(()=>{
        animateTo({duration:3000},()=>{
          this.flag=false
        })
      })

    }.width('100%')
    .height('100%')
    .alignItems(this.flag?HorizontalAlign.Start:HorizontalAlign.End)
    //最左边就是路径动画的起始位置，最右边就是结束位置
  }
}