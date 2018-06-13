/**
 * 接口资源
 */
const Model = require('../../model');

exports.g_page = async (ctx) => {
  const d = await Model.SysResc.findAll();
  ctx.ok(d);
};

exports = [
  {
    type: 'get',
    path: 'add_add',
    schema: {},
    action() {},
  },
];
