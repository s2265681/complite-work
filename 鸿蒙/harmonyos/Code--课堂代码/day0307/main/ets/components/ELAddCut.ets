
import { addCart, CartFood, delCart, FoodItem } from '../module/Index'
@Component
export struct ELAddCut {
  item:Partial<FoodItem>={}
  @Consume CartList:CartFood[]

  getCount():number{
    return this.CartList.find(f=>f.id===this.item.id)?.count||0
  }

  build() {
    Row(){
      //后期会进一步修改，当数据为0的时候，只显示加
      if(this.getCount()>0){
        Row(){
          Image($r("app.media.ic_screenshot_line"))
            .width(16)
            .fillColor('#02B6FD')
        }
        .height(18)
        .width(18)
        .borderRadius(18)
        .backgroundColor(Color.White)
        .border({
          width:1,
          color:'#02B6FD'
        })
        .onClick(()=>{
          delCart(this.item.id)
        })

        Text(`${this.getCount()}`).padding({left:6,right:6})
      }

      Row(){
        Image($r("app.media.ic_public_add"))
          .width(16)
          .fillColor('#fff')
      }
      .height(18)
      .width(18)
      .borderRadius(18)
      .backgroundColor("#02B6FD")
      .border({
        width:1,
        color:'#02B6FD'
      }).onClick(()=>{
         addCart(this.item as FoodItem)
      })

    }
  }
}