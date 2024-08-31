import router from '@ohos.router'

class RouterParams{
  name:string
  age:number
}

@Entry
@Component
struct TwoPage {
  @State message: string = 'Two Page'

  aboutToAppear(){
    const params=router.getParams() as RouterParams
    if(params?.name){
       this.message="hello  "+params.name
    }
  }

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)

        Button("回退")
          .onClick(()=>{
            router.back()
          })

        Button("跳转到ThreePage--标准模式")
          .onClick(()=>{
            //会添加历史记录，可以实现回退
            router.pushUrl({
              url:"pages/ThreePage",
              params:{
                name:"lisa",
                age:18
              }
            })
          })

        Button("跳转到ThreePage--单例模式")
          .onClick(()=>{
            //会添加历史记录，可以实现回退
            router.pushUrl({
              url:"pages/ThreePage",
              params:{
                name:"lisa",
                age:18
              }
            },router.RouterMode.Single)
          })


        // Button("返回").onClick(()=>{
        //   //默认返回上一页,一般用默认用法
        //   // router.back()
        //
        //   //指定返回某个页面
        //   //必须是经过的路径
        //   router.back({
        //     url:"pages/OnePage",
        //     params:{
        //       backId:"0001"
        //     }
        //   })
        // })
      }
      .width('100%')
    }
    .height('100%')
  }
}