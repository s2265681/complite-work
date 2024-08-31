import router from '@ohos.router'
@Entry
@Component
struct ThreePage {
  @State message: string = 'Hello World ThreePage'

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)

         Button("回退")
          .onClick(()=>{
            router.back()
          })

        Button("跳转到TwoPage--标准模式")
          .onClick(()=>{
            //会添加历史记录，可以实现回退
            router.pushUrl({
              url:"pages/TwoPage",
              params:{
                name:"lisa",
                age:18
              }
            })
          })

        Button("跳转到TwoPage--单例模式")
          .onClick(()=>{
            //会添加历史记录，可以实现回退
            router.pushUrl({
              url:"pages/TwoPage",
              params:{
                name:"lisa",
                age:18
              }
            },router.RouterMode.Single)
          })


      }
      .width('100%')
    }
    .height('100%')
  }
}