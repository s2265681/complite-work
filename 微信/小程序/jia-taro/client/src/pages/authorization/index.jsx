import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import './index.scss'

export default class Authorization extends Component {

  config = {
    navigationBarTitleText: '授权'
  }

  constructor() {
    super(...arguments)
    this.state = {
      text: "获取微信授权"
    }
  }

  confirmModal(e) {
    if (e.detail.userInfo) {
      Taro.setStorageSync('avatar', e.detail.userInfo.avatarUrl)
      Taro.setStorageSync('nickName', e.detail.userInfo.nickName)
    }
  }

  render() {
    return (
      <View className='page'>
        <View className='page-text'>爱你的每个瞬间</View>
        <View className='page-text'>像飞驰而过的地铁</View>
        <Button
          className='page-button'
          open-type='getUserInfo'
          onGetUserInfo={this.confirmModal.bind(this)}
        >{this.state.text}</Button>
      </View>
    )
  }
}