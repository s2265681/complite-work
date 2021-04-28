const Router = require('koa-router')
const router  = new Router()

router.get('/',async ctx=>{
    // 排序
    const list  = ctx.state.vipCoures
    list.sort((a,b)=>a.sort-b.sort)
    // 首次播放视频
    let showVideo;
    if(ctx.cookies.get('isPlayed')) {
        showVideo = false;
    }else{
        showVideo = true;
        ctx.cookies.set('isPlayed',true,{maxAge:7 * 24 * 3600000,httpOnly:false});
    }
    await ctx.render('index',{list,showVideo})
})

module.exports = router
