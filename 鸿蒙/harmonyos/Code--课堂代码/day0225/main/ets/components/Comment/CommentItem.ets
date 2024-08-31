import {ReplyItem} from "../../module"
//段评每项
@Component
export struct CommentItem {
  //有响应式
  @ObjectLink item:ReplyItem

  build() {
    Column(){
      Row(){
        Image(`${this.item.avatar}`)
          .height(50)
          .width(50)
          .borderRadius(50)
          .margin({right:10})
        Column(){
          Text(`${this.item.author}`)
            .margin({bottom:8})

          if(this.item.dislikeFlag){
            Text("该评论被折叠")
              .fontColor("#ccc")
          }else{
            Text(`${this.item.content}`)
          }

        }.justifyContent(FlexAlign.Start)
        .alignItems(HorizontalAlign.Start)
        .width("100%")
        .layoutWeight(1)
      }.width("100%")

      Row(){
        Text(`${this.item.time}`)
          .margin({left:60})
        Row(){
          Image($r("app.media.ic_public_love"))
            .height(25)
            .margin({right:3})
            .fillColor(this.item.likeFlag?Color.Red:"#000")
            .onClick(()=>{
              if(this.item.likeFlag){//true
                this.item.likeFlag=false
                this.item.likeNum--
              }else{//false
                this.item.likeFlag=true
                this.item.likeNum++
                //如果喜欢，就要判断一下是否也是折叠的，
                //如果是折叠的，就将折叠放开
                if(this.item.dislikeFlag){
                  this.item.dislikeFlag=false;
                }
              }
            })
          Text(`${this.item.likeNum}`)
            .width(40)
          Image($r("app.media.ic_public_password_invisible"))
            .height(25)
            .fillColor(this.item.dislikeFlag?Color.Red:"#000")
            .onClick(()=>{
              if(this.item.dislikeFlag){//true
                this.item.dislikeFlag=false
              }else{//false
                this.item.dislikeFlag=true
                //如果折叠的，就要判断一下是否也是喜欢，
                //如果是喜欢，就将喜欢变成不喜欢，同时喜欢人数减一
                if(this.item.likeFlag){
                  this.item.likeFlag=false;
                  this.item.likeNum--;
                }
              }
            })
        }
      }.width("100%")
      .height(40)
      .justifyContent(FlexAlign.SpaceBetween)
    }
    .width("100%")
    .padding(10)

  }
}
