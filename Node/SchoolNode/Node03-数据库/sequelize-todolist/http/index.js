const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const path = require('path')

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    res.header('Access-Control-Allow-Credentials','true');
    next();
  });

const Sequelize = require("sequelize");
  // 建立连接
  const sequelize = new Sequelize("kaikeba","root","shang5036",{ // 数据库  用户名   密码
    host:"localhost",
    dialect:"mysql",
  //   operatorsAliases:false
  });


  // 定义模型
  const Fruit = sequelize.define("Fruit",{
    name:{
        type:Sequelize.STRING(20),
        allowNull:false
    },
    price:{
        type:Sequelize.FLOAT,
        allowNull:false
        },
    stock:{
        type:Sequelize.INTEGER,
        defaultValue:0,  // 默认值为0
        }
    },{
        timestamps:false
    })


app.use(bodyParser.json());

app.get('/list',async(req,res)=>{
    const {currendIndex,totlePage} =  req.query
    console.log(typeof currendIndex,typeof totlePage)
  const {count} =  await Fruit.findAndCountAll()
  console.log(count,'count')
  await  Fruit.findAll({
        offset:(Number(currendIndex)-1)*10,  // 查询第几个
        limit:Number(totlePage), 
    }).then(fruits =>{
        res.send({data:fruits,allCount:count%10})
    })
})

 app.delete('/list/:id',async(req,res)=>{
      const id = req.params.id
      const rest = await Fruit.destroy({ where: {id:id},force: true })
      console.log(rest,'rest')
    if(rest){
        res.send({code:1,msg:'success'})
    }
})

app.post('/list',async(req,res)=>{
    const body = req.body
    console.log(body,'body')
    ret= await Fruit.create({
        name:body.name,
        price:body.price
    })
    // console.log(ret.get().id,'ret')
    if(ret.get().id){
        res.send({code:1,msg:'success'})
    }
})

// function core(res) {
//     // 简单请求
//     res.setHeader('Access-Control-Allow-Origin','*')
//     // 复杂请求加header
//     // res.setHeader('Access-Control-Allow-Headers','X-token,Content-Type')
//     // 设置cookie
//     // res.setHeader('Access-Control-Allow-Credentials','true')
//     res.setHeader('Content-Type','application/json')
// }


app.listen(3009);