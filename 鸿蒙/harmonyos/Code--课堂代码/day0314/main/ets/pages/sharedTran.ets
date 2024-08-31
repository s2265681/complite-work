import router from '@ohos.router'
@Entry
@Component
struct IndexD{
  build() {
    Row() {
      Column(){
        Image("https://img1.baidu.com/it/u=4070670852,624601372&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500")
          .width('100%')
          .aspectRatio(1)
          .sharedTransition("chocolate",{
            duration:500,
            type:SharedTransitionEffectType.Exchange  //默认 放大缩小
          })

        Text('德国进口薇莉Vivani排块烘焙黑巧克力75%99%100%纯可可脂网红零食')
          .fontSize(14)
          .sharedTransition("text",{
            duration:1000,
            type:SharedTransitionEffectType.Static  //淡入淡出
          })

      }
      .padding(15)
      .width('50%')
      .onClick(() => {
        router.pushUrl({
          url: 'pages/DetailPageA'
        })
      })
    }
    .width('100%')
  }
}