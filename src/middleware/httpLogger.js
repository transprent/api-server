const log4js = require('../utils/log4js');

module.exports = () => {
  return async (ctx, next) => {
    const start = Date.now();
    await next();
    log4js.getLogger('http').log('debug', `${ctx.request.method} - ${ctx.response.status} - ${ctx.request.url} - ${Date.now() - start}ms`);
  };
};
