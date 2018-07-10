const Path = require('path');
const Koa = require('koa');
const Helmet = require('koa-helmet');
const Bodyparser = require('koa-bodyparser');
const koaStatic = require('koa-static');
const session = require('koa-session');
const cors = require('@koa/cors');
const Middleware = require('./middleware');
const Config = require('./config');
const Model = require('./model');

const logger = require('./utils/log4js').getLogger('app.js');
const router = require('./router');

const app = require('./extend')(new Koa()); // extend koa

app.keys = ['mysoul:admin'];

app.use(koaStatic(Path.join(__dirname, 'public')));

app.use(cors({
  credentials: true,
}));

app.use(Helmet()); //  provides important security headers to make app more secure by default

app.use(Middleware.httpLogger()); // http request log

app.use(Bodyparser({
  enableTypes: ['json', 'form'],
  textLimit: '1mb',
  jsonLimit: '1mb',
}));

app.use(Middleware.errorHandler()); // global error handling

app.use(Middleware.swaggerDoc({ path: '/swagger.json' })); // swagger doc

app.use(session({
  key: 'mysoul:admin',
  maxAge: 86400000,
  httpOnly: true,
  signed: true, /** (boolean) signed or not (default true) */
}, app));

router.useRouter(app); // mount the routing

if (Config.env === 'dev') {
  Model.syncModel(false); // 数据库模型同步
}

app.listen(Config.server.port, () => {
  logger.info('server start at', Config.server.port);
});
