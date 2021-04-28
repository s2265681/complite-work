// pages/book/book.js
import {
  BookModel
} from '../../models/book.js'

const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:[],
    searchPanel:false,
    more:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // promise 的正确用法return解决了回调地狱
    bookModel.getHotList()
      .then((res) => {
        this.setData({
          books:res
        })
        return bookModel.getMyBookCount()
      })
      .then((res) => {
      })
  },
  onActivateSearch(){
    this.setData({
      searchPanel:true
    })
  },
  onCancel(event){
    // console.log('122')
    this.setData({
      searchPanel: false
    })
  },
  onReachBottom(){
    this.setData({
      more: !this.data.more
    })
  }

})