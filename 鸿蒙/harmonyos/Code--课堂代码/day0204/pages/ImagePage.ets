@Entry
@Component
struct Index {

  build() {
      Column() {
         //1.网址----预览器
        //真机---模拟器----网络访问权限(module.json5)
        Image("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Ff507a6aa-b528-4264-998a-ae3b6e7d8b71%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1709640172&t=28ca5eee0b4280b36f79c1b0b6638718")
          .height(100)
        //2.resource---base/media
        Image($r("app.media.icon"))
          .width(100)

        //3.resource---rawfile
        Image($rawfile("icon.png"))
          .width(150)

        //4. 自建文件夹
        Image("/assets/image/icon.png")
          .width(200)

      }.width('100%')
    .height('100%')
  }
}