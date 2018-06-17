const Joi = require('joi');
const log4js = require('../utils/log4js');

/**
 * Return middleware that handle exceptions in Koa.
 * Dispose to the first middleware.
 *
 * @return {function} Koa middleware.
 */
module.exports = (schema) => {
  return async (ctx, next) => {
    if (!schema) { await next(); return; }
    const result = Joi.validate(ctx.request.method.toLowerCase() === 'get'
      ? ctx.query : ctx.request.body, schema);
    if (result.error === null) {
      await next();
    } else {
      ctx.badRequest(result.error.details);
      log4js.getLogger('http').warn('统一请求参数验证处理：', result.error);
    }
  };
};
