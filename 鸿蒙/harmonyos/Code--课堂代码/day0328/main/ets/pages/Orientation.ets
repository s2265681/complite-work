import batteryInfo from '@ohos.batteryInfo'
import window from '@ohos.window'

@Entry
@Component
struct Orientation{
  @State flag:boolean=true

  build() {
    Column({space:20}) {
      Button("横竖屏切换")
        .height(200)
        .width(200)
        .onClick(()=>{
          this.changeOrientationWindow()
        })

    }
    .width('100%')
    .height('100%')
  }

  //先获取window
  changeOrientationWindow(){
    window.getLastWindow(getContext(this)).then((mianWindow)=>{
      this.setOrientation(mianWindow)
    })
  }

  //设置横竖屏
  setOrientation(mianWindow:window.Window){
    if(!this.flag){
      //横屏 2
      mianWindow.setPreferredOrientation(window.Orientation.LANDSCAPE)
    }else{
      //竖屏 1
      mianWindow.setPreferredOrientation(window.Orientation.PORTRAIT)
    }
    this.flag=!this.flag
  }
}