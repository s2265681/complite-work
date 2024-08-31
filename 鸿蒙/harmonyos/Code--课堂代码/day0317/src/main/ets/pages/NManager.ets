import notificationManager from '@ohos.notificationManager'
import wantAgent from '@ohos.app.ability.wantAgent'
@Entry
@Component
struct NManager {
  notifyId:number=1

  aboutToAppear(){

  }

  build() {
    Row() {
      Column() {
         Button("发起消息通知").onClick(async ()=>{
           const WantAgentInfo={
             wants:[
               {
                 bundleName: 'com.example.myapplicationd',
                 abilityName: 'EntryAbility',
               }
             ],
             operationType: wantAgent.OperationType.START_ABILITIES,
             requestCode: 0,
           }
           const want= await wantAgent.getWantAgent(WantAgentInfo)

            const request:notificationManager.NotificationRequest={
              id:this.notifyId,
              content:{
                contentType:notificationManager.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal:{
                  title: '温馨提示',
                  text: '您的话费还剩9元，请及时缴费',
                  additionalText: '移动提醒'
                }
              },
              //唤起应用
              wantAgent:want
            }
            notificationManager.publish(request)
         })

        Button("取消消息通知").onClick(()=>{
            notificationManager.cancel(this.notifyId)
        })
      }
      .width('100%')
    }
    .height('100%')
  }
}

