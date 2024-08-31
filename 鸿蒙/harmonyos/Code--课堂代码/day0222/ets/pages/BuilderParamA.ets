//@BuilderParam  插槽

@Entry
@Component
struct Index {
  @Builder topContent(){
    Text("上部分内容")
  }

  @Builder downContent(){
    Text("下部分内容")
  }

  build() {
    Column() {
      //尾随闭包(默认插槽)
      //组件插槽
      //具名插槽
      // ListModel({title:"音乐",
      //   topContent:this.topContent,
      //   downContent:()=>{
      //     this.downContent()
      //   }})

      ListModel({title:"音乐",
        // topContent:this.topContent,
        // downContent:()=>{
        //   this.downContent()
        // }
        })
    }
    .width("100%")
    .height("100%")

  }
}

@Component
struct ListModel{
  title:string
  @BuilderParam topContent:()=>void=this.DefaultUpContent
  @BuilderParam downContent:()=>void
  //默认内容
  @Builder DefaultUpContent(){
    Text("默认内容")
  }

  build(){
    Column(){
      this.topContent()
      Text(this.title)
      if(this.downContent){
        this.downContent()
      }
    }.height(100)
    .width("100%")
  }
}