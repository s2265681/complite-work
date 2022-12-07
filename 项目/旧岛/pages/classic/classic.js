import {
  LikeModel
} from '../../models/like.js'

import {
  ClassicModal
} from '../../models/classic.js'

let likeModel = new LikeModel()
let classicModal = new ClassicModal()
// pages/classic/classic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData: null,
    latest: true,
    first: false,
    likeStatus: false,
    likeCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    classicModal.getLatest(
      function(data) {
        // this._getLikeInfo(data.id, data.type)
        this.setData({
          classicData: data,
          likeStatus: data.like_status,
          likeCount:data.fav_nums
        })
      }.bind(this)
    )
  },
  onLike: function(event) {
    let like_or_cancel = event.detail.behaiver
    likeModel.like(like_or_cancel, this.data.classicData.id,           this.data.classicData.type)

  },
  onNext: function() {},
  onPrevious: function(event) {
    this._onClassicUpdate('previous')
  },
  onNext: function() {
    this._onClassicUpdate('next')
  },
  _onClassicUpdate: function(type) {
    let index = this.data.classicData.index;
    classicModal.getClassicContent(index, type, (res) => {
      this._getLikeInfo(res.id, res.type)
      this.setData({
        classicData: res,
        latest: classicModal.isLasted(res.index),
        first: classicModal.isFirst(res.index)
      })
    })
  },
  _getLikeInfo: function(artID, category) {
    likeModel.getClassicLikeStatus(artID, category, (res) => {
      this.setData({
        likeStatus: res.like_status,
        likeCount: res.fav_nums
      })
    })
  }

})