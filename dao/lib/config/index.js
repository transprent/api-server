const Path = require('path');
const { utils } = require('../../../common');

const config = {
  env: process.env.NODE_ENV === 'production' ? 'prod' : 'dev',
  db: {
    host: '193.112.47.114',
    port: 3306,
    database: 'soul',
    username: 'root',
    password: '123456',
  },
};

const envConfig = utils.moduleUtil.resolveModule(Path.join(__dirname, `${config.env}.env.js`));

module.exports = Object.assign({}, config, envConfig);
