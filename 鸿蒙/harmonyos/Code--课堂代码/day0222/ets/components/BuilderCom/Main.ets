@Component
export struct Main{
  @State count:number=10

  //组件内-- 没有function 关键词
  //使用的时候添加 this.XXX()
  @Builder ListModel(params:{title:string,count:number}){
    Text(`${params.title}---${params.count}`)
      .width("100%")
      .height(100)
      .backgroundColor(Color.Red)
  }

  build(){
    Column(){
      //建议：传递多个参数的时候，值为对象类型
      this.ListModel({title:"音乐",count:this.count})
      this.ListModel({title:"美术",count:20})
      this.ListModel({title:"舞蹈",count:30})
      Button("音乐支持人数增加").onClick(()=>{
        this.count++
      })
    }.height(500)
    .width("100%")
  }
}

//全局范围-- function 关键词
//使用的时候直接 XXX()
// @Builder function ListModel(params:{title:string,count:number}){
//    Text(`${params.title}---${params.count}`)
//      .width("100%")
//      .height(100)
//      .backgroundColor(Color.Red)
// }