
import router from '@ohos.router'
@Entry
@Component
struct OtherPage {
  build() {
    Column() {
      Text("其他页面")

      Button("去首页页面")
        .onClick(()=>{
          router.pushUrl({
            url:"pages/PagePage"
          })
        })
    }
    .width('100%')
    .height('100%')
  }

  pageTransition(){
    PageTransitionEnter({
      duration:1000,
      type:RouteType.None//push 和 pop 都可以
    }).onEnter((type: RouteType, progress: number) => {

    }).slide(SlideEffect.Top)

    PageTransitionExit({
      duration:1000,
      type:RouteType.None
    }).onExit((type: RouteType, progress: number) => {

    }).slide(SlideEffect.Bottom)
  }
}