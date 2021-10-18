//index.js
const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    books:[]
  },
  onPullDownRefresh(){
     // 下拉刷新
     this.getList(true)
     console.log('下拉刷新')
  },
  onReachBottom () {
    console.log('触底了,加载下一页')
    // wx.stopPullDownRefresh()
    this.setData({
      page:this.data.page+1
    },()=>{
      this.getList()
    })
  },
  getList(init){
    wx.showLoading()
    // 初始化的时候不考虑分页 直接渲染
    if(init){
      this.setData({
        page:0
      })
    }
    // 每页3个
    // 第一页 0-3
    // 第二页 3-6
    const PAGE = 3
    const offset = this.data.page + PAGE
    let ret = db.collection('doubanbooks')
    .orderBy('create_time','desc')   // asc
    if(this.data.page>0){
        // 不是第一页
        ret = ret.skip(offset)
    }
    ret = ret.limit(PAGE).get().then(res=>{
      console.log(res,'res1')
      if(init){
      this.setData({
        books:res.data
        }) 
      }else{
        // 加载下一页
        this.setData({
          books:[...this.data.books,...res.data]
        },()=>{
          console.log(res,'res2')
        })
        if(res.data.length===0){
          wx.showToast({
            title: '没有更多了！',
          })
        }
      }
      wx.hideLoading()
    })
  },
  onLoad(){
    this.getList(true)
  }
})
