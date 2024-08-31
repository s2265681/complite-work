
import reminderAgentManager from '@ohos.reminderAgentManager'
//将响铃任务提取
export class AlarmManager{
   static async  addManager(hour:number,minute:number){
     let targetReminderAgent:reminderAgentManager.ReminderRequestAlarm={
       reminderType:reminderAgentManager.ReminderType.REMINDER_TYPE_ALARM,
       hour,
       minute,
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
     let reminderId=await reminderAgentManager.publishReminder(targetReminderAgent)
     return reminderId //最终返回一个reminderId
   }
}