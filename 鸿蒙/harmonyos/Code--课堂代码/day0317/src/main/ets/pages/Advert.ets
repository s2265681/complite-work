import { AdvertClass, MyUserStore } from '../module/Index'
import router from '@ohos.router'
@Entry
@Component
struct Advert {
  userstore:MyUserStore=new MyUserStore(getContext(this))
  @State adObject:AdvertClass={
    AdvertTime:0,
    ShowAdvert:false
  }
  timer:number=-1

  aboutToAppear(){
    this.getData()
  }

  async getData(){
    this.adObject=await this.userstore.getUserAd()
    //倒计时
    this.timer=setInterval(()=>{
      if(this.adObject.AdvertTime<=0){
        clearInterval(this.timer)
        this.timer=-1
        this.toNext()
        return
      }
      this.adObject.AdvertTime--
    },1000)
  }

  async toNext(){
    const token =await this.userstore.getToken()
    if(token){
      router.replaceUrl({
        url:"pages/Index"
      })
    }else{
      router.replaceUrl({
        url:"pages/Login"
      })
    }
  }

  aboutToDisappear(){
    clearInterval(this.timer)
    this.timer=-1
  }

  build() {
    Stack({alignContent:Alignment.TopEnd}){
     Image(this.adObject.AdvertImage)
       .height("100%")
       .width("100%")

      Row(){
        Text(`${this.adObject.AdvertTime}秒后跳过`)
          .backgroundColor("#ccc")
          .padding(5)
          .borderRadius(15)
          .margin({right:10})

        Text("跳过广告")
          .padding(5)
          .borderRadius(15)
          .backgroundColor("#ccc")
          .onClick(()=>{
            this.toNext()
          })
      }
      .padding(10)
    }
    .width('100%')
    .height('100%')
  }
}