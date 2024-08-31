@Entry
@Component
struct Index {

  build() {
    Column() {
       // Row(){
       //   Text("<")
       //   Text("首页")
       //   Text("+")
       // }.height(60)
       // .width("100%")
       // .backgroundColor(Color.Pink)
       // .justifyContent(FlexAlign.SpaceBetween)
       // .padding({left:15,right:15})


      // Row(){
      //   Text("<")
      //     .margin({right:10})
      //   Text("首页")
      //   Blank()//这行中剩余的空间都给我
      //   Text("+")
      // }.height(60)
      // .width("100%")
      // .backgroundColor(Color.Pink)
      // .justifyContent(FlexAlign.SpaceBetween)
      // .padding({left:15,right:15})

      Row(){
        Text("<")
          .position({//定位 父相子绝
             x:15,
             y:20
          })
          .zIndex(10)
          .onClick(()=>{
            console.log("返回")
          })

        Text("首页")
          .height(60)
          .width("100%")
          .textAlign(TextAlign.Center)
        
      }.height(60)
      .width("100%")
      .backgroundColor(Color.Pink)
      .padding({left:15,right:15})

    }.width('100%')
    .height('100%')
  }
}