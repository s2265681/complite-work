import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.less'

import enter from "../../assets/images/enter.png"

export default class Account extends Component {

  config = {
    navigationBarTitleText: '我的'
  }

  constructor(props) {
    super(props)
    this.state = {
      avatar: '',
      nickName: '',
    }
  }

  componentDidShow() {
    this.setState({
      avatar: Taro.getStorageSync('avatar'),
      nickName: Taro.getStorageSync('nickName'),
    })
  }


  render() {
    return (
      <View className='page'>
        <View className='page-title'>
          <Image src={this.state.avatar}></Image>
          <View>{this.state.nickName}</View>
        </View>
        <View className='page-user'>
          <View className='page-user-item'>
            <Text className='text'>微信绑定</Text>
            <Image className='right' src={enter} />
            <Text className='related'>已关联</Text>
          </View>
          <View className='page-user-item'>
            <Text className='text'>退出登录</Text>
            <Image className='right' src={enter} />
          </View>
        </View>
      </View>
    )
  }
}

