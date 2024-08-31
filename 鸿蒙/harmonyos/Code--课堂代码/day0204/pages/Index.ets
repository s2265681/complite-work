
@Entry
@Component
struct Index {
  @State message: string = 'Hello World apple'

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .backgroundImageSize(ImageSize.Contain)
          .onClick(()=>{
             console.log("hello");
          })
      }
      .width('100%')
    }
    .height('100%')
  }
}