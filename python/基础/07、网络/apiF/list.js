const Router = require("koa-router");
const router = new Router();

router.get("/list", (ctx) => {
    const query = ctx.query;
    console.log(query,'query...');
    ctx.body = {
       methods:'GET',
       CDate:"2021-07-21",
       Content:"发布python",
       UserID:"tony",
       ID:'10'
    }
});

router.post("/list", (ctx) => {
    const { body } = ctx.request;
    console.log(body,'body.>>>>')
    ctx.body = {
       methods:'POST',
       CDate:"2021-07-21",
       Content:"发布python",
       UserID:"tony",
       ID:'10'
    }
});

module.exports = router;