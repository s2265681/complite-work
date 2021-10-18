import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input } from '@tarojs/components'
import { AtDivider } from 'taro-ui'
import RecordItem from "../../components/record-item/index"
import { baseUrl, showMessage, unique, logout } from '../../assets/js/common'
import './index.scss'

export default class Search extends Component {

  config = {
    navigationBarTitleText: '搜索'
  }

  constructor(props) {
    super(props)
    this.state = {
      keyword: '',
      searchWord: '搜索',
    }
  }

  showRecordList() {
    Taro.showLoading({
      title: '数据加载中'
    })
  }

  onReachBottom() {
    this.showRecordList()
  }

  searchChange = (e) => {
    this.setState({
      keyword: e.detail.value,
      searchWord: '搜索'
    })
  }

  confirmChange(e) {
    if (e.detail.value) {
    }
  }

  clearKeyword() {
    this.setState({
      keyword: '',
      searchWord: '搜索',
    })

  }

  search() {
    if (this.state.searchWord == "搜索" && this.state.keyword) {
    } else if (this.state.searchWord == "搜索" && !this.state.keyword) {
      showMessage("请输入搜索内容")
    } else {
    }
  }

  render() {
    const { keyword, searchWord } = this.state
    return (
      <View className='page'>
        <View className='page-search'>
          <View className='page-search-left'>
            <Input
              className='page-search-left-input'
              type='text'
              confirmType='search'
              focus='true'
              placeholder='输入搜索关键词'
              value={keyword}
              onInput={this.searchChange.bind(this)}
              onConfirm={this.confirmChange.bind(this)}
            />
            <View
              hidden={!keyword}
              className='page-search-left-icon'
              onClick={this.clearKeyword.bind(this)}
            >
            </View>
          </View>
          <View className='page-search-right' onClick={this.search.bind(this)}>
            <Text>{searchWord}</Text>
          </View>
        </View>
        <View className='page-content'>
        </View>
        <View className='page-divide'>
          <AtDivider content='暂无更多内容' fontColor='#d2d2d2' lineColor='#f2f2f2' />
        </View>
        <View className='page-empty'>
          <AtDivider content='暂无数据' fontColor='#d2d2d2' lineColor='#f2f2f2' />
        </View>
      </View>
    )
  }
}

