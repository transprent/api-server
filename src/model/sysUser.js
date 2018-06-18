module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'sysUser',
    {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      uname: { type: DataTypes.STRING, allowNull: false, comment: '账号' },
      passwd: { type: DataTypes.STRING, allowNull: false, comment: '密码' },
      realName: { type: DataTypes.STRING, allowNull: false, field: 'real_name', comment: '真实姓名' },
      phone: { type: DataTypes.STRING, allowNull: true, field: 'phone', comment: '手机号' },
      usable: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
      desc: { type: DataTypes.STRING, allowNull: true },
    },
    {
      timestamps: false,
      tableName: 'sys_user',
      comment: '权限角色表',
      indexes: [
        { unique: true, fields: ['id'] },
      ],
    },
  );

  return Model;
};
