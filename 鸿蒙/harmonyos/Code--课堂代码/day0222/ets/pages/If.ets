//判断 if else
// 三元
@Entry
@Component
struct Index {
  selectedData:{value:string}[]=[{value:"霍建华"},{value:"周深"},{value:"杨丽萍"}]
  @State selectedIndex:number=-1
  build(){
    Column(){
       Select(this.selectedData)
         .selected(1)
         .value("-请选择-")
         .onSelect((index)=>{//index 选中那项的索引下标
             this.selectedIndex=index;
         })

       if(this.selectedIndex===0){
         Text("演员")
       }else if(this.selectedIndex===1){
         Text("歌手")
       }else if(this.selectedIndex===2){
         Text("舞蹈家")
       }else{
         Text("普通人")
       }
    }.height("100%")
    .width("100%")

  }
}
