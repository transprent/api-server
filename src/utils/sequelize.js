const Sequelize = require('sequelize');
const Config = require('../config');

const logger = require('../utils/log4js').getLogger(__filename);

const sequelize = new Sequelize(Config.db.database, Config.db.username, Config.db.password, {
  host: Config.db.host,
  dialect: 'mysql',
  operatorsAliases: false,
  logging: (...args) => {
    logger.info(...args);
  },

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
    logger.debug('Connection has been established successfully.');
  })
  .catch((err) => {
    logger.error('Unable to connect to the database: ', err);
  });

module.exports = sequelize;

