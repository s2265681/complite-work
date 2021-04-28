
module.exports = async (ctx,next) =>{
    const {username } = ctx.session 
    console.log(ctx.session,'ctx.session')
    if(!username){
        ctx.body = {
            ok:0,
            message:'未登录'
        }
    }else{
        next()
    }
}