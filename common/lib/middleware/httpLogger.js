const log4js = require('../utils/log4js');

module.exports = (app, config) => {
  const logger = log4js.getLogger(config.appName, 'http');
  return async (ctx, next) => {
    const start = Date.now();
    await next();
    const level = ctx.response.status < 400 ? 'info' : ctx.response.status >= 500 ? 'error' : 'warn';
    logger.log(level, `${ctx.request.method} - ${ctx.response.status} - ${ctx.request.url} - ${Date.now() - start}ms`);
  };
};
