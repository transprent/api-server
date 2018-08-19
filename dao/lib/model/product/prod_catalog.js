module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'prod_catalog',
    {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      picture: { type: DataTypes.STRING, allowNull: true },
      name: { type: DataTypes.STRING, allowNull: false },
      desc: { type: DataTypes.TEXT, allowNull: true },
      sort: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      parentId: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, field: 'parent_id', comment: '父级目录' },
      usable: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    },
    {
      timestamps: false,
      tableName: 'prod_catalog',
      comment: '商品目录',
      indexes: [
        { unique: true, fields: ['id'] },
      ],
    },
  );

  return Model;
};
