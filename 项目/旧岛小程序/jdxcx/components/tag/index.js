// components/tag/index.js
Component({
  /**
   * 组件的属性列表
   */
  // 启用slot  --插入 wxml
  options:{
    multipleSlots:true
  },
  // 插入---wxss
  externalClasses: ["tag-class"],   
  properties: {
    text:String,
    num:Number
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
    onTap(event) {
      // 自定义事件名称
        this.triggerEvent('tapping',{
          text:this.properties.text
        })
    }
  }
})
