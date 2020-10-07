const Sequelize = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(config.DB_CONNECTION_STRING);

module.exports = sequelize;