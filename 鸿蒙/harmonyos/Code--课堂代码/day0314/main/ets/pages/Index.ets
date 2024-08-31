@Entry
@Component
struct Index{
  controller:VideoController=new VideoController()
  @State speed:number=1 //0.75 1 1.25 1.5 1.75 2

  build() {
    Column() {
      Video({
        src:$r("app.media.md"),
        currentProgressRate:this.speed,
        controller:this.controller
      }).width("100%")
        .aspectRatio(1)

      Slider({
        value:this.speed,
        min:0.75,
        max:2,
        step:0.25,
        style:SliderStyle.InSet
      })
        .onChange((value)=>{
          this.speed=value
        })

      Row(){
        Button("开始").onClick(()=>{
           this.controller.start()
        })
        Button("暂停").onClick(()=>{
          this.controller.pause()
        })
        Button("结束").onClick(()=>{
        this.controller.stop()
      })

        Button("立刻跳到30s").onClick(()=>{
          this.controller.setCurrentTime(30)//单位是秒
        })
      }

    }
    .width('100%')
    .height('100%')
  }
}