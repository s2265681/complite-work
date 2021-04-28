const crypto = require('crypto');
const Auth = require('../framework/auth');
const userModel = require('../models/userModel.js');

class UserController {
  // 用户注册
  static async register(ctx) {
    const data = ctx.request.body;
    const checkUser = await userModel.findOne({
      username: data.username,
    });
    if (checkUser) {
      return ctx.sendError('该用户已注册');
    }
    const user = new userModel({
      username: data.username,
      password: crypto
        .createHash('md5')
        .update(data.password + 'jwt_yan')
        .digest('hex'), // 注册密码加密
    });
    const result = await user.save();
    return result
      ? ctx.send('恭喜,账号注册成功!')
      : ctx.sendError('抱歉,注册失败!');
  }
  // 用户登录
  static async login(ctx) {
    const data = ctx.request.body;
    if (!data.username || !data.password) {
      return ctx.sendError('用户名或密码不存在');
    }
    const result = await userModel.findOne({
      username: data.username,
      password: crypto
        .createHash('md5')
        .update(data.password + 'jwt_yan')
        .digest('hex'),
    });
    if (!result) return ctx.sendError('用户名或密码错误');
    let token = Auth.sign(ctx, result);
    return ctx.send({ token }, '登录成功');
  }
  // 获取用户信息
  static async userinfo(ctx) {
    const data = ctx.state.user;
    const user = await userModel.findById(data._id);
    if (!user) return ctx.sendError('用户信息不存在');
    const result = {
      _id: user._id,
      username: user.username,
    };
    return ctx.send(result);
  }
}

module.exports = UserController;
