// 用于拦截请求和响应
const axios = require('axios');

export default function(vm){
    // window.console.log(vm,'vm')
    //设置请求拦截器
    axios.interceptors.request.use(config=>{
        window.console.log(config,'config')
        //获取token
        const token = localStorage.getItem('token');
        if(token){  // 如果存在令牌这添加token请求头
            // config.headers.token = token;
            config.headers.Authorization = 'Bearer ' + token;

        }
        return config;
    },(err)=>{
       return Promise.reject(err)
    })

    // 设置响应拦截器
    // 参数1表示成功响应
    // 这里只关心失败的响应
    axios.interceptors.response.use(null,err=>{
         // 没有登录或者令牌过期
        if(err.response.status===401) { 
            // 清理vuex和localStorage
            vm.$store.dispatch("logout");
            // 跳转到login页面
            vm.$router.push("login");
        }
        return Promise.reject(err);
    })
}