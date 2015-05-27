var Sequelize = require('sequelize');
var db = require('../db');
var Location = require('./Location');
var Skill = require('./Skill');

var Organization = db.define('Organization', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  contact: Sequelize.STRING
});

Organization.belongsTo(Location, { foreignKey: 'location_id'});

OrganizationSkill = db.define('OrganizationSkill', {
  id: { type: Sequelize.INTEGER, autoIncrement true, primaryKey: true }
});
Organization.hasMany(Skill, { through: OrganizationSkill });
Skill.hasMany(Organization, { through: OrganizationSkill });

/**
 * Create table if doesn't exist
 */
Organization.sync();

module.exports = Organization;