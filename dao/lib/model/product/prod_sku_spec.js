module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'prod_sku_spec',
    {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      skuId: { type: DataTypes.INTEGER, allowNull: false, field: 'sku_id', },
      name: { type: DataTypes.STRING, allowNull: false },
      value: { type: DataTypes.STRING, allowNull: false },
    },
    {
      timestamps: false,
      tableName: 'prod_sku_spec',
      comment: 'SKU属性',
      indexes: [
        { unique: true, fields: ['id'] },
      ],
    },
  );

  return Model;
};
