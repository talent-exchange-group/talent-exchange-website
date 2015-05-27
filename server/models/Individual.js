var Sequelize = require('sequelize');
var db = require('../db');

var Individual = db.define('Individual', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: Sequelize.STRING
});

/**
 * Create table if doesn't exist
 */
Individual.sync({force: true});

module.exports = Individual;