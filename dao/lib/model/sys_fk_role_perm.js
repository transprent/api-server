module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'sys_fk_role_perm',
    {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      role_id: { type: DataTypes.INTEGER, allowNull: false },
      perm_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      timestamps: false,
      tableName: 'sys_fk_role_perm',
      comment: '角色权限关联表',
      indexes: [
        { unique: true, fields: ['id'] },
      ],
    },
  );

  return Model;
};
