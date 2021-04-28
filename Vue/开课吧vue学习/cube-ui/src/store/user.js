import us from "../service/user"

export default {
  state: {
    isLogin:localStorage.getItem('token') ? true : false,
    userInfo:{}
  },
  mutations: {
    setLoginState(state,boolean){
      state.isLogin = boolean
    },
    saveUserInfo(state,info){
      // window.console.log(info,'info111')
       state.userInfo=info.data
    }
  },
  actions: {
     // 登录
     login({commit},params){   // {commit} , 参数
       // 登录请求  请求相关的拆到servce 里面
        return us.login(params).then(res=>{
         window.console.log(res,'res')
         const { code , token} = res.data;
         if(code){
           // 登录成功
           commit('setLoginState',true)
           localStorage.setItem("token",token);
           localStorage.setItem('userInfo',JSON.stringify(res.data));
         }
         return code
       })
     },
     //查询用户信息
     getUserInfo({commit},params){
      return us.getUserInfo(params).then(res=>{
        // window.console.log(commit,'commit')
        window.console.log(res,'res1111')
        commit('saveUserInfo',res.data)
        // return res.data
       })
     },
     //修改用户信息
     updateUserInfo({commit},value){
        window.console.log(commit,'commit')
        return us.updateInfo(value).then(res=>{
          const { code } = res.data;
          window.console.log(code,'code12')
          return code
         })
     },
     // 注册
     register({commit},params){
       return us.register(params).then(res=>{
        window.console.log(commit,'commit')
        // window.console.log(res.data.code,'res')
        const { code } = res.data;
        return code
        // window.console.log(res,'res')
       })
     },
     // 注销
     logout({commit}){
        // 清缓存  
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        // 重置状态
        commit('setLoginState',false)
     }
  }
}
