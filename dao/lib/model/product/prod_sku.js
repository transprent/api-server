module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'prod_sku',
    {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      spu_id: { type: DataTypes.INTEGER, allowNull: false, field: 'spu_id', },
      name: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.DOUBLE, allowNull: false },
      picture: { type: DataTypes.STRING, allowNull: false, comment: '主图' },
      stock: { type: DataTypes.INTEGER, allowNull: false, comment: '库存' },
    },
    {
      timestamps: false,
      tableName: 'prod_sku',
      comment: '商品SKU',
      indexes: [
        { unique: true, fields: ['id'] },
      ],
    },
  );

  return Model;
};
