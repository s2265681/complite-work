@Entry
@Component
struct GridPage {
  build() {
    Column({ space:30 }) {
      //了解
      //  Grid(){
      //    GridItem(){Text("1")}.backgroundColor(Color.Orange)
      //    .rowStart(1).rowEnd(2)//行合并
      //    GridItem(){Text("2")}.backgroundColor(Color.Red)
      //    .columnStart(2).columnEnd(3)//列合并
      //    // GridItem(){Text("3")}.backgroundColor(Color.Blue)
      //
      //    // GridItem(){Text("4")}.backgroundColor(Color.Orange)
      //    GridItem(){Text("5")}.backgroundColor(Color.Red)
      //    GridItem(){Text("6")}.backgroundColor(Color.Blue)
      //
      //    GridItem(){Text("7")}.backgroundColor(Color.Orange)
      //    GridItem(){Text("8")}.backgroundColor(Color.Red)
      //    GridItem(){Text("9")}.backgroundColor(Color.Blue)
      //  }.width("100%")
      // .height(300)
      // .columnsTemplate("1fr 1fr 1fr")
      // .rowsTemplate("1fr 2fr 1fr")
      // .columnsGap(5)
      // .rowsGap(5)


      Grid(){
        GridItem(){Text("1")}.width("50%").backgroundColor(Color.Orange)
        GridItem(){Text("2")}.width("50%").backgroundColor(Color.Red)

        GridItem(){Text("3")}.width("50%").backgroundColor(Color.Blue)
        GridItem(){Text("4")}.width("50%").backgroundColor(Color.Orange)

        GridItem(){Text("5")}.width("50%").backgroundColor(Color.Red)
        GridItem(){Text("6")}.width("50%").backgroundColor(Color.Blue)

      }.width("100%")
      .height(300)
      .rowsTemplate("1fr 1fr")//行 1 1  2行----先以行为主
      .columnsGap(5)
      .rowsGap(5)
    }
    .height("100%")
    .width("100%")
  }
}