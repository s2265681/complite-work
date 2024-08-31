
@Entry
@Component
struct Index {
  flag:boolean=false
  build(){
    Column(){
      Text("apple")
        .width(100)
        .height(this.flag?100:10)
        .backgroundColor(Color.Red)

      Text("apple")
        .width(100)
        .height(100)
        .backgroundColor(Color.Red)
        .visibility(this.flag?Visibility.Visible:Visibility.Hidden)
      //Visibility.None 不占位
      //Visibility.Hidden  占位

      Text("apple")
        .width(100)
        .height(100)
        .backgroundColor(Color.Blue)


    }.height("100%")
    .width("100%")
  }
}
