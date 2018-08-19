// 一个商品可以位于多个目录下

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'prod_fk_spu_catalog',
    {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      spu_id: { type: DataTypes.INTEGER, allowNull: false },
      catalog_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      timestamps: false,
      tableName: 'prod_fk_spu_catalog',
      comment: 'SPU和目录关联表',
      indexes: [
        { unique: true, fields: ['id'] },
      ],
    },
  );

  return Model;
};
