import axios from 'axios';
import qs from 'qs';


axios.defaults.baseURL = "http://www.huashengshu.top:3000/";
axios.defaults.withCredentials = true; // 允许跨域携带资源凭证
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.transformRequest=data=>qs.stringify(data)  // post => xxx=xxx
axios.defaults.timeout = 0; // 超时时间
// 请求拦截器 客户端向服务端发送之前
axios.interceptors.request.use(config=>{
  // config  包含所有请求的配置信息
  // config.headers['X-token'] = 'xxx'
  // 把token信息发给服务器
  return config
})
// 响应拦截器,从服务器获取的结果进行统一处理
axios.interceptors.response.use(response=>{
  // 处理成功,默认认为状态码以2开头
  return response.data
},reason=>{
  // 失败 1、获取了结果但是状态码不是2开头 2、压根没有从服务器获取数据
  if(reason.response){
     // 获取到数据了,根据不同状态码做不同提示
  }else{
     // 没有获取数据
     if(!window.navigator.onLine){
        // 断网
     }
  }
  return Promise.reject(reason)
})

// axios.defaults.validate...
export default axios;