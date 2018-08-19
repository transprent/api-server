/**
 * 接口资源
 */
// const Model = require('../../model');
const Joi = require('joi');

module.exports = {
  comment: '商品',
  routers: [
    {
      comment: '获取商品',
      type: 'get',
      path: 'page',
      param: Joi.object().keys({
        id: Joi.string().min(3).max(30).required(),
      }),
      handle: async (ctx) => {
        ctx.ok();
      },
    },
    {
      comment: '商品详情',
      type: 'get',
      path: 'detail',
      param: Joi.object().keys({
        id: Joi.string().min(3).max(30).required(),
      }),
      handle: async (ctx) => {
        ctx.ok();
      },
    },
    {
      comment: '新增-编辑商品',
      type: 'post',
      path: 'add_edit',
      param: Joi.object().keys({
        id: Joi.string().min(3).max(30).required(),
      }),
      handle: async (ctx) => {
        ctx.ok();
      },
    },
  ],
};
