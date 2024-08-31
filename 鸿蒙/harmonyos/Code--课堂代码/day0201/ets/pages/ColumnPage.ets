@Entry
@Component
struct ColumnPage {
  build() {
     Column({space:10}){//列--大容器---任何子组件
       //行---大容器--任何子组件
       Row(){
         Text("头部")
       }
       .height(60).width(100).backgroundColor("#f00")

       Row(){
         Text("中间")
       }
       .height(60).width(100).backgroundColor("#f00")

       Row(){
         Text("底部")
       }
       .height(60).width(100).backgroundColor("#f00")
     }
     .height("100%")
     .width("100%")
     .justifyContent(FlexAlign.Start)//主轴 垂直的
     //Start 顶部  Center居中  End居左  SpaceBetween 两端对齐
     //SpaceEvenly 均分
     //SpaceAround 两端空隙是中间空隙的一半
     .alignItems(HorizontalAlign.Center)//侧轴 横向的
    //Start左  Center居中  End右
  }
}