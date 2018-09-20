/**
 * 权限验证
 * @data 2018-7-14
 * @author kun
 */

module.exports = (...args) => {
  return async (ctx, next) => {
    let access = true;
    for(let i = 0, len = args.length; i < len; i+= 1) {
      const roles = args[i];
      if (roles && roles.length > 0) {
        if (ctx.session && ctx.session.user && ctx.session.user.roleList && ctx.session.user.roleList.length > 0) {
          if (roles.some(item => ctx.session.user.roleList.some(i => i === item))) {
            // 有权限
          } else {
            access = false;
            ctx.forbidden('无权访问！', null);
            break;
          }
        }else {
          access = false;
          ctx.unauthorized('账号未登录！', null);
          break;
        }
      }
    }
    if (access) {
      await next();
    }
  };
};
