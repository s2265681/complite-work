import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
/* eslint-disable no-new */
export default new Vuex.Store({
  state: {
    status: 100, // 设备状态 0 - 未激活， 1 - 在线， 3 - 离线， 8 - 禁用,
    check: false
  },
  mutations: { // 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation, 只能同步
    /**
     * 更新状态树中的属性集合
     * @param {*} attr 要更新的属性集合
     */
    updateState(state, data) {
      data.find((key) => {
        state[key[0]] = key[1]
      });
    }
  },
})