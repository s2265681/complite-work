// /* eslint-disable no-new */
import api from '../../api'
export default {
    state: {
        albumSong: [],
        commentList:[]
    },
    mutations: { // 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation, 只能同步
        updataStateKeyVal(state, { key, val }) {
            state[key] = val;
        },
    },
    actions: {
        getPlayList({ commit }, params) {
            api.getSongAlbum(params).then((res: any) => {
                commit('updataStateKeyVal', { key: 'loading', val: true })
                if (res.code === 200) {
                    commit('updataStateKeyVal', { key: 'albumSong', val: res })
                }
                commit('updataStateKeyVal', { key: 'loading', val: false })
            })
        },
        getSongComment({ commit }, params) {
            api.getSongComment(params).then((res: any) => {
                commit('updataStateKeyVal', { key: 'loading', val: true })
                if (res.code === 200) {
                    commit('updataStateKeyVal', { key: 'commentList', val: res })
                }
                commit('updataStateKeyVal', { key: 'loading', val: false })
            })
        },
        
    }
}