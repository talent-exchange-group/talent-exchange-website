var Sequelize = require('sequelize');
var db = require('../db');

var Location = db.define('Location', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: Sequelize.STRING
});

/**
 * Create table if doesn't exist
 */
Location.sync({force: true});

module.exports = Location;