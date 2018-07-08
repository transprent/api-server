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
      const data = await Model.sys_perm.findAll();
      data.push({
        parentId: -1,
        id: 0,
        name: '权限管理',
        code: 'f_perm',
      });
      ctx.ok(data);
    },
  },
];
