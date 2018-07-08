const Model = require('../model');

/**
 * 用户分配角色
 * @param {*} userId 用户id
 * @param {*} roles 角色
 */
exports.allocationRole = async ({ userId, roleIds }) => {
  try {
    // 1. 删除关联表里的角色
    await Model.sys_fk_user_role.destroy({ where: { user_id: userId } });

    // 2. 插入新的角色
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
