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
      Text(`父组件---${this.BookArr[0].name}---${this.BookArr[0].size}`)
      Button("增加Size").onClick(()=>{
        this.BookArr[0].size+=10
        console.info(this.BookArr[0].size.toString())
        //数据是变化的，父组件视图没有更新，子组件视图更新
      })

      ForEach(this.BookArr,(item:BookItem)=>{
        Child({item})
      })
    }
    .width("100%")
    .height("100%")
  }
}

@Component
struct Child {
  //这种后期不做响应式操作的，可以直接传递
  //item:BookItem

  //传递每一项，并且是响应式
  @ObjectLink item:BookItem

  build() {
    Column() {
      Text(`${this.item.name}---${this.item.size}`)
      Button("增加Size").onClick(()=>{
        this.item.size+=10
      })
    }
    .width("100%")
    .height(100)
    .backgroundColor(Color.Pink)
  }
}