//在同一个模块下 Entry 模块
import common from '@ohos.app.ability.common'
import Want from '@ohos.app.ability.Want'
//有两个 UIAbility   entryability  cricleability

//entryability/Index---跳转--cricleability/CricleIndex

// router 只是页面间的跳转 不能实现UIAbility的跳转

//实现不同模块下不同UIAbility不同的页面跳转
// entry/entryability/Index--跳转---xiaochengxu/XiaochengxuAbility/Index

//两个模块---模拟器需要配置一项内容，掉起两个模块

type resultClass = Record<string,boolean>

@Entry
@Component
struct Index {
  @State message: string = 'EntryAbility ---  Index'

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)

        // Button("去朋友圈").onClick(()=>{
        //   const context=getContext(this) as common.UIAbilityContext
        //   const want:Want={
        //      "deviceId":"",//空表示相同设备跳转
        //      "bundleName":"com.example.myapplicationb",//包名
        //      "abilityName":"CricleAbility",// ability名称
        //      "moduleName":"entry"// 非必写  模块名
        //   }
        //   //跳转Ability
        //   context.startAbility(want)
        // })


        Button("去小程序").onClick(async ()=>{
          const context=getContext(this) as common.UIAbilityContext
          const want:Want={
             "deviceId":"",//空表示相同设备跳转
             "bundleName":"com.example.myapplicationb",//包名
             "abilityName":"XiaochengxuAbility",// ability名称
             "moduleName":"xiaochengxu", // 非必写  模块名
             "parameters":{//传递参数，当前时间戳
               id:Date.now()
             }
          }
          //跳转Ability
          // context.startAbility(want)

          //跳转的时候，同时接收 小程序传回的参数  异步
          const result=await context.startAbilityForResult(want)
          const params=result.want?.parameters as resultClass
          if(params?.flag){
            AlertDialog.show({
              message:"小程序成功返回值："+params.flag
            })
          }else{
            AlertDialog.show({
              message:"小程序返回值失败"
            })
          }
        })



      }
      .width('100%')
    }
    .height('100%')
  }
}
