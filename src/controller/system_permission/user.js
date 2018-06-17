/**
 * 用户资源
 */
const Model = require('../../model');
const Joi = require('joi');

module.exports = [
  {
    comment: '新增用户',
    type: 'post',
    path: 'add',
    param: Joi.object().keys({
      uname: Joi.string().required(),
      passwd: Joi.string().required(),
      realName: Joi.string().required(),
      phone: Joi.string().required(),
      usable: Joi.boolean().required(),
      desc: Joi.string().required(),
    }),
    handle: async (ctx) => {
      await Model.SysUser.create(ctx.param);
      ctx.ok();
    },
  },
  {
    comment: '修改用户',
    type: 'post',
    path: 'update',
    param: Joi.object().keys({
      id: Joi.string().required(),
      uname: Joi.string().required(),
      passwd: Joi.string().required(),
      realName: Joi.string().required(),
      phone: Joi.string().required(),
      usable: Joi.boolean().required(),
      desc: Joi.string().required(),
    }),
    handle: async (ctx) => {
      Model.SysUser.update(ctx.param, { where: { id: ctx.param.id } });
      ctx.ok();
    },
  },
  {
    comment: '删除用户',
    type: 'get',
    path: 'delete',
    param: Joi.object().keys({
      id: Joi.string().required(),
    }),
    handle: async (ctx) => {
      await Model.SysUser.destroy({ where: { id: ctx.param.id } });
      ctx.ok();
    },
  },
  {
    comment: '获取用户',
    type: 'get',
    path: 'list',
    handle: async (ctx) => {
      const data = await Model.SysUser.findAll();
      ctx.ok(data);
    },
  },
];
