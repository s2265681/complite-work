
import { CartFood } from '../module/Index'
@Component
export struct ELFooter{
  @Link showCart:boolean
  @Link CartList:CartFood[]

  getAllCount():number{
    return this.CartList.reduce((result,item)=>{
       return result+item.count
    },0)
  }

  getAllPrice():number{
    return this.CartList.reduce((result,item)=>{
       return result+(item.count*item.price*100)
    },0)/100
  }

  build() {
    Row(){
       Badge({
         value:`${this.getAllCount()}`,
         position:BadgePosition.RightTop,
         style:{badgeSize:18}
       }){
         Image($r("app.media.cartLogB"))
       }.height(50)
      .width(50)
      .margin({right:10})
      .onClick(()=>{
        this.showCart=!this.showCart
      })

      Column(){
        Text(){
          Span("￥")
            .fontSize(14)
          Span(this.getAllPrice().toFixed(2))
            .fontSize(20)
        }
        Text("另需配送费约 ¥3.3")
          .fontSize(14)
          .fontColor("#999")
      }
      .alignItems(HorizontalAlign.Start)
      .layoutWeight(1)

      Button("去结算")
        .fontSize(18)
        .fontColor(Color.White)
        .backgroundColor("#02B6FD")
        .padding({left:30,right:30})

    }
    .width("100%")
    .height(80)
    .padding(10)
    .backgroundColor(Color.White)
  }
}