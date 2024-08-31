import axios from "@ohos/axios"
import { PullToRefresh } from '@ohos/pulltorefresh'

export class NewsModel {
  aid?: string
  catid?:string
  username?:string
  title?: string
}

@Entry
@Component
struct Index {
  @State ListData:NewsModel[]=[]
  @State page:number=1
  @State more:boolean=true
  //绑定列表 或 宫格
  private scroller: Scroller = new Scroller();

  aboutToAppear(){
    this.getData()
  }

  //上拉加载更多
  getData(resolve?: (value: string | PromiseLike<string>) => void){
    let apiUrl=`https://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=${this.page}`
    axios.get(apiUrl).then((res)=>{
      let result:NewsModel[]=res.data.result
      if(result.length<20){
        this.more=false
        if(resolve){
          resolve("")
        }
        return
      }
      this.ListData=this.ListData.concat(result)
      this.page++
      if(resolve){
        resolve("")
      }
    }).catch(err=>{
      console.log(err)
    })
  }

  //下拉刷新---返回第一页数据
  pullRefreshData(resolve?: (value: string | PromiseLike<string>) => void){
    this.page=1
    let apiUrl=`https://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=${this.page}`
    axios.get(apiUrl).then((res)=>{
      let result:NewsModel[]=res.data.result
      this.ListData=result
      this.page=2
      if(resolve){
        resolve("刷新成功")
      }
    }).catch(err=>{
      console.log(err)
    })
  }


  @Builder getListView(){

    List({
      scroller:this.scroller
    }){
      ForEach(this.ListData,(item:NewsModel)=>{
        ListItem(){
          Text(item.title)
            .width("100%")
            .height(50)
            .padding(10)
            .textOverflow({overflow:TextOverflow.Ellipsis})
            .maxLines(1)
        }
      })

      if(!this.more){
        ListItem(){
          Text("没有更多数据了")
            .maxLines(1)
            .fontColor("#999")
            .textAlign(TextAlign.Center)
            .width("100%")
            .margin({
              top: 20,
              bottom: 20
            })
        }

      }
    }.edgeEffect(EdgeEffect.None)

  }


  build() {
    Column() {
      Row(){
        Image($r("app.media.left"))
          .height(16)
          .position({
            x:10,
            y:16
          })
        Text("新闻列表")
          .fontSize(18)
          .height(50)
          .width("100%")
          .textAlign(TextAlign.Center)
      }.height(50)
      .width("100%")


      Column(){
        PullToRefresh({
          // 必传项，列表组件所绑定的数据
          data: $ListData,
          // 必传项，需绑定传入主体布局内的列表或宫格组件
          scroller: this.scroller,
          // 必传项，自定义主体布局，内部有列表或宫格组件
          customList: () => {
            // 一个用@Builder修饰过的UI方法
            this.getListView();
          },
          // 可选项，下拉刷新回调
          onRefresh: () => {
            return new Promise<string>((resolve, reject) => {
              // 模拟网络请求操作，请求网络2秒后得到数据，通知组件，变更列表数据
              // setTimeout(() => {
              //   resolve('刷新成功');
              //   this.data = this.dataNumbers;
              // }, 2000);
              this.pullRefreshData(resolve)
            });
          },
          // 可选项，上拉加载更多回调
          onLoadMore: () => {
            return new Promise<string>((resolve, reject) => {
              // 模拟网络请求操作，请求网络2秒后得到数据，通知组件，变更列表数据
              // setTimeout(() => {
              //   resolve('');
              //   this.data.push("增加的条目" + this.data.length);
              // }, 2000);
              this.getData(resolve)
            });
          },
          customLoad: null,
          customRefresh: null,
        })
      }.layoutWeight(1)



    }
    .width('100%')
    .height('100%')
  }
}