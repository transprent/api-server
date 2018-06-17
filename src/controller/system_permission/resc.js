/**
 * 接口资源
 */
// const Model = require('../../model');
const Joi = require('joi');

module.exports = [
  {
    comment: '修改/修改资源',
    type: 'post',
    path: 'add-edit',
    param: Joi.object().keys({
      id: Joi.string().min(3).max(30).required(),
      name: Joi.string().min(3).max(30).required(),
      array: Joi.array().items(Joi.object().keys({ id: Joi.string() })),
    }),
    handle: async (ctx) => {
      ctx.ok();
    },
  },
  {
    comment: '删除资源',
    type: 'get',
    path: 'delete',
    param: Joi.object().keys({
      id: Joi.string().min(3).max(30).required(),
    }),
    handle: async (ctx) => {
      ctx.ok();
    },
  },
  {
    comment: '获取资源',
    type: 'get',
    path: 'list',
    param: Joi.object().keys({
      id: Joi.string().min(3).max(30).required(),
    }),
    handle: async (ctx) => {
      ctx.ok();
    },
  },
];
