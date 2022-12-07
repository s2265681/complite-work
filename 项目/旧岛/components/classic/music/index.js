import { classicBehavior } from '../classic-beh.js'

const mMgr = wx.getBackgroundAudioManager()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBehavior],
  properties: {
    src: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing:false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png',
  },

  attached: function () {
    this._recoverStatus()
    this._monitorSwitch()
  },
  // 组件的销毁生命周期
  detached: function () {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay:function(){
      if(!this.data.playing){
        this.setData({
          playing: true
        })
        mMgr.src = this.properties.src
        mMgr.title = this.properties.src
      }else{
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    },
    _recoverStatus:function(){
      if(mMgr.paused){
        console.log(mMgr.paused,'mMgr.paused')
        this.setData({
          playing:false
        })
        return 
      }
      if (mMgr.src === this.properties.src ){
        console.log(mMgr.src, 'mMgr.src')
        this.setData({
          playing:true
        })
      }
    },
    _monitorSwitch:function(){
      mMgr.onPlay(()=>{
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
})
