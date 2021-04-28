const router = require('koa-router')();

const user = require('./user');
const todo = require('./todo');

let index = router.get('/index', (ctx, next) => {
  ctx.body = 'Hello World!';
});

router.use('/api', index.routes(), index.allowedMethods());
router.use('/api', user.routes(), user.allowedMethods());
router.use('/api/todo', todo.routes(), todo.allowedMethods());

module.exports = router;
