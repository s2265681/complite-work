@Entry
@Component
struct TouchDemo {
  @State tX:number=-100
  @State startX:number=0

  build() {
    Stack({alignContent:Alignment.TopStart}) {
      //左侧菜单栏
      Row(){}
      .height("100%")
      .width(100)
      .translate({x:this.tX})
      .backgroundColor(Color.Red)
      .animation({
        duration:500
      })

      Column(){
        Text("主内容区")
      }.width('100%')
      .height('100%')
      .onTouch((e)=>{
        if(e.type===TouchType.Down){
          //按下的初始坐标
          this.startX=e.touches[0].screenX
        }
        if(e.type===TouchType.Up){//抬起获取结束坐标
          let endX=e.touches[0].screenX
          if(this.startX>20&&endX-this.startX>50){//显示左侧 左侧滑动
            this.tX=0
          }
          if(this.startX-endX>50){//隐藏元素  右侧滑动
            this.tX=-100
          }
        }
      })
    }
    .width('100%')
    .height('100%')
  }
}