var Sequelize = require('sequelize');
var db = require('../db');
var Location = require('./Location');

var Organization = db.define('Organization', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  contact: Sequelize.STRING
});

Organization.belongsTo(Location, { foreignKey: 'location_id'});

/**
 * Create table if doesn't exist
 */
Organization.sync();

module.exports = Organization;