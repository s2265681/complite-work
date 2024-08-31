//广告数据存储到首选项里面
// 1. 广告页面 需要使用 首选项  getContext(this)
// 2. EntryAbility.ts也要 使用首选项  this.context
import preferences from '@ohos.data.preferences'

export class AdvertClass{
  AdvertImage?:ResourceStr
  AdvertTime:number
  ShowAdvert:boolean
}

//默认广告
const defaultAdvert:AdvertClass={
  AdvertImage:$r("app.media.guanggao"),
  AdvertTime:5,
  ShowAdvert:true
}

export const store_Name="User_Store_A"
export const Key_Name="User_Store_Advert"
export const Token_Name="User_Store_Token"

export class MyUserStore{
  context:Context
  constructor(context:Context) {
    this.context=context
  }
  getStore(){
    return preferences.getPreferences(this.context,store_Name)
  }
  //获取广告信息
  async getUserAd(){
     const store=await this.getStore()
     let data=await store.get(Key_Name,JSON.stringify(defaultAdvert)) as string
     return JSON.parse(data) as AdvertClass
  }
  //设置广告信息
  async setUserAd(advert:AdvertClass){
    const store=await this.getStore()
    await store.put(Key_Name,JSON.stringify(advert))
    await store.flush()
  }
  //存储token
  async setToken(tk:string){
    const store=await this.getStore()
    await store.put(Token_Name,tk)
    await store.flush()
  }
  //获取token
  async getToken(){
    const store=await this.getStore()
    let data=await store.get(Token_Name,"") as string
    return data
  }

}