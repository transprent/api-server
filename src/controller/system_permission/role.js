/**
 * 角色资源
 */
const Model = require('../../model');
const Joi = require('joi');

module.exports = [
  {
    comment: '角色-新增角色',
    type: 'post',
    path: 'add',
    param: Joi.object().keys({
      name: Joi.string().required(),
      usable: Joi.boolean().required(),
      desc: Joi.string().required(),
    }),
    handle: async (ctx) => {
      await Model.SysRole.create(ctx.reqData);
      ctx.ok();
    },
  },
  {
    comment: '角色-修改角色',
    type: 'post',
    path: 'update',
    param: Joi.object().keys({
      id: Joi.string().required(),
      name: Joi.string().required(),
      usable: Joi.boolean().required(),
      desc: Joi.string().required(),
    }),
    handle: async (ctx) => {
      Model.SysRole.update(ctx.reqData, { where: { id: ctx.reqData.id } });
      ctx.ok();
    },
  },
  {
    comment: '角色-删除角色',
    type: 'get',
    path: 'delete',
    param: Joi.object().keys({
      id: Joi.string().required(),
    }),
    handle: async (ctx) => {
      await Model.SysRole.destroy({ where: { id: ctx.reqData.id } });
      ctx.ok();
    },
  },
  {
    comment: '角色-获取角色',
    type: 'get',
    path: 'list',
    handle: async (ctx) => {
      const data = await Model.SysRole.findAll();
      ctx.ok(data);
    },
  },
];
