
@Entry
@Component
struct DragPage {
  @State arr:string[]=["A","B","C","D"]
  @State dragStartIndex:number=0

  @Builder DragBox(item:string){
    Text(item)
      .height(60)
      .width(120)
      .fontColor(Color.White)
      .backgroundColor(Color.Red)
      .textAlign(TextAlign.Center)
  }

  //交换位置的方法
  changeIndex(index1:number,index2:number){
    [this.arr[index1],this.arr[index2]]=[this.arr[index2],this.arr[index1]]
  }

  build() {
    Column() {
      List({space:30}){
        ForEach(this.arr,(item:string,index)=>{
          ListItem(){
            Text(item)
              .height(60)
              .width(120)
              .fontColor(Color.White)
              .backgroundColor(Color.Red)
              .textAlign(TextAlign.Center)
              .onTouch((e)=>{
                //1.按下手指的时候，确定按下的是哪一个元素
                if(e.type===TouchType.Down){
                  this.dragStartIndex=index
                }
              })
              .onDragStart(()=>{
                //2.开始拖拽的时候，定义一个拖拽组件
                return this.DragBox(item)
              })
          }
        })
      }.alignListItem(ListItemAlign.Center)
      .onDrop((e:DragEvent,extraParams:string)=>{//配合List用的  拖拽释放
        //3.拖拽释放 交换位置
        //JSON 格式的字符串，里面就包含拖到的位置索引
        let extraJSON=JSON.parse(extraParams)
        this.changeIndex(this.dragStartIndex,extraJSON.insertIndex)
      })

    }.width("100%")
    .height("100%")

  }
}

