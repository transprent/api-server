const Path = require('path');
const Router = require('koa-router');
const ModuleUtils = require('../utils/moduleUtil');
const Middleware = require('../middleware');
const logger = require('../utils/log4js').getLogger('router/index');

exports.useRouter = (app) => {
  const router = new Router();

  const controllers = ModuleUtils.getDirectoryModule(Path.join(__dirname, '../controller'));

  controllers.forEach((ctr) => {
    ctr.exports.forEach((item) => {
      const url = `/${[...ctr.properties, item.path].filter(i => i).join('/')}`;
      const method = item.type || 'get';
      router[method](url, Middleware.paramValidate(item.param), item.handle);

      logger.info('挂载路由', item.comment || '', method, url);
    });
  });

  app
    .use(router.routes())
    .use(router.allowedMethods());
};
