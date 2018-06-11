module.exports = (sequelize, DataTypes) => {
  return sequelize.define('test', {
    id: DataTypes.STRING,
  }, {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
    paranoid: false,
  });
};
