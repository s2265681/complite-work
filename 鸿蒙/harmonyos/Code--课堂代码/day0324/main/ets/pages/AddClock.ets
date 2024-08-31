import router from '@ohos.router'
import { ClockItemClass, ClockStore } from '../module/Index'
import util from '@ohos.util'
import reminderAgentManager from '@ohos.reminderAgentManager'
import promptAction from '@ohos.promptAction'
import { AlarmManager } from '../module/createClock'
@Entry
@Component
struct AddClock {
  clockStore:ClockStore=new ClockStore()
  @State myState:{now:Date}={now:new Date()}

  @State clockItem:Partial<ClockItemClass>={}

  aboutToAppear(){
    const params=router.getParams() as ClockItemClass
    this.clockItem=params
    if(params&&params.id){
      this.myState.now.setHours(params.hour)
      this.myState.now.setMinutes(params.minute)
    }
  }

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

  //添加闹钟   编辑闹钟
   async addClock(){
    let hour=this.myState.now.getHours()
    let minute=this.myState.now.getMinutes()

     //不能通过调用某个方法去修改数据里面的某项内容，可以操作整条数据
     //1.先删除原来的数据，然后再增加一项(id一定要相同）----> 覆盖

     //注意：后台响铃任务，也不能通过方法去修改响铃的时间
     //响铃任务也要先删除后，后添加
     if(this.clockItem.reminderId){
        reminderAgentManager.cancelReminder(this.clockItem.reminderId)
     }

    //添加后台响铃任务
    const reminderId=await AlarmManager.addManager(hour,minute)

    let obj={
      id:this.clockItem.id?this.clockItem.id:util.generateRandomUUID()+Date.now(),
      hour,
      minute,
      enable:true,
      reminderId
    }

     //添加到仓库中
     await this.clockStore.setClock(obj)
     //提示
     promptAction.showToast({
       message:this.clockItem.id?"添加闹钟成功":"添加闹钟成功"
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
        Text(this.clockItem.id?"编辑闹钟":"新建闹钟")
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

      if(this.clockItem.id){
        Text('删除闹钟')
          .width(150)
          .height(40)
          .backgroundColor('#ccc')
          .fontColor('#f00')
          .textAlign(TextAlign.Center)
          .borderRadius(20)
          .opacity(0.3)
          .margin({top:20})
          .onClick(async ()=>{
            //1.删除仓库里面的数据
            await this.clockStore.delClock(this.clockItem.id)
            //2.取消后台响铃任务
            reminderAgentManager.cancelReminder(this.clockItem.reminderId)
            //3.信息提示
            promptAction.showToast({
              message:"删除成功"
            })
            //4.返回到首页
            router.back()
          })
      }

    }
    .width('100%')
    .height('100%')
    .padding(10)
    .backgroundColor("#fff")
  }
}