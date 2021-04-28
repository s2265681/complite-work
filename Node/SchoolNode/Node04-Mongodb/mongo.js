(async () =>{
    const {MongoClient:MongoDB} = require('mongodb')
    // 创建客户端
    const client = new MongoDB(
        // 'mongodb://admin:123456@localhost:27018',
        'mongodb://localhost:27019',
        {
            // userNewUrlParer:true,
            useUnifiedTopology: true
        }
    )
    let ret 
    // 创建连接
    ret = await client.connect()
    // console.log(ret,'ret')
    const db = client.db('test')  // 库
    const fruits = db.collection('fruits')  // 表
    
    // 添加文档 插入数据
    // ret = await fruits.insertOne({
    //     name:'芒果',
    //     price:20.1,
    //     json:[{
    //         data:123
    //     },{
    //        data:34
    //     }]
    // })

    ret = await fruits.insertMany([{
        name:'芒果',
        price:20.1,
        json:[{
            data:123
        },{
           data:34
        }]
    },{
        name:'芒果',
        price:20.1,
        json:[{
            data:123
        },{
           data:34
        }]
    }])
    // console.log(JSON.stringify(ret),'ret')
    // 更新文档
    // ret = await fruits.updateOne({name:'芒果'},{
    //     $set:{
    //         name:'芒果11'
    //     }
    // })

    // ret = await fruits.updateMany({name:'柚子'},{
    //     $set:{
    //         name:'柚子1'
    //     }
    // })
    
    // console.log(ret.result.ok,'ret')  // 1

      // 删除文档
    //   ret = await fruits.deleteMany()

      // 删除一条文档
    //   ret = await fruits.deleteOne({name:'芒果'})
    //   console.log(ret.result.ok,'ret')  // 1


      // 查询数据
    //   ret = await fruits.findOne()
      ret = await fruits.find({name:'芒果'})
      console.log('find:',ret)

})()