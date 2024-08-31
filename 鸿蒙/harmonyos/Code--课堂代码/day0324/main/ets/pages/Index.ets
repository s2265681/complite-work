
import router from '@ohos.router'
import { ClockItemClass, ClockStore } from '../module/Index'
import reminderAgentManager from '@ohos.reminderAgentManager'
import { AlarmManager } from '../module/createClock'
@Entry
@Component
struct Index {
  clockStore:ClockStore=new ClockStore()
  @State ListData:ClockItemClass[]=[]

  //第一打开页面 一打来页面立刻获取数据
  aboutToAppear(){
    this.getData()
  }
  //注意：返回到这个页面的时候，再获取一次数据
  onPageShow(){
    this.getData()
  }

  async getData(){
    let list =await this.clockStore.getAllClock()
    this.ListData=list;
  }

  build() {
    Stack({alignContent:Alignment.Bottom}){
      Column(){
        Text("闹钟")
          .fontSize(24)
          .width("100%")

        CanvasClock()

        List({space:15}){
          ForEach(this.ListData,(item:ClockItemClass)=>{
            ListItem(){
              ClockItem({item})
                .onClick(()=>{
                  router.pushUrl({
                    url:"pages/AddClock",
                    params:item
                  })
                })
            }
          })
        }

      }
      .height("100%")
      .width("100%")
      .padding(15)

      Button("+")
        .fontSize(32)
        .height(50)
        .width(50)
        .margin({bottom:30})
        .onClick(()=>{
          router.pushUrl({
            url:"pages/AddClock"
          })
        })
    }
    .width('100%')
    .height('100%')
  }
}


@Component
struct ClockItem {
  item:Partial<ClockItemClass>={}
  clockstore=new ClockStore()

  //补零
  addZero(num){
    return num<10?"0"+num:num
  }

  async toggle(isOn:boolean){
    //开启--关闭： 后台的响铃任务，删除（仓库里的数据不会删除）
    //关闭--开启： 后台的响铃任务，已经删除了，再创建一个新的（数据任然没删，仓库里面的数据要被覆盖）
    //无论开启还是关闭，都要删除一次后台响铃任务
    reminderAgentManager.cancelReminder(this.item.reminderId);
    this.item.enable=isOn;
    if(isOn){//创建一个新的响铃任务,添加到仓库里
      const reminderId=await AlarmManager.addManager(this.item.hour,this.item.minute)
      //仓库数据覆盖
      this.item.reminderId=reminderId;
      await this.clockstore.setClock(this.item as ClockItemClass)
    }
  }

  build() {
    Row(){
      Column({space:5}){
        Row({space:5}){
          Text(`${this.item.hour>12?"下午":"上午"}`)
            .fontColor("#666")
          Text(`${this.addZero(this.item.hour>12?(this.item.hour-12):this.item.hour)}:${this.addZero(this.item.minute)}`)
            .fontWeight(800)
            .fontSize(18)
        }
        Row(){
          Text("闹钟,")
            .fontColor("#666")
          Text("不重复")
            .fontColor("#666")
        }
      }
      .alignItems(HorizontalAlign.Start)

      Toggle({type:ToggleType.Switch,isOn:this.item.enable})
        .height(30)
        .onChange((isOn)=>{
          this.toggle(isOn)
        })
    }
    .width('100%')
    .height(65)
    .justifyContent(FlexAlign.SpaceBetween)
    .padding(10)
    .backgroundColor("#f5f5f5")
    .borderRadius(30)
  }
}

@Component
struct CanvasClock {
  settings:RenderingContextSettings=new RenderingContextSettings(true)
  context:CanvasRenderingContext2D=new CanvasRenderingContext2D(this.settings)
  CanvasWH:number=232
  //表盘
  pan_Image:ImageBitmap=new ImageBitmap("/images/clock_pan.png")
  //时针
  hour_pointer:ImageBitmap=new ImageBitmap("/images/ic_hour_pointer.png")
  //分针
  minute_pointer:ImageBitmap=new ImageBitmap("/images/ic_minute_pointer.png")
  //秒针
  second_pointer:ImageBitmap=new ImageBitmap("/images/ic_second_pointer.png")

  aboutToAppear(){
    this.drawClock()
    setInterval(()=>{
      this.drawClock()
    },1000)
  }

  drawClock(){
    this.context.drawImage(this.pan_Image,0,0,this.CanvasWH,this.CanvasWH)

    let date=new Date()
    let hour=date.getHours()
    let minute=date.getMinutes()
    let second=date.getSeconds()
    let hourAngle=hour%12/12*360+minute/60*30
    let minuteAngle=minute/60*360+second/60*6
    let secondAngle=second/60*360

    this.drawPointer(this.hour_pointer,hourAngle)
    this.drawPointer(this.minute_pointer,minuteAngle)
    this.drawPointer(this.second_pointer,secondAngle)
  }

  drawPointer(img:ImageBitmap,angle:number){
    this.context.save()//开始保存
    this.context.translate(this.CanvasWH/2,this.CanvasWH/2)
    this.context.rotate((180+angle)*Math.PI/180)
    this.context.translate(-this.CanvasWH/2,-this.CanvasWH/2)
    this.context.drawImage(img,this.CanvasWH/2-4,0,8,this.CanvasWH)
    this.context.restore()//保存结束，并切恢复原来画布
  }

  build() {
    Column(){
      Canvas(this.context)
        .width(this.CanvasWH)
        .aspectRatio(1)
        .onReady(()=>{
          this.drawClock()
        })
    }
    .width('100%')
    .height(232)
    .margin({bottom:20})

  }
}



