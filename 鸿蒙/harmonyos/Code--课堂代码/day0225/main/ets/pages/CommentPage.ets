import {ReplyItem} from "../module"
import {Comment} from "../components/Comment/Comment"
import {AddComment} from "../components/Comment/AddComment"

const list: ReplyItem[] = [
  new ReplyItem({
    id: 1,
    avatar: 'https://p3.toutiaoimg.com/origin/tos-cn-i-qvj2lq49k0/c917256b242844a4ba369b95416608d8?from=pc',
    author: '宫廷雨夜酒',
    content: '开心开心',
    time: '11-23',
    likeNum: 12
  }),
  new ReplyItem({
    id: 2,
    avatar: 'https://img-qn.51miz.com/preview/photo/00/01/55/78/P-1557835-4A93FA98.jpg',
    author: '绿山公园的晋灵公',
    content: '笑死我了',
    time: '11-21',
    likeNum: 54
  }),
  new ReplyItem({
    id: 3,
    avatar: 'https://picx.zhimg.com/v2-e6f4605c16e4378572a96dad7eaaf2b0_l.jpg?source=06d4cd63',
    author: '她妹圣母',
    content: '哈哈哈',
    time: '11-18',
    likeNum: 2
  }),
  new ReplyItem({
    id: 4,
    avatar: 'https://img2.baidu.com/it/u=986332587,1520119477&fm=253&fmt=auto?w=500&h=800',
    author: '五角的大楼',
    content: '真的太搞笑了',
    time: '11-17',
    likeNum: 1
  }),
  new ReplyItem({
    id: 5,
    avatar: 'https://img-qn.51miz.com/preview/photo/00/01/57/64/P-1576488-07E1D819.jpg',
    author: '柱子哥和林妹妹',
    content: '这概率也会好玩的',
    time: '11-15',
    likeNum: 129
  }),
  new ReplyItem({
    id: 6,
    avatar: 'https://img1.baidu.com/it/u=3118278400,896205114&fm=253&fmt=auto&app=138&f=JPEG?w=599&h=500',
    author: '光大闲人',
    content: '谁一天天的这么闲的嘛',
    time: '11-13',
    likeNum: 120
  }),
  new ReplyItem({
    id: 7,
    avatar: 'https://picx.zhimg.com/027729d02bdf060e24973c3726fea9da_l.jpg?source=06d4cd63',
    author: '山子哥',
    content: '天，一下子把我看笑了',
    time: '11-13',
    likeNum: 10
  })
]

@Entry
@Component
struct CommentPage{
  @State CommentList:ReplyItem[]=list

  //发布 方法2
  AddCommentFn(item:ReplyItem){
    this.CommentList.unshift(item)
  }

  build() {
    Stack({alignContent:Alignment.Bottom}) {
      //小说内容
      Column(){
        Row(){
          Image($r("app.media.left"))
            .height(15)
            .margin({right:10})
          Text("第5章 吃钱")
        }.height(60)
        .width("100%")
        .padding({left:10})

        Column(){}.width("100%").layoutWeight(1)
      }
      //遮罩层
      Column(){}
      .opacity(0.5)
      .width("100%")
      .height("100%")
      .backgroundColor(Color.Grey)
      //段评
      Comment({CommentList:$CommentList})
      //底部提交
      // AddComment({CommentList:$CommentList})

      //发布 方法2
      AddComment({AddCommentFn:(item:ReplyItem)=>{
        this.AddCommentFn(item)
      }})
    }
    .width("100%")
    .height("100%")
  }
}



