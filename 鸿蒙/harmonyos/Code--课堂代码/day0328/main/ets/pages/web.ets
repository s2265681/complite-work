import web_webview from '@ohos.web.webview'
@Entry
@Component
struct WebA {
  controller:web_webview.WebviewController=new web_webview.WebviewController()

  build() {
    Column() {
      Scroll(){
        Web({
          src:"https://baike.baidu.com/item/%E6%96%B0%E8%9C%82/7303754?fr=ge_ala",
          controller:this.controller
        })
          .onPageEnd(()=>{
            //页面加载完成，后做什么事情
          })
      }
    }
    .width('100%')
    .height('100%')
  }
}