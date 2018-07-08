/**
 * 接口资源
 */
const Joi = require('joi');
const { Op } = require('sequelize');

const Model = require('../../model');
const generateApi = require('../../utils/generateApi');

module.exports = [
  {
    comment: '资源-新增资源',
    type: 'post',
    path: 'add',
    param: Joi.object().keys({
      name: Joi.string().required(),
      catg: Joi.string().required(),
      url: Joi.string().required(),
      desc: Joi.string(),
    }),
    handle: async (ctx) => {
      await Model.sys_resc.create(ctx.reqData);
      ctx.ok();
    },
  },
  {
    comment: '资源-修改资源',
    type: 'post',
    path: 'update',
    param: Joi.object().keys({
      id: Joi.number().required(),
      name: Joi.string().required(),
      catg: Joi.string().required(),
      url: Joi.string().required(),
      desc: Joi.string(),
    }),
    handle: async (ctx) => {
      Model.sys_resc.update(ctx.reqData, { where: { id: ctx.reqData.id } });
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
      await Model.sys_resc.destroy({ where: { id: ctx.reqData.id } });
      ctx.ok();
    },
  },
  {
    comment: '资源-获取资源',
    type: 'get',
    path: 'list',
    param: Joi.object().keys({
      catg: Joi.string().allow(''),
    }),
    handle: async (ctx) => {
      const where = {};
      if (ctx.reqData.catg) {
        where.catg = {
          [Op.in]: ctx.reqData.catg.split(','),
        };
      }
      const data = await Model.sys_resc.findAll({ where });
      ctx.ok(data);
    },
  },
  {
    comment: '资源-检查',
    type: 'get',
    path: 'check',
    handle: async (ctx) => {
      const dbResc = await Model.sys_resc.findAll(); // 数据库里的资源
      const codeResc = generateApi().paths; // swagger的api, 根据代码生成的

      const result = [];

      Object.keys(codeResc).forEach((path) => {
        const rowInfo = codeResc[path].get || codeResc[path].post;
        const resc = {
          url: path,
          catg: rowInfo.tags[0],
          name: rowInfo.summary,
        };
        const f = dbResc.find(item => item.url === path);
        if (f) {
          // 检查是否更新
          if (resc.url === f.url && resc.name === f.name && resc.catg === f.catg) {
            // nothing
          } else {
            resc.type = 'update';
            resc.original = f;
            result.push(resc);
          }
        } else {
          // 接口属于新增
          resc.type = 'add';
          result.push(resc);
        }
      });
      dbResc.forEach((item) => {
        if (!codeResc[item.url]) {
          item.type = 'remove';
          result.push(item);
        }
      });

      ctx.ok(result);
    },
  },
];
