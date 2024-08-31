import abilityAccessCtrl, { Permissions } from '@ohos.abilityAccessCtrl'
import bundleManager from '@ohos.bundle.bundleManager'
import common from '@ohos.app.ability.common'

class PermissionUtil {
  //1、取应用程序的accessTokenID
  private async getAccessToken(permission: Permissions): Promise<abilityAccessCtrl.GrantStatus> {
    let atManager = abilityAccessCtrl.createAtManager()
    let grantStatus: abilityAccessCtrl.GrantStatus
    let tokenID: number
    try {
      let bundleInfo = await bundleManager.getBundleInfoForSelf(bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_APPLICATION)
      tokenID = bundleInfo.appInfo.accessTokenId
    } catch (err) {
      console.log('获取token失败')
    }
    try {
      grantStatus = await atManager.checkAccessToken(tokenID, permission)
    } catch (err) {
      console.log('token检测失败')
    }
    return grantStatus
  }

  //检测当前设备是否拥有权限
  async checkPermission(permissions: Array<Permissions>): Promise<boolean> {
    for (let i = 0; i < permissions.length; i++) {
      if (await this.getAccessToken(permissions[i]) != abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
        return false
      }
    }
    return true
  }

  //申请权限
  async requestPermission(permissions: Array<Permissions>): Promise<boolean> {
    let atManager = abilityAccessCtrl.createAtManager()
    return atManager.requestPermissionsFromUser(getContext(this), permissions).then((permissionResult) => {
      let grantStatus: Array<number> = permissionResult.authResults
      let grantPermissions: Array<string> = permissionResult.permissions
      let length: number = grantStatus.length
      console.log('location user permissioned length' + JSON.stringify(grantPermissions) + length)
      for (let i = 0; i < length; i++) {
        if (grantStatus[i] != 0) {
          //申请权限失败
          return false
        }
      }
      //申请权限成功
      return true
    })

  }

  //跳转到权限设置页面 设置Permission
  openPermissionSettings(settingsParamBundleName:string) {
    let context = getContext(this) as common.UIAbilityContext
    let wantInfo = {
      action: 'action.settings.app.info',
      parameters: {
        settingsParamBundleName: settingsParamBundleName  //这里需要修改成自己的
      }
    }
    context.startAbility(wantInfo).then(() => {
      console.log('location open setting page')
    }).catch((err) => {
      console.log('location open setting page failed')
    })
  }
}

export default new PermissionUtil();