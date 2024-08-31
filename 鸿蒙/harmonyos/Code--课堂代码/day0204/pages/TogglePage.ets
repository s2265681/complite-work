@Entry
@Component
struct Index {

  build() {
    Column() {
      Toggle({type:ToggleType.Checkbox,isOn:true})
        .selectedColor(Color.Green)

      Toggle({type:ToggleType.Switch,isOn:true})
        .selectedColor(Color.Red)
        .switchPointColor(Color.Yellow)

      Toggle({type:ToggleType.Button,isOn:false}){
        Text("按钮")
      }
      .selectedColor(Color.Red)

      //滑块组件
       Slider({
         value:10,
         min:0,
         max:100,
         step:10,//每次滑动的步长
         style:SliderStyle.InSet,
         direction:Axis.Horizontal,//滑块的方向
         reverse:true//是否倒序滑动
       })

      //进度条组件
      Progress({
        value:10,
        total:100,
        type:ProgressType.ScaleRing
      }).style({
        strokeWidth:10,
        scaleCount:15,
        scaleWidth:4
      })

    }.width('100%')
    .height('100%')
  }
}