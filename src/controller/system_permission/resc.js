/**
 * 接口资源
 */
const Model = require('../../model');

exports.g_page = async (ctx) => {
  const d = await Model.SysResc.findAll();
  ctx.ok(d);
};

exports.p_page = async (ctx) => {
  const d = await Model.SysResc.findAll();
  ctx.ok(d);
};
