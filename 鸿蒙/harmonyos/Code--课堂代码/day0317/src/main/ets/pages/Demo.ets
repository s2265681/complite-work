@Entry
@Component
struct Demo {
  @State message: string = 'Hello World'

  build() {
    Column() {
      Text(this.message)
        .fontSize(50)
        .fontWeight(FontWeight.Bold)
    }
    .width('100%')
    .height('100%')
  }
}