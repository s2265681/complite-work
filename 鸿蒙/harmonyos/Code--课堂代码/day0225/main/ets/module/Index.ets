interface ReplyType{
  id:number,
  avatar:ResourceStr,//Resource|string
  author:string,
  content:string,
  time:string,
  likeNum:number,
  likeFlag?:boolean,
  dislikeFlag?:boolean
}

@Observed
export class ReplyItem implements ReplyType{
  id:number=0
  avatar:ResourceStr=""
  author:string=""
  content:string=""
  time:string=""
  likeNum:number=0
  likeFlag?:boolean=false
  dislikeFlag?:boolean=false

  constructor(item:ReplyType) {
    this.id=item.id
    this.avatar=item.avatar
    this.author=item.author
    this.content=item.content
    this.time=item.time
    this.likeNum=item.likeNum
    this.likeFlag=item.likeFlag
    this.dislikeFlag=item.dislikeFlag
  }
}