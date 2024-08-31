import { CartFood, delAllCart } from '../module/Index'
import { ELAddCut } from './ELAddCut'
@Component
export struct ELCart{
  @Link CartList:CartFood[]

  build() {
    Column(){
      Column(){
         Row(){
           Text("已选商品")
             .fontSize(13)
           Row(){
             Image($r("app.media.ic_public_delete"))
               .height(14)
               .width(14)
               .fillColor("#999")
             Text("清空")
               .fontSize(13)
               .fontColor("#999")
           }.onClick(()=>{
             //清空购物车
             delAllCart()
           })
         }
         .width("100%")
         .height(30)
         .justifyContent(FlexAlign.SpaceBetween)
         .margin({bottom:10})

         List({space:20}){
           ForEach(this.CartList,(item)=>{
             ListItem(){
               ELCartItem({item})
             }
           })
         }

      }
      .width("100%")
      .backgroundColor(Color.White)
      .borderRadius({topLeft:20,topRight:20})
      .padding({left:10,top:10,right:10,bottom:100})
    }
    .width("100%")
    .height("100%")
    .backgroundColor("rgba(0,0,0,0.5)")
    .justifyContent(FlexAlign.End)

  }
}

@Component
export struct ELCartItem{
  item:Partial<CartFood>={}
  build() {
    Row(){
       Image(this.item.picture)
         .height(60)
         .width(60)
         .margin({right:10})
       Column(){
         Text(this.item.name)
         Row(){
           Text(){
             Span("￥")
               .fontSize(12)
               .fontColor('#FF4B33')
             Span(this.item.price.toFixed(2))
               .fontSize(16)
               .fontColor('#FF4B33')
           }
           //未来要添加  加减按钮组件
           ELAddCut({item:this.item})

         }
         .width("100%")
         .justifyContent(FlexAlign.SpaceBetween)
       }
       .layoutWeight(1)
       .height(60)
       .justifyContent(FlexAlign.SpaceBetween)
       .alignItems(HorizontalAlign.Start)

    }

  }
}