import router from '@ohos.router'
@Entry
@Component
struct OnePage {
  @State message: string = 'One Page'

  onBackPress(){
    console.log('testTag',"后退触发--OnePage")
  }

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)

        Button("back")
          .onClick(()=>{
            router.back()
          })

        Button("跳转到TwoPage--pushUrl")
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


        Button("跳转到TwoPage---replaceUrl")
          .onClick(()=>{
            //不会添加历史记录，替换当前页面，不能实现回退
            router.replaceUrl({
              url:"pages/TwoPage",
              params:{
                name:"小米",
                age:18
              }
            })
          })
      }
      .width('100%')
    }
    .height('100%')
  }
}