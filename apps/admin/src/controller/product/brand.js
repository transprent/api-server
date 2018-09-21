/**
 * 接口资源
 */
// const Model = require('../../model');
const Joi = require('joi');

module.exports = {
  comment: '品牌',
  roles: ['admin', 'hi'],
  routers: [
    {
      comment: '获取品牌数据',
      type: 'get',
      path: 'list',
      roles: ['kun'],
      param: Joi.object().keys({
        id: Joi.string().min(3).max(30).required(),
        is: Joi.boolean(),
      }),
      handle: async (ctx) => {
        ctx.ok();
      },
    },
    {
      comment: '新增-编辑品牌',
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
      comment: '删除品牌',
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
