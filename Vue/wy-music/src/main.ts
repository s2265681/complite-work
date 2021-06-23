import Vue from 'vue'
import App from './App.vue'
import router from './router'
import api from './api'
import store from './store'
import {addHistory,deleteHistory} from './util/index'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// import style (>= Swiper 6.x)
import 'swiper/swiper-bundle.css';


Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.config.productionTip = false
Vue.prototype.$api = api;
Vue.prototype.$store = store;

Vue.prototype.resetSetItem = function (key, type, item) {
  // 创建一个StorageEvent事件
  const newStorageEvent = document.createEvent('StorageEvent');
  const storage = {
    setItem: function (k,type, item) {
      if(type=='add'){
        addHistory(item)
      }else if(type=='delete'){
        deleteHistory(item)
      }
      // sessionStorage.setItem(k, val);
      // 初始化创建的事件
      // initStorageEvent
      newStorageEvent.initEvent('setItem', false, false);
      // 派发对象
      window.dispatchEvent(newStorageEvent)
    }
  }
  if (key === 'cm_search_history') {
    return storage.setItem(key,type, item);
  }
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
