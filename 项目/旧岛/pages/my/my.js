// pages/my/my.js
import {
  BookModel
} from '../../models/book.js'

import {
  ClassicModal
} from '../../models/classic.js'

const bookModel = new BookModel()
const classicModal = new ClassicModal()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: {},
    bookCount:0,
    classic:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getAuthorized()
    this.getMyBookCount()
    this.getMyFavor()
  },
  // 判断是否授权 ，已授权调用获取信息的方法
  getAuthorized() {
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              console.log(data, 'data')
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        } else {
          console.log('err')
        }
      }
    })
  },
  // 点击接受组件tirggerEvent回来的事件
  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo;
    console.log(userInfo, 'userInfo')
    if (!userInfo) return
    this.setData({
      authorized: true,
      userInfo
    })
  },
  onJumpToAbout(event){
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  getMyBookCount(){
    bookModel.getMyBookCount()
    .then(res=>{
      this.setData({
        bookCount: res.count
      })
    })
  },

  getMyFavor(){
    classicModal.getMyFavor(res=>{
      this.setData({
        classic:res
      })
    })
  },
  onPreviewTap(event){
    wx.navigateTo({
      url: '/pages/classic-detail/index?cid=' + event.detail.cid + '&type=' + event.detail.type
    })
  },
  onStudy(){
    wx.navigateTo({
      url: '/pages/course/course'
    })
  }
  // getUserInfo(event) {
  //   wx.getUserInfo({
  //     success: data => {
  //       console.log(data, 'data++')
  //     }
  //   })
  // },
})