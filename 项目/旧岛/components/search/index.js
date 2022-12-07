// components/search/index.js
import {
  KeywordModel
} from '../../models/keyword.js'
import {
  BookModel
} from '../../models/book.js'
import {
  paginationBev
} from '../behaviors/behavior.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more: {
      type: Boolean,
      observer: 'loadMore'
      // more 一改边就会调用_load_more
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyKeys: [],
    hotWords: [],
    // dataArray:[],
    finished: false,
    q: '',
    loading: false,
    loadingCenter:false
  },

  attached() {
    this.setData({
      historyKeys: keywordModel.getHistory()
    })
    keywordModel.getHot().then(res => {
      this.setData({
        hotWords: res.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadMore() {
      if (!this.data.q) {
        return
      }
      if(this.isLocked()){
        return
      }
      // 同时加载两次 锁起来
      if (this.hasMore()) {
        this.locked()
        bookModel.search(this.getCurrentStart(), this.data.q)
          .then(res => {
            this.setMoreData(res.books)
            // 不更新wxml时不需要setData
            this.unlocked()
            this.setData({
              loading:false
            })
          },()=>{
            this.unlocked()
          })
      }else{
        wx.showToast({
          title: '没有更多了',
          icon:'none'
        })
      }

    },
    onCancel(event) {
      this.triggerEvent('cancel', {}, {})
    },
    onConfirm(event) {
      // wx.showLoading()
      this._showResult()
      this.initialize()
      this._showLoadingCenter()
      const q = event.detail.value || event.detail.text
      this.setData({
        q
      })
      bookModel.search(0, q)
        .then(res => {
          this._hideLoadingCenter()
          this.setMoreData(res.books)
          this.setTotal(res.total)
          keywordModel.addToHistory(q)
        })
    },
   
    onDelete() {
      this._closeResult()
    },
     _showResult() {
      this.setData({
        finished: true
      })
    },
    _showLoadingCenter(){
    this.setData({
      loadingCenter:true
    })
    },
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },
    _closeResult(){
      this.setData({
        finished: false,
        noneResult:false,
        q:'',
        loading:false,
        loadingCenter:false
      })
    }
  
  }
})