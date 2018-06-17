module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'sysResc',
    {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      catg: { type: DataTypes.STRING, allowNull: false },
      url: { type: DataTypes.STRING, allowNull: false },
      usable: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
      desc: { type: DataTypes.STRING, allowNull: false },
    },
    {
      timestamps: false,
      tableName: 'sys_resc',
      comment: '接口资源表',
      indexes: [
        { unique: true, fields: ['id'] },
      ],
    },
  );

  return Model;
};