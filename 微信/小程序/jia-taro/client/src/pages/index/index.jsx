import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

import Login from '../../components/login/index'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  render() {
    return (
      <View className='index'>
        <Login />
      </View>
    )
  }
}
