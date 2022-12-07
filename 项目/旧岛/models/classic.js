import {
  HTTP
} from '../utils/http.js'

class ClassicModal extends HTTP {
  constructor() {
    super()
  }
  getLatest(sCallback) {
    this.request({
      url: 'classic/latest',
      success: (data) => {
        // 如果不用箭头函数，this将指代不正确
        sCallback(data)
        this._setLatesIndex(data.index)

        wx.setStorageSync(this._getKey(data.index), data)
      }
    })
  }

  // 我的喜欢
  getMyFavor(success) {
    let params = {
      url: 'classic/favor',
      success: success
    }
    this.request(params)
  }

  getClassicContent(index, type, sCallback) {
    // 缓存中寻找 or API 写入缓存中
    // key 确定key
    let key = type === 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)

    if (!classic) {
      this.request({
        url: 'classic/' + index + '/' + type,
        success: (data) => {
          wx.setStorageSync(this._getKey(data.index), data)
          // 如果不用箭头函数，this将指代不正确
          sCallback(data)
        }
      })
    } else {
      sCallback(classic)
    }
  }


  isFirst(index) {
    return index === 1 ? true : false

  }

  isLasted(index) {
    let latestIndex = this._getLatesIndex()
    return latestIndex === index ? true : false
  }

  // 保存index
  _setLatesIndex(index) { // 同步写入缓存
    wx.setStorageSync('latest', index)
  }

  // 读取index
  _getLatesIndex() {
    let index = wx.getStorageSync('latest')
    return index
  }

  // 数据加入缓存中 定义一个私有方法 key
  _getKey(index) {
    let key = 'classic-' + index
    return key
  }

// 通过id 找详情
  getById(cid, type, success) {
    let params = {
      url: 'classic/' + type + '/' + cid,
      success: success
    }
    this.request(params)
  }


}

export {
  ClassicModal
}