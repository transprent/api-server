module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'test',
    {
      uuid: { type: DataTypes.STRING, primaryKey: true },
      name: DataTypes.STRING,
    },
    {
      underscored: true, // 额外字段以下划线来分割
      timestamps: false, // 取消默认生成的createdAt、updatedAt字段
      freezeTableName: true, // Model 对应的表名将与model名相同
      tableName: 'test',
      // classMethods: classMethods, // 静态方法，即user模型自带的方法
      comment: '测试表',
      indexes: [{
        name: 'idx_test',
        method: 'BTREE',
        fields: ['id'],
      }],
    },
  );
};
