/**
 * 权限验证
 * @data 2018-7-14
 * @author kun
 */
const whiteList = [
  '/system_conf/captcha/generate', // 验证码
  '/system_permission/user/login', // 登陆
  '/system_permission/user/logout', // 退出
  '/system_conf/constant/list', // 系统常量
];

module.exports = () => {
  return async (ctx, next) => {
    if (whiteList.find(i => i === ctx.path)) await next();
    else {
      if (ctx.session && ctx.session.user) {
        if (ctx.session.user.rescList.find(i => i.url === ctx.path)) {
          await next();
        } else if (ctx.session.user.roleList && ctx.session.user.roleList.find(i => i.id === 1)) {
          await next();
        } else {
          ctx.forbidden('无权访问！', null);
        }
      } else {
        ctx.unauthorized('账号未登录！', null);
      }
    }
  };
};
