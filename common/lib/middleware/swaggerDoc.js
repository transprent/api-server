/**
 * Return middleware that handle exceptions in Koa.
 * Dispose to the first middleware.
 *
 * @return {function} Koa middleware.
 */
const generateApi = require('../utils/generateApi');

module.exports = ({ path, config }) => {
  return async (ctx, next) => {
    if (ctx.path === path) {
      ctx.body = generateApi(config);
    } else {
      await next();
    }
  };
};
