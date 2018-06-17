/**
 * 权限资源
 */
const Model = require('../../model');
const Joi = require('joi');

module.exports = [
  {
    comment: '权限-新增权限',
    type: 'post',
    path: 'add',
    param: Joi.object().keys({
      code: Joi.string().required(),
      type: Joi.string().required(),
      usable: Joi.boolean().required(),
      desc: Joi.string().required(),
      parentId: Joi.number(),
    }),
    handle: async (ctx) => {
      await Model.SysPerm.create(ctx.param);
      ctx.ok();
    },
  },
  {
    comment: '权限-修改权限',
    type: 'post',
    path: 'update',
    param: Joi.object().keys({
      id: Joi.number().required(),
      code: Joi.string().required(),
      type: Joi.string().required(),
      usable: Joi.boolean().required(),
      desc: Joi.string().required(),
      parentId: Joi.number(),
    }),
    handle: async (ctx) => {
      Model.SysPerm.update(ctx.param, { where: { id: ctx.param.id } });
      ctx.ok();
    },
  },
  {
    comment: '权限-删除权限',
    type: 'get',
    path: 'delete',
    param: Joi.object().keys({
      id: Joi.number().required(),
    }),
    handle: async (ctx) => {
      await Model.SysPerm.destroy({ where: { id: ctx.param.id } });
      ctx.ok();
    },
  },
  {
    comment: '权限-获取权限',
    type: 'get',
    path: 'list',
    handle: async (ctx) => {
      const data = await Model.SysPerm.findAll();
      ctx.ok(data);
    },
  },
];
