const vip = require('../models/vip');  // index中执行中间件  加载model/vip 调数据 存到ctx.state中

module.exports = async (ctx,next) =>{
    if(ctx.accepts('html') === 'html') {
        ctx.state.vipCoures = await vip.find();
    }
    await next();
}