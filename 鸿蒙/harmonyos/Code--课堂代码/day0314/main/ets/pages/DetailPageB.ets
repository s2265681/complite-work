import router from '@ohos.router'
export interface ImageListData {
  uniqueId: string,
  imageUrl: string
}

@Entry
@Component
struct DetailPage {
  listData: ImageListData[] = [
    {
      "uniqueId": 'cat',
      "imageUrl": 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fab52a0e0-47c7-42bb-8e80-598f0619e967%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1712233483&t=74e21a578b2ad4f17ff37f527aadb4a8',
    },
    {
      "uniqueId": 'dog',
      "imageUrl": 'https://pcs4.clubstatic.lenovo.com.cn/data/attachment/forum/201902/11/083558oh92pzws06f6zo64.jpg',
    },
    {
      "uniqueId": 'flower',
      "imageUrl": 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202103%2F11%2F20210311112742_7c625.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1712233548&t=a76c401be97ee2fdf7963d533b877182',
    },
    {
      "uniqueId": 'water',
      "imageUrl": 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F49583813%2F1e399fbb663e444f86e2cadc6b071672.jpg%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvNDk1ODM4MTMvMWUzOTlmYmI2NjNlNDQ0Zjg2ZTJjYWRjNmIwNzE2NzIuanBn%2Fsign%2F88829e64011743ee477cf9f22543da2d.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1712233570&t=9775acd64bdc447ca30fd528aa2cc917',
    }
  ]
  @State activeIndex:number=0
  aboutToAppear(){
    let params:object=router.getParams()
    this.activeIndex=this.listData.findIndex((item)=>{
      return item.uniqueId===params["uniqueId"]
    })
  }

   build() {
      Column() {
         Swiper(){
            ForEach(this.listData,(item:ImageListData)=>{
              Column(){
                Image(item.imageUrl)
                  .height(200)
                  .width("100%")
                  .sharedTransition(item.uniqueId,{
                    duration:300
                  })
                  .onClick(()=>{
                    router.back()
                  })
              }
            })
         }
        .loop(true)
        .index(this.activeIndex)
      }
      .justifyContent(FlexAlign.Center)
      .width('100%')
      .height('100%')
      .backgroundColor(Color.Black)
      .sharedTransition("bg",{
        duration:300,
        type:SharedTransitionEffectType.Static
      })
    }

  //去掉页面转场动画
  pageTransition() {
    PageTransitionEnter({ type: RouteType.None, duration: 0 })
    PageTransitionExit({ type: RouteType.None, duration: 0 })
  }

}