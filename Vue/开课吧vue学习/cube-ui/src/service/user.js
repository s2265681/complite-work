import axios from 'axios';
export default {
    login(user){
        return axios.get('/api/login',{params:user})
    },
    register(user){
        return axios.get('/api/register',{params:user})
    },
    getUserInfo(id){
        return axios.get('/api/userinfo',{params:id})
    },
    updateInfo(value){
        return axios.get('/api/updateInfo',{params:{value}})
    }
}