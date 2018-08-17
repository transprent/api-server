module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'prod_brand',
    {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      picture: { type: DataTypes.STRING, allowNull: false },
      desc: { type: DataTypes.TEXT, allowNull: true },
      sort: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      usable: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    },
    {
      timestamps: false,
      tableName: 'prod_brand',
      comment: '商品品牌',
      indexes: [
        { unique: true, fields: ['id'] },
      ],
    },
  );

  return Model;
};
