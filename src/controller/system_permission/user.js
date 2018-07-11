/**
 * 用户资源
 */

const Model = require('../../model');
const StringHelper = require('../../utils/stringHelper');
const Joi = require('joi');
const Service = require('../../service');

module.exports = [
  {
    comment: '用户-新增用户',
    type: 'post',
    path: 'add',
    param: Joi.object().keys({
      uname: Joi.string().required(),
      realName: Joi.string().required(),
      phone: Joi.string(),
      usable: Joi.boolean(),
      desc: Joi,
    }),
    handle: async (ctx) => {
      ctx.reqData.passwd = StringHelper.md5('123456');
      await Model.sys_user.create(ctx.reqData);
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
      Model.sys_user.update(ctx.reqData, { where: { id: ctx.reqData.id } });
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
      await Model.sys_user.destroy({ where: { id: ctx.reqData.id } });
      ctx.ok();
    },
  },
  {
    comment: '用户-获取用户',
    type: 'get',
    path: 'list',
    handle: async (ctx) => {
      const data = await Model.sys_user.findAll({
        include: [{
          model: Model.sys_role,
          as: 'roles',
        }],
      });
      ctx.ok(data);
    },
  },
  {
    comment: '用户-分配角色',
    type: 'post',
    path: 'allocation_role',
    param: Joi.object().keys({
      userId: Joi.number().required(),
      roleIds: Joi.array().items(Joi.number()).required(),
    }),
    handle: async (ctx) => {
      const res = await Service.permission.allocationRole(ctx.reqData);
      ctx.answer(res);
    },
  },
  {
    comment: '用户-登录',
    type: 'post',
    path: 'login',
    param: Joi.object().keys({
      uname: Joi.string().required(),
      passwd: Joi.string().required(),
      code: Joi.any().required(),
    }),
    handle: async (ctx) => {
      const captchaRes = Service.utils.captcha.valid(ctx.session, ctx.reqData.code);
      if (captchaRes.code !== 200) {
        ctx.answer(captchaRes);
        return;
      }
      const user = await Model.sys_user.findOne({
        where: {
          uname: ctx.reqData.uname,
          passwd: StringHelper.md5(ctx.reqData.passwd),
        },
      });
      if (!user) {
        ctx.badRequest('用户名或密码错误！');
        return;
      }

      const userPerms = await Service.permission.getUserPerms(user.id);
      const userRescs = await Service.permission.getUserRescs(user.id);

      ctx.session.user = {
        uname: user.uname,
        realName: user.realName,
        phone: user.phone,
        desc: user.desc,
        permList: userPerms.result,
        rescList: userRescs.result,
      };
      ctx.ok();
    },
  },
  {
    comment: '用户-退出',
    type: 'get',
    path: 'logout',
    handle: async (ctx) => {
      ctx.session.user = null;
      ctx.ok();
    },
  },
  {
    comment: '用户-获取用户信息',
    type: 'get',
    path: 'userinfo',
    handle: async (ctx) => {
      if (ctx.session.user) {
        const { user } = ctx.session;
        const data = {
          uname: user.uname,
          realName: user.realName,
          phone: user.phone,
          desc: user.desc,
          permList: user.permList,
        };
        ctx.ok(data);
      } else {
        ctx.unauthorized('用户未登录！');
      }
    },
  },
];
