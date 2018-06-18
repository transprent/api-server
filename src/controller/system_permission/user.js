/**
 * 用户资源
 */
const Model = require('../../model');
const StringHelper = require('../../utils/stringHelper');
const Joi = require('joi');

module.exports = [
  {
    comment: '用户-新增用户',
    type: 'post',
    path: 'add',
    param: Joi.object().keys({
      uname: Joi.string().required(),
      realName: Joi.string().required(),
      // phone: Joi.string(),
      usable: Joi.boolean(),
      desc: Joi.string(),
    }),
    handle: async (ctx) => {
      ctx.reqData.passwd = StringHelper.md5('123456');
      await Model.SysUser.create(ctx.reqData);
      ctx.ok();
    },
  },
  {
    comment: '用户-修改用户',
    type: 'post',
    path: 'update',
    param: Joi.object().keys({
      id: Joi.string().required(),
      uname: Joi.string().required(),
      realName: Joi.string().required(),
      phone: Joi.string().required(),
      usable: Joi.boolean().required(),
      desc: Joi.string().required(),
    }),
    handle: async (ctx) => {
      Model.SysUser.update(ctx.reqData, { where: { id: ctx.reqData.id } });
      ctx.ok();
    },
  },
  {
    comment: '用户-删除用户',
    type: 'get',
    path: 'delete',
    param: Joi.object().keys({
      id: Joi.string().required(),
    }),
    handle: async (ctx) => {
      await Model.SysUser.destroy({ where: { id: ctx.reqData.id } });
      ctx.ok();
    },
  },
  {
    comment: '用户-获取用户',
    type: 'get',
    path: 'list',
    handle: async (ctx) => {
      const data = await Model.SysUser.findAll();
      ctx.ok(data);
    },
  },
];
