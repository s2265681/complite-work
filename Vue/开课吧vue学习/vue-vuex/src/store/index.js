import Vue from 'vue'
import Vuex from 'vuex'
import count from './modules/a'
import num from './modules/b'

Vue.use(Vuex)

export default new Vuex.Store({
  // modules 维护处理多套数据
  modules: {
    count,
    num
  },
  // getters:{
  //   countMoney:state=>`¥${state.count.count*1000}`,
  //   // numMoney:state=>`¥${state.num.num*1000}`,
  // },

  // state: {
  //   count:1
  // },
  // mutations: {
  //   increment(state){
  //      state.count ++ 
  //   },    
  //   decrement(state){
  //     state.count --
  //  }
  // },
  // actions: {
  //   increment:({commit})=>{
  //     commit('increment')
  //   },
  //   decrement:(obj)=>{
  //     window.console.log(obj,'obg++')
  //     obj.commit('decrement')
  //   }
  // },
  // getters:{
  //   money:state=>`¥${state.count*1000}`
  // },

})
