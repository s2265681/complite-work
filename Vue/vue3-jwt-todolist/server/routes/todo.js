const router = require('koa-router')();

const TodoController = require('../controllers/todo');

//新增todo
router.post('/add', TodoController.addTodo);

//编辑todo
router.post('/edit', TodoController.editTodo);

//删除todo
router.post('/remove', TodoController.removeTodo);

//获取todo
router.get('/list', TodoController.todolist);

module.exports = router;
