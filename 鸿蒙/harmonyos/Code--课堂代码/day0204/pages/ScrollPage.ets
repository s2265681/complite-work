@Entry
@Component
struct Index {
  scroll:Scroller=new Scroller()

  build() {
    Stack({alignContent:Alignment.BottomEnd}){
      Scroll(this.scroll){
       Column(){
         Row(){
           Text("111")
         }.height(300)
         .width("100%")
         .backgroundColor(Color.Red)

         Row(){
           Text("222")
         }.height(300)
         .width("100%")
         .backgroundColor(Color.Blue)

         Row(){
           Text("333")
         }.height(300)
         .width("100%")
         .backgroundColor(Color.Pink)
       }
     }
      Button("返回顶部")
        .onClick(()=>{
          this.scroll.scrollEdge(Edge.Top)
        })
        .margin({
          right:15,
          bottom:15
        })
   }.height("100%")
    .width("100%")
  }
}