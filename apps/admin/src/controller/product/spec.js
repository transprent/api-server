/**
 * 接口资源
 */
// const Model = require('../../model');
const Joi = require('joi');

module.exports = {
  comment: '属性',
  routers: [
    {
      comment: '获取属性数据',
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
      comment: '新增-编辑属性',
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
      comment: '删除属性',
      type: 'post',
      path: 'del_spec_value',
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
