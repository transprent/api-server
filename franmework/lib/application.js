import { EventEmitter } from 'events';

const Path = require('path');
const Koa = require('koa');
const Helmet = require('koa-helmet');
const Bodyparser = require('koa-bodyparser');
const koaStatic = require('koa-static');
const cors = require('@koa/cors');

const extend = require('./extend');
const Config = require('./config');
const Middleware = require('./middleware');

const logger = require('./utils/log4js').getLogger('app.js');
const router = require('./router');

export default class Application extends EventEmitter {
  constructor(options = {}) {
    super();
    this.baseDir = options.baseDir;

    this.app = extend(new Koa());
  }

  init() {
    this.app.keys = ['mysoul:admin'];

    this.app.use(koaStatic(Path.join(__dirname, 'public')));

    this.app.use(cors({
      credentials: true,
    }));

    this.app.use(Helmet()); //  provides important security headers to make app more secure by default

    this.app.use(Middleware.session(this.app));

    this.app.use(Middleware.httpLogger()); // http request log

    this.app.use(Bodyparser({
      enableTypes: ['json', 'form'],
      textLimit: '1mb',
      jsonLimit: '1mb',
    }));

    this.app.use(Middleware.errorHandler()); // global error handling

    this.app.use(Middleware.swaggerDoc({ path: '/swagger.json' })); // swagger doc

    this.emit('beforeRouter', this);

    router.useRouter(this.app); // mount the routing
  }

  start() {
    this.app.listen(Config.server.port, () => {
      logger.info('server start at', Config.server.port);
    });
  }
}
