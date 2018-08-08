const Config = require('../config');
const log4js = require('../../../../common/lib/utils/log4js');

exports.getLogger = (category) => {
  return log4js.getLogger(Config.appName, category);
};
