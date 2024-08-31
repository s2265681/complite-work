@Entry
@Component
struct GridPage {
  build() {
    Column() {
      Button("登录")
        .type(ButtonType.Normal)

      //子元素---只有一个根
      Button(){
        Row(){//可以添加一个容器
          Text("注册")
          Text("haha")
        }
      }.height(60)
      .width(100)



      Button(){
        Row(){
          Image($r("app.media.ic_public_search"))
            .height(30)
            .fillColor(Color.White)
          Text("搜索").fontColor(Color.White)
        }
      }.height(60)
      .width(100)

      //分割线
      // Divider().vertical(true).strokeWidth(20)

      Button(){
        Image($r("app.media.ic_public_search"))
          .height(30)
          .fillColor(Color.White)
      }.height(60)
      .width(100)


    }
    .height("100%")
    .width("100%")
  }
}