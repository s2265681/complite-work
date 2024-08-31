
@Entry
@Component
struct Index {
  //只能在当前页面用，不能导入导出的
  //组件内 全局
  @Styles commonStyle(){
    .layoutWeight(1)
    .height(100)
  }

  build() {
    Column() {
      Row(){
        Row(){}
        .commonStyle()
        .backgroundColor(Color.Red)

        Row(){}
        .commonStyle()
        .backgroundColor(Color.Pink)

      }.width("100%")

      Row(){}
      .width(100)
      .aspectRatio(1)//高宽比
      .backgroundColor(Color.Red)

      Row(){}
      .width(100)
      .height(100)
      .backgroundColor(Color.Blue)
    }
    .width("100%")
    .height("100%")
  }
}