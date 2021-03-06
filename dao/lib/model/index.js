const Path = require('path');
const Config = require('../config');
const sequelize = require('../sequelize');
const  log4js = require('../../../common/lib/utils/log4js');
const logger = log4js.getLogger('DAO', 'model/index');

exports.Test = sequelize.import(Path.join(__dirname, './test'));

/**
 * 系统权限管理表
 * ------------------------------------
 */
exports.sys_role = sequelize.import(Path.join(__dirname, './system_access/sys_role')); // 角色表
exports.sys_user = sequelize.import(Path.join(__dirname, './system_access/sys_user')); // 用户表
exports.sys_fk_user_role = sequelize.import(Path.join(__dirname, './system_access/sys_fk_user_role')); // 用户角色关联表
// 用户角色多对多关联
exports.sys_user.belongsToMany(exports.sys_role, { as: 'roles', through: exports.sys_fk_user_role, foreignKey: 'user_id', validation: 'CASCADE', constraints: false });
exports.sys_role.belongsToMany(exports.sys_user, { as: 'users', through: exports.sys_fk_user_role, foreignKey: 'role_id', validation: 'CASCADE', constraints: false });

/**
 * 商品表
 * ---------------------------------------
 */
exports.prod_brand = sequelize.import(Path.join(__dirname, './product/prod_brand')); // 品牌
exports.prod_catalog = sequelize.import(Path.join(__dirname, './product/prod_catalog')); // 目录
exports.prod_label = sequelize.import(Path.join(__dirname, './product/prod_label')); // 标签
exports.prod_spec = sequelize.import(Path.join(__dirname, './product/prod_spec')); // 通用规格
exports.prod_spu = sequelize.import(Path.join(__dirname, './product/prod_spu')); // SPU
exports.prod_sku = sequelize.import(Path.join(__dirname, './product/prod_sku')); // SKU
exports.prod_sku_spec = sequelize.import(Path.join(__dirname, './product/prod_sku_spec')); // sku规格
exports.prod_spu_attr = sequelize.import(Path.join(__dirname, './product/prod_spu_attr')); // spu属性
exports.prod_fk_spu_label = sequelize.import(Path.join(__dirname, './product/prod_fk_spu_label')); // SPU和标签关联表
exports.prod_fk_spu_catalog = sequelize.import(Path.join(__dirname, './product/prod_fk_spu_catalog')); // SPU和目录关联表
// SPU与SKU一对多关联
exports.prod_spu.hasMany(exports.prod_sku, { as: 'sku', foreignKey: 'spu_id', validation: 'CASCADE', constraints: false });
// SPU与标签多对多关联
exports.prod_spu.belongsToMany(exports.prod_label, { as: 'label', through: exports.prod_fk_spu_label, foreignKey: 'spu_id', validation: 'CASCADE', constraints: false });
exports.prod_label.belongsToMany(exports.prod_spu, { as: 'spu', through: exports.prod_fk_spu_label, foreignKey: 'label_id', validation: 'CASCADE', constraints: false });
// SPU与目录多对多关联
exports.prod_spu.belongsToMany(exports.prod_catalog, { as: 'catalog', through: exports.prod_fk_spu_catalog, foreignKey: 'spu_id', validation: 'CASCADE', constraints: false });
exports.prod_catalog.belongsToMany(exports.prod_spu, { as: 'spu', through: exports.prod_fk_spu_catalog, foreignKey: 'catalog_id', validation: 'CASCADE', constraints: false });
// SKU与规格一对多关联
exports.prod_sku.hasMany(exports.prod_sku_spec, { as: 'skuSpec', foreignKey: 'sku_id', validation: 'CASCADE', constraints: false });
// SPU与属性一对多关联
exports.prod_spu.hasMany(exports.prod_spu_attr, { as: 'spuAttr', foreignKey: 'spu_id', validation: 'CASCADE', constraints: false });


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

exports.syncModel();
