 // mongoose.js
 const mongoose = require("mongoose")

 // 1.连接  /test库
 mongoose.connect("mongodb://localhost:27019/test",{useNewUrlParser:true,useUnifiedTopology: true});

 const conn = mongoose.connection;
 conn.on("error",()=>console.error('连接数据库失败'))

 conn.once("open",async ()=>{
   // 2.定义一个Schema - Table
   const Schema = mongoose.Schema({
     category:String,
     name:String
   });
   // 3.编译一个Model,它对应数据库中的复数，小写的Collection
   const Model = mongoose.model("fruits-mongoose",Schema);  // 建立一个fruit的表
   try{
   // 4. 创建 create 返回Promise
   let r = await Model.create({
    category:"热带水果",
    name:"榴莲",
    price:30
   })
   console.log('插入数据',r)
   // 5. 查询，find返回Query，它实现了then和catch，可以当Promise使用
   // 如果需要返回Promise，调用其exec()
   r = await Model.find({name:'榴莲'});
   console.log('查询结果为',r);

   // 6. 更新，updateOne 返回Query
   r = await Model.updateOne({name:'榴莲'},{$set:{name:"芒果"}})
   console.log('更新结果为',r);  // nModified 1 修改成功

   // 7. 删除，deleteOne 返回Query
  //  r = await Model.deleteOne({name:'苹果'})
    //  console.log('删除结果为',r);    // deletedCount 删除成功
   } catch(error) {
       console.log(error)
   }
 });