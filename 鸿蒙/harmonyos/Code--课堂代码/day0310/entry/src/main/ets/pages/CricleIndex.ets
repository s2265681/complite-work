import router from '@ohos.router'
@Entry
@Component
struct CricleIndex {
  @State message: string = '朋友圈入口页面'

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)

        //因为在同模块下，可以直接back返回
        Button("返回").onClick(()=>{
           router.back()
        })
      }
      .width('100%')
    }
    .height('100%')
  }
}