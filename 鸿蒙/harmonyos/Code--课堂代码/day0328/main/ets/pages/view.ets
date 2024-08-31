@Entry
@Component
struct View {

  build() {
    Scroll(){
      Column() {
        //适配方案1： 设计稿1080px  ---3---  360vp   模糊适配
        //    544px---181.333333vp(181vp)

        //适配方案2： 设计稿1080px  ------  1080lpx   精准适配
        //   544px---544lpx

        //百分比 100%

        //字体 单位fp
        Text("字体")
          .fontSize(30)

        Text("字体")
          .fontSize('30fp')

        Row(){}
        .backgroundColor(Color.Red)
        .width("100%")
        .height("150vp")//150vp--450px

        Row(){}
        .backgroundColor(Color.Pink)
        .width("360vp")
        .height("150vp")

        Row(){}
        .backgroundColor(Color.Blue)
        .width("1080lpx")
        .height("450lpx")
        //450lpx--450px--150vp---模拟器预览器值会看着比较大
        //必须使用真机


        Row(){//图片和文字都比较大，真实的手机不会
          Column(){
            Image($r("app.media.ic_public_favor"))
              .width("74lpx")
              .height("74lpx")
            Text("手页")
              .fontColor('#d81e06')
              .fontSize("32lpx")
              .padding({
                top:"14lpx"
              })
          }

          Column(){
            Image($r("app.media.ic_public_favor"))
              .width("74lpx")
              .height("74lpx")
            Text("手页")
              .fontColor('#d81e06')
              .fontSize("32lpx")
              .padding({
                top:"14lpx"
              })
          }

        }.margin({
          top:10
        })

      }

    }

  }
}