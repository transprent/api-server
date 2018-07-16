module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'test',
    {
      uuid: { type: DataTypes.STRING, primaryKey: true },
      name: { type: DataTypes.STRING },
      mAge: { type: DataTypes.STRING, field: 'm_age' },
    },
    {
      underscored: true, // 额外字段以下划线来分割
      timestamps: false, // 取消默认生成的createdAt、updatedAt字段
      freezeTableName: true, // Model 对应的表名将与model名相同
      tableName: 'test',
      comment: '测试表',
      indexes: [{
        name: 'idx_test',
        method: 'BTREE',
        fields: ['uuid'],
      }],
    },
  );

  Model.geta = () => {
    return 'static  method geta';
  };

  return Model;
};
