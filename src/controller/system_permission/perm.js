/**
 * 权限资源
 */
const Model = require('../../model');
const Service = require('../../service');
const Joi = require('joi');

module.exports = [
  {
    comment: '权限-新增权限',
    type: 'post',
    path: 'add',
    param: Joi.object().keys({
      name: Joi.string().required(),
      code: Joi.string().required(),
      desc: Joi.string(),
      parentId: Joi.number(),
    }),
    handle: async (ctx) => {
      await Model.sys_perm.create(ctx.reqData);
      ctx.ok();
    },
  },
  {
    comment: '权限-修改权限',
    type: 'post',
    path: 'update',
    param: Joi.object().keys({
      id: Joi.number().required(),
      name: Joi.string().required(),
      code: Joi.string().required(),
      usable: Joi.boolean(),
      parentId: Joi.number(),
    }),
    handle: async (ctx) => {
      Model.sys_perm.update(ctx.reqData, { where: { id: ctx.reqData.id } });
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
      await Model.sys_perm.destroy({ where: { id: ctx.reqData.id } });
      ctx.ok();
    },
  },
  {
    comment: '权限-获取权限',
    type: 'get',
    path: 'list',
    handle: async (ctx) => {
      const data = await Model.sys_perm.findAll({
        include: [{
          model: Model.sys_role,
          as: 'roles',
        }],
      });
      data.push({
        parentId: -1,
        id: 0,
        name: '管理系统',
        code: 'f_perm',
        roles: [],
      });
      ctx.ok(data);
    },
  },
  {
    comment: '权限-分配资源',
    type: 'post',
    path: 'allocation_resc',
    param: Joi.object().keys({
      permId: Joi.number().required(),
      rescIds: Joi.array().items(Joi.number()).required(),
    }),
    handle: async (ctx) => {
      const res = await Service.permission.allocationResc(ctx.reqData);
      ctx.answer(res);
    },
  },
  {
    comment: '权限-获取指定权限下的资源',
    type: 'get',
    path: 'own/resc',
    param: Joi.object().keys({
      permId: Joi.number().required(),
    }),
    handle: async (ctx) => {
      const res = await Service.permission.getPermOwnResc(ctx.reqData.permId);
      ctx.answer(res);
    },
  },
];
