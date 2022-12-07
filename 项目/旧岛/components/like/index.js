// components/like/index.js
Component({
  /**
   * 组件的属性列表
   * wxml => read-only  js 驼峰
   */
  properties: {
    like: Boolean,
    count: Number,
    readOnly: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    yes_url: 'images/like.png',
    no_url: 'images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike() {
      if(this.properties.readOnly){
        return
      }
      let count = this.properties.count
      count = this.properties.like ? count - 1 : count + 1;
      this.setData({
        count,
        like: !this.properties.like
      })
      let behaiver = this.properties.like ? 'like' : 'cancle'
      console.log(behaiver,'behaiver')
      this.triggerEvent('like', {
        behaiver: behaiver
      }, {})
    }
  }
})