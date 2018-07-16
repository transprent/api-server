module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'sys_fk_user_role',
    {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      role_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      timestamps: false,
      tableName: 'sys_fk_user_role',
      comment: '用户角色关联表',
      indexes: [
        { unique: true, fields: ['id'] },
      ],
    },
  );

  return Model;
};
