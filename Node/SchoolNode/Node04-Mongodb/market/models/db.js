const conf = require('./conf')
const EventEmitter = require('events').EventEmitter

const MongoClient = require('mongodb').MongoClient
class Mongodb {
    constructor(conf){
       this.conf= conf
       this.emiter = new EventEmitter()
       // 连接
       this.client = new MongoClient(conf.url,{
           // 防止兼容性
        //    useNewUrlParser:true,
           useUnifiedTopology:true
       })
       this.client.connect(err=>{
           if(err) throw err
           console.log('连接成功')
           this.emiter.emit('connect')
       })
    }

    col(colName,dbName = conf.dbName){
        return this.client.db(dbName).collection(colName)
    }

    once(event,cb){
        // 注册事件回调
        this.emiter.once(event,cb)
    }
}

module.exports = new Mongodb(conf)
