const sendHandle = () => {
  // 处理请求成功方法
  const render = (ctx) => {
    return (data = {}, msg = 'success', error = 0) => {
      ctx.set('Content-Type', 'application/json');
      ctx.body = {
        error,
        data,
        error_reason: msg,
      };
    };
  };

  // 处理请求失败方法
  const renderError = (ctx) => {
    return (msg = 'fail', error = -1) => {
      ctx.set('Content-Type', 'application/json');
      ctx.body = {
        error,
        error_reason: msg,
      };
    };
  };

  return async (ctx, next) => {
    ctx.send = render(ctx);
    ctx.sendError = renderError(ctx);
    await next();
  };
};

module.exports = sendHandle;
