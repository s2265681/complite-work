@Entry
@Component
struct RowPage {
  build() {
    //不推荐
    Flex({direction:FlexDirection.Row,justifyContent:FlexAlign.SpaceBetween,alignItems:ItemAlign.Center}){//任何子组件
      Column(){
        Text("左")
      }
      .height(60).width(80)
      .backgroundColor(Color.Blue)

      Column(){
        Text("中")
      }.height(60).width(80)
      .backgroundColor(Color.Blue)

      Column(){
        Text("右")
      }.height(60).width(80)
      .backgroundColor(Color.Blue)

    }.height("100%")
    .width("100%")

  }
}