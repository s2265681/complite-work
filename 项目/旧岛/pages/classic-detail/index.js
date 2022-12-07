// pages/classic-detail/index.js
import {
  LikeModel
} from '../../models/like.js'

import {
  ClassicModal
} from '../../models/classic.js'

let likeModel = new LikeModel()
let classicModal = new ClassicModal()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData: null,
    likeStatus: false,
    likeCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let cid = options.cid
    let type = options.type
    classicModal.getById(cid, type, (data) => {
      this._getLikeStatus(data.id, data.type)
      this.setData({
        classicData: data
      })
    })
  },
  _getLikeStatus: function(cid, type) {
    likeModel.getClassicLikeStatus(cid, type, (data) => {
      this.setData({
        likeStatus: data.like_status,
        likeCount: data.fav_nums
      })
    })
  },

  onLike: function(event) {
    let like_or_cancel = event.detail.behaiver
    console.log(like_or_cancel,'like_or_cancel')
    likeModel.like(like_or_cancel, this.data.classicData.id, this.data.classicData.type)
  },
})