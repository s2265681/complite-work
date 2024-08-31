
@Entry
@Component
struct TextPage {
  build() {//只能有一个（任何组件）
    Column(){
      //string  vp
       Text("hello")
         .height(100)
         .width(100)
         .backgroundColor("#f00")
         .fontSize(30)

      //多、单行文本省略
      Text("hello apple lwdmlwedel x看我的看得到破碎无双")
        .height(100)
        .width(100)
        .backgroundColor("#f00")
        .fontSize(16)
        .textOverflow({overflow:TextOverflow.Ellipsis})
        .maxLines(3)


      Text("hello apple lwdmlwedel x看我的看得到破碎无双看我的看得到破碎无双")
        .height(100)
        .width(100)
        .backgroundColor("#f00")
        .fontSize(16)
        .textOverflow({overflow:TextOverflow.Clip})

      //Resource
      Text($r("app.string.module_desc"))
        .fontSize(30)

      Text($r("app.string.apple_label"))
        .fontSize(30)

      //子元素只能是Span  会覆盖原来的内容
      Text(){
        Span("$")
          .fontSize(50)
          .fontColor(Color.Orange)
        Span("100")
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
      }


    }.height("100%")
    .width("100%")
  }
}