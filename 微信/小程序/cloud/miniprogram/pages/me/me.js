// miniprogram/pages/me/me.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: wx.getStorageSync('userinfo') || {}
  },
  addBook(isbn) {
    wx.cloud.callFunction({
      name: 'douban',
      data: { isbn },
      success: ({result}) => {
        console.log(result)

        result.isbn = isbn
        result.userInfo = this.userInfo
        db.collection('books').add({
          data: result,
          success(add) {
            if (add._id) {
              wx.showModal({
                title: '添加成功',
                content: `《${result.title}》添加成功`,
              })
            }
          }
        })

      }
    })


  }, 

  scanCode(){
    wx.scanCode({
      success: (res) => {
        if (res.result) {
          console.log(res.result)
          this.addBook(res.result)
          // this.addBook(res.result)
        }
      }
    })
  },
  onGetUserinfo(e) {
    console.log(e)
    let userInfo = e.detail.userInfo

    wx.cloud.callFunction({
      // 需调用的云函数名
      name: 'login',
      // 传给云函数的参数
      // data: {
      //   a: 12,
      //   b: 19,
      // },
      // 成功回调
      complete: (res) => {
        userInfo.openid = res.result.openid
        this.setData({
          userInfo
        })
        wx.setStorageSync('userinfo', userInfo)
      }
    })

  }
})