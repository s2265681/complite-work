import common from '@ohos.app.ability.common'
@Entry
@Component
struct Index {
  @State message: string = '小程序'
  @StorageLink("id")
  numid:number=0

  build() {
    Row() {
      Column() {
        Text(this.message+"---"+this.numid)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)

        Button("返回entry").onClick(()=>{
          //携带参数
          let context=getContext(this) as common.UIAbilityContext;
          context.terminateSelfWithResult({
            resultCode:1,
            want:{
              "deviceId":"",
              "bundleName":"com.example.myapplicationb",//包名
              "abilityName":"EntryAbility",
              "moduleName":"entry",
              "parameters":{
                 flag:true
               }
            }
          })
        })
      }
      .width('100%')
    }
    .height('100%')
  }
}