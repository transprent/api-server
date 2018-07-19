/**
 * 角色资源
 */
const Model = require('../../model');
const Service = require('../../service');
const Joi = require('joi');

module.exports = {
  comment: '角色管理',
  routers: [
    {
      comment: '新增角色',
      type: 'post',
      path: 'add',
      param: Joi.object().keys({
        name: Joi.string().required(),
        desc: Joi.string(),
      }),
      handle: async (ctx) => {
        await Model.sys_role.create(ctx.reqData);
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
        desc: Joi.string(),
      }),
      handle: async (ctx) => {
        Model.sys_role.update(ctx.reqData, { where: { id: ctx.reqData.id } });
        ctx.ok();
      },
    },
    {
      comment: '删除角色',
      type: 'post',
      path: 'delete',
      param: Joi.object().keys({
        ids: Joi.array().items(Joi.number()).required(),
      }),
      handle: async (ctx) => {
        await Model.sys_role.destroy({ where: { id: ctx.reqData.ids } });
        ctx.ok();
      },
    },
    {
      comment: '获取角色',
      type: 'get',
      path: 'list',
      handle: async (ctx) => {
        const data = await Model.sys_role.findAll({
          include: [{
            model: Model.sys_user,
            as: 'users',
          }],
        });
        ctx.ok(data);
      },
    },
    {
      comment: '分配权限',
      type: 'post',
      path: 'allocation_perm',
      param: Joi.object().keys({
        roleId: Joi.number().required(),
        permIds: Joi.array().items(Joi.number()).required(),
      }),
      handle: async (ctx) => {
        const res = await Service.permission.allocationPerm(ctx.reqData);
        ctx.answer(res);
      },
    },
    {
      comment: '获取指定角色下的的权限',
      type: 'get',
      path: 'own/perm',
      param: Joi.object().keys({
        roleId: Joi.number().required(),
      }),
      handle: async (ctx) => {
        const res = await Service.permission.getRoleOwnPerm(ctx.reqData.roleId);
        ctx.answer(res);
      },
    },
  ],  
};