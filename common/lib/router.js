const Path = require('path');
const Router = require('koa-router');
const ModuleUtils = require('./utils/moduleUtil');
const Middleware = require('./middleware');
const log4js = require('./utils/log4js');

exports.useRouter = (app, config) => {
  const logger = log4js.getLogger(config.appName, 'router');
  const router = new Router();

  const controllers = ModuleUtils.getDirectoryModule(Path.join(config.baseDir, 'controller'));

  const entry = controllers.findIndex(i => i.properties.includes('entry'));
  if (entry !== -1) {
    router.use(...controllers[entry].exports);
    controllers.splice(entry, 1);
    logger.info('挂载全局中间件。。。');
  }

  controllers.forEach((ctr) => {
    ctr.exports.routers.forEach((item) => {
      const url = `/${[...ctr.properties, item.path].filter(i => i).join('/')}`;
      const method = item.type || 'get';
      router[method](
        url,
        Middleware.permission(ctr.exports.roles, item.roles),
        ...ctr.exports.middleware || [],
        ...item.middleware || [],
        Middleware.paramValidate(item.param, config),
        item.handle,
      );

      logger.info('挂载路由', ctr.exports.comment, item.comment || '', method, url);
    });
  });

  app
    .use(router.routes())
    .use(router.allowedMethods());
};
