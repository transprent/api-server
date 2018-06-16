/**
 * 接口资源
 */
// const Model = require('../../model');
const Joi = require('joi');

module.exports = [
  {
    comment: '获取数据！',
    type: 'get',
    path: 'test',
    param: Joi.object().keys({
      id: Joi.string().min(3).max(30).required(),
    }),
    handle: async (ctx) => {
      ctx.ok();
    },
  },
  {
    comment: '获取数据！',
    type: 'get',
    path: 'test2',
    param: Joi.object().keys({
      id: Joi.string().min(3).max(30).required(),
    }),
    handle: async (ctx) => {
      ctx.ok();
    },
  },
];
