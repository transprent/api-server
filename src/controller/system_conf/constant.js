/**
 * 常量
 */
const constant = require('../../utils/constant');

module.exports = {
  comment: '常量',
  routers: [
    {
      comment: '获取常量',
      type: 'get',
      path: 'list',
      handle: async (ctx) => {
        ctx.ok(constant);
      },
    },
  ],
};
