module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'sys_fk_perm_resc',
    {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      perm_id: { type: DataTypes.INTEGER, allowNull: false },
      resc_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      timestamps: false,
      tableName: 'sys_fk_perm_resc',
      comment: '权限资源关联表',
      indexes: [
        { unique: true, fields: ['id'] },
      ],
    },
  );

  return Model;
};
