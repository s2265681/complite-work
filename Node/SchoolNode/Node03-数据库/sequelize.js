(async ()=>{
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
            allowNull:false,
            get() {  // 定义在属性中   也可以定义在模型中
                // 通过get方法对查询后的结果进行组合
                // findAll [{"name":"香蕉123(价格：¥3.5 库存：0kg)","id":1,"price":3.5,"stock":0}]
                const fname = this.getDataValue("name");
                const price = this.getDataValue("price")
                const stock = this.getDataValue("stock")
                return `${fname}(价格：¥${price} 库存：${stock}kg)`;
            }
        },
        price:{
            type:Sequelize.FLOAT,
            allowNull:false,
            // 校验
            validate:{
                isFloat:{
                msg:"价格字段请输入数字"},
                min:{args:[0],msg:"价格字段必须大于0"}
              }
            },
        stock:{
            type:Sequelize.INTEGER,
            defaultValue:0,  // 默认值为0
            validate:{
                isNumeric:{
                  msg:"库存字段请输入数字"
                }
            }},
    },{
        timestamps:false,  // 设置时间显示还是不显示
        // 定义在模型中 // 不写入表中，但是可以查出
        // options中
        getterMethods:{
            amount(){
                return this.getDataValue("stock")+"kg";
            }
        },
        setterMethods:{
            amount(val){
                const idx = val.indexOf("kg");
                const v = val.slice(0,idx);
                this.setDataValue("stock",v);
            }
        }
       
    })

   // 添加类级别的方法
    Fruit.classify = function (name) {
        const tropicFruits = ['香蕉','芒果','椰子'] // 热带水果
        return tropicFruits.includes(name)?"热带水果":"其他水果";
    };
    // 使用方法
     ['香蕉','草莓'].forEach(f=>console.log(f+'是'+Fruit.classify(f)));



    // 同步,自动生成sql语句并执行
    let ret = await Fruit.sync({force:false})  // 强制刷新，重新创建数据


    //  写一个类方法
    Fruit.prototype.totalPrice = function(count) {
        return (this.price * count).toFixed(2);
    }

    // 插入
    ret= await Fruit.create({
        name:'香蕉123',
        price:1
    })

    // console.log(ret,'ret')
    // console.log('create',ret)


    // 查询
    // ret= await Fruit.findAll()
    // console.log('findAll',JSON.stringify(ret))
    // console.log('findAll',ret[0].amount,'amount')

    // Fruit.findAll().then(fruits =>{
        // console.log(fruits,'fruits')
    //     // 修改amount ， 触发setterMethods
    //     fruits[0].amount = '140kg',
    //     fruits[0].save();
    // console.log('findAll',ret[0].amount,'amount')
        
    //   const [f1] = fruits;
    //   console.log(f1.name,'f1.name')

    //   console.log(`买5kg${f1.name}需要¥${f1.totalPrice(5)}`,'f1.name')

    // })



    // 数据查询单个
    // 通过id查询（不支持了）
    // 通过属性查询
    // Fruit.findOne({
    //     where:{name:'香蕉123'}
    // }).then(fruit=>{
    //     // fruit是首个匹配项，若没有则为null
    //     console.log(fruit.get(),'get');
    // })

    // 通过指定字段查询,只查name 其他空
    // Fruit.findOne({
    //     attributes:['price']
    // }).then(fruit=>{
    //     // fruit是首个匹配项，若没有则为null
    //     console.log(fruit.get(),'get1');
    // })

    // 获取数据和总条数
    // Fruit.findAndCountAll().then(result=>{
    //     console.log(result.count)
    //     console.log(result.rows.length)
    //     // console.log(result.rows[2].get())
    // })

    // 查询操作符 // 查询价格小于(gt)10，大于(lt)0的条数
    const Op= Sequelize.Op;
    // Fruit.findAll({
    //     // where:{price:{[Op.lt]:4},stock:{[Op.gte]:100}}
    //    where:{price:{[Op.lt]:10,[Op.gt]:0}}
    // }).then(fruits=>{
    //     console.log(fruits.length,'length')
    // })

    // 或语句 查询价格小于3或大于10的个数
    //  Fruit.findAll({
    //        where:{price:{[Op.or]:[[{[Op.gt]:3}] ,{[Op.lt]:10}]}}
    //     }).then(fruits=>{
    //         console.log(fruits.length,'length')
    //   })

    // 分页
    // Fruit.findAll({
    //     offset:0,  // 查询第几个
    //     limit:2,  // 查询个数
    // }).then(res=>console.log(JSON.stringify(res),'res'))  // 十个
     
    // 排序  根据id倒叙【排列
    // Fruit.findAll({
    //     offset:0,  // 查询第几个
    //     limit:3,  // 查询个数
    //     order:[['id','DESC']],
    //  }).then(res=>console.log(JSON.stringify(res),'res'))  // 十个

    // 聚合 找最大最小值
    // Fruit.max("price").then(max=>{
    //     console.log(max,'max')
    // })
    // Fruit.sum("price").then(sum=>{
    //     console.log(sum,'sum')
    // })

    // 删除1、
    //  Fruit.findOne({where:{id:1}}).then(r=>r.destroy())
    // 删除2、
    // Fruit.destroy({ where: {id: 1},force: true });

    //  修改1
    // Fruit.update(
    //     { name: '香蕉1' }, /* set attributes' value */
    //     { where: { id: 1 }} /* where criteria */
    //   ).then(r=>console.log(r,'更新后的r'))
    //  修改2 error (node:20011) (node:20011) UnhandledPromiseRejectionWarning: TypeError: Fruit.findById is not a function
    // Fruit.findById(2).then(f=>{
    //     f.price=4;
    //     f.name='苹果';
    //     f.save().then(()=>console.log('update'))
    // })


    // 关联 ？
    // 1:N 关系
    // const Player = sequelize.define('player',{name:Sequelize.STRING});
    // const Team = sequelize.define('team',{name:Sequelize.STRING});

    // // 会添加teamId 到Player表做为外键
    // Player.belongsTo(Team); // 1端建立关系
    // Team.hasMany(Player)    // N端建立关系

    
  })()