const Path = require('path');
const ModuleUtil = require('../utils/moduleUtil');

const config = {
  env: process.env.NODE_ENV === 'production' ? 'prod' : 'dev',

  server: {
    host: '',
    port: 3000,
  },

  db: {
    host: 'www.renkun.vip',
    database: 'soul',
    username: 'root',
    password: '123456',
  },
};

const envConfig = ModuleUtil.resolveModule(Path.join(__dirname, `${config.env}.env.js`));

module.exports = Object.assign({}, config, envConfig);
