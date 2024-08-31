@Entry
@Component
struct RowPage {
  build() {
    Row({space:10}){
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
    .justifyContent(FlexAlign.Start)
    //主轴是 横向的
    //Start 顶部  Center居中  End居左  SpaceBetween 两端对齐
    //SpaceEvenly 均分
    //SpaceAround 两端空隙是中间空隙的一半
    .alignItems(VerticalAlign.Center)
    //侧轴是垂直的  VerticalAlign
    //Top上  Center中  Bottom下

  }
}