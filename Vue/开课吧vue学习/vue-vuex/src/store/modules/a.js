const state = {
    count:1
}

const mutations = {
    add(state){
        state.count++
    },
    minus(state){
        state.count--
    }
}

const actions = {
    add:({commit})=>{
        commit('add')
    },
    minus:({commit})=>{
        commit('minus')
    }
}

const getters = {
   countMoney:state=>`¥${state.count*1000}`
}

export default {
    namespaced:true,  // 一定要开启命名空间
    state,
    mutations,
    actions,
    getters
}