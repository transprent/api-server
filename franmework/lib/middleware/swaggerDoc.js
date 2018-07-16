/**
 * Return middleware that handle exceptions in Koa.
 * Dispose to the first middleware.
 *
 * @return {function} Koa middleware.
 */
const generateApi = require('../utils/generateApi');

module.exports = (options) => {
  return async (ctx, next) => {
    if (ctx.path === options.path) {
      ctx.body = generateApi();
    } else {
      await next();
    }
  };
};
