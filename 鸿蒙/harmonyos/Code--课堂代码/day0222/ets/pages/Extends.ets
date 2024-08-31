//只能全局内使用
import promptAction from '@ohos.promptAction'
//只能在当前页面使用，不能能导入导出

@Extend(Text) function commonTextStyle(size:number,color:string,cb:()=>void){
  .fontSize(size)
  .fontColor(color)
  .fontWeight(700)
  .backgroundColor("#fff")
  .onClick(()=>{
    cb()
  })
}

//@Extend(Button) funtion ....

@Entry
@Component
struct Index {

  build() {
    Column() {
       Text("hello")
         .commonTextStyle(20,"#f00",()=>{
           promptAction.showToast({
             message:"hello"
           })
         })

      Text("apple")
        .commonTextStyle(30,"#0f0",()=>{
          promptAction.showToast({
            message:"apple"
          })
        })

      Button("按钮")

    }
    .width("100%")
    .height("100%")
  }
}