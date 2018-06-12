const Router = require('koa-router');
const Controller = require('../controller');

exports.useRouter = (app) => {
  const router = new Router();

  router.get('/a', Controller.test.index);

  app
    .use(router.routes())
    .use(router.allowedMethods());
};