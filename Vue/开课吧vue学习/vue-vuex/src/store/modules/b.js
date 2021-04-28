const state = {
    num:1
}

const mutations = {
    add(state){
        state.num++
    },
    minus(state){
        state.num--
    }
}

const getters = {
    numMoney:state=>`¥${state.num*1000}`
 }

const actions = {
    add:({commit})=>{
        commit('add')
    },
    minus:({commit})=>{
        commit('minus')
    }
}

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}