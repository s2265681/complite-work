@Entry
@Component
struct Index {
  @State positionY:number=200
  @State flag:boolean=false
  @State List:string[]=["选择相册","选择拍照","取消"]

  build() {
    Stack({alignContent:Alignment.Bottom}){
      Column(){
        Button("打开底部菜单栏").onClick(()=>{
           this.flag=!this.flag
           if(this.flag){
             this.positionY=0
           }else {
             this.positionY=200
          }
        })
      } .height('100%')
      .width('100%')

      //遮罩层没起到遮罩的作用
      Column(){
      } .height('100%')
      .width('100%')
      .backgroundColor(Color.Gray)
      .opacity(0.5)
      .visibility(this.flag?Visibility.Visible:Visibility.Hidden)
      .onClick(()=>{
        this.flag=false
        this.positionY=200
      })
      .animation({
        duration:1000
      })

      Column(){
        List({space:3}){
          ForEach(this.List,(item)=>{
            ListItem(){
              Text(item)
                .fontSize(24)
                .textAlign(TextAlign.Center)
                .height(63)
                .width("100%")
                .backgroundColor("#eee")
            }
          })
        }
      }.width('100%')
      .backgroundColor(Color.White)
      .translate({y:this.positionY})
      .animation({
        duration:1000
      })

    }
    .height('100%')
    .width('100%')
  }
}