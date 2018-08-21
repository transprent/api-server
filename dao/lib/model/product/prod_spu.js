module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'prod_spu',
    {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      title: { type: DataTypes.STRING, allowNull: false },
      detail: { type: DataTypes.TEXT, allowNull: true, comment: '详情' },
      price: { type: DataTypes.DOUBLE, allowNull: false, comment: '价格' },
      picture: { type: DataTypes.STRING, allowNull: false, comment: '主图' },
      photos: { type: DataTypes.STRING, allowNull: false, comment: '商品图片' },
      catalogId: { type: DataTypes.INTEGER, allowNull: false, field: 'catalog_id', comment: '目录' },
      sort: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      status: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, comment: '下架：0，上架：1' },
      usable: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    },
    {
      timestamps: false,
      tableName: 'prod_spu',
      comment: '商品SPU表',
      indexes: [
        { unique: true, fields: ['id'] },
      ],
    },
  );

  return Model;
};
