const Path = require('path');
const sequelize = require('../utils/sequelize');

exports.Test = sequelize.import(Path.join(__dirname, './test'));
