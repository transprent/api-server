module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'prod_fk_spu_label',
    {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
      spu_id: { type: DataTypes.INTEGER, allowNull: false },
      label_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      timestamps: false,
      tableName: 'prod_fk_spu_label',
      comment: 'SPU和标签关联表',
      indexes: [
        { unique: true, fields: ['id'] },
      ],
    },
  );

  return Model;
};
