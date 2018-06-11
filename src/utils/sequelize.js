const Sequelize = require('sequelize');
const Config = require('../config');

const debug = require('debug')('utils/sequelize');

const sequelize = new Sequelize(Config.db.database, Config.db.username, Config.db.password, {
  host: Config.db.host,
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

sequelize
  .authenticate()
  .then(() => {
    debug('Connection has been established successfully.');
  })
  .catch((err) => {
    debug('Unable to connect to the database: %O', err);
  });

module.exports = sequelize;

