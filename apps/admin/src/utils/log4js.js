const logger = require('../../../../common/lib/log4js');

exports.getLogger = (category) => {
  return log4js.getLogger(category || 'default');
};
