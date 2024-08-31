
import router from '@ohos.router'
@Entry
@Component
struct Index {
  build() {
    Column() {
      Text("首页")

      Button("去其他页面")
        .onClick(()=>{
          router.pushUrl({
            url:"pages/otherPage"
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

    }).slide(SlideEffect.Left)

    PageTransitionExit({
      duration:1000,
      type:RouteType.None
    }).onExit((type: RouteType, progress: number) => {

    }).slide(SlideEffect.Right)
  }


}