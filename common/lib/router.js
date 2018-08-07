const Path = require('path');
const Router = require('koa-router');
const ModuleUtils = require('./utils/moduleUtil');
const Middleware = require('./middleware');
const logger = require('./utils/log4js').getLogger('router/index');

exports.useRouter = (app, baseDir) => {
  const router = new Router();

  const controllers = ModuleUtils.getDirectoryModule(Path.join(baseDir, 'controller'));

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
        ...ctr.exports.middleware || [],
        ...item.middleware || [],
        Middleware.paramValidate(item.param),
        item.handle,
      );

      logger.info('挂载路由', ctr.exports.comment, item.comment || '', method, url);
    });
  });

  app
    .use(router.routes())
    .use(router.allowedMethods());
};
