interface BookType{
  id:number,
  authour:string,
  name:string,
  size:number
}

@Observed
class BookItem implements BookType{
  id:number=0
  authour:string=""
  name:string=""
  size:number=0

  constructor(item:BookType) {
    this.id=item.id
    this.authour=item.authour
    this.name=item.name
    this.size=item.size
  }
}

@Entry
@Component
struct Index {
  @State BookArr:BookItem[]=[
    new BookItem({id:0,authour:"爱吃草的猫",name:"年华",size:100}),
    new BookItem({id:1,authour:"爱吃的猫",name:"米米世界",size:120})
  ]

  build() {
    Column() {
      Text(`${JSON.stringify(this.BookArr)}`)
      Text(`${this.BookArr[0].name}---${this.BookArr[0].size}`)
      Button("增加Size").onClick(()=>{
        // this.BookArr[0].size+=10
        //深层次数据修改，视图是不会更新

        //解决方法：重新复制
        // this.BookArr[0]=new BookItem(this.BookArr[0])

        //了解 4 可以用   ... next 有的地方不行
        this.BookArr[0]={...this.BookArr[0],size:300}

        //push pop shift....
      })
    }
    .width("100%")
    .height("100%")
  }
}