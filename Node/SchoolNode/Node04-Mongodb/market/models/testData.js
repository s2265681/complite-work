const mongodb = require('./db')

mongodb.once("connect",async()=>{
   const  col = mongodb.col("fruits-test",'fruit');  // 一个参数是数据表   一个是库

    try{
        // 删除已存在
        await col.deleteMany();

        // 插入
        await col.insertMany([
            {name:"苹果",price:5,category:"水果"},
            {name:"香蕉",price:2,category:"水果"},
            {name:"苹果",price:5,category:"水果"},
            {name:"香蕉",price:2,category:"水果"},
            {name:"苹果",price:5,category:"水果"},
            {name:"香蕉",price:2,category:"水果"},
            {name:"苹果",price:5,category:"水果"},
            {name:"香蕉",price:2,category:"水果"},
            {name:"苹果",price:5,category:"水果"},
            {name:"香蕉",price:2,category:"水果"},
            {name:"苹果",price:5,category:"水果"},
            {name:"香蕉",price:2,category:"水果"},
            {name:"苹果",price:5,category:"水果"},
            {name:"香蕉",price:2,category:"水果"},
            {name:"苹果",price:5,category:"水果"},
            {name:"香蕉",price:2,category:"水果"},
            {name:"苹果",price:5,category:"水果"},
            {name:"香蕉",price:2,category:"水果"},
            {name:"苹果",price:5,category:"水果"},
            {name:"香蕉",price:2,category:"水果"},
            {name:"苹果",price:5,category:"水果"},
            {name:"香蕉",price:2,category:"水果"},
            {name:"苹果",price:5,category:"水果"},
            {name:"香蕉",price:2,category:"水果"},
            {name:"香蕉",price:2,category:"水果"},
            {name:"苹果",price:5,category:"水果"},
            {name:"香蕉",price:2,category:"水果"},
            {name:"苹果",price:5,category:"水果"},
            {name:"香蕉",price:2,category:"水果"},
            {name:"苹果",price:5,category:"水果"},
            {name:"香蕉",price:2,category:"水果"},
            {name:"苹果",price:5,category:"水果"},
            {name:"香蕉",price:2,category:"水果"},
        ])
        console.log('插入测试数据成功');
    }catch(error){
        console.log('插入测试数据失败');
        console.log(error)
    }
});