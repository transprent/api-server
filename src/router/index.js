const Path = require('path');
const Router = require('koa-router');
const ModuleUtils = require('../utils/moduleUtil');
const logger = require('../utils/log4js').getLogger('router');

exports.useRouter = (app) => {
  const router = new Router();

  const controllers = ModuleUtils.getDirectoryModule(Path.join(__dirname, '../controller'));

  controllers.forEach((ctr) => {
    Object.keys(ctr.exports).forEach((key) => {
      const method = key.startsWith('g_') ? 'get' : 'post';
      const url = ['/api', ...ctr.properties, key].join('/');
      router[method](url, ctr.exports[key]);
      logger.info('挂载路由', method, url);
    });
  });

  app
    .use(router.routes())
    .use(router.allowedMethods());
};
