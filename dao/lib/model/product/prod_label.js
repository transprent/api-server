module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'prod_label',
    {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      text: { type: DataTypes.STRING, allowNull: false },
      color: { type: DataTypes.STRING, allowNull: false },
      backfround: { type: DataTypes.STRING, allowNull: true },
    },
    {
      timestamps: false,
      tableName: 'prod_label',
      comment: '商品标签',
      indexes: [
        { unique: true, fields: ['id'] },
      ],
    },
  );

  return Model;
};
