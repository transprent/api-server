/**
 * 接口资源
 */
const Model = require('../../model');
const Joi = require('joi');

module.exports = [
  {
    comment: '资源-新增资源',
    type: 'post',
    path: 'add',
    param: Joi.object().keys({
      catg: Joi.string().required(),
      url: Joi.string().required(),
      usable: Joi.boolean().required(),
      desc: Joi.string().required(),
    }),
    handle: async (ctx) => {
      await Model.SysResc.create(ctx.reqData);
      ctx.ok();
    },
  },
  {
    comment: '资源-修改资源',
    type: 'post',
    path: 'update',
    param: Joi.object().keys({
      id: Joi.number().required(),
      catg: Joi.string().required(),
      url: Joi.string().required(),
      usable: Joi.boolean().required(),
      desc: Joi.string().required(),
    }),
    handle: async (ctx) => {
      Model.SysResc.update(ctx.reqData, { where: { id: ctx.reqData.id } });
      ctx.ok();
    },
  },
  {
    comment: '资源-删除资源',
    type: 'get',
    path: 'delete',
    param: Joi.object().keys({
      id: Joi.number().required(),
    }),
    handle: async (ctx) => {
      await Model.SysResc.destroy({ where: { id: ctx.reqData.id } });
      ctx.ok();
    },
  },
  {
    comment: '资源-获取资源',
    type: 'get',
    path: 'list',
    handle: async (ctx) => {
      const data = await Model.SysResc.findAll();
      ctx.ok(data);
    },
  },
];
