const log4js = require('../utils/log4js');

/**
 * Return middleware that handle exceptions in Koa.
 * Dispose to the first middleware.
 *
 * @return {function} Koa middleware.
 */
module.exports = () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      log4js.getLogger('error').error('统一错误处理：', err.message);
      ctx.app.emit('error', err, ctx);
      ctx.internalServerError(err.message);
    }
  };
};
