import Vue from 'vue'
import Vuex from 'vuex'
import recommend from './modules/recommend' // 加载布局信息
import playlist from './modules/playlist'
import search from './modules/search' // 加载布局信息
import playSong from './modules/playSong' // 加载布局信息


Vue.use(Vuex)

/* eslint-disable no-new */
export default new Vuex.Store({
  modules: {
    recommend,
    playlist,
    search,
    playSong
  }
})