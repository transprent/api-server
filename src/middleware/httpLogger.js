const logger = require('../utils/log4js').getLogger('http');

module.exports = () => {
  return async (ctx, next) => {
    const start = Date.now();
    await next();
    logger.info(`${ctx.request.method} - ${ctx.response.status} - ${ctx.request.url} - ${Date.now() - start}ms`);
  };
};
