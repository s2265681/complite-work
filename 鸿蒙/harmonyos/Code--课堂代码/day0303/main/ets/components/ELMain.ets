import { Category, FoodItem } from '../module/Index'
@Component
export struct ELMain{
  @State activeIndex:number=0
  @Link CategoryList:Category[]

  build() {
    Column(){
      ELHeader()
      ELNav()
      Row(){
        //左侧
        Column(){
          ForEach(this.CategoryList,(item:Category,index)=>{
            Text(item.name)
              .height(60)
              .width("100%")
              .textAlign(TextAlign.Center)
              .fontSize(14)
              .backgroundColor(this.activeIndex===index?Color.White:"#eee")
              .onClick(()=>{
                this.activeIndex=index
              })
          })
        }.width(100)

        //右侧
        List(){
          ForEach(this.CategoryList[this.activeIndex]?.foods||[],(item:FoodItem)=>{
            ListItem(){
              ELFoodItem({item})
            }
          })
        }.layoutWeight(1)
        .height("100%")
        .backgroundColor(Color.White)

      }
      .layoutWeight(1)
      .width("100%")
      .alignItems(VerticalAlign.Top)
      .backgroundColor("#eee")
    }
    .width("100%")
    .height("100%")
  }
}

@Component
export struct ELFoodItem{
  //不用赋值初始值
  item:Partial<FoodItem>={}

  build() {
    Row(){
      Image(`${this.item.picture}`)
        .height(90)
        .width(90)
        .borderRadius(5)
      Column({space:5}){
        Text(`${this.item.name}`)
          .fontSize(18)
          .fontWeight(700)
        Text("原料："+this.item.description)
          .fontSize(14)
          .textOverflow({
            overflow:TextOverflow.Ellipsis
          })
          .maxLines(1)

        if(this.item.food_label_list.length>0){
          Text(`${this.item.food_label_list[0]}`)
            .fontSize(10)
            .fontColor('#FF604B')
            .padding({ top: 2, bottom: 2, right: 5, left: 5 })
            .borderRadius(5)
            .border({
              width:1,
              color:"#FF604B"
            })
        }

        Text() {
          Span(`月销 ${this.item.monthly_sales}`)
          Span(' ')
          Span(`${this.item.positive_reviews}`)
        }
        .fontSize(12)
        .fontColor('#999')

        Row() {
          Text() {
            Span('¥ ')
              .fontColor('#FF604B')
              .fontSize(10)
            Span(this.item.price.toFixed(2))
              .fontColor('#FF604B')
              .fontWeight(FontWeight.Bold)
          }

        }
        .justifyContent(FlexAlign.SpaceBetween)
        .width('100%')

      }
      .layoutWeight(1)
      .alignItems(HorizontalAlign.Start)
      .padding({ left: 10, right: 10 })

    }.padding(10)
    .alignItems(VerticalAlign.Top)
  }
}

@Component
export struct ELHeader{

  build() {
    Row(){
       Image($r("app.media.left"))
         .height(16)

       Row(){
          Image($r("app.media.ic_public_search"))
            .width(14)
            .fillColor("#999")
            .margin({left:5})
          Text("搜一搜")
            .fontSize(12)
            .fontColor("#999")
       }.height(25)
      .width(120)
      .backgroundColor("#eee")
      .borderRadius(15)

      Image($r("app.media.ic_public_comments"))
        .height(20)

      Image($r("app.media.ic_public_favor"))
        .height(20)

      Image($r("app.media.ic_public_add"))
        .height(20)
    }
    .width("100%")
    .height(60)
    .padding({left:10,right:10})
    .justifyContent(FlexAlign.SpaceEvenly)
  }
}

@Component
export struct ELNav{
   @Builder NavItem(active:boolean,title:string,subTitile?:string){
     Column(){
       Text(){
         Span(title)
         if(subTitile){
           Span(subTitile)
             .fontSize(10)
             .fontWeight(active?FontWeight.Bold:FontWeight.Normal)
         }
       }.layoutWeight(1)
       .fontWeight(active?FontWeight.Bold:FontWeight.Normal)

       Text()
         .height(3)
         .width(20)
         .borderRadius(2)
         .backgroundColor(active?"#02B6FD":"transparent")
     }.width(80)
   }
  build() {
    Row(){
      this.NavItem(true,"点餐")
      this.NavItem(false,"评价","345")
      this.NavItem(false,"商家")
    }
    .width("100%")
    .height(40)
  }
}
