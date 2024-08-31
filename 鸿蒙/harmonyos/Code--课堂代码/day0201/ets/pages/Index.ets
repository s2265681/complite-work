// ArkTS
//装饰器  @Entry  @Component  @State
//@Entry 入口
//@Component 组件
//@State 响应式

//struct(关键词) Index(组件名称) {} 自定组件
//build(){} UI描述--内容+样式
//系统组件(ArkUI) Row(){}  Column(){}  Text()
//属性方法 .fontSize(50)  .width('100%')  .height('100%')
//事件方法 .onClick(()=>{})

@Entry
@Component
struct Index {
  @State message: string = 'Hello World apple'

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .backgroundImageSize(ImageSize.Contain)
          .onClick(()=>{
             console.log("hello");
          })
      }
      .width('100%')
    }
    .height('100%')
  }
}