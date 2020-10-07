const sequelize = require('./database');
const Sequelize = require('sequelize');

const SlotsModel = sequelize.define('slots', {
    boulderToelz: Sequelize.INTEGER,
    climbToelz: Sequelize.INTEGER,
    boulderThalkirchen: Sequelize.INTEGER,
    climbThalkirchen: Sequelize.INTEGER,
    boulderGilching: Sequelize.INTEGER,
    climbGilching: Sequelize.INTEGER,
    boulderFreimann: Sequelize.INTEGER,
    climbFreimann: Sequelize.INTEGER,
});

SlotsModel.sync();

module.exports = {
  SlotsModel,
};
