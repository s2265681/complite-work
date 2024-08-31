// 设计稿 ： 1080px  -- 3 -- 360vp
import promptAction from '@ohos.promptAction'
//预览器 ： 360vp
//px2vp
//vp2px
@Entry
@Component
struct Index {
  @State message: string = 'Hello World'

  build() {
      Column() {
        Text(`${px2vp(1080)}`)//将px转化为vp 1080px---360vp
        Text(`${vp2px(360)}`)//将vp转化为px 360vp---1080px
      }
      .width("100%")
      .height("100%")
      .onAreaChange((oldArea,newArea)=>{
        //视口发生改变的时候触发
        //newArea 现在的最新值
        promptAction.showToast({
          message:newArea.width.toString()
        })
      })

  }
}