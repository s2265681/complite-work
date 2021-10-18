// miniprogram/pages/me/me.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo:wx.getStorageSync('userInfo')||{}
  },
  onGetUserInfo(e){
    let userInfo = e.detail.userInfo
    // 需要调用云函数，获取用户的openid
    wx.cloud.callFunction({
      name:'login',
      complete:res=>{
        userInfo.openid = res.result.openid
        this.setData({
          userInfo
        })
        wx.setStorage({
          key:"userInfo",
          data:userInfo
        })
      }
    })
  },
  // 扫码
  scanCode(){
    wx.scanCode({
      success :res=> {
        // 图书的isbn号，去豆瓣获取详情
        this.addBook(res.result)
      }
    })
  },
  addBook(isbn){
    wx.showLoading({
      title: '加载中',
    })

    // 调用云函数
    // 云函数写一个爬虫
    wx.cloud.callFunction({
      name:'doubanbook',
      data:{isbn},
      success:({result})=>{
        console.log(result,'result++')
        const db = wx.cloud.database()
        wx.hideLoading()
        // 插入到doubanbooks的数据库中
        db.collection('doubanbooks').add({
          // data 字段表示需新增的 JSON 数据
          data: result
        })
        .then(res => {
          console.log(res)
          wx.hideLoading()
          if(res._id){
            wx.showModal({
              title:'添加成功',
              content:`《${result.title}》添加成功`
            })
          }
        })
        // .catch(err)(
        //   console.log(err,'rr')
        // )
      }
    })
  },
  contactInfo(e){
    console.log(e,'客服消息的回调！')
  }
})