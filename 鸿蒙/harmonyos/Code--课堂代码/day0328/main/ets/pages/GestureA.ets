
import promptAction from '@ohos.promptAction'
@Entry
@Component
struct GestureA{
  @State message:string="hello"
  @State num:number=0

  build() {
    Column() {
      Text(this.message)
        .fontSize(30)
        .margin({top:20})
      Text(this.num.toString())
        .fontSize(30)
        .margin({top:20})

      // Button("TapGesture")
      //   .height(200)
      //   .width(200)
      //   .gesture(
      //     TapGesture({
      //       count:2,//点击次数
      //       fingers:1,//手指数
      //     }).onAction(()=>{
      //       this.message="TapGesture"
      //     })
      //   )


      // Button("LongPressGesture")
      //   .height(200)
      //   .width(200)
      //   .gesture(
      //     LongPressGesture({
      //       fingers:1,
      //       duration:1000,//默认 500
      //       repeat:true//是否连续触发 false不会连续触发  true会连续触发
      //     }).onAction(()=>{
      //       this.message="LongPressGesture"
      //       this.num++
      //     })
      //   )


      Button("长按删除")
        .height(200)
        .width(200)
        .gesture(
          LongPressGesture({
            fingers:1,
            duration:1000,//默认 500
            repeat:false//是否连续触发 false不会连续触发  true会连续触发
          }).onAction(()=>{
            promptAction.showDialog({
              title:"提示",
              message:"你确定要删除吗？",
              buttons:[
                {
                  text:"确定",
                  color:"#000"
                },
                {
                  text:"取消",
                  color:"#000"
                }
              ]
            }).then((data)=>{
              //根据需求做操作
              if(data.index===0){
                this.message="确定"
              }else{
                this.message="取消"
              }
            })
          })
        )
    }
    .width('100%')
    .height('100%')
  }
}