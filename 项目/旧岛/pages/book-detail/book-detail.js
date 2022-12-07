// pages/book-detail/book-detail.js
import {
  BookModel
} from '../../models/book.js'

import {
  LikeModel
} from '../../models/like.js'
const bookModel = new BookModel()
const likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */

  data: {
    comments: [],
    book: null,
    likeStatus: false,
    likeCount: 0,
    posting:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading()
    const bid = options.bid;
    console.log(bid)
    const detail = bookModel.getDetail(bid)
    const comments = bookModel.getComents(bid)
    const likeStatus = bookModel.getLikeStatus(bid)
    Promise.all([detail, comments, likeStatus])
    .then(res=>{
      console.log(res,'sss')
      this.setData({
        book: res[0],
        comments: res[1].comments,
        likeCount: res[2].fav_nums,
        likeStatus: res[2].like_status
      })
      wx.hideLoading()
    })
    // detail.then((res) => {
    //   this.setData({
    //     book: res
    //   })
    // })
    // comments.then((res) => {
    //   console.log(res,'res')
    //   this.setData({
    //     comments: res.comments
    //   })
    // })
    // likeStatus.then((res) => {
    //   console.log(res,'eeee')
    //   this.setData({
    //     likeCount: res.fav_nums,
    //     likeStatus: res.like_status
    //   })
    // })
  },

  onLike: function (event) {
    let like_or_cancel = event.detail.behaiver
    likeModel.like(like_or_cancel, this.data.book.id,400)
  },

  onFaskPost: function(){
    this.setData({
      posting:true
    })
  },
  onCancel(){
    this.setData({
      posting: false
    })
  },
  onPost(event){
    const comment = event.detail.text || event.detail.value
     console.log(event,'event')
    if (!comment){
      return
    }
     // 字数少于等于12
     if(comment.length>12){
       wx.showToast({
         title: '短评最多12个字',
         icon:'none'
       })
       return
     }

    bookModel.postComment(this.data.book.id,comment)

    .then(res=>{
      wx.showToast({
        title: '+1',
        icon: 'none'
      })
     this.setData({
       posting: false
     })
    })


    this.data.comments.unshift({
      content:comment,
      nums:1
    })

    this.setData({
      comments: this.data.comments,
  
    })
  }
 
})