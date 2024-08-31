
@Entry
@Component
struct Index {
  @State num:number=10
  build() {
      Column() {
        Text("hello")
      }
      .width("100%")
      .height("100%")
  }
}

