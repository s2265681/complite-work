/**
 * @author Sjw
 * @description 项目入口执行文件
 */

import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './assets/css/base.css'
import './assets/css/common.css'
import './config/rem'
import router from './router/index';
import ElementUI from 'element-ui'
import Moment from 'vue-moment'

import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Moment)

Vue.config.productionTip = false
Vue.use(VueAxios,axios)
Vue.use(ElementUI)

axios.interceptors.request.use(function(response){
  return response
  // loading 请求地址替换、修改
})
axios.interceptors.response.use(function(response){
  let res = response.data;
  if(res.code != 0){
    alert(res.message);
  }
  return response;
},function(error){
  return Promise.reject(error);
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
