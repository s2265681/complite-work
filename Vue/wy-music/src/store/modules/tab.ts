// /* eslint-disable no-new */
// export default {
//   state: {
//     tabId: 0,
//     tabIndex: 0
//   },
//   mutations: { // 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation, 只能同步
//     tabUpdated(state, payload) {
//       state.tabId = payload.tabId
//       state.tabIndex = payload.tabIndex
//     }
//   },
//   actions: {
//     updateTab({ commit }, { tabId, tabIndex }) {
//       commit('tabUpdated', { tabId, tabIndex })
//     }
//   }
// }