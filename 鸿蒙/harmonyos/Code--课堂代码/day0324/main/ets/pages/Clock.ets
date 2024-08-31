import reminderAgentManager from '@ohos.reminderAgentManager'
import promptAction from '@ohos.promptAction'
@Entry
@Component
struct Index {
  reminderId=null
  @State mystate:{now:Date}={now:new Date()}
  @State hour:number=0
  @State minute:number=0

  build() {
    Row() {
      Column() {
        Button("开启闹铃").onClick(async ()=>{
          let targetReminderAgent:reminderAgentManager.ReminderRequestAlarm={
            reminderType:reminderAgentManager.ReminderType.REMINDER_TYPE_ALARM,
            hour:this.hour,
            minute:this.minute,
            daysOfWeek:[],//0-6 星期几会响铃  不写就是仅限今天
            ringDuration:60, //响铃的时长  秒
            actionButton:[
              {
                title:"关闭",
                type:reminderAgentManager.ActionButtonType.ACTION_BUTTON_TYPE_CLOSE
              },
              {
                title:"延迟",
                type:reminderAgentManager.ActionButtonType.ACTION_BUTTON_TYPE_SNOOZE
              }
            ],
            wantAgent:{//吊起设备
              pkgName:"com.example.myapplicationd",//包名
              abilityName:"EntryAbility"
            },
            snoozeTimes:2,//延迟次数
            timeInterval:5*60//延迟时间 5分钟
          }
          this.reminderId=await reminderAgentManager.publishReminder(targetReminderAgent)
          promptAction.showToast({ message: '添加闹铃成功' })
        })

        Button("关闭闹铃").onClick(()=>{
          reminderAgentManager.cancelReminder(this.reminderId)
          promptAction.showToast({ message: '关闭闹铃成功' })
        })

        Text(`${this.hour}:${this.minute}`)

        TimePicker({
          selected:this.mystate.now
        }).onChange((e)=>{
          this.hour=e.hour
          this.minute=e.minute
        })
      }
      .width('100%')
    }
    .height('100%')
  }
}




