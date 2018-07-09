const Model = require('../model');

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

