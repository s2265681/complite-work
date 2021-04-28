const mongoose = require("mongoose")

const schema = mongoose.Schema({
    name:String,
    url:String,
    poster:String,
    icon:String,
    description:String,
    cooperation:[String],
    sort:Number
})

const model = mongoose.model("vip",schema);

// 测试数据
async function testdata(){
    await model.deleteMany();
    await model.insertMany([{
        name:'Web全栈架构师',
        url:"/vip-course/web",
        poster:"https://img.kaikeba.com/web_vip.png",
        icon:"https://img.kaikeba.com/web_menu.png",
        description:"授课深度对表百度T6-T7,进入BAT等一线大厂，实现年薪30万+",
        cooperation:[
            "https://img.kaikeba.com/web_vip.png",
            "https://img.kaikeba.com/toutiao.png",
        ],
        sort:1
    },
    {
        name:'JavaEE 企业级分布式高级架构师',
        url:"/vip-course/java",
        poster:"https://img.kaikeba.com/java_vip.png",
        icon:"https://img.kaikeba.com/java.menu.png",
        description:"校验团队与一线企业技术leader深度合作，已企业所需，重新等一了java进阶",
        cooperation:[
            "https://img.kaikeba.com/baidu.png",
            "https://img.kaikeba.com/toutiao.png",
        ],
        sort:2
    }])
}

testdata()

module.exports = model;