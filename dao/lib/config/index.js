const Path = require('path');
const ModuleUtil = require('../utils/moduleUtil');

const config = {
  db: {
    host: 'www.renkun.vip',
    port: 3306,
    database: 'soul',
    username: 'root',
    password: '123456',
  },
};

const envConfig = ModuleUtil.resolveModule(Path.join(__dirname, `${config.env}.env.js`));

module.exports = Object.assign({}, config, envConfig);
