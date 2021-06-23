// /* eslint-disable no-new */
import api from '../../api'
export default {
    state: {
        loading: false,
        hotList: [],
        searchList:[]
    },
    mutations: { // 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation, 只能同步
        updataStateKeyVal(state, { key, val }) {
            state[key] = val;
        },
        getHotListData(state) {
            api.getHotList().then((res: any) => {
                if (res.code === 200) {
                    state.hotList = res.result.hots;
                }
                state.loading = false
            })
        },
        getSearchListData(state,{val}) {
            api.searchKeywords(val).then((res: any) => {
                if (res.code === 200) {
                    state.searchList = res.result
                }
                state.loading = false
            })
        },
    },
    actions: {
        updateTab({ commit }, { tabId, tabIndex }) {
            commit('tabUpdated', { tabId, tabIndex })
        },
        getHotList({ commit }) {
            commit('updataStateKeyVal', { key: 'loading', val: true })
            commit('getHotListData')
        },
        getSearchList({ commit },{val}) {
            commit('updataStateKeyVal', { key: 'searchList', val: [] })
            commit('updataStateKeyVal', { key: 'loading', val: true })
            commit('getSearchListData',{val})
        },
    }
}