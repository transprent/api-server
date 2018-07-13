const Model = require('../model');
const sequelize = require('../utils/sequelize');

/**
 * 用户分配角色
 * @param {*} userId 用户id
 * @param {*} roles 角色
 */
exports.allocationRole = async ({ userId, roleIds }) => {
  try {
    // 1. 删除关联
    await Model.sys_fk_user_role.destroy({ where: { user_id: userId } });

    // 2. 建立新关联
    const createData = roleIds.map((item) => {
      return {
        user_id: userId,
        role_id: item,
      };
    });
    await Model.sys_fk_user_role.bulkCreate(createData);
  } catch (err) {
    return { code: 500, message: err.message };
  }

  return { code: 200 };
};

/**
 * 角色分配权限
 * @param {*} roleId 角色
 * @param {*} permIds 权限
 */
exports.allocationPerm = async ({ roleId, permIds }) => {
  try {
    // 1. 删除关联表里关联
    await Model.sys_fk_role_perm.destroy({ where: { role_id: roleId } });

    // 2. 插入新的关联
    const createData = permIds.map((item) => {
      return {
        role_id: roleId,
        perm_id: item,
      };
    });
    await Model.sys_fk_role_perm.bulkCreate(createData);
  } catch (err) {
    return { code: 500, message: err.message };
  }

  return { code: 200 };
};

/**
 * 权限分配资源
 * @param {*} permId 权限
 * @param {*} rescIds 资源
 */
exports.allocationResc = async ({ permId, rescIds }) => {
  try {
    // 1. 删除关联表里关联
    await Model.sys_fk_perm_resc.destroy({ where: { perm_id: permId } });

    // 2. 插入新的关联
    const createData = rescIds.map((item) => {
      return {
        perm_id: permId,
        resc_id: item,
      };
    });
    await Model.sys_fk_perm_resc.bulkCreate(createData);
  } catch (err) {
    return { code: 500, message: err.message };
  }

  return { code: 200 };
};

/**
 * 获取用户的权限
 * @param {*} userId
 * @return {Array}
 */
exports.getUserPerms = async (userId) => {
  const sql = `
  SELECT
    DISTINCT p.id, p.parent_id AS parentId, p.name, p.code, p.desc
  FROM sys_perm AS p
  INNER JOIN (
    sys_fk_user_role AS ur LEFT JOIN sys_fk_role_perm AS rp ON ur.role_id = rp.role_id
  ) ON p.id = rp.perm_id
  WHERE ur.user_id = :userId;
  `;
  const data = await sequelize.query(sql, {
    replacements: { userId },
    type: sequelize.QueryTypes.SELECT,
  });
  return { code: 200, result: data };
};

/**
 * 获取用户的资源
 * @param {*} userId
 * @return {Object}
 */
exports.getUserRescs = async (userId) => {
  const sql = `
  SELECT
    DISTINCT resc.id, resc.name, resc.catg, resc.url, resc.desc
  FROM sys_resc AS resc
  INNER JOIN (
    sys_fk_perm_resc AS perm_resc INNER JOIN (
      sys_fk_user_role AS user_role INNER JOIN sys_fk_role_perm AS role_perm ON user_role.role_id = role_perm.role_id
    ) ON perm_resc.perm_id = role_perm.perm_id
  ) ON resc.id = perm_resc.resc_id
  WHERE user_role.user_id = :userId;
  `;
  const data = await sequelize.query(sql, {
    replacements: { userId },
    type: sequelize.QueryTypes.SELECT,
  });
  return { code: 200, result: data };
};

/**
 * 获取权限拥有的资源
 * @param {*} permId
 */
exports.getPermOwnResc = async (permId) => {
  const sql = `
  SELECT r.*
  FROM sys_fk_perm_resc pr INNER JOIN sys_resc r ON r.id = pr.resc_id
  WHERE pr.perm_id = :permId
  `;
  const data = await sequelize.query(sql, {
    replacements: { permId },
    type: sequelize.QueryTypes.SELECT,
  });
  return { code: 200, result: data };
};

/**
 * 获取角色拥有的权限
 * @param {*} roleId
 */
exports.getRoleOwnPerm = async (roleId) => {
  const sql = `
  SELECT p.*
  FROM sys_fk_role_perm rp INNER JOIN sys_perm p ON p.id = rp.perm_id
  WHERE rp.role_id = :roleId
  `;
  const data = await sequelize.query(sql, {
    replacements: { roleId },
    type: sequelize.QueryTypes.SELECT,
  });
  return { code: 200, result: data };
};
