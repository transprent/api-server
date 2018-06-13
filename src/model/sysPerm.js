module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'sysPerm',
    {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      code: { type: DataTypes.STRING, allowNull: false },
      type: { type: DataTypes.STRING, allowNull: false },
      desc: { type: DataTypes.STRING, allowNull: false },
      usable: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
      parentId: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, field: 'parent_id', comment: '父级权限' },
    },
    {
      timestamps: false,
      tableName: 'sys_perm',
      comment: '权限表',
      indexes: [
        { unique: true, fields: ['id'] },
      ],
    },
  );

  return Model;
};
