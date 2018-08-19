/**
 * 接口资源
 */
// const Model = require('../../model');
const Joi = require('joi');

module.exports = {
  comment: '目录',
  routers: [
    {
      comment: '获取目录数据',
      type: 'get',
      path: 'list',
      param: Joi.object().keys({
        id: Joi.string().min(3).max(30).required(),
        is: Joi.boolean(),
      }),
      handle: async (ctx) => {
        ctx.ok();
      },
    },
    {
      comment: '新增-编辑目录',
      type: 'post',
      path: 'add_edit',
      param: Joi.object().keys({
        id: Joi.string().min(3).max(30).required(),
        is: Joi.boolean(),
      }),
      handle: async (ctx) => {
        ctx.ok();
      },
    },
    {
      comment: '删除目录',
      type: 'post',
      path: 'add_edit',
      param: Joi.object().keys({
        id: Joi.string().min(3).max(30).required(),
        is: Joi.boolean(),
      }),
      handle: async (ctx) => {
        ctx.ok();
      },
    },
  ],
};
