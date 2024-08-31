@Entry
@Component
struct TouchA {
  @State message:string=""
  @State TouchE:string=""

  build() {
    Column() {
       Button("触摸时间")
         .height(200)
         .width(200)
         .onTouch((e:TouchEvent)=>{
           if(e.type===TouchType.Down){
              this.message="down"
           }
           if(e.type===TouchType.Move){
             this.message="move"
           }
           if(e.type===TouchType.Up){
             this.message="up"
           }

           this.TouchE=JSON.stringify(e)

         })

      Text(this.message)
      Text(this.TouchE)
    }
    .width('100%')
    .height('100%')
  }
}