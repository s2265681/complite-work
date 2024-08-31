
@Entry
@Component
struct Index {
  @State arrData:{id:number,name:string}[]=[
    {id:1,name:"lili"},
    {id:2,name:"lisa"},
    {id:3,name:"Tom"}
  ]

  build(){
    Column(){
      // ForEach(this.arrData,(item)=>{
      //   Text(`${new Date().getTime()}--${item.name}`)
      // },(item,index)=>index+JSON.stringify(item))
      //默认 key  cb的返回值必须字符串

      // ForEach(this.arrData,(item)=>{
      //   Text(`${new Date().getTime()}--${item.name}`)
      // })
      //官方默认的key : (item,index)=>index+JSON.stringify(item)

      ForEach(this.arrData,(item)=>{
        Text(`${new Date().getTime()}--${item.name}`)
      },item=>JSON.stringify(item))

      Button("尾部添加数据").onClick(()=>{
        this.arrData.push({id:this.arrData.length,name:"王宝"})
      })

      Button("换数据的位置").onClick(()=>{
        this.arrData=[this.arrData[1],this.arrData[2],this.arrData[0]]
      })
    }.height("100%")
    .width("100%")
  }
}
