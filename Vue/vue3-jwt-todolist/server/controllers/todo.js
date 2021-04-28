const todoModel = require('../models/todoModel.js');

class TodoController {
  // 新增todo
  static async addTodo(ctx) {
    const data = ctx.request.body;
    const result = await todoModel.create(data);
    return result
      ? ctx.send({ id: result._id })
      : ctx.sendError('添加信息失败!');
  }
  // 编辑todo
  static async editTodo(ctx) {
    const data = ctx.request.body;
    if (data.type !== 'all') {
      const update = { ...data };
      delete update.id;
      const result = await todoModel.findByIdAndUpdate(data.id, update);
      return result
        ? ctx.send({ id: result._id }, '信息编辑成功')
        : ctx.sendError('信息编辑失败');
    } else {
      //批量编辑
      const res = await todoModel.update(
        { _id: { $in: data.ids } },
        { completed: data.completed },
        { multi: true }
      );
      return res
        ? ctx.send({}, '状态批量编辑成功')
        : ctx.sendError('状态批量编辑失败');
    }
  }
  // 删除单条数据 removeTodo
  static async removeTodo(ctx) {
    const data = ctx.request.body;
    const result = await todoModel.findByIdAndRemove(data.id);
    return result
      ? ctx.send({ id: result._id }, '信息删除成功')
      : ctx.sendError('信息删除失败');
  }
  // 获取todo
  static async todolist(ctx) {
    const result = await todoModel.find({}, { title: 1, completed: 1 });
    return ctx.send({ list: result || [] });
  }
}

module.exports = TodoController;
