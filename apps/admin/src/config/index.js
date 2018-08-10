const Path = require('path');
const { utils } = require('../../../../common');

const config = {
  appName: '后台管理',
  env: process.env.NODE_ENV === 'production' ? 'prod' : 'dev',
  baseDir: Path.join(__dirname, '../'),

  server: {
    host: '',
    port: 3000,
  },
};

const envConfig = utils.moduleUtil.resolveModule(Path.join(__dirname, `${config.env}.env.js`));

module.exports = Object.assign({}, config, envConfig);
