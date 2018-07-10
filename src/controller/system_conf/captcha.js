const Service = require('../../service');

/**
 * 常量
 */
module.exports = [
  {
    comment: '生成验证码',
    type: 'get',
    path: 'generate',
    handle: async (ctx) => {
      const { code, result } = await Service.utils.captcha.generate(ctx.session);
      ctx.type = 'image/gif';
      ctx.body = result;
    },
  },
];