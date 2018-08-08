/**
 * 接口资源
 */
const Joi = require('joi');
const logger = require('../../utils/log4js').getLogger(__dirname);

module.exports = {
  comment: '测试',
  routers: [
    {
      comment: '获取数据',
      type: 'get',
      path: 'test',
      param: Joi.object().keys({
        id: Joi.string().min(3).max(30).required(),
        is: Joi.boolean(),
      }),
      handle: async (ctx) => {
        logger.info('测试logger');
        logger.log('error', 'aa');
        ctx.ok();
      },
    },
  ],
};
