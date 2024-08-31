import {ReplyItem} from "../../module"
@Component
export struct AddComment {
  @State CommentValue:string=""
  // @Link  CommentList:ReplyItem[]
  //
  // AddComment(){
  //   let obj=new ReplyItem({
  //     id:Date.now(),
  //     avatar: 'https://img0.sc115.com/wm/sy/pic/1502mxp1tzdfkus.jpg',
  //     author: '我是绿叶',
  //     content: this.CommentValue,
  //     time: `${new Date().getMonth()+1}-${new Date().getDate()}`,
  //     likeNum: 0,
  //     likeFlag:false,
  //     dislikeFlag:false
  //   })
  //
  //   this.CommentList.unshift(obj);//提交
  //   this.CommentValue="";//清空输入框内容
  // }

  //发布方法2
  AddCommentFn:(item:ReplyItem)=>void = ()=>{}
  AddComment(){
    let obj=new ReplyItem({
      id:Date.now(),
      avatar: 'https://img0.sc115.com/wm/sy/pic/1502mxp1tzdfkus.jpg',
      author: '我是绿叶',
      content: this.CommentValue,
      time: `${new Date().getMonth()+1}-${new Date().getDate()}`,
      likeNum: 0,
      likeFlag:false,
      dislikeFlag:false
    })

    this.AddCommentFn&&this.AddCommentFn(obj);//提交
    this.CommentValue="";//清空输入框内容
  }

  build() {
    Row() {
      TextInput({placeholder:"有趣的评论千万条，不如你也来一条？"})
        .layoutWeight(1)
        .placeholderFont({size:14})
        .margin({right:10})
        .onChange((value)=>{
          this.CommentValue=value;
        })

      Text("发布").onClick(()=>{
        if(this.CommentValue.trim()!==""){
          this.AddComment()
        }
      })

    }.width('100%')
    .height(60)
    .padding(10)
    .backgroundColor(Color.White)
    .border({
      width:{
        top:1
      },
      color:"##f4f5f6"
    })
  }
}