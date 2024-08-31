import UIAbility from '@ohos.app.ability.UIAbility';
import hilog from '@ohos.hilog';
import window from '@ohos.window';
import { AdvertClass, MyUserStore } from '../module/Index';

export default class EntryAbility extends UIAbility {
  onCreate(want, launchParam) {
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onCreate');
  }

  onDestroy() {
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onDestroy');
  }

  async onWindowStageCreate(windowStage: window.WindowStage) {
    // Main window is created, set main page for this ability
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageCreate');
   //AIP9 后缀为.ts的文件，无法导入.ets  解决方法：将.ts 改为 .ets
     const userStore:MyUserStore=new MyUserStore(this.context)

    //如果能通过接口拿到广告数据，就用拿到广告数据
    //用定时器模拟一个请求
    const result=await new Promise<AdvertClass>((resolve,reject)=>{
      setTimeout(()=>{
        resolve({
          AdvertImage:$r("app.media.guanggao"),
          AdvertTime:3,
          ShowAdvert:true
        } as AdvertClass)
      },500)
    })
    //存储到首选项中
    await userStore.setUserAd(result)

    //获取广告
    const ad = await userStore.getUserAd()
    if(ad.ShowAdvert){//有广告--广告页
      windowStage.loadContent('pages/Advert');
    }else {//没广告---首页
      // windowStage.loadContent('pages/Index');
      const token= await userStore.getToken()
      if(token){
        windowStage.loadContent('pages/Index');
      }else{
        windowStage.loadContent('pages/Login');
      }
    }

  }

  onWindowStageDestroy() {
    // Main window is destroyed, release UI related resources
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageDestroy');
  }

  onForeground() {
    // Ability has brought to foreground
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onForeground');
  }

  onBackground() {
    // Ability has back to background
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onBackground');
  }
}
