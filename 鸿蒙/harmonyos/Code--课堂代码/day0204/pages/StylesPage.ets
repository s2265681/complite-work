//全局
@Styles function commonStyle(){
  .height(60)
    .width(120)
    .backgroundColor(Color.Red)
    .onClick(()=>{
      console.log("点击我了")
    })
}

@Entry
@Component
struct Index {
  //样式复用 ：可以是不同的组件,只要有公共样式就可以抽取
  //组件内：不需要加 function关键词
  // @Styles commonStyle(){
  //   .height(60)
  //   .width(120)
  //   .backgroundColor(Color.Red)
  //   .onClick(()=>{
  //     console.log("点击我了")
  //   })
  // }

  build() {
    Column({space:10}) {
       Button("按钮")
         .fontSize(20)
         .commonStyle()

      Text("文本")
        .fontSize(30)
        .commonStyle()
    }
    .width('100%')
    .height('100%')
    .padding(15)
  }
}