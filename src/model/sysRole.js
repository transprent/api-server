module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'sysRole',
    {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      usable: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
      desc: { type: DataTypes.STRING, allowNull: true },
    },
    {
      timestamps: false,
      tableName: 'sys_role',
      comment: '权限角色表',
      indexes: [
        { unique: true, fields: ['id'] },
      ],
    },
  );

  return Model;
};
