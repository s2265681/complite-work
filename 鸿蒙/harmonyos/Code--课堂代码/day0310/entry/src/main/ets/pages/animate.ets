

@Entry
@Component
struct Animate {
  @State w:number=100
  @State h:number=100
  @State bgColor:Color=Color.Red

  build() {
    Row() {
      Column() {

         Row(){}
        .height(this.h)
         .backgroundColor(this.bgColor)
        .animation({//必须将属性放在animation的上面才会有动画效果
          duration:1000,//动画时长
          iterations:1,//动画次数  -1无限次
          curve:Curve.Linear,//动画曲线
          // delay:500,//延迟时间
          playMode:PlayMode.AlternateReverse//动画执行完成后，不会回到起点，从重点开始
        })
         .width(this.w)
         .animation({//必须将属性放在animation的上面才会有动画效果
           duration:3000,//动画时长
           iterations:1,//动画次数  -1无限次
           curve:Curve.Linear,//动画曲线
           // delay:500,//延迟时间
           playMode:PlayMode.AlternateReverse//动画执行完成后，不会回到起点，从重点开始
         })


        Button("实现属性动画").onClick(()=>{
          this.w=200
          this.h=200
          this.bgColor=Color.Blue
        })

      }
      .width('100%')
    }
    .height('100%')
  }
}
