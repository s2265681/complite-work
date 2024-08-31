import window from '@ohos.window'
import display from '@ohos.display'
@Entry
@Component
struct getWindowWH {
  @State message: string = ""
  @State screenWidth: number = 0
  @State screenHeight: number = 0
  @State statusBarHeight: number = 0
  @State allMsg: string = ""
  @State sysMsg: string = ""

  onPageShow(){
    this.message="vp2px(10)="+vp2px(10)+"  "+"lpx2px(20)="+lpx2px(20)
  }
  build() {
    Column({ space: 10 }) {
      Text("Message：" + this.message )
        .fontSize(22)
        .margin({top:20})

      Text("屏幕宽度：" + this.screenWidth + " px")
        .fontSize(22)
        .margin({top:20})
      Text("屏幕高度：" + this.screenHeight + " px")
        .fontSize(22)
      Text(this.allMsg)
        .fontSize(18)
      Button("获取屏幕尺寸")
        .onClick(() => {
          this.getScreenSize()
        })

      Text("状态栏高度：" + this.statusBarHeight + " px")
        .fontSize(22)

      Text(this.sysMsg)
        .fontSize(18)

      Button("获取状态栏和导航栏高度")
        .onClick(() => {
          this.getSystemBarHeight()
        })
    }
    .width("100%")
    .height("100%")
  }

  // 模型获取 Window
  private getSystemBarHeight() {
    var context = getContext(this)
    window.getLastWindow(context).then((lastWindow) => {
      this.getSystemBarHeightInternal(lastWindow)
    }).catch((error) => {
      this.statusBarHeight = -1

      this.sysMsg = JSON.stringify(error)
    })
  }

  //获取状态栏
  private getSystemBarHeightInternal(mainWindow: window.Window) {
    let type = window.AvoidAreaType.TYPE_SYSTEM;
    try {
      let avoidArea = mainWindow.getWindowAvoidArea(type);
      this.statusBarHeight = avoidArea.topRect.height
    } catch (exception) {
      this.statusBarHeight = -1
      this.sysMsg = JSON.stringify(exception)
    }
  }

  //获取屏幕尺寸
  private getScreenSize() {
    let displayClass = null;
    try {
      displayClass = display.getDefaultDisplaySync();
      this.screenWidth = displayClass.width
      this.screenHeight = displayClass.height
      this.allMsg = JSON.stringify(displayClass)
    } catch (exception) {
      this.screenWidth = -1
      this.screenHeight = -1
      this.allMsg = JSON.stringify(exception)
      console.error('Failed to obtain the default display object. Code: ' + JSON.stringify(exception));
    }
  }
}