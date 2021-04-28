// components/image-button/index.js
Component({
  /**
   * 组件的属性列表
   */
  //包含插槽
  options:{
    multipleSlots:true
  },
  // 接受传递进来的openType类型 
  properties: {
     openType:String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onGetUserInfo(event){
      this.triggerEvent('getuserinfo', event.detail,{})
    }
  }
})
