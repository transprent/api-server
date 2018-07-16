const Path = require('path');
const Config = require('../config');
const sequelize = require('../utils/sequelize');
const logger = require('../utils/log4js').getLogger('model/index');

exports.Test = sequelize.import(Path.join(__dirname, './test'));

// 系统权限管理
exports.sys_perm = sequelize.import(Path.join(__dirname, './sys_perm')); // 权限表
exports.sys_resc = sequelize.import(Path.join(__dirname, './sys_resc')); // 资源表
exports.sys_role = sequelize.import(Path.join(__dirname, './sys_role')); // 角色表
exports.sys_user = sequelize.import(Path.join(__dirname, './sys_user')); // 用户表
exports.sys_fk_perm_resc = sequelize.import(Path.join(__dirname, './sys_fk_perm_resc')); // 权限资源关联表
exports.sys_fk_role_perm = sequelize.import(Path.join(__dirname, './sys_fk_role_perm')); // 角色权限关联表
exports.sys_fk_user_role = sequelize.import(Path.join(__dirname, './sys_fk_user_role')); // 用户角色关联表
// 用户角色多对多关联
exports.sys_user.belongsToMany(exports.sys_role, { as: 'roles', through: exports.sys_fk_user_role, foreignKey: 'user_id', validation: 'CASCADE', constraints: false });
exports.sys_role.belongsToMany(exports.sys_user, { as: 'users', through: exports.sys_fk_user_role, foreignKey: 'role_id', validation: 'CASCADE', constraints: false });
// 角色权限多对多关联
exports.sys_role.belongsToMany(exports.sys_perm, { as: 'perms', through: exports.sys_fk_role_perm, foreignKey: 'role_id', validation: 'CASCADE', constraints: false });
exports.sys_perm.belongsToMany(exports.sys_role, { as: 'roles', through: exports.sys_fk_role_perm, foreignKey: 'perm_id', validation: 'CASCADE', constraints: false });
// 权限资源多对多关联
exports.sys_perm.belongsToMany(exports.sys_resc, { as: 'rescs', through: exports.sys_fk_perm_resc, foreignKey: 'perm_id', validation: 'CASCADE', constraints: false });
exports.sys_resc.belongsToMany(exports.sys_perm, { as: 'perms', through: exports.sys_fk_perm_resc, foreignKey: 'resc_id', validation: 'CASCADE', constraints: false });

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
