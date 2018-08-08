const Sequelize = require('sequelize');
const Config = require('./config');

const  log4js = require('../../common/lib/utils/log4js');
const logger = log4js.getLogger('DAO', 'model/index');

const sequelize = new Sequelize(Config.db.database, Config.db.username, Config.db.password, {
  host: Config.db.host,
  dialect: 'mysql',
  operatorsAliases: false,
  logging: (...args) => {
    logger.info(args[0]);
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
    logger.info('Connection has been established successfully.');
  })
  .catch((err) => {
    logger.error('Unable to connect to the database: ', err);
  });

module.exports = sequelize;

