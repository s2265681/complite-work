import UIAbility from '@ohos.app.ability.UIAbility';
import hilog from '@ohos.hilog';
import window from '@ohos.window';

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


    //设置横竖屏====横屏2
    // windowStage.getMainWindowSync().setPreferredOrientation(window.Orientation.LANDSCAPE)


    //全局对象
    // globalThis.myUser={
    //   name:"lili",
    //   age:18
    // }

    // 沉浸式状态栏
    // windowStage.getMainWindowSync().setWindowLayoutFullScreen(true, (err) => {
    //   if (err.code) {
    //     console.error('Failed to enable the full-screen mode. Cause: ' + JSON.stringify(err));
    //     return;
    //   }
    //   //设置状态栏透明背景
    //   windowStage.getMainWindowSync().setWindowSystemBarEnable(['status']).then(() => {
    //     const systemBarProperties: window.SystemBarProperties = {
    //       statusBarColor: '#00000000'
    //     };
    //     //设置窗口内导航栏、状态栏的属性
    //     windowStage.getMainWindowSync().setWindowSystemBarProperties(systemBarProperties)
    //       .then(() => {
    //         console.info('Succeeded in setting the system bar properties.');
    //       }).catch((err) => {
    //       console.error('Failed to set the system bar properties. Cause: ' + JSON.stringify(err));
    //     });
    //   })
    //   console.info('Succeeded in enabling the full-screen mode.');
    // })

    windowStage.loadContent('pages/Index');
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
