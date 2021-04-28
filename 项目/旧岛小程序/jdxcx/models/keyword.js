import {
  HTTP
} from '../utils/http_p.js'

class KeywordModel extends HTTP{
  key = "q"
  maxLength = 10
  getHistory() {
    const words = wx.getStorageSync(this.key)
    if(!words){
      return []
    }else{
      return words
    }
  }

  getHot() {
    return this.request({
      url: '/book/hot_keyword'
    })
  }

  addToHistory(keyword) {
 
    let words = this.getHistory()
    console.log(words,'???')
    const has = words.includes(keyword)
    console.log(has, 'has///???')
    if(!has){
      // 判断数组如果大于等于10，先删除数组末尾元素，再添加到第一位
      const length = words.length
      if (length>=this.maxLength){
        words.pop()
      }
      words.unshift(keyword)
      console.log(this.key,'this.key')
      console.log(words, 'words')
      wx.setStorageSync(this.key, words)
    }
   
  }
}

export { KeywordModel}