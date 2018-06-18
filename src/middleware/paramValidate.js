const Joi = require('joi');
const log4js = require('../utils/log4js');

/**
 * Return middleware that handle exceptions in Koa.
 * Dispose to the first middleware.
 *
 * @return {function} Koa middleware.
 */
module.exports = (schema) => {
  const joiOptions = {
    allowUnknown: true, // 允许出现未声明的字段
    stripUnknown: true, // 移除未声明的字段
  };
  return async (ctx, next) => {
    if (!schema) { await next(); return; }
    const data = ctx.request.method.toLowerCase() === 'get' ? ctx.request.query : ctx.request.body;
    const result = Joi.validate(data, schema, joiOptions);
    if (result.error === null) {
      ctx.reqData = result.value;
      await next();
    } else {
      ctx.badRequest(result.error.message, result.error.details);
      log4js.getLogger('http').warn('统一请求参数验证处理：', result.error);
    }
  };
};
