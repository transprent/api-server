module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'prod_spec_value',
    {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      specId: { type: DataTypes.INTEGER, allowNull: false, field: 'spec_id', },
      value: { type: DataTypes.STRING, allowNull: false },
    },
    {
      timestamps: false,
      tableName: 'prod_spec_value',
      comment: '商品属性值',
      indexes: [
        { unique: true, fields: ['id'] },
      ],
    },
  );

  return Model;
};
