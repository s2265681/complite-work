import router from '@ohos.router'
import { ClockStore } from '../module/Index'
import util from '@ohos.util'
import reminderAgentManager from '@ohos.reminderAgentManager'
import promptAction from '@ohos.promptAction'
@Entry
@Component
struct AddClock {
  clockStore:ClockStore=new ClockStore()
  @State myState:{now:Date}={now:new Date()}

  @Builder CellBuilder(){
    Row(){
      Text("重复")
      Row(){
        Text("不重复")
          .fontColor("#999")
        Image("/images/ic_public_arrow_right.svg")
          .width(15)
          .fillColor("#999")
      }
    }
    .height(50)
    .width("100%")
    .backgroundColor("#f5f5f5")
    .justifyContent(FlexAlign.SpaceBetween)
    .padding({left:10,right:10})

  }

  //添加闹钟
   async addClock(){
    let hour=this.myState.now.getHours()
    let minute=this.myState.now.getMinutes()

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

    let obj={
      id:util.generateRandomUUID()+Date.now(),
      hour,
      minute,
      enable:true,
      reminderId
    }

     //添加到仓库中
     this.clockStore.setClock(obj)
     //提示
     promptAction.showToast({
       message:"添加闹钟成功"
     })
     //返回首页
     router.back()
  }


  build() {
    Column(){
      Row(){
        Image($r("app.media.ic_public_cancel"))
          .width(25)
          .height(25)
          .margin({right:5})
          .onClick(()=>{
            router.back()
          })
        Text("新建闹钟")
          .fontSize(20)
          .textAlign(TextAlign.Center)
          .margin({left:5})
          .height(50)
          .height(50)

        Blank()

        Image($r("app.media.ic_public_ok"))
          .width(32)
          .height(32)
          .margin({right:5})
          .onClick(()=>{
             this.addClock()
          })

      }.width("100%")
      .height(50)

      TimePicker({
        selected:this.myState.now
      }).onChange((e)=>{
        this.myState.now.setHours(e.hour)
        this.myState.now.setMinutes(e.minute)
      })

      Column(){
        this.CellBuilder()
      }.borderRadius(15)
      .clip(true)
      .margin({top:20})

      Column(){
        this.CellBuilder()
        this.CellBuilder()
        this.CellBuilder()
      }.borderRadius(15)
      .clip(true)
      .margin({top:20})

      Text('删除闹钟')
        .width(150)
        .height(40)
        .backgroundColor('#ccc')
        .fontColor('#f00')
        .textAlign(TextAlign.Center)
        .borderRadius(20)
        .opacity(0.3)
        .margin({top:20})

    }
    .width('100%')
    .height('100%')
    .padding(10)
    .backgroundColor("#fff")
  }
}