const sequelize = require('./database');
const Sequelize = require('sequelize');

const Slots = sequelize.define('interest', {
    boulderToelz: Sequelize.INTEGER,
    climbToelz: Sequelize.INTEGER,
    boulderThalkirchen: Sequelize.INTEGER,
    climbThalkirchen: Sequelize.INTEGER,
    boulderGilching: Sequelize.INTEGER,
    climbGilching: Sequelize.INTEGER,
    boulderFreimann: Sequelize.INTEGER,
    climbFreimann: Sequelize.INTEGER,
});

module.exports = {
  SlotsModel,
};