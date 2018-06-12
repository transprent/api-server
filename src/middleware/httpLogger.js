const logger = require('../utils/log4js').getLogger('http');

module.exports = () => {
  return async (ctx, next) => {
    const start = Date.now();
    await next();
    const level = ctx.response.status < 400 ? 'info' : ctx.response.status >= 500 ? 'error' : 'warn';
    logger.log(level, `${ctx.request.method} - ${ctx.response.status} - ${ctx.request.url} - ${Date.now() - start}ms`);
  };
};
