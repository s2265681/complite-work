// /* eslint-disable no-new */
import api from '../../api'
export default {
    state: {
        loading: false,
        musicList: [],
        recommendList:[],
       
    },
    mutations: { // 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation, 只能同步
        updataStateKeyVal(state, { key, val }) {
            state[key] = val;
        },
        getMusicListData(state) {
            api.getNewestList().then((res: any) => {
                if (res.code === 200) {
                    state.musicList = res.result;
                 
                }
                state.loading = false
            })
        },
        getPersonalized(state) {
            api.getPersonalized().then((res: any) => {
                if (res.code === 200) {
                    state.recommendList = res.result.slice(0,6)
                }
                state.loading = false 
            })
        },
        
    },
    actions: {
        updateTab({ commit }, { tabId, tabIndex }) {
            commit('tabUpdated', { tabId, tabIndex })
        },
        getMusicList({ commit }) {
            commit('updataStateKeyVal', { key: 'loading', val: true })
            commit('getMusicListData')
        },
        getPersonalized({ commit }) {
            commit('updataStateKeyVal', { key: 'loading', val: true })
            commit('getPersonalized')
        },
       
    }
}