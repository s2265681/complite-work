import sensor from '@ohos.sensor';
import promptAction from '@ohos.promptAction';

@Entry
@Component
struct SensorShakePage {
  @State top:number=-200
  @State left:number=0
  @State scaleV:number=1
  aboutToAppear(){
    this.getSensor()
  }

  getSensor(){
    sensor.on(sensor.SensorId.ACCELEROMETER,(data)=>{
      let num=15
      if(data.x>15||data.x<-num||data.y>15||data.y<-num||data.z>15||data.z<-num){
        promptAction.showToast({
          message:"检测到摇一摇",
          duration:2000
        })
        this.top=200
      }
    },{interval: 100000000})//100毫秒

    //sensor.off()//关闭
  }

  build() {
    Stack({
      alignContent:Alignment.Top
    }){
      Column(){
        Text("摇一摇看小效果").margin({
          top:15
        }).fontSize(20)

        Button("点击看动画效果--测试").onClick(()=>{
          this.top=200
        })

      }
      .width("100%")
      .height(100)

      Row() {
        Image("https://img0.baidu.com/it/u=3428016638,2791008202&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=533")
      }
      .width(200)
      .height(200)
      .scale({x:this.scaleV,y:this.scaleV})
      .translate({
        y:this.top,
        x:this.left
      })
      .animation({
        duration:1000
      })
      .onClick(()=>{
        this.top=300
        this.left=300
        this.scaleV=0

        setTimeout(()=>{
          this.top=-200
          this.left=0
          this.scaleV=0
        },1000)
        setTimeout(()=>{
          this.scaleV=1
        },2000)
      })

    }

  }
}