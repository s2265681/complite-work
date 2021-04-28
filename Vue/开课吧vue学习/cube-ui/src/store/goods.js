import gs from "../service/goods"

export default {
//   namespace
  state: {
      slider:[],
      keys:[],
      goodsInfo:{}
  },
  
  mutations: { // { state , 参数 }
    // 方法被调用时传入的参
    setGoodsInfo(state,{slider,keys,goodsInfo}){  
        state.slider=slider;
        state.keys=keys;
        state.goodsInfo=goodsInfo;
    }
  },
  getters:{ // 对数据进行改造
     goods:state => {// 添加一个goods属性,转换对象形式为数组形式便于循环渲染
        return state.keys.map(key=>state.goodsInfo[key]) // ... [[{id:1,use:'w'},{}],[...]] 通过reduce拍平聚合 
        .reduce((pre,next)=>pre.concat(next),[]);        // ... [{},{}]
     }
  },
  actions: {
      // 去调接口 
     getGoods({state,commit}){
         if(!state.slider.length){
             // 没有数据才去获取
            gs.getGoodsInfo()
            .then(goodsInfo=>{
                    commit('setGoodsInfo',goodsInfo)
            })
         }
     }
  },
  modules:{

  }
}
