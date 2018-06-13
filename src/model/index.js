const Path = require('path');
const Config = require('../config');
const sequelize = require('../utils/sequelize');
const logger = require('../utils/log4js').getLogger(__filename);

exports.Test = sequelize.import(Path.join(__dirname, './test'));

// 系统权限管理
exports.SysPerm = sequelize.import(Path.join(__dirname, './sysPerm'));
exports.SysResc = sequelize.import(Path.join(__dirname, './sysResc'));
exports.SysRole = sequelize.import(Path.join(__dirname, './sysRole'));
exports.SysUser = sequelize.import(Path.join(__dirname, './sysUser'));


exports.syncModel = (force) => {
  return new Promise((resolve, reject) => {
    if (Config.env !== 'dev') { reject(new Error('禁止在非Dev环境执行syncModel操作')); return; }
    logger.info('当前环境：', Config.env, ' 进行sequelize 模型同步...');
    sequelize.sync({ force }).then(() => {
      logger.info('sequelize 模型同步成功！');
      resolve();
    }).catch((error) => {
      logger.error('sequelize 模型同步错误！', error);
      reject(error);
    });
  });
};
