const log4js = require('log4js');

log4js.configure({
  replaceConsole: true,
  appenders: {
    console: { type: 'console' },
    stdout: { type: 'stdout' },
    error: {
      type: 'dateFile',
      filename: 'logs/error/',
      pattern: 'yyyy-MM-dd.log',
      maxLogSize: 10458760,
      backups: 30,
      alwaysIncludePattern: true,
    },
    http: {
      type: 'dateFile',
      filename: 'logs/http/',
      pattern: 'yyyy-MM-dd.log',
      maxLogSize: 10458760,
      backups: 30,
      alwaysIncludePattern: true,
    },
    default: {
      type: 'dateFile',
      filename: 'logs/default/',
      pattern: 'yyyy-MM-dd.log',
      maxLogSize: 10458760,
      backups: 30,
      alwaysIncludePattern: true,
    },
  },
  categories: {
    http: { appenders: ['stdout', 'console', 'http'], level: 'debug' },
    error: { appenders: ['stdout', 'console', 'error'], level: 'error' },
    default: { appenders: ['stdout', 'console', 'default'], level: 'info' },
  },
});

exports.getLogger = (category, project) => {
  const logger = log4js.getLogger(`[${category}]`);
  logger.__log = logger.log;
  logger.log = (...args )=> {
    args.splice(1, 0, project);
    logger.__log(...args);
  };
  return logger;
};
