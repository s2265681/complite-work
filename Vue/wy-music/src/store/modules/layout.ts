// import AS from '../../mock/data.json'
type payloadType = {
  global: Boolean,
  modules: any,
  loading: Boolean
}
export default {
  state: {
    global: Object,
    status: Object,
    modules: Array,
    loading: Boolean
  },
  mutations: { // 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation, 只能同步
    updataStateKeyVal(state, { key, val }) {
      state[key] = val;
    },
    layoutConfigLoaded(state, payload) {
      state.global = payload.global
      state.modules = payload.modules
      state.loading = false
    },
    // layoutConfigStartLoading(state, payload) {
    // state.loading = true
    // commit('updataStateKeyVal', { key: 'loading', val: true })
    // }
  },
  actions: {
    loadLayoutConfig({ commit }) {
      // commit('layoutConfigStartLoading')
      commit('updataStateKeyVal', { key: 'loading', val: true })
    }
  }
}

