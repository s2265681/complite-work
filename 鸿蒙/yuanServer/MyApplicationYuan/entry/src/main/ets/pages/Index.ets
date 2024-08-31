@Entry
@Component
struct Index {
  @State message: string = 'Hello World'

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)

         Text("页面还是原来的样子")
      }
      .width('100%')
    }
    .height('100%')
  }
}