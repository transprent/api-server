module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'prod_spec',
    {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      values: { type: DataTypes.STRING, allowNull: false, comment: '多个值使用英文逗号隔开' },
    },
    {
      timestamps: false,
      tableName: 'prod_spec',
      comment: '商品属性名',
      indexes: [
        { unique: true, fields: ['id'] },
      ],
    },
  );

  return Model;
};
