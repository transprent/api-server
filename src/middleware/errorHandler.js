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
      ctx.app.emit('error', err, ctx);
    }
  };
};
