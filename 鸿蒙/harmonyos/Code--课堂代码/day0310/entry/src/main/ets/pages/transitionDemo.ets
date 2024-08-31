@Entry
@Component
struct Index {
  @State List: number[]  = [1,2,3,4]

  build() {
    Stack({alignContent:Alignment.BottomEnd}){
       Column(){
         List({space:5}){
           ForEach(this.List,(item)=>{
             ListItem(){
               Text(item.toString())
                 .height(60)
                 .width("100%")
                 .backgroundColor(Color.Red)
                 .textAlign(TextAlign.Center)
                 .fontSize(20)
             }.transition({
               type:TransitionType.All,
               translate:{x:300}
             })
             .onClick(()=>{
               animateTo({duration:1000},()=>{
                 // this.List.splice(i,1)
                 //坑：注意这里的删除索引不能直接使用，需要查找
                 let deli=this.List.indexOf(item)
                 this.List.splice(deli,1)
               })
             })
           },item=>JSON.stringify(item))
         }
       }.width("100%")
       .height("100%")

        Button("add").onClick(()=>{
          animateTo({duration:1000},()=>{
            this.List.push(this.List[this.List.length-1]+1)
          })
        })
    }
    .width("100%")
    .height("100%")
  }
}