@Entry
@Component
struct Index {

  build() {
    Column() {
      //堆叠
       Stack({alignContent:Alignment.BottomEnd}){
         Row(){
         }.height(300)
         .width(300)
         .backgroundColor(Color.Red)

         Row(){
         }.height(200)
         .width(200)
         .backgroundColor(Color.Yellow)

         Row(){
         }.height(100)
         .width(100)
         .backgroundColor(Color.Green)
       }
    }.width('100%')
    .height('100%')
  }
}