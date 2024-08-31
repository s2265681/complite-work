@Entry
@Component
struct Index {
  //  @Builder 构建函数的修饰符 ---  抽取UI描述的
  @Builder HeaderTitle(firstName:string){
    Text(`${firstName}`)
      .height(60)
      .width("100%")
      .padding({left:10})
      .fontWeight(800)
      .fontSize(30)
      .border({color:"#f00",width:{bottom:3}})
  }

  @Builder DelButton(){
    Button("删除")
      .backgroundColor(Color.Red)
  }

  build() {
    Column() {
      //一般与循环一起使用
      // List({space:4}){
      //    ListItem(){
      //      Text("苹果")
      //    }
      //    .height(300)
      //    .width("100%")
      //    .backgroundColor(Color.Green)
      //
      //    ListItem(){
      //      Text("香蕉")
      //    }
      //    .height(300)
      //    .width("100%")
      //    .backgroundColor(Color.Green)
      //
      //    ListItem(){
      //      Text("西瓜")
      //    }
      //    .height(300)
      //    .width("100%")
      //    .backgroundColor(Color.Green)
      // }


      List(){
        //header的值是 ”构建函数“
         ListItemGroup({header:this.HeaderTitle("李")}){
           ListItem(){
              Text("李放")
           }.height(60)
             .width("100%")
             .border({color:"#f00",width:{bottom:3}})
             .swipeAction({end:this.DelButton()})

           ListItem(){
             Text("李名")
           }
           .height(60)
           .width("100%")
           .border({color:"#f00",width:{bottom:3}})
           .swipeAction({start:this.DelButton()})

           ListItem(){
             Text("李送")
           }
           .height(60)
           .width("100%")
           .border({color:"#f00",width:{bottom:3}})
         }

        ListItemGroup({header:this.HeaderTitle("刘")}){
          ListItem(){
            Text("刘放")
          }.height(60)
          .width("100%")
          .border({color:"#f00",width:{bottom:3}})

          ListItem(){
            Text("刘名")
          }
          .height(60)
          .width("100%")
          .border({color:"#f00",width:{bottom:3}})

          ListItem(){
            Text("刘送")
          }
          .height(60)
          .width("100%")
          .border({color:"#f00",width:{bottom:3}})
        }
      }
    }
    .width('100%')
    .height('100%')
  }
}