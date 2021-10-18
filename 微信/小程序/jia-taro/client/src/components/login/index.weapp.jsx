import Taro, { Component } from "@tarojs/taro"
import { View } from "@tarojs/components"
import { AtButton } from 'taro-ui'

export default class Login extends Component {
  state = {}

  getLogin = () => {
    Taro.cloud
      .callFunction({
        name: "login",
        data: {}
      })
      .then(res => {
        console.log(res)
      })
  }

  render() {
    return (
      <View className='index'>
        <AtButton type='primary' size='normal' onClick={this.getLogin}>获取登录云函数</AtButton>
      </View>
    )
  }
}
