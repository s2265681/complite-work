import {ReplyItem} from "../../module"
import {CommentItem} from "./CommentItem"
//段评
@Component
export struct Comment {
  @Link CommentList:ReplyItem[]

  build() {
    Column(){
      Row(){
        Image($r("app.media.down"))
          .height(18)
          .position({
            x:16,
            y:16
          })
        Text("段评")
          .height("100%")
          .width("100%")
          .textAlign(TextAlign.Center)
          .fontSize(18)
      }.height(40)
      .width("100%")
      .padding({left:10})

      Row(){
        Text(`全部评论 ${this.CommentList.length}`)
          .fontWeight(800)
          .fontSize(21)
      }.height(40)
      .width("100%")
      .padding({left:10})

      //段评每项
      List(){
        ForEach(this.CommentList,(item:ReplyItem)=>{
          ListItem(){
            CommentItem({item})
          }
        })
      }


    }
    .width("100%")
    .height("90%")
    .backgroundColor(Color.White)
    .borderRadius({topLeft:20,topRight:20})
  }
}