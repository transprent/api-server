/**
 * 接口资源
 */
const Joi = require('joi');
const logger = require('../utils/log4js').getLogger(__dirname);

module.exports = {
  comment: '文件服务',
  routers: [
    {
      comment: '上传文件',
      type: 'post',
      path: 'upload',
      param: Joi.object().keys({
        id: Joi.string().min(3).max(30).required(),
        is: Joi.boolean(),
      }),
      handle: async (ctx) => {
        const fileName = 'type_date'
        logger.info('测试logger');
        logger.log('error', 'aa');
        ctx.ok();
      },
    },
    {
      comment: '下载文件',
      type: 'get',
      path: 'download',
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
    {
      comment: '删除文件',
      type: 'get',
      path: 'remove',
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
