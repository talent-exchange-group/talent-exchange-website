var Sequelize = require('sequelize');
var db = require('../db');
var Location = require('./Location');
var Skill = require('./Skill');

var Organization = db.define('Organization', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  name: Sequelize.STRING,
  description: Sequelize.STRING
});

Location.hasMany(Organization, {foreignKey: 'location_id'});
Organization.belongsTo(Location, { foreignKey: 'location_id'});

OrganizationSkill = db.define('OrganizationSkill', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true }
});
Organization.belongsToMany(Skill, {
  through: OrganizationSkill,
  foreignKey: 'organization_id' 
});
Skill.belongsToMany(Organization, {
  through: OrganizationSkill,
  foreignKey: 'skill_id'
});
/**
 * Create table if doesn't exist
 */
Organization.drop({cascade:true});
Organization.sync({force:true});

module.exports = Organization;