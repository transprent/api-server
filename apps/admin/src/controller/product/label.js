/**
 * 接口资源
 */
// const Model = require('../../model');
const Joi = require('joi');

module.exports = {
  comment: '标签',
  routers: [
    {
      comment: '获取标签数据',
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
      comment: '新增-编辑标签',
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
      comment: '删除标签',
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
