@Entry
@Component
struct IndexB {
  @State productList: string[] = ["第一个商品", "第二个商品", "第三个商品", "第四个商品"]
  @State ScreenX:number=0
  @State ScreenY:number=0
  @State opacityValue:number=0

  build() {
    Stack({alignContent:Alignment.TopStart}){
      Column() {
        List(){
          ForEach(this.productList,(item)=>{
            ListItem(){
              Row(){
                Text(item)
                Button(){
                  Text("+")
                    .fontSize(18)
                    .fontColor(Color.White)
                }
                .height(30)
                .width(30)
                .onClick((e:ClickEvent)=>{
                  //点击的时候，小球无动画版去，点击处
                  this.ScreenX=e.screenX-15
                  this.ScreenY=e.screenY-15

                  this.opacityValue=1

                  //有动画版的移动
                  animateTo({duration:1000},()=>{
                    this.ScreenX=0
                    this.ScreenY=600
                  })

                  setTimeout(()=>{
                    this.opacityValue=0
                    this.ScreenX=0
                    this.ScreenY=0
                  },1000)

                })
              }
              .width("100%")
              .height(60)
              .padding(10)
              .justifyContent(FlexAlign.SpaceBetween)
            }
          })
        }
      }
      .width('100%')
      .height('100%')

      Row(){
      }.backgroundColor(Color.Red)
      .width(30)
      .height(30)
      .borderRadius(30)
      .opacity(this.opacityValue)
      .translate({
        x:this.ScreenX,
        y:this.ScreenY
      })

    }

  }
}