@Entry
@Component
struct Index {

  build() {
    Column()  {

      Stack({alignContent:Alignment.BottomStart}){
        Image($r("app.media.left"))
          .height(16)
          .margin({bottom:"26lpx"})

        Text("登录")
          .fontSize(18)
          .height("120lpx")
          .width("100%")
          .textAlign(TextAlign.Center)

      }.height("231lpx")//120+111= 231
      .width("100%")
      .backgroundColor(Color.Pink)
      .padding(10)


    }
    .width('100%')
    .height('100%')
  }
}