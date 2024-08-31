//@BuilderParam  插槽

@Entry
@Component
struct Index {

  build() {
    Column() {
      //尾随闭包
      //组件插槽
      ListModel({title:"音乐"}){
        Text("我随意")
      }

      ListModel({title:"美术"})
    }
    .width("100%")
    .height("100%")

  }
}

@Component
struct ListModel{
  title:string
  @BuilderParam ListModelContent:()=>void=this.DefaultContent
  //默认内容
   @Builder DefaultContent(){
     Text("默认内容")
   }

  build(){
    Column(){
       Text(this.title)
       this.ListModelContent()
    }.height(100)
    .width("100%")
  }
}