var Sequelize = require('sequelize');
var db = require('../db');
var Organization = require('./Organization');

var Location = db.define('Location', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: Sequelize.STRING
});

/**
 * Create table if doesn't exist
 */
Location.drop({cascade:true});
Location.sync({force:true});

module.exports = Location;