import 'taro-ui/dist/style/index.scss'
import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'
import './app.scss'

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/authorization/index',
      'pages/account/index',
      'pages/search/index'
    ],
    cloud: true,
    requiredBackgroundModes: ["audio"],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: "#8D93A8",
      selectedColor: "#FF2A31",
      backgroundColor: "#FBFBFB",
      borderStyle: "white",
      list: [{
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "./assets/images/home.png",
        selectedIconPath: "./assets/images/homeSelected.png"
      },
      {
        pagePath: "pages/account/index",
        text: "我的",
        iconPath: "./assets/images/mine.png",
        selectedIconPath: "./assets/images/mineSelected.png"
      }]
    }
  }

  componentDidMount() {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init()
    }
  }

  // color #a0a2a5
  // back #41464b

  render() {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
