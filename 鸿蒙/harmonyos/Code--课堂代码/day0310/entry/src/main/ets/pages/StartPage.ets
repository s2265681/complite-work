//生命周期
//UIAbility生命周期--- EntryAbility.ts
//页面生命周期---@Entry   3
//组件生命周期--- @Component  2



import router from '@ohos.router'
@Entry
@Component
struct Index {
  @State message: string = 'EntryAbility ---  Index'
  //在build 之前出发 ，只触发1次
  aboutToAppear(){
    console.log('testTag',"页面初始化")
  }
  //销毁 清理定时器
  aboutToDisappear(){
    console.log('testTag',"页面销毁")
  }

  //在build 之后出发 ，触发多次
  onPageShow(){
    console.log('testTag',"页面展示")
  }

  //触发多次  前台--后台  跳转隐藏
  onPageHide(){
    console.log('testTag',"页面隐藏")
  }

  onBackPress(){
    console.log('testTag',"后退触发--Index")
  }

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)

        Button("OnePage").onClick(()=>{
          router.pushUrl({
            url:"pages/OnePage"
          })
        })


      }
      .width('100%')
    }
    .height('100%')
  }
}
