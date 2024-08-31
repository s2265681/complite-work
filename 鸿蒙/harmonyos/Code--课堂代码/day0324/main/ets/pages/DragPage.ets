@Observed
export class DragModel{
  name:string
  flag:boolean

  constructor(name:string,flag:boolean) {
    this.name=name;
    this.flag=flag;
  }
}
@Entry
@Component
struct DragPage {
  @State arr:DragModel[]=[
    new DragModel('A', true),
    new DragModel('B', true),
    new DragModel('C', true),
    new DragModel('D', true)
  ]

  @State dragStartIndex:number=0

  //交换位置的方法
  changeIndex(index1:number,index2:number){
    [this.arr[index1],this.arr[index2]]=[this.arr[index2],this.arr[index1]]
  }

  build() {
    Column() {
       List({space:30}){
         ForEach(this.arr,(item:DragModel,index)=>{
            ListItem(){
              DragChild({item})
                .onTouch((e)=>{
                  //1.按下手指的时候，确定按下的是哪一个元素
                  if(e.type===TouchType.Down){
                    this.dragStartIndex=index
                  }
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

@Component
struct DragChild {
  @ObjectLink item:DragModel

  @Builder DragBox(item:string){
    Text(item)
      .height(60)
      .width(120)
      .fontColor(Color.White)
      .backgroundColor(Color.Red)
      .textAlign(TextAlign.Center)
  }

  build() {
    Column() {
      Text(this.item.name)
        .height(60)
        .width(120)
        .fontColor(Color.White)
        .backgroundColor(Color.Red)
        .textAlign(TextAlign.Center)
        .visibility(this.item.flag?Visibility.Visible:Visibility.None)
        .onDragStart(()=>{
          //2.开始拖拽的时候，定义一个拖拽组件
          //4.开始拖拽的时候，让拖拽的元素变成false  隐藏
          this.item.flag=false;
          return this.DragBox(this.item.name)
        })
        .onTouch((e)=>{
          //手指抬起，显示元素
          if(e.type===TouchType.Up){
            this.item.flag=true
          }
        })


      Text("")
        .height(60)
        .width(120)
        .border({
          width:10,
          color:"#0f0"
        })
        .visibility(!this.item.flag?Visibility.Visible:Visibility.None)

    }
  }
}

