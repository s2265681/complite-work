// const env = process.env.NODE_ENV   // 环境参数
const env = process.env.NODE_ENV || 'production';
var os = require("os");
// console.log(env,'envvvvv')
// console.log(this,'window')
// console.log(os.hostname(),'os.hostname()')
// console.log(process.env.INIT_CWD,'INIT_CWD')
// 配置
let MYSQL_CONF 
let REDIS_CONF
if(env==='development'){
    // MYSQL_CONF = {
    //     host:'localhost',
    //     user:'root',
    //     password:'shang5036',
    //     port:'3306',
    //     database:'myblog'
    // }
    //  MYSQL_CONF = {
    //     host:'39.96.71.193',
    //     user:'root',  
    //     password:'shang5036',
    //     port:'3306',
    //     database:'myblog'
    // }
    MYSQL_CONF = {
        host:'rm-bp1s7r0rn18f4nin4go.mysql.rds.aliyuncs.com',
        user:'root',  
        password:'s2265681@',
        port:'3306',
        database:'myblog'
    }
    REDIS_CONF = {
        port:6379,
        host:'127.0.0.1'
    }
}

if(env === 'production'){
    // MYSQL_CONF = {
    //     host:'localhost',
    //     user:'root',  
    //     password:'shang5036',
    //     port:'3306',
    //     database:'myblog'
    // }
    // MYSQL_CONF = {
    //     host:'rm-bp1s7r0rn18f4nin4go.mysql.rds.aliyuncs.com',
    //     user:'root',  
    //     password:'s2265681@',
    //     port:'3306',
    //     database:'myblog'
    // }
    MYSQL_CONF = {
        host:'rm-bp1s7r0rn18f4nin4go.mysql.rds.aliyuncs.com',
        user:'root',  
        password:'s2265681@',
        port:'3306',
        database:'myblog'
    }
    
    REDIS_CONF = {
        port:6379,
        host:'127.0.0.1'
    }
}

module.exports={
    MYSQL_CONF,
    REDIS_CONF
}