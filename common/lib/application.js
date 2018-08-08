const Path = require('path');
const Koa = require('koa');
const Helmet = require('koa-helmet');
const Bodyparser = require('koa-bodyparser');
const koaStatic = require('koa-static');
const cors = require('@koa/cors');

const extend = require('./extend');
const Middleware = require('./middleware');
const log4js = require('./utils/log4js');
const router = require('./router');

module.exports = class Application {
  constructor(config = {}) {
    this.config = config

    this.app = extend(new Koa());
    this.logger = log4js.getLogger(this.config.appName, 'app.js');

    this._init();
  }

  _init() {
    this.app.keys = ['mysoul:admin'];

    this.app.use(koaStatic(Path.join(__dirname, 'public')));
    this.app.use(koaStatic(Path.join(this.config.baseDir, 'public')));

    this.app.use(cors({
      credentials: true,
    }));

    this.app.use(Helmet()); //  provides important security headers to make app more secure by default

    this.app.use(Middleware.session(this.app, this.config));

    this.app.use(Middleware.httpLogger(this.app, this.config)); // http request log

    this.app.use(Bodyparser({
      enableTypes: ['json', 'form'],
      textLimit: '1mb',
      jsonLimit: '1mb',
    }));

    this.app.use(Middleware.errorHandler(this.app, this.config)); // global error handling

    this.app.use(Middleware.swaggerDoc({ path: '/swagger.json', config: this.config })); // swagger doc

    router.useRouter(this.app, this.config); // mount the routing
  }

  start() {
    this.app.listen(this.config.server.port, () => {
      this.logger.info('server start at', this.config.server.port);
    });
  }
}
