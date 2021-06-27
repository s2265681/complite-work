import { get } from './request'

function getUserList(){
    return get('/api/users')
}

export default {
    getUserList
}