module.exports = function errorHandle(ctx, next) {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.body = {
        error: 401,
        error_reason: err.originalError
          ? err.originalError.message
          : err.message,
      };
    } else {
      throw err;
    }
  });
};
