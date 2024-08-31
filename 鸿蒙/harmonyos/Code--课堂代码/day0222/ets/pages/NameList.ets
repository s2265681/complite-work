class NameClass{
  firstName:string
  nameContent:string[]
  constructor(firstName:string,nameContent:string[]) {
    this.firstName=firstName
    this.nameContent=nameContent
  }
}

@Entry
@Component
struct Index {
  NameList:NameClass[]=[
    new NameClass("李",["李里","李芳","李月","李飞","李藏"]),
    new NameClass("刘",["刘备","刘彻","刘思雨"]),
    new NameClass("王",["王玉华","王岁","王喜文","王华"])
  ]
  //构建函数
  @Builder HeaderTitle(firstName:string){
    Text(firstName)
      .height(60)
      .width("100%")
      .backgroundColor("#ccc")
  }

  @Builder delBtn(){
    Button("删除")
  }

  build(){
    Column(){
       List(){
         ForEach(this.NameList,(item)=>{
           ListItemGroup({header:this.HeaderTitle(item.firstName)}){
             ForEach(item.nameContent,(itemChid)=>{
               ListItem(){
                 Text(itemChid)
               }
               .width("100%")
               .height(60)
               .swipeAction({end:this.delBtn()})
             },item=>JSON.stringify(item))
           }
         },item=>JSON.stringify(item))
       }
    }.height("100%")
    .width("100%")
  }
}